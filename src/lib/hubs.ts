export type TopicHub = {
  title: string;
  slug: string;
  eyebrow: string;
  description: string;
  image: string;
  keywords: string[];
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
  relatedArticleSlugs: string[];
};

export const topicHubs: TopicHub[] = [
  {
    title: "Productivity Tools",
    slug: "productivity-tools",
    eyebrow: "Tool Stack",
    description: "Compare planners, goal journals, time-blocking pads, habit trackers, whiteboards, Kanban boards, and Pomodoro timers.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    keywords: ["productivity tools for entrepreneurs", "time blocking tools", "Kanban board for personal productivity"],
    relatedArticleSlugs: ["best-goal-planner-for-entrepreneurs", "best-focus-timer-for-deep-work", "weekly-review-system-for-founders"],
    sections: [
      {
        heading: "Buy tools that clarify the next action",
        body: [
          "Productivity tools are useful when they reduce decision fatigue. A planner should make priorities visible. A timer should make time boundaries obvious. A board should show what is moving, stuck, or finished.",
          "The best setup is usually simple: one place to plan the week, one place to track active work, and one visible cue that starts a focus block.",
        ],
      },
      {
        heading: "Match format to behavior",
        body: [
          "Use paper tools for reflection, commitment, and daily priorities. Use whiteboards and Kanban boards when work needs to stay visible. Use timers when the hard part is starting or protecting a work session.",
          "Avoid buying overlapping tools that create duplicate systems. Pick the one that makes the behavior you need easier tomorrow morning.",
        ],
      },
    ],
    faqs: [
      { question: "What productivity tool should an entrepreneur buy first?", answer: "Start with the bottleneck. If priorities are unclear, buy a planner. If focus is weak, buy a timer. If projects stall, use a board or scorecard." },
      { question: "Are paper productivity tools still useful?", answer: "Yes. Paper can be excellent for weekly review, reflection, and visible commitment, especially when digital tools become noisy." },
    ],
  },
  {
    title: "Goal Planners and Accountability Systems",
    slug: "goal-planners",
    eyebrow: "Execution",
    description: "Compare paper planners, reusable notebooks, scorecards, weekly reviews, and quarterly goal systems.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    keywords: ["goal planner for entrepreneurs", "weekly review planner", "accountability planner"],
    relatedArticleSlugs: ["best-goal-planner-for-entrepreneurs", "weekly-review-system-for-founders", "12-week-year-planning-tools"],
    sections: [
      { heading: "Start with the review rhythm", body: ["A planner works when it creates a repeatable decision point: what matters this week, what must be finished today, and what gets postponed.", "Choose a planner that makes reviewing easier than drifting."] },
      { heading: "Match the tool to the work", body: ["Paper is strong for reflection and commitment. Digital capture is strong for searching, sharing, and recurring tasks. Most entrepreneurs need a clean division between both."] },
    ],
    faqs: [
      { question: "Should entrepreneurs use paper or digital planners?", answer: "Use paper for priorities and review; use digital tools for reminders, delegation, and shared work." },
      { question: "What matters most in a planner?", answer: "Weekly review space, clear daily priorities, and a layout you will actually use." },
    ],
  },
  {
    title: "Focus and Deep Work Tools",
    slug: "focus-and-deep-work",
    eyebrow: "Attention",
    description: "Build better focus blocks with physical timers, headphones, time blocking, and distraction controls.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    keywords: ["deep work tools", "pomodoro timer for productivity", "focus gear for entrepreneurs"],
    relatedArticleSlugs: ["best-focus-timer-for-deep-work", "pomodoro-vs-time-blocking", "noise-canceling-headphones-for-focus"],
    sections: [
      { heading: "Make focus visible", body: ["A physical timer gives your brain a visible boundary. That matters when the alternative is picking up a phone and opening the door to every distraction.", "The best focus tools make starting easier and stopping clearer."] },
      { heading: "Protect the environment", body: ["Noise control, clean desk surfaces, and calendar blocks are part of the same system. Deep work is a designed environment, not a personality trait."] },
    ],
    faqs: [
      { question: "Is Pomodoro good for entrepreneurs?", answer: "It is useful for starting hard tasks and clearing admin, but longer creative work may need bigger time blocks." },
      { question: "Do noise-canceling headphones help productivity?", answer: "They can reduce distractions, especially in shared spaces, but they work best with a clear task outcome." },
    ],
  },
  {
    title: "Entrepreneur Desk Setup",
    slug: "entrepreneur-desk-setup",
    eyebrow: "Workspace",
    description: "Compare standing desks, monitor arms, webcams, lights, and ergonomic upgrades for serious work.",
    image: "https://images.unsplash.com/photo-1593476550610-87baa860004a?auto=format&fit=crop&w=1200&q=80",
    keywords: ["entrepreneur desk setup", "home office productivity gear", "standing desk monitor arm"],
    relatedArticleSlugs: ["home-office-setup-for-entrepreneurs", "standing-desk-vs-desk-converter", "video-call-setup-for-consultants"],
    sections: [
      { heading: "Remove physical friction", body: ["A better desk setup should make it easier to sit down, see clearly, sound credible, and work without fighting cables, glare, or poor posture.", "Start with the screen, chair, light, camera, and surface you use every day."] },
      { heading: "Buy for the task mix", body: ["A coach needs video presence. A writer needs focus and screen comfort. A founder on calls all day needs lighting, audio, and an adjustable workspace."] },
    ],
    faqs: [
      { question: "What is the first desk upgrade?", answer: "If your screen height is wrong, a monitor arm or stand often changes the workspace quickly." },
      { question: "Is a standing desk necessary?", answer: "No, but adjustable height can help if you sit for long stretches and will actually alternate positions." },
    ],
  },
  {
    title: "Business Books for Breakthroughs",
    slug: "business-books",
    eyebrow: "Models",
    description: "Books that help entrepreneurs install better habits, protect attention, and execute shorter cycles.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    keywords: ["business books for entrepreneurs", "productivity books", "execution books"],
    relatedArticleSlugs: ["best-productivity-books-for-founders", "atomic-habits-for-entrepreneurs", "deep-work-for-entrepreneurs"],
    sections: [
      { heading: "Read for implementation", body: ["The best business book is not the one you finish fastest. It is the one that turns into a meeting cadence, habit trigger, scorecard, or decision rule.", "Choose books with frameworks you can operationalize."] },
      { heading: "Pair books with tools", body: ["Atomic Habits pairs with habit tracking. Deep Work pairs with timers and time blocks. The 12 Week Year pairs with weekly scorekeeping and planners."] },
    ],
    faqs: [
      { question: "How many books should I work through at once?", answer: "One implementation book at a time is usually better than ten partially applied ideas." },
      { question: "Should I buy print, Kindle, or audio?", answer: "Pick the format you will finish, then capture the actions in a planner or task system." },
    ],
  },
  {
    title: "Goal Achievement Systems",
    slug: "goal-achievement-systems",
    eyebrow: "Execution Cadence",
    description: "Compare 90-day planners, OKR workbooks, personal scorecards, vision board kits, and accountability journals.",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80",
    keywords: ["90 day planner", "OKR workbook", "personal scorecard for entrepreneurs"],
    relatedArticleSlugs: ["12-week-year-planning-tools", "weekly-scorecard-template-tools", "accountability-tools-for-founders"],
    sections: [
      {
        heading: "Turn goals into shorter execution cycles",
        body: [
          "Big annual goals often fail because they stay abstract. A 90-day or 12-week system creates urgency, forces tradeoffs, and makes progress easier to review before the year disappears.",
          "Look for systems that include weekly scorekeeping, lead measures, and room to reflect on what actually happened.",
        ],
      },
      {
        heading: "Make accountability visible",
        body: [
          "Vision boards, OKR workbooks, scorecards, and accountability journals all work best when they become part of a weekly meeting with yourself or a partner.",
          "The tool should help you answer three questions quickly: what mattered, what moved, and what needs to change next week.",
        ],
      },
    ],
    faqs: [
      { question: "Is an OKR workbook useful for solo entrepreneurs?", answer: "It can be, as long as the objectives stay few and the key results are measurable. Solo founders often need simpler OKRs than larger teams." },
      { question: "What is the difference between a planner and a goal achievement system?", answer: "A planner organizes time and tasks. A goal achievement system adds outcomes, lead measures, review cadence, and accountability." },
    ],
  },
  {
    title: "Remote Work Gear",
    slug: "remote-work-gear",
    eyebrow: "Presence",
    description: "Improve calls, recordings, webinars, coaching sessions, and remote selling with practical gear.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80",
    keywords: ["remote work gear", "video call setup", "webcam lighting for consultants"],
    relatedArticleSlugs: ["video-call-setup-for-consultants", "best-webcam-lighting-for-remote-work", "remote-work-gear-checklist"],
    sections: [
      { heading: "Credibility is visual and audible", body: ["For consultants, coaches, and founders, video quality is part of trust. A clearer camera, better light, and stable audio make conversations easier.", "Gear should reduce friction, not turn your office into a studio project."] },
      { heading: "Small upgrades compound", body: ["A light, webcam, laptop stand, and clean cable path can make daily calls feel more professional without a massive budget."] },
    ],
    faqs: [
      { question: "What matters more, webcam or lighting?", answer: "Lighting often improves video quality before a camera upgrade does. The best setup usually uses both." },
      { question: "Do I need 4K video?", answer: "Not always. Sharp framing, good light, and reliable audio matter more than raw resolution." },
    ],
  },
  {
    title: "Habit Trackers and Scorecards",
    slug: "habit-trackers",
    eyebrow: "Consistency",
    description: "Track habits, lead measures, sales activity, content output, and weekly execution metrics.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    keywords: ["habit tracker for entrepreneurs", "weekly scorecard", "business accountability system"],
    relatedArticleSlugs: ["habit-trackers-for-entrepreneurs", "weekly-scorecard-template-tools", "accountability-tools-for-founders"],
    sections: [
      { heading: "Track the lead measure", body: ["A breakthrough rarely comes from tracking vague goals. Track the repeatable action that makes the result more likely: calls made, proposals sent, workouts completed, pages written, or focus blocks protected.", "The simpler the scorecard, the more likely it survives."] },
      { heading: "Review before you redesign", body: ["Do not replace the system every week. Review what happened, adjust one variable, and keep the score visible long enough to learn from it."] },
    ],
    faqs: [
      { question: "Should I track every habit?", answer: "No. Track the few behaviors that directly support the result you want next." },
      { question: "Paper or app for habit tracking?", answer: "Use the one you will review. Paper is visible; apps are searchable and portable." },
    ],
  },
  {
    title: "Personal Performance",
    slug: "personal-performance",
    eyebrow: "Energy",
    description: "Compare sleep trackers, fitness trackers, meditation devices, hydration bottles, and morning routine tools.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    keywords: ["personal performance tools", "sleep tracker for entrepreneurs", "morning routine tools"],
    relatedArticleSlugs: ["habit-trackers-for-entrepreneurs", "accountability-tools-for-founders", "weekly-review-system-for-founders"],
    sections: [
      {
        heading: "Protect the human system behind the business",
        body: [
          "Execution is not only a planning problem. Sleep, hydration, movement, recovery, and morning routines shape the quality of decisions entrepreneurs make all day.",
          "Personal performance tools should create awareness without becoming another complicated dashboard to manage.",
        ],
      },
      {
        heading: "Choose feedback you will act on",
        body: [
          "Sleep trackers, fitness trackers, meditation devices, and hydration bottles are useful when they lead to a small behavior change: earlier shutdown, more walking, fewer skipped breaks, or a repeatable morning start.",
          "The goal is not to measure everything. The goal is to remove one energy leak that keeps undermining execution.",
        ],
      },
    ],
    faqs: [
      { question: "Do personal performance tools belong on a business productivity site?", answer: "Yes, when they support work quality. Energy, sleep, recovery, and routine affect focus and decision-making." },
      { question: "What personal performance tool should I start with?", answer: "Start with the problem you can act on. If sleep is inconsistent, track sleep. If you skip breaks, use hydration or movement cues." },
    ],
  },
];

export function getTopicHubBySlug(slug: string) {
  return topicHubs.find((hub) => hub.slug === slug);
}
