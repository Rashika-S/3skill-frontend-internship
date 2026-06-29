const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Keyboard({ guessedLetters, handleGuess , isWinner, isLoser, }) {
  return (
    <div className="grid grid-cols-7 gap-3">

      {letters.map((letter) => (

        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={guessedLetters.includes(letter) || isWinner || isLoser}
          className="
            border
            border-white
            rounded-xl
            py-4
            text-xl
            font-semibold
            hover:bg-white
            hover:text-black
            transition-all
            duration-200
            hover:scale-105
            active:scale-95

            disabled:bg-gray-700
            disabled:text-gray-400
            disabled:border-gray-600
            disabled:cursor-not-allowed
          "
        >
          {letter}
        </button>

      ))}

    </div>
  );
}

export default Keyboard;