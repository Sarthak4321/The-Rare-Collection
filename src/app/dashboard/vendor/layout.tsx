"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Store,
    BarChart3,
    Users,
    MessageSquare,
    Settings,
    Bell,
    Search,
    LogOut,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const vendorRoutes = [
    {
        label: "Vendor View",
        routes: [
            { label: "Partner Portal", icon: Store, href: "/dashboard/vendor" },
            { label: "Analytics", icon: BarChart3, href: "/dashboard/vendor/analytics" },
            { label: "Customers", icon: Users, href: "/dashboard/vendor/customers" },
            { label: "Reviews", icon: MessageSquare, href: "/dashboard/vendor/reviews" },
        ]
    },
    {
        label: "Settings",
        routes: [
            { label: "Property Settings", icon: Settings, href: "/dashboard/vendor/settings" },
        ]
    }
];

import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function VendorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [vendor, setVendor] = React.useState<any>(null);

    React.useEffect(() => {
        async function fetchVendor() {
            if (!email) return;
            const { data } = await supabase
                .from('vendors')
                .select('shop_name')
                .eq('email', email)
                .single();
            if (data) setVendor(data);
        }
        fetchVendor();
    }, [email]);

    const getLinkWithEmail = (href: string) => {
        return email ? `${href}?email=${email}` : href;
    };

    const initials = vendor?.shop_name
        ? vendor.shop_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : "??";

    return (
        <div className="flex min-h-screen bg-[#fafafa] selection:bg-rose-100 selection:text-rose-900">
            {/* VENDOR SIDEBAR */}
            <aside className="w-72 bg-slate-900 flex flex-col sticky top-0 h-screen z-50">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center shadow-lg shadow-rose-900/20 group-hover:scale-110 transition-transform">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <span className="font-serif italic text-xl font-bold tracking-tight text-white">The Rare Partners.</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-8 overflow-y-auto pb-8">
                    {vendorRoutes.map((section) => (
                        <div key={section.label} className="space-y-2">
                            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                                {section.label}
                            </h3>
                            <div className="space-y-1">
                                {section.routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={getLinkWithEmail(route.href)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                            pathname === route.href
                                                ? "bg-rose-500/10 text-rose-400"
                                                : "text-white/50 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <route.icon
                                            size={18}
                                            className={cn(
                                                "transition-colors",
                                                pathname === route.href ? "text-rose-400" : "text-white/30 group-hover:text-white"
                                            )}
                                        />
                                        {route.label}
                                        {pathname === route.href && (
                                            <motion.div
                                                layoutId="active-nav-vendor"
                                                className="ml-auto w-1 h-4 bg-rose-400 rounded-full"
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <Link href="/auth/login" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-white/40 hover:bg-white/5 hover:text-white transition-all">
                        <LogOut size={18} />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search analytics, bookings..."
                                className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900">{vendor?.shop_name || "Merchant Portal"}</p>
                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Merchant Portal</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                                {initials}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
