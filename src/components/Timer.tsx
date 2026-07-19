import { motion } from "framer-motion";

export function Timer({ seconds, total = 20 }: { seconds: number; total?: number }) {
  const pct = Math.max(0, Math.min(100, (seconds / total) * 100));
  const danger = seconds <= 5;
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-widest">
        <span className="text-[color:var(--color-muted-foreground)]">Time</span>
        <span className={danger ? "text-red-400" : "text-[color:var(--color-gold)]"}>{seconds}s</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ ease: "linear", duration: 0.5 }}
          className={`h-full rounded-full ${danger ? "bg-red-500" : "bg-gradient-to-r from-[color:var(--color-gold-soft)] to-[color:var(--color-gold)]"}`}
        />
      </div>
    </div>
  );
}
