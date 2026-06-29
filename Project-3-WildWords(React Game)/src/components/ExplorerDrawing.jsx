function ExplorerDrawing({ wrongGuesses }) {
  return (
    <svg
      width="220"
      height="300"
      viewBox="0 0 220 300"
      className="mx-auto"
    >
      {/* Hat */}
      {wrongGuesses < 1 && (
        <>
          <ellipse cx="110" cy="36" rx="28" ry="6" fill="#8B5A2B" />
          <rect x="93" y="18" width="34" height="18" rx="4" fill="#C49A6C" />
          <rect x="90" y="32" width="40" height="6" rx="3" fill="#8B5A2B" />
        </>
      )}

      {/* Head */}
      <circle
        cx="110"
        cy="62"
        r="22"
        fill="#F2C9A0"
        stroke="#C48A5A"
        strokeWidth="2"
      />
      <circle cx="102" cy="60" r="2.2" fill="#222" />
      <circle cx="118" cy="60" r="2.2" fill="#222" />
      <path
        d="M102 70 Q110 76 118 70"
        stroke="#8B5A2B"
        strokeWidth="2"
        fill="none"
      />

      {/* Backpack */}
      {wrongGuesses < 2 && (
        <>
          <rect x="126" y="88" width="18" height="42" rx="4" fill="#7A4A1F" />
        </>
      )}

      {/* Body */}
      <rect x="92" y="84" width="36" height="56" rx="6" fill="#5E8C31" />

      {/* Map */}
      {wrongGuesses < 3 && (
        <>
        <rect
          x="56"
          y="116"
          width="22"
          height="18"
          rx="2"
          fill="#EFE3B2"
          stroke="#A08A50"
        />
      </>
      )}

      {/* Arms */}
      <line
        x1="92"
        y1="98"
        x2="70"
        y2="124"
        stroke="#F2C9A0"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="128"
        y1="98"
        x2="148"
        y2="120"
        stroke="#F2C9A0"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Torch */}
      {wrongGuesses < 4 && (
        <>
          <rect x="146" y="118" width="16" height="5" rx="2" fill="#666" />
          <circle cx="163" cy="120.5" r="4" fill="#FFD84D" />
        </>
      )}

      {/* Left Leg */}
      <line
        x1="100"
        y1="140"
        x2="92"
        y2="198"
        stroke="#355E3B"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Right Leg */}
      <line
        x1="120"
        y1="140"
        x2="128"
        y2="198"
        stroke="#355E3B"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Boots */}
      {wrongGuesses < 5 && (
        <>
          <rect x="82" y="198" width="18" height="8" rx="3" fill="#5B3A1E" />
        </>
      )}

      {wrongGuesses < 6 && (
        <>
          <rect x="120" y="198" width="18" height="8" rx="3" fill="#5B3A1E" />
        </>
      )}

      {/* Lost Face */}
      {wrongGuesses >= 6 && (
        <text
          x="110"
          y="74"
          textAnchor="middle"
          fontSize="40"
          fill="red"
        >
          ☠
        </text>
      )}
    </svg>
  );
}

export default ExplorerDrawing;