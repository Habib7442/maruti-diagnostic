import type { Metadata } from "next";
import { CENTRE_INFO } from "@/data/centre";
import type { Doctor } from "@/data/doctors";
import type { MedicalTest } from "@/data/tests";

const FALLBACK_SITE_URL = "https://marutidiagnostic.com";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, "");

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Bump when content in data/*.ts changes; drives sitemap lastModified (must not be "now" on every build). */
export const CONTENT_UPDATED = "2026-09-19";

export const SEO = {
  siteName: CENTRE_INFO.name,
  locale: "en_IN",
  defaultTitle: `${CENTRE_INFO.name} — Trusted Diagnostics & Doctor Chamber in Silchar`,
  defaultDescription: `${CENTRE_INFO.name} at ${CENTRE_INFO.landmark}. Daily chamber for ${CENTRE_INFO.stats.specialistsCount} medical specialists and pathology, digital X-ray, ultrasound (USG), ECG and endoscopy in Silchar.`,
  ogImage: {
    url: "/maruti-og-image.png",
    width: 1731,
    height: 909,
    alt: `${CENTRE_INFO.name}, Ghungoor, Silchar`,
  },
} as const;

/** Crawlers of AI search / answer engines. Allowed so the centre and its doctors can be cited. */
export const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
] as const;

export function verificationMeta(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

interface BuildMetadataInput {
  /** Without the brand suffix; the root layout title template appends it. */
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image = SEO.ogImage,
  type = "website",
  noindex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SEO.siteName)
    ? title
    : `${title} | ${SEO.siteName}`;
  const images = [
    {
      url: absoluteUrl(image.url),
      width: image.width,
      height: image.height,
      alt: image.alt,
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SEO.siteName,
      locale: SEO.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export function doctorMetadata(doctor: Doctor): Metadata {
  const timing =
    doctor.type === "daily"
      ? `Chamber ${doctor.chamberTiming}`
      : "Visiting consultant, by appointment";
  const fee = doctor.fee ? `, fee ₹${doctor.fee}` : "";
  const description = truncate(
    `${doctor.name}, ${doctor.specialty}, consults at ${CENTRE_INFO.name}, Ghungoor, opposite SMCH, Silchar. ${timing}${fee}. Call ${CENTRE_INFO.phones.primary}.`,
    158
  );

  return buildMetadata({
    title: `${doctor.name} — ${doctor.specialty} in Silchar`,
    description,
    path: `/doctors/${doctor.slug}`,
    type: "profile",
  });
}

export function testMetadata(test: MedicalTest): Metadata {
  const price = test.price ? `Rate ₹${test.price}.` : "Call for rates.";
  const description = truncate(
    `${test.name} at ${CENTRE_INFO.name}, Ghungoor (opp. SMCH), Silchar. ${test.shortDescription} ${price} Report: ${test.reportTurnaround}.`,
    158
  );

  return buildMetadata({
    title: `${test.name} in Silchar — Price, Preparation, Report Time`,
    description,
    path: `/tests/${test.slug}`,
    type: "article",
  });
}
