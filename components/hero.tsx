import Link from "next/link";
import Image from "next/image";
import { Phone, Calendar, Star, CheckCircle2, MapPin, Stethoscope, ArrowUpRight } from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";

export function Hero() {
  const serviceChips = [
    { name: "Pathology Tests", href: "/tests" },
    { name: "Digital X-Ray", href: "/tests" },
    { name: "USG (Ultrasound)", href: "/tests" },
    { name: "ECG & Cardiac", href: "/tests" },
    { name: "Endoscopy", href: "/tests" },
    { name: "16 Specialists", href: "/doctors" },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-paper">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Narrative & Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Trust announcement badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line text-ink-soft text-xs sm:text-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-red"></span>
              <span>Opposite Silchar Medical College & Hospital (SMCH)</span>
            </div>

            {/* H1 Display Headline */}
            <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-[56px] text-ink leading-[1.1] tracking-tight mb-6">
              Trusted diagnostics in Ghungoor, opposite SMCH.
            </h1>

            {/* Reassurance copy */}
            <p className="font-sans text-lg sm:text-xl text-ink-soft leading-relaxed max-w-xl mb-8">
              Daily chamber for 16 medical specialists and high-precision pathology, digital X-ray, ultrasound, ECG, and endoscopy serving Silchar and southern Assam.
            </p>

            {/* Dual CTAs (Call hidden on mobile where bottom sticky bar is active) */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-red hover:bg-red-deep text-white font-medium text-base px-7 py-3.5 rounded-full transition-all shadow-xs active:scale-[0.98] min-h-[48px] w-full sm:w-auto text-center"
              >
                <Calendar className="w-5 h-5 stroke-[2]" />
                <span>Book a test</span>
              </Link>

              <a
                href={`tel:${CENTRE_INFO.phones.primary}`}
                className="hidden sm:inline-flex items-center justify-center gap-2.5 border-1.5 border-ink hover:border-red hover:text-red text-ink font-medium text-base px-6 py-3.5 rounded-full transition-all hover:bg-clay/30 min-h-[48px] w-full sm:w-auto text-center"
              >
                <Phone className="w-5 h-5 text-red stroke-[2]" />
                <span>Call {CENTRE_INFO.phones.displayPrimary}</span>
              </a>
            </div>

            {/* Trust Proof Bar */}
            <div className="pt-6 border-t border-line/80 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-ink-soft">
              <div className="flex items-center gap-1.5 text-ink">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-ink">5.0 on Google</span>
                <span className="text-xs text-ink-soft">(48+ verified reviews)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue stroke-[2]" />
                <span>Same-day reports</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-blue stroke-[2]" />
                <span>16 Chamber Specialists</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Visual & Service Tags */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Card */}
              <div className="relative rounded-2xl overflow-hidden bg-surface border border-line p-2.5 shadow-sm">
                <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-clay/40">
                  <Image
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
                    alt="Consultation and patient care at Maruti Diagnostic Centre Silchar"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center"
                    priority
                  />
                  {/* Subtle gradient scrim */}
                  <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent"></div>

                  {/* On-image caption badge */}
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                    <div className="text-xs sm:text-sm font-medium">
                      Daily Doctor Chambers & Diagnostics
                    </div>
                    <span className="text-[11px] bg-ink/70 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
                      Opp. SMCH
                    </span>
                  </div>
                </div>

                {/* Floating Service Chips inside the card frame */}
                <div className="pt-3 pb-1 px-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-ink-soft">
                      Available Services & Chambers
                    </span>
                    <Link
                      href="/tests"
                      className="text-xs font-semibold text-blue hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>View all</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {serviceChips.map((chip) => (
                      <Link
                        key={chip.name}
                        href={chip.href}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-paper hover:bg-red hover:text-white border border-line text-ink transition-colors"
                      >
                        {chip.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inset Landmark & Location Mini-Card */}
              <div className="mt-3 p-3.5 rounded-xl bg-surface border border-line flex items-start gap-3 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-clay/50 flex items-center justify-center text-red shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-semibold text-ink text-sm">
                    SMC Point, Ghungoor, Silchar
                  </div>
                  <div className="text-ink-soft leading-relaxed">
                    Opposite SMCH Main Gate, Behind Maruti Medical
                  </div>
                  <a
                    href={CENTRE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 font-semibold text-blue hover:underline"
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
