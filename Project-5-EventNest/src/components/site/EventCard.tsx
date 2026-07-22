import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MapPin, Star, Heart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/store";
import { format } from "date-fns";
import type { EventItem } from "@/data/events";

export function EventCard({ event, index = 0 }: { event: EventItem; index?: number }) {
  const [favs, setFavs] = useFavorites();
  const isFav = favs.includes(event.id);
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setFavs((prev) => (prev.includes(event.id) ? prev.filter((x) => x !== event.id) : [...prev, event.id]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
    >
      <Link to="/events/$slug" params={{ slug: event.slug }} className="group block">
        <div className="glass rounded-2xl overflow-hidden shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-glow border-white/10">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={event.banner}
              alt={event.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-white/10 backdrop-blur border-white/20 text-white">{event.categoryName}</Badge>
              {event.trending && <Badge className="gradient-brand text-white border-0">🔥 Trending</Badge>}
            </div>
            <button
              onClick={toggle}
              aria-label="Favorite"
              className={`absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full glass transition-all ${
                isFav ? "text-rose-400 scale-110" : "text-white hover:scale-110"
              }`}
            >
              <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
            </button>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-white/70">{format(new Date(event.date), "EEE, MMM d")}</p>
                <h3 className="mt-0.5 text-lg font-semibold text-white line-clamp-1">{event.title}</h3>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{event.time}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.city}</span>
              <span className="inline-flex items-center gap-1 ml-auto"><Star className="h-3.5 w-3.5 text-amber-400 fill-current" />{event.rating}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/50">Starts at</p>
                <p className="text-base font-semibold">
                  {event.price === 0 ? <span className="gradient-text">Free</span> : <>₹{event.price.toLocaleString("en-IN")}</>}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50 inline-flex items-center gap-1 justify-end"><Users className="h-3 w-3" />{event.seatsAvailable} left</p>
                <Button size="sm" className="mt-1 gradient-brand text-white border-0 rounded-full">Register</Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function EventGrid({ events }: { events: EventItem[] }) {
  if (!events.length) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-white/70">No events found. Try a different filter.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {events.map((e, i) => (
        <EventCard key={e.id} event={e} index={i} />
      ))}
    </div>
  );
}
