"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

const ROLEPLAY_SCENES = [
    {
        text: [
            "Tonight we’re pretending it’s our wedding night — everything feels brand new and magical."
        ],
        key: "wedding-night",
        color: "#1e1b4b", // Deep Indigo
        accent: "#6366f1"
    },
    {
        text: [
            "Slow dancing in the room, lots of eye contact and soft kisses."
        ],
        key: "slow-dance",
        color: "#064e3b", // Deep Emerald
        accent: "#10b981"
    },
    {
        text: [
            "Undress each other reverently, like discovering her body for the first time."
        ],
        key: "undress",
        color: "#4c1d95", // Deep Violet
        accent: "#a78bfa"
    },
    {
        text: [
            "Use every technique from the main guide — but slower and more emotional."
        ],
        key: "slower",
        color: "#881337", // Deep Rose
        accent: "#fb7185"
    },
    {
        text: [
            "Whisper sweet nothings: 'I can’t believe you’re mine…'"
        ],
        key: "whisper",
        color: "#7c2d12", // Deep Orange
        accent: "#fb923c"
    },
    {
        text: [
            "Focus on deep connection and multiple orgasms through consistency."
        ],
        key: "connection",
        color: "#831843", // Deep Pink
        accent: "#f472b6"
    },
    {
        text: [
            "End with long aftercare: Hold her tight and say 'I love experiencing you like this.'"
        ],
        key: "aftercare",
        color: "#171717",
        accent: "#f43f5e"
    }
];

export default function RoleplayPage() {
    const [index, setIndex] = useState(0);

    const next = () => {
        if (index < ROLEPLAY_SCENES.length - 1) {
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
        return <span>{line}</span>;
    };

    return (
        <main
            className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative selection:bg-white/20"
        >
            {/* Click Trigger */}
            <div
                className="fixed inset-0 z-10 cursor-pointer"
                onClick={next}
            />

            {/* Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    style={{ background: `radial-gradient(circle at 50% 50%, ${ROLEPLAY_SCENES[index].color} 0%, #000 100%)` }}
                    className="fixed inset-0 pointer-events-none z-0"
                />
            </AnimatePresence>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center p-8 pointer-events-none">
                <div className="flex gap-4 pointer-events-auto">
                    <Link href="/signal">
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="px-6 py-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95"
                        >
                            Exit
                        </motion.button>
                    </Link>
                    {index > 0 && (
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={prev}
                            className="px-6 py-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95"
                        >
                            <span className="text-sm">←</span>
                            Back
                        </motion.button>
                    )}
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/5 px-5 py-2 rounded-full pointer-events-none">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-light">
                        Roleplay // {index + 1} of {ROLEPLAY_SCENES.length}
                    </span>
                </div>
            </header>

            {/* Narrative Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl w-full text-center space-y-12 relative z-30 pointer-events-none"
                >
                    <div className="space-y-10">
                        {ROLEPLAY_SCENES[index].text.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 * i + 0.4, duration: 1 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-[1.3] text-white/95"
                            >
                                {line}
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-20">
                        <motion.div
                            animate={{ opacity: [0.3, 0.8, 0.3], y: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            style={{ color: ROLEPLAY_SCENES[index].accent }}
                            className="text-[12px] uppercase tracking-[0.6em] font-bold"
                        >
                            {index === ROLEPLAY_SCENES.length - 1 ? "End of Scene" : "Tap to Continue"}
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/5 z-[100]">
                <motion.div
                    className="h-full"
                    style={{ backgroundColor: ROLEPLAY_SCENES[index].accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${((index + 1) / ROLEPLAY_SCENES.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </main>
    );
}
