import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, ShoppingBag } from "lucide-react";
import { topicHubs } from "@/lib/hubs";
import { formatArticleDate, getArticleBySlug, getPublishedArticles, isArticlePublished, type ResourceArticle } from "@/lib/resources";
import { reviewProducts, type ReviewProduct } from "@/lib/reviews";
import { articleSources } from "@/lib/sources";
import { absoluteUrl, jsonLd, siteName } from "@/lib/seo";

export const dynamic = "force-dynamic";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function scoreProductForArticle(article: ResourceArticle, product: ReviewProduct) {
  const articleText = `${article.title} ${article.category} ${article.excerpt} ${article.keywords.join(" ")}`.toLowerCase();
  const productText = `${product.name} ${product.bestFor} ${product.category} ${product.summary} ${product.features.join(" ")}`.toLowerCase();
  let score = 0;

  for (const keyword of article.keywords) {
    const terms = keyword.toLowerCase().split(/\s+/).filter((term) => term.length > 3);
    for (const term of terms) {
      if (productText.includes(term)) score += 2;
    }
  }

  if (articleText.includes("planner") && productText.includes("planner")) score += 8;
  if (articleText.includes("timer") && productText.includes("timer")) score += 8;
  if (articleText.includes("desk") && productText.includes("desk")) score += 8;
  if (articleText.includes("webcam") && productText.includes("webcam")) score += 7;
  if (articleText.includes("lighting") && productText.includes("light")) score += 7;
  if (articleText.includes("book") && productText.includes("book")) score += 7;
  if (articleText.includes("habit") && productText.includes("habit")) score += 6;
  if (articleText.includes("focus") && productText.includes("focus")) score += 6;

  return score;
}

function getRecommendedProducts(article: ResourceArticle) {
  const scored = reviewProducts
    .map((product) => ({ product, score: scoreProductForArticle(article, product) }))
    .sort((a, b) => b.score - a.score);

  const bestMatches = scored.filter((item) => item.score > 0).slice(0, 3).map((item) => item.product);
  return bestMatches.length >= 2 ? bestMatches : reviewProducts.slice(0, 3);
}

function getRelatedArticles(article: ResourceArticle) {
  return getPublishedArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedKeywords = candidate.keywords.filter((keyword) =>
        article.keywords.some((articleKeyword) => articleKeyword.includes(keyword) || keyword.includes(articleKeyword)),
      ).length;
      const categoryMatch = candidate.category === article.category ? 2 : 0;
      return { article: candidate, score: sharedKeywords + categoryMatch };
    })
    .sort((a, b) => b.score - a.score || a.article.publishDate.localeCompare(b.article.publishDate))
    .slice(0, 3)
    .map((item) => item.article);
}

function getArticleFaqs(article: ResourceArticle) {
  return [
    {
      question: `What should I compare before acting on "${article.title}"?`,
      answer: "Compare the workflow fit, fit notes, installation requirements, current version, included hardware, product specifications, and whether the product matches your workflow and desk setup.",
    },
    {
      question: "Should I buy from the article image alone?",
      answer: "No. Use the article to narrow the right product category, then open the buying guide and retailer listing to confirm current specs, edition, compatibility, seller details, and return policy.",
    },
    {
      question: "What is the smartest first step before buying?",
      answer: "Confirm the product category fits your work style, workspace, budget, and implementation cadence, then check manufacturer documentation and retailer details before purchase.",
    },
  ];
}

const sourceById = new Map(articleSources.map((source) => [source.id, source]));

function getArticleSources(article: ResourceArticle) {
  return article.sourceIds.map((sourceId) => sourceById.get(sourceId)).filter((source): source is (typeof articleSources)[number] => Boolean(source));
}

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || !isArticlePublished(article)) {
    return {
      title: "Resource Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/resources/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: absoluteUrl(`/resources/${article.slug}`),
      type: "article",
      publishedTime: `${article.publishDate}T12:00:00-04:00`,
      images: [
        {
          url: absoluteUrl(article.image),
          alt: `${article.title} resource image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [absoluteUrl(article.image)],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || !isArticlePublished(article)) {
    notFound();
  }
  const articleUrl = absoluteUrl(`/resources/${article.slug}`);
  const relatedHubs = topicHubs
    .filter(
      (hub) =>
        hub.relatedArticleSlugs.includes(article.slug) ||
        hub.keywords.some((keyword) =>
          article.keywords.some((articleKeyword) => articleKeyword.includes(keyword) || keyword.includes(articleKeyword)),
        ),
    )
    .slice(0, 3);
  const recommendedProducts = getRecommendedProducts(article);
  const relatedArticles = getRelatedArticles(article);
  const articleFaqs = getArticleFaqs(article);
  const sources = getArticleSources(article);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.excerpt,
        image: absoluteUrl(article.image),
        datePublished: `${article.publishDate}T12:00:00-04:00`,
        dateModified: `${article.publishDate}T12:00:00-04:00`,
        author: {
          "@type": "Organization",
          name: siteName,
          url: absoluteUrl("/"),
        },
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
        mainEntityOfPage: articleUrl,
        keywords: article.keywords.join(", "),
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${articleUrl}#recommended-products`,
        name: `Recommended ResultsBreakthrough shopping guides for ${article.title}`,
        itemListElement: recommendedProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/reviews/${product.slug}`),
          name: product.name,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: articleFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: absoluteUrl("/resources"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-[#18211f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd)} />
      <header className="border-b border-[#dce5dc] bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-5 px-5 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="ResultsBreakthrough home">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#dff5eb] text-[#0e7a5f]">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </span>
            <span className="text-lg font-black tracking-tight">ResultsBreakthrough</span>
          </Link>
          <Link href="/resources" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#cbd8cf] bg-white px-4 py-2 text-sm font-black text-[#10231f] hover:border-[#0e7a5f]">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Resources
          </Link>
        </div>
      </header>

      <article>
        <section className="bg-[#eef6ed]">
          <div className="mx-auto max-w-4xl px-5 py-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0e7a5f]">
              {article.category} · {formatArticleDate(article.publishDate)}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{article.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[#40514b]">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {article.keywords.map((keyword) => (
                <span key={keyword} className="rounded-md bg-white px-3 py-2 text-xs font-bold text-[#40514b] shadow-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 py-10">
          <div className="flex h-[260px] items-center justify-center rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#dce5dc] sm:h-[340px] sm:p-7 lg:h-[400px]">
            <Image
              src={article.image}
              alt={`${article.title} resource image`}
              width={1200}
              height={760}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <div className="mt-10 rounded-lg border border-[#dce5dc] bg-white p-6 shadow-sm sm:p-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="border-b border-[#e6ece5] py-7 first:pt-0 last:border-b-0 last:pb-0">
                <h2 className="text-2xl font-black leading-tight">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.text} className="text-base leading-8 text-[#4c5d56]">
                      {paragraph.text}
                      {paragraph.sourceIds.length > 0 ? (
                        <span className="ml-1 whitespace-nowrap align-super text-xs font-black text-[#0e7a5f]">
                          {paragraph.sourceIds.map((sourceId, index) => {
                            const source = sourceById.get(sourceId);
                            if (!source) return null;
                            const referenceNumber = sources.findIndex((candidate) => candidate.id === sourceId) + 1;
                            return (
                              <a key={sourceId} href={`#ref-${sourceId}`} className="hover:text-[#0a5d49]" aria-label={`Reference ${referenceNumber}: ${source.title}`}>
                                [{referenceNumber}]
                                {index < paragraph.sourceIds.length - 1 ? " " : ""}
                              </a>
                            );
                          })}
                        </span>
                      ) : null}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <aside className="mt-8 rounded-lg bg-[#dff5eb] p-5">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0e7a5f]">Key Takeaway</p>
              <p className="mt-2 text-base font-bold leading-7 text-[#18211f]">{article.takeaway}</p>
            </aside>
          </div>

          <section className="mt-8 rounded-lg border border-[#dce5dc] bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0e7a5f]">Recommended Next Step</p>
                <h2 className="mt-2 text-2xl font-black">Compare tool picks that fit this topic.</h2>
              </div>
              <Link href="/#reviews" target="_blank" rel="noreferrer" className="text-sm font-black text-[#0e7a5f] hover:text-[#0a5d49]">
                View all picks
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recommendedProducts.map((product) => (
                <article key={product.slug} className="flex h-full flex-col rounded-lg border border-[#e6ece5] bg-[#fbfcf8] p-4">
                  <div className="flex h-32 items-center justify-center rounded-md bg-white p-3">
                    <Image src={product.image} alt={product.name} width={360} height={240} className="h-full w-full object-contain" />
                  </div>
                  <h3 className="mt-4 text-base font-black leading-tight">{product.name}</h3>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.08em] text-[#0e7a5f]">{product.bestFor}</p>
                  <p className="mt-3 text-sm leading-6 text-[#5d6d66]">{product.summary}</p>
                  <div className="mt-auto flex flex-col gap-2 pt-4">
                    <Link href={`/reviews/${product.slug}`} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#cbd8cf] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#10231f] hover:border-[#0e7a5f]">
                      Read buying guide
                    </Link>
                    <a href={product.amazon} target="_blank" rel="sponsored nofollow noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#20292b] px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-white hover:bg-[#334044]">
                      Compare on Amazon
                      <ShoppingBag className="h-3 w-3" aria-hidden />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-lg border border-[#dce5dc] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Quick answers</h2>
            <div className="mt-5 grid gap-4">
              {articleFaqs.map((faq) => (
                <details key={faq.question} className="rounded-lg border border-[#e6ece5] bg-[#fbfcf8] p-4">
                  <summary className="cursor-pointer font-black">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-[#5d6d66]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <section className="rounded-lg border border-[#dce5dc] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">Related Guides</h2>
              <div className="mt-4 grid gap-3">
                {relatedHubs.length > 0 ? (
                  relatedHubs.map((hub) => (
                    <Link key={hub.slug} href={`/resources/topics/${hub.slug}`} target="_blank" rel="noreferrer" className="group rounded-lg border border-[#e6ece5] p-4 hover:border-[#0e7a5f]">
                      <p className="text-sm font-black group-hover:text-[#0e7a5f]">{hub.title}</p>
                      <p className="mt-2 text-xs leading-5 text-[#5d6d66]">{hub.description}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#0e7a5f]">
                        Open guide <ArrowRight className="h-3 w-3" aria-hidden />
                      </span>
                    </Link>
                  ))
                ) : (
                  <Link href="/resources" target="_blank" rel="noreferrer" className="text-sm font-black text-[#0e7a5f]">
                    Browse all resources
                  </Link>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-[#dce5dc] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">Read Next</h2>
              <div className="mt-4 grid gap-3">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((relatedArticle) => (
                    <Link key={relatedArticle.slug} href={`/resources/${relatedArticle.slug}`} target="_blank" rel="noreferrer" className="group rounded-lg border border-[#e6ece5] p-4 hover:border-[#0e7a5f]">
                      <p className="text-sm font-black group-hover:text-[#0e7a5f]">{relatedArticle.title}</p>
                      <p className="mt-2 text-xs leading-5 text-[#5d6d66]">{relatedArticle.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#0e7a5f]">
                        Read article <ArrowRight className="h-3 w-3" aria-hidden />
                      </span>
                    </Link>
                  ))
                ) : (
                  <Link href="/resources" target="_blank" rel="noreferrer" className="text-sm font-black text-[#0e7a5f]">
                    Browse all articles
                  </Link>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-[#dce5dc] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">References</h2>
              <div className="mt-4 grid gap-3">
                {sources.map((source, index) => (
                  <a
                    id={`ref-${source.id}`}
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-lg border border-[#e6ece5] p-4 hover:border-[#0e7a5f]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0e7a5f]">[{index + 1}] Reference</p>
                    <p className="mt-1 text-sm font-black group-hover:text-[#0e7a5f]">{source.title}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-[#728078]">{source.organization}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#0e7a5f]">
                      Visit source <ExternalLink className="h-3 w-3" aria-hidden />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
