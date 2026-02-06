"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";

const PLANS = [
    {
        name: "Casual",
        price: "$49",
        desc: "Single narrative planning",
        features: ["1 Custom Itinerary", "Basic Support", "Standard Booking"],
        color: "white/10"
    },
    {
        name: "Rare",
        price: "$129",
        desc: "The cinematic experience",
        features: ["3 Premium Narratives", "Priority Booking", "VIP Concierge", "Venue Gift Coordination"],
        color: "rose-500",
        highlight: true
    },
    {
        name: "Infinite",
        price: "$299",
        desc: "Life-long curation",
        features: ["Unlimited Narratives", "Dedicated Agent", "Private Event Access", "Global Support"],
        color: "white/10"
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-rose-500 py-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 space-y-6">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-rose-500 text-[10px] font-black uppercase tracking-[0.5em]"
                    >
                        Investment
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-serif italic tracking-tighter"
                    >
                        The Cost of <span className="text-rose-500">Unforgettable.</span>
                    </motion.h1>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-10 border ${plan.highlight ? 'border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.1)]' : 'border-white/10'} bg-white/5 backdrop-blur-3xl rounded-[2rem] flex flex-col`}
                        >
                            <h2 className="text-2xl font-serif italic mb-2">{plan.name}</h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest mb-8">{plan.desc}</p>
                            <div className="text-5xl font-black tracking-tighter mb-10">
                                {plan.price}<span className="text-sm font-light text-white/40 ml-2">/act</span>
                            </div>

                            <ul className="space-y-4 mb-12 flex-1">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                                        <Zap className="w-3 h-3 text-rose-500" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-full font-bold uppercase text-[10px] tracking-[.3em] transition-all ${plan.highlight ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-white text-black hover:bg-rose-500 hover:text-white'}`}>
                                Select Plan
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs uppercase tracking-[0.3em]">Return home</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
