import Image from "next/image";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";

export function LocationMapSection() {
  return (
    <section className="py-16 md:py-24 bg-paper border-t border-line">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
            <MapPin className="w-3.5 h-3.5 text-red" />
            <span>Centre Location & Hours</span>
          </div>

          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ink leading-tight tracking-tight mb-3">
            Visit our centre opposite SMCH
          </h2>

          <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
            Conveniently situated at SMC Point, Ghungoor, directly opposite Silchar Medical College & Hospital (behind Maruti Medical). Accessible from Hailakandi, Karimganj, and throughout Silchar.
          </p>
        </div>

        {/* 2-Column Grid: Details + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-surface border border-line rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              {/* Exact Address */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-1">
                  Centre Address (Exact NAP)
                </span>
                <p className="font-display font-medium text-xl text-ink">
                  {CENTRE_INFO.name}
                </p>
                <p className="text-sm text-ink-soft mt-1 leading-relaxed">
                  {CENTRE_INFO.address.streetAddress}, {CENTRE_INFO.address.addressLocality}, {CENTRE_INFO.address.addressRegion} - {CENTRE_INFO.address.postalCode}
                </p>
                <p className="text-xs text-ink-soft/80 mt-1">
                  Landmark: Directly opposite SMCH main gate, behind Maruti Medical store.
                </p>
              </div>

              {/* Operating Hours */}
              <div className="pt-4 border-t border-line space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft block">
                  Operating & Lab Timings
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
                  </div>
                </div>
              </div>

              {/* Direct Phone Lines */}
              <div className="pt-4 border-t border-line space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft block">
                  Chamber & Lab Inquiries
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`tel:${CENTRE_INFO.phones.primary}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-paper hover:bg-clay/40 border border-line text-xs font-semibold text-ink transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-red shrink-0" />
                    <span>{CENTRE_INFO.phones.displayPrimary}</span>
                  </a>

                  <a
                    href={`tel:${CENTRE_INFO.phones.secondary}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-paper hover:bg-clay/40 border border-line text-xs font-semibold text-ink transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-ink-soft shrink-0" />
                    <span>{CENTRE_INFO.phones.displaySecondary}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-6 mt-6 border-t border-line space-y-3">
              <a
                href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${encodeURIComponent(
                  "Hello Maruti Diagnostic Centre, I would like to enquire about doctor chamber timings and test rates."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold transition-colors shadow-xs"
              >
                <Image
                  src="/social-icons/whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <span>Chat on WhatsApp (+91 {CENTRE_INFO.whatsapp.number})</span>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Maruti+Diagnostic+Centre+Silchar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-paper hover:bg-clay/40 border border-line text-xs font-medium text-ink transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-blue" />
                <span>Get Driving Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Embed (7 cols) */}
          <div className="lg:col-span-7 bg-surface border border-line rounded-2xl sm:rounded-3xl p-4 sm:p-5 overflow-hidden shadow-xs flex flex-col">
            <div className="w-full h-full min-h-[360px] sm:min-h-[420px] rounded-xl sm:rounded-2xl overflow-hidden border border-line bg-paper relative">
              <iframe
                title="Maruti Diagnostic Centre Location Map"
                src="https://maps.google.com/maps?q=Maruti+Diagnostic+Centre+Ghungoor+Silchar&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "360px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[1.05]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

