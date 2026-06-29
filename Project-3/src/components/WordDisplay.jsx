function WordDisplay({ selectedAnimal, guessedLetters }) {
  return (
    <div className="my-10">

      <p className="text-sm uppercase tracking-widest text-gray-400 text-center mb-5">
        Guess the Animal
      </p>

      <div className="flex justify-center gap-4 flex-wrap">

        {selectedAnimal.word.split("").map((letter, index) => (

        <span
          key={index}
          className="text-5xl font-bold border-b-4 border-white w-10 text-center"
        >
          {guessedLetters.includes(letter) ? letter : "_"}
        </span>

        ))}

      </div>

    </div>
  );
}

export default WordDisplay;