# Changelog

## 2026-05-14

### Verified
- Admin CMS smoke-test end-to-end (login, content read/write, versioning, image upload). All checks pass — see [docs/admin.md](docs/admin.md#verified-behavior).
- Vision A, B, C all render (HTTP 200, no runtime errors).
- Middleware correctly redirects unauthenticated `/admin` requests to `/admin/login`.

### Configured
- Added `.env.local` with generated `ADMIN_PASSWORD` and `ADMIN_SECRET` (gitignored — values not committed). Restart `npm run dev` to load new values.

### Documented
- Rewrote `README.md` (was create-next-app boilerplate) — added routes table, admin setup, known limitations.
- New `docs/admin.md` — full admin CMS reference (auth, content keys, API, production checklist).
- New `CHANGELOG.md` — this file.

### Known (unfixed)
- Voice cards in `VoiceDemoSection` have no real audio (`voice.audioSrc` empty for all 4).
- `/login`, `/register` OAuth buttons are UI-only — no backend.
- `/dashboard/*` pages are visual shells — no API.
- `middleware.ts` triggers Next.js 16 deprecation warning (should rename to `proxy.ts` before Next.js 17).

## 2026-05-14 — earlier
- `54425ac` Add 3-vision system, sections refactor, and admin CMS (58 files, +5571/-1232).

## 2026-05-09
- `83feb83` Backup before visual architecture refactor.

## 2026-05-08
- `fa9f6ff` Add futuristic 3D SaaS homepage design.
- `33e8304` Add contact form.
- `147f42b` Update site title.
- `56b017f` Pricing and contact sections.
- `8254f75`, `838f609`, `124ec2b` Premium Voxgard UI iterations.
- `6558307` Update homepage.

## Initial
- `01d136a` Initial commit from Create Next App.
