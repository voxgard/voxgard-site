# Changelog

## 2026-05-14

### Added
- **Voice audio playback** — four placeholder TTS files (`public/voices/{aurora,lyra,nova,sofia}.m4a`) generated locally with macOS `say` + `afconvert`. Wired through `voice.audioSrc` in `app/data/voices.json`. `VoiceDemoSection` now uses an `HTMLAudioElement` instead of a fake timer — play/pause/auto-stop on `ended` all work for real.
- For production-grade voices, replace these files with ElevenLabs / OpenAI TTS output (same path, same JSON keys).

### Changed
- **Next.js 16 convention migration:** renamed `middleware.ts` → `proxy.ts`, exported function `middleware` → `proxy`. Deprecation warning gone. Behaviour unchanged.

### Verified
- Admin CMS smoke-test end-to-end (login, content read/write, versioning, image upload). All checks pass — see [docs/admin.md](docs/admin.md#verified-behavior).
- Vision A, B, C all render (HTTP 200, no runtime errors).
- Proxy correctly redirects unauthenticated `/admin` → `/admin/login` and returns 401 JSON for unauthed `/api/admin/*`.
- All four voice files served (HTTP 200) and referenced in vision-a HTML.
- Dev server (`npm run dev`) starts clean in 339ms, zero warnings in log.

### Configured
- Added `.env.local` with generated `ADMIN_PASSWORD` and `ADMIN_SECRET` (gitignored — values not committed). Restart `npm run dev` to load new values.

### Documented
- Rewrote `README.md` (was create-next-app boilerplate) — added routes table, admin setup, known limitations.
- New `docs/admin.md` — full admin CMS reference (auth, content keys, API, production checklist).
- New `CHANGELOG.md` — this file.

### Known (unfixed)
- `/login`, `/register` OAuth buttons are UI-only — no backend.
- `/dashboard/*` pages are visual shells — no API.
- Voice samples are macOS-synthesised placeholders; quality is robotic. Replace with real TTS for prod.

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
