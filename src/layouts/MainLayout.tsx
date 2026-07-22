import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, LayoutDashboard, Home, Phone, Info, HelpCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/properties', label: 'Properties', icon: Building2 },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/about', label: 'About', icon: Info },
  { to: '/contact', label: 'Contact', icon: Phone },
  { to: '/faq', label: 'FAQ', icon: HelpCircle },
];

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "glass-nav shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-navy-gradient flex items-center justify-center shadow-luxury group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-primary leading-none">Nestora</span>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Premium Real Estate</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const active = location.pathname === link.to || (link.to === '/properties' && location.pathname.startsWith('/property'));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all relative",
                    active ? "text-accent" : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="font-semibold">Dashboard</Button>
            </Link>
            <Link to="/admin">
              <Button size="sm" className="font-semibold bg-navy-gradient gap-2">
                <LayoutDashboard className="w-4 h-4" /> Admin
              </Button>
            </Link>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-navy-gradient flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-gold" />
                    </div>
                    <span className="font-display text-lg font-bold">Nestora</span>
                  </Link>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  {navLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                      >
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="pt-2 mt-2 border-t space-y-1">
                    <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" /> Dashboard
                    </Link>
                    <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" /> Admin
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-navy-gradient text-white pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gold" />
              </div>
              <span className="font-display text-2xl font-bold">Nestora</span>
            </Link>
            <p className="text-sm text-white/70 max-w-sm mb-6">
              India's premium real estate portal. Discover luxury homes, villas, apartments, and commercial spaces with a seamless, elegant experience.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map(s => (
                <a key={s} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-all">
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-gold transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/dashboard" className="hover:text-gold transition-colors">My Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-gold transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-white/70 mb-3">Get the latest property updates.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm placeholder:text-white/50 outline-none focus:border-gold transition-colors"
              />
              <Button type="submit" className="w-full bg-gold text-primary hover:bg-gold/90 font-semibold">
                {subscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© 2025 Nestora. All rights reserved.</p>
          <p>Designed with passion for premium living.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    facebook: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    twitter: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
    instagram: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
    linkedin: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    youtube: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  };
  return <>{icons[name]}</>;
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
