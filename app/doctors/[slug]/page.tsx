import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  MapPin,
  Award,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Activity,
  FileText,
  CalendarCheck,
} from "lucide-react";
import { DOCTORS, getDoctorBySlug, getAllDoctorSlugs, getRelatedDoctors } from "@/data/doctors";
import { CENTRE_INFO } from "@/data/centre";
import { DoctorAppointmentCard } from "@/components/doctor-appointment-card";
import { DoctorCard } from "@/components/doctor-card";

interface DoctorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Statically prerender all 16 doctor pages at build time
export async function generateStaticParams() {
  const slugs = getAllDoctorSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Dynamic SEO metadata per specialist
export async function generateMetadata({
  params,
}: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return {
      title: "Doctor Not Found | Maruti Diagnostic Centre",
    };
  }

  const title = `${doctor.name} — ${doctor.specialty} in Silchar | ${CENTRE_INFO.name}`;
  const description = `Consult ${doctor.name} (${doctor.qualifications.join(", ")}), ${doctor.specialty} at ${CENTRE_INFO.name}, Ghungoor, Silchar. Timings: ${doctor.chamberTiming}. Call ${CENTRE_INFO.phones.primary} to book consultation.`;

  return {
    title,
    description,
    keywords: [
      `${doctor.name} Silchar`,
      `${doctor.name}`,
      `${doctor.specialty} Silchar`,
      `${doctor.specialty} Ghungoor`,
      `best ${doctor.specialty.toLowerCase()} Silchar`,
      "doctor chamber Silchar",
      "Maruti Diagnostic Centre doctors",
      "SMCH Silchar doctor chamber",
    ],
    alternates: {
      canonical: `https://marutidiagnostic.com/doctors/${doctor.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://marutidiagnostic.com/doctors/${doctor.slug}`,
      type: "profile",
      siteName: CENTRE_INFO.name,
      images: doctor.photoUrl
        ? [
            {
              url: doctor.photoUrl,
              width: 800,
              height: 800,
              alt: `${doctor.name} - ${doctor.specialty} in Silchar`,
            },
          ]
        : undefined,
    },
  };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    notFound();
  }

  const relatedDoctors = getRelatedDoctors(doctor.id, doctor.department, 3);

  // JSON-LD Structured Data: Physician Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specialty,
    description: doctor.bio,
    image: doctor.photoUrl
      ? `https://marutidiagnostic.com${doctor.photoUrl}`
      : undefined,
    telephone: CENTRE_INFO.phones.primary,
    priceRange: doctor.fee ? `₹${doctor.fee}` : undefined,
    memberOf: {
      "@type": "MedicalClinic",
      name: CENTRE_INFO.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: CENTRE_INFO.address.streetAddress,
        addressLocality: CENTRE_INFO.address.addressLocality,
        addressRegion: CENTRE_INFO.address.addressRegion,
        postalCode: CENTRE_INFO.address.postalCode,
        addressCountry: CENTRE_INFO.address.addressCountry,
      },
      telephone: CENTRE_INFO.phones.primary,
      geo: {
        "@type": "GeoCoordinates",
        latitude: CENTRE_INFO.geo.latitude,
        longitude: CENTRE_INFO.geo.longitude,
      },
    },
    availableService: doctor.conditionsTreated.map((condition) => ({
      "@type": "MedicalProcedure",
      name: condition,
    })),
  };

  return (
    <>
      {/* Inject Physician JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-paper min-h-screen py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-ink-soft mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap"
          >
            <Link
              href="/"
              className="hover:text-ink transition-colors hover:underline"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-soft/70 shrink-0" />
            <Link
              href="/doctors"
              className="hover:text-ink transition-colors hover:underline"
            >
              Doctors
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-soft/70 shrink-0" />
            <span className="text-ink font-medium truncate" aria-current="page">
              {doctor.name}
            </span>
          </nav>

          {/* Top Profile Header Card */}
          <section className="bg-surface border border-line rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-8">
              {/* Doctor Avatar Portrait */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-line bg-paper shadow-xs">
                {doctor.photoUrl ? (
                  <Image
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    width={128}
                    height={128}
                    priority
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-3xl text-ink font-semibold bg-clay/40">
                    {doctor.name.replace(/^Dr\.\s*/, "").slice(0, 2)}
                  </div>
                )}
              </div>

              {/* Identity & Badges */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2.5">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      doctor.type === "daily"
                        ? "bg-red/10 text-red border border-red/20 font-semibold"
                        : "bg-paper text-ink-soft border border-line"
                    }`}
                  >
                    {doctor.type === "daily"
                      ? "Daily OPD Chamber"
                      : "Visiting Specialist"}
                  </span>

                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-paper border border-line text-ink-soft">
                    {doctor.department}
                  </span>

                  {doctor.registrationNo && (
                    <span className="text-xs font-normal px-2.5 py-1 rounded-full bg-paper/60 border border-line/80 text-ink-soft inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue" />
                      <span>
                        {doctor.registrationNo === "Verification pending"
                          ? "Reg. verification pending"
                          : `Reg. No: ${doctor.registrationNo}`}
                      </span>
                    </span>
                  )}
                </div>

                {/* Primary H1 for SEO */}
                <h1 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-ink leading-tight mb-2">
                  {doctor.name} — {doctor.specialty}, Silchar
                </h1>

                {/* Qualifications */}
                <p className="text-sm sm:text-base text-ink-soft font-normal flex flex-wrap items-center gap-1.5 mb-4">
                  <Award className="w-4 h-4 text-blue shrink-0" />
                  <span>{doctor.qualifications.join(" • ")}</span>
                </p>

                {/* Micro Meta Strip */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-ink-soft pt-3 border-t border-line/80">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-ink-soft shrink-0" />
                    <span className="text-ink font-medium">
                      {doctor.chamberTiming}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-ink-soft shrink-0" />
                    <span>Maruti Diagnostic, Ghungoor (Opp. SMCH)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Clinical Profile Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Doctor Biography & Clinical Background */}
              <section className="bg-surface border border-line rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
                  <Stethoscope className="w-5 h-5 text-red shrink-0" />
                  <h2 className="font-display font-medium text-xl sm:text-2xl text-ink">
                    About {doctor.name}
                  </h2>
                </div>

                <div className="prose prose-slate max-w-none text-ink/90 text-base sm:text-[17px] leading-relaxed space-y-4">
                  <p>{doctor.bio}</p>

                  <p>
                    Patients across Silchar, Hailakandi, Karimganj, and the
                    wider Barak Valley consult with {doctor.name} at Maruti
                    Diagnostic Centre for thorough clinical evaluations,
                    diagnostic interpretations, and individualised treatment
                    plans.
                  </p>
                </div>
              </section>

              {/* Conditions Treated / Clinical Focus */}
              <section className="bg-surface border border-line rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
                  <Activity className="w-5 h-5 text-red shrink-0" />
                  <h2 className="font-display font-medium text-xl sm:text-2xl text-ink">
                    Clinical Focus & Conditions Treated
                  </h2>
                </div>

                <p className="text-sm text-ink-soft mb-5">
                  Consult {doctor.name} at our Ghungoor chamber for medical
                  evaluation, second opinions, and management of the following
                  conditions:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.conditionsTreated.map((condition, index) => (
                    <div
                      key={index}
                      className="p-3.5 bg-paper rounded-xl border border-line flex items-center gap-2.5 text-sm font-medium text-ink hover:border-ink/30 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-red shrink-0" />
                      <span>{condition}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* How Chamber Consultations Work */}
              <section className="bg-surface border border-line rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
                  <CalendarCheck className="w-5 h-5 text-blue shrink-0" />
                  <h2 className="font-display font-medium text-xl sm:text-2xl text-ink">
                    How Consultations Work at Maruti Diagnostic
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-ink-soft">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-clay text-ink font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-ink font-medium block">
                        Token & Counter Registration
                      </strong>
                      <p className="text-xs leading-relaxed text-ink-soft mt-0.5">
                        Consultation tokens are allocated on a daily basis at
                        the front desk of Maruti Diagnostic Centre (SMC Point,
                        Ghungoor, directly opposite SMCH, behind Maruti
                        Medical). Patients can call ahead to confirm daily OPD
                        timings.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-clay text-ink font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-ink font-medium block">
                        Diagnostic Reports & On-site Testing
                      </strong>
                      <p className="text-xs leading-relaxed text-ink-soft mt-0.5">
                        If {doctor.name} advises diagnostic investigations (such
                        as blood pathology, digital X-rays, ultrasound, or ECG),
                        our integrated NABL-guided laboratory and imaging unit
                        can process tests on-site for prompt review.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-clay text-ink font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-ink font-medium block">
                        Prescription & Follow-up Care
                      </strong>
                      <p className="text-xs leading-relaxed text-ink-soft mt-0.5">
                        Receive your medical prescription, dosage schedule, and
                        recommended follow-up appointment timeline before
                        departure.
                      </p>
                    </div>
                  </div>
                </div>

                {/* On-site Pathology & Imaging Notice */}
                <div className="mt-6 p-4 rounded-xl bg-paper border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-ink block">
                        Need Diagnostic Tests Prescribed by {doctor.name}?
                      </span>
                      <span className="text-xs text-ink-soft">
                        Pathology, Digital X-Ray, USG, and ECG all under one
                        roof.
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/tests"
                    className="inline-flex items-center justify-center text-xs font-medium bg-surface hover:bg-ink hover:text-white border border-line px-4 py-2 rounded-full text-ink transition-colors shrink-0"
                  >
                    View Test Catalogue
                  </Link>
                </div>
              </section>

            </div>

            {/* Sticky Appointment & Booking Sidebar (4 Cols) */}
            <div className="lg:col-span-4">
              <DoctorAppointmentCard doctor={doctor} />
            </div>
          </div>

          {/* Related Specialists (Full width below appointment and bio columns) */}
          {relatedDoctors.length > 0 && (
            <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-line">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <h2 className="font-display font-medium text-2xl sm:text-3xl text-ink">
                    Other Consulting Specialists
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-soft mt-1">
                    Explore other trusted medical consultants practicing at Maruti Diagnostic Centre
                  </p>
                </div>
                <Link
                  href="/doctors"
                  className="text-xs sm:text-sm font-semibold text-red hover:text-red-deep hover:underline shrink-0"
                >
                  View all 16 doctors
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedDoctors.map((relDoc) => (
                  <DoctorCard key={relDoc.id} doctor={relDoc} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
