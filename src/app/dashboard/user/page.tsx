"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    Star,
    ArrowUpRight,
    Clock,
    Sparkles,
    Heart,
    ChevronRight,
    UserCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";



export default function UserDashboard() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [user, setUser] = React.useState<any>(null);
    const [bookings, setBookings] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            if (!email) {
                setIsLoading(false);
                return;
            }
            try {
                // 1. Fetch User
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', email)
                    .single();

                if (userData) setUser(userData);

                // 2. Fetch Bookings
                const { data: bookingsData, error: bookingsError } = await supabase
                    .from('bookings')
                    .select('*, services(*), vendors(*)')
                    .eq('customer_email', email)
                    .order('booking_date', { ascending: true });

                if (bookingsData) setBookings(bookingsData);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [email]);

    if (isLoading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
    );

    const displayName = user?.full_name?.split(' ')[0] || "Guest";

    // Dynamic Stats Calculation
    const exploredCities = Array.from(new Set(bookings.map(b => b.vendors?.location))).filter(Boolean);
    const nextBooking = bookings.find(b => new Date(b.booking_date) >= new Date());

    const dashboardStats = [
        { label: "Planned Escapes", value: bookings.length.toString().padStart(2, '0'), icon: Sparkles, color: "text-rose-500", bg: "bg-rose-50" },
        { label: "Saved Venues", value: "04", icon: Heart, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Member Status", value: "VIP", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Cities Explored", value: exploredCities.length.toString().padStart(2, '0'), icon: MapPin, color: "text-emerald-500", bg: "bg-emerald-50" },
    ];

    return (
        <div className="space-y-10">
            {/* WELCOME SECTION */}
            <div className="flex flex-col gap-6 pt-4">
                <div className="space-y-1">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl md:text-5xl font-serif italic text-slate-900 tracking-tight leading-none"
                    >
                        Bonjour, <span className="text-rose-500">{displayName}</span>.
                    </motion.h1>
                    {nextBooking ? (
                        <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-md">
                            Your next escape to <span className="text-slate-900 font-bold underline underline-offset-4 decoration-rose-500/30">{nextBooking.services?.name}</span> is on {new Date(nextBooking.booking_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.
                        </p>
                    ) : (
                        <p className="text-sm md:text-base text-slate-500 font-medium">
                            No upcoming escapes. <Link href="/plan" className="text-rose-500 font-bold hover:underline underline-offset-4 transition-all">Architect your first plot</Link>.
                        </p>
                    )}
                </div>
                <Link
                    href="/plan"
                    className="w-full sm:w-fit px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-rose-500 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
                >
                    Plan New Experience
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            {/* STATS GRID - 2x2 on Mobile */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {dashboardStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 md:p-6 bg-white/60 backdrop-blur-sm rounded-[2rem] border border-slate-100/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-default"
                    >
                        <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 group-hover:rotate-3", stat.bg, stat.color)}>
                            <stat.icon size={20} className="md:w-6 md:h-6" />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* UPCOMING ESCAPES */}
                <div className="lg:col-span-12 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-serif italic font-bold">Upcoming Escapes</h2>
                        <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors">View Itinerary Folder</button>
                    </div>

                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:border-rose-100 transition-all">
                                <div className="w-full sm:w-48 h-40 sm:h-32 relative rounded-2xl overflow-hidden shadow-md">
                                    <Image src={booking.services?.image_url || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80"} alt={booking.services?.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                <div className="flex-1 space-y-3 py-2 text-left w-full">
                                    <div className="flex items-center justify-between sm:justify-start gap-4 mb-1">
                                        <span className={cn(
                                            "px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest inline-block shadow-sm",
                                            booking.status === "confirmed" ? "bg-emerald-500 text-white" : "bg-amber-50 text-amber-600"
                                        )}>
                                            {booking.status}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                                            <Clock size={12} className="text-rose-500" /> {booking.booking_time}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black tracking-tight text-slate-900 group-hover:text-rose-500 transition-colors uppercase text-[15px]">{booking.services?.name}</h3>
                                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-medium italic">
                                            <MapPin size={12} className="text-rose-500" /> {booking.vendors?.shop_name}, {booking.vendors?.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="px-6 py-2 border-l border-slate-100 hidden lg:block">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Exp. Date</span>
                                        <span className="text-sm font-black text-slate-900">{new Date(booking.booking_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                                    <div className="flex-1 sm:hidden">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Reservation Date</span>
                                        <span className="text-xs font-bold text-slate-900">{new Date(booking.booking_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <button className="p-4 rounded-full bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {bookings.length === 0 && (
                            <div className="py-24 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10">
                                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="text-rose-500" size={32} />
                                </div>
                                <h3 className="text-2xl font-serif italic text-slate-900">Your Story Awaits</h3>
                                <p className="text-sm text-slate-400 mt-3 max-w-xs mx-auto leading-relaxed">
                                    No experiences archived yet. Every great narrative begins with a single selection.
                                </p>
                                <Link href="/plan" className="inline-block mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all">
                                    Begin Journey
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
