import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Building2 } from 'lucide-react';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStoreContext } from '@/hooks/StoreContext';

export function FavoritesPage() {
  const { favorites, properties } = useStoreContext();
  const favProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Favorite Properties</h1>
              <p className="text-muted-foreground">{favProperties.length} saved properties</p>
            </div>
          </div>
        </motion.div>

        {favProperties.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">Save properties you love by clicking the heart icon.</p>
            <Link to="/properties">
              <Button className="gap-2">Browse Properties <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favProperties.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
