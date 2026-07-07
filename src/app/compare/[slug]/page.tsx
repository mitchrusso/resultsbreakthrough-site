import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { comparisonPages, getComparisonBySlug } from "@/lib/comparisons";
import { absoluteUrl, jsonLd, siteName } from "@/lib/seo";

type ComparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonBySlug(slug);

  if (!page) {
    return {
      title: "Comparison Not Found",
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/compare/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | ${siteName}`,
      description: page.description,
      url: absoluteUrl(`/compare/${page.slug}`),
      images: [{ url: absoluteUrl(page.image), alt: `${page.title} comparison image` }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${siteName}`,
      description: page.description,
      images: [absoluteUrl(page.image)],
    },
  };
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const page = getComparisonBySlug(slug);

  if (!page) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/compare/${page.slug}`);
  const comparisonJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        about: page.keywords,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/#compare") },
          { "@type": "ListItem", position: 3, name: page.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-[#18211f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(comparisonJsonLd)} />
      <header className="border-b border-[#dce5dc] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-5 px-5 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="ResultsBreakthrough home">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#dff5eb] text-[#0e7a5f]">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </span>
            <span className="text-lg font-black tracking-tight">ResultsBreakthrough</span>
          </Link>
          <Link href="/#compare" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#cbd8cf] bg-white px-4 py-2 text-sm font-black text-[#10231f] hover:border-[#0e7a5f]">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Compare
          </Link>
        </div>
      </header>

      <section className="bg-[#eef6ed]">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0e7a5f]">Comparison Guide</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{page.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[#40514b]">{page.description}</p>
          </div>
          <div className="flex h-[260px] items-center justify-center rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#dce5dc] sm:h-[300px] lg:h-[340px]">
            <Image src={page.image} alt={`${page.title} comparison image`} width={520} height={520} className="h-full w-full object-contain" priority />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="overflow-x-auto rounded-lg border border-[#dce5dc] bg-white shadow-sm">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-[#10231f] text-white">
              <tr>
                <th className="px-4 py-4">Factor</th>
                <th className="px-4 py-4">{page.left}</th>
                <th className="px-4 py-4">{page.right}</th>
              </tr>
            </thead>
            <tbody>
              {page.rows.map((row) => (
                <tr key={row.label} className="border-t border-[#e6ece5]">
                  <th className="px-4 py-4 font-black">{row.label}</th>
                  <td className="px-4 py-4 leading-7 text-[#5d6d66]">{row.left}</td>
                  <td className="px-4 py-4 leading-7 text-[#5d6d66]">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-8 rounded-lg border border-[#dce5dc] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Bottom line</h2>
          <p className="mt-4 text-base leading-8 text-[#5d6d66]">{page.winner}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/resources/topics/goal-planners" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#cbd8cf] px-4 py-2 text-sm font-black hover:border-[#0e7a5f]">
              Productivity guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/#reviews" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#0e7a5f] px-4 py-2 text-sm font-black text-white hover:bg-[#0a5d49]">
              Tool picks
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
