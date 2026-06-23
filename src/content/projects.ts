import type { Project } from "./types";

/**
 * Projects shown as folders under ~/projects.
 * Order here = order shown. `featured` controls the highlighted card.
 */
export const projects: Project[] = [
  {
    slug: "nifl",
    name: "NIFL",
    year: 2026,
    tagline: "AI-augmented planning tool that turns saved places into real plans.",
    status: "live",
    link: "https://nifl.app",
    repo: null,
    featured: true,
    metric: "Launched May 2026 · ~60 users · ~100 AI calls/week",
    tech: ["nextjs", "typescript", "nodejs", "postgresql", "openai", "anthropic", "docker"],
    description: [
      "NIFL turns the places people save into plans they actually follow through on. It's a personal product I built and run solo, free to use, with a real (small but growing) user base.",
      "The interesting engineering is the orchestration layer: pretrained LLMs are given a constrained set of backend tools to call, kept inside product-defined bounds by prompt-based guardrails, with structured outputs for predictable, auditable behaviour.",
    ],
    highlights: [
      "Built an orchestration API layer that lets pretrained LLMs (OpenAI GPT-4o-mini, Anthropic Claude) invoke a constrained set of backend tools under prompt-based guardrails.",
      "Designed the conversational AI loop around tool use / function calling with structured-output JSON schemas for predictable, auditable responses.",
      "Added trace/observability logging, retries with cross-model fallbacks, and deliberate inference cost control (chose GPT-4o-mini after weighing latency, cost, and instruction-following).",
      "Introduced spec-driven development with AI-coding guardrails — a structured spec and convention layer that LLMs follow when generating code, keeping the codebase consistent as features ship.",
    ],
  },
  {
    slug: "portfolio",
    name: "This Portfolio",
    year: 2026,
    tagline: "The terminal-style site you're looking at — a hybrid shell + visual view.",
    status: "open-source",
    link: "https://daniel-portfolio-black.vercel.app/",
    repo: "https://github.com/Daniel-Alamezie/Daniel-Portfolio",
    tech: ["nextjs", "react", "typescript", "tailwind"],
    description: [
      "The site you're on right now. A terminal-style portfolio with a real command shell (ls/cd/cat plus clickable folders) and a toggleable visual layout, so it works for engineers and recruiters alike.",
      "Built as a fully static Next.js export — no backend, no database, no secrets — which keeps it safe to open-source. Content lives as plain data; security headers, email obfuscation, and CI are baked in.",
    ],
    highlights: [
      "Designed a hybrid interface: a typed terminal and a visual Portfolio view that share a single content source.",
      "Static export with a hardened CSP, obfuscated contact email, Dependabot, and GitHub Actions CI — open-source-safe by construction.",
      "Polished UX: eased scrolling, scroll-reveal section animations, and an animated starfield backdrop.",
    ],
  },
  {
    slug: "agentic-orchestration",
    name: "Agentic Orchestration",
    year: 2025,
    tagline: "Runnable .NET 10 reference of all five Microsoft AI agent orchestration patterns.",
    status: "open-source",
    link: null,
    repo: "https://github.com/Daniel-Alamezie/Agentic-Orchestration",
    tech: ["csharp", "dotnet", "semantickernel", "docker"],
    description: [
      "A runnable reference implementation of all five Microsoft AI Agent Orchestration Patterns — Sequential, Concurrent, Group Chat, Handoff, and Magentic — plus a recommended Hybrid pattern, built on Semantic Kernel.",
      "Runs entirely locally on Llama 3.2 via Ollama: no cloud account, no API key, no cost. It's the open-source distillation of the orchestration-patterns spike I ran on Sainsbury's Agentic team.",
    ],
    highlights: [
      "Implemented all five orchestration patterns end-to-end in C# / .NET 10 with Semantic Kernel.",
      "Added a classifier-routed Hybrid pattern (parallel specialist agents with consolidated results) — the one I recommended in the production spike.",
      "Fully local and free to run: Llama 3.2 via Ollama, containerised with Docker, no cloud dependencies.",
    ],
  },
  {
    slug: "scrum-poker",
    name: "Scrum Poker",
    year: 2025,
    tagline: "Real-time planning poker for sprint refinement — no database, no sign-up.",
    status: "open-source",
    link: "https://scrum-poker-cg40.onrender.com/",
    repo: "https://github.com/Daniel-Alamezie/scrum-poker",
    tech: ["nextjs", "typescript", "nodejs", "socketio", "tailwind", "docker"],
    description: [
      "A planning-poker tool for sprint refinement: create a session, share a link or 6-character code, and estimate together while votes stay hidden until the host reveals them.",
      "Deliberately stateless — all session state lives in server memory and disappears once everyone leaves. No database, no accounts.",
    ],
    highlights: [
      "Built real-time multiplayer with Socket.io over a custom Node server, with live vote and presence updates.",
      "Two estimation modes — Fibonacci story points and spike-in-days — switchable by the host mid-session.",
      "On reveal, surfaces the agreed estimate or prompts a discussion when there's no clear winner.",
      "Zero-persistence by design: in-memory session state, no sign-up; covered by Vitest tests.",
    ],
  },
  {
    slug: "tickety",
    name: "Tickety",
    year: 2024,
    tagline: "Open-source SDK that drops a support-ticketing system into any SaaS in minutes.",
    status: "open-source",
    link: "https://tickety.dev",
    repo: "https://github.com/Daniel-Alamezie/tickety-sdk",
    links: [
      {
        label: "Get started",
        href: "https://github.com/Daniel-Alamezie/Get-started-with-tickety",
      },
    ],
    tech: ["typescript", "supabase", "docker"],
    description: [
      "Tickety is an open-source SDK that streamlines customer-support integration for SaaS platforms. Backed by Supabase, it gives developers an easy API for ticket management and real-time dashboard messaging — without building the support stack themselves.",
      "Designed for drop-in adoption: a small, documented API surface and a starter template so a working ticketing flow is running in minutes.",
    ],
    highlights: [
      "Packaged ticket management and real-time dashboard messaging as a reusable TypeScript SDK on Supabase.",
      "Shipped a Vite starter template (Get-started-with-tickety) so teams can integrate quickly.",
      "Focused on minimal setup time and a clean, documented public API.",
    ],
  },
  {
    slug: "exoplate",
    name: "Exoplate",
    year: 2023,
    tagline: "Online marketplace for art posters with Stripe checkout, auth, and image storage.",
    status: "live",
    link: "https://exoplate.com",
    repo: null,
    tech: ["nextjs", "typescript", "tailwind", "stripe", "docker"],
    description: [
      "Exoplate is a full marketplace for art posters: browse, authenticate, check out with Stripe, with image storage handling the catalogue.",
      "End-to-end build covering storefront UX, payments, authentication, and media handling.",
    ],
    highlights: [
      "Built the storefront and checkout flow with Next.js, TypeScript, and Tailwind.",
      "Integrated Stripe checkout, user authentication, and image storage for the poster catalogue.",
    ],
  },
];
