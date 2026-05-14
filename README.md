# Voxgard site

Marketing site for Voxgard — AI infrastructure (call center, video analytics, business automation). Next.js 16, App Router, Turbopack.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in admin password (see Admin CMS below)
npm run dev                  # http://localhost:3000
```

## Routes

| Path | Purpose |
|---|---|
| `/` | Vision picker (chooses one of three design directions) |
| `/vision-a` | **Selected direction.** Apple-cinematic layout. |
| `/vision-b`, `/vision-c` | Alternative designs (holographic AI / enterprise luxury). |
| `/login`, `/register` | Public auth UI — **skeleton only, not wired.** |
| `/dashboard/*` | Agents, analytics, billing, calls, CRM, settings — **UI shells, no data wiring.** |
| `/admin` | Content CMS — see below. |

## Admin CMS

A working content management panel at `/admin`. Edits seven JSON files under `app/data/` live, with versioning and image uploads.

**Setup:**

1. Copy `.env.example` → `.env.local` and set:
   ```
   ADMIN_PASSWORD=<long random string>
   ADMIN_SECRET=<longer random string for HMAC>
   ```
   Generate values:
   ```bash
   python3 -c "import secrets; print('ADMIN_PASSWORD='+secrets.token_urlsafe(16)); print('ADMIN_SECRET='+secrets.token_urlsafe(32))"
   ```
2. Restart dev server so Next.js picks up env.
3. Visit `/admin/login`, enter password, you'll be redirected to `/admin`.

**Editable keys** (`app/data/<key>.json`):
`copy`, `plans`, `addons`, `industries`, `voices`, `roi`, `theme`

**How it works** — see [docs/admin.md](docs/admin.md).

## Known limitations

- **Voice audio** (`app/data/voices.json` → `audioSrc`): UI plays animated waveform only; real audio files are not yet wired. Add `mp3` files to `public/uploads/voices/` and reference them by URL in the CMS to enable real playback.
- **Public auth** (`/login`, `/register`): OAuth buttons are UI-only.
- **Dashboard**: page shells exist, no API integration.
- **Next.js 16 deprecation**: `middleware.ts` triggers a warning — convention is renamed to `proxy.ts`. Functional today, migrate before Next.js 17.

## Architecture notes

- `app/sections/` — eight reusable section components. Vision-a uses 3 (Voice, ROI, Plans) plus inline sections; vision-b and vision-c share the other 5.
- `app/themes/` — three theme token sets (one per vision).
- `app/data/` — single source of truth for all editable content. Read by sections, written by admin CMS.
- `middleware.ts` — gates `/admin/*` and `/api/admin/*` with HMAC session cookie.

## Documentation

See also: [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), [docs/admin.md](docs/admin.md), [CHANGELOG.md](CHANGELOG.md).
