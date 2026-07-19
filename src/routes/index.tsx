import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaPlay, FaUsers, FaSignInAlt, FaClock, FaTrophy, FaQuestionCircle, FaUserFriends } from "react-icons/fa";
import { playSound } from "@/lib/audio";
import { useQuizStore } from "@/store/quizStore";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  { icon: FaQuestionCircle, title: "15 Questions", desc: "Handpicked Baahubali trivia" },
  { icon: FaClock, title: "20 Second Timer", desc: "Answer before the sword falls" },
  { icon: FaUserFriends, title: "Up to 5 Players", desc: "Multiplayer battles" },
  { icon: FaTrophy, title: "Live Leaderboard", desc: "Claim the throne" },
];

function Home() {
  const navigate = useNavigate();
  const setMode = useQuizStore((s) => s.setMode);

  const go = (mode: "solo" | "host" | "join") => {
    playSound("click");
    setMode(mode);
    navigate({ to: "/join" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="mx-auto h-64 w-64 rounded-full bg-[color:var(--color-royal-red)] blur-[120px] opacity-60" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-xs sm:text-sm tracking-[0.4em] text-[color:var(--color-gold)]"
        >
          KINGDOM OF MAHISHMATI PRESENTS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-4 font-display text-5xl sm:text-7xl md:text-8xl font-bold gold-text leading-none"
        >
          Baahubali Quiz
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[color:var(--color-muted-foreground)]"
        >
          Prove your loyalty to the throne. Answer 15 sacred questions of story, weapons, and warriors —
          alone or alongside your allies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button onClick={() => go("solo")} className="gold-btn gold-btn-hover inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base">
            <FaPlay /> Play Solo
          </button>
          <button onClick={() => go("host")} className="ghost-btn inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base">
            <FaUsers /> Create Room
          </button>
          <button onClick={() => go("join")} className="ghost-btn inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base">
            <FaSignInAlt /> Join Room
          </button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="pb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-royal-red)] text-2xl text-[color:var(--color-gold)]">
              <f.icon />
            </div>
            <h3 className="mt-4 font-display text-lg gold-text">{f.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      <div className="pb-12 text-center">
        <Link to="/join" onClick={() => playSound("click")} className="story-link font-display tracking-widest text-[color:var(--color-gold)]">
          Enter the arena →
        </Link>
      </div>
    </div>
  );
}
