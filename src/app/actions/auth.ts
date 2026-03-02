"use server";

import sql from "@/lib/db";

export async function syncUserToDb(role: 'user' | 'vendor', userData: any) {
    try {
        if (role === 'vendor') {
            await sql`
                INSERT INTO vendors (id, shop_name, owner_name, email, phone, category, location)
                VALUES (${userData.id}, ${userData.shop_name}, ${userData.owner_name}, ${userData.email}, ${userData.phone}, ${userData.category}, ${userData.location})
                ON CONFLICT (id) DO UPDATE SET
                    shop_name = EXCLUDED.shop_name,
                    owner_name = EXCLUDED.owner_name,
                    email = EXCLUDED.email,
                    phone = EXCLUDED.phone,
                    category = EXCLUDED.category,
                    location = EXCLUDED.location
            `;
        } else {
            await sql`
                INSERT INTO users (id, full_name, email, phone, gender)
                VALUES (${userData.id}, ${userData.full_name}, ${userData.email}, ${userData.phone}, ${userData.gender})
                ON CONFLICT (id) DO UPDATE SET
                    full_name = EXCLUDED.full_name,
                    email = EXCLUDED.email,
                    phone = EXCLUDED.phone,
                    gender = EXCLUDED.gender
            `;
        }
        return { success: true };
    } catch (error: any) {
        console.error("Server Action Error:", error);
        return { success: false, error: error.message };
    }
}

export async function getVendorProfile(email: string) {
    try {
        const result = await sql`SELECT * FROM vendors WHERE email = ${email} LIMIT 1`;
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching vendor profile:", error);
        return null;
    }
}

export async function getUserProfile(email: string) {
    try {
        const result = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

export async function getVendorServices(vendorId: string) {
    try {
        const result = await sql`SELECT * FROM services WHERE vendor_id = ${vendorId} ORDER BY created_at DESC`;
        return result;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
}

export async function getVendorBookings(vendorId: string) {
    try {
        const result = await sql`
            SELECT 
                b.*,
                s.name as service_name,
                s.image_url as service_image_url
            FROM bookings b
            LEFT JOIN services s ON b.service_id = s.id
            WHERE b.vendor_id = ${vendorId}
            ORDER BY b.created_at DESC
        `;

        return result.map(row => ({
            ...row,
            services: {
                name: row.service_name,
                image_url: row.service_image_url
            }
        }));
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return [];
    }
}

export async function deleteServiceAction(id: string) {
    try {
        await sql`DELETE FROM services WHERE id = ${id}`;
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateBookingStatusAction(id: string, status: string) {
    try {
        await sql`UPDATE bookings SET status = ${status} WHERE id = ${id}`;
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createServiceAction(serviceData: any) {
    try {
        const result = await sql`
            INSERT INTO services (
                vendor_id, name, description, image_url, images, 
                address, price, duration, menu_highlights, menu_image_url, icon
            ) VALUES (
                ${serviceData.vendor_id}, ${serviceData.name}, ${serviceData.description}, 
                ${serviceData.image_url}, ${sql.array(serviceData.images)}, 
                ${serviceData.address}, ${serviceData.price}, ${serviceData.duration}, 
                ${serviceData.menu_highlights}, ${serviceData.menu_image_url}, ${serviceData.icon}
            )
            RETURNING *
        `;
        return { success: true, data: result[0] };
    } catch (error: any) {
        console.error("Insert service error:", error);
        return { success: false, error: error.message };
    }
}

export async function getUserBookings(email: string) {
    try {
        const result = await sql`
            SELECT 
                b.*,
                s.name as service_name,
                s.image_url as service_image_url,
                v.shop_name as vendor_shop_name,
                v.location as vendor_location
            FROM bookings b
            LEFT JOIN services s ON b.service_id = s.id
            LEFT JOIN vendors v ON b.vendor_id = v.id
            WHERE b.customer_email = ${email}
            ORDER BY b.booking_date ASC
        `;

        return result.map(row => ({
            ...row,
            services: {
                name: row.service_name,
                image_url: row.service_image_url
            },
            vendors: {
                shop_name: row.vendor_shop_name,
                location: row.vendor_location
            }
        }));
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        return [];
    }
}

export async function updateVendorProfile(email: string, profileData: any) {
    try {
        await sql`
            UPDATE vendors SET
                shop_name = ${profileData.shop_name},
                category = ${profileData.category},
                location = ${profileData.location},
                owner_name = ${profileData.owner_name},
                phone = ${profileData.phone}
            WHERE email = ${email}
        `;
        return { success: true };
    } catch (error: any) {
        console.error("Update vendor error:", error);
        return { success: false, error: error.message };
    }
}

export async function getAllServicesWithVendors() {
    try {
        const result = await sql`
            SELECT 
                s.*,
                v.id as v_id,
                v.shop_name as v_shop_name,
                v.owner_name as v_owner_name,
                v.email as v_email,
                v.phone as v_phone,
                v.category as v_category,
                v.location as v_location
            FROM services s
            JOIN vendors v ON s.vendor_id = v.id
        `;

        return result.map(row => ({
            ...row,
            vendors: {
                id: row.v_id,
                shop_name: row.v_shop_name,
                owner_name: row.v_owner_name,
                email: row.v_email,
                phone: row.v_phone,
                category: row.v_category,
                location: row.v_location
            }
        }));
    } catch (error) {
        console.error("Error fetching all services:", error);
        return [];
    }
}

export async function createBookingAction(bookingData: any) {
    try {
        await sql`
            INSERT INTO bookings (
                vendor_id, service_id, customer_name, customer_email, 
                booking_date, booking_time, revenue, status
            ) VALUES (
                ${bookingData.vendor_id}, ${bookingData.service_id}, ${bookingData.customer_name}, 
                ${bookingData.customer_email}, ${bookingData.booking_date}, ${bookingData.booking_time}, 
                ${bookingData.revenue}, ${bookingData.status}
            )
        `;
        return { success: true };
    } catch (error: any) {
        console.error("Create booking error:", error);
        return { success: false, error: error.message };
    }
}
