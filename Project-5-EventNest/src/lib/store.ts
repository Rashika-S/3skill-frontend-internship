import { useEffect, useState, useCallback } from "react";

const KEYS = {
  user: "eventnest:user",
  bookings: "eventnest:bookings",
  favorites: "eventnest:favorites",
  admin: "eventnest:admin",
  events: "eventnest:extra-events",
  profile: "eventnest:profile",
} as const;

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type Booking = {
  id: string;
  eventId: string;
  eventTitle: string;
  eventBanner: string;
  eventDate: string;
  eventVenue: string;
  tickets: number;
  total: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  createdAt: string;
  status: "confirmed" | "cancelled";
};

export type Profile = {
  phone?: string;
  address?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  notifications?: { email: boolean; sms: boolean; push: boolean };
};

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new StorageEvent("storage", { key }));
};

function useLocal<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(read<T>(key, fallback));
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key || e.key === null) setValue(read<T>(key, fallback));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        write(key, v);
        return v;
      });
    },
    [key],
  );

  return [value, set, ready] as const;
}

export const useUser = () => useLocal<User | null>(KEYS.user, null);
export const useBookings = () => useLocal<Booking[]>(KEYS.bookings, []);
export const useFavorites = () => useLocal<string[]>(KEYS.favorites, []);
export const useAdmin = () => useLocal<boolean>(KEYS.admin, false);
export const useProfile = () => useLocal<Profile>(KEYS.profile, { notifications: { email: true, sms: false, push: true } });

export const signInMock = (): User => {
  const user: User = {
    id: "u_" + Math.random().toString(36).slice(2, 9),
    name: "Aarav Sharma",
    email: "aarav@eventnest.app",
    avatar: "https://i.pravatar.cc/200?img=33",
  };
  write(KEYS.user, user);
  return user;
};

export const signOutMock = () => write(KEYS.user, null);
