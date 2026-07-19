import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FaVolumeUp, FaVolumeMute, FaCrown } from "react-icons/fa";
import { isMuted, playSound, setMuted } from "@/lib/audio";

export function Navbar() {
  const [muted, setMutedState] = useState(false);

  useEffect(() => { setMutedState(isMuted()); }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) playSound("click");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--color-border)] bg-[rgba(15,15,15,0.55)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => playSound("click")}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-royal-red)] text-[color:var(--color-gold)] shadow-[0_0_20px_rgba(212,175,55,0.35)]">
            <FaCrown />
          </span>
          <span className="font-display text-lg sm:text-xl font-bold gold-text tracking-widest">
            BAAHUBALI QUIZ
          </span>
        </Link>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="ghost-btn grid h-10 w-10 place-items-center rounded-full text-base"
        >
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </header>
  );
}
