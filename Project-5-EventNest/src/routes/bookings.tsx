import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Download, Share2, CalendarPlus, XCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookings } from "@/lib/store";
import { format } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My Bookings — EventNest" },
      { name: "description", content: "Manage your event tickets, download passes, and share with friends." },
      { property: "og:title", content: "My Bookings — EventNest" },
      { property: "og:description", content: "Every ticket you own, in one place." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingsPage,
});

function BookingsPage() {
  const [bookings, setBookings] = useBookings();

  const cancel = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)));
    toast.success("Booking cancelled");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-bold">My bookings</h1>
      <p className="text-white/60 mt-1">All your tickets, past and present.</p>

      <div className="mt-8 space-y-4">
        {bookings.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center">
            <p className="text-white/60">You haven't booked anything yet.</p>
            <Button asChild className="mt-4 gradient-brand text-white border-0 rounded-full"><Link to="/events">Browse events</Link></Button>
          </div>
        )}

        {bookings.map((b) => (
          <div key={b.id} className="glass rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <img src={b.eventBanner} alt="" className="md:w-64 h-40 md:h-auto object-cover" />
            <div className="p-5 flex-1 flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge className={b.status === "cancelled" ? "bg-red-500/20 text-red-300 border-0" : "gradient-brand text-white border-0"}>{b.status}</Badge>
                  <span className="text-xs text-white/50 font-mono">#{b.id}</span>
                </div>
                <h3 className="mt-2 font-semibold text-lg">{b.eventTitle}</h3>
                <div className="mt-1 text-sm text-white/60 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{format(new Date(b.eventDate), "EEE, MMM d, yyyy")}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{b.eventVenue}</span>
                </div>
                <div className="mt-2 text-sm">{b.tickets} ticket{b.tickets > 1 ? "s" : ""} · <span className="font-semibold">{b.total === 0 ? "Free" : `₹${b.total.toLocaleString("en-IN")}`}</span></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                <Button size="sm" variant="outline" className="border-white/15 bg-white/5" onClick={() => toast.success("Ticket downloaded")}><Download className="h-3.5 w-3.5 mr-1" />Download</Button>
                <Button size="sm" variant="outline" className="border-white/15 bg-white/5" onClick={() => { navigator.clipboard?.writeText(`${location.origin}/bookings/${b.id}`); toast.success("Share link copied"); }}><Share2 className="h-3.5 w-3.5 mr-1" />Share</Button>
                <Button size="sm" variant="outline" className="border-white/15 bg-white/5" onClick={() => toast.success("Added to calendar")}><CalendarPlus className="h-3.5 w-3.5 mr-1" />Calendar</Button>
                {b.status === "confirmed" && (
                  <Button size="sm" variant="outline" className="border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20" onClick={() => cancel(b.id)}><XCircle className="h-3.5 w-3.5 mr-1" />Cancel</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
