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
];

export function getComparisonBySlug(slug: string) {
  return comparisonPages.find((page) => page.slug === slug);
}
