import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_PACKAGES = ["launch_offer", "basic", "standard", "premium"] as const;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request invalid." }, { status: 400 });
  }

  const { winery_name, email, phone, region, package: pkg, notes } = body as Record<string, string>;

  if (!winery_name?.trim()) {
    return NextResponse.json({ error: "Numele cramei este obligatoriu." }, { status: 400 });
  }
  if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Adresa de email nu este validă." }, { status: 400 });
  }

  const packageValue = VALID_PACKAGES.includes(pkg as (typeof VALID_PACKAGES)[number])
    ? pkg
    : "launch_offer";

  const { error } = await supabaseAdmin.from("partner_requests").insert({
    winery_name: winery_name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    region: region || null,
    package: packageValue,
    notes: notes?.trim() || null,
  });

  if (error) {
    console.error("[partner-request] insert error:", error.message);
    return NextResponse.json(
      { error: "Eroare la salvarea cererii. Încearcă din nou." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
