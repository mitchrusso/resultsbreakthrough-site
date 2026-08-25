# Design QA

Site reviewed: https://resultsbreakthrough.com/

## Verification

- Local app responds at `http://localhost:3003` with HTTP 200.
- `npm run lint` passes.
- `npm run build` passes.
- Homepage, resources, productivity topic hubs, comparison pages, legal/trust pages, `robots.txt`, `sitemap.xml`, `security.txt`, and `llms.txt` are present.
- Mobile navigation is available through the menu button.
- Article links to related posts and topic hubs open in a new tab.
- External source links open in a new tab.
- Amazon CTAs use `rel="sponsored nofollow noreferrer"` and preserve the `rb10f-20` affiliate tag.
- Product-like pages are structured as buying guides and avoid unsupported ratings, prices, offers, or availability claims.

## Notes

- Productivity and business-tool content is written as general shopping information and directs readers to verify fit, compatibility, edition, warranty, and retailer details.
- Scheduled resource articles are date-gated and excluded from the sitemap until published.
- Contact form requires `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `RESEND_API_KEY` in Vercel.
