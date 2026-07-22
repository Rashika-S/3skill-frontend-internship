import { motion } from "framer-motion";
import type { Question } from "@/data/questions";

type Props = {
  question: Question;
  selected: number | null;
  revealed: boolean;
  onSelect: (i: number) => void;
};

export function QuestionCard({ question, selected, revealed, onSelect }: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="glass-card p-6 sm:p-8"
    >
      <h2 className="font-display text-xl sm:text-2xl leading-snug text-[color:var(--color-foreground)]">
        {question.question}
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = revealed && i === question.answer;
          const isWrong = revealed && isSelected && i !== question.answer;
          const base = "text-left rounded-xl px-4 py-3 sm:py-4 border transition-all font-medium";
          let cls = "border-[color:var(--color-border)] bg-black/30 hover:border-[color:var(--color-gold)] hover:bg-[rgba(90,11,11,0.35)]";
          if (isCorrect) cls = "border-emerald-400 bg-emerald-500/20 text-emerald-100";
          else if (isWrong) cls = "border-red-500 bg-red-500/20 text-red-100";
          else if (isSelected) cls = "border-[color:var(--color-gold)] bg-[rgba(212,175,55,0.15)]";
          return (
            <motion.button
              key={i}
              whileHover={{ scale: revealed ? 1 : 1.02 }}
              whileTap={{ scale: revealed ? 1 : 0.98 }}
              disabled={revealed}
              onClick={() => onSelect(i)}
              className={`${base} ${cls}`}
            >
              <span className="mr-3 inline-block h-6 w-6 rounded-full border border-[color:var(--color-gold)] text-center text-sm leading-6 text-[color:var(--color-gold)]">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
