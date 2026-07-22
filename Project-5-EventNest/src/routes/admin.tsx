import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Ticket, DollarSign, TrendingUp, Plus, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAdmin, useBookings } from "@/lib/store";
import { EVENTS } from "@/data/events";
import { CATEGORIES } from "@/data/categories";
import { ORGANIZERS } from "@/data/misc";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — EventNest" },
      { name: "description", content: "Manage events, users and bookings from your EventNest control center." },
      { property: "og:title", content: "Admin Dashboard — EventNest" },
      { property: "og:description", content: "Analytics, events, users, bookings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const REV_DATA = [
  { m: "Jan", r: 42000 }, { m: "Feb", r: 51000 }, { m: "Mar", r: 68000 },
  { m: "Apr", r: 74000 }, { m: "May", r: 92000 }, { m: "Jun", r: 88000 },
  { m: "Jul", r: 110000 }, { m: "Aug", r: 128000 }, { m: "Sep", r: 155000 },
];
const CAT_DATA = CATEGORIES.slice(0, 8).map((c) => ({ name: c.name.split(" ")[0], bookings: Math.floor(Math.random() * 100) + 20 }));

function AdminPage() {
  const [admin, setAdmin] = useAdmin();
  const [pin, setPin] = useState("");
  const [bookings] = useBookings();

  if (!admin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong rounded-3xl p-8 max-w-sm w-full text-center shadow-glow">
          <div className="mx-auto h-12 w-12 rounded-xl gradient-brand grid place-items-center shadow-glow"><Shield className="h-6 w-6 text-white" /></div>
          <h1 className="mt-4 text-xl font-bold">Admin login</h1>
          <p className="text-sm text-white/60 mt-1">Enter demo PIN <span className="font-mono">0000</span></p>
          <div className="mt-5 space-y-3 text-left">
            <div><Label>Email</Label><Input defaultValue="admin@eventnest.app" className="mt-1 bg-white/5 border-white/10" /></div>
            <div><Label>PIN</Label><Input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="0000" className="mt-1 bg-white/5 border-white/10" /></div>
          </div>
          <Button onClick={() => { if (pin === "0000") { setAdmin(true); toast.success("Signed in as admin"); } else toast.error("Wrong PIN"); }} className="mt-5 w-full gradient-brand text-white border-0 rounded-xl">Enter dashboard</Button>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { label: "Total Events", value: EVENTS.length, icon: Ticket, delta: "+12%" },
    { label: "Total Users", value: "8,421", icon: Users, delta: "+8%" },
    { label: "Total Bookings", value: bookings.length + 1284, icon: TrendingUp, delta: "+21%" },
    { label: "Revenue", value: "₹8.4L", icon: DollarSign, delta: "+15%" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Control center</p>
          <h1 className="text-3xl font-bold">Admin dashboard</h1>
        </div>
        <Button variant="outline" className="border-white/15 bg-white/5" onClick={() => setAdmin(false)}>Sign out</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-white/50">{s.label}</span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-emerald-400 mt-1">{s.delta} vs last month</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Revenue trend</h3>
            <Badge variant="outline" className="border-white/20">2026 YTD</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REV_DATA}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.2 285)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.68 0.2 285)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="m" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "rgba(20,20,30,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Area dataKey="r" stroke="oklch(0.68 0.2 285)" strokeWidth={2} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Bookings by category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CAT_DATA}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "rgba(20,20,30,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Bar dataKey="bookings" fill="oklch(0.62 0.2 265)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Tabs defaultValue="events">
        <TabsList className="glass border-white/10">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <div className="glass rounded-2xl mt-4">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="font-semibold">Manage events</h3>
              <Button size="sm" className="gradient-brand text-white border-0"><Plus className="h-4 w-4 mr-1" />Add event</Button>
            </div>
            <div className="divide-y divide-white/10">
              {EVENTS.slice(0, 10).map((e) => (
                <div key={e.id} className="p-4 flex items-center gap-4">
                  <img src={e.banner} className="h-12 w-16 object-cover rounded-lg" alt="" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{e.title}</div>
                    <div className="text-xs text-white/50">{e.categoryName} · {e.city}</div>
                  </div>
                  <div className="text-sm font-semibold hidden md:block">{e.price === 0 ? "Free" : `₹${e.price.toLocaleString("en-IN")}`}</div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => toast.info("Edit form (demo)")}><Edit3 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => toast.success("Event removed (demo)")}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="glass rounded-2xl p-5 mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((c) => (
              <div key={c.slug} className="glass rounded-xl p-4">
                <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${c.gradient} grid place-items-center`}><c.icon className="h-4 w-4 text-white" /></div>
                <div className="mt-2 text-sm font-medium">{c.name}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="glass rounded-2xl mt-4 divide-y divide-white/10">
            {ORGANIZERS.map((o) => (
              <div key={o.handle} className="p-4 flex items-center gap-4">
                <img src={o.avatar} className="h-10 w-10 rounded-full" alt="" />
                <div className="flex-1">
                  <div className="font-medium">{o.name}</div>
                  <div className="text-xs text-white/50">{o.handle}</div>
                </div>
                <Badge className="glass border-white/20">{o.events} events</Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <div className="glass rounded-2xl mt-4 divide-y divide-white/10">
            {bookings.length === 0 && <div className="p-6 text-center text-white/60">No user bookings yet.</div>}
            {bookings.map((b) => (
              <div key={b.id} className="p-4 flex items-center gap-4">
                <img src={b.eventBanner} className="h-10 w-14 object-cover rounded" alt="" />
                <div className="flex-1"><div className="text-sm font-medium">{b.eventTitle}</div><div className="text-xs text-white/50">{b.guestName} · {b.guestEmail}</div></div>
                <Badge className={b.status === "cancelled" ? "bg-red-500/20 text-red-300 border-0" : "gradient-brand text-white border-0"}>{b.status}</Badge>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
