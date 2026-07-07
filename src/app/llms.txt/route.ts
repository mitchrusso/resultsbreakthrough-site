const siteUrl = "https://resultsbreakthrough.com";

export function GET() {
  const body = `# ResultsBreakthrough

ResultsBreakthrough is an affiliate shopping and research guide for entrepreneurs comparing planners, focus timers, desk gear, remote-work tools, business books, habit trackers, and accountability systems.

## Primary Pages
- Home and top picks: ${siteUrl}/
- Resource library: ${siteUrl}/resources
- FAQ: ${siteUrl}/faq
- Review methodology: ${siteUrl}/review-methodology
- Editorial policy: ${siteUrl}/editorial-policy
- Disclaimer: ${siteUrl}/safety-disclaimer
- Amazon affiliate disclosure: ${siteUrl}/amazon-disclosure
- Sitemap: ${siteUrl}/sitemap.xml

## Main Content Areas
- Results-first product category guides for entrepreneurs and operators
- Goal planners, weekly reviews, focus timers, and habit trackers
- Standing desks, monitor arms, webcams, lighting, headphones, and remote-work gear
- Business books, including Mitch Russo titles, and execution systems that support measurable weekly behavior
- Goal-achievement systems, Kanban boards, OKR workbooks, portable monitors, USB microphones, sleep trackers, hydration tools, and personal performance tools

## Important Notes
- ResultsBreakthrough does not sell products directly.
- The site uses Amazon affiliate links and may earn from qualifying purchases.
- Product prices, availability, accessories, ratings, and specs can change; users should verify current details with the retailer and manufacturer.
- Productivity content is general information and does not replace business, financial, medical, ergonomic, legal, or other professional guidance.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
