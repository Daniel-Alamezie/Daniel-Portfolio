"use client";

import type { Project, Role } from "@/content/types";
import { profile } from "@/content/profile";
import { skills, achievements, education } from "@/content/skills";
import { TechRow } from "./TechBadge";
import { useEmail } from "./useEmail";

const STATUS_LABEL: Record<Project["status"], { text: string; cls: string }> = {
  live: { text: "● live", cls: "text-green" },
  "open-source": { text: "● open-source", cls: "text-cyan" },
  "in-progress": { text: "● in progress", cls: "text-yellow" },
  archived: { text: "○ archived", cls: "text-faint" },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 mb-1 text-[12px] uppercase tracking-wider text-faint">
      {children}
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded border border-border bg-elev px-3 py-1 text-[13px] text-cyan hover:border-cyan/60"
    >
      <span aria-hidden="true">↗</span>
      {label}
    </a>
  );
}

export function ProjectView({ project: p }: { project: Project }) {
  const status = STATUS_LABEL[p.status];
  return (
    <div className="my-1 border-l-2 border-border pl-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-fg text-[16px] font-semibold">{p.name}</h2>
        <span className="text-faint text-[13px]">{p.year}</span>
        <span className={`text-[12px] ${status.cls}`}>{status.text}</span>
      </div>
      <p className="text-dim mt-0.5">{p.tagline}</p>
      {p.metric && <p className="text-yellow text-[13px] mt-1">{p.metric}</p>}

      <SectionTitle>stack</SectionTitle>
      <TechRow tech={p.tech} />

      <SectionTitle>overview</SectionTitle>
      {p.description.map((para, i) => (
        <p key={i} className="text-fg/90 mb-2 max-w-[68ch]">
          {para}
        </p>
      ))}

      <SectionTitle>highlights</SectionTitle>
      <ul className="space-y-1.5 max-w-[72ch]">
        {p.highlights.map((h, i) => (
          <li key={i} className="flex gap-2 text-fg/90">
            <span className="text-green select-none">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {(p.link || p.repo || p.links?.length) && (
        <>
          <SectionTitle>links</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {p.link && (
              <ExternalLink href={p.link} label={p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")} />
            )}
            {p.repo && <ExternalLink href={p.repo} label="source" />}
            {p.links?.map((l) => (
              <ExternalLink key={l.href} href={l.href} label={l.label} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function RoleView({ role: r }: { role: Role }) {
  return (
    <div className="my-1 border-l-2 border-border pl-4">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h2 className="text-fg text-[16px] font-semibold">{r.company}</h2>
        <span className="text-cyan text-[13px]">{r.title}</span>
      </div>
      <p className="text-faint text-[13px] mt-0.5">
        {r.period} · {r.location}
      </p>
      <ul className="space-y-1.5 mt-2 max-w-[78ch]">
        {r.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-fg/90">
            <span className="text-green select-none">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {r.tech && r.tech.length > 0 && (
        <>
          <SectionTitle>stack</SectionTitle>
          <TechRow tech={r.tech} />
        </>
      )}
    </div>
  );
}

export function AboutView() {
  return (
    <div className="my-1 max-w-[72ch]">
      <p className="text-fg text-[15px]">
        {profile.name} <span className="text-faint">/</span>{" "}
        <span className="text-green">{profile.role}</span>
      </p>
      <p className="text-dim mb-3">{profile.location}</p>
      {profile.bio.map((para, i) => (
        <p key={i} className="text-fg/90 mb-2">
          {para}
        </p>
      ))}
      <SectionTitle>education</SectionTitle>
      <p className="text-fg/90">
        {education.degree} — {education.institution} ({education.year})
      </p>
    </div>
  );
}

export function SkillsView() {
  return (
    <div className="my-1 space-y-3">
      {skills.map((group) => (
        <div key={group.label}>
          <div className="text-cyan text-[13px] mb-1">{group.label}</div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 max-w-[80ch]">
            {group.items.map((item) => (
              <span key={item} className="text-fg/90">
                <span className="text-faint select-none">·</span> {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AchievementsView() {
  return (
    <div className="my-1 space-y-2.5 max-w-[76ch]">
      {achievements.map((a, i) => (
        <div key={i}>
          <div className="flex gap-2">
            <span className="text-yellow select-none">★</span>
            <span className="text-fg font-medium">
              {a.title}
              {a.year && <span className="text-faint font-normal"> · {a.year}</span>}
            </span>
          </div>
          <p className="text-dim pl-6">{a.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function ContactView() {
  // Email is decoded in the browser only (see useEmail) so the plain address is
  // never present in the static HTML or JS bundle (basic anti-scraper hygiene).
  const email = useEmail();

  return (
    <div className="my-1 space-y-1.5">
      {profile.socials.map((s) => (
        <div key={s.label} className="flex gap-2">
          <span className="text-faint w-20 inline-block">{s.label}</span>
          <a href={s.href} target="_blank" rel="noopener noreferrer" className="tlink">
            {s.handle}
          </a>
        </div>
      ))}
      <div className="flex gap-2">
        <span className="text-faint w-20 inline-block">Email</span>
        {email ? (
          <a href={`mailto:${email}`} className="tlink">
            {email}
          </a>
        ) : (
          <span className="text-faint">[click to reveal]</span>
        )}
      </div>
      {profile.cvPath && (
        <div className="flex gap-2">
          <span className="text-faint w-20 inline-block">CV</span>
          <a href={profile.cvPath} download className="tlink">
            download résumé (pdf)
          </a>
        </div>
      )}
    </div>
  );
}
