"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { skills, achievements, education } from "@/content/skills";
import type { Project } from "@/content/types";
import { TechRow, TechGlyph } from "./TechBadge";
import { skillIcon } from "@/lib/tech";
import { useEmail } from "./useEmail";
import { useSmoothScroll } from "./useSmoothScroll";

const STATUS: Record<Project["status"], { text: string; cls: string }> = {
  live: { text: "live", cls: "text-green border-green/40" },
  "open-source": { text: "open source", cls: "text-cyan border-cyan/40" },
  "in-progress": { text: "in progress", cls: "text-yellow border-yellow/40" },
  archived: { text: "archived", cls: "text-faint border-border" },
};

// Map a social label to its brand SVG in /public/icons (e.g. "GitHub" -> github.svg).
const SOCIAL_ICON: Record<string, string> = {
  GitHub: "/icons/github.svg",
  LinkedIn: "/icons/linkedin.svg",
};

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function SocialIcon({ label }: { label: string }) {
  if (!SOCIAL_ICON[label]) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static brand svg; next/image adds no value in a static export
    <img
      src={SOCIAL_ICON[label]}
      alt=""
      width={15}
      height={15}
      aria-hidden="true"
      className="h-[15px] w-[15px] object-contain"
    />
  );
}

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <h2 className="reveal mb-8 flex items-baseline gap-3 text-fg">
      <span className="text-green text-[13px]">{n}</span>
      <span className="text-[22px] font-semibold tracking-tight">{title}</span>
      <span className="h-px flex-1 bg-border" />
    </h2>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const status = STATUS[p.status];
  const primaryUrl = p.link ?? p.repo;
  return (
    <div className="reveal h-full" style={{ transitionDelay: `${Math.min(index, 4) * 70}ms` }}>
    <article
      className={`group flex h-full flex-col rounded-xl border bg-elev/40 p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-cyan/50 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] ${
        p.featured ? "border-green/30" : "border-border"
      }`}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        {primaryUrl ? (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title inline-flex items-center gap-1.5 text-fg text-[17px] font-semibold transition-colors hover:text-cyan"
          >
            <span className="underline-offset-4 group-hover/title:underline">{p.name}</span>
            <span
              aria-hidden="true"
              className="-translate-x-1 text-cyan opacity-0 transition-all group-hover/title:translate-x-0 group-hover/title:opacity-100"
            >
              ↗
            </span>
          </a>
        ) : (
          <h3 className="text-fg text-[17px] font-semibold">{p.name}</h3>
        )}
        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] ${status.cls}`}>
          {status.text}
        </span>
      </div>
      <div className="mb-3 text-[12px] text-faint">{p.year}</div>
      <p className="mb-4 leading-relaxed text-dim">{p.tagline}</p>
      {p.metric && <p className="mb-4 text-[12px] text-yellow">{p.metric}</p>}

      <ul className="mb-6 space-y-2.5">
        {p.highlights.slice(0, 3).map((h, i) => (
          <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-fg/85">
            <span className="select-none text-green">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-4">
        <TechRow tech={p.tech} />
        {(p.link || p.repo || p.links?.length) && (
          <div className="flex flex-wrap gap-2">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-1.5 rounded-md border border-cyan/50 bg-cyan/10 px-3.5 py-2 text-[13px] font-medium text-cyan transition-colors hover:border-cyan hover:bg-cyan/20"
              >
                Visit site
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-elev px-3.5 py-2 text-[13px] text-fg transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static brand svg in a static export */}
                <img src="/icons/github.svg" alt="" width={14} height={14} aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
                Source
              </a>
            )}
            {p.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-elev px-3.5 py-2 text-[13px] text-fg transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                {l.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
    </div>
  );
}

export default function UiPortfolio() {
  const email = useEmail();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reveal-on-scroll: fade each `.reveal` element in once as it scrolls into the
  // window's scroll container. Driven by a rAF-throttled scroll handler (not
  // IntersectionObserver) so it's deterministic and never leaves content hidden.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    root.setAttribute("data-js", "true");

    let pending = [...root.querySelectorAll<HTMLElement>(".reveal")];

    const reveal = () => {
      const limit = root.clientHeight * 0.92; // reveal once within ~92% of the viewport
      const rootTop = root.getBoundingClientRect().top;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top - rootTop < limit) {
          el.classList.add("is-visible");
          return false; // stop tracking it
        }
        return true;
      });
      if (pending.length === 0) {
        root.removeEventListener("scroll", reveal);
        window.removeEventListener("resize", reveal);
      }
    };

    reveal(); // reveal whatever is already on screen
    root.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    return () => {
      root.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, []);

  // Eased (inertial) wheel + nav-click scrolling (see useSmoothScroll).
  useSmoothScroll(scrollRef);

  return (
    <div
      ref={scrollRef}
      className="scroll-thin flex-1 overflow-y-auto scroll-pt-20 motion-safe:scroll-smooth"
    >
      {/* In-window section nav */}
      <nav className="sticky top-0 z-10 flex flex-wrap gap-x-7 gap-y-1 border-b border-border bg-panel/90 px-6 py-3.5 text-[13px] backdrop-blur sm:px-10">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="text-dim transition-colors hover:text-cyan">
            {n.label}
          </a>
        ))}
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Hero */}
        <header id="about" className="reveal scroll-mt-24">
          <p className="text-green text-[13px]">
            {profile.user}@{profile.host}
          </p>
          <div className="mt-2 text-[30px] font-bold leading-tight tracking-tight text-fg sm:text-[38px]">
            {profile.name}
          </div>
          <p className="mt-2 text-[17px] text-cyan">{profile.role}</p>
          <p className="mt-1 text-dim">{profile.tagline}</p>
          <p className="mt-2 text-[13px] text-faint">{profile.location}</p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-elev px-3.5 py-2 text-[13px] text-fg hover:border-cyan/60"
              >
                <SocialIcon label={s.label} />
                {s.label}
              </a>
            ))}
            {profile.cvPath && (
              <a
                href={profile.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-md border border-green/40 bg-green/10 px-3.5 py-2 text-[13px] text-green hover:bg-green/15"
              >
                ↓ Download CV
              </a>
            )}
          </div>

          <div className="mt-9 max-w-[68ch] space-y-4 text-[15px] leading-relaxed text-fg/90">
            {profile.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </header>

        {/* Projects */}
        <section id="projects" className="mt-24 scroll-mt-24">
          <SectionHeading n="01" title="Projects" />
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mt-24 scroll-mt-24">
          <SectionHeading n="02" title="Experience" />
          <div className="timeline relative max-w-4xl space-y-10 pl-6">
            {experience.map((r) => (
              <div key={r.slug} className="reveal relative">
                <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-green bg-panel" />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-fg text-[16px] font-semibold">{r.company}</h3>
                  <span className="text-cyan text-[13px]">{r.title}</span>
                </div>
                <p className="mt-0.5 text-[12px] text-faint">
                  {r.period} · {r.location}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {r.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-fg/85">
                      <span className="select-none text-green">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {r.tech && r.tech.length > 0 && (
                  <div className="mt-4">
                    <TechRow tech={r.tech} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-24 scroll-mt-24">
          <SectionHeading n="03" title="Skills" />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.label} className="reveal">
                <div className="mb-3 text-[13px] text-cyan">{g.label}</div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => {
                    const icon = skillIcon(item);
                    return (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-elev px-2.5 py-1 text-[12px] text-dim"
                      >
                        {icon && <TechGlyph tech={icon} size={13} />}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-12">
            <div className="mb-4 text-[13px] text-cyan">Achievements</div>
            <ul className="max-w-4xl space-y-5">
              {achievements.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 select-none text-yellow">★</span>
                  <div>
                    <div className="text-[14px] font-medium text-fg">
                      {a.title}
                      {a.year && <span className="font-normal text-faint"> · {a.year}</span>}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-dim">{a.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="reveal mt-10 text-[13px] text-dim">
            <span className="text-faint">Education:</span> {education.degree} —{" "}
            {education.institution} ({education.year})
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-24 scroll-mt-24">
          <SectionHeading n="04" title="Contact" />
          <div className="reveal flex flex-wrap gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-elev px-4 py-2 text-[13px] text-cyan hover:border-cyan/60"
              >
                <SocialIcon label={s.label} />
                {s.label} ↗
              </a>
            ))}
            <a
              href={email ? `mailto:${email}` : undefined}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-elev px-4 py-2 text-[13px] text-cyan hover:border-cyan/60"
            >
              {email ?? "Email"}
            </a>
          </div>
        </section>

        <footer className="mt-24 border-t border-border pt-8 text-[12px] text-faint">
          Built with Next.js · static · open source. Prefer a shell?{" "}
          <span className="text-dim">Switch to Terminal up top.</span>
        </footer>
      </div>
    </div>
  );
}
