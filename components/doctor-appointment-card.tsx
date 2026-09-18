import Link from "next/link";
import Image from "next/image";
import { Phone, Clock, Calendar, MapPin, IndianRupee, HelpCircle, CheckCircle2 } from "lucide-react";
import { Doctor } from "@/data/doctors";
import { CENTRE_INFO } from "@/data/centre";

interface DoctorAppointmentCardProps {
  doctor: Doctor;
}

export function DoctorAppointmentCard({ doctor }: DoctorAppointmentCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello Maruti Diagnostic Centre, I would like to enquire about consultation / appointment with ${doctor.name} (${doctor.specialty}) at your Ghungoor chamber.`
  );

  return (
    <aside className="bg-surface border border-line rounded-2xl p-6 sm:p-7 shadow-xs sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-line">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Chamber Details
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            doctor.type === "daily"
              ? "bg-red/10 text-red border border-red/20"
              : "bg-paper text-ink-soft border border-line"
          }`}
        >
          {doctor.type === "daily" ? "Daily OPD Chamber" : "Visiting Specialist"}
        </span>
      </div>

      {/* Consultation Fee */}
      <div className="py-5 border-b border-line">
        <span className="text-xs text-ink-soft block mb-1">Consultation Fee</span>
        <div className="flex items-baseline gap-1.5">
          {doctor.fee ? (
            <>
              <div className="flex items-center font-display font-semibold text-3xl text-ink">
                <IndianRupee className="w-6 h-6 text-ink/70" />
                <span>{doctor.fee}</span>
              </div>
              <span className="text-xs text-ink-soft">per visit (approx.)</span>
            </>
          ) : (
            <span className="font-display font-medium text-xl text-ink">
              Enquire at reception
            </span>
          )}
        </div>
      </div>

      {/* Timings & Days */}
      <div className="py-5 space-y-4 border-b border-line text-sm">
        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-red shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-ink-soft block font-medium">Chamber Timings</span>
            <span className="font-semibold text-ink">{doctor.chamberTiming}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-red shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-ink-soft block font-medium">Available Days</span>
            <span className="text-ink">
              {doctor.availableDays && doctor.availableDays.length > 0
                ? doctor.availableDays.length === 6
                  ? "Monday to Saturday"
                  : doctor.availableDays.join(", ")
                : "Scheduled by appointment"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-red shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-ink-soft block font-medium">Chamber Location</span>
            <p className="text-xs text-ink-soft leading-relaxed">
              <strong className="text-ink font-medium">{CENTRE_INFO.name}</strong>
              <br />
              {CENTRE_INFO.address.streetAddress}, Silchar
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 space-y-3">
        {/* Primary Call Action */}
        <a
          href={`tel:${CENTRE_INFO.phones.primary}`}
          className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-red text-white hover:bg-red-deep font-medium text-sm transition-colors shadow-xs"
        >
          <Phone className="w-4 h-4" />
          <span>Call to Book: {CENTRE_INFO.phones.displayPrimary}</span>
        </a>

        {/* WhatsApp Deep Link */}
        <a
          href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 border border-[#25D366]/30 font-semibold text-sm transition-colors"
        >
          <Image
            src="/social-icons/whatsapp.png"
            alt="WhatsApp"
            width={22}
            height={22}
            className="w-5 h-5 object-contain shrink-0"
          />
          <span>WhatsApp Appointment Query</span>
        </a>

        {/* Secondary Phone Option */}
        <div className="text-center pt-1">
          <a
            href={`tel:${CENTRE_INFO.phones.secondary}`}
            className="text-xs text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1.5"
          >
            <span>Alternate line:</span>
            <span className="font-semibold text-ink underline underline-offset-2">
              {CENTRE_INFO.phones.displaySecondary}
            </span>
          </a>
        </div>
      </div>

      {/* Patient Notice Strip */}
      <div className="mt-5 p-3.5 bg-paper rounded-xl border border-line text-xs text-ink-soft space-y-1.5">
        <div className="flex items-center gap-1.5 text-ink font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue shrink-0" />
          <span>Walk-in tokens & prior bookings</span>
        </div>
        <p className="leading-relaxed text-[11px]">
          Tokens are issued daily at the Maruti reception counter. Patients travelling from outside Silchar are advised to call beforehand to confirm OPD timings.
        </p>
      </div>

      {/* Link to general enquiry form */}
      <div className="mt-4 text-center">
        <Link
          href={`/booking?doctor=${encodeURIComponent(doctor.name)}`}
          className="text-xs text-blue hover:underline inline-flex items-center gap-1"
        >
          <HelpCircle className="w-3 h-3" />
          <span>Prefer online form? Book token online</span>
        </Link>
      </div>
    </aside>
  );
}

