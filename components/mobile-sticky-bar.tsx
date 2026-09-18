import Image from "next/image";
import { Phone } from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";

export function MobileStickyBar() {
  return (
    <aside
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-md border-t border-line px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-lg"
      aria-label="Quick contact bar"
    >
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href={`tel:${CENTRE_INFO.phones.primary}`}
          className="flex items-center justify-center gap-2 h-12 rounded-full bg-ink text-paper font-medium text-sm transition-transform active:scale-[0.98]"
          aria-label="Call Maruti Diagnostic Centre immediately"
        >
          <Phone className="w-4 h-4 text-paper stroke-[2.2]" />
          <span>Call Now</span>
        </a>

        <a
          href={CENTRE_INFO.whatsapp.chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-12 rounded-full bg-red hover:bg-red-deep text-white font-medium text-sm transition-transform active:scale-[0.98] shadow-xs"
          aria-label="Send WhatsApp message to Maruti Diagnostic Centre"
        >
          <Image
            src="/social-icons/whatsapp.png"
            alt="WhatsApp"
            width={22}
            height={22}
            className="w-5 h-5 object-contain shrink-0"
          />
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}

