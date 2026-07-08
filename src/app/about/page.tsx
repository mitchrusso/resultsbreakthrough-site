import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Learn about ResultsBreakthrough, a results-first shopping guide for entrepreneurs and operators.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#18211f]">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#0e7a5f]">
          Back to ResultsBreakthrough
        </Link>
        <h1 className="mt-8 text-4xl font-black">About ResultsBreakthrough</h1>
        <p className="mt-6 text-base leading-8 text-[#5d6d66]">
          ResultsBreakthrough helps entrepreneurs compare planners, focus timers, desk setup gear, remote-work tools, productivity books, habit trackers, and accountability systems.
        </p>
        <p className="mt-4 text-base leading-8 text-[#5d6d66]">
          The site was created for entrepreneurs who want clear product-category guidance, workflow-aware buying checklists, and plain-English next steps before making a purchase.
        </p>
      </article>
    </main>
  );
}
