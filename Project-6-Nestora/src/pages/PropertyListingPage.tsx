import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, MapPin, Home, IndianRupee, Bed, Bath, Car, Grid3x3, List, LayoutGrid } from 'lucide-react';
import { PropertyCard, PropertyCardSkeleton } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useStoreContext } from '@/hooks/StoreContext';
import { CITIES, PROPERTY_TYPES, SORT_OPTIONS, FURNISHING_OPTIONS, AMENITIES_LIST } from '@/constants';
import { cn } from '@/lib/utils';
import type { Property } from '@/types';

export function PropertyListingPage() {
  const { properties } = useStoreContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    locality: '',
    listingType: searchParams.get('listing') || '',
    type: searchParams.get('type') || '',
    budget: searchParams.get('budget') || '',
    bedrooms: 0,
    bathrooms: 0,
    minArea: 0,
    furnishing: '',
    readyToMove: false,
    newLaunch: false,
    parking: false,
    petFriendly: false,
    amenities: [] as string[],
  });
  const [sort, setSort] = useState('popular');

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setFilters(f => ({
      ...f,
      city: searchParams.get('city') || '',
      listingType: searchParams.get('listing') || '',
      type: searchParams.get('type') || '',
      budget: searchParams.get('budget') || '',
    }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...properties];
    if (filters.city) result = result.filter(p => p.city === filters.city);
    if (filters.locality) result = result.filter(p => p.locality.toLowerCase().includes(filters.locality.toLowerCase()));
    if (filters.listingType) result = result.filter(p => p.listingType === filters.listingType);
    if (filters.type) result = result.filter(p => p.type === filters.type);
    if (filters.furnishing) result = result.filter(p => p.furnishing === filters.furnishing);
    if (filters.bedrooms > 0) result = result.filter(p => p.bedrooms >= filters.bedrooms);
    if (filters.bathrooms > 0) result = result.filter(p => p.bathrooms >= filters.bathrooms);
    if (filters.minArea > 0) result = result.filter(p => p.area >= filters.minArea);
    if (filters.readyToMove) result = result.filter(p => p.readyToMove);
    if (filters.newLaunch) result = result.filter(p => p.possessionStatus === 'New Launch');
    if (filters.parking) result = result.filter(p => p.parking > 0);
    if (filters.petFriendly) result = result.filter(p => p.petFriendly);
    if (filters.amenities.length > 0) result = result.filter(p => filters.amenities.every(a => p.amenities.includes(a)));
    if (filters.budget) {
      const [min, max] = filters.budget.split('-').map(Number);
      result = result.filter(p => {
        const price = p.listingType === 'rent' ? (p.rentAmount || 0) : (p.salePrice || 0);
        return price >= min && price <= max;
      });
    }

    switch (sort) {
      case 'price-asc': result.sort((a, b) => (a.salePrice || a.rentAmount || 0) - (b.salePrice || b.rentAmount || 0)); break;
      case 'price-desc': result.sort((a, b) => (b.salePrice || b.rentAmount || 0) - (a.salePrice || a.rentAmount || 0)); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'popular': result.sort((a, b) => b.popular - a.popular); break;
    }
    return result;
  }, [properties, filters, sort]);

  const localities = useMemo(() => {
    if (!filters.city) return [];
    return [...new Set(properties.filter(p => p.city === filters.city).map(p => p.locality))];
  }, [properties, filters.city]);

  const updateFilter = <K extends keyof typeof filters>(key: K, value: typeof filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      city: '', locality: '', listingType: '', type: '', budget: '',
      bedrooms: 0, bathrooms: 0, minArea: 0, furnishing: '',
      readyToMove: false, newLaunch: false, parking: false, petFriendly: false, amenities: [],
    });
    setSearchParams({});
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => {
    if (k === 'amenities') return (v as string[]).length > 0;
    if (typeof v === 'boolean') return v;
    return v !== '' && v !== 0;
  }).length;

  const FilterContent = () => (
    <div className="space-y-5">
      <div>
        <Label className="flex items-center gap-1.5 mb-2 text-sm font-semibold"><MapPin className="w-3.5 h-3.5" /> City</Label>
        <select value={filters.city} onChange={(e) => updateFilter('city', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
          <option value="">Any City</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {localities.length > 0 && (
        <div>
          <Label className="mb-2 text-sm font-semibold">Locality</Label>
          <select value={filters.locality} onChange={(e) => updateFilter('locality', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
            <option value="">Any Locality</option>
            {localities.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      )}

      <div>
        <Label className="mb-2 text-sm font-semibold">Buy / Rent</Label>
        <div className="grid grid-cols-2 gap-2">
          {['sale', 'rent'].map(t => (
            <button key={t} onClick={() => updateFilter('listingType', filters.listingType === t ? '' : t)}
              className={cn("px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                filters.listingType === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted")}>
              {t === 'sale' ? 'Buy' : 'Rent'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="flex items-center gap-1.5 mb-2 text-sm font-semibold"><Home className="w-3.5 h-3.5" /> Property Type</Label>
        <select value={filters.type} onChange={(e) => updateFilter('type', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
          <option value="">Any Type</option>
          {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <Label className="flex items-center gap-1.5 mb-2 text-sm font-semibold"><IndianRupee className="w-3.5 h-3.5" /> Budget</Label>
        <select value={filters.budget} onChange={(e) => updateFilter('budget', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
          <option value="">Any Budget</option>
          <option value="0-5000000">Under ₹50L</option>
          <option value="5000000-10000000">₹50L - ₹1Cr</option>
          <option value="10000000-25000000">₹1Cr - ₹2.5Cr</option>
          <option value="25000000-999999999">Above ₹2.5Cr</option>
        </select>
      </div>

      <div>
        <Label className="flex items-center gap-1.5 mb-2 text-sm font-semibold"><Bed className="w-3.5 h-3.5" /> Bedrooms</Label>
        <div className="grid grid-cols-5 gap-1.5">
          {[0, 1, 2, 3, 4].map(n => (
            <button key={n} onClick={() => updateFilter('bedrooms', n)}
              className={cn("py-2 rounded-lg text-sm font-medium border transition-colors",
                filters.bedrooms === n ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted")}>
              {n === 0 ? 'Any' : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="flex items-center gap-1.5 mb-2 text-sm font-semibold"><Bath className="w-3.5 h-3.5" /> Bathrooms</Label>
        <div className="grid grid-cols-5 gap-1.5">
          {[0, 1, 2, 3, 4].map(n => (
            <button key={n} onClick={() => updateFilter('bathrooms', n)}
              className={cn("py-2 rounded-lg text-sm font-medium border transition-colors",
                filters.bathrooms === n ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted")}>
              {n === 0 ? 'Any' : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-2 text-sm font-semibold">Min Area (sq.ft): {filters.minArea}</Label>
        <Slider value={[filters.minArea]} onValueChange={(v) => updateFilter('minArea', v[0])} max={5000} step={100} />
      </div>

      <div>
        <Label className="mb-2 text-sm font-semibold">Furnishing</Label>
        <select value={filters.furnishing} onChange={(e) => updateFilter('furnishing', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
          <option value="">Any</option>
          {FURNISHING_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Ready to Move</Label>
          <Switch checked={filters.readyToMove} onCheckedChange={(v) => updateFilter('readyToMove', v)} />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">New Launch</Label>
          <Switch checked={filters.newLaunch} onCheckedChange={(v) => updateFilter('newLaunch', v)} />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold flex items-center gap-1.5"><Car className="w-3.5 h-3.5" /> Parking</Label>
          <Switch checked={filters.parking} onCheckedChange={(v) => updateFilter('parking', v)} />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Pet Friendly</Label>
          <Switch checked={filters.petFriendly} onCheckedChange={(v) => updateFilter('petFriendly', v)} />
        </div>
      </div>

      <div>
        <Label className="mb-2 text-sm font-semibold">Amenities</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin pr-1">
          {AMENITIES_LIST.map(a => (
            <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.amenities.includes(a)}
                onChange={(e) => {
                  if (e.target.checked) updateFilter('amenities', [...filters.amenities, a]);
                  else updateFilter('amenities', filters.amenities.filter(x => x !== a));
                }}
                className="rounded border-border"
              />
              {a}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Property Listings</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} properties found</p>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <Card className="p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Filters</h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">Clear all</Button>
                )}
              </div>
              <FilterContent />
            </Card>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2">
                      <SlidersHorizontal className="w-4 h-4" /> Filters
                      {activeFilterCount > 0 && <Badge className="ml-1 bg-accent text-white">{activeFilterCount}</Badge>}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Filters</h3>
                        <Button variant="ghost" size="sm" onClick={clearFilters}>Clear all</Button>
                      </div>
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div className="hidden sm:flex gap-1">
                  <Button variant={layout === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setLayout('grid')}>
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button variant={layout === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setLayout('list')}>
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.city && <FilterChip label={`City: ${filters.city}`} onClear={() => updateFilter('city', '')} />}
                {filters.listingType && <FilterChip label={filters.listingType === 'sale' ? 'Buy' : 'Rent'} onClear={() => updateFilter('listingType', '')} />}
                {filters.type && <FilterChip label={filters.type} onClear={() => updateFilter('type', '')} />}
                {filters.budget && <FilterChip label="Budget" onClear={() => updateFilter('budget', '')} />}
                {filters.furnishing && <FilterChip label={filters.furnishing} onClear={() => updateFilter('furnishing', '')} />}
                {filters.readyToMove && <FilterChip label="Ready to Move" onClear={() => updateFilter('readyToMove', false)} />}
                {filters.newLaunch && <FilterChip label="New Launch" onClear={() => updateFilter('newLaunch', false)} />}
                {filters.petFriendly && <FilterChip label="Pet Friendly" onClear={() => updateFilter('petFriendly', false)} />}
              </div>
            )}

            {/* Results */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No properties match your filters.</p>
                <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
              </Card>
            ) : (
              <motion.div layout className={cn(
                "grid gap-6",
                layout === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {filtered.map((p, i) => <PropertyCard key={p.id} property={p} index={i} layout={layout} />)}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <Badge variant="secondary" className="gap-1 pr-1">
      {label}
      <button onClick={onClear} className="ml-1 hover:bg-background/50 rounded p-0.5">
        <X className="w-3 h-3" />
      </button>
    </Badge>
  );
}
