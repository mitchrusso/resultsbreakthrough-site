import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact ResultsBreakthrough with questions about productivity guides, product categories, affiliate links, safer-shopping topics, or resource articles.",
  path: "/contact",
});

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
