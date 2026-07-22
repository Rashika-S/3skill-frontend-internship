import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Search, Building2, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useStoreContext } from '@/hooks/StoreContext';
import { formatPrice, formatRent } from '@/lib/format';
import { toast } from 'sonner';
import type { Property } from '@/types';
import { CITIES, PROPERTY_TYPES } from '@/constants';

export function AdminPropertiesPage() {
  const { properties, deleteProperty } = useStoreContext();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return properties;
    const q = search.toLowerCase();
    return properties.filter(p => p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.type.toLowerCase().includes(q));
  }, [properties, search]);

  const handleDelete = () => {
    if (deleteId) {
      deleteProperty(deleteId);
      toast.success('Property deleted');
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Property Management</h1>
          <p className="text-muted-foreground">{properties.length} total properties</p>
        </div>
        <Link to="/admin/add">
          <Button className="gap-2 font-semibold"><Plus className="w-4 h-4" /> Add Property</Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, city, or type..." className="pl-10" />
      </div>

      <div className="space-y-3">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.03, 0.3) }}>
            <Card className="p-4 flex items-center gap-4">
              <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <Badge className={p.listingType === 'rent' ? "bg-accent text-white" : "bg-gold text-primary"}>
                    {p.listingType === 'rent' ? 'Rent' : 'Sale'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{p.type} • {p.locality}, {p.city}</p>
                <p className="text-sm font-semibold mt-1">
                  {p.listingType === 'rent' ? formatRent(p.rentAmount || 0) : formatPrice(p.salePrice || 0)}
                </p>
              </div>
              <div className="flex gap-1">
                <Link to={`/property/${p.id}`}>
                  <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                </Link>
                <Link to={`/admin/edit/${p.id}`}>
                  <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)} className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone. The property will be permanently removed.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
