import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { CENTRE_INFO } from "@/data/centre";

export const metadata: Metadata = {
  title: `Book Doctor Appointment & Diagnostic Tests in Silchar | ${CENTRE_INFO.name}`,
  description: `Schedule an OPD consultation with 16 consulting specialists or book blood tests, digital X-ray, ultrasound (USG), and ECG at ${CENTRE_INFO.name}, Ghungoor, Silchar.`,
  keywords: [
    "book doctor appointment Silchar",
    "doctor chamber booking Ghungoor",
    "blood test booking Silchar",
    "ultrasound appointment Silchar",
    "Maruti Diagnostic booking",
  ],
  alternates: {
    canonical: "https://marutidiagnostic.com/booking",
  },
};

export default function BookingPage() {
  return (
    <div className="bg-paper min-h-screen py-6 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Book Appointment
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
            <Calendar className="w-3.5 h-3.5 text-red" />
            <span>Chamber & Test Scheduling</span>
          </div>

          <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-4">
            Schedule an appointment or diagnostic test
          </h1>

          <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
            Reserve your consultation with our 16 consulting doctors or book routine pathology, digital X-rays, and scans at our Ghungoor centre opposite SMCH.
          </p>
        </header>

        {/* Quick Call Emergency Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red/10 text-red flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-ink uppercase tracking-wider block">
                Need Immediate Token or Today&apos;s Chamber Confirmation?
              </span>
              <span className="text-xs text-ink-soft">
                Call our reception desk directly for live token status and visiting specialist updates.
              </span>
            </div>
          </div>

          <a
            href={`tel:${CENTRE_INFO.phones.primary}`}
            className="px-5 py-2.5 rounded-full bg-red hover:bg-red-deep text-white font-medium text-xs sm:text-sm transition-colors shrink-0 shadow-xs"
          >
            Call {CENTRE_INFO.phones.displayPrimary}
          </a>
        </div>

        {/* Booking Form (Suspense wrapped for useSearchParams) */}
        <div className="mb-12">
          <Suspense
            fallback={
              <div className="p-12 text-center bg-surface border border-line rounded-2xl text-ink-soft text-sm">
                Loading booking form...
              </div>
            }
          >
            <BookingForm />
          </Suspense>
        </div>

        {/* Trust & Transparency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-line">
          <div className="bg-surface border border-line rounded-xl p-5">
            <Clock className="w-5 h-5 text-red mb-3" />
            <h3 className="font-semibold text-ink text-sm mb-1.5">
              Daily Counter Tokens
            </h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Tokens are distributed daily at our reception counter. Online submissions help our staff reserve your consultation slot in advance.
            </p>
          </div>

          <div className="bg-surface border border-line rounded-xl p-5">
            <ShieldCheck className="w-5 h-5 text-blue mb-3" />
            <h3 className="font-semibold text-ink text-sm mb-1.5">
              Accurate On-site Lab
            </h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Fully automated blood analyzers, digital radiography, and high-resolution ultrasound available in the same facility.
            </p>
          </div>

          <div className="bg-surface border border-line rounded-xl p-5">
            <MapPin className="w-5 h-5 text-red mb-3" />
            <h3 className="font-semibold text-ink text-sm mb-1.5">
              Opposite SMCH Landmark
            </h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Conveniently located at SMC Point, Ghungoor, directly opposite Silchar Medical College & Hospital, behind Maruti Medical.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

