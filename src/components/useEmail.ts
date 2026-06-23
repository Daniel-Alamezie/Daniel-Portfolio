"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

/**
 * Decode the contact email in the browser only, so the plaintext address never
 * ships in the static HTML/JS bundle. Returns null until decoded (first paint).
 * Shared by the terminal `contact` view and the visual UI.
 */
export function useEmail(): string | null {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: decode in the browser to keep the plaintext email out of static HTML
      setEmail(atob(profile.emailEncoded));
    } catch {
      /* ignore malformed encoding */
    }
  }, []);
  return email;
}
