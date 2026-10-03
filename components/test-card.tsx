import Link from "next/link";
import Image from "next/image";
import { Clock, Phone, FlaskConical, Scan, Activity, FileCheck2, Brain } from "lucide-react";
import type { MedicalTest, TestCategory } from "@/data/tests";
import { CENTRE_INFO } from "@/data/centre";

const CATEGORY_ICONS: Record<TestCategory, typeof FlaskConical> = {
  Pathology: FlaskConical,
  Imaging: Scan,
  Cardiac: Activity,
  Endoscopy: FileCheck2,
  Neurology: Brain,
};

interface TestCardProps {
  test: MedicalTest;
}

function CategoryIcon({ category }: { category: TestCategory }) {
  const Icon = CATEGORY_ICONS[category];
  return <Icon className="w-3.5 h-3.5 text-red shrink-0" />;
}

export function TestCard({ test }: TestCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello Maruti Diagnostic Centre, I would like to book / enquire about the ${test.name} test at your Ghungoor centre.`
  );

  return (
    <article className="group bg-surface border border-line rounded-2xl p-5 sm:p-6 transition-colors hover:border-ink/30 flex flex-col justify-between h-full">
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full bg-paper border border-line text-ink-soft">
            <CategoryIcon category={test.category} />
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

        {/* Report time & booking strip */}
        <div className="pt-3 border-t border-line/70 flex items-center justify-between text-xs text-ink mb-4">
          <div className="flex items-center gap-1.5 text-ink-soft">
            <Clock className="w-3.5 h-3.5 text-ink-soft shrink-0" />
            <span className="font-medium text-ink">{test.reportTurnaround}</span>
          </div>

          <a
            href={`tel:${CENTRE_INFO.phones.primary}`}
            className="inline-flex items-center gap-1 min-h-10 font-medium text-red-deep hover:underline"
          >
            <Phone className="w-3 h-3" />
            <span>Call to book test</span>
          </a>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-line/70 flex items-center justify-between gap-3 mt-auto">
        <Link
          href={`/tests/${test.slug}`}
          className="inline-flex items-center min-h-12 text-sm font-medium text-ink hover:text-red transition-colors"
        >
          Preparation and details
        </Link>

        <a
          href={`https://wa.me/91${CENTRE_INFO.whatsapp.number}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 min-h-12 text-xs font-medium bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 px-4 rounded-full text-[#0E6F63] transition-colors"
          aria-label={`Book ${test.name} on WhatsApp`}
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

