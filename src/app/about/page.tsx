"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-rose-500 flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl w-full space-y-12 relative z-10 text-center"
            >
                <div className="space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(244,63,94,0.4)]"
                    >
                        <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter">
                        About <span className="text-rose-500">EVNTMET.</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
                        We are architects of intimacy. We don&apos;t just plan events; we design narratives that bridge the gap between a digital match and a real-world connection.
                    </p>
                </div>

                <div className="grid gap-6">
                    <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl text-left hover:border-rose-500/50 transition-colors">
                        <h2 className="text-rose-500 font-bold uppercase tracking-widest text-xs mb-4">Our Mission</h2>
                        <p className="text-white/70 font-light">To eliminate the stress of planning and bring back the thrill of discovery. Every date should feel like a cinematic moment, not a logistical hurdle.</p>
                    </div>
                </div>

                <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group pt-8">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-[0.3em]">Back to Archive</span>
                </Link>
            </motion.div>
        </main>
    );
}
