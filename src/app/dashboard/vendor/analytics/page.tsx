"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, CreditCard, ArrowUpRight, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif italic text-slate-900">Performance Analytics</h1>
                    <p className="text-slate-500 mt-2 font-medium">Deep insights into your business growth and reach.</p>
                </div>
                <div className="flex gap-3">
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-rose-500/20 outline-none">
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>This Year</option>
                    </select>
                    <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                        Export Report <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-50" },
                    { label: "Avg. Experience Price", value: "₹4,200", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Repeat Customers", value: "18%", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "Top Performer", value: "Theater", icon: ShoppingBag, color: "text-amber-500", bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm"
                    >
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <BarChart2 size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-serif italic text-slate-900">Analytics Engine Warming Up</h3>
                <p className="text-slate-400 text-sm max-w-sm mt-2 mb-8">Detailed visual charts and revenue heatmaps will appear once your business crosses the initial booking threshold.</p>
                <button className="px-8 py-3 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                    View Benchmark Data
                </button>
            </div>
        </div>
    );
}
