import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type CountResult = PromiseLike<{ count: number | null; error: unknown }>;
type SelectResult<T> = PromiseLike<{ data: T[] | null; error: unknown }>;

async function safeCount(fn: () => CountResult): Promise<number> {
  try {
    const { count, error } = await fn();
    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

async function safeSelect<T>(fn: () => SelectResult<T>): Promise<T[]> {
  try {
    const { data, error } = await fn();
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-analytics-secret");
  if (secret !== process.env.ANALYTICS_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    usersTotal,
    usersNew7d,
    scansTotal,
    scansWithWine,
    reservations,
    locationsTotal,
    locationsClaimed,
    routesTotal,
    routesAI,
    billingRecords,
    campaigns,
    winesTotal,
    reviewsTotal,
    postsTotal,
  ] = await Promise.all([
    safeCount(() =>
      supabaseAdmin.from("users").select("*", { count: "exact", head: true })
    ),
    safeCount(() =>
      supabaseAdmin
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    ),
    safeCount(() =>
      supabaseAdmin.from("wine_scans").select("*", { count: "exact", head: true })
    ),
    safeCount(() =>
      supabaseAdmin
        .from("wine_scans")
        .select("*", { count: "exact", head: true })
        .not("wine_id", "is", null)
    ),
    safeSelect<{ status: string }>(() =>
      supabaseAdmin.from("reservations").select("status")
    ),
    safeCount(() =>
      supabaseAdmin.from("locations").select("*", { count: "exact", head: true })
    ),
    safeCount(() =>
      supabaseAdmin
        .from("locations")
        .select("*", { count: "exact", head: true })
        .not("owner_user_id", "is", null)
    ),
    safeCount(() =>
      supabaseAdmin.from("routes").select("*", { count: "exact", head: true })
    ),
    safeCount(() =>
      supabaseAdmin
        .from("routes")
        .select("*", { count: "exact", head: true })
        .eq("is_ai_generated", true)
    ),
    safeSelect<{ amount: number; created_at: string }>(() =>
      supabaseAdmin
        .from("billing_records")
        .select("amount, created_at")
        .order("created_at", { ascending: true })
    ),
    safeSelect<{
      id: string;
      title: string;
      campaign_tracking: Array<{ event_type: string }>;
    }>(() =>
      supabaseAdmin
        .from("campaigns")
        .select("id, title, campaign_tracking(event_type)")
        .eq("is_active", true)
        .limit(10)
    ),
    safeCount(() =>
      supabaseAdmin.from("wines").select("*", { count: "exact", head: true })
    ),
    safeCount(() =>
      supabaseAdmin.from("wine_reviews").select("*", { count: "exact", head: true })
    ),
    safeCount(() =>
      supabaseAdmin.from("posts").select("*", { count: "exact", head: true })
    ),
  ]);

  // Rezervari pe status
  const reservationStats: Record<string, number> = {
    pending: 0, confirmed: 0, completed: 0, rejected: 0, cancelled: 0, no_show: 0,
  };
  for (const r of reservations) {
    const s = r.status ?? "pending";
    reservationStats[s] = (reservationStats[s] ?? 0) + 1;
  }
  const reservationsTotal = Object.values(reservationStats).reduce((a, b) => a + b, 0);

  // Venituri lunare
  const monthlyRevenue: Record<string, number> = {};
  for (const r of billingRecords) {
    const month = r.created_at?.slice(0, 7) ?? "unknown";
    monthlyRevenue[month] = (monthlyRevenue[month] ?? 0) + Number(r.amount ?? 0);
  }
  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const revenueThisMonth = monthlyRevenue[currentMonthKey] ?? 0;

  // Campanii procesate
  const campaignsProcessed = campaigns.map((c) => {
    const tracking = c.campaign_tracking ?? [];
    return {
      id: c.id,
      title: c.title,
      views: tracking.filter((t) => t.event_type === "view").length,
      clicks: tracking.filter((t) => t.event_type === "click").length,
      redeems: tracking.filter((t) => t.event_type === "redeem").length,
    };
  });

  return NextResponse.json({
    users: { total: usersTotal, new_7d: usersNew7d },
    scans: {
      total: scansTotal,
      with_wine: scansWithWine,
      success_rate: scansTotal > 0 ? Math.round((scansWithWine / scansTotal) * 100) : 0,
    },
    reservations: { total: reservationsTotal, by_status: reservationStats },
    locations: {
      total: locationsTotal,
      claimed: locationsClaimed,
      unclaimed: locationsTotal - locationsClaimed,
    },
    routes: { total: routesTotal, ai_generated: routesAI },
    revenue: {
      current_month: revenueThisMonth,
      monthly_history: Object.entries(monthlyRevenue)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-12)
        .map(([month, amount]) => ({ month, amount })),
    },
    campaigns: campaignsProcessed,
    content: { wines: winesTotal, reviews: reviewsTotal, posts: postsTotal },
    generated_at: new Date().toISOString(),
  });
}
