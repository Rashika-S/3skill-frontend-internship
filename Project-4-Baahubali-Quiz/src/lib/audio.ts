// Audio helper. Place your mp3 files under /public/sounds/ with these names.
// Missing files fail silently so the app keeps working during development.

export type SoundName = "click" | "correct" | "wrong" | "win" | "lose";

const SOURCES: Record<SoundName, string> = {
  click: "/sounds/click.mp3",
  correct: "/sounds/correct.mp3",
  wrong: "/sounds/wrong.mp3",
  win: "/sounds/win.mp3",
  lose: "/sounds/lose.mp3",
};

const cache = new Map<SoundName, HTMLAudioElement>();

function getAudio(name: SoundName): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  let a = cache.get(name);
  if (!a) {
    a = new Audio(SOURCES[name]);
    a.preload = "auto";
    cache.set(name, a);
  }
  return a;
}

export function playSound(name: SoundName) {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem("bb_muted") === "1") return;
  } catch {}
  const a = getAudio(name);
  if (!a) return;
  try {
    a.currentTime = 0;
    void a.play().catch(() => {});
  } catch {}
}

export function isMuted() {
  if (typeof window === "undefined") return false;
  try { return localStorage.getItem("bb_muted") === "1"; } catch { return false; }
}

export function setMuted(muted: boolean) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem("bb_muted", muted ? "1" : "0"); } catch {}
}
