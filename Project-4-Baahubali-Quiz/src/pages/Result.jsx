import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import winner from "../assets/sounds/win.mp3";
import { motion } from "framer-motion";

function Result() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const score = state?.score || 0;
  const winnerSound = useRef(new Audio(winner));

  const total = state?.total || 5;

  let title = "";
  let subtitle = "";
  let badge = "";

  useEffect(() => {

    if (score === total) {

      winnerSound.current.play();

      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 },
      });

    }

    }, []);

  if (score === total) {
  title = "👑 True King of Mahishmati";
  subtitle = "Even Katappa Salutes You!";
  badge = "🏆 LEGEND";
  }

  else if (score >= total * 0.8) {
    title = "⚔ Royal Commander";
    subtitle = "A fearless protector of Mahishmati.";
    badge = "🥇 ELITE";
  }

  else if (score >= total * 0.6) {
    title = "🛡 Elite Warrior";
    subtitle = "Your courage is admired.";
    badge = "🥈 PRO";
  }

  else if (score >= total * 0.4) {
    title = "🏹 Brave Soldier";
    subtitle = "Train harder and rise again.";
    badge = "🥉 NOVICE";
  }

  else {
    title = "😂 Katappa Needs To Train You";
    subtitle = "The kingdom believes in second chances.";
    badge = "📜 RECRUIT";
  }

  return (

    <main className="min-h-screen bg-linear-to-b from-black via-[#2B0A0A] to-black flex justify-center items-center">

      <motion.div

        initial={{ scale: 0.8, opacity: 0 }}

        animate={{ scale: 1, opacity: 1 }}

        transition={{
          duration: 0.6,
        }}

      className="bg-[#1B1B1B] p-10 rounded-2xl border border-yellow-500 w-\[550px]\ text-center"
      >

        <motion.h1
          animate={{
            y: [0, -8, 0],
          }}

          transition={{
            repeat: Infinity,
            duration: 2,
          }}

          className="text-5xl text-yellow-400 mb-8"

          style={{ fontFamily: "Cinzel" }}
        >
          Quiz Completed
        </motion.h1>

        <h2 className="text-2xl mb-6">
          {title}
        </h2>

        <p className="text-gray-300 text-lg mb-6">
          {subtitle}
        </p>

        <div className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-full font-bold mb-8 shadow-lg">
          {badge}
        </div>

        <div className="mb-10">

          <h3 className="text-gray-400 text-lg">
            Final Score
          </h3>

          <p className="text-7xl font-bold text-yellow-400">
            {score} / {total}
          </p>

        </div>

        <button

          onClick={() => navigate("/")}

          className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold"

        >

          Play Again

        </button>

      </motion.div>

    </main>

  );
}

export default Result;