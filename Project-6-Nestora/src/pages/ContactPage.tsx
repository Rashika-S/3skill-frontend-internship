import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CONTACT_INFO } from '@/constants';
import { toast } from 'sonner';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const contactCards = [
    { icon: MapPin, title: 'Office Address', value: CONTACT_INFO.address },
    { icon: Mail, title: 'Email', value: CONTACT_INFO.email },
    { icon: Phone, title: 'Phone', value: CONTACT_INFO.phone },
    { icon: Clock, title: 'Working Hours', value: CONTACT_INFO.hours },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold">Get in Touch</h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Have questions? We're here to help. Reach out through any of the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="p-6 lg:p-8">
              <h2 className="font-display text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 block">Name</Label>
                    <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Phone</Label>
                    <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91..." />
                  </div>
                </div>
                <div>
                  <Label className="mb-1.5 block">Email</Label>
                  <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Message</Label>
                  <Textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="How can we help?" />
                </div>
                <Button type="submit" className="w-full gap-2 font-semibold"><Send className="w-4 h-4" /> Send Message</Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info + Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map(c => {
                const Icon = c.icon;
                return (
                  <Card key={c.title} className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.value}</p>
                  </Card>
                );
              })}
            </div>

            <Card className="p-0 overflow-hidden">
              <div className="aspect-[16/10] bg-muted/50 border-2 border-dashed border-border flex flex-col items-center justify-center">
                <MapPin className="w-12 h-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-sm">Google Maps placeholder</p>
                <p className="text-xs text-muted-foreground mt-1">{CONTACT_INFO.address}</p>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(s => (
                  <a key={s} href="#" className="px-3 py-1.5 rounded-lg bg-muted hover:bg-accent hover:text-white text-sm font-medium transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
