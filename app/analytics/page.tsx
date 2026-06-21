"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ─── Types ──────────────────────────────────────────────────────────────────

interface AnalyticsData {
  users: { total: number; new_7d: number };
  scans: { total: number; with_wine: number; success_rate: number };
  reservations: {
    total: number;
    by_status: Record<string, number>;
  };
  locations: { total: number; claimed: number; unclaimed: number };
  routes: { total: number; ai_generated: number };
  revenue: {
    current_month: number;
    monthly_history: Array<{ month: string; amount: number }>;
  };
  campaigns: Array<{ id: string; title: string; views: number; clicks: number; redeems: number }>;
  content: { wines: number; reviews: number; posts: number };
  generated_at: string;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  color = "#C9A84C",
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="card-gold p-5">
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(250,246,238,0.4)" }}>
        {label}
      </p>
      <p className="font-title text-4xl font-bold mb-1" style={{ color }}>
        {value}
      </p>
      {sub && (
        <p className="text-xs" style={{ color: "rgba(250,246,238,0.4)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#C9A84C",
  confirmed: "#4ADE80",
  completed: "#C9A84C",
  rejected: "#FF6B6B",
  cancelled: "rgba(250,246,238,0.3)",
  no_show: "#FF8C42",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "În așteptare",
  confirmed: "Confirmate",
  completed: "Finalizate",
  rejected: "Respinse",
  cancelled: "Anulate",
  no_show: "No-show",
};

const tooltipStyle = {
  background: "#1A0A0D",
  border: "1px solid rgba(201,168,76,0.2)",
  borderRadius: "8px",
  color: "#FAF6EE",
  fontSize: "12px",
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    const secret = sessionStorage.getItem("analytics_secret");
    if (!secret) {
      router.push("/analytics/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/analytics", {
        headers: { "x-analytics-secret": secret },
      });

      if (res.status === 401) {
        sessionStorage.removeItem("analytics_secret");
        router.push("/analytics/login");
        return;
      }

      if (!res.ok) throw new Error("Server error");

      const json = await res.json();
      setData(json);
      setError("");
    } catch {
      setError("Eroare la încărcarea datelor.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Redirect if no secret on mount
  useEffect(() => {
    if (!sessionStorage.getItem("analytics_secret")) {
      router.push("/analytics/login");
    }
  }, [router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0D0D0D" }}
      >
        <div className="text-center">
          <Logo size="sm" />
          <p className="mt-6 text-sm" style={{ color: "rgba(250,246,238,0.4)" }}>
            Se încarcă datele...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0D0D0D" }}
      >
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: "#FF6B6B" }}>
            {error}
          </p>
          <button className="btn-primary" onClick={fetchData}>
            Reîncearcă
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const reservationChartData = Object.entries(data.reservations.by_status).map(
    ([status, count]) => ({
      name: STATUS_LABELS[status] ?? status,
      count,
      status,
    })
  );

  return (
    <div className="min-h-screen" style={{ background: "#0D0D0D" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-6 h-14 flex items-center justify-between border-b"
        style={{
          background: "rgba(13,13,13,0.9)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(250,246,238,0.06)",
        }}
      >
        <Logo size="sm" />
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(250,246,238,0.3)" }}>
            Analytics Admin
          </span>
          <button
            className="text-xs btn-ghost-dark"
            style={{ padding: "6px 14px" }}
            onClick={fetchData}
          >
            ↻ Actualizează
          </button>
          <button
            className="text-xs"
            style={{ color: "rgba(250,246,238,0.3)" }}
            onClick={() => {
              sessionStorage.removeItem("analytics_secret");
              router.push("/analytics/login");
            }}
          >
            Ieși
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Last updated */}
        <p className="text-xs" style={{ color: "rgba(250,246,238,0.25)" }}>
          Date actualizate la:{" "}
          {new Date(data.generated_at).toLocaleString("ro-RO")}
        </p>

        {/* ── ROW 1: Utilizatori ── */}
        <section>
          <h2
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#C9A84C" }}
          >
            Utilizatori
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total înregistrați" value={data.users.total} />
            <StatCard
              label="Noi în 7 zile"
              value={data.users.new_7d}
              color="#4ADE80"
            />
            <StatCard
              label="Vinuri în BD"
              value={data.content.wines}
              sub="scanate + adăugate"
            />
            <StatCard
              label="Recenzii vinuri"
              value={data.content.reviews}
            />
          </div>
        </section>

        {/* ── ROW 2: Scanări + Locații ── */}
        <section>
          <h2
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#C9A84C" }}
          >
            Scanări OCR & Locații
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total scanări OCR" value={data.scans.total} />
            <StatCard
              label="Vin identificat"
              value={data.scans.with_wine}
              sub={`${data.scans.success_rate}% rată succes`}
              color="#4ADE80"
            />
            <StatCard
              label="Crame în BD"
              value={data.locations.total}
              sub={`${data.locations.claimed} cu owner`}
            />
            <StatCard
              label="Crame nevendicate"
              value={data.locations.unclaimed}
              sub="fără proprietar setat"
              color="#FF6B6B"
            />
          </div>
        </section>

        {/* ── ROW 3: Rezervări + Revenue ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rezervari chart */}
          <section className="p-6" style={{ background: "rgba(250,246,238,0.04)", border: "1px solid rgba(250,246,238,0.08)", borderRadius: "16px" }}>
            <h2
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: "#C9A84C" }}
            >
              Rezervări
            </h2>
            <p className="font-title text-3xl font-bold mb-6" style={{ color: "#FAF6EE" }}>
              {data.reservations.total}
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={reservationChartData} barSize={28}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "rgba(250,246,238,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "rgba(250,246,238,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(250,246,238,0.03)" }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {reservationChartData.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={STATUS_COLORS[entry.status] ?? "#C9A84C"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* Revenue chart */}
          <section className="p-6" style={{ background: "rgba(250,246,238,0.04)", border: "1px solid rgba(250,246,238,0.08)", borderRadius: "16px" }}>
            <h2
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: "#C9A84C" }}
            >
              Venituri facturare (€)
            </h2>
            <p className="font-title text-3xl font-bold mb-6" style={{ color: "#FAF6EE" }}>
              {data.revenue.current_month.toFixed(2)}€{" "}
              <span
                className="font-body text-sm font-normal"
                style={{ color: "rgba(250,246,238,0.4)" }}
              >
                luna curentă
              </span>
            </p>
            {data.revenue.monthly_history.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.revenue.monthly_history}>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "rgba(250,246,238,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "rgba(250,246,238,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: unknown) => [`${Number(v).toFixed(2)}€`, "Venituri"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#C9A84C"
                    strokeWidth={2}
                    dot={{ fill: "#C9A84C", strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5, fill: "#C9A84C" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div
                className="h-[200px] flex items-center justify-center text-sm"
                style={{ color: "rgba(250,246,238,0.25)" }}
              >
                Nu există date de facturare încă
              </div>
            )}
          </section>
        </div>

        {/* ── ROW 4: Rute AI + Postari ── */}
        <section>
          <h2
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#C9A84C" }}
          >
            AI Concierge & Conținut social
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total rute"
              value={data.routes.total}
              sub="predefinite + AI"
            />
            <StatCard
              label="Rute generate AI"
              value={data.routes.ai_generated}
              sub="prin AI Concierge"
              color="#4ADE80"
            />
            <StatCard label="Postări feed social" value={data.content.posts} />
            <StatCard
              label="Campanii active"
              value={data.campaigns.length}
              sub="cu tracking activ"
            />
          </div>
        </section>

        {/* ── Campanii table ── */}
        {data.campaigns.length > 0 && (
          <section className="card-vyno p-6">
            <h2
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: "#C9A84C" }}
            >
              Performanță campanii promoționale
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(250,246,238,0.08)" }}>
                    {["Campanie", "Views", "Clicks", "Redeems", "CTR", "Conv. rate"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left pb-3 pr-6 text-xs uppercase tracking-widest font-normal"
                          style={{ color: "rgba(250,246,238,0.4)" }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.campaigns.map((c) => (
                    <tr
                      key={c.id}
                      style={{ borderBottom: "1px solid rgba(250,246,238,0.04)" }}
                    >
                      <td
                        className="py-3 pr-6 font-medium"
                        style={{ color: "#FAF6EE" }}
                      >
                        {c.title}
                      </td>
                      <td className="py-3 pr-6" style={{ color: "rgba(250,246,238,0.6)" }}>
                        {c.views}
                      </td>
                      <td className="py-3 pr-6" style={{ color: "rgba(250,246,238,0.6)" }}>
                        {c.clicks}
                      </td>
                      <td className="py-3 pr-6" style={{ color: "#4ADE80" }}>
                        {c.redeems}
                      </td>
                      <td className="py-3 pr-6" style={{ color: "#C9A84C" }}>
                        {c.views > 0
                          ? `${Math.round((c.clicks / c.views) * 100)}%`
                          : "—"}
                      </td>
                      <td className="py-3" style={{ color: "#C9A84C" }}>
                        {c.clicks > 0
                          ? `${Math.round((c.redeems / c.clicks) * 100)}%`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Footer */}
        <div
          className="pb-8 text-xs text-center"
          style={{ color: "rgba(250,246,238,0.15)" }}
        >
          VYNO Analytics · Panou intern · Acces restricționat
        </div>
      </main>
    </div>
  );
}
