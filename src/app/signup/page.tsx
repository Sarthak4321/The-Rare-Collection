"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";

export default function SignupPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-rose-500 flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-rose-500/10 blur-[150px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif italic tracking-tighter mb-4">Join The Collection.</h1>
                    <p className="text-white/40 text-sm uppercase tracking-[0.3em]">Start your cinematic journey</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                type="text"
                                placeholder="Elias Thorne"
                                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm focus:border-rose-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm focus:border-rose-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm focus:border-rose-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="w-full py-5 bg-rose-500 text-white rounded-full font-black uppercase text-xs tracking-[.4em] hover:bg-rose-600 transition-all shadow-2xl" type="button">
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center space-y-6">
                    <p className="text-sm text-white/40">
                        Already have an account? <Link href="/login" className="text-white hover:text-rose-500 transition-colors">Sign In</Link>
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs uppercase tracking-[0.3em]">Cancel</span>
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
