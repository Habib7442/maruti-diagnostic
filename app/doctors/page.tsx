import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Stethoscope } from "lucide-react";
import { DoctorDirectory } from "@/components/doctor-directory";
import { JsonLd } from "@/components/json-ld";
import { CENTRE_INFO } from "@/data/centre";
import { DOCTORS } from "@/data/doctors";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PAGE_TITLE = "Doctors in Silchar — 16 Specialists, Chamber Timings & Fees";
const PAGE_DESCRIPTION = `Find consulting doctors and OPD chamber timings at ${CENTRE_INFO.name}, Ghungoor (opp. SMCH), Silchar. Specialists across Neurosurgery, Medicine, Gynaecology, ENT, Orthopaedics, Paediatrics, Dermatology and Surgery.`;

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/doctors",
});

export default function DoctorsPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({
            path: "/doctors",
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            items: DOCTORS.map((d) => ({
              name: `${d.name} — ${d.specialty}`,
              path: `/doctors/${d.slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Doctors", path: "/doctors" },
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
              Doctors Directory
            </span>
          </nav>

          {/* Directory Title & Header */}
          <header className="mb-8 sm:mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
              <Stethoscope className="w-3.5 h-3.5 text-red" />
              <span>Chamber for 16 Specialists</span>
            </div>

            <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-4">
              Consulting medical specialists in Silchar
            </h1>

            <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
              Daily OPD chambers for experienced medical practitioners across 9 departments at Maruti Diagnostic Centre, Ghungoor (directly opposite SMCH). Browse schedules, qualifications, consultation fees, and book your visit.
            </p>
          </header>

          {/* Searchable Directory Grid */}
          <Suspense
            fallback={
              <div className="py-12 text-center text-ink-soft text-sm">
                Loading specialist directory...
              </div>
            }
          >
            <DoctorDirectory />
          </Suspense>
        </div>
      </div>
    </>
  );
}

