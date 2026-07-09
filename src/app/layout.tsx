import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { absoluteUrl, defaultDescription, defaultOgImage, jsonLd, siteName, siteUrl } from "@/lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "ResultsBreakthrough | Entrepreneur Productivity Tools and Execution Gear", template: `%s | ${siteName}` },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Business",
  keywords: [
    "productivity tools for entrepreneurs",
    "goal planner for entrepreneurs",
    "deep work tools",
    "home office productivity gear",
    "business books for founders",
    "accountability systems",
    "weekly review planner",
    "remote work gear",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "ResultsBreakthrough | Entrepreneur Productivity Tools and Execution Gear",
    description: defaultDescription,
    images: [{ url: defaultOgImage, width: 1200, height: 800, alt: "Modern entrepreneur desk with laptop and planning notebook" }],
  },
  twitter: { card: "summary_large_image", title: "ResultsBreakthrough | Entrepreneur Productivity Tools", description: defaultDescription, images: [defaultOgImage] },
  robots: { index: true, follow: true },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteName,
      url: siteUrl,
      description: defaultDescription,
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: siteName,
      url: siteUrl,
      publisher: { "@id": absoluteUrl("/#organization") },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/resources?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script src="https://app.rybbit.io/api/script.js" data-site-id="6ab9d2374e06" defer />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteJsonLd)} />
        {children}
      </body>
    </html>
  );
}
