import ExplorerDrawing from "./ExplorerDrawing";
function ExplorerPanel({ incorrectLetters }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">

      <div className="text-8xl mb-6">
        <ExplorerDrawing 
        wrongGuesses={incorrectLetters.length}
        />
      </div>

      <h2 className="text-2xl font-bold">
        Explorer Status
      </h2>

      <p className="text-gray-400 mt-2">
        Stay alive by guessing the animal correctly.
      </p>

      <div className="mt-8 w-full">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Survival</span>
          <span>{6 - incorrectLetters.length} / 6</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
          <div className="bg-green-500 h-3 rounded-full transition-all duration-700 ease-in-out" 
                style={{ width: `${((6 - incorrectLetters.length) / 6) * 100}%`,
              }}>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ExplorerPanel;