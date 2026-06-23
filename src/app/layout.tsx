import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import ShootingStars from "@/components/ShootingStars";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description = `${profile.role}. ${profile.tagline}. ${profile.location}.`;

export const metadata: Metadata = {
  title,
  description,
  applicationName: "daniel@portfolio",
  authors: [{ name: profile.name }],
  keywords: [
    "Senior Software Engineer",
    "Full-stack",
    "LLM Engineering",
    "Next.js",
    "TypeScript",
    "C#",
    ".NET",
    "Node.js",
  ],
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full`}>
      <head>
        {/*
          CSP as a meta fallback so the policy applies even on static hosts that
          don't read vercel.json (e.g. GitHub Pages). Vercel sets the real
          response header from vercel.json; this just hardens everywhere else.

          Production only: React's dev mode uses eval() for debugging, which a
          strict CSP would block. The shipped (production) bundle never uses eval.
        */}
        {process.env.NODE_ENV === "production" && (
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
          />
        )}
      </head>
      {/*
        suppressHydrationWarning: some browser extensions (e.g. ColorZilla adds
        `cz-shortcut-listen`) mutate <body> attributes before React hydrates,
        which would otherwise log a hydration mismatch. This only suppresses the
        warning for body's own attributes, not its children.
      */}
      <body className="app-bg min-h-full" suppressHydrationWarning>
        <ShootingStars />
        {children}
      </body>
    </html>
  );
}
