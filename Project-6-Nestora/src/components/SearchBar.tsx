import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CITIES, PROPERTY_TYPES } from '@/constants';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  className?: string;
}

export function SearchBar({ variant = 'hero', className }: SearchBarProps) {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (listingType) params.set('listing', listingType);
    if (type) params.set('type', type);
    if (budget) params.set('budget', budget);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className={cn(
      "rounded-2xl",
      variant === 'hero' ? "glass shadow-luxury-lg p-2" : "bg-white border border-border shadow-luxury p-2",
      className
    )}>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60">
          <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-sm outline-none cursor-pointer"
          >
            <option value="">Any City</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60">
          <Home className="w-4 h-4 text-muted-foreground shrink-0" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent text-sm outline-none cursor-pointer"
          >
            <option value="">Any Type</option>
            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60">
          <IndianRupee className="w-4 h-4 text-muted-foreground shrink-0" />
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-transparent text-sm outline-none cursor-pointer"
          >
            <option value="">Any Budget</option>
            <option value="0-5000000">Under ₹50L</option>
            <option value="5000000-10000000">₹50L - ₹1Cr</option>
            <option value="10000000-25000000">₹1Cr - ₹2.5Cr</option>
            <option value="25000000-999999999">Above ₹2.5Cr</option>
          </select>
        </div>

        <div className="flex rounded-xl overflow-hidden border border-border">
          <button
            onClick={() => setListingType('sale')}
            className={cn("px-4 py-2 text-sm font-semibold transition-colors",
              listingType === 'sale' ? "bg-primary text-primary-foreground" : "bg-white/60 text-foreground hover:bg-muted")}
          >Buy</button>
          <button
            onClick={() => setListingType('rent')}
            className={cn("px-4 py-2 text-sm font-semibold transition-colors",
              listingType === 'rent' ? "bg-accent text-accent-foreground" : "bg-white/60 text-foreground hover:bg-muted")}
          >Rent</button>
        </div>

        <Button onClick={handleSearch} size="lg" className="rounded-xl font-semibold gap-2 shrink-0">
          <Search className="w-4 h-4" /> Search
        </Button>
      </div>
    </div>
  );
}
