import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bed, Bath, Maximize, Car, Building, MapPin, Star, Heart, Share2,
  ChevronLeft, Check, Phone, Calendar, Compass, Droplets, Zap, Home,
  Sofa, Layers, CalendarClock, ShieldCheck, FileText, ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyCard } from '@/components/PropertyCard';
import { ContactOwnerDialog } from '@/components/ContactOwnerDialog';
import { useStoreContext } from '@/hooks/StoreContext';
import { builders, cities } from '@/data/sampleData';
import { NEARBY_PLACES } from '@/constants';
import { formatPrice, formatRent, formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

export function PropertyDetailsPage() {
  const { id } = useParams();
  const { properties, isFavorite, toggleFavorite, addRecentView } = useStoreContext();
  const [activeImage, setActiveImage] = useState(0);

  const property = properties.find(p => p.id === id);

  useEffect(() => {
    if (property) addRecentView(property.id);
    window.scrollTo(0, 0);
  }, [property, addRecentView]);

  const similar = useMemo(() => {
    if (!property) return [];
    return properties.filter(p => p.id !== property.id && (p.type === property.type || p.city === property.city)).slice(0, 3);
  }, [properties, property]);

  if (!property) {
    return (
      <div className="pt-32 container mx-auto px-4 text-center min-h-[60vh]">
        <h1 className="font-display text-2xl font-bold mb-4">Property not found</h1>
        <Link to="/properties"><Button>Back to Listings</Button></Link>
      </div>
    );
  }

  const builder = builders.find(b => b.id === property.builderId);
  const fav = isFavorite(property.id);

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <Link to="/properties" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex gap-2 mb-2">
              <Badge className={property.listingType === 'rent' ? "bg-accent text-white" : "bg-gold text-primary"}>
                {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
              </Badge>
              <Badge variant="outline">{property.type}</Badge>
              {property.possessionStatus === 'New Launch' && <Badge className="bg-red-500 text-white">New Launch</Badge>}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{property.name}</h1>
            <p className="text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" /> {property.address}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="font-semibold">{property.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">{property.popular}+ views</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => toggleFavorite(property.id)}>
              <Heart className={cn("w-4 h-4", fav && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="outline" size="icon"><Share2 className="w-4 h-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden border-0 shadow-luxury">
                <div className="aspect-[16/10] relative bg-muted">
                  <img src={property.images[activeImage]} alt={property.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2 p-3 overflow-x-auto hide-scrollbar">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn("w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                        i === activeImage ? "border-accent" : "border-transparent opacity-60 hover:opacity-100")}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Bed, label: 'Bedrooms', value: property.bedrooms || '—' },
                { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                { icon: Maximize, label: 'Area', value: `${property.area} sq.ft` },
                { icon: Car, label: 'Parking', value: property.parking },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <Card key={s.label} className="p-4 text-center">
                    <Icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <p className="font-bold text-lg">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </Card>
                );
              })}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start overflow-x-auto hide-scrollbar">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
                <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-3">About this property</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>
                </Card>
              </TabsContent>

              <TabsContent value="amenities">
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map(a => (
                      <div key={a} className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        {a}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="nearby">
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Nearby Places</h3>
                  <div className="space-y-3">
                    {NEARBY_PLACES.map(n => (
                      <div key={n.label} className="flex items-center justify-between py-2 border-b last:border-0">
                        <span className="text-sm font-medium">{n.label}</span>
                        <Badge variant="secondary">{n.distance}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="floorplan">
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Floor Plan</h3>
                  <div className="aspect-[4/3] rounded-xl bg-muted/50 border-2 border-dashed border-border flex flex-col items-center justify-center">
                    <Layers className="w-12 h-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-sm">Floor plan placeholder</p>
                    <p className="text-xs text-muted-foreground mt-1">Detailed floor plan available on request</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="location">
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Location</h3>
                  <div className="aspect-[16/10] rounded-xl bg-muted/50 border-2 border-dashed border-border flex flex-col items-center justify-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-sm">Google Maps placeholder</p>
                    <p className="text-xs text-muted-foreground mt-1">{property.address}</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    <DetailRow icon={Building} label="Property Type" value={property.type} />
                    <DetailRow icon={Home} label="Furnishing" value={property.furnishing} />
                    <DetailRow icon={Layers} label="Floor" value={`${property.floor} of ${property.totalFloors}`} />
                    <DetailRow icon={Maximize} label="Area" value={`${property.area} sq.ft`} />
                    <DetailRow icon={Calendar} label="Construction Year" value={String(property.constructionYear)} />
                    <DetailRow icon={Compass} label="Facing" value={property.facingDirection} />
                    <DetailRow icon={Droplets} label="Water Supply" value={property.waterSupply} />
                    <DetailRow icon={Zap} label="Electricity Backup" value={property.electricityBackup ? 'Yes' : 'No'} />
                    <DetailRow icon={Sofa} label="Balconies" value={String(property.balconies)} />
                    <DetailRow icon={CalendarClock} label="Possession Status" value={property.possessionStatus} />
                    <DetailRow icon={ShieldCheck} label="Ownership" value={property.ownershipType} />
                    <DetailRow icon={FileText} label="RERA Number" value={property.reraNumber} />
                    <DetailRow icon={Building} label="Society Name" value={property.societyName} />
                    <DetailRow icon={Calendar} label="Property Age" value={`${property.propertyAge} years`} />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Price + Contact + Builder */}
          <div className="space-y-4">
            <Card className="p-6 shadow-luxury sticky top-24">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {property.listingType === 'rent' ? 'Monthly Rent' : 'Sale Price'}
                </p>
                <p className="font-display text-3xl font-bold text-primary">
                  {property.listingType === 'rent'
                    ? formatRent(property.rentAmount || 0)
                    : formatPrice(property.salePrice || 0)}
                </p>
                {property.listingType === 'rent' && (
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>Deposit</span><span className="font-medium text-foreground">{formatPrice(property.deposit || 0)}</span></div>
                    <div className="flex justify-between"><span>Maintenance</span><span className="font-medium text-foreground">₹{property.maintenance || 0}/mo</span></div>
                    <div className="flex justify-between"><span>Lease</span><span className="font-medium text-foreground">{property.leaseDuration}</span></div>
                  </div>
                )}
              </div>

              <ContactOwnerDialog property={property} />

              <div className="mt-4 pt-4 border-t space-y-3">
                <h4 className="font-semibold text-sm">Owner Details</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-navy-gradient flex items-center justify-center text-gold font-bold">
                    {builder?.logo || 'N'}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{builder?.name || 'Nestora Realty'}</p>
                    <p className="text-xs text-muted-foreground">Verified Owner</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" /> Contact via Nestora
                </div>
              </div>
            </Card>

            {builder && (
              <Card className="p-5">
                <h4 className="font-semibold mb-2">About {builder.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">{builder.description}</p>
                <div className="flex justify-between text-xs">
                  <span>Est. {builder.established}</span>
                  <span>{builder.projects}+ Projects</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-gold text-gold" />{builder.rating}</span>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium ml-auto text-right">{value}</span>
    </div>
  );
}
