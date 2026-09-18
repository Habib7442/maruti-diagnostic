import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";

export function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Consulting Doctors (16)", href: "/doctors" },
    { label: "Tests & Investigations", href: "/booking?type=test" },
    { label: "Book Appointment", href: "/booking" },
    { label: "Contact & Location", href: "/contact" },
  ];

  const specialtyLinks = [
    { label: "Neurosurgery & Spine", href: "/doctors?dept=Neurosurgery" },
    { label: "Medicine & Diabetes", href: "/doctors?dept=Medicine" },
    { label: "Gynaecology & Obstetrics", href: "/doctors?dept=Gynaecology" },
    { label: "ENT & Otorhinolaryngology", href: "/doctors?dept=ENT" },
    { label: "Orthopaedics & Joints", href: "/doctors?dept=Orthopaedics" },
    { label: "Paediatrics & Child Health", href: "/doctors?dept=Paediatrics" },
    { label: "Dermatology & Skin", href: "/doctors?dept=Dermatology" },
    { label: "General & Laparoscopic Surgery", href: "/doctors?dept=Surgery" },
  ];

  return (
    <footer className="bg-ink text-paper/80 border-t border-ink/40 font-sans">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-paper/10">
          {/* Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-paper/20 bg-surface">
                <Image
                  src="/maruti_diagnostic_centre_logo.png"
                  alt="Maruti Diagnostic Centre Logo"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <span className="font-display font-medium text-lg text-paper leading-tight block group-hover:text-red transition-colors">
                  {CENTRE_INFO.name}
                </span>
                <span className="text-xs text-paper/60 font-normal">
                  Ghungoor · Opp. SMCH, Silchar
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-paper/70 leading-relaxed max-w-sm">
              Trusted diagnostic laboratory and daily medical specialist chamber facility in Ghungoor. Serving patients across Silchar, Hailakandi, Karimganj, and the wider Barak Valley.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${encodeURIComponent(
                  "Hello Maruti Diagnostic Centre, I would like to enquire about appointments and tests."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <Image
                  src="/social-icons/whatsapp.png"
                  alt="WhatsApp"
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain"
                />
                <span>WhatsApp: {CENTRE_INFO.whatsapp.display}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-paper font-sans">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-paper hover:underline transition-colors flex items-center gap-1.5 text-paper/70"
                  >
                    <ChevronRight className="w-3 h-3 text-paper/40 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-paper font-sans">
              Specialist Chambers
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-xs">
              {specialtyLinks.map((spec, index) => (
                <li key={index}>
                  <Link
                    href={spec.href}
                    className="hover:text-paper hover:underline transition-colors text-paper/70 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-red shrink-0" />
                    <span className="truncate">{spec.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exact NAP & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-paper font-sans">
              Location & Hours
            </h4>

            <div className="text-xs text-paper/70 space-y-2.5 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red shrink-0 mt-0.5" />
                <div>
                  <strong className="text-paper font-medium block">
                    {CENTRE_INFO.name}
                  </strong>
                  <span>{CENTRE_INFO.address.streetAddress}, Silchar, Assam 788014</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-red shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a
                    href={`tel:${CENTRE_INFO.phones.primary}`}
                    className="block hover:text-paper transition-colors font-medium text-paper"
                  >
                    {CENTRE_INFO.phones.displayPrimary}
                  </a>
                  <a
                    href={`tel:${CENTRE_INFO.phones.secondary}`}
                    className="block hover:text-paper transition-colors"
                  >
                    {CENTRE_INFO.phones.displaySecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-red shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-[11px]">
                  <p>Mon - Sat: 7:30 AM - 8:30 PM</p>
                  <p>Sunday: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-paper/50 text-center md:text-left">
          <p className="max-w-2xl leading-relaxed">
            Medical disclaimer: Information presented on this website is for general patient guidance and chamber appointment requests. It does not replace direct diagnosis or clinical advice from a qualified doctor.
          </p>

          <p className="shrink-0">
            &copy; {new Date().getFullYear()} {CENTRE_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

