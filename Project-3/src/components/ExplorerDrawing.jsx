function ExplorerDrawing({ wrongGuesses }) {
  return (
    <>
    <p className="text-center text-gray-400 mb-4 text-lg">
      Wrong Guesses: {wrongGuesses}
    </p>
    <svg
      width="220"
      height="300"
      viewBox="0 0 220 300"
      className="mx-auto"
    >

      {/* Head */}

      {/* Hat */}

      {wrongGuesses < 1 && (
        <rect
          x="92"
          y="20"
          width="36"
          height="10"
          fill="white"
          rx="2"
        />
      )}

      <circle
        cx="110"
        cy="60"
        r="25"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />

      {/* Body */}

      <line
        x1="110"
        y1="85"
        x2="110"
        y2="170"
        stroke="white"
        strokeWidth="4"
      />

      {/* Arms */}

      <line
        x1="70"
        y1="120"
        x2="150"
        y2="120"
        stroke="white"
        strokeWidth="4"
      />

      {/* Left Leg */}

      <line
        x1="110"
        y1="170"
        x2="80"
        y2="230"
        stroke="white"
        strokeWidth="4"
      />

      {/* Right Leg */}

      <line
        x1="110"
        y1="170"
        x2="140"
        y2="230"
        stroke="white"
        strokeWidth="4"
      />

    </svg>
  </>
  );
}

export default ExplorerDrawing;