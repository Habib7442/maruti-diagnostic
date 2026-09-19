import type { MetadataRoute } from "next";
import { DOCTORS } from "@/data/doctors";
import { TESTS } from "@/data/tests";
import { CONTENT_UPDATED, absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED;

  const staticPaths = [
    "/",
    "/doctors",
    "/tests",
    "/about",
    "/contact",
    "/booking",
  ];

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path), lastModified })),
    ...DOCTORS.map((d) => ({
      url: absoluteUrl(`/doctors/${d.slug}`),
      lastModified,
    })),
    ...TESTS.map((t) => ({
      url: absoluteUrl(`/tests/${t.slug}`),
      lastModified,
    })),
  ];
}
