import { motion } from "framer-motion";
import type { Player } from "@/store/quizStore";

export function LeaderboardCard({ player, rank, index }: { player: Player; rank: number; index: number }) {
  const rankColor =
    rank === 1 ? "text-[color:var(--color-gold)]" :
    rank === 2 ? "text-slate-300" :
    rank === 3 ? "text-amber-600" : "text-[color:var(--color-muted-foreground)]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="glass-card flex items-center gap-4 p-4"
    >
      <div className={`font-display text-2xl font-bold w-8 text-center ${rankColor}`}>#{rank}</div>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--color-royal-red)] text-xl">
        {player.avatar}
      </div>
      <p className="min-w-0 flex-1 truncate font-semibold">{player.name}</p>
      <p className="font-display text-lg font-bold text-[color:var(--color-gold)]">{player.score}</p>
    </motion.div>
  );
}
