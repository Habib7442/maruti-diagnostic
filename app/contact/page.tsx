import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  ChevronRight,
  Building2,
} from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: `Contact & Chamber Location in Silchar | ${CENTRE_INFO.name}`,
  description: `Contact ${CENTRE_INFO.name} at ${CENTRE_INFO.landmark}. Phone numbers: ${CENTRE_INFO.phones.displayPrimary}, ${CENTRE_INFO.phones.displaySecondary}. Doctor chamber timings, Google Maps location, and booking form.`,
  keywords: [
    "Maruti Diagnostic Centre address",
    "diagnostic centre Ghungoor Silchar phone number",
    "Maruti Diagnostic Silchar contact",
    "doctor chamber opp SMCH Silchar",
  ],
  alternates: {
    canonical: "https://marutidiagnostic.com/contact",
  },
};

export default function ContactPage() {
  // LocalBusiness / MedicalClinic Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: CENTRE_INFO.name,
    legalName: CENTRE_INFO.legalName,
    url: "https://marutidiagnostic.com",
    logo: "https://marutidiagnostic.com/maruti_diagnostic_centre_logo.png",
    image: "https://marutidiagnostic.com/maruti-og-image.png",
    telephone: CENTRE_INFO.phones.primary,
    address: {
      "@type": "PostalAddress",
      streetAddress: CENTRE_INFO.address.streetAddress,
      addressLocality: CENTRE_INFO.address.addressLocality,
      addressRegion: CENTRE_INFO.address.addressRegion,
      postalCode: CENTRE_INFO.address.postalCode,
      addressCountry: CENTRE_INFO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CENTRE_INFO.geo.latitude,
      longitude: CENTRE_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:30",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "08:00",
        closes: "14:00",
      },
    ],
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
              Contact & Location
            </span>
          </nav>

          {/* Page Header */}
          <header className="mb-8 sm:mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
              <Building2 className="w-3.5 h-3.5 text-red" />
              <span>SMC Point, Ghungoor, Silchar</span>
            </div>

            <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-4">
              Get in touch & find our centre
            </h1>

            <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
              We are conveniently located directly opposite Silchar Medical College & Hospital (behind Maruti Medical). Reach out for doctor chamber appointments, diagnostic report queries, or urgent tests.
            </p>
          </header>

          {/* 2-Column Layout: Left Details + Right Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
            {/* Contact Details & Exact NAP Block (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Exact NAP Card */}
              <div className="bg-surface border border-line rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-line">
                  <MapPin className="w-5 h-5 text-red shrink-0" />
                  <h2 className="font-display font-medium text-xl text-ink">
                    Exact Location & NAP
                  </h2>
                </div>

                {/* Byte-for-byte exact address matching GBP */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-1">
                    Facility Name & Address
                  </span>
                  <p className="text-base font-medium text-ink leading-snug">
                    {CENTRE_INFO.name}
                  </p>
                  <p className="text-sm text-ink-soft mt-1 leading-relaxed">
                    {CENTRE_INFO.address.streetAddress}, {CENTRE_INFO.address.addressLocality}, {CENTRE_INFO.address.addressRegion} - {CENTRE_INFO.address.postalCode}
                  </p>
                  <p className="text-xs text-ink-soft/80 mt-1">
                    Landmark: Directly opposite SMCH main gate, behind Maruti Medical store.
                  </p>
                </div>

                {/* Direct Directions Link */}
                <div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Maruti+Diagnostic+Centre+Silchar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue hover:underline"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Google Maps Driving Directions</span>
                  </a>
                </div>

                {/* Phone Numbers */}
                <div className="pt-4 border-t border-line space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft block">
                    Telephone Assistance
                  </span>

                  <div className="space-y-2">
                    <a
                      href={`tel:${CENTRE_INFO.phones.primary}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-paper hover:bg-clay/30 border border-line transition-colors text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-red" />
                        <span className="font-semibold text-ink">
                          {CENTRE_INFO.phones.displayPrimary}
                        </span>
                      </div>
                      <span className="text-xs text-ink-soft">Primary</span>
                    </a>

                    <a
                      href={`tel:${CENTRE_INFO.phones.secondary}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-paper hover:bg-clay/30 border border-line transition-colors text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-ink-soft" />
                        <span className="font-semibold text-ink">
                          {CENTRE_INFO.phones.displaySecondary}
                        </span>
                      </div>
                      <span className="text-xs text-ink-soft">Secondary</span>
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="pt-4 border-t border-line">
                  <a
                    href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${encodeURIComponent(
                      "Hello Maruti Diagnostic Centre, I would like to enquire about doctor chamber timings and diagnostic services."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 border border-[#25D366]/30 font-semibold text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp: {CENTRE_INFO.whatsapp.display}</span>
                  </a>
                </div>

                {/* Operating Hours */}
                <div className="pt-4 border-t border-line space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft block">
                    Operating & Lab Hours
                  </span>
                  <div className="flex items-start gap-2.5 text-xs text-ink-soft">
                    <Clock className="w-4 h-4 text-red shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p>
                        <strong className="text-ink font-medium">Monday – Saturday:</strong>{" "}
                        7:30 AM – 8:30 PM
                      </p>
                      <p>
                        <strong className="text-ink font-medium">Sunday:</strong> 8:00 AM –
                        2:00 PM
                      </p>
                      <p className="text-[11px] text-ink-soft/70 pt-0.5">
                        * Doctor chamber timings vary by specialist. Check doctor profile for daily OPD schedule.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Appointment & Booking Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="mb-4">
                <h2 className="font-display font-medium text-2xl text-ink">
                  Send an appointment or test enquiry
                </h2>
                <p className="text-sm text-ink-soft mt-1">
                  Fill in your details below and our reception staff will confirm your slot via phone or WhatsApp.
                </p>
              </div>

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
          </div>

          {/* Interactive Google Maps Embed Section */}
          <section className="bg-surface border border-line rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display font-medium text-xl sm:text-2xl text-ink">
                  Interactive Centre Map
                </h2>
                <p className="text-xs sm:text-sm text-ink-soft mt-1">
                  Located directly opposite Silchar Medical College & Hospital (SMCH), Ghungoor
                </p>
              </div>

              <a
                href={CENTRE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-paper hover:bg-clay/40 border border-line text-xs font-semibold text-ink transition-colors self-start sm:self-auto"
              >
                <Navigation className="w-3.5 h-3.5 text-red" />
                <span>Open in Google Maps App</span>
              </a>
            </div>

            {/* Google Maps Iframe */}
            <div className="w-full aspect-16/9 md:aspect-21/9 rounded-xl overflow-hidden border border-line bg-paper relative">
              <iframe
                title="Maruti Diagnostic Centre Location Map"
                src="https://maps.google.com/maps?q=Maruti+Diagnostic+Centre+Ghungoor+Silchar&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[1.05]"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

