import Link from "next/link";
import { Logo } from "@/components/Logo";

const CORMORANT: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
};
const INTER: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif",
};

export default function PremiumSuccess() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF6EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(40px, 8vh, 80px) 24px",
        textAlign: "center",
      }}
    >
      <Logo size="md" variant="light" />

      <div style={{ width: "48px", height: "1px", background: "rgba(201,168,76,0.5)", margin: "48px auto 48px" }} />

      <h1
        style={{
          ...CORMORANT,
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 300,
          color: "#0D0D0D",
          lineHeight: 1.1,
          marginBottom: "20px",
        }}
      >
        Bun venit în{" "}
        <em style={{ color: "#4A1219" }}>VYNO Premium.</em>
      </h1>

      <p style={{ ...INTER, fontSize: "15px", color: "rgba(13,13,13,0.5)", lineHeight: 1.75, maxWidth: "440px", marginBottom: "48px" }}>
        Abonamentul tău este activ. Deschide aplicația mobilă VYNO,
        conectează-te cu același email și vei avea acces imediat la toate
        funcționalitățile premium.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
        <a
          href="/vyno-app.apk"
          className="btn-primary"
          style={{ fontSize: "14px", padding: "14px 32px" }}
        >
          Descarcă aplicația Android →
        </a>
        <Link
          href="/"
          style={{ ...INTER, fontSize: "12px", color: "rgba(13,13,13,0.35)", textDecoration: "none", marginTop: "4px" }}
        >
          ← Înapoi la VYNO.ro
        </Link>
      </div>

      <p style={{ ...INTER, fontSize: "11px", color: "rgba(13,13,13,0.25)", marginTop: "64px", lineHeight: 1.7 }}>
        Vei primi o confirmare pe email de la Stripe.<br />
        Întrebări? <a href="mailto:contact@vyno.ro" style={{ color: "#C9A84C" }}>contact@vyno.ro</a>
      </p>
    </div>
  );
}
