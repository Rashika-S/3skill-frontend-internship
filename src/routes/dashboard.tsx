import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Ticket, Heart, TrendingUp, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBookings, useFavorites, useUser } from "@/lib/store";
import { EVENTS, upcomingEvents } from "@/data/events";
import { EventCard } from "@/components/site/EventCard";
import { format } from "date-fns";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard — EventNest" },
      { name: "description", content: "Your bookings, favorites, and personalized recommendations." },
      { property: "og:title", content: "Dashboard — EventNest" },
      { property: "og:description", content: "Your event world in one place." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [user] = useUser();
  const [bookings] = useBookings();
  const [favs] = useFavorites();
  const favEvents = EVENTS.filter((e) => favs.includes(e.id)).slice(0, 4);
  const recommended = upcomingEvents().slice(0, 4);
  const stats = [
    { label: "Bookings", value: bookings.length, icon: Ticket },
    { label: "Favorites", value: favs.length, icon: Heart },
    { label: "Total spent", value: `₹${bookings.reduce((s, b) => s + b.total, 0).toLocaleString("en-IN")}`, icon: TrendingUp },
    { label: "This month", value: bookings.filter(b => new Date(b.createdAt).getMonth() === new Date().getMonth()).length, icon: Calendar },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 space-y-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-3xl p-8 shadow-soft flex flex-col md:flex-row md:items-center gap-6">
        <Avatar className="h-16 w-16 ring-2 ring-primary/50">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user?.name?.[0] ?? "A"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm text-white/60">Welcome back</p>
          <h1 className="text-2xl md:text-3xl font-bold">{user?.name ?? "Guest"} <Sparkles className="inline h-5 w-5 text-amber-300" /></h1>
          <p className="text-white/60 mt-1">You have {bookings.filter(b => b.status === "confirmed").length} upcoming bookings.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="gradient-brand text-white border-0 rounded-full"><Link to="/events">Discover events</Link></Button>
          <Button asChild variant="outline" className="border-white/15 bg-white/5 rounded-full"><Link to="/bookings">My bookings</Link></Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-white/50">{s.label}</span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 text-2xl font-bold">{s.value}</div>
          </motion.div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming bookings</h2>
          <Link to="/bookings" className="text-sm text-primary hover:underline inline-flex items-center">View all <ArrowRight className="ml-1 h-3 w-3" /></Link>
        </div>
        {bookings.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-white/60">No bookings yet — <Link to="/events" className="text-primary underline">explore events</Link>.</div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {bookings.slice(0, 4).map((b) => (
              <div key={b.id} className="glass rounded-2xl p-4 flex gap-4">
                <img src={b.eventBanner} alt="" className="h-20 w-28 object-cover rounded-xl" />
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{b.eventTitle}</div>
                  <div className="text-xs text-white/60 mt-1 flex items-center gap-1"><Calendar className="h-3 w-3" />{format(new Date(b.eventDate), "MMM d, yyyy")} <Clock className="h-3 w-3 ml-2" /> {b.tickets} tix</div>
                  <div className="text-xs text-white/50 mt-1">{b.eventVenue}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{b.total === 0 ? "Free" : `₹${b.total.toLocaleString("en-IN")}`}</div>
                  <div className="text-[10px] uppercase tracking-wide text-emerald-400 mt-1">{b.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your favorites</h2>
          <Link to="/favorites" className="text-sm text-primary hover:underline inline-flex items-center">See all <ArrowRight className="ml-1 h-3 w-3" /></Link>
        </div>
        {favEvents.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-white/60">Tap the heart on any event to save it here.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favEvents.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommended.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
        </div>
      </section>
    </div>
  );
}
