"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  getNode,
  resolvePath,
  formatPath,
  readmeOf,
  root,
  type FsNode,
} from "@/lib/filesystem";
import { profile } from "@/content/profile";
import {
  AboutView,
  AchievementsView,
  ContactView,
  ProjectView,
  RoleView,
  SkillsView,
} from "./views";
import type { Project, Role } from "@/content/types";

interface Block {
  id: number;
  /** The echoed prompt line + command, omitted for system output (e.g. boot). */
  prompt?: { path: string; command: string };
  body: ReactNode;
}

/** A command either renders output, optionally moves the cwd, or clears. */
interface ExecResult {
  body: ReactNode;
  newCwd?: string[];
  clear?: boolean;
}

/** Click handler injected into listings — builds a command from (verb, name). */
type RunFn = (command: string) => void;

const BANNER = String.raw`
 ██████   █████  ███    ██ ██ ███████ ██
 ██   ██ ██   ██ ████   ██ ██ ██      ██
 ██   ██ ███████ ██ ██  ██ ██ █████   ██
 ██   ██ ██   ██ ██  ██ ██ ██ ██      ██
 ██████  ██   ██ ██   ████ ██ ███████ ███████`;

const COMMANDS: { name: string; args?: string; desc: string }[] = [
  { name: "help", desc: "show this help" },
  { name: "ls", args: "[path]", desc: "list directory contents" },
  { name: "cd", args: "[path]", desc: "change directory (.. and ~ work)" },
  { name: "cat", args: "<file>", desc: "view a file" },
  { name: "open", args: "<file|url>", desc: "open a link or file" },
  { name: "tree", desc: "print the whole directory tree" },
  { name: "pwd", desc: "print working directory" },
  { name: "whoami", desc: "about me" },
  { name: "skills", desc: "tech & ways of working" },
  { name: "projects", desc: "jump to ~/projects" },
  { name: "experience", desc: "jump to ~/experience" },
  { name: "achievements", desc: "selected wins" },
  { name: "contact", desc: "how to reach me" },
  { name: "clear", desc: "clear the screen" },
];

// ---------------------------------------------------------------------------
// Pure presentational helpers (no component state) live at module scope so the
// command interpreter below stays simple and lint-clean.
// ---------------------------------------------------------------------------

function Prompt({ path }: { path: string }) {
  return (
    <span className="whitespace-nowrap">
      <span className="text-green">
        {profile.user}@{profile.host}
      </span>
      <span className="text-faint">:</span>
      <span className="text-magenta">{path}</span>
      <span className="text-faint">$ </span>
    </span>
  );
}

/** Clickable directory listing — the bridge between typed and point-and-click. */
function ListView({
  node,
  basePath,
  onRun,
}: {
  node: FsNode;
  /** Absolute segments of the directory this listing represents. */
  basePath: string[];
  onRun: RunFn;
}) {
  const children = node.children ?? [];
  return (
    <div className="my-1 grid gap-x-6 gap-y-0.5 sm:grid-cols-[auto_1fr]">
      {children.map((c) => {
        const isDir = c.type === "dir";
        const verb = isDir ? "cd" : c.kind === "link" ? "open" : "cat";
        // Absolute path so the click resolves correctly regardless of the
        // current working directory (clicks in older listings stay valid).
        const childPath = `~/${[...basePath, c.name].join("/")}`;
        return (
          <button
            key={c.name}
            onClick={() => onRun(`${verb} ${childPath}`)}
            className="contents text-left"
          >
            <span className="contents">
              <span
                className={`${
                  isDir ? "text-cyan" : "text-fg"
                } hover:underline underline-offset-2`}
              >
                {isDir ? `${c.name}/` : c.name}
              </span>
              <span className="text-faint hidden sm:inline">{c.desc ?? ""}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TextLines({ lines, tone }: { lines: string[]; tone?: string }) {
  return (
    <div className={`my-1 ${tone ?? "text-fg/90"}`}>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}

function WelcomeBanner() {
  return (
    <div className="mb-2">
      <pre className="text-green text-[10px] leading-[1.1] sm:text-[12px] overflow-x-auto scroll-thin">
        {BANNER}
      </pre>
      <div className="mt-2 text-dim">
        {profile.name} — <span className="text-fg">{profile.role}</span>
      </div>
      <div className="text-faint">{profile.tagline}</div>
      <div className="mt-2 text-fg/90">
        Type <span className="text-green">help</span> to get started, or{" "}
        <span className="text-green">ls</span> to look around. You can click
        folders too.
      </div>
      <div className="mt-2 text-faint">
        Not a terminal person? Switch to the{" "}
        <span className="text-cyan">Portfolio</span> view (top-right ↗) for a
        classic layout.
      </div>
    </div>
  );
}

function renderFile(node: FsNode): ReactNode {
  switch (node.kind) {
    case "about":
      return <AboutView />;
    case "skills":
      return <SkillsView />;
    case "achievements":
      return <AchievementsView />;
    case "contact":
      return <ContactView />;
    case "project":
      return <ProjectView project={node.payload as Project} />;
    case "role":
      return <RoleView role={node.payload as Role} />;
    case "link":
      return (
        <a
          href={node.payload as string}
          target="_blank"
          rel="noopener noreferrer"
          className="tlink"
        >
          {node.payload as string}
        </a>
      );
    default:
      return <span className="text-dim">{node.name}</span>;
  }
}

function treeLines(node: FsNode, prefix = "", isLast = true, isRoot = true): string[] {
  const out: string[] = [];
  if (!isRoot) {
    out.push(`${prefix}${isLast ? "└── " : "├── "}${node.name}${node.type === "dir" ? "/" : ""}`);
  } else {
    out.push("~");
  }
  const kids = node.children ?? [];
  const childPrefix = isRoot ? "" : prefix + (isLast ? "    " : "│   ");
  kids.forEach((k, i) => {
    out.push(...treeLines(k, childPrefix, i === kids.length - 1, false));
  });
  return out;
}

const errLine = (msg: string) => <TextLines lines={[msg]} tone="text-red" />;

/** Enter a directory: show its README (for a leaf project/role) or its listing. */
function enterDir(target: string[], run: RunFn): ExecResult {
  const node = getNode(target);
  if (!node) return { body: errLine("cd: no such file or directory") };
  const readme = readmeOf(node);
  if (readme) return { body: renderFile(readme), newCwd: target };
  return {
    body: <ListView node={node} basePath={target} onRun={run} />,
    newCwd: target,
  };
}

/** The command interpreter. Pure given (raw, here, run); never touches state. */
function exec(raw: string, here: string[], run: RunFn): ExecResult {
  const trimmed = raw.trim();
  if (!trimmed) return { body: null };
  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");

  switch (cmd) {
    case "help":
      return {
        body: (
          <div className="my-1">
            <div className="text-dim mb-1">available commands:</div>
            <div className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[auto_1fr]">
              {COMMANDS.map((c) => (
                <span key={c.name} className="contents">
                  <span className="text-green">
                    {c.name}
                    {c.args ? <span className="text-faint"> {c.args}</span> : ""}
                  </span>
                  <span className="text-dim">{c.desc}</span>
                </span>
              ))}
            </div>
            <div className="text-faint mt-2 text-[13px]">
              tip: you can also click any folder or file. Tab completes paths,
              ↑/↓ recalls history.
            </div>
          </div>
        ),
      };

    case "pwd":
      return { body: <TextLines lines={[formatPath(here)]} /> };

    case "clear":
      return { body: null, clear: true };

    case "banner":
      return { body: <WelcomeBanner /> };

    case "echo":
      return { body: <TextLines lines={[arg]} /> };

    case "date":
      return { body: <TextLines lines={[new Date().toString()]} tone="text-dim" /> };

    case "sudo":
      return {
        body: (
          <TextLines
            tone="text-yellow"
            lines={[`${profile.user} is not in the sudoers file. This incident will be reported. 🙂`]}
          />
        ),
      };

    case "whoami":
    case "about": {
      const n = getNode(["about.txt"]);
      return { body: n ? renderFile(n) : null };
    }
    case "skills": {
      const n = getNode(["skills.txt"]);
      return { body: n ? renderFile(n) : null };
    }
    case "achievements": {
      const n = getNode(["achievements.txt"]);
      return { body: n ? renderFile(n) : null };
    }
    case "contact": {
      const n = getNode(["contact.txt"]);
      return { body: n ? renderFile(n) : null };
    }
    case "projects":
      return enterDir(["projects"], run);
    case "experience":
      return enterDir(["experience"], run);

    case "tree":
      return { body: <TextLines lines={treeLines(root)} tone="text-cyan" /> };

    case "ls": {
      const target = arg ? resolvePath(here, arg) : here;
      if (!target) return { body: errLine(`ls: cannot access '${arg}'`) };
      const n = getNode(target);
      if (!n) return { body: errLine(`ls: no such file or directory: ${arg}`) };
      if (n.type === "file") return { body: <TextLines lines={[n.name]} /> };
      return { body: <ListView node={n} basePath={target} onRun={run} /> };
    }

    case "cd": {
      const target = arg ? resolvePath(here, arg) : [];
      if (!target) return { body: errLine(`cd: no such file or directory: ${arg}`) };
      const n = getNode(target);
      if (!n) return { body: errLine(`cd: no such file or directory: ${arg}`) };
      if (n.type === "file") return { body: errLine(`cd: not a directory: ${arg}`) };
      return enterDir(target, run);
    }

    case "cat":
    case "open": {
      if (!arg) return { body: errLine(`${cmd}: missing operand`) };
      if (cmd === "open" && /^https?:\/\//.test(arg)) {
        if (typeof window !== "undefined") window.open(arg, "_blank", "noopener");
        return { body: <TextLines lines={[`opening ${arg} …`]} tone="text-dim" /> };
      }
      const target = resolvePath(here, arg);
      if (!target) return { body: errLine(`${cmd}: no such file or directory: ${arg}`) };
      const n = getNode(target);
      if (!n) return { body: errLine(`${cmd}: no such file or directory: ${arg}`) };
      if (n.type === "dir") {
        const readme = readmeOf(n);
        return readme
          ? { body: renderFile(readme) }
          : { body: <ListView node={n} basePath={target} onRun={run} /> };
      }
      if (n.kind === "link" && cmd === "open") {
        if (typeof window !== "undefined")
          window.open(n.payload as string, "_blank", "noopener");
        return { body: <TextLines lines={[`opening ${n.payload} …`]} tone="text-dim" /> };
      }
      return { body: renderFile(n) };
    }

    default:
      return { body: errLine(`command not found: ${cmd} — type 'help' for the list`) };
  }
}

// ---------------------------------------------------------------------------
// The interactive shell component.
// ---------------------------------------------------------------------------

export default function Terminal() {
  const [cwd, setCwd] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<Block[]>(() => [
    { id: 0, body: <WelcomeBanner /> },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);

  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Run a command, echoing the prompt line, and apply any cwd change. */
  function runCommand(raw: string, echo = true) {
    // `here` is the cwd for *typed* relative paths. Clicks issue absolute
    // paths (see ListView), so they resolve correctly regardless of `here`.
    const here = cwd;
    const run: RunFn = (command) => runCommand(command);
    const result = exec(raw, here, run);

    if (result.clear) {
      setBlocks([]);
      return;
    }
    setBlocks((b) => [
      ...b,
      {
        id: idRef.current++,
        body: result.body,
        prompt: echo ? { path: formatPath(here), command: raw } : undefined,
      },
    ]);
    if (result.newCwd) setCwd(result.newCwd);
  }

  // Deep-link handling: #projects/nifl opens that item on first load.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      runCommand(`open ${hash}`); // act on the URL once on mount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the view pinned to the newest output.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight });
  }, [blocks]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const value = input;
      if (value.trim()) setHistory((h) => [...h, value]);
      setHistIdx(null);
      setInput("");
      runCommand(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const node = getNode(cwd);
      const names = (node?.children ?? []).map((c) => c.name);
      const parts = input.split(/\s+/);
      const last = parts[parts.length - 1];
      const match = names.find((c) => last.length > 0 && c.startsWith(last));
      if (match) {
        parts[parts.length - 1] = match;
        setInput(parts.join(" "));
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setBlocks([]);
    }
  }

  return (
    <div className="flex h-full flex-col" onClick={() => inputRef.current?.focus()}>
      <div ref={scrollRef} className="scroll-thin flex-1 overflow-y-auto px-4 py-3 sm:px-6">
        {blocks.map((b) => (
          <div key={b.id} className="mb-1">
            {b.prompt && (
              <div className="flex gap-2">
                <Prompt path={b.prompt.path} />
                <span className="text-fg break-all">{b.prompt.command}</span>
              </div>
            )}
            {b.body}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex gap-2">
          <Prompt path={formatPath(cwd)} />
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="terminal input"
              className="w-full bg-transparent text-fg caret-transparent outline-none"
            />
            <span
              className="pointer-events-none absolute top-0 cursor"
              style={{ left: `${input.length}ch` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
