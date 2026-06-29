import{ useState , useEffect , useRef} from "react";
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
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    if (isWinner) {
      if (!isMuted) {
        winSound.current.play();
      }

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [isWinner, isMuted]);

  useEffect(() => {
    if (isLoser && !isMuted) {
      loseSound.current.play();
    }
  }, [isLoser, isMuted]);

const clickSound = useRef(new Audio("/sounds/click.mp3"));
const correctSound = useRef(new Audio("/sounds/correct.mp3"));
const wrongSound = useRef(new Audio("/sounds/wrong.mp3"));
const winSound = useRef(new Audio("/sounds/win.mp3"));
const loseSound = useRef(new Audio("/sounds/lose.mp3"));

  function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;

    if(!isMuted) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }

    const updatedLetters = [...guessedLetters, letter];
    setGuessedLetters(updatedLetters);

    if (selectedAnimal.word.includes(letter)) {
      if(!isMuted) {
        correctSound.current.currentTime = 0;
        correctSound.current.play();
      }
    } else {
      if(!isMuted) {
        wrongSound.current.currentTime = 0;
        wrongSound.current.play();
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <Header
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />
      <GameLayout 
      selectedAnimal={selectedAnimal} 
      guessedLetters={guessedLetters} 
      handleGuess={handleGuess}
      incorrectLetters={incorrectLetters}
      isWinner={isWinner}
      isLoser={isLoser}
      isMuted={isMuted}
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