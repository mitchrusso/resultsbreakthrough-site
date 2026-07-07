import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimer for ResultsBreakthrough buying guides, reviews, and resource articles.",
  alternates: { canonical: "/safety-disclaimer" },
};

export default function SafetyDisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#20292b]">
      <article className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#a3421f]">Back to ResultsBreakthrough</Link>
        <h1 className="mt-8 text-4xl font-black">Disclaimer</h1>
        <p className="mt-6 text-base leading-8 text-[#536166]">ResultsBreakthrough provides general buying information about planning tools, focus timers, desk gear, remote-work equipment, productivity books, habit trackers, and accountability systems. It is not business, financial, medical, ergonomic, legal, manufacturer, or professional advice.</p>
        <p className="mt-4 text-base leading-8 text-[#536166]">Entrepreneurs, workspaces, budgets, and workflows differ. A product that is appropriate for one operator may be wrong for another if the implementation cadence, desk setup, software stack, team needs, or budget does not match.</p>
        <p className="mt-4 text-base leading-8 text-[#536166]">Before purchase or use, verify product specifications, workflow fit, compatibility, included parts, warranty, return policy, current model, and seller details directly with the retailer or manufacturer.</p>
      </article>
    </main>
  );
}
