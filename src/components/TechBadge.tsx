import { TECH } from "@/lib/tech";
import type { TechKey } from "@/content/types";

/**
 * Monochrome tech chip. Uses a simple-icons SVG path where available, and a
 * text-mark for trademark-removed brands (C#, AWS, Azure, OpenAI) and SQL.
 * Everything renders in `currentColor` so it inherits the terminal palette.
 */
export function TechBadge({ tech }: { tech: TechKey }) {
  const meta = TECH[tech];
  if (!meta) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded border border-border bg-elev px-2 py-0.5 text-[12px] text-dim"
      title={meta.label}
    >
      {meta.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- intentional: <img> scopes each SVG's gradient/mask ids per-file, avoiding id collisions when an icon repeats; next/image adds no value for tiny static svgs in a static export
        <img
          src={meta.src}
          alt=""
          width={14}
          height={14}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="h-3.5 w-3.5 object-contain"
        />
      ) : meta.path ? (
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="currentColor"
          aria-hidden="true"
          className="text-fg"
        >
          <path d={meta.path} />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="font-semibold tracking-tight text-fg text-[11px]"
        >
          {meta.glyph}
        </span>
      )}
      <span>{meta.label}</span>
    </span>
  );
}

export function TechRow({ tech }: { tech: TechKey[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <TechBadge key={t} tech={t} />
      ))}
    </div>
  );
}
