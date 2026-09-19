import { Plus, Minus } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/data/faqs";

interface FaqSectionProps {
  faqs: Faq[];
  heading: string;
  /** Wraps the list in its own full-width section. Leave false when nesting inside an existing container. */
  standalone?: boolean;
  tone?: "paper" | "clay";
}

export function FaqSection({
  faqs,
  heading,
  standalone = false,
  tone = "paper",
}: FaqSectionProps) {
  if (!faqs.length) return null;

  const list = (
    <div className="max-w-3xl">
      <h2 className="font-display font-medium text-2xl sm:text-3xl text-ink leading-tight mb-6">
        {heading}
      </h2>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group bg-surface border border-line rounded-2xl"
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 font-sans text-base sm:text-lg font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <Plus
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-red group-open:hidden"
              />
              <Minus
                aria-hidden="true"
                className="hidden h-5 w-5 shrink-0 text-red group-open:block"
              />
            </summary>
            <p className="px-5 pb-5 font-sans text-base sm:text-lg leading-relaxed text-ink-soft">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <JsonLd data={faqSchema(faqs)} />
    </div>
  );

  if (!standalone) return list;

  return (
    <section className={tone === "clay" ? "bg-clay" : "bg-paper"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {list}
      </div>
    </section>
  );
}
