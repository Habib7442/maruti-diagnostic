import Link from "next/link";
import Image from "next/image";
import { Clock, IndianRupee, UserCheck } from "lucide-react";
import { type Doctor, getDoctorInitials } from "@/data/doctors";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const profileHref = `/doctors/${doctor.slug}`;

  return (
    <article className="group bg-surface border border-line rounded-2xl p-5 sm:p-6 transition-colors hover:border-ink/30 flex flex-col justify-between h-full">
      <div>
        {/* Top Header: Avatar + Identity */}
        <div className="flex items-start gap-4 mb-4">
          {doctor.photoUrl ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-line bg-paper">
              <Image
                src={doctor.photoUrl}
                alt={doctor.name}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="w-14 h-14 rounded-xl bg-clay/50 border border-line flex items-center justify-center text-ink font-display font-semibold text-lg shrink-0"
            >
              {getDoctorInitials(doctor.name)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-paper border border-line text-ink-soft">
                {doctor.type === "daily" ? "Daily chamber" : "By appointment"}
              </span>
            </div>

            <h3 className="font-sans font-semibold text-lg text-ink leading-snug group-hover:text-red transition-colors">
              <Link href={profileHref} className="focus-visible:outline-2 focus-visible:outline-blue rounded-xs">
                {doctor.name}
              </Link>
            </h3>

            <p className="text-red-deep font-medium text-sm">
              {doctor.specialty}
            </p>
          </div>
        </div>

        {/* Qualifications */}
        <p className="text-xs text-ink-soft line-clamp-2 mb-4 font-normal">
          {doctor.qualifications.join(", ")}
        </p>

        {/* Timing & Fee Strip */}
        <div className="pt-3 border-t border-line/70 flex items-center justify-between text-xs text-ink mb-4">
          <div className="flex items-center gap-1.5 text-ink-soft">
            <Clock className="w-3.5 h-3.5 text-ink-soft shrink-0" />
            <span className="font-medium text-ink">{doctor.chamberTiming}</span>
          </div>

          {doctor.fee && (
            <div className="flex items-center gap-0.5 font-semibold text-ink bg-paper px-2 py-0.5 rounded-md border border-line/60">
              <IndianRupee className="w-3 h-3 text-ink-soft" />
              <span>{doctor.fee}</span>
            </div>
          )}
        </div>

        {/* Short Bio snippet */}
        <p className="text-xs text-ink-soft/90 line-clamp-2 leading-relaxed mb-4">
          {doctor.bio}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-line/70 flex items-center justify-between gap-3 mt-auto">
        <Link
          href={profileHref}
          className="inline-flex items-center min-h-12 text-sm font-medium text-ink hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-blue rounded-xs"
        >
          Profile and timings
        </Link>

        <Link
          href={`/booking?doctor=${doctor.slug}`}
          className="inline-flex items-center gap-1.5 min-h-12 text-xs font-medium bg-paper hover:bg-red hover:text-white border border-line px-4 rounded-full text-ink transition-colors"
          aria-label={`Book an appointment with ${doctor.name}`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Book</span>
        </Link>
      </div>
    </article>
  );
}
