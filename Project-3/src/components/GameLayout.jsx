import GameInfo from "./GameInfo";
import ExplorerPanel from "./ExplorerPanel";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";

function GameLayout({ selectedAnimal , guessedLetters , handleGuess , incorrectLetters , isWinner , isLoser , restartGame }) {
  return (
    <main className="max-w-7xl mx-auto px-8 py-10">

      <div className="grid md:grid-cols-2 gap-10">

        {/* Left */}

        <section className="border-2 border-white rounded-xl flex items-center justify-center">

          <ExplorerPanel 
          incorrectLetters={incorrectLetters}
          />

        </section>

        {/* Right */}

        <section className="border-2 border-white rounded-xl p-6">

          <GameInfo selectedAnimal={selectedAnimal} />

          <WordDisplay selectedAnimal={selectedAnimal} guessedLetters={guessedLetters} />

            {isWinner && (
              <h2 className="text-green-400 text-3xl text-center font-bold mt-6">
                <div className="text-center mt-6">
                  <h2 className="text-4xl font-bold text-green-400">
                    🎉 Congratulations!
                  </h2>

                  <p className="text-lg text-gray-300 mt-2">
                    You Saved the Explorer!
                  </p>
                </div>
              </h2>
            )}

            {isLoser && (
              <h2 className="text-red-500 text-3xl text-center font-bold mt-6">
                <div className="text-center mt-6">
                  <h2 className="text-4xl font-bold text-red-500">
                    💀 Mission Failed
                  </h2>

                  <p className="text-lg text-gray-300 mt-2">
                    The Explorer Got Lost.
                  </p>

                  <p className="text-xl mt-3">
                    Correct Animal:
                    <span className="font-bold text-white">
                      {" "}{selectedAnimal.word}
                    </span>
                  </p>
                </div>
              </h2>
            )}

            {isWinner || isLoser ? (
              <div className="flex justify-center mt-6">
                <button
                  onClick={restartGame}
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  🔄 Play Again
                </button>
              </div>
            ) : null}
          
          <Keyboard guessedLetters={guessedLetters} handleGuess={handleGuess} isWinner={isWinner} isLoser={isLoser} />

        </section>

      </div>

    </main>
  );
}

export default GameLayout;