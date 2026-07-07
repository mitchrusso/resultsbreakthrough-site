import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Accessibility statement for ResultsBreakthrough.",
  alternates: { canonical: "/accessibility-statement" },
};

export default function AccessibilityStatementPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#20292b]">
      <article className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#a3421f]">Back to ResultsBreakthrough</Link>
        <h1 className="mt-8 text-4xl font-black">Accessibility Statement</h1>
        <p className="mt-6 text-base leading-8 text-[#536166]">
          ResultsBreakthrough aims to make its buying guides, reviews, resource articles, and legal pages usable for as many readers as possible.
        </p>
        <p className="mt-4 text-base leading-8 text-[#536166]">
          The site uses semantic headings, readable color contrast, keyboard-accessible links and controls, descriptive image alt text, and responsive layouts. We continue to improve the experience as the site grows.
        </p>
        <p className="mt-4 text-base leading-8 text-[#536166]">
          If you encounter an accessibility barrier, please use the <Link href="/contact" className="font-bold text-[#0e7a5f]">Contact page</Link> and include the page URL, device, browser, and a short description of the issue.
        </p>
      </article>
    </main>
  );
}
