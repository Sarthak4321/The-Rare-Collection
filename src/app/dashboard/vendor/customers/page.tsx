"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Search, Filter, MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomersPage() {
    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif italic text-slate-900">Your Collectors</h1>
                    <p className="text-slate-500 mt-2 font-medium">Manage and understand the people who love your experiences.</p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                    <input type="text" placeholder="Search by name, email or preference..." className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-rose-500/10 focus:border-rose-300 transition-all outline-none" />
                </div>
                <button className="h-14 px-6 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <Filter size={18} /> Filters
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Collector</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Spent</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Last Experience</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-center">
                        <tr>
                            <td colSpan={4} className="px-8 py-20">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Users size={24} className="text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-serif italic text-slate-900">Building your list...</h3>
                                    <p className="text-slate-400 text-sm mt-1">A detailed list of your client base will populate as you complete bookings.</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
