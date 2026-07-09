import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaUsers,
  FaKey,
  FaArrowRight,
  FaCrown,
  FaChessKing,
  FaShieldAlt,
} from "react-icons/fa";

function Join() {
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");
  const [mode, setMode] = useState("solo");
  const [roomCode, setRoomCode] = useState("");

  function handleContinue() {
    if (playerName.trim() === "") {
      alert("Please enter your warrior name.");
      return;
    }

    if (mode === "friends" && roomCode.trim() === "") {
      alert("Please enter the Royal Code.");
      return;
    }

    navigate("/lobby", {
      state: {
        playerName,
        roomCode,
        mode,
      },
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#5b0000_0%,#1a0000_35%,#000000_100%)] flex items-center justify-center px-6 py-12">

      {/* Background Glow */}

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      <div className="absolute -bottom-52 -right-40 w-[500px] h-[500px] bg-red-700/20 blur-[160px] rounded-full"></div>

      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Content */}

      <div className="relative z-10 w-full max-w-xl">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="flex justify-center"
          >
            <FaCrown className="text-6xl text-yellow-400 drop-shadow-[0_0_25px_gold]" />
          </motion.div>

          <h1
            className="text-5xl font-bold text-yellow-400 mt-5"
            style={{ fontFamily: "Cinzel" }}
          >
            Enter Mahishmati
          </h1>

          <p className="text-gray-300 mt-4 text-lg leading-7">
            Prepare yourself for the royal challenge.
            <br />
            Choose your destiny and begin your journey.
          </p>

        </motion.div>

        {/* Glass Card */}

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl p-8 shadow-2xl"
        >

          {/* Warrior Name */}

          <label className="text-yellow-300 font-semibold">
            Warrior Name
          </label>

          <div className="relative mt-3">

            <FaUser className="absolute left-5 top-5 text-yellow-400" />

            <input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              type="text"
              placeholder="Enter your warrior name..."
              className="w-full pl-14 pr-5 py-4 rounded-2xl bg-[#222] border border-yellow-500/30 text-white placeholder:text-gray-500 outline-none focus:border-yellow-400 transition"
            />

          </div>

          {/* Section Title */}

          <h2
            className="text-2xl text-yellow-400 mt-10 mb-6"
            style={{ fontFamily: "Cinzel" }}
          >
            Choose Game Mode
          </h2>
          {/* Game Mode Cards */}

          <div className="grid md:grid-cols-2 gap-5">

            {/* Solo */}

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode("solo")}
              className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300

              ${
                mode === "solo"
                  ? "border-yellow-400 bg-yellow-500/10 shadow-[0_0_25px_rgba(250,204,21,0.25)]"
                  : "border-gray-700 bg-[#1f1f1f]"
              }`}
            >

              <div className="flex justify-center mb-4">
                <FaChessKing className="text-5xl text-yellow-400" />
              </div>

              <h3 className="text-xl font-bold text-center">
                Play Solo
              </h3>

              <p className="text-center text-gray-400 mt-3 text-sm">
                Challenge yourself and become the ruler of Mahishmati.
              </p>

            </motion.div>

            {/* Friends */}

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode("friends")}
              className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300

              ${
                mode === "friends"
                  ? "border-yellow-400 bg-yellow-500/10 shadow-[0_0_25px_rgba(250,204,21,0.25)]"
                  : "border-gray-700 bg-[#1f1f1f]"
              }`}
            >

              <div className="flex justify-center mb-4">
                <FaUsers className="text-5xl text-yellow-400" />
              </div>

              <h3 className="text-xl font-bold text-center">
                Compete with Friends
              </h3>

              <p className="text-center text-gray-400 mt-3 text-sm">
                Create or join a royal room with up to 5 players.
              </p>

            </motion.div>

          </div>

          {/* Royal Code */}

          {mode === "friends" && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >

              <label className="text-yellow-300 font-semibold">
                Royal Code
              </label>

              <div className="relative mt-3">

                <FaKey className="absolute left-5 top-5 text-yellow-400" />

                <input
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  type="text"
                  placeholder="MAHI123"
                  maxLength={8}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-[#222] border border-yellow-500/30 text-white placeholder:text-gray-500 outline-none focus:border-yellow-400 transition uppercase tracking-[3px]"
                />

              </div>

              <p className="text-sm text-gray-400 mt-3">
                Share this Royal Code with up to 4 friends.
              </p>

            </motion.div>

          )}

          {/* Continue */}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            className="mt-10 w-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold py-4 rounded-2xl text-lg flex justify-center items-center gap-3 shadow-xl"
          >

            <FaShieldAlt />

            Enter the Kingdom

            <FaArrowRight />

          </motion.button>

        </motion.div>

      </div>

    </main>
  );
}

export default Join;