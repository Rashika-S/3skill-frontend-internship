export type PropertyType =
  | 'Apartment'
  | 'Villa'
  | 'Independent House'
  | 'Bungalow'
  | 'Duplex'
  | 'Penthouse'
  | 'Studio Apartment'
  | 'Farm House'
  | 'Commercial Office'
  | 'Shop'
  | 'Land/Plot'
  | 'PG/Hostel';

export type ListingType = 'sale' | 'rent';
export type Furnishing = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  listingType: ListingType;
  rentAmount?: number;
  salePrice?: number;
  deposit?: number;
  maintenance?: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floor: number;
  totalFloors: number;
  area: number;
  furnishing: Furnishing;
  parking: number;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  description: string;
  amenities: string[];
  images: string[];
  rating: number;
  popular: number;
  createdAt: string;
  readyToMove: boolean;
  petFriendly: boolean;
  builderId: string;
  constructionYear: number;
  possessionStatus: PossessionStatus;
  facingDirection: string;
  waterSupply: string;
  electricityBackup: boolean;
  propertyAge: number;
  ownershipType: string;
  reraNumber: string;
  societyName: string;
  leaseDuration?: string;
  availableFrom?: string;
  rentalStatus?: 'Available' | 'Occupied';
}

export interface City {
  id: string;
  name: string;
  state: string;
  image: string;
  propertyCount: number;
}

export interface Builder {
  id: string;
  name: string;
  logo: string;
  established: number;
  projects: number;
  rating: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyName: string;
  name: string;
  phone: string;
  email: string;
  visitTime: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'archived';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    promotions: boolean;
  };
}

export interface SavedSearch {
  id: string;
  city: string;
  type: string;
  budget: string;
  createdAt: string;
}

export interface FavoriteLocation {
  id: string;
  city: string;
  locality: string;
}
