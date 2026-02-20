"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles, User, Phone, ChevronDown, Store, UserCircle, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "../../../components/Logo";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [shopName, setShopName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"user" | "vendor">("user");
    const [vendorCategory, setVendorCategory] = useState<string>("");
    const [location, setLocation] = useState<"kolkata" | "durgapur">("kolkata");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Actual Supabase Integration
            const { error } = await supabase
                .from(role === 'vendor' ? 'vendors' : 'users')
                .insert([
                    role === 'vendor' ? {
                        shop_name: shopName,
                        owner_name: name,
                        email,
                        phone,
                        category: vendorCategory,
                        location,
                        password, // Adding password for completeness, though auth should handle this normally
                    } : {
                        full_name: name,
                        email,
                        phone,
                        gender,
                        password,
                    }
                ]);

            if (error) throw error;

            if (role === "vendor") {
                router.push(`/dashboard/vendor?email=${email}`);
            } else {
                router.push(`/dashboard/user?email=${email}`);
            }
        } catch (err: any) {
            console.error("Signup error:", err);
            alert(`Signup failed: ${err.message || "Please check your Supabase connection and schema."}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#FAFAFA]">
            {/* Left Column - Brand & Visual */}
            <div className="hidden lg:flex w-1/2 relative bg-[#0A0A0A] overflow-hidden flex-col justify-between p-12 text-white">
                {/* Abstract Background patterns */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-500/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
                </div>

                <div className="relative z-10">
                    <Logo className="w-40 h-auto invert brightness-200" />
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-6 px-3 py-1 w-fit rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                            <Sparkles className="w-3 h-3 text-rose-300" />
                            <span className="text-xs font-medium text-rose-100 uppercase tracking-wider">The Rare Collection</span>
                        </div>
                        <h2 className="text-5xl font-serif font-light leading-tight mb-6">
                            Join the community of digital connoisseurs.
                        </h2>
                        <p className="text-lg text-white/60 font-medium leading-relaxed">
                            "Signing up was the best decision for my portfolio. The access to exclusive drops and the community support is unparalleled."
                        </p>


                    </motion.div>
                </div>

                <div className="relative z-10 text-xs text-white/30 flex justify-between">
                    <p>© 2026 The Rare Collection</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white relative">
                {/* Mobile pattern */}
                <div className="absolute inset-0 lg:hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[50%] h-[40%] bg-slate-50 blur-[80px] rounded-full opacity-50" />
                </div>

                <div className="w-full max-w-[440px] relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex lg:hidden mb-8 justify-center">
                            <Logo className="w-40" />
                        </div>

                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 pb-2">Create an account</h1>
                            <p className="text-slate-500 mt-2 text-sm">Join The Rare Collection ecosystem today.</p>
                        </div>

                        {/* Social Login */}
                        <button className="w-full h-[52px] flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all focus:ring-4 focus:ring-slate-100 outline-none">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="font-sans">Sign up with Google</span>
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-slate-400 font-medium tracking-wider">Or register with</span>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={cn(
                                    "flex-1 py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                                    role === "user" ? "border-rose-500 bg-rose-50 text-rose-600" : "border-slate-100 bg-slate-50 text-slate-400 grayscale hover:grayscale-0"
                                )}
                            >
                                <UserCircle size={24} />
                                <span className="text-xs font-black uppercase tracking-widest">User</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("vendor")}
                                className={cn(
                                    "flex-1 py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                                    role === "vendor" ? "border-rose-500 bg-rose-50 text-rose-600" : "border-slate-100 bg-slate-50 text-slate-400 grayscale hover:grayscale-0"
                                )}
                            >
                                <Store size={24} />
                                <span className="text-xs font-black uppercase tracking-widest">Vendor</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {role === "vendor" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="space-y-2 pb-4"
                                >
                                    <label className="text-sm font-semibold text-slate-700" htmlFor="vendorCategory">Vendor Category</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors pointer-events-none">
                                            <Sparkles size={18} />
                                        </div>
                                        <select
                                            id="vendorCategory"
                                            value={vendorCategory}
                                            onChange={(e) => setVendorCategory(e.target.value)}
                                            required
                                            className="w-full h-[52px] pl-11 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium appearance-none"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="hospitality">Cafe, Private Theater & Hotel Owner</option>
                                            <option value="workshops">DIY Candle Workshop, Pottery Workshop & Painting Cafe</option>
                                            <option value="tour">Tour Companies</option>
                                            <option value="decorators">Decorators</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {role === "vendor" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700" htmlFor="shopName">Business / Shop Name</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors">
                                            <Store size={18} />
                                        </div>
                                        <input
                                            id="shopName"
                                            type="text"
                                            value={shopName}
                                            onChange={(e) => setShopName(e.target.value)}
                                            required
                                            className="w-full h-[52px] pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                            placeholder="The Blue Tokai Portal"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                                    {role === "user" ? "Full Name" : "Owner Name"}
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors">
                                        <UserCircle size={18} />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full h-[52px] pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                        placeholder={role === "user" ? "Arp Sharma" : "John Doe"}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="email">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full h-[52px] pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="phone">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="w-full h-[52px] pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                        placeholder="+91 91100..."
                                    />
                                </div>
                            </div>

                            {role === "user" ? (
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700" htmlFor="gender">Gender</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors pointer-events-none">
                                            <User size={18} />
                                        </div>
                                        <select
                                            id="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                            className="w-full h-[52px] pl-11 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium appearance-none"
                                        >
                                            <option value="" disabled>Select your gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="not_preferred">Not preferred</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700" htmlFor="location">Location</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors pointer-events-none">
                                            <MapPin size={18} />
                                        </div>
                                        <select
                                            id="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value as any)}
                                            required
                                            className="w-full h-[52px] pl-11 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium appearance-none"
                                        >
                                            <option value="kolkata">Kolkata</option>
                                            <option value="durgapur">Durgapur</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full h-[52px] pl-11 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-[52px] bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 mt-2"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-slate-500">Already have an account? </span>
                            <Link href="/auth/login" className="font-bold text-slate-900 hover:text-rose-600 transition-colors underline decoration-slate-200 underline-offset-4 hover:decoration-rose-600">
                                Log in
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
