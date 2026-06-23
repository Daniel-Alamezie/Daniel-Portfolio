"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import Terminal from "./Terminal";
import UiPortfolio from "./UiPortfolio";

type Mode = "terminal" | "ui";
const STORAGE_KEY = "portfolio:view-mode";

function ToggleButton({
  active,
  onClick,
  children,
  label,
  pulse = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  /** Draw attention to this (inactive) option — used to surface Portfolio view. */
  pulse?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`relative flex items-center gap-1.5 rounded px-2.5 py-1 text-[12px] transition-colors ${
        active
          ? "bg-elev text-fg"
          : pulse
            ? "portfolio-hint text-cyan"
            : "text-faint hover:text-dim"
      }`}
    >
      {children}
    </button>
  );
}

export default function Shell() {
  const [mode, setMode] = useState<Mode>("terminal");

  // Restore the visitor's last choice (defaults to terminal on first visit).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: restore persisted preference on mount (localStorage is browser-only)
    if (saved === "ui" || saved === "terminal") setMode(saved);
  }, []);

  function choose(next: Mode) {
    setMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }

  return (
    <div className="crt relative flex h-[96dvh] w-full max-w-[1600px] flex-col overflow-hidden rounded-xl border border-border bg-panel shadow-2xl shadow-black/60">
      {/* Title bar */}
      <header className="flex items-center gap-3 border-b border-border bg-elev/60 px-4 py-2.5">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="hidden flex-1 text-center text-[13px] text-faint sm:block">
          {profile.user}@{profile.host}: ~
        </div>

        {/* View toggle */}
        <div
          role="group"
          aria-label="View mode"
          className="ml-auto flex items-center gap-0.5 rounded-md border border-border bg-panel p-0.5"
        >
          <ToggleButton
            active={mode === "terminal"}
            onClick={() => choose("terminal")}
            label="Terminal view"
          >
            <span aria-hidden="true" className="text-green">{">_"}</span>
            Terminal
          </ToggleButton>
          <ToggleButton
            active={mode === "ui"}
            onClick={() => choose("ui")}
            label="Portfolio view"
            pulse={mode === "terminal"}
          >
            <span aria-hidden="true">▦</span>
            Portfolio
          </ToggleButton>
        </div>
      </header>

      {/* Screen — swap content, keep the same frame */}
      {mode === "terminal" ? <Terminal /> : <UiPortfolio />}
    </div>
  );
}
