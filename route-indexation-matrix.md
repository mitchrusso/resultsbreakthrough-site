# ResultsBreakthrough.com Route Indexation Matrix

Canonical domain: `https://resultsbreakthrough.com`

## Strategic Public Routes

- `/` - homepage and primary affiliate discovery page; index, follow, sitemap.
- `/resources` - resource library; index, follow, sitemap.
- `/resources/topics/[slug]` - topical authority hubs for productivity tools, planners, business books, workspace gear, focus, and performance; index, follow, sitemap.
- `/resources/[slug]` - published resource articles only; index, follow, sitemap after publish date.
- `/reviews/[slug]` - affiliate buying guide pages; index, follow, sitemap.
- `/compare/[slug]` - comparison and decision-support pages; index, follow, sitemap.

## Public Trust And Conversion Routes

- `/about` - brand and editorial context; index, follow, sitemap.
- `/contact` - reader and partner contact path; index, follow, sitemap.
- `/faq` - buyer questions and site-policy answers; index, follow, sitemap.
- `/review-methodology` - review process transparency; index, follow, sitemap.
- `/editorial-policy` - editorial independence and sourcing; index, follow, sitemap.
- `/amazon-disclosure` - affiliate disclosure; index, follow, sitemap.
- `/safety-disclaimer` - shopping and product-use disclaimer; index, follow, sitemap.
- `/accessibility-statement` - accessibility commitment; index, follow, sitemap.

## Legal And Utility Routes

- `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy` - legal utility pages; index, follow, sitemap with unique metadata.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/security.txt`, `/.well-known/security.txt` - discovery and trust files; crawlable utility endpoints.
- `/google*.html` - Search Console verification file; crawlable utility endpoint.

## Excluded Or Defensive Routes

- Future-dated articles are unavailable through public routes and excluded from sitemap until their publish date.
- Common probe paths such as `/.env`, `/.git`, `/wp-admin`, `/xmlrpc.php`, and PHP probes are blocked by `src/proxy.ts` with noindex responses.
- Do not add Product JSON-LD to affiliate review pages unless current visible price, availability, review, or aggregate rating data is present and verified.
