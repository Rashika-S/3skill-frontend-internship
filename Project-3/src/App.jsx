import{ useState , useEffect } from "react";
import confetti from "canvas-confetti";
import Header from "./components/Header";
import GameLayout from "./components/GameLayout";
import Footer from "./components/Footer";
import animals from "./data/animals.js";

function App() {
  const [selectedAnimal, setSelectedAnimal] = useState(animals[Math.floor(Math.random() * animals.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const incorrectLetters = guessedLetters.filter(
  (letter) => !selectedAnimal.word.includes(letter));
  const isWinner = selectedAnimal.word
  .split("")
  .every((letter) => guessedLetters.includes(letter));

  const isLoser = incorrectLetters.length >= 6;
  
  useEffect(() => {
    if (isWinner) {
      winSound.play();

      confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      });
    }
  }, [isWinner]);

  useEffect(() => {
    if (isLoser) {
      loseSound.play();
    }
  }, [isLoser]);

  const clickSound = new Audio("/sounds/click.mp3");
  const correctSound = new Audio("/sounds/correct.mp3");
  const wrongSound = new Audio("/sounds/wrong.mp3");
  const winSound = new Audio("/sounds/win.mp3");
  const loseSound = new Audio("/sounds/lose.mp3");

  function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;

    clickSound.currentTime = 0;
    clickSound.play();

    const updatedLetters = [...guessedLetters, letter];
    setGuessedLetters(updatedLetters);

    if (selectedAnimal.word.includes(letter)) {
      correctSound.currentTime = 0;
      correctSound.play();
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <GameLayout 
      selectedAnimal={selectedAnimal} 
      guessedLetters={guessedLetters} 
      handleGuess={handleGuess}
      incorrectLetters={incorrectLetters}
      isWinner={isWinner}
      isLoser={isLoser}
      restartGame={restartGame}
      />
      <Footer />
    </div>
  )

  function restartGame() {
    setSelectedAnimal(
      animals[Math.floor(Math.random() * animals.length)]
    );

    setGuessedLetters([]);
  }
}

export default App;