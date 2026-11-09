import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  College, Mentor, CounsellingUpdate, CalendarDeadline, 
  ChecklistTask, ChoicePreference, BookingRecord, CollegeReview, 
  CommunityThread, CommunityReply, ModerationReport, ExamType, CategoryType, AuthUser, UserRole,
  BranchCourse, CutoffEntry, RecordVerificationStatus, CounsellingAuthorityItem, AdminAuditLog 
} from '../types';
import { 
  authService, collegeService, choiceService, mentorService, 
  updateService, communityService, adminService, storageService, 
  authorityService, auditService,
  isSupabaseConfigured, testSupabaseConnection, supabase 
} from '../lib/supabase';
import { COLLEGE_REVIEWS_DATA } from '../data/mockData';

export type AppView = 
  | 'landing' 
  | 'explore' 
  | 'choice-workspace' 
  | 'compare' 
  | 'mentors' 
  | 'community'
  | 'updates' 
  | 'calendar' 
  | 'updates-deadlines'
  | 'reviews' 
  | 'dashboard'
  | 'mentor-dashboard'
  | 'admin-dashboard'
  | 'auth';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  
  // Auth State
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  login: (role: UserRole, userDetails?: Partial<AuthUser>, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password?: string, metadata?: { name: string; role: UserRole; homeState?: string }) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isBackendConnected: boolean;
  
  // Colleges Catalog
  colleges: College[];
  isLoadingColleges: boolean;
  
  // Student Profile & Shortlist inputs
  exam: ExamType;
  setExam: (exam: ExamType) => void;
  studentRank: number;
  setStudentRank: (rank: number) => void;
  category: CategoryType;
  setCategory: (cat: CategoryType) => void;
  homeState: string;
  setHomeState: (state: string) => void;
  preferredBranches: string[];
  setPreferredBranches: (branches: string[]) => void;
  maxBudgetINR: number;
  setMaxBudgetINR: (budget: number) => void;
  hostelRequired: boolean;
  setHostelRequired: (req: boolean) => void;
  
  // Saved & Choice list
  savedCollegeIds: string[];
  toggleSaveCollege: (collegeId: string) => void;
  choiceList: ChoicePreference[];
  addToChoiceList: (college: College, branchCode: string) => void;
  removeFromChoiceList: (index: number) => void;
  moveChoiceUp: (index: number) => void;
  moveChoiceDown: (index: number) => void;
  reorderChoiceList: (newList: ChoicePreference[]) => void;
  clearChoiceList: () => void;
  removeCollegeFromShortlist: (collegeId: string, branchCode?: string) => void;
  
  // Comparison
  comparisonCollegeIds: string[];
  addToComparison: (collegeId: string) => void;
  removeFromComparison: (collegeId: string) => void;
  clearComparison: () => void;
  
  // Selected College Modal & Dedicated Cutoff Modal
  selectedCollege: College | null;
  setSelectedCollege: (college: College | null) => void;
  selectedCutoffCollege: College | null;
  setSelectedCutoffCollege: (college: College | null) => void;
  cutoffModalBranch?: string;
  setCutoffModalBranch: (branch?: string) => void;
  
  // Mentors & Bookings
  mentors: Mentor[];
  selectedMentor: Mentor | null;
  setSelectedMentor: (mentor: Mentor | null) => void;
  bookings: BookingRecord[];
  createBooking: (mentorId: string, slotId: string, topic: string) => BookingRecord;
  acceptBooking: (bookingId: string) => void;
  rejectBooking: (bookingId: string, reason?: string) => void;
  cancelBooking: (bookingId: string) => void;
  submitSessionFeedback: (bookingId: string, rating: number, comment: string) => void;
  updateMentorProfile: (mentorId: string, updated: Partial<Mentor>) => void;
  addMentorSlot: (mentorId: string, date: string, time: string) => void;
  deleteMentorSlot: (mentorId: string, slotId: string) => void;
  submitMentorCredentials: (mentorId: string, file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  activeCallBooking: BookingRecord | null;
  setActiveCallBooking: (booking: BookingRecord | null) => void;
  
  // Updates & Deadlines
  updates: CounsellingUpdate[];
  savedUpdateIds: string[];
  toggleSaveUpdateReminder: (updateId: string) => void;
  checklistTasks: ChecklistTask[];
  toggleChecklistTask: (taskId: string) => void;
  deadlines: CalendarDeadline[];
  
  // Reviews & Community Forum
  reviews: CollegeReview[];
  upvoteReview: (reviewId: string) => void;
  addReview: (newReview: Omit<CollegeReview, 'id' | 'date' | 'helpfulVotes'>) => void;
  threads: CommunityThread[];
  addThread: (newThread: { title: string; content: string; category: CommunityThread['category']; tags: string[] }) => void;
  addReply: (threadId: string, content: string) => void;
  upvoteThread: (threadId: string) => void;
  toggleBookmarkThread: (threadId: string) => void;
  bookmarkedThreadIds: string[];
  reportItem: (itemType: 'thread' | 'reply' | 'review' | 'mentor', itemId: string, itemTitle: string, reason: string) => void;
  
  // Admin Operations
  pendingMentors: Mentor[];
  verifyMentor: (mentorId: string, approved: boolean, notes?: string) => void;
  addCounsellingUpdate: (update: Omit<CounsellingUpdate, 'id'>) => void;
  updateCounsellingUpdate: (updateId: string, updates: Partial<CounsellingUpdate>) => void;
  deleteCounsellingUpdate: (updateId: string) => void;
  moderationReports: ModerationReport[];
  resolveModerationReport: (reportId: string, action: 'dismiss' | 'remove', notes?: string) => void;

  // Admin Data Management Module
  addCollege: (collegeData: Partial<College>) => Promise<boolean>;
  updateCollege: (collegeId: string, updates: Partial<College>) => Promise<boolean>;
  deleteCollege: (collegeId: string) => Promise<boolean>;
  addCollegeBranch: (collegeId: string, branch: BranchCourse) => Promise<boolean>;
  updateCollegeBranch: (collegeId: string, branchCode: string, branch: Partial<BranchCourse>) => Promise<boolean>;
  deleteCollegeBranch: (collegeId: string, branchCode: string) => Promise<boolean>;
  addCutoffRecord: (collegeId: string, cutoff: CutoffEntry) => Promise<boolean>;
  deleteCutoffRecord: (collegeId: string, cutoffIndex: number) => Promise<boolean>;
  importCollegesCSV: (rows: any[], options: { markAs: RecordVerificationStatus; skipDuplicates: boolean }) => Promise<{ importedCount: number; skippedCount: number; errorCount: number }>;
  importCutoffsCSV: (rows: any[], options: { markAs: RecordVerificationStatus; skipDuplicates: boolean }) => Promise<{ importedCount: number; skippedCount: number; errorCount: number }>;
  authorities: CounsellingAuthorityItem[];
  addAuthority: (auth: CounsellingAuthorityItem) => Promise<boolean>;
  updateAuthority: (auth: CounsellingAuthorityItem) => Promise<boolean>;
  deleteAuthority: (id: string) => Promise<boolean>;
  updateRecordVerification: (entityType: 'college' | 'cutoff' | 'update' | 'authority', entityId: string, status: RecordVerificationStatus, notes?: string) => Promise<boolean>;
  auditLogs: AdminAuditLog[];
  logAdminAction: (action: AdminAuditLog['action'], entityType: AdminAuditLog['entityType'], entityId: string, details: string) => Promise<void>;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(isSupabaseConfigured());
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Colleges
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState<boolean>(true);

  // Student filter inputs
  const [exam, setExam] = useState<ExamType>('JEE Main');
  const [studentRank, setStudentRank] = useState<number>(3850);
  const [category, setCategory] = useState<CategoryType>('General (OPEN)');
  const [homeState, setHomeState] = useState<string>('Maharashtra');
  const [preferredBranches, setPreferredBranches] = useState<string[]>(['CSE', 'ECE', 'AI']);
  const [maxBudgetINR, setMaxBudgetINR] = useState<number>(400000);
  const [hostelRequired, setHostelRequired] = useState<boolean>(true);

  // Choice list & Saved colleges
  const [savedCollegeIds, setSavedCollegeIds] = useState<string[]>(['iit-bombay', 'nit-trichy', 'coep-pune']);
  const [choiceList, setChoiceList] = useState<ChoicePreference[]>(choiceService.getInitialChoices());
  
  // Comparison & Modals
  const [comparisonCollegeIds, setComparisonCollegeIds] = useState<string[]>(['iit-bombay', 'nit-trichy', 'coep-pune']);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedCutoffCollege, setSelectedCutoffCollege] = useState<College | null>(null);
  const [cutoffModalBranch, setCutoffModalBranch] = useState<string | undefined>(undefined);
  
  // Mentors & Bookings
  const [mentors, setMentors] = useState<Mentor[]>(mentorService.getInitialMentors());
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>(mentorService.getInitialBookings());
  const [activeCallBooking, setActiveCallBooking] = useState<BookingRecord | null>(null);
  
  // Updates & Deadlines
  const [updates, setUpdates] = useState<CounsellingUpdate[]>(updateService.getInitialUpdates());
  const [savedUpdateIds, setSavedUpdateIds] = useState<string[]>(['upd-1', 'upd-2']);
  const [checklistTasks, setChecklistTasks] = useState<ChecklistTask[]>(updateService.getInitialChecklist());
  const [deadlines, setDeadlines] = useState<CalendarDeadline[]>(updateService.getInitialDeadlines());
  
  // Reviews & Discussions
  const [reviews, setReviews] = useState<CollegeReview[]>(COLLEGE_REVIEWS_DATA);
  const [threads, setThreads] = useState<CommunityThread[]>(communityService.getInitialThreads());
  const [bookmarkedThreadIds, setBookmarkedThreadIds] = useState<string[]>(['thread-1']);
  const [moderationReports, setModerationReports] = useState<ModerationReport[]>(adminService.getInitialReports());
  const [authorities, setAuthorities] = useState<CounsellingAuthorityItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize Auth & Data on Mount
  useEffect(() => {
    let isMounted = true;

    async function init() {
      // 1. Verify live Supabase backend connection
      if (isSupabaseConfigured()) {
        try {
          const status = await testSupabaseConnection();
          if (isMounted) {
            setIsBackendConnected(status.ok);
          }
        } catch {
          if (isMounted) setIsBackendConnected(false);
        }
      }

      // 2. Load user session
      const initialUser = await authService.getInitialUser();
      if (isMounted) {
        if (initialUser) {
          setCurrentUser(initialUser);
          setUserRole(initialUser.role);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }

      // 3. Load colleges from Supabase (or fallback)
      try {
        const loadedColleges = await collegeService.getColleges();
        if (isMounted) setColleges(loadedColleges);
      } catch (err) {
        console.error('Failed to load colleges:', err);
      } finally {
        if (isMounted) setIsLoadingColleges(false);
      }

      // 4. Load updates, deadlines, threads, authorities, and audit logs
      try {
        const [loadedUpdates, loadedDeadlines, loadedThreads, loadedAuths, loadedLogs] = await Promise.all([
          updateService.getUpdates(),
          updateService.getDeadlines(),
          communityService.getThreads(),
          authorityService.getAuthorities(),
          auditService.getAuditLogs()
        ]);
        if (isMounted) {
          if (loadedUpdates?.length) setUpdates(loadedUpdates);
          if (loadedDeadlines?.length) setDeadlines(loadedDeadlines);
          if (loadedThreads?.length) setThreads(loadedThreads);
          if (loadedAuths?.length) setAuthorities(loadedAuths);
          if (loadedLogs?.length) setAuditLogs(loadedLogs);
        }
      } catch (err) {
        console.warn('Initial data sync notice:', err);
      }
    }

    init();

    // 5. Listen to Supabase Auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const u = await authService.getInitialUser();
        if (isMounted && u) {
          setCurrentUser(u);
          setUserRole(u.role);
          setIsAuthenticated(true);
        }
      } else if (event === 'SIGNED_OUT') {
        if (isMounted) {
          setCurrentUser(null);
          setIsAuthenticated(false);
          setUserRole('student');
        }
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };
  
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = async (role: UserRole, userDetails?: Partial<AuthUser>, password?: string): Promise<{ success: boolean; error?: string }> => {
    const email = userDetails?.email || (role === 'student' ? 'aarush.sharma2026@gmail.com' : role === 'mentor' ? 'aarav.iitb@alumni.ac.in' : 'admin@clario.gov.in');
    const { user, error } = await authService.signIn(email, password, role);

    if (error) {
      showToast(error, 'warning');
      return { success: false, error };
    }

    if (user) {
      const mergedUser: AuthUser = {
        ...user,
        name: userDetails?.name || user.name,
        role: role,
        rank: userDetails?.rank || user.rank,
        collegeOrExam: userDetails?.collegeOrExam || user.collegeOrExam,
        homeState: userDetails?.homeState || user.homeState || 'Maharashtra'
      };
      setUserRole(role);
      setIsAuthenticated(true);
      setCurrentUser(mergedUser);

      if (role === 'student') {
        setCurrentView('dashboard');
        showToast(`Welcome back, ${mergedUser.name}! Session authenticated as Aspirant.`, 'success');
      } else if (role === 'mentor') {
        setCurrentView('mentor-dashboard');
        showToast(`Welcome, ${mergedUser.name}! Verified Student Mentor portal active.`, 'success');
      } else if (role === 'admin') {
        setCurrentView('admin-dashboard');
        showToast('System Administrator console unlocked.', 'success');
      }
      return { success: true };
    }
    return { success: false, error: 'Login failed' };
  };

  const signUp = async (email: string, password?: string, metadata?: { name: string; role: UserRole; homeState?: string }): Promise<{ success: boolean; error?: string }> => {
    const { user, error } = await authService.signUp(email, password, metadata);
    if (error) {
      showToast(error, 'warning');
      return { success: false, error };
    }
    if (user) {
      setUserRole(user.role);
      setIsAuthenticated(true);
      setCurrentUser(user);
      if (user.role === 'student') setCurrentView('dashboard');
      else if (user.role === 'mentor') setCurrentView('mentor-dashboard');
      else setCurrentView('admin-dashboard');
      showToast(`Account created successfully! Welcome to Clario, ${user.name}.`, 'success');
      return { success: true };
    }
    return { success: false, error: 'Signup failed' };
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    const res = await authService.resetPassword(email);
    showToast(res.message, res.success ? 'success' : 'warning');
    return res;
  };

  const logout = async () => {
    await authService.signOut();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentView('landing');
    showToast('You have been logged out securely.', 'info');
  };

  const toggleSaveCollege = (collegeId: string) => {
    setSavedCollegeIds((prev) => {
      const exists = prev.includes(collegeId);
      if (exists) {
        showToast('College removed from saved list', 'info');
        return prev.filter((id) => id !== collegeId);
      } else {
        showToast('College added to your saved shortlist', 'success');
        return [...prev, collegeId];
      }
    });
  };

  const addToChoiceList = (college: College, branchCode: string) => {
    const branch = college.courses.find((b) => b.branchCode === branchCode) || college.courses[0];
    
    // Duplicate check
    const isDuplicate = choiceList.some(
      (c) => c.collegeId === college.id && c.branchCode === branchCode
    );
    
    if (isDuplicate) {
      showToast(`Warning: ${college.shortName} (${branchCode}) is already in your choice list!`, 'warning');
      return;
    }
    
    const cutoffEntry = college.cutoffs.find(
      (c) => c.branchCode === branchCode && (c.category === category || c.category === 'General (OPEN)')
    ) || college.cutoffs[0];
    
    const closingRank = cutoffEntry ? cutoffEntry.closingRank : 5000;
    
    let tag: 'Ambitious' | 'Match' | 'Safe' = 'Match';
    if (closingRank < studentRank * 0.7) {
      tag = 'Ambitious';
    } else if (closingRank > studentRank * 1.3) {
      tag = 'Safe';
    }
    
    const newChoice: ChoicePreference = {
      collegeId: college.id,
      collegeName: college.shortName,
      branchCode: branch.branchCode,
      branchName: branch.branchName,
      annualTuitionINR: branch.annualTuitionINR,
      medianSalaryLPA: college.placements.medianSalaryLPA,
      categoryTag: tag,
      closingRank: closingRank
    };
    
    const updated = [...choiceList, newChoice];
    setChoiceList(updated);
    choiceService.saveChoices(updated, currentUser?.id);
    showToast(`Added ${college.shortName} - ${branchCode} to your choice list (#${updated.length})`, 'success');
  };

  const removeFromChoiceList = (index: number) => {
    const updated = choiceList.filter((_, i) => i !== index);
    setChoiceList(updated);
    choiceService.saveChoices(updated, currentUser?.id);
    showToast('Choice preference removed', 'info');
  };

  const removeCollegeFromShortlist = (collegeId: string, branchCode?: string) => {
    const updated = choiceList.filter((c) => {
      if (branchCode) {
        return !(c.collegeId === collegeId && c.branchCode === branchCode);
      }
      return c.collegeId !== collegeId;
    });
    setChoiceList(updated);
    choiceService.saveChoices(updated, currentUser?.id);
    showToast('Removed from shortlist', 'info');
  };

  const moveChoiceUp = (index: number) => {
    if (index === 0) return;
    const updated = [...choiceList];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setChoiceList(updated);
    choiceService.saveChoices(updated, currentUser?.id);
  };

  const moveChoiceDown = (index: number) => {
    if (index >= choiceList.length - 1) return;
    const updated = [...choiceList];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setChoiceList(updated);
    choiceService.saveChoices(updated, currentUser?.id);
  };

  const reorderChoiceList = (newList: ChoicePreference[]) => {
    setChoiceList(newList);
    choiceService.saveChoices(newList, currentUser?.id);
  };

  const clearChoiceList = () => {
    setChoiceList([]);
    choiceService.saveChoices([], currentUser?.id);
    showToast('Choice list reset', 'info');
  };

  const addToComparison = (collegeId: string) => {
    if (comparisonCollegeIds.includes(collegeId)) {
      showToast('College already in comparison tool', 'info');
      return;
    }
    if (comparisonCollegeIds.length >= 4) {
      showToast('Maximum 4 colleges can be compared at once', 'warning');
      return;
    }
    setComparisonCollegeIds((prev) => [...prev, collegeId]);
    showToast('College added to comparison matrix', 'success');
  };

  const removeFromComparison = (collegeId: string) => {
    setComparisonCollegeIds((prev) => prev.filter((id) => id !== collegeId));
  };

  const clearComparison = () => {
    setComparisonCollegeIds([]);
  };

  const createBooking = (mentorId: string, slotId: string, topic: string): BookingRecord => {
    const mentor = mentors.find((m) => m.id === mentorId) || mentors[0];
    const slot = mentor.availableSlots.find((s) => s.id === slotId) || mentor.availableSlots[0];
    
    // Mark slot booked
    const updatedMentors = mentors.map((m) => {
      if (m.id === mentorId) {
        return {
          ...m,
          availableSlots: m.availableSlots.map((s) =>
            s.id === slotId ? { ...s, isBooked: true } : s
          )
        };
      }
      return m;
    });
    setMentors(updatedMentors);
    mentorService.saveMentors(updatedMentors);
    
    const bookingCode = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingRecord = {
      id: bookingCode,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorCollege: mentor.collegeName,
      mentorAvatar: mentor.avatar,
      studentId: currentUser?.id || 'student-aarush',
      studentName: currentUser?.name || 'Aarush Sharma',
      studentEmail: currentUser?.email || 'aarush.sharma2026@gmail.com',
      date: slot.date,
      time: slot.time,
      topic: topic || mentor.topics[0],
      status: 'pending', // Starts as pending session request
      priceINR: mentor.priceINR,
      meetLink: `https://meet.clario.in/room/${bookingCode.toLowerCase()}`,
      bookedAt: 'Just now'
    };
    
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    mentorService.saveBookings(updatedBookings);
    showToast(`Session request sent to ${mentor.name}! Track approval in your Aspirant Dashboard.`, 'success');
    return newBooking;
  };

  const acceptBooking = (bookingId: string) => {
    const updated = bookings.map((b) => 
      b.id === bookingId ? { ...b, status: 'confirmed' as const } : b
    );
    setBookings(updated);
    mentorService.saveBookings(updated);
    const target = bookings.find(b => b.id === bookingId);
    showToast(`Session request accepted! Meeting room link generated for ${target?.studentName || 'aspirant'}.`, 'success');
  };

  const rejectBooking = (bookingId: string, reason?: string) => {
    const target = bookings.find(b => b.id === bookingId);
    const updated = bookings.map((b) => 
      b.id === bookingId 
        ? { ...b, status: 'rejected' as const, rejectionReason: reason || 'Mentor unavailable during this specific slot.' } 
        : b
    );
    setBookings(updated);
    mentorService.saveBookings(updated);

    // Free up slot on mentor profile
    if (target) {
      setMentors((prev) => prev.map((m) => {
        if (m.id === target.mentorId) {
          return {
            ...m,
            availableSlots: m.availableSlots.map((s) => 
              s.date === target.date && s.time === target.time ? { ...s, isBooked: false } : s
            )
          };
        }
        return m;
      }));
    }

    showToast('Consultation request declined with note to candidate.', 'info');
  };

  const cancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b));
    setBookings(updated);
    mentorService.saveBookings(updated);
    showToast('Session cancelled. Full refund initiated per Clario policy.', 'info');
  };

  const submitSessionFeedback = (bookingId: string, rating: number, comment: string) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    if (!targetBooking) return;

    // Update booking record
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, rating, feedbackComment: comment } : b
    );
    setBookings(updatedBookings);
    mentorService.saveBookings(updatedBookings);

    // Add review to mentor
    const updatedMentors = mentors.map(m => {
      if (m.id === targetBooking.mentorId) {
        const newReview = {
          id: `rev-${Date.now()}`,
          studentName: currentUser?.name || targetBooking.studentName || 'Aspirant',
          rating,
          comment,
          date: 'Just now'
        };
        const allReviews = [newReview, ...m.recentReviews];
        const newAvg = Number((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1));
        return {
          ...m,
          rating: newAvg,
          reviewsCount: m.reviewsCount + 1,
          recentReviews: allReviews
        };
      }
      return m;
    });

    setMentors(updatedMentors);
    mentorService.saveMentors(updatedMentors);
    showToast(`Thank you! Your ${rating}-star review has been published.`, 'success');
  };

  const updateMentorProfile = (mentorId: string, updatedData: Partial<Mentor>) => {
    const updated = mentors.map(m => m.id === mentorId ? { ...m, ...updatedData } : m);
    setMentors(updated);
    mentorService.saveMentors(updated);
    showToast('Mentor profile preferences updated successfully!', 'success');
  };

  const addMentorSlot = (mentorId: string, date: string, time: string) => {
    const newSlot = {
      id: `slot-${Date.now()}`,
      date,
      time,
      isBooked: false
    };
    const updated = mentors.map(m => {
      if (m.id === mentorId) {
        return {
          ...m,
          availableSlots: [...m.availableSlots, newSlot]
        };
      }
      return m;
    });
    setMentors(updated);
    mentorService.saveMentors(updated);
    showToast('Consultation time slot added to your public profile!', 'success');
  };

  const deleteMentorSlot = (mentorId: string, slotId: string) => {
    const updated = mentors.map(m => {
      if (m.id === mentorId) {
        return {
          ...m,
          availableSlots: m.availableSlots.filter(s => s.id !== slotId)
        };
      }
      return m;
    });
    setMentors(updated);
    mentorService.saveMentors(updated);
    showToast('Availability slot removed.', 'info');
  };

  const submitMentorCredentials = async (mentorId: string, file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
    try {
      const res = await storageService.uploadMentorVerificationDoc(mentorId, file);
      if (res.error) {
        showToast(res.error, 'warning');
        return { success: false, error: res.error };
      }

      const docUrl = res.url || URL.createObjectURL(file);

      // Update mentor profile
      const targetMentor = mentors.find(m => m.id === mentorId);
      const updatedMentors = mentors.map(m => {
        if (m.id === mentorId) {
          return {
            ...m,
            idCardUrl: docUrl,
            verificationStatus: 'pending' as const,
            idCardSubmittedAt: new Date().toISOString()
          };
        }
        return m;
      });
      setMentors(updatedMentors);
      mentorService.saveMentors(updatedMentors);

      // Also add to admin pending review queue
      if (targetMentor) {
        const pendingItem: Mentor = {
          ...targetMentor,
          idCardUrl: docUrl,
          verificationStatus: 'pending',
          verifiedCollegeAffiliation: false,
          idCardSubmittedAt: new Date().toISOString()
        };
        setPendingMentors(prev => [pendingItem, ...prev.filter(p => p.id !== mentorId)]);
      }

      showToast('Student ID document uploaded to Supabase Storage! Admin audit pending.', 'success');
      return { success: true, url: docUrl };
    } catch (err: any) {
      showToast('Failed to upload document', 'warning');
      return { success: false, error: err.message };
    }
  };

  const toggleSaveUpdateReminder = (updateId: string) => {
    setSavedUpdateIds((prev) => {
      const exists = prev.includes(updateId);
      if (exists) {
        showToast('Reminder removed', 'info');
        return prev.filter((id) => id !== updateId);
      } else {
        showToast('Reminder saved! You will receive notification before the deadline.', 'success');
        return [...prev, updateId];
      }
    });
  };

  const toggleChecklistTask = (taskId: string) => {
    const updated = checklistTasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    setChecklistTasks(updated);
    updateService.saveChecklist(updated);
  };

  const upvoteReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r
      )
    );
    showToast('Marked review as helpful', 'success');
  };

  const addReview = (newReview: Omit<CollegeReview, 'id' | 'date' | 'helpfulVotes'>) => {
    const fullReview: CollegeReview = {
      ...newReview,
      id: `cr-${Date.now()}`,
      date: 'Just now',
      helpfulVotes: 1
    };
    setReviews((prev) => [fullReview, ...prev]);
    showToast('Thank you! Your verified student review was submitted successfully.', 'success');
  };

  // Community Forum Actions (Abstract Feature)
  const addThread = (newThread: { title: string; content: string; category: CommunityThread['category']; tags: string[] }) => {
    const createdThread: CommunityThread = {
      id: `thread-${Date.now()}`,
      authorId: currentUser?.id || `user-${Date.now()}`,
      authorName: currentUser?.name || 'Aarush Sharma',
      authorRole: currentUser?.role || 'student',
      authorBadge: currentUser?.role === 'mentor' ? `${currentUser.collegeOrExam} Mentor` : `${currentUser?.rank || 'JoSAA Aspirant'}`,
      category: newThread.category,
      title: newThread.title,
      content: newThread.content,
      tags: newThread.tags,
      upvotes: 1,
      repliesCount: 0,
      createdAt: 'Just now',
      isDemo: false,
      isFlagged: false,
      bookmarkedBy: [],
      replies: []
    };
    const updated = [createdThread, ...threads];
    setThreads(updated);
    communityService.saveThreads(updated);
    showToast('Discussion question posted to the Student Community!', 'success');
  };

  const addReply = (threadId: string, content: string) => {
    const newReply: CommunityReply = {
      id: `rep-${Date.now()}`,
      threadId,
      authorId: currentUser?.id || 'anon',
      authorName: currentUser?.name || 'Community Member',
      authorRole: currentUser?.role || 'student',
      authorCollege: currentUser?.collegeOrExam,
      isVerifiedMentor: currentUser?.role === 'mentor',
      content,
      upvotes: 0,
      createdAt: 'Just now',
      isDemo: false,
      isFlagged: false
    };

    const updated = threads.map((t) => {
      if (t.id === threadId) {
        return {
          ...t,
          repliesCount: t.repliesCount + 1,
          replies: [...t.replies, newReply]
        };
      }
      return t;
    });

    setThreads(updated);
    communityService.saveThreads(updated);
    showToast('Your response has been posted to the discussion thread.', 'success');
  };

  const upvoteThread = (threadId: string) => {
    const updated = threads.map((t) => {
      if (t.id === threadId) {
        return { ...t, upvotes: t.upvotes + 1 };
      }
      return t;
    });
    setThreads(updated);
    communityService.saveThreads(updated);
    showToast('Upvoted discussion thread', 'success');
  };

  const toggleBookmarkThread = (threadId: string) => {
    setBookmarkedThreadIds(prev => {
      const exists = prev.includes(threadId);
      if (exists) {
        showToast('Discussion removed from your saved bookmarks', 'info');
        return prev.filter(id => id !== threadId);
      } else {
        showToast('Discussion saved to your bookmarked collection!', 'success');
        return [...prev, threadId];
      }
    });
  };

  const reportItem = (itemType: 'thread' | 'reply' | 'review' | 'mentor', itemId: string, itemTitle: string, reason: string) => {
    const newReport: ModerationReport = {
      id: `rep-mod-${Date.now()}`,
      itemType,
      itemId,
      itemTitle,
      reportedBy: `${currentUser?.name || 'Community User'} (${currentUser?.role || 'student'})`,
      reason,
      status: 'pending',
      reportedAt: 'Just now'
    };

    const updated = [newReport, ...moderationReports];
    setModerationReports(updated);
    adminService.saveReports(updated);

    if (itemType === 'thread') {
      setThreads(prev => prev.map(t => t.id === itemId ? { ...t, isFlagged: true, flagReason: reason } : t));
    } else if (itemType === 'review') {
      setReviews(prev => prev.map(r => r.id === itemId ? { ...r, isFlagged: true } : r));
    }

    showToast('Item flagged and submitted to Administrator Moderation Queue.', 'info');
  };

  // Admin Operations: Mentor Verification & Moderation
  const [pendingMentors, setPendingMentors] = useState<Mentor[]>([
    {
      id: 'pending-1',
      name: 'Rohan Mehra',
      collegeId: 'iit-delhi',
      collegeName: 'IIT Delhi',
      branch: 'Mathematics and Computing',
      degree: 'B.Tech',
      academicYear: '2nd Year (Batch of 2027)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      verifiedIdentity: true,
      verifiedCollegeAffiliation: false,
      verificationStatus: 'pending',
      isDemo: true,
      idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      rating: 5.0,
      reviewsCount: 0,
      priceINR: 249,
      sessionDurationMins: 30,
      languages: ['English', 'Hindi'],
      entranceRank: 'AIR 280 (JEE Adv)',
      examName: 'JEE Advanced',
      bio: 'Uploaded IIT Delhi Student Smart ID Card and 1st year grade card. Awaiting admin affiliation verification.',
      topics: ['MnC vs CSE', '1st Year Prep', 'JoSAA Seat Acceptance'],
      availableSlots: [],
      recentReviews: []
    }
  ]);

  const verifyMentor = (mentorId: string, approved: boolean, notes?: string) => {
    const target = pendingMentors.find((m) => m.id === mentorId) || mentors.find(m => m.id === mentorId);
    if (!target) return;
    
    if (approved) {
      const verifiedMentor: Mentor = {
        ...target,
        verifiedCollegeAffiliation: true,
        verificationStatus: 'approved',
        adminNotes: notes || 'Verified with Official Student Smart ID & Dean signature.',
        availableSlots: target.availableSlots.length > 0 ? target.availableSlots : [
          { id: `s-new-${Date.now()}`, date: 'Friday, 4:00 PM', time: '04:00 PM - 04:30 PM', isBooked: false }
        ]
      };
      const updatedMentors = [verifiedMentor, ...mentors.filter(m => m.id !== mentorId)];
      setMentors(updatedMentors);
      mentorService.saveMentors(updatedMentors);
      setPendingMentors((prev) => prev.filter((m) => m.id !== mentorId));
      showToast(`Mentor ${target.name} verified and published to marketplace!`, 'success');
    } else {
      const rejectedMentor: Mentor = {
        ...target,
        verifiedCollegeAffiliation: false,
        verificationStatus: 'rejected',
        adminNotes: notes || 'Credentials incomplete or unreadable'
      };
      setMentors(prev => prev.map(m => m.id === mentorId ? rejectedMentor : m));
      setPendingMentors((prev) => prev.filter((m) => m.id !== mentorId));
      showToast(`Mentor verification for ${target.name} declined with note.`, 'warning');
    }
  };

  const resolveModerationReport = (reportId: string, action: 'dismiss' | 'remove', notes?: string) => {
    const report = moderationReports.find(r => r.id === reportId);
    if (!report) return;

    if (action === 'remove') {
      if (report.itemType === 'thread') {
        setThreads(prev => prev.filter(t => t.id !== report.itemId));
      } else if (report.itemType === 'review') {
        setReviews(prev => prev.filter(r => r.id !== report.itemId));
      }
    }

    const updatedReports = moderationReports.map(r => 
      r.id === reportId 
        ? { ...r, status: action === 'remove' ? 'resolved' as const : 'dismissed' as const, moderatorNotes: notes } 
        : r
    );
    setModerationReports(updatedReports);
    adminService.saveReports(updatedReports);
    showToast(action === 'remove' ? 'Flagged item removed by moderator.' : 'Report dismissed.', 'info');
  };

  const addCounsellingUpdate = (newUpd: Omit<CounsellingUpdate, 'id'>) => {
    const created: CounsellingUpdate = {
      ...newUpd,
      id: `upd-${Date.now()}`
    };
    const updated = [created, ...updates];
    setUpdates(updated);
    updateService.saveUpdates(updated);
    showToast('Official update published to student portal!', 'success');
  };

  const updateCounsellingUpdate = (updateId: string, updatesData: Partial<CounsellingUpdate>) => {
    const updated = updates.map(u => u.id === updateId ? { ...u, ...updatesData, lastVerified: 'Just now' } : u);
    setUpdates(updated);
    updateService.saveUpdates(updated);
    logAdminAction('PUBLISH_NOTICE', 'update', updateId, `Edited advisory update: ${updatesData.title || updateId}`);
    showToast('Advisory update updated successfully.', 'success');
  };

  const deleteCounsellingUpdate = (updateId: string) => {
    const target = updates.find(u => u.id === updateId);
    const updated = updates.filter(u => u.id !== updateId);
    setUpdates(updated);
    updateService.saveUpdates(updated);
    logAdminAction('PUBLISH_NOTICE', 'update', updateId, `Deleted advisory update: ${target?.title || updateId}`);
    showToast('Advisory update removed.', 'info');
  };

  const logAdminAction = async (
    action: AdminAuditLog['action'],
    entityType: AdminAuditLog['entityType'],
    entityId: string,
    details: string
  ) => {
    const adminEmail = currentUser?.email || 'admin@clario.gov.in';
    const newLog = await auditService.addAuditLog({
      adminEmail,
      action,
      entityType,
      entityId,
      details
    });
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addCollege = async (collegeData: Partial<College>): Promise<boolean> => {
    const id = collegeData.id?.trim() || collegeData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `college-${Date.now()}`;
    const newCollege: College = {
      id,
      name: collegeData.name || 'New Engineering College',
      shortName: collegeData.shortName || collegeData.name?.substring(0, 8) || 'COLLEGE',
      location: collegeData.location || 'India',
      state: collegeData.state || 'Maharashtra',
      established: Number(collegeData.established) || 2020,
      campusSizeAcres: Number(collegeData.campusSizeAcres) || 100,
      nirfRank: Number(collegeData.nirfRank) || 999,
      categoryType: collegeData.categoryType || 'State Government',
      counsellingAuthority: collegeData.counsellingAuthority || 'JoSAA',
      acceptedExams: collegeData.acceptedExams || ['JEE Main'],
      image: collegeData.image || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      heroImage: collegeData.heroImage || collegeData.image || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      overview: collegeData.overview || 'Engineering institution with recognized undergraduate programs.',
      eligibilityCriteria: collegeData.eligibilityCriteria || 'National / state entrance qualification criteria.',
      officialWebsite: collegeData.officialWebsite || 'https://example.edu.in',
      verificationStatus: collegeData.verificationStatus || 'unverified', // NEVER automatically marked verified
      sourceDocument: collegeData.sourceDocument || 'Admin Input',
      lastVerifiedAt: new Date().toISOString(),
      verifiedBy: currentUser?.email || 'admin@clario.gov.in',
      courses: collegeData.courses || [
        {
          branchCode: 'CSE',
          branchName: 'Computer Science and Engineering',
          degree: 'B.Tech',
          durationYears: 4,
          annualTuitionINR: 150000,
          hostelFeeAnnualINR: 40000,
          oneTimeAdmissionFeeINR: 10000,
          verificationStatus: 'unverified'
        }
      ],
      cutoffs: collegeData.cutoffs || [],
      placements: collegeData.placements || {
        reportingYear: 2025,
        avgSalaryLPA: 12.0,
        medianSalaryLPA: 10.5,
        highestSalaryLPA: 45.0,
        placementRatePercent: 85,
        topRecruiters: ['TCS', 'Infosys', 'Wipro'],
        sourceDocument: 'Institutional Brochure'
      },
      facilities: collegeData.facilities || {
        hostelAvailable: true,
        acRooms: false,
        wifiCampus: true,
        sportsComplex: true,
        medicalCenter: true,
        libraryVolumes: '50,000+ volumes'
      },
      reviewsSummary: collegeData.reviewsSummary || {
        overallRating: 4.2,
        count: 0,
        breakdown: { teaching: 4.2, faculty: 4.1, attendance: 4.0, campus: 4.4, hostel: 3.8, clubs: 4.1, internships: 4.0, placements: 4.3, workload: 3.8 }
      }
    };

    const updatedColleges = [newCollege, ...colleges];
    setColleges(updatedColleges);
    await collegeService.upsertCollege(newCollege);
    await logAdminAction('CREATE_COLLEGE', 'college', newCollege.id, `Created college record: ${newCollege.name} (${newCollege.shortName}). Verification: ${newCollege.verificationStatus}`);
    showToast(`College "${newCollege.name}" added successfully!`, 'success');
    return true;
  };

  const updateCollege = async (collegeId: string, updatesData: Partial<College>): Promise<boolean> => {
    const existing = colleges.find(c => c.id === collegeId);
    if (!existing) {
      showToast('College record not found', 'warning');
      return false;
    }

    const updatedCollege: College = {
      ...existing,
      ...updatesData,
      lastVerifiedAt: new Date().toISOString(),
      verifiedBy: currentUser?.email || 'admin@clario.gov.in'
    };

    const updatedColleges = colleges.map(c => c.id === collegeId ? updatedCollege : c);
    setColleges(updatedColleges);
    await collegeService.upsertCollege(updatedCollege);
    await logAdminAction('UPDATE_COLLEGE', 'college', collegeId, `Updated college record: ${updatedCollege.name}. Changes: ${Object.keys(updatesData).join(', ')}`);
    showToast(`College "${updatedCollege.name}" updated successfully!`, 'success');
    return true;
  };

  const deleteCollege = async (collegeId: string): Promise<boolean> => {
    const target = colleges.find(c => c.id === collegeId);
    const updated = colleges.filter(c => c.id !== collegeId);
    setColleges(updated);
    await collegeService.deleteCollege(collegeId);
    await logAdminAction('DELETE_COLLEGE', 'college', collegeId, `Deleted college record: ${target?.name || collegeId}`);
    showToast(`College ${target?.shortName || collegeId} removed.`, 'info');
    return true;
  };

  const addCollegeBranch = async (collegeId: string, branch: BranchCourse): Promise<boolean> => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return false;

    const existingBranch = college.courses.find(b => b.branchCode.toUpperCase() === branch.branchCode.toUpperCase());
    if (existingBranch) {
      showToast(`Branch ${branch.branchCode} already exists in ${college.shortName}`, 'warning');
      return false;
    }

    const updatedCourses = [...college.courses, { ...branch, verificationStatus: branch.verificationStatus || 'unverified' }];
    const updatedCollege = { ...college, courses: updatedCourses, lastVerifiedAt: new Date().toISOString() };
    const updatedColleges = colleges.map(c => c.id === collegeId ? updatedCollege : c);
    setColleges(updatedColleges);
    await collegeService.upsertCollege(updatedCollege);
    await logAdminAction('MANAGE_BRANCH', 'branch', `${collegeId}-${branch.branchCode}`, `Added branch ${branch.branchName} (${branch.branchCode}) to ${college.shortName}`);
    showToast(`Branch ${branch.branchCode} added to ${college.shortName}`, 'success');
    return true;
  };

  const updateCollegeBranch = async (collegeId: string, branchCode: string, branchUpdates: Partial<BranchCourse>): Promise<boolean> => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return false;

    const updatedCourses = college.courses.map(b => b.branchCode === branchCode ? { ...b, ...branchUpdates, lastVerifiedAt: new Date().toISOString() } : b);
    const updatedCollege = { ...college, courses: updatedCourses, lastVerifiedAt: new Date().toISOString() };
    const updatedColleges = colleges.map(c => c.id === collegeId ? updatedCollege : c);
    setColleges(updatedColleges);
    await collegeService.upsertCollege(updatedCollege);
    await logAdminAction('MANAGE_BRANCH', 'branch', `${collegeId}-${branchCode}`, `Updated branch ${branchCode} in ${college.shortName}`);
    showToast(`Branch ${branchCode} updated.`, 'success');
    return true;
  };

  const deleteCollegeBranch = async (collegeId: string, branchCode: string): Promise<boolean> => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return false;

    const updatedCourses = college.courses.filter(b => b.branchCode !== branchCode);
    const updatedCollege = { ...college, courses: updatedCourses, lastVerifiedAt: new Date().toISOString() };
    const updatedColleges = colleges.map(c => c.id === collegeId ? updatedCollege : c);
    setColleges(updatedColleges);
    await collegeService.upsertCollege(updatedCollege);
    await logAdminAction('MANAGE_BRANCH', 'branch', `${collegeId}-${branchCode}`, `Deleted branch ${branchCode} from ${college.shortName}`);
    showToast(`Branch ${branchCode} deleted from ${college.shortName}`, 'info');
    return true;
  };

  const addCutoffRecord = async (collegeId: string, cutoff: CutoffEntry): Promise<boolean> => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return false;

    const newCutoff: CutoffEntry = {
      ...cutoff,
      verificationStatus: cutoff.verificationStatus || 'unverified',
      lastVerifiedAt: new Date().toISOString(),
      verifiedBy: currentUser?.email || 'admin@clario.gov.in'
    };

    const updatedCutoffs = [newCutoff, ...college.cutoffs];
    const updatedCollege = { ...college, cutoffs: updatedCutoffs, lastVerifiedAt: new Date().toISOString() };
    const updatedColleges = colleges.map(c => c.id === collegeId ? updatedCollege : c);
    setColleges(updatedColleges);
    await collegeService.upsertCollege(updatedCollege);
    await logAdminAction('UPDATE_VERIFICATION', 'cutoff', `${collegeId}-${cutoff.branchCode}`, `Added cutoff: ${cutoff.exam} ${cutoff.year} R${cutoff.round} for ${cutoff.branchCode} in ${college.shortName}`);
    showToast('Cutoff record saved successfully.', 'success');
    return true;
  };

  const deleteCutoffRecord = async (collegeId: string, cutoffIndex: number): Promise<boolean> => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return false;

    const target = college.cutoffs[cutoffIndex];
    const updatedCutoffs = college.cutoffs.filter((_, idx) => idx !== cutoffIndex);
    const updatedCollege = { ...college, cutoffs: updatedCutoffs, lastVerifiedAt: new Date().toISOString() };
    const updatedColleges = colleges.map(c => c.id === collegeId ? updatedCollege : c);
    setColleges(updatedColleges);
    await collegeService.upsertCollege(updatedCollege);
    await logAdminAction('UPDATE_VERIFICATION', 'cutoff', `${collegeId}-${target?.branchCode || cutoffIndex}`, `Deleted cutoff record for ${college.shortName}`);
    showToast('Cutoff record removed.', 'info');
    return true;
  };

  const importCollegesCSV = async (
    rows: any[], 
    options: { markAs: RecordVerificationStatus; skipDuplicates: boolean }
  ): Promise<{ importedCount: number; skippedCount: number; errorCount: number }> => {
    let imported = 0;
    let skipped = 0;
    let errors = 0;

    const currentList = [...colleges];

    for (const row of rows) {
      try {
        const id = (row.id || row.shortName || row.name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!id || !row.name) {
          errors++;
          continue;
        }

        const existingIdx = currentList.findIndex(c => c.id === id || c.name.toLowerCase() === row.name.toLowerCase());
        if (existingIdx >= 0) {
          if (options.skipDuplicates) {
            skipped++;
            continue;
          }
          const updatedCol: College = {
            ...currentList[existingIdx],
            name: row.name || currentList[existingIdx].name,
            shortName: row.shortName || currentList[existingIdx].shortName,
            location: row.location || currentList[existingIdx].location,
            state: row.state || currentList[existingIdx].state,
            established: Number(row.established) || currentList[existingIdx].established,
            campusSizeAcres: Number(row.campusSizeAcres) || currentList[existingIdx].campusSizeAcres,
            nirfRank: Number(row.nirfRank) || currentList[existingIdx].nirfRank,
            categoryType: row.categoryType || currentList[existingIdx].categoryType,
            counsellingAuthority: row.counsellingAuthority || currentList[existingIdx].counsellingAuthority,
            officialWebsite: row.officialWebsite || currentList[existingIdx].officialWebsite,
            verificationStatus: options.markAs, // NEVER automatically marked as verified
            sourceDocument: row.sourceDocument || 'Bulk CSV Import',
            lastVerifiedAt: new Date().toISOString(),
            verifiedBy: currentUser?.email || 'admin@clario.gov.in'
          };
          currentList[existingIdx] = updatedCol;
          await collegeService.upsertCollege(updatedCol);
          imported++;
        } else {
          const newCol: College = {
            id,
            name: row.name,
            shortName: row.shortName || row.name.substring(0, 8),
            location: row.location || 'India',
            state: row.state || 'Delhi',
            established: Number(row.established) || 2020,
            campusSizeAcres: Number(row.campusSizeAcres) || 100,
            nirfRank: Number(row.nirfRank) || 999,
            categoryType: row.categoryType || 'State Government',
            counsellingAuthority: row.counsellingAuthority || 'JoSAA',
            acceptedExams: Array.isArray(row.acceptedExams) ? row.acceptedExams : (row.acceptedExams ? row.acceptedExams.split(';') : ['JEE Main']),
            image: row.image || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
            heroImage: row.heroImage || row.image || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
            overview: row.overview || 'Imported institutional profile.',
            eligibilityCriteria: row.eligibilityCriteria || 'Valid national/state entrance scores.',
            officialWebsite: row.officialWebsite || 'https://example.edu.in',
            verificationStatus: options.markAs, // NEVER automatically marked as verified
            sourceDocument: row.sourceDocument || 'Bulk CSV Import',
            lastVerifiedAt: new Date().toISOString(),
            verifiedBy: currentUser?.email || 'admin@clario.gov.in',
            courses: [
              {
                branchCode: 'CSE',
                branchName: 'Computer Science and Engineering',
                degree: 'B.Tech',
                durationYears: 4,
                annualTuitionINR: Number(row.annualTuitionINR) || 180000,
                hostelFeeAnnualINR: 45000,
                oneTimeAdmissionFeeINR: 15000,
                verificationStatus: options.markAs
              }
            ],
            cutoffs: [],
            placements: {
              reportingYear: 2025,
              avgSalaryLPA: Number(row.avgSalaryLPA) || 12.0,
              medianSalaryLPA: Number(row.medianSalaryLPA) || 10.0,
              highestSalaryLPA: Number(row.highestSalaryLPA) || 45.0,
              placementRatePercent: 85,
              topRecruiters: ['Top Recruiters'],
              sourceDocument: 'Imported Report'
            },
            facilities: {
              hostelAvailable: true,
              acRooms: false,
              wifiCampus: true,
              sportsComplex: true,
              medicalCenter: true,
              libraryVolumes: '50,000+ volumes'
            },
            reviewsSummary: {
              overallRating: 4.2,
              count: 0,
              breakdown: { teaching: 4.2, faculty: 4.0, attendance: 4.0, campus: 4.2, hostel: 3.8, clubs: 4.0, internships: 4.0, placements: 4.2, workload: 3.8 }
            }
          };
          currentList.unshift(newCol);
          await collegeService.upsertCollege(newCol);
          imported++;
        }
      } catch {
        errors++;
      }
    }

    setColleges(currentList);
    collegeService.saveColleges(currentList);
    await logAdminAction('IMPORT_COLLEGES_CSV', 'college', 'bulk-csv', `Colleges CSV Import: ${imported} imported/updated, ${skipped} skipped duplicates, ${errors} invalid entries. Verification set to: ${options.markAs}.`);
    showToast(`CSV Import Complete: ${imported} imported, ${skipped} skipped, ${errors} invalid.`, 'success');
    return { importedCount: imported, skippedCount: skipped, errorCount: errors };
  };

  const importCutoffsCSV = async (
    rows: any[], 
    options: { markAs: RecordVerificationStatus; skipDuplicates: boolean }
  ): Promise<{ importedCount: number; skippedCount: number; errorCount: number }> => {
    let imported = 0;
    let skipped = 0;
    let errors = 0;

    const currentList = [...colleges];

    for (const row of rows) {
      try {
        const collegeId = (row.collegeId || '').trim();
        const branchCode = (row.branchCode || '').trim().toUpperCase();
        const year = Number(row.year);
        const round = Number(row.round);
        const openingRank = Number(row.openingRank);
        const closingRank = Number(row.closingRank);

        if (!collegeId || !branchCode || isNaN(year) || isNaN(round) || isNaN(openingRank) || isNaN(closingRank)) {
          errors++;
          continue;
        }

        const targetCollegeIdx = currentList.findIndex(c => c.id === collegeId);
        if (targetCollegeIdx === -1) {
          errors++;
          continue;
        }

        const college = { ...currentList[targetCollegeIdx] };
        college.cutoffs = [...college.cutoffs];

        const existingCutoffIdx = college.cutoffs.findIndex(c => 
          c.branchCode === branchCode && 
          c.year === year && 
          c.round === round && 
          c.category === row.category && 
          c.quota === row.quota && 
          (c.seatPool || 'Gender-Neutral') === (row.seatPool || 'Gender-Neutral')
        );

        if (existingCutoffIdx >= 0) {
          if (options.skipDuplicates) {
            skipped++;
            continue;
          }
          college.cutoffs[existingCutoffIdx] = {
            ...college.cutoffs[existingCutoffIdx],
            openingRank,
            closingRank,
            exam: row.exam || college.cutoffs[existingCutoffIdx].exam,
            source: row.source || 'Bulk CSV Import',
            provenance: row.provenance || 'Official Authority Archive',
            verificationStatus: options.markAs, // NEVER automatically marked as verified
            lastVerifiedAt: new Date().toISOString(),
            verifiedBy: currentUser?.email || 'admin@clario.gov.in'
          };
          imported++;
        } else {
          const newEntry: CutoffEntry = {
            branchCode,
            year,
            round,
            exam: row.exam || 'JEE Main',
            category: row.category || 'General (OPEN)',
            quota: row.quota || 'AI',
            seatPool: row.seatPool || 'Gender-Neutral',
            openingRank,
            closingRank,
            source: row.source || 'Bulk CSV Import',
            provenance: row.provenance || 'Official Archive',
            verificationStatus: options.markAs,
            lastVerifiedAt: new Date().toISOString(),
            verifiedBy: currentUser?.email || 'admin@clario.gov.in'
          };
          college.cutoffs.unshift(newEntry);
          imported++;
        }
        currentList[targetCollegeIdx] = college;
      } catch {
        errors++;
      }
    }

    setColleges(currentList);
    collegeService.saveColleges(currentList);
    await logAdminAction('IMPORT_CUTOFFS_CSV', 'cutoff', 'bulk-cutoffs', `Cutoffs CSV Import: ${imported} processed, ${skipped} skipped, ${errors} invalid. Marked as: ${options.markAs}.`);
    showToast(`Cutoffs CSV Import: ${imported} imported, ${skipped} skipped, ${errors} invalid.`, 'success');
    return { importedCount: imported, skippedCount: skipped, errorCount: errors };
  };

  const addAuthority = async (auth: CounsellingAuthorityItem): Promise<boolean> => {
    const updated = [auth, ...authorities];
    setAuthorities(updated);
    await authorityService.upsertAuthority(auth);
    await logAdminAction('MANAGE_AUTHORITY', 'authority', auth.id, `Created authority: ${auth.name} (${auth.shortName})`);
    showToast(`Authority ${auth.shortName} added successfully.`, 'success');
    return true;
  };

  const updateAuthority = async (auth: CounsellingAuthorityItem): Promise<boolean> => {
    const updated = authorities.map(a => a.id === auth.id ? { ...auth, lastVerifiedAt: 'Just now' } : a);
    setAuthorities(updated);
    await authorityService.upsertAuthority(auth);
    await logAdminAction('MANAGE_AUTHORITY', 'authority', auth.id, `Updated authority: ${auth.shortName}`);
    showToast(`Authority ${auth.shortName} updated.`, 'success');
    return true;
  };

  const deleteAuthority = async (id: string): Promise<boolean> => {
    const target = authorities.find(a => a.id === id);
    const updated = authorities.filter(a => a.id !== id);
    setAuthorities(updated);
    await authorityService.deleteAuthority(id);
    await logAdminAction('MANAGE_AUTHORITY', 'authority', id, `Deleted authority: ${target?.shortName || id}`);
    showToast(`Authority ${target?.shortName || id} removed.`, 'info');
    return true;
  };

  const updateRecordVerification = async (
    entityType: 'college' | 'cutoff' | 'update' | 'authority',
    entityId: string,
    status: RecordVerificationStatus,
    notes?: string
  ): Promise<boolean> => {
    if (entityType === 'college') {
      await updateCollege(entityId, { verificationStatus: status });
    } else if (entityType === 'update') {
      updateCounsellingUpdate(entityId, { 
        verified: status === 'verified',
        isIllustrativeDemo: status === 'demo'
      });
    } else if (entityType === 'authority') {
      const auth = authorities.find(a => a.id === entityId);
      if (auth) {
        await updateAuthority({ ...auth, verificationStatus: status });
      }
    }
    await logAdminAction('UPDATE_VERIFICATION', entityType, entityId, `Changed verification status to "${status}". Note: ${notes || 'Verified by admin'}`);
    showToast(`Verification status set to "${status.toUpperCase()}".`, 'success');
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        userRole,
        setUserRole,
        isAuthenticated,
        currentUser,
        login,
        signUp,
        resetPassword,
        logout,
        isBackendConnected,
        colleges,
        isLoadingColleges,
        exam,
        setExam,
        studentRank,
        setStudentRank,
        category,
        setCategory,
        homeState,
        setHomeState,
        preferredBranches,
        setPreferredBranches,
        maxBudgetINR,
        setMaxBudgetINR,
        hostelRequired,
        setHostelRequired,
        savedCollegeIds,
        toggleSaveCollege,
        choiceList,
        addToChoiceList,
        removeFromChoiceList,
        removeCollegeFromShortlist,
        moveChoiceUp,
        moveChoiceDown,
        reorderChoiceList,
        clearChoiceList,
        comparisonCollegeIds,
        addToComparison,
        removeFromComparison,
        clearComparison,
        selectedCollege,
        setSelectedCollege,
        selectedCutoffCollege,
        setSelectedCutoffCollege,
        cutoffModalBranch,
        setCutoffModalBranch,
        mentors,
        selectedMentor,
        setSelectedMentor,
        bookings,
        createBooking,
        acceptBooking,
        rejectBooking,
        cancelBooking,
        submitSessionFeedback,
        updateMentorProfile,
        addMentorSlot,
        deleteMentorSlot,
        submitMentorCredentials,
        activeCallBooking,
        setActiveCallBooking,
        updates,
        savedUpdateIds,
        toggleSaveUpdateReminder,
        checklistTasks,
        toggleChecklistTask,
        deadlines,
        reviews,
        upvoteReview,
        addReview,
        threads,
        addThread,
        addReply,
        upvoteThread,
        toggleBookmarkThread,
        bookmarkedThreadIds,
        reportItem,
        pendingMentors,
        verifyMentor,
        addCounsellingUpdate,
        updateCounsellingUpdate,
        deleteCounsellingUpdate,
        moderationReports,
        resolveModerationReport,
        addCollege,
        updateCollege,
        deleteCollege,
        addCollegeBranch,
        updateCollegeBranch,
        deleteCollegeBranch,
        addCutoffRecord,
        deleteCutoffRecord,
        importCollegesCSV,
        importCutoffsCSV,
        authorities,
        addAuthority,
        updateAuthority,
        deleteAuthority,
        updateRecordVerification,
        auditLogs,
        logAdminAction,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
