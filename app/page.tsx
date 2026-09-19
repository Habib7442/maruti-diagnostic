import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { DoctorPreviewSection } from "@/components/doctor-preview-section";
import { ServicesPreviewSection } from "@/components/services-preview-section";
import { FacilityHighlightsSection } from "@/components/facility-highlights-section";
import { LocationMapSection } from "@/components/location-map-section";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { getHomeFaqs } from "@/data/faqs";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SEO, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    path: "/",
  }),
  title: { absolute: SEO.defaultTitle },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/",
            name: SEO.defaultTitle,
            description: SEO.defaultDescription,
          }),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />
      <Hero />
      <DoctorPreviewSection />
      <ServicesPreviewSection />
      <FacilityHighlightsSection />
      <FaqSection
        standalone
        heading="Common questions about Maruti Diagnostic Centre"
        faqs={getHomeFaqs()}
      />
      <LocationMapSection />
    </>
  );
}
