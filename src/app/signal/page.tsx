"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

const SCENES = [
    {
        text: [
            "Be calm and present tonight.",
            "Make her feel truly **seen**, safe, and wanted."
        ],
        key: "start",
        color: "#1e1b4b", // Deep Indigo
        accent: "#6366f1"
    },
    {
        text: [
            "Always check she’s comfortable.",
            "Look in her eyes and ask softly.",
            "**Her comfort = your strength**."
        ],
        key: "consent",
        color: "#064e3b", // Deep Emerald
        accent: "#10b981"
    },
    {
        text: [
            "Start gentle — no rush.",
            "Touch her neck, shoulders, back, arms with light fingers."
        ],
        key: "touch",
        color: "#4c1d95", // Deep Violet
        accent: "#a78bfa"
    },
    {
        text: [
            "Kiss slowly and deeply.",
            "Lips → jaw → neck → ears.",
            "Breathe warmly on her skin — she’ll melt."
        ],
        key: "kiss",
        color: "#881337", // Deep Rose
        accent: "#fb7185"
    },
    {
        text: [
            "Touch her breasts softly.",
            "Hold them fully, tease nipples gently with fingers, then tongue."
        ],
        key: "breasts",
        color: "#7c2d12", // Deep Orange
        accent: "#fb923c"
    },
    {
        text: [
            "Kiss and lick slowly up her **inner thighs**.",
            "Go very slow — this area is super sensitive."
        ],
        key: "thighs",
        color: "#831843", // Deep Pink
        accent: "#f472b6"
    },
    {
        text: [
            "When she’s really wet → go down on her.",
            "Use a flat, soft tongue.",
            "Slow wide circles on her clit — it has **8,000+ nerve endings**."
        ],
        key: "oral",
        color: "#164e63", // Deep Cyan
        accent: "#22d3ee"
    },
    {
        text: [
            "Once you find her favorite rhythm — **don’t change it**.",
            "Stay steady if she’s breathing faster or pushing into you."
        ],
        key: "rhythm",
        color: "#581c87", // Deep Purple
        accent: "#c084fc"
    },
    {
        text: [
            "While licking, slide 1–2 fingers inside.",
            "Palm up, curve them like **‘come here’** — that hits the G-spot."
        ],
        key: "fingers",
        color: "#312e81", // Deep Indigo
        accent: "#818cf8"
    },
    {
        text: [
            "**Combine clit licking + G-spot pressure**.",
            "This double feeling makes most women shake and finish stronger."
        ],
        key: "blend",
        color: "#78350f", // Deep Amber
        accent: "#fbbf24"
    },
    {
        text: [
            "Watch her body, not the time.",
            "**Deep breathing, lifted hips, getting quiet = she’s close**.",
            "Keep going — don’t speed up or switch!"
        ],
        key: "close",
        color: "#450a0a", // Deep Red
        accent: "#ef4444"
    },
    {
        text: [
            "Missionary + pillow under her hips.",
            "Grind deep + rub her clit with your body or hand.",
            "**Eye contact + clit touch = very strong orgasms**."
        ],
        key: "missionary",
        color: "#7f1d1d", // Dark Red
        accent: "#f87171"
    },
    {
        text: [
            "Her on top.",
            "She controls speed & depth.",
            "You can play with nipples or clit — she feels in charge."
        ],
        key: "ontop",
        color: "#713f12", // Dark Yellow/Gold
        accent: "#facc15"
    },
    {
        text: [
            "Doggy style.",
            "Goes deep and hits G-spot naturally.",
            "Reach around and rub her clit firmly."
        ],
        key: "doggy",
        color: "#431407", // Dark Brown/Orange
        accent: "#f97316"
    },
    {
        text: [
            "**Clit stimulation + penetration together** is the #1 way most women orgasm hardest."
        ],
        key: "pairing",
        color: "#1e1b4b",
        accent: "#60a5fa"
    },
    {
        text: [
            "Edge her (build her up, then pause).",
            "Bring her close 2–3 times → then let her finish.",
            "**The final one feels much bigger**."
        ],
        key: "edge",
        color: "#134e4a", // Dark Teal
        accent: "#2dd4bf"
    },
    {
        text: [
            "When she starts cumming — **don’t stop or change**.",
            "Keep the same speed & pressure.",
            "She might have more than one."
        ],
        key: "orgasm",
        color: "#9f1239", // Dark Rose
        accent: "#fda4af"
    },
    {
        text: [
            "Her orgasm is your win.",
            "Feel her squeeze, hear her sounds — **you made that happen**."
        ],
        key: "win",
        color: "#854d0e", // Dark Gold
        accent: "#fde047"
    },
    {
        text: [
            "After she finishes — hold her close.",
            "Stay inside or cuddle tight.",
            "Stroke her skin slowly."
        ],
        key: "aftercare",
        color: "#1e293b", // Dark Slate
        accent: "#94a3b8"
    },
    {
        text: [
            "Whisper something sweet:",
            "“You looked so beautiful coming apart.”",
            "**This moment bonds you deepest**."
        ],
        key: "bond",
        color: "#171717",
        accent: "#f43f5e"
    }
];

export default function RomanticLeadGuide() {
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const next = () => {
        if (index < SCENES.length - 1) {
            setIndex(index + 1);
        }
    };

    const prev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const underlineVariants: Variants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }
        }
    };

    const renderParsedText = (line: string) => {
        const parts = line.split("**");
        return parts.map((part, i) => {
            if (i % 2 === 1) {
                return (
                    <span key={i} className="relative inline-block font-bold text-white px-1">
                        <span className="relative z-10">{part}</span>
                        <motion.span
                            className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full z-0 origin-left"
                            style={{ backgroundColor: SCENES[index].accent, boxShadow: `0 0 15px ${SCENES[index].accent}66` }}
                            variants={underlineVariants}
                            initial="hidden"
                            animate="visible"
                        />
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <main
            onClick={next}
            className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative selection:bg-white/20 cursor-pointer"
        >
            {/* Dynamic Background Atmosphere */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    style={{ background: `radial-gradient(circle at 50% 50%, ${SCENES[index].color} 0%, #000 100%)` }}
                    className="fixed inset-0 pointer-events-none z-0"
                />
            </AnimatePresence>

            {/* Header Navigation - Top Layer (Z-100) */}
            <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center p-8 pointer-events-none">
                <AnimatePresence>
                    {index > 0 && (
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            onClick={prev}
                            className="pointer-events-auto px-6 py-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-white/20 hover:border-white/30 transition-all flex items-center gap-3 active:scale-90"
                        >
                            <span className="text-sm">←</span>
                            Back
                        </motion.button>
                    )}
                </AnimatePresence>

                <div className="bg-black/40 backdrop-blur-md border border-white/5 px-5 py-2 rounded-full pointer-events-none">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-light">
                        {index + 1} // {SCENES.length}
                    </span>
                </div>
            </header>

            {/* Cinematic Effects */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl w-full text-center space-y-12 md:space-y-16 relative z-30 pointer-events-none"
                >
                    {/* Scene Metadata (Subtle) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ delay: 0.5 }}
                        className="text-xs uppercase tracking-[1.5em] font-extralight mb-8"
                    >
                        {SCENES[index].key}
                    </motion.div>

                    {/* Main Narrative Content */}
                    <div className="space-y-10 md:space-y-14">
                        {SCENES[index].text.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 * i + 0.4, duration: 1 }}
                                className="text-3xl md:text-5xl lg:text-7xl font-serif italic tracking-tight leading-[1.3] text-white/95"
                            >
                                {renderParsedText(line)}
                            </motion.div>
                        ))}
                    </div>

                    {/* Reveal Prompt */}
                    <div className="pt-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 1.5 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <motion.div
                                animate={{ opacity: [0.3, 0.8, 0.3], y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                style={{ color: SCENES[index].accent }}
                                className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.6em]"
                            >
                                Tap to Lead
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress Bar (Subtle bottom edge) */}
            <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/5 z-[100]">
                <motion.div
                    className="h-full"
                    style={{ backgroundColor: SCENES[index].accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${((index + 1) / SCENES.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Companion Bundle - Floating Menu */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[150] flex gap-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 }}
                    className="flex gap-4 pointer-events-auto"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open("https://open.spotify.com/playlist/37i9dQZF1DX6VqbeOn96O0", "_blank");
                        }}
                        className="px-6 py-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 group cursor-pointer"
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">🎵</span>
                        Music Playlist
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push("/signal/roleplay");
                        }}
                        className="px-6 py-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 group cursor-pointer"
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">🎭</span>
                        Roleplay Scripts
                    </button>
                </motion.div>
            </div>
        </main>
    );
}

