import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Minus, ShieldCheck, ShoppingBag, X } from "lucide-react";
import { getProductDecision, getProductFaqs, getRelatedProducts, getReviewProductBySlug, reviewProducts } from "@/lib/reviews";
import { absoluteUrl, jsonLd, siteName } from "@/lib/seo";

type ReviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return reviewProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getReviewProductBySlug(slug);

  if (!product) {
    return {
      title: "Productivity Pick Not Found",
    };
  }

  return {
    title: `${product.name} Buying Guide`,
    description: `${product.name}: ${product.bestFor}. Compare buying criteria, pros, cons, fit notes, and buying considerations.`,
    alternates: {
      canonical: `/reviews/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} Buying Guide | ${siteName}`,
      description: product.summary,
      url: absoluteUrl(`/reviews/${product.slug}`),
      images: [{ url: absoluteUrl(product.image), alt: product.name }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} Buying Guide | ${siteName}`,
      description: product.summary,
      images: [absoluteUrl(product.image)],
    },
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const product = getReviewProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviewUrl = absoluteUrl(`/reviews/${product.slug}`);
  const decision = getProductDecision(product);
  const relatedProducts = getRelatedProducts(product);
  const productFaqs = getProductFaqs(product);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${reviewUrl}#webpage`,
        url: reviewUrl,
        name: `${product.name} Buying Guide`,
        description: product.summary,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        about: decision.searchIntent,
        inLanguage: "en-US",
      },
      {
        "@type": "Article",
        "@id": `${reviewUrl}#article`,
        headline: `${product.name} Buying Guide`,
        description: product.summary,
        image: absoluteUrl(product.image),
        author: { "@id": absoluteUrl("/#organization") },
        publisher: { "@id": absoluteUrl("/#organization") },
        mainEntityOfPage: reviewUrl,
        keywords: [product.category, product.bestFor, "entrepreneur productivity shopping guide", decision.searchIntent].join(", "),
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        mainEntity: productFaqs.map((faq) => ({
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
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Reviews", item: absoluteUrl("/#reviews") },
          { "@type": "ListItem", position: 3, name: product.name, item: reviewUrl },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-[#18211f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productJsonLd)} />
      <header className="border-b border-[#dce5dc] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-5 px-5 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="ResultsBreakthrough home">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#dff5eb] text-[#0e7a5f]">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </span>
            <span className="text-lg font-black tracking-tight">ResultsBreakthrough</span>
          </Link>
          <Link href="/#reviews" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#cbd8cf] bg-white px-4 py-2 text-sm font-black text-[#10231f] hover:border-[#0e7a5f]">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Reviews
          </Link>
        </div>
      </header>

      <section className="bg-[#eef6ed]">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0e7a5f]">{product.bestFor}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{product.name} Buying Guide</h1>
            <p className="mt-5 text-lg leading-8 text-[#40514b]">{product.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={product.amazon}
                target="_blank"
                rel="sponsored nofollow noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#0e7a5f] px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-white hover:bg-[#0a5d49]"
              >
                Compare on Amazon
                <ShoppingBag className="h-4 w-4" aria-hidden />
              </a>
              <Link href="/resources/topics/goal-planners" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#cbd8cf] bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-[#10231f] hover:border-[#0e7a5f]">
                Productivity guide
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="flex h-[260px] items-center justify-center rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#dce5dc] sm:h-[300px] lg:h-[340px]">
            <Image src={product.image} alt={product.name} width={520} height={520} className="h-full w-full object-contain" priority />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 lg:grid-cols-[1fr_280px] lg:items-start">
        <article className="rounded-lg border border-[#dce5dc] bg-white p-6 shadow-sm sm:p-8">
          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-[#dce5dc] bg-[#f5fbf7] p-5">
              <h2 className="flex items-center gap-2 text-xl font-black">
                <Check className="h-5 w-5 text-[#0e7a5f]" aria-hidden />
                Buy this if
              </h2>
              <ul className="mt-4 space-y-2">
                {decision.bestWhen.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-[#4c5d56]">
                    <Check className="mt-1 h-4 w-4 flex-none text-[#0e7a5f]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-[#ead7c9] bg-[#fff8f1] p-5">
              <h2 className="flex items-center gap-2 text-xl font-black">
                <X className="h-5 w-5 text-[#b26b30]" aria-hidden />
                Keep comparing if
              </h2>
              <ul className="mt-4 space-y-2">
                {decision.considerAnotherWhen.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-[#4c5d56]">
                    <Minus className="mt-1 h-4 w-4 flex-none text-[#b26b30]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mt-8 text-2xl font-black">Who this productivity pick is best for</h2>
            <p className="mt-4 text-base leading-8 text-[#4c5d56]">
              This pick is best for shoppers looking for: {product.bestFor.toLowerCase()}. Compare the workflow fit, installation requirements, fit notes, current version, and manufacturer product specifications before buying.
            </p>
            <p className="mt-4 rounded-lg bg-[#eef6ed] p-4 text-sm font-bold leading-7 text-[#40514b]">
              Setup tip: {decision.setupTip}
            </p>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-lg bg-[#fbfcf8] p-5">
              <h2 className="text-xl font-black">Key features</h2>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm leading-6 text-[#5d6d66]">
                    <Check className="mt-1 h-4 w-4 flex-none text-[#0e7a5f]" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-[#fbfcf8] p-5">
              <h2 className="text-xl font-black">Specs to verify</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="font-black">Category</dt>
                  <dd className="mt-1 text-[#5d6d66]">{product.category}</dd>
                </div>
                <div>
                  <dt className="font-black">Fit / install note</dt>
                  <dd className="mt-1 text-[#5d6d66]">{product.weight}</dd>
                </div>
                <div>
                  <dt className="font-black">Capacity / note</dt>
                  <dd className="mt-1 text-[#5d6d66]">{product.capacity}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black">Pros</h2>
              <ul className="mt-4 space-y-2">
                {product.pros.map((pro) => (
                  <li key={pro} className="flex gap-2 text-sm leading-6 text-[#5d6d66]">
                    <Check className="mt-1 h-4 w-4 flex-none text-[#0e7a5f]" aria-hidden />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black">Cons</h2>
              <ul className="mt-4 space-y-2">
                {product.cons.map((con) => (
                  <li key={con} className="flex gap-2 text-sm leading-6 text-[#5d6d66]">
                    <Minus className="mt-1 h-4 w-4 flex-none text-[#b26b30]" aria-hidden />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-8 rounded-lg border border-[#dce5dc] bg-[#fbfcf8] p-5">
            <h2 className="text-2xl font-black">Quick answers before you click buy</h2>
            <div className="mt-5 grid gap-4">
              {productFaqs.map((faq) => (
                <div key={faq.question} className="rounded-lg bg-white p-4">
                  <h3 className="font-black">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5d6d66]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="rounded-lg border border-[#dce5dc] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#0e7a5f]">Before buying</h2>
          <p className="mt-3 text-sm leading-7 text-[#5d6d66]">
            Verify current specifications, workflow fit, fit notes, included parts, warranty, return policy, current version, and product specifications with the retailer or manufacturer.
          </p>
          <a
            href={product.amazon}
            target="_blank"
            rel="sponsored nofollow noreferrer"
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0e7a5f] px-4 py-3 text-sm font-black text-white hover:bg-[#0a5d49]"
          >
            Compare on Amazon
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <div className="mt-5 rounded-lg bg-[#fbfcf8] p-4">
            <h3 className="flex items-center gap-2 text-sm font-black">
              <ShieldCheck className="h-4 w-4 text-[#0e7a5f]" aria-hidden />
              Buyer note
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#5d6d66]">
              This guide is general buying information, not business, financial, medical, ergonomic, or professional advice. Follow the product documentation, warranty terms, and current seller details.
            </p>
          </div>
          <div className="mt-5 border-t border-[#e6ece5] pt-5">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#0e7a5f]">Compare similar picks</h3>
            <div className="mt-3 grid gap-3">
              {relatedProducts.map((related) => (
                <Link key={related.slug} href={`/reviews/${related.slug}`} className="group rounded-lg border border-[#e6ece5] p-3 hover:border-[#0e7a5f]">
                  <p className="text-sm font-black leading-5 group-hover:text-[#0e7a5f]">{related.name}</p>
                  <p className="mt-1 text-xs leading-5 text-[#5d6d66]">{related.bestFor}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-5 border-t border-[#e6ece5] pt-5">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#0e7a5f]">Helpful guides</h3>
            <div className="mt-3 grid gap-2 text-sm font-bold text-[#40514b]">
              <Link href="/resources/topics/goal-planners" className="hover:text-[#0e7a5f]">Goal Planner Guide</Link>
              <Link href="/resources/topics/business-books" className="hover:text-[#0e7a5f]">Business Books</Link>
              <Link href="/review-methodology" className="hover:text-[#0e7a5f]">Review Methodology</Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
