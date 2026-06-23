import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import type { Project, Role } from "@/content/types";

/** What the terminal should render when a file is opened with `cat`. */
export type ViewKind =
  | "about"
  | "skills"
  | "achievements"
  | "contact"
  | "project"
  | "role"
  | "link";

export interface FsNode {
  name: string;
  type: "dir" | "file";
  kind?: ViewKind;
  /** Typed payload for rich views (a Project, a Role, or a URL string). */
  payload?: Project | Role | string;
  children?: FsNode[];
  /** Short description shown next to the entry in long listings. */
  desc?: string;
}

function projectDir(p: Project): FsNode {
  const children: FsNode[] = [
    { name: "README.md", type: "file", kind: "project", payload: p, desc: p.tagline },
  ];
  if (p.link) {
    children.push({ name: "live-url", type: "file", kind: "link", payload: p.link, desc: p.link });
  }
  if (p.repo) {
    children.push({ name: "repo-url", type: "file", kind: "link", payload: p.repo, desc: p.repo });
  }
  return { name: p.slug, type: "dir", desc: `${p.name} (${p.year})`, children };
}

function roleDir(r: Role): FsNode {
  return {
    name: r.slug,
    type: "dir",
    desc: `${r.company} · ${r.title}`,
    children: [
      { name: "README.md", type: "file", kind: "role", payload: r, desc: r.period },
    ],
  };
}

/** The whole site as a tree rooted at ~ (home). Built once at module load. */
export const root: FsNode = {
  name: "~",
  type: "dir",
  children: [
    { name: "about.txt", type: "file", kind: "about", desc: "who I am" },
    { name: "skills.txt", type: "file", kind: "skills", desc: "tech & ways of working" },
    { name: "achievements.txt", type: "file", kind: "achievements", desc: "selected wins" },
    { name: "contact.txt", type: "file", kind: "contact", desc: "how to reach me" },
    {
      name: "projects",
      type: "dir",
      desc: "things I've built",
      children: projects.map(projectDir),
    },
    {
      name: "experience",
      type: "dir",
      desc: "where I've worked",
      children: experience.map(roleDir),
    },
  ],
};

/** Resolve a path (relative to cwd, or absolute from ~) into segment array. */
export function resolvePath(cwd: string[], input: string): string[] | null {
  const raw = input.trim();
  let segs: string[];
  if (raw === "" ) {
    return [...cwd];
  }
  if (raw === "~" || raw === "/") {
    return [];
  }
  if (raw.startsWith("~/")) {
    segs = raw.slice(2).split("/");
  } else if (raw.startsWith("/")) {
    segs = raw.slice(1).split("/");
  } else {
    segs = [...cwd, ...raw.split("/")];
  }

  const out: string[] = [];
  for (const s of segs) {
    if (s === "" || s === ".") continue;
    if (s === "..") {
      if (out.length === 0) return null; // can't go above home
      out.pop();
      continue;
    }
    out.push(s);
  }
  return out;
}

/** Walk segments from root and return the node, or null if not found. */
export function getNode(segs: string[]): FsNode | null {
  let node: FsNode = root;
  for (const seg of segs) {
    if (node.type !== "dir" || !node.children) return null;
    const next = node.children.find((c) => c.name === seg);
    if (!next) return null;
    node = next;
  }
  return node;
}

/** Format cwd segments as a prompt path (~, ~/projects, ~/projects/nifl). */
export function formatPath(segs: string[]): string {
  return segs.length === 0 ? "~" : `~/${segs.join("/")}`;
}

/** Find a child README.md, used to auto-preview when entering a project dir. */
export function readmeOf(node: FsNode): FsNode | null {
  if (node.type !== "dir" || !node.children) return null;
  return node.children.find((c) => c.name === "README.md") ?? null;
}

/** Flat list of every project/experience path for tab-completion & `tree`. */
export function allLeafPaths(): string[] {
  const paths: string[] = [];
  const walk = (node: FsNode, trail: string[]) => {
    for (const child of node.children ?? []) {
      const next = [...trail, child.name];
      paths.push(next.join("/"));
      if (child.type === "dir") walk(child, next);
    }
  };
  walk(root, []);
  return paths;
}
