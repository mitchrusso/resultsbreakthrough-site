import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { getTopicHubBySlug, topicHubs } from "@/lib/hubs";
import { getArticleBySlug, isArticlePublished, type ResourceArticle } from "@/lib/resources";
import { reviewProducts, type ReviewProduct } from "@/lib/reviews";
import { absoluteUrl, jsonLd, siteName } from "@/lib/seo";

type HubPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ShoppingPath = {
  title: string;
  description: string;
  query: string;
};

type BookSubcategory = {
  title: string;
  description: string;
  slugs: string[];
};

const amazonTag = "rb10f-20";
const amazonSearch = (query: string) => `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${amazonTag}`;
const anchorId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const productCategoryMatches: Record<string, string[]> = {
  "productivity-tools": ["Goal Planners", "Focus Timers", "Productivity Tools"],
  "goal-planners": ["Goal Planners"],
  "focus-and-deep-work": ["Focus Timers", "Focus Gear"],
  "entrepreneur-desk-setup": ["Desk Setup", "Remote Work Gear"],
  "business-books": ["Business Books"],
  "goal-achievement-systems": ["Goal Planners", "Business Books", "Goal Achievement Systems"],
  "remote-work-gear": ["Remote Work Gear", "Desk Setup"],
  "habit-trackers": ["Goal Planners", "Business Books", "Productivity Tools", "Goal Achievement Systems"],
  "personal-performance": ["Personal Performance", "Focus Gear", "Goal Planners"],
};

const shoppingPaths: Record<string, ShoppingPath[]> = {
  "productivity-tools": [
    { title: "Planners", description: "Daily, weekly, quarterly, and undated planning formats.", query: "entrepreneur planner productivity" },
    { title: "Goal journals", description: "Reflection journals that turn goals into visible commitments.", query: "goal journal for entrepreneurs" },
    { title: "Time-blocking pads", description: "Simple pads for assigning work to real calendar blocks.", query: "time blocking planner pad" },
    { title: "Habit trackers", description: "Paper and reusable trackers for consistent behaviors.", query: "habit tracker planner" },
    { title: "Whiteboards and Kanban boards", description: "Visible project boards for priorities and weekly flow.", query: "Kanban board whiteboard productivity" },
    { title: "Desk timers", description: "Pomodoro and visual timers for focused work sprints.", query: "desk Pomodoro timer productivity" },
  ],
  "goal-planners": [
    { title: "90-day planners", description: "Short-cycle planners for quarterly execution.", query: "90 day goal planner" },
    { title: "Weekly planners", description: "Layouts for weekly review, priorities, and daily focus.", query: "weekly planner for entrepreneurs" },
    { title: "Reusable notebooks", description: "Handwritten planning with digital capture.", query: "reusable smart notebook planner" },
    { title: "Accountability journals", description: "Journals that pair goals with check-ins and scorekeeping.", query: "accountability journal goals" },
  ],
  "focus-and-deep-work": [
    { title: "Pomodoro timers", description: "Fast-start timers for sprint work and admin blocks.", query: "Pomodoro timer for desk" },
    { title: "Analog timers", description: "Visual time boundaries without phone distraction.", query: "analog visual timer productivity" },
    { title: "Noise-canceling headphones", description: "A focus bubble for offices, travel, and shared spaces.", query: "noise canceling headphones productivity" },
    { title: "Focus lamps", description: "Task lights that cue a work mode and improve visibility.", query: "focus desk lamp productivity" },
    { title: "Blue-light glasses", description: "Evening and screen-heavy work accessories to compare carefully.", query: "blue light glasses computer work" },
    { title: "Minimalist notebooks", description: "Clean capture tools for one priority at a time.", query: "minimalist notebook productivity" },
  ],
  "entrepreneur-desk-setup": [
    { title: "Standing desks", description: "Adjustable desk foundations for long workdays.", query: "electric standing desk home office" },
    { title: "Ergonomic chairs", description: "Supportive seating for operators who sit for hours.", query: "ergonomic office chair home office" },
    { title: "Monitor arms", description: "Better screen height, desk space, and cable flow.", query: "monitor arm desk mount" },
    { title: "Desk lights", description: "Task and video lighting for clearer work and calls.", query: "desk light for video calls" },
    { title: "Noise-canceling headphones", description: "Reduce open-office and household distractions.", query: "noise canceling headphones office" },
    { title: "Webcams and microphones", description: "Upgrade trust on calls, webinars, and sales meetings.", query: "webcam microphone kit video calls" },
  ],
  "business-books": [
    { title: "Productivity books", description: "Systems for focus, habits, planning, and execution.", query: "best productivity books for entrepreneurs" },
    { title: "Sales books", description: "Books for better discovery, offers, follow-up, and closing.", query: "best sales books entrepreneurs" },
    { title: "Leadership books", description: "Frameworks for decision-making, delegation, and team rhythm.", query: "best leadership books entrepreneurs" },
    { title: "Mindset books", description: "Useful mental models for resilience, consistency, and judgment.", query: "mindset books for entrepreneurs" },
    { title: "Accountability books", description: "Execution, scorekeeping, goals, and habit systems.", query: "accountability books goal setting" },
    { title: "Entrepreneur biographies", description: "Founder stories with lessons you can translate into practice.", query: "entrepreneur biographies business books" },
  ],
  "goal-achievement-systems": [
    { title: "OKR workbooks", description: "Objective and key-result tools for teams and solo operators.", query: "OKR workbook planner" },
    { title: "Personal scorecards", description: "Visible lead-measure tracking for weekly review.", query: "personal scorecard planner" },
    { title: "Vision board kits", description: "Visual planning tools for goals and motivation.", query: "vision board kit goals" },
    { title: "Accountability journals", description: "Structured check-ins for commitments and progress.", query: "accountability journal planner" },
  ],
  "remote-work-gear": [
    { title: "Portable monitors", description: "More screen space for travel and flexible work.", query: "portable monitor for laptop" },
    { title: "Laptop stands", description: "Raise the screen for calls and better posture.", query: "portable laptop stand" },
    { title: "Travel keyboards", description: "Compact input tools for mobile work setups.", query: "travel keyboard for laptop" },
    { title: "Ring lights", description: "Simple lighting for video calls and content.", query: "ring light for video calls" },
    { title: "Podcast and call gear", description: "Mics, lights, and accessories for remote presence.", query: "podcast microphone webcam lighting kit" },
    { title: "Home office bundles", description: "Starter bundles for desks, calls, and daily work.", query: "home office setup bundle" },
  ],
  "habit-trackers": [
    { title: "Habit journals", description: "Daily and weekly behavior tracking in paper format.", query: "habit tracker journal" },
    { title: "Weekly scorecards", description: "Simple scorekeeping for lead measures and outcomes.", query: "weekly scorecard planner" },
    { title: "Accountability planners", description: "Planning formats with built-in review prompts.", query: "accountability planner" },
    { title: "Wall trackers", description: "Visible streak and progress tools for offices.", query: "wall habit tracker" },
  ],
  "personal-performance": [
    { title: "Sleep trackers", description: "Tools that help spot rest and recovery patterns.", query: "sleep tracker wearable" },
    { title: "Fitness trackers", description: "Movement and readiness signals for busy operators.", query: "fitness tracker wearable" },
    { title: "Meditation devices", description: "Focus and recovery tools for calmer starts.", query: "meditation device focus" },
    { title: "Hydration bottles", description: "Simple cues for energy and daily rhythm.", query: "smart hydration bottle" },
    { title: "Morning routine tools", description: "Lights, journals, and trackers for a cleaner start.", query: "morning routine journal tools" },
  ],
};

const businessBookSubcategories: BookSubcategory[] = [
  {
    title: "Productivity books",
    description: "Books for virtual business, community leverage, licensing, coaching systems, habits, focus, and execution.",
    slugs: [
      "the-invisible-organization-book",
      "power-tribes-book",
      "licensing-for-leverage-book",
      "coach-elevation-book",
      "atomic-habits-book",
      "deep-work-book",
      "the-12-week-year-book",
    ],
  },
  {
    title: "Leadership books",
    description: "Books for founder judgment, values-led leadership, delegation, and decision quality.",
    slugs: ["sacred-profits-book", "the-invisible-organization-book", "power-tribes-book"],
  },
  {
    title: "Accountability books",
    description: "Books that help turn ideas into weekly scorecards, operating rhythms, and follow-through.",
    slugs: ["the-12-week-year-book", "atomic-habits-book", "coach-elevation-book"],
  },
];

function getHubProducts(hubSlug: string): ReviewProduct[] {
  const matches = productCategoryMatches[hubSlug] ?? [];
  return reviewProducts.filter((product) => matches.includes(product.category)).slice(0, 9);
}

export function generateStaticParams() {
  return topicHubs.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({ params }: HubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = getTopicHubBySlug(slug);

  if (!hub) {
    return {
      title: "Resource Topic Not Found",
    };
  }

  return {
    title: hub.title,
    description: hub.description,
    alternates: {
      canonical: `/resources/topics/${hub.slug}`,
    },
    openGraph: {
      title: `${hub.title} | ${siteName}`,
      description: hub.description,
      url: absoluteUrl(`/resources/topics/${hub.slug}`),
      images: [
        {
          url: absoluteUrl(hub.image),
          alt: `${hub.title} guide image`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${hub.title} | ${siteName}`,
      description: hub.description,
      images: [absoluteUrl(hub.image)],
    },
  };
}

export default async function HubPage({ params }: HubPageProps) {
  const { slug } = await params;
  const hub = getTopicHubBySlug(slug);

  if (!hub) {
    notFound();
  }

  const relatedArticles = hub.relatedArticleSlugs
    .map((articleSlug) => getArticleBySlug(articleSlug))
    .filter((article): article is ResourceArticle => Boolean(article && isArticlePublished(article)));
  const featuredProducts = getHubProducts(hub.slug);
  const paths = shoppingPaths[hub.slug] ?? [];
  const bookSubcategories =
    hub.slug === "business-books"
      ? businessBookSubcategories.map((subcategory) => ({
          ...subcategory,
          products: subcategory.slugs
            .map((productSlug) => reviewProducts.find((product) => product.slug === productSlug))
            .filter((product): product is ReviewProduct => Boolean(product)),
        }))
      : [];
  const relatedHubs = topicHubs.filter((topic) => topic.slug !== hub.slug).slice(0, 4);
  const hubUrl = absoluteUrl(`/resources/topics/${hub.slug}`);
  const hubJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${hubUrl}#webpage`,
        url: hubUrl,
        name: hub.title,
        description: hub.description,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        about: hub.keywords,
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        mainEntity: hub.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: absoluteUrl("/resources"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: hub.title,
            item: hubUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-[#18211f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(hubJsonLd)} />
      <header className="border-b border-[#dce5dc] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-5 px-5 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="ResultsBreakthrough home">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#dff5eb] text-[#0e7a5f]">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </span>
            <span className="text-lg font-black tracking-tight">ResultsBreakthrough</span>
          </Link>
          <Link href="/resources" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#cbd8cf] bg-white px-4 py-2 text-sm font-black text-[#10231f] hover:border-[#0e7a5f]">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Resources
          </Link>
        </div>
      </header>

      <section className="bg-[#eef6ed]">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0e7a5f]">{hub.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{hub.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[#40514b]">{hub.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {hub.keywords.map((keyword) => (
                <span key={keyword} className="rounded-md bg-white px-3 py-2 text-xs font-bold text-[#40514b] shadow-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="flex h-[260px] items-center justify-center rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#dce5dc] sm:h-[300px] lg:h-[340px]">
            <Image src={hub.image} alt={`${hub.title} guide image`} width={520} height={520} className="h-full w-full object-contain" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0e7a5f]">Featured Picks</p>
            <h2 className="mt-2 text-3xl font-black leading-tight">Start with products in this category.</h2>
          </div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#cbd8cf] bg-white px-4 py-2 text-sm font-black text-[#10231f] hover:border-[#0e7a5f]">
            All tool picks
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        {featuredProducts.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.slug} className="rounded-lg border border-[#dce5dc] bg-white p-4 shadow-sm">
                <div className="flex h-44 items-center justify-center rounded-md bg-[#f3f4f6]">
                  <Image src={product.image} alt={product.name} width={420} height={280} className="h-full w-full rounded-md object-cover" />
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[#0e7a5f]">{product.bestFor}</p>
                <h3 className="mt-2 text-lg font-black leading-tight">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5d6d66]">{product.summary}</p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/reviews/${product.slug}`} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md border border-[#cbd8cf] px-3 py-2 text-sm font-black hover:border-[#0e7a5f]">
                    Review
                  </Link>
                  <a href={product.amazon} target="_blank" rel="sponsored nofollow noreferrer" className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md bg-[#10231f] px-3 py-2 text-sm font-black text-white hover:bg-[#213a34]">
                    Amazon
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-lg border border-[#dce5dc] bg-white p-5 text-sm leading-7 text-[#5d6d66]">
            Product picks for this topic are being expanded. Use the shopping paths below to compare current options.
          </p>
        )}
      </section>

      {paths.length > 0 && (
        <section className="border-y border-[#dce5dc] bg-white">
          <div className="mx-auto max-w-5xl px-5 py-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0e7a5f]">Shop Subcategories</p>
                <h2 className="mt-2 text-3xl font-black leading-tight">Browse the specific options inside {hub.title}.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#5d6d66]">
                {hub.slug === "business-books"
                  ? "These category links jump to curated book sections below before sending anyone to Amazon."
                  : "These links open Amazon searches with the ResultsBreakthrough affiliate tag attached."}
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paths.map((path) => (
                <article key={path.title} className="rounded-lg border border-[#dce5dc] bg-[#fbfcf8] p-5 shadow-sm">
                  <a
                    href={hub.slug === "business-books" ? `#${anchorId(path.title)}` : amazonSearch(path.query)}
                    target={hub.slug === "business-books" ? undefined : "_blank"}
                    rel={hub.slug === "business-books" ? undefined : "sponsored nofollow noreferrer"}
                    className="group block"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-lg font-black leading-tight group-hover:text-[#0e7a5f]">{path.title}</span>
                      <ArrowRight className="mt-1 h-4 w-4 flex-none text-[#0e7a5f]" aria-hidden />
                    </span>
                    <span className="mt-3 block text-sm leading-6 text-[#5d6d66]">{path.description}</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {bookSubcategories.length > 0 && (
        <section className="border-b border-[#dce5dc] bg-[#f3f4f6]">
          <div className="mx-auto max-w-5xl px-5 py-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0e7a5f]">Book Picks by Category</p>
              <h2 className="mt-2 text-3xl font-black leading-tight">Start with the books that fit the job.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5d6d66]">
                Review the curated list first, then use the Amazon buttons for the current edition, format, price, and availability.
              </p>
            </div>
            <div className="mt-7 grid gap-8">
              {bookSubcategories.map((subcategory) => (
                <section key={subcategory.title} id={anchorId(subcategory.title)} className="scroll-mt-24 rounded-lg border border-[#dce5dc] bg-white p-5 shadow-sm">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <h3 className="text-2xl font-black leading-tight">{subcategory.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5d6d66]">{subcategory.description}</p>
                    </div>
                    <a
                      href={amazonSearch(subcategory.title === "Productivity books" ? "Mitch Russo books productivity business" : `${subcategory.title} entrepreneurs`)}
                      target="_blank"
                      rel="sponsored nofollow noreferrer"
                      className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#cbd8cf] px-3 py-2 text-sm font-black hover:border-[#0e7a5f]"
                    >
                      Search Amazon
                    </a>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {subcategory.products.map((product) => (
                      <article key={product.slug} className="rounded-lg border border-[#e6ece5] bg-[#fbfcf8] p-4">
                        <div className="flex h-36 items-center justify-center rounded-md bg-white">
                          <Image src={product.image} alt={product.name} width={360} height={240} className="h-full w-full rounded-md object-cover" />
                        </div>
                        <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[#0e7a5f]">{product.bestFor}</p>
                        <h4 className="mt-2 text-lg font-black leading-tight">{product.name}</h4>
                        <p className="mt-2 text-sm leading-6 text-[#5d6d66]">{product.summary}</p>
                        <div className="mt-4 flex gap-2">
                          <Link href={`/reviews/${product.slug}`} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md border border-[#cbd8cf] px-3 py-2 text-sm font-black hover:border-[#0e7a5f]">
                            Review
                          </Link>
                          <a href={product.amazon} target="_blank" rel="sponsored nofollow noreferrer" className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md bg-[#10231f] px-3 py-2 text-sm font-black text-white hover:bg-[#213a34]">
                            Amazon
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 lg:grid-cols-[1fr_280px] lg:items-start">
        <article className="rounded-lg border border-[#dce5dc] bg-white p-6 shadow-sm sm:p-8">
          {hub.sections.map((section) => (
            <section key={section.heading} className="border-b border-[#e6ece5] py-7 first:pt-0 last:border-b-0 last:pb-0">
              <h2 className="text-2xl font-black leading-tight">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-[#4c5d56]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-8 rounded-lg bg-[#eef6ed] p-5">
            <h2 className="text-2xl font-black">Frequently Asked Questions</h2>
            <div className="mt-5 grid gap-4">
              {hub.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg bg-white p-4">
                  <h3 className="font-black">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5d6d66]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="rounded-lg border border-[#dce5dc] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#0e7a5f]">Related Reading</h2>
          <div className="mt-4 grid gap-3">
            {relatedArticles.length > 0 ? (
              relatedArticles.map((article) => (
                <Link key={article.slug} href={`/resources/${article.slug}`} className="group rounded-lg border border-[#e6ece5] p-4 hover:border-[#0e7a5f]">
                  <p className="text-sm font-black leading-6 group-hover:text-[#0e7a5f]">{article.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#5d6d66]">{article.excerpt}</p>
                </Link>
              ))
            ) : (
              <p className="text-sm leading-7 text-[#5d6d66]">Related articles will appear here as they publish.</p>
            )}
          </div>
          <div className="mt-6 rounded-lg bg-[#fbfcf8] p-4">
            <h3 className="flex items-center gap-2 text-sm font-black">
              <CheckCircle2 className="h-4 w-4 text-[#0e7a5f]" aria-hidden />
              Buying note
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#5d6d66]">
              Verify fit, compatibility, current version, warranty, and return policies directly with the retailer or manufacturer before buying.
            </p>
          </div>
          <Link href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0e7a5f]">
            Compare tool picks
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <div className="mt-5 border-t border-[#e6ece5] pt-5">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#0e7a5f]">Related Topics</h3>
            <div className="mt-3 grid gap-2 text-sm font-bold text-[#40514b]">
              {relatedHubs.map((topic) => (
                <Link key={topic.slug} href={`/resources/topics/${topic.slug}`} className="hover:text-[#0e7a5f]">
                  {topic.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-5 border-t border-[#e6ece5] pt-5">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#0e7a5f]">Trust Links</h3>
            <div className="mt-3 grid gap-2 text-sm font-bold text-[#40514b]">
              <Link href="/review-methodology" className="hover:text-[#0e7a5f]">Review Methodology</Link>
              <Link href="/editorial-policy" className="hover:text-[#0e7a5f]">Editorial Policy</Link>
              <Link href="/safety-disclaimer" className="hover:text-[#0e7a5f]">Disclaimer</Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
