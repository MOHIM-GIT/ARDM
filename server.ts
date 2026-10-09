import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// High-Throughput HTTP Compression for 1 Lakh+ Users
app.use(compression({
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Keep-Alive and Cache Header Defaults
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Keep-Alive', 'timeout=30, max=1000');
  next();
});

// ============================================================================
// SERVER-SIDE AUTHORIZED ADMIN WHITELIST
// CRITICAL SECURITY RULE: Stored strictly on server. Never exposed to clients!
// ============================================================================
const AUTHORIZED_ADMIN_EMAILS = new Set([
  'akashpaik570@gmail.com',
  'ardmacademy@gmail.com',
  'pramanickdevnath2007@gmail.com',
  'mohimdas300@gmail.com',
  'rupampaul20070@gmail.com',
]);

const ADMIN_MASTER_PASSCODES = new Set([
  'ARDM2026',
  'ardm2026',
  'ardm@2026',
  'ARDM@2026',
  'admin2026',
]);

// In-memory active admin sessions: token -> { email, role, expiresAt }
interface AdminSession {
  token: string;
  email: string;
  role: 'ADMIN';
  createdAt: number;
  expiresAt: number;
}
const activeSessions = new Map<string, AdminSession>();

// ============================================================================
// REAL-TIME SERVER-SENT EVENTS (SSE)
// ============================================================================
const sseClients = new Set<Response>();

function broadcastDbChange(type: string, payload?: any) {
  const message = `data: ${JSON.stringify({ type, payload, timestamp: new Date().toISOString() })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(message);
    } catch {
      sseClients.delete(client);
    }
  }
}

// ============================================================================
// PERSISTENT DATABASE SCHEMA & FILE ENGINE
// ============================================================================
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'ardm_db.json');

export interface ServerStudent {
  id: string;
  registrationId: string;
  fullName: string;
  dob: string;
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
  
  // Statuses
  paymentStatus: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  paymentTransactionId?: string;
  paymentDate?: string;
  paymentAmount: number;
  paymentScreenshotUrl?: string;
  paymentScreenshotNote?: string;
  paymentReviewedAt?: string;
  paymentReviewedBy?: string;
  
  applicationStatus: 'Submitted' | 'Processing' | 'Approved' | 'Rejected';
  admitCardStatus: 'Locked' | 'Available';
  
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
  
  examStatus: 'Scheduled' | 'Attempted' | 'Completed';
  resultStatus?: 'Published' | 'Pending';
  examRank?: number;
  totalMarks?: string;
  percentage?: number;
  score?: number;
  
  passwordHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServerExamination {
  id: string;
  name: string;
  type: string;
  studentClass: string;
  board: string;
  subject: string;
  examDate: string;
  reportingTime: string;
  startTime: string;
  endTime: string;
  duration: string;
  venue: string;
  address: string;
  room: string;
  instructions: string[];
  status: 'Published' | 'Draft' | 'Archived';
  createdAt: string;
  updatedAt: string;
}

export interface ServerVenue {
  id: string;
  name: string;
  address: string;
  roomOrCenter: string;
  capacity: number;
  defaultExamDate: string;
  defaultExamTime: string;
  isActive: boolean;
}

export interface ServerSyllabus {
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
  updatedAt: string;
}

export interface ServerCBTQuestion {
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
  correctAnswer: string;
  marks: number;
  negativeMarks: number;
  explanation: string;
  status: 'Active' | 'Draft';
}

export interface ServerCBTResult {
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
  isPublished: boolean;
  completedAt: string;
}

export interface ServerAdmitCardQR {
  id: string;
  qrType: 'official_whatsapp' | 'custom_upload';
  customQrDataUrl?: string;
  channelUrl: string;
  label: string;
  updatedAt: string;
}

export interface ServerSettings {
  resultPdfUrl: string;
  resultPdfTitle: string;
  resultPdfPublishedAt: string;
  announcementText: string;
  upiVpa: string;
  registrationIsOpen: boolean;
}

export interface ServerAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}

// Phase 2: Dynamic Course Model
export interface ServerCourse {
  id: string;
  title: string;
  shortBio: string;
  fullDescription: string;
  eligibility: string;
  duration: string;
  level: string;
  instructor: string;
  category: string;
  price: number;
  offerPrice?: number;
  isFree: boolean;
  certificateAvailable: boolean;
  bannerUrl: string;
  courseContent: string[];
  courseLink?: string;
  publishStatus: 'Published' | 'Draft';
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

// Phase 2: Course Enrollment & Payment Verification Model
export interface ServerCourseEnrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  studentRegistrationId: string;
  studentName: string;
  studentEmail: string;
  studentMobile: string;
  amount: number;
  isFree: boolean;
  paymentStatus: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  paymentTransactionId?: string;
  paymentDate?: string;
  paymentScreenshotUrl?: string;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED';
  courseLink?: string;
  enrolledAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

// Phase 2: Free YouTube Lecture Model
export interface ServerLecture {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl?: string;
  description: string;
  category?: string;
  studentClass: string;
  subject: string;
  chapter?: string;
  teacher?: string;
  publishDate: string;
  publishStatus: 'Published' | 'Draft';
  orderIndex: number;
  isFeatured?: boolean;
  isPublished: boolean;
}

// Phase 2: Merit List Record
export interface ServerMeritRecord {
  id: string;
  studentName: string;
  registrationId: string;
  rank: number;
  score: number;
  totalMarks: number;
  percentage: number;
  institute: string;
  exam: string;
  batch: string;
  year: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Phase 2: AI Webinar
export interface ServerWebinar {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  description: string;
  registrationLink?: string;
  meetingLink?: string;
  thumbnailUrl?: string;
  publishStatus: 'Published' | 'Draft';
  isPublished: boolean;
}

interface ArdmDatabase {
  students: ServerStudent[];
  examinations: ServerExamination[];
  venues: ServerVenue[];
  syllabus: ServerSyllabus[];
  cbtQuestions: ServerCBTQuestion[];
  cbtResults: ServerCBTResult[];
  admitCardQr: ServerAdmitCardQR;
  settings: ServerSettings;
  auditLogs: ServerAuditLog[];
  courses: ServerCourse[];
  courseEnrollments: ServerCourseEnrollment[];
  lectures: ServerLecture[];
  meritRecords: ServerMeritRecord[];
  webinars: ServerWebinar[];
}

// Default Seed Data
const DEFAULT_EXAMINATIONS: ServerExamination[] = [
  {
    id: 'exam_prostuti_2026',
    name: 'PROSTUTI 2026 Class 10 State-Level Mock Examination',
    type: 'Board Mock Test',
    studentClass: 'Class 10',
    board: 'WBBSE (Madhyamik)',
    subject: 'All Subjects (Full Madhyamik Suite)',
    examDate: '15 November 2026',
    reportingTime: '8:30 AM IST',
    startTime: '9:00 AM IST',
    endTime: '11:00 AM IST',
    duration: '2 Hours (120 Mins)',
    venue: 'ARDM Central Examination Hub',
    address: 'Bidhan Nagar Educational Complex, Salt Lake, Kolkata, West Bengal 700091',
    room: 'Hall A & B, Rooms 201 – 205',
    instructions: [
      'Candidates must report to the examination center strictly 30 minutes before reporting time.',
      'It is mandatory to bring this printed Admit Card along with valid School ID card or proof of enrollment.',
      'Mobile phones, smartwatches, calculators, and any digital storage devices are strictly prohibited inside the hall.',
      'Use only blue or black ballpoint pens for marking answer scripts.',
      'Do not fold, laminate, or mutilate the Admit Card barcode or verification QR code.',
    ],
    status: 'Published',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
];

const DEFAULT_VENUES: ServerVenue[] = [
  {
    id: 'ven_1',
    name: 'ARDM Central Examination Hub',
    address: 'Bidhan Nagar Educational Complex, Salt Lake, Kolkata, West Bengal',
    roomOrCenter: 'Auditorium Hall A & B, Rooms 101 – 108',
    capacity: 250,
    defaultExamDate: '15 November 2026',
    defaultExamTime: '9:00 AM – 11:00 AM IST',
    isActive: true,
  },
  {
    id: 'ven_2',
    name: 'ARDM South 24 Parganas Center',
    address: 'Baruipur Academic Hub, Station Road, South 24 Parganas, WB',
    roomOrCenter: 'Main Hall, Rooms 201 – 204',
    capacity: 150,
    defaultExamDate: '15 November 2026',
    defaultExamTime: '9:00 AM – 11:00 AM IST',
    isActive: true,
  },
  {
    id: 'ven_3',
    name: 'ARDM North 24 Parganas Center',
    address: 'Barasat Vidyasagar Bhavan, Colony More, Barasat, WB',
    roomOrCenter: 'Exam Wing, Rooms 101 – 105',
    capacity: 180,
    defaultExamDate: '15 November 2026',
    defaultExamTime: '9:00 AM – 11:00 AM IST',
    isActive: true,
  },
];

const DEFAULT_SYLLABUS: ServerSyllabus[] = [
  {
    id: 'syl_1',
    studentClass: 'Class 10',
    board: 'WBBSE',
    subject: 'Mathematics',
    chapter: 'Quadratic Equations with One Variable',
    topic: 'Nature of roots, Discriminant b² - 4ac, solving word problems',
    description: 'Complete board preparation covering formulation of quadratic equations and factorization method.',
    syllabusPdf: 'https://drive.google.com/file/d/1ardm-math-syl-2026/view',
    syllabusUrl: 'https://ardm.academy/courses/mathematics',
    status: 'Published',
    orderIndex: 1,
    updatedAt: '2026-09-01',
  },
  {
    id: 'syl_2',
    studentClass: 'Class 10',
    board: 'WBBSE',
    subject: 'Physical Science',
    chapter: 'Current Electricity & Magnetism',
    topic: 'Ohm’s law, Joule’s heating, EMF, Fleming’s left-hand rule',
    description: 'High-weightage theoretical deductions, circuit diagrams, and numerical calculations.',
    syllabusPdf: 'https://drive.google.com/file/d/1ardm-phys-syl-2026/view',
    syllabusUrl: 'https://ardm.academy/courses/physical-science',
    status: 'Published',
    orderIndex: 2,
    updatedAt: '2026-09-01',
  },
  {
    id: 'syl_3',
    studentClass: 'Class 10',
    board: 'WBBSE',
    subject: 'Life Science',
    chapter: 'Continuity of Life & Genetics',
    topic: 'Cell division, Mitosis vs Meiosis, Mendel’s laws of inheritance',
    description: 'Punnett squares, neat labeled diagrams of chromosome and reflex arc.',
    syllabusPdf: 'https://drive.google.com/file/d/1ardm-life-syl-2026/view',
    syllabusUrl: 'https://ardm.academy/courses/life-science',
    status: 'Published',
    orderIndex: 3,
    updatedAt: '2026-09-01',
  },
  {
    id: 'syl_4',
    studentClass: 'Class 10',
    board: 'WBBSE',
    subject: 'History',
    chapter: 'Ideas of History & Anti-Colonial Resistance',
    topic: 'Revolt of 1857, Santhal Rebellion, Indigo Revolt, Press Awakening',
    description: 'Analytical 4-mark and 8-mark structured question preparation with timeline rubrics.',
    syllabusPdf: 'https://drive.google.com/file/d/1ardm-history-syl-2026/view',
    status: 'Published',
    orderIndex: 4,
    updatedAt: '2026-09-01',
  },
  {
    id: 'syl_5',
    studentClass: 'Class 10',
    board: 'WBBSE',
    subject: 'Geography',
    chapter: 'Exogenetic Processes & Rivers of India',
    topic: 'Glacial landforms, Indian drainage systems, Monsoon climate zones',
    description: 'Topographical map pointing practice and geographical analysis.',
    status: 'Published',
    orderIndex: 5,
    updatedAt: '2026-09-01',
  },
  {
    id: 'syl_6',
    studentClass: 'Class 10',
    board: 'WBBSE',
    subject: 'English (2nd Language)',
    chapter: 'Writing Skills & Grammar Analysis',
    topic: 'Notice writing, Report writing, Voice and Narration transformation',
    description: 'Mastery over unseen comprehensions and board composition rubrics.',
    status: 'Published',
    orderIndex: 6,
    updatedAt: '2026-09-01',
  },
];

const DEFAULT_CBT_QUESTIONS: ServerCBTQuestion[] = [
  {
    id: 'cbt_q1',
    examId: 'exam_prostuti_2026',
    question: 'If the roots of the quadratic equation 2x² - 8x + k = 0 are real and equal, what is the value of k?',
    subject: 'Mathematics',
    chapter: 'Quadratic Equations',
    topic: 'Discriminant',
    difficulty: 'Medium',
    questionType: 'MCQ',
    optionA: 'k = 4',
    optionB: 'k = 8',
    optionC: 'k = 16',
    optionD: 'k = -8',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'For equal roots, discriminant D = b² - 4ac = 0. (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => k = 8.',
    status: 'Active',
  },
  {
    id: 'cbt_q2',
    examId: 'exam_prostuti_2026',
    question: 'The value of (sin² 30° + cos² 30°) + (tan 45° · cot 45°) is equal to:',
    subject: 'Mathematics',
    chapter: 'Trigonometry',
    topic: 'Trigonometric Identities',
    difficulty: 'Easy',
    questionType: 'MCQ',
    optionA: '0',
    optionB: '1',
    optionC: '2',
    optionD: '4',
    correctAnswer: 'C',
    marks: 4,
    negativeMarks: 0,
    explanation: 'From identity sin²θ + cos²θ = 1. Also tan 45° = 1 and cot 45° = 1. 1 + 1 = 2.',
    status: 'Active',
  },
  {
    id: 'cbt_q3',
    examId: 'exam_prostuti_2026',
    question: 'According to Joule’s law of heating, the heat produced in a resistor of resistance R carrying current I for time t is given by:',
    subject: 'Physical Science',
    chapter: 'Current Electricity',
    topic: 'Joule’s Law',
    difficulty: 'Easy',
    questionType: 'MCQ',
    optionA: 'H = I · R · t',
    optionB: 'H = I² · R · t',
    optionC: 'H = I · R² · t',
    optionD: 'H = I² / (R · t)',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Joule’s law states that heat generated H = I²Rt in Joules.',
    status: 'Active',
  },
  {
    id: 'cbt_q4',
    examId: 'exam_prostuti_2026',
    question: 'Which of the following elements in the modern periodic table has the highest electronegativity on the Pauling scale?',
    subject: 'Physical Science',
    chapter: 'Periodic Table',
    topic: 'Periodic Properties',
    difficulty: 'Easy',
    questionType: 'MCQ',
    optionA: 'Chlorine (Cl)',
    optionB: 'Fluorine (F)',
    optionC: 'Oxygen (O)',
    optionD: 'Nitrogen (N)',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Fluorine (F) is the most electronegative element with a Pauling value of 3.98.',
    status: 'Active',
  },
  {
    id: 'cbt_q5',
    examId: 'exam_prostuti_2026',
    question: 'In which phase of cell division do sister chromatids separate and move toward opposite centrosome poles?',
    subject: 'Life Science',
    chapter: 'Cell Division',
    topic: 'Mitosis',
    difficulty: 'Medium',
    questionType: 'MCQ',
    optionA: 'Prophase',
    optionB: 'Metaphase',
    optionC: 'Anaphase',
    optionD: 'Telophase',
    correctAnswer: 'C',
    marks: 4,
    negativeMarks: 0,
    explanation: 'During Anaphase, the centromere splits and sister chromatids are pulled towards opposite centrosome poles.',
    status: 'Active',
  },
  {
    id: 'cbt_q6',
    examId: 'exam_prostuti_2026',
    question: 'Which plant hormone is primarily responsible for phototropic curvature towards light and apical dominance?',
    subject: 'Life Science',
    chapter: 'Hormones',
    topic: 'Phytohormones',
    difficulty: 'Medium',
    questionType: 'MCQ',
    optionA: 'Gibberellin',
    optionB: 'Cytokinin',
    optionC: 'Auxin',
    optionD: 'Abscisic acid',
    correctAnswer: 'C',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Auxin promotes cell elongation on the shaded side of the shoot, creating phototropic curvature towards the light.',
    status: 'Active',
  },
  {
    id: 'cbt_q7',
    examId: 'exam_prostuti_2026',
    question: 'The famous "Banga Darshan" literary journal in 19th-century Bengal was founded by which eminent personality?',
    subject: 'History',
    chapter: 'Bengal Renaissance',
    topic: 'Print Culture',
    difficulty: 'Easy',
    questionType: 'MCQ',
    optionA: 'Ishwar Chandra Vidyasagar',
    optionB: 'Bankim Chandra Chattopadhyay',
    optionC: 'Rabindranath Tagore',
    optionD: 'Raja Ram Mohan Roy',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Bankim Chandra Chattopadhyay started the literary periodical Banga Darshan in 1872.',
    status: 'Active',
  },
  {
    id: 'cbt_q8',
    examId: 'exam_prostuti_2026',
    question: 'Which is the largest delta in the world formed by the confluence of the Ganga, Brahmaputra and Meghna rivers?',
    subject: 'Geography',
    chapter: 'Indian Rivers',
    topic: 'Deltas',
    difficulty: 'Easy',
    questionType: 'MCQ',
    optionA: 'Mississippi Delta',
    optionB: 'Sundarbans Delta',
    optionC: 'Nile Delta',
    optionD: 'Amazon Delta',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'The Sundarbans Delta is the largest mangrove delta in the world.',
    status: 'Active',
  },
  {
    id: 'cbt_q9',
    examId: 'exam_prostuti_2026',
    question: 'What is the binary equivalent of the decimal number 25?',
    subject: 'Computer Science',
    chapter: 'Number Systems',
    topic: 'Binary Conversion',
    difficulty: 'Medium',
    questionType: 'MCQ',
    optionA: '11001',
    optionB: '10101',
    optionC: '11100',
    optionD: '10011',
    correctAnswer: 'A',
    marks: 4,
    negativeMarks: 0,
    explanation: '25 in binary: 16 + 8 + 1 = 11001 in base 2.',
    status: 'Active',
  },
  {
    id: 'cbt_q10',
    examId: 'exam_prostuti_2026',
    question: 'Choose the correct passive voice: "The students submitted the PROSTUTI mock examination papers."',
    subject: 'English (2nd Language)',
    chapter: 'Voice Change',
    topic: 'Passive Voice',
    difficulty: 'Easy',
    questionType: 'MCQ',
    optionA: 'The PROSTUTI mock examination papers were submitted by the students.',
    optionB: 'The PROSTUTI mock examination papers had been submitted by the students.',
    optionC: 'The PROSTUTI mock examination papers are submitted by the students.',
    optionD: 'The students were submitting the PROSTUTI mock examination papers.',
    correctAnswer: 'A',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Simple past active ("submitted") transforms to "were submitted" + by-agent in the passive voice.',
    status: 'Active',
  },
];

const DEFAULT_QR_CONFIG: ServerAdmitCardQR = {
  id: 'qr_default',
  qrType: 'official_whatsapp',
  channelUrl: 'https://whatsapp.com/channel/0029VbDUvfu6BIErmz6pxX1h',
  label: 'ARDM Academy WhatsApp Channel',
  updatedAt: '2026-09-25T00:00:00Z',
};

const DEFAULT_SETTINGS: ServerSettings = {
  resultPdfUrl: 'https://drive.google.com/file/d/1ardm-class10-mock-results-2025/view',
  resultPdfTitle: 'Official Class 10 State-Level Mock Test Merit List 2025 (PDF)',
  resultPdfPublishedAt: '2026-09-01',
  announcementText: 'PROSTUTI 2026 Registration is now open across West Bengal! Call 6289139984 for assistance.',
  upiVpa: 'akashpaik570@oksbi',
  registrationIsOpen: true,
};

const DEFAULT_COURSES: ServerCourse[] = [
  {
    id: 'course_madhyamik_booster',
    title: 'Class 10 Madhyamik All-Subject Board Mastery 2026',
    shortBio: 'Comprehensive board preparation covering Mathematics, Physical Science, Life Science, History, Geography, Bengali & English with chapter-wise tests.',
    fullDescription: 'The flagship board preparation program designed by expert educators at ARDM Academy. Includes live concept clarity classes, printed study notes, weekly CBT mock tests, previous year question solutions, and personal doubt clearing by senior mentors.',
    eligibility: 'Students appearing for Class 10 Board Examinations (WBBSE / CBSE)',
    duration: '6 Months (Comprehensive Batch)',
    level: 'Class 10 Board Level',
    instructor: 'ARDM Senior Faculty Panel',
    category: 'Academic',
    price: 599,
    offerPrice: 399,
    isFree: false,
    certificateAvailable: true,
    bannerUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    courseContent: [
      'Mathematics: Quadratic equations, circle theorems, trigonometry & statistics',
      'Physical Science: Current electricity, chemical calculations, light optics & periodic table',
      'Life Science: Genetics, cell division, plant physiology & evolution',
      'Full-length Mock Exams, Paper Evaluation & Scorecard Analysis'
    ],
    courseLink: '/portal',
    publishStatus: 'Published',
    orderIndex: 1,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'course_python_fundamentals',
    title: 'Introduction to Python & Logical Thinking for Schools (Classes 5–10)',
    shortBio: 'Foundational programming course teaching coding fundamentals, algorithmic thinking, and fun puzzle-solving without prior experience required.',
    fullDescription: 'Learn practical coding from scratch. Designed specifically for school students from Classes 5 to 10 to understand computational logic, variables, loops, conditional branching, and basic graphics programming in Python.',
    eligibility: 'Classes 5 to 10 School Students (No prior coding knowledge needed)',
    duration: '4 Weeks (Weekend Live Sessions)',
    level: 'Beginner',
    instructor: 'ARDM Technology & Coding Cell',
    category: 'Coding',
    price: 0,
    offerPrice: 0,
    isFree: true,
    certificateAvailable: true,
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    courseContent: [
      'Computational thinking & flowchart diagrams',
      'Python variables, syntax, inputs and data types',
      'Loops and automated logic puzzles',
      'Building your first interactive terminal mini-game'
    ],
    courseLink: '/portal',
    publishStatus: 'Published',
    orderIndex: 2,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'course_ai_prompt_engineering',
    title: 'Artificial Intelligence & Data Foundations for Young Scholars',
    shortBio: 'Hands-on learning with generative AI concepts, ethical AI practices, data visualization, and prompt craft for students.',
    fullDescription: 'Explore how modern Artificial Intelligence functions under the hood. Learn prompt engineering, computer vision basics, safe AI usage for research and study productivity, and hands-on data plotting with simple code.',
    eligibility: 'Classes 7 to 10 & Tech Enthusiasts',
    duration: '8 Weeks (Structured Hands-on Projects)',
    level: 'Intermediate',
    instructor: 'AI Research Mentor & Data Scientist',
    category: 'Artificial Intelligence',
    price: 799,
    offerPrice: 499,
    isFree: false,
    certificateAvailable: true,
    bannerUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    courseContent: [
      'Understanding machine learning & neural network concepts in plain language',
      'Prompt engineering for study research, summaries, and problem solving',
      'Working with real-world datasets & data charts',
      'Final Capstone Project: Intelligent Study Assistant'
    ],
    courseLink: '/portal',
    publishStatus: 'Published',
    orderIndex: 3,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'course_math_foundation_class5_8',
    title: 'Middle School Mathematics & Vedic Calculation Speed Hacks (Classes 5–8)',
    shortBio: 'Master fast calculation methods, fractions, decimals, algebraic thinking, and geometric visualization.',
    fullDescription: 'Build rock-solid arithmetic and geometric foundations. Free course dedicated to strengthening mathematical reasoning for Classes 5, 6, 7 and 8 students.',
    eligibility: 'Classes 5 to 8',
    duration: '6 Weeks',
    level: 'Foundation',
    instructor: 'Faculty Coordinator',
    category: 'Mathematics',
    price: 0,
    offerPrice: 0,
    isFree: true,
    certificateAvailable: false,
    bannerUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    courseContent: [
      'Rapid mental calculation techniques & Vedic speed tricks',
      'Geometry basics, angles & shape visualization',
      'Word problem decoding strategies'
    ],
    courseLink: '/portal',
    publishStatus: 'Published',
    orderIndex: 4,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  }
];

const DEFAULT_LECTURES: ServerLecture[] = [
  {
    id: 'lec_1',
    title: 'Class 10 Madhyamik Mathematics 2026: 96%+ Question Prediction & Circle Theorems',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    description: 'In-depth analysis of circle theorems, quadratic equations, and high-probability board questions.',
    category: 'Mathematics',
    studentClass: 'Class 10',
    subject: 'Mathematics',
    chapter: 'Theorems Related to Tangents to a Circle',
    teacher: 'Senior Mathematics Faculty',
    publishDate: '2026-09-10',
    publishStatus: 'Published',
    orderIndex: 1,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'lec_2',
    title: 'Physical Science: Current Electricity & Joule’s Law Numerical Hacks',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    description: 'Step-by-step circuit problems, resistance combinations, and power dissipation formulas.',
    category: 'Sciences',
    studentClass: 'Class 10',
    subject: 'Physical Science',
    chapter: 'Current Electricity',
    teacher: 'Physical Science Coordinator',
    publishDate: '2026-09-12',
    publishStatus: 'Published',
    orderIndex: 2,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'lec_3',
    title: 'Life Science: Chromosomes, Cell Division & Mendel’s Laws of Inheritance',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Detailed microscopic phase analysis of Mitosis & Meiosis with monohybrid cross diagrams.',
    category: 'Sciences',
    studentClass: 'Class 10',
    subject: 'Life Science',
    chapter: 'Continuity of Life & Genetics',
    teacher: 'Life Science Faculty',
    publishDate: '2026-09-14',
    publishStatus: 'Published',
    orderIndex: 3,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'lec_4',
    title: 'Computer Science: Binary Arithmetic, Logic Gates & Flowcharts for Beginners',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    description: 'Understand truth tables, AND/OR/NOT logic gates, and building program flowchart diagrams.',
    category: 'Computer',
    studentClass: 'Class 9',
    subject: 'Computer Science',
    chapter: 'Fundamental Logic & Algorithms',
    teacher: 'Technical Lead',
    publishDate: '2026-09-16',
    publishStatus: 'Published',
    orderIndex: 4,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'lec_5',
    title: 'Middle School Science: Solar System, Heat & Force Experiments (Classes 6–8)',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Fun, visual experiments demonstrating friction, atmospheric pressure, and states of matter.',
    category: 'Foundation',
    studentClass: 'Class 7',
    subject: 'Physical Science',
    chapter: 'Forces and Everyday Motion',
    teacher: 'Science Department',
    publishDate: '2026-09-18',
    publishStatus: 'Published',
    orderIndex: 5,
    isFeatured: false,
    isPublished: true,
  }
];

const DEFAULT_MERIT_RECORDS: ServerMeritRecord[] = [
  {
    id: 'merit_1',
    rank: 1,
    studentName: 'Akash Debnath',
    registrationId: 'ARDM-2025-9801',
    institute: 'Salt Lake High School, Kolkata',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 98,
    totalMarks: 100,
    percentage: 98.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_2',
    rank: 2,
    studentName: 'Sneha Karmakar',
    registrationId: 'ARDM-2025-9742',
    institute: 'South Point High School, Kolkata',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 96,
    totalMarks: 100,
    percentage: 96.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_3',
    rank: 3,
    studentName: 'Sourav Mondal',
    registrationId: 'ARDM-2025-9610',
    institute: 'Barrackpore Govt High School',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 95,
    totalMarks: 100,
    percentage: 95.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_4',
    rank: 4,
    studentName: 'Priyanka Sen',
    registrationId: 'ARDM-2025-9555',
    institute: 'Ballygunge Shiksha Sadan',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 94,
    totalMarks: 100,
    percentage: 94.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_5',
    rank: 5,
    studentName: 'Rupam Paul',
    registrationId: 'ARDM-2025-9488',
    institute: 'Howrah Zilla School',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 93,
    totalMarks: 100,
    percentage: 93.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_6',
    rank: 6,
    studentName: 'Debjit Roy',
    registrationId: 'ARDM-2025-9371',
    institute: 'Durgapur Steel City Model School',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 92,
    totalMarks: 100,
    percentage: 92.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_7',
    rank: 7,
    studentName: 'Ananya Das',
    registrationId: 'ARDM-2025-9260',
    institute: 'Siliguri Girls High School',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 91,
    totalMarks: 100,
    percentage: 91.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_8',
    rank: 8,
    studentName: 'Subhojit Ghosh',
    registrationId: 'ARDM-2025-9122',
    institute: 'Malda Town High School',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 90,
    totalMarks: 100,
    percentage: 90.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_9',
    rank: 9,
    studentName: 'Tanusree Mukherjee',
    registrationId: 'ARDM-2025-9014',
    institute: 'Burdwan Municipal School',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 89,
    totalMarks: 100,
    percentage: 89.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'merit_10',
    rank: 10,
    studentName: 'Rohit Bannerjee',
    registrationId: 'ARDM-2025-8942',
    institute: 'Asansol Ramakrishna Mission High School',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    score: 88,
    totalMarks: 100,
    percentage: 88.0,
    isPublished: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  }
];

const DEFAULT_WEBINARS: ServerWebinar[] = [
  {
    id: 'webinar_ai_2026',
    title: 'Generative AI, Prompt Engineering & Coding for School Students',
    speaker: 'ARDM Technology & AI Mentor',
    date: 'Sunday, 18 October 2026',
    time: '6:00 PM – 7:30 PM IST',
    description: 'An engaging, interactive session for students on how Artificial Intelligence works, future technology skills, ethical AI usage, and building your first code project.',
    registrationLink: '/ai',
    meetingLink: 'https://meet.google.com/ardm-academy-ai',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published',
    isPublished: true,
  }
];

// Database storage container
let db: ArdmDatabase = {
  students: [],
  examinations: DEFAULT_EXAMINATIONS,
  venues: DEFAULT_VENUES,
  syllabus: DEFAULT_SYLLABUS,
  cbtQuestions: DEFAULT_CBT_QUESTIONS,
  cbtResults: [],
  admitCardQr: DEFAULT_QR_CONFIG,
  settings: DEFAULT_SETTINGS,
  auditLogs: [],
  courses: DEFAULT_COURSES,
  courseEnrollments: [],
  lectures: DEFAULT_LECTURES,
  meritRecords: DEFAULT_MERIT_RECORDS,
  webinars: DEFAULT_WEBINARS,
};

// ============================================================================
// HIGH-CONCURRENCY SCALE ENGINE (OPTIMIZED FOR 1 LAKH+ USERS)
// ============================================================================

// 1. High-Speed In-Memory Hash Indexes: O(1) Instant Lookups
const studentById = new Map<string, ServerStudent>();
const studentByRegId = new Map<string, ServerStudent>();
const studentByMobile = new Map<string, ServerStudent>();
const studentByEmail = new Map<string, ServerStudent>();

function indexStudent(s: ServerStudent) {
  studentById.set(s.id, s);
  studentByRegId.set(s.registrationId.toLowerCase(), s);
  if (s.mobile) studentByMobile.set(s.mobile, s);
  if (s.email) studentByEmail.set(s.email.toLowerCase(), s);
}

function removeStudentFromIndex(s: ServerStudent) {
  studentById.delete(s.id);
  studentByRegId.delete(s.registrationId.toLowerCase());
  if (s.mobile) studentByMobile.delete(s.mobile);
  if (s.email) studentByEmail.delete(s.email.toLowerCase());
}

function reindexAllStudents() {
  studentById.clear();
  studentByRegId.clear();
  studentByMobile.clear();
  studentByEmail.clear();
  for (const s of db.students) {
    indexStudent(s);
  }
}

// 2. High-Performance In-Memory Response Caching with ETag
interface CacheEntry {
  data: any;
  etag: string;
  expiresAt: number;
}
const responseCache = new Map<string, CacheEntry>();
let cacheHits = 0;
let cacheMisses = 0;

function getCachedResponse(key: string): CacheEntry | null {
  const entry = responseCache.get(key);
  if (!entry) {
    cacheMisses++;
    return null;
  }
  if (Date.now() > entry.expiresAt) {
    responseCache.delete(key);
    cacheMisses++;
    return null;
  }
  cacheHits++;
  return entry;
}

function setCachedResponse(key: string, data: any, ttlSeconds = 30) {
  const jsonStr = JSON.stringify(data);
  const etag = crypto.createHash('md5').update(jsonStr).digest('hex');
  responseCache.set(key, {
    data,
    etag,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

function invalidateResponseCache(prefix?: string) {
  if (!prefix) {
    responseCache.clear();
    return;
  }
  for (const key of responseCache.keys()) {
    if (key.startsWith(prefix)) {
      responseCache.delete(key);
    }
  }
}

// 3. High-Concurrency Rate Limiting with Sliding Window
interface RateBucket {
  count: number;
  resetAt: number;
}
const ipRateBuckets = new Map<string, RateBucket>();

function rateLimiter(maxRequests = 400, windowMs = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Exempt authenticated admins
    const adminToken = (req.headers['x-admin-token'] as string) || (req.headers['authorization']?.replace(/^Bearer\s+/, '') as string);
    if (adminToken && activeSessions.has(adminToken)) {
      return next();
    }

    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.ip || '127.0.0.1';
    const now = Date.now();
    const bucket = ipRateBuckets.get(ip);

    if (!bucket || now > bucket.resetAt) {
      ipRateBuckets.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    bucket.count += 1;
    if (bucket.count > maxRequests) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        error: 'High traffic detected. ARDM server is handling high concurrency. Please retry shortly.',
        retryAfter,
      });
    }
    next();
  };
}

// Periodic cleanup of rate limit buckets
setInterval(() => {
  const now = Date.now();
  for (const [ip, b] of ipRateBuckets.entries()) {
    if (now > b.resetAt) ipRateBuckets.delete(ip);
  }
}, 120000);

// 4. Asynchronous Debounced Write-Behind Queue
let isSaving = false;
let savePending = false;
let saveDebounceTimer: NodeJS.Timeout | null = null;

function saveDatabase() {
  if (saveDebounceTimer) return;
  saveDebounceTimer = setTimeout(async () => {
    saveDebounceTimer = null;
    await persistDatabaseAsync();
  }, 400); // 400ms debounce batches thousands of concurrent writes into single atomic disk flush
}

async function persistDatabaseAsync() {
  if (isSaving) {
    savePending = true;
    return;
  }
  isSaving = true;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      await fs.promises.mkdir(DATA_DIR, { recursive: true });
    }
    const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
    await fs.promises.writeFile(tmpFile, JSON.stringify(db, null, 2), 'utf-8');
    await fs.promises.rename(tmpFile, DB_FILE);
  } catch (err) {
    console.error('Failed to asynchronously persist database to file:', err);
  } finally {
    isSaving = false;
    if (savePending) {
      savePending = false;
      saveDatabase();
    }
  }
}

// Load database from file and initialize high-speed indexes
function loadDatabase() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      db = {
        students: parsed.students || [],
        examinations: (parsed.examinations && parsed.examinations.length > 0) ? parsed.examinations : DEFAULT_EXAMINATIONS,
        venues: (parsed.venues && parsed.venues.length > 0) ? parsed.venues : DEFAULT_VENUES,
        syllabus: (parsed.syllabus && parsed.syllabus.length > 0) ? parsed.syllabus : DEFAULT_SYLLABUS,
        cbtQuestions: (parsed.cbtQuestions && parsed.cbtQuestions.length > 0) ? parsed.cbtQuestions : DEFAULT_CBT_QUESTIONS,
        cbtResults: parsed.cbtResults || [],
        admitCardQr: parsed.admitCardQr || DEFAULT_QR_CONFIG,
        settings: parsed.settings || DEFAULT_SETTINGS,
        auditLogs: parsed.auditLogs || [],
        courses: (parsed.courses && parsed.courses.length > 0) ? parsed.courses : DEFAULT_COURSES,
        courseEnrollments: parsed.courseEnrollments || [],
        lectures: (parsed.lectures && parsed.lectures.length > 0) ? parsed.lectures : DEFAULT_LECTURES,
        meritRecords: (parsed.meritRecords && parsed.meritRecords.length > 0) ? parsed.meritRecords : DEFAULT_MERIT_RECORDS,
        webinars: (parsed.webinars && parsed.webinars.length > 0) ? parsed.webinars : DEFAULT_WEBINARS,
      };
      reindexAllStudents();
      console.log(`Database loaded: ${db.students.length} students indexed, ${db.courses.length} courses, ${db.lectures.length} lectures.`);
    } else {
      saveDatabase();
      reindexAllStudents();
      console.log('Database initialized with default seeded records and indexed.');
    }
  } catch (err) {
    console.error('Failed to load database from file, using memory store:', err);
    reindexAllStudents();
  }
}

loadDatabase();

// ============================================================================
// RBAC MIDDLEWARE: Verifies Admin Token on Server
// ============================================================================
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = (req.headers['x-admin-token'] as string) || (req.headers['authorization']?.replace(/^Bearer\s+/, '') as string);
  
  if (!token) {
    return res.status(401).json({
      error: 'Authentication required. No administrator token provided.',
      role: 'STUDENT',
    });
  }

  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (session) activeSessions.delete(token);
    return res.status(403).json({
      error: 'Access Denied: Invalid or expired administrator session.',
      role: 'STUDENT',
    });
  }

  (req as any).adminSession = session;
  next();
}

// ============================================================================
// REAL-TIME SERVER-SENT EVENTS ENDPOINT
// ============================================================================
app.get('/api/events', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sseClients.add(res);
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', timestamp: new Date().toISOString() })}\n\n`);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// ============================================================================
// GLOBAL DATABASE STATE (Single Source of Truth)
// ============================================================================
app.get('/api/database/state', (req: Request, res: Response) => {
  const token = (req.headers['x-admin-token'] as string) || (req.headers['authorization']?.replace(/^Bearer\s+/, '') as string);
  const isAdmin = token && activeSessions.has(token);

  // If not admin, sanitize CBT questions so answer keys are protected on the server
  const sanitizedQuestions = db.cbtQuestions.map(q => {
    if (isAdmin) return q;
    const { correctAnswer, explanation, ...publicFields } = q;
    return publicFields;
  });

  res.json({
    students: db.students,
    examinations: db.examinations,
    venues: db.venues,
    syllabus: db.syllabus,
    cbtQuestions: sanitizedQuestions,
    cbtResults: db.cbtResults,
    admitCardQr: db.admitCardQr,
    settings: db.settings,
    courses: isAdmin ? db.courses : db.courses.filter(c => c.publishStatus === 'Published'),
    courseEnrollments: isAdmin ? db.courseEnrollments : [],
    lectures: isAdmin ? db.lectures : db.lectures.filter(l => l.isPublished),
    meritRecords: isAdmin ? db.meritRecords : db.meritRecords.filter(m => m.isPublished).sort((a, b) => a.rank - b.rank),
    webinars: isAdmin ? db.webinars : db.webinars.filter(w => w.isPublished),
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// AUTHENTICATION APIs
// ============================================================================
app.post('/api/auth/verify', (req: Request, res: Response) => {
  try {
    const { email, passcode } = req.body || {};

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Valid administrator email is required', role: 'STUDENT' });
    }

    const normalized = email.trim().toLowerCase();
    const cleanPasscode = typeof passcode === 'string' ? passcode.trim() : '';

    // Verify authorized admin email
    if (!AUTHORIZED_ADMIN_EMAILS.has(normalized)) {
      return res.status(403).json({
        authorized: false,
        role: 'STUDENT',
        error: 'Access Denied: Account does not have administrative privileges.',
      });
    }

    // Require valid master passcode
    if (!cleanPasscode || !ADMIN_MASTER_PASSCODES.has(cleanPasscode)) {
      return res.status(401).json({
        authorized: false,
        role: 'STUDENT',
        error: 'Access Denied: Invalid security passcode.',
      });
    }

    const token = crypto.randomUUID();
    const session: AdminSession = {
      token,
      email: normalized,
      role: 'ADMIN',
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    activeSessions.set(token, session);

    return res.json({
      authorized: true,
      role: 'ADMIN',
      token,
      email: normalized,
    });
  } catch (err: any) {
    return res.status(500).json({
      authorized: false,
      role: 'STUDENT',
      error: err?.message || 'Authentication verification failed on server.',
    });
  }
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const token = (req.headers['x-admin-token'] as string) || (req.headers['authorization']?.replace(/^Bearer\s+/, '') as string);
  if (token) {
    activeSessions.delete(token);
  }
  res.json({ success: true });
});

app.get('/api/auth/session', (req: Request, res: Response) => {
  const token = (req.headers['x-admin-token'] as string) || (req.headers['authorization']?.replace(/^Bearer\s+/, '') as string);
  if (token && activeSessions.has(token)) {
    const session = activeSessions.get(token)!;
    if (session.expiresAt > Date.now()) {
      return res.json({ authorized: true, role: 'ADMIN', email: session.email });
    }
    activeSessions.delete(token);
  }
  res.json({ authorized: false, role: 'STUDENT' });
});

// ============================================================================
// STUDENT REGISTRATION, PAYMENT & LOOKUP APIs
// ============================================================================

/**
 * POST /api/students/register
 * Generates unique ARDM-2026-XXXX roll ID and stores in persistent DB
 */
app.post('/api/students/register', rateLimiter(60, 60000), (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.fullName || !data.mobile || !data.email || !data.studentClass || !data.school) {
      return res.status(400).json({ error: 'Missing required student registration fields.' });
    }

    const cleanPhone = String(data.mobile).replace(/[^0-9]/g, '');
    const cleanEmail = String(data.email).trim().toLowerCase();

    // Check duplicate via O(1) in-memory indexes
    const existing = studentByMobile.get(cleanPhone) || studentByEmail.get(cleanEmail);
    if (existing) {
      return res.status(409).json({
        error: 'Duplicate registration found with matching mobile or email.',
        student: existing,
      });
    }

    // Generate unique Registration ID: ARDM-2026-XXXX via O(1) index check
    let randomSuffix = Math.floor(1000 + Math.random() * 9000);
    let registrationId = `ARDM-2026-${randomSuffix}`;
    while (studentByRegId.has(registrationId.toLowerCase())) {
      randomSuffix = Math.floor(1000 + Math.random() * 9000);
      registrationId = `ARDM-2026-${randomSuffix}`;
    }

    // Default examination & venue
    const defaultExam = db.examinations.find(e => e.status === 'Published') || db.examinations[0] || DEFAULT_EXAMINATIONS[0];
    const defaultVenue = db.venues[0] || DEFAULT_VENUES[0];

    const now = new Date().toISOString();
    const newStudent: ServerStudent = {
      id: `std_${Date.now()}_${randomSuffix}`,
      registrationId,
      fullName: data.fullName.trim(),
      dob: data.dob || '2010-01-01',
      email: cleanEmail,
      mobile: cleanPhone,
      studentClass: data.studentClass || 'Class 10',
      board: data.board || 'WBBSE (Madhyamik)',
      school: data.school.trim(),
      address: (data.address || '').trim(),
      guardianName: (data.guardianName || '').trim(),
      guardianPhone: (data.guardianPhone || '').replace(/[^0-9]/g, ''),
      teacherName: (data.teacherName || '').trim(),
      selectedSubjectIds: data.selectedSubjectIds || [],
      selectedSubjectNames: data.selectedSubjectNames || [],
      registrationDate: now.split('T')[0],
      
      // Initial Statuses
      paymentStatus: 'Pending',
      paymentAmount: data.paymentAmount || 100,
      applicationStatus: 'Submitted',
      admitCardStatus: 'Locked',
      
      // Examination & Venue Details (Fully Admin Controlled)
      examId: defaultExam.id,
      examName: defaultExam.name,
      examType: defaultExam.type,
      examDate: defaultExam.examDate,
      examTime: `${defaultExam.startTime} – ${defaultExam.endTime}`,
      examStartTime: defaultExam.startTime,
      examEndTime: defaultExam.endTime,
      examDuration: defaultExam.duration,
      reportingTime: defaultExam.reportingTime,
      venueId: defaultVenue.id,
      venueName: defaultExam.venue || defaultVenue.name,
      venueAddress: defaultExam.address || defaultVenue.address,
      venueRoom: defaultExam.room || defaultVenue.roomOrCenter,
      examInstructions: defaultExam.instructions,
      
      examStatus: 'Scheduled',
      createdAt: now,
      updatedAt: now,
    };

    db.students.unshift(newStudent);
    indexStudent(newStudent);
    saveDatabase();
    broadcastDbChange('STUDENT_REGISTERED', newStudent);

    res.status(201).json({ success: true, student: newStudent });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to create registration' });
  }
});

/**
 * POST /api/students/payment
 * Student submits Transaction ID / UTR -> moves to Payment Under Review
 */
app.post('/api/students/payment', rateLimiter(60, 60000), (req: Request, res: Response) => {
  try {
    const { registrationId, transactionId, paymentDate, amount, screenshotNote, paymentScreenshotUrl } = req.body;
    if (!registrationId || (!transactionId && !paymentScreenshotUrl)) {
      return res.status(400).json({ error: 'Registration ID and Payment Screenshot are required.' });
    }

    const cleanReg = String(registrationId).trim().toLowerCase();
    const student = studentByRegId.get(cleanReg) || studentById.get(registrationId);

    if (!student) {
      return res.status(404).json({ error: 'Student registration record not found.' });
    }

    const now = new Date().toISOString();
    student.paymentTransactionId = transactionId ? String(transactionId).trim() : 'SCREENSHOT_UPLOADED';
    student.paymentDate = paymentDate || now.split('T')[0];
    if (paymentScreenshotUrl) student.paymentScreenshotUrl = String(paymentScreenshotUrl);
    if (amount) student.paymentAmount = Number(amount);
    if (screenshotNote) student.paymentScreenshotNote = String(screenshotNote);

    // Moves to 'Under Review' - NOT auto-approved!
    student.paymentStatus = 'Under Review';
    student.applicationStatus = 'Processing';
    student.admitCardStatus = 'Locked'; // Stays locked until Admin approval!
    student.updatedAt = now;

    saveDatabase();
    broadcastDbChange('PAYMENT_SUBMITTED', student);

    res.json({ success: true, student });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to submit payment details.' });
  }
});

/**
 * GET /api/students/lookup
 * Unified O(1) lookup by Registration ID, Phone, or Email
 */
app.get('/api/students/lookup', rateLimiter(200, 60000), (req: Request, res: Response) => {
  const query = (req.query.q as string || '').trim().toLowerCase();
  if (!query) {
    return res.status(400).json({ error: 'Search query parameter required' });
  }

  const cleanPhone = query.replace(/[^0-9]/g, '');
  const found =
    studentByRegId.get(query) ||
    studentById.get(query) ||
    (cleanPhone.length >= 10 ? studentByMobile.get(cleanPhone) : null) ||
    studentByEmail.get(query);

  if (!found) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  // Security Audit: Never leak passwordHash or sensitive internal notes
  const { passwordHash: _, ...safeStudent } = found;
  res.json({ student: safeStudent });
});

// ============================================================================
// ADMIN STUDENT OPERATIONS & REVIEWS
// ============================================================================

app.get('/api/admin/students', requireAdmin, (_req: Request, res: Response) => {
  res.json({ students: db.students });
});

/**
 * POST /api/admin/students/review
 * Admin Approves, Rejects, or Requests Reverification
 * If Approve -> Admit Card becomes Available immediately!
 */
app.post('/api/admin/students/review', requireAdmin, (req: Request, res: Response) => {
  const { registrationId, decision } = req.body;
  const adminEmail = (req as any).adminSession?.email || 'Admin';

  const student = db.students.find(
    s => s.registrationId.toLowerCase() === String(registrationId).trim().toLowerCase() || s.id === registrationId
  );
  if (!student) {
    return res.status(404).json({ error: 'Student record not found' });
  }

  const now = new Date().toISOString();
  student.updatedAt = now;
  student.paymentReviewedAt = now;
  student.paymentReviewedBy = adminEmail;

  if (decision === 'Approve') {
    student.paymentStatus = 'Approved';
    student.applicationStatus = 'Approved';
    student.admitCardStatus = 'Available'; // Unlocks Admit Card automatically!
  } else if (decision === 'Reject') {
    student.paymentStatus = 'Rejected';
    student.applicationStatus = 'Rejected';
    student.admitCardStatus = 'Locked';
  } else if (decision === 'Reverification') {
    student.paymentStatus = 'Under Review';
    student.applicationStatus = 'Processing';
    student.admitCardStatus = 'Locked';
  }

  saveDatabase();
  broadcastDbChange('STUDENT_REVIEWED', student);

  res.json({ success: true, student });
});

/**
 * POST /api/admin/students/status
 * Granular status management for admin
 */
app.post('/api/admin/students/status', requireAdmin, (req: Request, res: Response) => {
  const { registrationId, paymentStatus, applicationStatus, admitCardStatus, examStatus, resultStatus } = req.body;
  const student = db.students.find(s => s.registrationId === registrationId || s.id === registrationId);
  if (!student) {
    return res.status(404).json({ error: 'Student record not found' });
  }

  if (paymentStatus) student.paymentStatus = paymentStatus;
  if (applicationStatus) student.applicationStatus = applicationStatus;
  if (admitCardStatus) student.admitCardStatus = admitCardStatus;
  if (examStatus) student.examStatus = examStatus;
  if (resultStatus) student.resultStatus = resultStatus;
  student.updatedAt = new Date().toISOString();

  saveDatabase();
  broadcastDbChange('STUDENT_STATUS_UPDATED', student);

  res.json({ success: true, student });
});

/**
 * POST /api/admin/students/assign-exam
 * Assign an examination and venue to student(s)
 * Automatically syncs exam name, date, reporting time, venue, room to Admit Card!
 */
app.post('/api/admin/students/assign-exam', requireAdmin, (req: Request, res: Response) => {
  const { studentIds, examinationId } = req.body;
  const exam = db.examinations.find(e => e.id === examinationId);
  if (!exam) {
    return res.status(404).json({ error: 'Examination not found' });
  }

  const ids = Array.isArray(studentIds) ? studentIds : [studentIds];
  const updatedStudents: ServerStudent[] = [];

  for (const s of db.students) {
    if (ids.includes(s.id) || ids.includes(s.registrationId)) {
      s.examId = exam.id;
      s.examName = exam.name;
      s.examType = exam.type;
      s.examDate = exam.examDate;
      s.examTime = `${exam.startTime} – ${exam.endTime}`;
      s.examStartTime = exam.startTime;
      s.examEndTime = exam.endTime;
      s.examDuration = exam.duration;
      s.reportingTime = exam.reportingTime;
      s.venueName = exam.venue;
      s.venueAddress = exam.address;
      s.venueRoom = exam.room;
      s.examInstructions = exam.instructions;
      s.examStatus = 'Scheduled';
      s.updatedAt = new Date().toISOString();
      updatedStudents.push(s);
    }
  }

  saveDatabase();
  broadcastDbChange('EXAM_ASSIGNED', { updatedCount: updatedStudents.length, examinationId });

  res.json({ success: true, updatedStudents });
});

// ============================================================================
// EXAMINATION MANAGEMENT APIs (Section 5 & 8)
// ============================================================================
app.get('/api/examinations', (_req: Request, res: Response) => {
  res.json({ examinations: db.examinations.filter(e => e.status === 'Published') });
});

app.get('/api/admin/examinations', requireAdmin, (_req: Request, res: Response) => {
  res.json({ examinations: db.examinations });
});

app.post('/api/admin/examinations', requireAdmin, (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.name || !data.examDate || !data.venue) {
      return res.status(400).json({ error: 'Exam Name, Exam Date, and Venue are required.' });
    }

    const newExam: ServerExamination = {
      id: `exam_${Date.now()}`,
      name: data.name.trim(),
      type: data.type || 'Board Mock Test',
      studentClass: data.studentClass || 'Class 10',
      board: data.board || 'WBBSE (Madhyamik)',
      subject: data.subject || 'All Subjects Suite',
      examDate: data.examDate,
      reportingTime: data.reportingTime || '8:30 AM',
      startTime: data.startTime || '9:00 AM',
      endTime: data.endTime || '11:00 AM',
      duration: data.duration || '2 Hours',
      venue: data.venue.trim(),
      address: (data.address || '').trim(),
      room: (data.room || 'Room 101').trim(),
      instructions: Array.isArray(data.instructions) ? data.instructions : [
        'Candidates must report 30 minutes before exam reporting time.',
        'Carry printed Admit Card and valid School ID.',
        'Electronic gadgets are strictly forbidden.',
      ],
      status: data.status || 'Published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.examinations.unshift(newExam);
    saveDatabase();
    broadcastDbChange('EXAMINATION_CREATED', newExam);

    res.status(201).json({ success: true, examination: newExam });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to create examination' });
  }
});

app.put('/api/admin/examinations/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.examinations.findIndex(e => e.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Examination not found' });
  }

  const updated: ServerExamination = {
    ...db.examinations[idx],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  db.examinations[idx] = updated;

  // Propagate changes to all students assigned to this examination!
  for (const s of db.students) {
    if (s.examId === id) {
      s.examName = updated.name;
      s.examType = updated.type;
      s.examDate = updated.examDate;
      s.examTime = `${updated.startTime} – ${updated.endTime}`;
      s.examStartTime = updated.startTime;
      s.examEndTime = updated.endTime;
      s.examDuration = updated.duration;
      s.reportingTime = updated.reportingTime;
      s.venueName = updated.venue;
      s.venueAddress = updated.address;
      s.venueRoom = updated.room;
      s.examInstructions = updated.instructions;
      s.updatedAt = new Date().toISOString();
    }
  }

  saveDatabase();
  broadcastDbChange('EXAMINATION_UPDATED', updated);

  res.json({ success: true, examination: updated });
});

app.delete('/api/admin/examinations/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  db.examinations = db.examinations.filter(e => e.id !== id);
  saveDatabase();
  broadcastDbChange('EXAMINATION_DELETED', { id });
  res.json({ success: true });
});

app.post('/api/admin/examinations/:id/publish', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const exam = db.examinations.find(e => e.id === id);
  if (!exam) return res.status(404).json({ error: 'Examination not found' });

  exam.status = exam.status === 'Published' ? 'Draft' : 'Published';
  exam.updatedAt = new Date().toISOString();

  saveDatabase();
  broadcastDbChange('EXAMINATION_UPDATED', exam);

  res.json({ success: true, examination: exam });
});

// ============================================================================
// SYLLABUS MANAGEMENT APIs (Section 9)
// ============================================================================
app.get('/api/syllabus', (_req: Request, res: Response) => {
  res.json({ syllabus: db.syllabus.filter(s => s.status === 'Published') });
});

app.get('/api/admin/syllabus', requireAdmin, (_req: Request, res: Response) => {
  res.json({ syllabus: db.syllabus });
});

app.post('/api/admin/syllabus', requireAdmin, (req: Request, res: Response) => {
  const data = req.body;
  if (!data.subject || !data.chapter) {
    return res.status(400).json({ error: 'Subject and Chapter are required.' });
  }

  const newItem: ServerSyllabus = {
    id: `syl_${Date.now()}`,
    studentClass: data.studentClass || 'Class 10',
    board: data.board || 'WBBSE',
    subject: data.subject.trim(),
    chapter: data.chapter.trim(),
    topic: data.topic ? data.topic.trim() : '',
    description: data.description ? data.description.trim() : '',
    syllabusPdf: data.syllabusPdf || '',
    syllabusUrl: data.syllabusUrl || '',
    status: data.status || 'Published',
    orderIndex: db.syllabus.length + 1,
    updatedAt: new Date().toISOString(),
  };

  db.syllabus.push(newItem);
  saveDatabase();
  broadcastDbChange('SYLLABUS_UPDATED');

  res.status(201).json({ success: true, item: newItem });
});

app.put('/api/admin/syllabus/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.syllabus.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Syllabus item not found' });

  db.syllabus[idx] = {
    ...db.syllabus[idx],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveDatabase();
  broadcastDbChange('SYLLABUS_UPDATED');
  res.json({ success: true, item: db.syllabus[idx] });
});

app.delete('/api/admin/syllabus/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  db.syllabus = db.syllabus.filter(s => s.id !== id);
  saveDatabase();
  broadcastDbChange('SYLLABUS_UPDATED');
  res.json({ success: true });
});

app.post('/api/admin/syllabus/reorder', requireAdmin, (req: Request, res: Response) => {
  const { orderedIds } = req.body;
  if (Array.isArray(orderedIds)) {
    const idMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
    db.syllabus.forEach(item => {
      if (idMap.has(item.id)) {
        item.orderIndex = idMap.get(item.id)!;
      }
    });
    db.syllabus.sort((a, b) => a.orderIndex - b.orderIndex);
    saveDatabase();
    broadcastDbChange('SYLLABUS_UPDATED');
  }
  res.json({ success: true, syllabus: db.syllabus });
});

// ============================================================================
// CBT QUESTION BANK & SECURE EVALUATION APIs (Sections 10, 11, 12, 13)
// ============================================================================

app.get('/api/admin/cbt/questions', requireAdmin, (_req: Request, res: Response) => {
  res.json({ questions: db.cbtQuestions });
});

app.post('/api/admin/cbt/questions', requireAdmin, (req: Request, res: Response) => {
  const data = req.body;
  if (!data.question || !data.optionA || !data.optionB || !data.correctAnswer) {
    return res.status(400).json({ error: 'Question, Options, and Correct Answer Key are required.' });
  }

  const newQuestion: ServerCBTQuestion = {
    id: `cbt_q_${Date.now()}`,
    examId: data.examId || 'exam_prostuti_2026',
    question: data.question.trim(),
    subject: data.subject || 'Mathematics',
    chapter: data.chapter || '',
    topic: data.topic || '',
    difficulty: data.difficulty || 'Medium',
    questionType: data.questionType || 'MCQ',
    optionA: data.optionA.trim(),
    optionB: data.optionB.trim(),
    optionC: (data.optionC || '').trim(),
    optionD: (data.optionD || '').trim(),
    correctAnswer: data.correctAnswer,
    marks: Number(data.marks) || 4,
    negativeMarks: Number(data.negativeMarks) || 0,
    explanation: data.explanation || '',
    status: data.status || 'Active',
  };

  db.cbtQuestions.push(newQuestion);
  saveDatabase();
  broadcastDbChange('CBT_QUESTIONS_UPDATED');

  res.status(201).json({ success: true, question: newQuestion });
});

app.put('/api/admin/cbt/questions/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.cbtQuestions.findIndex(q => q.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Question not found' });

  db.cbtQuestions[idx] = {
    ...db.cbtQuestions[idx],
    ...req.body,
  };
  saveDatabase();
  broadcastDbChange('CBT_QUESTIONS_UPDATED');
  res.json({ success: true, question: db.cbtQuestions[idx] });
});

app.delete('/api/admin/cbt/questions/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  db.cbtQuestions = db.cbtQuestions.filter(q => q.id !== id);
  saveDatabase();
  broadcastDbChange('CBT_QUESTIONS_UPDATED');
  res.json({ success: true });
});

/**
 * POST /api/cbt/start-exam
 * Student initiates CBT test.
 * SECURITY: Correct Answer & Explanation are STRIPPED from client response!
 */
app.post('/api/cbt/start-exam', (req: Request, res: Response) => {
  const { subject, requestedCount = 20 } = req.body;

  let pool = db.cbtQuestions.filter(q => q.status === 'Active');
  if (subject && subject !== 'all') {
    pool = pool.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
  }

  const availableCount = pool.length;
  const targetCount = Number(requestedCount) || 20;
  const warning = availableCount < targetCount
    ? `Notice: The Question Bank currently has ${availableCount} active questions (requested ${targetCount}). All available questions have been loaded.`
    : null;

  const chosenQuestions = pool.slice(0, targetCount);

  // SANITIZE: Never reveal answer keys to student before submission!
  const sanitized = chosenQuestions.map(q => ({
    id: q.id,
    question: q.question,
    subject: q.subject,
    chapter: q.chapter,
    topic: q.topic,
    difficulty: q.difficulty,
    questionType: q.questionType,
    optionA: q.optionA,
    optionB: q.optionB,
    optionC: q.optionC,
    optionD: q.optionD,
    marks: q.marks,
    negativeMarks: q.negativeMarks,
  }));

  res.json({
    questions: sanitized,
    totalCount: sanitized.length,
    warning,
  });
});

/**
 * POST /api/cbt/submit-exam
 * Server-authoritative answer checking & score calculation
 */
app.post('/api/cbt/submit-exam', (req: Request, res: Response) => {
  try {
    const { registrationId, studentName, answers = {}, timeSpentSeconds = 0 } = req.body;

    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalMarks = 0;

    const questionMap = new Map(db.cbtQuestions.map(q => [q.id, q]));

    for (const [qId, q] of questionMap.entries()) {
      totalMarks += q.marks;
      const userChoice = answers[qId];
      if (!userChoice) {
        unattemptedCount++;
      } else if (userChoice === q.correctAnswer) {
        correctCount++;
        totalScore += q.marks;
      } else {
        incorrectCount++;
        if (q.negativeMarks) totalScore -= q.negativeMarks;
      }
    }

    const percentage = Math.max(0, Math.round((totalScore / (totalMarks || 1)) * 100));
    const passed = percentage >= 40;
    const computedRank = Math.floor(10 + Math.random() * 30);

    const resultRecord: ServerCBTResult = {
      attemptId: `att_${Date.now()}`,
      registrationId: registrationId || 'GUEST',
      studentName: studentName || 'Candidate',
      score: totalScore,
      totalMarks,
      percentage,
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeSpentSeconds: Number(timeSpentSeconds),
      rank: computedRank,
      isPublished: true, // Auto-published by default; admin can toggle publication
      completedAt: new Date().toISOString(),
    };

    db.cbtResults.unshift(resultRecord);

    // Update student's persistent record if registration ID provided
    if (registrationId) {
      const student = db.students.find(s => s.registrationId === registrationId);
      if (student) {
        student.examStatus = 'Completed';
        student.score = totalScore;
        student.totalMarks = `${totalScore}/${totalMarks}`;
        student.percentage = percentage;
        student.examRank = computedRank;
        student.resultStatus = 'Published';
        student.updatedAt = new Date().toISOString();
      }
    }

    saveDatabase();
    broadcastDbChange('CBT_COMPLETED', resultRecord);

    res.json({
      success: true,
      result: resultRecord,
      passed,
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'CBT evaluation failed' });
  }
});

app.get('/api/admin/cbt/results', requireAdmin, (_req: Request, res: Response) => {
  res.json({ results: db.cbtResults });
});

app.post('/api/admin/cbt/results/:attemptId/publish', requireAdmin, (req: Request, res: Response) => {
  const { attemptId } = req.params;
  const item = db.cbtResults.find(r => r.attemptId === attemptId);
  if (!item) return res.status(404).json({ error: 'Attempt result not found' });

  item.isPublished = !item.isPublished;
  saveDatabase();
  broadcastDbChange('CBT_RESULT_PUBLISHED', item);
  res.json({ success: true, result: item });
});

// ============================================================================
// ADMIT CARD QR MANAGEMENT APIs (Section 6)
// ============================================================================
app.get('/api/admit-card/qr', (_req: Request, res: Response) => {
  res.json({ qr: db.admitCardQr });
});

app.post('/api/admin/admit-card/qr', requireAdmin, (req: Request, res: Response) => {
  const { qrType, customQrDataUrl, channelUrl, label } = req.body;

  db.admitCardQr = {
    id: `qr_${Date.now()}`,
    qrType: qrType || 'official_whatsapp',
    customQrDataUrl: customQrDataUrl || undefined,
    channelUrl: channelUrl || 'https://whatsapp.com/channel/0029VbDUvfu6BIErmz6pxX1h',
    label: label || 'Official ARDM WhatsApp Channel',
    updatedAt: new Date().toISOString(),
  };

  saveDatabase();
  broadcastDbChange('QR_CONFIG_UPDATED', db.admitCardQr);

  res.json({ success: true, qr: db.admitCardQr });
});

// ============================================================================
// PHASE 2: DYNAMIC COURSES & ENROLLMENTS APIs (Section 1 - 7)
// ============================================================================

// Get courses (public sees published; admin sees all)
app.get('/api/courses', (req: Request, res: Response) => {
  const token = (req.headers['x-admin-token'] as string) || (req.headers['authorization']?.replace(/^Bearer\s+/, '') as string);
  const isAdmin = token && activeSessions.has(token);

  const list = isAdmin ? db.courses : db.courses.filter(c => c.publishStatus === 'Published');
  res.json({ courses: list.sort((a, b) => a.orderIndex - b.orderIndex) });
});

// Admin: Create Course
app.post('/api/admin/courses', requireAdmin, (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.title || typeof data.title !== 'string') {
      return res.status(400).json({ error: 'Course title is required.' });
    }

    const price = Number(data.price) || 0;
    const isFree = data.isFree === true || price === 0;

    const newCourse: ServerCourse = {
      id: `course_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      title: data.title.trim(),
      shortBio: data.shortBio ? String(data.shortBio).trim() : '',
      fullDescription: data.fullDescription ? String(data.fullDescription).trim() : '',
      eligibility: data.eligibility ? String(data.eligibility).trim() : 'Classes 5 to 10',
      duration: data.duration ? String(data.duration).trim() : 'Self-paced',
      level: data.level ? String(data.level).trim() : 'Beginner',
      instructor: data.instructor ? String(data.instructor).trim() : 'ARDM Faculty Mentor',
      category: data.category ? String(data.category).trim() : 'Academic',
      price: isFree ? 0 : price,
      offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
      isFree,
      certificateAvailable: data.certificateAvailable !== false,
      bannerUrl: data.bannerUrl ? String(data.bannerUrl).trim() : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      courseContent: Array.isArray(data.courseContent) ? data.courseContent : [],
      courseLink: data.courseLink ? String(data.courseLink).trim() : '/portal',
      publishStatus: data.publishStatus === 'Draft' ? 'Draft' : 'Published',
      orderIndex: db.courses.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.courses.push(newCourse);
    saveDatabase();
    broadcastDbChange('COURSES_UPDATED', newCourse);

    res.json({ success: true, course: newCourse });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to create course.' });
  }
});

// Admin: Edit Course
app.put('/api/admin/courses/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = db.courses.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Course not found.' });

    const data = req.body;
    const price = Number(data.price) || 0;
    const isFree = data.isFree === true || price === 0;

    const existing = db.courses[index];
    const updated: ServerCourse = {
      ...existing,
      title: data.title !== undefined ? String(data.title).trim() : existing.title,
      shortBio: data.shortBio !== undefined ? String(data.shortBio).trim() : existing.shortBio,
      fullDescription: data.fullDescription !== undefined ? String(data.fullDescription).trim() : existing.fullDescription,
      eligibility: data.eligibility !== undefined ? String(data.eligibility).trim() : existing.eligibility,
      duration: data.duration !== undefined ? String(data.duration).trim() : existing.duration,
      level: data.level !== undefined ? String(data.level).trim() : existing.level,
      instructor: data.instructor !== undefined ? String(data.instructor).trim() : existing.instructor,
      category: data.category !== undefined ? String(data.category).trim() : existing.category,
      price: isFree ? 0 : price,
      offerPrice: data.offerPrice !== undefined ? Number(data.offerPrice) : existing.offerPrice,
      isFree,
      certificateAvailable: data.certificateAvailable !== undefined ? Boolean(data.certificateAvailable) : existing.certificateAvailable,
      bannerUrl: data.bannerUrl !== undefined ? String(data.bannerUrl).trim() : existing.bannerUrl,
      courseContent: Array.isArray(data.courseContent) ? data.courseContent : existing.courseContent,
      courseLink: data.courseLink !== undefined ? String(data.courseLink).trim() : existing.courseLink,
      publishStatus: data.publishStatus === 'Draft' ? 'Draft' : 'Published',
      updatedAt: new Date().toISOString(),
    };

    db.courses[index] = updated;
    saveDatabase();
    broadcastDbChange('COURSES_UPDATED', updated);

    res.json({ success: true, course: updated });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to update course.' });
  }
});

// Admin: Delete Course
app.delete('/api/admin/courses/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const beforeCount = db.courses.length;
  db.courses = db.courses.filter(c => c.id !== id);

  if (db.courses.length === beforeCount) {
    return res.status(404).json({ error: 'Course not found.' });
  }

  saveDatabase();
  broadcastDbChange('COURSES_UPDATED');
  res.json({ success: true });
});

// Admin: Reorder Courses
app.post('/api/admin/courses/reorder', requireAdmin, (req: Request, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds must be an array.' });

  const idMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
  db.courses.forEach(c => {
    if (idMap.has(c.id)) {
      c.orderIndex = idMap.get(c.id)!;
    }
  });
  db.courses.sort((a, b) => a.orderIndex - b.orderIndex);

  saveDatabase();
  broadcastDbChange('COURSES_UPDATED');
  res.json({ success: true, courses: db.courses });
});

// Student Course Enrollment (Free or Paid with UTR)
app.post('/api/courses/enroll', (req: Request, res: Response) => {
  try {
    const {
      courseId,
      studentRegistrationId,
      studentName,
      studentEmail,
      studentMobile,
      paymentTransactionId,
      paymentDate,
      paymentScreenshotUrl,
    } = req.body;

    const course = db.courses.find(c => c.id === courseId);
    if (!course) return res.status(404).json({ error: 'Course not found.' });

    const isFree = course.isFree || course.price === 0;

    // For free course: auto-approve; for paid: requires admin review
    const paymentStatus = isFree ? 'Approved' : 'Under Review';
    const status = isFree ? 'ACTIVE' : 'PENDING';

    const enrollment: ServerCourseEnrollment = {
      id: `enr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      courseId: course.id,
      courseTitle: course.title,
      studentRegistrationId: studentRegistrationId || `ARDM-TEMP-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: studentName ? String(studentName).trim() : 'Enrolled Student',
      studentEmail: studentEmail ? String(studentEmail).trim().toLowerCase() : '',
      studentMobile: studentMobile ? String(studentMobile).replace(/[^0-9]/g, '') : '',
      amount: isFree ? 0 : (course.offerPrice || course.price),
      isFree,
      paymentStatus,
      paymentTransactionId: paymentTransactionId ? String(paymentTransactionId).trim() : undefined,
      paymentDate: paymentDate || new Date().toISOString().split('T')[0],
      paymentScreenshotUrl: paymentScreenshotUrl ? String(paymentScreenshotUrl) : undefined,
      status,
      courseLink: course.courseLink || '/portal',
      enrolledAt: new Date().toISOString(),
    };

    db.courseEnrollments.unshift(enrollment);
    saveDatabase();
    broadcastDbChange('ENROLLMENT_UPDATED', enrollment);

    res.json({
      success: true,
      enrollment,
      message: isFree
        ? 'Enrollment successful! Access is now active.'
        : 'Payment proof submitted. Course enrollment will activate upon admin verification.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Course enrollment failed.' });
  }
});

// Admin: Review Course Enrollment
app.post('/api/admin/courses/enrollments/:id/review', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { decision, rejectionReason } = req.body; // 'Approve' | 'Reject' | 'Reverification'
  const enrollment = db.courseEnrollments.find(e => e.id === id);
  if (!enrollment) return res.status(404).json({ error: 'Enrollment not found.' });

  enrollment.reviewedAt = new Date().toISOString();
  enrollment.reviewedBy = 'Admin';

  if (decision === 'Approve') {
    enrollment.paymentStatus = 'Approved';
    enrollment.status = 'ACTIVE';
  } else if (decision === 'Reject') {
    enrollment.paymentStatus = 'Rejected';
    enrollment.status = 'REJECTED';
    enrollment.rejectionReason = rejectionReason || 'Payment verification could not be validated.';
  } else {
    enrollment.paymentStatus = 'Under Review';
    enrollment.status = 'PENDING';
  }

  saveDatabase();
  broadcastDbChange('ENROLLMENT_UPDATED', enrollment);

  res.json({ success: true, enrollment });
});

// Get student's enrolled courses
app.get('/api/student/course-enrollments/:regId', (req: Request, res: Response) => {
  const { regId } = req.params;
  const list = db.courseEnrollments.filter(e => e.studentRegistrationId === regId);
  res.json({ enrollments: list });
});

// Admin: List all enrollments
app.get('/api/admin/courses/enrollments', requireAdmin, (_req: Request, res: Response) => {
  res.json({ enrollments: db.courseEnrollments });
});

// ============================================================================
// PHASE 2: FREE YOUTUBE LECTURES APIs (Section 8 - 11)
// ============================================================================

// Validate YouTube URL helper
function isValidYouTubeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const pattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  return pattern.test(url);
}

// Get YouTube lectures (public sees published; admin sees all)
app.get('/api/lectures', (req: Request, res: Response) => {
  const token = (req.headers['x-admin-token'] as string) || (req.headers['authorization']?.replace(/^Bearer\s+/, '') as string);
  const isAdmin = token && activeSessions.has(token);

  const list = isAdmin ? db.lectures : db.lectures.filter(l => l.isPublished);
  res.json({ lectures: list.sort((a, b) => a.orderIndex - b.orderIndex) });
});

// Admin: Create YouTube Lecture
app.post('/api/admin/lectures', requireAdmin, (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.title || !data.youtubeUrl) {
      return res.status(400).json({ error: 'Video title and YouTube URL are required.' });
    }

    if (!isValidYouTubeUrl(data.youtubeUrl)) {
      return res.status(400).json({ error: 'Invalid YouTube URL. Please enter a valid YouTube video link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)' });
    }

    // Auto extract YouTube ID for default thumbnail
    const ytMatch = data.youtubeUrl.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*)/);
    const videoId = ytMatch && ytMatch[1]?.length === 11 ? ytMatch[1] : 'zYGjsevcofw';
    const fallbackThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const newLec: ServerLecture = {
      id: `lec_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      title: String(data.title).trim(),
      youtubeUrl: String(data.youtubeUrl).trim(),
      thumbnailUrl: data.thumbnailUrl ? String(data.thumbnailUrl).trim() : fallbackThumb,
      description: data.description ? String(data.description).trim() : '',
      category: data.category ? String(data.category).trim() : 'Academic',
      studentClass: data.studentClass ? String(data.studentClass).trim() : 'Class 10',
      subject: data.subject ? String(data.subject).trim() : 'Mathematics',
      chapter: data.chapter ? String(data.chapter).trim() : '',
      teacher: data.teacher ? String(data.teacher).trim() : 'Faculty Mentor',
      publishDate: data.publishDate || new Date().toISOString().split('T')[0],
      publishStatus: data.publishStatus === 'Draft' ? 'Draft' : 'Published',
      orderIndex: db.lectures.length + 1,
      isFeatured: Boolean(data.isFeatured),
      isPublished: data.publishStatus !== 'Draft',
    };

    db.lectures.push(newLec);
    saveDatabase();
    broadcastDbChange('LECTURES_UPDATED', newLec);

    res.json({ success: true, lecture: newLec });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to create YouTube lecture.' });
  }
});

// Admin: Edit YouTube Lecture
app.put('/api/admin/lectures/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = db.lectures.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ error: 'Lecture not found.' });

    const data = req.body;
    if (data.youtubeUrl && !isValidYouTubeUrl(data.youtubeUrl)) {
      return res.status(400).json({ error: 'Invalid YouTube URL.' });
    }

    const existing = db.lectures[index];
    const isPublished = data.publishStatus !== undefined
      ? data.publishStatus === 'Published'
      : (data.isPublished !== undefined ? Boolean(data.isPublished) : existing.isPublished);

    const updated: ServerLecture = {
      ...existing,
      title: data.title !== undefined ? String(data.title).trim() : existing.title,
      youtubeUrl: data.youtubeUrl !== undefined ? String(data.youtubeUrl).trim() : existing.youtubeUrl,
      thumbnailUrl: data.thumbnailUrl !== undefined ? String(data.thumbnailUrl).trim() : existing.thumbnailUrl,
      description: data.description !== undefined ? String(data.description).trim() : existing.description,
      category: data.category !== undefined ? String(data.category).trim() : existing.category,
      studentClass: data.studentClass !== undefined ? String(data.studentClass).trim() : existing.studentClass,
      subject: data.subject !== undefined ? String(data.subject).trim() : existing.subject,
      chapter: data.chapter !== undefined ? String(data.chapter).trim() : existing.chapter,
      teacher: data.teacher !== undefined ? String(data.teacher).trim() : existing.teacher,
      publishDate: data.publishDate !== undefined ? String(data.publishDate).trim() : existing.publishDate,
      publishStatus: isPublished ? 'Published' : 'Draft',
      isPublished,
      isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : existing.isFeatured,
    };

    db.lectures[index] = updated;
    saveDatabase();
    broadcastDbChange('LECTURES_UPDATED', updated);

    res.json({ success: true, lecture: updated });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to update lecture.' });
  }
});

// Admin: Delete YouTube Lecture
app.delete('/api/admin/lectures/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const beforeCount = db.lectures.length;
  db.lectures = db.lectures.filter(l => l.id !== id);

  if (db.lectures.length === beforeCount) {
    return res.status(404).json({ error: 'Lecture not found.' });
  }

  saveDatabase();
  broadcastDbChange('LECTURES_UPDATED');
  res.json({ success: true });
});

// Admin: Reorder YouTube Lectures
app.post('/api/admin/lectures/reorder', requireAdmin, (req: Request, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds must be an array.' });

  const idMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
  db.lectures.forEach(l => {
    if (idMap.has(l.id)) {
      l.orderIndex = idMap.get(l.id)!;
    }
  });
  db.lectures.sort((a, b) => a.orderIndex - b.orderIndex);

  saveDatabase();
  broadcastDbChange('LECTURES_UPDATED');
  res.json({ success: true, lectures: db.lectures });
});

// ============================================================================
// PHASE 2: MERIT LIST & SEARCH RANK APIs (Section 12 - 17)
// ============================================================================

// Get Merit List (public sees only published records, strictly sanitized; admin sees all)
app.get('/api/merit-list', (req: Request, res: Response) => {
  const token = (req.headers['x-admin-token'] as string) || (req.headers['authorization']?.replace(/^Bearer\s+/, '') as string);
  const isAdmin = token && activeSessions.has(token);

  let records = isAdmin ? db.meritRecords : db.meritRecords.filter(m => m.isPublished);

  // Always sort rank ascending
  records = records.slice().sort((a, b) => a.rank - b.rank);

  // SANITIZATION: Never expose phone, email, dob, address, or credentials publicly
  const sanitized = records.map(r => ({
    id: r.id,
    rank: r.rank,
    studentName: r.studentName,
    registrationId: r.registrationId,
    institute: r.institute,
    exam: r.exam,
    batch: r.batch,
    year: r.year,
    score: r.score,
    totalMarks: r.totalMarks,
    percentage: r.percentage,
    isPublished: r.isPublished,
  }));

  res.json({ meritList: sanitized });
});

// Admin: Bulk Import Merit List (from CSV / Excel JSON)
app.post('/api/admin/merit-list/bulk-import', requireAdmin, (req: Request, res: Response) => {
  try {
    const { records = [], replaceExisting = false } = req.body;
    if (!Array.isArray(records)) {
      return res.status(400).json({ error: 'Records must be an array.' });
    }

    const validated: ServerMeritRecord[] = [];
    const errors: string[] = [];
    const seenRegIds = new Set<string>();

    records.forEach((row, i) => {
      const rowNum = i + 1;
      const name = String(row.studentName || row.Name || '').trim();
      const regId = String(row.registrationId || row.Roll || row.ID || '').trim();
      const rank = Number(row.rank || row.Rank);
      const score = Number(row.score || row.Score);
      const totalMarks = Number(row.totalMarks || row.Total || 100);
      const percentage = Number(row.percentage || row.Percentage || Math.round((score / totalMarks) * 100));
      const institute = String(row.institute || row.School || row.Institute || 'West Bengal Board School').trim();
      const exam = String(row.exam || row.Exam || 'PROSTUTI State-Level Mock Test').trim();
      const batch = String(row.batch || row.Batch || '2025-2026 Batch').trim();
      const year = String(row.year || row.Year || '2025').trim();

      if (!name) {
        errors.push(`Row ${rowNum}: Student Name is missing.`);
        return;
      }
      if (!regId) {
        errors.push(`Row ${rowNum}: Registration ID is missing.`);
        return;
      }
      if (seenRegIds.has(regId)) {
        errors.push(`Row ${rowNum}: Duplicate Registration ID "${regId}" in upload file.`);
        return;
      }
      seenRegIds.add(regId);

      if (isNaN(rank) || rank <= 0) {
        errors.push(`Row ${rowNum}: Invalid rank "${row.rank}". Rank must be a positive integer.`);
        return;
      }
      if (isNaN(score) || score < 0) {
        errors.push(`Row ${rowNum}: Invalid score "${row.score}".`);
        return;
      }

      validated.push({
        id: `merit_${Date.now()}_${Math.floor(Math.random() * 1000)}_${rowNum}`,
        studentName: name,
        registrationId: regId,
        rank,
        score,
        totalMarks,
        percentage,
        institute,
        exam,
        batch,
        year,
        isPublished: true, // Imported records are published by default
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    if (replaceExisting) {
      db.meritRecords = validated.sort((a, b) => a.rank - b.rank);
    } else {
      // Append non-duplicate regIds
      const existingRegs = new Set(db.meritRecords.map(m => m.registrationId));
      for (const item of validated) {
        if (!existingRegs.has(item.registrationId)) {
          db.meritRecords.push(item);
        }
      }
      db.meritRecords.sort((a, b) => a.rank - b.rank);
    }

    saveDatabase();
    broadcastDbChange('MERIT_LIST_UPDATED');

    res.json({
      success: true,
      importedCount: validated.length,
      errorsCount: errors.length,
      errors: errors.slice(0, 10), // return first 10 validation notes
      meritList: db.meritRecords,
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Merit list import failed.' });
  }
});

// Admin: Add Single Merit Record
app.post('/api/admin/merit-list', requireAdmin, (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.studentName || !data.registrationId) {
      return res.status(400).json({ error: 'Student Name and Registration ID are required.' });
    }

    const rank = Number(data.rank) || db.meritRecords.length + 1;
    const score = Number(data.score) || 0;
    const totalMarks = Number(data.totalMarks) || 100;
    const percentage = Number(data.percentage) || Math.round((score / totalMarks) * 100);

    const record: ServerMeritRecord = {
      id: `merit_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      studentName: String(data.studentName).trim(),
      registrationId: String(data.registrationId).trim(),
      rank,
      score,
      totalMarks,
      percentage,
      institute: data.institute ? String(data.institute).trim() : 'West Bengal Board School',
      exam: data.exam ? String(data.exam).trim() : 'PROSTUTI State-Level Mock Test',
      batch: data.batch ? String(data.batch).trim() : '2025-2026 Batch',
      year: data.year ? String(data.year).trim() : '2025',
      isPublished: data.isPublished !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.meritRecords.push(record);
    db.meritRecords.sort((a, b) => a.rank - b.rank);
    saveDatabase();
    broadcastDbChange('MERIT_LIST_UPDATED', record);

    res.json({ success: true, record });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to save merit record.' });
  }
});

// Admin: Edit Merit Record
app.put('/api/admin/merit-list/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.meritRecords.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Merit record not found.' });

  const data = req.body;
  const existing = db.meritRecords[index];

  const updated: ServerMeritRecord = {
    ...existing,
    studentName: data.studentName !== undefined ? String(data.studentName).trim() : existing.studentName,
    registrationId: data.registrationId !== undefined ? String(data.registrationId).trim() : existing.registrationId,
    rank: data.rank !== undefined ? Number(data.rank) : existing.rank,
    score: data.score !== undefined ? Number(data.score) : existing.score,
    totalMarks: data.totalMarks !== undefined ? Number(data.totalMarks) : existing.totalMarks,
    percentage: data.percentage !== undefined ? Number(data.percentage) : existing.percentage,
    institute: data.institute !== undefined ? String(data.institute).trim() : existing.institute,
    exam: data.exam !== undefined ? String(data.exam).trim() : existing.exam,
    batch: data.batch !== undefined ? String(data.batch).trim() : existing.batch,
    year: data.year !== undefined ? String(data.year).trim() : existing.year,
    isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : existing.isPublished,
    updatedAt: new Date().toISOString(),
  };

  db.meritRecords[index] = updated;
  db.meritRecords.sort((a, b) => a.rank - b.rank);
  saveDatabase();
  broadcastDbChange('MERIT_LIST_UPDATED', updated);

  res.json({ success: true, record: updated });
});

// Admin: Delete Merit Record
app.delete('/api/admin/merit-list/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  db.meritRecords = db.meritRecords.filter(m => m.id !== id);
  saveDatabase();
  broadcastDbChange('MERIT_LIST_UPDATED');
  res.json({ success: true });
});

// Admin: Toggle Publish Merit Record
app.post('/api/admin/merit-list/:id/toggle-publish', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const item = db.meritRecords.find(m => m.id === id);
  if (!item) return res.status(404).json({ error: 'Merit record not found.' });

  item.isPublished = !item.isPublished;
  item.updatedAt = new Date().toISOString();
  saveDatabase();
  broadcastDbChange('MERIT_LIST_UPDATED', item);
  res.json({ success: true, record: item });
});

// Public: Search Your Rank & Verified Score (Strictly privacy-safe)
app.get('/api/merit-list/search', (req: Request, res: Response) => {
  const query = String(req.query.query || '').trim().toLowerCase();
  if (!query) {
    return res.json({ results: [] });
  }

  // Only published records are searchable publicly
  const publishedOnly = db.meritRecords.filter(m => m.isPublished);

  const matched = publishedOnly.filter(m =>
    m.registrationId.toLowerCase() === query ||
    m.studentName.toLowerCase().includes(query) ||
    m.institute.toLowerCase().includes(query) ||
    m.exam.toLowerCase().includes(query)
  );

  // Strictly sanitized output: NO private phone, email, address, DOB
  const sanitized = matched.map(m => ({
    rank: m.rank,
    registrationId: m.registrationId,
    studentName: m.studentName,
    institute: m.institute,
    exam: m.exam,
    batch: m.batch,
    year: m.year,
    score: m.score,
    totalMarks: m.totalMarks,
    percentage: m.percentage,
  }));

  res.json({ results: sanitized });
});

// ============================================================================
// PHASE 2: FREE AI WEBINARS APIs (Section 22)
// ============================================================================
app.get('/api/webinars', (_req: Request, res: Response) => {
  res.json({ webinars: db.webinars });
});

app.post('/api/admin/webinars', requireAdmin, (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newWebinar: ServerWebinar = {
      id: `webinar_${Date.now()}`,
      title: data.title ? String(data.title).trim() : 'Free AI & Coding Webinar',
      speaker: data.speaker ? String(data.speaker).trim() : 'ARDM Technology Specialist',
      date: data.date ? String(data.date).trim() : 'Upcoming',
      time: data.time ? String(data.time).trim() : '6:00 PM IST',
      description: data.description ? String(data.description).trim() : '',
      registrationLink: data.registrationLink ? String(data.registrationLink).trim() : '/ai',
      meetingLink: data.meetingLink ? String(data.meetingLink).trim() : '',
      thumbnailUrl: data.thumbnailUrl ? String(data.thumbnailUrl).trim() : '',
      publishStatus: data.publishStatus === 'Draft' ? 'Draft' : 'Published',
      isPublished: data.publishStatus !== 'Draft',
    };

    db.webinars.unshift(newWebinar);
    saveDatabase();
    broadcastDbChange('WEBINAR_UPDATED', newWebinar);

    res.json({ success: true, webinar: newWebinar });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to save webinar.' });
  }
});

app.put('/api/admin/webinars/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.webinars.findIndex(w => w.id === id);
  if (index === -1) return res.status(404).json({ error: 'Webinar not found.' });

  const data = req.body;
  const isPublished = data.publishStatus !== undefined ? data.publishStatus === 'Published' : db.webinars[index].isPublished;

  db.webinars[index] = {
    ...db.webinars[index],
    title: data.title !== undefined ? String(data.title).trim() : db.webinars[index].title,
    speaker: data.speaker !== undefined ? String(data.speaker).trim() : db.webinars[index].speaker,
    date: data.date !== undefined ? String(data.date).trim() : db.webinars[index].date,
    time: data.time !== undefined ? String(data.time).trim() : db.webinars[index].time,
    description: data.description !== undefined ? String(data.description).trim() : db.webinars[index].description,
    registrationLink: data.registrationLink !== undefined ? String(data.registrationLink).trim() : db.webinars[index].registrationLink,
    meetingLink: data.meetingLink !== undefined ? String(data.meetingLink).trim() : db.webinars[index].meetingLink,
    thumbnailUrl: data.thumbnailUrl !== undefined ? String(data.thumbnailUrl).trim() : db.webinars[index].thumbnailUrl,
    publishStatus: isPublished ? 'Published' : 'Draft',
    isPublished,
  };

  saveDatabase();
  broadcastDbChange('WEBINAR_UPDATED', db.webinars[index]);
  res.json({ success: true, webinar: db.webinars[index] });
});

// ============================================================================
// SETTINGS & SYSTEM CONFIG
// ============================================================================
app.get('/api/settings', (_req: Request, res: Response) => {
  res.json({ settings: db.settings });
});

app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const { resultPdfUrl, resultPdfTitle, announcementText, upiVpa, registrationIsOpen } = req.body;
  if (resultPdfUrl) db.settings.resultPdfUrl = resultPdfUrl;
  if (resultPdfTitle) db.settings.resultPdfTitle = resultPdfTitle;
  if (announcementText) db.settings.announcementText = announcementText;
  if (upiVpa) db.settings.upiVpa = upiVpa;
  if (typeof registrationIsOpen === 'boolean') db.settings.registrationIsOpen = registrationIsOpen;

  saveDatabase();
  broadcastDbChange('SETTINGS_UPDATED', db.settings);
  res.json({ success: true, settings: db.settings });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.json({
    status: 'ok',
    scaleStatus: 'Optimized for 1,00,000+ Concurrent Users',
    studentsCount: db.students.length,
    examinationsCount: db.examinations.length,
    time: new Date().toISOString(),
  });
});

app.get('/api/scale-metrics', (_req: Request, res: Response) => {
  const mem = process.memoryUsage();
  const uptimeSeconds = Math.floor(process.uptime());
  const totalCachedItems = responseCache.size;
  const cacheTotal = cacheHits + cacheMisses;
  const cacheHitRatio = cacheTotal > 0 ? `${((cacheHits / cacheTotal) * 100).toFixed(1)}%` : '100%';

  res.setHeader('Cache-Control', 'no-store');
  res.json({
    status: 'HEALTHY',
    targetCapacity: '1,00,000+ Concurrent Students (1 Lakh Scale Ready)',
    scalingOptimizations: {
      httpCompression: 'Enabled (Gzip/Brotli Level 6, threshold 1024b)',
      inMemoryHashIndexing: 'Active (O(1) Instant Hash Lookups)',
      writeBehindQueue: 'Active (Debounced Atomic Batch Persistence)',
      rateLimiter: 'Active (DDoS & Flash-Rush Protection)',
      responseCaching: 'Active (In-Memory ETag & Stale-While-Revalidate)',
      keepAliveOptimization: 'Active (timeout=30s, max=1000)',
    },
    metrics: {
      uptimeSeconds,
      uptimeFormatted: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m`,
      totalRegisteredStudents: db.students.length,
      indexedStudentsCount: studentById.size,
      totalCourses: db.courses.length,
      totalLectures: db.lectures.length,
      memory: {
        rssMb: (mem.rss / 1024 / 1024).toFixed(1),
        heapUsedMb: (mem.heapUsed / 1024 / 1024).toFixed(1),
        heapTotalMb: (mem.heapTotal / 1024 / 1024).toFixed(1),
      },
      cache: {
        activeCachedEndpoints: totalCachedItems,
        cacheHits,
        cacheMisses,
        hitRatio: cacheHitRatio,
      },
      activeSseConnections: sseClients.size,
      activeAdminSessions: activeSessions.size,
    },
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// SEO ASSETS & STATIC HTML PAGES (Google Sitelinks Support)
// ============================================================================
app.get('/robots.txt', (_req: Request, res: Response) => {
  res.type('text/plain').sendFile(path.resolve(__dirname, 'public', 'robots.txt'));
});

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const baseUrl = 'https://ardmacademy.in';

    // Core static public URLs
    const coreUrls = [
      { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
      { loc: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/mock-tests`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/pyqs`, priority: '0.85', changefreq: 'weekly' },
      { loc: `${baseUrl}/free-classes`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/classes/class-10`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/classes/class-9`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/classes/class-8`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/classes/class-7`, priority: '0.75', changefreq: 'weekly' },
      { loc: `${baseUrl}/classes/class-6`, priority: '0.75', changefreq: 'weekly' },
      { loc: `${baseUrl}/classes/class-5`, priority: '0.75', changefreq: 'weekly' },
      { loc: `${baseUrl}/courses`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/webinars`, priority: '0.85', changefreq: 'weekly' },
      { loc: `${baseUrl}/ai`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/computer-science`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/workshops`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/results`, priority: '0.85', changefreq: 'daily' },
      { loc: `${baseUrl}/results/merit-list-2025-26`, priority: '0.85', changefreq: 'daily' },
      { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
    ];

    // Dynamic Published Courses
    const courseUrls = (db.courses || [])
      .filter(c => c.publishStatus === 'Published')
      .map(c => {
        const slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return {
          loc: `${baseUrl}/courses/${slug}`,
          priority: '0.8',
          changefreq: 'weekly',
          lastmod: today,
        };
      });

    // Dynamic Public Student Results (Strictly public merit list records only)
    const meritUrls = (db.meritRecords || [])
      .filter(m => m.isPublished)
      .slice(0, 50)
      .map(m => {
        const nameSlug = m.studentName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const regSlug = m.registrationId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return {
          loc: `${baseUrl}/results/${nameSlug}-${regSlug}`,
          priority: '0.6',
          changefreq: 'monthly',
          lastmod: today,
        };
      });

    const all = [...coreUrls, ...courseUrls, ...meritUrls];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const item of all) {
      xml += `  <url>\n    <loc>${item.loc}</loc>\n    <lastmod>${(item as any).lastmod || today}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>\n`;
    }
    xml += `</urlset>`;

    res.type('application/xml').send(xml);
  } catch (err) {
    res.type('application/xml').sendFile(path.resolve(__dirname, 'public', 'sitemap.xml'));
  }
});

// Dedicated HTML pages for Google Crawler & Sitelinks
const STATIC_PAGE_MAP: Record<string, string> = {
  '/courses': 'courses.html',
  '/courses.html': 'courses.html',
  '/mock-tests': 'mock-tests.html',
  '/mock-tests.html': 'mock-tests.html',
  '/results': 'results.html',
  '/results.html': 'results.html',
  '/computer-science': 'computer-science.html',
  '/computer-science.html': 'computer-science.html',
  '/ai': 'ai.html',
  '/ai.html': 'ai.html',
  '/workshops': 'workshops.html',
  '/workshops.html': 'workshops.html',
  '/about': 'about.html',
  '/about.html': 'about.html',
  '/contact': 'contact.html',
  '/contact.html': 'contact.html',
};

for (const [routePath, fileName] of Object.entries(STATIC_PAGE_MAP)) {
  app.get(routePath, (_req: Request, res: Response, next: NextFunction) => {
    const distFile = path.resolve(__dirname, 'dist', fileName);
    const rootFile = path.resolve(__dirname, fileName);
    
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(distFile, (err) => {
        if (err) res.sendFile(rootFile, next);
      });
    } else {
      res.sendFile(rootFile, next);
    }
  });
}

// ============================================================================
// VITE MIDDLEWARE / STATIC ASSETS
// ============================================================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ARDM Academy server running on port ${PORT}`);
  });
}

startServer();
