import type { Role } from "./types";

/** Work history shown as folders under ~/experience. Most recent first. */
export const experience: Role[] = [
  {
    slug: "sainsburys",
    company: "Sainsbury's SSC",
    title: "Senior Software Engineer",
    period: "Aug 2024 – Present",
    location: "London / Remote",
    tech: ["nextjs", "react", "csharp", "dotnet", "swift", "mongodb", "postgresql", "azure", "aws", "kubernetes", "githubactions", "semantickernel"],
    bullets: [
      "Led the migration of the internal Activity App from React to Next.js — the platform Sainsbury's uses to push activity and housekeeping tasks to store colleagues. Deployed to stores end of 2025; colleague feedback reported a ~60% workflow speed-up off the back of UX and load-time work.",
      "Currently on the Agentic team, building the Microsoft Semantic Kernel layer for Assist (colleague incident-reporting tool) that converts natural-language descriptions into pre-filled forms; authored the spike benchmarking the five Microsoft AI Agent Orchestration Patterns and recommended the Hybrid pattern (classifier-routed parallel specialist agents with consolidated results).",
      "Previously helped deliver a mobile hub consolidating the day-to-day apps store colleagues use, combining iOS/Android natives, a Next.js webview, and C#/.NET services backed by MongoDB and PostgreSQL.",
      "Author design-thinking documents and technical spikes that align engineers, product, and non-technical stakeholders; stood up CI/CD with GitHub Actions, reusable workflow templates, and environment-specific release gates (Azure, AWS, Kubernetes, OpenLens, BOSUN).",
      "Introduced refinement meetings, templated PRs, and consistent service documentation — lifting team productivity by ~15%.",
      "Sainsbury's × Microsoft Hackathon: 2nd place with a Power Apps solution using live store datasets to cut waste.",
    ],
  },
  {
    slug: "rapiscan",
    company: "Rapiscan Systems",
    title: "Software Engineer",
    period: "Jul 2023 – Jul 2024",
    location: "Stoke-on-Trent",
    tech: ["csharp", "dotnet", "python"],
    bullets: [
      "In a department of ~10 engineers, supported software integration across 8 hardware products (C#, ASP.NET, Lua, Python).",
      "Led defect triage and fixes on a complex, hardware-integrated codebase; shipped instrumentation and structured logs that cut RCA time on cross-system issues.",
    ],
  },
  {
    slug: "theone",
    company: "Theone (Tech Startup)",
    title: "Software Engineer · Contract (part-time, weekends)",
    period: "Aug 2023 – Feb 2024",
    location: "Remote",
    tech: ["nodejs", "express", "nextjs", "postgresql", "stripe", "githubactions"],
    bullets: [
      "Took full technical leadership of the startup's MVP — a web platform to manage content generation and ad campaigns. Node.js/Express backend, Next.js frontend, PostgreSQL, Stripe, GitHub Actions CI/CD.",
      "Delivered end-to-end in 6 months alongside my full-time role.",
    ],
  },
  {
    slug: "bet365",
    company: "bet365 (Hillside Technology)",
    title: "Software Developer",
    period: "Aug 2021 – Jan 2023",
    location: "Stoke-on-Trent",
    bullets: [
      "Part of a ~6-engineer team maintaining in-house back-office tools and services used by the trading desk; stabilised legacy systems supporting revenue-critical workflows via targeted refactors.",
      "Drove debugging at scale and introduced structured logging/metrics to raise reliability.",
    ],
  },
  {
    slug: "freelance",
    company: "Freelance",
    title: "Software Developer (Web)",
    period: "2023 – 2025",
    location: "Remote",
    tech: ["react", "nextjs", "nodejs", "express", "stripe"],
    bullets: [
      "Owned client builds end-to-end — scoping, full-stack delivery (React/Next.js + Node.js/Express + database design), Stripe subscription / recurring-billing integrations across multiple clients, deployment, and direct client communication.",
      "Ran each engagement on a calendared cadence with clear milestones and regular check-ins, keeping delivery on-time and cleanly contained outside my full-time role.",
    ],
  },
];
