import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type Stripe from "stripe";

// Stripe 2026 API — unele proprietăți sunt accesate runtime, nu prin tipuri
type AnyRecord = Record<string, unknown>;

function getPeriodEnd(obj: AnyRecord): string | null {
  const ts = obj["current_period_end"] as number | undefined;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig  = request.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(event.data.object as unknown as AnyRecord);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object as unknown as AnyRecord);
      break;
    case "invoice.payment_failed":
      await handlePaymentFailed(event.data.object as unknown as AnyRecord);
      break;
  }

  return NextResponse.json({ received: true });
}

// ── Checkout finalizat ────────────────────────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") return;

  const customerId     = session.customer as string;
  const subscriptionId = session.subscription as string;
  const email          = session.customer_details?.email ?? "";
  const type           = session.metadata?.type ?? "";
  const plan           = session.metadata?.plan ?? "";

  // Preluăm subscripția pentru data de expirare
  const raw       = await stripe.subscriptions.retrieve(subscriptionId) as unknown as AnyRecord;
  const periodEnd = getPeriodEnd(raw);

  if (type === "user_premium") {
    await supabaseAdmin.from("user_subscriptions").upsert(
      {
        email,
        stripe_customer_id:     customerId,
        stripe_subscription_id: subscriptionId,
        plan,
        status:             "active",
        current_period_end: periodEnd,
        updated_at:         new Date().toISOString(),
      },
      { onConflict: "stripe_subscription_id" }
    );
    return;
  }

  if (type === "winery") {
    await supabaseAdmin.from("winery_subscriptions").upsert(
      {
        email,
        stripe_customer_id:     customerId,
        stripe_subscription_id: subscriptionId,
        plan,
        status:             "active",
        current_period_end: periodEnd,
        updated_at:         new Date().toISOString(),
      },
      { onConflict: "stripe_subscription_id" }
    );
  }
}

// ── Subscripție actualizată ───────────────────────────────────────────────────

async function handleSubscriptionUpdated(raw: AnyRecord) {
  const id        = raw["id"] as string;
  const stripeStatus = raw["status"] as string;
  const periodEnd = getPeriodEnd(raw);
  const metadata  = (raw["metadata"] ?? {}) as AnyRecord;
  const type      = metadata["type"] as string ?? "";

  const status = stripeStatus === "active" ? "active"
               : stripeStatus === "past_due" ? "past_due"
               : "inactive";

  if (type === "user_premium") {
    await supabaseAdmin
      .from("user_subscriptions")
      .update({ status, current_period_end: periodEnd, updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", id);
    return;
  }

  if (type === "winery") {
    await supabaseAdmin
      .from("winery_subscriptions")
      .update({ status, current_period_end: periodEnd, updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", id);
  }
}

// ── Subscripție anulată ───────────────────────────────────────────────────────

async function handleSubscriptionDeleted(raw: AnyRecord) {
  const id       = raw["id"] as string;
  const metadata = (raw["metadata"] ?? {}) as AnyRecord;
  const type     = metadata["type"] as string ?? "";

  if (type === "user_premium") {
    await supabaseAdmin
      .from("user_subscriptions")
      .update({ status: "cancelled", updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", id);
    return;
  }

  if (type === "winery") {
    await supabaseAdmin
      .from("winery_subscriptions")
      .update({ status: "cancelled", updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", id);
  }
}

// ── Plată eșuată ──────────────────────────────────────────────────────────────

async function handlePaymentFailed(raw: AnyRecord) {
  const subField       = raw["subscription"];
  const subscriptionId = typeof subField === "string"
    ? subField
    : (subField as AnyRecord | null)?.["id"] as string | undefined;

  if (!subscriptionId) return;

  await supabaseAdmin
    .from("user_subscriptions")
    .update({ status: "past_due", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscriptionId);

  await supabaseAdmin
    .from("winery_subscriptions")
    .update({ status: "past_due", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscriptionId);
}
