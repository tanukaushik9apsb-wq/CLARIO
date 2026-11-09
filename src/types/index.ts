export type ExamType = 
  | 'JEE Main' 
  | 'JEE Advanced' 
  | 'BITSAT' 
  | 'NEET UG' 
  | 'JAC Delhi' 
  | 'KCET' 
  | 'COMEDK'
  | 'MHT-CET' 
  | 'WBJEE'
  | 'UPTAC'
  | 'TNEA';

export type CategoryType = 
  | 'General (OPEN)' 
  | 'GEN-EWS' 
  | 'OBC-NCL' 
  | 'SC' 
  | 'ST' 
  | 'PwD';

export type QuotaType = 'AI' | 'HS' | 'OS' | 'GOVT' | 'MGT';

export type SeatPoolType = 'Gender-Neutral' | 'Female-only';

export type InstituteCategory = 
  | 'IIT' 
  | 'NIT' 
  | 'BITS' 
  | 'IIIT' 
  | 'State Government' 
  | 'Autonomous Private'
  | 'GFTI'
  | 'Premier Medical';

export type AuthorityType = 
  | 'JoSAA' 
  | 'CSAB' 
  | 'BITSAT' 
  | 'BITSAT Council'
  | 'MCC NEET' 
  | 'NEET UG'
  | 'JAC Delhi' 
  | 'KEA' 
  | 'KEA KCET'
  | 'KEA (KCET)'
  | 'State DTE'
  | 'MHT-CET'
  | 'State CET Cell'
  | 'State CET Cell (MHT-CET)'
  | 'WBJEEB'
  | 'UPTAC'
  | 'TNEA'
  | 'DTE TNEA';

export type RecordVerificationStatus = 'verified' | 'unverified' | 'demo';

export interface BranchCourse {
  branchCode: string;
  branchName: string;
  degree: string;
  durationYears: number;
  annualTuitionINR: number;
  hostelFeeAnnualINR: number;
  oneTimeAdmissionFeeINR: number;
  seats?: number;
  verificationStatus?: RecordVerificationStatus;
  lastVerifiedAt?: string;
}

export interface CutoffEntry {
  branchCode: string;
  round: number;
  year: number;
  category: string;
  quota: QuotaType;
  openingRank: number;
  closingRank: number;
  exam?: ExamType;
  seatPool?: SeatPoolType;
  cutoffScore?: number;
  source?: string;
  provenance?: string;
  lastUpdated?: string;
  verificationStatus?: RecordVerificationStatus;
  isDemo?: boolean;
  lastVerifiedAt?: string;
  verifiedBy?: string;
}

export interface RecommendationCollege {
  college: College;
  course: BranchCourse;
  tier: 'Reach' | 'Match' | 'Safer';
  exam: ExamType;
  studentRank: number;
  cutoffRank: number;
  round: number;
  year: number;
  category: string;
  quota: string;
  seatPool?: SeatPoolType;
  explanation: string;
  source: string;
  provenance?: string;
  isSyntheticDemo?: boolean;
  lastUpdated: string;
}

export interface StudentAdmissionProfile {
  exam: ExamType;
  rank: number;
  categoryRank?: number;
  percentile?: number;
  score?: number;
  boardPercentage?: number;
  category: CategoryType;
  homeState: string;
  preferredBranches: string[];
  maxBudgetINR: number;
  institutionType: 'all' | 'govt' | 'private';
  hostelRequired: boolean;
  seatPool?: SeatPoolType;
}

export interface PlacementStats {
  reportingYear: number;
  avgSalaryLPA: number;
  medianSalaryLPA: number;
  highestSalaryLPA: number;
  placementRatePercent: number;
  topRecruiters: string[];
  sourceDocument: string;
}

export interface ReviewBreakdown {
  teaching: number;
  faculty: number;
  attendance: number;
  campus: number;
  hostel: number;
  clubs: number;
  internships: number;
  placements: number;
  workload: number;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  established: number;
  campusSizeAcres: number;
  nirfRank: number;
  categoryType: InstituteCategory;
  counsellingAuthority: AuthorityType;
  university?: string;
  acceptedExams?: ExamType[];
  image: string;
  heroImage: string;
  overview: string;
  courses: BranchCourse[];
  cutoffs: CutoffEntry[];
  placements: PlacementStats;
  facilities: {
    hostelAvailable: boolean;
    acRooms: boolean;
    wifiCampus: boolean;
    sportsComplex: boolean;
    medicalCenter: boolean;
    libraryVolumes: string;
  };
  reviewsSummary: {
    overallRating: number;
    count: number;
    breakdown: ReviewBreakdown;
  };
  officialWebsite: string;
  eligibilityCriteria: string;
  isSyntheticDemo?: boolean;
  verificationStatus?: RecordVerificationStatus;
  sourceDocument?: string;
  lastVerifiedAt?: string;
  verifiedBy?: string;
}

export interface CounsellingAuthorityItem {
  id: string;
  name: string;
  shortName: string;
  conductingBody: string;
  websiteUrl: string;
  applicableExams: string[];
  participatingInstituteTypes: string[];
  description: string;
  isActive: boolean;
  verificationStatus: RecordVerificationStatus;
  lastVerifiedAt: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: 
    | 'CREATE_COLLEGE' 
    | 'UPDATE_COLLEGE' 
    | 'DELETE_COLLEGE' 
    | 'IMPORT_COLLEGES_CSV' 
    | 'IMPORT_CUTOFFS_CSV' 
    | 'UPDATE_VERIFICATION' 
    | 'PUBLISH_NOTICE' 
    | 'MANAGE_BRANCH' 
    | 'MANAGE_AUTHORITY';
  entityType: 'college' | 'branch' | 'cutoff' | 'update' | 'authority';
  entityId: string;
  details: string;
}

export interface Mentor {
  id: string;
  name: string;
  collegeId: string;
  collegeName: string;
  branch: string;
  degree: string;
  academicYear: string;
  avatar: string;
  verifiedIdentity: boolean;
  verifiedCollegeAffiliation: boolean;
  verificationStatus?: 'unsubmitted' | 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  isDemo?: boolean;
  idCardUrl?: string;
  idCardSubmittedAt?: string;
  phone?: string;
  rating: number;
  reviewsCount: number;
  priceINR: number;
  sessionDurationMins: number;
  languages: string[];
  entranceRank: string;
  examName: string;
  bio: string;
  topics: string[];
  availableSlots: {
    id: string;
    date: string;
    time: string;
    isBooked: boolean;
  }[];
  recentReviews: {
    id: string;
    studentName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface CounsellingUpdate {
  id: string;
  authority: AuthorityType | 'NEET UG' | 'KEA KCET' | 'State CET Cell' | string;
  title: string;
  category: 'Registration' | 'Schedule' | 'Seat Matrix' | 'Cutoff' | 'Allotment' | 'Verification';
  publishDate: string;
  lastVerified: string;
  deadlineDate?: string;
  importance: 'Critical' | 'Important' | 'Informational';
  officialSourceUrl: string;
  verified: boolean;
  isIllustrativeDemo?: boolean;
  summary: string;
}

export interface CalendarDeadline {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  authority: string;
  type?: 'Registration' | 'Choice Filling' | 'Mock Allotment' | 'Seat Acceptance' | 'Fee Payment' | 'Reporting' | string;
  milestone_type?: string;
  priority: 'High' | 'Medium' | 'Low';
  isIllustrativeDemo?: boolean;
  is_illustrative_demo?: boolean;
}

export interface ChecklistTask {
  id: string;
  title: string;
  deadline: string;
  authority: string;
  category: string;
  completed: boolean;
  officialLink: string;
  reminderActive: boolean;
}

export type UserRole = 'student' | 'mentor' | 'admin';

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  collegeOrExam?: string;
  rank?: string;
  homeState?: string;
  category?: CategoryType;
  phone?: string;
}

export interface ChoicePreference {
  id?: string;
  collegeId: string;
  collegeName: string;
  branchCode: string;
  branchName: string;
  annualTuitionINR: number;
  medianSalaryLPA: number;
  categoryTag: 'Ambitious' | 'Match' | 'Safe';
  closingRank: number;
  preferenceOrder?: number;
}

export interface BookingRecord {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorCollege: string;
  mentorAvatar: string;
  studentId?: string;
  studentName?: string;
  studentEmail?: string;
  date: string;
  time: string;
  topic: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';
  rejectionReason?: string;
  priceINR: number;
  meetLink: string;
  bookedAt: string;
  notes?: string;
  rating?: number;
  feedbackComment?: string;
}

export interface CollegeReview {
  id: string;
  collegeId: string;
  collegeName: string;
  branch: string;
  graduationYear: string;
  studentName: string;
  verifiedStudent: boolean;
  date: string;
  title: string;
  ratings: ReviewBreakdown;
  pros: string;
  cons: string;
  helpfulVotes: number;
  isFlagged?: boolean;
}

// Student Peer Community Discussion (Abstract Core Feature)
export interface CommunityReply {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorCollege?: string;
  isVerifiedMentor: boolean;
  content: string;
  upvotes: number;
  createdAt: string;
  isDemo?: boolean;
  isFlagged?: boolean;
}

export interface CommunityThread {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorBadge?: string;
  category: 'JoSAA & CSAB' | 'Branch vs College' | 'State Counselling' | 'Placement & Internships' | 'Hostel & Life' | 'General Doubts';
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  repliesCount: number;
  createdAt: string;
  replies: CommunityReply[];
  isDemo?: boolean;
  isFlagged?: boolean;
  flagReason?: string;
  bookmarkedBy?: string[];
}

export interface ModerationReport {
  id: string;
  itemType: 'thread' | 'reply' | 'review' | 'mentor';
  itemId: string;
  itemTitle: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  reportedAt: string;
  moderatorNotes?: string;
}
