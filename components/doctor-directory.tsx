"use client";

import { useState, useMemo } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Search, Stethoscope, Phone, RotateCcw } from "lucide-react";
import { DOCTORS, DEPARTMENTS, type MedicalDepartment } from "@/data/doctors";
import { DoctorCard } from "@/components/doctor-card";
import { CENTRE_INFO } from "@/data/centre";

type DepartmentFilter = MedicalDepartment | "All";

function departmentFromParam(raw: string | null): DepartmentFilter {
  if (!raw) return "All";
  const match = DEPARTMENTS.find(
    (d) => d.value.toLowerCase() === raw.trim().toLowerCase()
  );
  return match ? match.value : "All";
}

export function DoctorDirectory() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // The URL is the source of truth for the department, so footer links and back/forward stay in sync.
  const selectedDepartment = departmentFromParam(
    searchParams.get("dept") || searchParams.get("department")
  );
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || searchParams.get("search") || ""
  );

  const updateUrl = (dept: DepartmentFilter, q: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("department");
    params.delete("search");
    if (dept === "All") params.delete("dept");
    else params.set("dept", dept);
    if (q.trim()) params.set("q", q);
    else params.delete("q");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateUrl(selectedDepartment, value);
  };

  const handleReset = () => {
    setSearchQuery("");
    updateUrl("All", "");
  };

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DOCTORS.filter((doctor) => {
      if (selectedDepartment !== "All" && doctor.department !== selectedDepartment) {
        return false;
      }
      if (!q) return true;
      return (
        doctor.name.toLowerCase().includes(q) ||
        doctor.specialty.toLowerCase().includes(q) ||
        doctor.department.toLowerCase().includes(q) ||
        doctor.conditionsTreated.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [selectedDepartment, searchQuery]);

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="bg-surface border border-line rounded-2xl p-5 sm:p-6 mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="Search doctors by name, specialty or condition"
              placeholder="Search by doctor name, specialty, or condition"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full min-h-12 pl-10 pr-4 rounded-[10px] bg-paper border border-line text-base text-ink placeholder:text-ink-soft/70 focus:outline-none focus:border-red transition-colors"
            />
          </div>

          <div className="text-sm text-ink-soft flex items-center justify-between md:justify-end gap-3" aria-live="polite">
            <span>
              Showing <strong className="text-ink font-semibold">{filteredDoctors.length}</strong> of{" "}
              {DOCTORS.length} specialists
            </span>
            {(selectedDepartment !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 min-h-12 px-2 text-sm text-red-deep hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Department Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDepartment === dept.value;
            return (
              <button
                key={dept.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => updateUrl(dept.value, searchQuery)}
                className={`shrink-0 min-h-12 px-5 rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue cursor-pointer ${
                  isSelected
                    ? "bg-red text-white"
                    : "bg-paper hover:bg-clay/40 border border-line text-ink"
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-line rounded-2xl p-10 text-center max-w-lg mx-auto my-8">
          <Stethoscope className="w-8 h-8 text-ink-soft mx-auto mb-3" />
          <h3 className="text-ink font-display font-medium text-lg mb-2">
            No doctors match your search
          </h3>
          <p className="text-ink-soft text-sm mb-6 leading-relaxed">
            We couldn&apos;t find any doctors matching &quot;{searchQuery}&quot;. Try a different word or clear the filter.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center min-h-12 bg-red hover:bg-red-deep text-white text-sm font-semibold px-6 rounded-full transition-colors cursor-pointer"
          >
            Show all {DOCTORS.length} specialists
          </button>
        </div>
      )}

      {/* Front Desk Assistance Bar */}
      <div className="mt-12 p-6 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-ink text-base">
            Can&apos;t find the right specialist or timing?
          </h3>
          <p className="text-sm text-ink-soft mt-0.5">
            Call our front desk to confirm chamber timings, tokens, or appointments with associated doctors.
          </p>
        </div>

        <a
          href={`tel:${CENTRE_INFO.phones.primary}`}
          className="inline-flex items-center gap-2 min-h-12 bg-red hover:bg-red-deep text-white text-sm font-semibold px-5 rounded-full transition-colors shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>Call reception: {CENTRE_INFO.phones.displayPrimary}</span>
        </a>
      </div>
    </div>
  );
}
