import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FlaskConical } from "lucide-react";
import { TestDirectory } from "@/components/test-directory";
import { CENTRE_INFO } from "@/data/centre";
import { TESTS } from "@/data/tests";

export const metadata: Metadata = {
  title: `Diagnostic Tests & Pathology Lab in Silchar | ${CENTRE_INFO.name}`,
  description: `Accurate blood tests, digital X-ray, ultrasound (USG), ECG, and endoscopy at ${CENTRE_INFO.name}, Ghungoor (opp. SMCH), Silchar. Check test costs, fasting rules, and turnaround times.`,
  keywords: [
    "diagnostic tests Silchar",
    "blood test Silchar",
    "pathology lab Silchar",
    "ultrasound Silchar",
    "digital X-ray Silchar",
    "thyroid test Silchar",
    "CBC test Silchar",
    "Maruti Diagnostic tests",
  ],
  alternates: {
    canonical: "https://marutidiagnostic.com/tests",
  },
  openGraph: {
    title: `Diagnostic Tests & Pathology Lab in Silchar | ${CENTRE_INFO.name}`,
    description: `Accurate pathology, digital X-ray, ultrasound (USG), and cardiac testing opposite SMCH, Ghungoor, Silchar.`,
    url: "https://marutidiagnostic.com/tests",
    type: "website",
    siteName: CENTRE_INFO.name,
  },
};

export default function TestsPage() {
  // ItemList Schema for tests directory
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Diagnostic Tests & Medical Scans at Maruti Diagnostic Centre Silchar",
    itemListElement: TESTS.map((test, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MedicalWebPage",
        name: test.name,
        description: test.shortDescription,
        url: `https://marutidiagnostic.com/tests/${test.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-paper min-h-screen py-6 sm:py-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-ink-soft mb-6"
          >
            <Link
              href="/"
              className="hover:text-ink transition-colors hover:underline"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-soft/70 shrink-0" />
            <span className="text-ink font-medium" aria-current="page">
              Tests & Investigations
            </span>
          </nav>

          {/* Directory Title & Header */}
          <header className="mb-8 sm:mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
              <FlaskConical className="w-3.5 h-3.5 text-red" />
              <span>Laboratory & Imaging Services</span>
            </div>

            <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-4">
              Diagnostic tests & clinical investigations in Silchar
            </h1>

            <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
              Automated clinical biochemistry, high-resolution sonography, digital radiography, and cardiology testing at Maruti Diagnostic Centre, Ghungoor (directly opposite SMCH). View test preparations, turnaround times, and book directly via WhatsApp.
            </p>
          </header>

          {/* Searchable Directory Grid */}
          <TestDirectory />
        </div>
      </div>
    </>
  );
}

