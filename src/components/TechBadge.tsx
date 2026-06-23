import { TECH } from "@/lib/tech";
import type { TechKey } from "@/content/types";

/**
 * Just the icon for a tech: a full-colour brand SVG (via <img>), a monochrome
 * simple-icons path, or a text-mark glyph. Reused by TechBadge and the Skills
 * chips. <img> is used for brand SVGs so each file's gradient/mask ids stay
 * scoped per-file (no collisions when an icon repeats).
 */
export function TechGlyph({ tech, size = 14 }: { tech: TechKey; size?: number }) {
  const meta = TECH[tech];
  if (!meta) return null;

  if (meta.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- intentional: per-file id scoping; next/image adds no value for tiny static svgs in a static export
      <img
        src={meta.src}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  if (meta.path) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size - 1}
        height={size - 1}
        fill="currentColor"
        aria-hidden="true"
        className="text-fg"
      >
        <path d={meta.path} />
      </svg>
    );
  }
  return (
    <span aria-hidden="true" className="font-semibold tracking-tight text-fg text-[11px]">
      {meta.glyph}
    </span>
  );
}

/** Monochrome/brand tech chip: icon + label. */
export function TechBadge({ tech }: { tech: TechKey }) {
  const meta = TECH[tech];
  if (!meta) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded border border-border bg-elev px-2 py-0.5 text-[12px] text-dim"
      title={meta.label}
    >
      <TechGlyph tech={tech} />
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
