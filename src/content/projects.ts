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
    slug: "keymania",
    name: "KeyMania",
    year: 2026,
    tagline: "Real-time 1v1 typing duel — finish a word, forge a blade, throw it at your opponent.",
    status: "open-source",
    link: null,
    repo: "https://github.com/Daniel-Alamezie/keymania-web",
    tech: ["nextjs", "react", "typescript", "aws", "lambda", "dynamodb", "serverless", "githubactions"],
    description: [
      "A browser typing game where speed is a weapon: every word you commit forges a blade, sized by how fast you chained it, and a typo shatters the streak. Play a bot solo, or duel a friend through a shared room code.",
      "The game client is open source; the multiplayer backend is a separate private service running fully serverless on AWS — API Gateway WebSockets, a Lambda per route, and DynamoDB for match state, deployed by GitHub Actions with keyless OIDC rather than stored credentials.",
    ],
    highlights: [
      "Server-authoritative multiplayer: a client only claims which word it finished and how long it took. The server validates that against the shared script, clamps implausible timings, and owns both health bars — so a tampered client gains nothing.",
      "Client prediction with server reconciliation: the blade launches locally on keypress for instant feel, while health only ever moves when the server says so.",
      "Realtime over API Gateway WebSockets with per-route Lambdas and DynamoDB match state, including a sparse index that delists a room the instant it fills — no cleanup job.",
      "Defence in depth for an anonymous service: gateway throttling plus per-connection rate limiting, TTL-based data expiry, and bounded log retention to cap cost.",
      "Audited the words-per-minute and accuracy maths against standard typing definitions, fixing a word-length-dependent bias that would have skewed any leaderboard.",
      "Every asset generated from code — pixel sprites from a Python generator, sound effects synthesised with the Web Audio API.",
    ],
  },
  {
    slug: "kube-sandbox",
    name: "Kube Sandbox",
    year: 2026,
    tagline: "Visual systems-design playground — sketch cloud architectures on a drag-and-drop canvas.",
    status: "open-source",
    link: null,
    repo: "https://github.com/Daniel-Alamezie/Kube-Sandbox",
    tech: ["react", "typescript", "vite"],
    description: [
      "A browser tool for whiteboarding high-level designs: drag cloud and service components onto an infinite canvas, connect them with labelled arrows, and frame regions with resizable boundary boxes.",
      "Built to make architecture reasoning visual — designs auto-save locally and round-trip as JSON, so a system sketch can be shared, reviewed, and iterated like any other artefact. Runs entirely client-side.",
    ],
    highlights: [
      "Node-and-edge canvas on React Flow with custom renderers: inline renaming, one- or two-way labelled connections, and grouping boxes.",
      "50+ components across ten categories — compute, storage, messaging, identity, edge, security, observability, delivery.",
      "Designs persist to the browser and import/export as JSON for sharing and review.",
      "Refactored from a single monolithic component into concern-separated modules — catalogue data, persistence, node/edge renderers, and UI.",
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
