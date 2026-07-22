import { useState } from 'react';
import { Phone, Mail, User, CalendarClock, MessageSquare, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useStoreContext } from '@/hooks/StoreContext';
import { toast } from 'sonner';
import type { Property } from '@/types';

interface ContactOwnerDialogProps {
  property: Property;
  trigger?: React.ReactNode;
}

export function ContactOwnerDialog({ property, trigger }: ContactOwnerDialogProps) {
  const { addEnquiry, addVisit } = useStoreContext();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', visitTime: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      propertyId: property.id,
      propertyName: property.name,
      name: form.name,
      phone: form.phone,
      email: form.email,
      visitTime: form.visitTime,
      message: form.message,
    });
    if (form.visitTime) {
      addVisit({
        propertyId: property.id,
        propertyName: property.name,
        date: form.visitTime,
        time: form.visitTime,
      });
    }
    toast.success('Enquiry sent! The owner will contact you soon.');
    setForm({ name: '', phone: '', email: '', visitTime: '', message: '' });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button className="gap-2"><Phone className="w-4 h-4" /> Contact Owner</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Contact Owner</DialogTitle>
          <DialogDescription>
            Send an enquiry for <span className="font-semibold text-foreground">{property.name}</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Name</Label>
            <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</Label>
              <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91..." />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</Label>
              <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5"><CalendarClock className="w-3.5 h-3.5" /> Preferred Visit Time</Label>
            <Input type="datetime-local" value={form.visitTime} onChange={(e) => setForm({ ...form, visitTime: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Message</Label>
            <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="I'm interested in this property..." rows={3} />
          </div>
          <Button type="submit" className="w-full gap-2 font-semibold">
            <Send className="w-4 h-4" /> Send Enquiry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
