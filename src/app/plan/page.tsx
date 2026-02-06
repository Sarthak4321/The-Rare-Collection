"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  Heart,
  Sparkles,
  Moon,
  Sun,
  Zap,
  MapPin,
  Calendar,
  ArrowRight,
  ChevronRight,
  Music,
  Camera,
  Coffee,
  Wine,
  Star,
  Share2,
  Check,
  Flower2
} from "lucide-react";
import { cn } from "@/lib/utils";

import FloatingAura from "@/components/FloatingAura";

// --- DESIGN SYSTEM & CONSTANTS ---

const VIBES = [
  {
    id: "romantic",
    name: "Romantic",
    headline: "Hearts in rhythm.",
    tagline: "Intimate • Cinematic • Timeless",
    subcopy: "A symphony of candlelight and unscripted connection.",
    description: "Indulge in an atmosphere designed for deep emotional resonance. We curate secluded gardens, vintage crystal settings, and five-course culinary journeys perfect for anniversaries.",
    theme: "bg-[#0a0a0a]",
    accent: "text-rose-500",
    vibeColor: "#ff2d55",
    gradient: "from-rose-500 via-rose-400 to-rose-600",
    video: "https://assets.mixkit.co/videos/preview/mixkit-romantic-candlelight-dinner-in-a-restaurant-34358-large.mp4",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&q=80",
    tags: ["Candlelight", "Private Chef", "Live Violin"],
    plans: [
      { id: "starlit", title: "The Starlit Soirée", desc: "Private rooftop dining under a celestial canopy.", icon: Moon },
      { id: "cinema", title: "Vibes & Vinyl", desc: "A private cinema experience with vintage soundtracks.", icon: Music },
      { id: "garden", title: "Secret Garden Picnic", desc: "Hand-picked floral setting with artisanal baskets.", icon: Flower2 }
    ],
    narrative: [
      { time: "THE ENTRY", action: "Secluded garden gates, moon-lit path", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80" },
      { time: "THE TOAST", action: "Velvet seating, vintage crystal, shared whispers", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" },
      { time: "THE FEAST", action: "A four-course journey through lost flavors", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" },
      { time: "THE DANCE", action: "Slow rhythm under a canopy of stars", image: "https://images.unsplash.com/photo-1494510002120-d667c309395f?w=800&q=80" }
    ]
  },
  {
    id: "playful",
    name: "Playful",
    headline: "Pulse of joy.",
    tagline: "Vibrant • Energetic • Spontaneous",
    subcopy: "High-energy sparks and Infectious laughter.",
    description: "Break the ice with high-octane energy and vibrant surprises. From neon-lit secret arcade lounges to artisanal street-food tours, designed for couples who find love through shared joy.",
    theme: "bg-[#0a0a0a]",
    accent: "text-blue-400",
    vibeColor: "#0ea5e9",
    gradient: "from-blue-500 via-blue-400 to-blue-600",
    video: "https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-having-fun-at-a-party-with-sparklers-34331-large.mp4",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
    tags: ["Arcade Noir", "Neon Tour", "Street Luxury"],
    plans: [
      { id: "arcade", title: "Retro Rivalry", desc: "Neon arcade challenges with bespoke rewards.", icon: Zap },
      { id: "scavenger", title: "The Urban Quest", desc: "A curated city hunt leading to a hidden gem.", icon: MapPin },
      { id: "cook", title: "Creative Chaos", desc: "Interactive workshop session with local artisans.", icon: Coffee }
    ],
    narrative: [
      { time: "THE MEET", action: "Neon-lit lounge, secret door", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" },
      { time: "THE GAME", action: "Arcade competition, vintage tokens", image: "https://images.unsplash.com/photo-1473615695634-d284ec918736?w=800&q=80" },
      { time: "THE BITE", action: "Street-style luxury, hand-crafted tacos", image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80" },
      { time: "THE RACE", action: "A midnight sprint for gold-leaf gelato", image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=800&q=80" }
    ]
  },
  {
    id: "calm",
    name: "Calm",
    headline: "Quietly bold.",
    tagline: "Serene • Minimalist • Grounded",
    subcopy: "Minimalist beauty and serene landscapes.",
    description: "Find clarity in the stillness. A curated retreat through whispering pines, private tea ceremonies, and farm-to-table jazz roots. For partners needing a peaceful sanctuary.",
    theme: "bg-[#0a0a0a]",
    accent: "text-emerald-400",
    vibeColor: "#10b981",
    gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
    video: "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-candle-flame-in-the-dark-1250-large.mp4",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80",
    tags: ["Zen Garden", "Tea Soul", "Acoustic Jazz"],
    plans: [
      { id: "zen", title: "The Tea Sanctuary", desc: "Private brewing lesson in a minimalist garden.", icon: Coffee },
      { id: "jazz", title: "Acoustic Evening", desc: "Intimate jazz performance in a hidden lounge.", icon: Music },
      { id: "art", title: "Mindful Canvas", desc: "Silent painting session overlooking the mist.", icon: Sparkles }
    ],
    narrative: [
      { time: "THE TRAIL", action: "Whispering pines, golden hour walk", image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80" },
      { time: "THE BREW", action: "Oolong ceremony overlooking the mist", image: "https://images.unsplash.com/photo-1544787210-22c6629ec883?w=800&q=80" },
      { time: "THE RETREAT", action: "Farm-to-table lunch, jazz roots", image: "https://images.unsplash.com/photo-1467453222764-e8b35bb88319?w=800&q=80" },
      { time: "THE WATCH", action: "Fog rolling over the silent lake", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" }
    ]
  },
  {
    id: "mysterious",
    name: "Mysterious",
    headline: "Shared secrets.",
    tagline: "Noir • Adrenaline • Exclusive",
    subcopy: "Velvet shadows and adrenaline-fueled connection.",
    description: "For the seekers of the extraordinary. Unmarked doors, vintage keys, and city lights from forbidden rooftops. This vibe turns a simple night into an unforgettable noir adventure.",
    theme: "bg-[#0a0a0a]",
    accent: "text-purple-400",
    vibeColor: "#6366f1",
    gradient: "from-purple-500 via-purple-400 to-purple-600",
    video: "https://assets.mixkit.co/videos/preview/mixkit-night-city-with-car-lights-and-neon-signs-34024-large.mp4",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
    tags: ["Secret Entry", "Noir Sips", "Rooftop Views"],
    plans: [
      { id: "speakeasy", title: "The Indigo Key", desc: "Unlock a secret door to a bespoke cocktail lab.", icon: Moon },
      { id: "roof", title: "Noir Rooftop", desc: "Private city views from an undisclosed location.", icon: MapPin },
      { id: "enigma", title: "The Riddle Dinner", desc: "A blind tasting menu guided by mysteries.", icon: Star }
    ],
    narrative: [
      { time: "THE UNKNOWN", action: "Unmarked door, vintage key", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80" },
      { time: "THE SIP", action: "Liquid smoke, velvet-draped booth", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" },
      { time: "THE RIDE", action: "Luxury sedan, riddle in an envelope", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80" },
      { time: "THE VIEW", action: "City lights from a forbidden rooftop", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80" }
    ]
  }
];

const SOFT_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number];

// --- COMPONENTS ---

const FloatingParticles = ({ vibeColor }: { vibeColor: string }) => {
  const [elements, setElements] = useState<{
    id: number;
    type: 'particle' | 'sphere' | 'ring';
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

  useEffect(() => {
    // Increase count for mobile vibrance
    const newElements = [...Array(40)].map((_, i) => ({
      id: i,
      type: i % 12 === 0 ? 'sphere' as const : (i % 9 === 0 ? 'ring' as const : 'particle' as const),
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 600 - 300,
      size: i % 12 === 0 ? Math.random() * 150 + 100 : (i % 9 === 0 ? Math.random() * 100 + 50 : Math.random() * 6 + 4), // Increased size
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      driftX: Math.random() * 60 - 30, // Increased drift
      driftY: Math.random() * 60 - 30,
    }));
    setElements(newElements);
  }, []);

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

const VibeCard = ({ v, onSelect }: { v: typeof VIBES[0], onSelect: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8, ease: SOFT_EASE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } as any}
      className="relative group aspect-[4/5] md:aspect-[16/10] rounded-[3rem] overflow-hidden text-left shadow-2xl border border-slate-200 cursor-pointer"
      onClick={onSelect}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0"
      >
        <Image
          src={v.image}
          alt={v.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>

      {/* Overlay Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"
      )} />

      {/* Content Wrapper */}
      <div
        style={{
          transform: "translateZ(75px)",
        }}
        className="absolute inset-0 p-8 md:p-12 z-10 flex flex-col justify-end"
      >
        <div className="space-y-4 mb-8">
          <motion.span
            className={cn("text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-md px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 inline-block", "text-white")}
          >
            {v.tagline}
          </motion.span>
          <h3 className="text-4xl md:text-7xl font-serif text-white italic leading-[0.8]">{v.name}</h3>
        </div>

        {/* Hover Reveal Items */}
        <div className="overflow-hidden">
          <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.32,0.72,0,1]">
            <p className="text-white/70 text-base md:text-xl font-light leading-relaxed max-w-xl mb-8">
              {v.description}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {v.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-white/5 text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow / CTA */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={cn(
              "w-12 h-12 md:w-16 md:h-16 rounded-full backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white transition-all duration-700",
              "bg-white/5 group-hover:bg-white group-hover:text-slate-900 shadow-2xl"
            )}
          >
            <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
          </motion.div>
        </div>
      </div>

      {/* Edge Highlight */}
      <div className="absolute inset-0 border border-white/20 rounded-[3rem] pointer-events-none group-hover:border-white/40 transition-colors" />
    </motion.div>
  );
};

export default function DatePlanningRedesign() {
  const [selectedVibe, setSelectedVibe] = useState(VIBES[0]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [step, setStep] = useState(0); // 0: Hero, 1: Vibe, 2: Plan Selection, 3: Reveal
  const [city, setCity] = useState("Mumbai");
  const [isSharing, setIsSharing] = useState(false);

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

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setStep(3);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="plan-page">
      <main className={cn(
        "min-h-screen transition-colors duration-1000 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden",
        selectedVibe.id === "mysterious" ? "bg-[#0b0b0d] text-white" : "bg-white text-slate-900"
      )}>
        <GrainOverlay />

        {/* Unified Mobile Navigation Pill (Hero Pill) - Replaces fragmented elements */}
        {step > 0 && (
          <div className="md:hidden fixed top-6 left-1/2 -translate-x-1/2 z-[120] w-[90%] max-w-[360px]">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-black/90 backdrop-blur-2xl rounded-full p-1.5 border border-white/10 flex items-center justify-between shadow-2xl"
            >
              {/* Unified Back Button */}
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                className="bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full flex items-center gap-2.5 transition-all active:scale-90"
              >
                <ChevronRight className="rotate-180 w-3 h-3 text-white" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Back</span>
              </button>

              {/* Unified Phase Status */}
              <div className="flex items-center gap-4 pr-3.5">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map((s) => (
                    <div
                      key={s}
                      className={cn(
                        "h-[2px] rounded-full transition-all duration-700",
                        step - 1 === s ? "w-6 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : "w-2.5 bg-white/20"
                      )}
                    />
                  ))}
                </div>
                <div className="w-px h-3.5 bg-white/20" />
                <div className="flex flex-col items-start leading-none gap-0.5">
                  <span className="text-[7px] font-black uppercase tracking-[0.1em] text-white/40">Phase</span>
                  <span className="text-[10px] font-black text-white">{step + 1}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Desktop Navigation Elements (Unchanged) */}
        <div className="hidden md:flex fixed top-12 left-1/2 -translate-x-1/2 z-[100] items-center gap-4 bg-black/40 backdrop-blur-3xl px-8 py-4 border border-white/10 shadow-2xl">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "h-[2px] transition-all duration-1000 ease-[0.32,0.72,0,1]",
                  step === s ? "w-12 bg-rose-500" : (step > s ? "w-6 bg-white/60" : "w-6 bg-white/20")
                )}
              />
            </div>
          ))}
          <div className="ml-4 h-4 w-px bg-white/10" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">
            Phase {step + 1}
          </span>
        </div>

        {step > 0 && step < 3 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setStep(step - 1)}
            className="hidden md:flex fixed top-12 left-12 z-[100] items-center gap-4 px-8 py-4 bg-black/40 backdrop-blur-3xl border border-white/10 text-white/40 hover:text-white hover:border-white/40 transition-all group"
          >
            <ChevronRight className="rotate-180 w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back</span>
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
                  className="text-5xl sm:text-7xl md:text-[8rem] font-serif font-black mb-4 md:mb-10 tracking-tighter leading-[0.9] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
                  <p className="text-base md:text-3xl font-light text-white opacity-90 tracking-[0.05em] md:tracking-[0.1em] max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-4 md:px-0">
                    You did the hard part. Now let us turn that spark into a cinematic story.
                    End the &quot;Where should we go?&quot; loop forever.
                  </p>
                  <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="mt-16"
                >
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-4 md:px-14 md:py-6 bg-white/10 backdrop-blur-2xl border border-white/30 text-white rounded-full text-base md:text-xl font-bold hover:bg-white hover:text-slate-900 transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Begin Your Story</span>
                    <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-r", selectedVibe.gradient)} />
                  </button>
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
              className="hidden md:flex min-h-screen bg-[#0a0a0a] text-white flex-row relative overflow-hidden"
            >
              {VIBES.map((v, i) => (
                <motion.div
                  key={v.id}
                  onMouseEnter={() => setSelectedVibe(v)}
                  onClick={() => handleVibeSelect(v)}
                  className="group relative flex-1 min-h-screen flex flex-col justify-end items-center p-20 overflow-hidden cursor-pointer border-r border-white/5 last:border-0 transition-all duration-700 ease-[0.32,0.72,0,1] hover:flex-[1.5]"
                >
                  <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ scale: 1.1, opacity: 0.5 }}
                    animate={{
                      scale: selectedVibe.id === v.id ? 1 : 1.1,
                      opacity: selectedVibe.id === v.id ? 1 : 0.5
                    }}
                    transition={{ duration: 1.2 }}
                  >
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-700" />
                  </motion.div>

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-white/20 to-transparent" />

                  <div className="relative z-10 text-center space-y-8">
                    <div className="space-y-2">
                      <motion.span
                        className={cn(
                          "text-[9px] font-black uppercase tracking-[0.6em] transition-colors block",
                          selectedVibe.id === v.id ? "text-white" : "text-white/40"
                        )}
                      >
                        {v.tagline}
                      </motion.span>
                      <h2 className="text-8xl font-serif italic leading-none group-hover:scale-110 transition-transform duration-700">
                        {v.name}
                      </h2>
                    </div>

                    <div className="h-px w-0 group-hover:w-full bg-white/40 transition-all duration-700 mx-auto" />

                    <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                      <p className="text-sm font-light tracking-wide max-w-xs mx-auto text-white/70 uppercase leading-relaxed">
                        {v.subcopy}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-12 group-hover:bottom-20 transition-all duration-700 opacity-0 group-hover:opacity-100">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              ))}
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

              {VIBES.map((v, i) => (
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
                    {VIBES.map((_, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          height: idx === i ? 40 : 20,
                          width: 3,
                          backgroundColor: idx === i ? "#f43f5e" : "rgba(255,255,255,0.15)",
                          boxShadow: idx === i ? "0 0 10px rgba(244,63,94,0.3)" : "none"
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

                      <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-6xl font-serif italic text-white leading-none drop-shadow-2xl"
                      >
                        {v.name}
                      </motion.h2>

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
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 gap-10 md:gap-12">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 text-rose-500"
                    >
                      <div className="w-12 h-px bg-current" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Selection</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-[7.5rem] font-serif italic leading-[1] md:leading-[0.9] tracking-tighter">
                      Crafting the <br className="hidden md:block" /> <span className={selectedVibe.accent}>{selectedVibe.name}</span> Experience.
                    </h2>
                  </div>
                  <div className="max-w-sm text-left md:text-right">
                    <p className="text-white/40 text-[10px] md:text-sm uppercase tracking-widest leading-loose">
                      Each plan is a masterclass in detail. <br className="hidden md:block" /> Select a narrative that resonates.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
                  {selectedVibe.plans.map((plan: any, i: number) => (
                    <motion.button
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      onClick={() => handlePlanSelect(plan)}
                      className="group relative bg-[#0a0a0a] p-10 md:p-16 text-left hover:bg-white transition-all duration-700 ease-[0.32,0.72,0,1]"
                    >
                      <div className="absolute top-8 right-8 md:top-12 md:right-12 text-white/10 group-hover:text-black/5 transition-colors">
                        <span className="text-7xl md:text-9xl font-serif italic font-black leading-none">{i + 1}</span>
                      </div>

                      <div className="relative z-10 space-y-8 md:space-y-12 h-full flex flex-col justify-between">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-black/10 group-hover:bg-black group-hover:text-white transition-all duration-700">
                          <plan.icon size={24} className="md:w-7 md:h-7" strokeWidth={1} />
                        </div>

                        <div className="space-y-3 md:space-y-4">
                          <h3 className="text-2xl md:text-4xl font-serif italic text-white group-hover:text-black transition-colors duration-700">
                            {plan.title}
                          </h3>
                          <p className="text-white/40 group-hover:text-black/60 font-light text-xs md:text-sm leading-relaxed transition-colors duration-700">
                            {plan.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                          Choose this path <ArrowRight size={14} />
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

          {/* 4️⃣ THE MAGIC REVEAL */}
          {step === 3 && (
            <motion.section
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#0b0b0d] text-white min-h-screen"
            >
              {/* Immersive Scroll Header */}
              <div className="h-[90vh] md:h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-0 relative overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedVibe.image}
                    alt="Mood"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="relative z-10 space-y-6">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-[10px] uppercase tracking-[0.6em] text-rose-300"
                  >
                    The Revelation
                  </motion.span>
                  <h2 className="text-4xl md:text-8xl font-serif font-light italic leading-tight">
                    {selectedPlan?.title || "A night curated"} <br /> just for you.
                  </h2>
                  <p className="text-lg md:text-2xl font-light opacity-60 max-w-xl mx-auto">
                    {selectedPlan?.desc} <br />
                    Here is how your evening in {city} will unfold.
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-10"
                >
                  <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
              </div>

              {/* Narrative Timeline */}
              <div className="max-w-5xl mx-auto px-6 py-24 md:py-40 space-y-32 md:space-y-96">
                {selectedVibe.narrative.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-10%" }}
                    transition={{ duration: 1, ease: SOFT_EASE }}
                    className={cn(
                      "flex flex-col md:flex-row items-center gap-12 md:gap-32",
                      i % 2 === 1 ? "md:flex-row-reverse text-center md:text-right" : "text-center md:text-left"
                    )}
                  >
                    <div className="flex-1 space-y-6 md:space-y-8">
                      <motion.div
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 0.5, x: 0 }}
                        className="text-[10px] md:text-[12px] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase"
                      >
                        {item.time}
                      </motion.div>
                      <h3 className="text-3xl md:text-7xl font-serif font-light italic leading-tight transition-all">
                        {item.action}
                      </h3>
                      <div className={cn("w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent", (i % 2 === 1 || true) ? "mx-auto md:ml-auto md:mr-0" : "mx-auto md:mr-auto md:ml-0")} />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                      className="flex-1 relative aspect-[4/5] w-full max-w-[280px] md:max-w-sm rounded-3xl md:rounded-[4rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] md:shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10"
                    >
                      <Image
                        src={item.image}
                        alt={item.action}
                        fill
                        className="object-cover transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Shareability Card: The Digital Invite */}
              <section className="py-24 md:py-40 bg-white text-slate-900 rounded-t-[3rem] md:rounded-t-[5rem] relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 opacity-50" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white/80 backdrop-blur-3xl p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] border border-slate-200 shadow-[0_30px_60px_rgba(0,0,0,0.05)] md:shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative overflow-hidden"
                  >
                    {/* Ornamental Background Glow */}
                    <div className={cn("absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] opacity-10 bg-gradient-to-br", selectedVibe.gradient)} />

                    <div className="mb-8 md:mb-14">
                      <motion.span
                        className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-slate-100 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-10 text-slate-400"
                      >
                        Exclusive Invitation
                      </motion.span>
                      <h3 className="text-4xl md:text-8xl font-serif italic mb-4 md:mb-6 leading-tight">
                        {selectedPlan?.title || "The Escape"}
                      </h3>
                      <p className="text-slate-500 font-light text-base md:text-2xl mt-4 md:mt-8">
                        A curated {selectedVibe.name.toLowerCase()} journey in the heart of {city}.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
                      <button
                        onClick={() => {
                          setIsSharing(true);
                          if (typeof navigator !== "undefined") {
                            navigator.clipboard.writeText(`Hey, I planned this for us: ${selectedPlan?.title}. Cant wait!`);
                          }
                        }}
                        className="px-12 py-6 bg-slate-900 text-white rounded-full font-bold text-lg flex items-center justify-center gap-4 transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
                      >
                        <Share2 size={22} />
                        Share Invitation
                      </button>
                      <button className="px-12 py-6 border-2 border-slate-100 text-slate-900 rounded-full font-bold text-lg flex items-center justify-center gap-4 transition-all hover:border-slate-900 hover:bg-slate-50">
                        Keep as Secret
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Optional Enhancements */}
              <section className="py-40 bg-white text-slate-900 px-6">
                <div className="max-w-3xl mx-auto text-center space-y-16">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">Extra Touches</span>
                    <h2 className="text-4xl md:text-6xl font-serif italic">Want to add a little magic?</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: "Playlist", icon: Music },
                      { label: "Surprise Note", icon: Heart },
                      { label: "Photo Moment", icon: Camera },
                      { label: "Keepsake", icon: Sparkles }
                    ].map((item) => (
                      <div key={item.label} className="group cursor-pointer">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                          <item.icon size={24} />
                        </div>
                        <p className="text-sm font-medium tracking-wide uppercase opacity-40 group-hover:opacity-100 transition-opacity">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-400 font-light text-sm italic">
                    No pressure. No prices upfront. Just possibilities we can arrange for you.
                  </p>
                </div>
              </section>

              {/* Final Exit Emotion */}
              <section className="py-52 bg-slate-50 text-slate-900 text-center px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                  <h2 className="text-5xl md:text-8xl font-serif font-light leading-tight tracking-tight">
                    You don’t have to plan everything. <br /> <span className="italic text-rose-500">Just the feeling.</span>
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                      href="/contact?intent=luxury-date"
                      className="w-full sm:w-auto px-12 py-7 bg-slate-900 text-white rounded-full font-bold text-xl hover:bg-rose-600 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-4"
                    >
                      Talk to a concierge
                    </Link>
                    <button
                      onClick={() => {
                        setStep(1);
                        if (typeof window !== "undefined") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className="w-full sm:w-auto px-12 py-7 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-xl hover:border-slate-400 transition-all flex items-center justify-center gap-4"
                    >
                      Plan another version
                    </button>
                  </div>

                  <div className="pt-20 opacity-40 text-[10px] uppercase tracking-[0.5em]">
                    Privacy Reserved • Designed with Restraint
                  </div>
                </div>
              </section>
            </motion.section>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
