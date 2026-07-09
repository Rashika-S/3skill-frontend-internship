import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCrown, FaArrowRight } from "react-icons/fa";

function Leaderboard() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const score = state?.score || 0;
  const total = state?.total || 5;

  const players = [
    {
      name: "Rashika",
      score: score,
      avatar: "👑",
    },
    {
      name: "Katappa",
      score: 4,
      avatar: "⚔️",
    },
    {
      name: "Devasena",
      score: 3,
      avatar: "👸",
    },
    {
      name: "Avantika",
      score: 2,
      avatar: "🏹",
    },
    {
      name: "Bhallaladeva",
      score: 1,
      avatar: "🛡️",
    },
  ].sort((a, b) => b.score - a.score);

  const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#5b0000_0%,#1a0000_35%,#000000_100%)] flex items-center justify-center px-6 py-12">

      {/* Background */}

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-4xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >

          <FaCrown className="mx-auto text-6xl text-yellow-400 mb-5" />

          <h1
            className="text-5xl font-bold text-yellow-400"
            style={{ fontFamily: "Cinzel" }}
          >
            Royal Rankings
          </h1>

          <p className="text-gray-300 mt-4">
            Only one warrior can rule Mahishmati.
          </p>

        </motion.div>

        {/* Leaderboard Card */}

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl p-8 shadow-2xl"
        >

          <div className="space-y-5">
            {players.map((player, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.15,
                }}
                className={`rounded-2xl p-5 flex justify-between items-center transition-all

                ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 text-black shadow-[0_0_35px_rgba(250,204,21,0.45)]"
                    : "bg-[#1E1E1E] border border-yellow-500/20 hover:border-yellow-400"
                }`}
              >

                <div className="flex items-center gap-5">

                  <div className="text-5xl">

                    {player.avatar}

                  </div>

                  <div>

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">

                        {medals[index]}

                      </span>

                      <h2 className="text-xl font-bold">

                        {player.name}

                      </h2>

                    </div>

                    <p className="text-sm opacity-80">

                      Rank #{index + 1}

                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-4xl font-bold">

                    {player.score}

                  </p>

                  <p className="text-sm">

                    / {total}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

          {/* Winner Message */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 text-center"
          >

            <h2
              className="text-3xl text-yellow-400 font-bold"
              style={{ fontFamily: "Cinzel" }}
            >
              👑 Champion of Mahishmati
            </h2>

            <p className="text-gray-300 mt-3">

              Glory belongs to the bravest warrior.

            </p>

          </motion.div>

          {/* Continue Button */}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              navigate("/result", {
                state: {
                  score,
                  total,
                },
              })
            }
            className="mt-10 w-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-xl"
          >

            Continue

            <FaArrowRight />

          </motion.button>

        </motion.div>

        {/* Footer */}

        <p className="text-center text-gray-500 mt-8 text-sm">

          Every battle writes a new legend.

        </p>

      </div>

    </main>
  );
}

export default Leaderboard;