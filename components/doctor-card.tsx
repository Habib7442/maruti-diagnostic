import Link from "next/link";
import Image from "next/image";
import { Clock, IndianRupee, ArrowRight, UserCheck } from "lucide-react";
import { Doctor } from "@/data/doctors";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  // Extract initials for clean monogram if photo is not yet provided
  const initials = doctor.name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="group bg-surface border border-line rounded-2xl p-5 sm:p-6 transition-all hover:border-ink/30 hover:shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Top Header: Illustrative Avatar + Identity */}
        <div className="flex items-start gap-4 mb-4">
          {doctor.photoUrl ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-line shadow-xs group-hover:scale-105 transition-transform bg-paper">
              <Image
                src={doctor.photoUrl}
                alt={doctor.name}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-clay/50 border border-line flex items-center justify-center text-ink font-display font-semibold text-lg shrink-0 group-hover:bg-red/10 group-hover:text-red transition-colors">
              {initials}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-paper border border-line text-ink-soft">
                {doctor.type === "daily" ? "Daily Chamber" : "Visiting Specialist"}
              </span>
            </div>

            <h3 className="font-sans font-semibold text-lg text-ink leading-snug truncate group-hover:text-red transition-colors">
              <Link href={`/doctors/${doctor.slug}`} className="focus-visible:outline-2 focus-visible:outline-blue rounded-xs">
                {doctor.name}
              </Link>
            </h3>

            <p className="text-red font-medium text-sm">
              {doctor.specialty}
            </p>
          </div>
        </div>

        {/* Qualifications */}
        <p className="text-xs text-ink-soft line-clamp-1 mb-4 font-normal">
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

        {/* Short Bio snippet / conditions preview */}
        <p className="text-xs text-ink-soft/90 line-clamp-2 leading-relaxed mb-4">
          {doctor.bio}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-line/70 flex items-center justify-between gap-3 mt-auto">
        <Link
          href={`/doctors/${doctor.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-blue rounded-xs"
        >
          <span>See profile & timings</span>
          <ArrowRight className="w-4 h-4 text-ink-soft group-hover:text-red transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          href={`/contact?doctor=${encodeURIComponent(doctor.name)}`}
          className="inline-flex items-center gap-1 text-xs font-medium bg-paper hover:bg-red hover:text-white border border-line px-3 py-1.5 rounded-full text-ink transition-colors"
          title={`Enquire appointment with ${doctor.name}`}
        >
          <UserCheck className="w-3 h-3" />
          <span>Book</span>
        </Link>
      </div>
    </article>
  );
}

