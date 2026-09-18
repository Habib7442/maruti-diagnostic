"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, RotateCcw, FlaskConical } from "lucide-react";
import { TESTS, TEST_CATEGORIES, TestCategory, MedicalTest } from "@/data/tests";
import { TestCard } from "@/components/test-card";
import { CENTRE_INFO } from "@/data/centre";

export function TestDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests: MedicalTest[] = useMemo(() => {
    return TESTS.filter((test) => {
      const matchesCategory =
        selectedCategory === "All" || test.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = test.name.toLowerCase().includes(q);
      const matchCategory = test.category.toLowerCase().includes(q);
      const matchDesc = test.shortDescription.toLowerCase().includes(q);
      const matchClinical = test.clinicalImportance.toLowerCase().includes(q);

      return matchName || matchCategory || matchDesc || matchClinical;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      {/* Search and Category Filter Bar */}
      <div className="bg-surface border border-line rounded-2xl p-5 sm:p-6 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search blood tests, ultrasound, digital X-ray..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-paper border border-line text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:border-red transition-colors"
            />
          </div>

          <div className="text-xs text-ink-soft flex items-center justify-between md:justify-end gap-3">
            <span>
              Showing <strong className="text-ink font-semibold">{filteredTests.length}</strong> of{" "}
              {TESTS.length} investigations
            </span>
            {(selectedCategory !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-1 text-xs text-red hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
          {TEST_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-blue cursor-pointer ${
                  isSelected
                    ? "bg-red text-white shadow-xs"
                    : "bg-paper hover:bg-clay/40 border border-line text-ink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Test Cards Grid */}
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-line rounded-2xl p-10 text-center max-w-lg mx-auto my-8">
          <FlaskConical className="w-8 h-8 text-ink-soft mx-auto mb-3" />
          <h3 className="text-ink font-display font-medium text-lg mb-2">
            No diagnostic tests match your search
          </h3>
          <p className="text-ink-soft text-sm mb-6 leading-relaxed">
            We couldn&apos;t find any tests matching &quot;{searchQuery}&quot;. Please adjust your keywords or contact our laboratory desk directly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="inline-flex items-center justify-center bg-red hover:bg-red-deep text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Show all diagnostic tests
          </button>
        </div>
      )}

      {/* Prescription Upload / WhatsApp Assistance Strip */}
      <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h3 className="font-semibold text-ink text-base">
            Have a prescription from your doctor?
          </h3>
          <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
            Send a photo of your doctor&apos;s prescription on WhatsApp. Our lab desk will confirm fasting requirements, costs, and timings immediately.
          </p>
        </div>

        <a
          href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${encodeURIComponent(
            "Hello Maruti Diagnostic Centre, I have a prescription for diagnostic tests. Please provide test rates and preparation instructions."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full transition-colors shrink-0 shadow-xs"
        >
          <Image
            src="/social-icons/whatsapp.png"
            alt="WhatsApp"
            width={20}
            height={20}
            className="w-4 h-4 object-contain"
          />
          <span>Send Prescription on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

