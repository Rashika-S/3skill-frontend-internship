import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/store";
import { EVENTS } from "@/data/events";
import { EventGrid } from "@/components/site/EventCard";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — EventNest" },
      { name: "description", content: "The events you've saved for later." },
      { property: "og:title", content: "My Favorites — EventNest" },
      { property: "og:description", content: "Your saved events." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => {
    const [favs] = useFavorites();
    const events = EVENTS.filter((e) => favs.includes(e.id));
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <h1 className="text-3xl font-bold">Your favorites</h1>
        <p className="text-white/60 mt-1">{events.length} saved event{events.length !== 1 ? "s" : ""}</p>
        <div className="mt-8">
          {events.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="text-white/60">No favorites yet.</p>
              <Button asChild className="mt-4 gradient-brand text-white border-0 rounded-full"><Link to="/events">Explore events</Link></Button>
            </div>
          ) : (
            <EventGrid events={events} />
          )}
        </div>
      </div>
    );
  },
});
