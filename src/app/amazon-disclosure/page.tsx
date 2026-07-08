import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Amazon Affiliate Disclosure",
  description: "Amazon affiliate disclosure for ResultsBreakthrough product reviews, buying guides, and shopping links.",
  path: "/amazon-disclosure",
});

export default function AmazonDisclosurePage() {
  return <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#20292b]"><article className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm sm:p-12"><Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#a3421f]">Back to ResultsBreakthrough</Link><h1 className="mt-8 text-4xl font-black">Amazon Affiliate Disclosure</h1><p className="mt-6 text-base leading-8 text-[#536166]">ResultsBreakthrough is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn fees by advertising and linking to Amazon.com.</p><p className="mt-4 text-base leading-8 text-[#536166]">As an Amazon Associate, we earn from qualifying purchases. Affiliate links do not add an extra cost to you.</p></article></main>;
}
