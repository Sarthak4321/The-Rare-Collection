"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function FavoritesPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-serif italic text-slate-900">The Wishlist</h1>
                <p className="text-slate-500 mt-2 font-medium">Experiences you've marked as potentially extraordinary.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Fallback Empty State / Sample */}
                <div className="col-span-full py-32 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                    <Heart className="text-rose-200 mb-6 group-hover:scale-125 transition-transform" size={48} fill="currentColor" />
                    <h3 className="text-xl font-serif italic text-slate-900">Your heart belongs elsewhere...</h3>
                    <p className="text-slate-400 text-sm max-w-sm mt-2 mb-8">Save experiences to your wishlist to keep track of where you want to go next.</p>
                    <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                        Start Curating
                    </button>
                </div>
            </div>
        </div>
    );
}
