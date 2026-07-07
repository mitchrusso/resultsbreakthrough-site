"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, BarChart3, BookOpen, Check, Clock3, Laptop, Menu, NotebookPen, ShoppingBag, Sparkles, Target, X, Zap } from "lucide-react";
import { comparisonPages } from "@/lib/comparisons";
import { reviewProducts } from "@/lib/reviews";
import { siteFaqs } from "@/lib/trust";
import { absoluteUrl, jsonLd, siteName } from "@/lib/seo";

const navItems = [
  { href: "#reviews", label: "Tool Picks" },
  { href: "#systems", label: "Systems" },
  { href: "#compare", label: "Compare" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const systemGuides = [
  { title: "Plan the Quarter", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80", href: "/resources/topics/goal-planners", copy: "Goal planners, weekly review rituals, daily priorities, and scorecards." },
  { title: "Protect Deep Work", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80", href: "/resources/topics/focus-and-deep-work", copy: "Timers, headphones, time blocks, and distraction-light workflows." },
  { title: "Upgrade the Desk", image: "https://images.unsplash.com/photo-1593476550610-87baa860004a?auto=format&fit=crop&w=1200&q=80", href: "/resources/topics/entrepreneur-desk-setup", copy: "Standing desks, monitor arms, webcams, lighting, and daily comfort." },
  { title: "Install Better Models", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80", href: "/resources/topics/business-books", copy: "Books and frameworks that become visible execution behaviors." },
];

const quickMatchCards = [
  { title: "I need a weekly planning system", answer: "Start with planner formats and review cadence.", href: "/resources/topics/goal-planners", icon: NotebookPen },
  { title: "I keep getting distracted", answer: "Compare physical timers and focus tools.", href: "/resources/topics/focus-and-deep-work", icon: Clock3 },
  { title: "My office setup slows me down", answer: "Look at desk, monitor, light, and camera upgrades.", href: "/resources/topics/entrepreneur-desk-setup", icon: Laptop },
  { title: "I want stronger execution habits", answer: "Use scorecards, books, and accountability tools.", href: "/resources/topics/habit-trackers", icon: BarChart3 },
];

const categoryLinks = [
  {
    title: "Productivity Tools",
    href: "/resources/topics/productivity-tools",
    items: "Planners, time-blocking pads, whiteboards, Kanban boards, timers",
    icon: Zap,
    accent: "bg-[#e8f5ee] text-[#1f7a5d]",
  },
  {
    title: "Entrepreneur Desk Setup",
    href: "/resources/topics/entrepreneur-desk-setup",
    items: "Standing desks, chairs, monitor arms, desk lights, webcams, microphones",
    icon: Laptop,
    accent: "bg-[#edf1ff] text-[#4457a8]",
  },
  {
    title: "Focus and Deep Work",
    href: "/resources/topics/focus-and-deep-work",
    items: "Distraction blockers, analog timers, focus lamps, glasses, earplugs",
    icon: Clock3,
    accent: "bg-[#fff1df] text-[#a85b1e]",
  },
  {
    title: "Business Books",
    href: "/resources/topics/business-books",
    items: "Productivity, sales, leadership, mindset, accountability, biographies",
    icon: BookOpen,
    accent: "bg-[#f3eefe] text-[#6749a8]",
  },
  {
    title: "Goal Achievement Systems",
    href: "/resources/topics/goal-achievement-systems",
    items: "90-day planners, OKR workbooks, scorecards, vision boards, journals",
    icon: Target,
    accent: "bg-[#e9f7f8] text-[#22727b]",
  },
  {
    title: "Remote Work and Virtual Business",
    href: "/resources/topics/remote-work-gear",
    items: "Portable monitors, laptop stands, keyboards, ring lights, call gear",
    icon: NotebookPen,
    accent: "bg-[#f7f0e6] text-[#7b5a25]",
  },
  {
    title: "Personal Performance",
    href: "/resources/topics/personal-performance",
    items: "Sleep trackers, fitness trackers, meditation tools, hydration bottles",
    icon: BarChart3,
    accent: "bg-[#fceaea] text-[#9a3f3f]",
  },
];

const breakthroughRules = [
  "Buy the tool that supports one repeatable behavior, not a fantasy version of your workday.",
  "Pair every planner, timer, or book with a calendar review ritual.",
  "Upgrade the workspace where friction happens every day.",
  "Prefer visible scorekeeping over vague productivity motivation.",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const topProducts = reviewProducts.slice(0, 9);
  const pageJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": absoluteUrl("/#webpage"), name: `${siteName} | Entrepreneur Productivity Tools and Execution Gear`, description: "Shopping guides for entrepreneurs comparing planners, focus timers, desk gear, remote-work tools, business books, and accountability systems.", url: absoluteUrl("/") },
      { "@type": "ItemList", "@id": absoluteUrl("/#tool-picks"), name: "Entrepreneur breakthrough tool picks", itemListElement: topProducts.map((product, index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(`/reviews/${product.slug}`), name: product.name })) },
      { "@type": "FAQPage", mainEntity: siteFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
    ],
  }), [topProducts]);

  return (
    <main className="min-h-screen bg-[#f2f5f1] text-[#172427]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(pageJsonLd)} />
      <header className="sticky top-0 z-50 border-b border-[#d9ddd4] bg-[#fbfcf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="flex items-center gap-3" aria-label="ResultsBreakthrough home">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#256f63] text-white"><Target className="h-5 w-5" aria-hidden /></span>
            <span className="text-lg font-black tracking-tight">ResultsBreakthrough</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold text-[#53605c] lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-[#256f63]">{item.label}</a>)}
          </nav>
          <a href="#reviews" className="hidden min-h-11 items-center gap-2 rounded-md bg-[#172427] px-4 py-2 text-sm font-black text-white hover:bg-[#2d3e42] sm:inline-flex">
            <ShoppingBag className="h-4 w-4" aria-hidden /> Shop Tool Picks
          </a>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#cdd4ca] bg-white text-[#172427] lg:hidden" aria-label="Open menu" aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#d9ddd4] bg-[#fbfcf8] px-5 py-4 lg:hidden">
            <nav className="grid gap-2 text-base font-black" aria-label="Mobile navigation">
              {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-md border border-[#d9ddd4] bg-white px-4 py-3">{item.label}</a>)}
            </nav>
          </div>
        )}
      </header>

      <section id="top" className="relative overflow-hidden bg-[#10231f]">
        <Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80" alt="Modern entrepreneur workspace with glass offices and focused work areas" fill sizes="100vw" className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-[#10231f]/60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:py-16 lg:py-18">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#c7f1dd] backdrop-blur"><Sparkles className="h-4 w-4" aria-hidden /> Entrepreneur execution shopping guide</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-normal text-white sm:text-5xl lg:text-[64px]">The entrepreneur&apos;s guide to tools that turn goals into traction.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#e0eee9]">Compare planners, focus timers, workspace gear, business books, and accountability tools by the behavior they actually help you improve.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#reviews" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#2fa37e] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white hover:bg-[#258969]">Explore tool picks <ArrowRight className="h-4 w-4" aria-hidden /></a>
              <a href="#categories" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur hover:bg-white/20">Browse categories <ArrowRight className="h-4 w-4" aria-hidden /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="border-b border-[#dde3dc] bg-[#fbfcf8]">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#256f63]">Shop By Work System</p>
              <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight sm:text-4xl">Start with the part of your workday that needs the most leverage.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#53605c]">Each category leads to a practical buying guide, related products, and articles that help turn a tool into a repeatable system.</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categoryLinks.map((category) => (
              <Link key={category.title} href={category.href} className="group min-h-[176px] rounded-lg border border-[#dde3dc] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#256f63] hover:shadow-md">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-md ${category.accent}`}>
                  <category.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="mt-5 flex items-start justify-between gap-4">
                  <span className="text-lg font-black leading-tight text-[#172427] group-hover:text-[#256f63]">{category.title}</span>
                  <ArrowRight className="mt-1 h-4 w-4 flex-none text-[#6b7771] group-hover:text-[#256f63]" aria-hidden />
                </span>
                <span className="mt-3 block text-sm font-semibold leading-6 text-[#53605c]">{category.items}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9ddd4] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#256f63]">Quick Match</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">What bottleneck are you trying to remove?</h2>
            </div>
            <Link href="/faq" className="text-sm font-black text-[#256f63] hover:text-[#1e5a51]">Read buyer FAQ</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickMatchCards.map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-lg border border-[#d9ddd4] bg-[#f2f5f1] p-5 shadow-sm hover:border-[#256f63]">
                <item.icon className="h-7 w-7 text-[#256f63]" aria-hidden />
                <h3 className="mt-4 text-lg font-black leading-tight group-hover:text-[#256f63]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#53605c]">{item.answer}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#256f63]">See guide <ArrowRight className="h-4 w-4" aria-hidden /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-black uppercase tracking-[0.18em] text-[#256f63]">Tool Picks</p><h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Products chosen by the behavior they support.</h2></div>
          <Link href="/review-methodology" className="text-sm font-black text-[#256f63] hover:text-[#1e5a51]">How we organize picks</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {topProducts.map((product, index) => (
            <article key={product.slug} className="rounded-lg border border-[#d9ddd4] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3"><span className="rounded-md bg-[#e5f1eb] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#256f63]">#{index + 1} Breakthrough Pick</span><span className="text-xs font-bold text-[#69756f]">{product.category}</span></div>
              <div className="mt-4 flex h-56 items-center justify-center rounded-md bg-[#f2f5f1] p-2"><Image src={product.image} alt={product.name} width={520} height={390} className="h-full w-full rounded-md object-cover" /></div>
              <h3 className="mt-5 text-xl font-black leading-tight">{product.name}</h3>
              <p className="mt-2 text-sm font-black text-[#256f63]">{product.bestFor}</p>
              <p className="mt-3 text-sm leading-6 text-[#53605c]">{product.summary}</p>
              <div className="mt-4 grid gap-2 text-sm text-[#53605c]">
                {product.pros.slice(0, 2).map((pro) => <p key={pro} className="flex gap-2"><Check className="mt-1 h-4 w-4 flex-none text-[#256f63]" aria-hidden />{pro}</p>)}
              </div>
              <div className="mt-5 flex gap-2"><Link href={`/reviews/${product.slug}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-[#cdd4ca] px-4 py-2 text-sm font-black hover:border-[#256f63]">Review</Link><a href={product.amazon} target="_blank" rel="sponsored nofollow noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-[#172427] px-4 py-2 text-sm font-black text-white hover:bg-[#2d3e42]">Amazon</a></div>
            </article>
          ))}
        </div>
      </section>

      <section id="systems" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#256f63]">Systems</p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Shop by the kind of breakthrough you want.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {systemGuides.map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-lg border border-[#d9ddd4] bg-[#f2f5f1] p-4 shadow-sm hover:border-[#256f63]">
                <div className="flex h-44 items-center justify-center rounded-md bg-white">
                  <Image src={item.image} alt={`${item.title} guide`} width={600} height={380} className="h-full w-full rounded-md object-cover" />
                </div>
                <h3 className="mt-4 text-xl font-black group-hover:text-[#256f63]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#53605c]">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.75fr_1fr]">
        <div className="rounded-lg bg-[#172427] p-7 text-white">
          <BadgeCheck className="h-8 w-8 text-[#b6e1d4]" aria-hidden />
          <h2 className="mt-5 text-3xl font-black leading-tight">Breakthrough buying rules.</h2>
          <div className="mt-6 grid gap-4">
            {breakthroughRules.map((rule) => <p key={rule} className="flex gap-3 text-sm leading-6 text-[#e8f1ee]"><Check className="mt-1 h-4 w-4 flex-none text-[#b6e1d4]" aria-hidden />{rule}</p>)}
          </div>
        </div>
        <div className="grid gap-4">
          {comparisonPages.map((comparison) => (
            <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="rounded-lg border border-[#d9ddd4] bg-white p-5 shadow-sm hover:border-[#256f63]">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#256f63]">Comparison</p>
              <h3 className="mt-2 text-2xl font-black">{comparison.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#53605c]">{comparison.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#e9f1ec] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-5 md:grid-cols-3">
            {[{icon:Target,title:"Outcome first",copy:"Choose the tool based on the behavior or bottleneck it changes."},{icon:Zap,title:"Friction down",copy:"The best gear makes starting, focusing, reviewing, or presenting easier."},{icon:BookOpen,title:"Ideas into action",copy:"Business books matter most when they become a scorecard or ritual."}].map((item)=> <div key={item.title} className="rounded-lg border border-[#cbd8d0] bg-white p-6"><item.icon className="h-7 w-7 text-[#256f63]" aria-hidden /><h3 className="mt-4 text-xl font-black">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#53605c]">{item.copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#256f63]">FAQ</p>
        <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Common entrepreneur tool questions.</h2>
        <div className="mt-8 grid gap-4">
          {siteFaqs.slice(0, 8).map((faq) => <details key={faq.question} className="rounded-lg border border-[#d9ddd4] bg-white p-5"><summary className="cursor-pointer text-lg font-black">{faq.question}</summary><p className="mt-3 text-sm leading-7 text-[#53605c]">{faq.answer}</p></details>)}
        </div>
        <Link href="/faq" className="mt-6 inline-flex min-h-11 items-center rounded-md border border-[#cdd4ca] bg-white px-4 py-2 text-sm font-black text-[#172427] hover:border-[#256f63]">
          View full FAQ
        </Link>
      </section>

      <footer className="border-t border-[#d9ddd4] bg-[#f2f5f1]">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-md bg-[#256f63] text-white"><Target className="h-5 w-5" aria-hidden /></span><span className="text-lg font-black">ResultsBreakthrough</span></div><p className="mt-4 max-w-2xl text-sm leading-7 text-[#53605c]">ResultsBreakthrough is a participant in the Amazon Services LLC Associates Program. We may earn from qualifying purchases. Content is general shopping information; verify current specs, fit, price, and availability before buying.</p></div>
            <div className="grid grid-cols-2 gap-3 text-sm font-bold text-[#53605c]">
              {[["Resources","/resources"],["FAQ","/faq"],["Contact Us","/contact"],["Editorial Policy","/editorial-policy"],["Review Methodology","/review-methodology"],["Disclaimer","/safety-disclaimer"],["Privacy Policy","/privacy-policy"],["Cookie Policy","/cookie-policy"],["TOS","/terms-and-conditions"],["Accessibility","/accessibility-statement"],["Amazon Disclosure","/amazon-disclosure"]].map(([label,href]) => <Link key={href} href={href} className="hover:text-[#256f63]">{label}</Link>)}
            </div>
          </div>
          <p className="mt-8 border-t border-[#d9ddd4] pt-5 text-xs text-[#69756f]">Copyright 2026 ResultsBreakthrough.</p>
        </div>
      </footer>
    </main>
  );
}
