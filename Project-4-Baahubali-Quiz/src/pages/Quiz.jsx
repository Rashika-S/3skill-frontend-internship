import { useState } from "react";
import questions from "../data/questions";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [score, setScore] = useState(0);

  function handleAnswer(index) {

    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {

      navigate("/result", {
        state: {
          score: index === questions[currentQuestion].answer ? score + 1 : score,
          total: questions.length,
        },
      });

    } else {

      setCurrentQuestion(currentQuestion + 1);

    }

  }

  return (

    <main className="min-h-screen bg-linear-to-b from-black via-[#2B0A0A] to-black flex justify-center items-center px-6">

      <div className="bg-[#1B1B1B] w-full max-w-3xl p-8 rounded-2xl border border-yellow-500">

        <p className="text-yellow-400 mb-6">

          Question {currentQuestion + 1} / {questions.length}

        </p>

        <div className="w-full h-3 bg-gray-700 rounded-full mb-8">

          <div

            className="bg-yellow-400 h-3 rounded-full"

            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}

          />

        </div>

        <h2
          className="text-3xl mb-10"
          style={{ fontFamily: "Cinzel" }}
        >
          {questions[currentQuestion].question}
        </h2>

        <div className="grid gap-5">

          {questions[currentQuestion].options.map((option, index) => (

            <button

              key={index}

              onClick={() => handleAnswer(index)}

              className="bg-[#262626] hover:bg-yellow-500 hover:text-black transition p-5 rounded-xl text-left"

            >

              {option}

            </button>

          ))}

        </div>

      </div>

    </main>

  );
}

export default Quiz;