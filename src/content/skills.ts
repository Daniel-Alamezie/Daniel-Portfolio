import type { Achievement, SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    label: "Languages & Frameworks",
    items: ["C# (.NET 10)", "Node.js / Express", "React", "Next.js", "TypeScript", "Swift (iOS)", "Python", "SQL"],
  },
  {
    label: "AI / LLM Engineering",
    items: [
      "Anthropic Claude & OpenAI APIs",
      "Microsoft Semantic Kernel",
      "Agentic orchestration patterns",
      "Tool use / function calling",
      "Prompt-based guardrails",
      "Structured outputs (JSON schemas)",
      "Trace / observability logging",
      "Retries & cross-model fallbacks",
      "Inference cost control",
    ],
  },
  {
    label: "Cloud, DevOps & Tooling",
    items: ["Azure", "AWS", "Kubernetes", "OpenLens", "BOSUN", "GitHub Actions CI/CD", "PostgreSQL", "MongoDB", "Supabase", "Stripe", "Docker", "Bruno"],
  },
  {
    label: "Architecture & Ways of Working",
    items: ["Microservices", "REST / GraphQL", "Event-driven", "CQRS", "DDD", "TDD", "Feature flags", "k6 (load)", "Telemetry / SLOs", "Agile (Scrum/Kanban)", "Security & privacy by design (GDPR)"],
  },
];

export const achievements: Achievement[] = [
  {
    title: "~60% workflow speed-up — Sainsbury's Activity App",
    detail: "Led the React → Next.js migration of the platform Sainsbury's uses to push tasks to store colleagues. Deployed to stores; colleague feedback reported a ~60% workflow speed-up from UX and load-time work.",
    year: 2025,
  },
  {
    title: "2nd place — Sainsbury's × Microsoft Hackathon",
    detail: "Built a Power Apps solution using live store datasets to cut waste.",
  },
  {
    title: "+15% team productivity",
    detail: "Introduced refinement meetings, templated PRs, and consistent service documentation across the team.",
  },
  {
    title: "Recommended the Hybrid agent orchestration pattern",
    detail: "Authored the spike benchmarking Microsoft's five AI Agent Orchestration Patterns for Assist; recommended classifier-routed parallel specialist agents with consolidated results.",
  },
  {
    title: "Shipped NIFL to production, solo",
    detail: "Designed, built, and operate an LLM-powered planning product end-to-end — orchestration layer, guardrails, observability, and cost control.",
    year: 2026,
  },
];

export const education = {
  degree: "BSc Computer Science",
  institution: "Keele University, Stoke-on-Trent",
  year: 2021,
};
