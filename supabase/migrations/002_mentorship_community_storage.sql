-- =====================================================================
-- Migration 002: Mentorship Lifecycle, Community Ecosystem & Secure Storage
-- =====================================================================

-- 1. Extend booking_status enum if not present
DO $$ BEGIN
  ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'pending';
  ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'rejected';
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. Extend consultation_bookings table
ALTER TABLE public.consultation_bookings 
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS student_name TEXT,
  ADD COLUMN IF NOT EXISTS student_email TEXT,
  ADD COLUMN IF NOT EXISTS rating INTEGER,
  ADD COLUMN IF NOT EXISTS feedback_comment TEXT;

-- 3. Extend mentor_profiles table
ALTER TABLE public.mentor_profiles
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'approved',
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS id_card_submitted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS phone TEXT;

-- 4. Extend community_threads table
ALTER TABLE public.community_threads
  ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS flag_reason TEXT,
  ADD COLUMN IF NOT EXISTS flagged_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS bookmarked_by TEXT[] DEFAULT ARRAY[]::TEXT[];

-- 5. Extend community_replies table
ALTER TABLE public.community_replies
  ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS flag_reason TEXT;

-- 6. Moderation Reports Table
CREATE TABLE IF NOT EXISTS public.moderation_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_type TEXT NOT NULL, -- 'thread', 'reply', 'review', 'mentor'
  item_id TEXT NOT NULL,
  item_title TEXT NOT NULL,
  reported_by TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
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

-- 7. Supabase Storage Bucket for Private Mentor Verification Documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'mentor-verification-docs',
  'mentor-verification-docs',
  false,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Restrict read to owner mentor + admin
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
