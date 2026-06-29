function GameInfo({selectedAnimal}) {
  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm uppercase tracking-widest text-gray-400">
          Category
        </p>

        <h2 className="text-3xl font-bold">
          🐾 Animal Kingdom
        </h2>
      </div>

      <div>
        <p className="text-sm uppercase tracking-widest text-gray-400">
          💡 Jungle Hint
        </p>

        <p className="text-lg mt-2">
          {selectedAnimal.hint}
        </p>
      </div>

      <div>
        <p className="text-sm uppercase tracking-widest text-gray-400">
          🧭 Survival Chances
        </p>

        <p className="text-2xl font-bold">
          6 / 6
        </p>
      </div>

    </div>
  );
}

export default GameInfo;