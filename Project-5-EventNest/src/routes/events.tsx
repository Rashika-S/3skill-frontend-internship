import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { EVENTS } from "@/data/events";
import { CATEGORIES } from "@/data/categories";
import { EventGrid } from "@/components/site/EventCard";
import { SectionHeader } from "@/components/site/SectionHeader";

const searchSchema = z.object({ category: z.string().optional(), q: z.string().optional() });

export const Route = createFileRoute("/events")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Browse Events — EventNest" },
      { name: "description", content: "Search and filter 12,000+ concerts, hackathons, workshops, weddings and more." },
      { property: "og:title", content: "Browse Events on EventNest" },
      { property: "og:description", content: "Filter by category, price and date. Book instantly." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const search = useSearch({ from: "/events" });
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState<string>(search.category ?? "all");
  const [price, setPrice] = useState<number[]>([5000]);
  const [sort, setSort] = useState("popular");
  const [when, setWhen] = useState("any");

  const list = useMemo(() => {
    let out = EVENTS.slice();
    if (q) out = out.filter((e) => (e.title + " " + e.city + " " + e.categoryName).toLowerCase().includes(q.toLowerCase()));
    if (cat !== "all") out = out.filter((e) => e.category === cat);
    out = out.filter((e) => e.price <= price[0]);
    if (when !== "any") {
      const now = Date.now();
      const day = 86400000;
      const window = when === "week" ? 7 * day : when === "month" ? 30 * day : 90 * day;
      out = out.filter((e) => +new Date(e.date) - now <= window);
    }
    if (sort === "price-low") out.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") out.sort((a, b) => b.price - a.price);
    else if (sort === "date") out.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    else out.sort((a, b) => b.reviewsCount - a.reviewsCount);
    return out;
  }, [q, cat, price, sort, when]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <SectionHeader eyebrow="Discover" title="All events" subtitle={`${list.length} experiences waiting.`} />

      <div className="glass rounded-2xl p-4 md:p-5 mb-8 grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input placeholder="Search title, city, category" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9 bg-white/5 border-white/10" />
        </div>
        <div className="md:col-span-3">
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select value={when} onValueChange={setWhen}>
            <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any date</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="quarter">Next 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most popular</SelectItem>
              <SelectItem value="date">Soonest</SelectItem>
              <SelectItem value="price-low">Price: low → high</SelectItem>
              <SelectItem value="price-high">Price: high → low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1 flex items-center">
          <Badge variant="outline" className="border-white/20 whitespace-nowrap">₹0–{price[0]}</Badge>
        </div>
        <div className="md:col-span-12">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50 whitespace-nowrap">Max price</span>
            <Slider value={price} onValueChange={setPrice} min={0} max={5000} step={100} className="flex-1" />
          </div>
        </div>
      </div>

      <EventGrid events={list} />
    </div>
  );
}
