import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/categories";
import { SectionHeader } from "@/components/site/SectionHeader";
import { motion } from "framer-motion";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "All Categories — EventNest" },
      { name: "description", content: "Explore every type of event on EventNest — from hackathons to weddings." },
      { property: "og:title", content: "All Categories — EventNest" },
      { property: "og:description", content: "18 categories, one nest." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <SectionHeader eyebrow="Explore" title="All categories" subtitle="From tech conferences to baby showers — find your kind of event." />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.02 }}>
            <Link to="/categories/$slug" params={{ slug: c.slug }} className="group block">
              <div className="glass rounded-2xl p-5 h-full transition-all group-hover:-translate-y-1 group-hover:shadow-glow">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${c.gradient} grid place-items-center shadow-glow`}>
                  <c.icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-4 font-semibold">{c.name}</div>
                <div className="text-xs text-white/50 mt-1">{c.blurb}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  ),
});
