"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-rose-500 py-24 px-6 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full relative z-10"
            >
                <div className="text-center mb-16 space-y-6">
                    <h1 className="text-5xl md:text-8xl font-serif italic tracking-tighter">Initiate <br /> <span className="text-rose-500">Dialogue.</span></h1>
                    <p className="text-white/40 text-lg uppercase tracking-[0.3em] font-light italic">Let&apos;s build your narrative.</p>
                </div>

                <div className="grid gap-12">
                    <div className="space-y-8 p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-rose-500 font-black">Direct Line</label>
                            <p className="text-2xl md:text-3xl font-serif italic">studio@the-rare-collection.com</p>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-rose-500 font-black">Headquarters</label>
                            <p className="text-white/70 font-light">Available globally. Operating from Mumbai &amp; London.</p>
                        </div>
                        <button className="w-full py-5 bg-white text-black rounded-full font-black uppercase text-xs tracking-[.4em] hover:bg-rose-500 hover:text-white transition-all">
                            Send Transmission
                        </button>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs uppercase tracking-[0.3em]">Back</span>
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
