-- =========================================================================
-- STAYNEST ADSSU BUNAWAN STUDENT HOUSING PLATFORM
-- Complete PostgreSQL & Supabase Database Migration & Seeding Schema (Fixed)
-- =========================================================================

-- Enable UUID & Crypto extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -------------------------------------------------------------------------
-- 1. PROFILES TABLE (Student, Landlord, Admin Accounts)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'landlord', 'admin')),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  student_id_number VARCHAR(50),
  college_program TEXT,
  year_level VARCHAR(30),
  sub_title TEXT,
  avatar_url TEXT,
  cor_file_url TEXT,
  password_hash TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure all columns exist whether table is new or pre-existing
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS student_id_number VARCHAR(50);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS college_program TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS year_level VARCHAR(30);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS sub_title TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cor_file_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;

-- -------------------------------------------------------------------------
-- 2. OTP VERIFICATIONS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient VARCHAR(255) NOT NULL,
  otp_code VARCHAR(10) NOT NULL,
  purpose VARCHAR(50) NOT NULL CHECK (purpose IN ('login', 'register_student', 'register_landlord', 'password_reset')),
  is_verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 3. BOARDING HOUSES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.boarding_houses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  tagline TEXT,
  address TEXT NOT NULL,
  barangay VARCHAR(100) DEFAULT 'San Jose',
  latitude DECIMAL(10, 8) DEFAULT 8.1685,
  longitude DECIMAL(11, 8) DEFAULT 125.9920,
  distance_km DECIMAL(4, 2) DEFAULT 0.7,
  walk_minutes INT DEFAULT 8,
  price_start DECIMAL(10, 2) NOT NULL,
  is_lgu_verified BOOLEAN DEFAULT FALSE,
  verification_level VARCHAR(50) DEFAULT 'Barangay Certified',
  rating DECIMAL(2, 1) DEFAULT 4.8,
  reviews_count INT DEFAULT 12,
  gender_policy VARCHAR(30) DEFAULT 'all',
  water_supply_type VARCHAR(100) DEFAULT '24/7 Continuous',
  is_water_247 BOOLEAN DEFAULT TRUE,
  flood_risk_level VARCHAR(50) DEFAULT 'Low',
  has_cctv BOOLEAN DEFAULT TRUE,
  has_wifi BOOLEAN DEFAULT TRUE,
  curfew_time VARCHAR(50) DEFAULT '10:00 PM',
  main_image_url TEXT,
  gallery_urls TEXT[],
  contact_person VARCHAR(150),
  contact_phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 4. ROOM OPTIONS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.room_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE CASCADE,
  room_name VARCHAR(100) NOT NULL,
  room_type VARCHAR(50) NOT NULL,
  price_monthly DECIMAL(10, 2) NOT NULL,
  total_slots INT DEFAULT 2,
  available_slots INT DEFAULT 2,
  deposit_required DECIMAL(10, 2) DEFAULT 1000.00,
  room_photo_url TEXT,
  status VARCHAR(30) DEFAULT 'VACANT' CHECK (status IN ('VACANT', 'OCCUPIED')),
  inclusions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 5. LGU ACCREDITATION QUEUE TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lgu_accreditations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  landlord_name VARCHAR(150) NOT NULL,
  house_name VARCHAR(200) NOT NULL,
  permit_number VARCHAR(100),
  location_address TEXT NOT NULL,
  rooms_count INT DEFAULT 6,
  title_doc_url TEXT,
  permit_doc_url TEXT,
  phil_id_doc_url TEXT,
  bfp_fire_cert_url TEXT,
  status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'NEEDS_FIX')),
  audit_notes TEXT,
  revision_reason TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.lgu_accreditations ADD COLUMN IF NOT EXISTS title_doc_url TEXT;
ALTER TABLE public.lgu_accreditations ADD COLUMN IF NOT EXISTS permit_doc_url TEXT;
ALTER TABLE public.lgu_accreditations ADD COLUMN IF NOT EXISTS phil_id_doc_url TEXT;
ALTER TABLE public.lgu_accreditations ADD COLUMN IF NOT EXISTS bfp_fire_cert_url TEXT;

-- -------------------------------------------------------------------------
-- 6. SAVED PROPERTIES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, boarding_house_id)
);

-- -------------------------------------------------------------------------
-- 7. CHAT & MESSAGING
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unread_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_role VARCHAR(20) NOT NULL,
  message_text TEXT NOT NULL,
  is_quick_chip BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 8. BOOKING TRANSACTIONS & 5% COMMISSION LEDGER
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.booking_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_code VARCHAR(50) UNIQUE NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  student_name VARCHAR(150) NOT NULL,
  boarding_house_id UUID REFERENCES public.boarding_houses(id) ON DELETE SET NULL,
  house_name VARCHAR(200) NOT NULL,
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  landlord_name VARCHAR(150) NOT NULL,
  monthly_rent DECIMAL(10, 2) NOT NULL,
  platform_commission DECIMAL(10, 2) NOT NULL,
  landlord_payout DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(30) DEFAULT 'CLEARED' CHECK (payment_status IN ('CLEARED', 'PENDING', 'REMITTED')),
  remittance_method VARCHAR(50) DEFAULT 'GCash Direct / Bank Transfer',
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 9. LANDLORD SUBSCRIPTIONS & FEATURED LISTINGS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.landlord_subscriptions (
  id VARCHAR(50) PRIMARY KEY,
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan VARCHAR(20) NOT NULL CHECK (plan IN ('monthly', 'annual', 'free')),
  plan_name VARCHAR(100) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PENDING_VERIFICATION', 'EXPIRED')),
  featured_listings_enabled BOOLEAN DEFAULT FALSE,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expiry_date TIMESTAMP WITH TIME ZONE,
  gcash_reference_no VARCHAR(100),
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.boarding_houses ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- =========================================================================
-- DATA SEEDING: BUNAWAN BOARDING HOUSES & LGU ACCREDITATION RECORDS
-- =========================================================================

-- Seed 1: Seed Profiles & Passwords (Ensuring password_hash column is populated)
INSERT INTO public.profiles (id, role, full_name, email, phone, student_id_number, college_program, year_level, sub_title, is_verified, password_hash, avatar_url)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'student', 'Angelo Nuer', 'anuer@adssu.edu.ph', '+63 912 345 6789', '2024-0192-B', 'BSIT – Bachelor of Science in Information Technology', '3rd Year', 'BSIT - 3rd Year', TRUE, crypt('adssu2026', gen_salt('bf')), 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'),
  ('22222222-2222-2222-2222-222222222222', 'landlord', 'Conrado Candari', 'owner@staynest.ph', '+63 912 345 6789', NULL, NULL, NULL, 'Fritzcel Boarding House Owner', TRUE, crypt('Candari2026!', gen_salt('bf')), 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
  ('33333333-3333-3333-3333-333333333333', 'admin', 'ADSSU Administrator', 'admin@staynest.adssu.edu.ph', '+63 919 000 1122', NULL, NULL, NULL, 'Bunawan LGU & School Moderator', TRUE, crypt('bunawanAdmin2026', gen_salt('bf')), 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'),
  ('44444444-1111-4444-1111-111111111111', 'landlord', 'Jiomer Dalayap', 'jiomer.dalayap@staynest.ph', '09071210348', NULL, NULL, NULL, 'Jiomer Dalayap Boarding House Owner', TRUE, crypt('Dalayap2026!', gen_salt('bf')), '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg'),
  ('44444444-2222-4444-2222-222222222222', 'landlord', 'Elizabeth Cabanillia', 'elizabeth.cabanillia@staynest.ph', '+63 918 345 6789', NULL, NULL, NULL, 'Cabanillia Boarding House Owner', TRUE, crypt('Cabanillia2026!', gen_salt('bf')), '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg'),
  ('44444444-3333-4444-3333-333333333333', 'landlord', 'Flordeliza Quintas', 'flordeliza.quintas@staynest.ph', '+63 929 456 7890', NULL, NULL, NULL, 'Flordeliza Quintas Boarding House Owner', TRUE, crypt('Quintas2026!', gen_salt('bf')), '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg'),
  ('44444444-4444-4444-4444-444444444444', 'landlord', 'Myrna Hiponia', 'myrna.hiponia@staynest.ph', '+63 909 431 2657', NULL, NULL, NULL, 'Hiponia''s Boarding House Owner', TRUE, crypt('Hiponia2026!', gen_salt('bf')), '/assets/aistudio/Myrna_hiponia_0f453f79.jpg'),
  ('44444444-5555-4444-5555-555555555555', 'landlord', 'Rhejie Largo', 'rhejie.largo@staynest.ph', '+63 930 123 4567', NULL, NULL, NULL, 'UNO Boarding House Owner', TRUE, crypt('Largo2026!', gen_salt('bf')), '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg')
ON CONFLICT (email) DO UPDATE SET 
  is_verified = EXCLUDED.is_verified,
  password_hash = EXCLUDED.password_hash,
  student_id_number = EXCLUDED.student_id_number,
  college_program = EXCLUDED.college_program;

-- Seed 2: Seed Verified Bunawan Boarding Houses & Real Landlords
INSERT INTO public.boarding_houses (id, name, tagline, address, barangay, distance_km, walk_minutes, price_start, is_lgu_verified, verification_level, rating, reviews_count, main_image_url, gallery_urls, contact_person, contact_phone, water_supply_type, is_water_247, curfew_time)
VALUES
  (
    'a1111111-1111-1111-1111-111111111111',
    'Jiomer Dalayap Boarding House',
    'Clean student room accommodations with 24/7 water supply & gated perimeter',
    'Purok 8, Poblacion, Bunawan, Agusan del Sur',
    'Poblacion',
    0.6, 7, 1200.00, TRUE, 'LGU Accredited & BFP Verified', 4.9, 16,
    '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
    ARRAY['/assets/aistudio/Dalayap__Jiomer_c2096588.jpg', '/assets/aistudio/Dalayap__Jiomer_2_9d281101.jpg'],
    'Jiomer Dalayap', '09071210348', '24/7 Continuous Water Supply', TRUE, '10:00 PM'
  ),
  (
    'a2222222-2222-2222-2222-222222222222',
    'Cabanillia Boarding House',
    'Student dorm featuring ground floor home-cooked Carinderia & 24/7 water',
    'Toog Street, Poblacion, Bunawan, Agusan del Sur',
    'Poblacion',
    0.7, 8, 1100.00, TRUE, 'LGU Accredited & BFP Verified', 4.8, 14,
    '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg',
    ARRAY['/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg', '/assets/aistudio/Elizabeth_cabanillia2_e2e9ebef.jpg'],
    'Elizabeth Cabanillia', '+63 918 345 6789', '24/7 Continuous Water Supply', TRUE, '10:00 PM'
  ),
  (
    'a3333333-3333-3333-3333-333333333333',
    'Flordeliza Quintas Boarding House',
    'Spacious student residence with covered study verandas & 24/7 water',
    'Purok 3, San Jose, Bunawan, Agusan del Sur',
    'San Jose',
    0.5, 6, 1000.00, TRUE, 'LGU Accredited & BFP Verified', 4.8, 18,
    '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg',
    ARRAY['/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg', '/assets/aistudio/Flordeliza_Quintas2_3cf44cf5.jpg', '/assets/aistudio/Flordeliza_Quintas3_0ffa558a.jpg'],
    'Flordeliza Quintas', '+63 929 456 7890', '24/7 Continuous Water Supply', TRUE, '10:00 PM'
  ),
  (
    'a4444444-4444-4444-4444-444444444444',
    'Hiponia''s Boarding House',
    'Home to Haus General Merchandise store on ground floor for student supplies',
    'Acacia Street, Poblacion, Bunawan, Agusan del Sur',
    'Poblacion',
    0.8, 9, 1200.00, TRUE, 'LGU Accredited & BFP Verified', 4.7, 15,
    '/assets/aistudio/Myrna_hiponia_0f453f79.jpg',
    ARRAY['/assets/aistudio/Myrna_hiponia_0f453f79.jpg', '/assets/aistudio/Myrna_hiponia2_88e1fd12.jpg'],
    'Myrna Hiponia', '+63 909 431 2657', '24/7 Continuous Water Supply', TRUE, '10:00 PM'
  ),
  (
    'a5555555-5555-5555-5555-555555555555',
    'UNO Boarding House',
    'Modern 2-storey student dorm with flower garden courtyard near bus terminal',
    'Purok 4, San Teodoro, Bunawan, Agusan del Sur (near the bus terminal)',
    'San Teodoro',
    0.7, 8, 1300.00, TRUE, 'LGU Accredited & BFP Verified', 4.9, 22,
    '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg',
    ARRAY['/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg', '/assets/aistudio/Rhejie_largo_uno2_b1329e25.jpg'],
    'Rhejie Largo', '+63 930 123 4567', '24/7 Continuous Water Supply', TRUE, '10:00 PM'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  water_supply_type = EXCLUDED.water_supply_type,
  curfew_time = EXCLUDED.curfew_time;

-- Seed 3: Seed LGU Accreditations
INSERT INTO public.lgu_accreditations (id, landlord_name, house_name, permit_number, location_address, rooms_count, status, audit_notes)
VALUES
  (
    'b1111111-1111-1111-1111-111111111111',
    'Jiomer Dalayap',
    'Jiomer Dalayap Boarding House',
    '2026-BNW-0491',
    'Purok 8, Poblacion, Bunawan, Agusan del Sur',
    12,
    'APPROVED',
    'All documents verified matching LGU Bunawan municipal records. 24/7 water supply & BFP certificate checked.'
  ),
  (
    'b2222222-2222-2222-2222-222222222222',
    'Elizabeth Cabanillia',
    'Cabanillia Boarding House',
    '2026-BNW-0492',
    'Toog Street, Poblacion, Bunawan, Agusan del Sur',
    8,
    'APPROVED',
    'Approved with Carinderia sanitary inspection clearance.'
  ),
  (
    'b3333333-3333-3333-3333-333333333333',
    'Flordeliza Quintas',
    'Flordeliza Quintas Boarding House',
    '2026-BNW-0493',
    'Purok 3, San Jose, Bunawan, Agusan del Sur',
    10,
    'APPROVED',
    'LGU Bunawan accredited & BFP fire safety certified.'
  ),
  (
    'b4444444-4444-4444-4444-444444444444',
    'Myrna Hiponia',
    'Hiponia''s Boarding House',
    '2026-BNW-0494',
    'Acacia Street, Poblacion, Bunawan, Agusan del Sur',
    9,
    'APPROVED',
    'Haus General Merchandise business permit & boarding house clearance approved.'
  ),
  (
    'b5555555-5555-5555-5555-555555555555',
    'Rhejie Largo',
    'UNO Boarding House',
    '2026-BNW-0495',
    'Purok 4, San Teodoro, Bunawan, Agusan del Sur (near the bus terminal)',
    14,
    'APPROVED',
    'Verified for both male and female student accommodation.'
  )
ON CONFLICT (id) DO NOTHING;

-- Seed 4: Seed Sample 5% Platform Commission Ledger Transactions
INSERT INTO public.booking_transactions (transaction_code, student_name, house_name, landlord_name, monthly_rent, platform_commission, landlord_payout, payment_status, remittance_method)
VALUES
  ('TX-2026-001', 'Angelo Nuer (BSIT 3rd Yr)', 'Fritzcel Boarding House', 'Conrado Candari', 1000.00, 50.00, 950.00, 'CLEARED', 'GCash Remittance'),
  ('TX-2026-002', 'Kean Ide (BS Agri 3rd Yr)', 'Fritzcel Boarding House', 'Conrado Candari', 1000.00, 50.00, 950.00, 'CLEARED', 'Bank Remittance'),
  ('TX-2026-003', 'Mary Joy Doroteo (BSBA 2nd Yr)', 'San Jose Haven Boarding', 'Marites Plaza', 1200.00, 60.00, 1140.00, 'CLEARED', 'GCash Remittance'),
  ('TX-2026-004', 'Bea Alcantara (Education 1st Yr)', 'Jolina''s Boarding House', 'Jolina Asuncion', 1500.00, 75.00, 1425.00, 'CLEARED', 'GCash Remittance')
ON CONFLICT (transaction_code) DO NOTHING;

-- =========================================================================
-- OPTIONAL: SYNC TO SUPABASE BACKEND AUTH (auth.users)
-- Run this in the Supabase SQL Editor if you are using supabase.auth.signInWithPassword()
-- to authenticate through Supabase Auth's native JWT service:
-- =========================================================================

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    
    -- 1. Angelo Nuer (Student)
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      '11111111-1111-1111-1111-111111111111',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'anuer@adssu.edu.ph',
      crypt('adssu2026', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Angelo Nuer","role":"student"}',
      NOW(), NOW()
    ) ON CONFLICT (id) DO NOTHING;

    -- 2. Jiomer Dalayap (Landlord)
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      '44444444-1111-4444-1111-111111111111',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'jiomer.dalayap@staynest.ph',
      crypt('Dalayap2026!', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Jiomer Dalayap","role":"landlord"}',
      NOW(), NOW()
    ) ON CONFLICT (id) DO NOTHING;

    -- 3. Elizabeth Cabanillia (Landlord)
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      '44444444-2222-4444-2222-222222222222',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'elizabeth.cabanillia@staynest.ph',
      crypt('Cabanillia2026!', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Elizabeth Cabanillia","role":"landlord"}',
      NOW(), NOW()
    ) ON CONFLICT (id) DO NOTHING;

    -- 4. Flordeliza Quintas (Landlord)
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      '44444444-3333-4444-3333-333333333333',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'flordeliza.quintas@staynest.ph',
      crypt('Quintas2026!', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Flordeliza Quintas","role":"landlord"}',
      NOW(), NOW()
    ) ON CONFLICT (id) DO NOTHING;

    -- 5. Myrna Hiponia (Landlord)
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      '44444444-4444-4444-4444-444444444444',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'myrna.hiponia@staynest.ph',
      crypt('Hiponia2026!', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Myrna Hiponia","role":"landlord"}',
      NOW(), NOW()
    ) ON CONFLICT (id) DO NOTHING;

    -- 6. Rhejie Largo (Landlord)
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      '44444444-5555-4444-5555-555555555555',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'rhejie.largo@staynest.ph',
      crypt('Largo2026!', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Rhejie Largo","role":"landlord"}',
      NOW(), NOW()
    ) ON CONFLICT (id) DO NOTHING;

    -- 7. Conrado Candari (Landlord fallback)
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      '22222222-2222-2222-2222-222222222222',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'owner@staynest.ph',
      crypt('Candari2026!', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Conrado Candari","role":"landlord"}',
      NOW(), NOW()
    ) ON CONFLICT (id) DO NOTHING;

    -- Link user_id in public.profiles to auth.users
    UPDATE public.profiles p
    SET user_id = u.id
    FROM auth.users u
    WHERE p.email = u.email;

  END IF;
END $$;
