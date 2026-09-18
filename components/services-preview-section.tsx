import Link from "next/link";
import Image from "next/image";
import {
  FlaskConical,
  Scan,
  Activity,
  FileCheck2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";

export function ServicesPreviewSection() {
  const services = [
    {
      title: "Pathology & Biochemistry",
      icon: FlaskConical,
      badge: "Same-Day Reports",
      description:
        "Comprehensive blood, serum, and urine diagnostics processed on automated clinical analyzers with strict quality control.",
      popularTests: [
        "Complete Blood Count (CBC)",
        "Thyroid Profile (T3, T4, TSH)",
        "Blood Sugar (Fasting & PP)",
        "HbA1c Glycated Haemoglobin",
        "Lipid & Cholesterol Profile",
        "Liver & Kidney Function Tests (LFT / KFT)",
      ],
      turnaround: "Reports ready by same-day evening",
      actionText: "Book Blood Test",
      actionHref: "/booking?type=test",
    },
    {
      title: "High-Resolution Ultrasound (USG)",
      icon: Scan,
      badge: "Expert Sonology",
      description:
        "Detailed sonographic imaging of abdominal and pelvic anatomy, aiding early detection of stones, fatty liver, and soft tissue pathologies.",
      popularTests: [
        "Whole Abdomen & Pelvis USG",
        "KUB & Urinary Bladder",
        "Obstetric & Antenatal Scans",
        "Upper Abdominal Sonography",
      ],
      turnaround: "Report ready within 1 to 2 hours of scan",
      actionText: "Schedule USG Scan",
      actionHref: "/booking?type=test",
    },
    {
      title: "Digital Radiography (X-Ray)",
      icon: Activity,
      badge: "Low-Dose Digital",
      description:
        "High-definition digital X-rays offering crystal-clear bone, chest, and joint visualization with reduced radiation exposure.",
      popularTests: [
        "Digital Chest X-Ray (PA View)",
        "Cervical & Lumbar Spine",
        "Orthopaedic Extremity & Joint Views",
        "Abdominal & Pelvic Radiography",
      ],
      turnaround: "Film & digital report in 30 to 45 mins",
      actionText: "Book Digital X-Ray",
      actionHref: "/booking?type=test",
    },
    {
      title: "Cardiac ECG & Video Endoscopy",
      icon: FileCheck2,
      badge: "Physician Review",
      description:
        "Critical non-invasive cardiac evaluation alongside specialized upper gastrointestinal video endoscopy for diagnostic clarity.",
      popularTests: [
        "12-Lead Electrocardiogram (ECG)",
        "Upper GI Diagnostic Endoscopy",
        "Cardiac Rhythm Screening",
        "GERD & Peptic Ulcer Evaluation",
      ],
      turnaround: "Immediate ECG readouts; same-day endoscopy",
      actionText: "Enquire Investigation",
      actionHref: "/booking?type=test",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-paper border-t border-line">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue" />
              <span>Diagnostic & Laboratory Facilities</span>
            </div>

            <h2 className="font-display font-medium text-3xl sm:text-4xl text-ink leading-tight tracking-tight mb-3">
              High-precision laboratory & imaging services
            </h2>

            <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
              Equipped with automated clinical analyzers, digital X-ray, high-resolution ultrasound, and cardiac monitoring at SMC Point, Ghungoor (directly opposite SMCH).
            </p>
          </div>

          <Link
            href="/booking?type=test"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red hover:text-red-deep transition-colors self-start md:self-end"
          >
            <span>Book a test via WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Diagnostic Modality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className="bg-surface border border-line rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-ink/20 transition-all hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-paper border border-line flex items-center justify-center text-red">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-paper border border-line text-ink-soft">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-medium text-xl sm:text-2xl text-ink mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-sm text-ink-soft leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Common Investigations List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft block">
                      Common Investigations
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink">
                      {service.popularTests.map((testName, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 bg-paper px-3 py-2 rounded-lg border border-line/60"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />
                          <span className="truncate">{testName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action & Turnaround Footer */}
                <div className="pt-4 border-t border-line/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-ink-soft">
                    <Clock className="w-3.5 h-3.5 text-ink-soft shrink-0" />
                    <span>{service.turnaround}</span>
                  </div>

                  <Link
                    href={service.actionHref}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-paper hover:bg-red hover:text-white border border-line text-xs font-semibold text-ink transition-colors"
                  >
                    <span>{service.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Prescription & Walk-in Reassurance Strip */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-clay/30 border border-line flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-surface border border-line flex items-center justify-center shrink-0 text-red">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-ink text-base">
                Have a Doctor&apos;s Prescription or Need Morning Fasting Tests?
              </h4>
              <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
                Our blood collection counter opens daily at 7:30 AM. Walk-in patients from SMCH and across Silchar are welcome.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${encodeURIComponent(
              "Hello Maruti Diagnostic Centre, I have a doctor prescription for diagnostic tests. Please let me know the procedure and timings."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
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
    </section>
  );
}

