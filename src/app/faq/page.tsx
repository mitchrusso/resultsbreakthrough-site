import type { Metadata } from "next";
import Link from "next/link";
import { siteFaqs } from "@/lib/trust";
import { absoluteUrl, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Productivity Buying FAQ",
  description:
    "Answers to common questions about ResultsBreakthrough, productivity reviews, affiliate links, productivity guidance, and online buying decisions.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  const faqCategories = Array.from(new Set(siteFaqs.map((faq) => faq.category)));
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/faq#faq"),
        mainEntity: siteFaqs.map((faq) => ({
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
            name: "FAQ",
            item: absoluteUrl("/faq"),
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#18211f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />
      <article className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#0e7a5f]">
          Back to ResultsBreakthrough
        </Link>
        <h1 className="mt-8 text-4xl font-black">Productivity Buying FAQ</h1>
        <p className="mt-6 text-base leading-8 text-[#5d6d66]">
          Quick answers about using ResultsBreakthrough, comparing results-first product categories, affiliate links, and productivity considerations before buying planners, timers, desk gear, remote-work tools, or business books.
        </p>

        <div className="mt-8 space-y-8">
          {faqCategories.map((category) => (
            <section key={category}>
              <h2 className="text-2xl font-black">{category}</h2>
              <div className="mt-4 grid gap-4">
                {siteFaqs
                  .filter((faq) => faq.category === category)
                  .map((faq) => (
                    <details key={faq.question} className="rounded-lg border border-[#dce5dc] bg-[#fbfcf8] p-5">
                      <summary className="cursor-pointer text-lg font-black">{faq.question}</summary>
                      <p className="mt-3 text-base leading-8 text-[#5d6d66]">{faq.answer}</p>
                    </details>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
