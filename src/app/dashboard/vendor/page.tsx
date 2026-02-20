"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import {
    Users,
    CreditCard,
    ShoppingBag,
    TrendingUp,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    MessageSquare,
    ArrowUpRight,
    Utensils,
    Palmtree,
    Plus,
    Settings,
    Paintbrush,
    Sparkles,
    Loader2,
    Trash2,
    MapPin,
    Pizza,
    Tag,
    Camera
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

function DashboardContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [vendor, setVendor] = React.useState<any>(null);
    const [services, setServices] = React.useState<any[]>([]);
    const [bookings, setBookings] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAddingService, setIsAddingService] = React.useState(false);

    // New service form state
    const [newService, setNewService] = React.useState({
        name: "",
        subCategory: "",
        description: "",
        images: [] as string[],
        address: "",
        price: "",
        duration: "",
        menuHighlights: "",
        menuImageUrl: ""
    });
    const [uploading, setUploading] = React.useState(false);

    const config = {
        hospitality: {
            icon: Utensils,
            color: "text-rose-500",
            accent: "bg-rose-500",
            subCategories: ["Cafe", "Private Theater", "Hotel"]
        },
        workshops: {
            icon: Sparkles,
            color: "text-amber-600",
            accent: "bg-amber-600",
            subCategories: ["DIY Candle Workshop", "Pottery Workshop", "Painting Cafe"]
        },
        tour: {
            icon: Palmtree,
            color: "text-emerald-500",
            accent: "bg-emerald-500",
            subCategories: ["City Tour", "Heritage Walk", "Adventure Trip"]
        },
        decorators: {
            icon: Paintbrush,
            color: "text-blue-600",
            accent: "bg-blue-600",
            subCategories: ["Birthday Decor", "Anniversary Decor", "Proposal Setup"]
        }
    };

    React.useEffect(() => {
        async function fetchData() {
            if (!email) {
                setIsLoading(false);
                return;
            }

            try {
                // 1. Fetch Vendor
                const { data: vendorData, error: vError } = await supabase
                    .from('vendors')
                    .select('*')
                    .eq('email', email)
                    .single();

                if (vError) {
                    if (vError.code === 'PGRST116') {
                        setVendor(null);
                        setIsLoading(false);
                        return;
                    }
                    throw vError;
                }
                setVendor(vendorData);

                // Initialize subCategory
                const vCat = vendorData.category as keyof typeof config;
                if (config[vCat]?.subCategories) {
                    setNewService(prev => ({ ...prev, subCategory: config[vCat].subCategories[0] }));
                }

                // 2. Fetch Services
                const { data: servicesData, error: sError } = await supabase
                    .from('services')
                    .select('*')
                    .eq('vendor_id', vendorData.id);

                if (sError) throw sError;
                setServices(servicesData || []);

                // 3. Fetch Bookings (with service names)
                const { data: bookingsData, error: bError } = await supabase
                    .from('bookings')
                    .select('*, services(name, image_url)')
                    .eq('vendor_id', vendorData.id)
                    .order('created_at', { ascending: false });

                if (bError) throw bError;
                setBookings(bookingsData || []);

            } catch (err: any) {
                console.error("Fetch error detailed:", {
                    message: err.message,
                    details: err.details,
                    hint: err.hint,
                    code: err.code
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [email]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (newService.images.length >= 5) {
            alert("Maximum 5 photos allowed");
            return;
        }

        setUploading(true);
        // Simulating upload for each file
        const newUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
            if (newService.images.length + newUrls.length >= 5) break;
            const file = files[i];
            const mockUrl = URL.createObjectURL(file);
            newUrls.push(mockUrl);
        }

        setTimeout(() => {
            setNewService(prev => ({
                ...prev,
                images: [...prev.images, ...newUrls].slice(0, 5)
            }));
            setUploading(false);
        }, 1000);
    };

    const removeImage = (index: number) => {
        setNewService(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleMenuUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setTimeout(() => {
            const mockUrl = URL.createObjectURL(file);
            setNewService(prev => ({ ...prev, menuImageUrl: mockUrl }));
            setUploading(false);
        }, 1200);
    };

    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!vendor) return;

        try {
            const finalName = newService.name || newService.subCategory;
            const { data, error } = await supabase
                .from('services')
                .insert([{
                    vendor_id: vendor.id,
                    name: finalName,
                    description: newService.description,
                    image_url: newService.images[0] || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80",
                    images: newService.images,
                    address: newService.address,
                    price: parseFloat(newService.price) || 0,
                    duration: newService.duration,
                    menu_highlights: newService.menuHighlights,
                    menu_image_url: newService.menuImageUrl,
                    icon: 'Sparkles'
                }])
                .select();

            if (error) throw error;
            setServices([...services, data[0]]);
            setIsAddingService(false);
            setNewService({
                name: "",
                subCategory: "",
                description: "",
                images: [],
                address: "",
                price: "",
                duration: "",
                menuHighlights: "",
                menuImageUrl: ""
            });
        } catch (err) {
            console.error(err);
            alert("Failed to add service");
        }
    };

    const handleDeleteService = async (id: string) => {
        if (!confirm("Are you sure you want to delete this experience from your catalog? This action cannot be undone.")) return;

        try {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setServices(services.filter(s => s.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete service. Please try again.");
        }
    };

    const handleUpdateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id);

            if (error) throw error;

            setBookings(prev => prev.map(b =>
                b.id === id ? { ...b, status } : b
            ));
        } catch (err) {
            console.error(err);
            alert(`Failed to ${status === 'confirmed' ? 'approve' : 'reject'} booking`);
        }
    };

    if (isLoading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
                <p className="text-slate-400 font-serif italic">Curating your experience...</p>
            </div>
        </div>
    );

    if (!vendor) return (
        <div className="min-h-[60vh] flex items-center justify-center text-center">
            <div>
                <h2 className="text-2xl font-serif italic text-slate-900 mb-2">Vendor not found</h2>
                <p className="text-slate-500">We couldn't find a vendor associated with {email}.</p>
            </div>
        </div>
    );

    const categoryKey = (vendor.category || "hospitality") as keyof typeof config;
    const theme = config[categoryKey] || config.hospitality;

    // Dynamic Stats
    const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.revenue) || 0), 0);
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const servicesCount = services.length;

    const stats = [
        { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: CreditCard, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Pending Requests", value: pendingBookings.toString(), icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Services", value: servicesCount.toString(), icon: Sparkles, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Total Reach", value: ((servicesCount * 142) + (bookings.length * 12)).toLocaleString(), icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200", theme.accent)}>
                        <theme.icon size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif italic text-slate-900">{vendor.shop_name}</h1>
                        <p className="text-slate-500 font-medium flex items-center gap-2">
                            {vendor.location} • <span className={cn("font-bold uppercase tracking-widest text-[10px]", theme.color)}>Verified Partner</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/dashboard/vendor/settings?email=${email}`}
                        className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                    >
                        <Settings size={16} /> Business Settings
                    </Link>
                    <Link
                        href="/"
                        className={cn("px-6 py-3 text-white rounded-xl font-bold text-sm transition-all shadow-lg", theme.accent)}
                    >
                        View Public Page
                    </Link>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* SERVICE CATALOG */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-serif italic font-bold">Service Catalog</h2>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">{vendor.category} specialized</span>
                    </div>
                    <button onClick={() => setIsAddingService(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
                        <Plus size={14} /> Add New Service
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <motion.div key={service.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                            className="group relative h-[320px] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700"
                        >
                            <Image src={service.image_url} alt={service.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                            {/* Badges & Actions */}
                            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                <div className="flex gap-2">
                                    {service.address && (
                                        <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5">
                                            <MapPin size={10} className="text-white" />
                                            <span className="text-[9px] font-black text-white uppercase tracking-widest truncate max-w-[100px]">{service.address}</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteService(service.id);
                                    }}
                                    className="w-10 h-10 bg-rose-500/10 hover:bg-rose-500 backdrop-blur-md rounded-full border border-rose-500/20 flex items-center justify-center text-rose-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="flex justify-between items-end gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-2xl font-serif italic text-white mb-1 truncate">{service.name}</h3>
                                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.1em] line-clamp-1">{service.description}</p>
                                    </div>
                                    <div className="text-right pb-1">
                                        <p className="text-white font-black text-xl tracking-tighter">₹{Number(service.price || 0).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {services.length === 0 && !isLoading && (
                        <div className="col-span-full py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                            <ShoppingBag className="text-slate-300 mb-4" size={48} />
                            <h3 className="text-lg font-serif italic text-slate-900">No services yet.</h3>
                            <p className="text-slate-400 text-sm max-w-xs mt-2 mb-6">Start building your digital catalog to accept bookings from clients.</p>
                            <button onClick={() => setIsAddingService(true)} className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
                                Create your first service
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ADD SERVICE MODAL */}
            {isAddingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.15)] border border-slate-100 space-y-10 max-h-[92vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center bg-slate-50 -mx-12 -mt-12 p-12 rounded-t-[3rem] border-b border-slate-100">
                            <div>
                                <h2 className="text-4xl font-serif italic text-slate-900 tracking-tight">Add Expression.</h2>
                                <p className="text-slate-500 text-sm mt-1 font-medium">Define a new chapter in your boutique's catalog.</p>
                            </div>
                            <button onClick={() => setIsAddingService(false)} className="w-12 h-12 flex items-center justify-center bg-white hover:bg-slate-900 hover:text-white rounded-full shadow-sm hover:shadow-xl transition-all duration-500 transform hover:rotate-90">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 ml-1">Service Type</label>
                                <div className="relative group">
                                    <select
                                        value={newService.subCategory}
                                        onChange={e => setNewService({ ...newService, subCategory: e.target.value })}
                                        className="w-full h-16 bg-white border-2 border-slate-100 rounded-[1.25rem] px-8 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 appearance-none shadow-sm group-hover:border-slate-200"
                                    >
                                        {theme.subCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-900 transition-colors">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 ml-1 flex items-center gap-2">
                                    <Tag size={12} className="text-rose-500" /> Booking Price (₹)
                                </label>
                                <div className="relative group">
                                    <input
                                        required
                                        type="number"
                                        value={newService.price}
                                        onChange={e => setNewService({ ...newService, price: e.target.value })}
                                        className="w-full h-16 bg-white border-2 border-slate-100 rounded-[1.25rem] px-8 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 shadow-sm group-hover:border-slate-200"
                                        placeholder="199"
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-xs text-slate-300">INR</div>
                                </div>
                            </div>

                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 ml-1">Boutique Name / Special Display Name</label>
                                <input value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })}
                                    className="w-full h-16 bg-white border-2 border-slate-100 rounded-[1.25rem] px-8 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 shadow-sm"
                                    placeholder="e.g. The Enchanted Rooftop Garden" />
                            </div>

                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 ml-1">Aesthetic Narrative (Description)</label>
                                <textarea required value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })}
                                    className="w-full h-40 bg-white border-2 border-slate-100 rounded-[1.25rem] p-8 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 shadow-sm resize-none text-sm leading-relaxed"
                                    placeholder="Tell the story behind this experience. What makes the vibe unique? What's the mood?" />
                            </div>

                            {(vendor.category === 'hospitality' || vendor.category === 'workshops' || vendor.category === 'tour') && (
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 ml-1 flex items-center gap-2">
                                        <MapPin size={12} className="text-emerald-500" /> Venue Location
                                    </label>
                                    <input
                                        required
                                        value={newService.address}
                                        onChange={e => setNewService({ ...newService, address: e.target.value })}
                                        className="w-full h-16 bg-white border-2 border-slate-100 rounded-[1.25rem] px-8 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 shadow-sm"
                                        placeholder="Full address of your boutique location..."
                                    />
                                </div>
                            )}

                            {newService.subCategory.toLowerCase().includes('cafe') && (
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                            <Pizza size={12} className="text-amber-500" /> Menu Highlights (Text)
                                        </label>
                                        <textarea
                                            value={newService.menuHighlights}
                                            onChange={e => setNewService({ ...newService, menuHighlights: e.target.value })}
                                            className="w-full h-32 bg-white border-2 border-slate-100 rounded-2xl p-6 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 text-sm shadow-sm resize-none"
                                            placeholder="Signature dishes, special brews..."
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                            <Camera size={12} className="text-amber-500" /> Digital Menu Photo
                                        </label>
                                        <div className="relative h-32 w-full rounded-2xl border-2 border-dashed border-slate-200 bg-white flex items-center justify-center transition-all hover:border-amber-400 group overflow-hidden">
                                            {newService.menuImageUrl ? (
                                                <>
                                                    <Image src={newService.menuImageUrl} alt="Menu" fill className="object-cover" />
                                                    <button type="button" onClick={() => setNewService({ ...newService, menuImageUrl: "" })} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Trash2 size={16} className="text-white" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <input type="file" accept="image/*" onChange={handleMenuUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                    <div className="text-center">
                                                        <Plus size={16} className="text-slate-300 mx-auto mb-1" />
                                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Upload Menu Photo</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(vendor.category === 'workshops' || vendor.category === 'tour') && (
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 ml-1 flex items-center gap-2">
                                        <Clock size={12} className="text-blue-500" /> Curated Duration
                                    </label>
                                    <input
                                        value={newService.duration}
                                        onChange={e => setNewService({ ...newService, duration: e.target.value })}
                                        className="w-full h-16 bg-white border-2 border-slate-100 rounded-[1.25rem] px-8 focus:border-slate-900 transition-all outline-none font-bold text-slate-900 shadow-sm"
                                        placeholder="e.g. 2 Hours of Bliss"
                                    />
                                </div>
                            )}

                            {/* Multiple Photos Grid */}
                            <div className="space-y-6 md:col-span-2 pt-4">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                        <Camera size={14} className="text-slate-900" /> Experience Lookbook (Up to 5)
                                    </label>
                                    <div className="h-1 flex-1 mx-6 bg-slate-50 rounded-full relative overflow-hidden">
                                        <div
                                            className={cn("absolute inset-y-0 left-0 transition-all duration-500", theme.accent)}
                                            style={{ width: `${(newService.images.length / 5) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-rose-500 tracking-tighter">{newService.images.length}/5</span>
                                </div>

                                <div className="grid grid-cols-5 gap-4">
                                    {newService.images.map((img, idx) => (
                                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} key={idx} className="relative aspect-square rounded-[1.5rem] overflow-hidden group shadow-md border border-slate-100">
                                            <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                                            >
                                                <Trash2 className="text-white" size={18} />
                                            </button>
                                        </motion.div>
                                    ))}

                                    {newService.images.length < 5 && (
                                        <label className="aspect-square rounded-[1.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-slate-900 hover:shadow-xl transition-all group scale-100 active:scale-95 duration-300 relative">
                                            {uploading ? <Loader2 className="animate-spin text-rose-500" size={20} /> : <Plus className="text-slate-300 group-hover:text-slate-900" size={20} />}
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2 group-hover:text-slate-900">Add Cover</span>
                                            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-6 pt-10 md:col-span-2 items-center">
                                <button type="button" onClick={() => setIsAddingService(false)} className="px-10 h-20 bg-slate-50 text-slate-900 rounded-[2rem] text-sm font-bold hover:bg-slate-100 transition-all border border-slate-100">
                                    Discard
                                </button>
                                <button type="submit" disabled={uploading} className={cn("flex-1 h-20 rounded-[2rem] text-white text-sm font-black shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 group", theme.accent, uploading && "opacity-70 cursor-not-allowed")}>
                                    Publish Expression <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* RESERVATIONS & TOOLS */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* RECENT BOOKING REQUESTS */}
                <div className="xl:col-span-8 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-serif italic font-bold">Live Reservations</h2>
                        <div className="flex items-center gap-4">
                            <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-slate-400 focus:ring-0 cursor-pointer">
                                <option>This Week</option>
                                <option>Next Week</option>
                            </select>
                            <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:underline">Download Log</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50 bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer & Exp</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Date & Time</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Revenue</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {bookings.map((req) => (
                                    <tr key={req.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 relative rounded-xl overflow-hidden shadow-sm">
                                                    <Image src={req.services?.image_url || "https://images.unsplash.com/photo-1542204111-94943f65606d?w=800&q=80"} alt={req.services?.name} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">{req.customer_name}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium italic">{req.services?.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-900">{new Date(req.booking_date).toLocaleDateString()}</p>
                                            <p className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
                                                <Clock size={10} /> {req.booking_time}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-right font-black text-slate-900 text-sm">₹{Number(req.revenue).toLocaleString()}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                {req.status === 'pending' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateBookingStatus(req.id, 'confirmed')}
                                                            className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                            title="Confirm Booking"
                                                        >
                                                            <CheckCircle2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateBookingStatus(req.id, 'cancelled')}
                                                            className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                            title="Decline Booking"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                                                        req.status === 'confirmed' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                                                    )}>
                                                        {req.status}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-serif italic">
                                            No reservations found yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* SIDEBAR: PARTNER TOOLS */}
                <div className="xl:col-span-4 space-y-8 pb-10">
                    <div className={cn("p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group", theme.accent, "shadow-slate-200")}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        <MessageSquare className="text-white mb-6" size={32} />
                        <h3 className="text-2xl font-serif italic mb-4">Concierge Support.</h3>
                        <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed italic">
                            Need a special setup for a high-value client? Chat directly with our curation team.
                        </p>
                        <button className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] uppercase font-black tracking-widest shadow-xl transition-all hover:bg-slate-900 hover:text-white">
                            Open Direct Channel
                        </button>
                    </div>

                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Performance Index</h4>
                            <ArrowUpRight size={14} className="text-emerald-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold text-slate-600">Response Speed</span>
                                <span className="text-xs font-black text-slate-900">{bookings.length > 0 ? "Under 2h" : "N/A"}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={cn("h-full bg-emerald-500 transition-all duration-1000", bookings.length > 0 ? "w-[85%]" : "w-0")} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold text-slate-600">Client Satisfaction</span>
                                <span className="text-xs font-black text-slate-900">{bookings.length > 0 ? "98%" : "100%"}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={cn("h-full bg-blue-500 transition-all duration-1000", bookings.length > 0 ? "w-[98%]" : "w-[100%]")} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VendorDashboard() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
