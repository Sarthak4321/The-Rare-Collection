"use client";
// Deployment ID: 2026-02-06-22-45-unique

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    Zap,
    Camera,
    Compass,
    Eye,
    MapPin,
    Sparkles,
    Instagram,
    Twitter,
    Linkedin,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../components/Logo";

/* -------------------------------------------------------------------------- */
/* DESIGN CONSTANTS                                                           */
/* -------------------------------------------------------------------------- */

const SOFT_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number];

const GrainOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.04] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
    </div>
);

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const VIBES = [
    {
        id: "romantic",
        title: "RO-MANT-IC",
        label: "The Intimate Act",
        img: "/vibe_romantic.png",
        color: "#ff2d55",
        desc: "Candlelight, velvet silence, and unscripted connection."
    },
    {
        id: "playful",
        title: "PLA-YFUL",
        label: "The Vibrant Act",
        img: "/vibe_playful.png",
        color: "#0ea5e9",
        desc: "High-octane joy and spontaneous discovery."
    },
    {
        id: "calm",
        title: "CA-LM",
        label: "The Serene Act",
        img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80",
        color: "#10b981",
        desc: "Minimalist beauty and grounded energy."
    },
    {
        id: "urban",
        title: "UR-BAN",
        label: "The City Pulse",
        img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
        color: "#f59e0b",
        desc: "Skyline views, street soul, and electric nights."
    },
    {
        id: "vintage",
        title: "VI-NTAGE",
        label: "The Timeless Act",
        img: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?w=1200&q=80",
        color: "#8b5cf6",
        desc: "Jazz echoes, vinyl warmth, and old-world charm."
    },
    {
        id: "luxe",
        title: "LU-XE",
        label: "The Rare Act",
        img: "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=1200&q=80",
        color: "#f43f5e",
        desc: "Penthouse privacy and chauffeured effortless luxury."
    },
    {
        id: "mysterious",
        title: "MYST-ERY",
        label: "The Noir Act",
        img: "/vibe_mysterious.png",
        color: "#6366f1",
        desc: "Liquid shadows and hidden doors."
    },
    {
        id: "adventure",
        title: "WI-LD",
        label: "The Escape Act",
        img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80",
        color: "#ec4899",
        desc: "Uncharted paths, night treks, and stargazing soul."
    }
];

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                                                             */
/* -------------------------------------------------------------------------- */

const HorizontalScrollVibes = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Adjusted range to ~-78% so the final 'Outro' card ends centered in the viewport
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);

    return (
        <section ref={sectionRef} className="relative h-[800vh] bg-black">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-16">
                {/* Visual Progress Bar HUD */}
                <div className="absolute bottom-8 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row items-center gap-4 md:gap-10 z-20">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/20 whitespace-nowrap order-2 md:order-1">Archive Progress</span>
                    <div className="flex-1 w-full md:w-auto h-px bg-white/5 overflow-hidden order-1 md:order-2">
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="h-full bg-rose-500 origin-left"
                        />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/20 whitespace-nowrap order-3">Phase 02 / 08 Vibes</span>
                </div>

                <motion.div style={{ x, opacity }} className="flex items-center gap-12 md:gap-24 px-12 md:px-32 w-max h-[75vh]">
                    <div className="flex-shrink-0 w-[85vw] md:w-[45vw] flex flex-col justify-center px-4 md:px-0">
                        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] md:tracking-[1em] text-rose-500 mb-6 md:mb-8 font-black">Archive 01</span>
                        <h2 className="text-5xl sm:text-6xl md:text-[8rem] font-serif italic text-white leading-none tracking-tighter">
                            The <br /> Collection<span className="text-rose-500">.</span>
                        </h2>
                        <div className="mt-8 md:mt-12 flex items-center gap-3 md:gap-4 text-white/20">
                            <div className="w-8 md:w-12 h-px bg-current" />
                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em]">Scroll to navigate archive</span>
                        </div>
                    </div>

                    {VIBES.map((v) => (
                        <div key={v.id} className="flex-shrink-0 w-[85vw] md:w-[32vw] aspect-[4/5] relative group">
                            <div className="absolute -top-10 left-0 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-white transition-colors">
                                [{v.label}]
                            </div>
                            <div className="relative w-full h-full overflow-hidden border border-white/10 group-hover:border-rose-500/30 transition-all duration-1000 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <Image
                                    src={v.img}
                                    alt={v.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-all duration-[2s] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-10 left-10 right-10 transition-transform duration-700">
                                    <h3 className="text-4xl md:text-5xl font-serif font-black text-white italic leading-[1.1] mb-6">
                                        {v.title}
                                    </h3>
                                    <p className="text-white/80 text-[10px] uppercase tracking-[0.1em] leading-relaxed max-w-[200px]">
                                        {v.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex-shrink-0 w-[85vw] md:w-[45vw] flex flex-col justify-center items-center px-6">
                        <Link href="/plan" className="group flex flex-col items-center gap-10">
                            <div className="w-20 h-20 md:w-36 md:h-36 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-rose-500 group-hover:border-rose-500 transition-all duration-1000 shadow-2xl overflow-hidden relative">
                                <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-white relative z-10" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                            </div>
                            <div className="text-center space-y-4">
                                <span className="text-[10px] uppercase font-black tracking-[0.6em] text-white/20 group-hover:text-white transition-colors block">Curate Your Act</span>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">Launch Planner</p>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

/* -------------------------------------------------------------------------- */
/* MAIN PAGE                                                                  */
/* -------------------------------------------------------------------------- */

export default function AvantGardeLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <main className="bg-[#050505] text-white selection:bg-rose-500 selection:text-white min-h-screen">
            <GrainOverlay />

            {/* Premium Navigation HUD */}
            <nav className={cn(
                "absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] max-w-7xl transition-all duration-500",
                isMenuOpen ? "z-[200]" : "z-[100]"
            )}>
                <div className="bg-black/60 backdrop-blur-2xl border border-white/10 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <Link href="/" className="flex items-center gap-3 md:gap-4 group">
                        <div className="relative transform transition-transform group-hover:scale-110 group-hover:rotate-6">
                            <Logo className="w-9 h-9 md:w-11 md:h-11 drop-shadow-[0_0_12px_rgba(244,63,94,0.3)]" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-white">The Rare</span>
                            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-rose-500 font-bold">Collection</span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.4em] font-medium">
                        {["Pricing", "About", "Spicy"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-white/40 hover:text-white transition-all relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-rose-500 transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 md:gap-8">
                        <Link
                            href="/auth/login"
                            className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all relative group"
                        >
                            Login
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-rose-500 transition-all group-hover:w-full" />
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="bg-white text-black px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-xl font-bold text-[9px] md:text-[10px] uppercase tracking-wider"
                        >
                            Signup
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-white p-2 relative z-[210] hover:bg-white/5 rounded-full transition-colors"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isMenuOpen ? "close" : "menu"}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-5 h-5 opacity-70" />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Outside nav for true fixed positioning */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[150] bg-black md:hidden flex flex-col items-center justify-center p-8 overflow-hidden"
                    >
                        <div className="flex flex-col items-center gap-10 w-full max-w-sm">
                            {["Pricing", "About", "Spicy", "Login"].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                >
                                    <Link
                                        href={`/${item.toLowerCase()}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-4xl font-serif italic text-white/60 hover:text-rose-500 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="w-full pt-10 border-t border-white/10"
                            >
                                <Link
                                    href="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full bg-rose-500 text-white py-5 rounded-full flex items-center justify-center text-lg font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(244,63,94,0.3)]"
                                >
                                    Get Started
                                </Link>
                            </motion.div>
                        </div>

                        {/* Decorative coordinates - bottom centered */}
                        <div className="absolute bottom-12 flex gap-10 opacity-20">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[8px] uppercase tracking-[0.4em]">Lat.</span>
                                <span className="text-[10px] font-mono">19.0760</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[8px] uppercase tracking-[0.4em]">Long.</span>
                                <span className="text-[10px] font-mono">72.8777</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. HERO — TYPOGRAPHIC MASKING */}
            <section className="relative min-h-screen md:h-screen flex flex-col items-center justify-center px-4 py-20 md:p-6 bg-black overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#020202]">
                    {/* The Symbolic Convergence — Two souls finding rhythm */}

                    {/* Soul A: Intimacy (Deep Warmth) */}
                    <motion.div
                        animate={{
                            x: ["-20%", "5%", "-20%"],
                            y: ["-10%", "10%", "-10%"],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] bg-rose-900/30 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen"
                    />

                    {/* Soul B: Perspective (Ethereal Cool) */}
                    <motion.div
                        animate={{
                            x: ["20%", "-5%", "20%"],
                            y: ["10%", "-10%", "10%"],
                            scale: [1.1, 0.8, 1.1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] bg-indigo-950/40 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen"
                    />

                    {/* The Spark: The moment of connection (Amber Glow) */}
                    <motion.div
                        animate={{
                            opacity: [0.2, 0.5, 0.2],
                            scale: [0.7, 1.1, 0.7],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-amber-900/10 rounded-full blur-[80px] md:blur-[100px]"
                    />

                    {/* Meaningful Heartbeat Pulse — Rhythmic & Human */}
                    <motion.div
                        animate={{
                            opacity: [0, 0.1, 0],
                            scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.2, 1], // Human-like pulse curve
                            times: [0, 0.1, 1]
                        }}
                        className="absolute inset-0 bg-rose-500/5 pointer-events-none"
                    />

                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
                </div>

                {/* Large Background Text */}
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: SOFT_EASE }}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none"
                >
                    <motion.h2
                        animate={{
                            opacity: [0.02, 0.3, 0.05, 0.4, 0.05, 0.02],
                            textShadow: [
                                "0 0 20px rgba(244,63,94,0.1)",
                                "0 0 60px rgba(244,63,94,0.5)",
                                "0 0 20px rgba(244,63,94,0.1)",
                                "0 0 100px rgba(244,63,94,0.7)",
                                "0 0 20px rgba(244,63,94,0.1)",
                                "0 0 10px rgba(244,63,94,0.05)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            times: [0, 0.05, 0.1, 0.15, 0.2, 1]
                        }}
                        className="text-[40vw] md:text-[32vw] font-black italic rotate-[-6deg] select-none uppercase text-white tracking-[-0.04em]"
                        style={{ fontFamily: "'Avenir Next', 'Avenir', 'Montserrat', sans-serif", fontWeight: 900 }}
                    >
                        Love
                    </motion.h2>
                </motion.div>

                <div className="relative z-10 text-center max-w-6xl mt-12 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: SOFT_EASE }}
                        className="space-y-6 md:space-y-8"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-px w-8 bg-rose-500/50" />
                            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.8em] text-white/40">Simple guidance • Better plans • Real connection</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-[9.5rem] font-serif leading-[1.1] md:leading-[0.8] tracking-tight md:tracking-tighter">
                            Don’t <br />
                            <span className="italic font-light text-rose-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.4)]">overthink</span> <br className="md:hidden" /> the date.
                        </h1>

                        <p className="text-base md:text-2xl font-light text-white/40 max-w-[280px] sm:max-w-xl md:max-w-3xl mx-auto italic leading-relaxed">
                            Matched? We help you plan a perfect date — without stress, confusion, or boring ideas.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-12 md:mt-16 flex flex-col items-center"
                    >
                        <Link href="/plan" className="group relative">
                            {/* Premium Multi-layered Glow */}
                            <div className="absolute -inset-1 bg-rose-500 rounded-px opacity-40 group-hover:opacity-100 blur-xl transition duration-500" />
                            <div className="absolute -inset-1 bg-rose-400 rounded-px opacity-0 group-hover:opacity-50 blur-2xl transition duration-700" />

                            {/* Main Button */}
                            <div className="rounded-full relative flex items-center gap-4 md:gap-6 bg-rose-500 border border-white/20 px-10 py-4 md:px-14 md:py-7 transition-all duration-500 group-hover:bg-rose-600 group-hover:scale-[1.02] shadow-[0_20px_40px_rgba(244,63,94,0.3)] group-hover:shadow-[0_25px_50px_rgba(244,63,94,0.5)]">
                                <span className="text-sm md:text-xl font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white">
                                    Plan My Date
                                </span>

                                <motion.div
                                    className="flex items-center justify-center"
                                    animate={{ x: [0, 8, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </motion.div>

                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <motion.div
                                        initial={{ x: "-150%", skewX: -20 }}
                                        whileHover={{ x: "150%" }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                    />
                                </div>
                            </div>

                            {/* Decorative Substring */}

                        </Link>
                    </motion.div>
                </div>


            </section>

            {/* 2. THE STORY — HUMAN, RELATABLE, CONVINCING */}
            <section className="relative py-24 md:py-64 bg-white text-black px-6 md:px-20 overflow-hidden">
                <div className="max-w-5xl mx-auto">

                    {/* Section Label */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="block mb-10 text-[10px] font-black uppercase tracking-[0.6em] text-rose-500"
                    >
                        Why We Exist
                    </motion.span>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-4xl md:text-8xl font-serif italic leading-[1.1] md:leading-[0.9] tracking-tighter mb-12 md:mb-20"
                    >
                        Dating isn’t the problem.
                        <br />
                        <span className="text-rose-500 not-italic font-bold">
                            Planning is.
                        </span>
                    </motion.h2>

                    {/* Story Flow */}
                    <div className="space-y-12 md:space-y-20 text-xl md:text-5xl font-serif font-light italic leading-[1.4] md:leading-[1.25] text-black/85">

                        {/* Beat 1 */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            You matched.
                            <br />
                            There was excitement. Curiosity. A real spark.
                        </motion.p>

                        {/* Beat 2 */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 }}
                        >
                            Then came the questions.
                            <br />
                            <span className="relative inline-block">
                                Where should we go?
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="absolute left-0 -bottom-2 h-1 bg-rose-500/30 rounded-full"
                                />
                            </span>{" "}
                            Will they like it?
                            Is this too boring? Too much?
                        </motion.p>

                        {/* Beat 3 */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            Suddenly, instead of feeling excited,
                            <br />
                            you’re stressed — scrolling endlessly,
                            second-guessing every option.
                        </motion.p>

                        {/* Beat 4 — Turning Point */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            That’s the moment we care about.
                            <br />
                            The moment when planning starts
                            <span className="relative inline-block text-rose-500 font-bold not-italic">
                                getting in the way
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ delay: 0.8, duration: 0.7 }}
                                    className="absolute left-0 -bottom-2 h-1.5 bg-rose-500 rounded-full"
                                />
                            </span>{" "}
                            of connection.
                        </motion.p>

                        {/* Beat 5 — Resolution */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            We help you plan better —
                            <br />
                            with clarity, structure, and ideas that actually feel right.
                        </motion.p>

                        {/* Beat 6 — Emotional Payoff */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            So when the date happens,
                            <br />
                            you’re not thinking about the plan.
                            <br />
                            You’re focused on the
                            <span className="relative inline-block text-rose-500 font-bold not-italic">
                                person across from you.
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute left-0 -bottom-2 h-1 bg-rose-500 shadow-[0_6px_25px_rgba(244,63,94,0.35)]"
                                />
                            </span>
                        </motion.p>

                    </div>
                </div>

                {/* Background Word — softer, calmer */}
                <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
                    <span className="text-[28vw] font-serif italic">Connection</span>
                </div>
            </section>


            {/* 3. HORIZONTAL VIBE SHOWCASE */}
            <HorizontalScrollVibes />

            {/* 4. THE PROCESS — ROADMAP ANIMATION */}
            <section className="py-40 md:py-80 bg-[#050505] px-6 relative overflow-hidden">
                {/* Background ambient light */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-40">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] md:tracking-[1em] text-rose-500 mb-6 md:mb-8 block"
                        >
                            The Journey
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-8xl font-serif text-white italic tracking-tighter"
                        >
                            Step Into <br /> The Narrative.
                        </motion.h2>
                    </div>

                    {/* Vertical Roadmap */}
                    <div className="relative">
                        {/* The Growing Line */}
                        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 overflow-hidden">
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                viewport={{ once: true }}
                                className="w-full bg-rose-500"
                            />
                        </div>

                        {/* Roadmap Steps */}
                        <div className="space-y-24 md:space-y-40">
                            {[
                                {
                                    icon: Eye,
                                    title: "Phase 01. The Atmosphere",
                                    side: "right",
                                    desc: "Beyond forms and tick-boxes. We meet you where your preferences live, decoding the unsaid through our unique brief process."
                                },
                                {
                                    icon: Camera,
                                    title: "Phase 02. The Blueprint",
                                    side: "left",
                                    desc: "Scripting the act. Not just a booking, but a multi-sensory narrative designed for unscripted connection and cinematic rhythm."
                                },
                                {
                                    icon: MapPin,
                                    title: "Phase 03. The Setting",
                                    side: "right",
                                    desc: "The stage is yours. We've archived the most exclusive corners of the city, matching them to your story's emotional frequency."
                                },
                                {
                                    icon: Sparkles,
                                    title: "Phase 04. The Resolution",
                                    side: "left",
                                    desc: "Witness the reveal. Your night is fully architected, from the first spark to the final goodbye. You just show up and live the plot."
                                }
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: step.side === "right" ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className={`relative flex items-center justify-start md:justify-center ${step.side === "left" ? "md:flex-row-reverse" : ""}`}
                                >
                                    {/* Central Marker */}
                                    <div className="absolute left-[30px] md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full border border-rose-500 bg-black z-20 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ delay: 0.5, type: "spring" }}
                                            className="w-1.5 h-1.5 bg-rose-500 rounded-full"
                                        />
                                    </div>

                                    {/* Content Block */}
                                    <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${step.side === "right" ? "md:pl-20" : "md:pr-20 md:text-right"}`}>
                                        <div className="space-y-6 group">
                                            <div className={`w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-rose-500 transition-colors duration-500 ${step.side === "left" ? "md:ml-auto" : ""}`}>
                                                <step.icon className="w-5 h-5 text-white/40 group-hover:text-rose-500" />
                                            </div>
                                            <div className="space-y-4 px-2 md:px-0">
                                                <h4 className="text-2xl md:text-3xl font-serif italic font-black text-white">{step.title}</h4>
                                                <p className={`text-white/40 font-light text-sm leading-relaxed max-w-sm group-hover:text-white/80 transition-colors ${step.side === 'left' ? 'md:ml-auto' : ''}`}>
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty space for alternative side */}
                                    <div className="hidden md:block md:w-[45%]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FINAL CTA — ARCHITECTURAL EXECUTION */}
            <section className="py-32 md:py-80 bg-[#f8f8f8] text-black text-center relative px-6 overflow-hidden">
                {/* Subtle Architectural Grid/Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="max-w-6xl mx-auto space-y-16 md:space-y-32 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="inline-flex items-center gap-3 bg-black text-white px-5 py-2 text-[9px] font-black uppercase tracking-[0.5em]">
                            <Zap className="w-3 h-3 text-rose-500 animate-pulse" />
                            Next Cohort Opening Soon
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: SOFT_EASE }}
                        className="text-4xl sm:text-7xl md:text-[11rem] font-serif font-black italic tracking-tighter leading-[1.1] md:leading-[0.8]"
                    >
                        End The Loop<span className="text-rose-500">.</span> <br />
                        <span className="not-italic opacity-[0.05] md:opacity-[0.03]">Now.</span>
                    </motion.h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
                        <motion.div
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className="relative group cursor-pointer"
                        >
                            <Link href="/plan" className="block relative z-10">
                                {/* The 'Architectural' Button */}
                                <motion.div
                                    variants={{
                                        initial: { y: 0, rotateX: 0, rotateY: 0 },
                                        hover: { y: -8, rotateX: 5, rotateY: -5 },
                                        tap: { y: 2, scale: 0.98 }
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-black text-white px-10 md:px-20 py-8 md:py-12 text-xl md:text-2xl font-black uppercase tracking-[0.4em] relative shadow-[20px_20px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-white/10"
                                >
                                    <span className="relative z-10">Design My Date</span>

                                    {/* Premium Interior Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/0 via-rose-500/5 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Scanline Effect */}
                                    <motion.div
                                        animate={{ top: ["-100%", "200%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-px bg-white/20 blur-sm"
                                    />
                                </motion.div>

                                {/* The 'Depth' Layer */}
                                <div className="absolute -bottom-2 -right-2 md:-bottom-4 -right-4 inset-0 bg-rose-500/10 -z-10 group-hover:bg-rose-500/20 transition-colors duration-500" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center md:text-left space-y-4 md:border-l md:border-black/5 md:pl-12"
                        >
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Private Access Only</p>
                            </div>
                            <p className="text-xl md:text-3xl font-serif italic text-black/60 max-w-[280px] leading-relaxed">
                                Curating limited cohorts for architectural clarity.
                            </p>
                        </motion.div>
                    </div>

                    {/* Industrial Markings */}
                    <div className="absolute bottom-10 left-10 flex flex-col gap-2 opacity-10 text-[8px] font-mono uppercase tracking-widest text-left hidden md:flex">
                        <span>Ref. N_0942_CTA</span>
                        <span>Encrypted_Stream_Active</span>
                        <span>Terminal_v.2.0.4</span>
                    </div>

                    {/* Massive Background Text - More subtle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden whitespace-nowrap opacity-[0.02] select-none pointer-events-none -z-10">
                        <p className="text-[25vw] font-serif font-black italic uppercase">Bespoke • Curated • Exclusive </p>
                    </div>
                </div>
            </section>

            {/* 6. ENHANCED FOOTER */}
            <footer className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-20 border-t border-white/5 bg-[#020202] text-white overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-20 md:mb-32">
                        {/* Brand Column */}
                        <div className="md:col-span-5 space-y-8 md:space-y-10">
                            <Link href="/" className="text-3xl md:text-4xl font-serif font-black italic tracking-tighter block">
                                EVNTMET<span className="text-rose-500">.</span>
                            </Link>
                            <p className="text-white/40 font-light text-base md:text-lg leading-relaxed max-w-sm">
                                We curate cinematic dates for couples who value atmosphere over logistics. Architectural execution for the unscripted moments.
                            </p>
                            <div className="flex gap-4 md:gap-6">
                                {[
                                    { icon: Instagram, label: "Instagram" },
                                    { icon: Twitter, label: "Twitter" },
                                    { icon: Linkedin, label: "LinkedIn" }
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href="#"
                                        className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-rose-500 hover:border-rose-500 transition-all duration-500 group"
                                    >
                                        <social.icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Columns - 2 columns on mobile */}
                        <div className="md:col-span-4 grid grid-cols-2 gap-8">
                            <div className="space-y-6 md:space-y-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-500">Exhibit</h4>
                                <ul className="space-y-3 md:space-y-4 text-xs md:sm font-light text-white/40">
                                    <li><Link href="/archive" className="hover:text-white transition-colors">The Collection</Link></li>
                                    <li><Link href="/process" className="hover:text-white transition-colors">The Process</Link></li>
                                    <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                                    <li><Link href="/about" className="hover:text-white transition-colors">Manifesto</Link></li>
                                </ul>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-500">Studio</h4>
                                <ul className="space-y-3 md:space-y-4 text-xs md:sm font-light text-white/40">
                                    <li><Link href="/contact" className="hover:text-white transition-colors">Reach Out</Link></li>
                                    <li><Link href="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                                    <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                                    <li><Link href="/press" className="hover:text-white transition-colors">Press Kit</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact/Newsletter Column */}
                        <div className="md:col-span-3 space-y-6 md:space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-500">The Loop</h4>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-sm font-light focus:outline-none focus:border-rose-500 transition-colors placeholder:text-white/20"
                                />
                                <button className="absolute right-0 bottom-3 md:bottom-4 text-rose-500">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 leading-relaxed">
                                Join the inner circle. Weekly curation of the city&apos;s most silent corners.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-12 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
                        <p className="text-[10px] text-white/20 tracking-widest uppercase text-center md:text-left">
                            © 2026 EVNTMET STUDIO. Architectural Date Curation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                        </div>
                        <div className="flex items-center gap-3 text-white/20">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[9px] uppercase tracking-[0.4em]">Systems Operational</span>
                        </div>
                    </div>
                </div>
            </footer>

        </main >
    );
}
