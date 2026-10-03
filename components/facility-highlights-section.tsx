import { DAILY_DOCTOR_COUNT, DOCTORS } from "@/data/doctors";
import {
  Users,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  HeartPulse,
} from "lucide-react";

export function FacilityHighlightsSection() {
  const highlights = [
    {
      icon: Users,
      title: `${DOCTORS.length} specialist doctors`,
      description: `${DAILY_DOCTOR_COUNT} doctors hold a daily chamber and ${DOCTORS.length - DAILY_DOCTOR_COUNT} more see patients by appointment, across Neurosurgery, Medicine, Gynaecology, ENT, Orthopaedics, Paediatrics, Dermatology, Surgery and Psychiatry.`,
    },
    {
      icon: Zap,
      title: "Same-day reports for routine tests",
      description:
        "Routine blood tests are usually reported the same day, so your doctor can review them sooner.",
    },
    {
      icon: ShieldCheck,
      title: "Tests under one roof",
      description:
        "Pathology, digital X-ray, ultrasound (USG), ECG and upper GI endoscopy in the same building as the doctors' chambers.",
    },
    {
      icon: MapPin,
      title: "Opposite SMCH main gate",
      description:
        "Conveniently positioned at SMC Point, Ghungoor, Silchar, with easy accessibility for patients travelling from Hailakandi, Karimganj, and Cachar.",
    },
    {
      icon: Clock,
      title: "Morning fasting samples",
      description:
        "Fasting blood samples are collected from 8:00 AM, Monday to Saturday.",
    },
    {
      icon: HeartPulse,
      title: "Easy booking",
      description:
        "Walk in for a token at the counter, or book by phone or WhatsApp before you come.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-clay/25 border-t border-line">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue" />
            <span>Why patients choose Maruti</span>
          </div>

          <h2 className="font-display font-medium text-3xl sm:text-4xl text-ink leading-tight tracking-tight mb-4">
            Reliable healthcare & diagnostics in Ghungoor
          </h2>

          <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
            Maruti Diagnostic Centre brings doctor chambers, pathology testing, and modern medical imaging together in one trusted facility opposite SMCH.
          </p>
        </div>

        {/* 6 Facility Strength Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-surface border border-line rounded-2xl p-6 sm:p-7 hover:border-ink/20 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-paper border border-line flex items-center justify-center text-red mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-display font-medium text-lg text-ink mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-ink-soft leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

