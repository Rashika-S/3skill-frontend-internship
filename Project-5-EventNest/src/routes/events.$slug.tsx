import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Star, Heart, Share2, CalendarPlus, Ticket, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventBySlug, EVENTS } from "@/data/events";
import { FAQS } from "@/data/misc";
import { EventCard } from "@/components/site/EventCard";
import { useFavorites } from "@/lib/store";
import { format } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const ev = eventBySlug(params.slug);
    if (!ev) throw notFound();
    return { event: ev };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Event not found" }, { name: "robots", content: "noindex" }] };
    const ev = loaderData.event;
    return {
      meta: [
        { title: `${ev.title} — EventNest` },
        { name: "description", content: ev.description.slice(0, 160) },
        { property: "og:title", content: ev.title },
        { property: "og:description", content: ev.description.slice(0, 160) },
        { property: "og:image", content: ev.banner },
        { name: "twitter:image", content: ev.banner },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const data = Route.useLoaderData() as { event: import("@/data/events").EventItem };
  const event = data.event;
  const [favs, setFavs] = useFavorites();
  const navigate = useNavigate();
  const isFav = favs.includes(event.id);
  const similar = EVENTS.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative overflow-hidden rounded-3xl">
        <img src={event.banner} alt={event.title} className="w-full h-[380px] md:h-[520px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="flex gap-2 mb-3">
            <Badge className="gradient-brand text-white border-0">{event.categoryName}</Badge>
            {event.trending && <Badge className="glass border-white/30">🔥 Trending</Badge>}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">{event.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{format(new Date(event.date), "EEE, MMM d, yyyy")}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{event.time}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{event.venue}, {event.city}</span>
            <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 text-amber-400 fill-current" />{event.rating} ({event.reviewsCount})</span>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold">About this event</h2>
            <p className="mt-3 text-white/70 leading-relaxed">{event.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {event.tags.map((t) => <Badge key={t} variant="outline" className="border-white/20">#{t}</Badge>)}
            </div>
          </div>

          <Tabs defaultValue="schedule">
            <TabsList className="glass border-white/10">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="schedule" className="mt-4">
              <div className="glass rounded-2xl p-6 space-y-4">
                {event.schedule.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-24 text-sm font-medium text-primary">{s.time}</div>
                    <div>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-sm text-white/60">{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="speakers" className="mt-4">
              <div className="glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {event.speakers.map((sp) => (
                  <div key={sp.name} className="text-center">
                    <Avatar className="h-16 w-16 mx-auto"><AvatarImage src={sp.avatar} /><AvatarFallback>{sp.name[0]}</AvatarFallback></Avatar>
                    <div className="mt-2 text-sm font-medium">{sp.name}</div>
                    <div className="text-xs text-white/50">{sp.role}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {event.gallery.map((g, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl aspect-square">
                    <img src={g} alt="" className="h-full w-full object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="venue" className="mt-4">
              <div className="glass rounded-2xl overflow-hidden">
                <div className="aspect-[16/8] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 grid place-items-center relative">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200')] bg-cover bg-center opacity-40" />
                  <div className="relative text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm text-white/60">{event.city}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-white/70">Interactive maps enabled at check-out. Free parking, accessible entry, and lounge available on-site.</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="glass rounded-2xl p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Avatar><AvatarImage src={`https://i.pravatar.cc/150?img=${20 + i}`} /><AvatarFallback>U</AvatarFallback></Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-sm">Verified attendee</div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, x) => <Star key={x} className="h-3 w-3 text-amber-400 fill-current" />)}
                        </div>
                      </div>
                      <p className="text-sm text-white/70 mt-1">Genuinely one of the best events I've been to this year. Production was 10/10.</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3">FAQ</h3>
            <Accordion type="single" collapsible>
              {FAQS.slice(0, 5).map((f, i) => (
                <AccordionItem key={i} value={"q" + i} className="border-white/10">
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-white/70">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="glass-strong rounded-2xl p-6 sticky top-24 shadow-glow">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{event.price === 0 ? "Free" : `₹${event.price.toLocaleString("en-IN")}`}</span>
              {event.price > 0 && <span className="text-sm text-white/50">/ticket</span>}
            </div>
            <div className="mt-2 text-sm text-white/60 flex items-center gap-2">
              <Users className="h-4 w-4" /> {event.seatsAvailable} of {event.totalSeats} seats left
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full gradient-brand" style={{ width: `${(1 - event.seatsAvailable / event.totalSeats) * 100}%` }} />
            </div>

            <Button
              size="lg"
              className="mt-5 w-full gradient-brand text-white border-0 rounded-xl"
              onClick={() => navigate({ to: "/book/$slug", params: { slug: event.slug } })}
            >
              <Ticket className="mr-2 h-4 w-4" /> Register now
            </Button>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button variant="outline" className="border-white/15 bg-white/5" onClick={() => { setFavs((p) => p.includes(event.id) ? p.filter(x => x !== event.id) : [...p, event.id]); toast.success(isFav ? "Removed from favorites" : "Saved to favorites"); }}>
                <Heart className={`h-4 w-4 ${isFav ? "fill-rose-400 text-rose-400" : ""}`} />
              </Button>
              <Button variant="outline" className="border-white/15 bg-white/5" onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied"); }}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/15 bg-white/5" onClick={() => toast.success("Added to calendar")}>
                <CalendarPlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 flex items-center gap-3">
              <Avatar><AvatarImage src={event.organizerAvatar} /><AvatarFallback>{event.organizer[0]}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="text-xs text-white/50">Organizer</div>
                <div className="text-sm font-medium">{event.organizer}</div>
              </div>
              <Button size="sm" variant="ghost" className="text-primary">Follow</Button>
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Similar events</h2>
            <Link to="/events" className="text-sm text-primary hover:underline inline-flex items-center">See all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similar.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
