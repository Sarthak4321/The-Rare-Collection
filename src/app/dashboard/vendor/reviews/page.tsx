"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReviewsPage() {
    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif italic text-slate-900">Guest Reviews</h1>
                    <p className="text-slate-500 mt-2 font-medium">Your reputation is your most valuable asset.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shop Rating</p>
                        <p className="text-2xl font-black text-slate-900">?? / 5.0</p>
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" className="opacity-20" />)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Positive Sentiment", value: "0%", icon: ThumbsUp, color: "text-emerald-500" },
                    { label: "Response Rate", value: "0%", icon: MessageSquare, color: "text-blue-500" },
                    { label: "Average Rating", value: "0.0", icon: Star, color: "text-amber-500" },
                ].map((stat, i) => (
                    <div key={stat.label} className="p-6 bg-white rounded-3xl border border-slate-100 flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50", stat.color)}>
                            <stat.icon size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                            <p className="text-xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Quote size={28} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-serif italic text-slate-900">Silence is Golden (for now)</h3>
                <p className="text-slate-400 text-sm max-w-sm mt-2">Verified guest reviews will appear here once your first customers share their experiences.</p>
            </div>
        </div>
    );
}
