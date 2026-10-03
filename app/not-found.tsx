import Link from "next/link";
import { Phone } from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";

export default function NotFound() {
  return (
    <div className="bg-paper py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-medium text-3xl sm:text-4xl text-ink leading-tight mb-4">
          We couldn&apos;t find that page
        </h1>
        <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-8">
          The page may have moved. You can find every doctor and test from the links below, or call us.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/doctors"
            className="inline-flex items-center min-h-12 px-6 rounded-full bg-red hover:bg-red-deep text-white font-medium transition-colors"
          >
            Find a doctor
          </Link>
          <Link
            href="/tests"
            className="inline-flex items-center min-h-12 px-6 rounded-full bg-surface hover:bg-clay/40 border border-line text-ink font-medium transition-colors"
          >
            See tests
          </Link>
          <a
            href={`tel:${CENTRE_INFO.phones.primary}`}
            className="inline-flex items-center gap-2 min-h-12 px-6 rounded-full bg-surface hover:bg-clay/40 border border-line text-ink font-medium transition-colors"
          >
            <Phone className="w-4 h-4 text-red" />
            <span>Call {CENTRE_INFO.phones.displayPrimary}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
