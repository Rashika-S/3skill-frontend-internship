function SoundButton({ isMuted, setIsMuted }) {
  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl transition-all"
    >
      {isMuted ? "🔇" : "🔊"}
    </button>
  );
}

export default SoundButton;