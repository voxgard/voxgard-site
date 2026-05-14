import { NextResponse } from "next/server";
import {
  CONTENT_KEYS,
  listVersions,
  readVersion,
  restoreVersion,
  type ContentKey,
} from "../../../../lib/admin/store";

function isValidKey(key: string): key is ContentKey {
  return (CONTENT_KEYS as readonly string[]).includes(key);
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ key: string }> },
) {
  const { key } = await ctx.params;
  if (!isValidKey(key)) {
    return NextResponse.json({ error: "unknown_key" }, { status: 404 });
  }
  const url = new URL(req.url);
  const version = url.searchParams.get("v");
  if (version) {
    const value = await readVersion(key, version);
    return NextResponse.json({ key, version, value });
  }
  const list = await listVersions(key);
  return NextResponse.json({ key, versions: list });
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ key: string }> },
) {
  const { key } = await ctx.params;
  if (!isValidKey(key)) {
    return NextResponse.json({ error: "unknown_key" }, { status: 404 });
  }
  const body = (await req.json().catch(() => ({}))) as { version?: string };
  if (!body.version) {
    return NextResponse.json({ error: "version_required" }, { status: 400 });
  }
  await restoreVersion(key, body.version);
  return NextResponse.json({ ok: true });
}
