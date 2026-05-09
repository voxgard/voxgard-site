type Size = "sm" | "md" | "lg";

const dotSize: Record<Size, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3.5 w-3.5",
};

const textSize: Record<Size, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

export default function Logo({ size = "md" }: { size?: Size }) {
  return (
    <div
      className={`flex items-center gap-3 font-bold tracking-[0.28em] text-[var(--ink)] ${textSize[size]}`}
    >
      <span
        className={`inline-block ${dotSize[size]} rounded-sm`}
        style={{
          background:
            "linear-gradient(135deg, #6FA8E8, #9B8FE0 55%, #7CC9DC)",
          boxShadow: "0 0 18px rgba(155,143,224,0.5)",
        }}
      />
      VOXGARD
    </div>
  );
}
