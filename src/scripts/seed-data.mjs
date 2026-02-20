import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hcazdemlwnzedebzkjbh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYXpkZW1sd256ZWRlYnpramJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzg1OTEsImV4cCI6MjA4NjkxNDU5MX0.vVHx5L1rzMwQNSjqD0i7UX9P8HyCzt8S8mDFpSCmo3Q';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const VENDORS = [
    {
        shop_name: "The Blue Tokai",
        owner_name: "Coffee Master",
        email: "tokai@example.com",
        category: "hospitality",
        location: "Kolkata"
    },
    {
        shop_name: "The Big Cup",
        owner_name: "Durgapur Coffee",
        email: "bigcup@example.com",
        category: "hospitality",
        location: "Durgapur"
    },
    {
        shop_name: "Art Station",
        owner_name: "Artist Red",
        email: "art@example.com",
        category: "workshops",
        location: "Kolkata"
    },
    {
        shop_name: "Gharpanchkot",
        owner_name: "Trek Guide",
        email: "trek@example.com",
        category: "tour",
        location: "Durgapur"
    }
];

const SERVICES = [
    {
        vendor_email: "tokai@example.com",
        name: "Morning Brew @ Tokai",
        description: "A haven for coffee purists, featuring ethically sourced beans and a minimalist, tranquil atmosphere perfect for deep conversations.",
        address: "Park Street",
        price: 800,
        image_url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80"
    },
    {
        vendor_email: "bigcup@example.com",
        name: "The Big Cup Cozy Corner",
        description: "A modern retreat in the heart of the city, offering artisanal blends and cozy corners designed for long, uninterrupted afternoons.",
        address: "City Centre",
        price: 600,
        image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
    },
    {
        vendor_email: "art@example.com",
        name: "Neon Painting Workshop",
        description: "Express your creativity with wine and color on canvas in a glowing neon environment.",
        address: "Salt Lake",
        price: 1500,
        image_url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80"
    },
    {
        vendor_email: "trek@example.com",
        name: "Gharpanchkot Hill Trek",
        description: "Climb new heights and witness breathtaking vistas together at the historic ruins of Gharpanchkot.",
        address: "Purulia",
        price: 2500,
        image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
    }
];

async function seed() {
    console.log("Starting seed...");

    for (const v of VENDORS) {
        const { data, error } = await supabase
            .from('vendors')
            .upsert([v], { onConflict: 'email' })
            .select();

        if (error) {
            console.error(`Error upserting vendor ${v.shop_name}:`, error);
        } else {
            console.log(`Upserted vendor: ${v.shop_name}`);
        }
    }

    // Map emails to IDs
    const { data: allVendors } = await supabase.from('vendors').select('id, email');
    const emailToId = Object.fromEntries(allVendors.map(v => [v.email, v.id]));

    for (const s of SERVICES) {
        const vendor_id = emailToId[s.vendor_email];
        if (!vendor_id) continue;

        const { vendor_email, ...serviceData } = s;
        const { error } = await supabase
            .from('services')
            .insert([{ ...serviceData, vendor_id }]);

        if (error) {
            console.error(`Error inserting service ${s.name}:`, error);
        } else {
            console.log(`Inserted service: ${s.name}`);
        }
    }

    console.log("Seed finished.");
}

seed();
