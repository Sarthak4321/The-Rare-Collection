"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Wallet, Laptop, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserSettingsPage() {
    const preferences = [
        { label: "Public Profile", icon: User, status: "Visible" },
        { label: "Notifications", icon: Bell, status: "Enabled" },
        { label: "Data Protection", icon: Shield, status: "Encrypted" },
        { label: "Premium Access", icon: Wallet, status: "Trial" },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-serif italic text-slate-900">Personal Preferences</h1>
                <p className="text-slate-500 mt-2 font-medium">Fine-tune your identity within the collective.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <main className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-rose-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-rose-200 border-4 border-white">
                                ??
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif italic text-slate-900">Guest Collector</h3>
                                <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-black text-[10px]">Level I Connoisseur</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Display Name</label>
                                <input type="text" placeholder="Update your name..." className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm outline-none focus:bg-white transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Mood Preference</label>
                                <select className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm outline-none focus:bg-white transition-all appearance-none">
                                    <option>Aesthetic Noir</option>
                                    <option>Vibrant Pastel</option>
                                    <option>Minimal Brutalist</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] uppercase font-black tracking-widest shadow-2xl transition-all hover:bg-rose-600">
                                Update Master Identity
                            </button>
                        </div>
                    </div>
                </main>

                <aside className="lg:col-span-4 space-y-6">
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Snapshot</h4>
                        <div className="space-y-4">
                            {preferences.map(pref => (
                                <div key={pref.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <pref.icon size={16} className="text-slate-400" />
                                        <span className="text-xs font-bold text-slate-600">{pref.label}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-rose-500 uppercase">{pref.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
