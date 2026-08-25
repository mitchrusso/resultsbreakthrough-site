# ResultsBreakthrough.com SEO Launch Checklist

## Search Console

1. Add or verify the domain property for `resultsbreakthrough.com`.
2. Add the URL-prefix property for `https://resultsbreakthrough.com` if page-level inspection is useful.
3. Submit the sitemap:

   ```text
   https://resultsbreakthrough.com/sitemap.xml
   ```

4. Inspect and request indexing for:
   - `https://resultsbreakthrough.com/`
   - `https://resultsbreakthrough.com/resources`
   - `https://resultsbreakthrough.com/resources/topics/productivity-tools`
   - `https://resultsbreakthrough.com/resources/topics/business-books`
   - `https://resultsbreakthrough.com/reviews/full-focus-planner`
   - `https://resultsbreakthrough.com/compare/business-books-vs-execution-planners`

## Bing Webmaster Tools

1. Add or import the property.
2. Submit:

   ```text
   https://resultsbreakthrough.com/sitemap.xml
   ```

## Rich Results And Structured Data

1. Test the homepage with Google's Rich Results Test.
2. Test one resource article.
3. Test one topic hub.
4. Test one review/buying-guide page.
5. Confirm no Product snippet errors appear from unsupported offers, reviews, prices, availability, or aggregate ratings.

## AI Search Readiness

1. Confirm `https://resultsbreakthrough.com/llms.txt` loads.
2. Confirm `robots.txt` allows crawlers and points to the sitemap.
3. Keep official source links visible on article pages.
4. Keep entity language consistent: ResultsBreakthrough, entrepreneur productivity tools, goal planners, focus gear, desk setup, business books, and accountability systems.
5. Keep affiliate disclosure, methodology, editorial policy, FAQ, and safety disclaimer linked from the footer.

## Launch Notes

- Keep scheduled resource articles hidden until their publish dates.
- Recheck Amazon affiliate links after deployment and confirm `tag=rb10f-20`.
- Verify the contact form after Vercel environment variables are present.
- Verify the Rybbit script uses `data-site-id="6ab9d2374e06"`.
- Re-run sitemap submission after major content batches are published.
