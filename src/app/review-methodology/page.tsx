import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Review Methodology",
  description: "How ResultsBreakthrough organizes productivity reviews, buying guides, comparisons, and resource content.",
  path: "/review-methodology",
});

const criteria = [
  { title: "Workflow fit", body: "Products are organized by the workflow, workspace, budget, and use case they are meant to support, because a well-made product can still be wrong for a specific business or work style." },
  { title: "Installation and daily use", body: "We look for clear installation requirements, understandable instructions, maintenance needs, cleaning needs, and common misuse risks entrepreneurs should check before buying." },
  { title: "Version-aware shopping", body: "We encourage entrepreneurs to check manufacturer and retailer details, current editions, compatibility, bundle contents, warranties, and return policies." },
  { title: "Usability and fit", body: "Stable construction, appropriate warnings, product fit, fit notes, non-toxic claims, small-parts risk, and caregiver usability are important buying considerations." },
  { title: "Buyer verification", body: "Readers are encouraged to confirm current price, specifications, availability, warranty, return policy, current versions, and product specifications with the retailer or manufacturer." },
];

export default function ReviewMethodologyPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#20292b]">
      <article className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#a3421f]">Back to ResultsBreakthrough</Link>
        <h1 className="mt-8 text-4xl font-black">Review Methodology</h1>
        <p className="mt-6 text-base leading-8 text-[#536166]">ResultsBreakthrough reviews and organizes products through practical entrepreneur buying decisions: what workflow the product supports, where it will be used, what setup details matter, and what shoppers should verify before purchasing.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {criteria.map((item) => <section key={item.title} className="rounded-lg border border-[#ddd5c7] bg-[#f3f4f6] p-5"><h2 className="text-xl font-black">{item.title}</h2><p className="mt-3 text-base leading-8 text-[#536166]">{item.body}</p></section>)}
        </div>
      </article>
    </main>
  );
}
