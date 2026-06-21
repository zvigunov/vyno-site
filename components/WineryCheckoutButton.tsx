"use client";

import { useState } from "react";

interface Props {
  plan: "basic" | "standard" | "premium";
}

export function WineryCheckoutButton({ plan }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");

    try {
      const res  = await fetch("/api/checkout/winery", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ plan }),
      });
      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Eroare Stripe. Încearcă din nou.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Eroare de conexiune.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px 16px",
          fontSize: "12px",
          background: "transparent",
          border: "none",
          color: loading ? "rgba(13,13,13,0.3)" : "rgba(201,168,76,0.8)",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "var(--font-inter, sans-serif)",
          letterSpacing: "0.3px",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {loading ? "Se deschide Stripe..." : "Sau plătește direct cu cardul →"}
      </button>
      {error && (
        <p style={{ fontSize: "11px", color: "#FF6B6B", textAlign: "center", marginTop: "4px", fontFamily: "var(--font-inter, sans-serif)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
