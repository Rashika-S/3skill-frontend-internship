import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Bed, Bath, Maximize, Car, MapPin, Star, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStoreContext } from '@/hooks/StoreContext';
import { formatPrice, formatRent } from '@/lib/format';
import type { Property } from '@/types';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  index?: number;
  layout?: 'grid' | 'list';
}

export function PropertyCard({ property, index = 0, layout = 'grid' }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useStoreContext();
  const fav = isFavorite(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <Card className={cn(
        "overflow-hidden border-border/60 shadow-luxury property-card-hover group",
        layout === 'list' && "flex flex-row"
      )}>
        <Link to={`/property/${property.id}`} className={cn(
          "relative overflow-hidden block",
          layout === 'list' ? "w-72 shrink-0" : "aspect-[4/3]"
        )}>
          <img
            src={property.images[0]}
            alt={property.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={cn(
              "border-0 font-semibold shadow-md",
              property.listingType === 'rent'
                ? "bg-accent text-white"
                : "bg-gold text-primary"
            )}>
              {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </Badge>
            {property.possessionStatus === 'New Launch' && (
              <Badge className="bg-red-500 text-white border-0 shadow-md">New Launch</Badge>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-transform hover:scale-110 active:scale-90"
            aria-label="Toggle favorite"
          >
            <Heart className={cn("w-4 h-4 transition-colors", fav ? "fill-red-500 text-red-500" : "text-foreground")} />
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="text-xs font-semibold">{property.rating.toFixed(1)}</span>
          </div>
        </Link>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <Link to={`/property/${property.id}`}>
                <h3 className="font-display text-lg font-semibold leading-tight hover:text-accent transition-colors">
                  {property.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {property.locality}, {property.city}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-primary">
                {property.listingType === 'rent'
                  ? formatRent(property.rentAmount || 0)
                  : formatPrice(property.salePrice || 0)}
              </p>
              <p className="text-xs text-muted-foreground">{property.type}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground my-3 flex-wrap">
            <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {property.bedrooms} BHK</span>
            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {property.bathrooms} Bath</span>
            <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {property.area} sq.ft</span>
            <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {property.parking}</span>
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
            <Badge variant="outline" className="text-xs font-normal">
              <Building2 className="w-3 h-3 mr-1" />
              {property.furnishing}
            </Badge>
            <Link to={`/property/${property.id}`}>
              <Button size="sm" variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 font-semibold text-xs h-8">
                Contact Owner
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/60">
      <div className="aspect-[4/3] animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-2/3 rounded animate-shimmer" />
        <div className="h-3 w-1/2 rounded animate-shimmer" />
        <div className="flex gap-4">
          <div className="h-3 w-16 rounded animate-shimmer" />
          <div className="h-3 w-16 rounded animate-shimmer" />
          <div className="h-3 w-16 rounded animate-shimmer" />
        </div>
      </div>
    </Card>
  );
}
