# daniel@portfolio

A terminal-style developer portfolio. Visitors explore my work the way they'd
explore a filesystem — `ls`, `cd`, `cat`, or just click the folders.

Built as a **fully static site** with no backend, no database, and no secrets,
so it's safe to keep open source.

```
daniel@portfolio:~$ ls
about.txt   skills.txt   achievements.txt   contact.txt   projects/   experience/

daniel@portfolio:~$ cd projects/nifl && cat README.md
```

## Highlights

- **Two views, one toggle** — switch between the **Terminal** and a clean,
  scrollable **Portfolio** UI from the title bar. The choice is remembered
  (`localStorage`), so technical visitors get the shell and everyone else gets a
  familiar layout. Both render from the same content.
- **Hybrid navigation** — the terminal offers a real command line
  (`ls`/`cd`/`cat`/`open`, with tab-completion and ↑/↓ history) *and* clickable
  folders.
- **Content as data** — projects, experience, skills, and achievements live in
  plain TypeScript under [`src/content`](src/content). Adding a project is a few
  lines; no component changes needed.
- **Accessible & keyboard-first** — semantic markup, focus styles, reduced-motion
  support, and a screen-reader heading.
- **Secure by construction** — see [Security](#security).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS v4
- [simple-icons](https://simpleicons.org) for tech badges

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # static export -> ./out
```

## Editing content

Everything you'd want to change lives in [`src/content`](src/content):

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, role, bio, socials, email, CV path |
| `projects.ts` | The `projects/` folder |
| `experience.ts` | The `experience/` folder |
| `skills.ts` | Skills and achievements |

Tech badge icons are mapped in [`src/lib/tech.ts`](src/lib/tech.ts). Most use a
full-colour brand SVG in [`public/icons`](public/icons); a few without one fall
back to a monochrome [simple-icons](https://simpleicons.org) glyph or a text-mark.
To upgrade a fallback, drop a `<name>.svg` into `public/icons` and set
`src: icon("<name>")` for that key.

## Deployment

### Vercel (recommended)

Import the repo at [vercel.com/new](https://vercel.com/new). The framework is
auto-detected; no environment variables are needed. Security headers in
[`vercel.json`](vercel.json) are applied automatically.

### Any static host (GitHub Pages, Netlify, S3, …)

```bash
npm run build      # outputs ./out
```

Serve the `out/` directory. The site is 100% static files.

## Security

This site is designed to be safe as a public repository:

- **No backend, no API routes, no database** — `output: 'export'` produces only
  static HTML/CSS/JS. There is nothing to exploit at runtime and no server to
  misconfigure.
- **No secrets** — there are no API keys or `.env` files anywhere in the repo,
  and none are required to build or run it.
- **Email anti-scraping** — the contact email is base64-encoded and only decoded
  in the browser, so the plaintext address never appears in the shipped HTML/JS.
- **Hardened headers** — a strict Content-Security-Policy plus
  `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, and HSTS (see [`vercel.json`](vercel.json), with a
  `<meta>` CSP fallback for non-Vercel hosts).
- **Dependency hygiene** — `npm audit` is clean and Dependabot keeps it that way.

See [SECURITY.md](SECURITY.md) for the reporting policy.

## License

[MIT](LICENSE) © 2026 Daniel Alamezie. Code is free to reuse; please swap in your
own content (`src/content`) and CV rather than republishing mine.
