import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — EventNest" },
      { name: "description", content: "The rules of the road for using EventNest." },
      { property: "og:title", content: "Terms & Conditions — EventNest" },
      { property: "og:description", content: "By using EventNest you agree to these terms." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">Legal</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
      <div className="mt-8 glass rounded-3xl p-8 space-y-5 text-white/70 leading-relaxed">
        <p>Last updated: July 22, 2026. By using EventNest you agree to these terms.</p>
        <h2 className="text-white text-xl font-semibold pt-4">Bookings</h2>
        <p>All bookings are subject to the organizer's cancellation and refund policy, displayed on the event page.</p>
        <h2 className="text-white text-xl font-semibold pt-4">Conduct</h2>
        <p>You agree not to misuse the platform, resell tickets in violation of organizer rules, or upload harmful content.</p>
        <h2 className="text-white text-xl font-semibold pt-4">Liability</h2>
        <p>EventNest connects attendees with organizers and is not liable for on-site incidents beyond our reasonable control.</p>
        <h2 className="text-white text-xl font-semibold pt-4">Changes</h2>
        <p>We may update these terms; material changes will be announced via email or in-app.</p>
      </div>
    </div>
  ),
});
