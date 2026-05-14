# Admin CMS

Lightweight built-in CMS for editing the site's JSON-backed content without a deploy. Everything is plain files in `app/data/<key>.json`, so changes are versioned by both git and the CMS's own snapshot log.

## Auth

- Single password (`ADMIN_PASSWORD` env var, falls back to `voxgard` if unset — **do not ship without setting it**).
- Constant-time comparison (`ctEqual` in `app/lib/admin/auth.ts`).
- On success, server issues an HMAC-SHA256 token (`<expires>.<sig>`) signed with `ADMIN_SECRET`, set as `voxgard_admin` cookie (httpOnly, lax, 30-day TTL).
- `middleware.ts` (Edge runtime, Web Crypto) verifies the cookie on every `/admin/*` and `/api/admin/*` request. Unauthenticated page requests redirect to `/admin/login`; API requests get `401 {"error":"unauthorized"}`.

**Logout:** `DELETE /api/admin/auth` clears the cookie.

## Content keys

Defined in [app/lib/admin/keys.ts](../app/lib/admin/keys.ts):

| Key | File | What it controls |
|---|---|---|
| `copy` | `app/data/copy.json` | Hero, flow, CTA strings across all visions. |
| `plans` | `app/data/plans.json` | Pricing tiers (Starter / Growth / Scale). |
| `addons` | `app/data/addons.json` | Modular add-ons. |
| `industries` | `app/data/industries.json` | Industry chip strip + accent colors. |
| `voices` | `app/data/voices.json` | Four voice cast cards (Aurora / Lyra / Nova / Sofia). |
| `roi` | `app/data/roi.json` | ROI calculator defaults. |
| `theme` | `app/data/theme.json` | Brand color tokens. |

Adding a new key: add it to `CONTENT_KEYS`, `CONTENT_LABELS`, `CONTENT_DESCRIPTIONS`, create the JSON file, expose a getter in [app/lib/admin/store.ts](../app/lib/admin/store.ts) — UI auto-picks it up.

## API

All require auth cookie. Routes return `application/json`.

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/admin/auth` | Login. Body: `{"password": "..."}`. Sets cookie. |
| `DELETE` | `/api/admin/auth` | Logout. |
| `GET` | `/api/admin/content/<key>` | Read current value. |
| `PUT` | `/api/admin/content/<key>` | Write new value (whole document). Triggers auto-version snapshot. |
| `GET` | `/api/admin/versions/<key>` | List versions: `{"versions": ["2026-05-14T17-52-50-228Z", ...]}`. |
| `GET` | `/api/admin/versions/<key>?v=<id>` | Read one snapshot. |
| `POST` | `/api/admin/versions/<key>` | Restore. Body: `{"version": "<id>"}`. |
| `POST` | `/api/admin/upload` | Upload one image. Form field: `file`. Returns `{"url": "/uploads/<id>.<ext>", ...}`. |

**Upload constraints:** `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`. Max 4 MB. Random 16-hex filename, stored in `public/uploads/`.

**Versions on disk:** `app/data/.versions/<key>/<timestamp>.json`. Pretty-printed JSON. Auto-snapshot on every `PUT`.

## Verified behavior

Smoke-tested 2026-05-14:

- ✅ Wrong password → 401
- ✅ Right password → 200 + cookie
- ✅ `GET /api/admin/content/copy` → full document
- ✅ `PUT` modifies `app/data/copy.json` on disk
- ✅ Each `PUT` creates a snapshot in `app/data/.versions/copy/`
- ✅ Restore via `POST /api/admin/versions/copy` with version id works
- ✅ Image upload writes to `public/uploads/<random>.png`
- ✅ Middleware redirects unauthed `/admin` → `/admin/login`
- ✅ All three vision pages render (HTTP 200, no runtime errors)

## Production checklist

Before deploying:

1. Set `ADMIN_PASSWORD` and `ADMIN_SECRET` to strong random values (32+ chars).
2. Make sure `app/data/.versions/` is writable by the Next.js process.
3. Decide whether `public/uploads/` should be served by Next.js or moved to object storage (S3/R2) — current implementation is local FS, fine for low traffic.
4. Add backup of `app/data/*.json` to git or external storage (current setup relies on git commits).
5. Consider rate-limiting `/api/admin/auth` (no built-in throttle today).
