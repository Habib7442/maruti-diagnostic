import { CENTRE_INFO } from "@/data/centre";
import { DOCTORS, hasVerifiedRegistration } from "@/data/doctors";
import type { Doctor } from "@/data/doctors";
import { TESTS } from "@/data/tests";
import type { MedicalTest, TestCategory } from "@/data/tests";
import type { Faq } from "@/data/faqs";
import { SEO, SITE_URL, absoluteUrl } from "@/lib/seo";

export type JsonLdNode = Record<string, unknown>;

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const SCHEMA = "https://schema.org";
const toE164 = (n: string) => `+91${n}`;

function postalAddress(): JsonLdNode {
  const a = CENTRE_INFO.address;
  return {
    "@type": "PostalAddress",
    streetAddress: a.streetAddress,
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    postalCode: a.postalCode,
    addressCountry: a.addressCountry,
  };
}

/** Minimal inline clinic reference so parsers that don't resolve @id across blocks still get NAP. */
function clinicRef(): JsonLdNode {
  return {
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: CENTRE_INFO.name,
    url: SITE_URL,
    telephone: toE164(CENTRE_INFO.phones.primary),
    address: postalAddress(),
  };
}

const areaServed = [
  { "@type": "City", name: "Silchar" },
  { "@type": "AdministrativeArea", name: "Cachar" },
];

function hoursSpec(days: string[], opens: string, closes: string): JsonLdNode {
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  };
}

// --- Specialty mapping (schema.org MedicalSpecialty enumeration) ---

const DEPARTMENT_SPECIALTY: Record<Doctor["department"], string[]> = {
  Neurosurgery: ["Neurologic", "Surgical"],
  Medicine: ["PrimaryCare"],
  Gynaecology: ["Gynecologic"],
  ENT: ["Otolaryngologic"],
  Orthopaedics: ["Musculoskeletal"],
  Paediatrics: ["Pediatric"],
  Dermatology: ["Dermatology"],
  Surgery: ["Surgical"],
  Psychiatry: ["Psychiatric"],
};

function doctorSpecialties(doctor: Doctor): string[] {
  const set = new Set(DEPARTMENT_SPECIALTY[doctor.department]);
  if (/obstetric/i.test(doctor.specialty)) set.add("Obstetric");
  if (/gastro/i.test(doctor.specialty)) set.add("Gastroenterologic");
  if (/diabet/i.test(doctor.specialty)) set.add("Endocrine");
  return [...set];
}

const specialtyUrl = (s: string) => `${SCHEMA}/${s}`;

const CATEGORY_SPECIALTY: Record<TestCategory, string> = {
  Pathology: "LaboratoryScience",
  Imaging: "Radiography",
  Cardiac: "Cardiovascular",
  Endoscopy: "Gastroenterologic",
};

// --- Chamber timing ---

function to24h(h: string, m: string, meridiem: string): string {
  let hour = parseInt(h, 10) % 12;
  if (/pm/i.test(meridiem)) hour += 12;
  return `${String(hour).padStart(2, "0")}:${m}`;
}

export function parseChamberTiming(
  timing: string
): { opens: string; closes: string } | null {
  const match = timing.match(
    /(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i
  );
  if (!match) return null;
  return {
    opens: to24h(match[1], match[2], match[3]),
    closes: to24h(match[4], match[5], match[6]),
  };
}

// --- Entity graph (site-wide) ---

export function clinicSchema(): JsonLdNode {
  const specialties = new Set<string>(["LaboratoryScience", "Radiography"]);
  DOCTORS.forEach((d) => doctorSpecialties(d).forEach((s) => specialties.add(s)));

  const categories = [...new Set(TESTS.map((t) => t.category))];

  return {
    "@type": ["MedicalClinic", "DiagnosticLab"],
    "@id": CLINIC_ID,
    name: CENTRE_INFO.name,
    legalName: CENTRE_INFO.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(CENTRE_INFO.logoUrl),
    },
    image: [absoluteUrl(SEO.ogImage.url)],
    description: `${CENTRE_INFO.name} is a diagnostic centre and daily doctor chamber for ${CENTRE_INFO.stats.specialistsCount} medical specialists at ${CENTRE_INFO.landmark}, Silchar. Pathology, digital X-ray, ultrasound, ECG and endoscopy.`,
    address: postalAddress(),
    telephone: toE164(CENTRE_INFO.phones.primary),
    contactPoint: [
      CENTRE_INFO.phones.primary,
      CENTRE_INFO.phones.secondary,
    ].map((phone) => ({
      "@type": "ContactPoint",
      telephone: toE164(phone),
      contactType: "customer service",
      areaServed: "IN",
    })),
    areaServed,
    hasMap: CENTRE_INFO.googleMapsUrl,
    ...(CENTRE_INFO.sameAs.length ? { sameAs: CENTRE_INFO.sameAs } : {}),
    ...(CENTRE_INFO.verified.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: CENTRE_INFO.geo.latitude,
            longitude: CENTRE_INFO.geo.longitude,
          },
        }
      : {}),
    ...(CENTRE_INFO.verified.hours
      ? {
          openingHoursSpecification: CENTRE_INFO.openingHours.map((h) =>
            hoursSpec(h.days, h.opens, h.closes)
          ),
        }
      : {}),
    ...(CENTRE_INFO.verified.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: CENTRE_INFO.stats.googleRating,
            reviewCount: CENTRE_INFO.stats.googleReviewsCount,
          },
        }
      : {}),
    medicalSpecialty: [...specialties].map(specialtyUrl),
    currenciesAccepted: "INR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Diagnostic tests and services",
      itemListElement: categories.map((category) => ({
        "@type": "OfferCatalog",
        name: category,
        itemListElement: TESTS.filter((t) => t.category === category).map(
          (t) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTest",
              name: t.name,
              url: absoluteUrl(`/tests/${t.slug}`),
            },
          })
        ),
      })),
    },
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: CENTRE_INFO.name,
    inLanguage: "en-IN",
    publisher: { "@id": CLINIC_ID },
  };
}

// --- Page-level ---

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
  const last = items[items.length - 1];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(last.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
}): JsonLdNode {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
}

export function collectionPageSchema({
  path,
  name,
  description,
  items,
}: {
  path: string;
  name: string;
  description: string;
  items: { name: string; path: string }[];
}): JsonLdNode {
  return {
    ...webPageSchema({ path, name, description, type: "CollectionPage" }),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function faqSchema(faqs: Faq[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function physicianSchema(doctor: Doctor): JsonLdNode {
  const url = absoluteUrl(`/doctors/${doctor.slug}`);
  const timing = parseChamberTiming(doctor.chamberTiming);

  return {
    "@type": "Physician",
    "@id": `${url}#physician`,
    name: doctor.name,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    jobTitle: doctor.specialty,
    description: doctor.bio,
    medicalSpecialty: doctorSpecialties(doctor).map(specialtyUrl),
    knowsAbout: doctor.conditionsTreated,
    hasCredential: doctor.qualifications.map((q) => ({
      "@type": "EducationalOccupationalCredential",
      name: q,
    })),
    ...(hasVerifiedRegistration(doctor)
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "Medical registration number",
            value: doctor.registrationNo,
          },
        }
      : {}),
    memberOf: clinicRef(),
    worksFor: clinicRef(),
    address: postalAddress(),
    telephone: toE164(CENTRE_INFO.phones.primary),
    areaServed,
    ...(doctor.fee ? { priceRange: `₹${doctor.fee}` } : {}),
    ...(timing && doctor.availableDays?.length
      ? {
          openingHoursSpecification: [
            hoursSpec(doctor.availableDays, timing.opens, timing.closes),
          ],
        }
      : {}),
  };
}

export function medicalTestSchema(test: MedicalTest): JsonLdNode[] {
  const url = absoluteUrl(`/tests/${test.slug}`);
  const specialty = specialtyUrl(CATEGORY_SPECIALTY[test.category]);

  return [
    {
      ...webPageSchema({
        path: `/tests/${test.slug}`,
        name: `${test.name} in Silchar`,
        description: test.shortDescription,
        type: "MedicalWebPage",
      }),
      specialty,
      mainEntity: { "@id": `${url}#test` },
    },
    {
      "@type": "MedicalTest",
      "@id": `${url}#test`,
      name: test.name,
      description: `${test.shortDescription} ${test.clinicalImportance}`,
      relevantSpecialty: specialty,
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${test.name} at ${CENTRE_INFO.name}`,
      serviceType: test.category,
      description: test.shortDescription,
      url,
      provider: clinicRef(),
      areaServed,
      ...(test.price
        ? {
            offers: {
              "@type": "Offer",
              price: test.price,
              priceCurrency: "INR",
              url,
            },
          }
        : {}),
    },
  ];
}
