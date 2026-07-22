import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Home, KeyRound, Users, Mail, TrendingUp, ArrowUpRight,
  DollarSign, MapPin, Plus, FileText,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import { useStoreContext } from '@/hooks/StoreContext';
import { formatPrice } from '@/lib/format';
import { PROPERTY_CATEGORIES } from '@/constants';

export function AdminDashboardPage() {
  const { properties, enquiries } = useStoreContext();

  const stats = [
    { icon: Building2, label: 'Total Properties', value: properties.length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: KeyRound, label: 'Rent Listings', value: properties.filter(p => p.listingType === 'rent').length, color: 'text-accent', bg: 'bg-accent/10' },
    { icon: Home, label: 'Sale Listings', value: properties.filter(p => p.listingType === 'sale').length, color: 'text-gold', bg: 'bg-gold/10' },
    { icon: Users, label: 'Users', value: 1248, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: Mail, label: 'Enquiries', value: enquiries.length, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  const typeData = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach(p => { counts[p.type] = (counts[p.type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [properties]);

  const cityData = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach(p => { counts[p.city] = (counts[p.city] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 6);
  }, [properties]);

  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.slice(0, 8).map((m, i) => ({
      month: m,
      listings: 3 + Math.floor(Math.random() * 8) + i,
      enquiries: 5 + Math.floor(Math.random() * 15) + i,
    }));
  }, []);

  const PIE_COLORS = ['#0B1F3A', '#10B981', '#D4AF37', '#3B82F6', '#EF4444', '#A855F7', '#EC4899', '#F59E0B'];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Overview</h1>
          <p className="text-muted-foreground">Real estate analytics and management</p>
        </div>
        <Link to="/admin/add">
          <Button className="gap-2 font-semibold"><Plus className="w-4 h-4" /> Add Property</Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Monthly Listings & Enquiries</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e0e0e0' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="listings" stroke="#0B1F3A" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="enquiries" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Property Types Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e: any) => e.name}>
                {typeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e0e0e0' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Popular Cities</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e0e0e0' }} />
              <Bar dataKey="value" fill="#10B981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Recent Enquiries</h3>
          <div className="space-y-3 max-h-[280px] overflow-y-auto scrollbar-thin">
            {enquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No enquiries yet</p>
            ) : enquiries.slice(0, 5).map(e => (
              <div key={e.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.propertyName}</p>
                  <p className="text-xs text-muted-foreground">{e.name}</p>
                </div>
                <Badge variant="secondary">{e.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/properties">
          <Card className="p-5 hover:shadow-luxury transition-all cursor-pointer group">
            <Building2 className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold">Manage Properties</h3>
            <p className="text-sm text-muted-foreground">Edit, delete, and manage all listings</p>
            <ArrowUpRight className="w-4 h-4 mt-2 text-accent" />
          </Card>
        </Link>
        <Link to="/admin/add">
          <Card className="p-5 hover:shadow-luxury transition-all cursor-pointer group">
            <Plus className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold">Add Property</h3>
            <p className="text-sm text-muted-foreground">Create a new property listing</p>
            <ArrowUpRight className="w-4 h-4 mt-2 text-accent" />
          </Card>
        </Link>
        <Link to="/admin/enquiries">
          <Card className="p-5 hover:shadow-luxury transition-all cursor-pointer group">
            <Mail className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold">View Enquiries</h3>
            <p className="text-sm text-muted-foreground">Manage customer enquiries</p>
            <ArrowUpRight className="w-4 h-4 mt-2 text-accent" />
          </Card>
        </Link>
      </div>
    </div>
  );
}
