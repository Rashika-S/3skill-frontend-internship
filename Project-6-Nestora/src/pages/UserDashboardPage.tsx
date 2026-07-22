import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, Eye, Mail, Calendar, MapPin, User, Bell, Search, Trash2,
  Building2, Clock, CheckCircle, ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStoreContext } from '@/hooks/StoreContext';
import { formatPrice, formatDate, timeAgo } from '@/lib/format';
import { CITIES } from '@/constants';
import { toast } from 'sonner';

export function UserDashboardPage() {
  const {
    favorites, properties, recentViews, enquiries, visits, profile, updateProfile,
    savedSearches, addSavedSearch, deleteSavedSearch, favLocations, addFavLocation, deleteFavLocation,
    updateVisitStatus,
  } = useStoreContext();

  const favProperties = properties.filter(p => favorites.includes(p.id));
  const recentProperties = properties.filter(p => recentViews.includes(p.id))
    .sort((a, b) => recentViews.indexOf(a.id) - recentViews.indexOf(b.id));

  const stats = [
    { icon: Heart, label: 'Saved Properties', value: favProperties.length, color: 'text-red-500', bg: 'bg-red-500/10' },
    { icon: Eye, label: 'Recent Views', value: recentProperties.length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: Mail, label: 'Enquiries', value: enquiries.length, color: 'text-accent', bg: 'bg-accent/10' },
    { icon: Calendar, label: 'Scheduled Visits', value: visits.length, color: 'text-gold', bg: 'bg-gold/10' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {profile.name}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Tabs defaultValue="saved">
          <TabsList className="w-full justify-start overflow-x-auto hide-scrollbar mb-6">
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Saved Properties</h3>
              {favProperties.length === 0 ? (
                <EmptyState icon={Heart} text="No saved properties" />
              ) : (
                <div className="space-y-3">
                  {favProperties.map(p => (
                    <Link key={p.id} to={`/property/${p.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                      <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.locality}, {p.city}</p>
                      </div>
                      <p className="font-semibold text-sm">{p.listingType === 'rent' ? formatPrice(p.rentAmount || 0) : formatPrice(p.salePrice || 0)}</p>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Recently Viewed</h3>
              {recentProperties.length === 0 ? (
                <EmptyState icon={Eye} text="No recent views" />
              ) : (
                <div className="space-y-3">
                  {recentProperties.map(p => (
                    <Link key={p.id} to={`/property/${p.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                      <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.locality}, {p.city}</p>
                      </div>
                      <Badge variant="outline">{p.type}</Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="enquiries">
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Property Enquiries</h3>
              {enquiries.length === 0 ? (
                <EmptyState icon={Mail} text="No enquiries yet" />
              ) : (
                <div className="space-y-3">
                  {enquiries.map(e => (
                    <div key={e.id} className="flex items-center gap-4 p-3 rounded-lg border border-border/60">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{e.propertyName}</p>
                        <p className="text-xs text-muted-foreground">{timeAgo(e.createdAt)} • {e.name}</p>
                      </div>
                      <Badge variant={e.status === 'new' ? 'default' : 'secondary'}>{e.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="visits">
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Scheduled Visits</h3>
              {visits.length === 0 ? (
                <EmptyState icon={Calendar} text="No visits scheduled" />
              ) : (
                <div className="space-y-3">
                  {visits.map(v => (
                    <div key={v.id} className="flex items-center gap-4 p-3 rounded-lg border border-border/60">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{v.propertyName}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(v.date)}</p>
                      </div>
                      <Badge variant={v.status === 'confirmed' ? 'default' : 'secondary'}>{v.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Favorite Locations</h3>
              <FavoriteLocations
                locations={favLocations}
                onAdd={addFavLocation}
                onDelete={deleteFavLocation}
              />
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab profile={profile} onUpdate={updateProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="text-center py-8">
      <Icon className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}

function FavoriteLocations({ locations, onAdd, onDelete }: {
  locations: { id: string; city: string; locality: string }[];
  onAdd: (l: { city: string; locality: string }) => void;
  onDelete: (id: string) => void;
}) {
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && locality) {
      onAdd({ city, locality });
      setCity(''); setLocality('');
      toast.success('Location added');
    }
  };

  return (
    <div>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none">
          <option value="">Select City</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <Input value={locality} onChange={(e) => setLocality(e.target.value)} placeholder="Locality" className="flex-1" />
        <Button type="submit" size="sm">Add</Button>
      </form>
      {locations.length === 0 ? (
        <EmptyState icon={MapPin} text="No favorite locations" />
      ) : (
        <div className="space-y-2">
          {locations.map(l => (
            <div key={l.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-sm flex-1">{l.locality}, {l.city}</span>
              <Button variant="ghost" size="icon" onClick={() => onDelete(l.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileTab({ profile, onUpdate }: { profile: any; onUpdate: (u: any) => void }) {
  const [form, setForm] = useState(profile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
    toast.success('Profile updated');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6 lg:col-span-2">
        <h3 className="font-display text-lg font-semibold mb-4">Profile Details</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block">Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label className="mb-1.5 block">Phone</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block">Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label className="mb-1.5 block">Bio</Label>
            <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} />
          </div>
          <Button type="submit" className="font-semibold">Save Changes</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications' },
            { key: 'sms', label: 'SMS Alerts' },
            { key: 'push', label: 'Push Notifications' },
            { key: 'promotions', label: 'Promotional Offers' },
          ].map(n => (
            <div key={n.key} className="flex items-center justify-between">
              <Label className="text-sm">{n.label}</Label>
              <Switch
                checked={form.notifications[n.key]}
                onCheckedChange={(v) => {
                  const updated = { ...form, notifications: { ...form.notifications, [n.key]: v } };
                  setForm(updated);
                  onUpdate(updated);
                }}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
