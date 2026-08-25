import { NextResponse } from "next/server";
import { getProductForCheckout } from "@/data/products";
import { getPayloadClient } from "@/lib/payload";
import { getStripeClient } from "@/lib/stripe";

const MAX_LINE_ITEMS = 50;
const MAX_QUANTITY_PER_ITEM = 20;

interface CartItemInput {
  categorySlug: string;
  productSlug: string;
  quantity: number;
}

function parseItems(body: unknown): CartItemInput[] | null {
  if (!body || typeof body !== "object" || !("items" in body)) return null;
  const { items } = body as { items: unknown };
  if (!Array.isArray(items) || items.length === 0) return null;
  if (items.length > MAX_LINE_ITEMS) return null;

  const parsed: CartItemInput[] = [];
  for (const raw of items) {
    if (!raw || typeof raw !== "object") return null;
    const { categorySlug, productSlug, quantity } = raw as Record<
      string,
      unknown
    >;
    if (typeof categorySlug !== "string" || typeof productSlug !== "string") {
      return null;
    }
    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY_PER_ITEM
    ) {
      return null;
    }
    parsed.push({ categorySlug, productSlug, quantity });
  }

  return parsed;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const items = parseItems(body);

  if (!items) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const lineItems: { price: string; quantity: number }[] = [];

  for (const item of items) {
    const product = await getProductForCheckout(
      item.categorySlug,
      item.productSlug,
    );

    if (!product) {
      return NextResponse.json(
        { error: "One of the items in your cart is no longer available" },
        { status: 404 },
      );
    }

    if (product.status === "out_of_stock") {
      return NextResponse.json(
        { error: `${product.name} is out of stock` },
        { status: 409 },
      );
    }

    if (product.status === "in_stock" && product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Only ${product.stock} left of ${product.name}` },
        { status: 409 },
      );
    }

    if (!product.stripePriceId) {
      return NextResponse.json(
        { error: `${product.name} is not available for checkout yet` },
        { status: 422 },
      );
    }

    lineItems.push({ price: product.stripePriceId, quantity: item.quantity });
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = getStripeClient();

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: request.headers });
  const customerId = user?.collection === "customers" ? user.id : undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["US"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 599, currency: "usd" },
          display_name: "Standard Shipping",
        },
      },
    ],
    success_url: `${origin}/checkout/success`,
    cancel_url: `${origin}/checkout/cancelled`,
    metadata: {
      ...(customerId ? { customerId: String(customerId) } : {}),
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url });
}
