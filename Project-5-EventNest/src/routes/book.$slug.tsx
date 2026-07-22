import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, ShieldCheck, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { eventBySlug } from "@/data/events";
import { useBookings, useUser } from "@/lib/store";
import { format } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$slug")({
  loader: ({ params }) => {
    const ev = eventBySlug(params.slug);
    if (!ev) throw notFound();
    return { event: ev };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Book ${loaderData.event.title} — EventNest` : "Book — EventNest" },
      { name: "description", content: "Complete your booking in a few clicks." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const { event } = Route.useLoaderData();
  const [user] = useUser();
  const [, setBookings] = useBookings();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(1);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState<string | null>(null);

  const total = tickets * event.price;

  const submit = () => {
    if (!name || !email) { toast.error("Please fill guest details"); return; }
    const id = "bk_" + Math.random().toString(36).slice(2, 10);
    setBookings((prev) => [
      { id, eventId: event.id, eventTitle: event.title, eventBanner: event.banner, eventDate: event.date, eventVenue: `${event.venue}, ${event.city}`, tickets, total, guestName: name, guestEmail: email, guestPhone: phone, createdAt: new Date().toISOString(), status: "confirmed" },
      ...prev,
    ]);
    setDone(id);
    toast.success("Booking confirmed 🎉");
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-strong rounded-3xl p-10 text-center shadow-glow">
          <div className="mx-auto h-16 w-16 rounded-full gradient-brand grid place-items-center shadow-glow">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-5 text-3xl font-bold">You're in! 🎉</h1>
          <p className="mt-2 text-white/70">Confirmation <span className="font-mono text-primary">#{done}</span> has been added to your bookings.</p>
          <div className="mt-6 glass rounded-2xl p-4 text-left flex gap-4">
            <img src={event.banner} className="h-20 w-28 object-cover rounded-lg" alt="" />
            <div>
              <div className="font-medium">{event.title}</div>
              <div className="text-xs text-white/60">{format(new Date(event.date), "EEE, MMM d, yyyy")} · {event.time}</div>
              <div className="text-xs text-white/60">{event.venue}, {event.city}</div>
              <div className="mt-1 text-sm">{tickets} ticket{tickets > 1 ? "s" : ""} · <span className="font-semibold">{total === 0 ? "Free" : `₹${total.toLocaleString("en-IN")}`}</span></div>
            </div>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <Button onClick={() => navigate({ to: "/bookings" })} className="gradient-brand text-white border-0 rounded-full">View my bookings</Button>
            <Button onClick={() => navigate({ to: "/events" })} variant="outline" className="rounded-full border-white/20 bg-white/5">Explore more</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold">1 · Select tickets</h2>
          <div className="mt-4 flex items-center justify-between glass rounded-xl p-4">
            <div>
              <div className="font-medium">General admission</div>
              <div className="text-xs text-white/60">{event.price === 0 ? "Free" : `₹${event.price.toLocaleString("en-IN")} per ticket`}</div>
            </div>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="outline" className="rounded-full border-white/20 bg-white/5" onClick={() => setTickets((t) => Math.max(1, t - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-6 text-center font-semibold">{tickets}</span>
              <Button size="icon" variant="outline" className="rounded-full border-white/20 bg-white/5" onClick={() => setTickets((t) => Math.min(10, t + 1))}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold">2 · Guest details</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Full name</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 bg-white/5 border-white/10" placeholder="Aarav Sharma" /></div>
            <div><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-white/5 border-white/10" placeholder="you@example.com" /></div>
            <div className="md:col-span-2"><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 bg-white/5 border-white/10" placeholder="+91" /></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass-strong rounded-2xl p-6 shadow-glow sticky top-24">
          <h3 className="font-semibold">Booking summary</h3>
          <div className="mt-4 flex gap-3">
            <img src={event.banner} className="h-16 w-24 object-cover rounded-lg" alt="" />
            <div>
              <div className="text-sm font-medium line-clamp-2">{event.title}</div>
              <div className="text-xs text-white/60 mt-0.5">{format(new Date(event.date), "MMM d")} · {event.time}</div>
            </div>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between text-white/70"><span>{tickets} × ticket</span><span>{event.price === 0 ? "Free" : `₹${(event.price * tickets).toLocaleString("en-IN")}`}</span></div>
            <div className="flex justify-between text-white/70"><span>Convenience fee</span><span>{event.price === 0 ? "—" : "₹0"}</span></div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{total === 0 ? "Free" : `₹${total.toLocaleString("en-IN")}`}</span></div>
          </div>
          <Button size="lg" onClick={submit} className="mt-5 w-full gradient-brand text-white border-0 rounded-xl">
            <Ticket className="h-4 w-4 mr-2" />Confirm booking
          </Button>
          <p className="mt-3 text-xs text-white/50 inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" />Payments are simulated in this demo.</p>
        </div>
      </div>
    </div>
  );
}
