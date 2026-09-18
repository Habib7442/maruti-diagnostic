"use client";

import { useState, useMemo } from "react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Search, Stethoscope, Phone, RotateCcw } from "lucide-react";
import { DOCTORS, DEPARTMENTS, MedicalDepartment, Doctor } from "@/data/doctors";
import { DoctorCard } from "@/components/doctor-card";
import { CENTRE_INFO } from "@/data/centre";

export function DoctorDirectory() {
  const [selectedDepartment, setSelectedDepartment] = useState<MedicalDepartment | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getDepartmentFromParams = useCallback((): MedicalDepartment | "All" => {
    const rawDept = searchParams.get("dept") || searchParams.get("department");
    if (rawDept) {
      const matched = DEPARTMENTS.find(
        (d) => d.value.toLowerCase() === rawDept.trim().toLowerCase()
      );
      if (matched) return matched.value;
    }
    return "All";
  }, [searchParams]);

  const [selectedDepartment, setSelectedDepartment] = useState<MedicalDepartment | "All">(() =>
    getDepartmentFromParams()
  );

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get("q") || searchParams.get("search") || "";
  });

  // Sync state if URL changes (e.g. browser back/forward or footer link navigation)
  useEffect(() => {
    setSelectedDepartment(getDepartmentFromParams());
    const q = searchParams.get("q") || searchParams.get("search");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams, getDepartmentFromParams]);

  const handleSelectDepartment = (dept: MedicalDepartment | "All") => {
    setSelectedDepartment(dept);
    const params = new URLSearchParams(searchParams.toString());
    if (dept === "All") {
      params.delete("dept");
      params.delete("department");
    } else {
      params.set("dept", dept);
      params.delete("department");
    }
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
      params.delete("search");
    }
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const handleReset = () => {
    setSelectedDepartment("All");
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("dept");
    params.delete("department");
    params.delete("q");
    params.delete("search");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const filteredDoctors: Doctor[] = useMemo(() => {
    return DOCTORS.filter((doctor) => {
      const matchesDept =
        selectedDepartment === "All" || doctor.department === selectedDepartment;

      if (!matchesDept) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = doctor.name.toLowerCase().includes(q);
      const matchSpecialty = doctor.specialty.toLowerCase().includes(q);
      const matchDept = doctor.department.toLowerCase().includes(q);
      const matchConditions = doctor.conditionsTreated.some((c) =>
        c.toLowerCase().includes(q)
      );

      return matchName || matchSpecialty || matchDept || matchConditions;
    });
  }, [selectedDepartment, searchQuery]);

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="bg-surface border border-line rounded-2xl p-5 sm:p-6 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-paper border border-line text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:border-red transition-colors"
            />
          </div>

          <div className="text-xs text-ink-soft flex items-center justify-between md:justify-end gap-3">
            <span>
              Showing <strong className="text-ink font-semibold">{filteredDoctors.length}</strong> of{" "}
              {DOCTORS.length} specialists
            </span>
            {(selectedDepartment !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDepartment("All");
                  setSearchQuery("");
                }}
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-red hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
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
                onClick={() => setSelectedDepartment(dept.value)}
                onClick={() => handleSelectDepartment(dept.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-blue cursor-pointer ${
                  isSelected
                    ? "bg-red text-white shadow-xs"
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
            No doctors match your criteria
          </h3>
          <p className="text-ink-soft text-sm mb-6 leading-relaxed">
            We couldn&apos;t find any doctors matching &quot;{searchQuery}&quot;. Try adjusting your search query or clear the filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDepartment("All");
              setSearchQuery("");
            }}
            className="inline-flex items-center justify-center bg-red hover:bg-red-deep text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
            onClick={handleReset}
            className="inline-flex items-center justify-center bg-red hover:bg-red-deep text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Show all 16 specialists
          </button>
        </div>
      )}

      {/* Front Desk Assistance Bar */}
      <div className="mt-12 p-6 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-ink text-base">
            Can&apos;t find the right specialist or timing?
          </h3>
          <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
            Call our front desk to confirm daily OPD timings, token availability, or emergency visiting doctors.
          </p>
        </div>

        <a
          href={`tel:${CENTRE_INFO.phones.primary}`}
          className="inline-flex items-center gap-2 bg-red hover:bg-red-deep text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shrink-0 shadow-xs"
        >
          <Phone className="w-4 h-4" />
          <span>Call Reception: {CENTRE_INFO.phones.displayPrimary}</span>
        </a>
      </div>
    </div>
  );
}

