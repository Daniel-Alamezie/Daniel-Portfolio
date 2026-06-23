import {
  siJavascript,
  siExpress,
  siRedis,
  siTailwindcss,
  siGithubactions,
  siGraphql,
  siPython,
} from "simple-icons";
import type { TechKey } from "@/content/types";

export interface TechMeta {
  /** Human-readable label shown in tooltips / lists. */
  label: string;
  /** Full-colour brand SVG served from /public/icons (preferred). */
  src?: string;
  /** Monochrome simple-icons path, used when there's no brand SVG. */
  path?: string;
  /** Short text mark when neither a brand SVG nor a simple-icon exists. */
  glyph?: string;
}

const icon = (file: string) => `/icons/${file}.svg`;

/**
 * Single source of truth for tech badges.
 *
 * Most stacks use a full-colour brand SVG in /public/icons (provided by the
 * owner). The handful without one fall back to a monochrome simple-icons glyph,
 * and Semantic Kernel / SQL render as text-marks. To upgrade a fallback, drop a
 * `<name>.svg` into /public/icons and set `src: icon("<name>")` here.
 */
export const TECH: Record<TechKey, TechMeta> = {
  nextjs: { label: "Next.js", src: icon("nextjs") },
  react: { label: "React", src: icon("react") },
  typescript: { label: "TypeScript", src: icon("typescript") },
  nodejs: { label: "Node.js", src: icon("nodejs") },
  dotnet: { label: ".NET", src: icon("dotnet") },
  csharp: { label: "C#", src: icon("csharp") },
  swift: { label: "Swift", src: icon("swift") },
  postgresql: { label: "PostgreSQL", src: icon("postgresql") },
  mongodb: { label: "MongoDB", src: icon("mongodb") },
  supabase: { label: "Supabase", src: icon("supabase") },
  stripe: { label: "Stripe", src: icon("stripe") },
  docker: { label: "Docker", src: icon("docker") },
  kubernetes: { label: "Kubernetes", src: icon("kubernetes") },
  azure: { label: "Azure", src: icon("azure") },
  aws: { label: "AWS", src: icon("aws") },
  openai: { label: "OpenAI", src: icon("openai") },
  anthropic: { label: "Anthropic", src: icon("anthropic") },

  // Fallbacks (no brand SVG provided yet) — monochrome simple-icons.
  javascript: { label: "JavaScript", path: siJavascript.path },
  express: { label: "Express", path: siExpress.path },
  redis: { label: "Redis", path: siRedis.path },
  tailwind: { label: "Tailwind CSS", path: siTailwindcss.path },
  githubactions: { label: "GitHub Actions", path: siGithubactions.path },
  graphql: { label: "GraphQL", path: siGraphql.path },
  python: { label: "Python", path: siPython.path },

  // No icon at all — text-marks.
  sql: { label: "SQL", glyph: "SQL" },
  semantickernel: { label: "Semantic Kernel", glyph: "SK" },
  socketio: { label: "Socket.io", glyph: "IO" },
};
