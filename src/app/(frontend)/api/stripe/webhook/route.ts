import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import type Stripe from "stripe";
import { getPayloadClient } from "@/lib/payload";
import { getStripeClient } from "@/lib/stripe";
import { decrementProductStock } from "@/lib/inventory";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook is not configured" },
      { status: 500 },
    );
  }

  const rawBody = await request.text();
  const stripe = getStripeClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    await handleCheckoutSessionCompleted(
      event.data.object as Stripe.Checkout.Session,
    );
  }

  if (event.type === "checkout.session.expired") {
    handleCheckoutSessionExpired(event.data.object as Stripe.Checkout.Session);
  }

  return NextResponse.json({ received: true });
}

// No order or stock state to reconcile here — orders are only ever created
// on checkout.session.completed, and stock isn't reserved at session
// creation. This is purely for abandoned-checkout visibility.
function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  console.log(`Checkout session expired: ${session.id}`);
  Sentry.captureMessage("Checkout session expired", {
    level: "info",
    tags: { area: "stripe-webhook", step: "checkout-session-expired" },
    extra: {
      sessionId: session.id,
      customerEmail: session.customer_details?.email ?? undefined,
    },
  });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

async function sendOrderConfirmationEmail({
  to,
  sessionId,
  lineItems,
  amountTotal,
  currency,
}: {
  to: string;
  sessionId: string;
  lineItems: { name: string; quantity: number; unitAmount: number }[];
  amountTotal: number;
  currency: string;
}) {
  const payload = await getPayloadClient();

  const itemsHtml = lineItems
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;">${item.name} &times; ${item.quantity}</td>
          <td style="padding:8px 0;text-align:right;">${formatCurrency(item.unitAmount * item.quantity, currency)}</td>
        </tr>`,
    )
    .join("");

  await payload.sendEmail({
    to,
    subject: "Your order is confirmed",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
        <h2>Thanks for your order!</h2>
        <p>Order reference: ${sessionId}</p>
        <table style="width:100%;border-collapse:collapse;">
          ${itemsHtml}
          <tr>
            <td style="padding:12px 0;font-weight:bold;border-top:1px solid #ddd;">Total</td>
            <td style="padding:12px 0;font-weight:bold;text-align:right;border-top:1px solid #ddd;">${formatCurrency(amountTotal, currency)}</td>
          </tr>
        </table>
      </div>
    `,
  });
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  if (session.payment_status !== "paid") return;

  const customerId = session.metadata?.customerId;

  const payload = await getPayloadClient();
  const stripe = getStripeClient();

  // Stripe, not our own metadata, is the source of truth for what was
  // actually purchased and at what price — line items are re-fetched here
  // rather than trusted from client-supplied cart state.
  const stripeLineItems = await stripe.checkout.sessions.listLineItems(
    session.id,
    { limit: 100 },
  );

  const priceIds = stripeLineItems.data
    .map((item) => item.price?.id)
    .filter((id): id is string => Boolean(id));

  const productsResult = priceIds.length
    ? await payload.find({
        collection: "products",
        where: { stripePriceId: { in: priceIds } },
        limit: priceIds.length,
      })
    : { docs: [] };

  const productByPriceId = new Map(
    productsResult.docs
      .filter((product) => product.stripePriceId)
      .map((product) => [product.stripePriceId as string, product]),
  );

  const lineItems = stripeLineItems.data.flatMap((item) => {
    const priceId = item.price?.id;
    const product = priceId ? productByPriceId.get(priceId) : undefined;
    if (!product) return [];

    return [
      {
        product: product.id,
        quantity: item.quantity ?? 1,
        unitAmount: item.price?.unit_amount ?? 0,
      },
    ];
  });

  if (lineItems.length === 0) {
    console.error(
      `No recognized line items for checkout session ${session.id} — skipping order creation`,
    );
    Sentry.captureMessage("Paid checkout session had no recognized line items", {
      level: "error",
      tags: { area: "stripe-webhook", step: "line-item-match" },
      extra: { sessionId: session.id },
    });
    return;
  }

  const shipping = session.collected_information?.shipping_details;
  const address = shipping?.address;

  let orderCreated = false;
  try {
    await payload.create({
      collection: "orders",
      data: {
        stripeSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : (session.payment_intent?.id ?? undefined),
        customer: customerId ? Number(customerId) : undefined,
        lineItems,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        customerEmail: session.customer_details?.email ?? "",
        shippingAddress: address
          ? {
              line1: address.line1 ?? undefined,
              line2: address.line2 ?? undefined,
              city: address.city ?? undefined,
              state: address.state ?? undefined,
              postalCode: address.postal_code ?? undefined,
              country: address.country ?? undefined,
            }
          : undefined,
        status: "paid",
      },
    });
    orderCreated = true;
  } catch (error) {
    // Most likely a retried webhook delivery hitting the unique constraint on
    // stripeSessionId — safe to no-op. Any other failure still needs to skip
    // the stock decrement below and gets logged for manual reconciliation,
    // since the Stripe charge has already succeeded and can't be undone here.
    console.error(
      `Order create failed for checkout session ${session.id} (possibly a duplicate webhook delivery):`,
      error,
    );
    Sentry.captureException(error, {
      tags: { area: "stripe-webhook", step: "order-create" },
      extra: { sessionId: session.id },
    });
  }

  if (!orderCreated) return;

  const customerEmail = session.customer_details?.email;
  if (customerEmail) {
    const emailLineItems = stripeLineItems.data.flatMap((item) => {
      const priceId = item.price?.id;
      const product = priceId ? productByPriceId.get(priceId) : undefined;
      if (!product) return [];

      return [
        {
          name: product.name,
          quantity: item.quantity ?? 1,
          unitAmount: item.price?.unit_amount ?? 0,
        },
      ];
    });

    try {
      await sendOrderConfirmationEmail({
        to: customerEmail,
        sessionId: session.id,
        lineItems: emailLineItems,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
      });
    } catch (error) {
      console.error(
        `Order confirmation email failed for checkout session ${session.id}:`,
        error,
      );
      Sentry.captureException(error, {
        tags: { area: "stripe-webhook", step: "confirmation-email" },
        extra: { sessionId: session.id },
      });
    }
  }

  for (const item of lineItems) {
    const decremented = await decrementProductStock(
      String(item.product),
      item.quantity,
    );
    if (!decremented) {
      console.error(
        `Stock decrement failed for product ${item.product} (session ${session.id}) — product may be oversold, needs manual review`,
      );
      Sentry.captureMessage("Stock decrement failed after paid order", {
        level: "error",
        tags: { area: "stripe-webhook", step: "stock-decrement" },
        extra: { sessionId: session.id, productId: item.product },
      });
    }
  }
}
