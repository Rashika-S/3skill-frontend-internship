import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact EventNest — We'd love to hear from you" },
      { name: "description", content: "Get in touch with EventNest. We're here for organizers, attendees and everyone in between." },
      { property: "og:title", content: "Contact EventNest" },
      { property: "og:description", content: "Reach our team via form, email or phone." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">Get in touch</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">Let's plan something <span className="gradient-text">unforgettable</span>.</h1>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-strong rounded-3xl p-8 shadow-soft">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll be in touch."); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Name</Label><Input required className="mt-1 bg-white/5 border-white/10" /></div>
            <div><Label>Email</Label><Input type="email" required className="mt-1 bg-white/5 border-white/10" /></div>
            <div className="md:col-span-2"><Label>Subject</Label><Input className="mt-1 bg-white/5 border-white/10" /></div>
            <div className="md:col-span-2"><Label>Message</Label><Textarea rows={6} className="mt-1 bg-white/5 border-white/10" /></div>
            <div className="md:col-span-2 flex justify-end"><Button className="gradient-brand text-white border-0 rounded-full"><Send className="h-4 w-4 mr-1" />Send message</Button></div>
          </form>
        </div>
        <div className="space-y-4">
          {[
            { icon: Mail, t: "Email", d: "hello@eventnest.app" },
            { icon: Phone, t: "Phone", d: "+91 80 4567 8900" },
            { icon: MapPin, t: "Office", d: "Indiranagar, Bengaluru 560038" },
            { icon: Clock, t: "Hours", d: "Mon–Sat · 10:00 to 19:00" },
          ].map((x) => (
            <div key={x.t} className="glass rounded-2xl p-5 flex gap-4">
              <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center shadow-glow shrink-0"><x.icon className="h-5 w-5 text-white" /></div>
              <div><div className="font-medium">{x.t}</div><div className="text-sm text-white/60">{x.d}</div></div>
            </div>
          ))}
          <div className="glass rounded-2xl p-5 flex gap-3">
            {[Twitter, Instagram, Linkedin].map((I, i) => (
              <a key={i} href="#" className="h-10 w-10 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 transition"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 glass rounded-3xl overflow-hidden">
        <div className="aspect-[16/6] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 grid place-items-center relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600')] bg-cover bg-center opacity-40" />
          <div className="relative text-center"><MapPin className="h-8 w-8 mx-auto mb-2" /><p className="font-medium">EventNest HQ</p><p className="text-sm text-white/60">100 Ft Road, Indiranagar</p></div>
        </div>
      </div>
    </div>
  ),
});
