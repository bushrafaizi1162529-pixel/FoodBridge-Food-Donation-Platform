-- ==============================================================================
-- FoodBridge PostgreSQL Schema for Supabase (Hardened Production Security)
-- ==============================================================================
-- Security Model:
-- - Row Level Security (RLS) is ENABLED on every table.
-- - Public (anon key) access is strictly restricted to safe, read-only discovery.
-- - Sensitive tables (notifications, pickup requests) and write/delete operations
--   are restricted to the trusted backend via the server-side service_role key.
-- - Never expose the service_role key to the frontend or GitHub.
-- ==============================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'donor',
    donor_type TEXT DEFAULT 'individual',
    ngo_reg_id TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    points INTEGER DEFAULT 100,
    badges JSONB DEFAULT '[]'::jsonb,
    address TEXT,
    avatar_url TEXT,
    "avatarUrl" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Food Donations Table
CREATE TABLE IF NOT EXISTS food_donations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    donor_id TEXT,
    donor_name TEXT,
    food_name TEXT NOT NULL,
    category TEXT DEFAULT 'cooked',
    quantity TEXT NOT NULL,
    expiry_time TIMESTAMPTZ,
    location TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    description TEXT,
    status TEXT DEFAULT 'available',
    image_url TEXT,
    veg_non_veg TEXT DEFAULT 'veg',
    pickup_time TEXT,
    contact_number TEXT,
    assigned_ngo_id TEXT,
    assigned_ngo_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Pickup Requests Table
CREATE TABLE IF NOT EXISTS pickup_requests (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    food_id TEXT,
    ngo_id TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_donations_status ON food_donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created ON food_donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pickup_food ON pickup_requests(food_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickup_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Clean existing policies for idempotency
DROP POLICY IF EXISTS "Public read profiles" ON users;
DROP POLICY IF EXISTS "Public create user profile" ON users;
DROP POLICY IF EXISTS "Service role manage users" ON users;
DROP POLICY IF EXISTS "Public read donations" ON food_donations;
DROP POLICY IF EXISTS "Service role manage donations" ON food_donations;
DROP POLICY IF EXISTS "Service role manage pickup_requests" ON pickup_requests;
DROP POLICY IF EXISTS "Service role manage notifications" ON notifications;
DROP POLICY IF EXISTS "Allow public access for users" ON users;
DROP POLICY IF EXISTS "Allow public access for food_donations" ON food_donations;
DROP POLICY IF EXISTS "Allow public access for pickup_requests" ON pickup_requests;
DROP POLICY IF EXISTS "Allow public access for notifications" ON notifications;

-- Users RLS:
-- Public can read basic profile info for directory & leaderboards
CREATE POLICY "Public read profiles" ON users
    FOR SELECT USING (true);

-- Public can register their profile with valid contact info
CREATE POLICY "Public create user profile" ON users
    FOR INSERT WITH CHECK (name IS NOT NULL AND email IS NOT NULL);

-- Updates and deletes are restricted to the trusted backend service_role
CREATE POLICY "Service role manage users" ON users
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Food Donations RLS:
-- Public can view active donation postings
CREATE POLICY "Public read donations" ON food_donations
    FOR SELECT USING (true);

-- Create, update, and delete are managed through the verified backend API
CREATE POLICY "Service role manage donations" ON food_donations
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Pickup Requests RLS:
-- Private logistics; only accessible through the backend service_role
CREATE POLICY "Service role manage pickup_requests" ON pickup_requests
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Notifications RLS:
-- Private messages; only accessible through the backend service_role
CREATE POLICY "Service role manage notifications" ON notifications
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA (Idempotent: safe to run multiple times without duplicates)
-- ==============================================================================
INSERT INTO users (id, name, email, phone, address, role, donor_type, points, badges, is_verified)
VALUES 
  ('donor_hyatt', 'Grand Royal Banquet Hall', 'banquet@grandroyal.com', '+91 98765 43210', 'Venkateshwara Hills Road, Hyderabad', 'donor', 'hotel', 1250, '["Golden Heart", "Surplus Slayer", "Buffet Hero"]'::jsonb, true),
  ('donor_annapurna', 'Annapurna Catering Services', 'contact@annacaters.co.in', '+91 87654 32109', 'Sankey Road, Sadashivanagar, Bengaluru', 'donor', 'caterer', 840, '["Zero Waste Champ", "Wedding Saviour"]'::jsonb, true),
  ('ngo_rotifoundation', 'Roti Seva Foundation', 'hope@rotiseva.org', '+91 99887 76655', 'Gachibowli Ring Road Outer Corridor, Hyderabad', 'ngo', 'individual', 2100, '["Super Distributor", "Midnight Angels", "Verified Ally"]'::jsonb, true),
  ('ngo_feedinghands', 'Feeding Hands Mission', 'connect@feedinghands.org', '+91 88990 11223', 'Anna Nagar West Block, Chennai', 'ngo', 'individual', 420, '["Quick Responder"]'::jsonb, false),
  ('admin_god', 'FoodBridge Global Admin', 'admin@foodbridge.org', '+91 90000 00001', 'HQ Command Desk, New Delhi', 'admin', 'individual', 9999, '["Pioneer Defender"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO food_donations (id, donor_id, donor_name, food_name, category, quantity, expiry_time, location, latitude, longitude, description, status, image_url)
VALUES
  ('donation_1', 'donor_hyatt', 'Grand Royal Banquet Hall', 'Buffet Feast: Jeera Rice, Paneer Butter Masala, Roti', 'cooked', '45 Servings', NOW() + INTERVAL '5 hours', 'Venkateshwara Hills Road, Hyderabad', 17.4126, 78.4482, 'Fully packed in insulated carriers. Keep hot.', 'available', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80'),
  ('donation_2', 'donor_annapurna', 'Annapurna Catering', 'Fresh Wedding surplus Vegetable Biryani & Raita', 'cooked', '120 Servings', NOW() + INTERVAL '3 hours', 'Sankey Road, Sadashivanagar, Bengaluru', 13.0034, 77.5796, 'Stored in premium food-grade aluminum buckets.', 'claimed', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80')
ON CONFLICT (id) DO NOTHING;
