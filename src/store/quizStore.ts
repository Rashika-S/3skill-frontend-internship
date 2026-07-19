import { create } from "zustand";

export type Player = {
  id: string;
  name: string;
  isHost: boolean;
  score: number;
  avatar: string;
};

export type Mode = "solo" | "host" | "join" | null;

type State = {
  mode: Mode;
  playerName: string;
  roomCode: string;
  players: Player[];
  currentQuestion: number;
  score: number;
  answers: Array<{ questionId: number; selected: number | null; correct: boolean }>;
  setMode: (m: Mode) => void;
  setPlayerName: (n: string) => void;
  setRoomCode: (c: string) => void;
  createRoom: (name: string) => string;
  joinRoom: (name: string, code: string) => void;
  startSolo: (name: string) => void;
  addMockPlayers: () => void;
  reset: () => void;
  setCurrentQuestion: (n: number) => void;
  recordAnswer: (questionId: number, selected: number | null, isCorrect: boolean) => void;
  finalizeScores: () => void;
};

const AVATARS = ["👑", "⚔️", "🛡️", "🏹", "🐘"];

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

const MOCK_NAMES = ["Kattappa", "Devasena", "Bhalla", "Avantika"];

export const useQuizStore = create<State>((set, get) => ({
  mode: null,
  playerName: "",
  roomCode: "",
  players: [],
  currentQuestion: 0,
  score: 0,
  answers: [],

  setMode: (m) => set({ mode: m }),
  setPlayerName: (n) => set({ playerName: n }),
  setRoomCode: (c) => set({ roomCode: c.toUpperCase() }),

  createRoom: (name) => {
    const code = randomCode();
    const host: Player = { id: "me", name: name || "Host", isHost: true, score: 0, avatar: AVATARS[0] };
    set({ mode: "host", playerName: name, roomCode: code, players: [host], currentQuestion: 0, score: 0, answers: [] });
    return code;
  },

  joinRoom: (name, code) => {
    const host: Player = { id: "host", name: "Host", isHost: true, score: 0, avatar: AVATARS[0] };
    const me: Player = { id: "me", name: name || "You", isHost: false, score: 0, avatar: AVATARS[1] };
    const extras: Player[] = MOCK_NAMES.slice(0, 2).map((n, i) => ({
      id: `p${i + 2}`, name: n, isHost: false, score: 0, avatar: AVATARS[i + 2],
    }));
    set({ mode: "join", playerName: name, roomCode: code.toUpperCase(), players: [host, me, ...extras], currentQuestion: 0, score: 0, answers: [] });
  },

  startSolo: (name) => {
    const me: Player = { id: "me", name: name || "Warrior", isHost: true, score: 0, avatar: AVATARS[0] };
    set({ mode: "solo", playerName: name, roomCode: "", players: [me], currentQuestion: 0, score: 0, answers: [] });
  },

  addMockPlayers: () => {
    const { players } = get();
    const meAndHost = players;
    const needed = 5 - meAndHost.length;
    if (needed <= 0) return;
    const extras: Player[] = MOCK_NAMES.slice(0, needed).map((n, i) => ({
      id: `mock-${i}`, name: n, isHost: false, score: 0, avatar: AVATARS[(meAndHost.length + i) % AVATARS.length],
    }));
    set({ players: [...meAndHost, ...extras].slice(0, 5) });
  },

  reset: () => set({ mode: null, playerName: "", roomCode: "", players: [], currentQuestion: 0, score: 0, answers: [] }),

  setCurrentQuestion: (n) => set({ currentQuestion: n }),

  recordAnswer: (questionId, selected, isCorrect) => {
    const { answers, score } = get();
    set({
      answers: [...answers, { questionId, selected, correct: isCorrect }],
      score: score + (isCorrect ? 100 : 0),
    });
  },

  finalizeScores: () => {
    const { players, score, mode } = get();
    if (mode === "solo") {
      set({ players: players.map((p) => (p.id === "me" ? { ...p, score } : p)) });
      return;
    }
    // Simulate other players' scores relative to yours for a fun leaderboard.
    const updated = players.map((p) => {
      if (p.id === "me") return { ...p, score };
      const jitter = Math.floor(Math.random() * 700) + 300;
      return { ...p, score: Math.max(0, jitter) };
    });
    set({ players: updated });
  },
}));
