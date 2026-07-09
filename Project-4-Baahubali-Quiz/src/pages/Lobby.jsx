import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaCrown,
  FaUsers,
  FaPlay,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

function Lobby() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const playerName = state?.playerName || "Warrior";
  const roomCode = state?.roomCode || "MAHI123";
  const mode = state?.mode || "solo";

  const [copied, setCopied] = useState(false);

  const players =
    mode === "solo"
      ? [
          {
            name: playerName,
            avatar: "👑",
            host: true,
          },
        ]
      : [
          {
            name: playerName,
            avatar: "👑",
            host: true,
          },
          {
            name: "Katappa",
            avatar: "⚔️",
          },
          {
            name: "Devasena",
            avatar: "👸",
          },
          {
            name: "Avantika",
            avatar: "🏹",
          },
        ];

  function copyCode() {
    navigator.clipboard.writeText(roomCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function startQuiz() {
    navigate("/quiz", {
      state: {
        playerName,
        mode,
      },
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#5b0000_0%,#1a0000_35%,#000000_100%)] flex items-center justify-center px-6 py-12">

      {/* Background */}

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-3xl">

        {/* Title */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >

          <FaCrown className="mx-auto text-6xl text-yellow-400 mb-5" />

          <h1
            className="text-5xl text-yellow-400 font-bold"
            style={{ fontFamily: "Cinzel" }}
          >
            Royal Lobby
          </h1>

          <p className="text-gray-300 mt-4">
            Gather your warriors before entering battle.
          </p>

        </motion.div>

        {/* Glass Card */}

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl p-8 shadow-2xl"
        >

          {/* Room Code */}

          {mode === "friends" && (

            <div className="mb-10">

              <p className="text-center text-gray-400 mb-3">

                Royal Code

              </p>

              <div className="flex justify-center items-center gap-4">

                <div className="bg-[#222] border border-yellow-500 rounded-2xl px-8 py-4 tracking-[8px] text-3xl font-bold text-yellow-400">

                  {roomCode}

                </div>

                <button
                  onClick={copyCode}
                  className="bg-yellow-500 text-black p-4 rounded-2xl hover:scale-105 transition"
                >

                  {copied ? <FaCheck /> : <FaCopy />}

                </button>

              </div>

            </div>

          )}

          {/* Players */}

          <div className="flex items-center gap-3 mb-6">

            <FaUsers className="text-yellow-400" />

            <h2
              className="text-2xl text-yellow-400"
              style={{ fontFamily: "Cinzel" }}
            >
              Warriors
            </h2>

          </div>

          <div className="space-y-4">
            {players.map((player, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.15,
                }}
                className="flex justify-between items-center bg-[#1E1E1E] border border-yellow-500/20 rounded-2xl p-5 hover:border-yellow-400 transition-all"
              >

                <div className="flex items-center gap-5">

                  <div className="text-4xl">

                    {player.avatar}

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-white">

                      {player.name}

                    </h3>

                    <p className="text-gray-400 text-sm">

                      {player.host ? "Host" : "Warrior"}

                    </p>

                  </div>

                </div>

                {player.host && (

                  <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm">

                    👑 HOST

                  </span>

                )}

              </motion.div>

            ))}

          </div>

          {/* Waiting Status */}

          {mode === "friends" && (

            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="text-center text-gray-400 mt-8"
            >
              Waiting for warriors to assemble...
            </motion.p>

          )}

          {mode === "solo" && (

            <p className="text-center text-green-400 mt-8">

              Solo Mode Ready ⚔️

            </p>

          )}

          {/* Player Count */}

          <div className="mt-8 flex justify-center">

            <span className="bg-[#252525] border border-yellow-500/30 px-5 py-2 rounded-full text-gray-300">

              {players.length} / 5 Players Joined

            </span>

          </div>

          {/* Start Button */}

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={startQuiz}
            className="mt-10 w-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-xl"
          >

            <FaPlay />

            {mode === "solo"
              ? "Begin the Adventure"
              : "Start Battle"}

          </motion.button>

        </motion.div>

        {/* Footer */}

        <p className="text-center text-gray-500 mt-8 text-sm">

          Inspired by the legendary Baahubali universe • Frontend Project

        </p>

      </div>

    </main>
  );
}

export default Lobby;