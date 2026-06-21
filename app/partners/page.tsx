import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { PartnerForm } from "@/components/PartnerForm";
import { WineryCheckoutButton } from "@/components/WineryCheckoutButton";

export const metadata: Metadata = {
  title: "Devino partener VYNO — Pachete pentru crame",
  description:
    "Adaugă crama ta în aplicația VYNO. Primele 100 de crame: 12 luni gratuit. Pachete Basic, Standard și Premium.",
};

const CORMORANT: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
};
const INTER: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif",
};

const benefits = [
  {
    title: "Vizibilitate garantată",
    desc: "Crama ta apare pe hartă, în rezultatele de căutare și în recomandările AI — în fața utilizatorilor care caută exact ce oferi tu.",
  },
  {
    title: "Rezervări în timp real",
    desc: "Primești notificări instant la fiecare cerere de rezervare. Confirmi sau respecifici detaliile direct din dashboard.",
  },
  {
    title: "Dashboard complet",
    desc: "Gestionezi toate rezervările, facturile, campaniile și statisticile cramei dintr-un singur panou — mobil sau web.",
  },
  {
    title: "Campanii cu targeting AI",
    desc: "Ajungi la utilizatorii cu profilul gustativ potrivit pentru vinurile tale. Fără risipă de buget publicitar.",
  },
];

const packages = [
  {
    id: "basic",
    name: "Basic",
    price: 49,
    tagline: "Start în lumea VYNO",
    highlighted: false,
    features: [
      "Profil complet al cramei (descriere, facilități, galerie)",
      "Vizibil pe hartă și în căutare",
      "Maximum 3 experiențe active",
      "Sistem de rezervări cu notificări push",
      "Dashboard rezervări",
      "Suport email standard",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 99,
    tagline: "Cel mai ales de crame",
    highlighted: true,
    features: [
      "Tot ce include Basic",
      "Experiențe nelimitate",
      "Campanii promoționale cu cod promo",
      "Facturare automată (1€ / rezervare finalizată)",
      "Analytics cramă: rezervări, vizualizări, conversii",
      "Suport prioritar",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    tagline: "Maxim de vizibilitate",
    highlighted: false,
    features: [
      "Tot ce include Standard",
      "Featured în pagina principală VYNO",
      "Targeting avansat campanii (pe profil gustativ)",
      "Branding personalizat în aplicație",
      "Manager de cont dedicat VYNO",
      "Integrare calendar național evenimente",
    ],
  },
];

export default function PartnersPage() {
  return (
    <>
      <SiteNav />

      {/* ── HERO ── */}
      <section
        style={{
          paddingTop: "clamp(100px, 14vh, 160px)",
          paddingBottom: "clamp(60px, 8vh, 100px)",
          paddingLeft: "clamp(24px, 12vw, 160px)",
          paddingRight: "clamp(24px, 8vw, 100px)",
          background: "#FAF6EE",
          position: "relative",
        }}
      >
        {/* Linie verticală burgundy */}
        <div style={{
          position: "absolute",
          left: "clamp(20px, 5vw, 60px)",
          top: "20%",
          width: "1px",
          height: "50%",
          background: "rgba(74,18,25,0.18)",
        }} />

        <p style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "24px" }}>
          Parteneriate VYNO
        </p>
        <h1
          style={{
            ...CORMORANT,
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "#0D0D0D",
            maxWidth: "680px",
            marginBottom: "28px",
          }}
        >
          Adaugă crama ta{" "}
          <em style={{ color: "#4A1219" }}>în lumea VYNO.</em>
        </h1>
        <p
          style={{
            ...INTER,
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(13,13,13,0.55)",
            maxWidth: "480px",
            marginBottom: "36px",
          }}
        >
          Fii acolo unde sunt turiștii pasionați de vin. Rezervări, campanii, analytics —
          totul dintr-o singură platformă dedicată turismului vitivinicol.
        </p>
        <a href="#formular" className="btn-primary" style={{ fontSize: "14px" }}>
          Trimite cerere de parteneriat →
        </a>
      </section>

      {/* ── BENEFITS — editorial, fără carduri identice ── */}
      <section style={{ background: "#F5EDE0", padding: "clamp(60px, 8vh, 100px) clamp(24px, 8vw, 100px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "48px" }}>
            De ce să fii partener VYNO
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0" }}>
            {benefits.map((b, i) => (
              <div
                key={b.title}
                style={{
                  padding: "clamp(24px, 3vw, 40px)",
                  borderLeft: i > 0 ? "1px solid rgba(13,13,13,0.08)" : undefined,
                  borderTop: i > 1 ? "1px solid rgba(13,13,13,0.08)" : undefined,
                }}
              >
                <p
                  style={{
                    ...INTER,
                    fontSize: "9px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "rgba(201,168,76,0.6)",
                    marginBottom: "14px",
                  }}
                >
                  0{i + 1}
                </p>
                <h3
                  style={{
                    ...CORMORANT,
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 500,
                    color: "#0D0D0D",
                    marginBottom: "12px",
                    lineHeight: 1.2,
                  }}
                >
                  {b.title}
                </h3>
                <p style={{ ...INTER, fontSize: "13px", lineHeight: 1.75, color: "rgba(13,13,13,0.5)" }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFERTA DE LANSARE — secțiunea de contrast (burgundy) ── */}
      <section
        style={{
          background: "#4A1219",
          padding: "clamp(60px, 8vh, 100px) clamp(24px, 10vw, 140px)",
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <p style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "28px" }}>
            Ofertă de lansare limitată
          </p>
          <h2
            style={{
              ...CORMORANT,
              fontSize: "clamp(34px, 5.5vw, 66px)",
              fontWeight: 300,
              color: "#FAF6EE",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Primele{" "}
            <strong style={{ fontWeight: 700, color: "#C9A84C" }}>100 de crame</strong>{" "}
            beneficiază de{" "}
            <em style={{ color: "#C9A84C" }}>12 luni complet gratuit.</em>
          </h2>
          <p style={{ ...INTER, fontSize: "14px", lineHeight: 1.75, color: "rgba(250,246,238,0.55)", maxWidth: "480px", marginBottom: "36px" }}>
            Pachetul Standard (99€/lună) inclus fără costuri. Oferta expiră când se ocupă
            cele 100 de locuri sau la lansarea oficială a aplicației.
          </p>
          <a href="#formular" className="btn-primary" style={{ fontSize: "14px" }}>
            Revendică locul tău gratuit →
          </a>
        </div>
      </section>

      {/* ── PACHETE DE PRET ── */}
      <section style={{ padding: "clamp(60px, 8vh, 100px) clamp(24px, 6vw, 80px)", background: "#FAF6EE" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "clamp(40px, 5vh, 64px)" }}>
            <p style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "16px" }}>
              Abonamente
            </p>
            <h2
              style={{
                ...CORMORANT,
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 300,
                color: "#0D0D0D",
                marginBottom: "10px",
              }}
            >
              Pachete de abonament lunar
            </h2>
            <p style={{ ...INTER, fontSize: "13px", color: "rgba(13,13,13,0.4)" }}>
              Fără contract pe termen lung · Anulezi oricând
            </p>
          </div>

          {/* Layout asimetric — nu grid perfect egal */}
          <div style={{ display: "flex", gap: "0", borderTop: "1px solid rgba(13,13,13,0.08)" }}>
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                style={{
                  flex: pkg.highlighted ? "1.15" : "1",
                  padding: "clamp(28px, 3vw, 44px) clamp(20px, 2.5vw, 36px)",
                  borderRight: i < packages.length - 1 ? "1px solid rgba(13,13,13,0.08)" : undefined,
                  background: pkg.highlighted ? "rgba(74,18,25,0.04)" : "transparent",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {pkg.highlighted && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#C9A84C",
                    }}
                  />
                )}

                <p style={{ ...INTER, fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: pkg.highlighted ? "#C9A84C" : "rgba(13,13,13,0.35)", marginBottom: "12px" }}>
                  {pkg.tagline}
                </p>
                <h3 style={{ ...CORMORANT, fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 500, color: "#0D0D0D", marginBottom: "16px" }}>
                  {pkg.name}
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "28px" }}>
                  <span style={{ ...CORMORANT, fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 700, color: "#4A1219", lineHeight: 1 }}>
                    {pkg.price}€
                  </span>
                  <span style={{ ...INTER, fontSize: "12px", color: "rgba(13,13,13,0.38)" }}>/lună</span>
                </div>

                <div style={{ width: "36px", height: "1px", background: "rgba(201,168,76,0.4)", marginBottom: "24px" }} />

                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1, marginBottom: "28px" }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
                      <span style={{ color: pkg.highlighted ? "#C9A84C" : "rgba(201,168,76,0.5)", fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>✦</span>
                      <span style={{ ...INTER, fontSize: "13px", lineHeight: 1.55, color: "rgba(13,13,13,0.6)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#formular"
                  className={pkg.highlighted ? "btn-primary" : "btn-ghost"}
                  style={{ justifyContent: "center", fontSize: "13px" }}
                >
                  Contactează-ne →
                </a>
                {pkg.id !== "launch_offer" && (
                  <WineryCheckoutButton plan={pkg.id as "basic" | "standard" | "premium"} />
                )}
              </div>
            ))}
          </div>

          <p style={{ ...INTER, fontSize: "12px", color: "rgba(13,13,13,0.28)", marginTop: "20px", textAlign: "right" }}>
            * La lansare, primele 100 de crame primesc pachetul Standard gratuit timp de 12 luni.
          </p>
        </div>
      </section>

      {/* ── FORMULAR ── */}
      <section
        id="formular"
        style={{
          padding: "clamp(60px, 8vh, 100px) clamp(24px, 6vw, 80px)",
          background: "#F5EDE0",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{ ...INTER, fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "16px" }}>
            Primul pas
          </p>
          <h2
            style={{
              ...CORMORANT,
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 300,
              color: "#0D0D0D",
              marginBottom: "12px",
            }}
          >
            Trimite cererea de parteneriat
          </h2>
          <p style={{ ...INTER, fontSize: "13px", color: "rgba(13,13,13,0.45)", marginBottom: "40px", lineHeight: 1.7 }}>
            Completează formularul și te contactăm în 48 de ore.
            Nu e nevoie de Stripe sau card acum — discutăm mai întâi.
          </p>

          <div className="card-gold" style={{ padding: "clamp(28px, 4vw, 48px)" }}>
            <PartnerForm />
          </div>
        </div>
      </section>

      {/* ── FAQ minimal ── */}
      <section style={{ padding: "clamp(50px, 6vh, 80px) clamp(24px, 8vw, 100px)", background: "#FAF6EE" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <h2 style={{ ...CORMORANT, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 500, color: "#0D0D0D", marginBottom: "36px" }}>
            Întrebări frecvente
          </h2>
          {[
            {
              q: "Trebuie să plătesc acum?",
              a: "Nu. Trimite cererea și discutăm. Plata se va face prin card bancar (Stripe) când aplicația este gata pentru lansare.",
            },
            {
              q: "Crama mea apare deja în aplicație. Ce se întâmplă?",
              a: "Poate că am adăugat-o noi manual ca profil nevendicat. Prin parteneriat, revendici profilul și preiei controlul complet.",
            },
            {
              q: "Pot schimba pachetul mai târziu?",
              a: "Da, oricând. Upgrade sau downgrade fără penalizări — diferența se calculează proporțional.",
            },
            {
              q: "Sunt disponibil doar în Moldova. Funcționează?",
              a: "VYNO acoperă atât România cât și Republica Moldova. Cramele din ambele țări sunt binevenite.",
            },
          ].map((item, i) => (
            <div
              key={item.q}
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "1px solid rgba(13,13,13,0.07)",
                borderTop: i === 0 ? "1px solid rgba(13,13,13,0.07)" : undefined,
              }}
            >
              <p style={{ ...CORMORANT, fontSize: "clamp(16px, 1.8vw, 20px)", fontWeight: 500, color: "#0D0D0D", marginBottom: "8px" }}>
                {item.q}
              </p>
              <p style={{ ...INTER, fontSize: "13px", lineHeight: 1.75, color: "rgba(13,13,13,0.5)" }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#0D0D0D",
          padding: "clamp(32px, 5vh, 52px) clamp(24px, 6vw, 80px)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <p style={{ ...INTER, fontSize: "12px", color: "rgba(250,246,238,0.28)" }}>
            Întrebări?{" "}
            <a href="mailto:contact@vyno.ro" className="link-underline-dark" style={{ color: "#C9A84C" }}>
              contact@vyno.ro
            </a>
          </p>
          <Link href="/" className="link-underline-dark" style={{ ...INTER, fontSize: "12px", color: "rgba(250,246,238,0.25)" }}>
            ← Înapoi la VYNO.ro
          </Link>
        </div>
      </footer>
    </>
  );
}
