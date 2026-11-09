-- =========================================================================
-- STAYNEST PLATFORM: COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- Target Platform: Supabase PostgreSQL + PostGIS + Supabase Auth / Google OAuth
-- University & LGU: Agusan del Sur State University (ADSSU) & Municipality of Bunawan
-- Official StayNest EmailJS Integration: service_mb4nz6g / template_ue72qgf / ZWNAYhvgarkuw9-2t
-- =========================================================================

-- 1. ENABLE REQUIRED EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- -------------------------------------------------------------------------
-- 2. USER PROFILES TABLE (Linked to Supabase Auth & Google / Facebook OAuth)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'landlord', 'admin')),
  auth_provider TEXT DEFAULT 'email' CHECK (auth_provider IN ('email', 'google', 'facebook')),
  
  -- Student Specific Fields
  student_id TEXT, -- e.g. 2024-0192-B
  college TEXT,    -- e.g. College of Computing and Information Sciences – CCIS
  program TEXT,    -- e.g. BSIT – Bachelor of Science in Information Technology
  year_level TEXT, -- e.g. 3rd Year
  cor_file_url TEXT,
  is_student_verified BOOLEAN DEFAULT FALSE,

  -- Landlord Specific Fields
  house_name TEXT,
  landlord_address TEXT,
  is_lgu_accredited BOOLEAN DEFAULT FALSE,
  lgu_permit_no TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 3. EMAILJS OTP VERIFICATION DISPATCH LOGS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  purpose TEXT NOT NULL CHECK (purpose IN ('login', 'register_student', 'register_landlord', 'password_reset')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'expired')),
  emailjs_service_id TEXT DEFAULT 'service_mb4nz6g',
  emailjs_template_id TEXT DEFAULT 'template_ue72qgf',
  dispatched_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '10 minutes')
);

-- -------------------------------------------------------------------------
-- 4. BOARDING HOUSES / PROPERTIES TABLE (WITH POSTGIS LOCATION)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.boarding_houses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tagline TEXT,
  price_start NUMERIC NOT NULL,
  address TEXT NOT NULL,
  barangay TEXT DEFAULT 'San Jose',
  municipality TEXT DEFAULT 'Bunawan',
  province TEXT DEFAULT 'Agusan del Sur',
  
  -- PostGIS Geography Coordinate Point (Longitude, Latitude)
  -- ADSSU Bunawan Main Campus Reference: Longitude 126.0044, Latitude 8.1692
  location GEOGRAPHY(POINT, 4326) NOT NULL DEFAULT ST_SetSRID(ST_MakePoint(126.0044, 8.1692), 4326),
  distance_from_adssu_km NUMERIC(4,2) DEFAULT 0.8,
  walk_time_minutes INT DEFAULT 8,

  rating NUMERIC(2,1) DEFAULT 5.0,
  reviews_count INT DEFAULT 1,
  verified BOOLEAN DEFAULT FALSE,
  verification_level TEXT DEFAULT 'LGU Accredited & BFP Verified',
  
  -- Housing Features & Safety Parameters
  gender_policy TEXT DEFAULT 'all' CHECK (gender_policy IN ('all', 'female_only', 'male_only')),
  water_status TEXT DEFAULT '24/7 Continuous Supply',
  is_water_247 BOOLEAN DEFAULT TRUE,
  flood_risk_level TEXT DEFAULT 'Low Flood Zone',
  has_cctv BOOLEAN DEFAULT TRUE,
  has_guard BOOLEAN DEFAULT FALSE,
  curfew TEXT DEFAULT '10:00 PM',
  contact_phone TEXT DEFAULT '+63 912 345 6789',
  description TEXT,
  cover_image TEXT,
  gallery_urls TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial Index for Proximity Radius Searches
CREATE INDEX IF NOT EXISTS idx_boarding_houses_location 
ON public.boarding_houses USING GIST(location);

-- -------------------------------------------------------------------------
-- 5. ROOM OPTIONS & VACANCIES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.room_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,          -- e.g. Room 01 - Bedspace Sharing
  type TEXT NOT NULL,          -- e.g. Bedspace Sharing, Private Solo
  price NUMERIC NOT NULL,       -- e.g. 1000
  vacant_slots TEXT NOT NULL,  -- e.g. 2 Slots Vacant
  description TEXT,
  features TEXT[] DEFAULT '{}',-- e.g. {'Bunk Bed', 'Study Desk', 'Individual Locker'}
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 6. LANDLORD LGU BUNAWAN ACCREDITATION DOCUMENTS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lgu_accreditations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  house_name TEXT NOT NULL,
  address TEXT NOT NULL,
  
  -- 4 Mandatory LGU Bunawan Compliance Uploads
  doc_title_url TEXT,      -- Proof of Ownership / Tax Dec
  doc_permit_url TEXT,     -- Bunawan Mayor's Business Permit
  doc_id_url TEXT,         -- Valid Government ID
  doc_fire_cert_url TEXT,  -- BFP Fire Safety Inspection Certificate

  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'NEEDS_FIX', 'REJECTED')),
  permit_no TEXT,
  reviewer_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- -------------------------------------------------------------------------
-- 7. SAVED / FAVORITE BOARDING HOUSES (FOR STUDENTS)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, boarding_house_id)
);

-- -------------------------------------------------------------------------
-- 8. CHAT MESSAGES TABLE (STUDENT <-> LANDLORD / ADMIN)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 9. AUTOMATIC TRIGGER FOR SUPABASE AUTH & GOOGLE OAUTH USER CREATION
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    role,
    auth_provider
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind Trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -------------------------------------------------------------------------
-- 10. POSTGIS PROXIMITY SEARCH QUERY FUNCTION FOR ADSSU CAMPUS
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_boarding_houses_near_adssu(
  adssu_lng DOUBLE PRECISION DEFAULT 126.0044,
  adssu_lat DOUBLE PRECISION DEFAULT 8.1692,
  max_distance_meters INT DEFAULT 3000
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  price_start NUMERIC,
  address TEXT,
  distance_km NUMERIC,
  walk_time_minutes INT,
  is_water_247 BOOLEAN,
  flood_risk_level TEXT,
  verified BOOLEAN,
  cover_image TEXT
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    h.id,
    h.name,
    h.price_start,
    h.address,
    ROUND((ST_Distance(h.location, ST_MakePoint(adssu_lng, adssu_lat)::geography) / 1000)::numeric, 2) AS distance_km,
    ROUND((ST_Distance(h.location, ST_MakePoint(adssu_lng, adssu_lat)::geography) / 80)::numeric)::int AS walk_time_minutes,
    h.is_water_247,
    h.flood_risk_level,
    h.verified,
    h.cover_image
  FROM public.boarding_houses h
  WHERE ST_DWithin(h.location, ST_MakePoint(adssu_lng, adssu_lat)::geography, max_distance_meters)
  ORDER BY distance_km ASC;
$$;

-- -------------------------------------------------------------------------
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boarding_houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lgu_accreditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Boarding Houses Policies
CREATE POLICY "Anyone can view verified properties" ON public.boarding_houses FOR SELECT USING (true);
CREATE POLICY "Landlords can insert own property" ON public.boarding_houses FOR INSERT WITH CHECK (auth.uid() = landlord_id);
CREATE POLICY "Landlords can update own property" ON public.boarding_houses FOR UPDATE USING (auth.uid() = landlord_id);

-- Room Options Policies
CREATE POLICY "Anyone can view room options" ON public.room_options FOR SELECT USING (true);

-- LGU Accreditations Policies
CREATE POLICY "Landlords view own accreditation" ON public.lgu_accreditations FOR SELECT USING (auth.uid() = landlord_id OR EXISTS (
  SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
));
CREATE POLICY "Landlords submit accreditation" ON public.lgu_accreditations FOR INSERT WITH CHECK (auth.uid() = landlord_id);

-- Saved Properties Policies
CREATE POLICY "Students manage saved properties" ON public.saved_properties FOR ALL USING (auth.uid() = student_id);

-- Chat Messages Policies
CREATE POLICY "Users view own messages" ON public.chat_messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- OTP Verifications Policies
CREATE POLICY "Public insert OTP verification" ON public.otp_verifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read OTP verification" ON public.otp_verifications FOR SELECT USING (true);

-- -------------------------------------------------------------------------
-- 12. INITIAL DEMO SEED DATA (5 VERIFIED LANDLORDS & BOARDING HOUSES)
-- -------------------------------------------------------------------------

-- Seed Landlord User Accounts (auth.users and public.profiles)
INSERT INTO public.profiles (id, email, full_name, role, house_name, landlord_address, is_lgu_accredited, lgu_permit_no, phone, avatar_url)
VALUES
  ('44444444-1111-4444-1111-111111111111', 'jiomer.dalayap@staynest.ph', 'Jiomer Dalayap', 'landlord', 'Jiomer Dalayap Boarding House', 'Purok 8, Poblacion, Bunawan, Agusan del Sur', TRUE, '2026-BNW-0491', '09071210348', '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg'),
  ('44444444-2222-4444-2222-222222222222', 'elizabeth.cabanillia@staynest.ph', 'Elizabeth Cabanillia', 'landlord', 'Cabanillia Boarding House', 'Toog Street, Poblacion, Bunawan, Agusan del Sur', TRUE, '2026-BNW-0492', '+63 918 345 6789', '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg'),
  ('44444444-3333-4444-3333-333333333333', 'flordeliza.quintas@staynest.ph', 'Flordeliza Quintas', 'landlord', 'Flordeliza Quintas Boarding House', 'Purok 3, San Jose, Bunawan, Agusan del Sur', TRUE, '2026-BNW-0493', '+63 929 456 7890', '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg'),
  ('44444444-4444-4444-4444-444444444444', 'myrna.hiponia@staynest.ph', 'Myrna Hiponia', 'landlord', 'Hiponia''s Boarding House', 'Acacia Street, Poblacion, Bunawan, Agusan del Sur', TRUE, '2026-BNW-0494', '+63 909 431 2657', '/assets/aistudio/Myrna_hiponia_0f453f79.jpg'),
  ('44444444-5555-4444-5555-555555555555', 'rhejie.largo@staynest.ph', 'Rhejie Largo', 'landlord', 'UNO Boarding House', 'Purok 4, San Teodoro, Bunawan, Agusan del Sur (near the bus terminal)', TRUE, '2026-BNW-0495', '+63 930 123 4567', '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  house_name = EXCLUDED.house_name,
  is_lgu_accredited = EXCLUDED.is_lgu_accredited;

INSERT INTO public.boarding_houses (
  id,
  landlord_id,
  name,
  tagline,
  price_start,
  address,
  barangay,
  municipality,
  province,
  location,
  distance_from_adssu_km,
  walk_time_minutes,
  rating,
  reviews_count,
  verified,
  verification_level,
  gender_policy,
  water_status,
  is_water_247,
  flood_risk_level,
  has_cctv,
  has_guard,
  curfew,
  contact_phone,
  description,
  cover_image,
  gallery_urls
) VALUES 
(
  'a1111111-1111-1111-1111-111111111111',
  '44444444-1111-4444-1111-111111111111',
  'Jiomer Dalayap Boarding House',
  'Secure student residence with 24/7 continuous water & gated perimeter',
  1200,
  'Purok 8, Poblacion, Bunawan, Agusan del Sur',
  'Poblacion',
  'Bunawan',
  'Agusan del Sur',
  ST_SetSRID(ST_MakePoint(125.9818, 8.1855), 4326),
  0.6,
  7,
  4.9,
  16,
  TRUE,
  'LGU Bunawan Accredited & BFP Verified',
  'all',
  '24/7 Continuous Water Supply',
  TRUE,
  'Low Flood Zone',
  TRUE,
  TRUE,
  '10:00 PM',
  '09071210348',
  'Clean and peaceful student accommodations owned by Jiomer Dalayap. Located in Purok 8 Poblacion Bunawan. Features 24/7 water supply, sturdy beds, and strict 10:00 PM curfew.',
  '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
  ARRAY['/assets/aistudio/Dalayap__Jiomer_c2096588.jpg', '/assets/aistudio/Dalayap__Jiomer_2_9d281101.jpg']
),
(
  'a2222222-2222-2222-2222-222222222222',
  '44444444-2222-4444-2222-222222222222',
  'Cabanillia Boarding House',
  'Student dorm featuring ground-floor Carinderia & continuous water supply',
  1100,
  'Toog Street, Poblacion, Bunawan, Agusan del Sur',
  'Poblacion',
  'Bunawan',
  'Agusan del Sur',
  ST_SetSRID(ST_MakePoint(125.9752, 8.1715), 4326),
  0.7,
  8,
  4.8,
  14,
  TRUE,
  'LGU Bunawan Accredited & BFP Verified',
  'all',
  '24/7 Continuous Water Supply',
  TRUE,
  'Low Flood Zone',
  TRUE,
  TRUE,
  '10:00 PM',
  '+63 918 345 6789',
  'Managed by Elizabeth Cabanillia. Features a ground-floor home-cooked Carinderia for boarders, continuous water supply, covered study balcony, and secure entry.',
  '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg',
  ARRAY['/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg', '/assets/aistudio/Elizabeth_cabanillia2_e2e9ebef.jpg']
),
(
  'a3333333-3333-3333-3333-333333333333',
  '44444444-3333-4444-3333-333333333333',
  'Flordeliza Quintas Boarding House',
  'Spacious student residence with study verandas & 24/7 water supply',
  1000,
  'Purok 3, San Jose, Bunawan, Agusan del Sur',
  'San Jose',
  'Bunawan',
  'Agusan del Sur',
  ST_SetSRID(ST_MakePoint(125.9830, 8.1868), 4326),
  0.5,
  6,
  4.8,
  18,
  TRUE,
  'LGU Bunawan Accredited & BFP Verified',
  'all',
  '24/7 Continuous Water Supply',
  TRUE,
  'Low Flood Zone',
  TRUE,
  TRUE,
  '10:00 PM',
  '+63 929 456 7890',
  'Managed by Flordeliza Quintas in Purok 3 San Jose. Features wide covered study balconies, continuous tap water, quiet study environment, and gated security.',
  '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg',
  ARRAY['/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg', '/assets/aistudio/Flordeliza_Quintas2_3cf44cf5.jpg', '/assets/aistudio/Flordeliza_Quintas3_0ffa558a.jpg']
),
(
  'a4444444-4444-4444-4444-444444444444',
  '44444444-4444-4444-4444-444444444444',
  'Hiponia''s Boarding House',
  'Home to Haus General Merchandise store with 24/7 continuous water',
  1200,
  'Acacia Street, Poblacion, Bunawan, Agusan del Sur',
  'Poblacion',
  'Bunawan',
  'Agusan del Sur',
  ST_SetSRID(ST_MakePoint(125.9842, 8.1880), 4326),
  0.8,
  9,
  4.7,
  15,
  TRUE,
  'LGU Bunawan Accredited & BFP Verified',
  'all',
  '24/7 Continuous Water Supply',
  TRUE,
  'Low Flood Zone',
  TRUE,
  TRUE,
  '10:00 PM',
  '+63 909 431 2657',
  'Owned by Myrna Hiponia. Features Haus General Merchandise on ground floor for supplies and snacks, 24/7 water supply, Wi-Fi, and 10 PM curfew security.',
  '/assets/aistudio/Myrna_hiponia_0f453f79.jpg',
  ARRAY['/assets/aistudio/Myrna_hiponia_0f453f79.jpg', '/assets/aistudio/Myrna_hiponia2_88e1fd12.jpg']
),
(
  'a5555555-5555-5555-5555-555555555555',
  '44444444-5555-4444-5555-555555555555',
  'UNO Boarding House',
  'Modern 2-storey dorm with garden courtyard near bus terminal (Male & Female)',
  1300,
  'Purok 4, San Teodoro, Bunawan, Agusan del Sur (near the bus terminal)',
  'San Teodoro',
  'Bunawan',
  'Agusan del Sur',
  ST_SetSRID(ST_MakePoint(125.9735, 8.1702), 4326),
  0.7,
  8,
  4.9,
  22,
  TRUE,
  'LGU Bunawan Accredited & BFP Verified',
  'all',
  '24/7 Continuous Water Supply',
  TRUE,
  'Low Flood Zone',
  TRUE,
  TRUE,
  '10:00 PM',
  '+63 930 123 4567',
  'Owned by Rhejie Largo. Accepting both male and female boarders. Two-storey building with flower garden courtyard, 24/7 water supply, and 10 PM curfew.',
  '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg',
  ARRAY['/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg', '/assets/aistudio/Rhejie_largo_uno2_b1329e25.jpg']
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  water_status = EXCLUDED.water_status,
  curfew = EXCLUDED.curfew;
