import {
  FaCrown,
  FaUser,
  FaUsers,
  FaClock,
  FaTrophy,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient from-[#0F0F0F] via-[#2B0A0A] to-black px-6">

      <FaCrown className="text-6xl text-yellow-400 mb-4" />

      <h1
        className="text-6xl font-bold text-yellow-400"
        style={{ fontFamily: "Cinzel" }}
      >
        Baahubali Quiz
      </h1>

      <p
        className="mt-4 text-2xl text-center max-w-2xl text-gray-300"
        style={{ fontFamily: "Cormorant Garamond" }}
      >
        Test your knowledge.
        <br />
        Prove you're worthy of Mahishmati.
      </p>

      {/* Features */}

      <div className="grid grid-cols-2 gap-5 mt-14 w-full max-w-3xl">

        <div className="bg-[#1B1B1B] rounded-xl p-5 flex items-center gap-4 border border-yellow-500/20">
          <FaQuestionCircle className="text-yellow-400 text-3xl" />
          <div>
            <h3 className="font-bold">15 Questions</h3>
            <p className="text-gray-400 text-sm">Multiple Choice</p>
          </div>
        </div>

        <div className="bg-[#1B1B1B] rounded-xl p-5 flex items-center gap-4 border border-yellow-500/20">
          <FaUsers className="text-yellow-400 text-3xl" />
          <div>
            <h3 className="font-bold">Up to 5 Players</h3>
            <p className="text-gray-400 text-sm">Compete Together</p>
          </div>
        </div>

        <div className="bg-[#1B1B1B] rounded-xl p-5 flex items-center gap-4 border border-yellow-500/20">
          <FaClock className="text-yellow-400 text-3xl" />
          <div>
            <h3 className="font-bold">20 Seconds</h3>
            <p className="text-gray-400 text-sm">Per Question</p>
          </div>
        </div>

        <div className="bg-[#1B1B1B] rounded-xl p-5 flex items-center gap-4 border border-yellow-500/20">
          <FaTrophy className="text-yellow-400 text-3xl" />
          <div>
            <h3 className="font-bold">Leaderboard</h3>
            <p className="text-gray-400 text-sm">Live Rankings</p>
          </div>
        </div>

      </div>

      {/* Buttons */}

      <div className="flex flex-col md:flex-row gap-6 mt-16">

        <Link to="/join">
            <button className="bg-yellow-500 hover:bg-yellow-400 hover:scale-105 transition-all px-8 py-4 rounded-xl text-black font-bold flex items-center gap-3 text-lg">
                <FaUser />
                Play Solo
             </button>
        </Link>

        <Link to="/join">
          <button className="border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black hover:scale-105 transition-all px-8 py-4 rounded-xl font-bold flex items-center gap-3 text-lg">
            <FaUsers />
            Compete with Friends
          </button>
        </Link>

      </div>

    </main>
  );
}

export default Home;