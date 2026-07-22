import { createFileRoute, notFound } from "@tanstack/react-router";
import { categoryBySlug } from "@/data/categories";
import { eventsByCategory } from "@/data/events";
import { EventGrid } from "@/components/site/EventCard";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const cat = categoryBySlug(params.slug);
    if (!cat) throw notFound();
    return { cat, events: eventsByCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.cat.name} Events — EventNest` : "Category — EventNest" },
      { name: "description", content: loaderData ? `Discover ${loaderData.cat.name.toLowerCase()} on EventNest — ${loaderData.cat.blurb}.` : "Category" },
      { property: "og:title", content: loaderData ? `${loaderData.cat.name} on EventNest` : "Category" },
      { property: "og:description", content: loaderData?.cat.blurb ?? "" },
    ],
  }),
  component: () => {
    const { cat, events } = Route.useLoaderData();
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <div className="glass rounded-3xl p-8 mb-8 flex items-center gap-5">
          <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${cat.gradient} grid place-items-center shadow-glow`}>
            <cat.icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{cat.name}</h1>
            <p className="text-white/60">{cat.blurb}</p>
          </div>
        </div>
        <SectionHeader eyebrow="Now on" title={`${events.length} ${cat.name.toLowerCase()}`} />
        <EventGrid events={events} />
      </div>
    );
  },
});
