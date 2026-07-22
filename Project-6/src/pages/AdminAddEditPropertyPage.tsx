import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Building2, Home, KeyRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStoreContext } from '@/hooks/StoreContext';
import { CITIES, PROPERTY_TYPES, AMENITIES_LIST, FACING_DIRECTIONS, OWNERSHIP_TYPES, POSSESSION_STATUSES, PEXEL_IMAGES } from '@/constants';
import { toast } from 'sonner';
import type { Property, PropertyType, ListingType, Furnishing, PossessionStatus } from '@/types';

const emptyForm: Omit<Property, 'id' | 'createdAt'> = {
  name: '', type: 'Apartment', listingType: 'sale', rentAmount: undefined, salePrice: 0,
  deposit: undefined, maintenance: undefined, bedrooms: 2, bathrooms: 2, balconies: 1,
  floor: 1, totalFloors: 10, area: 1000, furnishing: 'Semi-Furnished', parking: 1,
  address: '', locality: '', city: 'Mumbai', state: 'Maharashtra', pincode: '',
  description: '', amenities: [], images: PEXEL_IMAGES.apartments, rating: 4.0, popular: 0,
  readyToMove: true, petFriendly: false, builderId: 'b1', constructionYear: 2024,
  possessionStatus: 'Ready to Move', facingDirection: 'East', waterSupply: 'Corporation',
  electricityBackup: true, propertyAge: 1, ownershipType: 'Freehold', reraNumber: '',
  societyName: '', leaseDuration: undefined, availableFrom: undefined, rentalStatus: undefined,
};

export function AdminAddEditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, addProperty, updateProperty } = useStoreContext();
  const isEdit = !!id;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isEdit && id) {
      const existing = properties.find(p => p.id === id);
      if (existing) {
        const { id: _, createdAt: __, ...rest } = existing;
        setForm(rest);
      }
    }
    window.scrollTo(0, 0);
  }, [id, isEdit, properties]);

  const update = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address || form.area <= 0) {
      toast.error('Please fill all required fields');
      return;
    }
    if (isEdit && id) {
      updateProperty(id, form);
      toast.success('Property updated successfully');
    } else {
      addProperty(form);
      toast.success('Property added successfully');
    }
    navigate('/admin/properties');
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/properties">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold">{isEdit ? 'Edit Property' : 'Add Property'}</h1>
          <p className="text-muted-foreground">{isEdit ? 'Update property details' : 'Create a new listing'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic">
          <TabsList className="w-full justify-start overflow-x-auto hide-scrollbar mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="details">Housing Details</TabsTrigger>
            <TabsTrigger value="rental">Rental</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
          </TabsList>

          {/* Basic Info */}
          <TabsContent value="basic">
            <Card className="p-6 space-y-4">
              <div>
                <Label className="mb-1.5 block">Property Name *</Label>
                <Input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Skyline Residences" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1.5 block">Property Type</Label>
                  <select value={form.type} onChange={(e) => update('type', e.target.value as PropertyType)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Buy / Rent</Label>
                  <select value={form.listingType} onChange={(e) => update('listingType', e.target.value as ListingType)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">City</Label>
                  <select value={form.city} onChange={(e) => update('city', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block">Locality</Label>
                  <Input value={form.locality} onChange={(e) => update('locality', e.target.value)} placeholder="e.g. Bandra West" />
                </div>
                <div>
                  <Label className="mb-1.5 block">State</Label>
                  <Input value={form.state} onChange={(e) => update('state', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block">Address *</Label>
                  <Input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Full address" required />
                </div>
                <div>
                  <Label className="mb-1.5 block">Pincode</Label>
                  <Input value={form.pincode} onChange={(e) => update('pincode', e.target.value)} placeholder="400001" />
                </div>
              </div>
              <div>
                <Label className="mb-1.5 block">Description</Label>
                <Textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} placeholder="Property description..." />
              </div>
            </Card>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing">
            <Card className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {form.listingType === 'sale' ? (
                  <div>
                    <Label className="mb-1.5 block">Sale Price (₹)</Label>
                    <Input type="number" value={form.salePrice} onChange={(e) => update('salePrice', Number(e.target.value))} />
                  </div>
                ) : (
                  <>
                    <div>
                      <Label className="mb-1.5 block">Rent Amount (₹/mo)</Label>
                      <Input type="number" value={form.rentAmount || ''} onChange={(e) => update('rentAmount', Number(e.target.value))} />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Deposit (₹)</Label>
                      <Input type="number" value={form.deposit || ''} onChange={(e) => update('deposit', Number(e.target.value))} />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Maintenance (₹/mo)</Label>
                      <Input type="number" value={form.maintenance || ''} onChange={(e) => update('maintenance', Number(e.target.value))} />
                    </div>
                  </>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Housing Details */}
          <TabsContent value="details">
            <Card className="p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <Label className="mb-1.5 block">Bedrooms</Label>
                  <Input type="number" value={form.bedrooms} onChange={(e) => update('bedrooms', Number(e.target.value))} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Bathrooms</Label>
                  <Input type="number" value={form.bathrooms} onChange={(e) => update('bathrooms', Number(e.target.value))} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Balconies</Label>
                  <Input type="number" value={form.balconies} onChange={(e) => update('balconies', Number(e.target.value))} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Area (sq.ft)</Label>
                  <Input type="number" value={form.area} onChange={(e) => update('area', Number(e.target.value))} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Floor</Label>
                  <Input type="number" value={form.floor} onChange={(e) => update('floor', Number(e.target.value))} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Total Floors</Label>
                  <Input type="number" value={form.totalFloors} onChange={(e) => update('totalFloors', Number(e.target.value))} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Parking</Label>
                  <Input type="number" value={form.parking} onChange={(e) => update('parking', Number(e.target.value))} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Construction Year</Label>
                  <Input type="number" value={form.constructionYear} onChange={(e) => update('constructionYear', Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1.5 block">Furnishing</Label>
                  <select value={form.furnishing} onChange={(e) => update('furnishing', e.target.value as Furnishing)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                    <option>Furnished</option>
                    <option>Semi-Furnished</option>
                    <option>Unfurnished</option>
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Possession Status</Label>
                  <select value={form.possessionStatus} onChange={(e) => update('possessionStatus', e.target.value as PossessionStatus)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                    {POSSESSION_STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Facing Direction</Label>
                  <select value={form.facingDirection} onChange={(e) => update('facingDirection', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                    {FACING_DIRECTIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Water Supply</Label>
                  <select value={form.waterSupply} onChange={(e) => update('waterSupply', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                    <option>Corporation</option>
                    <option>Borewell</option>
                    <option>Both</option>
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Ownership Type</Label>
                  <select value={form.ownershipType} onChange={(e) => update('ownershipType', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                    {OWNERSHIP_TYPES.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Property Age (years)</Label>
                  <Input type="number" value={form.propertyAge} onChange={(e) => update('propertyAge', Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block">RERA Number</Label>
                  <Input value={form.reraNumber} onChange={(e) => update('reraNumber', e.target.value)} placeholder="RERA-XXX-0000" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Society Name</Label>
                  <Input value={form.societyName} onChange={(e) => update('societyName', e.target.value)} />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.readyToMove} onChange={(e) => update('readyToMove', e.target.checked)} className="rounded" />
                  Ready to Move
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.petFriendly} onChange={(e) => update('petFriendly', e.target.checked)} className="rounded" />
                  Pet Friendly
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.electricityBackup} onChange={(e) => update('electricityBackup', e.target.checked)} className="rounded" />
                  Electricity Backup
                </label>
              </div>
            </Card>
          </TabsContent>

          {/* Rental */}
          <TabsContent value="rental">
            <Card className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1.5 block">Lease Duration</Label>
                  <select value={form.leaseDuration || ''} onChange={(e) => update('leaseDuration', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" disabled={form.listingType !== 'rent'}>
                    <option value="">Select</option>
                    <option>12 months</option>
                    <option>24 months</option>
                    <option>36 months</option>
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Available From</Label>
                  <Input type="date" value={form.availableFrom || ''} onChange={(e) => update('availableFrom', e.target.value)} disabled={form.listingType !== 'rent'} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Rental Status</Label>
                  <select value={form.rentalStatus || ''} onChange={(e) => update('rentalStatus', e.target.value as any)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" disabled={form.listingType !== 'rent'}>
                    <option value="">Select</option>
                    <option>Available</option>
                    <option>Occupied</option>
                  </select>
                </div>
              </div>
              {form.listingType !== 'rent' && (
                <p className="text-sm text-muted-foreground">Rental fields are only available for rent listings.</p>
              )}
            </Card>
          </TabsContent>

          {/* Amenities */}
          <TabsContent value="amenities">
            <Card className="p-6">
              <Label className="mb-3 block">Select Amenities</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {AMENITIES_LIST.map(a => (
                  <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.amenities.includes(a)}
                      onChange={(e) => {
                        if (e.target.checked) update('amenities', [...form.amenities, a]);
                        else update('amenities', form.amenities.filter(x => x !== a));
                      }}
                      className="rounded"
                    />
                    {a}
                  </label>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6">
          <Button type="submit" className="gap-2 font-semibold"><Save className="w-4 h-4" /> {isEdit ? 'Update Property' : 'Add Property'}</Button>
          <Link to="/admin/properties"><Button type="button" variant="outline">Cancel</Button></Link>
        </div>
      </form>
    </div>
  );
}
