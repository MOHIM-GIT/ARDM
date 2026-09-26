/**
 * Data contracts and schema types for ARDM Academy
 */

export type UserRole = 'STUDENT' | 'ADMIN';

export type PaymentVerificationStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
export type AdmitCardAvailabilityStatus = 'Locked' | 'Available';
export type ApplicationReviewStatus = 'Submitted' | 'Processing' | 'Approved' | 'Rejected';
export type ExamProgressStatus = 'Scheduled' | 'Attempted' | 'Completed';

export type GoogleSheetSyncStatus = 'SYNCED' | 'PENDING' | 'FAILED';

export interface SubjectItem {
  id: string;
  name: string;
  category: 'academic' | 'tech';
  description: string;
  icon: string;
  price: number; // Base price from backend
  isActive: boolean;
  syllabusHighlights?: string[];
}

export interface PricingPackage {
  id: string;
  subjectCount: number;
  price: number;
  label: string;
  savings?: number;
  isActive: boolean;
}

export interface StudentProfile {
  id: string; // Internal UUID
  registrationId: string; // e.g. ARDM-2026-8942
  fullName: string;
  dob: string; // YYYY-MM-DD
  email: string;
  mobile: string;
  studentClass: string;
  board: string;
  school: string;
  address: string;
  guardianName?: string;
  guardianPhone?: string;
  teacherName?: string;
  
  selectedSubjectIds: string[];
  selectedSubjectNames: string[];
  registrationDate: string;
  
  // Payment tracking
  paymentStatus: PaymentVerificationStatus;
  paymentTransactionId?: string; // UTR / Txn reference submitted by student
  paymentDate?: string;
  paymentAmount: number;
  paymentScreenshotNote?: string;
  paymentReviewedAt?: string;
  paymentReviewedBy?: string;
  
  // Application & Admit Card
  applicationStatus: ApplicationReviewStatus;
  admitCardStatus: AdmitCardAvailabilityStatus;
  
  // Venue & Examination
  venueId?: string;
  venueName?: string;
  venueAddress?: string;
  venueRoom?: string;
  examId?: string;
  examName?: string;
  examType?: string;
  examDate?: string;
  examTime?: string;
  examStartTime?: string;
  examEndTime?: string;
  examDuration?: string;
  reportingTime?: string;
  examInstructions?: string[];
  
  // Examination & Rank
  examStatus: ExamProgressStatus;
  resultStatus?: 'Published' | 'Pending';
  examRank?: number; // e.g. 27
  totalMarks?: string; // e.g. "86/100"
  percentage?: number;
  score?: number;
  
  // Auth credential
  passwordHash: string;
  passwordNeedsReset?: boolean;
  
  // Sheet sync
  googleSheetStatus: GoogleSheetSyncStatus;
  googleSheetSyncedAt?: string;
  
  createdAt: string;
  updatedAt: string;
}

// Venue structure
export interface Venue {
  id: string;
  name: string;
  address: string;
  roomOrCenter: string;
  capacity: number;
  defaultExamDate: string;
  defaultExamTime: string;
  isActive: boolean;
}

// Subject-wise PYQ (Previous Year Questions)
export interface PYQItem {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  yearRange: string;
  url: string; // External Google Drive / PDF resource. If blank, shows "Coming Soon"
  isEnabled: boolean;
  updatedAt: string;
}

// Free AI & Coding Webinar
export interface WebinarItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  speaker: string;
  meetingLink: string; // If blank or unpublished, shows "Coming Soon"
  registrationLink?: string;
  thumbnailUrl?: string;
  publishStatus?: 'Published' | 'Draft';
  isPublished: boolean;
}

// Free Classes & YouTube Lecture System (Phase 2 Section 8, 9 & 10)
export interface FreeClassVideo {
  id: string;
  title: string;
  youtubeUrl: string; // e.g. https://www.youtube.com/watch?v=...
  thumbnailUrl?: string;
  description: string;
  category?: 'Foundation' | 'Mathematics' | 'Sciences' | 'Computer' | 'Board Strategy' | 'Academic' | 'Technology';
  studentClass: string; // Class 5, Class 6, Class 7, Class 8, Class 9, Class 10, or 'All'
  board?: string; // e.g. 'WBBSE', 'CBSE', 'ICSE', 'All Boards'
  subject: string;
  chapter?: string;
  teacher?: string;
  notesUrl?: string; // Downloadable chapter notes or PDF
  pdfUrl?: string; // Alternative PDF link
  studyMaterialUrl?: string; // External study materials or Google Drive resource
  publishDate: string;
  publishStatus?: 'Published' | 'Draft';
  orderIndex?: number;
  isFeatured?: boolean;
  isPublished: boolean;
}

export type FreeEducationItem = FreeClassVideo;

// Dynamic Course Management System (Phase 2 Section 1, 2, 3, 4, 5, 6, 7)
export interface Course {
  id: string;
  title: string;
  shortBio: string;
  fullDescription: string;
  eligibility: string;
  duration: string;
  level: string; // 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  instructor: string;
  category: string; // 'Academic' | 'Mathematics' | 'Sciences' | 'Coding' | 'Artificial Intelligence' | 'Data Science'
  price: number; // 0 for FREE
  offerPrice?: number;
  isFree: boolean;
  certificateAvailable: boolean;
  bannerUrl: string;
  courseContent: string[];
  courseLink?: string; // Access portal or classroom link
  publishStatus: 'Published' | 'Draft';
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export type CoursePaymentStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Reverification' | 'Active';

export interface CourseEnrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  studentRegistrationId: string; // Links to StudentProfile
  studentName: string;
  studentEmail: string;
  studentMobile: string;
  school?: string;
  amount: number;
  paymentAmount?: number;
  isFree: boolean;
  paymentStatus: CoursePaymentStatus;
  paymentTransactionId?: string; // UTR
  transactionId?: string; // UTR alias
  paymentDate?: string;
  paymentScreenshotUrl?: string;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'Active' | 'Under Review' | 'Reverification' | 'Rejected';
  courseLink?: string;
  enrolledAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  adminNotes?: string;
}

// Merit List Record (Phase 2 Section 12, 13, 14, 16, 17)
export interface MeritRecord {
  id: string;
  studentName: string;
  registrationId: string;
  rank: number;
  score: number;
  totalMarks: number;
  percentage: number;
  grade?: string; // e.g. 'AA', 'A+', 'A'
  institute: string;
  studentClass?: string; // e.g. 'Class 10'
  board?: string; // e.g. 'WBBSE', 'CBSE'
  exam: string;
  batch: string;
  year: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// CBT Exam Builder
export interface CBTExam {
  id: string;
  title: string;
  description: string;
  subject: string;
  questionCount: number;
  durationMinutes: number;
  maxMarks: number;
  negativeMarking: number;
  startDate: string;
  endDate: string;
  venue: string;
  instructions: string[];
  isPublished: boolean;
}

export interface CBTQuestion {
  id: string;
  examId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D'; // Kept securely on admin/server side
  marks: number;
  negativeMarks: number;
  explanation: string;
}

export interface MockQuestion {
  id: string;
  subjectId: string;
  subjectName: string;
  question: string;
  options: string[];
  correctAnswer: number;
  marks: number;
  explanation: string;
}

export interface TestAttemptResult {
  attemptId: string;
  registrationId: string;
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  timeSpentSeconds: number;
  rank?: number;
  completedAt: string;
  passed: boolean;
}

export interface TopperRecord {
  id: string;
  rank: number;
  studentName: string;
  uniqueId: string;
  schoolName: string;
  teachingInstituteName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  year?: string;
  badge: 'gold' | 'silver' | 'bronze' | 'distinction';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}

export interface SiteSettings {
  resultPdfUrl: string;
  resultPdfTitle: string;
  resultPdfPublishedAt: string;
  googleSheetId?: string;
  googleSheetUrl?: string;
  registrationIsOpen: boolean;
  upiVpa: string;
}

export interface Examination {
  id: string;
  name: string; // e.g. "PROSTUTI 2026 Class 10 State-Level Mock Exam"
  type: string; // e.g. "Board Mock Test", "CBT", "Scholarship Test"
  studentClass: string; // e.g. "Class 10"
  board: string; // e.g. "WBBSE (Madhyamik)"
  subject: string; // e.g. "All Subjects Suite" or specific subject
  examDate: string; // e.g. "15 November 2026"
  reportingTime: string; // e.g. "8:30 AM"
  startTime: string; // e.g. "9:00 AM"
  endTime: string; // e.g. "11:00 AM"
  duration: string; // e.g. "2 Hours"
  venue: string; // e.g. "ARDM Central Examination Hub"
  address: string; // e.g. "Bidhan Nagar Educational Complex, Salt Lake, Kolkata"
  room: string; // e.g. "Room 201 – 205, Hall A"
  instructions: string[];
  status: 'Published' | 'Draft' | 'Archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface SyllabusItem {
  id: string;
  studentClass: string;
  board: string;
  subject: string;
  chapter: string;
  topic: string;
  description: string;
  syllabusPdf?: string;
  syllabusUrl?: string;
  status: 'Published' | 'Draft';
  orderIndex: number;
  updatedAt?: string;
}

export interface CBTQuestionItem {
  id: string;
  examId?: string;
  question: string;
  subject: string;
  chapter?: string;
  topic?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionType: 'MCQ' | 'True/False' | 'Single Correct' | 'Multiple Correct';
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  marks: number;
  negativeMarks: number;
  explanation: string;
  status: 'Active' | 'Draft';
}

export interface AdmitCardQRConfig {
  id: string;
  qrType: 'official_whatsapp' | 'custom_upload';
  customQrDataUrl?: string;
  channelUrl: string;
  label: string;
  updatedAt: string;
}

// Backward compatibility alias for existing Registration type
export type Registration = StudentProfile;
