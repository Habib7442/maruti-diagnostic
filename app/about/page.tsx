import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Clock,
  MapPin,
  FlaskConical,
  Scan,
  Activity,
  HeartPulse,
  Award,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { CENTRE_INFO } from "@/data/centre";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PAGE_TITLE = "About Us — Diagnostics & Doctor Chamber in Ghungoor, Silchar";
const PAGE_DESCRIPTION = `About ${CENTRE_INFO.name} at SMC Point, Ghungoor, Silchar (opposite SMCH). Daily chamber for ${CENTRE_INFO.stats.specialistsCount} medical specialists with pathology, X-ray, ultrasound, ECG and endoscopy.`;

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  const stats = [
    {
      value: "16+",
      label: "Consulting Specialists",
      detail: "Across 9 medical disciplines",
    },
    {
      value: "8+",
      label: "Years of Trust",
      detail: "Serving families across Cachar",
    },
    {
      value: "4",
      label: "Diagnostic Modalities",
      detail: "Pathology, USG, X-Ray, ECG",
    },
    {
      value: "7:30 AM",
      label: "Early Sample Collection",
      detail: "Convenient morning fasting tests",
    },
  ];

  const qualityProtocols = [
    {
      icon: FlaskConical,
      title: "Automated Clinical Analyzers",
      description:
        "Blood and biochemistry samples are processed using fully automated, multi-channel analyzers to ensure high analytical precision and eliminate manual pipetting errors.",
    },
    {
      icon: ShieldCheck,
      title: "Daily Calibration & Internal Controls",
      description:
        "Before patient testing begins each morning, our laboratory instruments undergo rigorous calibration checks using standardized reference controls to verify accuracy.",
    },
    {
      icon: Award,
      title: "Hygienic Vacuum Phlebotomy",
      description:
        "All blood collections are performed with single-use, sterile vacuum tubes (vacutainers) by experienced phlebotomists, maximizing safety and preventing sample contamination.",
    },
    {
      icon: Stethoscope,
      title: "Physician & Sonologist Oversight",
      description:
        "Imaging scans (ultrasound, digital X-rays) and clinical reports are interpreted and validated by experienced sonologists and medical practitioners before release.",
    },
  ];

  const departments = [
    {
      icon: FlaskConical,
      name: "Pathology & Biochemistry",
      description:
        "Comprehensive hematology (CBC, ESR), diabetes monitoring (HbA1c, FBS/PPBS), thyroid assays (T3, T4, TSH), lipid profiles, liver enzymes, kidney parameters, and routine urine microscopy.",
      turnaround: "Same-day evening reports",
    },
    {
      icon: Scan,
      name: "High-Resolution Ultrasound (USG)",
      description:
        "Advanced sonographic imaging for whole abdomen, KUB, pelvic anatomy, obstetric antenatal monitoring, and abdominal organ screenings conducted in private suites.",
      turnaround: "Reports within 1 to 2 hours of scan",
    },
    {
      icon: Activity,
      name: "Digital Radiography (X-Ray)",
      description:
        "Low-dose digital X-ray imaging for chest PA views, spinal columns, orthopaedic trauma, and skeletal joints, providing sharp digital clarity with minimal patient exposure.",
      turnaround: "Ready within 30 to 45 minutes",
    },
    {
      icon: HeartPulse,
      name: "Cardiac ECG & Video Endoscopy",
      description:
        "Standard 12-lead electrocardiograms for immediate rhythm screening, alongside high-definition upper gastrointestinal video endoscopy for ulcer and reflux diagnosis.",
      turnaround: "Immediate ECG readouts; same-day endoscopy",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/about",
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            type: "AboutPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <div className="bg-paper min-h-screen py-6 sm:py-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-ink-soft mb-6"
          >
            <Link
              href="/"
              className="hover:text-ink transition-colors hover:underline"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-soft/70 shrink-0" />
            <span className="text-ink font-medium" aria-current="page">
              About Us
            </span>
          </nav>

          {/* Page Hero Header */}
          <header className="mb-12 sm:mb-16 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red" />
              <span>Established in Ghungoor, Silchar</span>
            </div>

            <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-4">
              Dependable diagnostics & trusted specialists in Silchar
            </h1>

            <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
              Situated at SMC Point, Ghungoor, directly opposite Silchar Medical College & Hospital (behind Maruti Medical), we bring expert clinical consultations and automated laboratory testing together in one dedicated facility.
            </p>
          </header>

          {/* Key Facts / Statistics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-surface border border-line rounded-2xl p-6 shadow-xs text-center sm:text-left"
              >
                <span className="font-display font-semibold text-3xl sm:text-4xl text-ink block mb-1">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-ink block">
                  {stat.label}
                </span>
                <span className="text-xs text-ink-soft mt-0.5 block">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Founding Story & Purpose (2 Columns) */}
          <section className="bg-surface border border-line rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 mb-16 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-line text-xs font-medium text-ink-soft">
                  <Stethoscope className="w-3.5 h-3.5 text-red" />
                  <span>Our Mission & Origin</span>
                </div>

                <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-ink leading-tight">
                  Bridging the gap between specialist consultations and precise lab results
                </h2>

                <div className="space-y-4 text-ink/90 text-sm sm:text-base leading-relaxed">
                  <p>
                    For years, patients travelling to Ghungoor for medical care had to shuttle back and forth between separate consultation rooms and distant testing laboratories. A morning blood test often meant waiting days for a printed readout, delaying essential treatment decisions.
                  </p>
                  <p>
                    <strong className="text-ink font-semibold">Maruti Diagnostic Centre</strong> was founded to solve this challenge. By housing <strong className="text-ink font-semibold">16 consulting medical specialists</strong> across 9 departments under one roof alongside automated pathology, high-resolution sonography, and digital radiography, we provide patients with an integrated, reassuring experience.
                  </p>
                  <p>
                    Whether you need an early morning fasting blood sugar check before work, an urgent digital chest X-ray, or an afternoon consultation with an experienced neurosurgeon, gynaecologist, or physician, our facility ensures compassionate, streamlined care right opposite SMCH.
                  </p>
                </div>
              </div>

              {/* Strategic Location Highlight Card */}
              <div className="lg:col-span-5 bg-paper rounded-2xl p-6 sm:p-7 border border-line space-y-4">
                <div className="flex items-center gap-2 text-ink font-semibold text-sm pb-3 border-b border-line">
                  <MapPin className="w-4 h-4 text-red shrink-0" />
                  <span>Strategic Landmark Location</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-ink-soft">
                  <p className="leading-relaxed">
                    <strong className="text-ink font-medium">SMC Point, Ghungoor:</strong> Located directly across the main entrance of Silchar Medical College & Hospital (SMCH), behind Maruti Medical store.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-ink font-medium">Regional Access:</strong> Conveniently accessible for patients and families travelling from Hailakandi, Karimganj, Udharbond, and the tea garden communities of southern Assam.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-ink font-medium">On-Site Pharmacy Proximity:</strong> Situated right behind Maruti Medical, enabling prompt prescription fulfillment immediately following your chamber consultation.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:underline"
                  >
                    <span>View interactive map & directions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Quality Standards & Testing Protocols (4 Cards) */}
          <section className="mb-16">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-line text-xs font-medium text-ink-soft mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-blue" />
                <span>Quality & Compliance</span>
              </div>

              <h2 className="font-display font-medium text-3xl sm:text-4xl text-ink leading-tight tracking-tight mb-3">
                Rigorous testing standards you can rely on
              </h2>

              <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
                Clinical accuracy is our highest priority. Every sample processed and every scan performed follows strict quality assurance protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {qualityProtocols.map((protocol, index) => {
                const Icon = protocol.icon;
                return (
                  <div
                    key={index}
                    className="bg-surface border border-line rounded-2xl p-6 sm:p-8 hover:border-ink/20 transition-all hover:shadow-xs"
                  >
                    <div className="w-12 h-12 rounded-xl bg-paper border border-line flex items-center justify-center text-red mb-5">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-display font-medium text-xl text-ink mb-2">
                      {protocol.title}
                    </h3>

                    <p className="text-sm text-ink-soft leading-relaxed">
                      {protocol.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Diagnostic Departments Overview */}
          <section className="mb-16 bg-clay/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-line">
            <div className="max-w-2xl mb-8">
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-ink mb-2">
                Our core diagnostic modalities
              </h2>
              <p className="text-sm text-ink-soft">
                Fully equipped on-site facilities designed for prompt turnaround and clear clinical reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <div
                    key={index}
                    className="bg-surface border border-line rounded-xl p-5 sm:p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-paper border border-line flex items-center justify-center text-red shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-ink text-base">
                          {dept.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-4">
                        {dept.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-line/60 flex items-center gap-1.5 text-xs text-ink-soft">
                      <Clock className="w-3.5 h-3.5 text-red shrink-0" />
                      <span>Turnaround: <strong className="text-ink font-medium">{dept.turnaround}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Doctor Chamber Hub Callout Band */}
          <section className="bg-surface border border-line rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-16 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-red block mb-2">
                16 Consulting Medical Specialists
              </span>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-ink leading-tight mb-3">
                Daily OPD chambers with Silchar&apos;s experienced doctors
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Consult with specialists across Neurosurgery, General Medicine, Gynaecology, ENT, Orthopaedics, Paediatrics, Dermatology, Laparoscopic Surgery, and Psychiatry. View individual chamber timings, fees, and consultation schedules.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/doctors"
                className="px-6 py-3.5 rounded-full bg-ink hover:bg-ink/90 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                Browse All Doctors
              </Link>

              <Link
                href="/booking"
                className="px-6 py-3.5 rounded-full bg-red hover:bg-red-deep text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                Book Consultation
              </Link>
            </div>
          </section>

          {/* Bottom Direct Contact & WhatsApp Bar */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <h3 className="font-semibold text-ink text-base">
                Have questions about tests, timings, or doctors?
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
                Our reception team at Ghungoor is ready to assist you via phone or WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={`tel:${CENTRE_INFO.phones.primary}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper hover:bg-clay/40 border border-line text-xs font-semibold text-ink transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red" />
                <span>Call {CENTRE_INFO.phones.displayPrimary}</span>
              </a>

              <a
                href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${encodeURIComponent(
                  "Hello Maruti Diagnostic Centre, I would like to enquire about doctor chamber schedules and test rates."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <Image
                  src="/social-icons/whatsapp.png"
                  alt="WhatsApp"
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain"
                />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

