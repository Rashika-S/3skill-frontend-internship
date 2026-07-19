import { motion } from "framer-motion";
import type { Player } from "@/store/quizStore";
import { FaCrown } from "react-icons/fa";

export function PlayerCard({ player, index }: { player: Player; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-card flex items-center gap-3 p-4"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[color:var(--color-royal-red)] text-2xl">
        {player.avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-[color:var(--color-foreground)]">{player.name}</p>
          {player.isHost && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-gold)] bg-[rgba(212,175,55,0.15)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-gold)]">
              <FaCrown className="text-[10px]" /> Host
            </span>
          )}
        </div>
        <p className="text-xs text-[color:var(--color-muted-foreground)]">Ready for battle</p>
      </div>
      <div className="h-2 w-2 rounded-full bg-emerald-400 pulse-gold" />
    </motion.div>
  );
}
