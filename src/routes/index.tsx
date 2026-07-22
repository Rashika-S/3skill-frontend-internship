import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, Calendar, Shield, Zap, Ticket, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventGrid } from "@/components/site/EventCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CATEGORIES } from "@/data/categories";
import { featuredEvents, trendingEvents, upcomingEvents } from "@/data/events";
import { TESTIMONIALS, PARTNERS } from "@/data/misc";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EventNest — Discover, Book, and Celebrate Events" },
      { name: "description", content: "The premium event platform for concerts, hackathons, weddings and everything in between." },
      { property: "og:title", content: "EventNest — Smart Event Management Platform" },
      { property: "og:description", content: "Discover, book and celebrate events. Curated, beautiful, effortless." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <Hero />
      <Featured />
      <Trending />
      <Categories />
      <Upcoming />
      <WhyUs />
      <Testimonials />
      <Partners />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl mt-6 md:mt-10 hero-bg">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl animate-pulse" />
      </div>
      <div className="relative px-6 md:px-14 py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge className="glass border-white/20 text-white/80 rounded-full px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1 text-amber-300" /> India's most-loved event platform
          </Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl"
        >
          Every event you love,
          <br className="hidden md:block" />{" "}
          <span className="gradient-text">wrapped in one nest.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-white/70 md:text-lg max-w-2xl"
        >
          From backstage passes to backyard birthdays. Discover, book, and celebrate — with a booking flow that actually feels premium.
        </motion.p>

        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 glass-strong rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl shadow-glow"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input placeholder="Concerts, hackathons, weddings…" className="pl-9 h-12 bg-transparent border-0 focus-visible:ring-0 text-base" />
          </div>
          <Button asChild size="lg" className="h-12 gradient-brand text-white border-0 rounded-xl px-6">
            <Link to="/events">Explore <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </motion.form>

        <div className="mt-10 grid grid-cols-3 max-w-md gap-6">
          {[
            { k: "1.2M+", v: "tickets booked" },
            { k: "12k+", v: "curated events" },
            { k: "50+", v: "cities" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-2xl md:text-3xl font-bold gradient-text">{s.k}</div>
              <div className="text-xs md:text-sm text-white/60">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="mt-24">
      <SectionHeader eyebrow="Handpicked" title="Featured events" subtitle="Editor-approved experiences you don't want to miss." action={<Button asChild variant="ghost" className="rounded-full"><Link to="/events">See all <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>} />
      <EventGrid events={featuredEvents()} />
    </section>
  );
}

function Trending() {
  return (
    <section className="mt-24">
      <SectionHeader eyebrow="🔥 Right now" title="Trending in your city" subtitle="What thousands are booking this week." />
      <EventGrid events={trendingEvents()} />
    </section>
  );
}

function Categories() {
  return (
    <section className="mt-24">
      <SectionHeader eyebrow="Explore" title="Every kind of gathering" subtitle="18 categories, one nest. Find your vibe." action={<Button asChild variant="ghost" className="rounded-full"><Link to="/categories">All categories <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {CATEGORIES.slice(0, 12).map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.02 }}>
            <Link to="/categories/$slug" params={{ slug: c.slug }} className="group block">
              <div className="glass rounded-2xl p-4 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-glow">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${c.gradient} grid place-items-center shadow-glow`}>
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <div className="mt-3 text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-white/50 mt-0.5">{c.blurb}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Upcoming() {
  return (
    <section className="mt-24">
      <SectionHeader eyebrow="Save the date" title="Upcoming this month" />
      <EventGrid events={upcomingEvents()} />
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Zap, title: "Book in 12 seconds", desc: "A checkout so fast you'll forget you paid." },
    { icon: Shield, title: "Secure & guaranteed", desc: "Every ticket verified. Every refund honored." },
    { icon: Calendar, title: "Live calendar sync", desc: "Never miss an event with instant reminders." },
    { icon: Ticket, title: "One tap re-entry", desc: "Your ticket lives in your pocket, always." },
  ];
  return (
    <section className="mt-24">
      <SectionHeader eyebrow="Why EventNest" title="Built for the way you actually plan" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <motion.div key={it.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass rounded-2xl p-6 hover:shadow-glow transition-all hover:-translate-y-1">
            <div className="h-11 w-11 rounded-xl gradient-brand grid place-items-center shadow-glow">
              <it.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mt-4 font-semibold text-lg">{it.title}</h3>
            <p className="mt-1 text-sm text-white/60">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mt-24">
      <SectionHeader eyebrow="Loved by" title="What our community says" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
            className="glass rounded-2xl p-5">
            <Quote className="h-5 w-5 text-primary/70" />
            <p className="mt-3 text-sm text-white/80 leading-relaxed">"{t.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar className="h-9 w-9"><AvatarImage src={t.avatar} /><AvatarFallback>{t.name[0]}</AvatarFallback></Avatar>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-white/50">{t.role}</div>
              </div>
              <div className="ml-auto flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 text-amber-400 fill-current" />)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="mt-24">
      <SectionHeader eyebrow="Trusted by" title="Powering the world's best events" />
      <div className="glass rounded-3xl p-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
        {PARTNERS.map((p) => (
          <div key={p} className="text-center text-white/70 font-display font-semibold text-lg tracking-tight opacity-80 hover:opacity-100 transition">
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mt-24 mb-8">
      <div className="relative overflow-hidden rounded-3xl gradient-brand p-10 md:p-16 shadow-glow">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Host something the internet talks about.</h2>
          <p className="mt-3 text-white/80 md:text-lg">Launch your event page in minutes. Beautiful pages, painless payments, real-time analytics.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-white/90 rounded-full">
              <Link to="/admin">Start hosting</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="/contact">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
