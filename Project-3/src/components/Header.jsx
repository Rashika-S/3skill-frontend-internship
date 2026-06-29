function Header() {
  return (
    <header className="bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🐾 WildWords
          </h1>

          <p className="text-sm text-gray-600">
            Guess the Animal. Save the Explorer.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border rounded-lg px-4 py-2 hover:bg-black hover:text-white transition">
            🔊 Sound
          </button>

          <button className="border rounded-lg px-4 py-2 hover:bg-black hover:text-white transition">
            🌙 Theme
          </button>

        </div>

      </div>
    </header>
  );
}

export default Header;