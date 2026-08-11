// ─── Type Definitions ───

export interface StatCard {
  value: string;
  label: string;
  description: string;
}

export interface BreadthItem {
  label: string;
  description: string;
}

export interface ExperienceBullet {
  text: string;
  highlight?: string;
}

export interface Experience {
  company: string;
  period: string;
  location: string;
  clientLabel: string;
  clientFlag: string;
  role: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

export type SkillTier = "core" | "strong" | "know";

export interface SkillTag {
  name: string;
  tier: SkillTier;
}

export interface SkillGroup {
  title: string;
  tags: SkillTag[];
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  groups: SkillGroup[];
  note: string;
}

export interface ContactLink {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface CtaCard {
  icon: string;
  label: string;
  value: string;
}

// ─── Data ───

// Root-relative, not bare fragments: from a /blog/* URL a bare "#about"
// resolves against the current path and breaks.
export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Blog", href: "/blog" },
] as const;

export const statCards: StatCard[] = [
  {
    value: "40%",
    label: "Faster rendering",
    description:
      "Cut form load times on a Norwegian government platform used by thousands",
  },
  {
    value: "50%",
    label: "Faster dev onboarding",
    description:
      "New engineers shipped features in half the usual ramp-up time",
  },
  {
    value: "20%",
    label: "Higher user retention",
    description:
      "Swiss insurance portal redesign kept more customers through the funnel",
  },
  {
    value: "25%",
    label: "Fewer frontend bugs",
    description: "State management overhaul on a WCAG-compliant React application",
  },
];

export const breadthItems: BreadthItem[] = [
  {
    label: "Frontend Core",
    description:
      "React \u00B7 TypeScript \u00B7 Next.js \u00B7 Redux",
  },
  {
    label: "Backend Fluency",
    description: "Node.js \u00B7 Express \u00B7 REST APIs \u00B7 GraphQL",
  },
  {
    label: "DevOps Basics",
    description: "Docker \u00B7 CI/CD \u00B7 AWS \u00B7 Git workflows",
  },
  {
    label: "AI-Powered Apps",
    description:
      "LLM integration \u00B7 AI-assisted workflows \u00B7 Prompt engineering",
  },
];

export const experiences: Experience[] = [
  {
    company: "CEFALO",
    period: "Nov 2022 \u2013 Present",
    location: "Dhaka, Bangladesh",
    clientFlag: "\u{1F1F3}\u{1F1F4}",
    clientLabel: "Norwegian clients",
    role: "Senior Software Engineer",
    summary:
      "Led frontend architecture for a government form-builder platform used across Norwegian municipalities \u2014 while also contributing to backend APIs and CI/CD pipelines.",
    bullets: [
      "<strong>Architected</strong> a dynamic form-builder platform for Norwegian public sector clients \u2014 reduced form rendering latency by <strong>40%</strong>",
      "<strong>Introduced</strong> scalable Redux architecture and React best practices, cutting new-developer ramp-up time by <strong>50%</strong>",
      "<strong>Built data visualisation</strong> solutions using Svelte \u2014 interactive charts and analytics dashboards optimised for performance",
      "<strong>Developed RESTful APIs</strong> with Node.js and integrated backend services for seamless data flow",
      "Acted as <strong>technical advisor</strong> across multiple teams, guiding architecture decisions and enforcing code quality",
    ],
    tags: [
      "React",
      "Redux",
      "TypeScript",
      "Next.js",
      "Svelte",
      "Node.js",
      "REST API",
      "AWS",
    ],
  },
  {
    company: "SELISE",
    period: "Sep 2020 \u2013 Oct 2022",
    location: "Dhaka, Bangladesh",
    clientFlag: "\u{1F1E8}\u{1F1ED}",
    clientLabel: "Swiss enterprise",
    role: "Software Engineer",
    summary:
      "Built and scaled a customer-facing insurance portal for a Swiss enterprise client, improving both conversion and performance significantly.",
    bullets: [
      "<strong>Developed</strong> a customer-facing insurance platform using Angular \u2014 improved user retention and conversion by <strong>20%</strong>",
      "<strong>Built a component library</strong> ensuring UI consistency across multiple modules and simplifying development",
      "<strong>Refactored</strong> the frontend\u2013backend communication layer, reducing data-fetching issues by <strong>35%</strong>",
    ],
    tags: ["Angular", "TypeScript", "RxJS", "Material UI", "Agile"],
  },
  {
    company: "KINSHIP AI",
    period: "Dec 2017 \u2013 Aug 2020",
    location: "Remote",
    clientFlag: "\u{1F1FA}\u{1F1F8}",
    clientLabel: "US startup \u00B7 Remote",
    role: "Frontend Engineer",
    summary:
      "Built a pixel-perfect, WCAG-compliant React application for a US AI startup \u2014 fully remote from Dhaka, three years before remote became mainstream.",
    bullets: [
      "<strong>Built</strong> responsive, pixel-perfect UI with React \u2014 full <strong>WCAG accessibility compliance</strong> and cross-device compatibility",
      "<strong>Streamlined</strong> UI state management with Redux \u2014 <strong>25% decrease</strong> in frontend bugs and smoother interactions",
      "Collaborated asynchronously with US-based designers and backend developers across time zones",
    ],
    tags: ["React", "Redux", "JavaScript", "SCSS", "WCAG"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "\u269B\uFE0F",
    groups: [
      {
        title: "Core \u2014 daily tools, expert level",
        tags: [
          { name: "React", tier: "core" },
          { name: "TypeScript", tier: "core" },
          { name: "Next.js", tier: "core" },
          { name: "Redux", tier: "core" },
          { name: "React Query", tier: "core" },
        ],
      },
      {
        title: "Strong \u2014 regular production use",
        tags: [
          { name: "Angular", tier: "strong" },
          { name: "Svelte", tier: "strong" },
          { name: "TailwindCSS", tier: "strong" },
          { name: "SCSS", tier: "strong" },
          { name: "Framer Motion", tier: "strong" },
          { name: "Material UI", tier: "strong" },
          { name: "Ant Design", tier: "strong" },
          { name: "JavaScript (ES2023+)", tier: "strong" },
          { name: "WCAG Accessibility", tier: "strong" },
          { name: "Performance Optimisation", tier: "strong" },
          { name: "Responsive Design", tier: "strong" },
        ],
      },
      {
        title: "Also know",
        tags: [
          { name: "HTML5 / CSS3", tier: "know" },
          { name: "Bootstrap", tier: "know" },
          { name: "Socket.IO", tier: "know" },
        ],
      },
    ],
    note: "Black = expert (9 years). Gray border = confident. Outline = working knowledge.",
  },
  {
    id: "backend",
    label: "Backend",
    icon: "\u{1F7E2}",
    groups: [
      {
        title: "Backend fluency \u2014 can contribute, not a blocker",
        tags: [
          { name: "Node.js", tier: "core" },
          { name: "Express", tier: "core" },
          { name: "REST API design", tier: "strong" },
          { name: "GraphQL", tier: "strong" },
          { name: "NestJS", tier: "strong" },
        ],
      },
      {
        title: "Databases",
        tags: [
          { name: "PostgreSQL", tier: "strong" },
          { name: "Prisma ORM", tier: "strong" },
          { name: "MongoDB / NoSQL", tier: "know" },
        ],
      },
      {
        title: "Real-time",
        tags: [
          { name: "Socket.IO", tier: "strong" },
          { name: "WebSockets", tier: "know" },
        ],
      },
    ],
    note: "I can build and maintain backend APIs, review backend PRs, and collaborate deeply with backend teams \u2014 without needing a translator.",
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "\u{1F433}",
    groups: [
      {
        title: "Version control & collaboration",
        tags: [
          { name: "Git", tier: "core" },
          { name: "GitHub", tier: "core" },
          { name: "Bitbucket", tier: "strong" },
          { name: "AWS", tier: "strong" },
        ],
      },
      {
        title: "Containers & CI/CD",
        tags: [
          { name: "Docker", tier: "strong" },
          { name: "CI/CD pipelines", tier: "strong" },
          { name: "GitHub Actions", tier: "know" },
          { name: "Vercel / Netlify", tier: "know" },
        ],
      },
      {
        title: "Build & quality",
        tags: [
          { name: "Vite", tier: "strong" },
          { name: "ESLint", tier: "strong" },
          { name: "Prettier", tier: "strong" },
          { name: "Unit Testing", tier: "strong" },
          { name: "Jest", tier: "know" },
        ],
      },
    ],
    note: "Comfortable in DevOps conversations \u2014 can set up pipelines, manage Docker containers, and contribute to deployment workflows.",
  },
  {
    id: "ai",
    label: "AI & Tools",
    icon: "\u{1F916}",
    groups: [
      {
        title: "AI-powered development",
        tags: [
          { name: "Claude / GPT API integration", tier: "core" },
          { name: "AI-assisted coding (Cursor, Claude Code)", tier: "strong" },
          { name: "Prompt engineering", tier: "strong" },
        ],
      },
      {
        title: "Design & prototyping",
        tags: [
          { name: "Figma", tier: "strong" },
          { name: "v0.dev", tier: "strong" },
          { name: "Zeplin", tier: "know" },
          { name: "Storybook", tier: "know" },
        ],
      },
      {
        title: "Project & process",
        tags: [
          { name: "Jira", tier: "strong" },
          { name: "Agile / Scrum", tier: "strong" },
          { name: "Technical documentation", tier: "strong" },
        ],
      },
    ],
    note: "Actively building with AI tools \u2014 faster prototyping, smarter debugging, and LLM-powered features in production apps.",
  },
  {
    id: "soft",
    label: "Leadership",
    icon: "\u{1F91D}",
    groups: [
      {
        title: "Team & leadership",
        tags: [
          { name: "Frontend architecture decisions", tier: "core" },
          { name: "Code review", tier: "core" },
          { name: "Technical mentoring", tier: "strong" },
          { name: "Remote team management", tier: "strong" },
        ],
      },
      {
        title: "Communication",
        tags: [
          { name: "Cross-timezone collaboration", tier: "strong" },
          { name: "Stakeholder communication", tier: "strong" },
          { name: "Technical documentation", tier: "strong" },
          { name: "English (professional)", tier: "know" },
        ],
      },
      {
        title: "Process",
        tags: [
          { name: "Agile / Scrum", tier: "strong" },
          { name: "Sprint planning", tier: "strong" },
          { name: "Technical interviews", tier: "know" },
        ],
      },
    ],
    note: "Led distributed teams across Norwegian and Swiss client projects \u2014 comfortable owning architectural decisions and communicating trade-offs to non-technical stakeholders.",
  },
];

export const ctaCards: CtaCard[] = [
  { icon: "\u{1F30D}", label: "Remote", value: "USD or EUR salary" },
  {
    icon: "\u2708\uFE0F",
    label: "Visa sponsorship",
    value: "Open to relocation",
  },
  {
    icon: "\u{1F4C5}",
    label: "Availability",
    value: "2 months\u2019 notice",
  },
  {
    icon: "\u{1F4BC}",
    label: "Role type",
    value: "Full-time \u00B7 Senior / Lead level",
  },
];

export const contactLinks: ContactLink[] = [
  {
    icon: "\u2709\uFE0F",
    label: "Email",
    value: "salman.bd100@gmail.com",
    href: "mailto:salman.bd100@gmail.com",
  },
  {
    icon: "\u{1F4BC}",
    label: "LinkedIn",
    value: "linkedin.com/in/salmanbd",
    href: "https://linkedin.com/in/salmanbd",
  },
  {
    icon: "\u{1F419}",
    label: "GitHub",
    value: "github.com/salmanbd100",
    href: "https://github.com/salmanbd100",
  },
];

export const openToItems: string[] = [
  "Senior or Lead Frontend Engineer roles (React / TypeScript / Next.js)",
  "Remote-first teams with USD or EUR compensation",
  "Companies serving European or global enterprise clients",
  "Teams that prioritize code quality, accessibility, and performance",
];
