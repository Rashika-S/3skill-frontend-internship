import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — EventNest" },
      { name: "description", content: "How EventNest collects, uses and protects your data." },
      { property: "og:title", content: "Privacy Policy — EventNest" },
      { property: "og:description", content: "Your privacy is our priority." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">Legal</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">Privacy Policy</h1>
      <div className="mt-8 glass rounded-3xl p-8 space-y-5 text-white/70 leading-relaxed">
        <p>Last updated: July 22, 2026. EventNest ("we", "us") respects your privacy. This policy describes what data we collect and how we use it.</p>
        <h2 className="text-white text-xl font-semibold pt-4">What we collect</h2>
        <p>Account details, booking history, device metadata, and information you voluntarily share when contacting us.</p>
        <h2 className="text-white text-xl font-semibold pt-4">How we use it</h2>
        <p>To operate the platform, personalize discovery, process bookings, and communicate about your events.</p>
        <h2 className="text-white text-xl font-semibold pt-4">Your controls</h2>
        <p>You can request export or deletion of your data at any time by writing to privacy@eventnest.app.</p>
        <h2 className="text-white text-xl font-semibold pt-4">Contact</h2>
        <p>Questions? privacy@eventnest.app.</p>
      </div>
    </div>
  ),
});
