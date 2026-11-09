import { createClient } from '@supabase/supabase-js';
import { 
  College, Mentor, CounsellingUpdate, CalendarDeadline, 
  ChecklistTask, ChoicePreference, BookingRecord, CollegeReview, 
  CommunityThread, CommunityReply, ModerationReport, AuthUser, UserRole,
  CounsellingAuthorityItem, AdminAuditLog 
} from '../types';
import { 
  INDIA_COLLEGES_DATA, 
  INDIA_MENTORS_DATA, 
  INDIA_COUNSELLING_UPDATES, 
  INDIA_CALENDAR_DEADLINES, 
  INDIA_CHECKLIST_TASKS, 
  INDIA_COMMUNITY_THREADS 
} from '../data/seedDataIndia';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseUrl = typeof rawUrl === 'string' ? rawUrl.trim() : '';
export const supabaseAnonKey = typeof rawKey === 'string' ? rawKey.trim() : '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' && 
    supabaseUrl.startsWith('https://') && 
    !supabaseUrl.includes('your-project-id') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.length > 20 &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// Create the Supabase client
export const supabase = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder-project.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// Health check helper to test live connectivity
export const testSupabaseConnection = async (): Promise<{ ok: boolean; message: string }> => {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: 'Supabase credentials missing or invalid.' };
  }
  try {
    const { error } = await supabase.auth.getSession();
    if (error) {
      return { ok: false, message: error.message };
    }
    return { ok: true, message: 'Successfully connected to live Supabase backend.' };
  } catch (err: any) {
    return { ok: false, message: err?.message || 'Connection failed.' };
  }
};

// -------------------------------------------------------------
// Local Storage Persistence Cache Keys for Offline / Demo Mode
// -------------------------------------------------------------
const STORAGE_KEYS = {
  USER_SESSION: 'clario_auth_session',
  COLLEGES: 'clario_colleges_list',
  CHOICE_LIST: 'clario_choice_list',
  SAVED_COLLEGES: 'clario_saved_colleges',
  BOOKINGS: 'clario_bookings',
  UPDATES: 'clario_updates',
  SAVED_UPDATES: 'clario_saved_update_ids',
  CHECKLIST: 'clario_checklist',
  THREADS: 'clario_threads',
  REVIEWS: 'clario_reviews',
  MENTORS: 'clario_mentors',
  REPORTS: 'clario_reports',
  AUTHORITIES: 'clario_authorities',
  AUDIT_LOGS: 'clario_audit_logs'
};

// Helper: safe JSON parse
function getLocalItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }
}

// -------------------------------------------------------------
// Unified Data Services (Supabase + Resilient Local Persistence)
// -------------------------------------------------------------

export const authService = {
  async getInitialUser(): Promise<AuthUser | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (profile) {
              return {
                id: profile.id,
                name: profile.full_name || (session.user.user_metadata?.full_name as string) || 'Student User',
                email: profile.email || session.user.email || '',
                role: (profile.role as UserRole) || (session.user.user_metadata?.role as UserRole) || 'student',
                homeState: profile.home_state || (session.user.user_metadata?.homeState as string),
                rank: profile.crl_rank ? `AIR ${profile.crl_rank}` : undefined,
                category: profile.category
              };
            }
          } catch (profileErr) {
            console.warn('Profile fetch notice:', profileErr);
          }

          // Return session user with metadata even if profiles table is not yet seeded
          return {
            id: session.user.id,
            name: (session.user.user_metadata?.full_name as string) || session.user.email?.split('@')[0] || 'Student User',
            email: session.user.email || '',
            role: (session.user.user_metadata?.role as UserRole) || 'student',
            homeState: (session.user.user_metadata?.homeState as string) || 'Maharashtra',
            rank: session.user.user_metadata?.rank as string | undefined,
            collegeOrExam: session.user.user_metadata?.collegeOrExam as string | undefined
          };
        }
      } catch (err) {
        console.warn('Supabase auth session fetch error, falling back:', err);
      }
    }

    // Fallback: check local storage session
    return getLocalItem<AuthUser | null>(STORAGE_KEYS.USER_SESSION, null);
  },

  async signIn(email: string, password?: string, roleOverride?: UserRole): Promise<{ user: AuthUser | null; error: string | null }> {
    if (isSupabaseConfigured() && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          let profile: any = null;
          try {
            const { data: p } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .maybeSingle();
            profile = p;
          } catch {
            // Non-blocking
          }

          const user: AuthUser = {
            id: data.user.id,
            name: profile?.full_name || (data.user.user_metadata?.full_name as string) || email.split('@')[0],
            email: data.user.email || email,
            role: (profile?.role as UserRole) || (data.user.user_metadata?.role as UserRole) || roleOverride || 'student',
            homeState: profile?.home_state || data.user.user_metadata?.homeState || 'Maharashtra',
            category: profile?.category
          };
          setLocalItem(STORAGE_KEYS.USER_SESSION, user);
          return { user, error: null };
        }
      } catch (err: any) {
        return { user: null, error: err.message || 'Authentication failed' };
      }
    }

    // Local / Demo Mode Login
    let user: AuthUser;
    if (roleOverride === 'mentor' || email.includes('mentor') || email.includes('aarav')) {
      user = {
        id: 'mentor-1',
        name: 'Aarav Sharma',
        email: email || 'aarav.iitb@alumni.ac.in',
        role: 'mentor',
        rank: 'AIR 42 (JEE Adv)',
        collegeOrExam: 'IIT Bombay (CSE)',
        homeState: 'Maharashtra'
      };
    } else if (roleOverride === 'admin' || email.includes('admin')) {
      user = {
        id: 'admin-super',
        name: 'System Administrator',
        email: email || 'admin@clario.gov.in',
        role: 'admin',
        collegeOrExam: 'Counselling Board'
      };
    } else {
      user = {
        id: `student-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ') || 'Aarush Sharma',
        email: email || 'aarush.sharma2026@gmail.com',
        role: 'student',
        rank: 'CRL 3,850',
        collegeOrExam: 'JEE Main',
        homeState: 'Maharashtra',
        category: 'General (OPEN)'
      };
    }

    setLocalItem(STORAGE_KEYS.USER_SESSION, user);
    return { user, error: null };
  },

  async signUp(email: string, password?: string, metadata?: { name: string; role: UserRole; homeState?: string }): Promise<{ user: AuthUser | null; error: string | null }> {
    if (isSupabaseConfigured() && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: metadata?.name || email.split('@')[0],
              role: metadata?.role || 'student',
              homeState: metadata?.homeState || 'Maharashtra'
            }
          }
        });
        if (error) throw error;
        if (data.user) {
          // If profiles table is available, attempt insert
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              full_name: metadata?.name || email.split('@')[0],
              email: data.user.email || email,
              role: metadata?.role || 'student',
              home_state: metadata?.homeState || 'Maharashtra'
            });
          } catch {
            // Ignore if schema not yet run
          }

          const user: AuthUser = {
            id: data.user.id,
            name: metadata?.name || email.split('@')[0],
            email: data.user.email || email,
            role: metadata?.role || 'student',
            homeState: metadata?.homeState || 'Maharashtra'
          };
          setLocalItem(STORAGE_KEYS.USER_SESSION, user);
          return { user, error: null };
        }
      } catch (err: any) {
        return { user: null, error: err.message || 'Registration failed' };
      }
    }

    // Local Signup fallback
    const user: AuthUser = {
      id: `usr-${Date.now()}`,
      name: metadata?.name || 'New Aspirant',
      email: email,
      role: metadata?.role || 'student',
      homeState: metadata?.homeState || 'Maharashtra'
    };
    setLocalItem(STORAGE_KEYS.USER_SESSION, user);
    return { user, error: null };
  },

  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin
        });
        if (error) throw error;
        return { success: true, message: `Password reset link sent to ${email} successfully.` };
      } catch (err: any) {
        return { success: false, message: err.message || 'Failed to send reset link.' };
      }
    }
    return { success: true, message: `Demonstration mode: Password reset email simulated for ${email}.` };
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  }
};

// -------------------------------------------------------------
// Colleges & Cutoffs Services
// -------------------------------------------------------------
export const collegeService = {
  async getColleges(): Promise<College[]> {
    // 1. Check local admin overrides in storage first
    const localColleges = getLocalItem<College[]>(STORAGE_KEYS.COLLEGES, []);
    if (localColleges && localColleges.length > 0) {
      return localColleges;
    }

    if (isSupabaseConfigured()) {
      try {
        const { data: colleges, error } = await supabase
          .from('colleges')
          .select(`
            *,
            courses (*),
            cutoffs (*),
            placement_records (*)
          `);

        if (!error && colleges && colleges.length > 0) {
          const mapped = colleges.map((c: any) => ({
            id: c.id,
            name: c.name,
            shortName: c.short_name,
            location: c.location,
            state: c.state,
            established: c.established,
            campusSizeAcres: c.campus_size_acres,
            nirfRank: c.nirf_rank,
            categoryType: c.institute_type,
            counsellingAuthority: c.counselling_authority,
            university: c.university_affiliation,
            acceptedExams: c.accepted_exams,
            image: c.image_url,
            heroImage: c.hero_image_url || c.image_url,
            overview: c.overview,
            eligibilityCriteria: c.eligibility_criteria,
            officialWebsite: c.official_website,
            verificationStatus: c.verification_status || 'verified',
            sourceDocument: c.source_document || 'Official NIRF / Institute Portal',
            lastVerifiedAt: c.last_verified_at || 'Nov 2026',
            verifiedBy: c.verified_by || 'admin@clario.gov.in',
            facilities: {
              hostelAvailable: c.hostel_available,
              acRooms: c.ac_rooms_available,
              wifiCampus: c.wifi_campus,
              sportsComplex: c.sports_complex,
              medicalCenter: c.medical_center,
              libraryVolumes: c.library_details || '1,00,000+ volumes'
            },
            courses: c.courses || [],
            cutoffs: c.cutoffs || [],
            placements: c.placement_records?.[0] || {
              reportingYear: 2025,
              avgSalaryLPA: 14.5,
              medianSalaryLPA: 12.8,
              highestSalaryLPA: 50.0,
              placementRatePercent: 88,
              topRecruiters: ['Google', 'Microsoft', 'Amazon'],
              sourceDocument: 'Annual Report'
            },
            reviewsSummary: {
              overallRating: 4.6,
              count: 120,
              breakdown: { teaching: 4.5, faculty: 4.4, attendance: 4.1, campus: 4.7, hostel: 3.8, clubs: 4.8, internships: 4.7, placements: 4.8, workload: 3.9 }
            }
          }));
          setLocalItem(STORAGE_KEYS.COLLEGES, mapped);
          return mapped;
        }
      } catch (err) {
        console.warn('Supabase college fetch notice, using rich seed dataset:', err);
      }
    }

    setLocalItem(STORAGE_KEYS.COLLEGES, INDIA_COLLEGES_DATA);
    return INDIA_COLLEGES_DATA;
  },

  saveColleges(colleges: College[]): void {
    setLocalItem(STORAGE_KEYS.COLLEGES, colleges);
  },

  async upsertCollege(college: College): Promise<boolean> {
    const colleges = getLocalItem<College[]>(STORAGE_KEYS.COLLEGES, INDIA_COLLEGES_DATA);
    const existingIdx = colleges.findIndex(c => c.id === college.id);
    let updated: College[];
    if (existingIdx >= 0) {
      updated = [...colleges];
      updated[existingIdx] = college;
    } else {
      updated = [college, ...colleges];
    }
    setLocalItem(STORAGE_KEYS.COLLEGES, updated);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('colleges').upsert({
          id: college.id,
          name: college.name,
          short_name: college.shortName,
          location: college.location,
          state: college.state,
          established: college.established,
          campus_size_acres: college.campusSizeAcres,
          nirf_rank: college.nirfRank,
          institute_type: college.categoryType,
          counselling_authority: college.counsellingAuthority,
          official_website: college.officialWebsite,
          overview: college.overview,
          eligibility_criteria: college.eligibilityCriteria,
          image_url: college.image,
          hero_image_url: college.heroImage,
          verification_status: college.verificationStatus || 'unverified',
          source_document: college.sourceDocument || 'Admin Input',
          last_verified_at: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Supabase college upsert fallback to localStorage:', e);
      }
    }
    return true;
  },

  async deleteCollege(collegeId: string): Promise<boolean> {
    const colleges = getLocalItem<College[]>(STORAGE_KEYS.COLLEGES, INDIA_COLLEGES_DATA);
    const updated = colleges.filter(c => c.id !== collegeId);
    setLocalItem(STORAGE_KEYS.COLLEGES, updated);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('colleges').delete().eq('id', collegeId);
      } catch (e) {
        console.warn('Supabase college delete error:', e);
      }
    }
    return true;
  }
};

// -------------------------------------------------------------
// Choice Preference Workspace Services
// -------------------------------------------------------------
export const choiceService = {
  getInitialChoices(): ChoicePreference[] {
    return getLocalItem<ChoicePreference[]>(STORAGE_KEYS.CHOICE_LIST, [
      {
        collegeId: 'iit-bombay',
        collegeName: 'IIT Bombay',
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        annualTuitionINR: 224000,
        medianSalaryLPA: 21.8,
        categoryTag: 'Ambitious',
        closingRank: 69
      },
      {
        collegeId: 'iiit-hyderabad',
        collegeName: 'IIIT Hyderabad',
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        annualTuitionINR: 380000,
        medianSalaryLPA: 32.0,
        categoryTag: 'Match',
        closingRank: 1680
      },
      {
        collegeId: 'nit-trichy',
        collegeName: 'NIT Trichy',
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        annualTuitionINR: 145000,
        medianSalaryLPA: 15.2,
        categoryTag: 'Match',
        closingRank: 4650
      },
      {
        collegeId: 'coep-pune',
        collegeName: 'COEP Pune',
        branchCode: 'CSE',
        branchName: 'Computer Engineering',
        annualTuitionINR: 92000,
        medianSalaryLPA: 11.5,
        categoryTag: 'Safe',
        closingRank: 195
      }
    ]);
  },

  saveChoices(choices: ChoicePreference[], studentId?: string): void {
    setLocalItem(STORAGE_KEYS.CHOICE_LIST, choices);

    // Sync to Supabase in background if authenticated
    if (isSupabaseConfigured() && studentId) {
      (async () => {
        try {
          // Delete old and re-insert preferences
          await supabase.from('choice_preferences').delete().eq('student_id', studentId);
          if (choices.length > 0) {
            const rows = choices.map((c, index) => ({
              student_id: studentId,
              preference_order: index + 1,
              college_id: c.collegeId,
              branch_code: c.branchCode,
              category_tag: c.categoryTag
            }));
            await supabase.from('choice_preferences').insert(rows);
          }
        } catch (err) {
          console.warn('Supabase choice sync failed:', err);
        }
      })();
    }
  }
};

// -------------------------------------------------------------
// Supabase Storage Service (Secure Credential Verification)
// -------------------------------------------------------------
export const storageService = {
  async uploadMentorVerificationDoc(mentorId: string, file: File): Promise<{ url: string | null; error: string | null }> {
    if (isSupabaseConfigured()) {
      try {
        const fileExt = file.name.split('.').pop() || 'png';
        const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const filePath = `${mentorId}/${Date.now()}_${cleanName}`;
        
        const { data, error } = await supabase.storage
          .from('mentor-verification-docs')
          .upload(filePath, file, {
            upsert: true,
            cacheControl: '3600'
          });

        if (!error && data?.path) {
          const { data: publicUrlData } = supabase.storage
            .from('mentor-verification-docs')
            .getPublicUrl(data.path);

          return { 
            url: publicUrlData?.publicUrl || URL.createObjectURL(file), 
            error: null 
          };
        }
      } catch (err: any) {
        console.warn('Supabase Storage notice, using client blob preview:', err);
      }
    }

    // Local / Offline resilient fallback
    try {
      const previewUrl = URL.createObjectURL(file);
      return { url: previewUrl, error: null };
    } catch {
      return { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', error: null };
    }
  }
};

// -------------------------------------------------------------
// Mentors & Bookings Services
// -------------------------------------------------------------
export const mentorService = {
  getInitialMentors(): Mentor[] {
    return getLocalItem<Mentor[]>(STORAGE_KEYS.MENTORS, INDIA_MENTORS_DATA);
  },

  saveMentors(mentors: Mentor[]): void {
    setLocalItem(STORAGE_KEYS.MENTORS, mentors);
  },

  getInitialBookings(): BookingRecord[] {
    return getLocalItem<BookingRecord[]>(STORAGE_KEYS.BOOKINGS, [
      {
        id: 'BK-8902',
        mentorId: 'mentor-1',
        mentorName: 'Aarav Sharma',
        mentorCollege: 'IIT Bombay',
        mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        studentId: 'student-aarush',
        studentName: 'Aarush Sharma',
        studentEmail: 'aarush.sharma2026@gmail.com',
        date: 'Tomorrow, 5:00 PM',
        time: '05:00 PM - 05:30 PM',
        topic: 'JoSAA Choice-Filling Strategy & Pitfalls',
        status: 'confirmed',
        priceINR: 349,
        meetLink: 'https://meet.clario.in/room/bk-8902',
        bookedAt: 'Yesterday'
      },
      {
        id: 'BK-9140',
        mentorId: 'mentor-5',
        mentorName: 'Kabir Verma',
        mentorCollege: 'DTU Delhi',
        mentorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        studentId: 'student-aarush',
        studentName: 'Aarush Sharma',
        studentEmail: 'aarush.sharma2026@gmail.com',
        date: 'Friday, 5:00 PM',
        time: '05:00 PM - 05:30 PM',
        topic: 'JAC Delhi Spot Rounds & Outside Delhi Strategy',
        status: 'pending',
        priceINR: 299,
        meetLink: 'https://meet.clario.in/room/bk-9140',
        bookedAt: 'Today'
      },
      {
        id: 'BK-7721',
        mentorId: 'mentor-3',
        mentorName: 'Sneha Rao',
        mentorCollege: 'RVCE Bangalore',
        mentorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        studentId: 'student-aarush',
        studentName: 'Aarush Sharma',
        studentEmail: 'aarush.sharma2026@gmail.com',
        date: '3 days ago',
        time: '06:00 PM - 06:30 PM',
        topic: 'KEA KCET Option Entry & RVCE Cutoffs',
        status: 'completed',
        priceINR: 299,
        meetLink: 'https://meet.clario.in/room/bk-7721',
        bookedAt: '4 days ago',
        rating: 5,
        feedbackComment: 'Sneha explained the KEA document verification process and option entry perfectly. Invaluable session!'
      }
    ]);
  },

  saveBookings(bookings: BookingRecord[]): void {
    setLocalItem(STORAGE_KEYS.BOOKINGS, bookings);
  }
};

// -------------------------------------------------------------
// Counselling Updates & Deadlines Services
// -------------------------------------------------------------
export const updateService = {
  getInitialUpdates(): CounsellingUpdate[] {
    return getLocalItem<CounsellingUpdate[]>(STORAGE_KEYS.UPDATES, INDIA_COUNSELLING_UPDATES);
  },

  async getUpdates(): Promise<CounsellingUpdate[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('counselling_updates')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((u: any) => ({
            id: u.id,
            authority: u.authority,
            title: u.title,
            category: u.category,
            publishDate: u.created_at ? new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Recent',
            lastVerified: 'Official Portal',
            deadlineDate: u.deadline_date,
            importance: u.importance,
            officialSourceUrl: u.official_source_url,
            verified: u.verified,
            isIllustrativeDemo: u.is_illustrative_demo,
            summary: u.summary
          }));
        }
      } catch (err) {
        console.warn('Supabase updates notice:', err);
      }
    }
    return getLocalItem<CounsellingUpdate[]>(STORAGE_KEYS.UPDATES, INDIA_COUNSELLING_UPDATES);
  },

  saveUpdates(updates: CounsellingUpdate[]): void {
    setLocalItem(STORAGE_KEYS.UPDATES, updates);
  },

  getInitialChecklist(): ChecklistTask[] {
    return getLocalItem<ChecklistTask[]>(STORAGE_KEYS.CHECKLIST, INDIA_CHECKLIST_TASKS);
  },

  saveChecklist(tasks: ChecklistTask[]): void {
    setLocalItem(STORAGE_KEYS.CHECKLIST, tasks);
  },

  getInitialDeadlines(): CalendarDeadline[] {
    return INDIA_CALENDAR_DEADLINES;
  },

  async getDeadlines(): Promise<CalendarDeadline[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('calendar_deadlines')
          .select('*')
          .order('deadline_date', { ascending: true });

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            date: d.deadline_date,
            title: d.title,
            authority: d.authority,
            type: d.milestone_type,
            priority: d.priority,
            is_illustrative_demo: d.is_illustrative_demo
          }));
        }
      } catch (err) {
        console.warn('Supabase deadlines notice:', err);
      }
    }
    return INDIA_CALENDAR_DEADLINES;
  }
};

// -------------------------------------------------------------
// Community Forum Services (Abstract Feature)
// -------------------------------------------------------------
export const communityService = {
  getInitialThreads(): CommunityThread[] {
    return getLocalItem<CommunityThread[]>(STORAGE_KEYS.THREADS, INDIA_COMMUNITY_THREADS);
  },

  async getThreads(): Promise<CommunityThread[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('community_threads')
          .select(`
            *,
            community_replies (*)
          `)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((t: any) => ({
            id: t.id,
            authorId: t.author_id,
            authorName: t.author_name,
            authorRole: t.author_role,
            authorBadge: t.author_badge,
            category: t.category,
            title: t.title,
            content: t.content,
            tags: t.tags || [],
            upvotes: t.upvotes_count || 0,
            repliesCount: t.replies_count || (t.community_replies?.length ?? 0),
            createdAt: t.created_at ? new Date(t.created_at).toLocaleDateString() : 'Recent',
            replies: (t.community_replies || []).map((r: any) => ({
              id: r.id,
              threadId: r.thread_id,
              authorId: r.author_id,
              authorName: r.author_name,
              authorRole: r.author_role,
              authorBadge: r.author_badge,
              content: r.content,
              isMentorReply: r.is_mentor_reply,
              upvotes: r.upvotes_count || 0,
              createdAt: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recent'
            }))
          }));
        }
      } catch (err) {
        console.warn('Supabase community notice:', err);
      }
    }
    return getLocalItem<CommunityThread[]>(STORAGE_KEYS.THREADS, INDIA_COMMUNITY_THREADS);
  },

  saveThreads(threads: CommunityThread[]): void {
    setLocalItem(STORAGE_KEYS.THREADS, threads);
  }
};

// -------------------------------------------------------------
// Admin & Moderation Services
// -------------------------------------------------------------
export const adminService = {
  getInitialReports(): ModerationReport[] {
    return getLocalItem<ModerationReport[]>(STORAGE_KEYS.REPORTS, [
      {
        id: 'rep-mod-1',
        itemType: 'thread',
        itemId: 'thread-spam-1',
        itemTitle: 'Guaranteed Management Quota in Top Tier-1 Institute',
        reportedBy: 'Devansh K (student)',
        reason: 'Commercial agent soliciting illegal management quota seats in central institutes.',
        status: 'pending',
        reportedAt: '1 hour ago'
      },
      {
        id: 'rep-mod-2',
        itemType: 'review',
        itemId: 'cr-sus-2',
        itemTitle: 'Hostel Review - Unverified Defamation',
        reportedBy: 'Aarav Sharma (mentor)',
        reason: 'Review uses inappropriate language and unsubstantiated claims against staff.',
        status: 'pending',
        reportedAt: '3 hours ago'
      }
    ]);
  },

  saveReports(reports: ModerationReport[]): void {
    setLocalItem(STORAGE_KEYS.REPORTS, reports);
  }
};

// -------------------------------------------------------------
// Authorities & Audit Trail Services
// -------------------------------------------------------------
export const INITIAL_AUTHORITIES: CounsellingAuthorityItem[] = [
  {
    id: 'josaa',
    name: 'Joint Seat Allocation Authority',
    shortName: 'JoSAA',
    conductingBody: 'Ministry of Education & Joint Implementation Committee',
    websiteUrl: 'https://josaa.nic.in',
    applicableExams: ['JEE Main', 'JEE Advanced'],
    participatingInstituteTypes: ['IIT', 'NIT', 'IIIT', 'GFTI'],
    description: 'Centralized single-window seat allocation for 23 IITs, 32 NITs, 26 IIITs and 38 GFTIs across India.',
    isActive: true,
    verificationStatus: 'verified',
    lastVerifiedAt: 'Nov 2026'
  },
  {
    id: 'csab',
    name: 'Central Seat Allocation Board',
    shortName: 'CSAB',
    conductingBody: 'NIT Central Committee (Nodal NIT)',
    websiteUrl: 'https://csab.nic.in',
    applicableExams: ['JEE Main'],
    participatingInstituteTypes: ['NIT', 'IIIT', 'GFTI'],
    description: 'Conducts CSAB Special Rounds for vacant seats across NITs, IIITs, and GFTIs post-JoSAA, along with NEUT and SFTI admissions.',
    isActive: true,
    verificationStatus: 'verified',
    lastVerifiedAt: 'Nov 2026'
  },
  {
    id: 'jac-delhi',
    name: 'Joint Admission Counselling Delhi',
    shortName: 'JAC Delhi',
    conductingBody: 'DTU, NSUT, IIITD, IGDTUW & DSEU Coordination Committee',
    websiteUrl: 'https://jacdelhi.admissions.nic.in',
    applicableExams: ['JEE Main'],
    participatingInstituteTypes: ['State Government', 'Autonomous Private'],
    description: 'Centralized engineering admissions for premier Delhi technical universities with 85% Delhi Region and 15% Outside Delhi quotas.',
    isActive: true,
    verificationStatus: 'verified',
    lastVerifiedAt: 'Nov 2026'
  },
  {
    id: 'wbjeeb',
    name: 'West Bengal Joint Entrance Examinations Board',
    shortName: 'WBJEEB',
    conductingBody: 'Department of Higher Education, Govt of West Bengal',
    websiteUrl: 'https://wbjeeb.nic.in',
    applicableExams: ['WBJEE', 'JEE Main'],
    participatingInstituteTypes: ['State Government', 'Autonomous Private'],
    description: 'Centralized counselling and university spot allocation for Jadavpur University and state engineering colleges.',
    isActive: true,
    verificationStatus: 'verified',
    lastVerifiedAt: 'Nov 2026'
  },
  {
    id: 'mht-cet',
    name: 'State Common Entrance Test Cell, Maharashtra',
    shortName: 'State CET Cell (MHT-CET)',
    conductingBody: 'Government of Maharashtra',
    websiteUrl: 'https://cetcell.mahacet.org',
    applicableExams: ['MHT-CET', 'JEE Main'],
    participatingInstituteTypes: ['State Government', 'Autonomous Private'],
    description: 'Conducts CAP Rounds 1, 2, and 3 for COEP Pune, VJTI Mumbai, SPIT, PICT, and affiliated Maharashtra engineering institutes.',
    isActive: true,
    verificationStatus: 'verified',
    lastVerifiedAt: 'Nov 2026'
  },
  {
    id: 'kea',
    name: 'Karnataka Examinations Authority',
    shortName: 'KEA (KCET)',
    conductingBody: 'Government of Karnataka',
    websiteUrl: 'https://cetonline.karnataka.gov.in/kea',
    applicableExams: ['KCET'],
    participatingInstituteTypes: ['State Government', 'Autonomous Private'],
    description: 'Centralized option entry and document verification for Karnataka state quota engineering seats in RVCE, BMSCE, and MSRIT.',
    isActive: true,
    verificationStatus: 'verified',
    lastVerifiedAt: 'Nov 2026'
  },
  {
    id: 'uptac',
    name: 'Uttar Pradesh Technical Admission Counselling',
    shortName: 'UPTAC',
    conductingBody: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    websiteUrl: 'https://uptac.admissions.nic.in',
    applicableExams: ['JEE Main'],
    participatingInstituteTypes: ['State Government', 'Autonomous Private'],
    description: 'Coordinates B.Tech counselling and seat allotment for IET Lucknow, KNIT Sultanpur, BIET Jhansi, and Uttar Pradesh universities.',
    isActive: true,
    verificationStatus: 'verified',
    lastVerifiedAt: 'Nov 2026'
  },
  {
    id: 'bitsat',
    name: 'BITS Admissions Council',
    shortName: 'BITSAT Council',
    conductingBody: 'Birla Institute of Technology and Science',
    websiteUrl: 'https://bitsadmission.com',
    applicableExams: ['BITSAT'],
    participatingInstituteTypes: ['BITS'],
    description: 'Coordinates iteration-based admission offers and waitlists across BITS Pilani, BITS Goa, and BITS Hyderabad campuses.',
    isActive: true,
    verificationStatus: 'verified',
    lastVerifiedAt: 'Nov 2026'
  }
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-001',
    timestamp: 'Nov 9, 2026 • 18:30 IST',
    adminEmail: 'admin@clario.gov.in',
    action: 'CREATE_COLLEGE',
    entityType: 'college',
    entityId: 'iit-bombay',
    details: 'Initial system seeding: Added IIT Bombay with official 2025 JoSAA cutoffs and NIRF #3 verification.'
  },
  {
    id: 'log-002',
    timestamp: 'Nov 9, 2026 • 19:15 IST',
    adminEmail: 'admin@clario.gov.in',
    action: 'UPDATE_VERIFICATION',
    entityType: 'cutoff',
    entityId: 'nit-trichy-cse-2025',
    details: 'Verified Round 6 Opening/Closing ranks against official CSAB Gazette Archive.'
  },
  {
    id: 'log-003',
    timestamp: 'Nov 9, 2026 • 20:45 IST',
    adminEmail: 'admin@clario.gov.in',
    action: 'PUBLISH_NOTICE',
    entityType: 'update',
    entityId: 'notice-josaa-saf',
    details: 'Published critical official notice regarding mandatory JoSAA Seat Acceptance Fee deadline.'
  }
];

export const authorityService = {
  async getAuthorities(): Promise<CounsellingAuthorityItem[]> {
    const cached = getLocalItem<CounsellingAuthorityItem[]>(STORAGE_KEYS.AUTHORITIES, []);
    if (cached && cached.length > 0) return cached;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('counselling_authorities').select('*');
        if (!error && data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            shortName: d.short_name,
            conductingBody: d.conducting_body,
            websiteUrl: d.website_url,
            applicableExams: d.applicable_exams || [],
            participatingInstituteTypes: d.participating_institute_types || [],
            description: d.description || '',
            isActive: d.is_active ?? true,
            verificationStatus: d.verification_status || 'verified',
            lastVerifiedAt: d.last_verified_at || 'Nov 2026'
          }));
          setLocalItem(STORAGE_KEYS.AUTHORITIES, mapped);
          return mapped;
        }
      } catch (e) {
        console.warn('Supabase authorities fetch fallback:', e);
      }
    }

    setLocalItem(STORAGE_KEYS.AUTHORITIES, INITIAL_AUTHORITIES);
    return INITIAL_AUTHORITIES;
  },

  saveAuthorities(items: CounsellingAuthorityItem[]): void {
    setLocalItem(STORAGE_KEYS.AUTHORITIES, items);
  },

  async upsertAuthority(item: CounsellingAuthorityItem): Promise<boolean> {
    const list = getLocalItem<CounsellingAuthorityItem[]>(STORAGE_KEYS.AUTHORITIES, INITIAL_AUTHORITIES);
    const idx = list.findIndex(a => a.id === item.id);
    let updated: CounsellingAuthorityItem[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = item;
    } else {
      updated = [item, ...list];
    }
    setLocalItem(STORAGE_KEYS.AUTHORITIES, updated);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('counselling_authorities').upsert({
          id: item.id,
          name: item.name,
          short_name: item.shortName,
          conducting_body: item.conductingBody,
          website_url: item.websiteUrl,
          applicable_exams: item.applicableExams,
          participating_institute_types: item.participatingInstituteTypes,
          description: item.description,
          is_active: item.isActive,
          verification_status: item.verificationStatus,
          last_verified_at: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Supabase authority upsert fallback:', e);
      }
    }
    return true;
  },

  async deleteAuthority(id: string): Promise<boolean> {
    const list = getLocalItem<CounsellingAuthorityItem[]>(STORAGE_KEYS.AUTHORITIES, INITIAL_AUTHORITIES);
    const updated = list.filter(a => a.id !== id);
    setLocalItem(STORAGE_KEYS.AUTHORITIES, updated);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('counselling_authorities').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase authority delete fallback:', e);
      }
    }
    return true;
  }
};

export const auditService = {
  async getAuditLogs(): Promise<AdminAuditLog[]> {
    const cached = getLocalItem<AdminAuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, []);
    if (cached && cached.length > 0) return cached;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('admin_audit_logs')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            timestamp: new Date(d.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            adminEmail: d.admin_email,
            action: d.action,
            entityType: d.entity_type,
            entityId: d.entity_id,
            details: d.details
          }));
          setLocalItem(STORAGE_KEYS.AUDIT_LOGS, mapped);
          return mapped;
        }
      } catch (e) {
        console.warn('Supabase audit logs fetch fallback:', e);
      }
    }

    setLocalItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    return INITIAL_AUDIT_LOGS;
  },

  async addAuditLog(entry: Omit<AdminAuditLog, 'id' | 'timestamp'>): Promise<AdminAuditLog> {
    const now = new Date();
    const newLog: AdminAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ...entry
    };

    const existing = getLocalItem<AdminAuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    const updated = [newLog, ...existing];
    setLocalItem(STORAGE_KEYS.AUDIT_LOGS, updated);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('admin_audit_logs').insert({
          admin_email: entry.adminEmail,
          action: entry.action,
          entity_type: entry.entityType,
          entity_id: entry.entityId,
          details: entry.details
        });
      } catch (e) {
        console.warn('Supabase audit log insert fallback:', e);
      }
    }
    return newLog;
  }
};
