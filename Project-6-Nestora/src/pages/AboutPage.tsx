import { motion } from 'framer-motion';
import { Building2, Target, Eye, Heart, Award, Users, TrendingUp, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PEXEL_IMAGES } from '@/constants';

export function AboutPage() {
  const stats = [
    { icon: Building2, label: 'Properties Listed', value: '30+' },
    { icon: Users, label: 'Happy Clients', value: '10K+' },
    { icon: Award, label: 'Trusted Builders', value: '8' },
    { icon: TrendingUp, label: 'Cities Covered', value: '10' },
  ];

  const values = [
    { icon: Shield, title: 'Trust & Transparency', desc: 'Every listing is verified for authenticity and legal compliance.' },
    { icon: Heart, title: 'Customer First', desc: 'We put our users at the center of everything we do.' },
    { icon: Award, title: 'Premium Quality', desc: 'Only the finest properties make it to our platform.' },
    { icon: TrendingUp, title: 'Innovation', desc: 'Continuously improving with cutting-edge technology.' },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={PEXEL_IMAGES.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/60" />
        </div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">About Us</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Redefining Real Estate in India
            </h1>
            <p className="text-lg text-white/80">
              Nestora is India's premium real estate portal, connecting buyers, renters, and investors with the finest properties across the nation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="p-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                    <p className="font-display text-3xl font-bold">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="p-8 h-full">
                <Target className="w-10 h-10 text-accent mb-4" />
                <h2 className="font-display text-2xl font-bold mb-3">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To make property search seamless, transparent, and enjoyable. We empower users with comprehensive information, verified listings, and smart tools to make confident real estate decisions.
                </p>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="p-8 h-full">
                <Eye className="w-10 h-10 text-accent mb-4" />
                <h2 className="font-display text-2xl font-bold mb-3">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's most trusted and loved real estate platform, setting the standard for premium property experiences and helping millions find their perfect home.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground mt-2">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="p-6 h-full hover:shadow-luxury transition-all">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
