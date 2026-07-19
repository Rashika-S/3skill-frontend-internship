import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { questions } from "@/data/questions";
import { useQuizStore } from "@/store/quizStore";
import { playSound } from "@/lib/audio";
import { QuestionCard } from "@/components/QuestionCard";
import { Timer } from "@/components/Timer";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — Baahubali Quiz" },
      { name: "description", content: "Answer 15 Baahubali questions before the timer ends." },
    ],
  }),
  component: QuizPage,
});

const QUESTION_TIME = 20;

function QuizPage() {
  const navigate = useNavigate();
  const mode = useQuizStore((s) => s.mode);
  const currentQuestion = useQuizStore((s) => s.currentQuestion);
  const setCurrentQuestion = useQuizStore((s) => s.setCurrentQuestion);
  const score = useQuizStore((s) => s.score);
  const recordAnswer = useQuizStore((s) => s.recordAnswer);
  const finalizeScores = useQuizStore((s) => s.finalizeScores);

  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [seconds, setSeconds] = useState(QUESTION_TIME);
  const recordedRef = useRef(false);

  const q = questions[currentQuestion];

  useEffect(() => {
    if (!mode) navigate({ to: "/join" });
  }, [mode, navigate]);

  // Reset per-question state when index changes
  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    setSeconds(QUESTION_TIME);
    recordedRef.current = false;
  }, [currentQuestion]);

  const goNext = useCallback(() => {
    playSound("click");
    if (currentQuestion + 1 >= questions.length) {
      finalizeScores();
      const finalScore = useQuizStore.getState().score;
      const pct = (finalScore / (questions.length * 100)) * 100;
      if (pct >= 70) playSound("win"); else playSound("lose");
      navigate({ to: mode === "solo" ? "/result" : "/leaderboard" });
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }, [currentQuestion, finalizeScores, mode, navigate, setCurrentQuestion]);

  const commit = useCallback((choice: number | null) => {
    if (recordedRef.current || !q) return;
    recordedRef.current = true;
    const correct = choice !== null && choice === q.answer;
    recordAnswer(q.id, choice, correct);
    setRevealed(true);
    if (choice === null) playSound("wrong");
    else if (correct) playSound("correct");
    else playSound("wrong");
  }, [q, recordAnswer]);

  // Timer countdown
  useEffect(() => {
    if (revealed) return;
    if (seconds <= 0) { commit(selected); return; }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, revealed, commit, selected]);

  const onSelect = (i: number) => {
    if (revealed) return;
    playSound("click");
    setSelected(i);
    commit(i);
  };

  if (!mode || !q) return null;

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="glass-card p-4 sm:p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                animate={{ width: `${progress + (100 / questions.length) * (revealed ? 1 : 0)}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-[color:var(--color-royal-red)] to-[color:var(--color-gold)]"
              />
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs uppercase tracking-widest text-[color:var(--color-muted-foreground)]">Score</p>
            <p className="font-display text-2xl font-bold gold-text">{score}</p>
          </div>
        </div>
        <div className="mt-4">
          <Timer seconds={seconds} total={QUESTION_TIME} />
        </div>
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={q.id}
            question={q}
            selected={selected}
            revealed={revealed}
            onSelect={onSelect}
          />
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={goNext}
          disabled={!revealed}
          className="gold-btn gold-btn-hover inline-flex items-center gap-2 rounded-lg px-6 py-3 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {currentQuestion + 1 >= questions.length ? "Finish" : "Next Question"} <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
