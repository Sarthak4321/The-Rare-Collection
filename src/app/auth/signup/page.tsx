"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, ShieldCheck, Phone, Users, ChevronDown } from "lucide-react";
import Logo from "../../../components/Logo";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC] p-6 selection:bg-rose-100 selection:text-rose-900">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-100/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-rose-100/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 w-full max-w-[440px]"
            >
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="inline-block mb-6"
                        >
                            <Logo className="w-48 h-12" />
                        </motion.div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">Create an account</h1>
                        <p className="text-slate-500 font-medium text-sm mt-2">Join The Rare Collection ecosystem.</p>
                    </div>

                    {/* Google Auth - Premium Look */}
                    <button className="w-full flex items-center justify-center gap-3 py-4 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-[15px] group bg-white shadow-sm hover:shadow-md mb-8">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                        </svg>
                        Sign up with Google
                    </button>

                    {/* Divider */}
                    <div className="relative mb-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <span className="relative bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Register with Email</span>
                    </div>

                    {/* Form - Compact & Pro */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 ml-1">Full Name</label>
                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 h-[52px] group focus-within:bg-white focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/5 transition-all outline-none">
                                <User className="text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="Arp Sharma"
                                    className="w-full bg-transparent focus:outline-none text-slate-900 font-medium text-[14px] border-none ring-0 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 ml-1">Email Address</label>
                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 h-[52px] group focus-within:bg-white focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/5 transition-all outline-none">
                                <Mail className="text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="arp@example.com"
                                    className="w-full bg-transparent focus:outline-none text-slate-900 font-medium text-[14px] border-none ring-0 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 ml-1">Phone Number</label>
                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 h-[52px] group focus-within:bg-white focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/5 transition-all outline-none">
                                <Phone className="text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                                <input
                                    type="tel"
                                    required
                                    placeholder="+91 91100..."
                                    className="w-full bg-transparent focus:outline-none text-slate-900 font-medium text-[14px] border-none ring-0 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 ml-1">Password</label>
                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 h-[52px] group focus-within:bg-white focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/5 transition-all outline-none relative">
                                <Lock className="text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-transparent focus:outline-none text-slate-900 font-medium text-[14px] border-none ring-0 placeholder:text-slate-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-slate-400 hover:text-slate-600 transition-colors shrink-0 outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-4 rounded-xl transition-all shadow-xl shadow-rose-100 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 text-base mt-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-10 text-[14px] font-bold text-slate-400">
                        Already have an account? <Link href="/auth/login" className="text-rose-600 hover:text-rose-700 transition-colors">Log in</Link>
                    </p>
                </div>

                {/* Footer Copy */}
                <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">
                    The Rare Collection &copy; 2026
                </p>
            </motion.div>
        </div>
    );
}
