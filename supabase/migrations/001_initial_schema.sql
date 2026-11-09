-- =====================================================================
-- Clario: Integrated Engineering College Counselling Platform
-- Complete PostgreSQL Supabase Schema (DDL)
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
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
    'KEA (KCET)', 
    'DTE TNEA', 
    'BITSAT Council',
    'MCC NEET'
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

-- 12. RLS POLICIES
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
EXCEPTION WHEN duplicate_object THEN null;
END $$;
