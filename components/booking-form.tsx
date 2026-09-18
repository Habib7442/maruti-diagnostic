"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  FlaskConical,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { DOCTORS } from "@/data/doctors";
import { TESTS } from "@/data/tests";
import { CENTRE_INFO } from "@/data/centre";

type EnquiryType = "doctor" | "test" | "general";

interface BookingFormProps {
  initialType?: EnquiryType;
  initialTarget?: string;
  className?: string;
}

export function BookingForm({
  initialType = "doctor",
  className = "",
}: BookingFormProps) {
  const searchParams = useSearchParams();

  // URL query param overrides
  const paramDoctor = searchParams.get("doctor");
  const paramTest = searchParams.get("test");
  const paramType = searchParams.get("type") as EnquiryType | null;

  const [type, setType] = useState<EnquiryType>(() => {
    if (paramDoctor) return "doctor";
    if (paramTest) return "test";
    if (paramType && ["doctor", "test", "general"].includes(paramType)) return paramType;
    return initialType;
  });

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(() => {
    if (paramDoctor) {
      const match = DOCTORS.find(
        (d) =>
          d.name.toLowerCase().includes(paramDoctor.toLowerCase()) ||
          d.slug === paramDoctor
      );
      return match ? match.id : DOCTORS[0].id;
    }
    return DOCTORS[0].id;
  });

  const [selectedTestId, setSelectedTestId] = useState<string>(() => {
    if (paramTest) {
      const match = TESTS.find(
        (t) =>
          t.name.toLowerCase().includes(paramTest.toLowerCase()) ||
          t.slug === paramTest
      );
      return match ? match.id : TESTS[0].id;
    }
    return TESTS[0].id;
  });

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [sentSummary, setSentSummary] = useState<{
    name: string;
    phone: string;
    service: string;
    date: string;
    whatsappUrl: string;
  } | null>(null);

  // Sync state if query params change
  useEffect(() => {
    if (paramDoctor) {
      setType("doctor");
      const match = DOCTORS.find(
        (d) =>
          d.name.toLowerCase().includes(paramDoctor.toLowerCase()) ||
          d.slug === paramDoctor
      );
      if (match) setSelectedDoctorId(match.id);
    } else if (paramTest) {
      setType("test");
      const match = TESTS.find(
        (t) =>
          t.name.toLowerCase().includes(paramTest.toLowerCase()) ||
          t.slug === paramTest
      );
      if (match) setSelectedTestId(match.id);
    }
  }, [paramDoctor, paramTest]);

  const selectedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId);
  const selectedTest = TESTS.find((t) => t.id === selectedTestId);
  const todayString = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (patientName.trim().length < 2) {
      setErrorMessage("Please enter the patient's full name.");
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage(
        "Please enter a valid 10-digit Indian mobile number (e.g. 9957832872)."
      );
      return;
    }

    const serviceName =
      type === "doctor"
        ? `${selectedDoctor?.name || "Doctor Consultation"} (${selectedDoctor?.specialty || ""})`
        : type === "test"
        ? `${selectedTest?.name || "Diagnostic Test"} [${selectedTest?.category || ""}]`
        : "General Diagnostic & Chamber Enquiry";

    const formattedDate = preferredDate || "Earliest Available Date";

    // Build real WhatsApp message string
    const lines = [
      `*Maruti Diagnostic Centre - Appointment Request*`,
      `• *Service*: ${serviceName}`,
      `• *Patient Name*: ${patientName.trim()}`,
      `• *Contact Number*: +91 ${cleanPhone}`,
      `• *Preferred Date*: ${formattedDate}`,
    ];

    if (message.trim()) {
      lines.push(`• *Note / Symptoms*: ${message.trim()}`);
    }

    lines.push(
      ``,
      `Please confirm token availability & timings at your Ghungoor chamber.`
    );

    const fullMessage = lines.join("\n");
    const targetWhatsAppUrl = `https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${encodeURIComponent(
      fullMessage
    )}`;

    // Store summary
    setSentSummary({
      name: patientName.trim(),
      phone: cleanPhone,
      service: serviceName,
      date: formattedDate,
      whatsappUrl: targetWhatsAppUrl,
    });

    // Open real WhatsApp directly in new window
    window.open(targetWhatsAppUrl, "_blank", "noopener,noreferrer");
  };

  const resetForm = () => {
    setSentSummary(null);
    setPatientName("");
    setPhone("");
    setPreferredDate("");
    setMessage("");
    setErrorMessage("");
  };

  return (
    <div
      className={`bg-surface border border-line rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs ${className}`}
    >
      {/* Sent Confirmation View */}
      {sentSummary ? (
        <div className="py-4 text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/15 text-[#128C7E] border border-[#25D366]/30 flex items-center justify-center mx-auto shadow-xs">
            <MessageCircle className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-display font-medium text-2xl text-ink">
              Opening WhatsApp Enquiry
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed">
              Your appointment request was prepared for our official WhatsApp number{" "}
              <strong className="text-ink font-semibold">
                {CENTRE_INFO.whatsapp.display}
              </strong>
              . If WhatsApp did not launch automatically, tap the button below:
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="bg-paper border border-line rounded-xl p-5 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2.5">
            <div className="flex justify-between pb-2 border-b border-line/60">
              <span className="text-ink-soft">Service:</span>
              <span className="font-semibold text-ink text-right max-w-[60%] truncate">
                {sentSummary.service}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-line/60">
              <span className="text-ink-soft">Patient:</span>
              <span className="font-medium text-ink">{sentSummary.name}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-line/60">
              <span className="text-ink-soft">Phone:</span>
              <span className="font-medium text-ink">+91 {sentSummary.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Date:</span>
              <span className="font-medium text-ink">{sentSummary.date}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 max-w-md mx-auto space-y-3">
            <a
              href={sentSummary.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tap to Open WhatsApp Chat</span>
            </a>

            <a
              href={`tel:${CENTRE_INFO.phones.primary}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-paper hover:bg-clay/30 border border-line text-ink font-medium text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red" />
              <span>Call Reception Directly: {CENTRE_INFO.phones.displayPrimary}</span>
            </a>

            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-ink-soft hover:text-red transition-colors block mx-auto pt-2 cursor-pointer"
            >
              Book another doctor or test
            </button>
          </div>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mode Selector Tabs */}
          <div>
            <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider block mb-2.5">
              Select Appointment Category
            </label>
            <div className="grid grid-cols-3 gap-2 bg-paper p-1.5 rounded-2xl border border-line">
              <button
                type="button"
                onClick={() => setType("doctor")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  type === "doctor"
                    ? "bg-red text-white shadow-xs"
                    : "text-ink hover:text-red hover:bg-surface"
                }`}
              >
                <Stethoscope className="w-4 h-4 shrink-0" />
                <span className="truncate">Doctor Visit</span>
              </button>

              <button
                type="button"
                onClick={() => setType("test")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  type === "test"
                    ? "bg-red text-white shadow-xs"
                    : "text-ink hover:text-red hover:bg-surface"
                }`}
              >
                <FlaskConical className="w-4 h-4 shrink-0" />
                <span className="truncate">Diagnostic Test</span>
              </button>

              <button
                type="button"
                onClick={() => setType("general")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  type === "general"
                    ? "bg-red text-white shadow-xs"
                    : "text-ink hover:text-red hover:bg-surface"
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span className="truncate">General Query</span>
              </button>
            </div>
          </div>

          {/* Doctor Selection */}
          {type === "doctor" && (
            <div className="space-y-2">
              <label
                htmlFor="doctor_select"
                className="text-xs font-semibold text-ink-soft uppercase tracking-wider block"
              >
                Choose Consulting Doctor (16 Specialists)
              </label>
              <select
                id="doctor_select"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full px-3.5 py-3 rounded-[10px] bg-paper border border-line text-sm text-ink focus:outline-none focus:border-red transition-colors"
              >
                {DOCTORS.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.specialty} ({doc.chamberTiming})
                  </option>
                ))}
              </select>

              {selectedDoctor && (
                <div className="p-3 bg-paper/60 rounded-xl border border-line/70 flex items-center justify-between text-xs text-ink-soft">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-red shrink-0" />
                    <span>
                      OPD Timings:{" "}
                      <strong className="text-ink">{selectedDoctor.chamberTiming}</strong>
                    </span>
                  </div>
                  {selectedDoctor.fee && (
                    <span className="font-medium text-ink">
                      Fee: ₹{selectedDoctor.fee}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Diagnostic Test Selection */}
          {type === "test" && (
            <div className="space-y-2">
              <label
                htmlFor="test_select"
                className="text-xs font-semibold text-ink-soft uppercase tracking-wider block"
              >
                Choose Test / Scan
              </label>
              <select
                id="test_select"
                value={selectedTestId}
                onChange={(e) => setSelectedTestId(e.target.value)}
                className="w-full px-3.5 py-3 rounded-[10px] bg-paper border border-line text-sm text-ink focus:outline-none focus:border-red transition-colors"
              >
                {TESTS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} [{t.category}] {t.price ? `— ₹${t.price}` : ""}
                  </option>
                ))}
              </select>

              {selectedTest && (
                <div className="p-3 bg-paper/60 rounded-xl border border-line/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-ink-soft">
                  <span>
                    Report: <strong className="text-ink">{selectedTest.reportTurnaround}</strong>
                  </span>
                  <span className="text-[11px] text-ink-soft/80">
                    {selectedTest.preparation}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Patient Details: Name and Phone in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="patient_name"
                className="text-xs font-semibold text-ink-soft uppercase tracking-wider block mb-1.5"
              >
                Patient Full Name <span className="text-red">*</span>
              </label>
              <input
                id="patient_name"
                type="text"
                required
                placeholder="e.g. Joydeep Das"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-3 rounded-[10px] bg-paper border border-line text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-red transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="patient_phone"
                className="text-xs font-semibold text-ink-soft uppercase tracking-wider block mb-1.5"
              >
                WhatsApp / Mobile Number <span className="text-red">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-soft">
                  +91
                </span>
                <input
                  id="patient_phone"
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="99578 32872"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-12 pr-3.5 py-3 rounded-[10px] bg-paper border border-line text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-red transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Preferred Date */}
          <div>
            <label
              htmlFor="preferred_date"
              className="text-xs font-semibold text-ink-soft uppercase tracking-wider block mb-1.5"
            >
              Preferred Consultation / Test Date (Optional)
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="preferred_date"
                type="date"
                min={todayString}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 rounded-[10px] bg-paper border border-line text-sm text-ink focus:outline-none focus:border-red transition-colors"
              />
            </div>
          </div>

          {/* Message / Symptoms Notes */}
          <div>
            <label
              htmlFor="patient_message"
              className="text-xs font-semibold text-ink-soft uppercase tracking-wider block mb-1.5"
            >
              Symptoms, Reason for Visit, or Special Notes (Optional)
            </label>
            <textarea
              id="patient_message"
              rows={3}
              placeholder="e.g. Experiencing back pain, or need morning fasting blood sample..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-3 rounded-[10px] bg-paper border border-line text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-red transition-colors resize-none"
            />
          </div>

          {/* Error Message banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red/10 border border-red/20 text-red text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Direct WhatsApp Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm sm:text-base transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Booking on WhatsApp (+91 {CENTRE_INFO.whatsapp.number})</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-ink-soft mt-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>Opens real WhatsApp directly. No payment or account required.</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
