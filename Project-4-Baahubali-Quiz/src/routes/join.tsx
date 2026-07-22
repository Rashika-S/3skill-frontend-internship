import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaCheck, FaPlay, FaUsers, FaSignInAlt } from "react-icons/fa";
import { playSound } from "@/lib/audio";
import { useQuizStore, type Mode } from "@/store/quizStore";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join the Battle — Baahubali Quiz" },
      { name: "description", content: "Create a room, join with a code, or play solo." },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  const navigate = useNavigate();
  const storeMode = useQuizStore((s) => s.mode);
  const createRoom = useQuizStore((s) => s.createRoom);
  const joinRoom = useQuizStore((s) => s.joinRoom);
  const startSolo = useQuizStore((s) => s.startSolo);
  const setMode = useQuizStore((s) => s.setMode);

  const [mode, setLocalMode] = useState<Exclude<Mode, null>>(storeMode ?? "solo");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = (m: Exclude<Mode, null>) => {
    playSound("click");
    setLocalMode(m);
    setMode(m);
    setGeneratedCode(null);
    setError(null);
  };

  const handleCreate = () => {
    playSound("click");
    if (!name.trim()) { setError("Enter your warrior name."); return; }
    const c = createRoom(name.trim());
    setGeneratedCode(c);
    setError(null);
  };

  const handleJoin = () => {
    playSound("click");
    if (!name.trim()) { setError("Enter your warrior name."); return; }
    if (code.trim().length < 4) { setError("Enter a valid room code."); return; }
    joinRoom(name.trim(), code.trim());
    navigate({ to: "/lobby" });
  };

  const handleSolo = () => {
    playSound("click");
    if (!name.trim()) { setError("Enter your warrior name."); return; }
    startSolo(name.trim());
    navigate({ to: "/quiz" });
  };

  const handleEnterLobby = () => {
    playSound("click");
    navigate({ to: "/lobby" });
  };

  const copy = async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      playSound("click");
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const tabs: Array<{ id: Exclude<Mode, null>; label: string; icon: React.ComponentType }> = [
    { id: "solo", label: "Play Solo", icon: FaPlay },
    { id: "host", label: "Create Room", icon: FaUsers },
    { id: "join", label: "Join Room", icon: FaSignInAlt },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display text-4xl sm:text-5xl gold-text"
      >
        Enter the Arena
      </motion.h1>
      <p className="mt-3 text-center text-[color:var(--color-muted-foreground)]">
        Choose your path, warrior.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-2 rounded-xl border border-[color:var(--color-border)] bg-black/30 p-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = mode === t.id;
          return (
            <button
              key={t.id}
              onClick={() => pick(t.id)}
              className={`flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                active
                  ? "bg-gradient-to-b from-[color:var(--color-gold-soft)] to-[color:var(--color-gold)] text-[color:var(--color-royal-black)]"
                  : "text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-gold)]"
              }`}
            >
              <Icon /> <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="glass-card mt-6 p-6 sm:p-8">
        <label className="block text-xs font-semibold uppercase tracking-widest text-[color:var(--color-gold)]">
          Warrior Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          placeholder="e.g. Amarendra"
          className="mt-2 w-full rounded-lg border border-[color:var(--color-border)] bg-black/40 px-4 py-3 text-base outline-none placeholder:text-white/30 focus:border-[color:var(--color-gold)] focus:ring-2 focus:ring-[color:var(--color-gold)]/30"
        />

        <AnimatePresence mode="wait">
          {mode === "join" && (
            <motion.div
              key="join"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <label className="mt-5 block text-xs font-semibold uppercase tracking-widest text-[color:var(--color-gold)]">
                Room Code
              </label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={6}
                placeholder="6-character code"
                className="mt-2 w-full rounded-lg border border-[color:var(--color-border)] bg-black/40 px-4 py-3 text-lg font-mono tracking-[0.4em] outline-none placeholder:text-white/30 focus:border-[color:var(--color-gold)] focus:ring-2 focus:ring-[color:var(--color-gold)]/30"
              />
            </motion.div>
          )}

          {mode === "host" && generatedCode && (
            <motion.div
              key="host"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-xl border border-[color:var(--color-gold)] bg-[rgba(212,175,55,0.08)] p-5 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-gold)]">
                Your Room Code
              </p>
              <p className="mt-2 font-mono text-3xl font-bold tracking-[0.5em] gold-text">
                {generatedCode}
              </p>
              <button
                onClick={copy}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[color:var(--color-gold)] bg-black/40 px-4 py-2 text-sm font-semibold text-[color:var(--color-gold)] hover:bg-[rgba(90,11,11,0.5)]"
              >
                {copied ? <FaCheck /> : <FaCopy />} {copied ? "Copied!" : "Copy Code"}
              </button>
              <p className="mt-3 text-xs text-[color:var(--color-muted-foreground)]">
                Share this code with your friends.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 rounded-md border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-200"
          >
            {error}
          </motion.p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {mode === "solo" && (
            <button onClick={handleSolo} className="gold-btn gold-btn-hover inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3">
              <FaPlay /> Start Solo Quiz
            </button>
          )}
          {mode === "host" && !generatedCode && (
            <button onClick={handleCreate} className="gold-btn gold-btn-hover inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3">
              <FaUsers /> Create Room
            </button>
          )}
          {mode === "host" && generatedCode && (
            <button onClick={handleEnterLobby} className="gold-btn gold-btn-hover inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3">
              Enter Lobby →
            </button>
          )}
          {mode === "join" && (
            <button onClick={handleJoin} className="gold-btn gold-btn-hover inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3">
              <FaSignInAlt /> Join Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
