/**
 * StayNest Supabase & PostGIS Architecture Reference
 * 
 * Provides type-safe schema definitions and PostGIS spatial SQL queries
 * for production deployment on Supabase PostgreSQL.
 */

export interface SupabaseBoardingHouseRow {
  id: string;
  name: string;
  tagline: string;
  address: string;
  barangay: string;
  location: { type: 'Point'; coordinates: [number, number] }; // [lng, lat] for PostGIS
  price_start: number;
  verified: boolean;
  verification_level: string;
  gender_policy: 'all' | 'female_only' | 'male_only';
  water_status: string;
  is_water_247: boolean;
  flood_risk_level: string;
  has_cctv: boolean;
  has_guard: boolean;
  curfew: string;
  landlord_id: string;
  created_at: string;
}

export const SUPABASE_POSTGIS_SCHEMA_SQL = `-- =========================================================================
-- STAYNEST PLATFORM: COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- Target Platform: Supabase PostgreSQL + PostGIS + Supabase Auth / Google OAuth
-- University & LGU: Agusan del Sur State University (ADSSU) & Municipality of Bunawan
-- Official StayNest EmailJS Integration: service_mb4nz6g / template_ue72qgf / ZWNAYhvgarkuw9-2t
-- =========================================================================

-- 1. ENABLE REQUIRED EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. USER PROFILES TABLE (Linked to Supabase Auth & Google / Facebook OAuth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'landlord', 'admin')),
  auth_provider TEXT DEFAULT 'email' CHECK (auth_provider IN ('email', 'google', 'facebook')),
  
  -- Student Specific Fields
  student_id TEXT,
  college TEXT,
  program TEXT,
  year_level TEXT,
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

-- 3. EMAILJS OTP VERIFICATION DISPATCH LOGS TABLE
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

-- 4. BOARDING HOUSES / PROPERTIES TABLE (WITH POSTGIS LOCATION)
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
  location GEOGRAPHY(POINT, 4326) NOT NULL DEFAULT ST_SetSRID(ST_MakePoint(126.0044, 8.1692), 4326),
  distance_from_adssu_km NUMERIC(4,2) DEFAULT 0.8,
  walk_time_minutes INT DEFAULT 8,
  rating NUMERIC(2,1) DEFAULT 5.0,
  reviews_count INT DEFAULT 1,
  verified BOOLEAN DEFAULT FALSE,
  verification_level TEXT DEFAULT 'LGU Accredited & BFP Verified',
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

-- 5. ROOM OPTIONS & VACANCIES TABLE
CREATE TABLE IF NOT EXISTS public.room_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  vacant_slots TEXT NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. LANDLORD LGU BUNAWAN ACCREDITATION DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.lgu_accreditations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  house_name TEXT NOT NULL,
  address TEXT NOT NULL,
  doc_title_url TEXT,
  doc_permit_url TEXT,
  doc_id_url TEXT,
  doc_fire_cert_url TEXT,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'NEEDS_FIX', 'REJECTED')),
  permit_no TEXT,
  reviewer_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 7. SAVED / FAVORITE BOARDING HOUSES (FOR STUDENTS)
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, boarding_house_id)
);

-- 8. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. AUTOMATIC TRIGGER FOR SUPABASE AUTH & GOOGLE OAUTH USER CREATION
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
`;
