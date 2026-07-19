import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaRedo, FaHome } from "react-icons/fa";
import { useQuizStore } from "@/store/quizStore";
import { questions } from "@/data/questions";
import { playSound } from "@/lib/audio";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Your Result — Baahubali Quiz" },
      { name: "description", content: "Your final score in the kingdom's trivia." },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const navigate = useNavigate();
  const score = useQuizStore((s) => s.score);
  const players = useQuizStore((s) => s.players);
  const mode = useQuizStore((s) => s.mode);
  const reset = useQuizStore((s) => s.reset);
  const startSolo = useQuizStore((s) => s.startSolo);
  const playerName = useQuizStore((s) => s.playerName);

  const total = questions.length * 100;
  const pct = Math.round((score / total) * 100);

  const rank = useMemo(() => {
    if (mode === "solo" || players.length <= 1) return 1;
    const sorted = [...players].sort((a, b) => b.score - a.score);
    return sorted.findIndex((p) => p.id === "me") + 1 || 1;
  }, [players, mode]);

  useEffect(() => {
    if (!mode) { navigate({ to: "/join" }); return; }
    if (pct >= 70) {
      const end = Date.now() + 1500;
      const colors = ["#D4AF37", "#F2D675", "#5A0B0B"];
      (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }, [mode, pct, navigate]);

  if (!mode) return null;

  const message =
    pct >= 90 ? "Bahubali himself would salute you!" :
    pct >= 70 ? "A worthy warrior of Mahishmati." :
    pct >= 40 ? "Train harder — the throne awaits." :
    "The kingdom needs your practice.";

  const circumference = 2 * Math.PI * 70;
  const dash = (pct / 100) * circumference;

  const playAgain = () => {
    playSound("click");
    startSolo(playerName || "Warrior");
    navigate({ to: "/quiz" });
  };
  const home = () => { playSound("click"); reset(); navigate({ to: "/" }); };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center"
      >
        <p className="font-display text-xs tracking-[0.4em] text-[color:var(--color-gold)]">FINAL VERDICT</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl gold-text">Your Score</h1>

        <div className="relative mx-auto mt-8 h-48 w-48">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" />
            <motion.circle
              cx="80" cy="80" r="70"
              stroke="url(#g)" strokeWidth="12" fill="none" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - dash }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F2D675" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div>
              <p className="font-display text-5xl font-bold gold-text">{pct}%</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[color:var(--color-muted-foreground)]">Accuracy</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Score" value={score} />
          <Stat label="Percent" value={`${pct}%`} />
          <Stat label="Rank" value={`#${rank}`} />
        </div>

        <p className="mt-6 font-display text-lg text-[color:var(--color-gold-soft)]">{message}</p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button onClick={home} className="ghost-btn inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3">
            <FaHome /> Back Home
          </button>
          <button onClick={playAgain} className="gold-btn gold-btn-hover inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3">
            <FaRedo /> Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[color:var(--color-border)] bg-black/30 p-3">
      <p className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted-foreground)]">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-[color:var(--color-gold)]">{value}</p>
    </div>
  );
}
