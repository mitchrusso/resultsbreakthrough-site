import { expect, test } from "@playwright/test";

const productionOrigin = "https://resultsbreakthrough.com";
const amazonTag = "rb10f-20";

const importantRoutes = [
  "/",
  "/resources",
  "/resources/topics/business-books",
  "/resources/topics/productivity-tools",
  "/resources/topics/remote-work-gear",
  "/resources/topics/personal-performance",
  "/resources/turn-a-productivity-book-into-a-14-day-experiment",
  "/reviews/full-focus-planner",
  "/reviews/time-blocking-planner-pad",
  "/reviews/desktop-kanban-board-kit",
  "/reviews/distraction-blocking-lock-box",
  "/reviews/usb-c-docking-station",
  "/reviews/fitness-tracker-watch",
  "/compare/business-books-vs-execution-planners",
  "/compare/visual-timer-vs-digital-pomodoro-timer",
  "/compare/laptop-stand-vs-portable-monitor",
  "/compare/okr-workbook-vs-90-day-planner",
  "/contact",
  "/privacy-policy",
];

test.describe("SEO discovery and metadata", () => {
  for (const route of importantRoutes) {
    test(`${route} has indexable metadata and supported schema`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("h1").first()).toBeVisible();

      const title = await page.title();
      expect(title.length).toBeGreaterThan(20);

      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(50);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBe(`${productionOrigin}${route === "/" ? "" : route}`);

      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots ?? "index, follow").not.toContain("noindex");

      const jsonLdText = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(jsonLdText.length).toBeGreaterThan(0);

      for (const block of jsonLdText) {
        expect(() => JSON.parse(block)).not.toThrow();
        expect(block).not.toContain('"@type":"Product"');
        expect(block).not.toContain('"@type": "Product"');
      }
    });
  }

  test("discovery files are crawlable and canonical", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain(`${productionOrigin}/sitemap.xml`);

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const sitemapText = await sitemap.text();
    expect(sitemapText).toContain(`${productionOrigin}/resources/topics/business-books`);
    expect(sitemapText).toContain(`${productionOrigin}/reviews/full-focus-planner`);
    expect(sitemapText).toContain(`${productionOrigin}/reviews/time-blocking-planner-pad`);
    expect(sitemapText).toContain(`${productionOrigin}/reviews/desktop-kanban-board-kit`);
    expect(sitemapText).toContain(`${productionOrigin}/compare/visual-timer-vs-digital-pomodoro-timer`);
    expect(sitemapText).toContain(`${productionOrigin}/compare/laptop-stand-vs-portable-monitor`);

    const llms = await request.get("/llms.txt");
    expect(llms.ok()).toBeTruthy();
    expect(await llms.text()).toContain("ResultsBreakthrough");

    const security = await request.get("/.well-known/security.txt");
    expect(security.ok()).toBeTruthy();
    expect(await security.text()).toContain(`${productionOrigin}/.well-known/security.txt`);
  });

  test("Rybbit analytics snippet is present", async ({ page }) => {
    await page.goto("/");
    const script = page.locator('script[src="https://app.rybbit.io/api/script.js"]');
    await expect(script).toHaveAttribute("data-site-id", "6ab9d2374e06");
  });
});

test.describe("Affiliate and mobile behavior", () => {
  test("Amazon affiliate links open safely with the ResultsBreakthrough tag", async ({ page }) => {
    await page.goto("/resources/topics/business-books");

    await expect(page.getByRole("heading", { name: "Match the tool to the way you actually execute." })).toBeVisible();
    await expect(page.getByRole("link", { name: /Business Books vs Execution Planners/ })).toBeVisible();

    const links = await page.locator('a[href*="amazon.com"]').evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        href: anchor.getAttribute("href") ?? "",
        target: anchor.getAttribute("target") ?? "",
        rel: anchor.getAttribute("rel") ?? "",
      })),
    );

    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.href).toContain(`tag=${amazonTag}`);
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("sponsored");
      expect(link.rel).toContain("nofollow");
      expect(link.rel).toContain("noreferrer");
    }
  });

  test("topic hubs expose comparison structured data", async ({ page }) => {
    await page.goto("/resources/topics/business-books");
    const jsonLdText = await page.locator('script[type="application/ld+json"]').allTextContents();
    const combined = jsonLdText.join("\n");

    expect(combined).toContain('"@type":"CollectionPage"');
    expect(combined).toContain('"@id":"https://resultsbreakthrough.com/resources/topics/business-books#comparison-guides"');
    expect(combined).toContain('"name":"Business Books vs Execution Planners"');
  });

  test("new high-intent product pages are discoverable and conversion-ready", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: /I need visible project flow/ })).toHaveAttribute(
      "href",
      "/reviews/desktop-kanban-board-kit",
    );
    await expect(page.getByRole("link", { name: /I travel and need a better setup/ })).toHaveAttribute(
      "href",
      "/resources/topics/remote-work-gear",
    );

    await page.goto("/resources/topics/focus-and-deep-work");
    await expect(page.getByRole("link", { name: /Visual Timer vs Digital Pomodoro Timer/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Noise-Canceling Headphones vs Earplugs/ })).toBeVisible();

    await page.goto("/reviews/distraction-blocking-lock-box");
    await expect(page.getByRole("heading", { name: /Distraction-Blocking Lock Box Buying Guide/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Compare on Amazon/ }).first()).toHaveAttribute(
      "href",
      /tag=rb10f-20/,
    );
  });

  test("homepage mobile navigation exposes core sections", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only navigation check");

    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    const mobileNav = page.getByLabel("Mobile navigation");
    await expect(mobileNav.getByRole("link", { name: "Resources" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Contact" })).toBeVisible();
  });
});
