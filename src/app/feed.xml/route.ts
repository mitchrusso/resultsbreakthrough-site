import { NextResponse } from "next/server";
import { getArticlePublishTime, getPublishedArticles } from "@/lib/resources";
import { absoluteUrl, defaultDescription, siteName, siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getPublishedArticles()
    .sort((a, b) => new Date(getArticlePublishTime(b)).getTime() - new Date(getArticlePublishTime(a)).getTime())
    .slice(0, 50);

  const items = articles
    .map((article) => {
      const url = absoluteUrl(`/resources/${article.slug}`);
      const pubDate = new Date(getArticlePublishTime(article)).toUTCString();

      return `<item>
  <title>${escapeXml(article.title)}</title>
  <link>${escapeXml(url)}</link>
  <guid isPermaLink="true">${escapeXml(url)}</guid>
  <description>${escapeXml(article.excerpt)}</description>
  <category>${escapeXml(article.category)}</category>
  <pubDate>${escapeXml(pubDate)}</pubDate>
</item>`;
    })
    .join("\n");

  const latestBuildDate = articles[0] ? new Date(getArticlePublishTime(articles[0])).toUTCString() : new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteName)}</title>
  <link>${escapeXml(siteUrl)}</link>
  <description>${escapeXml(defaultDescription)}</description>
  <language>en-US</language>
  <lastBuildDate>${escapeXml(latestBuildDate)}</lastBuildDate>
  <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(absoluteUrl("/feed.xml"))}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
