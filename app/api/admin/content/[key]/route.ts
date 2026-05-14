import { NextResponse } from "next/server";
import {
  CONTENT_KEYS,
  readContent,
  writeContent,
  type ContentKey,
} from "../../../../lib/admin/store";

function isValidKey(key: string): key is ContentKey {
  return (CONTENT_KEYS as readonly string[]).includes(key);
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ key: string }> },
) {
  const { key } = await ctx.params;
  if (!isValidKey(key)) {
    return NextResponse.json({ error: "unknown_key" }, { status: 404 });
  }
  const value = await readContent(key);
  return NextResponse.json({ key, value });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ key: string }> },
) {
  const { key } = await ctx.params;
  if (!isValidKey(key)) {
    return NextResponse.json({ error: "unknown_key" }, { status: 404 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const result = await writeContent(key, body);
  return NextResponse.json({ ok: true, ...result });
}
