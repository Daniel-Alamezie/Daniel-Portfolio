"use client";

import { useEffect, type RefObject } from "react";

/**
 * Eased ("inertial") scrolling for a scroll container. Intercepts the mouse
 * wheel and glides the scroll position toward a target each frame, and eases
 * in-container hash-link (nav) clicks too.
 *
 * Only the wheel event is hijacked — touch finger-scrolling uses touch events,
 * so phones/tablets keep their native momentum untouched. Disabled entirely for
 * reduced-motion visitors.
 */
export function useSmoothScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.style.scrollBehavior = "auto"; // JS owns the easing
    let target = root.scrollTop;
    let raf = 0;
    let running = false;

    const maxScroll = () => root.scrollHeight - root.clientHeight;
    const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()));

    const tick = () => {
      const current = root.scrollTop;
      const diff = target - current;
      if (Math.abs(diff) < 0.5) {
        root.scrollTop = target;
        running = false;
        return;
      }
      root.scrollTop = current + diff * 0.1; // easing factor (lower = smoother/longer glide)
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // let pinch-zoom through
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // ignore horizontal
      e.preventDefault();
      if (!running) target = clamp(root.scrollTop); // resync after any native scroll
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? root.clientHeight : 1;
      target = clamp(target + e.deltaY * unit);
      start();
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!link) return;
      const id = (link.getAttribute("href") || "").slice(1);
      const el = id ? root.querySelector<HTMLElement>(`#${CSS.escape(id)}`) : null;
      if (!el) return;
      e.preventDefault();
      const top =
        el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
      target = clamp(top - 72); // offset for the sticky nav
      start();
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      root.style.scrollBehavior = "";
    };
  }, [ref]);
}
