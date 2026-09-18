import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Phone,
  FileCheck2,
  Calendar,
  IndianRupee,
  HelpCircle,
  FlaskConical,
  Stethoscope,
} from "lucide-react";
import {
  TESTS,
  getTestBySlug,
  getAllTestSlugs,
  getRelatedTests,
} from "@/data/tests";
import { CENTRE_INFO } from "@/data/centre";
import { TestCard } from "@/components/test-card";

interface TestPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Statically prerender all 14 test pages at build time
export async function generateStaticParams() {
  const slugs = getAllTestSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Dynamic SEO metadata per test
export async function generateMetadata({
  params,
}: TestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = getTestBySlug(slug);

  if (!test) {
    return {
      title: "Test Not Found | Maruti Diagnostic Centre",
    };
  }

  const title = `${test.name} in Silchar — Rates & Fasting Guide | ${CENTRE_INFO.name}`;
  const description = `Accurate ${test.name} at ${CENTRE_INFO.name}, Ghungoor (opp. SMCH), Silchar. ${test.shortDescription} Turnaround: ${test.reportTurnaround}. Prep: ${test.preparation}. WhatsApp: ${CENTRE_INFO.whatsapp.display}.`;

  return {
    title,
    description,
    keywords: [
      `${test.name} Silchar`,
      `${test.name} cost Silchar`,
      `${test.name} price Silchar`,
      `${test.name} preparation`,
      `${test.category.toLowerCase()} test Silchar`,
      "diagnostic lab Ghungoor",
      "blood test opposite SMCH Silchar",
      "Maruti Diagnostic Centre tests",
    ],
    alternates: {
      canonical: `https://marutidiagnostic.com/tests/${test.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://marutidiagnostic.com/tests/${test.slug}`,
      type: "article",
      siteName: CENTRE_INFO.name,
    },
  };
}

export default async function TestDetailPage({ params }: TestPageProps) {
  const { slug } = await params;
  const test = getTestBySlug(slug);

  if (!test) {
    notFound();
  }

  const relatedTests = getRelatedTests(test.id, test.category, 3);

  const whatsappBookingUrl = `https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${encodeURIComponent(
    `Hello Maruti Diagnostic Centre, I would like to book / enquire about the *${test.name}* at your Ghungoor centre (Opp. SMCH). Please let me know available slots & requirements.`
  )}`;

  // JSON-LD Structured Data: DiagnosticProcedure Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiagnosticProcedure",
    name: test.name,
    description: test.shortDescription,
    bodyLocation: test.category,
    howPerformed: test.sampleType,
    preparation: test.preparation,
    offers: test.price
      ? {
          "@type": "Offer",
          price: test.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    provider: {
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
  };

  return (
    <>
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
              href="/tests"
              className="hover:text-ink transition-colors hover:underline"
            >
              Tests & Investigations
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-soft/70 shrink-0" />
            <span className="text-ink font-medium truncate" aria-current="page">
              {test.name}
            </span>
          </nav>

          {/* Top Test Header Card */}
          <section className="bg-surface border border-line rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 shadow-xs">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red/10 text-red border border-red/20">
                  {test.category} Investigation
                </span>

                {test.sampleType && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-paper border border-line text-ink-soft">
                    {test.sampleType}
                  </span>
                )}

                <span className="text-xs font-medium px-3 py-1 rounded-full bg-paper border border-line text-ink-soft flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue" />
                  <span>Quality Controlled Analysis</span>
                </span>
              </div>

              {/* H1 for Search Engine Ranking */}
              <h1 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-ink leading-tight mb-3">
                {test.name} in Silchar
              </h1>

              <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed mb-6">
                {test.shortDescription} Available daily at Maruti Diagnostic Centre opposite SMCH, Ghungoor.
              </p>

              {/* Fast Reassurance Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-ink-soft pt-4 border-t border-line/80">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red shrink-0" />
                  <span className="text-ink font-medium">
                    Turnaround: {test.reportTurnaround}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-ink-soft shrink-0" />
                  <span>Maruti Diagnostic, SMC Point, Ghungoor (Opp. SMCH)</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Preparation Guidelines Card (High Priority for Patients) */}
              <section className="bg-surface border-2 border-red/30 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-line">
                  <AlertCircle className="w-5 h-5 text-red shrink-0" />
                  <h2 className="font-display font-medium text-xl sm:text-2xl text-ink">
                    Patient Preparation Instructions
                  </h2>
                </div>

                <div className="p-4 rounded-xl bg-paper border border-line mb-4">
                  <p className="text-base text-ink font-medium leading-relaxed">
                    {test.preparation}
                  </p>
                </div>

                <div className="text-xs sm:text-sm text-ink-soft space-y-2">
                  <p>
                    • <strong className="text-ink font-medium">Early Morning Sample Desk:</strong> Our phlebotomy and blood collection counter opens at <strong className="text-ink">7:30 AM (Monday to Saturday)</strong> so you can give fasting samples comfortably before starting your workday.
                  </p>
                  <p>
                    • <strong className="text-ink font-medium">Water Intake:</strong> For fasting blood tests, drinking plain water is generally permitted unless your doctor has specifically advised otherwise.
                  </p>
                  <p>
                    • <strong className="text-ink font-medium">Prescriptions:</strong> Please carry any doctor prescription or previous laboratory reports with you to our front desk.
                  </p>
                </div>
              </section>

              {/* Clinical Importance */}
              <section className="bg-surface border border-line rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
                  <FlaskConical className="w-5 h-5 text-red shrink-0" />
                  <h2 className="font-display font-medium text-xl sm:text-2xl text-ink">
                    Why is this test done?
                  </h2>
                </div>

                <div className="prose prose-slate max-w-none text-ink/90 text-base sm:text-[17px] leading-relaxed space-y-4">
                  <p>{test.clinicalImportance}</p>

                  <p>
                    At Maruti Diagnostic Centre, we utilize calibrated automated analyzers and quality-tested reagents to ensure your results accurately reflect your health status, assisting your consulting physician in making informed therapeutic decisions.
                  </p>
                </div>
              </section>

              {/* How Testing Works at Maruti */}
              <section className="bg-surface border border-line rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
                  <FileCheck2 className="w-5 h-5 text-blue shrink-0" />
                  <h2 className="font-display font-medium text-xl sm:text-2xl text-ink">
                    How Testing Works at Our Centre
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-ink-soft">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-clay text-ink font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-ink font-medium block">
                        Walk-In or WhatsApp Booking
                      </strong>
                      <p className="text-xs leading-relaxed text-ink-soft mt-0.5">
                        Walk in directly to our counter at SMC Point, Ghungoor (opp. SMCH), or message us on WhatsApp in advance to check preparation requirements and avoid counter wait times.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-clay text-ink font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-ink font-medium block">
                        Hygienic Sample Collection or Scanning
                      </strong>
                      <p className="text-xs leading-relaxed text-ink-soft mt-0.5">
                        Blood samples are collected by trained phlebotomists using sterile single-use vacuum collection tubes. Imaging scans (USG and X-ray) are conducted in clean, private examination suites.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-clay text-ink font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-ink font-medium block">
                        Report Delivery & Doctor Consultation
                      </strong>
                      <p className="text-xs leading-relaxed text-ink-soft mt-0.5">
                        Collect your printed report at the reception counter by the designated turnaround time ({test.reportTurnaround}). If you are seeing one of our 16 daily consulting doctors, your results can be seamlessly presented during your OPD chamber visit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Doctor Chamber Callout */}
                <div className="mt-6 p-4 rounded-xl bg-paper border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="w-5 h-5 text-red shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-ink block">
                        Consult a Specialist on the Same Visit
                      </span>
                      <span className="text-xs text-ink-soft">
                        16 medical practitioners consult daily in our Ghungoor chamber.
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/doctors"
                    className="inline-flex items-center justify-center text-xs font-medium bg-surface hover:bg-ink hover:text-white border border-line px-4 py-2 rounded-full text-ink transition-colors shrink-0"
                  >
                    View Doctor Chambers
                  </Link>
                </div>
              </section>
            </div>

            {/* Right Sticky Booking Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <aside className="bg-surface border border-line rounded-2xl p-6 sm:p-7 shadow-xs sticky top-24">
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Investigation Details
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red/10 text-red border border-red/20 font-semibold">
                    {test.category}
                  </span>
                </div>

                {/* Approximate Price */}
                <div className="py-5 border-b border-line">
                  <span className="text-xs text-ink-soft block mb-1">Standard Rate</span>
                  <div className="flex items-baseline gap-1.5">
                    {test.price ? (
                      <>
                        <div className="flex items-center font-display font-semibold text-3xl text-ink">
                          <IndianRupee className="w-6 h-6 text-ink/70" />
                          <span>{test.price}</span>
                        </div>
                        <span className="text-xs text-ink-soft">approx.</span>
                      </>
                    ) : (
                      <span className="font-display font-medium text-xl text-ink">
                        Enquire at desk
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Spec Strip */}
                <div className="py-5 space-y-3.5 border-b border-line text-sm">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-red shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-ink-soft block">Report Turnaround</span>
                      <span className="font-semibold text-ink text-xs sm:text-sm">
                        {test.reportTurnaround}
                      </span>
                    </div>
                  </div>

                  {test.sampleType && (
                    <div className="flex items-start gap-2.5">
                      <FlaskConical className="w-4 h-4 text-red shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-ink-soft block">Sample / Modality</span>
                        <span className="font-medium text-ink text-xs sm:text-sm">
                          {test.sampleType}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-red shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-ink-soft block">Location</span>
                      <span className="text-xs text-ink leading-relaxed">
                        Maruti Diagnostic Centre, SMC Point, Ghungoor (Opp. SMCH), Silchar
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-5 space-y-3">
                  <a
                    href={whatsappBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm transition-colors shadow-xs"
                  >
                    <Image
                      src="/social-icons/whatsapp.png"
                      alt="WhatsApp"
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                    <span>Book via WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${CENTRE_INFO.phones.primary}`}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-paper hover:bg-clay/30 border border-line text-ink font-medium text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-red" />
                    <span>Call Lab Desk: {CENTRE_INFO.phones.displayPrimary}</span>
                  </a>

                  <div className="text-center pt-2">
                    <Link
                      href={`/booking?test=${encodeURIComponent(test.name)}`}
                      className="text-xs text-blue hover:underline inline-flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Prefer booking form? Schedule test online</span>
                    </Link>
                  </div>
                </div>

                {/* Morning Fasting Tip */}
                <div className="mt-5 p-3.5 bg-paper rounded-xl border border-line text-xs text-ink-soft space-y-1">
                  <div className="flex items-center gap-1.5 text-ink font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue shrink-0" />
                    <span>Early morning desk</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Fasting phlebotomy begins at 7:30 AM daily. Prior booking is appreciated but walk-ins are always welcomed.
                  </p>
                </div>
              </aside>
            </div>
          </div>

          {/* Related Tests Section (Full Width Below Grid) */}
          {relatedTests.length > 0 && (
            <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-line">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <h2 className="font-display font-medium text-2xl sm:text-3xl text-ink">
                    Other {test.category} Investigations
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-soft mt-1">
                    Explore other routine and specialized tests available at Maruti Diagnostic Centre
                  </p>
                </div>

                <Link
                  href="/tests"
                  className="text-xs sm:text-sm font-semibold text-red hover:text-red-deep hover:underline shrink-0"
                >
                  View all tests
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTests.map((relTest) => (
                  <TestCard key={relTest.id} test={relTest} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

