# Security Policy

This repository is a static personal portfolio. It has **no backend, no server
runtime, no database, and no secrets** — `next build` produces only static
HTML/CSS/JS. That design keeps the attack surface minimal by construction.

## Posture

- No API keys, tokens, or `.env` files are committed or required.
- The contact email is base64-encoded and decoded only in the browser, so the
  plaintext address is not present in the shipped HTML/JS bundle.
- A strict Content-Security-Policy and a standard set of security response
  headers are configured in [`vercel.json`](vercel.json), with a `<meta>` CSP
  fallback applied at the document level for non-Vercel static hosts.
- Dependencies are kept patched via Dependabot, and `npm audit` is expected to
  report 0 vulnerabilities.

## Reporting a vulnerability

If you find a security issue (for example, a way to inject script through the
content data, or a misconfigured header), please report it privately:

- Open a [GitHub security advisory](https://github.com/Daniel-Alamezie/Daniel-Portfolio/security/advisories/new), or
- Use the contact link on the live site.

Please do not open a public issue for security reports. I'll acknowledge within a
few days.
