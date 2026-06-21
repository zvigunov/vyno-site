"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function AnalyticsLogin() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Testam secretul direct catre API
    try {
      const res = await fetch("/api/analytics", {
        headers: { "x-analytics-secret": secret },
      });

      if (res.ok) {
        // Salvam secretul in sessionStorage (doar pentru sesiunea curenta)
        sessionStorage.setItem("analytics_secret", secret);
        router.push("/analytics");
      } else {
        setError("Parolă incorectă. Încearcă din nou.");
      }
    } catch {
      setError("Eroare de conexiune. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#0D0D0D" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(74,18,25,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-10">
          <Logo size="md" />
        </div>

        <div className="card-gold p-8">
          <h1
            className="font-title text-2xl font-semibold text-center mb-1"
            style={{ color: "#FAF6EE" }}
          >
            Panou Analytics
          </h1>
          <p
            className="text-sm text-center mb-8"
            style={{ color: "rgba(250,246,238,0.4)" }}
          >
            Acces restricționat · Admin VYNO
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: "rgba(250,246,238,0.4)" }}
              >
                Parolă acces
              </label>
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(250,246,238,0.05)",
                  border: "1px solid rgba(250,246,238,0.12)",
                  color: "#FAF6EE",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(201,168,76,0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(250,246,238,0.12)";
                }}
              />
            </div>

            {error && (
              <p className="text-sm" style={{ color: "#FF6B6B" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Se verifică..." : "Intră în panou"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
