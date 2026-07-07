import { useLocation, useNavigate } from "react-router-dom";

function Result() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const score = state?.score || 0;

  const total = state?.total || 5;

  let title = "";

  if (score === total) title = "👑 True Ruler of Mahishmati";
  else if (score >= 4) title = "⚔ Royal Commander";
  else if (score >= 2) title = "🛡 Brave Warrior";
  else title = "😂 Katappa Needs To Train You";

  return (

    <main className="min-h-screen bg-linear-to-b from-black via-[#2B0A0A] to-black flex justify-center items-center">

      <div className="bg-[#1B1B1B] p-10 rounded-2xl border border-yellow-500 w-\[550px]\ text-center">

        <h1
          className="text-5xl text-yellow-400 mb-8"
          style={{ fontFamily: "Cinzel" }}
        >
          Quiz Completed
        </h1>

        <h2 className="text-2xl mb-6">
          {title}
        </h2>

        <p className="text-6xl text-yellow-400 mb-10">

          {score} / {total}

        </p>

        <button

          onClick={() => navigate("/")}

          className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold"

        >

          Play Again

        </button>

      </div>

    </main>

  );
}

export default Result;