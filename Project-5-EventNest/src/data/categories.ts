import type { LucideIcon } from "lucide-react";
import {
  GraduationCap, Code2, Wrench, Mic2, Trophy, Sparkles, Music,
  UtensilsCrossed, PartyPopper, Heart, Gem, Home, Flower2, Beer,
  Baby, Briefcase, Users,
} from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  icon: LucideIcon;
  gradient: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  { slug: "college", name: "College Events", icon: GraduationCap, gradient: "from-indigo-500 to-purple-500", blurb: "Fests, fairs & campus fun" },
  { slug: "hackathons", name: "Hackathons", icon: Code2, gradient: "from-fuchsia-500 to-indigo-500", blurb: "Ship, pitch, win" },
  { slug: "workshops", name: "Workshops", icon: Wrench, gradient: "from-sky-500 to-indigo-500", blurb: "Hands-on learning" },
  { slug: "tech-talks", name: "Tech Talks", icon: Mic2, gradient: "from-purple-500 to-blue-500", blurb: "Ideas from the makers" },
  { slug: "sports", name: "Sports", icon: Trophy, gradient: "from-emerald-500 to-blue-500", blurb: "Play, cheer, compete" },
  { slug: "cultural", name: "Cultural Festivals", icon: Sparkles, gradient: "from-rose-500 to-purple-500", blurb: "Colors, dance, tradition" },
  { slug: "concerts", name: "Music Concerts", icon: Music, gradient: "from-pink-500 to-indigo-500", blurb: "Live sets & anthems" },
  { slug: "food", name: "Food Festivals", icon: UtensilsCrossed, gradient: "from-amber-500 to-rose-500", blurb: "Taste the town" },
  { slug: "birthday", name: "Birthday Parties", icon: PartyPopper, gradient: "from-yellow-400 to-pink-500", blurb: "Cakes and confetti" },
  { slug: "wedding", name: "Wedding", icon: Heart, gradient: "from-rose-500 to-fuchsia-500", blurb: "Once-in-a-lifetime" },
  { slug: "engagement", name: "Engagement", icon: Gem, gradient: "from-purple-500 to-rose-500", blurb: "Say yes in style" },
  { slug: "anniversary", name: "Anniversary", icon: Heart, gradient: "from-red-500 to-purple-500", blurb: "Milestones together" },
  { slug: "housewarming", name: "Housewarming", icon: Home, gradient: "from-emerald-500 to-teal-500", blurb: "New beginnings" },
  { slug: "half-saree", name: "Half Saree Ceremony", icon: Flower2, gradient: "from-orange-500 to-pink-500", blurb: "Traditional grace" },
  { slug: "bachelor", name: "Bachelor Party", icon: Beer, gradient: "from-amber-500 to-orange-500", blurb: "One last hurrah" },
  { slug: "baby-shower", name: "Baby Shower", icon: Baby, gradient: "from-pink-400 to-sky-400", blurb: "Little joys" },
  { slug: "corporate", name: "Corporate Events", icon: Briefcase, gradient: "from-slate-500 to-indigo-500", blurb: "Team & business" },
  { slug: "community", name: "Community Events", icon: Users, gradient: "from-teal-500 to-indigo-500", blurb: "Meet your people" },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
