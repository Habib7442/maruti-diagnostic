import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { CENTRE_INFO } from "@/data/centre";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#F5F1EC",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://marutidiagnostic.com"),
  title: {
    default: `${CENTRE_INFO.name} — Trusted Diagnostics & Doctor Chamber in Silchar`,
    template: `%s | ${CENTRE_INFO.name}`,
  },
  description: `${CENTRE_INFO.name} at ${CENTRE_INFO.landmark}. Daily chamber for 16 medical specialists and high-precision pathology, digital X-ray, ultrasound (USG), ECG, and endoscopy.`,
  keywords: [
    "diagnostic centre Silchar",
    "doctor chamber Silchar",
    "blood test Silchar",
    "Ghungoor diagnostic",
    "SMCH Silchar doctors",
    "pathology lab Silchar",
    "ultrasound Silchar",
    "digital X-ray Silchar",
  ],
  authors: [{ name: CENTRE_INFO.name }],
  creator: CENTRE_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://marutidiagnostic.com",
    title: `${CENTRE_INFO.name} — Diagnostics & 16 Specialists in Silchar`,
    description: "Daily chamber for 16 medical specialists. Accurate pathology, digital X-ray, ultrasound, ECG, and endoscopy opposite SMCH, Ghungoor, Silchar.",
    siteName: CENTRE_INFO.name,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hankenGrotesk.variable} antialiased selection:bg-red/10 selection:text-red`}
    >
      <body className="min-h-screen bg-paper text-ink font-sans flex flex-col pb-16 md:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
