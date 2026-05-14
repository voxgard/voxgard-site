/**
 * Edge- and Node-compatible admin auth.
 * Uses Web Crypto API (works in proxy/middleware Edge runtime + API routes).
 */

export const SESSION_COOKIE = "voxgard_admin";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "voxgard";
}

function getSecret(): string {
  return (
    process.env.ADMIN_SECRET ||
    "dev-secret-change-me-in-prod-via-ADMIN_SECRET-env"
  );
}

const encoder = new TextEncoder();

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function bufToHex(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let out = "";
  for (const b of bytes) {
    out += b.toString(16).padStart(2, "0");
  }
  return out;
}

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const b = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(b)) return null;
    out[i] = b;
  }
  return out;
}

/** Constant-time string comparison. */
function ctEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) {
    r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return r === 0;
}

export function checkPassword(input: string): boolean {
  return ctEqual(input || "", getPassword());
}

export async function issueToken(): Promise<{ token: string; expires: Date }> {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = String(exp);
  const key = await getKey();
  const sigBuf = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return {
    token: `${payload}.${bufToHex(sigBuf)}`,
    expires: new Date(exp),
  };
}

export async function verifyToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const [payload, sigHex] = token.split(".");
  if (!payload || !sigHex) return false;
  const sigBytes = hexToBytes(sigHex);
  if (!sigBytes) return false;
  const key = await getKey();
  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes as BufferSource,
    encoder.encode(payload),
  );
  if (!ok) return false;
  const exp = parseInt(payload, 10);
  return Number.isFinite(exp) && Date.now() < exp;
}
