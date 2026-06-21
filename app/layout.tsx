import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VYNO — Turism Vitivinicol România & Moldova",
  description:
    "Descoperă cramele și vinurile României. Rute personalizate cu AI, rezervări, Wine Passport, scanner etichete și Somelier AI.",
  keywords: ["vin Romania", "turism vitivinicol", "crame Romania", "wine app", "VYNO"],
  openGraph: {
    title: "VYNO — Turism Vitivinicol",
    description: "Aplicația mobilă pentru iubitorii de vin din România și Moldova.",
    type: "website",
    locale: "ro_RO",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
