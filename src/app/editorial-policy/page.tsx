import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Editorial Policy",
  description: "How ResultsBreakthrough creates, reviews, updates, and discloses productivity buying guides, reviews, and articles.",
  path: "/editorial-policy",
});

const principles = ["Content is written for entrepreneurs and operators who need practical results-first buying information.", "We organize recommendations by workflow, product category, budget, and use case instead of pretending one tool is best for every business.", "We avoid fake ratings, invented prices, and unsupported transformation claims.", "Affiliate relationships do not change the price a reader pays and are disclosed on the site."];

export default function EditorialPolicyPage() {
  return <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#20292b]"><article className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm sm:p-12"><Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#a3421f]">Back to ResultsBreakthrough</Link><h1 className="mt-8 text-4xl font-black">Editorial Policy</h1><p className="mt-6 text-base leading-8 text-[#536166]">ResultsBreakthrough exists to make productivity shopping easier to understand. The site emphasizes workflow fit, clear comparisons, version-aware buying questions, and manufacturer verification.</p><ul className="mt-6 space-y-3">{principles.map((item) => <li key={item} className="rounded-lg border border-[#ddd5c7] bg-[#f3f4f6] p-4 text-base leading-7 text-[#536166]">{item}</li>)}</ul></article></main>;
}
