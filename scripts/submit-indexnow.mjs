const siteUrl = "https://resultsbreakthrough.com";
const key = "8e2d5c9a4f7b4016a93d0e8c5b12f674";

async function main() {
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const sitemap = await fetch(sitemapUrl).then((response) => {
    if (!response.ok) throw new Error(`Could not fetch ${sitemapUrl}: ${response.status}`);
    return response.text();
  });
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  if (!urls.length) throw new Error(`No URLs found in ${sitemapUrl}`);

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(siteUrl).hostname,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList: urls,
    }),
  });

  if (!response.ok && response.status !== 202) {
    throw new Error(`IndexNow returned ${response.status}: ${await response.text()}`);
  }
  console.log(`Submitted ${urls.length} URLs to IndexNow for ${siteUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
