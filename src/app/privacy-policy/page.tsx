import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for ResultsBreakthrough, including information about contact forms, analytics, cookies, and affiliate links.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "ResultsBreakthrough is an informational and affiliate website. We may collect limited information that you voluntarily provide, such as your name, email address, or message if you contact us.",
      "We may also collect technical information automatically, including IP address, browser type, device information, referring pages, pages viewed, approximate location derived from your IP address, and the date and time of your visit.",
    ],
  },
  {
    title: "Cookies, Analytics, and Similar Technologies",
    body: [
      "We may use cookies, pixels, analytics tools, log files, and similar technologies to operate the site, measure traffic, understand content performance, detect abuse, and improve the reader experience.",
      "You can usually control cookies through your browser settings. Blocking cookies may affect some site features or tracking related to affiliate links.",
    ],
  },
  {
    title: "Affiliate Links and Third Parties",
    body: [
      "Some links on this site are affiliate links. If you click an affiliate link and make a purchase, we may earn a commission at no additional cost to you.",
      "When you click a link to Amazon or another third-party site, that third party may collect information under its own privacy policy. We do not control the privacy practices, pricing, product availability, or content of third-party websites.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use information to operate and secure the site, respond to inquiries, analyze site performance, improve content, maintain affiliate attribution, prevent fraud or abuse, and comply with applicable legal obligations.",
      "We do not sell personal information for money. If future tools are added that qualify as sharing or targeted advertising under applicable privacy laws, we will update this policy and provide any required choices.",
    ],
  },
  {
    title: "Your Privacy Choices",
    body: [
      "Depending on where you live, you may have rights to request access to, correction of, deletion of, or a copy of personal information associated with you. You may also have the right to opt out of certain data sharing, targeted advertising, or profiling.",
      "To make a privacy request, contact us through the Contact page. We may need to verify your request before acting on it.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "This site is intended for a general audience and is not directed to people under 13. We do not knowingly collect personal information from people under 13.",
      "If you believe a person under 13 has provided personal information to us, please contact us so we can review and delete it when appropriate.",
    ],
  },
  {
    title: "Data Security and Retention",
    body: [
      "We use reasonable administrative, technical, and organizational safeguards designed to protect information. No website or internet transmission can be guaranteed to be completely secure.",
      "We keep information only as long as reasonably necessary for the purposes described in this policy, unless a longer period is required or allowed by law.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#18211f]">
      <article className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#0e7a5f]">
          Back to ResultsBreakthrough
        </Link>
        <h1 className="mt-8 text-4xl font-black">Privacy Policy</h1>
        <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-[#728078]">
          Effective Date: July 2, 2026
        </p>
        <p className="mt-6 text-base leading-8 text-[#5d6d66]">
          This Privacy Policy explains how ResultsBreakthrough collects, uses, and protects information when you visit this website, read our content, contact us, or click affiliate links.
        </p>

        <nav aria-label="Privacy policy sections" className="mt-8 rounded-lg border border-[#dce5dc] bg-[#fbfcf8] p-5">
          <h2 className="text-sm font-black uppercase tracking-[0.12em] text-[#0e7a5f]">Contents</h2>
          <ol className="mt-3 grid gap-2 text-sm font-bold text-[#40514b] sm:grid-cols-2">
            {sections.map((section) => (
              <li key={section.title}>
                <a href={`#${section.title.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`} className="hover:text-[#0e7a5f]">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-9">
          {sections.map((section) => (
            <section key={section.title} id={section.title.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}>
              <h2 className="text-2xl font-black">{section.title}</h2>
              <div className="mt-3 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-[#5d6d66]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 border-t border-[#e6ece5] pt-8">
          <h2 className="text-2xl font-black">Contact</h2>
          <p className="mt-3 text-base leading-8 text-[#5d6d66]">
            For privacy questions or requests, please use the <Link href="/contact" className="font-bold text-[#0e7a5f]">Contact page</Link>.
          </p>
        </section>
      </article>
    </main>
  );
}
