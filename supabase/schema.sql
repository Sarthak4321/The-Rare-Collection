-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    category TEXT,
    location TEXT,
    password TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (for normal users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    gender TEXT,
    password TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    image_url TEXT,
    images TEXT[] DEFAULT '{}',
    address TEXT,
    price NUMERIC(10, 2),
    duration TEXT,
    menu_highlights TEXT,
    menu_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
    revenue DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
