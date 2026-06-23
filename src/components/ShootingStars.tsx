"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  len: number;
  dur: number;
  delay: number;
  travel: number;
  angle: number;
}

/**
 * Decorative shooting stars in the backdrop behind the floating window.
 * Stars are generated with randomized positions/timings in the browser only
 * (never during SSR) so there's no hydration mismatch and the plain HTML stays
 * deterministic. Hidden for reduced-motion visitors via CSS.
 */
export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const count = 9;
    const generated: Star[] = Array.from({ length: count }, (_, id) => ({
      id,
      top: rand(-5, 55), // % from top, biased to the upper area
      left: rand(-10, 75), // % from left
      len: rand(80, 200), // tail length px
      dur: rand(3.5, 8), // seconds for one streak
      delay: rand(0, 14), // staggered, intermittent appearance
      travel: rand(500, 1100), // px travelled
      angle: rand(12, 30), // downward-right tilt
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: randomize in the browser only to avoid an SSR hydration mismatch
    setStars(generated);
  }, []);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              "--len": `${s.len}px`,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
              "--travel": `${s.travel}px`,
              "--angle": `${s.angle}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
