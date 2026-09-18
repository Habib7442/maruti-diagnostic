import Link from "next/link";
import Image from "next/image";
import { Clock, IndianRupee, ArrowRight, FlaskConical, Scan, Activity, FileCheck2 } from "lucide-react";
import { MedicalTest, TestCategory } from "@/data/tests";
import { CENTRE_INFO } from "@/data/centre";

interface TestCardProps {
  test: MedicalTest;
}

export function TestCard({ test }: TestCardProps) {
  const getCategoryIcon = (category: TestCategory) => {
    switch (category) {
      case "Pathology":
        return FlaskConical;
      case "Imaging":
        return Scan;
      case "Cardiac":
        return Activity;
      case "Endoscopy":
        return FileCheck2;
      default:
        return FlaskConical;
    }
  };

  const Icon = getCategoryIcon(test.category);

  const whatsappMessage = encodeURIComponent(
    `Hello Maruti Diagnostic Centre, I would like to book / enquire about the ${test.name} test at your Ghungoor centre.`
  );

  return (
    <article className="group bg-surface border border-line rounded-2xl p-5 sm:p-6 transition-all hover:border-ink/30 hover:shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full bg-paper border border-line text-ink-soft">
            <Icon className="w-3.5 h-3.5 text-red shrink-0" />
            <span>{test.category}</span>
          </div>

          {test.sampleType && (
            <span className="text-[11px] text-ink-soft/80 font-normal">
              {test.sampleType}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-sans font-semibold text-lg text-ink leading-snug mb-2 group-hover:text-red transition-colors">
          <Link
            href={`/tests/${test.slug}`}
            className="focus-visible:outline-2 focus-visible:outline-blue rounded-xs"
          >
            {test.name}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-ink-soft leading-relaxed line-clamp-2 mb-4">
          {test.shortDescription}
        </p>

        {/* Timing & Price Strip */}
        <div className="pt-3 border-t border-line/70 flex items-center justify-between text-xs text-ink mb-4">
          <div className="flex items-center gap-1.5 text-ink-soft">
            <Clock className="w-3.5 h-3.5 text-ink-soft shrink-0" />
            <span className="font-medium text-ink">{test.reportTurnaround}</span>
          </div>

          {test.price ? (
            <div className="flex items-center gap-0.5 font-semibold text-ink bg-paper px-2 py-0.5 rounded-md border border-line/60">
              <IndianRupee className="w-3 h-3 text-ink-soft" />
              <span>{test.price}</span>
            </div>
          ) : (
            <span className="text-[11px] text-ink-soft">Rate on enquiry</span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-line/70 flex items-center justify-between gap-3 mt-auto">
        <Link
          href={`/tests/${test.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink group-hover:text-red transition-colors"
        >
          <span>Prep & details</span>
          <ArrowRight className="w-3.5 h-3.5 text-ink-soft group-hover:text-red transition-transform group-hover:translate-x-0.5" />
        </Link>

        <a
          href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 px-3 py-1.5 rounded-full text-[#128C7E] transition-colors"
          title={`Enquire ${test.name} on WhatsApp`}
        >
          <Image
            src="/social-icons/whatsapp.png"
            alt="WhatsApp"
            width={14}
            height={14}
            className="w-3.5 h-3.5 object-contain"
          />
          <span>Book</span>
        </a>
      </div>
    </article>
  );
}

