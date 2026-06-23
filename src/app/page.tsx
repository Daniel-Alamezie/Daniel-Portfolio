import Shell from "@/components/Shell";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-2 sm:p-3">
      <Shell />

      {/* Visually-hidden heading for SEO / screen readers (the canvas is interactive). */}
      <h1 className="sr-only">
        {profile.name} — {profile.role}. {profile.tagline}.
      </h1>
    </main>
  );
}
