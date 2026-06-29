import GameInfo from "./GameInfo";
import ExplorerPanel from "./ExplorerPanel";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";

function GameLayout({
  selectedAnimal,
  guessedLetters,
  handleGuess,
  incorrectLetters,
  isWinner,
  isLoser,
  restartGame,
}) {
  return (
    <main className="max-w-7xl mx-auto px-20 py-12">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Left */}
        <section className="bg-gray-800/70 backdrop-blur-md border border-gray-700 hover:border-gray-500 hover:shadow-2xl transition-all duration-300 rounded-xl p-6">
         <ExplorerPanel incorrectLetters={incorrectLetters} />
        </section>

        {/* Right */}
        <section className="bg-gray-800/70 backdrop-blur-md border border-gray-700 hover:border-gray-500 hover:shadow-2xl transition-all duration-300 rounded-xl p-6">

          <GameInfo selectedAnimal={selectedAnimal} />

          <WordDisplay
            selectedAnimal={selectedAnimal}
            guessedLetters={guessedLetters}
            isLoser={isLoser}
          />

          {/* Win */}
          {isWinner && (
            <div className="text-center mt-6">
              <h2 className="text-4xl font-bold text-green-400">
                🎉 Congratulations!
              </h2>

              <p className="text-lg text-gray-300 mt-2">
                You Saved the Explorer!
              </p>
            </div>
          )}

          {/* Lose */}
          {isLoser && (
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
                  {" "}
                  {selectedAnimal.word}
                </span>
              </p>
            </div>
          )}

          {/* Keyboard */}
          {!(isWinner || isLoser) && (
            <Keyboard
              guessedLetters={guessedLetters}
              handleGuess={handleGuess}
              isWinner={isWinner}
              isLoser={isLoser}
            />
          )}

          {/* Restart */}
          {(isWinner || isLoser) && (
            <div className="flex justify-center mt-6">
              <button
                onClick={restartGame}
                className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                >
                🔄 Play Again
              </button>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}

export default GameLayout;