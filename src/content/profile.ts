import type { Profile } from "./types";

/**
 * Personal profile. Edit freely — this is the single source of truth for the
 * "whoami", "about", and "contact" sections.
 *
 * Privacy notes (this repo is public):
 *  - Phone number is intentionally NOT included here. Keep it off the site.
 *  - Email is split into user/domain and only assembled in the browser, so it
 *    is not present as a plain `name@domain` string in the HTML or repo.
 */
export const profile: Profile = {
  name: "Daniel Chukwudi Alamezie",
  user: "daniel",
  host: "portfolio",
  role: "Senior Software Engineer",
  tagline: "Full-stack delivery + production LLM engineering",
  location: "London · Remote-friendly",
  bio: [
    "Senior Software Engineer with end-to-end delivery experience across enterprise and startup environments, now building LLM-powered product features in production.",
    "I ship robust full-stack platforms with Node.js/Express, React/Next.js, C#/.NET, and Swift, and integrate Anthropic Claude and OpenAI models using tool use, prompt-based guardrails, structured outputs, observability, and inference cost control.",
    "Comfortable owning design and technical decisions from discovery through rollout, and translating those decisions for product, design, and non-technical stakeholders.",
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Daniel-Alamezie",
      handle: "Daniel-Alamezie",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/daniel-alamezie-63a6941b9/",
      handle: "daniel-alamezie",
    },
  ],
  // Email is base64-encoded so the plaintext address never appears in the
  // shipped HTML/JS bundle (the build optimizer can't fold an atob() call,
  // unlike a string concat). It's decoded in the browser only.
  // To change it:  node -e "console.log(Buffer.from('you@example.com').toString('base64'))"
  emailEncoded: "ZGFuaWVsYWxhbWV6aWUzMDBAZ21haWwuY29t",
  cvPath: "/Daniel_Alamezie_CV.pdf",
};
