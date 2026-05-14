"use client";

import { useEffect, useMemo, useRef, useState, useTransition, use } from "react";
import {
  CONTENT_KEYS,
  CONTENT_LABELS,
  CONTENT_DESCRIPTIONS,
  type ContentKey,
} from "../../../lib/admin/keys";

export const dynamic = "force-dynamic";

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; at: number }
  | { kind: "error"; message: string };

export default function ContentEditorPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);
  if (!CONTENT_KEYS.includes(key as ContentKey)) {
    return (
      <div className="p-10 text-white/70">
        Unknown content key: <code>{key}</code>
      </div>
    );
  }
  return <Editor contentKey={key as ContentKey} />;
}

function Editor({ contentKey }: { contentKey: ContentKey }) {
  const [original, setOriginal] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [versions, setVersions] = useState<string[]>([]);
  const [previewKey, setPreviewKey] = useState(0);
  const [pending, startTransition] = useTransition();
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Load content on mount + key change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await fetch(`/api/admin/content/${contentKey}`);
      const data = (await r.json()) as { value: unknown };
      if (cancelled) return;
      const pretty = JSON.stringify(data.value, null, 2);
      setText(pretty);
      setOriginal(pretty);
      loadVersions();
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);

  async function loadVersions() {
    const r = await fetch(`/api/admin/versions/${contentKey}`);
    const data = (await r.json()) as { versions: string[] };
    setVersions(data.versions);
  }

  // Derive parse state from text — no effect, no cascading renders.
  const parseError = useMemo<string | null>(() => {
    if (!text) return null;
    try {
      JSON.parse(text);
      return null;
    } catch (e) {
      return (e as Error).message;
    }
  }, [text]);

  const dirty = text !== original;
  const valid = parseError === null;

  function save() {
    if (!valid || !dirty) return;
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return;
    }
    startTransition(async () => {
      setStatus({ kind: "saving" });
      const r = await fetch(`/api/admin/content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!r.ok) {
        setStatus({ kind: "error", message: `HTTP ${r.status}` });
        return;
      }
      setOriginal(text);
      setStatus({ kind: "saved", at: Date.now() });
      setPreviewKey((k) => k + 1);
      loadVersions();
    });
  }

  async function restore(version: string) {
    if (!confirm(`Restore version ${version}? Current state will be snapshotted first.`))
      return;
    const r = await fetch(`/api/admin/versions/${contentKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version }),
    });
    if (!r.ok) return;
    // reload current
    const r2 = await fetch(`/api/admin/content/${contentKey}`);
    const data = (await r2.json()) as { value: unknown };
    const pretty = JSON.stringify(data.value, null, 2);
    setText(pretty);
    setOriginal(pretty);
    setPreviewKey((k) => k + 1);
    loadVersions();
  }

  function reset() {
    setText(original);
  }

  const previewSrc = useMemo(
    () => `/vision-a?_admin=${previewKey}`,
    [previewKey],
  );

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Editing
          </div>
          <h1 className="mt-1 text-xl font-semibold">
            {CONTENT_LABELS[contentKey]}
          </h1>
          <p className="text-xs text-white/50">
            {CONTENT_DESCRIPTIONS[contentKey]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SaveStatus status={status} dirty={dirty} valid={valid} />
          <button
            type="button"
            onClick={reset}
            disabled={!dirty}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-white/20 hover:text-white disabled:opacity-30"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || !valid || pending}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-white transition disabled:opacity-30"
            style={{
              background: dirty && valid
                ? "linear-gradient(135deg, #6FA8E8, #9B8FE0 55%, #7CC9DC)"
                : "rgba(255,255,255,0.06)",
              boxShadow: dirty && valid
                ? "0 8px 22px -8px rgba(155,143,224,0.6)"
                : undefined,
            }}
          >
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Body: editor + preview */}
      <div className="grid grid-cols-2 gap-px bg-white/5 overflow-hidden">
        {/* Left: JSON editor (or specialized for theme) */}
        <div className="flex flex-col overflow-hidden bg-[#0B0F1A]">
          {contentKey === "theme" ? (
            <ThemeEditor text={text} onChange={setText} />
          ) : (
            <JsonEditor text={text} onChange={setText} error={parseError} />
          )}
          <ImageUploader />
          <VersionsPanel
            versions={versions}
            onRestore={restore}
          />
        </div>

        {/* Right: live preview iframe */}
        <div className="flex flex-col overflow-hidden bg-white">
          <div className="flex items-center justify-between border-b border-black/5 px-4 py-2 text-xs text-black/60">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              Live preview · /vision-a
            </span>
            <button
              type="button"
              onClick={() => setPreviewKey((k) => k + 1)}
              className="rounded border border-black/10 px-2 py-1 text-[10px] uppercase tracking-widest text-black/60 transition hover:border-black/20 hover:text-black/80"
            >
              Refresh
            </button>
          </div>
          <iframe
            ref={previewRef}
            key={previewKey}
            src={previewSrc}
            className="h-full w-full"
            title="vision-a preview"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- JSON editor ---------- */

function JsonEditor({
  text,
  onChange,
  error,
}: {
  text: string;
  onChange: (v: string) => void;
  error: string | null;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
        <span>JSON</span>
        {error && (
          <span className="rounded bg-rose-500/15 px-2 py-0.5 normal-case text-rose-300">
            {error}
          </span>
        )}
      </div>
      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="min-h-0 flex-1 resize-none bg-transparent px-4 py-2 font-mono text-xs leading-relaxed text-white/90 outline-none"
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      />
    </div>
  );
}

/* ---------- Theme editor (color pickers + JSON sync) ---------- */

function ThemeEditor({
  text,
  onChange,
}: {
  text: string;
  onChange: (v: string) => void;
}) {
  let parsed: Record<string, string> = {};
  try {
    parsed = JSON.parse(text) as Record<string, string>;
  } catch {
    /* invalid — fall back to text editor */
  }

  function setField(field: string, value: string) {
    const next = { ...parsed, [field]: value };
    onChange(JSON.stringify(next, null, 2));
  }

  const labels: Record<string, string> = {
    brandBlue: "Primary Blue",
    brandViolet: "Primary Violet",
    brandCyan: "Primary Cyan",
    brandPaleBlue: "Pale Blue",
    brandSoftViolet: "Soft Violet",
    brandSkyCyan: "Sky Cyan",
    brandNavy: "Deep Navy",
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
        Brand colors
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4">
        {Object.entries(labels).map(([field, label]) => (
          <div
            key={field}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2"
          >
            <input
              type="color"
              value={parsed[field] || "#000000"}
              onChange={(e) => setField(field, e.target.value)}
              className="h-9 w-12 cursor-pointer rounded border border-white/10 bg-transparent"
            />
            <div className="flex-1">
              <div className="text-xs font-medium">{label}</div>
              <input
                type="text"
                value={parsed[field] || ""}
                onChange={(e) => setField(field, e.target.value)}
                className="mt-0.5 w-full bg-transparent font-mono text-xs text-white/70 outline-none"
              />
            </div>
            <span
              className="h-6 w-6 rounded-full ring-1 ring-white/20"
              style={{ background: parsed[field] || "#000" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Image uploader ---------- */

function ImageUploader() {
  const [last, setLast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("file", f);
    const r = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
    });
    setBusy(false);
    if (!r.ok) return;
    const data = (await r.json()) as { url: string };
    setLast(data.url);
    navigator.clipboard?.writeText(data.url).catch(() => {});
    e.target.value = "";
  }

  return (
    <div className="border-t border-white/5 px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
        Image upload
      </div>
      <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-3 py-2 text-xs text-white/70 transition hover:border-white/30 hover:text-white">
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={onFile}
          disabled={busy}
          className="hidden"
        />
        {busy ? "Uploading…" : "Choose file (PNG/JPG/WebP/SVG, ≤4MB)"}
      </label>
      {last && (
        <div className="mt-2 break-all rounded bg-white/5 p-2 font-mono text-[10px] text-emerald-300">
          {last} <span className="text-white/40">— copied to clipboard</span>
        </div>
      )}
    </div>
  );
}

/* ---------- Versions panel ---------- */

function VersionsPanel({
  versions,
  onRestore,
}: {
  versions: string[];
  onRestore: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-2.5 text-[10px] uppercase tracking-[0.25em] text-white/50 transition hover:text-white/80"
      >
        <span>History · {versions.length} snapshots</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="max-h-48 overflow-y-auto px-4 pb-3">
          {versions.length === 0 && (
            <div className="text-xs text-white/40">No snapshots yet.</div>
          )}
          {versions.map((v) => (
            <div
              key={v}
              className="flex items-center justify-between gap-2 rounded border-b border-white/5 py-1.5"
            >
              <span className="font-mono text-[11px] text-white/70">
                {v.replace(/Z$/, "").replace(/T/, " ").slice(0, 19)}
              </span>
              <button
                type="button"
                onClick={() => onRestore(v)}
                className="rounded px-2 py-0.5 text-[10px] text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Save status ---------- */

function SaveStatus({
  status,
  dirty,
  valid,
}: {
  status: Status;
  dirty: boolean;
  valid: boolean;
}) {
  let label = "";
  let color = "text-white/40";
  if (!valid) {
    label = "Invalid JSON";
    color = "text-rose-300";
  } else if (status.kind === "saving") {
    label = "Saving…";
    color = "text-white/70";
  } else if (status.kind === "error") {
    label = `Error: ${status.message}`;
    color = "text-rose-300";
  } else if (status.kind === "saved") {
    label = "Saved";
    color = "text-emerald-300";
  } else if (dirty) {
    label = "Unsaved changes";
    color = "text-amber-300";
  } else {
    label = "Up to date";
    color = "text-white/40";
  }
  return <span className={`text-xs ${color}`}>{label}</span>;
}
