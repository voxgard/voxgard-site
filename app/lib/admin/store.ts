import { promises as fs } from "fs";
import path from "path";
import {
  CONTENT_KEYS,
  CONTENT_LABELS,
  type ContentKey,
} from "./keys";

export { CONTENT_KEYS, CONTENT_LABELS };
export type { ContentKey };

const DATA_DIR = path.join(process.cwd(), "app", "data");
const VERSIONS_DIR = path.join(DATA_DIR, ".versions");

function fileFor(key: ContentKey): string {
  return path.join(DATA_DIR, `${key}.json`);
}

export async function readContent<T = unknown>(key: ContentKey): Promise<T> {
  const raw = await fs.readFile(fileFor(key), "utf8");
  return JSON.parse(raw) as T;
}

export async function writeContent(
  key: ContentKey,
  value: unknown,
): Promise<{ version: string }> {
  // Snapshot current → versions/<key>/<ts>.json
  const current = await fs
    .readFile(fileFor(key), "utf8")
    .catch(() => null);
  const version = new Date().toISOString().replace(/[:.]/g, "-");
  if (current) {
    const versionDir = path.join(VERSIONS_DIR, key);
    await fs.mkdir(versionDir, { recursive: true });
    await fs.writeFile(path.join(versionDir, `${version}.json`), current);
  }

  // Pretty-print so commits and diffs stay readable.
  const next = JSON.stringify(value, null, 2) + "\n";
  await fs.writeFile(fileFor(key), next);
  return { version };
}

export async function listVersions(key: ContentKey): Promise<string[]> {
  const dir = path.join(VERSIONS_DIR, key);
  try {
    const entries = await fs.readdir(dir);
    return entries
      .filter((e) => e.endsWith(".json"))
      .map((e) => e.replace(/\.json$/, ""))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

export async function readVersion<T = unknown>(
  key: ContentKey,
  version: string,
): Promise<T> {
  const file = path.join(VERSIONS_DIR, key, `${version}.json`);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as T;
}

export async function restoreVersion(
  key: ContentKey,
  version: string,
): Promise<void> {
  const value = await readVersion(key, version);
  await writeContent(key, value);
}
