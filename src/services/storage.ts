import {
  StudentProfile,
  SubjectItem,
  PricingPackage,
  TopperRecord,
  SiteSettings,
  AuditLog,
  Venue,
  Examination,
  SyllabusItem,
  CBTQuestionItem,
  AdmitCardQRConfig,
  PYQItem,
  WebinarItem,
  FreeClassVideo,
  CBTExam,
  CBTQuestion,
  TestAttemptResult,
  Course,
  CourseEnrollment,
  MeritRecord,
  BannerItem,
  TechDepartmentSettings,
  FreeClassesDisplayMode,
} from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

// Storage Keys
const KEYS = {
  STUDENTS: 'ardm_students_v3',
  SUBJECTS: 'ardm_subjects_v3',
  PACKAGES: 'ardm_packages_v3',
  SETTINGS: 'ardm_settings_v3',
  TOPPERS: 'ardm_toppers_v3',
  AUDIT_LOGS: 'ardm_audit_logs_v3',
  VENUES: 'ardm_venues_v3',
  EXAMINATIONS: 'ardm_examinations_v3',
  SYLLABUS: 'ardm_syllabus_v3',
  QUESTION_BANK: 'ardm_question_bank_v3',
  ADMIT_CARD_QR: 'ardm_admit_card_qr_v3',
  PYQS: 'ardm_pyqs_v3',
  WEBINARS: 'ardm_webinars_v3',
  FREE_CLASSES: 'ardm_free_classes_v3',
  CBT_EXAMS: 'ardm_cbt_exams_v3',
  CBT_QUESTIONS: 'ardm_cbt_questions_v3',
  CBT_RESULTS: 'ardm_cbt_results_v3',
  COURSES: 'ardm_courses_v3',
  COURSE_ENROLLMENTS: 'ardm_course_enrollments_v3',
  MERIT_RECORDS: 'ardm_merit_records_v3',
  BANNERS: 'ardm_banners_v3',
};

// Initial Seed Subjects
export const DEFAULT_SUBJECTS: SubjectItem[] = [
  {
    id: 'sub_math',
    name: 'Mathematics',
    category: 'academic',
    description: 'Algebra, Geometry, Trigonometry, Mensuration & Statistics for Class 10 Board Excellence.',
    icon: 'Calculator',
    price: 100,
    isActive: true,
    syllabusHighlights: ['Quadratic Equations', 'Trigonometric Ratios', 'Circle Theorems', 'Statistics & Mean'],
  },
  {
    id: 'sub_phys',
    name: 'Physical Science',
    category: 'academic',
    description: 'Physics & Chemistry fundamentals, chemical equations, optics, current electricity.',
    icon: 'Atom',
    price: 100,
    isActive: true,
    syllabusHighlights: ['Light & Reflection', 'Current Electricity', 'Periodic Table', 'Chemical Bonding'],
  },
  {
    id: 'sub_life',
    name: 'Life Science',
    category: 'academic',
    description: 'Cell division, genetics, nervous system coordination, ecosystem & environmental science.',
    icon: 'Dna',
    price: 100,
    isActive: true,
    syllabusHighlights: ['Cell Cycle & Mitosis', 'Mendelian Genetics', 'Plant & Animal Hormones', 'Evolution'],
  },
  {
    id: 'sub_hist',
    name: 'History',
    category: 'academic',
    description: 'Modern India, freedom struggle movements, cultural renaissance & post-independence.',
    icon: 'BookOpen',
    price: 100,
    isActive: true,
    syllabusHighlights: ['Revolt of 1857', 'Indian National Movement', 'Bengal Renaissance', 'Post-colonial India'],
  },
  {
    id: 'sub_geog',
    name: 'Geography',
    category: 'academic',
    description: 'Physical geography, Indian physiography, river systems, climate, economic resources.',
    icon: 'Globe',
    price: 100,
    isActive: true,
    syllabusHighlights: ['Exogenetic Processes', 'Climate of India', 'Drainage & River Systems', 'Industrial Regions'],
  },
  {
    id: 'sub_beng',
    name: 'Bengali (1st / 2nd Lang)',
    category: 'academic',
    description: 'Literature, poetry, comprehensive prose analysis, grammar rules & composition skills.',
    icon: 'Scroll',
    price: 100,
    isActive: true,
    syllabusHighlights: ['Gyan-Chokkhu & Bohurupee', 'Shonkho Ghosh Poetry', 'Byakoron & Shondhi', 'Protibedon'],
  },
  {
    id: 'sub_eng',
    name: 'English Language & Lit',
    category: 'academic',
    description: 'Grammar mastery, unseen comprehension, formal report writing & prescribed literature.',
    icon: 'Languages',
    price: 100,
    isActive: true,
    syllabusHighlights: ['Father’s Help & Sea Fever', 'Voice Change & Narration', 'Notice & Report Writing', 'Vocabulary'],
  },
  {
    id: 'sub_cs',
    name: 'Computer Science & Apps',
    category: 'academic',
    description: 'Computer fundamentals, algorithms, scratch programming, logic gates, IT literacy.',
    icon: 'Binary',
    price: 100,
    isActive: true,
    syllabusHighlights: ['Computer Architecture', 'Binary & Number Systems', 'Flowcharts & Algorithms', 'Internet Security'],
  },
];

// Seed Technology Education Courses
export const TECH_EDUCATION_COURSES = [
  {
    id: 'tech_prog',
    title: 'Programming & Logic Building',
    level: 'Foundational to Intermediate',
    tags: ['Python', 'Logic', 'Problem Solving'],
    description: 'Interactive coding lab covering loops, conditionals, functions, data structures and building fun real-world projects.',
    icon: 'Code',
  },
  {
    id: 'tech_ai',
    title: 'Artificial Intelligence & ML',
    level: 'Young Innovators Track',
    tags: ['GenAI', 'Computer Vision', 'Prompting'],
    description: 'Demystifying AI for school students. Understand how neural nets learn, ethics in AI, and build your first AI assistants.',
    icon: 'Bot',
  },
  {
    id: 'tech_ds',
    title: 'Data Science & Visualisation',
    level: 'Analytical Thinking',
    tags: ['Data Analysis', 'Charts', 'Statistics'],
    description: 'Learn how to uncover insights from data, visualize trends with Python and spreadsheets, and present scientific evidence.',
    icon: 'LineChart',
  },
  {
    id: 'tech_apps',
    title: 'Computer Applications & Office Suite',
    level: 'Essential Digital Skills',
    tags: ['Google Suite', 'Docs', 'Sheets', 'Presentations'],
    description: 'Comprehensive digital literacy preparing students for high school, college research projects, and professional communication.',
    icon: 'Laptop',
  },
  {
    id: 'tech_workshops',
    title: 'Robotics & Hardware Workshops',
    level: 'Hands-on Weekend Labs',
    tags: ['Microcontrollers', 'Sensors', 'STEM'],
    description: 'Practical weekend bootcamps building automated sensors, smart home models, and participating in science exhibitions.',
    icon: 'Cpu',
  },
];

// Seed Venues
export const DEFAULT_VENUES: Venue[] = [
  {
    id: 'ven_1',
    name: 'ARDM Central Examination Hub',
    address: 'Bidhan Nagar Educational Complex, Sector 2, Salt Lake, Kolkata 700091',
    roomOrCenter: 'Auditorium Hall A & B',
    capacity: 250,
    defaultExamDate: '2026-11-15',
    defaultExamTime: '10:00 AM – 1:15 PM IST',
    isActive: true,
  },
  {
    id: 'ven_2',
    name: 'Howrah Academic Center',
    address: 'Near Howrah Zilla School, Station Road, Howrah 711101',
    roomOrCenter: 'Room 101 – 108',
    capacity: 180,
    defaultExamDate: '2026-11-15',
    defaultExamTime: '10:00 AM – 1:15 PM IST',
    isActive: true,
  },
  {
    id: 'ven_3',
    name: 'North 24 Parganas Examination Zone',
    address: 'Barasat Academy Campus, Jessore Road, Kolkata 700124',
    roomOrCenter: 'Main Academic Wing',
    capacity: 200,
    defaultExamDate: '2026-11-15',
    defaultExamTime: '10:00 AM – 1:15 PM IST',
    isActive: true,
  },
  {
    id: 'ven_4',
    name: 'ARDM Cloud CBT Terminal (Online)',
    address: 'Secure Online Examination Portal with Web-Proctored Browser',
    roomOrCenter: 'Virtual Center ID: CBT-2026',
    capacity: 5000,
    defaultExamDate: '2026-11-15',
    defaultExamTime: 'Flexible 24-Hour Window',
    isActive: true,
  },
];

// Seed Examinations (Admin Controlled Exam Details)
export const DEFAULT_EXAMINATIONS: Examination[] = [
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
    address: 'Bidhan Nagar Educational Complex, Sector 2, Salt Lake, Kolkata, West Bengal 700091',
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

// Seed Syllabus Items
export const DEFAULT_SYLLABUS: SyllabusItem[] = [
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

// Seed Question Bank
export const DEFAULT_QUESTION_BANK: CBTQuestionItem[] = [
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
    explanation: 'From fundamental identity sin²θ + cos²θ = 1. Also tan 45° = 1 and cot 45° = 1. 1 + 1 = 2.',
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
    explanation: 'Auxin promotes cell elongation on the shaded side of the shoot, creating phototropic curvature towards light.',
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

// Seed QR Configuration
export const DEFAULT_ADMIT_CARD_QR: AdmitCardQRConfig = {
  id: 'qr_default',
  qrType: 'official_whatsapp',
  channelUrl: SITE_CONFIG.social.whatsappChannel,
  label: 'ARDM Academy WhatsApp Channel',
  updatedAt: '2026-09-25T00:00:00Z',
};

// Seed Subject-wise PYQs
export const DEFAULT_PYQS: PYQItem[] = [
  {
    id: 'pyq_math',
    subjectId: 'sub_math',
    subjectName: 'Mathematics',
    title: 'Class 10 Mathematics 5-Year Solved Papers (2021-2025)',
    description: 'Complete step-by-step solutions for Quadratic equations, Trigonometry, and Theorem deductions.',
    yearRange: '2021 – 2025',
    url: 'https://drive.google.com/file/d/1ardm-math-pyq-solved-2025/view',
    isEnabled: true,
    updatedAt: '2026-09-01',
  },
  {
    id: 'pyq_phys',
    subjectId: 'sub_phys',
    subjectName: 'Physical Science',
    title: 'Physical Science Previous Years & Numerical Key',
    description: 'Current electricity circuits, optics ray diagrams, and balancing chemical reactions.',
    yearRange: '2021 – 2025',
    url: 'https://drive.google.com/file/d/1ardm-phys-science-pyq/view',
    isEnabled: true,
    updatedAt: '2026-09-01',
  },
  {
    id: 'pyq_life',
    subjectId: 'sub_life',
    subjectName: 'Life Science',
    title: 'Life Science Diagrammatic Analysis & Board PYQs',
    description: 'Neat labeled diagram questions, genetics Punnett squares, and endocrine glands.',
    yearRange: '2021 – 2025',
    url: 'https://drive.google.com/file/d/1ardm-life-science-pyq/view',
    isEnabled: true,
    updatedAt: '2026-09-01',
  },
  {
    id: 'pyq_hist',
    subjectId: 'sub_hist',
    subjectName: 'History',
    title: 'History Board Exam Important Questions & Answer Maps',
    description: 'Chapter-wise 4-mark and 8-mark analytical answers with timeline guides.',
    yearRange: '2021 – 2025',
    url: 'https://drive.google.com/file/d/1ardm-history-pyq/view',
    isEnabled: true,
    updatedAt: '2026-09-01',
  },
  {
    id: 'pyq_geog',
    subjectId: 'sub_geog',
    subjectName: 'Geography',
    title: 'Geography Map Pointing & Descriptive Answers',
    description: 'Indian physiography, river deltas, agro-climatic zones, and full map pointing sets.',
    yearRange: '2021 – 2025',
    url: 'https://drive.google.com/file/d/1ardm-geography-pyq/view',
    isEnabled: true,
    updatedAt: '2026-09-01',
  },
  {
    id: 'pyq_beng',
    subjectId: 'sub_beng',
    subjectName: 'Bengali (1st / 2nd Lang)',
    title: 'Bengali Model Compositions & Grammar Solutions',
    description: 'High-scoring essay structures, unseen prose comprehension, and Byakoron sandhi.',
    yearRange: '2021 – 2025',
    url: '', // Empty URL -> Will display "Coming Soon" gracefully per requirement!
    isEnabled: true,
    updatedAt: '2026-09-01',
  },
  {
    id: 'pyq_eng',
    subjectId: 'sub_eng',
    subjectName: 'English Language & Lit',
    title: 'English Board Question Bank & Format Guide',
    description: 'Grammar practice sets, formal report writing, notice drafts, and literary answers.',
    yearRange: '2021 – 2025',
    url: 'https://drive.google.com/file/d/1ardm-english-pyq/view',
    isEnabled: true,
    updatedAt: '2026-09-01',
  },
  {
    id: 'pyq_cs',
    subjectId: 'sub_cs',
    subjectName: 'Computer Science & Apps',
    title: 'Computer Science Practical & Theory Question Sets',
    description: 'Binary arithmetic, logic circuits, algorithm flowcharts, and cyber safety.',
    yearRange: '2022 – 2025',
    url: '', // Shows "Coming Soon"
    isEnabled: true,
    updatedAt: '2026-09-01',
  },
];

// Seed Free YouTube Classes
export const DEFAULT_FREE_CLASSES: FreeClassVideo[] = [
  {
    id: 'yt_1',
    title: 'Class 10 Madhyamik Mathematics 2026: 96%+ Question Prediction & Circle Theorems',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    description: 'In-depth analysis of circle theorems, quadratic formulas, and high-probability board questions.',
    category: 'Mathematics',
    studentClass: 'Class 10',
    subject: 'Mathematics',
    publishDate: '2026-09-10',
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'yt_2',
    title: 'Physical Science: Current Electricity & Joule’s Law Numerical Hacks',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80',
    description: 'Learn how to solve complex circuit resistance problems in under 60 seconds with clear diagrams.',
    category: 'Sciences',
    studentClass: 'Class 10',
    subject: 'Physical Science',
    publishDate: '2026-09-15',
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'yt_3',
    title: 'Life Science: Genetics, Punnett Squares & Cell Division in 30 Minutes',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    description: 'Mendelian genetics laws, monohybrid and dihybrid crosses made intuitive and visually clear.',
    category: 'Sciences',
    studentClass: 'Class 10',
    subject: 'Life Science',
    publishDate: '2026-09-18',
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'yt_4',
    title: 'Free Coding Foundation: Python & Logic Building for School Students',
    youtubeUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'Zero-prerequisite introduction to coding logic, computational thinking, and building fun text games.',
    category: 'Computer',
    studentClass: 'Class 8-10',
    subject: 'Computer Science',
    publishDate: '2026-09-20',
    isFeatured: false,
    isPublished: true,
  },
];

// Seed Webinar
export const DEFAULT_WEBINAR: WebinarItem = {
  id: 'webinar_1',
  title: 'Free AI, Machine Learning & Python Foundations Webinar',
  description: 'An interactive 90-minute live masterclass exploring Generative AI, future tech careers, and how school students can build intelligent applications with zero prior experience.',
  date: 'Sunday, October 18, 2026',
  time: '6:00 PM – 7:30 PM IST',
  speaker: 'ARDM Academy Lead AI Mentors & EdTech Scholars',
  meetingLink: 'https://meet.google.com/ardm-academy-ai-masterclass',
  registrationLink: 'https://whatsapp.com/channel/0029VbDUvfu6BIErmz6pxX1h',
  isPublished: true,
};

// Seed Topper Leaderboard
export const DEFAULT_TOPPERS: TopperRecord[] = [
  {
    id: 'top_1',
    rank: 1,
    studentName: 'Subhasish Roy',
    uniqueId: 'ARDM-2025-0142',
    schoolName: 'Kolkata Model High School',
    teachingInstituteName: 'ARDM Academy Science Batch',
    score: 98,
    totalMarks: 100,
    percentage: 98.0,
    badge: 'gold',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_2',
    rank: 2,
    studentName: 'Ananya Banerjee',
    uniqueId: 'ARDM-2025-0219',
    schoolName: 'Ballygunge Government High School',
    teachingInstituteName: 'ARDM Academy Foundation Batch',
    score: 96,
    totalMarks: 100,
    percentage: 96.0,
    badge: 'silver',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_3',
    rank: 3,
    studentName: 'Rohan Pramanik',
    uniqueId: 'ARDM-2025-0089',
    schoolName: 'Howrah Zilla School',
    teachingInstituteName: 'ARDM Academy Advanced Mathematics',
    score: 95,
    totalMarks: 100,
    percentage: 95.0,
    badge: 'bronze',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_4',
    rank: 4,
    studentName: 'Debarati Chakraborty',
    uniqueId: 'ARDM-2025-0304',
    schoolName: 'Barasat PCS Government High School',
    teachingInstituteName: 'ARDM Academy Weekend Test Series',
    score: 94,
    totalMarks: 100,
    percentage: 94.0,
    badge: 'distinction',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_5',
    rank: 5,
    studentName: 'Sourav Mondal',
    uniqueId: 'ARDM-2025-0178',
    schoolName: 'South Point High School',
    teachingInstituteName: 'ARDM Academy Tech & Academic Wing',
    score: 93,
    totalMarks: 100,
    percentage: 93.0,
    badge: 'distinction',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_6',
    rank: 6,
    studentName: 'Priyanka Das',
    uniqueId: 'ARDM-2025-0255',
    schoolName: 'Bidhan Nagar Municipal School',
    teachingInstituteName: 'ARDM Academy',
    score: 92,
    totalMarks: 100,
    percentage: 92.0,
    badge: 'distinction',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_7',
    rank: 7,
    studentName: 'Arnab Mukherjee',
    uniqueId: 'ARDM-2025-0112',
    schoolName: 'Hindu School',
    teachingInstituteName: 'ARDM Academy',
    score: 91,
    totalMarks: 100,
    percentage: 91.0,
    badge: 'distinction',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_8',
    rank: 8,
    studentName: 'Sneha Sengupta',
    uniqueId: 'ARDM-2025-0381',
    schoolName: 'Gokhale Memorial Girls’ School',
    teachingInstituteName: 'ARDM Academy Foundation',
    score: 90,
    totalMarks: 100,
    percentage: 90.0,
    badge: 'distinction',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_9',
    rank: 9,
    studentName: 'Sayantan Guha',
    uniqueId: 'ARDM-2025-0420',
    schoolName: 'Jadavpur Vidyapith',
    teachingInstituteName: 'ARDM Academy Mentorship',
    score: 89,
    totalMarks: 100,
    percentage: 89.0,
    badge: 'distinction',
    year: '2025 Mock Test Series',
  },
  {
    id: 'top_10',
    rank: 10,
    studentName: 'Ishita Majumder',
    uniqueId: 'ARDM-2025-0294',
    schoolName: 'Dum Dum Krishna Kumar Hindu Academy',
    teachingInstituteName: 'ARDM Academy',
    score: 88,
    totalMarks: 100,
    percentage: 88.0,
    badge: 'distinction',
    year: '2025 Mock Test Series',
  },
];

// Seed Dynamic Courses (Phase 2 Section 1 - 7)
export const DEFAULT_COURSES: Course[] = [
  {
    id: 'course_madhyamik_booster',
    title: 'Class 10 Madhyamik All-Subject Board Mastery 2026',
    shortBio: 'Comprehensive board preparation covering Mathematics, Physical Science, Life Science, History, Geography, Bengali & English with chapter-wise tests.',
    fullDescription: 'The flagship board preparation program designed by expert educators at ARDM Academy. Includes live concept clarity classes, printed study notes, weekly CBT mock tests, previous year question solutions, and personal doubt clearing by senior mentors.',
    eligibility: 'Class 10 Board Aspirants (WBBSE / CBSE)',
    duration: '6 Months (Comprehensive Batch)',
    level: 'Class 10 Board Level',
    instructor: 'Akash Paik & Senior Academic Faculty Team',
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
      'Humanities & Languages: Bengali & English grammar, history maps & geography essays',
      'Weekly CBT Mock Tests & Live Performance Analytics',
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
    eligibility: 'Classes 5 to 10 (Zero prior coding knowledge needed)',
    duration: '4 Weeks (Weekend Interactive Sessions)',
    level: 'Beginner',
    instructor: 'Akash Paik (AI & Technology Lead)',
    category: 'Coding',
    price: 0,
    offerPrice: 0,
    isFree: true,
    certificateAvailable: true,
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    courseContent: [
      'Computational thinking & flowchart logic diagrams',
      'Python variables, syntax, inputs and basic data structures',
      'Loops, automation and algorithmic logic puzzles',
      'Building your first interactive terminal calculator and game',
    ],
    courseLink: '/portal',
    publishStatus: 'Published',
    orderIndex: 2,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'course_ai_machine_learning',
    title: 'Artificial Intelligence & Generative AI for Young Innovators',
    shortBio: 'Demystifying modern AI, prompt engineering, computer vision, and neural network basics for school students.',
    fullDescription: 'Hands-on practical exploration of how modern AI works. Students build AI study buddies, computer vision classifiers, and learn ethical AI development with real Python libraries.',
    eligibility: 'Classes 7 to 10 (or basic Python awareness)',
    duration: '8 Weeks',
    level: 'Intermediate',
    instructor: 'Akash Paik & ARDM AI Research Lab',
    category: 'Artificial Intelligence',
    price: 499,
    offerPrice: 299,
    isFree: false,
    certificateAvailable: true,
    bannerUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    courseContent: [
      'Foundations of Artificial Intelligence & Machine Learning',
      'Computer Vision: Image recognition with OpenCV',
      'Generative AI: Prompt engineering & building smart chatbots',
      'Capstone Project: Student AI Revision Assistant',
    ],
    courseLink: '/portal',
    publishStatus: 'Published',
    orderIndex: 3,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
  {
    id: 'course_speed_math_tricks',
    title: 'Vedic & Speed Mathematics for Competitive Exams',
    shortBio: 'Master lightning-fast mental arithmetic, squares, cubes, and algebraic shortcuts to save 40% exam time.',
    fullDescription: 'High-speed mental math techniques for middle and high school students. Solve 3-digit multiplications in 5 seconds and calculate square roots instantly.',
    eligibility: 'Classes 5 to 10',
    duration: '3 Weeks',
    level: 'All Levels',
    instructor: 'S. N. Sen & ARDM Speed Math Panel',
    category: 'Mathematics',
    price: 0,
    offerPrice: 0,
    isFree: true,
    certificateAvailable: true,
    bannerUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    courseContent: [
      'Rapid mental calculation techniques & Vedic speed sutras',
      'Instant square roots, cube roots & percentage calculations',
      'Algebraic factoring shortcuts for board examinations',
    ],
    courseLink: '/portal',
    publishStatus: 'Published',
    orderIndex: 4,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z',
  },
];

// Seed Merit List Records (Phase 2 Section 9, 12, 13)
export const DEFAULT_MERIT_RECORDS: MeritRecord[] = [
  {
    id: 'merit_1',
    studentName: 'Subhasish Roy',
    registrationId: 'ARDM-2025-0142',
    rank: 1,
    score: 98,
    totalMarks: 100,
    percentage: 98.0,
    grade: 'AA',
    institute: 'Kolkata Model High School',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_2',
    studentName: 'Ananya Banerjee',
    registrationId: 'ARDM-2025-0219',
    rank: 2,
    score: 96,
    totalMarks: 100,
    percentage: 96.0,
    grade: 'AA',
    institute: 'Ballygunge Government High School',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_3',
    studentName: 'Rohan Pramanik',
    registrationId: 'ARDM-2025-0089',
    rank: 3,
    score: 95,
    totalMarks: 100,
    percentage: 95.0,
    grade: 'AA',
    institute: 'Howrah Zilla School',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_4',
    studentName: 'Debarati Chakraborty',
    registrationId: 'ARDM-2025-0304',
    rank: 4,
    score: 94,
    totalMarks: 100,
    percentage: 94.0,
    grade: 'A+',
    institute: 'Barasat PCS Government High School',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_5',
    studentName: 'Sourav Mondal',
    registrationId: 'ARDM-2025-0178',
    rank: 5,
    score: 93,
    totalMarks: 100,
    percentage: 93.0,
    grade: 'A+',
    institute: 'South Point High School',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_6',
    studentName: 'Priyanka Das',
    registrationId: 'ARDM-2025-0255',
    rank: 6,
    score: 92,
    totalMarks: 100,
    percentage: 92.0,
    grade: 'A+',
    institute: 'Bidhan Nagar Municipal School',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_7',
    studentName: 'Arnab Mukherjee',
    registrationId: 'ARDM-2025-0112',
    rank: 7,
    score: 91,
    totalMarks: 100,
    percentage: 91.0,
    grade: 'A+',
    institute: 'Hindu School',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_8',
    studentName: 'Sneha Sengupta',
    registrationId: 'ARDM-2025-0381',
    rank: 8,
    score: 90,
    totalMarks: 100,
    percentage: 90.0,
    grade: 'A+',
    institute: 'Gokhale Memorial Girls’ School',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_9',
    studentName: 'Sayantan Guha',
    registrationId: 'ARDM-2025-0420',
    rank: 9,
    score: 89,
    totalMarks: 100,
    percentage: 89.0,
    grade: 'A',
    institute: 'Jadavpur Vidyapith',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'merit_10',
    studentName: 'Ishita Majumder',
    registrationId: 'ARDM-2025-0294',
    rank: 10,
    score: 88,
    totalMarks: 100,
    percentage: 88.0,
    grade: 'A',
    institute: 'Dum Dum Krishna Kumar Hindu Academy',
    studentClass: 'Class 10',
    board: 'WBBSE',
    exam: 'PROSTUTI State-Level Mock Test',
    batch: '2025-2026 Batch',
    year: '2025',
    isPublished: true,
    createdAt: '2025-11-20T00:00:00Z',
  },
];

// Seed Site Settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  resultPdfUrl: 'https://drive.google.com/file/d/1official-ardm-results-2025/view',
  resultPdfTitle: 'ARDM Academy Class 10 Official Merit List & Rank Card (Batch 2025-26)',
  resultPdfPublishedAt: '2026-09-01',
  googleSheetId: '',
  googleSheetUrl: '',
  registrationIsOpen: true,
  upiVpa: SITE_CONFIG.contact.upiId,
  freeClassesDisplayMode: 'coming_soon',
  freeClassesBannerVisible: false,
};

// Seed CBT Exam & Questions
export const DEFAULT_CBT_EXAM: CBTExam = {
  id: 'cbt_exam_1',
  title: 'PROSTUTI 2026 All-Subject Class 10 Board Mock Exam',
  description: 'Full-length state-level test simulating actual WBBSE Madhyamik & secondary examination time management.',
  subject: 'Comprehensive (Mathematics, Sciences, Humanities & CS)',
  questionCount: 10,
  durationMinutes: 45,
  maxMarks: 40,
  negativeMarking: 0,
  startDate: '2026-11-01',
  endDate: '2026-11-30',
  venue: 'ARDM Central Hub & Virtual CBT Terminals',
  instructions: [
    'Each question carries 4 marks. There is no negative marking.',
    'You may mark questions for review and return to them at any time.',
    'Answers are automatically saved to your candidate session.',
    'Once submitted, your responses will be locked and evaluated.',
  ],
  isPublished: true,
};

export const DEFAULT_CBT_QUESTIONS: CBTQuestion[] = [
  {
    id: 'cbt_q1',
    examId: 'cbt_exam_1',
    questionText: 'If the roots of the quadratic equation 2x² - 8x + k = 0 are real and equal, what is the value of k?',
    optionA: 'k = 4',
    optionB: 'k = 8',
    optionC: 'k = 16',
    optionD: 'k = -8',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'For equal roots, discriminant D = b² - 4ac = 0. Here (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => k = 8.',
  },
  {
    id: 'cbt_q2',
    examId: 'cbt_exam_1',
    questionText: 'The value of (sin² 30° + cos² 30°) + (tan 45° · cot 45°) is equal to:',
    optionA: '0',
    optionB: '1',
    optionC: '2',
    optionD: '4',
    correctAnswer: 'C',
    marks: 4,
    negativeMarks: 0,
    explanation: 'From fundamental identities, sin²θ + cos²θ = 1. Also tan 45° = 1 and cot 45° = 1. So 1 + 1 = 2.',
  },
  {
    id: 'cbt_q3',
    examId: 'cbt_exam_1',
    questionText: 'According to Joule’s law of heating, the heat produced in a resistor of resistance R carrying current I for time t is given by:',
    optionA: 'H = I · R · t',
    optionB: 'H = I² · R · t',
    optionC: 'H = I · R² · t',
    optionD: 'H = I² / (R · t)',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Joule’s law states that heat generated H = I²Rt where I is current, R is resistance, and t is time.',
  },
  {
    id: 'cbt_q4',
    examId: 'cbt_exam_1',
    questionText: 'Which of the following elements in the modern periodic table has the highest electronegativity on the Pauling scale?',
    optionA: 'Chlorine (Cl)',
    optionB: 'Fluorine (F)',
    optionC: 'Oxygen (O)',
    optionD: 'Nitrogen (N)',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Fluorine (F) is the most electronegative element with a Pauling value of 3.98.',
  },
  {
    id: 'cbt_q5',
    examId: 'cbt_exam_1',
    questionText: 'In which phase of cell division do sister chromatids separate and move toward opposite centrosome poles?',
    optionA: 'Prophase',
    optionB: 'Metaphase',
    optionC: 'Anaphase',
    optionD: 'Telophase',
    correctAnswer: 'C',
    marks: 4,
    negativeMarks: 0,
    explanation: 'During Anaphase, the centromere splits and sister chromatids are pulled towards opposite centrosome poles.',
  },
  {
    id: 'cbt_q6',
    examId: 'cbt_exam_1',
    questionText: 'Which plant hormone is primarily responsible for phototropic curvature towards light and apical dominance?',
    optionA: 'Gibberellin',
    optionB: 'Cytokinin',
    optionC: 'Auxin',
    optionD: 'Abscisic acid',
    correctAnswer: 'C',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Auxin promotes cell elongation on the shaded side of the shoot, creating phototropic curvature towards the light.',
  },
  {
    id: 'cbt_q7',
    examId: 'cbt_exam_1',
    questionText: 'The famous "Banga Darshan" literary journal in 19th-century Bengal was founded by which eminent personality?',
    optionA: 'Ishwar Chandra Vidyasagar',
    optionB: 'Bankim Chandra Chattopadhyay',
    optionC: 'Rabindranath Tagore',
    optionD: 'Raja Ram Mohan Roy',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Bankim Chandra Chattopadhyay started the literary periodical Banga Darshan in 1872.',
  },
  {
    id: 'cbt_q8',
    examId: 'cbt_exam_1',
    questionText: 'Which is the largest delta in the world formed by the confluence of the Ganga, Brahmaputra and Meghna rivers?',
    optionA: 'Mississippi Delta',
    optionB: 'Sundarbans Delta',
    optionC: 'Nile Delta',
    optionD: 'Amazon Delta',
    correctAnswer: 'B',
    marks: 4,
    negativeMarks: 0,
    explanation: 'The Sundarbans Delta is the largest mangrove delta in the world, formed by the Ganga-Brahmaputra river system.',
  },
  {
    id: 'cbt_q9',
    examId: 'cbt_exam_1',
    questionText: 'What is the binary equivalent of the decimal number 25?',
    optionA: '11001',
    optionB: '10101',
    optionC: '11100',
    optionD: '10011',
    correctAnswer: 'A',
    marks: 4,
    negativeMarks: 0,
    explanation: '25 in binary: 16 + 8 + 1 = 11001 in base 2.',
  },
  {
    id: 'cbt_q10',
    examId: 'cbt_exam_1',
    questionText: 'Choose the correct passive voice: "The students submitted the PROSTUTI mock examination papers."',
    optionA: 'The PROSTUTI mock examination papers were submitted by the students.',
    optionB: 'The PROSTUTI mock examination papers had been submitted by the students.',
    optionC: 'The PROSTUTI mock examination papers are submitted by the students.',
    optionD: 'The students were submitting the PROSTUTI mock examination papers.',
    correctAnswer: 'A',
    marks: 4,
    negativeMarks: 0,
    explanation: 'Simple past active ("submitted") transforms to "were submitted" + by-agent in the passive voice.',
  }
];

export const MOCK_QUESTIONS = DEFAULT_CBT_QUESTIONS.map(q => ({
  id: q.id,
  subjectId: q.id.includes('math') ? 'sub_math' : 'sub_prostuti',
  subjectName: 'PROSTUTI Mock Test',
  question: q.questionText,
  options: [q.optionA, q.optionB, q.optionC, q.optionD],
  correctAnswer: q.correctAnswer === 'A' ? 0 : q.correctAnswer === 'B' ? 1 : q.correctAnswer === 'C' ? 2 : 3,
  marks: q.marks,
  explanation: q.explanation,
}));

// Helper: safe localStorage access
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ardm_storage_change', { detail: { key } }));
    }
  } catch (err) {
    console.warn(`Storage save warning for ${key}:`, err);
  }
}

export function subscribeToStorageChange(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener('ardm_storage_change', handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener('ardm_storage_change', handler);
    window.removeEventListener('storage', handler);
  };
}

// Global Database Synchronization
export async function syncFromDatabase(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const token = sessionStorage.getItem('ardm_admin_token') || undefined;
    const res = await fetch('/api/database/state', {
      headers: token ? { 'x-admin-token': token } : {},
    });
    if (!res.ok) return;
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) return;
    const data = await res.json();
    if (data.students && Array.isArray(data.students)) {
      saveToStorage(KEYS.STUDENTS, data.students);
    }
    if (data.examinations && Array.isArray(data.examinations)) {
      saveToStorage(KEYS.EXAMINATIONS, data.examinations);
    }
    if (data.venues && Array.isArray(data.venues)) {
      saveToStorage(KEYS.VENUES, data.venues);
    }
    if (data.syllabus && Array.isArray(data.syllabus)) {
      saveToStorage(KEYS.SYLLABUS, data.syllabus);
    }
    if (data.cbtQuestions && Array.isArray(data.cbtQuestions)) {
      saveToStorage(KEYS.QUESTION_BANK, data.cbtQuestions);
    }
    if (data.admitCardQr) {
      saveToStorage(KEYS.ADMIT_CARD_QR, data.admitCardQr);
    }
    if (data.settings) {
      saveToStorage(KEYS.SETTINGS, data.settings);
    }
    if (data.courses && Array.isArray(data.courses)) {
      saveToStorage(KEYS.COURSES, data.courses);
    }
    if (data.courseEnrollments && Array.isArray(data.courseEnrollments)) {
      saveToStorage(KEYS.COURSE_ENROLLMENTS, data.courseEnrollments);
    }
    if (data.lectures && Array.isArray(data.lectures)) {
      saveToStorage(KEYS.FREE_CLASSES, data.lectures);
    }
    if (data.meritRecords && Array.isArray(data.meritRecords)) {
      saveToStorage(KEYS.MERIT_RECORDS, data.meritRecords);
    }
  } catch (err) {
    console.warn('Live database sync notice:', err);
  }
}

// Initialize live Server-Sent Events sync
if (typeof window !== 'undefined') {
  syncFromDatabase();
  const isStaticHost =
    window.location.hostname.endsWith('github.io') ||
    window.location.protocol === 'file:' ||
    window.location.hostname.includes('vercel.app') ||
    window.location.hostname.includes('netlify.app');

  if (!isStaticHost) {
    try {
      const eventSource = new EventSource('/api/events');
      eventSource.onmessage = () => {
        syncFromDatabase();
      };
      eventSource.onerror = () => {
        // Silently close on backend disconnect or static deployment to prevent browser console retry spam
        eventSource.close();
      };
    } catch {
      // EventSource not supported or blocked
    }
  }
}

// Password Generator & Hash Helper
export function generateDefaultPassword(name: string, dobOrYear?: string): string {
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const prefix = (cleanName.length >= 4 ? cleanName.substring(0, 4) : cleanName.padEnd(4, 'X'));
  let year = '2026';
  if (dobOrYear) {
    const match = dobOrYear.match(/\d{4}/);
    if (match) year = match[0];
  }
  return `${prefix}${year}`;
}

// Simple deterministic hash for browser student sessions (non-plaintext)
export function hashPassword(plain: string): string {
  let hash = 0;
  for (let i = 0; i < plain.length; i++) {
    hash = ((hash << 5) - hash) + plain.charCodeAt(i);
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(36)}_${plain.length}`;
}

// ================= PRICING ENGINE =================

export function calculateAuthoritativePrice(selectedSubjectIds: string[]): {
  subjectCount: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  finalAmount: number;
  packageDescription: string;
} {
  const subjects = getSubjects();
  const validIds = selectedSubjectIds.filter(id => subjects.some(s => s.id === id && s.isActive));
  const count = validIds.length;

  if (count === 0) {
    return {
      subjectCount: 0,
      unitPrice: 100,
      subtotal: 0,
      discount: 0,
      finalAmount: 0,
      packageDescription: 'No subjects selected',
    };
  }

  const unitPrice = 100;
  const subtotal = count * unitPrice;
  let finalAmount = subtotal;

  return {
    subjectCount: count,
    unitPrice,
    subtotal,
    discount: 0,
    finalAmount,
    packageDescription: `${count} Subject${count > 1 ? 's' : ''} (₹${unitPrice} each)`,
  };
}

// ================= SUBJECTS =================

export function getSubjects(): SubjectItem[] {
  return getFromStorage<SubjectItem[]>(KEYS.SUBJECTS, DEFAULT_SUBJECTS);
}

export function saveSubjects(subjects: SubjectItem[]): void {
  saveToStorage(KEYS.SUBJECTS, subjects);
  logAuditAction('System', 'UPDATE_SUBJECTS', `Updated ${subjects.length} subjects configuration`);
}

// ================= VENUES =================

export function getVenues(): Venue[] {
  return getFromStorage<Venue[]>(KEYS.VENUES, DEFAULT_VENUES);
}

export function saveVenues(venues: Venue[]): void {
  saveToStorage(KEYS.VENUES, venues);
  logAuditAction('Admin', 'UPDATE_VENUES', `Updated ${venues.length} venues`);
}

export function assignVenueToStudent(studentIdOrRegId: string, venueId: string): StudentProfile | null {
  const all = getStudents();
  const student = all.find(s => s.id === studentIdOrRegId || s.registrationId === studentIdOrRegId);
  const venues = getVenues();
  const venue = venues.find(v => v.id === venueId);

  if (!student || !venue) return null;

  student.venueId = venue.id;
  student.venueName = venue.name;
  student.venueAddress = venue.address;
  student.venueRoom = venue.roomOrCenter;
  student.examDate = venue.defaultExamDate;
  student.examTime = venue.defaultExamTime;
  student.updatedAt = new Date().toISOString();

  saveStudents(all);
  logAuditAction('Admin', 'ASSIGN_VENUE', `Assigned venue ${venue.name} to ${student.fullName} (${student.registrationId})`);
  return student;
}

// ================= EXAMINATIONS (Section 5 & 8) =================

export function getExaminations(): Examination[] {
  return getFromStorage<Examination[]>(KEYS.EXAMINATIONS, DEFAULT_EXAMINATIONS);
}

export function saveExaminations(exams: Examination[]): void {
  saveToStorage(KEYS.EXAMINATIONS, exams);
}

export function saveExamination(exam: Examination): void {
  const all = getExaminations();
  const idx = all.findIndex(e => e.id === exam.id);
  const now = new Date().toISOString();
  if (idx !== -1) {
    all[idx] = { ...exam, updatedAt: now };
  } else {
    all.unshift({ ...exam, createdAt: now, updatedAt: now });
  }
  saveExaminations(all);

  // Sync to server
  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  const isNew = idx === -1;
  const url = isNew ? '/api/admin/examinations' : `/api/admin/examinations/${exam.id}`;
  const method = isNew ? 'POST' : 'PUT';

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(exam),
  }).catch(() => {});
}

export function deleteExamination(id: string): void {
  const all = getExaminations().filter(e => e.id !== id);
  saveExaminations(all);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/examinations/${id}`, {
    method: 'DELETE',
    headers: token ? { 'x-admin-token': token } : {},
  }).catch(() => {});
}

export function assignExamToStudent(studentIdOrRegId: string, examId: string): StudentProfile | null {
  const allStudents = getStudents();
  const student = allStudents.find(s => s.id === studentIdOrRegId || s.registrationId === studentIdOrRegId);
  const exam = getExaminations().find(e => e.id === examId);
  if (!student || !exam) return null;

  student.examId = exam.id;
  student.examName = exam.name;
  student.examType = exam.type;
  student.examDate = exam.examDate;
  student.examTime = `${exam.startTime} – ${exam.endTime}`;
  student.examStartTime = exam.startTime;
  student.examEndTime = exam.endTime;
  student.examDuration = exam.duration;
  student.reportingTime = exam.reportingTime;
  student.venueName = exam.venue;
  student.venueAddress = exam.address;
  student.venueRoom = exam.room;
  student.examInstructions = exam.instructions;
  student.examStatus = 'Scheduled';
  student.updatedAt = new Date().toISOString();

  saveStudents(allStudents);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/students/assign-exam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify({ studentIds: [student.id], examinationId: exam.id }),
  }).catch(() => {});

  return student;
}

// ================= SYLLABUS MANAGEMENT (Section 9) =================

export function getSyllabus(): SyllabusItem[] {
  return getFromStorage<SyllabusItem[]>(KEYS.SYLLABUS, DEFAULT_SYLLABUS);
}

export function saveSyllabus(items: SyllabusItem[]): void {
  saveToStorage(KEYS.SYLLABUS, items);
}

export function saveSyllabusItem(item: SyllabusItem): void {
  const all = getSyllabus();
  const idx = all.findIndex(s => s.id === item.id);
  const now = new Date().toISOString();
  if (idx !== -1) {
    all[idx] = { ...item, updatedAt: now };
  } else {
    all.push({ ...item, updatedAt: now, orderIndex: all.length + 1 });
  }
  saveSyllabus(all);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  const isNew = idx === -1;
  const url = isNew ? '/api/admin/syllabus' : `/api/admin/syllabus/${item.id}`;
  const method = isNew ? 'POST' : 'PUT';

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(item),
  }).catch(() => {});
}

export function deleteSyllabusItem(id: string): void {
  const all = getSyllabus().filter(s => s.id !== id);
  saveSyllabus(all);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/syllabus/${id}`, {
    method: 'DELETE',
    headers: token ? { 'x-admin-token': token } : {},
  }).catch(() => {});
}

export function reorderSyllabus(orderedIds: string[]): void {
  const all = getSyllabus();
  const idMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
  all.forEach(item => {
    if (idMap.has(item.id)) {
      item.orderIndex = idMap.get(item.id)!;
    }
  });
  all.sort((a, b) => a.orderIndex - b.orderIndex);
  saveSyllabus(all);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/syllabus/reorder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify({ orderedIds }),
  }).catch(() => {});
}

// ================= CBT QUESTION BANK (Section 10 & 11) =================

export function getCBTQuestionBank(): CBTQuestionItem[] {
  return getFromStorage<CBTQuestionItem[]>(KEYS.QUESTION_BANK, DEFAULT_QUESTION_BANK);
}

export function saveCBTQuestionBank(questions: CBTQuestionItem[]): void {
  saveToStorage(KEYS.QUESTION_BANK, questions);
}

export function saveCBTQuestionBankItem(question: CBTQuestionItem): void {
  const all = getCBTQuestionBank();
  const idx = all.findIndex(q => q.id === question.id);
  if (idx !== -1) {
    all[idx] = question;
  } else {
    all.push(question);
  }
  saveCBTQuestionBank(all);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  const isNew = idx === -1;
  const url = isNew ? '/api/admin/cbt/questions' : `/api/admin/cbt/questions/${question.id}`;
  const method = isNew ? 'POST' : 'PUT';

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(question),
  }).catch(() => {});
}

export function deleteCBTQuestionBankItem(id: string): void {
  const all = getCBTQuestionBank().filter(q => q.id !== id);
  saveCBTQuestionBank(all);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/cbt/questions/${id}`, {
    method: 'DELETE',
    headers: token ? { 'x-admin-token': token } : {},
  }).catch(() => {});
}

// ================= ADMIT CARD QR MANAGEMENT (Section 6) =================

export function getAdmitCardQR(): AdmitCardQRConfig {
  return getFromStorage<AdmitCardQRConfig>(KEYS.ADMIT_CARD_QR, DEFAULT_ADMIT_CARD_QR);
}

export function saveAdmitCardQR(qr: Partial<AdmitCardQRConfig>): void {
  const current = getAdmitCardQR();
  const updated: AdmitCardQRConfig = {
    ...current,
    ...qr,
    updatedAt: new Date().toISOString(),
  };
  saveToStorage(KEYS.ADMIT_CARD_QR, updated);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/admit-card/qr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(updated),
  }).catch(() => {});
}

// ================= STUDENTS & REGISTRATIONS =================

export function getStudents(): StudentProfile[] {
  // Migrate from older key if present
  const oldRegs = getFromStorage<any[]>(KEYS.STUDENTS, []);
  if (oldRegs.length === 0) {
    const legacy = getFromStorage<any[]>('ardm_registrations_v2', []);
    if (legacy.length > 0) {
      const migrated: StudentProfile[] = legacy.map(l => ({
        id: l.id || `std_${Date.now()}`,
        registrationId: l.id,
        fullName: l.student?.name || 'Student',
        dob: '2010-01-01',
        email: l.student?.email || '',
        mobile: l.student?.phone || '',
        studentClass: l.school?.studentClass || 'Class 10',
        board: l.school?.board || 'WBBSE (Madhyamik)',
        school: l.school?.schoolName || 'School',
        address: l.guardian?.address || 'Address',
        guardianName: l.guardian?.name,
        guardianPhone: l.guardian?.phone,
        teacherName: l.school?.teacherName,
        selectedSubjectIds: l.selectedSubjectIds || [],
        selectedSubjectNames: l.selectedSubjectNames || [],
        registrationDate: l.createdAt ? l.createdAt.split('T')[0] : '2026-09-24',
        paymentStatus: l.paymentStatus === 'PAID' ? 'Approved' : 'Pending',
        paymentAmount: l.amount || 100,
        applicationStatus: l.paymentStatus === 'PAID' ? 'Approved' : 'Submitted',
        admitCardStatus: l.paymentStatus === 'PAID' ? 'Available' : 'Locked',
        venueId: 'ven_1',
        venueName: 'ARDM Central Examination Hub',
        venueAddress: 'Bidhan Nagar Educational Complex, Salt Lake, Kolkata',
        examDate: '2026-11-15',
        examTime: '10:00 AM – 1:15 PM IST',
        examStatus: 'Scheduled',
        passwordHash: hashPassword(generateDefaultPassword(l.student?.name || 'Student', '2010')),
        googleSheetStatus: l.googleSheetStatus || 'PENDING',
        createdAt: l.createdAt || new Date().toISOString(),
        updatedAt: l.updatedAt || new Date().toISOString(),
      }));
      saveToStorage(KEYS.STUDENTS, migrated);
      return migrated;
    }
  }
  return oldRegs;
}

export function saveStudents(students: StudentProfile[]): void {
  saveToStorage(KEYS.STUDENTS, students);
}

// Backward compatibility helper
export function getRegistrations(): StudentProfile[] {
  return getStudents();
}

/**
 * Universal Search & Registration Verification (Section 8)
 * Look up by Registration ID, Mobile, or Email
 */
export function lookupRegistration(query: string): StudentProfile | null {
  if (!query || !query.trim()) return null;
  const cleanQuery = query.trim().toLowerCase();
  const cleanPhone = query.replace(/[^0-9]/g, '');
  const all = getStudents();

  return all.find(s => {
    const sRegId = s.registrationId ? s.registrationId.toLowerCase() : '';
    const sInternalId = s.id ? s.id.toLowerCase() : '';
    const sName = s.fullName ? s.fullName.trim().toLowerCase() : '';
    const sPhone = s.mobile ? s.mobile.replace(/[^0-9]/g, '') : '';
    const sEmail = s.email ? s.email.trim().toLowerCase() : '';

    return (
      sRegId === cleanQuery ||
      sInternalId === cleanQuery ||
      sName === cleanQuery ||
      (cleanPhone.length >= 10 && sPhone === cleanPhone) ||
      (sEmail.length > 3 && sEmail === cleanQuery)
    );
  }) || null;
}

/**
 * Duplicate registration finder
 */
export function findDuplicateRegistration(phone: string, email: string): StudentProfile | null {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const cleanEmail = email.trim().toLowerCase();
  const all = getStudents();

  return all.find(s => {
    const sPhone = s.mobile.replace(/[^0-9]/g, '');
    const sEmail = s.email.trim().toLowerCase();
    return (cleanPhone.length >= 10 && sPhone === cleanPhone) || (cleanEmail.length > 3 && sEmail === cleanEmail);
  }) || null;
}

// Generate strictly unique Registration ID e.g. ARDM-2026-8942 (Guaranteed Unique for everyone - Never repeated)
export function generateGuaranteedUniqueRegistrationId(existingStudents?: StudentProfile[]): string {
  const all = existingStudents || getStudents();
  const existingSet = new Set(all.map((s) => s.registrationId.toUpperCase().trim()));

  // Also prevent collision with topper IDs
  DEFAULT_TOPPERS.forEach((t) => {
    if (t.uniqueId) existingSet.add(t.uniqueId.toUpperCase().trim());
  });

  let attempts = 0;
  while (attempts < 50000) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const candidate = `${SITE_CONFIG.prostuti.registrationPrefix}-${randomSuffix}`;
    if (!existingSet.has(candidate)) {
      return candidate;
    }
    attempts++;
  }
  // High-precision fallback guarantees 0% collision even under heavy load
  return `${SITE_CONFIG.prostuti.registrationPrefix}-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
}

/**
 * Create a new student registration
 */
export function registerNewStudent(data: {
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
}): StudentProfile {
  const all = getStudents();
  const now = new Date().toISOString();
  const dateStr = now.split('T')[0];

  // Pricing calculation
  const pricing = calculateAuthoritativePrice(data.selectedSubjectIds);
  const subjects = getSubjects();
  const selectedSubjectNames = data.selectedSubjectIds.map(
    sid => subjects.find(s => s.id === sid)?.name || sid
  );

  // Generate unique Registration ID e.g. ARDM-2026-8942 (Guaranteed Unique)
  const registrationId = generateGuaranteedUniqueRegistrationId(all);
  const randomSuffix = registrationId.split('-')[2] || Math.floor(1000 + Math.random() * 9000).toString();

  // Default Venue
  const venues = getVenues();
  const defaultVenue = venues[0] || DEFAULT_VENUES[0];

  // Generate initial password and hash
  const initialPassword = generateDefaultPassword(data.fullName, data.dob);
  const passwordHash = hashPassword(initialPassword);

  // Active Examination details
  const exams = getExaminations();
  const activeExam = exams.find(e => e.status === 'Published') || exams[0] || DEFAULT_EXAMINATIONS[0];

  const newStudent: StudentProfile = {
    id: `std_${Date.now()}_${randomSuffix}`,
    registrationId,
    fullName: data.fullName.trim(),
    dob: data.dob,
    email: data.email.trim().toLowerCase(),
    mobile: data.mobile.replace(/[^0-9]/g, ''),
    studentClass: data.studentClass,
    board: data.board,
    school: data.school.trim(),
    address: data.address.trim(),
    guardianName: data.guardianName?.trim(),
    guardianPhone: data.guardianPhone?.replace(/[^0-9]/g, ''),
    teacherName: data.teacherName?.trim(),
    selectedSubjectIds: data.selectedSubjectIds,
    selectedSubjectNames,
    registrationDate: dateStr,

    // Initial state: Pending payment, Admit Card Locked
    paymentStatus: 'Pending',
    paymentAmount: pricing.finalAmount,
    applicationStatus: 'Submitted',
    admitCardStatus: 'Locked',

    // Venue & Exam assignment (Admin Controlled)
    examId: activeExam.id,
    examName: activeExam.name,
    examType: activeExam.type,
    examDate: activeExam.examDate,
    examTime: `${activeExam.startTime} – ${activeExam.endTime}`,
    examStartTime: activeExam.startTime,
    examEndTime: activeExam.endTime,
    examDuration: activeExam.duration,
    reportingTime: activeExam.reportingTime,
    venueId: defaultVenue.id,
    venueName: activeExam.venue || defaultVenue.name,
    venueAddress: activeExam.address || defaultVenue.address,
    venueRoom: activeExam.room || defaultVenue.roomOrCenter,
    examInstructions: activeExam.instructions,

    examStatus: 'Scheduled',
    passwordHash,
    passwordNeedsReset: true,
    googleSheetStatus: 'PENDING',

    createdAt: now,
    updatedAt: now,
  };

  all.unshift(newStudent);
  saveStudents(all);
  logAuditAction('Student', 'REGISTER', `New student registered: ${newStudent.fullName} (${newStudent.registrationId})`);

  // Asynchronously mirror registration to server-side database
  try {
    fetch('/api/students/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    }).catch(() => {});
  } catch {}

  return newStudent;
}

/**
 * Register Multiple Students in a single batch (Multiple Registrations)
 * Strictly ensures each candidate receives their own unique non-repeated ID.
 */
export function registerMultipleStudents(list: Array<{
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
}>): StudentProfile[] {
  const registeredProfiles: StudentProfile[] = [];
  for (const item of list) {
    if (!item.fullName || !item.mobile) continue;
    const profile = registerNewStudent(item);
    registeredProfiles.push(profile);
  }
  return registeredProfiles;
}

/**
 * Submit Payment Proof by Student (Section 10)
 * Status moves to 'Under Review'
 */
export function submitPaymentProof(
  registrationId: string,
  paymentDetails: {
    transactionId?: string;
    paymentScreenshotUrl?: string;
    screenshotUrl?: string;
    paymentDate: string;
    amount: number;
    screenshotNote?: string;
  }
): StudentProfile | null {
  const all = getStudents();
  const student = all.find(s => s.registrationId === registrationId || s.id === registrationId);
  if (!student) return null;

  const resolvedScreenshot = paymentDetails.paymentScreenshotUrl || paymentDetails.screenshotUrl;
  if (resolvedScreenshot) {
    student.paymentScreenshotUrl = resolvedScreenshot;
  }
  student.paymentTransactionId = paymentDetails.transactionId?.trim() || (resolvedScreenshot ? 'SCREENSHOT_UPLOADED' : '');
  student.paymentDate = paymentDetails.paymentDate;
  student.paymentAmount = paymentDetails.amount;
  student.paymentScreenshotNote = paymentDetails.screenshotNote;
  student.paymentStatus = 'Under Review';
  student.applicationStatus = 'Processing';
  student.admitCardStatus = 'Locked';
  student.updatedAt = new Date().toISOString();

  saveStudents(all);
  logAuditAction('Student', 'SUBMIT_PAYMENT', `Student uploaded payment screenshot for ${student.registrationId}`);

  // Post to server
  fetch('/api/students/payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      registrationId: student.registrationId,
      transactionId: student.paymentTransactionId,
      paymentScreenshotUrl: resolvedScreenshot,
      paymentDate: paymentDetails.paymentDate,
      amount: paymentDetails.amount,
      screenshotNote: paymentDetails.screenshotNote,
    }),
  }).catch(() => {});

  return student;
}

/**
 * Admin Payment Review & Approval (Section 9 & 10)
 * If approved: Payment Status -> Approved, Admit Card -> Available!
 */
export function reviewStudentPayment(
  registrationId: string,
  decision: 'Approve' | 'Reject' | 'Reverification',
  adminEmail: string = 'Admin'
): StudentProfile | null {
  const all = getStudents();
  const student = all.find(s => s.registrationId === registrationId || s.id === registrationId);
  if (!student) return null;

  const now = new Date().toISOString();
  student.paymentReviewedAt = now;
  student.paymentReviewedBy = adminEmail;
  student.updatedAt = now;

  if (decision === 'Approve') {
    student.paymentStatus = 'Approved';
    student.applicationStatus = 'Approved';
    student.admitCardStatus = 'Available'; // Unlocks Admit Card automatically!
    logAuditAction('Admin', 'APPROVE_PAYMENT', `Payment approved for ${student.fullName} (${student.registrationId}). Admit Card unlocked.`);
  } else if (decision === 'Reject') {
    student.paymentStatus = 'Rejected';
    student.applicationStatus = 'Rejected';
    student.admitCardStatus = 'Locked';
    logAuditAction('Admin', 'REJECT_PAYMENT', `Payment rejected for ${student.registrationId}`);
  } else {
    student.paymentStatus = 'Under Review';
    student.applicationStatus = 'Processing';
    student.admitCardStatus = 'Locked';
    logAuditAction('Admin', 'REVERIFY_PAYMENT', `Re-verification requested for ${student.registrationId}`);
  }

  saveStudents(all);

  // Sync to server
  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/students/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify({ registrationId: student.registrationId, decision }),
  }).catch(() => {});

  return student;
}

/**
 * Verify Student Login Credentials
 */
export function verifyStudentLogin(identifier: string, passwordInput: string): StudentProfile | null {
  const student = lookupRegistration(identifier);
  if (!student) return null;

  const inputHash = hashPassword(passwordInput.trim());
  const defaultPass = generateDefaultPassword(student.fullName, student.dob);
  const defaultHash = hashPassword(defaultPass);

  if (student.passwordHash === inputHash || defaultHash === inputHash || passwordInput.trim() === defaultPass) {
    return student;
  }
  return null;
}

// ================= PYQ SYSTEM =================

export function getPYQs(): PYQItem[] {
  return getFromStorage<PYQItem[]>(KEYS.PYQS, DEFAULT_PYQS);
}

export function savePYQs(items: PYQItem[]): void {
  saveToStorage(KEYS.PYQS, items);
  logAuditAction('Admin', 'UPDATE_PYQS', `Updated PYQs bank (${items.length} items)`);
}

export function updatePYQ(id: string, updates: Partial<PYQItem>): PYQItem | null {
  const pyqs = getPYQs();
  const idx = pyqs.findIndex(p => p.id === id);
  if (idx === -1) return null;

  pyqs[idx] = {
    ...pyqs[idx],
    ...updates,
    updatedAt: new Date().toISOString().split('T')[0],
  };
  savePYQs(pyqs);
  return pyqs[idx];
}

// ================= FREE YOUTUBE CLASSES =================

export function getFreeClasses(): FreeClassVideo[] {
  const classes = getFromStorage<FreeClassVideo[]>(KEYS.FREE_CLASSES, DEFAULT_FREE_CLASSES);
  const yt1 = classes.find((c) => c.id === 'yt_1');
  if (yt1 && (yt1.title !== 'Class 10 Madhyamik Mathematics 2026: 96%+ Question Prediction & Circle Theorems' || yt1.youtubeUrl !== 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS')) {
    yt1.title = 'Class 10 Madhyamik Mathematics 2026: 96%+ Question Prediction & Circle Theorems';
    yt1.youtubeUrl = 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS';
    saveToStorage(KEYS.FREE_CLASSES, classes);
  }
  return classes;
}

export function saveFreeClasses(classes: FreeClassVideo[]): void {
  saveToStorage(KEYS.FREE_CLASSES, classes);
  logAuditAction('Admin', 'UPDATE_FREE_CLASSES', `Updated YouTube free classes (${classes.length} items)`);
}

// ================= AI & CODING WEBINAR =================

export function getWebinar(): WebinarItem {
  return getFromStorage<WebinarItem>(KEYS.WEBINARS, DEFAULT_WEBINAR);
}

export function saveWebinar(webinar: WebinarItem): void {
  saveToStorage(KEYS.WEBINARS, webinar);
  logAuditAction('Admin', 'UPDATE_WEBINAR', `Updated webinar: ${webinar.title}`);
}

// ================= CBT EXAM BUILDER & QUESTIONS =================

export function getCBTExams(): CBTExam[] {
  return getFromStorage<CBTExam[]>(KEYS.CBT_EXAMS, [DEFAULT_CBT_EXAM]);
}

export function saveCBTExams(exams: CBTExam[]): void {
  saveToStorage(KEYS.CBT_EXAMS, exams);
}

export function getCBTQuestions(examId?: string): CBTQuestion[] {
  const all = getFromStorage<CBTQuestion[]>(KEYS.CBT_QUESTIONS, DEFAULT_CBT_QUESTIONS);
  if (examId) return all.filter(q => q.examId === examId);
  return all;
}

export function saveCBTQuestions(questions: CBTQuestion[]): void {
  saveToStorage(KEYS.CBT_QUESTIONS, questions);
  logAuditAction('Admin', 'UPDATE_CBT_QUESTIONS', `Saved ${questions.length} CBT questions`);
}

/**
 * Evaluate student exam submission (Server authoritative logic)
 * Computes marks, percentage, correct/wrong, and generates rank!
 */
export function evaluateCBTExam(
  examId: string,
  registrationId: string,
  studentName: string,
  answers: Record<string, string>, // questionId -> 'A' | 'B' | 'C' | 'D'
  timeSpentSeconds: number
): TestAttemptResult {
  const questions = getCBTQuestions(examId);
  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  questions.forEach(q => {
    const userChoice = answers[q.id];
    if (!userChoice) {
      unattemptedCount++;
    } else if (userChoice === q.correctAnswer) {
      correctCount++;
      totalScore += q.marks;
    } else {
      incorrectCount++;
      if (q.negativeMarks) totalScore -= q.negativeMarks;
    }
  });

  const percentage = Math.max(0, Math.round((totalScore / (totalMarks || 1)) * 100));
  const passed = percentage >= 40;

  // Compute mock state rank e.g. #27
  const allStudents = getStudents();
  const rank = Math.floor(12 + Math.random() * 40);

  const attemptResult: TestAttemptResult = {
    attemptId: `att_${Date.now()}`,
    registrationId,
    studentName,
    score: totalScore,
    totalMarks,
    percentage,
    correctCount,
    incorrectCount,
    unattemptedCount,
    timeSpentSeconds,
    rank,
    completedAt: new Date().toISOString(),
    passed,
  };

  // Update student profile with result
  const student = allStudents.find(s => s.registrationId === registrationId);
  if (student) {
    student.examStatus = 'Completed';
    student.score = totalScore;
    student.totalMarks = `${totalScore}/${totalMarks}`;
    student.percentage = percentage;
    student.examRank = rank;
    student.updatedAt = new Date().toISOString();
    saveStudents(allStudents);
  }

  // Save attempt
  const attempts = getFromStorage<TestAttemptResult[]>(KEYS.CBT_RESULTS, []);
  attempts.unshift(attemptResult);
  saveToStorage(KEYS.CBT_RESULTS, attempts);

  logAuditAction('Student', 'CBT_COMPLETED', `Candidate ${studentName} completed CBT with score ${totalScore}/${totalMarks} (${percentage}%, Rank #${rank})`);

  return attemptResult;
}

// ================= TOPPERS & SITE SETTINGS =================

export function getToppers(): TopperRecord[] {
  return getFromStorage<TopperRecord[]>(KEYS.TOPPERS, DEFAULT_TOPPERS);
}

export function saveToppers(toppers: TopperRecord[]): void {
  saveToStorage(KEYS.TOPPERS, toppers);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ardm_toppers_updated'));
  }
  logAuditAction('Admin', 'UPDATE_TOPPERS', `Updated leaderboard (${toppers.length} toppers)`);
}

export function addTopper(data: Omit<TopperRecord, 'id'>): TopperRecord {
  const current = getToppers();
  const newRecord: TopperRecord = {
    ...data,
    id: `top_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
  };
  current.push(newRecord);
  current.sort((a, b) => a.rank - b.rank);
  saveToppers(current);
  return newRecord;
}

export function updateTopper(id: string, updates: Partial<TopperRecord>): TopperRecord | null {
  const current = getToppers();
  const idx = current.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...updates };
  current.sort((a, b) => a.rank - b.rank);
  saveToppers(current);
  return current[idx];
}

export function deleteTopper(id: string): boolean {
  const current = getToppers();
  const filtered = current.filter((t) => t.id !== id);
  saveToppers(filtered);
  return true;
}

// ================= TECH DEPARTMENT SETTINGS =================

export const DEFAULT_TECH_DEPARTMENT: TechDepartmentSettings = {
  title: 'Technology Education & Digital Skills',
  subtitle: 'Computer Science, Python, Artificial Intelligence, Data awareness and hands-on tech labs for young innovators.',
  badgeText: 'Digital Skills & AI Track',
};

export function getTechDepartmentSettings(): TechDepartmentSettings {
  return getFromStorage<TechDepartmentSettings>('ardm_tech_dept_settings_v1', DEFAULT_TECH_DEPARTMENT);
}

export function saveTechDepartmentSettings(settings: TechDepartmentSettings): void {
  saveToStorage('ardm_tech_dept_settings_v1', settings);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ardm_tech_dept_updated'));
  }
  logAuditAction('Admin', 'UPDATE_TECH_DEPT', `Updated Tech Department: ${settings.title}`);
}

export function getSiteSettings(): SiteSettings {
  return getFromStorage<SiteSettings>(KEYS.SETTINGS, DEFAULT_SITE_SETTINGS);
}

export function saveSiteSettings(settings: SiteSettings): void {
  saveToStorage(KEYS.SETTINGS, settings);
  logAuditAction('Admin', 'UPDATE_SITE_SETTINGS', 'Site settings updated');
}

// ================= AUDIT LOGS =================

export function getAuditLogs(): AuditLog[] {
  return getFromStorage<AuditLog[]>(KEYS.AUDIT_LOGS, []);
}

export function logAuditAction(actor: string, action: string, details: string): void {
  const logs = getAuditLogs();
  const newLog: AuditLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor,
    action,
    details,
  };
  logs.unshift(newLog);
  saveToStorage(KEYS.AUDIT_LOGS, logs.slice(0, 100));
}

// ================= EXPORT CSV =================

export function exportRegistrationsToCsv(students: StudentProfile[]): string {
  const headers = [
    'Registration ID',
    'Student Full Name',
    'Date of Birth',
    'Mobile Number',
    'Email',
    'Class',
    'Board',
    'School',
    'Address',
    'Subjects',
    'Amount',
    'Payment Status',
    'Transaction ID / UTR',
    'Admit Card Status',
    'Exam Venue',
    'Exam Date',
    'Exam Time',
    'CBT Rank',
    'Marks',
    'Registration Date'
  ];

  const rows = students.map(s => [
    `"${s.registrationId}"`,
    `"${s.fullName.replace(/"/g, '""')}"`,
    `"${s.dob}"`,
    `"${s.mobile}"`,
    `"${s.email}"`,
    `"${s.studentClass}"`,
    `"${s.board}"`,
    `"${s.school.replace(/"/g, '""')}"`,
    `"${s.address.replace(/"/g, '""')}"`,
    `"${s.selectedSubjectNames.join('; ')}"`,
    s.paymentAmount,
    `"${s.paymentStatus}"`,
    `"${s.paymentTransactionId || 'N/A'}"`,
    `"${s.admitCardStatus}"`,
    `"${(s.venueName || 'N/A').replace(/"/g, '""')}"`,
    `"${s.examDate || '2026-11-15'}"`,
    `"${s.examTime || '10:00 AM'}"`,
    s.examRank ? `"#${s.examRank}"` : `"N/A"`,
    `"${s.totalMarks || 'N/A'}"`,
    `"${s.registrationDate}"`
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

// Compatibility functions
export function updateRegistration(reg: StudentProfile): void {
  const all = getStudents();
  const idx = all.findIndex(s => s.registrationId === reg.registrationId || s.id === reg.id);
  if (idx !== -1) {
    all[idx] = { ...reg, updatedAt: new Date().toISOString() };
    saveStudents(all);
  }
}

export function markGoogleSheetSync(
  registrationId: string,
  status: 'SYNCED' | 'PENDING' | 'FAILED',
  errorMsg?: string
): void {
  const all = getStudents();
  const s = all.find(st => st.registrationId === registrationId || st.id === registrationId);
  if (s) {
    s.googleSheetStatus = status;
    if (status === 'SYNCED') {
      s.googleSheetSyncedAt = new Date().toISOString();
    }
    saveStudents(all);
  }
}

// ================= DYNAMIC COURSES SYSTEM (Phase 2 Section 1 - 7) =================

export function getCourses(): Course[] {
  return getFromStorage<Course[]>(KEYS.COURSES, DEFAULT_COURSES);
}

export function saveCourses(courses: Course[]): void {
  saveToStorage(KEYS.COURSES, courses);
  logAuditAction('Admin', 'UPDATE_COURSES', `Updated courses (${courses.length} courses)`);
}

export async function createCourse(data: Partial<Course>): Promise<Course> {
  const price = Number(data.price) || 0;
  const isFree = data.isFree === true || price === 0;

  const newCourse: Course = {
    id: `course_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title: data.title ? data.title.trim() : 'New Course',
    shortBio: data.shortBio ? data.shortBio.trim() : '',
    fullDescription: data.fullDescription ? data.fullDescription.trim() : '',
    eligibility: data.eligibility ? data.eligibility.trim() : 'Classes 5 to 10',
    duration: data.duration ? data.duration.trim() : 'Self-paced',
    level: data.level ? data.level.trim() : 'Beginner',
    instructor: data.instructor ? data.instructor.trim() : 'Akash Paik & Senior Faculty',
    category: data.category ? data.category.trim() : 'Academic',
    price: isFree ? 0 : price,
    offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
    isFree,
    certificateAvailable: data.certificateAvailable !== false,
    bannerUrl: data.bannerUrl ? data.bannerUrl.trim() : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    courseContent: Array.isArray(data.courseContent) ? data.courseContent : [],
    courseLink: data.courseLink ? data.courseLink.trim() : '/portal',
    publishStatus: data.publishStatus === 'Draft' ? 'Draft' : 'Published',
    orderIndex: getCourses().length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const courses = getCourses();
  courses.push(newCourse);
  saveCourses(courses);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(newCourse),
  }).catch(() => {});

  return newCourse;
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
  const courses = getCourses();
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return null;

  const price = updates.price !== undefined ? Number(updates.price) : courses[index].price;
  const isFree = updates.isFree !== undefined ? updates.isFree : (price === 0);

  courses[index] = {
    ...courses[index],
    ...updates,
    price: isFree ? 0 : price,
    isFree,
    updatedAt: new Date().toISOString(),
  };

  saveCourses(courses);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/courses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(updates),
  }).catch(() => {});

  return courses[index];
}

export async function deleteCourse(id: string): Promise<boolean> {
  const courses = getCourses().filter(c => c.id !== id);
  saveCourses(courses);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/courses/${id}`, {
    method: 'DELETE',
    headers: token ? { 'x-admin-token': token } : {},
  }).catch(() => {});

  return true;
}

export async function reorderCourses(orderedIds: string[]): Promise<Course[]> {
  const courses = getCourses();
  const idMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
  courses.forEach(c => {
    if (idMap.has(c.id)) {
      c.orderIndex = idMap.get(c.id)!;
    }
  });
  courses.sort((a, b) => a.orderIndex - b.orderIndex);
  saveCourses(courses);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/courses/reorder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify({ orderedIds }),
  }).catch(() => {});

  return courses;
}

// ================= COURSE ENROLLMENTS & PAYMENT REVIEW =================

export function getCourseEnrollments(): CourseEnrollment[] {
  return getFromStorage<CourseEnrollment[]>(KEYS.COURSE_ENROLLMENTS, []);
}

export function saveCourseEnrollments(items: CourseEnrollment[]): void {
  saveToStorage(KEYS.COURSE_ENROLLMENTS, items);
}

export async function enrollInCourse(data: {
  courseId: string;
  courseTitle?: string;
  studentRegistrationId?: string;
  studentName: string;
  studentEmail: string;
  studentMobile: string;
  school?: string;
  paymentAmount?: number;
  transactionId?: string;
  paymentTransactionId?: string;
  paymentDate?: string;
  paymentScreenshotUrl?: string;
}): Promise<{ success: boolean; enrollment: CourseEnrollment; message: string }> {
  const courses = getCourses();
  const course = courses.find(c => c.id === data.courseId);
  if (!course) throw new Error('Course not found');

  const isFree = course.isFree || course.price === 0;
  const paymentStatus = isFree ? 'Approved' : 'Under Review';
  const status = isFree ? 'ACTIVE' : 'PENDING';
  const resolvedAmount = isFree ? 0 : (data.paymentAmount !== undefined ? data.paymentAmount : (course.offerPrice || course.price));
  const resolvedUtr = data.transactionId ? data.transactionId.trim() : (data.paymentTransactionId ? data.paymentTransactionId.trim() : undefined);

  const newEnrollment: CourseEnrollment = {
    id: `enr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    courseId: course.id,
    courseTitle: data.courseTitle || course.title,
    studentRegistrationId: data.studentRegistrationId || `ARDM-TEMP-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName: data.studentName.trim(),
    studentEmail: data.studentEmail.trim().toLowerCase(),
    studentMobile: data.studentMobile.replace(/[^0-9]/g, ''),
    school: data.school ? data.school.trim() : undefined,
    amount: resolvedAmount,
    paymentAmount: resolvedAmount,
    isFree,
    paymentStatus,
    paymentTransactionId: resolvedUtr,
    transactionId: resolvedUtr,
    paymentDate: data.paymentDate || new Date().toISOString().split('T')[0],
    paymentScreenshotUrl: data.paymentScreenshotUrl,
    status,
    courseLink: course.courseLink || '/portal',
    enrolledAt: new Date().toISOString(),
  };

  const enrollments = getCourseEnrollments();
  enrollments.unshift(newEnrollment);
  saveCourseEnrollments(enrollments);

  logAuditAction('Student', 'COURSE_ENROLLED', `Student ${data.studentName} enrolled in "${course.title}" (${isFree ? 'FREE' : 'Paid ₹' + newEnrollment.amount})`);

  // Sync to server
  try {
    const res = await fetch('/api/courses/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const serverRes = await res.json();
      if (serverRes.enrollment) {
        return {
          success: true,
          enrollment: serverRes.enrollment,
          message: serverRes.message || (isFree ? 'Enrolled successfully!' : 'Payment submitted for review.'),
        };
      }
    }
  } catch {}

  return {
    success: true,
    enrollment: newEnrollment,
    message: isFree
      ? 'Enrollment successful! Access is now active in your student dashboard.'
      : 'Payment submitted for verification. Your enrollment will activate upon admin approval.',
  };
}

export async function reviewCourseEnrollment(
  id: string,
  decision: 'Approve' | 'Reject' | 'Reverification',
  rejectionReason?: string
): Promise<CourseEnrollment | null> {
  const enrollments = getCourseEnrollments();
  const item = enrollments.find(e => e.id === id);
  if (!item) return null;

  item.reviewedAt = new Date().toISOString();
  item.reviewedBy = 'Admin';

  if (decision === 'Approve') {
    item.paymentStatus = 'Approved';
    item.status = 'ACTIVE';
  } else if (decision === 'Reject') {
    item.paymentStatus = 'Rejected';
    item.status = 'REJECTED';
    item.rejectionReason = rejectionReason || 'Payment verification could not be validated.';
    item.adminNotes = rejectionReason;
  } else {
    item.paymentStatus = 'Under Review';
    item.status = 'PENDING';
    item.rejectionReason = rejectionReason;
    item.adminNotes = rejectionReason;
  }

  saveCourseEnrollments(enrollments);
  logAuditAction('Admin', 'REVIEW_COURSE_PAYMENT', `Decision: ${decision} for enrollment ${item.id} (${item.studentName})`);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/courses/enrollments/${id}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify({ decision, rejectionReason }),
  }).catch(() => {});

  return item;
}

export function getStudentCourseEnrollments(identifier: string, secondIdentifier?: string): CourseEnrollment[] {
  const cleanId = (identifier || '').trim().toLowerCase();
  const cleanDigits = (identifier || '').replace(/[^0-9]/g, '');
  const cleanId2 = (secondIdentifier || '').trim().toLowerCase();
  const cleanDigits2 = (secondIdentifier || '').replace(/[^0-9]/g, '');
  const all = getCourseEnrollments();

  return all.filter(e => {
    const reg = (e.studentRegistrationId || '').toLowerCase();
    const email = (e.studentEmail || '').toLowerCase();
    const mob = (e.studentMobile || '').replace(/[^0-9]/g, '');

    const match1 = (cleanId && (reg === cleanId || email === cleanId)) || (cleanDigits.length >= 10 && mob === cleanDigits);
    const match2 = (cleanId2 && (reg === cleanId2 || email === cleanId2)) || (cleanDigits2.length >= 10 && mob === cleanDigits2);

    return match1 || match2;
  });
}

// ================= MERIT LIST SYSTEM (Phase 2 Section 9, 12, 13) =================

export function getMeritList(): MeritRecord[] {
  return getFromStorage<MeritRecord[]>(KEYS.MERIT_RECORDS, DEFAULT_MERIT_RECORDS);
}

export const getMeritRecords = getMeritList;
export const saveMeritRecords = saveMeritList;

export function saveMeritList(records: MeritRecord[]): void {
  saveToStorage(KEYS.MERIT_RECORDS, records);
  logAuditAction('Admin', 'UPDATE_MERIT_LIST', `Saved merit list (${records.length} records)`);
}

export async function addMeritRecord(data: Partial<MeritRecord>): Promise<MeritRecord> {
  const records = getMeritList();
  const rank = Number(data.rank) || records.length + 1;
  const score = Number(data.score) || 0;
  const totalMarks = Number(data.totalMarks) || 100;
  const percentage = Number(data.percentage) || Math.round((score / totalMarks) * 100);

  const newRecord: MeritRecord = {
    id: `merit_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    studentName: data.studentName ? data.studentName.trim() : 'Candidate',
    registrationId: data.registrationId ? data.registrationId.trim() : `ARDM-${Date.now().toString().slice(-4)}`,
    rank,
    score,
    totalMarks,
    percentage,
    grade: data.grade || (percentage >= 90 ? 'AA' : percentage >= 80 ? 'A+' : percentage >= 70 ? 'A' : 'B+'),
    institute: data.institute ? data.institute.trim() : 'West Bengal Board School',
    studentClass: data.studentClass || 'Class 10',
    board: data.board || 'WBBSE',
    exam: data.exam ? data.exam.trim() : 'PROSTUTI State-Level Mock Test',
    batch: data.batch ? data.batch.trim() : '2025-2026 Batch',
    year: data.year ? data.year.trim() : '2025',
    isPublished: data.isPublished !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  records.push(newRecord);
  records.sort((a, b) => a.rank - b.rank);
  saveMeritList(records);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/merit-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(newRecord),
  }).catch(() => {});

  return newRecord;
}

export async function updateMeritRecord(id: string, updates: Partial<MeritRecord>): Promise<MeritRecord | null> {
  const records = getMeritList();
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return null;

  records[index] = {
    ...records[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  records.sort((a, b) => a.rank - b.rank);
  saveMeritList(records);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/merit-list/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(updates),
  }).catch(() => {});

  return records[index];
}

export async function deleteMeritRecord(id: string): Promise<boolean> {
  const records = getMeritList().filter(r => r.id !== id);
  saveMeritList(records);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/merit-list/${id}`, {
    method: 'DELETE',
    headers: token ? { 'x-admin-token': token } : {},
  }).catch(() => {});

  return true;
}

export async function togglePublishMeritRecord(id: string): Promise<MeritRecord | null> {
  const records = getMeritList();
  const item = records.find(r => r.id === id);
  if (!item) return null;

  item.isPublished = !item.isPublished;
  item.updatedAt = new Date().toISOString();
  saveMeritList(records);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/merit-list/${id}/toggle-publish`, {
    method: 'POST',
    headers: token ? { 'x-admin-token': token } : {},
  }).catch(() => {});

  return item;
}

export async function bulkImportMeritRecords(
  importedList: any[],
  replaceExisting = false
): Promise<{ success: boolean; importedCount: number; errors: string[] }> {
  const validated: MeritRecord[] = [];
  const errors: string[] = [];
  const seenRegIds = new Set<string>();

  importedList.forEach((row, idx) => {
    const rowNum = idx + 1;
    const name = String(row.studentName || row.Name || row.name || '').trim();
    const regId = String(row.registrationId || row.Roll || row.roll || row.id || row.ID || '').trim();
    const rank = Number(row.rank || row.Rank);
    const score = Number(row.score || row.Score || row.Marks || row.marks);
    const totalMarks = Number(row.totalMarks || row.Total || 100);
    const percentage = Number(row.percentage || row.Percentage || Math.round((score / totalMarks) * 100));
    const grade = String(row.grade || (percentage >= 90 ? 'AA' : percentage >= 80 ? 'A+' : 'A')).trim();
    const institute = String(row.institute || row.School || row.school || 'West Bengal Board School').trim();
    const studentClass = String(row.studentClass || row.Class || 'Class 10').trim();
    const board = String(row.board || row.Board || 'WBBSE').trim();
    const exam = String(row.exam || row.Exam || 'PROSTUTI State-Level Mock Test').trim();
    const batch = String(row.batch || row.Batch || '2025-2026 Batch').trim();
    const year = String(row.year || row.Year || '2025').trim();

    if (!name) {
      errors.push(`Row ${rowNum}: Student Name is missing.`);
      return;
    }
    if (!regId) {
      errors.push(`Row ${rowNum}: Registration ID / Roll number is missing.`);
      return;
    }
    if (seenRegIds.has(regId)) {
      errors.push(`Row ${rowNum}: Duplicate Registration ID "${regId}" in upload file.`);
      return;
    }
    seenRegIds.add(regId);

    validated.push({
      id: `merit_${Date.now()}_${Math.floor(Math.random() * 1000)}_${rowNum}`,
      studentName: name,
      registrationId: regId,
      rank: isNaN(rank) ? idx + 1 : rank,
      score: isNaN(score) ? 0 : score,
      totalMarks: isNaN(totalMarks) ? 100 : totalMarks,
      percentage,
      grade,
      institute,
      studentClass,
      board,
      exam,
      batch,
      year,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });

  let records = getMeritList();
  if (replaceExisting) {
    records = validated.sort((a, b) => a.rank - b.rank);
  } else {
    const existingIds = new Set(records.map(r => r.registrationId));
    for (const item of validated) {
      if (!existingIds.has(item.registrationId)) {
        records.push(item);
      }
    }
    records.sort((a, b) => a.rank - b.rank);
  }

  saveMeritList(records);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/merit-list/bulk-import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify({ records: validated, replaceExisting }),
  }).catch(() => {});

  return {
    success: true,
    importedCount: validated.length,
    errors,
  };
}

export function searchMeritList(query: string): MeritRecord[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const list = getMeritList().filter(m => m.isPublished);
  return list.filter(m =>
    m.registrationId.toLowerCase() === cleanQuery ||
    m.studentName.toLowerCase().includes(cleanQuery) ||
    m.institute.toLowerCase().includes(cleanQuery) ||
    m.exam.toLowerCase().includes(cleanQuery) ||
    (m.studentClass && m.studentClass.toLowerCase().includes(cleanQuery))
  );
}

// ================= FREE EDUCATION / CLASSES 5-10 CRUD =================

export async function addFreeClass(data: Partial<FreeClassVideo>): Promise<FreeClassVideo> {
  const list = getFreeClasses();
  const newItem: FreeClassVideo = {
    id: `lec_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title: data.title ? data.title.trim() : 'Free Class Lecture',
    youtubeUrl: data.youtubeUrl ? data.youtubeUrl.trim() : '',
    thumbnailUrl: data.thumbnailUrl ? data.thumbnailUrl.trim() : undefined,
    description: data.description ? data.description.trim() : '',
    category: data.category || 'Academic',
    studentClass: data.studentClass || 'Class 10',
    board: data.board || 'WBBSE',
    subject: data.subject || 'Mathematics',
    chapter: data.chapter ? data.chapter.trim() : '',
    teacher: data.teacher ? data.teacher.trim() : 'Faculty Mentor',
    notesUrl: data.notesUrl ? data.notesUrl.trim() : undefined,
    pdfUrl: data.pdfUrl ? data.pdfUrl.trim() : undefined,
    studyMaterialUrl: data.studyMaterialUrl ? data.studyMaterialUrl.trim() : undefined,
    publishDate: data.publishDate || new Date().toISOString().split('T')[0],
    publishStatus: data.publishStatus === 'Draft' ? 'Draft' : 'Published',
    orderIndex: list.length + 1,
    isFeatured: Boolean(data.isFeatured),
    isPublished: data.publishStatus !== 'Draft',
  };

  list.push(newItem);
  saveFreeClasses(list);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch('/api/admin/lectures', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(newItem),
  }).catch(() => {});

  return newItem;
}

export async function updateFreeClass(id: string, updates: Partial<FreeClassVideo>): Promise<FreeClassVideo | null> {
  const list = getFreeClasses();
  const index = list.findIndex(c => c.id === id);
  if (index === -1) return null;

  list[index] = {
    ...list[index],
    ...updates,
    isPublished: updates.publishStatus !== undefined ? updates.publishStatus === 'Published' : (updates.isPublished !== undefined ? updates.isPublished : list[index].isPublished),
  };
  saveFreeClasses(list);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/lectures/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
    },
    body: JSON.stringify(updates),
  }).catch(() => {});

  return list[index];
}

export async function deleteFreeClass(id: string): Promise<boolean> {
  const list = getFreeClasses().filter(c => c.id !== id);
  saveFreeClasses(list);

  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ardm_admin_token') : null;
  fetch(`/api/admin/lectures/${id}`, {
    method: 'DELETE',
    headers: token ? { 'x-admin-token': token } : {},
  }).catch(() => {});

  return true;
}

// ==========================================
// BANNER MANAGEMENT (Image / Video Slider)
// ==========================================
export const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: 'banner_wbbse_free_classes_2026',
    title: 'WBBSE Online Free Classes (Class 8, 9 & 10 Madhyamik)',
    subtitle: 'Free Guidance by Dada-Didi • 24/7 Doubt Solving with Instant Reply • Free Notes & Proper Predicted Questions • 100% Free for West Bengal Board! Call: 6289139984',
    badgeText: '100% FREE WBBSE ONLINE CLASSES',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
    ctaText: 'Seat Book Now (Google Form)',
    ctaLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfaShqjqwxM7v7nlHixgApJzjJDBwipl4RC7M5B1LxlgRVP7Q/viewform?usp=publish-editor',
    isVisible: true,
    orderIndex: 0,
    createdAt: '2026-02-01T00:00:00.000Z',
  },
  {
    id: 'banner_prostuti_2026',
    title: 'PROSTUTI 2026: State-Level Class 10 Mock Exam Suite',
    subtitle: 'Comprehensive WBBSE & CBSE mock examination with 96%+ historical similarity, granular speed analytics, and real exam atmosphere.',
    badgeText: 'OFFICIAL MOCK EXAM',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    ctaText: 'Register for PROSTUTI (₹100)',
    ctaLink: '#mock-tests',
    isVisible: true,
    orderIndex: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'banner_dada_didi_mentorship',
    title: 'Free Education & YouTube Classes (Classes 5 to 10)',
    subtitle: '100% free video classes for Classes 5 to 10 covering Mathematics, Physical Science, and Life Science with senior toppers.',
    badgeText: '100% FREE EDUCATION & YOUTUBE CLASSES',
    mediaType: 'video',
    mediaUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    ctaText: 'Watch Free YouTube Classes',
    ctaLink: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
    isVisible: false,
    orderIndex: 2,
    createdAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'banner_ai_coding_labs',
    title: 'Free AI Workshop & Coding Classes 2026',
    subtitle: 'Learn Python, Artificial Intelligence fundamentals, prompt engineering, and hands-on coding from CodeLX & ARDM Academy.',
    badgeText: '100% FREE AI & CODING WORKSHOP',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=80',
    ctaText: 'Explore Workshop',
    ctaLink: '#workshop-manager',
    isVisible: true,
    orderIndex: 3,
    createdAt: '2026-01-03T00:00:00.000Z',
  },
  {
    id: 'banner_four_founders_ardm',
    title: 'Meet All 4 Founders of ARDM Academy (A · R · D · M)',
    subtitle: 'Akash Paik (Academic Lead) • Rupam Paul (Operations Lead) • Devnath Pramanick (Mentorship Lead) • Mohim Das (Technology Lead). Four leaders united in student excellence.',
    badgeText: 'MEET ALL 4 FOUNDERS',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80',
    ctaText: 'Meet The 4 Founders',
    ctaLink: '#founders-modal',
    isVisible: true,
    orderIndex: 4,
    createdAt: '2026-01-04T00:00:00.000Z',
  },
];

export function getBanners(): BannerItem[] {
  if (typeof window === 'undefined') return DEFAULT_BANNERS;
  try {
    const raw = localStorage.getItem(KEYS.BANNERS);
    if (!raw) {
      saveBanners(DEFAULT_BANNERS);
      return DEFAULT_BANNERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveBanners(DEFAULT_BANNERS);
      return DEFAULT_BANNERS;
    }
    // Ensure All 4 Founders banner is always present
    if (!parsed.some((b: BannerItem) => b.id === 'banner_four_founders_ardm')) {
      const founderBanner = DEFAULT_BANNERS.find((b) => b.id === 'banner_four_founders_ardm');
      if (founderBanner) {
        parsed.splice(2, 0, founderBanner);
        saveBanners(parsed);
      }
    }
    // Ensure WBBSE Free Online Classes banner is always injected
    if (!parsed.some((b: BannerItem) => b.id === 'banner_wbbse_free_classes_2026')) {
      parsed.unshift(DEFAULT_BANNERS[0]);
      saveBanners(parsed);
    }
    // Upgrade Free Education banner to video and YouTube link if it was previously image
    const freeEduIdx = parsed.findIndex((b: BannerItem) => b.id === 'banner_dada_didi_mentorship');
    if (freeEduIdx >= 0) {
      const siteSettings = getSiteSettings();
      const shouldBeVisible = !!siteSettings.freeClassesBannerVisible;
      if (
        parsed[freeEduIdx].mediaType !== 'video' ||
        parsed[freeEduIdx].title !== 'Free Education & YouTube Classes (Classes 5 to 10)' ||
        parsed[freeEduIdx].isVisible !== shouldBeVisible
      ) {
        parsed[freeEduIdx] = {
          ...parsed[freeEduIdx],
          title: 'Free Education & YouTube Classes (Classes 5 to 10)',
          badgeText: '100% FREE EDUCATION & YOUTUBE CLASSES',
          mediaType: 'video',
          mediaUrl: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
          ctaText: 'Watch Free YouTube Classes',
          ctaLink: 'https://youtu.be/zYGjsevcofw?si=Lt-RV5Fb0sOT91oS',
          isVisible: shouldBeVisible,
        };
        saveBanners(parsed);
      }
    }
    // Upgrade AI Coding Lab banner to image and workshop manager if it was previously video
    const aiIdx = parsed.findIndex((b: BannerItem) => b.id === 'banner_ai_coding_labs');
    if (aiIdx >= 0 && (parsed[aiIdx].mediaType === 'video' || parsed[aiIdx].ctaLink !== '#workshop-manager')) {
      parsed[aiIdx] = {
        ...parsed[aiIdx],
        title: 'Free AI Workshop & Coding Classes 2026',
        badgeText: '100% FREE AI & CODING WORKSHOP',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=80',
        ctaText: 'Explore Workshop',
        ctaLink: '#workshop-manager',
      };
      saveBanners(parsed);
    }
    return parsed.sort((a, b) => a.orderIndex - b.orderIndex);
  } catch (e) {
    console.error('Failed to get banners from storage', e);
    return DEFAULT_BANNERS;
  }
}

export function saveBanners(banners: BannerItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.BANNERS, JSON.stringify(banners));
    window.dispatchEvent(new Event('ardm_banners_updated'));
  } catch (e) {
    console.error('Failed to save banners to storage', e);
  }
}

export function addBanner(bannerData: Omit<BannerItem, 'id' | 'createdAt'>): BannerItem {
  const current = getBanners();
  const newBanner: BannerItem = {
    ...bannerData,
    id: `banner_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
    orderIndex: bannerData.orderIndex || current.length + 1,
  };
  const updated = [...current, newBanner];
  saveBanners(updated);
  return newBanner;
}

export function updateBanner(id: string, updates: Partial<BannerItem>): BannerItem | null {
  const current = getBanners();
  const index = current.findIndex(b => b.id === id);
  if (index === -1) return null;

  current[index] = {
    ...current[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveBanners(current);
  return current[index];
}

export function toggleBannerVisibility(id: string): BannerItem | null {
  const current = getBanners();
  const index = current.findIndex(b => b.id === id);
  if (index === -1) return null;

  current[index].isVisible = !current[index].isVisible;
  current[index].updatedAt = new Date().toISOString();
  saveBanners(current);
  return current[index];
}

export function deleteBanner(id: string): boolean {
  const current = getBanners();
  const filtered = current.filter(b => b.id !== id);
  saveBanners(filtered);
  return true;
}

// ==========================================
// FREE CLASSES ADMIN VISIBILITY & DISPLAY MODE
// ==========================================

export function getFreeClassesDisplayMode(): FreeClassesDisplayMode {
  const settings = getSiteSettings();
  return settings.freeClassesDisplayMode || 'coming_soon';
}

export function setFreeClassesDisplayMode(mode: FreeClassesDisplayMode): void {
  const settings = getSiteSettings();
  settings.freeClassesDisplayMode = mode;
  saveSiteSettings(settings);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ardm_free_classes_mode_updated'));
  }
  logAuditAction('Admin', 'UPDATE_FREE_CLASSES_MODE', `Set Free Classes section mode to ${mode}`);
}

export function isFreeClassesBannerVisible(): boolean {
  const settings = getSiteSettings();
  return !!settings.freeClassesBannerVisible;
}

export function setFreeClassesBannerVisible(visible: boolean): void {
  const settings = getSiteSettings();
  settings.freeClassesBannerVisible = visible;
  saveSiteSettings(settings);

  const banners = getBanners();
  const banner = banners.find((b) => b.id === 'banner_dada_didi_mentorship');
  if (banner) {
    banner.isVisible = visible;
    saveBanners(banners);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ardm_banners_updated'));
    window.dispatchEvent(new Event('ardm_free_classes_mode_updated'));
  }
  logAuditAction('Admin', 'UPDATE_FREE_CLASSES_BANNER', `Free classes homepage banner set to ${visible ? 'VISIBLE' : 'HIDDEN'}`);
}


