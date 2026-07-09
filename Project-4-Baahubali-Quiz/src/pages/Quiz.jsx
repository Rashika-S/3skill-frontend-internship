import { useState } from "react";
import questions from "../data/questions";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

import click from "../assets/sounds/click.mp3";
import correct from "../assets/sounds/correct.mp3";
import wrong from "../assets/sounds/wrong.mp3";

import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

function Quiz() {
  const navigate = useNavigate();

  const clickSound = useRef(new Audio(click));
  const correctSound = useRef(new Audio(correct));
  const wrongSound = useRef(new Audio(wrong));

  const [score, setScore] = useState(0);

  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  const [answerStatus, setAnswerStatus] = useState("");

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

      setAnswerStatus("Correct! 🎉");

      correctSound.current.currentTime = 0;
      correctSound.current.play();

      setScore((prev) => prev + 1);

    } else {

      setAnswerStatus("Wrong! ❌");

      wrongSound.current.currentTime = 0;
      wrongSound.current.play();

    }

    setTimeout(() => {
      setAnswerStatus("");
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


const optionColors = [
  "bg-red-600 hover:bg-red-500",
  "bg-blue-600 hover:bg-blue-500",
  "bg-yellow-500 hover:bg-yellow-400 text-black",
  "bg-green-600 hover:bg-green-500",
];

  return (

    <main className="min-h-screen bg-linear-to-b from-black via-[#2B0A0A] to-black flex justify-center items-center px-6">

      <div className="bg-[#1B1B1B] w-full max-w-3xl p-8 rounded-2xl border border-yellow-500">

        <div className="text-center mb-6">

          <span className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 px-5 py-2 rounded-full font-semibold">

            {questions[currentQuestion].category}

          </span>

          <p className="mt-4 text-lg text-gray-300">

            Question

            <span className="text-yellow-400 font-bold">
              {" "}
              {currentQuestion + 1}
            </span>

            /

            <span className="text-yellow-400 font-bold">
              {" "}
              {questions.length}
            </span>

          </p>

        </div>

        <div className="w-full h-3 bg-gray-700 rounded-full mb-8">

          <div
            className="bg-linear-to-r from-yellow-500 to-yellow-300 h-3 rounded-full transition-all duration-700"
            style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />

        </div>

        <div className="flex justify-between items-center mb-8">

          <div className="bg-yellow-500/20 border border-yellow-500 px-5 py-2 rounded-full">

            <span className="text-yellow-300 font-semibold">
              ⭐ Score: {score}
            </span>

          </div>

          <Timer
            currentQuestion={currentQuestion}
            onTimeUp={nextQuestion}
          />

        </div>

        <div className="flex justify-end mb-6">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
          >
            <FaSignOutAlt />
            Quit Quiz
          </button>

        </div>

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

        {answerStatus && (
          <p
            className={`text-xl font-bold text-center mb-6 ${
              answerStatus.includes("Correct")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {answerStatus}
          </p>
        )}

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

                whileHover={{ scale: 1.03 }}

                whileTap={{ scale: 0.96 }}

                onClick={() => handleAnswer(index)}

                className={`

                  p-5 rounded-2xl text-left font-bold transition-all duration-300 border-2

                  ${
                    selected === null
                      ? `${optionColors[index]} border-transparent hover:scale-[1.03] hover:shadow-xl`
                      : index === questions[currentQuestion].answer
                      ? "bg-green-600 border-green-300 scale-105"
                      : selected === index
                      ? "bg-red-700 border-red-300"
                      : "bg-gray-700 opacity-40"
                  }
               `}

              >

                <div className="flex items-center gap-5">

                  <div className="w-12 h-12 rounded-full bg-black/25 flex items-center justify-center text-xl font-bold">

                    {["A", "B", "C", "D"][index]}

                  </div>

                  <span className="text-lg" >
                    {option}
                  </span>

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