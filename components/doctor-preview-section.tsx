"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Stethoscope } from "lucide-react";
import { DOCTORS, DEPARTMENTS, MedicalDepartment, Doctor } from "@/data/doctors";
import { DoctorCard } from "@/components/doctor-card";
import { CENTRE_INFO } from "@/data/centre";

export function DoctorPreviewSection() {
  const [selectedDepartment, setSelectedDepartment] = useState<MedicalDepartment | "All">("All");

  const filteredDoctors: Doctor[] =
    selectedDepartment === "All"
      ? DOCTORS
      : DOCTORS.filter((doc) => doc.department === selectedDepartment);

  // Highlight first 6-9 doctors on Home page preview, linking to /doctors for full directory
  const displayDoctors = filteredDoctors.slice(0, 9);

  return (
    <section className="py-16 md:py-24 bg-clay/20 border-t border-line/60">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
              <Stethoscope className="w-3.5 h-3.5 text-red" />
              <span>Chamber for 16 Specialists</span>
            </div>

            <h2 className="font-display font-medium text-3xl sm:text-4xl text-ink leading-tight tracking-tight mb-3">
              Consulting specialists at Maruti
            </h2>

            <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
              Daily OPD chambers for Silchar’s trusted medical practitioners opposite SMCH. Check chamber timings, consultation fees, or book an appointment.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red hover:text-red-deep transition-colors self-start md:self-end"
          >
            <span>View all 16 doctors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Specialty Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDepartment === dept.value;
            return (
              <button
                key={dept.value}
                type="button"
                onClick={() => setSelectedDepartment(dept.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-blue cursor-pointer ${
                  isSelected
                    ? "bg-red text-white shadow-xs"
                    : "bg-surface hover:bg-paper border border-line text-ink"
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>

        {/* Doctor Cards Grid */}
        {displayDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-line rounded-2xl p-10 text-center max-w-lg mx-auto">
            <p className="text-ink font-medium text-base mb-2">
              No consulting doctors found under this department.
            </p>
            <p className="text-ink-soft text-sm mb-6">
              Try selecting &quot;All Specialists&quot; or call our front desk for doctor chamber timings.
            </p>
            <button
              type="button"
              onClick={() => setSelectedDepartment("All")}
              className="inline-flex items-center justify-center bg-red hover:bg-red-deep text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Show all specialists
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-ink text-base">
              Need assistance booking a consulting specialist?
            </h3>
            <p className="text-xs text-ink-soft mt-0.5">
              Our front desk assists with direct chamber bookings and doctor timing updates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${CENTRE_INFO.phones.primary}`}
              className="inline-flex items-center gap-2 bg-ink hover:bg-ink/90 text-paper font-medium text-xs px-5 py-2.5 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-paper" />
              <span>Call Reception ({CENTRE_INFO.phones.displayPrimary})</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

