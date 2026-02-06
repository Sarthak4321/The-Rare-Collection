"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, Eye, Lock } from "lucide-react";

export default function SpicyPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-rose-500 flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-rose-950/20 blur-[150px] rounded-full animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full space-y-12 relative z-10 text-center"
            >
                <div className="space-y-6">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-16 h-16 border border-rose-500/50 rounded-full flex items-center justify-center mx-auto mb-10"
                    >
                        <Flame className="w-8 h-8 text-rose-500 fill-rose-500" />
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter">
                        The <span className="text-rose-500">Noir</span> Act.
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed italic">
                        &quot;For those who prefer their connections with a bit more... intensity.&quot;
                    </p>
                </div>

                <div className="p-10 border border-white/5 bg-white/5 backdrop-blur-2xl rounded-3xl space-y-8">
                    <div className="flex justify-center gap-8 opacity-40">
                        <Lock className="w-5 h-5" />
                        <Eye className="w-5 h-5" />
                        <Lock className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium tracking-widest text-white/60 uppercase">
                        This section contains curated after-hours experiences. Restricted access for verified members only.
                    </p>
                    <button className="w-full py-5 bg-rose-600 text-white rounded-full font-black uppercase text-xs tracking-[.4em] hover:bg-rose-500 transition-all shadow-[0_20px_40px_rgba(225,29,72,0.2)]">
                        Apply for Access
                    </button>
                </div>

                <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-[0.3em]">Retreat</span>
                </Link>
            </motion.div>
        </main>
    );
}
