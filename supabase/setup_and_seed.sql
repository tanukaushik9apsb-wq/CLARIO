-- =====================================================================
-- Clario: Complete Supabase Database Setup & Seed
-- Run this script in your Supabase SQL Editor:
-- Project: dxcmsklaqbdcqvedfxdi.supabase.co
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS (Idempotent)
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('student', 'mentor', 'admin');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE exam_type AS ENUM (
    'JEE Main', 
    'JEE Advanced', 
    'BITSAT', 
    'WBJEE', 
    'MHT-CET', 
    'KCET', 
    'COMEDK', 
    'UPTAC', 
    'TNEA', 
    'JAC Delhi', 
    'NEET UG'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE category_type AS ENUM (
    'General (OPEN)', 
    'GEN-EWS', 
    'OBC-NCL', 
    'SC', 
    'ST', 
    'PwD'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE seat_pool_type AS ENUM (
    'Gender-Neutral', 
    'Female-only'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE quota_type AS ENUM (
    'AI',   -- All India
    'HS',   -- Home State
    'OS',   -- Other State
    'GOVT', -- State Government Quota
    'MGT'   -- Management Quota
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE institute_category AS ENUM (
    'IIT', 
    'NIT', 
    'IIIT', 
    'GFTI', 
    'BITS', 
    'State Government', 
    'Autonomous Private',
    'Premier Medical'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE authority_type AS ENUM (
    'JoSAA', 
    'CSAB', 
    'JAC Delhi', 
    'UPTAC', 
    'WBJEEB', 
    'State CET Cell (MHT-CET)', 
    'MHT-CET',
    'KEA (KCET)', 
    'KEA',
    'DTE TNEA', 
    'TNEA',
    'BITSAT Council',
    'BITSAT',
    'State DTE',
    'MCC NEET',
    'Independent'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM (
    'confirmed', 
    'completed', 
    'cancelled'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE notice_importance AS ENUM (
    'Critical', 
    'Important', 
    'Informational'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'student',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  home_state TEXT DEFAULT 'Maharashtra',
  primary_exam exam_type DEFAULT 'JEE Main',
  crl_rank INTEGER,
  category_rank INTEGER,
  category category_type DEFAULT 'General (OPEN)',
  board_percentage NUMERIC(5,2),
  max_budget_inr INTEGER DEFAULT 500000,
  hostel_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to sync auth.users with public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student User'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'::user_role)
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. COLLEGES
CREATE TABLE IF NOT EXISTS public.colleges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  established INTEGER NOT NULL,
  campus_size_acres INTEGER,
  nirf_rank INTEGER,
  institute_type institute_category NOT NULL,
  counselling_authority authority_type NOT NULL,
  university_affiliation TEXT,
  accepted_exams exam_type[] NOT NULL,
  image_url TEXT NOT NULL,
  hero_image_url TEXT,
  overview TEXT NOT NULL,
  eligibility_criteria TEXT NOT NULL,
  official_website TEXT NOT NULL,
  hostel_available BOOLEAN DEFAULT TRUE,
  ac_rooms_available BOOLEAN DEFAULT FALSE,
  wifi_campus BOOLEAN DEFAULT TRUE,
  sports_complex BOOLEAN DEFAULT TRUE,
  medical_center BOOLEAN DEFAULT TRUE,
  library_details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. COURSES & FEES
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id TEXT NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  branch_code TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  degree TEXT NOT NULL DEFAULT 'B.Tech',
  duration_years INTEGER NOT NULL DEFAULT 4,
  annual_tuition_inr INTEGER NOT NULL,
  annual_hostel_inr INTEGER NOT NULL,
  one_time_admission_fee_inr INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(college_id, branch_code)
);

-- 5. CUTOFFS
CREATE TABLE IF NOT EXISTS public.cutoffs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id TEXT NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  branch_code TEXT NOT NULL,
  year INTEGER NOT NULL,
  round INTEGER NOT NULL,
  exam exam_type NOT NULL,
  category category_type NOT NULL,
  quota quota_type NOT NULL,
  seat_pool seat_pool_type NOT NULL DEFAULT 'Gender-Neutral',
  opening_rank INTEGER NOT NULL,
  closing_rank INTEGER NOT NULL,
  cutoff_score INTEGER,
  source_authority_archive TEXT NOT NULL,
  last_verified_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cutoffs_query 
  ON public.cutoffs(college_id, branch_code, exam, category, quota, year);

-- 6. PLACEMENTS
CREATE TABLE IF NOT EXISTS public.placement_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id TEXT NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  reporting_year INTEGER NOT NULL,
  avg_salary_lpa NUMERIC(5,2) NOT NULL,
  median_salary_lpa NUMERIC(5,2) NOT NULL,
  highest_salary_lpa NUMERIC(6,2) NOT NULL,
  placement_rate_percent NUMERIC(5,2) NOT NULL,
  top_recruiters TEXT[] NOT NULL,
  source_document TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(college_id, reporting_year)
);

-- 7. MENTOR PROFILES
CREATE TABLE IF NOT EXISTS public.mentor_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  college_id TEXT NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  branch TEXT NOT NULL,
  degree TEXT NOT NULL DEFAULT 'B.Tech',
  academic_year TEXT NOT NULL,
  verified_identity BOOLEAN DEFAULT FALSE,
  verified_college_affiliation BOOLEAN DEFAULT FALSE,
  id_card_url TEXT,
  rating NUMERIC(3,2) DEFAULT 5.00,
  reviews_count INTEGER DEFAULT 0,
  price_inr INTEGER NOT NULL DEFAULT 299,
  session_duration_mins INTEGER NOT NULL DEFAULT 30,
  languages TEXT[] NOT NULL DEFAULT ARRAY['English', 'Hindi'],
  entrance_exam exam_type NOT NULL,
  entrance_rank TEXT NOT NULL,
  bio TEXT NOT NULL,
  topics TEXT[] NOT NULL,
  upi_payout_id TEXT,
  total_revenue_inr INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SLOTS & BOOKINGS
CREATE TABLE IF NOT EXISTS public.mentor_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID NOT NULL REFERENCES public.mentor_profiles(id) ON DELETE CASCADE,
  slot_date TEXT NOT NULL,
  slot_time TEXT NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_code TEXT NOT NULL UNIQUE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES public.mentor_profiles(id) ON DELETE CASCADE,
  slot_id UUID REFERENCES public.mentor_slots(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  scheduled_date TEXT NOT NULL,
  scheduled_time TEXT NOT NULL,
  price_inr INTEGER NOT NULL,
  status booking_status NOT NULL DEFAULT 'confirmed',
  meet_link TEXT NOT NULL,
  shared_notes TEXT,
  student_rating INTEGER,
  student_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ASPIRANT CHOICE PREFERENCES
CREATE TABLE IF NOT EXISTS public.choice_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  preference_order INTEGER NOT NULL,
  college_id TEXT NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  branch_code TEXT NOT NULL,
  category_tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, preference_order),
  UNIQUE(student_id, college_id, branch_code)
);

-- 10. REVIEWS & DISCUSSIONS
CREATE TABLE IF NOT EXISTS public.college_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id TEXT NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  branch TEXT NOT NULL,
  graduation_year TEXT NOT NULL,
  verified_student BOOLEAN DEFAULT TRUE,
  title TEXT NOT NULL,
  pros TEXT NOT NULL,
  cons TEXT NOT NULL,
  rating_teaching NUMERIC(2,1) NOT NULL,
  rating_faculty NUMERIC(2,1) NOT NULL,
  rating_attendance NUMERIC(2,1) NOT NULL,
  rating_campus NUMERIC(2,1) NOT NULL,
  rating_hostel NUMERIC(2,1) NOT NULL,
  rating_clubs NUMERIC(2,1) NOT NULL,
  rating_internships NUMERIC(2,1) NOT NULL,
  rating_placements NUMERIC(2,1) NOT NULL,
  rating_workload NUMERIC(2,1) NOT NULL,
  helpful_votes INTEGER DEFAULT 0,
  flagged_for_moderation BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_role user_role NOT NULL DEFAULT 'student',
  author_badge TEXT,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  upvotes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES public.community_threads(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_role user_role NOT NULL DEFAULT 'student',
  author_badge TEXT,
  content TEXT NOT NULL,
  is_mentor_reply BOOLEAN DEFAULT FALSE,
  upvotes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. COUNSELLING NOTICES & DEADLINES
CREATE TABLE IF NOT EXISTS public.counselling_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  authority authority_type NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  official_source_url TEXT NOT NULL,
  importance notice_importance NOT NULL DEFAULT 'Important',
  deadline_date DATE,
  verified BOOLEAN DEFAULT TRUE,
  is_illustrative_demo BOOLEAN DEFAULT FALSE,
  published_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.calendar_deadlines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deadline_date DATE NOT NULL,
  title TEXT NOT NULL,
  authority authority_type NOT NULL,
  milestone_type TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'High',
  is_illustrative_demo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_checklist_progress (
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_identifier TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (student_id, task_identifier)
);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cutoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.choice_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.college_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselling_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_checklist_progress ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  -- Public Read Policies
  CREATE POLICY "Public read colleges" ON public.colleges FOR SELECT USING (true);
  CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);
  CREATE POLICY "Public read cutoffs" ON public.cutoffs FOR SELECT USING (true);
  CREATE POLICY "Public read placements" ON public.placement_records FOR SELECT USING (true);
  CREATE POLICY "Public read updates" ON public.counselling_updates FOR SELECT USING (true);
  CREATE POLICY "Public read deadlines" ON public.calendar_deadlines FOR SELECT USING (true);
  CREATE POLICY "Public read reviews" ON public.college_reviews FOR SELECT USING (true);
  CREATE POLICY "Public read threads" ON public.community_threads FOR SELECT USING (true);
  CREATE POLICY "Public read replies" ON public.community_replies FOR SELECT USING (true);
  CREATE POLICY "Public read mentor slots" ON public.mentor_slots FOR SELECT USING (true);
  CREATE POLICY "Public read verified mentors" ON public.mentor_profiles FOR SELECT USING (true);
  CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);

  -- Profiles
  CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
  CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

  -- Choices
  CREATE POLICY "Users read own choices" ON public.choice_preferences FOR SELECT USING (auth.uid() = student_id);
  CREATE POLICY "Users insert own choices" ON public.choice_preferences FOR INSERT WITH CHECK (auth.uid() = student_id);
  CREATE POLICY "Users update own choices" ON public.choice_preferences FOR UPDATE USING (auth.uid() = student_id);
  CREATE POLICY "Users delete own choices" ON public.choice_preferences FOR DELETE USING (auth.uid() = student_id);

  -- Bookings
  CREATE POLICY "Users read own bookings" ON public.consultation_bookings FOR SELECT USING (auth.uid() = student_id);
  CREATE POLICY "Users insert own bookings" ON public.consultation_bookings FOR INSERT WITH CHECK (auth.uid() = student_id);

  -- Threads & Replies
  CREATE POLICY "Auth users post threads" ON public.community_threads FOR INSERT WITH CHECK (auth.uid() = author_id);
  CREATE POLICY "Auth users post replies" ON public.community_replies FOR INSERT WITH CHECK (auth.uid() = author_id);

  -- Reviews
  CREATE POLICY "Auth users post reviews" ON public.college_reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

  -- Checklist
  CREATE POLICY "Users manage checklist" ON public.user_checklist_progress FOR ALL USING (auth.uid() = student_id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- =====================================================================
-- SEED DATA
-- =====================================================================

-- 1. Insert Colleges
INSERT INTO public.colleges (
  id, name, short_name, location, state, established, campus_size_acres, nirf_rank, 
  institute_type, counselling_authority, accepted_exams, image_url, hero_image_url, 
  overview, eligibility_criteria, official_website, hostel_available, ac_rooms_available, 
  wifi_campus, sports_complex, medical_center, library_details
) VALUES
(
  'iit-bombay',
  'Indian Institute of Technology Bombay',
  'IIT Bombay',
  'Powai, Mumbai',
  'Maharashtra',
  1958,
  550,
  3,
  'IIT',
  'JoSAA',
  ARRAY['JEE Advanced']::exam_type[],
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
  'Globally recognized as India’s foremost technological institution, situated in Powai alongside picturesque lakes.',
  'JEE Advanced rank. 75% in Class 12 or top 20 percentile of qualifying board.',
  'https://www.iitb.ac.in',
  true, false, true, true, true,
  '5,00,000+ volumes & IEEE full-text access'
),
(
  'iit-delhi',
  'Indian Institute of Technology Delhi',
  'IIT Delhi',
  'Hauz Khas, New Delhi',
  'Delhi',
  1961,
  320,
  2,
  'IIT',
  'JoSAA',
  ARRAY['JEE Advanced']::exam_type[],
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
  'Located in the historic capital, celebrated for world-class computing facilities and prolific alumni founders.',
  'JEE Advanced rank. 75% in Class 12 or top 20 percentile.',
  'https://home.iitd.ac.in',
  true, false, true, true, true,
  '3,80,000+ print and e-resources'
),
(
  'nit-trichy',
  'National Institute of Technology Tiruchirappalli',
  'NIT Trichy',
  'Tiruchirappalli',
  'Tamil Nadu',
  1964,
  800,
  9,
  'NIT',
  'JoSAA',
  ARRAY['JEE Main']::exam_type[],
  'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
  'Consistent NIRF #1 among all National Institutes of Technology.',
  'JEE Main CRL rank via JoSAA/CSAB. 75% in Class 12 or top 20 percentile.',
  'https://www.nitt.edu',
  true, false, true, true, true,
  '1,50,000+ volumes and high-speed digital catalog'
),
(
  'nit-surathkal',
  'National Institute of Technology Karnataka, Surathkal',
  'NIT Surathkal',
  'Mangaluru',
  'Karnataka',
  1960,
  295,
  12,
  'NIT',
  'JoSAA',
  ARRAY['JEE Main']::exam_type[],
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
  'Located on the Arabian Sea coast with its own private beach and lighthouse.',
  'JEE Main CRL rank via JoSAA/CSAB. 75% in Class 12 or top 20 percentile.',
  'https://www.nitk.ac.in',
  true, false, true, true, true,
  '1,40,000+ volumes & digital learning portal'
),
(
  'iiit-hyderabad',
  'International Institute of Information Technology Hyderabad',
  'IIIT Hyderabad',
  'Gachibowli, Hyderabad',
  'Telangana',
  1998,
  66,
  55,
  'IIIT',
  'State DTE',
  ARRAY['JEE Main']::exam_type[],
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
  'India’s foremost pure research institution for Computer Science and AI.',
  'JEE Main Overall CRL Rank (Admissions via independent IIIT-H Portal, NOT via JoSAA).',
  'https://www.iiit.ac.in',
  true, true, true, true, true,
  '30,000+ specialized computing texts & ACM/IEEE portals'
),
(
  'bits-pilani',
  'Birla Institute of Technology and Science, Pilani',
  'BITS Pilani',
  'Pilani, Rajasthan',
  'Rajasthan',
  1964,
  328,
  25,
  'BITS',
  'BITSAT Council',
  ARRAY['BITSAT']::exam_type[],
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
  'India’s pre-eminent private technical university. Renowned for zero-attendance policy and Practice School.',
  'Admissions purely on BITSAT score (out of 390). Minimum 75% in PCM in Class 12.',
  'https://www.bits-pilani.ac.in',
  true, false, true, true, true,
  '2,40,000+ volumes & patent databases'
),
(
  'coep-pune',
  'COEP Technological University',
  'COEP Pune',
  'Shivajinagar, Pune',
  'Maharashtra',
  1854,
  38,
  73,
  'State Government',
  'State CET Cell (MHT-CET)',
  ARRAY['MHT-CET', 'JEE Main']::exam_type[],
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
  'Third oldest engineering college in Asia. Renowned for rich heritage and Bharat Ratna Sir M. Visvesvaraya alumni.',
  'MHT-CET Merit rank for 85% Maharashtra State seats; JEE Main for 15% All India seats.',
  'https://www.coep.org.in',
  true, false, true, true, true,
  '1,20,000+ volumes, dating back to 19th-century classics'
),
(
  'jadavpur-university',
  'Jadavpur University, Faculty of Engineering & Technology',
  'Jadavpur University',
  'Kolkata',
  'West Bengal',
  1955,
  58,
  10,
  'State Government',
  'WBJEEB',
  ARRAY['WBJEE', 'JEE Main']::exam_type[],
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
  'World-class engineering education at virtually token fees (~₹2,400 to ₹10,000/year). Commands unmatched ROI.',
  'WBJEE GMR via WBJEEB Counselling. 90% seats reserved for West Bengal domicile.',
  'http://www.jaduniv.edu.in',
  true, false, true, true, true,
  '6,50,000+ volumes & specialized collections'
),
(
  'rvce-bangalore',
  'R.V. College of Engineering (RVCE)',
  'RVCE Bangalore',
  'Mysuru Road, Bengaluru',
  'Karnataka',
  1963,
  52,
  96,
  'Autonomous Private',
  'KEA (KCET)',
  ARRAY['KCET', 'COMEDK', 'JEE Main']::exam_type[],
  'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
  'Bangalore’s premier private engineering powerhouse in the heart of Silicon Valley.',
  'KEA KCET rank for Karnataka domicile (45%); COMEDK UGET for All India open (30%).',
  'https://www.rvce.edu.in',
  true, false, true, true, true,
  '1,30,000+ volumes & industrial research databases'
),
(
  'dtu-delhi',
  'Delhi Technological University',
  'DTU Delhi',
  'Rohini, New Delhi',
  'Delhi',
  1941,
  164,
  29,
  'State Government',
  'JAC Delhi',
  ARRAY['JEE Main', 'JAC Delhi']::exam_type[],
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
  'Established in 1941 as Delhi Polytechnic, legendary engineering cradle with a massive 164-acre campus.',
  'JEE Main CRL rank via JAC Delhi. 85% seats for Delhi Region, 15% for Outside Delhi.',
  'https://www.dtu.ac.in',
  true, false, true, true, true,
  '2,20,000+ volumes, IEEE access and patent databases'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  location = EXCLUDED.location;

-- 2. Courses
INSERT INTO public.courses (college_id, branch_code, branch_name, degree, duration_years, annual_tuition_inr, annual_hostel_inr, one_time_admission_fee_inr) VALUES
('iit-bombay', 'CSE', 'Computer Science and Engineering', 'B.Tech', 4, 224000, 38000, 18000),
('iit-bombay', 'EE', 'Electrical Engineering', 'B.Tech', 4, 224000, 38000, 18000),
('iit-delhi', 'CSE', 'Computer Science and Engineering', 'B.Tech', 4, 220000, 36000, 17500),
('nit-trichy', 'CSE', 'Computer Science and Engineering', 'B.Tech', 4, 145000, 32000, 16000),
('nit-surathkal', 'CSE', 'Computer Science and Engineering', 'B.Tech', 4, 148000, 34000, 16500),
('iiit-hyderabad', 'CSE', 'Computer Science and Engineering', 'B.Tech', 4, 380000, 42000, 20000),
('bits-pilani', 'CSE', 'Computer Science', 'B.E.', 4, 540000, 48000, 53900),
('coep-pune', 'CSE', 'Computer Engineering', 'B.Tech', 4, 92000, 35000, 8500),
('jadavpur-university', 'CSE', 'Computer Science and Engineering', 'B.E.', 4, 2400, 1200, 500),
('rvce-bangalore', 'CSE', 'Computer Science and Engineering', 'B.E.', 4, 98000, 110000, 15000),
('dtu-delhi', 'CSE', 'Computer Engineering', 'B.Tech', 4, 219000, 42000, 12000)
ON CONFLICT (college_id, branch_code) DO NOTHING;

-- 3. Cutoffs
INSERT INTO public.cutoffs (college_id, branch_code, year, round, exam, category, quota, seat_pool, opening_rank, closing_rank, source_authority_archive) VALUES
('iit-bombay', 'CSE', 2025, 6, 'JEE Advanced', 'General (OPEN)', 'AI', 'Gender-Neutral', 1, 69, 'Official JoSAA 2025 Round 6 Archive'),
('iit-delhi', 'CSE', 2025, 6, 'JEE Advanced', 'General (OPEN)', 'AI', 'Gender-Neutral', 25, 116, 'Official JoSAA 2025 Round 6 Archive'),
('nit-trichy', 'CSE', 2025, 6, 'JEE Main', 'General (OPEN)', 'OS', 'Gender-Neutral', 1100, 4650, 'Official JoSAA 2025 Round 6 Archive'),
('nit-surathkal', 'CSE', 2025, 6, 'JEE Main', 'General (OPEN)', 'OS', 'Gender-Neutral', 1200, 3400, 'Official JoSAA 2025 Round 6 Archive'),
('iiit-hyderabad', 'CSE', 2025, 4, 'JEE Main', 'General (OPEN)', 'AI', 'Gender-Neutral', 120, 1680, 'Official IIIT Hyderabad 2025 Portal'),
('coep-pune', 'CSE', 2025, 3, 'MHT-CET', 'General (OPEN)', 'GOVT', 'Gender-Neutral', 12, 195, 'Official MHT-CET CAP Round 3 Archive'),
('jadavpur-university', 'CSE', 2025, 3, 'WBJEE', 'General (OPEN)', 'HS', 'Gender-Neutral', 1, 125, 'Official WBJEEB 2025 Archive'),
('rvce-bangalore', 'CSE', 2025, 2, 'KCET', 'General (OPEN)', 'GOVT', 'Gender-Neutral', 40, 310, 'Official KEA KCET 2025 Archive'),
('dtu-delhi', 'CSE', 2025, 5, 'JEE Main', 'General (OPEN)', 'OS', 'Gender-Neutral', 1800, 4850, 'Official JAC Delhi 2025 Round 5 Archive');

-- 4. Placement Records
INSERT INTO public.placement_records (college_id, reporting_year, avg_salary_lpa, median_salary_lpa, highest_salary_lpa, placement_rate_percent, top_recruiters, source_document) VALUES
('iit-bombay', 2025, 24.5, 21.8, 120.0, 91.2, ARRAY['Google', 'Microsoft', 'Qualcomm', 'Jane Street'], 'Official IIT Bombay Report 2024-25'),
('iit-delhi', 2025, 25.8, 22.4, 125.0, 93.4, ARRAY['Microsoft', 'Google', 'Graviton', 'Qualcomm'], 'Office of Career Services IIT Delhi Report'),
('nit-trichy', 2025, 16.8, 15.2, 54.0, 89.6, ARRAY['Amazon', 'Cisco', 'Texas Instruments'], 'NIT Trichy T&P Report 2024-25'),
('iiit-hyderabad', 2025, 33.2, 32.0, 102.0, 98.4, ARRAY['Apple', 'Google', 'Meta', 'Microsoft'], 'IIIT Hyderabad Disclosures 2024-25'),
('bits-pilani', 2025, 20.5, 18.2, 60.8, 92.1, ARRAY['Google', 'Microsoft', 'DE Shaw'], 'BITS Pilani Placement Report 2024-25'),
('coep-pune', 2025, 12.8, 11.5, 50.5, 86.4, ARRAY['Credit Suisse', 'Goldman Sachs', 'Siemens'], 'COEP T&P Report 2024-25'),
('jadavpur-university', 2025, 18.0, 16.5, 85.0, 94.2, ARRAY['Google', 'Microsoft', 'Amazon'], 'JU Placement Cell 2024-25'),
('rvce-bangalore', 2025, 14.8, 13.2, 62.0, 91.0, ARRAY['Atlassian', 'Amazon', 'Cisco'], 'RVCE Placement Report 2024-25'),
('dtu-delhi', 2025, 16.5, 14.8, 82.0, 88.2, ARRAY['Microsoft', 'Google', 'Amazon'], 'DTU T&P Report 2024-25')
ON CONFLICT (college_id, reporting_year) DO NOTHING;

-- 5. Counselling Updates
INSERT INTO public.counselling_updates (authority, title, category, summary, official_source_url, importance, deadline_date, verified) VALUES
('JoSAA', 'JoSAA 2026 Round 1 Seat Allocation Result Declared: Online Reporting Schedule', 'Seat Allotment', 'Candidates allotted seats in IITs, NITs, IIITs and GFTIs must upload mandatory documents and pay Seat Acceptance Fee (SAF) online before the deadline.', 'https://josaa.nic.in', 'Critical', '2026-10-24', true),
('JAC Delhi', 'JAC Delhi Round 3 Upgradation List Released: Strict Physical Reporting Notice', 'Document Verification', 'Candidates allotted seats at DTU, NSUT, and IIIT-Delhi in Round 3 must report physically at designated nodal centers with original demand drafts and certificates.', 'https://jacdelhi.admissions.nic.in', 'Critical', '2026-10-16', true),
('WBJEEB', 'WBJEE 2026 Decentralized Mop-Up Round Schedule for Jadavpur University & State Universities', 'Mop-Up Round', 'WBJEEB has notified autonomous university-level spot rounds for vacant general seats. Physical appearance at JU Salt Lake campus is mandatory for allotment token.', 'https://wbjeeb.nic.in', 'Important', '2026-10-28', true),
('State CET Cell (MHT-CET)', 'MHT-CET CAP Round 2 Vacancy Matrix Published for Engineering (B.E./B.Tech)', 'Seat Matrix', 'Category-wise vacant seat matrix published for COEP, VJTI, SPIT, and PICT. Domicile candidates eligible for betterment option must reorder option form before the locking window closes.', 'https://cetcell.mahacet.org', 'Important', '2026-10-22', true),
('KEA (KCET)', 'KEA Second Extended Round Option Entry Instructions & Document Verification', 'Schedule', 'Eligible candidates holding Choice 2 or 3 in Round 1 can modify priority order for engineering seats in RVCE, BMSCE, and MSRIT. Unreported seats to be forfeited per KEA Gazette Clause 14.', 'https://cetonline.karnataka.gov.in/kea', 'Informational', '2026-10-25', true),
('UPTAC', 'UPTAC (AKTU) Round 3 Seat Confirmation and Willingness (Float / Freeze) Protocol', 'Verification', 'Candidates allotted seats in IET Lucknow, KNIT Sultanpur, or BIET Jhansi must submit Willingness (Freeze / Float) and deposit Seat Acceptance Fee of ₹20,000 online.', 'https://uptac.admissions.nic.in', 'Informational', '2026-10-20', true);

-- 6. Calendar Deadlines
INSERT INTO public.calendar_deadlines (deadline_date, title, authority, milestone_type, priority) VALUES
('2026-10-15', 'JoSAA Mock Seat Allotment 2 Display', 'JoSAA', 'Mock Allotment', 'High'),
('2026-10-16', 'JAC Delhi Round 3 Seat Acceptance Fee Deadline', 'JAC Delhi', 'Fee Payment', 'High'),
('2026-10-18', 'JoSAA Final Choice Locking Cutoff (Strict 17:00 IST)', 'JoSAA', 'Choice Filling', 'High'),
('2026-10-20', 'JoSAA Round 1 Seat Allocation Result', 'JoSAA', 'Seat Acceptance', 'High'),
('2026-10-22', 'MHT-CET CAP Round 2 Option Form Submission', 'MHT-CET', 'Choice Filling', 'Medium'),
('2026-10-24', 'JoSAA Round 1 Online Reporting & Document Upload', 'JoSAA', 'Reporting', 'High'),
('2026-10-25', 'KEA KCET Second Extended Round Option Entry Closes', 'KEA', 'Choice Filling', 'Medium'),
('2026-10-29', 'CSAB Special Round Registration & Choice Filling Begins', 'CSAB', 'Registration', 'High');

-- =====================================================================
-- 7. Mentorship Lifecycle, Storage, & Community Moderation Extensions
-- =====================================================================

DO $$ BEGIN
  ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'pending';
  ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'rejected';
EXCEPTION WHEN duplicate_object THEN null;
END $$;

ALTER TABLE public.consultation_bookings 
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS student_name TEXT,
  ADD COLUMN IF NOT EXISTS student_email TEXT,
  ADD COLUMN IF NOT EXISTS rating INTEGER,
  ADD COLUMN IF NOT EXISTS feedback_comment TEXT;

ALTER TABLE public.mentor_profiles
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'approved',
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS id_card_submitted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS phone TEXT;

ALTER TABLE public.community_threads
  ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS flag_reason TEXT,
  ADD COLUMN IF NOT EXISTS flagged_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS bookmarked_by TEXT[] DEFAULT ARRAY[]::TEXT[];

ALTER TABLE public.community_replies
  ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS flag_reason TEXT;

CREATE TABLE IF NOT EXISTS public.moderation_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_title TEXT NOT NULL,
  reported_by TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  moderator_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.moderation_reports ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read moderation_reports" ON public.moderation_reports FOR SELECT USING (true);
  CREATE POLICY "Public insert moderation_reports" ON public.moderation_reports FOR INSERT WITH CHECK (true);
  CREATE POLICY "Public update moderation_reports" ON public.moderation_reports FOR UPDATE USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'mentor-verification-docs',
  'mentor-verification-docs',
  false,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  CREATE POLICY "Mentors can upload their own verification documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'mentor-verification-docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

  CREATE POLICY "Mentors read own docs and admins read all docs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'mentor-verification-docs'
    AND (
      (storage.foldername(name))[1] = auth.uid()::text
      OR EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
      )
    )
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- =====================================================================
-- 8. Admin Data Management, Authorities Registry & Audit Trail
-- =====================================================================

ALTER TABLE public.colleges
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'verified',
  ADD COLUMN IF NOT EXISTS source_document TEXT DEFAULT 'NIRF / Official Institute Website',
  ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS verified_by TEXT DEFAULT 'admin@clario.gov.in';

ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'verified',
  ADD COLUMN IF NOT EXISTS total_seats INTEGER DEFAULT 60,
  ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.cutoffs
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'verified',
  ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS verified_by TEXT DEFAULT 'admin@clario.gov.in';

CREATE TABLE IF NOT EXISTS public.counselling_authorities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  conducting_body TEXT,
  website_url TEXT NOT NULL,
  applicable_exams TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  participating_institute_types TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  verification_status TEXT DEFAULT 'verified',
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.counselling_authorities ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read authorities" ON public.counselling_authorities FOR SELECT USING (true);
  CREATE POLICY "Admin write authorities" ON public.counselling_authorities FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    OR auth.role() = 'anon'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read audit logs" ON public.admin_audit_logs FOR SELECT USING (true);
  CREATE POLICY "Admin insert audit logs" ON public.admin_audit_logs FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

INSERT INTO public.counselling_authorities (
  id, name, short_name, conducting_body, website_url, 
  applicable_exams, participating_institute_types, description, verification_status
) VALUES
('josaa', 'Joint Seat Allocation Authority', 'JoSAA', 'Ministry of Education & Joint Implementation Committee', 'https://josaa.nic.in', ARRAY['JEE Main', 'JEE Advanced'], ARRAY['IIT', 'NIT', 'IIIT', 'GFTI'], 'Centralized allocation authority for 23 IITs, 32 NITs, 26 IIITs and 38 other Government Funded Technical Institutes.', 'verified'),
('csab', 'Central Seat Allocation Board', 'CSAB', 'National Institute of Technology (Appointed Nodal NIT)', 'https://csab.nic.in', ARRAY['JEE Main'], ARRAY['NIT', 'IIIT', 'GFTI'], 'Conducts CSAB Special Rounds for vacant seats across NITs, IIITs, and GFTIs after JoSAA round completion, plus CSAB Supernumerary and NEUT rounds.', 'verified'),
('jac-delhi', 'Joint Admission Counselling Delhi', 'JAC Delhi', 'DTU, NSUT, IIITD, IGDTUW & DSEU Coordination Committee', 'https://jacdelhi.admissions.nic.in', ARRAY['JEE Main'], ARRAY['State Government', 'Autonomous Private'], 'Centralized admission counselling for Delhi technical universities (DTU, NSUT, IIIT Delhi, IGDTUW) with 85% Delhi Region reservation and 15% Outside Delhi quota.', 'verified'),
('wbjeeb', 'West Bengal Joint Entrance Examinations Board', 'WBJEEB', 'Department of Higher Education, Govt of West Bengal', 'https://wbjeeb.nic.in', ARRAY['WBJEE', 'JEE Main'], ARRAY['State Government', 'Autonomous Private'], 'Conducts centralized counselling and decentralized spot rounds for engineering admissions into Jadavpur University and state universities/colleges across West Bengal.', 'verified'),
('mht-cet', 'State Common Entrance Test Cell, Maharashtra', 'MHT-CET Cell', 'Government of Maharashtra', 'https://cetcell.mahacet.org', ARRAY['MHT-CET', 'JEE Main'], ARRAY['State Government', 'Autonomous Private'], 'Centralized Admission Process (CAP) rounds for B.Tech/B.E. admissions across COEP Pune, VJTI Mumbai, SPIT, PICT and affiliated engineering colleges.', 'verified'),
('kea', 'Karnataka Examinations Authority', 'KEA KCET', 'Government of Karnataka', 'https://cetonline.karnataka.gov.in/kea', ARRAY['KCET'], ARRAY['State Government', 'Autonomous Private'], 'Conducts CET document verification and multiple option entry rounds for Karnataka state quota engineering seats in RVCE, BMSCE, MSRIT, and university engineering faculties.', 'verified'),
('uptac', 'Uttar Pradesh Technical Admission Counselling', 'UPTAC', 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)', 'https://uptac.admissions.nic.in', ARRAY['JEE Main'], ARRAY['State Government', 'Autonomous Private'], 'Conducts B.Tech seat allotment for top Uttar Pradesh state government colleges (IET Lucknow, KNIT Sultanpur, BIET Jhansi) and affiliated colleges.', 'verified'),
('bitsat', 'BITS Admissions Council', 'BITSAT Council', 'Birla Institute of Technology and Science', 'https://bitsadmission.com', ARRAY['BITSAT'], ARRAY['BITS'], 'Conducts multi-iteration admission counselling for BITS Pilani, BITS Goa, and BITS Hyderabad campuses.', 'verified')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  website_url = EXCLUDED.website_url,
  conducting_body = EXCLUDED.conducting_body,
  description = EXCLUDED.description;



