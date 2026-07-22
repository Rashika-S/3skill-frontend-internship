import { createFileRoute } from "@tanstack/react-router";
import { Camera, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookings, useFavorites, useProfile, useUser } from "@/lib/store";
import { EVENTS } from "@/data/events";
import { EventGrid } from "@/components/site/EventCard";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — EventNest" },
      { name: "description", content: "Manage your profile, notification preferences, saved events and booking history." },
      { property: "og:title", content: "Profile — EventNest" },
      { property: "og:description", content: "Your identity, your events." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [user] = useUser();
  const [profile, setProfile] = useProfile();
  const [bookings] = useBookings();
  const [favs] = useFavorites();
  const saved = EVENTS.filter((e) => favs.includes(e.id));

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10">
      <div className="glass-strong rounded-3xl p-8 shadow-soft flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24 ring-2 ring-primary/50">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback><UserIcon className="h-8 w-8" /></AvatarFallback>
          </Avatar>
          <button onClick={() => toast.info("Photo picker coming soon")} className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full gradient-brand grid place-items-center shadow-glow">
            <Camera className="h-4 w-4 text-white" />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user?.name ?? "Sign in to personalize"}</h1>
          <p className="text-white/60">{user?.email ?? "guest@eventnest.app"}</p>
          <div className="mt-3 flex gap-3 text-xs text-white/50">
            <span>{bookings.length} bookings</span>
            <span>{favs.length} favorites</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-8">
        <TabsList className="glass border-white/10">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="glass rounded-2xl p-6 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Full name</Label><Input defaultValue={user?.name} className="mt-1 bg-white/5 border-white/10" /></div>
            <div><Label>Email</Label><Input defaultValue={user?.email} className="mt-1 bg-white/5 border-white/10" /></div>
            <div><Label>Phone</Label><Input value={profile.phone ?? ""} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className="mt-1 bg-white/5 border-white/10" placeholder="+91" /></div>
            <div className="md:col-span-2"><Label>Address</Label><Input value={profile.address ?? ""} onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))} className="mt-1 bg-white/5 border-white/10" placeholder="Street, City, PIN" /></div>
            <div><Label>Twitter</Label><Input value={profile.twitter ?? ""} onChange={(e) => setProfile((p) => ({ ...p, twitter: e.target.value }))} className="mt-1 bg-white/5 border-white/10" placeholder="@handle" /></div>
            <div><Label>LinkedIn</Label><Input value={profile.linkedin ?? ""} onChange={(e) => setProfile((p) => ({ ...p, linkedin: e.target.value }))} className="mt-1 bg-white/5 border-white/10" placeholder="linkedin.com/in/…" /></div>
            <div><Label>Instagram</Label><Input value={profile.instagram ?? ""} onChange={(e) => setProfile((p) => ({ ...p, instagram: e.target.value }))} className="mt-1 bg-white/5 border-white/10" placeholder="@handle" /></div>
            <div className="md:col-span-2 flex justify-end"><Button onClick={() => toast.success("Profile saved")} className="gradient-brand text-white border-0 rounded-full">Save changes</Button></div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="glass rounded-2xl p-6 mt-4 space-y-4">
            {(["email", "sms", "push"] as const).map((k) => (
              <div key={k} className="flex items-center justify-between">
                <div>
                  <div className="font-medium capitalize">{k} notifications</div>
                  <div className="text-xs text-white/50">Get updates about your bookings and new events.</div>
                </div>
                <Switch checked={profile.notifications?.[k]} onCheckedChange={(v) => setProfile((p) => ({ ...p, notifications: { ...(p.notifications ?? { email: false, sms: false, push: false }), [k]: v } }))} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="mt-4">
            {saved.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center text-white/60">Nothing saved yet.</div>
            ) : <EventGrid events={saved} />}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="glass rounded-2xl mt-4 divide-y divide-white/10">
            {bookings.length === 0 && <div className="p-6 text-white/60 text-center">No booking history yet.</div>}
            {bookings.map((b) => (
              <div key={b.id} className="p-4 flex items-center gap-4">
                <img src={b.eventBanner} className="h-14 w-20 object-cover rounded-lg" alt="" />
                <div className="flex-1">
                  <div className="font-medium">{b.eventTitle}</div>
                  <div className="text-xs text-white/50">{new Date(b.createdAt).toLocaleDateString()} · {b.tickets} tickets</div>
                </div>
                <div className="text-sm font-semibold">{b.total === 0 ? "Free" : `₹${b.total.toLocaleString("en-IN")}`}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
