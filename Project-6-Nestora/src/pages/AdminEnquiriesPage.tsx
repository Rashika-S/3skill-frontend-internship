import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, CheckCircle, Archive, Trash2, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useStoreContext } from '@/hooks/StoreContext';
import { formatDate, timeAgo } from '@/lib/format';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function AdminEnquiriesPage() {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useStoreContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'archived'>('all');

  const filtered = useMemo(() => {
    let result = enquiries;
    if (filter !== 'all') result = result.filter(e => e.status === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e => e.name.toLowerCase().includes(q) || e.propertyName.toLowerCase().includes(q) || e.email.toLowerCase().includes(q));
    }
    return result;
  }, [enquiries, filter, search]);

  const counts = useMemo(() => ({
    all: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    archived: enquiries.filter(e => e.status === 'archived').length,
  }), [enquiries]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold">Enquiry Management</h1>
        <p className="text-muted-foreground">Manage and respond to customer enquiries</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
        {(['all', 'new', 'contacted', 'archived'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors whitespace-nowrap",
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"
            )}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search enquiries..." className="pl-10" />
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No enquiries found</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.03, 0.3) }}>
              <Card className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-semibold">{e.name}</h3>
                      <Badge variant={e.status === 'new' ? 'default' : 'secondary'} className="capitalize">{e.status}</Badge>
                    </div>
                    <p className="text-sm font-medium text-accent mb-2">{e.propertyName}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {e.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {e.email}</span>
                      {e.visitTime && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {e.visitTime}</span>}
                      <span>{timeAgo(e.createdAt)}</span>
                    </div>
                    {e.message && <p className="text-sm text-muted-foreground mt-2 italic">"{e.message}"</p>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {e.status !== 'contacted' && (
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => { updateEnquiryStatus(e.id, 'contacted'); toast.success('Marked as contacted'); }}>
                        <CheckCircle className="w-3.5 h-3.5" /> Contact
                      </Button>
                    )}
                    {e.status !== 'archived' && (
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => { updateEnquiryStatus(e.id, 'archived'); toast.success('Archived'); }}>
                        <Archive className="w-3.5 h-3.5" /> Archive
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="gap-1.5 text-red-500 hover:text-red-600" onClick={() => { deleteEnquiry(e.id); toast.success('Deleted'); }}>
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
