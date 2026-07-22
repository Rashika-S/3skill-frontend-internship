import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">Event<span className="gradient-text">Nest</span></span>
            </Link>
            <p className="mt-4 text-sm text-white/60 max-w-xs">
              Discover, book and celebrate the events that make your calendar unforgettable.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Instagram, Linkedin, Github].map((I, i) => (
                <a key={i} href="#" className="glass rounded-full p-2 hover:bg-white/10 transition-colors">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {[
                ["/events", "Browse Events"],
                ["/dashboard", "Dashboard"],
                ["/bookings", "My Bookings"],
                ["/favorites", "Favorites"],
                ["/admin", "For Organizers"],
              ].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90">Categories</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-white/60">
              {CATEGORIES.slice(0, 10).map((c) => (
                <li key={c.slug}>
                  <Link to="/categories/$slug" params={{ slug: c.slug }} className="hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90">Newsletter</h4>
            <p className="mt-3 text-sm text-white/60">Weekly picks. No spam.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input type="email" placeholder="you@example.com" className="pl-9 bg-white/5 border-white/10" />
              </div>
              <Button className="gradient-brand text-white border-0">Join</Button>
            </form>
            <div className="mt-6 space-y-1 text-xs text-white/50">
              <Link to="/privacy" className="block hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="block hover:text-white">Terms & Conditions</Link>
              <Link to="/faq" className="block hover:text-white">FAQ</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} EventNest. Crafted with care in Bengaluru.</p>
          <p>All artwork is illustrative.</p>
        </div>
      </div>
    </footer>
  );
}
