import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICE_MAP: Record<string, string | undefined> = {
  basic:    process.env.STRIPE_PRICE_WINERY_BASIC,
  standard: process.env.STRIPE_PRICE_WINERY_STANDARD,
  premium:  process.env.STRIPE_PRICE_WINERY_PREMIUM,
};

export async function POST(request: Request) {
  const { plan } = await request.json() as { plan: string };
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  if (!plan || !["basic", "standard", "premium"].includes(plan)) {
    return NextResponse.json({ error: "Plan invalid" }, { status: 400 });
  }

  const priceId = PRICE_MAP[plan];
  if (!priceId) {
    return NextResponse.json(
      { error: `STRIPE_PRICE_WINERY_${plan.toUpperCase()} nu e configurat în .env.local` },
      { status: 500 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/partners/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
    cancel_url: `${baseUrl}/partners`,
    metadata: { type: "winery", plan },
    subscription_data: {
      metadata: { type: "winery", plan },
    },
  });

  return NextResponse.json({ url: session.url });
}
