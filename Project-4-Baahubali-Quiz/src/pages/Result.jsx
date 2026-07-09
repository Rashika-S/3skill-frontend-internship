import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

import winner from "../assets/sounds/win.mp3";

import {
  FaCrown,
  FaRedoAlt,
  FaHome,
  FaMedal,
} from "react-icons/fa";

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const score = state?.score || 0;
  const total = state?.total || 5;

  const winnerSound = useRef(new Audio(winner));

  const percentage = Math.round((score / total) * 100);

  let title = "";
  let subtitle = "";
  let badge = "";
  let crown = "";

  useEffect(() => {

    if (score === total) {

      winnerSound.current.play();

      confetti({
        particleCount: 220,
        spread: 120,
        origin: { y: 0.6 },
      });

    }

  }, []);

  if (percentage === 100) {

    title = "True King of Mahishmati";
    subtitle = "Even Katappa salutes your wisdom.";
    badge = "🏆 LEGEND";
    crown = "👑";

  }

  else if (percentage >= 80) {

    title = "Royal Commander";
    subtitle = "The kingdom stands proud.";
    badge = "🥇 ELITE";
    crown = "⚔️";

  }

  else if (percentage >= 60) {

    title = "Elite Warrior";
    subtitle = "Your courage inspires others.";
    badge = "🥈 PRO";
    crown = "🛡️";

  }

  else if (percentage >= 40) {

    title = "Brave Soldier";
    subtitle = "Every warrior grows stronger.";
    badge = "🥉 NOVICE";
    crown = "🏹";

  }

  else {

    title = "Katappa Will Train You";
    subtitle = "Rise and fight another day.";
    badge = "📜 RECRUIT";
    crown = "😂";

  }

  return (

    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#5b0000_0%,#1a0000_35%,#000000_100%)] flex items-center justify-center px-6 py-12">

      {/* Background */}

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-3xl">

        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6 }}
          className="backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl p-10 shadow-2xl text-center"
        >

          <motion.div

            animate={{
              y: [0,-8,0],
            }}

            transition={{
              repeat:Infinity,
              duration:2,
            }}

            className="text-7xl mb-5"
          >

            {crown}

          </motion.div>

          <h1

            className="text-5xl font-bold text-yellow-400"

            style={{fontFamily:"Cinzel"}}

          >

            Quiz Completed

          </h1>

          <h2 className="text-3xl mt-6 font-bold">

            {title}

          </h2>

          <p className="text-gray-300 mt-4">

            {subtitle}

          </p>

          <div className="mt-8">

              {/* Royal Badge */}

              <div className="inline-flex items-center gap-3 bg-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow-lg">

                <FaMedal />

                {badge}

              </div>

              {/* Score Circle */}

              <div className="flex justify-center my-10">

                <div className="w-52 h-52 rounded-full border-8 border-yellow-400 flex flex-col justify-center items-center shadow-[0_0_40px_rgba(250,204,21,0.45)]">

                  <span className="text-7xl font-bold text-yellow-400">

                    {score}

                  </span>

                  <span className="text-gray-300 text-xl">

                    / {total}

                  </span>

                </div>

              </div>

              {/* Accuracy */}

              <div className="mb-10">

                <p className="text-gray-400 uppercase tracking-[4px] text-sm">

                  Accuracy

                </p>

                <p className="text-5xl font-bold text-yellow-400 mt-2">

                  {percentage}%

                </p>

              </div>

              {/* Quote */}

              <blockquote className="italic text-gray-400 max-w-lg mx-auto leading-8">

                "Power is earned through wisdom, courage and sacrifice."

              </blockquote>

              {/* Buttons */}

              <div className="grid md:grid-cols-2 gap-5 mt-12">

                <motion.button

                  whileHover={{ scale: 1.03 }}

                  whileTap={{ scale: 0.97 }}

                  onClick={() => navigate("/")}

                  className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-xl"

                >

                  <FaRedoAlt />

                  Play Again

                </motion.button>

                <motion.button

                  whileHover={{ scale: 1.03 }}

                  whileTap={{ scale: 0.97 }}

                  onClick={() => navigate("/")}

                  className="border border-yellow-500 text-yellow-400 py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-3 hover:bg-yellow-500 hover:text-black transition"

                >

                  <FaHome />

                  Home

                </motion.button>

              </div>
          </div>

        </motion.div>

        {/* Footer */}

        <p className="text-center text-gray-500 mt-8 text-sm">

          Every legend begins with a single question.

        </p>

      </div>

    </main>

  );
}

export default Result;