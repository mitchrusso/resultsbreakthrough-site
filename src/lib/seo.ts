export const siteUrl = "https://resultsbreakthrough.com";
export const siteName = "ResultsBreakthrough";
export const defaultDescription =
  "Results-focused shopping guides for entrepreneurs comparing planners, productivity tools, focus timers, desk gear, business books, and accountability systems.";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
