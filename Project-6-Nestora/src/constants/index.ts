import {
  Building2,
  Home,
  House,
  Hotel,
  Layers,
  Building,
  Warehouse,
  Trees,
  Briefcase,
  Store,
  Map,
  BedDouble,
  type LucideIcon,
} from 'lucide-react';
import type { PropertyType } from '@/types';

export interface CategoryDef {
  name: PropertyType;
  icon: LucideIcon;
  description: string;
}

export const PROPERTY_CATEGORIES: CategoryDef[] = [
  { name: 'Apartment', icon: Building2, description: 'Modern multi-storey living' },
  { name: 'Villa', icon: Home, description: 'Spacious luxury villas' },
  { name: 'Independent House', icon: House, description: 'Standalone family homes' },
  { name: 'Bungalow', icon: Hotel, description: 'Single-storey premium homes' },
  { name: 'Duplex', icon: Layers, description: 'Two-storey stylish homes' },
  { name: 'Penthouse', icon: Building, description: 'Top-floor luxury living' },
  { name: 'Studio Apartment', icon: BedDouble, description: 'Compact urban living' },
  { name: 'Farm House', icon: Trees, description: 'Serene countryside retreats' },
  { name: 'Commercial Office', icon: Briefcase, description: 'Premium workspaces' },
  { name: 'Shop', icon: Store, description: 'Retail & business spaces' },
  { name: 'Land/Plot', icon: Map, description: 'Build your dream home' },
  { name: 'PG/Hostel', icon: Warehouse, description: 'Affordable shared living' },
];

export const AMENITIES_LIST = [
  'Swimming Pool',
  'Gym',
  'Club House',
  'Lift',
  'Security',
  'CCTV',
  'Garden',
  "Children's Play Area",
  'Power Backup',
  'Parking',
  'Fire Safety',
  'Intercom',
  'Wi-Fi',
  'Air Conditioning',
  'Solar Panels',
  'Rain Water Harvesting',
];

export const NEARBY_PLACES = [
  { label: 'Schools', distance: '1.2 km' },
  { label: 'Hospitals', distance: '2.5 km' },
  { label: 'Shopping Mall', distance: '1.8 km' },
  { label: 'Metro Station', distance: '0.8 km' },
  { label: 'Airport', distance: '12 km' },
  { label: 'IT Park', distance: '4.5 km' },
  { label: 'Supermarket', distance: '0.5 km' },
  { label: 'Restaurant', distance: '0.3 km' },
];

export const FACING_DIRECTIONS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

export const OWNERSHIP_TYPES = ['Freehold', 'Leasehold', 'Co-operative Society', 'Power of Attorney'];

export const PROPERTY_TYPES: PropertyType[] = [
  'Apartment',
  'Villa',
  'Independent House',
  'Bungalow',
  'Duplex',
  'Penthouse',
  'Studio Apartment',
  'Farm House',
  'Commercial Office',
  'Shop',
  'Land/Plot',
  'PG/Hostel',
];

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai',
  'Kolkata', 'Gurgaon', 'Noida', 'Ahmedabad',
];

export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
];

export const BUDGET_RANGES = [
  { value: '0-5000000', label: 'Under ₹50 Lakh' },
  { value: '5000000-10000000', label: '₹50 L - ₹1 Cr' },
  { value: '10000000-25000000', label: '₹1 Cr - ₹2.5 Cr' },
  { value: '25000000-50000000', label: '₹2.5 Cr - ₹5 Cr' },
  { value: '50000000-100000000', label: '₹5 Cr - ₹10 Cr' },
  { value: '100000000-999999999', label: 'Above ₹10 Cr' },
];

export const RENT_BUDGET_RANGES = [
  { value: '0-15000', label: 'Under ₹15,000' },
  { value: '15000-30000', label: '₹15,000 - ₹30,000' },
  { value: '30000-60000', label: '₹30,000 - ₹60,000' },
  { value: '60000-120000', label: '₹60,000 - ₹1.2 L' },
  { value: '120000-999999999', label: 'Above ₹1.2 L' },
];

export const FURNISHING_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];

export const POSSESSION_STATUSES = ['Ready to Move', 'Under Construction', 'New Launch'];

export const CONTACT_INFO = {
  address: 'Nestora Tower, Plot No. 42, Cyber City, Phase 2, Gurgaon 122002, India',
  email: 'hello@nestora.com',
  phone: '+91 98765 43210',
  hours: 'Mon - Sat: 9:00 AM - 8:00 PM',
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#',
    youtube: '#',
  },
};

export const PEXEL_IMAGES = {
  hero: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600',
  apartments: [
    'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
    'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    'https://images.pexels.com/photos/7587167/pexels-photo-7587167.jpeg',
  ],
  villas: [
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    'https://images.pexels.com/photos/2467685/pexels-photo-2467685.jpeg',
    'https://images.pexels.com/photos/1115780/pexels-photo-1115780.jpeg',
  ],
  houses: [
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
    'https://images.pexels.com/photos/32870/pexels-photo-32870.jpeg',
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
  ],
  commercial: [
    'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
    'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg',
  ],
  interiors: [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
    'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg',
    'https://images.pexels.com/photos/1080724/pexels-photo-1080724.jpeg',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
  ],
  cities: [
    'https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg',
    'https://images.pexels.com/photos/1534981/pexels-photo-1534981.jpeg',
    'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
    'https://images.pexels.com/photos/2901208/pexels-photo-2901208.jpeg',
    'https://images.pexels.com/photos/1007452/pexels-photo-1007452.jpeg',
    'https://images.pexels.com/photos/1534981/pexels-photo-1534981.jpeg',
  ],
  avatars: [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
  ],
};
