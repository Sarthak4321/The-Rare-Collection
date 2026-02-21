"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Heart,
  Sparkles,
  Moon,
  Zap,
  MapPin,
  ArrowRight,
  ChevronRight,
  Music,
  Camera,
  Coffee,
  Star,
  Share2,
  Flower2,
  Anchor,
  Film,
  Bed,
  Palette,
  Brush,
  Flame,
  Scissors,
  Mountain,
  Tent,
  Compass,
  Calendar,
  Clock,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  X,
  Info,
  Phone,
  Globe,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

import FloatingAura from "@/components/FloatingAura";
import { supabase } from "@/lib/supabase";

interface Venue {
  id: string;
  vendorId?: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  city: "Kolkata" | "Durgapur";
  priceRange: string;
  price?: number;
  tags: string[];
  description?: string;
  amenities?: string[];
  hours?: string;
  phone?: string;
  menuHighlights?: string;
  menuImageUrl?: string;
  images?: string[];
}

interface Plan {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  image: string;
  venues: Venue[];
}

interface Vibe {
  id: string;
  name: string;
  headline: string;
  tagline: string;
  subcopy: string;
  description: string;
  theme: string;
  accent: string;
  vibeColor: string;
  gradient: string;
  video: string;
  image: string;
  tags: string[];
  plans: Plan[];
  narrative: { time: string; action: string; image: string }[];
}

const VIBES: Vibe[] = [
  {
    id: "romantic",
    name: "Romantic Date",
    headline: "You found a match! What now?",
    tagline: "Slow and Sweet",
    subcopy: "A beautiful dinner with candles.",
    description: "Enjoy a very romantic night with candles, good food, and a quiet garden just for you.",
    theme: "bg-[#0a0a0a]",
    accent: "text-rose-500",
    vibeColor: "#ff2d55",
    gradient: "from-rose-500 via-rose-400 to-rose-600",
    video: "https://assets.mixkit.co/videos/preview/mixkit-romantic-candlelight-dinner-in-a-restaurant-34358-large.mp4",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&q=80",
    tags: ["Dinner", "Flowers", "Music"],
    plans: [
      {
        id: "cafe",
        title: "Cafe Date",
        desc: "A cozy coffee date in a beautiful, quiet spot.",
        icon: Coffee,
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
        venues: [
          { id: "v1k", name: "The Blue Tokai", location: "Park Street", city: "Kolkata", rating: 4.8, priceRange: "$$", tags: ["Specialty Coffee", "Quiet"], image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80", description: "A haven for coffee purists, featuring ethically sourced beans and a minimalist, tranquil atmosphere perfect for deep conversations." },
          { id: "v1d", name: "The Big Cup", location: "City Centre", city: "Durgapur", rating: 4.6, priceRange: "$$", tags: ["Cozy", "Modern"], image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", description: "A modern retreat in the heart of the city, offering artisanal blends and cozy corners designed for long, uninterrupted afternoons." }
        ]
      },
      {
        id: "boat",
        title: "Boat Date",
        desc: "A relaxing boat ride with amazing views.",
        icon: Anchor,
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
        venues: [
          { id: "v4k", name: "Ganges Sunset", location: "Prinsep Ghat", city: "Kolkata", rating: 4.9, priceRange: "$$$", tags: ["Luxury", "Historical"], image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80" },
          { id: "v4d", name: "Barrage Cruise", location: "Durgapur Barrage", city: "Durgapur", rating: 4.5, priceRange: "$$", tags: ["River View", "Nature"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80" }
        ]
      },
      {
        id: "theatre",
        title: "Private Theatre",
        desc: "Your own private cinema with snacks and drinks.",
        icon: Film,
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
        venues: [
          { id: "v6k", name: "The Matterden", location: "Bhowanipore", city: "Kolkata", rating: 4.8, priceRange: "$$$", tags: ["Classic", "Art House"], image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80" },
          { id: "v6d", name: "Dream Screen", location: "Benachity", city: "Durgapur", rating: 4.4, priceRange: "$$", tags: ["Boutique", "Private"], image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80" }
        ]
      },
      {
        id: "space",
        title: "Private Space",
        desc: "A comfortable house or hotel just for you two.",
        icon: Bed,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
        venues: [
          { id: "v8k", name: "The Oberoi Grand", location: "Esplanade", city: "Kolkata", rating: 5.0, priceRange: "$$$$$", tags: ["Heritage", "Royal"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
          { id: "v8d", name: "The Peerless Inn", location: "City Centre", city: "Durgapur", rating: 4.7, priceRange: "$$$", tags: ["Modern", "Vibe"], image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" }
        ]
      }
    ],
    narrative: [
      { time: "START", action: "Walk through a quiet path with candles", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80" },
      { time: "DRINKS", action: "Sit in a nice chair and have a drink", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" },
      { time: "DINNER", action: "Eat a very good meal together", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" },
      { time: "END", action: "Dance slowly under the stars", image: "https://images.unsplash.com/photo-1494510002120-d667c309395f?w=800&q=80" }
    ]
  },
  {
    id: "playful",
    name: "Playful",
    headline: "Unleash your creativity!",
    tagline: "Vibrant and Creative",
    subcopy: "Sip, Paint, and Create.",
    description: "Unleash your inner artist with hands-on workshops and creative experiences designed for two.",
    theme: "bg-[#0a0a0a]",
    accent: "text-blue-400",
    vibeColor: "#0ea5e9",
    gradient: "from-blue-500 via-blue-400 to-blue-600",
    video: "https://assets.mixkit.co/videos/preview/mixkit-artist-painting-on-a-canvas-with-a-brush-34351-large.mp4",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
    tags: ["Creative", "Art", "Workshop"],
    plans: [
      {
        id: "paint",
        title: "Paint & Sip",
        desc: "Express your creativity with wine and color on canvas.",
        icon: Palette,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
        venues: [
          { id: "p1k", name: "Art Station", location: "Salt Lake", city: "Kolkata", rating: 4.7, priceRange: "$$", tags: ["Workshop", "Social"], image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80" },
          { id: "p1d", name: "Creativity Hub", location: "Benachity", city: "Durgapur", rating: 4.5, priceRange: "$$", tags: ["Boutique", "Workshop"], image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80" }
        ]
      },
      {
        id: "pottery",
        title: "Pottery Workshop",
        desc: "Get your hands dirty and mold something beautiful together.",
        icon: Brush,
        image: "https://images.unsplash.com/photo-1563720223185-11003d511394?w=1200&q=80",
        venues: [
          { id: "p3k", name: "The Clay Studio", location: "Tollygunge", city: "Kolkata", rating: 4.8, priceRange: "$$$", tags: ["Handmade", "Cozy"], image: "https://images.unsplash.com/photo-1563720223185-11003d511394?w=800&q=80", description: "Immerse yourselves in the tactile art of pottery. Our studio provides a peaceful escape where you can mold clay and memories together." },
          { id: "p3d", name: "Mati Durgapur", location: "City Centre", city: "Durgapur", rating: 4.7, priceRange: "$$", tags: ["Traditional", "Authentic"], image: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&q=80", description: "Celebrate local craftsmanship. Mati offers an authentic pottery experience, guiding you through traditional techniques in a warm, welcoming space." }
        ]
      },
      {
        id: "candle",
        title: "DIY Candle-Making",
        desc: "Craft custom scents and light up your night with hand-poured candles.",
        icon: Flame,
        image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&q=80",
        venues: [
          { id: "p5k", name: "The Wick Lab", location: "Alipore", city: "Kolkata", rating: 4.9, priceRange: "$$$", tags: ["Scents", "Luxury"], image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&q=80" },
          { id: "p5d", name: "Aroma Studio", location: "Srijani", city: "Durgapur", rating: 4.6, priceRange: "$$", tags: ["Craft", "Date"], image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&q=80" }
        ]
      }
    ],
    narrative: [
      { time: "START", action: "Enter a vibrant studio filled with art", image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80" },
      { time: "CREATE", action: "Get your hands on the materials", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80" },
      { time: "DRINK", action: "Sip some wine while you work", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80" },
      { time: "END", action: "Take home your masterpiece", image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=800&q=80" }
    ]
  },
  {
    id: "calm",
    name: "Adventure",
    headline: "The great outdoors await.",
    tagline: "Wild and Free",
    subcopy: "Trek, Camp, and Explore.",
    description: "Escape the city and embrace the wild with curated outdoor adventures for the bold couple.",
    theme: "bg-[#0a0a0a]",
    accent: "text-emerald-400",
    vibeColor: "#10b981",
    gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
    video: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-mountain-valley-with-a-river-34354-large.mp4",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    tags: ["Nature", "Trek", "Camping"],
    plans: [
      {
        id: "trekking",
        title: "Trekking",
        desc: "Climb new heights and witness breathtaking vistas together.",
        icon: Mountain,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        venues: [
          { id: "a1k", name: "Victoria Memorial", location: "Maidan", city: "Kolkata", rating: 4.9, priceRange: "$", tags: ["Iconic", "Heritage"], image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" },
          { id: "a1d", name: "Gharpanchkot", location: "Purulia", city: "Durgapur", rating: 4.7, priceRange: "$$", tags: ["Hill", "History"], image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" }
        ]
      },
      {
        id: "camping",
        title: "Camping",
        desc: "Spend a night under the stars in a cozy, private campsite.",
        icon: Tent,
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
        venues: [
          { id: "a3k", name: "Eco Park", location: "New Town", city: "Kolkata", rating: 4.6, priceRange: "$$", tags: ["Lakeside", "Peaceful"], image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80" },
          { id: "a3d", name: "Durgapur Barrage", location: "Damodar River", city: "Durgapur", rating: 4.8, priceRange: "$$", tags: ["Riverside", "Sand"], image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80" }
        ]
      },
      {
        id: "tour",
        title: "Couple Tour",
        desc: "A guided journey through hidden trails and scenic wonders.",
        icon: Compass,
        image: "https://images.unsplash.com/photo-1530789253568-d08398a6ec5b?w=800&q=80",
        venues: [
          { id: "a5k", name: "Heritage Walk", location: "North Kolkata", city: "Kolkata", rating: 4.8, priceRange: "$$", tags: ["Vintage", "Culture"], image: "https://images.unsplash.com/photo-1530789253568-d08398a6ec5b?w=800&q=80" }
        ]
      }
    ],
    narrative: [
      { time: "START", action: "Set off on a scenic mountain trail", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
      { time: "PEAK", action: "Reach the summit and soak in the view", image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80" },
      { time: "CAMP", action: "Build a campfire under the stars", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80" },
      { time: "END", action: "Wake up to a golden sunrise", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" }
    ]
  },
  {
    id: "mysterious",
    name: "Mysterious",
    headline: "Keep it a secret.",
    tagline: "Exciting and Private",
    subcopy: "Secret doors and city lights.",
    description: "Enter a secret world with hidden doors, private keys, and amazing views of the city at night.",
    theme: "bg-[#0a0a0a]",
    accent: "text-purple-400",
    vibeColor: "#6366f1",
    gradient: "from-purple-500 via-purple-400 to-purple-600",
    video: "https://assets.mixkit.co/videos/preview/mixkit-night-city-with-car-lights-and-neon-signs-34024-large.mp4",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
    tags: ["Secret", "Night", "Rooftop"],
    plans: [
      {
        id: "cafe",
        title: "Cafe Date",
        desc: "A secret coffee spot only you can find.",
        icon: Coffee,
        image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80",
        venues: [
          { id: "m1k", name: "The Clearing House", location: "Ballard Estate", city: "Kolkata", rating: 4.9, priceRange: "$$$$", tags: ["Hidden", "European"], image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80" },
          { id: "m1d", name: "Bhabani Pathak's Cave", location: "Durgapur Forest", city: "Durgapur", rating: 4.8, priceRange: "$", tags: ["Historical", "Secret"], image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80" }
        ]
      },
      {
        id: "boat",
        title: "Boat Date",
        desc: "A midnight boat ride under the city lights.",
        icon: Anchor,
        image: "https://images.unsplash.com/photo-1499244015948-ac01d3ad93f6?w=800&q=80",
        venues: [
          { id: "m2k", name: "Midnight Sailing", location: "Howrah Bridge", city: "Kolkata", rating: 4.8, priceRange: "$$$", tags: ["Quiet", "Romance"], image: "https://images.unsplash.com/photo-1499244015948-ac01d3ad93f6?w=800&q=80" },
          { id: "m2d", name: "Barrage After Hours", location: "Damodar", city: "Durgapur", rating: 4.5, priceRange: "$$", tags: ["Private", "Night"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80" }
        ]
      },
      {
        id: "theatre",
        title: "Private Theatre",
        desc: "Watch a movie in a hidden, luxury cinema.",
        icon: Film,
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
        venues: [
          { id: "m3k", name: "The Matterden", location: "Prabhadevi", city: "Kolkata", rating: 4.7, priceRange: "$$", tags: ["Classic", "Art House"], image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80" },
          { id: "m3d", name: "Secret Cinema", location: "Srijani", city: "Durgapur", rating: 4.4, priceRange: "$$", tags: ["Underground", "Cozy"], image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80" }
        ]
      },
      {
        id: "space",
        title: "Private Space",
        desc: "A special, hidden place for a night to remember.",
        icon: Bed,
        image: "https://images.unsplash.com/photo-1551882547-ff43c69e3c45?w=800&q=80",
        venues: [
          { id: "m4k", name: "Fortune Park", location: "New Town", city: "Kolkata", rating: 4.9, priceRange: "$$$$", tags: ["Secret", "Luxury"], image: "https://images.unsplash.com/photo-1551882547-ff43c69e3c45?w=800&q=80" },
          { id: "m4d", name: "The Citi Residenci", location: "City Centre", city: "Durgapur", rating: 4.7, priceRange: "$$$", tags: ["Private", "Pool"], image: "https://images.unsplash.com/photo-1551882547-ff43c69e3c45?w=800&q=80" }
        ]
      }
    ],
    narrative: [
      { time: "START", action: "Open a secret door with a special key", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80" },
      { time: "DRINK", action: "Have a drink in a private booth", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" },
      { time: "RIDE", action: "Ride in a luxury car for a secret trip", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80" },
      { time: "END", action: "Look at the city from a high roof", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80" }
    ]
  }
];

const SOFT_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number];

// --- COMPONENTS ---

const FloatingParticles = ({ vibeColor }: { vibeColor: string }) => {
  const [mounted, setMounted] = React.useState(false);
  const [elements, setElements] = React.useState<{
    id: number;
    type: "sphere" | "ring" | "particle";
    x: number;
    y: number;
    z: number;
    size: number;
    duration: number;
    delay: number;
    rotateX: number;
    rotateY: number;
    driftX: number;
    driftY: number;
  }[]>([]);

  React.useEffect(() => {
    setMounted(true);
    setElements([...Array(40)].map((_, i) => ({
      id: i,
      type: i % 12 === 0 ? 'sphere' as const : (i % 9 === 0 ? 'ring' as const : 'particle' as const),
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 600 - 300,
      size: i % 12 === 0 ? Math.random() * 150 + 100 : (i % 9 === 0 ? Math.random() * 100 + 50 : Math.random() * 6 + 4),
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      driftX: Math.random() * 60 - 30,
      driftY: Math.random() * 60 - 30,
    })));
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none sticky" style={{ perspective: '1200px' }}>
      {elements.map((el) => {
        const depthBlur = Math.abs(el.z) / 80 + (el.type === 'particle' ? 0.5 : 10);

        return (
          <motion.div
            key={el.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: el.type === 'particle' ? [0, 0.7, 0] : [0, 0.2, 0], // Higher opacity for mobile
              scale: [0.8, 1.2, 0.8],
              x: [`${el.x}%`, `${el.x + el.driftX}%`],
              y: [`${el.y}%`, `${el.y + el.driftY}%`],
              rotateX: [el.rotateX, el.rotateX + 360],
              rotateY: [el.rotateY, el.rotateY + (el.type === 'ring' ? 720 : 360)],
              z: [el.z, el.z + 100],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay
            }}
            style={{
              position: 'absolute',
              width: el.size,
              height: el.size,
              top: 0,
              left: 0,
              backgroundColor: el.type === 'particle' ? vibeColor : 'transparent',
              border: el.type !== 'particle' ? `2px solid ${vibeColor}44` : 'none', // Thicker border
              borderRadius: '50%',
              backdropFilter: el.type !== 'particle' ? `blur(${depthBlur}px)` : 'none',
              filter: el.type === 'particle' ? `blur(${depthBlur}px) brightness(2)` : 'none', // Brighter
              boxShadow: el.type === 'particle' ? `0 0 30px ${vibeColor}88` : 'none', // More glow
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity'
            }}
          />
        );
      })}
    </div>
  );
};

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

export default function DatePlanningRedesign() {
  const [selectedVibe, setSelectedVibe] = useState<Vibe>(VIBES[0]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [step, setStep] = useState(0); // 0: Hero, 1: Vibe, 2: Plan, 3: Venue, 4: Reveal
  const [selectedVenueForDetails, setSelectedVenueForDetails] = useState<Venue | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [city, setCity] = useState<"Kolkata" | "Durgapur">("Kolkata");
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states for booking
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    date: "2026-02-15",
    time: "19:30"
  });

  const router = useRouter();

  React.useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*, vendors(category, location, shop_name, phone)');

        if (error) throw error;
        setDbServices(data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setIsLoadingData(false);
      }
    }
    fetchServices();
  }, []);

  // Construct dynamic vibes based on real data
  const dynamicVibes = React.useMemo(() => {
    return VIBES.map(vibe => {
      const updatedPlans = vibe.plans.map(plan => {
        // Map UI plan IDs to DB categories/subcategories
        // This is a heuristic mapping based on the seed data and common sense
        const filteredServices = dbServices.filter(s => {
          const category = s.vendors?.category;
          const location = s.vendors?.location;

          // Match by category
          const isCategoryMatch =
            (vibe.id === 'romantic' && category === 'hospitality') ||
            (vibe.id === 'playful' && category === 'workshops') ||
            (vibe.id === 'calm' && category === 'tour') ||
            (vibe.id === 'mysterious' && category === 'hospitality');

          if (!isCategoryMatch) return false;

          // Match by "Plan Type" (fuzzy match on name/description or subCategory if we had it)
          // For now, let's just use some keywords
          const keywords: Record<string, string[]> = {
            'cafe': ['cafe', 'coffee', 'brew'],
            'trekking': ['trek', 'hill', 'mountain'],
            'paint': ['paint', 'art', 'canvas'],
            'pottery': ['pottery', 'clay'],
            'candle': ['candle', 'scent'],
            'hotel': ['hotel', 'stay', 'private space'],
            'theater': ['theater', 'cinema', 'screen']
          };

          const planKeywords = keywords[plan.id] || [];
          const textToSearch = (s.name + " " + (s.description || "")).toLowerCase();
          const isPlanMatch = planKeywords.some(kw => textToSearch.includes(kw));

          return isPlanMatch;
        });

        // Convert DB structure to Venue interface
        const dbVenues: Venue[] = filteredServices.map(s => {
          // Stable pseudo-random rating based on ID
          const idHash = s.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
          const stableRating = (4.4 + (idHash % 6) / 10).toFixed(1);

          return {
            id: s.id,
            vendorId: s.vendor_id,
            name: s.name,
            location: s.address || "TBA",
            city: (s.vendors?.location === 'Durgapur' ? 'Durgapur' : 'Kolkata'),
            rating: parseFloat(stableRating),
            image: s.image_url || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
            priceRange: s.price > 1000 ? "$$$" : "$$",
            price: Number(s.price) || 0,
            tags: [s.vendors?.category || "Bespoke"],
            description: s.description,
            hours: s.duration || "09:00 AM - 10:00 PM",
            phone: s.vendors?.phone || "+91 91629 XXXXX",
            menuHighlights: s.menu_highlights,
            menuImageUrl: s.menu_image_url,
            images: s.images || []
          };
        });

        // ONLY show DB venues, no static fallbacks
        return {
          ...plan,
          venues: dbVenues
        };
      });

      return {
        ...vibe,
        plans: updatedPlans
      };
    });
  }, [dbServices]);

  // Update selectedVibe when dynamicVibes changes to keep it in sync
  React.useEffect(() => {
    const updated = dynamicVibes.find(v => v.id === selectedVibe.id);
    if (updated) setSelectedVibe(updated);
  }, [dynamicVibes, selectedVibe.id]);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Handle vibe selection
  const handleVibeSelect = (vibe: typeof VIBES[0]) => {
    setSelectedVibe(vibe);
    setStep(2);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setStep(3);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenueForDetails(venue);
    setMainImage(venue.image);
  };

  const handleBookNow = () => {
    if (selectedVenueForDetails) {
      setSelectedVenue(selectedVenueForDetails);
      setSelectedVenueForDetails(null);
      setStep(4);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleFinalizeBooking = async () => {
    if (!selectedVenue || !selectedVenue.vendorId) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          vendor_id: selectedVenue.vendorId,
          service_id: selectedVenue.id,
          customer_name: bookingForm.name || "Guest User",
          customer_email: "guest@example.com", // Fallback for now
          booking_date: bookingForm.date,
          booking_time: bookingForm.time,
          revenue: selectedVenue.price || (selectedVenue.priceRange === "$$$" ? 1500 : 800),
          status: 'pending'
        }]);

      if (error) throw error;

      router.push("/dashboard/user");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong with your reservation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="plan-page">
      <main className={cn(
        "min-h-screen transition-colors duration-1000 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden",
        selectedVibe.id === "mysterious" ? "bg-[#0b0b0d] text-white" : "bg-white text-slate-900"
      )}>
        <GrainOverlay />

        {/* Unified Mobile Navigation Pill (Hero Pill) */}
        {step > 0 && (
          <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-[120] w-[90%] max-w-[320px]">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-2xl rounded-full p-1 border border-black/[0.08] flex items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
            >
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                className="bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all active:scale-95"
              >
                <ChevronRight className="rotate-180 w-3 h-3 text-black" />
                <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-black">Back</span>
              </button>

              <div className="flex items-center gap-2 pr-2">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={cn(
                        "h-[1.5px] rounded-full transition-all duration-700",
                        step === s ? "w-4 bg-rose-500" : (step > s ? "w-1.5 bg-black/40" : "w-1.5 bg-black/10")
                      )}
                    />
                  ))}
                </div>
                <div className="w-px h-2.5 bg-black/10" />
                <div className="w-px h-2.5 bg-black/10" />
                <span className="text-[9px] font-bold text-black opacity-80 mr-2">Phase {step < 10 ? `0${step}` : step}</span>

                {/* Mobile Prime Location Selector */}
                {step === 3 && (
                  <div className="flex items-center gap-1 bg-black/5 p-0.5 rounded-full">
                    {["K", "D"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCity(c === "K" ? "Kolkata" : "Durgapur")}
                        className={cn(
                          "w-6 h-6 rounded-full text-[8px] font-black transition-all",
                          (city === "Kolkata" && c === "K") || (city === "Durgapur" && c === "D")
                            ? "bg-white text-black shadow-sm"
                            : "text-black/30"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Desktop Navigation Elements */}
        <div className="hidden md:flex absolute top-8 left-1/2 -translate-x-1/2 z-[100] items-center gap-4 bg-white/80 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          {[0, 1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "h-[1.5px] rounded-full transition-all duration-1000 ease-[0.32,0.72,0,1]",
                  step === s ? "w-8 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : (step > s ? "w-4 bg-black/40" : "w-4 bg-black/10")
                )}
              />
            </div>
          ))}
          <div className="ml-1.5 h-3 w-px bg-black/10" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
            {step === 0 ? "Introduction" : `Phase ${step < 10 ? `0${step}` : step}`}
          </span>

          {/* Prime Location Selector in Navigation */}
          {step === 3 && (
            <>
              <div className="mx-4 h-4 w-px bg-black/10" />
              <div className="flex gap-1 p-1 bg-black/5 rounded-full border border-black/5">
                {["Kolkata", "Durgapur"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c as any)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-wider transition-all duration-300",
                      city === c
                        ? "bg-white text-black shadow-sm"
                        : "text-black/30 hover:text-black/60"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {step > 0 && step < 4 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setStep(step - 1)}
            className="hidden md:flex fixed top-8 left-8 z-[100] items-center gap-2.5 px-5 py-2.5 bg-white/80 backdrop-blur-2xl rounded-full border border-black/[0.08] text-black/40 hover:text-black hover:border-black/20 hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.06)] group"
          >
            <ChevronRight className="rotate-180 w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Back</span>
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          {/* 1️⃣ IMMERSIVE HERO */}
          {step === 0 && (
            <motion.section
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5, ease: SOFT_EASE }}
              className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24 md:py-0"
            >
              {/* Cinematic Background: Video & 3D Overlay */}
              <motion.div
                style={{
                  scale: heroScale
                }}
                className="absolute inset-0 z-0"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedVibe.video}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.2]"
                    >
                      <source src={selectedVibe.video} type="video/mp4" />
                    </video>
                  </motion.div>
                </AnimatePresence>

                {/* Animated Background Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      scale: [1, 1.4, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className={cn("absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full blur-[100px] opacity-40 mix-blend-screen bg-gradient-to-br", selectedVibe.gradient)}
                  />
                  <motion.div
                    animate={{
                      x: [0, -80, 0],
                      y: [0, 60, 0],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className={cn("absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[100px] opacity-30 mix-blend-screen bg-gradient-to-tl", selectedVibe.gradient)}
                  />
                </div>

                {/* 3D Background Overlay — Enhanced with Particles */}
                <div className="absolute inset-0 z-[1]">
                  <FloatingAura vibeColor={selectedVibe.vibeColor} />
                  <FloatingParticles vibeColor={selectedVibe.vibeColor} />
                </div>

                <div className="absolute inset-0 bg-black/20 md:bg-black/40 backdrop-blur-[0.5px] md:backdrop-blur-[1px]" />
              </motion.div>

              <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: SOFT_EASE, delay: 0.5 }}
                  className="text-4xl sm:text-6xl md:text-8xl font-serif font-black mb-4 md:mb-8 tracking-tighter leading-[0.95] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Matched. <br />
                  <span className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r italic font-light inline-block pr-4",
                    selectedVibe.gradient
                  )}
                    style={{
                      filter: `drop-shadow(0 0 25px ${selectedVibe.vibeColor}66)`
                    }}
                  >
                    Now what?
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: SOFT_EASE, delay: 0.8 }}
                  className="flex flex-col items-center gap-6"
                >
                  <p className="text-base md:text-3xl font-light text-white opacity-90 tracking-[0.05em] md:tracking-[0.1em] max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-4 md:px-0 mb-4">
                    You did the hard part. Now let us turn that spark into a cinematic story.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="mt-12 px-10 py-5 bg-white text-black rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300"
                  >
                    Build my Narrative
                  </motion.button>
                </motion.div>
              </div>

              {/* Whisper Subcopy at Bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 2, duration: 2 }}
                className="mt-12 md:mt-0 md:absolute md:bottom-12 md:left-1/2 md:-translate-x-1/2 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-medium text-white/60 pb-8 md:pb-0"
              >
                The Rare Collection • Event OS
              </motion.div>
            </motion.section>
          )}

          {/* 2️⃣ VIBE SELECTOR - Desktop View (Optimal Editorial) */}
          {step === 1 && (
            <motion.section
              key="vibe-desktop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:flex min-h-screen bg-white text-black flex-col relative overflow-hidden"
            >


              <div className="flex flex-row flex-1">
                {dynamicVibes.map((v) => (
                  <motion.div
                    key={v.id}
                    onMouseEnter={() => setSelectedVibe(v)}
                    onClick={() => handleVibeSelect(v)}
                    className="group relative flex-1 min-h-screen flex flex-col justify-end items-center p-20 overflow-hidden cursor-pointer border-r border-black/5 last:border-0 transition-all duration-1000 ease-[0.23,1,0.32,1] hover:flex-[1.8]"
                  >
                    <motion.div
                      className="absolute inset-0 z-0"
                      initial={{ scale: 1.1 }}
                      animate={{
                        scale: selectedVibe.id === v.id ? 1 : 1.05,
                        filter: selectedVibe.id === v.id ? 'brightness(0.9) saturate(1.1)' : 'brightness(0.6) saturate(0.8)'
                      }}
                      transition={{ duration: 1.5 }}
                    >
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        className="object-cover transition-all duration-1000"
                      />
                    </motion.div>

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-white/40 to-transparent z-10" />

                    <div className="relative z-10 text-center space-y-6 group-hover:-translate-y-6 transition-transform duration-1000">
                      <div className="space-y-2">
                        <motion.span
                          className={cn(
                            "text-[9px] font-bold uppercase tracking-[0.5em] transition-colors block drop-shadow-lg",
                            selectedVibe.id === v.id ? "text-rose-400" : "text-white/60"
                          )}
                        >
                          {v.tagline}
                        </motion.span>
                        <h2 className="text-6xl md:text-7xl font-serif italic leading-none text-white drop-shadow-2xl group-hover:scale-105 transition-transform duration-1000">
                          {v.name}
                        </h2>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-1000">
                        <p className="text-sm font-medium tracking-wide max-w-[240px] mx-auto text-white leading-relaxed drop-shadow-lg">
                          {v.subcopy}
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-20 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-1000 ease-out">
                      <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-3xl hover:bg-white hover:scale-110 transition-all shadow-2xl">
                        <ArrowRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* 2.1️⃣ MOBILE VIBE SELECTOR - Immersive Reference-Matched Experience */}
          {step === 1 && (
            <motion.section
              key="vibe-mobile-immersive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden h-screen bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar"
            >
              {/* Unified Mobile Navigation Pill is now handled globally for all steps */}

              {dynamicVibes.map((v, i) => (
                <div
                  key={v.id}
                  className="h-screen w-full snap-start relative flex flex-col justify-center px-10 bg-black overflow-hidden"
                  onClick={() => handleVibeSelect(v)}
                >
                  {/* 1. Immersive Background Layer - Optimized visibility */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      className="object-cover brightness-[0.45] contrast-[1.1] scale-110"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                  </div>

                  {/* 2. Side Progress Indicators */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
                    {dynamicVibes.map((_, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          height: idx === i ? 40 : 20,
                          width: 3,
                          backgroundColor: idx === i ? "#f43f5e" : "rgba(255,255,255,0.15)",
                          boxShadow: idx === i ? "0 0 10px rgba(244,63,94,0.4)" : "none"
                        }}
                        className="rounded-full transition-all duration-700"
                      />
                    ))}
                  </div>

                  {/* 3. Central Content Block - Structured for Visibility */}
                  <div className="relative z-10 pt-20 space-y-10">
                    <div className="space-y-4">
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] text-rose-500 block"
                      >
                        {v.tagline}
                      </motion.span>

                      <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-5xl font-serif italic text-white leading-none drop-shadow-2xl"
                      >
                        {v.name}
                      </motion.h1>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative pl-8 pt-2"
                      >
                        {/* Properly Scaled Accent Bar */}
                        <div className="absolute left-0 top-2 bottom-0 w-[3px] bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                        <p className="text-white/80 text-[15px] font-light leading-relaxed max-w-[260px]">
                          {v.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* 4. Action Button - Clear and tappable */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="pt-4"
                    >
                      <div className="inline-flex items-center gap-6 group">
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-3xl shadow-xl active:scale-95 transition-transform">
                          <ArrowRight className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Select Vibe</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.section>
          )}

          {/* 3️⃣ PLAN SELECTION - Editorial Grid */}
          {step === 2 && (
            <motion.section
              key="plan-selector-premium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-[#0a0a0a] text-white pt-44 pb-20 md:py-32 px-6 flex flex-col justify-center"
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col mb-20 md:mb-32">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-6 mb-8"
                  >
                    <div className="w-20 h-px bg-rose-500/50" />
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-rose-500">Perfect Pairing</span>
                  </motion.div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <h1 className="text-5xl md:text-[8rem] font-serif italic leading-[0.85] tracking-tighter text-white">
                      Pick your <br />
                      <span className="text-rose-500 pr-4">
                        {selectedVibe.name}
                      </span>
                    </h1>

                    <div className="max-w-sm pb-4">
                      <p className="text-white/40 text-sm md:text-lg font-light leading-relaxed border-l border-white/10 pl-8">
                        Now that we know the vibe, choose a plan that sounds like the most fun for both of you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {selectedVibe.plans.map((plan: Plan, i: number) => (
                    <motion.button
                      key={plan.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.8, ease: SOFT_EASE }}
                      onClick={() => handlePlanSelect(plan)}
                      className="group relative bg-white rounded-[2rem] text-left overflow-hidden transition-all duration-700 h-[380px] md:h-[500px] flex flex-col justify-end shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-1.5"
                    >
                      {/* Fully Colorful Image - Premium Rendering */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={plan.image}
                          alt={plan.title}
                          fill
                          className="object-cover opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105 saturate-[1.05] contrast-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                      </div>

                      <div className="absolute top-6 right-6 text-white/30 group-hover:text-white/60 transition-colors z-10">
                        <span className="text-6xl md:text-8xl font-serif italic font-light leading-none tracking-tighter">{i + 1}</span>
                      </div>

                      <div className="relative z-10 p-6 md:p-10 space-y-4 md:space-y-6 w-full">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center bg-white shadow-xl transition-all duration-700 group-hover:rotate-3">
                            <plan.icon size={24} className="md:w-8 md:h-8 text-rose-500" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-serif italic text-white leading-none mb-1.5 drop-shadow-md">
                              {plan.title}
                            </h3>
                            <p className="text-white/90 font-medium text-xs md:text-sm leading-relaxed max-w-[280px]">
                              {plan.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                            See Details <ArrowRight size={14} className="text-rose-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <div className="px-3 py-1.5 rounded-full bg-rose-500 text-white text-[8px] font-bold uppercase tracking-widest shadow-lg">
                            {plan.venues.length} Venues
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={() => setStep(1)}
                  whileHover={{ x: -10 }}
                  className="mt-20 flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors"
                >
                  <ChevronRight className="rotate-180" size={18} />
                  Change Identity
                </motion.button>
              </div>
            </motion.section>
          )}

          {/* 3.1️⃣ VENUE SELECTION - The "End Products" */}
          {step === 3 && selectedPlan && (
            <motion.section
              key="venue-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-[#0a0a0a] text-white pt-44 pb-20 md:py-32 px-6 flex flex-col justify-center"
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col mb-20 md:mb-32">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-6 mb-8"
                  >
                    <div className="w-20 h-px bg-rose-500/50" />
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-rose-500">Destination Found</span>
                  </motion.div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                      <h1 className="text-5xl md:text-[8rem] font-serif italic leading-[0.85] tracking-tighter text-white">
                        Select your <br />
                        <span className="text-rose-500 pr-4">Venue</span>
                      </h1>

                    </div>

                    <div className="max-w-sm pb-4">
                      <p className="text-white/40 text-sm md:text-lg font-light leading-relaxed border-l border-white/10 pl-8">
                        We've listed the top-rated experiences in {city} matching your {selectedVibe.name.toLowerCase()} vibe.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {selectedPlan.venues.filter(v => v.city === city).length > 0 ? (
                    selectedPlan.venues.filter(v => v.city === city).map((venue, i) => (
                      <motion.div
                        key={venue.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleVenueSelect(venue)}
                        className="group cursor-pointer"
                      >
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6">
                          <Image
                            src={venue.image}
                            alt={venue.name}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                            <div className="flex items-center gap-1.5">
                              <Star size={12} className="text-yellow-400 fill-yellow-400" />
                              <span className="text-[10px] font-bold">{venue.rating}</span>
                            </div>
                          </div>

                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {venue.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-bold uppercase tracking-wider">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-2xl font-serif italic text-white mb-1">{venue.name}</h3>
                            <div className="flex items-center justify-between text-white/60">
                              <span className="text-xs font-medium">{venue.location}</span>
                              <span className="text-xs font-bold text-rose-500">{venue.priceRange}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-6"
                    >
                      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <MapPin size={32} className="text-white/20" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-serif italic text-white">No service found</h3>
                        <p className="text-white/40 text-sm max-w-xs mx-auto">
                          We haven't archived any {selectedPlan.title.toLowerCase()} spots in {city} for this vibe yet.
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(2)}
                        className="px-8 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest"
                      >
                        Try Another Plan
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                <motion.button
                  onClick={() => setStep(2)}
                  whileHover={{ x: -10 }}
                  className="mt-20 flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors"
                >
                  <ChevronRight className="rotate-180" size={18} />
                  Change Plan
                </motion.button>
              </div>
            </motion.section>
          )}

          {/* 4️⃣ SECURE CHECKOUT - Industry Level Experience */}
          {step === 4 && selectedPlan && selectedVenue && (
            <motion.section
              key="booking-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-white text-slate-900 pt-32 pb-20 px-4 md:px-8"
            >
              <div className="max-w-7xl mx-auto">
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setStep(3)}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-rose-500 transition-all mb-12 group"
                >
                  <ChevronRight size={14} className="rotate-180 transition-transform group-hover:-translate-x-1" />
                  Return to Venue Selection
                </motion.button>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-rose-500 mb-2"
                    >
                      <ShieldCheck size={16} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Reservation</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight">Finalize your <br /> <span className="text-slate-400">Narrative.</span></h1>
                  </div>
                  <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-rose-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected City</p>
                      <p className="text-sm font-black text-slate-900">{city}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* LEFT: BOOKING DETAILS */}
                  <div className="lg:col-span-7 space-y-10">
                    {/* Date & Time Picker */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <h3 className="text-xl font-serif italic">When are we going?</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Date</span>
                      </div>
                      <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                        {[...Array(7)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setBookingForm(prev => ({ ...prev, date: `2026-02-${14 + i}` }))}
                            className={cn(
                              "flex flex-col items-center py-4 rounded-2xl border transition-all duration-300",
                              Number(bookingForm.date.split('-')[2]) === 14 + i
                                ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200"
                                : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                            )}
                          >
                            <span className="text-[10px] font-bold uppercase mb-1">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                            <span className="text-lg font-black">{14 + i}</span>
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {['18:00', '19:30', '20:00', '21:30'].map((time, i) => (
                          <button
                            key={time}
                            onClick={() => setBookingForm(prev => ({ ...prev, time }))}
                            className={cn(
                              "flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs transition-all",
                              bookingForm.time === time
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                            )}
                          >
                            <Clock size={14} />
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Guest Details */}
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                      <h3 className="text-xl font-serif italic">The Protectors of the Night</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Full Name</label>
                          <input
                            type="text"
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="John Doe"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Connect Number</label>
                          <input
                            type="tel"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+91 00000 00000"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Special Preferences (Optional)</label>
                        <textarea rows={3} placeholder="Dietary restrictions, preferred table, secret notes..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none" />
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                      <div className="flex justify-between items-end">
                        <h3 className="text-xl font-serif italic">Payment Strategy</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><CreditCard size={10} /> Secure Checkout</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Credit Card', 'UPI Pay', 'WhatsApp'].map((m, i) => (
                          <button key={m} className={cn(
                            "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all",
                            i === 0 ? "border-rose-500 bg-rose-50/50" : "border-slate-100 hover:border-slate-200"
                          )}>
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", i === 0 ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-400")}>
                              {i === 0 ? <CreditCard size={18} /> : (i === 1 ? <Zap size={18} /> : <Share2 size={18} />)}
                            </div>
                            <span className="text-xs font-bold">{m}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: SUMMARY SIDEBAR */}
                  <div className="lg:col-span-5">
                    <div className="sticky top-32 space-y-8">
                      {/* Summary Card */}
                      <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] text-white">
                        <div className="relative h-48">
                          <Image
                            src={selectedVenue.image}
                            alt={selectedVenue.name}
                            fill
                            unoptimized
                            className="object-cover opacity-60"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                          <div className="absolute bottom-6 left-8">
                            <span className="px-3 py-1 bg-rose-500 rounded-full text-[8px] font-black uppercase tracking-widest mb-2 inline-block">Confirmed</span>
                            <h4 className="text-3xl font-serif italic">{selectedVenue.name}</h4>
                          </div>
                        </div>

                        <div className="p-8 space-y-8">
                          <div className="flex justify-between text-slate-400 border-b border-white/10 pb-6">
                            <div className="space-y-1">
                              <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Feeling</p>
                              <p className="text-xs font-bold text-white uppercase tracking-wider">{selectedVibe.name}</p>
                            </div>
                            <div className="space-y-1 text-right">
                              <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Curated Plan</p>
                              <p className="text-xs font-bold text-white uppercase tracking-wider">{selectedPlan.title}</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Concierge Fee</span>
                              <span className="font-bold">₹{((selectedVenue.price || 0) * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Experience Package</span>
                              <span className="font-bold">₹{(selectedVenue.price || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Taxes & Fees</span>
                              <span className="font-bold">₹{((selectedVenue.price || 0) * 0.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="h-px bg-white/10 w-full my-4" />
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-xl font-serif italic">Total Investment</span>
                              <span className="text-3xl font-black text-rose-500">
                                ₹{((selectedVenue.price || 0) * 1.2).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleFinalizeBooking}
                            disabled={isSubmitting}
                            className={cn(
                              "w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3",
                              isSubmitting && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="animate-spin w-4 h-4" />
                                Architecting...
                              </>
                            ) : "Reserve my Moment"}
                          </motion.button>
                        </div>
                      </div>

                      {/* Assurance */}
                      <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="p-3 bg-white rounded-2xl shadow-sm">
                          <ShieldCheck size={24} className="text-rose-500" />
                        </div>
                        <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                          Our concierge team will manually verify with <span className="text-slate-900 font-bold">{selectedVenue.name}</span> and secure the best spot. You'll receive a digital invite within 30 minutes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedVenueForDetails && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedVenueForDetails(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden w-full max-w-5xl max-h-[90vh] md:h-[650px] flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedVenueForDetails(null);
                    setMainImage(null);
                  }}
                  className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                >
                  <X size={20} />
                </button>

                {/* Left: Image Side */}
                <div className="relative w-full md:w-[45%] h-[250px] md:h-full">
                  <Image
                    src={mainImage || selectedVenueForDetails.image}
                    alt={selectedVenueForDetails.name}
                    fill
                    unoptimized
                    className="object-cover transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-3 py-1 bg-rose-500 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                        Curated Selection
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[10px] font-bold">{selectedVenueForDetails.rating}</span>
                      </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-none">
                      {selectedVenueForDetails.name}
                    </h2>
                  </div>
                </div>

                {/* Right: Info Side */}
                <div className="w-full md:w-[55%] flex flex-col h-full bg-white">
                  <div className="p-8 md:p-12 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="space-y-8">
                      {/* Header Info */}
                      <div className="flex flex-wrap items-center gap-4 text-slate-400">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                          <MapPin size={14} className="text-rose-500" />
                          {selectedVenueForDetails.location}, {selectedVenueForDetails.city}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                          ₹{selectedVenueForDetails.price?.toLocaleString()} / Book
                        </div>
                      </div>

                      {/* Description / Story */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Info size={16} className="text-rose-500" />
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">About the Venue</h3>
                        </div>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light">
                          {selectedVenueForDetails.description || `Experience the quintessential ${selectedPlan?.title.toLowerCase()} at ${selectedVenueForDetails.name}. Known for its exceptional ambiance and high standards of service, it's the perfect setting for your ${selectedVibe.name.toLowerCase()}.`}
                        </p>
                      </div>

                      {/* Highlights / Tags */}
                      <div className="flex flex-wrap gap-2">
                        {selectedVenueForDetails.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {selectedVenueForDetails.menuHighlights && (
                        <div className="p-6 bg-slate-50 rounded-3xl space-y-3">
                          <div className="flex justify-between items-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Experience Highlights</p>
                            {selectedVenueForDetails.menuImageUrl && (
                              <Link
                                href={selectedVenueForDetails.menuImageUrl}
                                target="_blank"
                                className="text-[9px] font-black uppercase underline text-rose-500"
                              >
                                View Menu
                              </Link>
                            )}
                          </div>
                          <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                            "{selectedVenueForDetails.menuHighlights}"
                          </p>
                        </div>
                      )}

                      {selectedVenueForDetails.images && selectedVenueForDetails.images.length > 0 && (
                        <div className="space-y-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Venue Lookbook</p>
                          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                            <div
                              className={cn(
                                "relative min-w-[120px] h-20 rounded-xl overflow-hidden shadow-sm border cursor-pointer transition-all",
                                mainImage === selectedVenueForDetails.image || !mainImage ? "border-rose-500 ring-2 ring-rose-500/20" : "border-slate-100"
                              )}
                              onClick={() => setMainImage(selectedVenueForDetails.image)}
                            >
                              <Image src={selectedVenueForDetails.image} alt="Main" fill unoptimized className="object-cover" />
                            </div>
                            {selectedVenueForDetails.images.filter(img => img !== selectedVenueForDetails.image).map((img, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "relative min-w-[120px] h-20 rounded-xl overflow-hidden shadow-sm border cursor-pointer transition-all",
                                  mainImage === img ? "border-rose-500 ring-2 ring-rose-500/20" : "border-slate-100"
                                )}
                                onClick={() => setMainImage(img)}
                              >
                                <Image src={img} alt={`Lookbook ${i}`} fill unoptimized className="object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Details Grid */}
                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                        <div className="space-y-1.5">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Clock size={12} className="text-rose-500" /> Hours
                          </p>
                          <p className="text-xs font-bold text-slate-900">{selectedVenueForDetails.hours || "09:00 AM - 11:00 PM"}</p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Phone size={12} className="text-rose-500" /> Contact
                          </p>
                          <p className="text-xs font-bold text-slate-900">{selectedVenueForDetails.phone || "+91 91629 XXXXX"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-8 md:p-10 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-6">
                    <button
                      onClick={() => {
                        setSelectedVenueForDetails(null);
                        setMainImage(null);
                      }}
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      Maybe Later
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBookNow}
                      className="px-10 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-black/10 flex items-center gap-3 group"
                    >
                      Book Now
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
