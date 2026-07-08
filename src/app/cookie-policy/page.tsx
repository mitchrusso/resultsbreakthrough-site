import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "Cookie Policy for ResultsBreakthrough, including analytics, affiliate links, and browser choices.",
  path: "/cookie-policy",
});

const sections = [
  { title: "How cookies may be used", body: "ResultsBreakthrough may use cookies, pixels, log files, analytics tools, affiliate tracking, and similar technologies to operate the site, understand performance, remember basic preferences, and attribute qualifying purchases." },
  { title: "Affiliate links", body: "When you click an affiliate link, Amazon or another third-party retailer may use cookies or similar technologies under its own policies. ResultsBreakthrough does not control those third-party tracking systems." },
  { title: "Analytics and performance", body: "Analytics data may help us understand which pages are useful, which links are clicked, and which resource topics should be improved. This data is generally used in aggregate." },
  { title: "Your choices", body: "Most browsers let you block, delete, or limit cookies. Blocking cookies may affect some site features or affiliate attribution, but the core content should remain readable." },
  { title: "Updates", body: "This policy may be updated as site tools, analytics, affiliate programs, or legal requirements change." },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#20292b]">
      <article className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#a3421f]">Back to ResultsBreakthrough</Link>
        <h1 className="mt-8 text-4xl font-black">Cookie Policy</h1>
        <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-[#728078]">Effective Date: July 2, 2026</p>
        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-black">{section.title}</h2>
              <p className="mt-3 text-base leading-8 text-[#536166]">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
