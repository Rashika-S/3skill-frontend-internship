import { useState } from "react";
import questions from "../data/questions";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

import click from "../assets/sounds/click.mp3";
import correct from "../assets/sounds/correct.mp3";
import wrong from "../assets/sounds/wrong.mp3";

import { motion, AnimatePresence } from "framer-motion";

function Quiz() {
  const navigate = useNavigate();

  const clickSound = useRef(new Audio(click));
  const correctSound = useRef(new Audio(correct));
  const wrongSound = useRef(new Audio(wrong));

  const [score, setScore] = useState(0);

  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  function nextQuestion() {

    if (currentQuestion === questions.length - 1) {

      navigate("/result", {
        state: {
          score,
          total: questions.length,
        },
      });

    } else {

      setCurrentQuestion(currentQuestion + 1);

    }

  }

  const [currentQuestion, setCurrentQuestion] = useState(0);

  function handleAnswer(index) {
    if (locked) return;

    setSelected(index);
    setLocked(true);

    clickSound.current.currentTime = 0;
    clickSound.current.play();

    const correct = index === questions[currentQuestion].answer;

    if (correct) {
      correctSound.current.currentTime = 0;
      correctSound.current.play();
      setScore((prev) => prev + 1);
    } else {
      wrongSound.current.currentTime = 0;
      wrongSound.current.play();
    }

    setTimeout(() => {
      setSelected(null);
      setLocked(false);

      if (currentQuestion === questions.length - 1) {
        navigate("/leaderboard", {
          state: {
            score: correct ? score + 1 : score,
            total: questions.length,
          },
        });
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 1200);
  }

  return (

    <main className="min-h-screen bg-linear-to-b from-black via-[#2B0A0A] to-black flex justify-center items-center px-6">

      <div className="bg-[#1B1B1B] w-full max-w-3xl p-8 rounded-2xl border border-yellow-500">

        <p className="text-yellow-400 mb-6">

          Question {currentQuestion + 1} / {questions.length}

        </p>

        <div className="w-full h-3 bg-gray-700 rounded-full mb-8">

          <div
            className="bg-linear-to-r from-yellow-500 to-yellow-300 h-3 rounded-full transition-all duration-700"
            style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />

        </div>

        <Timer
          currentQuestion={currentQuestion}
          onTimeUp={nextQuestion}
        />

        <AnimatePresence mode="wait">

          <motion.h2
            key={currentQuestion}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="text-3xl mb-10"
            style={{ fontFamily: "Cinzel" }}
          >
            {questions[currentQuestion].question}
          </motion.h2>

        </AnimatePresence>

        <AnimatePresence mode="wait">

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-5"
          >

            {questions[currentQuestion].options.map((option, index) => (

              <motion.button

                key={index}

                whileHover={{ scale: 1.02 }}

                whileTap={{ scale: 0.97 }}

                onClick={() => handleAnswer(index)}

                className={`p-5 rounded-xl text-left font-semibold transition-all duration-300 border-2

                ${
                  selected === null
                    ? "bg-[#262626] hover:bg-yellow-500 hover:text-black border-transparent"
                    : index === questions[currentQuestion].answer
                    ? "bg-green-600 border-green-400 text-white"
                    : selected === index
                    ? "bg-red-600 border-red-400 text-white"
                    : "bg-[#262626] opacity-60"
                }`}

              >

                <div className="flex items-center gap-4">

                  <span className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center font-bold">

                    {["A", "B", "C", "D"][index]}

                  </span>

                  <span>{option}</span>

                </div>

              </motion.button>

            ))}

          </motion.div>

        </AnimatePresence>

      </div>

    </main>

  );
}

export default Quiz;