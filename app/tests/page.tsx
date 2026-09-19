import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FlaskConical } from "lucide-react";
import { TestDirectory } from "@/components/test-directory";
import { JsonLd } from "@/components/json-ld";
import { CENTRE_INFO } from "@/data/centre";
import { TESTS } from "@/data/tests";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PAGE_TITLE = "Diagnostic Tests in Silchar — Blood Tests, X-ray, USG, ECG";
const PAGE_DESCRIPTION = `Blood tests, digital X-ray, ultrasound (USG), ECG and endoscopy at ${CENTRE_INFO.name}, Ghungoor (opp. SMCH), Silchar. See test rates, fasting rules and report times.`;

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/tests",
});

export default function TestsPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({
            path: "/tests",
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            items: TESTS.map((t) => ({ name: t.name, path: `/tests/${t.slug}` })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tests", path: "/tests" },
          ]),
        ]}
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

