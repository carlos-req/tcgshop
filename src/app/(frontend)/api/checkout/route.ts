import { NextResponse } from "next/server";
import { getProductForCheckout } from "@/data/products";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const categorySlug = body?.categorySlug;
  const productSlug = body?.productSlug;

  if (typeof categorySlug !== "string" || typeof productSlug !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const product = await getProductForCheckout(categorySlug, productSlug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  if (product.status === "out_of_stock") {
    return NextResponse.json(
      { error: "Product is out of stock" },
      { status: 409 },
    );
  }

  if (product.status === "in_stock" && product.stock < 1) {
    return NextResponse.json(
      { error: "Product is out of stock" },
      { status: 409 },
    );
  }

  if (!product.stripePriceId) {
    return NextResponse.json(
      { error: "Product is not available for checkout yet" },
      { status: 422 },
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: product.stripePriceId, quantity: 1 }],
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
    success_url: `${origin}/${categorySlug}/${productSlug}?checkout=success`,
    cancel_url: `${origin}/${categorySlug}/${productSlug}?checkout=cancelled`,
    metadata: {
      productId: product.id,
      categorySlug,
      productSlug,
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
