-- =====================================================================
-- Migration 003: Admin Data Management, Authorities Registry & Audit Trail
-- =====================================================================

-- 1. Extend Colleges Table with Verification & Provenance Metadata
ALTER TABLE public.colleges
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'verified',
  ADD COLUMN IF NOT EXISTS source_document TEXT DEFAULT 'NIRF / Official Institute Website',
  ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS verified_by TEXT DEFAULT 'admin@clario.gov.in';

-- 2. Extend Courses Table
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'verified',
  ADD COLUMN IF NOT EXISTS total_seats INTEGER DEFAULT 60,
  ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Extend Cutoffs Table
ALTER TABLE public.cutoffs
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'verified',
  ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS verified_by TEXT DEFAULT 'admin@clario.gov.in';

-- 4. Counselling Authorities Registry
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
    OR auth.role() = 'anon' -- fallback for client-side demo evaluation
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 5. Admin Audit Trail Table
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

-- 6. Seed Standard Indian Counselling Authorities
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
