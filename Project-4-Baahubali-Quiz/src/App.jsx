import { useState } from "react";
import { FaUser, FaUsers, FaArrowRight, FaKey } from "react-icons/fa";
import Leaderboard from "./pages/Leaderboard";

function Join() {
  const [mode, setMode] = useState("solo");
  <Route path="/leaderboard" element={<Leaderboard />} />
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient from-[#0F0F0F] via-[#2B0A0A] to-black px-6">

      <div className="w-full max-w-lg bg-[#181818] border border-yellow-500/30 rounded-2xl p-8 shadow-xl">

        <h1
          className="text-4xl text-center text-yellow-400 font-bold mb-2"
          style={{ fontFamily: "Cinzel" }}
        >
          Enter Mahishmati
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Prepare yourself for the ultimate Baahubali challenge.
        </p>

        {/* Warrior Name */}

        <label className="block text-yellow-300 mb-2">
          Warrior Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-4 rounded-xl bg-[#252525] border border-gray-700 text-white outline-none focus:border-yellow-500"
        />

        {/* Mode */}

        <div className="mt-8">

          <h2 className="text-yellow-300 mb-4">
            Select Game Mode
          </h2>

          <div className="space-y-4">

            <button
              onClick={() => setMode("solo")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition ${
                mode === "solo"
                  ? "border-yellow-400 bg-yellow-500/10"
                  : "border-gray-700"
              }`}
            >
              <FaUser className="text-yellow-400" />

              <div className="text-left">
                <h3 className="font-bold">Play Solo</h3>
                <p className="text-sm text-gray-400">
                  Challenge yourself
                </p>
              </div>
            </button>

            <button
              onClick={() => setMode("friends")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition ${
                mode === "friends"
                  ? "border-yellow-400 bg-yellow-500/10"
                  : "border-gray-700"
              }`}
            >
              <FaUsers className="text-yellow-400" />

              <div className="text-left">
                <h3 className="font-bold">
                  Compete with Friends
                </h3>

                <p className="text-sm text-gray-400">
                  Up to 5 Players
                </p>
              </div>
            </button>

          </div>

        </div>

        {/* Room Code */}

        {mode === "friends" && (

          <div className="mt-8">

            <label className="block text-yellow-300 mb-2">
              Royal Code
            </label>

            <div className="relative">

              <FaKey className="absolute left-4 top-4 text-yellow-400" />

              <input
                type="text"
                placeholder="MAHI123"
                className="w-full pl-12 p-4 rounded-xl bg-[#252525] border border-gray-700 text-white outline-none focus:border-yellow-500"
              />

            </div>

          </div>

        )}

        <button className="mt-10 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl flex justify-center items-center gap-3 transition">

          Continue

          <FaArrowRight />

        </button>

      </div>

    </main>
  );
}

export default Join;