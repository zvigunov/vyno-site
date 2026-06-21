"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { Logo } from "@/components/Logo";
import { ScrollAnimations } from "@/components/ScrollAnimations";

const CORMORANT: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
};
const INTER: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif",
};

const benefits = [
  {
    num: "01",
    title: "Scanări OCR nelimitate",
    free: "10 / lună",
    premium: "Nelimitat",
    desc: "Fotografiezi orice etichetă, oriunde, oricând. Fără limită lunară, fără întreruperi.",
  },
  {
    num: "02",
    title: "AI Concierge — itinerarii",
    free: "3 / lună",
    premium: "Nelimitat",
    desc: "Planifici câte rute vrei — weekend-uri spontane, vacanțe lungi, escapade de o zi.",
  },
  {
    num: "03",
    title: "Somelier AI",
    free: "5 întrebări / zi",
    premium: "Nelimitat",
    desc: "Conversații fără limită despre soiuri, pairinguri, istoria vinului și tot ce vrei să știi.",
  },
  {
    num: "04",
    title: "Wine Passport premium",
    free: "Insigne de bază",
    premium: "Insigne exclusive + rang",
    desc: "Insigne rare, ranguri în comunitate și un profil gustativ detaliat vizibil celorlalți.",
  },
  {
    num: "05",
    title: "Calendar vitivinicol complet",
    free: "Evenimente publice",
    premium: "Toate + notificări early access",
    desc: "Primești notificări cu o săptămână înainte pentru evenimentele cu locuri limitate.",
  },
  {
    num: "06",
    title: "Colecție & export",
    free: "Colecție online",
    premium: "Export PDF + backup complet",
    desc: "Exporti întreaga ta colecție de vinuri ca PDF imprimabil sau backup pentru arhivă.",
  },
];

const FREE_FEATURES = [
  "Hartă crame și regiuni",
  "Rezervări experiențe",
  "10 scanări OCR / lună",
  "3 rute AI / lună",
  "5 întrebări Somelier / zi",
  "Insigne de bază Wine Passport",
  "Evenimente publice calendar",
];

const PREMIUM_FEATURES = [
  "Tot ce e gratuit",
  "Scanări OCR nelimitate",
  "Rute AI nelimitate",
  "Somelier AI nelimitat",
  "Insigne exclusive + rang",
  "Early access evenimente",
  "Export colecție PDF",
];

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/premium", { method: "POST" });
      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Eroare la inițializarea plății. Încearcă din nou.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Eroare de conexiune. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ScrollAnimations />
      <SiteNav />

      {/* ── HERO ── */}
      <section
        style={{
          paddingTop: "clamp(100px, 16vh, 180px)",
          paddingBottom: "clamp(60px, 8vh, 100px)",
          paddingLeft: "clamp(24px, 14vw, 200px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          background: "#FAF6EE",
          position: "relative",
        }}
      >
        {/* Linie verticală burgundy */}
        <div style={{
          position: "absolute",
          left: "clamp(18px, 4vw, 52px)",
          top: "20%",
          width: "1px",
          height: "55%",
          background: "rgba(74,18,25,0.18)",
        }} />

        <p
          className="vy-open"
          style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", marginBottom: "28px" }}
        >
          VYNO Premium
        </p>

        <h1
          className="vy-open vy-delay-2"
          style={{
            ...CORMORANT,
            fontSize: "clamp(40px, 7vw, 82px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "#0D0D0D",
            maxWidth: "700px",
            letterSpacing: "-0.01em",
            marginBottom: "36px",
          }}
        >
          Vinul fiecărei<br />
          degustări,{" "}
          <em style={{ color: "#4A1219" }}>nelimitat.</em>
        </h1>

        {/* Prețul */}
        <div className="vy-open vy-delay-3" style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "36px" }}>
          <span style={{ ...CORMORANT, fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 700, color: "#4A1219", lineHeight: 1 }}>
            4,99€
          </span>
          <span style={{ ...INTER, fontSize: "14px", color: "rgba(13,13,13,0.38)" }}>/ lună</span>
          <span style={{ ...INTER, fontSize: "12px", color: "rgba(13,13,13,0.28)", marginLeft: "8px" }}>· Anulezi oricând</span>
        </div>

        <div className="vy-open vy-delay-4" style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "360px" }}>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="btn-primary"
            style={{ fontSize: "15px", padding: "15px 36px", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Se deschide Stripe..." : "Abonează-te la Premium →"}
          </button>
          {error && (
            <p style={{ ...INTER, fontSize: "12px", color: "#FF6B6B" }}>{error}</p>
          )}
          <p style={{ ...INTER, fontSize: "11px", color: "rgba(13,13,13,0.28)", lineHeight: 1.6 }}>
            Plată securizată prin Stripe · Card bancar · Fără angajament
          </p>
        </div>
      </section>

      {/* ── BENEFICII — lista editorială numerotată ── */}
      <section style={{ background: "#F5EDE0", padding: "clamp(60px, 8vh, 100px) clamp(24px, 8vw, 100px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            data-animate="fade-up"
            style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", marginBottom: "clamp(36px, 5vh, 60px)" }}
          >
            Ce primești
          </p>

          {benefits.map(({ num, title, free, premium, desc }, i) => (
            <div
              key={title}
              data-animate="fade-up"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                gap: "0 clamp(20px, 3vw, 40px)",
                alignItems: "start",
                paddingTop: "28px",
                paddingBottom: "28px",
                borderTop: "1px solid rgba(13,13,13,0.07)",
                transitionDelay: `${(i % 4) * 0.07}s`,
              }}
            >
              {/* Număr */}
              <span style={{ ...INTER, fontSize: "10px", letterSpacing: "2px", color: "rgba(201,168,76,0.5)", paddingTop: "3px", flexShrink: 0 }}>
                {num}
              </span>

              {/* Titlu + descriere */}
              <div>
                <p style={{ ...CORMORANT, fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 500, color: "#0D0D0D", marginBottom: "6px" }}>
                  {title}
                </p>
                <p style={{ ...INTER, fontSize: "13px", color: "rgba(13,13,13,0.45)", lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>

              {/* Gratuit */}
              <div style={{ textAlign: "right", minWidth: "90px" }}>
                <p style={{ ...INTER, fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(13,13,13,0.28)", marginBottom: "4px" }}>Gratuit</p>
                <p style={{ ...INTER, fontSize: "12px", color: "rgba(13,13,13,0.42)" }}>{free}</p>
              </div>

              {/* Premium */}
              <div style={{ textAlign: "right", minWidth: "110px" }}>
                <p style={{ ...INTER, fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(74,18,25,0.5)", marginBottom: "4px" }}>Premium</p>
                <p style={{ ...INTER, fontSize: "12px", fontWeight: 600, color: "#4A1219" }}>{premium}</p>
              </div>
            </div>
          ))}

          <div style={{ height: "1px", background: "rgba(13,13,13,0.07)" }} />
        </div>
      </section>

      {/* ── COMPARAȚIE SIMPLĂ — Gratuit vs Premium ── */}
      <section style={{ padding: "clamp(60px, 8vh, 100px) clamp(24px, 8vw, 100px)", background: "#FAF6EE" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p
            data-animate="fade-up"
            style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", marginBottom: "36px" }}
          >
            Comparație planuri
          </p>

          <div
            data-animate="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "1px solid rgba(13,13,13,0.09)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Header Gratuit */}
            <div style={{ padding: "24px", borderRight: "1px solid rgba(13,13,13,0.07)" }}>
              <p style={{ ...INTER, fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(13,13,13,0.35)", marginBottom: "6px" }}>Gratuit</p>
              <p style={{ ...CORMORANT, fontSize: "28px", color: "#0D0D0D" }}>0€</p>
            </div>

            {/* Header Premium */}
            <div style={{ padding: "24px", background: "rgba(74,18,25,0.04)", borderTop: "2px solid #C9A84C" }}>
              <p style={{ ...INTER, fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(74,18,25,0.5)", marginBottom: "6px" }}>Premium</p>
              <p style={{ ...CORMORANT, fontSize: "28px", color: "#4A1219", fontWeight: 700 }}>4,99€<span style={{ fontSize: "14px", fontWeight: 300 }}>/lună</span></p>
            </div>

            {/* Feature rows */}
            {FREE_FEATURES.map((feat, i) => (
              <>
                <div
                  key={`f-${i}`}
                  style={{
                    padding: "14px 24px",
                    borderTop: "1px solid rgba(13,13,13,0.06)",
                    borderRight: "1px solid rgba(13,13,13,0.07)",
                  }}
                >
                  <span style={{ ...INTER, fontSize: "13px", color: "rgba(13,13,13,0.55)" }}>{feat}</span>
                </div>
                <div
                  key={`p-${i}`}
                  style={{
                    padding: "14px 24px",
                    borderTop: "1px solid rgba(13,13,13,0.06)",
                    background: "rgba(74,18,25,0.025)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ color: "#C9A84C", fontSize: "11px" }}>✦</span>
                  <span style={{ ...INTER, fontSize: "13px", color: "#0D0D0D", fontWeight: 500 }}>{PREMIUM_FEATURES[i]}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA DARK — finale ── */}
      <section
        style={{
          background: "#0D0D0D",
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 8vw, 100px)",
          textAlign: "center",
        }}
      >
        <div data-animate="fade-up" style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ width: "48px", height: "1px", background: "rgba(201,168,76,0.4)", margin: "0 auto 48px" }} />

          <h2
            style={{
              ...CORMORANT,
              fontSize: "clamp(40px, 6vw, 68px)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#FAF6EE",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Devino somelier<br />
            al propriei tale{" "}
            <span style={{ color: "#C9A84C" }}>colecții.</span>
          </h2>

          <p style={{ ...INTER, fontSize: "13px", color: "rgba(250,246,238,0.35)", lineHeight: 1.75, marginBottom: "40px" }}>
            Primești acces imediat după plată. Conectezi contul din aplicație<br />
            cu același email folosit la abonare.
          </p>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="btn-primary"
            style={{ fontSize: "15px", padding: "15px 36px", margin: "0 auto", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Se deschide Stripe..." : "Abonează-te — 4,99€/lună →"}
          </button>

          {error && (
            <p style={{ ...INTER, fontSize: "12px", color: "#FF6B6B", marginTop: "12px" }}>{error}</p>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0D0D0D", borderTop: "1px solid rgba(250,246,238,0.04)", padding: "clamp(28px, 4vh, 44px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <Logo size="sm" variant="dark" />
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/" className="link-underline-dark" style={{ ...INTER, fontSize: "12px", color: "rgba(250,246,238,0.25)" }}>Acasă</Link>
            <Link href="/partners" className="link-underline-dark" style={{ ...INTER, fontSize: "12px", color: "rgba(250,246,238,0.25)" }}>Parteneri</Link>
            <a href="mailto:contact@vyno.ro" className="link-underline-dark" style={{ ...INTER, fontSize: "12px", color: "rgba(250,246,238,0.25)" }}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
