import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Heart, Users, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EventNest — Our Story" },
      { name: "description", content: "EventNest is on a mission to make discovering and hosting events unbelievably simple, beautiful, and fun." },
      { property: "og:title", content: "About EventNest" },
      { property: "og:description", content: "Building the future of event discovery and management." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-4xl px-4 md:px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">Our story</p>
      <h1 className="mt-3 text-4xl md:text-6xl font-bold">Every gathering deserves a <span className="gradient-text">better platform</span>.</h1>
      <p className="mt-5 text-white/70 md:text-lg max-w-2xl">EventNest started as a weekend project between three friends who were tired of clunky booking flows and cluttered event pages. Today, we power thousands of events across India — from indie meetups to arena concerts.</p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Sparkles, t: "Design-first", d: "Every pixel is intentional. Every animation earns its place." },
          { icon: Heart, t: "Attendee-loved", d: "A 4.9★ average across 20k+ user reviews." },
          { icon: Users, t: "Organizer-approved", d: "Powerful tools that stay out of your way." },
          { icon: Rocket, t: "Growing fast", d: "From 3 cities to 50+ in under two years." },
        ].map((x) => (
          <div key={x.t} className="glass rounded-2xl p-6">
            <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center shadow-glow"><x.icon className="h-5 w-5 text-white" /></div>
            <h3 className="mt-4 font-semibold">{x.t}</h3>
            <p className="mt-1 text-sm text-white/60">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <SectionHeader eyebrow="By the numbers" title="A community that shows up" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["1.2M+", "Tickets booked"], ["12k+", "Events hosted"], ["50+", "Cities"], ["₹120Cr", "GMV powered"]].map(([k, v]) => (
            <div key={v} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text">{k}</div>
              <div className="text-xs text-white/60 mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});
