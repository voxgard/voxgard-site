"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { voices, type Voice } from "../data/voices";

/**
 * VoiceDemoSection — interactive AI voice showcase.
 * One voice plays at a time. Audio is simulated via animated waveform
 * until real recordings are wired into voice.audioSrc.
 */
export default function VoiceDemoSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setPlayingId((cur) => (cur === id ? null : id));
  };

  return (
    <section
      id="voices"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <Eyebrow color="#1E3A8A">Voice cast</Eyebrow>
        <h2 className="mt-8 text-5xl font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-7xl">
          Listen to{" "}
          <span className="vox-shimmer-text">your receptionist.</span>
        </h2>
        <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
          Hand-picked AI voices, tuned for service businesses.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {voices.map((v, i) => (
          <VoiceCard
            key={v.id}
            voice={v}
            playing={playingId === v.id}
            onToggle={() => handlePlay(v.id)}
            indexDelay={i * 0.08}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] backdrop-blur-xl">
          <span className="h-1 w-1 rounded-full bg-[var(--brand-violet)]" />
          Concept previews · real audio in private demo
        </span>
      </div>
    </section>
  );
}

function VoiceCard({
  voice,
  playing,
  onToggle,
  indexDelay,
}: {
  voice: Voice;
  playing: boolean;
  onToggle: () => void;
  indexDelay: number;
}) {
  // Auto-stop after duration when playing
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => onToggle(), voice.durationS * 1000);
    return () => window.clearTimeout(t);
    // onToggle stays stable enough; effect resets when playing flips
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, voice.durationS]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: indexDelay, ease: [0.32, 0.72, 0, 1] }}
      whileHover={{ y: -4 }}
      className="vox-glass vox-glow-card relative overflow-hidden rounded-3xl p-6 transition-all"
      style={{
        boxShadow: playing
          ? `0 24px 60px -20px ${voice.accent}88`
          : undefined,
      }}
    >
      {/* Soft accent glow when playing */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        animate={{ opacity: playing ? 0.45 : 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        style={{
          background: `radial-gradient(circle at top, ${voice.accent}33, transparent 65%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: voice.accent }}
            >
              {voice.style}
            </div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">
              {voice.name}
            </h3>
            <div className="mt-1 text-xs text-[var(--muted)]">
              {voice.language}
            </div>
          </div>

          <PlayButton playing={playing} accent={voice.accent} onClick={onToggle} />
        </div>

        <div className="mt-6">
          <Waveform playing={playing} accent={voice.accent} />
        </div>

        <div className="mt-4 min-h-[40px] text-sm leading-relaxed text-[var(--text)]">
          {playing ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              &ldquo;{voice.preview}&rdquo;
            </motion.span>
          ) : (
            <span className="text-[var(--subtle)]">
              Tap play to preview — {voice.durationS}s
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PlayButton({
  playing,
  accent,
  onClick,
}: {
  playing: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={playing ? "Stop" : "Play"}
      className="vox-ease relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
        boxShadow: `0 8px 22px -8px ${accent}aa`,
      }}
    >
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: accent, opacity: 0.4 }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span className="relative">
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="3" y="2" width="3" height="10" rx="0.5" />
            <rect x="8" y="2" width="3" height="10" rx="0.5" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 1.8v10.4c0 .6.7 1 1.2.6L12.6 7.6c.5-.3.5-1 0-1.3L4.2 1.2C3.7.8 3 1.2 3 1.8z" />
          </svg>
        )}
      </span>
    </button>
  );
}

function Waveform({ playing, accent }: { playing: boolean; accent: string }) {
  // 28 bars; heights animate via CSS keyframes only when `playing` to keep perf low.
  const bars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        base: 22 + Math.abs(Math.sin(i * 0.7)) * 56,
        delay: i * 0.04,
        dur: 1.4 + (i % 4) * 0.2,
      })),
    [],
  );

  return (
    <div
      className="flex h-10 items-end gap-1 overflow-hidden rounded-xl px-3"
      style={{
        background: playing
          ? `linear-gradient(180deg, ${accent}11, ${accent}05)`
          : "rgba(15,23,42,0.025)",
        transition: "background 0.6s cubic-bezier(0.32,0.72,0,1)",
      }}
    >
      {bars.map((b, i) => (
        <span
          key={i}
          className="block w-1 rounded-full"
          style={{
            height: playing ? `${b.base}%` : "18%",
            background: `linear-gradient(180deg, ${accent}, ${accent}88)`,
            opacity: playing ? 0.95 : 0.35,
            animation: playing
              ? `vox-wave ${b.dur}s ease-in-out ${b.delay}s infinite`
              : "none",
            transition: "height 0.4s cubic-bezier(0.32,0.72,0,1), opacity 0.4s",
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

function Eyebrow({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] backdrop-blur-xl"
      style={{ color }}
    >
      <span
        className="h-1 w-1 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}88` }}
      />
      {children}
    </div>
  );
}
