import { useLocation, useNavigate } from "react-router-dom";
import { FaCrown, FaMedal } from "react-icons/fa";

function Leaderboard() {
  const navigate = useNavigate();

  const { state } = useLocation();

  const score = state?.score || 0;
  const total = state?.total || 5;

  const players = [
    { name: "Rashika", score: score },
    { name: "Katappa", score: 4 },
    { name: "Avantika", score: 3 },
    { name: "Devasena", score: 2 },
    { name: "Bhallaladeva", score: 1 },
  ].sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-linear-to-b from-black via-[#2B0A0A] to-black flex justify-center items-center">

      <div className="bg-[#1B1B1B] rounded-2xl border border-yellow-500 w-\[650px]\ p-10">

        <h1
          className="text-5xl text-yellow-400 text-center mb-10"
          style={{ fontFamily: "Cinzel" }}
        >
          👑 Royal Rankings
        </h1>

        <div className="space-y-5">

          {players.map((player, index) => (

            <div
              key={index}
              className="bg-[#252525] rounded-xl p-5 flex justify-between items-center hover:bg-[#333] transition"
            >

              <div className="flex items-center gap-5">

                <div className="text-2xl">

                  {index === 0 && <FaCrown className="text-yellow-400" />}
                  {index === 1 && <FaMedal className="text-gray-300" />}
                  {index === 2 && <FaMedal className="text-orange-500" />}

                </div>

                <h2 className="text-xl">{player.name}</h2>

              </div>

              <span className="text-yellow-400 text-xl font-bold">

                {player.score} / {total}

              </span>

            </div>

          ))}

        </div>

        <button

          onClick={() =>
            navigate("/result", {
              state: { score, total },
            })
          }

          className="mt-10 w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-bold"

        >

          Continue

        </button>

      </div>

    </main>
  );
}

export default Leaderboard;