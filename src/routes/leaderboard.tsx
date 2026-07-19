import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaMedal, FaArrowRight } from "react-icons/fa";
import { useQuizStore } from "@/store/quizStore";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { playSound } from "@/lib/audio";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Baahubali Quiz" },
      { name: "description", content: "Who claimed the throne of Mahishmati?" },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const navigate = useNavigate();
  const players = useQuizStore((s) => s.players);
  const mode = useQuizStore((s) => s.mode);

  useEffect(() => {
    if (!mode) navigate({ to: "/join" });
  }, [mode, navigate]);

  const sorted = useMemo(() => [...players].sort((a, b) => b.score - a.score), [players]);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const podium = [
    { p: top3[1], place: 2, color: "from-slate-400 to-slate-600", height: "h-28", icon: FaMedal },
    { p: top3[0], place: 1, color: "from-[color:var(--color-gold-soft)] to-[color:var(--color-gold)]", height: "h-40", icon: FaCrown },
    { p: top3[2], place: 3, color: "from-amber-600 to-amber-800", height: "h-20", icon: FaMedal },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display text-4xl sm:text-5xl gold-text"
      >
        Leaderboard
      </motion.h1>
      <p className="mt-2 text-center text-[color:var(--color-muted-foreground)]">
        The kingdom bows before its champions.
      </p>

      {/* Podium */}
      <div className="mt-10 flex items-end justify-center gap-3 sm:gap-6">
        {podium.map(({ p, place, color, height, icon: Icon }, i) => (
          <motion.div
            key={place}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className="flex w-24 flex-col items-center sm:w-32"
          >
            <div className="text-2xl text-[color:var(--color-gold)]"><Icon /></div>
            <p className="mt-1 truncate text-sm font-semibold">{p?.name ?? "—"}</p>
            <p className="text-xs text-[color:var(--color-muted-foreground)]">{p?.score ?? 0} pts</p>
            <div className={`mt-2 w-full rounded-t-lg bg-gradient-to-b ${color} ${height} shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]`}>
              <div className="grid h-full place-items-center font-display text-2xl font-bold text-[color:var(--color-royal-black)]">
                {place}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rest */}
      {rest.length > 0 && (
        <div className="mt-10 grid gap-3">
          {rest.map((p, i) => (
            <LeaderboardCard key={p.id} player={p} rank={i + 4} index={i} />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => { playSound("click"); navigate({ to: "/result" }); }}
          className="gold-btn gold-btn-hover inline-flex items-center gap-2 rounded-lg px-6 py-3"
        >
          Continue <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
