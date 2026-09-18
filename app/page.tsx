import { Hero } from "@/components/hero";
import { DoctorPreviewSection } from "@/components/doctor-preview-section";
import { CENTRE_INFO } from "@/data/centre";

export default function Home() {
  // MedicalClinic JSON-LD Structured Data for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: CENTRE_INFO.name,
    legalName: CENTRE_INFO.legalName,
    url: "https://marutidiagnostic.com",
    logo: `https://marutidiagnostic.com${CENTRE_INFO.logoUrl}`,
    description: `${CENTRE_INFO.name} is a trusted diagnostic facility and daily chamber for 16 medical specialists located opposite SMCH, Ghungoor, Silchar.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: CENTRE_INFO.address.streetAddress,
      addressLocality: CENTRE_INFO.address.addressLocality,
      addressRegion: CENTRE_INFO.address.addressRegion,
      postalCode: CENTRE_INFO.address.postalCode,
      addressCountry: CENTRE_INFO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CENTRE_INFO.geo.latitude,
      longitude: CENTRE_INFO.geo.longitude,
    },
    telephone: CENTRE_INFO.phones.primary,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:30",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "48",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <DoctorPreviewSection />
    </>
  );
}
