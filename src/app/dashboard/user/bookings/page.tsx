"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Search, ChevronRight, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserBookingsPage() {
    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif italic text-slate-900">Your Escape History</h1>
                    <p className="text-slate-500 mt-2 font-medium">Every moment you've curated, archived forever.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all">All Bookings</button>
                    <button className="px-6 py-2 bg-white border border-slate-200 text-slate-400 rounded-xl text-xs font-bold transition-all hover:bg-slate-50">Upcoming</button>
                </div>
            </div>

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                <input type="text" placeholder="Search by venue or date..." className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-rose-500/10 transition-all outline-none" />
            </div>

            <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                    <Ticket size={32} className="text-rose-400" />
                </div>
                <h3 className="text-xl font-serif italic text-slate-900">The first page of your journal...</h3>
                <p className="text-slate-400 text-sm max-w-sm mt-2 mb-8">You haven't booked any experiences yet. Start your journey by exploring our verified collection.</p>
                <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-slate-200">
                    Discover Experiences
                </button>
            </div>
        </div>
    );
}
