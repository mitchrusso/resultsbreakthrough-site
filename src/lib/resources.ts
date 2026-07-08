export type ResourceArticle = {
  title: string;
  slug: string;
  publishDate: string;
  category: string;
  image: string;
  excerpt: string;
  keywords: string[];
  sections: { heading: string; body: { text: string; sourceIds: string[] }[] }[];
  sourceIds: string[];
  takeaway: string;
};

export const keywordPlan = [
  { cluster: "Goal planners", keywords: ["goal planner for entrepreneurs", "weekly review planner", "quarterly goal planner", "accountability planner"] },
  { cluster: "Focus timers", keywords: ["best focus timer", "pomodoro timer for productivity", "deep work tools", "time blocking timer"] },
  { cluster: "Home office setup", keywords: ["entrepreneur desk setup", "standing desk for home office", "monitor arm setup", "productivity desk gear"] },
  { cluster: "Remote work gear", keywords: ["video call setup", "webcam lighting for consultants", "remote work gear", "home office camera setup"] },
  { cluster: "Business books", keywords: ["business books for entrepreneurs", "productivity books", "execution books", "habit books"] },
  { cluster: "Accountability systems", keywords: ["weekly scorecard", "habit tracker for entrepreneurs", "12 week year planner", "accountability tools"] },
];

const images = {
  planner: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
  focus: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
  desk: "https://images.unsplash.com/photo-1593476550610-87baa860004a?auto=format&fit=crop&w=1200&q=80",
  remote: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80",
  books: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
  habits: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
};

const articlePlan = [
  ["Best Goal Planner for Entrepreneurs: What to Look For Before You Buy", "best-goal-planner-for-entrepreneurs", "2026-07-07", "Goal Planners", images.planner, ["goal planner for entrepreneurs", "weekly review planner", "quarterly planning"]],
  ["A Weekly Review System for Founders Who Keep Too Much in Their Head", "weekly-review-system-for-founders", "2026-07-08", "Goal Planners", images.planner, ["weekly review system", "founder planning routine", "accountability planner"]],
  ["Best Focus Timer for Deep Work Blocks", "best-focus-timer-for-deep-work", "2026-07-09", "Focus Timers", images.focus, ["best focus timer", "deep work timer", "pomodoro timer"]],
  ["Pomodoro vs Time Blocking: Which Productivity Method Fits Your Work?", "pomodoro-vs-time-blocking", "2026-07-10", "Focus Timers", images.focus, ["pomodoro vs time blocking", "focus method", "time blocking"]],
  ["Home Office Setup for Entrepreneurs: The Gear That Removes Friction", "home-office-setup-for-entrepreneurs", "2026-07-13", "Desk Setup", images.desk, ["entrepreneur desk setup", "home office productivity gear", "standing desk"]],
  ["Standing Desk vs Desk Converter: Which Upgrade Should Come First?", "standing-desk-vs-desk-converter", "2026-07-14", "Desk Setup", images.desk, ["standing desk vs desk converter", "home office ergonomics", "desk setup"]],
  ["Video Call Setup for Consultants, Coaches, and Founders", "video-call-setup-for-consultants", "2026-07-15", "Remote Work Gear", images.remote, ["video call setup", "webcam lighting", "consultant home office"]],
  ["Best Webcam Lighting for Remote Work and Sales Calls", "best-webcam-lighting-for-remote-work", "2026-07-16", "Remote Work Gear", images.remote, ["webcam lighting for remote work", "video call lighting", "key light"]],
  ["Best Productivity Books for Founders Who Need Better Execution", "best-productivity-books-for-founders", "2026-07-17", "Business Books", images.books, ["productivity books", "business books for founders", "execution books"]],
  ["Mitch Russo Books Reading Order: Which One Fits Your Business Stage?", "mitch-russo-books-reading-order", "2026-07-08", "Business Books", images.books, ["Mitch Russo books", "The Invisible Organization", "Power Tribes", "Licensing for Leverage", "Coach Elevation", "Sacred Profits"]],
  ["Atomic Habits for Entrepreneurs: The Products That Help You Apply It", "atomic-habits-for-entrepreneurs", "2026-07-20", "Business Books", images.books, ["Atomic Habits for entrepreneurs", "habit tracker", "productivity tools"]],
  ["Deep Work for Entrepreneurs: How to Build a Focus Stack", "deep-work-for-entrepreneurs", "2026-07-21", "Business Books", images.books, ["Deep Work for entrepreneurs", "focus stack", "deep work tools"]],
  ["The 12 Week Year Planning Tools: What to Buy and What to Skip", "12-week-year-planning-tools", "2026-07-22", "Accountability Systems", images.habits, ["12 Week Year planner", "weekly scorecard", "execution planning"]],
  ["Habit Trackers for Entrepreneurs: Simple Scorecards That Actually Get Used", "habit-trackers-for-entrepreneurs", "2026-07-23", "Accountability Systems", images.habits, ["habit tracker for entrepreneurs", "weekly scorecard", "accountability tools"]],
  ["Remote Work Gear Checklist for a Cleaner Daily Workflow", "remote-work-gear-checklist", "2026-07-24", "Remote Work Gear", images.remote, ["remote work gear checklist", "home office gear", "productivity setup"]],
  ["Accountability Tools for Founders Who Do Not Need Another App Graveyard", "accountability-tools-for-founders", "2026-07-27", "Accountability Systems", images.habits, ["accountability tools for founders", "goal tracking", "weekly review"]],
  ["Weekly Scorecard Tools: How to Track Lead Measures Without Overbuilding", "weekly-scorecard-template-tools", "2026-07-28", "Accountability Systems", images.habits, ["weekly scorecard tools", "lead measures", "business accountability"]],
  ["Personal Kanban for Entrepreneurs: How to See Work Before It Stalls", "personal-kanban-for-entrepreneurs", "2026-07-29", "Goal Planners", images.planner, ["personal Kanban for entrepreneurs", "Kanban whiteboard", "visual project management"]],
  ["Best Portable Monitor Setup for Founders Who Travel", "best-portable-monitor-setup-for-founders", "2026-07-30", "Remote Work Gear", images.remote, ["portable monitor for laptop", "travel work setup", "remote founder gear"]],
  ["How to Choose a USB Microphone for Sales Calls and Webinars", "usb-microphone-for-sales-calls", "2026-07-31", "Remote Work Gear", images.remote, ["USB microphone for sales calls", "webinar microphone", "remote work audio"]],
  ["Blue-Light Glasses, Breaks, and Better Shutdown Routines", "blue-light-glasses-shutdown-routine", "2026-08-03", "Focus Timers", images.focus, ["blue light glasses for computer work", "shutdown routine", "screen fatigue tools"]],
  ["OKR Workbook vs 90-Day Planner: Which One Fits Your Business?", "okr-workbook-vs-90-day-planner", "2026-08-04", "Accountability Systems", images.habits, ["OKR workbook", "90 day planner", "goal achievement system"]],
  ["Sleep Trackers for Entrepreneurs: What to Measure and What to Ignore", "sleep-trackers-for-entrepreneurs", "2026-08-05", "Accountability Systems", images.habits, ["sleep tracker for entrepreneurs", "recovery tools", "personal performance"]],
  ["The Founder Desk Setup Checklist for Video, Writing, and Deep Work", "founder-desk-setup-checklist", "2026-08-06", "Desk Setup", images.desk, ["founder desk setup", "entrepreneur workspace checklist", "desk gear for deep work"]],
  ["Business Books Are Not Enough: How to Turn Reading Into an Operating System", "turn-business-books-into-operating-system", "2026-08-07", "Business Books", images.books, ["business books implementation", "productivity books for entrepreneurs", "operating system for founders"]],
] as const;

const categorySources: Record<string, string[]> = {
  "Goal Planners": ["strategist-planners", "businessinsider-planners", "cleverfox-official"],
  "Focus Timers": ["amazon-ticktime", "cal-newport-deep-work", "actionablebooks-productivity"],
  "Desk Setup": ["ergotron-home-office", "techradar-standing-desks"],
  "Remote Work Gear": ["ergotron-home-office", "techradar-standing-desks"],
  "Business Books": ["mitch-russo-books", "actionablebooks-productivity", "atomic-habits", "cal-newport-deep-work", "amazon-12-week-year"],
  "Accountability Systems": ["amazon-12-week-year", "atomic-habits", "cleverfox-official"],
  "Personal Performance": ["atomic-habits", "cal-newport-deep-work", "actionablebooks-productivity"],
};

function paragraph(text: string, sourceIds: string[]) {
  return { text, sourceIds };
}

function buildSections(title: string, category: string, keywords: readonly string[]) {
  const sourceIds = categorySources[category] ?? ["actionablebooks-productivity"];
  const primary = sourceIds.slice(0, 2);
  const keywordPhrase = keywords.map((keyword) => `"${keyword}"`).join(", ");

  return [
    {
      heading: "The buying decision behind the search",
      body: [
        paragraph(`${title} is not really about buying another object for the desk. It is about reducing the friction between intention and execution, which is why shoppers searching ${keywordPhrase} should start with the behavior they want to repeat.`, primary),
        paragraph(`For ${category.toLowerCase()}, the strongest purchase is the one that makes your next planning session, focus block, client call, or weekly scorecard easier to start and easier to review.`, sourceIds),
      ],
    },
    {
      heading: "What to compare before buying",
      body: [
        paragraph("Compare the format, setup time, visibility, portability, maintenance, and whether the tool supports your actual work cadence. A beautiful planner or expensive desk upgrade is only useful when it survives a normal busy week.", primary),
        paragraph("Look for tools that create a clear next action: choose the top three outcomes, start a timed session, raise the monitor to eye level, improve call lighting, or review lead measures every Friday.", sourceIds),
      ],
    },
    {
      heading: "Where entrepreneurs waste money",
      body: [
        paragraph("The common mistake is buying a complete new system when one missing piece is causing the drag. If priorities are unclear, buy a planner. If attention is leaking, buy a timer or headphones. If calls look unprofessional, fix lighting before replacing every device.", primary),
        paragraph("Avoid product bundles that promise transformation without a repeatable ritual. Results come from tool plus cadence: weekly review, focused blocks, clean capture, and visible scorekeeping.", sourceIds),
      ],
    },
    {
      heading: "A practical setup path",
      body: [
        paragraph("Start with one tool, attach it to a calendar ritual, and review it after two weeks. If it is helping, add the next supporting piece. If it is not, simplify before buying more.", primary),
        paragraph("The best breakthrough stack is usually boring: a planner for priorities, a timer for focus, a clean desk for comfort, better call gear for credibility, and a book or framework that improves decision quality.", sourceIds),
      ],
    },
  ];
}

export const resourceArticles: ResourceArticle[] = articlePlan.map(([title, slug, publishDate, category, image, keywords]) => {
  const sourceIds = categorySources[category] ?? ["actionablebooks-productivity"];

  return {
    title,
    slug,
    publishDate,
    category,
    image,
    excerpt: `A practical ResultsBreakthrough guide to ${keywords[0]} with buying criteria, setup advice, and what to avoid.`,
    keywords: [...keywords],
    sections: buildSections(title, category, keywords),
    sourceIds,
    takeaway: "Buy the tool that supports the next repeatable behavior, then make the review cadence visible.",
  };
});

export function getArticleBySlug(slug: string) {
  return resourceArticles.find((article) => article.slug === slug);
}

export function isArticlePublished(article: ResourceArticle, now = new Date()) {
  return new Date(`${article.publishDate}T00:00:00-04:00`).getTime() <= now.getTime();
}

export function getPublishedArticles(now = new Date()) {
  return resourceArticles.filter((article) => isArticlePublished(article, now));
}

export function getScheduledArticles(now = new Date()) {
  return resourceArticles.filter((article) => !isArticlePublished(article, now));
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${date}T12:00:00-04:00`));
}

export function getNextScheduledArticle(now = new Date()) {
  return getScheduledArticles(now).sort((a, b) => a.publishDate.localeCompare(b.publishDate))[0];
}
