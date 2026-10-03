import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";
import { DOCTORS } from "@/data/doctors";
import { CentreHours } from "@/components/centre-hours";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: `All doctors (${DOCTORS.length})`, href: "/doctors" },
  { label: "Tests and scans", href: "/tests" },
  { label: "Book appointment", href: "/booking" },
  { label: "About us", href: "/about" },
  { label: "Contact and directions", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper/80 font-sans">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-paper/10">
          {/* Brand & Overview */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-paper/20 bg-surface">
                <Image
                  src={CENTRE_INFO.logoUrl}
                  alt=""
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <span className="font-display font-medium text-lg text-paper leading-tight block group-hover:text-clay transition-colors">
                  {CENTRE_INFO.name}
                </span>
                <span className="text-xs text-paper/60 font-normal">
                  Ghungoor, opposite SMCH, Silchar
                </span>
              </div>
            </Link>

            <p className="text-sm text-paper/70 leading-relaxed max-w-sm">
              Diagnostic centre and daily doctor chamber in Ghungoor, Silchar, serving patients from across the Barak Valley.
            </p>

            <a
              href={CENTRE_INFO.whatsapp.chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-12 px-5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold transition-colors"
            >
              <Image
                src="/social-icons/whatsapp.png"
                alt=""
                width={18}
                height={18}
                className="w-4 h-4 object-contain"
              />
              <span>WhatsApp: {CENTRE_INFO.whatsapp.display}</span>
            </a>
          </div>

          {/* Pages */}
          <nav aria-label="Footer" className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-semibold text-paper">Pages</h2>
            <ul className="text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center min-h-10 hover:text-paper hover:underline transition-colors text-paper/70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Every doctor, so each profile page is linked from every page on the site */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-sm font-semibold text-paper">Our doctors</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 text-sm">
              {DOCTORS.map((doctor) => (
                <li key={doctor.id}>
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className="flex flex-col py-1.5 hover:text-paper transition-colors text-paper/70 group"
                  >
                    <span className="group-hover:underline">{doctor.name}</span>
                    <span className="text-xs text-paper/50">{doctor.specialty}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-semibold text-paper">Location and hours</h2>

            <div className="text-sm text-paper/70 space-y-3 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                <address className="not-italic">
                  <strong className="text-paper font-medium block">
                    {CENTRE_INFO.name}
                  </strong>
                  {CENTRE_INFO.formattedAddress}
                </address>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-clay shrink-0 mt-3" />
                <div>
                  <a
                    href={`tel:${CENTRE_INFO.phones.primary}`}
                    className="flex items-center min-h-10 hover:underline font-medium text-paper"
                  >
                    {CENTRE_INFO.phones.displayPrimary}
                  </a>
                  <a
                    href={`tel:${CENTRE_INFO.phones.secondary}`}
                    className="flex items-center min-h-10 hover:underline"
                  >
                    {CENTRE_INFO.phones.displaySecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                <CentreHours className="space-y-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-paper/60 text-center md:text-left">
          <p className="max-w-2xl leading-relaxed">
            Medical disclaimer: Information on this website is general guidance for patients and appointment requests. It does not replace diagnosis or advice from a qualified doctor.
          </p>

          <p className="shrink-0">
            &copy; {new Date().getFullYear()} {CENTRE_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
