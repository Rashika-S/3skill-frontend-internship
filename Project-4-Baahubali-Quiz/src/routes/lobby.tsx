import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCopy, FaSignOutAlt, FaPlay } from "react-icons/fa";
import { playSound } from "@/lib/audio";
import { useQuizStore } from "@/store/quizStore";
import { PlayerCard } from "@/components/PlayerCard";

export const Route = createFileRoute("/lobby")({
  head: () => ({
    meta: [
      { title: "Royal Lobby — Baahubali Quiz" },
      { name: "description", content: "Wait for your allies before the quiz begins." },
    ],
  }),
  component: Lobby,
});

function Lobby() {
  const navigate = useNavigate();
  const roomCode = useQuizStore((s) => s.roomCode);
  const players = useQuizStore((s) => s.players);
  const addMockPlayers = useQuizStore((s) => s.addMockPlayers);
  const reset = useQuizStore((s) => s.reset);
  const mode = useQuizStore((s) => s.mode);

  useEffect(() => {
    if (!mode) { navigate({ to: "/join" }); return; }
    // Simulate other players trickling in for hosts
    if (mode === "host" && players.length < 3) {
      const t = setTimeout(() => addMockPlayers(), 800);
      return () => clearTimeout(t);
    }
  }, [mode, players.length, addMockPlayers, navigate]);

  if (!mode) return null;

  const copy = async () => {
    if (!roomCode) return;
    try {
      await navigator.clipboard.writeText(roomCode);
      playSound("click");
    } catch {}
  };

  const leave = () => {
    playSound("click");
    reset();
    navigate({ to: "/" });
  };

  const start = () => {
    playSound("click");
    navigate({ to: "/quiz" });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="font-display text-xs tracking-[0.4em] text-[color:var(--color-gold)]">ROYAL LOBBY</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl gold-text">Assemble Your Army</h1>
      </motion.div>

      {roomCode && (
        <div className="glass-card mt-8 flex flex-col items-center gap-3 p-5 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-muted-foreground)]">Room Code</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-[0.4em] gold-text">{roomCode}</p>
          </div>
          <button onClick={copy} className="ghost-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm">
            <FaCopy /> Copy
          </button>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-lg text-[color:var(--color-gold)]">
          Players <span className="text-[color:var(--color-muted-foreground)]">({players.length}/5)</span>
        </h2>
        <div className="flex items-center gap-2 text-xs text-[color:var(--color-muted-foreground)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-gold" />
          {mode === "solo" ? "Solo mode" : "Waiting for players…"}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {players.map((p, i) => (
          <PlayerCard key={p.id} player={p} index={i} />
        ))}
        {Array.from({ length: Math.max(0, 5 - players.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="glass-card flex items-center gap-3 p-4 opacity-40">
            <div className="h-12 w-12 shrink-0 rounded-full border border-dashed border-[color:var(--color-border)]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-[color:var(--color-muted-foreground)]">Empty slot</p>
              <div className="mt-2 h-2 w-24 shimmer rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button onClick={leave} className="ghost-btn inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3">
          <FaSignOutAlt /> Leave Room
        </button>
        <button onClick={start} className="gold-btn gold-btn-hover inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3">
          <FaPlay /> Start Quiz
        </button>
      </div>
    </div>
  );
}
