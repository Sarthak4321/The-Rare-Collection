"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, User, Bell, Shield, Paintbrush, Globe, Store, Save, Loader2, LogOut, MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Suspense } from "react";

function SettingsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");
    const [vendor, setVendor] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isSaving, setIsSaving] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState('profile');

    // Form States
    const [businessForm, setBusinessForm] = React.useState({
        shop_name: "",
        category: "",
        location: ""
    });
    const [personalForm, setPersonalForm] = React.useState({
        owner_name: "",
        phone: ""
    });

    React.useEffect(() => {
        async function fetchVendor() {
            if (!email) return;
            try {
                const { data, error } = await supabase
                    .from('vendors')
                    .select('*')
                    .eq('email', email)
                    .single();

                if (error) throw error;
                setVendor(data);
                setBusinessForm({
                    shop_name: data.shop_name,
                    category: data.category,
                    location: data.location || "Kolkata"
                });
                setPersonalForm({
                    owner_name: data.owner_name,
                    phone: data.phone || ""
                });
            } catch (err) {
                console.error("Error fetching vendor:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchVendor();
    }, [email]);

    const handleSave = async () => {
        if (!vendor) return;
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('vendors')
                .update({
                    shop_name: businessForm.shop_name,
                    category: businessForm.category,
                    location: businessForm.location,
                    owner_name: personalForm.owner_name,
                    phone: personalForm.phone
                })
                .eq('id', vendor.id);

            if (error) throw error;
            alert("Settings updated successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to update settings");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        router.push('/auth/login');
    };

    const sections = [
        { id: 'profile', label: 'Business Profile', icon: Store, desc: 'Manage your shop name, location and category.' },
        { id: 'account', label: 'Account Details', icon: User, desc: 'Update your login information and personal details.' },
        { id: 'security', label: 'Security & Privacy', icon: Shield, desc: 'Manage passwords and data permissions.' },
    ];

    if (isLoading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="animate-spin text-slate-900" size={32} />
        </div>
    );

    return (
        <div className="space-y-10 max-w-6xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-serif italic text-slate-900">Merchant Controls</h1>
                    <p className="text-slate-500 mt-2 font-medium">Fine-tune your brand presence in the collection.</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all duration-500"
                >
                    <LogOut size={14} /> Log Out
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <aside className="lg:col-span-4 space-y-4">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "w-full text-left p-6 rounded-3xl border transition-all duration-500 group flex items-start gap-4 shadow-sm",
                                activeSection === section.id
                                    ? "bg-white border-slate-900 shadow-xl shadow-slate-200/50"
                                    : "bg-white/50 border-transparent hover:bg-white hover:border-slate-100"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                activeSection === section.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                            )}>
                                <section.icon size={22} />
                            </div>
                            <div>
                                <p className={cn("text-sm font-black uppercase tracking-widest", activeSection === section.id ? "text-slate-900" : "text-slate-500")}>{section.label}</p>
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">{section.desc}</p>
                            </div>
                        </button>
                    ))}

                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4">
                        <div className="flex items-center gap-3">
                            <Shield className="text-emerald-400" size={20} />
                            <p className="text-xs font-black uppercase tracking-widest">Growth Plan Active</p>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Your boutique is currently running on the Curated Partner tier with full access to the vendor catalog.</p>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">View Agreement</button>
                    </div>
                </aside>

                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-12"
                        >
                            {activeSection === 'profile' && (
                                <div className="space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-serif italic text-slate-900">Business Identity.</h3>
                                            <p className="text-slate-400 text-sm mt-1">Update your shop's core details and discoverability.</p>
                                        </div>
                                        <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                            Live on Platform
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Boutique Name</label>
                                            <div className="relative group">
                                                <Store className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                                                <input
                                                    value={businessForm.shop_name}
                                                    onChange={e => setBusinessForm({ ...businessForm, shop_name: e.target.value })}
                                                    className="w-full h-16 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white rounded-[1.25rem] pl-16 pr-8 transition-all outline-none font-bold text-slate-900"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Main Category</label>
                                            <div className="relative group">
                                                <Paintbrush className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                                                <select
                                                    value={businessForm.category}
                                                    onChange={e => setBusinessForm({ ...businessForm, category: e.target.value })}
                                                    className="w-full h-16 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white rounded-[1.25rem] pl-16 pr-8 transition-all outline-none font-bold text-slate-900 appearance-none"
                                                >
                                                    <option value="hospitality">Cafe, Private Theater & Hotel</option>
                                                    <option value="workshops">DIY & Creative Workshops</option>
                                                    <option value="tour">Tours & Experiences</option>
                                                    <option value="decorators">Event Decoration</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Base Location</label>
                                            <div className="relative group">
                                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                                                <select
                                                    value={businessForm.location}
                                                    onChange={e => setBusinessForm({ ...businessForm, location: e.target.value })}
                                                    className="w-full h-16 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white rounded-[1.25rem] pl-16 pr-8 transition-all outline-none font-bold text-slate-900 appearance-none"
                                                >
                                                    <option value="Kolkata">Kolkata</option>
                                                    <option value="Durgapur">Durgapur</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'account' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-serif italic text-slate-900">Owner Details.</h3>
                                        <p className="text-slate-400 text-sm mt-1">Manage your professional contact information.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                                                <input
                                                    value={personalForm.owner_name}
                                                    onChange={e => setPersonalForm({ ...personalForm, owner_name: e.target.value })}
                                                    className="w-full h-16 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white rounded-[1.25rem] pl-16 pr-8 transition-all outline-none font-bold text-slate-900"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Phone Number</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                                                <input
                                                    value={personalForm.phone}
                                                    onChange={e => setPersonalForm({ ...personalForm, phone: e.target.value })}
                                                    className="w-full h-16 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white rounded-[1.25rem] pl-16 pr-8 transition-all outline-none font-bold text-slate-900"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Email (Read Only)</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                                                <input
                                                    readOnly
                                                    value={vendor.email}
                                                    className="w-full h-16 bg-slate-100 border-2 border-transparent rounded-[1.25rem] pl-16 pr-8 transition-all outline-none font-bold text-slate-400 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'security' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-serif italic text-slate-900">Security Access.</h3>
                                        <p className="text-slate-400 text-sm mt-1">Keep your boutique portal secure.</p>
                                    </div>
                                    <div className="p-8 bg-rose-50 rounded-[2rem] border border-rose-100">
                                        <p className="text-sm font-bold text-rose-900 mb-4">Reset Authentication</p>
                                        <p className="text-xs text-rose-700 leading-relaxed mb-6">Changing your credentials will require all active devices to re-authenticate. Ensure you have access to your primary email.</p>
                                        <button className="px-6 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all">Send Reset Link</button>
                                    </div>
                                </div>
                            )}

                            <div className="pt-8 flex justify-end gap-4 border-t border-slate-50">
                                <button className="px-10 h-16 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all duration-300">
                                    Restore Default
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-10 h-16 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-slate-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 flex items-center gap-3 disabled:opacity-70"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    Save Master Changes
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default function VendorSettingsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-slate-900" size={32} />
            </div>
        }>
            <SettingsContent />
        </Suspense>
    );
}
