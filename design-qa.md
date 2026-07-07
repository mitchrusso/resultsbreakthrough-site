# Design QA

Site reviewed: https://resultsbreakthrough.com/

## Verification

- Local app responds at `http://localhost:3003` with HTTP 200.
- `npm run lint` passes.
- `npm run build` passes.
- Homepage, resources, safety checklist pages, topic hubs, comparison pages, legal/trust pages, `robots.txt`, `sitemap.xml`, and `llms.txt` are present.
- Mobile navigation is available through the menu button.
- Article links to related posts, topic hubs, and checklist pages open in a new tab.
- External source links open in a new tab.
- Amazon CTAs use `rel="sponsored nofollow noreferrer"` and preserve the `mitchellrusso-20` affiliate tag.
- Product-like pages are structured as safety shopping checklists and avoid unsupported ratings, prices, offers, or availability claims.

## Notes

- Safety content is written as general shopping information and directs readers to verify product fit, instructions, recalls, and official guidance.
- Scheduled resource articles are date-gated and excluded from the sitemap until published.
- Contact form requires `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `RESEND_API_KEY` in Vercel.
