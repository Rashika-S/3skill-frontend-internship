import {
  FaCrown,
  FaUser,
  FaUsers,
  FaClock,
  FaTrophy,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const particles = Array.from({ length: 20 });

function Home() {
  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,#5b0000_0%,#1a0000_35%,#000000_100%)] px-6">
      <Navbar />
      
      {/* Background Glow */}

      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] bg-red-700/20 blur-[160px] rounded-full"></div>

      <div className="absolute inset-0 bg-black/30"></div>
      {/* Floating Particles */}

        {particles.map((_, index) => (

          <motion.span
            key={index}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-40"

            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}

            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}

            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />

        ))}

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <FaCrown className="text-6xl text-yellow-400 mb-4 drop-shadow-[0_0_20px_gold]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-7xl font-bold text-yellow-400"
        style={{ fontFamily: "Cinzel" }}
      >
        Baahubali Quiz
      </motion.h1>

      <p
        className="mt-4 text-2xl text-center max-w-2xl text-gray-300"
        style={{ fontFamily: "Cormorant Garamond" }}
      >
        Test your knowledge.
        <br />
        Prove you're worthy of Mahishmati.
      </p>

      {/* Features */}

      <motion.div
        id="features"
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-5 mt-14 w-full max-w-3xl"
      >

        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(212,175,55,0.5)",
          }}
          className="bg-[#1B1B1B] rounded-xl p-5 flex items-center gap-4 border border-yellow-500/20"
        >
          <FaQuestionCircle className="text-yellow-400 text-3xl" />
          <div>
            <h3 className="font-bold">15 Questions</h3>
            <p className="text-gray-400 text-sm">Multiple Choice</p>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(212,175,55,0.5)",
          }}
          className="bg-[#1B1B1B] rounded-xl p-5 flex items-center gap-4 border border-yellow-500/20"
        >
          <FaUsers className="text-yellow-400 text-3xl" />
          <div>
            <h3 className="font-bold">Up to 5 Players</h3>
            <p className="text-gray-400 text-sm">Compete Together</p>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(212,175,55,0.5)",
          }}
          className="bg-[#1B1B1B] rounded-xl p-5 flex items-center gap-4 border border-yellow-500/20"
        >
          <FaClock className="text-yellow-400 text-3xl" />
          <div>
            <h3 className="font-bold">20 Seconds</h3>
            <p className="text-gray-400 text-sm">Per Question</p>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(212,175,55,0.5)",
          }}
          className="bg-[#1B1B1B] rounded-xl p-5 flex items-center gap-4 border border-yellow-500/20"
        >
          <FaTrophy className="text-yellow-400 text-3xl" />
          <div>
            <h3 className="font-bold">Leaderboard</h3>
            <p className="text-gray-400 text-sm">Live Rankings</p>
          </div>
        </motion.div>

      </motion.div>

      {/* Buttons */}

      <div className="flex flex-col md:flex-row gap-6 mt-16">

        <Link to="/join">

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 hover:bg-yellow-400 px-8 py-4 rounded-xl text-black font-bold flex items-center gap-3 text-lg shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
          >
            <FaUser />
            Play Solo
          </motion.button>

        </Link>

        <Link to="/join">

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-xl font-bold flex items-center gap-3 text-lg shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
          >
            <FaUsers />
            Compete with Friends
          </motion.button>

        </Link>

      </div>
    
      {/* About */}

      <section
        id="about"
        className="w-full max-w-5xl mt-28 mb-16 bg-[#1B1B1B]/70 backdrop-blur-md border border-yellow-500/20 rounded-3xl p-10"
      >

        <h2
          className="text-4xl text-yellow-400 font-bold text-center mb-6"
          style={{ fontFamily: "Cinzel" }}
        >
          About the Quiz
        </h2>

        <p className="text-center text-gray-300 leading-8 text-lg">

          Inspired by the legendary <span className="text-yellow-400 font-semibold">Baahubali</span> universe,
          this interactive quiz lets fans test their knowledge through a series of exciting multiple-choice questions.

          <br /><br />

          Play solo to challenge yourself or compete with friends using a Royal Code.
          Every correct answer earns you glory, while every mistake brings you one step closer
          to Katappa's training grounds.

        </p>

      </section>

    </main>
  );
}

export default Home;