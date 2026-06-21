import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const priceId = process.env.STRIPE_PRICE_USER_PREMIUM;
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  if (!priceId) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_USER_PREMIUM nu e configurat în .env.local" },
      { status: 500 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/premium`,
    metadata: { type: "user_premium", plan: "premium" },
    subscription_data: {
      metadata: { type: "user_premium", plan: "premium" },
    },
  });

  return NextResponse.json({ url: session.url });
}
