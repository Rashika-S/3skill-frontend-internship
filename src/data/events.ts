export type EventItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  banner: string;
  gallery: string[];
  date: string; // ISO
  time: string;
  venue: string;
  city: string;
  organizer: string;
  organizerAvatar: string;
  price: number;
  seatsAvailable: number;
  totalSeats: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  trending?: boolean;
  description: string;
  schedule: { time: string; title: string; detail: string }[];
  speakers: { name: string; role: string; avatar: string }[];
  tags: string[];
};

const img = (id: string, w = 1200, h = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// Unsplash photo IDs curated for event vibes
const IMG = {
  concert: "photo-1493225457124-a3eb161ffa5f",
  hackathon: "photo-1519389950473-47ba0277781c",
  wedding: "photo-1519741497674-611481863552",
  food: "photo-1555939594-58d7cb561ad1",
  workshop: "photo-1552664730-d307ca884978",
  techtalk: "photo-1591115765373-5207764f72e7",
  sports: "photo-1521412644187-c49fa049e84d",
  cultural: "photo-1533174072545-7a4b6ad7a6c3",
  birthday: "photo-1530103862676-de8c9debad1d",
  corporate: "photo-1511578314322-379afb476865",
  babyShower: "photo-1519689680058-324335c77eba",
  bachelor: "photo-1514362545857-3bc16c4c7d1b",
  house: "photo-1560448204-e02f11c3d0e2",
  engage: "photo-1519741497674-611481863552",
  anniv: "photo-1470229722913-7c0e2dbbafd3",
  festival: "photo-1470225620780-dba8ba36b745",
  community: "photo-1529156069898-49953e39b3ac",
  music2: "photo-1459749411175-04bf5292ceea",
  halfsaree: "photo-1583939003579-730e3918a45a",
};

const speakers = [
  { name: "Ananya Rao", role: "Product Lead, Vercel", avatar: "https://i.pravatar.cc/150?img=47" },
  { name: "Rahul Mehta", role: "Staff Engineer, Stripe", avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Kavya Iyer", role: "Founder, Loop Studios", avatar: "https://i.pravatar.cc/150?img=32" },
  { name: "Arjun Kapoor", role: "DevRel, Supabase", avatar: "https://i.pravatar.cc/150?img=15" },
];

const gallery = (main: string) => [img(main, 1200, 800), img(IMG.festival, 800, 600), img(IMG.workshop, 800, 600), img(IMG.community, 800, 600)];

const scheduleTemplate = [
  { time: "09:00 AM", title: "Doors open", detail: "Check-in and welcome kit" },
  { time: "10:00 AM", title: "Opening keynote", detail: "Setting the stage" },
  { time: "12:30 PM", title: "Lunch & networking", detail: "Curated menu" },
  { time: "02:00 PM", title: "Deep dive sessions", detail: "Parallel tracks" },
  { time: "06:00 PM", title: "Closing party", detail: "Music and drinks" },
];

const mk = (i: number, p: Partial<EventItem>): EventItem => {
  const base: EventItem = {
    id: `evt-${i}`,
    title: "Event " + i,
    slug: `event-${i}`,
    category: "workshops",
    categoryName: "Workshops",
    banner: img(IMG.workshop),
    gallery: gallery(IMG.workshop),
    date: new Date(Date.now() + i * 86400000 * 3).toISOString(),
    time: "6:00 PM",
    venue: "Phoenix Marketcity",
    city: "Bengaluru",
    organizer: "EventNest Collective",
    organizerAvatar: "https://i.pravatar.cc/150?img=5",
    price: 499,
    seatsAvailable: 120,
    totalSeats: 300,
    rating: 4.6,
    reviewsCount: 128,
    description:
      "An unforgettable experience crafted by industry-leading creators. Expect immersive stages, curated food, and a lineup that will keep you moving. This event brings together enthusiasts, professionals, and dreamers under one roof.",
    schedule: scheduleTemplate,
    speakers,
    tags: ["premium", "curated", "2026"],
  };
  return { ...base, ...p };
};

export const EVENTS: EventItem[] = [
  mk(1, { title: "BLD Tech Week 2026", slug: "bld-tech-week-2026", category: "tech-talks", categoryName: "Tech Talks", banner: img(IMG.techtalk), gallery: gallery(IMG.techtalk), city: "Bengaluru", venue: "KTPO Convention Center", price: 1499, rating: 4.9, reviewsCount: 842, featured: true, trending: true, tags: ["conference", "ai", "startups"] }),
  mk(2, { title: "Sunburn Arena · Alan Walker", slug: "sunburn-alan-walker", category: "concerts", categoryName: "Music Concerts", banner: img(IMG.concert), gallery: gallery(IMG.concert), city: "Mumbai", venue: "NSCI Dome", price: 2499, rating: 4.8, reviewsCount: 1204, featured: true, trending: true }),
  mk(3, { title: "HackNight 48 · AI Edition", slug: "hacknight-48-ai", category: "hackathons", categoryName: "Hackathons", banner: img(IMG.hackathon), gallery: gallery(IMG.hackathon), city: "Hyderabad", venue: "T-Hub", price: 299, rating: 4.7, reviewsCount: 342, featured: true, trending: true }),
  mk(4, { title: "The Great Indian Food Fest", slug: "great-indian-food-fest", category: "food", categoryName: "Food Festivals", banner: img(IMG.food), gallery: gallery(IMG.food), city: "Delhi", venue: "Jawaharlal Nehru Stadium", price: 399, rating: 4.5, reviewsCount: 512, trending: true }),
  mk(5, { title: "React India Workshop", slug: "react-india-workshop", category: "workshops", categoryName: "Workshops", banner: img(IMG.workshop), gallery: gallery(IMG.workshop), city: "Goa", venue: "Resort Rio", price: 899, rating: 4.6, reviewsCount: 210, featured: true }),
  mk(6, { title: "IPL Fan Park · Finals Night", slug: "ipl-fan-park", category: "sports", categoryName: "Sports", banner: img(IMG.sports), gallery: gallery(IMG.sports), city: "Chennai", venue: "Marina Grounds", price: 0, rating: 4.4, reviewsCount: 980, trending: true }),
  mk(7, { title: "Rangoli Cultural Nights", slug: "rangoli-cultural-nights", category: "cultural", categoryName: "Cultural Festivals", banner: img(IMG.cultural), gallery: gallery(IMG.cultural), city: "Jaipur", venue: "Amer Fort Lawns", price: 699, rating: 4.7, reviewsCount: 401 }),
  mk(8, { title: "Neha's Sky-High Birthday Bash", slug: "neha-birthday", category: "birthday", categoryName: "Birthday Parties", banner: img(IMG.birthday), gallery: gallery(IMG.birthday), city: "Pune", venue: "The Westin Rooftop", price: 1200, rating: 4.9, reviewsCount: 56 }),
  mk(9, { title: "Aditya × Simran Wedding Reception", slug: "aditya-simran-wedding", category: "wedding", categoryName: "Wedding", banner: img(IMG.wedding), gallery: gallery(IMG.wedding), city: "Udaipur", venue: "Taj Lake Palace", price: 0, rating: 5.0, reviewsCount: 22 }),
  mk(10, { title: "Ring Ceremony · Ishaan & Meera", slug: "ishaan-meera-engagement", category: "engagement", categoryName: "Engagement", banner: img(IMG.engage), gallery: gallery(IMG.engage), city: "Kolkata", venue: "ITC Sonar", price: 0, rating: 4.8, reviewsCount: 14 }),
  mk(11, { title: "25 Years Together · Malhotra Anniversary", slug: "malhotra-anniversary", category: "anniversary", categoryName: "Anniversary", banner: img(IMG.anniv), gallery: gallery(IMG.anniv), city: "Chandigarh", venue: "The Lalit", price: 0, rating: 4.9, reviewsCount: 8 }),
  mk(12, { title: "Griha Pravesh · Kapoor Family", slug: "kapoor-housewarming", category: "housewarming", categoryName: "Housewarming", banner: img(IMG.house), gallery: gallery(IMG.house), city: "Gurugram", venue: "Golf Course Road", price: 0, rating: 4.7, reviewsCount: 10 }),
  mk(13, { title: "Half Saree Function · Sanjana", slug: "sanjana-half-saree", category: "half-saree", categoryName: "Half Saree Ceremony", banner: img(IMG.halfsaree), gallery: gallery(IMG.halfsaree), city: "Vijayawada", venue: "Novotel Convention", price: 0, rating: 4.9, reviewsCount: 12 }),
  mk(14, { title: "Rohit's Bachelor Weekend", slug: "rohit-bachelor", category: "bachelor", categoryName: "Bachelor Party", banner: img(IMG.bachelor), gallery: gallery(IMG.bachelor), city: "Goa", venue: "Baga Beach Villa", price: 3500, rating: 4.8, reviewsCount: 18 }),
  mk(15, { title: "Sprinkle Baby Shower · Baby Aarav", slug: "aarav-baby-shower", category: "baby-shower", categoryName: "Baby Shower", banner: img(IMG.babyShower), gallery: gallery(IMG.babyShower), city: "Bengaluru", venue: "The Leela Palace", price: 0, rating: 4.9, reviewsCount: 24 }),
  mk(16, { title: "FutureCorp Leadership Summit", slug: "futurecorp-summit", category: "corporate", categoryName: "Corporate Events", banner: img(IMG.corporate), gallery: gallery(IMG.corporate), city: "Mumbai", venue: "Grand Hyatt", price: 4999, rating: 4.6, reviewsCount: 132 }),
  mk(17, { title: "Neighborhood Diwali Meetup", slug: "diwali-meetup", category: "community", categoryName: "Community Events", banner: img(IMG.community), gallery: gallery(IMG.community), city: "Bengaluru", venue: "Cubbon Park", price: 0, rating: 4.5, reviewsCount: 220 }),
  mk(18, { title: "Coldplay · Music Of The Spheres", slug: "coldplay-mots", category: "concerts", categoryName: "Music Concerts", banner: img(IMG.music2), gallery: gallery(IMG.music2), city: "Mumbai", venue: "DY Patil Stadium", price: 4999, rating: 4.9, reviewsCount: 3120, featured: true, trending: true }),
  mk(19, { title: "IIT Bombay Techfest", slug: "iit-b-techfest", category: "college", categoryName: "College Events", banner: img(IMG.hackathon), gallery: gallery(IMG.hackathon), city: "Mumbai", venue: "IIT Powai Campus", price: 199, rating: 4.7, reviewsCount: 640, trending: true }),
  mk(20, { title: "TEDx Indiranagar", slug: "tedx-indiranagar", category: "tech-talks", categoryName: "Tech Talks", banner: img(IMG.techtalk), gallery: gallery(IMG.techtalk), city: "Bengaluru", venue: "Chowdiah Memorial", price: 799, rating: 4.8, reviewsCount: 288 }),
];

export const eventBySlug = (slug: string) => EVENTS.find((e) => e.slug === slug);
export const eventsByCategory = (cat: string) => EVENTS.filter((e) => e.category === cat);
export const featuredEvents = () => EVENTS.filter((e) => e.featured);
export const trendingEvents = () => EVENTS.filter((e) => e.trending);
export const upcomingEvents = () =>
  [...EVENTS].sort((a, b) => +new Date(a.date) - +new Date(b.date)).slice(0, 8);
