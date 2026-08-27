export type ComparisonPage = {
  title: string;
  slug: string;
  description: string;
  image: string;
  keywords: string[];
  left: string;
  right: string;
  winner: string;
  rows: { label: string; left: string; right: string; note: string }[];
};

export const comparisonPages: ComparisonPage[] = [
  {
    title: "Paper Planner vs Digital Task Manager",
    slug: "paper-planner-vs-digital-task-manager",
    description: "Choose the right planning system for quarterly goals, daily priorities, team tasks, and weekly reviews.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    keywords: ["paper planner vs digital task manager", "best planner for entrepreneurs", "weekly planning system"],
    left: "Paper planner",
    right: "Digital task manager",
    winner: "Paper wins for reflection and priority clarity; digital wins for collaboration, recurring tasks, and reminders.",
    rows: [
      { label: "Best use", left: "Weekly review and daily priorities", right: "Team tasks and recurring workflows", note: "Many entrepreneurs use both." },
      { label: "Friction", left: "Requires sitting down and writing", right: "Easy to capture quickly", note: "Capture is not the same as execution." },
      { label: "Accountability", left: "Visible personal commitment", right: "Automated reminders and shared status", note: "Choose the tool you will review weekly." },
    ],
  },
  {
    title: "Pomodoro Timer vs Time Blocking",
    slug: "pomodoro-timer-vs-time-blocking",
    description: "Compare short focus sprints with calendar-based deep work blocks for sales, writing, strategy, and admin.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    keywords: ["pomodoro timer", "time blocking", "deep work timer"],
    left: "Pomodoro timer",
    right: "Time blocking",
    winner: "Use time blocking to reserve the work; use a timer to protect the session once it begins.",
    rows: [
      { label: "Best use", left: "Starting hard tasks", right: "Protecting high-value work", note: "They combine well." },
      { label: "Time horizon", left: "15 to 60 minutes", right: "Half-day or weekly calendar", note: "Timers are tactical; blocks are strategic." },
      { label: "Risk", left: "Can fragment deep work", right: "Can become fantasy scheduling", note: "Review what actually got done." },
    ],
  },
  {
    title: "Standing Desk vs Desk Converter",
    slug: "standing-desk-vs-desk-converter",
    description: "Compare full electric standing desks with desktop converters for home-office ergonomics and budget.",
    image: "https://images.unsplash.com/photo-1593476550610-87baa860004a?auto=format&fit=crop&w=1200&q=80",
    keywords: ["standing desk vs desk converter", "home office ergonomics", "entrepreneur desk setup"],
    left: "Standing desk",
    right: "Desk converter",
    winner: "A full standing desk is cleaner for a dedicated office; a converter is faster when you already own a solid desk.",
    rows: [
      { label: "Setup", left: "Replaces the desk", right: "Sits on existing desk", note: "Measure first either way." },
      { label: "Stability", left: "Often more stable", right: "Depends on base and weight", note: "Monitor size matters." },
      { label: "Budget", left: "Higher upfront cost", right: "Lower entry cost", note: "Cable management can add hidden work." },
    ],
  },
  {
    title: "Business Books vs Execution Planners",
    slug: "business-books-vs-execution-planners",
    description: "Decide whether your next breakthrough needs a better idea, a better system, or both.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    keywords: ["business books for entrepreneurs", "execution planner", "accountability system"],
    left: "Business books",
    right: "Execution planners",
    winner: "Books sharpen the model; planners turn the model into weekly behavior.",
    rows: [
      { label: "Best use", left: "Learning a framework", right: "Installing a cadence", note: "Read, then operationalize." },
      { label: "Output", left: "Ideas and language", right: "Priorities, deadlines, and scorecards", note: "Results need behavior." },
      { label: "Risk", left: "Passive consumption", right: "Over-planning", note: "Every tool needs a weekly review." },
    ],
  },
  {
    title: "Visual Timer vs Digital Pomodoro Timer",
    slug: "visual-timer-vs-digital-pomodoro-timer",
    description: "Compare analog visual timers and digital Pomodoro timers for focus blocks, admin sessions, writing, and team work.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    keywords: ["visual timer vs Pomodoro timer", "best desk timer", "focus timer for deep work"],
    left: "Visual timer",
    right: "Digital Pomodoro timer",
    winner: "Visual timers are great for at-a-glance time awareness; digital timers are better when you want presets, repeat cycles, and audible cues.",
    rows: [
      { label: "Best use", left: "Visible countdown during work", right: "Repeatable sprint routines", note: "Both work best with a written session outcome." },
      { label: "Distraction risk", left: "Low if fully analog", right: "Low if it is a standalone device", note: "Phone apps can reintroduce distraction." },
      { label: "Workflow fit", left: "Planning, reading, writing, meetings", right: "Admin, outreach, recurring focus blocks", note: "Choose based on the work rhythm." },
    ],
  },
  {
    title: "Laptop Stand vs Portable Monitor",
    slug: "laptop-stand-vs-portable-monitor",
    description: "Compare two travel-work upgrades by posture, screen space, packing size, cables, and daily setup friction.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    keywords: ["laptop stand vs portable monitor", "remote work travel setup", "portable monitor for laptop"],
    left: "Laptop stand",
    right: "Portable monitor",
    winner: "Start with a laptop stand when posture and call framing are the problem; add a portable monitor when screen space is slowing real work.",
    rows: [
      { label: "Primary benefit", left: "Raises screen and camera", right: "Adds working space", note: "Many remote setups eventually use both." },
      { label: "Accessories", left: "Usually needs keyboard and mouse", right: "Needs compatible cable and power plan", note: "Check ports before buying." },
      { label: "Travel fit", left: "Usually smaller and lighter", right: "More valuable for analysis and writing", note: "Packability matters." },
    ],
  },
  {
    title: "Noise-Canceling Headphones vs Earplugs",
    slug: "noise-canceling-headphones-vs-earplugs",
    description: "Compare distraction-control options for shared offices, travel, coffee shops, deep work, and sensory comfort.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    keywords: ["noise canceling headphones vs earplugs", "focus gear for entrepreneurs", "deep work noise control"],
    left: "Noise-canceling headphones",
    right: "Earplugs",
    winner: "Headphones are more versatile for calls and travel; earplugs are simpler, cheaper, and easier to keep everywhere.",
    rows: [
      { label: "Best use", left: "Travel, calls, music, open office", right: "Quiet focus, sleep, backup kit", note: "Comfort determines actual use." },
      { label: "Cost", left: "Usually higher", right: "Usually lower", note: "Price is not the same as daily usefulness." },
      { label: "Setup friction", left: "Charge, pair, configure", right: "Carry and replace", note: "Keep a backup option." },
    ],
  },
  {
    title: "OKR Workbook vs 90-Day Planner",
    slug: "okr-workbook-vs-90-day-planner",
    description: "Decide whether your execution system needs formal objectives, a shorter sprint cadence, or a simpler weekly review.",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80",
    keywords: ["OKR workbook vs 90 day planner", "goal achievement system", "quarterly planning tools"],
    left: "OKR workbook",
    right: "90-day planner",
    winner: "Use an OKR workbook when measurement is unclear; use a 90-day planner when the priorities are known and follow-through is the bottleneck.",
    rows: [
      { label: "Best use", left: "Define outcomes and key results", right: "Drive weekly execution", note: "Both require honest review." },
      { label: "Complexity", left: "More structured", right: "Usually simpler", note: "Solo founders should keep either lightweight." },
      { label: "Risk", left: "Over-formalizing small goals", right: "Planning tasks without measurable outcomes", note: "Tie actions to lead measures." },
    ],
  },
];

export function getComparisonBySlug(slug: string) {
  return comparisonPages.find((page) => page.slug === slug);
}
