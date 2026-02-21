"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    Heart,
    Settings,
    Bell,
    Search,
    LogOut,
    Sparkles,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const userRoutes = [
    {
        label: "User View",
        routes: [
            { label: "Overview", icon: LayoutDashboard, href: "/dashboard/user" },
            { label: "My Bookings", icon: Calendar, href: "/dashboard/user/bookings" },
            { label: "Favorites", icon: Heart, href: "/dashboard/user/favorites" },
        ]
    },
    {
        label: "Settings",
        routes: [
            { label: "Account", icon: Settings, href: "/dashboard/user/settings" },
        ]
    }
];

import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Suspense } from "react";

function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [user, setUser] = React.useState<any>(null);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    React.useEffect(() => {
        async function fetchUser() {
            if (!email) return;
            const { data } = await supabase
                .from('users')
                .select('full_name')
                .eq('email', email)
                .single();
            if (data) setUser(data);
        }
        fetchUser();
    }, [email]);

    const getLinkWithEmail = (href: string) => {
        return email ? `${href}?email=${email}` : href;
    };

    const initials = user?.full_name
        ? user.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : "??";

    return (
        <div className="flex min-h-screen bg-[#fafafa] selection:bg-rose-100 selection:text-rose-900">
            {/* USER SIDEBAR */}
            <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen z-50">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center shadow-lg shadow-rose-200 group-hover:scale-110 transition-transform">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <span className="font-serif italic text-xl font-bold tracking-tight">The Rare.</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-8 overflow-y-auto pb-8">
                    {userRoutes.map((section) => (
                        <div key={section.label} className="space-y-2">
                            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
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
                                                ? "bg-rose-50 text-rose-600"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <route.icon
                                            size={18}
                                            className={cn(
                                                "transition-colors",
                                                pathname === route.href ? "text-rose-600" : "text-slate-400 group-hover:text-slate-900"
                                            )}
                                        />
                                        {route.label}
                                        {pathname === route.href && (
                                            <motion.div
                                                layoutId="active-nav"
                                                className="ml-auto w-1 h-4 bg-rose-500 rounded-full"
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-100">
                    <Link href="/auth/login" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
                        <LogOut size={18} />
                        Logout
                    </Link>
                </div>
            </aside>


            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center shadow-lg shadow-rose-200 group-hover:scale-110 transition-transform">
                                <Sparkles size={16} className="text-white" />
                            </div>
                            <span className="font-serif italic text-lg font-bold tracking-tight hidden sm:block lg:hidden xl:block">The Rare.</span>
                        </Link>
                    </div>

                    <div className="flex-1 max-w-xl hidden md:block">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search your escapes..."
                                className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 relative">
                        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block" />

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 pl-2 group outline-none"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-rose-500 transition-colors">{user?.full_name || "Guest"}</p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">VIP Collector</p>
                                </div>
                                <div className={cn(
                                    "w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg shadow-rose-200 border-2 border-white flex items-center justify-center text-white font-bold text-sm transition-transform",
                                    isProfileOpen ? "scale-90" : "group-hover:scale-110"
                                )}>
                                    {initials}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setIsProfileOpen(false)}
                                            className="fixed inset-0 z-10"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-20 origin-top-right"
                                        >
                                            <div className="p-6 border-b border-slate-50 bg-slate-50/50 sm:hidden lowercase">
                                                <p className="text-sm font-black text-slate-900">Bonjour, {user?.full_name?.split(' ')[0] || "Guest"}</p>
                                                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">VIP Collector</p>
                                            </div>

                                            <div className="p-3">
                                                {userRoutes.flatMap(s => s.routes).map((route) => (
                                                    <Link
                                                        key={route.href}
                                                        href={getLinkWithEmail(route.href)}
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className={cn(
                                                            "flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all",
                                                            pathname === route.href
                                                                ? "bg-rose-50 text-rose-600"
                                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                                        )}
                                                    >
                                                        <route.icon size={18} />
                                                        {route.label}
                                                    </Link>
                                                ))}
                                            </div>

                                            <div className="p-3 bg-slate-50/50">
                                                <Link
                                                    href="/auth/login"
                                                    className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-[13px] font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all"
                                                >
                                                    <LogOut size={18} />
                                                    Logout
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
            </div>
        }>
            <LayoutContent>{children}</LayoutContent>
        </Suspense>
    );
}
