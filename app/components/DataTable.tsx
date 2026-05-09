import type { ReactNode } from "react";

export type Column<T> = {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
  className?: string;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyText?: string;
};

export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyText = "No records yet.",
}: Props<T>) {
  return (
    <div className="vox-glass overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-[var(--border-soft)] bg-white/40 text-left text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`px-6 py-4 font-medium ${c.className ?? ""}`}
                  style={{ textAlign: c.align ?? "left" }}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-[var(--subtle)]"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={getRowKey(row)}
                  className="border-b border-[var(--border-soft)] text-sm text-[var(--text)] transition last:border-0 hover:bg-white/60"
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={`px-6 py-4 ${c.className ?? ""}`}
                      style={{ textAlign: c.align ?? "left" }}
                    >
                      {c.render
                        ? c.render(row)
                        : String((row as Record<string, unknown>)[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
