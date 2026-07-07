import type { MetadataRoute } from "next";
import { comparisonPages } from "@/lib/comparisons";
import { topicHubs } from "@/lib/hubs";
import { getPublishedArticles } from "@/lib/resources";
import { reviewProducts } from "@/lib/reviews";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/accessibility-statement",
    "/amazon-disclosure",
    "/contact",
    "/cookie-policy",
    "/editorial-policy",
    "/faq",
    "/privacy-policy",
    "/review-methodology",
    "/resources",
    "/safety-disclaimer",
    "/terms-and-conditions",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || "/"),
      lastModified: now,
      changeFrequency: route === "/resources" ? ("daily" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...getPublishedArticles().map((article) => ({
      url: absoluteUrl(`/resources/${article.slug}`),
      lastModified: new Date(`${article.publishDate}T12:00:00-04:00`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...topicHubs.map((hub) => ({
      url: absoluteUrl(`/resources/topics/${hub.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...reviewProducts.map((product) => ({
      url: absoluteUrl(`/reviews/${product.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...comparisonPages.map((page) => ({
      url: absoluteUrl(`/compare/${page.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
