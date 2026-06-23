/** Shared content types. All site content is plain data — no secrets, safe to open-source. */

export type TechKey =
  | "nextjs"
  | "react"
  | "typescript"
  | "javascript"
  | "nodejs"
  | "express"
  | "dotnet"
  | "csharp"
  | "swift"
  | "python"
  | "sql"
  | "postgresql"
  | "mongodb"
  | "supabase"
  | "redis"
  | "stripe"
  | "tailwind"
  | "docker"
  | "kubernetes"
  | "aws"
  | "azure"
  | "githubactions"
  | "graphql"
  | "openai"
  | "anthropic"
  | "semantickernel"
  | "socketio";

export interface Social {
  label: string;
  href: string;
  /** Shown in the terminal `contact` output. */
  handle: string;
}

export interface Profile {
  name: string;
  /** Shell username shown in the prompt, e.g. daniel@portfolio. */
  user: string;
  host: string;
  role: string;
  tagline: string;
  location: string;
  /** Short bio shown by `whoami` / `about`. Each string is a paragraph. */
  bio: string[];
  socials: Social[];
  /** Base64-encoded email, decoded in the browser only (anti-scraper). */
  emailEncoded: string;
  /** Path (relative to /public) of the downloadable CV, or null to hide. */
  cvPath: string | null;
}

export interface Project {
  slug: string;
  name: string;
  year: number;
  /** One-line summary shown in listings. */
  tagline: string;
  /** Full description paragraphs shown in the project view. */
  description: string[];
  status: "live" | "open-source" | "archived" | "in-progress";
  /** Live application URL, or null. */
  link: string | null;
  /** Source repository URL, or null if private. */
  repo: string | null;
  /** Extra named links (e.g. a getting-started guide, docs, demo). */
  links?: { label: string; href: string }[];
  tech: TechKey[];
  /** Bullet highlights — the "what I actually did". */
  highlights: string[];
  /** Optional headline metric, e.g. "~60 users · ~100 AI calls/week". */
  metric?: string;
  /** Mark the standout project. */
  featured?: boolean;
}

export interface Role {
  slug: string;
  company: string;
  title: string;
  period: string;
  location: string;
  /** Bullet points describing the work. */
  bullets: string[];
  tech?: TechKey[];
}

export interface Achievement {
  title: string;
  detail: string;
  year?: number;
}

export interface SkillGroup {
  label: string;
  items: string[];
}
