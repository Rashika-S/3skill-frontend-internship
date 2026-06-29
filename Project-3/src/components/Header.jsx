import SoundButton from "./SoundButton";

function Header({ isMuted, setIsMuted }) {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🐾 WildWords
          </h1>

          <p className="text-sm text-blue-200">
            Guess the Animal. Save the Explorer.
          </p>
        </div>

        <SoundButton
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />

      </div>
    </header>
  );
}

export default Header;