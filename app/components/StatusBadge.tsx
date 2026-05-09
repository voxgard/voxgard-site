type Tone = "success" | "warn" | "danger" | "info" | "neutral";

const tones: Record<Tone, { color: string; bg: string; ring: string; dot: string }> = {
  success: {
    color: "#047857",
    bg: "rgba(16,185,129,0.1)",
    ring: "rgba(16,185,129,0.28)",
    dot: "#10B981",
  },
  warn: {
    color: "#B45309",
    bg: "rgba(245,158,11,0.1)",
    ring: "rgba(245,158,11,0.28)",
    dot: "#F59E0B",
  },
  danger: {
    color: "#BE123C",
    bg: "rgba(244,63,94,0.1)",
    ring: "rgba(244,63,94,0.28)",
    dot: "#F43F5E",
  },
  info: {
    color: "#1D4ED8",
    bg: "rgba(111,168,232,0.14)",
    ring: "rgba(111,168,232,0.32)",
    dot: "#6FA8E8",
  },
  neutral: {
    color: "#475569",
    bg: "rgba(15,23,42,0.05)",
    ring: "rgba(15,23,42,0.1)",
    dot: "#94A3B8",
  },
};

export default function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: Tone;
}) {
  const t = tones[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1"
      style={{ color: t.color, background: t.bg, boxShadow: `inset 0 0 0 1px ${t.ring}` }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: t.dot, boxShadow: `0 0 6px ${t.dot}aa` }}
      />
      {label}
    </span>
  );
}
