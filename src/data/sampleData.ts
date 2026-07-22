import type { Property, City, Builder, Testimonial, FAQ } from '@/types';
import { PEXEL_IMAGES, AMENITIES_LIST, FACING_DIRECTIONS, OWNERSHIP_TYPES } from '@/constants';

export const cities: City[] = [
  { id: 'c1', name: 'Mumbai', state: 'Maharashtra', image: PEXEL_IMAGES.cities[0], propertyCount: 8 },
  { id: 'c2', name: 'Delhi', state: 'Delhi', image: PEXEL_IMAGES.cities[1], propertyCount: 5 },
  { id: 'c3', name: 'Bangalore', state: 'Karnataka', image: PEXEL_IMAGES.cities[2], propertyCount: 6 },
  { id: 'c4', name: 'Hyderabad', state: 'Telangana', image: PEXEL_IMAGES.cities[3], propertyCount: 3 },
  { id: 'c5', name: 'Pune', state: 'Maharashtra', image: PEXEL_IMAGES.cities[4], propertyCount: 4 },
  { id: 'c6', name: 'Chennai', state: 'Tamil Nadu', image: PEXEL_IMAGES.cities[5], propertyCount: 2 },
  { id: 'c7', name: 'Kolkata', state: 'West Bengal', image: PEXEL_IMAGES.cities[0], propertyCount: 1 },
  { id: 'c8', name: 'Gurgaon', state: 'Haryana', image: PEXEL_IMAGES.cities[1], propertyCount: 3 },
  { id: 'c9', name: 'Noida', state: 'Uttar Pradesh', image: PEXEL_IMAGES.cities[2], propertyCount: 2 },
  { id: 'c10', name: 'Ahmedabad', state: 'Gujarat', image: PEXEL_IMAGES.cities[3], propertyCount: 1 },
];

export const builders: Builder[] = [
  { id: 'b1', name: 'Lodha Group', logo: 'L', established: 1980, projects: 350, rating: 4.7, description: 'India\'s largest real estate developer with iconic landmarks.' },
  { id: 'b2', name: 'DLF Ltd', logo: 'D', established: 1946, projects: 300, rating: 4.6, description: 'Pioneers in Indian real estate and commercial spaces.' },
  { id: 'b3', name: 'Prestige Group', logo: 'P', established: 1986, projects: 285, rating: 4.8, description: 'South India\'s most trusted real estate brand.' },
  { id: 'b4', name: 'Godrej Properties', logo: 'G', established: 1990, projects: 200, rating: 4.5, description: 'Sustainable and innovative living spaces.' },
  { id: 'b5', name: 'Brigade Group', logo: 'B', established: 1986, projects: 250, rating: 4.5, description: 'Premium residential and commercial developments.' },
  { id: 'b6', name: 'Oberoi Realty', logo: 'O', established: 1998, projects: 50, rating: 4.9, description: 'Boutique luxury developments in Mumbai.' },
  { id: 'b7', name: 'Sobha Limited', logo: 'S', established: 1995, projects: 400, rating: 4.7, description: 'Backward integration model for quality construction.' },
  { id: 'b8', name: 'Embassy Group', logo: 'E', established: 1993, projects: 180, rating: 4.6, description: 'Leading commercial and residential developer.' },
];

const localities: Record<string, string[]> = {
  Mumbai: ['Bandra West', 'Worli', 'Juhu', 'Powai', 'Andheri West'],
  Delhi: ['Vasant Vihar', 'GK II', 'Saket', 'Dwarka', 'Rohini'],
  Bangalore: ['Whitefield', 'Indiranagar', 'Koramangala', 'HSR Layout', 'Jayanagar'],
  Hyderabad: ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City', 'Madhapur'],
  Pune: ['Koregaon Park', 'Baner', 'Kharadi', 'Hinjewadi', 'Viman Nagar'],
  Chennai: ['Adyar', 'Anna Nagar', 'T Nagar', 'OMR', 'Velachery'],
  Kolkata: ['Salt Lake', 'New Town', 'Ballygunge', 'Alipore', 'Rajarhat'],
  Gurgaon: ['DLF Phase 5', 'Golf Course Road', 'Sohna Road', 'Cyber City', 'MG Road'],
  Noida: ['Sector 50', 'Sector 78', 'Noida Extension', 'Sector 150', 'Sector 62'],
  Ahmedabad: ['Bodakdev', 'Vastrapur', 'Prahlad Nagar', 'SG Highway', 'Thaltej'],
};

const propertyNames = [
  'Skyline Residences', 'Green Valley Villas', 'Royal Heights', 'Lakeview Apartments',
  'Palm Grove Estate', 'Urban Nest', 'The Crown Towers', 'Serenity Gardens',
  'Imperial Park', 'Sunrise Meadows', 'Heritage Square', 'The Address',
  'Cloud Nine', 'Marina Bay', 'The Oasis', 'Maple Heights',
  'Aurum Villas', 'The Palm Court', 'Sky Vista', 'Green Acres',
  'The Metropolitan', 'Riverside Court', 'The Belvedere', 'Lotus Garden',
  'The Grandeur', 'Skyline Pinnacle', 'Emerald Court', 'The Capitol',
  'Verve Residences', 'The Landmark',
];

const propertyTypeMap: Property['type'][] = [
  'Apartment', 'Villa', 'Independent House', 'Bungalow', 'Duplex', 'Penthouse',
  'Studio Apartment', 'Farm House', 'Commercial Office', 'Shop', 'Apartment',
  'Villa', 'Apartment', 'Penthouse', 'Villa', 'Apartment',
  'Bungalow', 'Apartment', 'Duplex', 'Independent House',
  'Commercial Office', 'Apartment', 'Penthouse', 'Apartment',
  'Villa', 'Penthouse', 'Apartment', 'Commercial Office',
  'Apartment', 'Villa',
];

function getImages(type: string, i: number): string[] {
  const allInteriors = PEXEL_IMAGES.interiors;
  let exteriors: string[];
  if (type === 'Villa' || type === 'Bungalow' || type === 'Farm House') exteriors = PEXEL_IMAGES.villas;
  else if (type === 'Independent House' || type === 'Duplex') exteriors = PEXEL_IMAGES.houses;
  else if (type === 'Commercial Office' || type === 'Shop') exteriors = PEXEL_IMAGES.commercial;
  else exteriors = PEXEL_IMAGES.apartments;
  return [
    exteriors[i % exteriors.length],
    allInteriors[i % allInteriors.length],
    allInteriors[(i + 2) % allInteriors.length],
    allInteriors[(i + 4) % allInteriors.length],
  ];
}

function randomAmenities(i: number): string[] {
  const count = 4 + (i % 5);
  const result: string[] = [];
  for (let j = 0; j < count; j++) {
    result.push(AMENITIES_LIST[(i + j) % AMENITIES_LIST.length]);
  }
  return [...new Set(result)];
}

export const properties: Property[] = Array.from({ length: 30 }, (_, i) => {
  const city = cities[i % cities.length];
  const type = propertyTypeMap[i];
  const isRent = i % 3 === 0;
  const locality = localities[city.name][i % localities[city.name].length];
  const bedrooms = type === 'Studio Apartment' || type === 'PG/Hostel' || type === 'Shop' || type === 'Land/Plot' || type === 'Commercial Office' ? (type === 'Commercial Office' ? 0 : 1) : (2 + (i % 4));
  const salePrice = 5000000 + (i * 3000000) + (type === 'Villa' || type === 'Penthouse' || type === 'Bungalow' ? 15000000 : 0) + (type === 'Farm House' ? 20000000 : 0);
  const rentAmount = 15000 + (i * 5000) + (bedrooms * 8000);

  return {
    id: `p${i + 1}`,
    name: propertyNames[i],
    type,
    listingType: isRent ? 'rent' : 'sale',
    rentAmount: isRent ? rentAmount : undefined,
    salePrice: isRent ? undefined : salePrice,
    deposit: isRent ? rentAmount * 2 : undefined,
    maintenance: isRent ? 2000 + (i * 500) : undefined,
    bedrooms,
    bathrooms: Math.max(1, bedrooms - 1 + (i % 2)),
    balconies: type === 'Apartment' || type === 'Penthouse' || type === 'Duplex' ? 1 + (i % 3) : 0,
    floor: type === 'Villa' || type === 'Bungalow' || type === 'Independent House' || type === 'Farm House' ? 0 : 1 + (i % 15),
    totalFloors: type === 'Villa' || type === 'Bungalow' || type === 'Independent House' || type === 'Farm House' ? 2 : 10 + (i % 20),
    area: 450 + (i * 150) + (type === 'Villa' || type === 'Bungalow' ? 1500 : 0) + (type === 'Farm House' ? 3000 : 0) + (type === 'Penthouse' ? 1000 : 0),
    furnishing: ['Furnished', 'Semi-Furnished', 'Unfurnished'][i % 3] as Property['furnishing'],
    parking: 1 + (i % 3),
    address: `${i + 1}, ${locality}, ${city.name}`,
    locality,
    city: city.name,
    state: city.state,
    pincode: `${400000 + i * 11111}`.slice(0, 6),
    description: `${propertyNames[i]} is a premium ${type.toLowerCase()} located in the heart of ${locality}, ${city.name}. This beautifully designed property offers ${bedrooms} bedrooms with modern architecture, spacious interiors, and world-class amenities. Perfect for families looking for a luxurious lifestyle with excellent connectivity to schools, hospitals, shopping centers, and IT hubs. The property features top-quality fittings, ample natural light, cross ventilation, and a serene environment. A rare opportunity to own/rent a dream home in one of ${city.name}'s most sought-after neighborhoods.`,
    amenities: randomAmenities(i),
    images: getImages(type, i),
    rating: 3.8 + ((i % 12) / 10),
    popular: 100 - i * 2 + (i % 5) * 10,
    createdAt: new Date(2025, 0, 1 + i * 2).toISOString(),
    readyToMove: i % 2 === 0,
    petFriendly: i % 4 === 0,
    builderId: builders[i % builders.length].id,
    constructionYear: 2015 + (i % 10),
    possessionStatus: i % 3 === 0 ? 'Under Construction' : i % 3 === 1 ? 'Ready to Move' : 'New Launch',
    facingDirection: FACING_DIRECTIONS[i % FACING_DIRECTIONS.length],
    waterSupply: ['Corporation', 'Borewell', 'Both'][i % 3],
    electricityBackup: i % 2 === 0,
    propertyAge: (2025 - (2015 + (i % 10))),
    ownershipType: OWNERSHIP_TYPES[i % OWNERSHIP_TYPES.length],
    reraNumber: `RERA-${city.name.slice(0, 3).toUpperCase()}-${1000 + i}`,
    societyName: `${propertyNames[i]} Society`,
    leaseDuration: isRent ? ['12 months', '24 months', '36 months'][i % 3] : undefined,
    availableFrom: isRent ? new Date(2025, (i % 12), 1 + (i % 28)).toISOString().slice(0, 10) : undefined,
    rentalStatus: isRent ? (i % 2 === 0 ? 'Available' : 'Occupied') : undefined,
  };
});

export const testimonials: Testimonial[] = Array.from({ length: 20 }, (_, i) => ({
  id: `t${i + 1}`,
  name: ['Aarav Sharma', 'Diya Patel', 'Vivaan Reddy', 'Ananya Gupta', 'Reyansh Kumar', 'Ishaan Mehta', 'Saanvi Iyer', 'Aditya Nair', 'Kiara Singh', 'Arjun Verma', 'Myra Joshi', 'Kabir Malhotra', 'Aisha Khan', 'Rohan Desai', 'Navya Rao', 'Dhruv Bansal', 'Sara Kapoor', 'Veer Chauhan', 'Anika Jain', 'Atharv Pillai'][i],
  role: ['Home Buyer', 'Tenant', 'Investor', 'NRI Client', 'First-time Buyer', 'Property Seller'][i % 6],
  avatar: PEXEL_IMAGES.avatars[i % PEXEL_IMAGES.avatars.length],
  rating: 4 + (i % 2),
  text: [
    'Nestora made finding my dream home effortless. The interface is beautiful and the filters are incredibly detailed!',
    'I rented my apartment within 3 days of listing. The platform is intuitive and the support is excellent.',
    'As an NRI, I needed a trusted portal to invest in Indian real estate. Nestora exceeded my expectations.',
    'The property details are so comprehensive — floor plans, amenities, nearby places, everything in one place.',
    'Best real estate portal I\'ve used. The premium feel and smooth experience sets it apart from others.',
    'Found the perfect villa for my family. The neighborhood insights were spot on!',
    'The admin dashboard analytics are fantastic for managing my property portfolio.',
    'Smooth, fast, and elegant. Nestora redefined my house-hunting experience.',
    'The comparison and favorite features saved me hours of research.',
    'As a builder, the property management tools are powerful yet simple.',
    'The contact owner feature is seamless. Got a response within hours!',
    'Beautiful UI, detailed listings, and great customer testimonials. Highly recommend Nestora.',
    'I love how I can save searches and get notified about new properties in my favorite localities.',
    'The map view and nearby places feature helped me choose the right neighborhood.',
    'Nestora\'s premium design makes browsing properties a joy. Five stars!',
    'From search to contact, the entire flow is polished and professional.',
    'The rental management section is very well thought out for landlords.',
    'Excellent portal with a luxury feel. The property cards are gorgeous.',
    'Found a commercial office space for my startup in days. Amazing platform!',
    'Nestora is the future of real estate in India. Simply brilliant.',
  ][i],
}));

export const faqs: FAQ[] = [
  { id: 'f1', question: 'How do I search for properties on Nestora?', answer: 'Use the search bar on the homepage to filter by city, locality, buy/rent, property type, budget, and more. You can also browse by category or city.', category: 'General' },
  { id: 'f2', question: 'Is Nestora free to use?', answer: 'Yes, browsing properties, saving favorites, and contacting owners is completely free for users.', category: 'General' },
  { id: 'f3', question: 'How do I contact a property owner?', answer: 'Click on any property to view details, then use the "Contact Owner" button to send an enquiry with your details and preferred visit time.', category: 'Enquiries' },
  { id: 'f4', question: 'Can I save properties to view later?', answer: 'Yes, click the heart icon on any property card to add it to your favorites. You can view all saved properties in your dashboard.', category: 'Favorites' },
  { id: 'f5', question: 'How accurate are the property listings?', answer: 'We strive to keep listings accurate and up-to-date. However, we recommend verifying details with the owner before making any decisions.', category: 'Listings' },
  { id: 'f6', question: 'What is RERA and why is it important?', answer: 'RERA (Real Estate Regulatory Authority) is a regulatory body that protects homebuyer interests. Always check the RERA number before buying.', category: 'Legal' },
  { id: 'f7', question: 'Can I list my property on Nestora?', answer: 'Yes, if you have admin access, you can add, edit, and manage properties through the Admin Dashboard.', category: 'Listings' },
  { id: 'f8', question: 'How do I edit or remove my listing?', answer: 'Admin users can manage all listings from the Property Management section in the dashboard.', category: 'Listings' },
  { id: 'f9', question: 'What documents should I check before buying?', answer: 'Title deed, RERA approval, occupancy certificate, property tax receipts, and the sale agreement are essential documents to verify.', category: 'Legal' },
  { id: 'f10', question: 'Does Nestora offer home loans?', answer: 'Nestora currently focuses on property listings. We recommend consulting with your bank for home loan options.', category: 'General' },
  { id: 'f11', question: 'How do I schedule a property visit?', answer: 'Use the Contact Owner form on any property page and include your preferred visit time. The owner will get in touch to confirm.', category: 'Enquiries' },
  { id: 'f12', question: 'What are the common additional costs when buying?', answer: 'Stamp duty, registration charges, GST (for under-construction), maintenance deposit, and brokerage (if applicable) are common costs.', category: 'Pricing' },
  { id: 'f13', question: 'Can I filter properties by amenities?', answer: 'Yes, the filter panel on the listings page allows you to filter by amenities like swimming pool, gym, security, and more.', category: 'Search' },
  { id: 'f14', question: 'How do I know if a property is ready to move in?', answer: 'Each listing shows the possession status. You can also filter by "Ready to Move" in the search filters.', category: 'Search' },
  { id: 'f15', question: 'Is my personal information safe on Nestora?', answer: 'Yes, we take privacy seriously. Your contact details are only shared with property owners when you submit an enquiry.', category: 'Privacy' },
];
