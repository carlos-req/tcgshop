import { NextResponse } from "next/server";
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

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  if (session.payment_status !== "paid") return;

  const productId = session.metadata?.productId;
  if (!productId) return;

  const payload = await getPayloadClient();
  const quantity = 1;
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
        product: Number(productId),
        quantity,
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
  }

  if (!orderCreated) return;

  const decremented = await decrementProductStock(productId, quantity);
  if (!decremented) {
    console.error(
      `Stock decrement failed for product ${productId} (session ${session.id}) — product may be oversold, needs manual review`,
    );
  }
}
