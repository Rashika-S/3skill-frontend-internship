import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award, Headphones, TrendingUp, Quote, ChevronRight } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStoreContext } from '@/hooks/StoreContext';
import { PROPERTY_CATEGORIES, PEXEL_IMAGES } from '@/constants';
import { cities, builders, testimonials } from '@/data/sampleData';
import { formatPrice, formatRent } from '@/lib/format';

export function LandingPage() {
  const { properties } = useStoreContext();
  const featured = [...properties].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const trending = [...properties].sort((a, b) => b.popular - a.popular).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src={PEXEL_IMAGES.hero} alt="Luxury home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />
        </div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30 backdrop-blur-sm">
              <Star className="w-3 h-3 mr-1 fill-gold" /> India's #1 Premium Real Estate Portal
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Find Your <span className="text-gradient-gold">Dream Home</span><br />with Nestora
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              Discover premium apartments, luxury villas, and commercial spaces across India's top cities. Experience real estate like never before.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/properties">
                <Button size="lg" className="bg-gold text-primary hover:bg-gold/90 font-semibold gap-2 text-base">
                  Explore Properties <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/properties?listing=rent">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold">
                  Rent a Home
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8"
          >
            <SearchBar variant="hero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden md:flex gap-8 mt-12 text-white"
          >
            {[
              { label: 'Properties', value: '30+' },
              { label: 'Cities', value: '10' },
              { label: 'Builders', value: '8' },
              { label: 'Happy Clients', value: '10K+' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Property Categories */}
      <PropertyCategories />

      {/* Featured Properties */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeader
            title="Featured Properties"
            subtitle="Handpicked premium listings for the discerning buyer"
            to="/properties"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {featured.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Trending Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeader
            title="Trending Properties"
            subtitle="The most viewed and saved properties this week"
            to="/properties"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {trending.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Nestora */}
      <WhyChooseNestora />

      {/* Popular Cities */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeader title="Popular Cities" subtitle="Explore properties in India's top cities" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {cities.map((city, i) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/properties?city=${city.name}`}>
                  <Card className="overflow-hidden group cursor-pointer relative aspect-[4/5] border-0">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-display text-lg font-bold">{city.name}</h3>
                      <p className="text-xs text-white/70">{city.propertyCount} Properties</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Trusted Builders */}
      <TrustedBuilders />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}

function SectionHeader({ title, subtitle, to }: { title: string; subtitle: string; to?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">{title}</h2>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>
      {to && (
        <Link to={to}>
          <Button variant="ghost" className="text-accent font-semibold gap-1 hover:text-accent">
            View All <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </motion.div>
  );
}

function PropertyCategories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeader title="Property Categories" subtitle="Browse by property type to find exactly what you're looking for" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-10">
          {PROPERTY_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={`/properties?type=${encodeURIComponent(cat.name)}`}>
                  <Card className="p-5 hover:shadow-luxury-lg transition-all duration-300 group cursor-pointer border-border/60 hover:border-accent/40 h-full">
                    <div className="w-12 h-12 rounded-xl bg-navy-gradient flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseNestora() {
  const features = [
    { icon: Shield, title: 'Verified Listings', desc: 'Every property is RERA-verified and checked for authenticity.' },
    { icon: Award, title: 'Premium Quality', desc: 'Curated luxury properties with detailed information and photos.' },
    { icon: Headphones, title: '24/7 Support', desc: 'Our team is always available to help you find the perfect home.' },
    { icon: TrendingUp, title: 'Smart Analytics', desc: 'Real-time market insights and price trends for informed decisions.' },
  ];
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeader title="Why Choose Nestora" subtitle="We make real estate simple, transparent, and premium" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full border-border/60 hover:shadow-luxury-lg transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all">
                    <Icon className="w-7 h-7 text-accent group-hover:text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 bg-navy-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-12">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">Testimonials</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h2>
          <p className="text-white/70 mt-2">Real stories from happy Nestora users</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-6 glass-dark border-white/10 h-full">
                <Quote className="w-8 h-8 text-gold mb-3" />
                <p className="text-sm text-white/90 mb-4 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-white/60">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustedBuilders() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeader title="Trusted Builders" subtitle="Partnered with India's most reputed developers" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mt-10">
          {builders.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 text-center hover:shadow-luxury transition-all duration-300 group cursor-pointer border-border/60">
                <div className="w-14 h-14 rounded-2xl bg-navy-gradient flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="font-display text-2xl font-bold text-gold">{b.logo}</span>
                </div>
                <h3 className="font-semibold text-sm">{b.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{b.projects}+ Projects</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span className="text-xs font-semibold">{b.rating}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <Card className="p-8 lg:p-12 bg-navy-gradient border-0 text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with <span className="text-gradient-gold">Nestora</span>
            </h2>
            <p className="text-white/70 mb-6">
              Subscribe to get the latest property listings, market trends, and exclusive offers delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-gold transition-colors"
              />
              <Button type="submit" className="bg-gold text-primary hover:bg-gold/90 font-semibold px-6">
                Subscribe
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}
