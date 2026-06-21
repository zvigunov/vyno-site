import Link from "next/link";
import { Download, Smartphone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SiteNav } from "@/components/SiteNav";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const CORMORANT: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
};
const INTER: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif",
};

// ── Date ──────────────────────────────────────────────────────────────────────

const features = [
  {
    num: "01",
    title: "Rute personalizate cu AI",
    desc: "Descrie unde vrei să mergi, câte zile ai și ce preferințe ai — AI-ul VYNO generează un traseu complet, pas cu pas, cu crame, cazare și experiențe gastronomice.",
  },
  {
    num: "02",
    title: "Concierge AI",
    desc: "Asistent bazat pe Claude AI care planifică itinerarii complete: crame, experiențe, cazare — adaptat bugetului și gusturilor tale. Disponibil 24/7.",
  },
  {
    num: "03",
    title: "Wine Passport",
    desc: "Câștigă insigne pentru fiecare cramă vizitată, regiune explorată sau vin gustat. Construiește un profil gustativ unic și arată-l comunității.",
  },
  {
    num: "04",
    title: "Scanner etichete",
    desc: "Fotografiază orice etichetă — OCR + Google Vision identifică vinul instant. Dacă nu există în baza noastră, îl adaugi tu și contribui la comunitate.",
  },
  {
    num: "05",
    title: "Somelier AI",
    desc: "Conversații naturale cu un somelier virtual: explicații despre soiuri, pairinguri culinare, istoria vinului și recomandări personalizate pe gustul tău.",
  },
  {
    num: "06",
    title: "Calendar Vitivinicol",
    desc: "Festivaluri de vin, concursuri internaționale, lansări de colecții, zile porți deschise — toate evenimentele din România și Moldova, la un loc.",
  },
];

const featureSplit = [
  { title: "Rute cu AI Concierge",  desc: "Itinerariu complet generat în câteva secunde." },
  { title: "Wine Passport",         desc: "Colecție personală, insigne, profil gustativ." },
  { title: "Scanner etichete",      desc: "OCR + Google Vision: identificare instantă." },
  { title: "Somelier AI",           desc: "Răspunsuri în timp real despre orice vin." },
  { title: "Calendar vitivinicol",  desc: "Festivaluri, concursuri, lansări — toată România." },
];

const steps = [
  { num: "01", title: "Descarcă aplicația",          desc: "Disponibil pe Android acum. iOS în curând pe App Store." },
  { num: "02", title: "Explorează România viticolă", desc: "Crame, regiuni, soiuri, rute predefinite — toate pe hartă interactivă." },
  { num: "03", title: "Rezervă experiențe",          desc: "Degustări, tururi, cine speciale — direct din aplicație, confirmat în timp real." },
  { num: "04", title: "Colecționează și câștigă",    desc: "Construiește-ți colecția de vinuri, câștigă insigne și devino expert în comunitate." },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <ScrollAnimations />
      <SiteNav />

      {/* ══ 1. HERO SPLIT — text stânga / imagine podgorie dreapta ══ */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          background: "#FAF6EE",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Jumătatea stângă — text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 clamp(40px, 7vw, 90px)",
            position: "relative",
          }}
        >
          {/* Linie verticală burgundy */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "clamp(18px, 3vw, 32px)",
              top: "28%",
              width: "1px",
              height: "44vh",
              background: "rgba(74,18,25,0.18)",
            }}
          />

          <div style={{ paddingBottom: "6vh" }}>
            <div className="vy-open">
              <Logo size="xl" variant="light" />
            </div>

            <p
              className="vy-open vy-delay-2"
              style={{
                ...CORMORANT,
                fontStyle: "italic",
                fontSize: "clamp(16px, 1.8vw, 22px)",
                color: "rgba(13,13,13,0.38)",
                marginTop: "24px",
                lineHeight: 1.65,
                letterSpacing: "0.01em",
              }}
            >
              România are 8 regiuni viticole.<br />
              Câte ai simțit?
            </p>

            <a
              href="#editorial"
              className="vy-open vy-delay-4"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "48px",
                textDecoration: "none",
                color: "rgba(13,13,13,0.3)",
              }}
            >
              <span style={{ ...INTER, fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase" }}>
                Descoperă
              </span>
              <div style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.5)" }} />
            </a>
          </div>
        </div>

        {/* Jumătatea dreaptă — imagine podgorie (placeholder warm) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="/images/hero-vineyard.png"
            alt="Podgorie românească la apus"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Overlay de blending pe marginea stângă */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #FAF6EE 0%, rgba(250,246,238,0.2) 20%, transparent 42%)",
            }}
          />
        </div>

        {/* Indicator scroll vertical — dreapta jos */}
        <div
          className="vy-open vy-delay-4"
          style={{
            position: "absolute",
            right: "clamp(16px, 2vw, 28px)",
            bottom: "clamp(24px, 4vh, 48px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{ width: "1px", height: "52px", background: "rgba(74,18,25,0.2)" }} />
          <span
            style={{
              ...INTER,
              writingMode: "vertical-rl",
              fontSize: "8px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(13,13,13,0.18)",
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ══ 2. DECLARAȚIE EDITORIALĂ ══ */}
      <section
        id="editorial"
        style={{
          paddingTop: "clamp(80px, 14vh, 160px)",
          paddingBottom: "clamp(60px, 10vh, 120px)",
          paddingLeft: "clamp(24px, 20vw, 280px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          background: "#FAF6EE",
        }}
      >
        <div
          data-animate="fade-left"
          style={{
            width: "160px",
            height: "1px",
            background: "rgba(201,168,76,0.5)",
            marginBottom: "40px",
          }}
        />

        <h2
          data-animate="fade-up"
          style={{
            ...CORMORANT,
            fontSize: "clamp(32px, 4.8vw, 60px)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "#0D0D0D",
            maxWidth: "620px",
            letterSpacing: "-0.01em",
          }}
        >
          Fiecare vin spune povestea<br />
          locului din care vine.{" "}
          <em style={{ color: "#4A1219", fontStyle: "italic" }}>
            VYNO te duce acolo.
          </em>
        </h2>

        <p
          data-animate="fade-up"
          style={{
            ...INTER,
            fontSize: "15px",
            lineHeight: 1.85,
            color: "rgba(13,13,13,0.5)",
            maxWidth: "380px",
            marginTop: "32px",
            transitionDelay: "0.15s",
          }}
        >
          Nu e o aplicație de rețete de vin. E un ghid de călătorie pentru
          oameni curioși — cu gust format sau în formare. O cramă, un soi,
          o regiune pe care nu știai că vrei s-o descoperi.
        </p>
      </section>

      {/* ══ 3. STATISTICI — numere animate, burgundy pe cremă caldă ══ */}
      <section
        style={{
          borderTop: "1px solid rgba(13,13,13,0.07)",
          borderBottom: "1px solid rgba(13,13,13,0.07)",
          padding: "clamp(40px, 7vh, 80px) 0",
          background: "#F5EDE0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingLeft: "clamp(24px, 8vw, 100px)",
            paddingRight: "clamp(24px, 8vw, 100px)",
            flexWrap: "wrap",
            gap: "clamp(28px, 4vw, 56px)",
          }}
        >
          {[
            { target: 6,   suffix: "",  label: "crame partenere", size: "clamp(54px, 9vw, 96px)" },
            { target: 2,   suffix: "",  label: "țări viticole",   size: "clamp(44px, 7vw, 78px)" },
            { target: 100, suffix: "+", label: "vinuri catalogate",size: "clamp(38px, 6vw, 66px)" },
          ].map(({ target, suffix, label, size }, i) => (
            <div key={label} data-animate="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div style={{ ...CORMORANT, fontSize: size, fontWeight: 700, color: "#4A1219", lineHeight: 1 }}>
                <AnimatedCounter target={target} suffix={suffix} />
              </div>
              <p style={{ ...INTER, fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(13,13,13,0.32)", marginTop: "12px" }}>
                {label}
              </p>
            </div>
          ))}

          {/* AI — italic, element tipografic */}
          <div data-animate="fade-up" style={{ transitionDelay: "0.3s" }}>
            <div style={{ ...CORMORANT, fontSize: "clamp(32px, 5vw, 60px)", fontStyle: "italic", color: "#4A1219", lineHeight: 1 }}>
              AI
            </div>
            <p style={{ ...INTER, fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(13,13,13,0.32)", marginTop: "12px" }}>
              rute generate
            </p>
          </div>
        </div>
      </section>

      {/* ══ 4. CE ESTE VYNO — text editorial stânga / imagine sticle dreapta ══ */}
      <section
        style={{
          display: "flex",
          minHeight: "70vh",
          overflow: "hidden",
          background: "#FAF6EE",
        }}
      >
        {/* Stânga: text + feature list */}
        <div
          style={{
            flex: "1.1",
            padding: "clamp(60px, 10vh, 120px) clamp(32px, 7vw, 100px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            data-animate="fade-right"
            style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", marginBottom: "28px" }}
          >
            Aplicația
          </p>

          <h2
            data-animate="fade-right"
            style={{
              ...CORMORANT,
              fontSize: "clamp(28px, 3.5vw, 46px)",
              fontWeight: 300,
              lineHeight: 1.2,
              color: "#0D0D0D",
              marginBottom: "24px",
              transitionDelay: "0.1s",
            }}
          >
            Explorează România<br />
            vitivinicolă cu un ghid{" "}
            <em style={{ color: "#4A1219" }}>inteligent.</em>
          </h2>

          <p
            data-animate="fade-right"
            style={{
              ...INTER,
              fontSize: "14px",
              lineHeight: 1.85,
              color: "rgba(13,13,13,0.48)",
              maxWidth: "360px",
              marginBottom: "40px",
              transitionDelay: "0.18s",
            }}
          >
            Crame reale, regiuni autentice, soiuri românești explicate pe
            înțelesul tuturor. Plus un concierge AI care îți planifică tot
            itinerariul — de la prima cramă până la rezervarea degustării.
          </p>

          {/* Feature list */}
          <div>
            {featureSplit.map((f, i) => (
              <div
                key={f.title}
                data-animate="fade-right"
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  paddingBottom: "16px",
                  marginBottom: "16px",
                  borderBottom: "1px solid rgba(13,13,13,0.06)",
                  transitionDelay: `${0.25 + i * 0.07}s`,
                }}
              >
                <span style={{ ...CORMORANT, color: "rgba(201,168,76,0.5)", fontSize: "14px", flexShrink: 0, marginTop: "2px" }}>—</span>
                <div>
                  <p style={{ ...INTER, fontSize: "13px", fontWeight: 500, color: "#0D0D0D", marginBottom: "3px" }}>{f.title}</p>
                  <p style={{ ...INTER, fontSize: "12px", color: "rgba(13,13,13,0.4)", lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dreapta: imagine sticle de vin (placeholder) */}
        <div
          style={{
            flex: "0.9",
            position: "relative",
            overflow: "hidden",
            minHeight: "400px",
          }}
        >
          <img
            src="/images/wine-detail.png"
            alt="Sticle de vin românesc"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #FAF6EE 0%, rgba(250,246,238,0.12) 18%, transparent 38%)",
            }}
          />
        </div>
      </section>

      {/* ══ 5. FEATURES DETALIATE — numere watermark, alternare L/R ══ */}
      <section
        id="features"
        style={{
          padding: "clamp(60px, 8vh, 100px) clamp(24px, 8vw, 100px)",
          background: "#F5EDE0",
        }}
      >
        <p
          data-animate="fade-up"
          style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", marginBottom: "clamp(40px, 6vh, 72px)" }}
        >
          În detaliu
        </p>

        <div style={{ maxWidth: "1100px" }}>
          {features.map(({ num, title, desc }, i) => (
            <div
              key={title}
              data-animate="fade-up"
              style={{
                position: "relative",
                paddingTop: "48px",
                paddingBottom: "48px",
                borderTop: "1px solid rgba(13,13,13,0.07)",
                display: "flex",
                justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                transitionDelay: `${(i % 3) * 0.08}s`,
              }}
            >
              {/* Număr watermark */}
              <span
                aria-hidden
                style={{
                  ...CORMORANT,
                  position: "absolute",
                  fontStyle: "italic",
                  fontSize: "clamp(80px, 13vw, 148px)",
                  fontWeight: 700,
                  color: "rgba(13,13,13,0.05)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  ...(i % 2 === 0 ? { right: 0 } : { left: 0 }),
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {num}
              </span>

              <div style={{ maxWidth: "500px", position: "relative", zIndex: 1 }}>
                <h3
                  style={{
                    ...CORMORANT,
                    fontSize: "clamp(22px, 2.8vw, 32px)",
                    fontWeight: 500,
                    color: "#0D0D0D",
                    marginBottom: "14px",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>
                <div style={{ width: "36px", height: "1px", background: "rgba(201,168,76,0.5)", marginBottom: "16px" }} />
                <p style={{ ...INTER, fontSize: "14px", lineHeight: 1.8, color: "rgba(13,13,13,0.48)" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
          <div style={{ height: "1px", background: "rgba(13,13,13,0.07)" }} />
        </div>
      </section>

      {/* ══ 6. CUM FUNCȚIONEAZĂ ══ */}
      <section
        style={{
          padding: "clamp(60px, 8vh, 100px) clamp(24px, 6vw, 80px)",
          background: "#FAF6EE",
        }}
      >
        <div
          className="steps-grid"
          style={{ maxWidth: "1100px", margin: "0 auto", gap: "clamp(40px, 6vw, 100px)" }}
        >
          {/* Stânga: titlu editorial */}
          <div>
            <h2
              data-animate="fade-right"
              style={{
                ...CORMORANT,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 300,
                lineHeight: 1.25,
                color: "#0D0D0D",
              }}
            >
              Patru pași<br />
              până la prima<br />
              degustare<br />
              <em style={{ color: "#4A1219" }}>rezervată.</em>
            </h2>
          </div>

          {/* Dreapta: pași */}
          <div>
            {steps.map((step, i) => (
              <div
                key={step.num}
                data-animate="fade-left"
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                  paddingTop: "22px",
                  paddingBottom: "22px",
                  borderBottom: "1px solid rgba(13,13,13,0.07)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <span style={{ ...INTER, fontSize: "10px", fontWeight: 500, color: "rgba(201,168,76,0.55)", letterSpacing: "2px", flexShrink: 0, paddingTop: "3px" }}>
                  {step.num}
                </span>
                <div>
                  <p style={{ ...INTER, fontSize: "14px", fontWeight: 500, color: "#0D0D0D", marginBottom: "5px" }}>{step.title}</p>
                  <p style={{ ...INTER, fontSize: "13px", color: "rgba(13,13,13,0.4)", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6b. IMAGINE PIVNIȚĂ — bandă cinematică plină înainte de Download ══ */}
      <div
        data-animate="fade-up"
        style={{
          height: "clamp(200px, 40vh, 480px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/cellar-barrels.png"
          alt="Pivniță cu butoaie de stejar"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Gradient overlay: blend spre cremă sus, spre negru jos (tranziție spre Download) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(250,246,238,0.12) 0%, transparent 18%, transparent 75%, rgba(13,13,13,0.45) 100%)",
          }}
        />
        {/* Text editorial suprapus pe imagine */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 clamp(32px, 8vw, 100px)",
          }}
        >
          <p
            style={{
              ...CORMORANT,
              fontStyle: "italic",
              fontSize: "clamp(22px, 3.5vw, 42px)",
              color: "rgba(250,246,238,0.55)",
              lineHeight: 1.3,
              maxWidth: "520px",
            }}
          >
            "Cea mai bună degustare<br />
            e cea care n-a fost planificată."
          </p>
        </div>
      </div>

      {/* ══ 7. DOWNLOAD — singura secțiune dark, finale dramatic ══ */}
      <section
        id="download"
        style={{
          padding: "clamp(80px, 14vh, 160px) 24px",
          textAlign: "center",
          background: "#0D0D0D",
        }}
      >
        <div data-animate="fade-up">
          <div
            style={{
              width: "56px",
              height: "1px",
              background: "rgba(201,168,76,0.4)",
              margin: "0 auto 52px",
            }}
          />

          <h2
            style={{
              ...CORMORANT,
              fontSize: "clamp(52px, 9vw, 88px)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#FAF6EE",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            Descarcă
            <br />
            <span style={{ color: "#C9A84C" }}>VYNO.</span>
          </h2>
        </div>

        <p
          data-animate="fade-up"
          style={{
            ...INTER,
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(250,246,238,0.2)",
            marginTop: "36px",
            marginBottom: "44px",
            transitionDelay: "0.15s",
          }}
        >
          Android disponibil acum · iOS în curând pe App Store
        </p>

        <div
          data-animate="fade-up"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            transitionDelay: "0.28s",
          }}
        >
          <a
            href="https://expo.dev/artifacts/eas/U67a-CtDtuH64K2-derz-P75iDT4ZsB9KVzVoOMCQiw.apk"
            className="btn-primary"
            style={{ padding: "14px 32px", fontSize: "14px" }}
          >
            <Download size={16} strokeWidth={1.5} />
            Download APK Android
          </a>
          <button
            disabled
            className="btn-ghost-dark"
            style={{ padding: "14px 32px", fontSize: "14px", opacity: 0.28, cursor: "not-allowed" }}
          >
            <Smartphone size={16} strokeWidth={1.5} />
            App Store — în curând
          </button>
        </div>
      </section>

      {/* ══ 8. PARTENERI TEASER ══ */}
      <section
        style={{
          padding: "clamp(40px, 6vh, 72px) clamp(24px, 6vw, 80px)",
          background: "#FAF6EE",
          borderTop: "1px solid rgba(13,13,13,0.06)",
          borderBottom: "1px solid rgba(13,13,13,0.06)",
        }}
      >
        <div
          data-animate="fade-up"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: "10px" }}>
              Parteneri
            </p>
            <h3
              style={{
                ...CORMORANT,
                fontSize: "clamp(22px, 3vw, 34px)",
                fontWeight: 300,
                color: "#0D0D0D",
                lineHeight: 1.2,
              }}
            >
              Ești proprietar de cramă?
              <br />
              <em style={{ color: "rgba(13,13,13,0.35)", fontSize: "0.82em" }}>
                Primele 100 de crame — 12 luni gratuit.
              </em>
            </h3>
          </div>
          <Link href="/partners" className="btn-primary" style={{ flexShrink: 0 }}>
            Devino partener →
          </Link>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0D0D0D", padding: "clamp(32px, 5vh, 56px) clamp(24px, 6vw, 80px)" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "32px",
            marginBottom: "28px",
          }}
        >
          <div>
            <Logo size="sm" variant="dark" />
            <p style={{ ...INTER, fontSize: "11px", color: "rgba(250,246,238,0.16)", marginTop: "12px" }}>
              © 2026 VYNO
            </p>
          </div>

          <nav style={{ display: "flex", gap: "28px", flexWrap: "wrap", alignItems: "center" }}>
            {[
              { label: "Parteneri", href: "/partners" },
              { label: "Premium", href: "/premium" },
              { label: "Confidențialitate", href: "/privacy" },
              { label: "Contact", href: "mailto:contact@vyno.ro" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline-dark"
                style={{ ...INTER, fontSize: "12px", color: "rgba(250,246,238,0.25)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{ height: "1px", background: "rgba(250,246,238,0.04)", maxWidth: "1100px", margin: "0 auto" }} />
      </footer>
    </>
  );
}
