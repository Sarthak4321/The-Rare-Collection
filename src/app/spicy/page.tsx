"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Lock,
    Crown,
    Film,
    Package,
    ShieldCheck,
    X,
    Send,
    Loader2,
} from "lucide-react";

/* ----------------------------------------
   PRODUCT DEFINITION
---------------------------------------- */

const ACTS = [
    {
        id: "the-act",
        icon: Film,
        title: "The Noir Act™",
        subtitle: "The cinematic experience",
        description:
            "A directed romantic night designed to make you lead with confidence and intention — without guessing or awkwardness.",
        detail: `This is not advice.  
This is direction.

A private, cinematic flow that transforms an ordinary evening into a moment that feels deliberate, slow, and unforgettable.

No explicit content.
No performance pressure.
Just presence and control.`,
    },
    {
        id: "the-role",
        icon: Crown,
        title: "The Lead Role",
        subtitle: "You take control of the moment",
        description:
            "The experience subtly places you in the lead — guiding pace, presence, and energy without saying a word.",
        detail: `You don’t perform.
You don’t rush.

You decide the rhythm.
You decide the pauses.
You decide when the moment deepens — and when it holds.`,
    },
    {
        id: "the-box",
        icon: Package,
        title: "The Midnight Box",
        subtitle: "Physical upgrade (optional)",
        description:
            "A discreet mystery box that turns the experience from digital into physical.",
        detail: `Included as an optional upgrade.

Every item is chosen to:
• reduce self-consciousness
• heighten anticipation
• make the night feel real

Never required.
Always intentional.`,
    },
];

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function SpicyPage() {
    const [active, setActive] = useState<typeof ACTS[0] | null>(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        setSuccess(true);
    };

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-b from-rose-950/20 to-black pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-40">

                {/* NAV */}
                <nav className="flex justify-between items-center py-10">
                    <Link href="/" className="text-white/40 hover:text-white">
                        <ArrowLeft />
                    </Link>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-white/50">
                        Private Experience
                    </div>
                </nav>

                {/* HERO */}
                <section className="text-center max-w-3xl mx-auto mb-32">
                    <h1 className="text-7xl md:text-[10rem] font-serif italic tracking-tighter text-rose-600">
                        The Noir Act
                    </h1>
                    <p className="mt-8 text-white/50 text-xl leading-relaxed">
                        A cinematic romantic experience
                        designed for men who want to lead —
                        not guess.
                    </p>
                </section>

                {/* ACTS */}
                <section className="grid md:grid-cols-3 gap-6 mb-32">
                    {ACTS.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => setActive(item)}
                            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-rose-500/40 transition cursor-pointer"
                        >
                            <item.icon className="w-10 h-10 text-rose-500 mb-6" />
                            <h3 className="text-3xl font-bold">{item.title}</h3>
                            <p className="text-white/40 mt-2">{item.subtitle}</p>
                            <p className="mt-6 text-white/50 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </section>

                {/* TRUST */}
                <section className="flex items-center gap-8 p-12 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 mb-32">
                    <ShieldCheck className="w-14 h-14 text-emerald-500" />
                    <p className="text-white/50 text-lg">
                        No explicit content.
                        No saved data.
                        Designed for privacy and control.
                    </p>
                </section>

                {/* CTA */}
                <section className="text-center max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div className="p-12 rounded-[3rem] bg-emerald-500/10">
                                <h3 className="text-2xl font-bold">Access Requested</h3>
                                <p className="text-white/50 mt-2">
                                    Your invitation will arrive privately.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                onSubmit={submit}
                                className="p-10 rounded-[3rem] bg-rose-600 shadow-[0_40px_120px_rgba(225,29,72,0.4)]"
                            >
                                <h2 className="text-4xl font-serif italic mb-6">
                                    Enter The Noir Act
                                </h2>
                                <div className="flex gap-4 flex-col md:flex-row">
                                    <input
                                        type="email"
                                        required
                                        placeholder="PRIVATE EMAIL"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-8 py-5 rounded-full bg-black/20 border border-white/20 text-xs tracking-widest"
                                    />
                                    <button
                                        disabled={loading}
                                        className="px-10 py-5 bg-white text-rose-600 rounded-full uppercase text-xs tracking-[.4em] font-black"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <>Request Access <Send /></>}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </section>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 z-[100]">
                        <motion.div className="bg-[#0A0A0A] p-10 rounded-[3rem] max-w-xl w-full border border-white/10 relative">
                            <button onClick={() => setActive(null)} className="absolute top-6 right-6 text-white/40">
                                <X />
                            </button>
                            <h3 className="text-3xl font-bold mb-6">{active.title}</h3>
                            <p className="text-white/60 whitespace-pre-line leading-relaxed">
                                {active.detail}
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
