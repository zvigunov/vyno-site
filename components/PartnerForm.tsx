"use client";

import { useState } from "react";
import { Wine } from "lucide-react";

const REGIONS = [
  "Dealu Mare (Muntenia)",
  "Moldova (Bacău, Iași, Vrancea)",
  "Dobrogea",
  "Oltenia",
  "Banat",
  "Transilvania",
  "Crișana & Maramureș",
  "Republica Moldova",
  "Altă regiune / necunoscut",
];

const PACKAGES = [
  { value: "launch_offer", label: "Ofertă lansare — 12 luni gratuit (primele 100 crame)" },
  { value: "basic",        label: "Basic — 49€/lună" },
  { value: "standard",     label: "Standard — 99€/lună" },
  { value: "premium",      label: "Premium — 199€/lună" },
];

interface FormState {
  winery_name: string;
  email: string;
  phone: string;
  region: string;
  package: string;
  notes: string;
}

const INITIAL: FormState = {
  winery_name: "",
  email: "",
  phone: "",
  region: "",
  package: "launch_offer",
  notes: "",
};

const inputStyle = {
  background: "rgba(13,13,13,0.04)",
  border: "1px solid rgba(13,13,13,0.12)",
  color: "#0D0D0D",
  borderRadius: "12px",
  padding: "12px 16px",
  width: "100%",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.15s",
} as const;

const focusStyle = { borderColor: "rgba(201,168,76,0.6)" };
const blurStyle  = { borderColor: "rgba(13,13,13,0.12)" };

export function PartnerForm() {
  const [form, setForm]       = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/partner-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Eroare necunoscută. Încearcă din nou.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Eroare de conexiune. Verifică internetul și încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <Wine size={40} strokeWidth={1} style={{ color: "#C9A84C", margin: "0 auto 24px" }} />
        <h3
          className="font-title text-3xl font-semibold mb-3"
          style={{ color: "#4A1219" }}
        >
          Cerere trimisă cu succes!
        </h3>
        <p className="text-base mb-2" style={{ color: "rgba(13,13,13,0.65)" }}>
          Mulțumim că ai ales VYNO. Te vom contacta în maximum 48 de ore la{" "}
          <span style={{ color: "#4A1219" }}>{form.email}</span>.
        </p>
        <p className="text-sm" style={{ color: "rgba(13,13,13,0.38)" }}>
          Pregătim tot ce ai nevoie pentru a apărea în aplicație.
        </p>
        <button
          className="btn-ghost mt-8"
          onClick={() => { setSuccess(false); setForm(INITIAL); }}
        >
          Trimite altă cerere
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Nume crama */}
        <div>
          <label
            className="block text-xs uppercase tracking-widest mb-2"
            style={{ color: "rgba(13,13,13,0.4)" }}
          >
            Numele cramei <span style={{ color: "#4A1219" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="ex. Crama Rotenberg"
            value={form.winery_name}
            onChange={(e) => set("winery_name", e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
          />
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-xs uppercase tracking-widest mb-2"
            style={{ color: "rgba(13,13,13,0.4)" }}
          >
            Email de contact <span style={{ color: "#4A1219" }}>*</span>
          </label>
          <input
            type="email"
            placeholder="proprietar@crama.ro"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
          />
        </div>

        {/* Telefon */}
        <div>
          <label
            className="block text-xs uppercase tracking-widest mb-2"
            style={{ color: "rgba(13,13,13,0.4)" }}
          >
            Telefon <span style={{ color: "rgba(13,13,13,0.25)" }}>(opțional)</span>
          </label>
          <input
            type="tel"
            placeholder="+40 7xx xxx xxx"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
          />
        </div>

        {/* Regiune */}
        <div>
          <label
            className="block text-xs uppercase tracking-widest mb-2"
            style={{ color: "rgba(13,13,13,0.4)" }}
          >
            Regiunea viticolă <span style={{ color: "rgba(13,13,13,0.25)" }}>(opțional)</span>
          </label>
          <select
            value={form.region}
            onChange={(e) => set("region", e.target.value)}
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23C9A84C' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: "36px",
            }}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
          >
            <option value="" style={{ background: "#FAF6EE" }}>Selectează regiunea...</option>
            {REGIONS.map((r) => (
              <option key={r} value={r} style={{ background: "#FAF6EE" }}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pachet de interes */}
      <div className="mb-4">
        <label
          className="block text-xs uppercase tracking-widest mb-3"
          style={{ color: "rgba(13,13,13,0.4)" }}
        >
          Pachet de interes
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {PACKAGES.map((p) => {
            const selected = form.package === p.value;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => set("package", p.value)}
                className="text-left text-sm px-4 py-3 rounded-xl transition-all"
                style={{
                  background: selected ? "rgba(74,18,25,0.08)" : "rgba(13,13,13,0.03)",
                  border: selected
                    ? "1px solid rgba(74,18,25,0.35)"
                    : "1px solid rgba(13,13,13,0.09)",
                  color: selected ? "#4A1219" : "rgba(13,13,13,0.5)",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mesaj */}
      <div className="mb-6">
        <label
          className="block text-xs uppercase tracking-widest mb-2"
          style={{ color: "rgba(13,13,13,0.4)" }}
        >
          Întrebări sau mesaj <span style={{ color: "rgba(13,13,13,0.25)" }}>(opțional)</span>
        </label>
        <textarea
          placeholder="Orice detalii relevante despre cramă sau întrebări despre colaborare..."
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
        />
      </div>

      {error && (
        <p className="mb-4 text-sm" style={{ color: "#FF6B6B" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-base"
        style={{
          padding: "14px 24px",
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Se trimite cererea..." : "Trimite cerere de parteneriat →"}
      </button>

      <p className="mt-4 text-xs text-center" style={{ color: "rgba(13,13,13,0.28)" }}>
        Te contactăm în maximum 48 de ore · Fără angajament
      </p>
    </form>
  );
}
