import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Video,
  FileText,
  Download,
  CheckCircle2,
  Trophy,
  BrainCircuit,
  PhoneCall,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { getFreeClasses, getCourses } from '../services/storage';
import { FreeClassVideo, Course } from '../types';
import { SITE_CONFIG, getTelLink } from '../config/siteConfig';

interface ClassDetailsPageProps {
  classLevel: string; // e.g. "class-10", "class-9", "class-8", "class-7", "class-6", "class-5"
  onNavigate: (path: string) => void;
  onOpenRegistration: (subjectId?: string) => void;
}

interface ClassCurriculumData {
  title: string;
  tagline: string;
  description: string;
  board: string;
  subjects: {
    name: string;
    chapters: string[];
    weightage?: string;
  }[];
  keyHighlights: string[];
  mentorshipAdvice: string;
  recommendedBooks: string[];
}

const CLASS_DATA_MAP: Record<string, ClassCurriculumData> = {
  'class-10': {
    title: 'Class 10 Madhyamik & Board Exam Preparation',
    tagline: 'Comprehensive West Bengal Board (WBBSE) & CBSE Board Excellence',
    description:
      'Master the complete Class 10 curriculum with chapter-wise video masterclasses, PROSTUTI mock test simulations, previous 10-year question paper solutions (PYQs), and expert Dada-Didi mentorship.',
    board: 'WBBSE (Madhyamik) & CBSE Class 10',
    subjects: [
      {
        name: 'Physical Science (ভৌত বিজ্ঞান)',
        chapters: [
          'Environment Concerns (পরিবেশের জন্য ভাবনা)',
          'Behavior of Gases (গ্যাসের আচরণ)',
          'Chemical Calculations (রাসায়নিক গণনা)',
          'Thermal Phenomena (তাপের ঘটনাসমূহ)',
          'Light & Optics (আলো)',
          'Current Electricity (চলতড়িৎ)',
          'Atomic Nucleus (পরমাণুর নিউক্লিয়াস)',
          'Periodic Table & Chemical Bonding (পর্যায় সারণি ও রাসায়নিক বন্ধন)',
        ],
        weightage: '90 Marks Written + 10 Marks Oral',
      },
      {
        name: 'Mathematics (গণিত)',
        chapters: [
          'Quadratic Equations (একচলবিশিষ্ট দ্বিঘাত সমীকরণ)',
          'Simple & Compound Interest (সরল ও চক্রবৃদ্ধি সুদ)',
          'Theorems on Circle (বৃত্ত সম্পর্কিত উপপাদ্য)',
          'Rectangular Parallelopiped & Cylinder (আয়তঘন ও চোঙ)',
          'Ratio and Proportion (অনুপাত ও সমানুপাত)',
          'Trigonometry & Heights and Distances (ত্রিকোণমিতি)',
          'Statistics: Mean, Median, Mode (পরিসংখ্যান)',
        ],
        weightage: '90 Marks Written + 10 Marks Project',
      },
      {
        name: 'Life Science (জীবন বিজ্ঞান)',
        chapters: [
          'Control & Coordination in Living Organisms (জীবজগতে নিয়ন্ত্রণ ও সমন্বয়)',
          'Continuity of Life & Cell Division (জীবনের ধারাবাহিকতা)',
          'Heredity and Common Genetic Diseases (বংশগতি ও কয়েকটি সাধারণ জিনগত রোগ)',
          'Evolution and Adaptation (অভিব্যক্তি ও অভিযোজন)',
          'Environment, Resources & Conservation (পরিবেশ, তার সম্পদ এবং তাদের সংরক্ষণ)',
        ],
        weightage: '90 Marks Written + 10 Marks Project',
      },
      {
        name: 'Computer Applications & AI',
        chapters: [
          'Fundamentals of Computer Systems',
          'Introduction to Algorithms & Flowcharts',
          'Basics of Python Programming',
          'AI Literacy & Modern Digital Tools',
        ],
      },
    ],
    keyHighlights: [
      'Over 96% question prediction accuracy from PROSTUTI Mock Test series in consecutive board exams.',
      'Step-by-step marking scheme training so you never lose marks in calculations.',
      'Chapter revision notes and formula cheat-sheets curated by verified board paper examiners.',
      'Live one-on-one doubt resolution with university rankers and board toppers.',
    ],
    mentorshipAdvice:
      'In Class 10, consistency beats last-minute cramming. Allocate 45 minutes daily to physical science numerical problems and solve at least 2 full mock papers every month before your pre-boards.',
    recommendedBooks: [
      'WBBSE Official Board Textbooks',
      'ARDM PROSTUTI Class 10 Mock Test Question Bank',
      'Madhyamik Pariksha 10-Year Solved Papers (2015–2025)',
    ],
  },
  'class-9': {
    title: 'Class 9 Foundation & High School Transition',
    tagline: 'Bridging Middle School to Board Exam Rigor',
    description:
      'Class 9 is the critical foundation year for physics, chemistry, advanced mathematics, and biology. Build rock-solid fundamental concepts before entering the Madhyamik board year.',
    board: 'WBBSE & CBSE Class 9',
    subjects: [
      {
        name: 'Physical Science',
        chapters: [
          'Measurement & Units',
          'Force and Motion (Newtonian Mechanics)',
          'Matter: Structure and Properties',
          'Atomic Structure & Radioactivity',
          'Sound Waves & Acoustics',
          'Heat, Temperature & Latent Heat',
        ],
      },
      {
        name: 'Mathematics',
        chapters: [
          'Real Numbers & Number Systems',
          'Polynomials and Factorization',
          'Linear Equations in Two Variables',
          'Co-ordinate Geometry & Graphs',
          'Area and Perimeter of Plane Figures',
          'Statistics & Frequency Distribution',
        ],
      },
      {
        name: 'Life Science',
        chapters: [
          'Levels of Organization of Life',
          'Physiological Processes in Living Organisms',
          'Human Organ Systems (Circulation, Excretion, Respiration)',
          'Biology and Human Welfare',
        ],
      },
      {
        name: 'Coding & Logic Building',
        chapters: [
          'Binary Arithmetic & Logic Gates',
          'Scratch & Python Basics',
          'Computational Problem Solving',
        ],
      },
    ],
    keyHighlights: [
      'In-depth foundational conceptual clarity matching higher secondary entrance requirements.',
      'Practical demonstration videos for physics and biology experiments.',
      'Interactive quizzes with instant scorecards and feedback.',
    ],
    mentorshipAdvice:
      'Do not treat Class 9 lightly. Nearly 60% of higher secondary science concepts depend directly on Class 9 Newton’s laws, cell biology, and polynomials.',
    recommendedBooks: [
      'WBBSE Class 9 Standard Curriculum Books',
      'ARDM Foundation Practice Workbook',
    ],
  },
  'class-8': {
    title: 'Class 8 Science, Math & Analytical Thinking',
    tagline: 'Cultivating Scientific Curiosity and Problem Solving',
    description:
      'Empowering Class 8 students with crystal-clear conceptual understanding in algebra, geometry, natural sciences, and introduction to computer programming.',
    board: 'WBBSE, CBSE & ICSE Class 8',
    subjects: [
      {
        name: 'Mathematics',
        chapters: [
          'Rational Numbers',
          'Linear Equations & Exponents',
          'Square and Cube Roots',
          'Algebraic Expressions & Identities',
          'Mensuration & Solid Shapes',
          'Data Handling and Probability',
        ],
      },
      {
        name: 'Integrated Science',
        chapters: [
          'Force, Pressure and Friction',
          'Microorganisms: Friend and Foe',
          'Synthetic Fibres and Plastics',
          'Cell Structure and Functions',
          'Light, Reflection and Human Eye',
          'Chemical Effects of Electric Current',
        ],
      },
      {
        name: 'Digital Skills & Logic',
        chapters: [
          'Computer Hardware & Operating Systems',
          'Introduction to HTML and Web Pages',
          'Visual Block Coding',
        ],
      },
    ],
    keyHighlights: [
      'Visual interactive learning modules that make abstract math intuitive.',
      'Encouragement of creative questioning and experiment-based reasoning.',
      'Free video lectures and printable worksheets.',
    ],
    mentorshipAdvice:
      'Focus on mastering algebraic factorization and understanding how formulas work rather than just memorizing answers.',
    recommendedBooks: [
      'State Board Class 8 Textbooks',
      'NCERT Mathematics and Science',
    ],
  },
  'class-7': {
    title: 'Class 7 Middle School Academic Growth',
    tagline: 'Strengthening Core Concepts in Science and Mathematics',
    description:
      'A joyful, high-engagement learning experience for Class 7 students covering integers, fractions, light, heat, nutrition in plants, and basic digital awareness.',
    board: 'WBBSE & CBSE Class 7',
    subjects: [
      {
        name: 'Mathematics',
        chapters: [
          'Integers and Operations',
          'Fractions and Decimals',
          'Simple Equations',
          'Lines and Angles',
          'The Triangle and its Properties',
          'Comparing Quantities & Percentages',
        ],
      },
      {
        name: 'Science & Environment',
        chapters: [
          'Nutrition in Plants and Animals',
          'Heat and Temperature',
          'Acids, Bases and Salts',
          'Physical and Chemical Changes',
          'Respiration in Organisms',
          'Motion and Time',
        ],
      },
    ],
    keyHighlights: [
      'Friendly Dada-Didi mentors who explain tough topics with simple Bengali and English analogies.',
      'Fun animated diagrams and real-life examples.',
      'Regular practice worksheets for homework support.',
    ],
    mentorshipAdvice:
      'Practice mental arithmetic and solve 5 sums every evening. Mathematics becomes effortless when numbers become familiar friends.',
    recommendedBooks: ['State Board Class 7 Textbooks', 'ARDM Middle School Worksheet Kit'],
  },
  'class-6': {
    title: 'Class 6 Transition & Foundation Building',
    tagline: 'Developing Healthy Study Habits and Conceptual Foundations',
    description:
      'Supporting young scholars as they step into middle school. We make mathematics intuitive and science an exciting journey of discovery.',
    board: 'WBBSE & CBSE Class 6',
    subjects: [
      {
        name: 'Mathematics',
        chapters: [
          'Knowing Our Numbers',
          'Whole Numbers & Playing with Numbers',
          'Basic Geometrical Ideas',
          'Understanding Elementary Shapes',
          'Fractions & Decimals',
          'Introduction to Algebra',
        ],
      },
      {
        name: 'General Science',
        chapters: [
          'Food: Where Does it Come From?',
          'Components of Food & Balanced Diet',
          'Sorting Materials into Groups',
          'Separation of Substances',
          'Getting to Know Plants',
          'Body Movements & Skeletal System',
        ],
      },
    ],
    keyHighlights: [
      'Stress-free, positive reinforcement teaching style.',
      'Visual aids, hands-on tasks, and engaging storytelling.',
      'Complete safety, parental involvement, and approachable educators.',
    ],
    mentorshipAdvice:
      'Read science chapters like adventure stories and keep a personal curiosity notebook to write questions down.',
    recommendedBooks: ['Class 6 State Curriculum Textbooks'],
  },
  'class-5': {
    title: 'Class 5 Primary to Middle School Bridge',
    tagline: 'Fostering Love for Learning and Confident Numbers',
    description:
      'A warm, welcoming educational space for Class 5 students focusing on fundamental arithmetic, environmental science, reading comprehension, and creative logic.',
    board: 'WBBSE & CBSE Class 5',
    subjects: [
      {
        name: 'Mathematics',
        chapters: [
          'Large Numbers and Place Value',
          'Addition, Subtraction, Multiplication & Division',
          'Factors and Multiples (HCF & LCM)',
          'Fractions & Simple Decimals',
          'Measurement of Length, Weight & Capacity',
          'Time, Money & Shapes',
        ],
      },
      {
        name: 'Environmental Studies & Science',
        chapters: [
          'Super Senses in Living Organisms',
          'Water, Rivers and Natural Ecosystems',
          'Seeds and How Plants Grow',
          'Human Body, Food and Health',
          'Sun, Moon, Earth and Seasons',
        ],
      },
    ],
    keyHighlights: [
      'Zero academic fear — warm and patient mentors.',
      'Daily practical arithmetic games and puzzles.',
      '100% free access to video lessons and downloadable study sheets.',
    ],
    mentorshipAdvice:
      'Ask "Why?" every day. The best students are those who are not afraid to be curious about nature and numbers.',
    recommendedBooks: ['Amar Ganit (আমাদের গণিত)', 'Paribesh O Bigyan (পরিবেশ ও বিজ্ঞান)'],
  },
};

export const ClassDetailsPage: React.FC<ClassDetailsPageProps> = ({
  classLevel,
  onNavigate,
  onOpenRegistration,
}) => {
  const normalizedKey = classLevel.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const data = CLASS_DATA_MAP[normalizedKey] || CLASS_DATA_MAP['class-10'];
  const displayClassName = data.title.split(' ')[0] + ' ' + data.title.split(' ')[1];

  const [classVideos, setClassVideos] = useState<FreeClassVideo[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Filter video lectures matching this class
    const cleanClassTag = displayClassName.toLowerCase();
    const allVideos = getFreeClasses();
    const matchedVideos = allVideos.filter(
      (v) =>
        v.isPublished &&
        (v.studentClass.toLowerCase().includes(cleanClassTag) ||
          cleanClassTag.includes(v.studentClass.toLowerCase()))
    );
    setClassVideos(matchedVideos);

    // Get matching courses
    const allCourses = getCourses().filter((c) => c.publishStatus === 'Published');
    setCourses(allCourses);
  }, [displayClassName]);

  const pageTitle = `${displayClassName} Online Classes, Mock Tests & Syllabus | ARDM Academy`;
  const metaDescription = `${data.description.slice(0, 150)}... Access free video lectures, mock test series, and board preparation tips at ARDM Academy.`;
  const canonicalUrl = `https://ardmacademy.netlify.app/classes/${normalizedKey}`;

  const classSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${data.title} - ARDM Academy`,
    description: data.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'ARDM Academy',
      sameAs: 'https://ardmacademy.netlify.app',
    },
    educationalLevel: displayClassName,
    inLanguage: 'en-IN',
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        breadcrumbs={[
          { name: 'Classes', path: '/#free-classes' },
          { name: displayClassName, path: `/classes/${normalizedKey}` },
        ]}
        schema={classSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Classes', path: '/#free-classes' },
          { name: displayClassName, path: `/classes/${normalizedKey}` },
        ]}
        onNavigate={onNavigate}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Class Hero Header */}
        <header className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs mb-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>{data.board}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              {data.title}
            </h1>

            <p className="text-sm sm:text-base text-indigo-700 font-semibold font-mono">
              {data.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.description}
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenRegistration()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <span>Enroll in {displayClassName} Mock Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getTelLink()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-indigo-600" />
                <span>Call Guidance: 6289139984</span>
              </a>
            </div>
          </div>
        </header>

        {/* Key Educational Highlights Grid */}
        <section className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-[11px] font-mono uppercase font-bold text-indigo-700">
              Why Study {displayClassName} with ARDM Academy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Academic Highlights & Learning Advantages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.keyHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{hl}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Complete Subject-Wise Curriculum Blueprint */}
        <section className="mb-16 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xs">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-[11px] font-mono uppercase font-bold text-indigo-700">
              Curriculum & Chapter Map
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {displayClassName} Subject Modules & Examination Syllabus
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Aligned with West Bengal Board (WBBSE Madhyamik) & Central Board (CBSE) academic standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.subjects.map((sub, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-4"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-200/70 pb-3">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />
                    <h3 className="font-extrabold text-base text-slate-900">{sub.name}</h3>
                  </div>
                  {sub.weightage && (
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-mono font-bold shrink-0">
                      {sub.weightage}
                    </span>
                  )}
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  {sub.chapters.map((ch, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Free Video Lectures for this Class */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-red-600">
                YouTube Video Studio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                Free {displayClassName} Video Masterclasses
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/#free-classes')}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Lecture Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {classVideos.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
              <Video className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">
                Stream our foundational YouTube lecture series for all middle and high school subjects.
              </p>
              <button
                onClick={() => onNavigate('/#free-classes')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Open Free Video Classes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classVideos.slice(0, 3).map((v) => (
                <article
                  key={v.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                      <img
                        src={v.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'}
                        alt={v.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-bold">
                          {v.studentClass}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                          {v.subject}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                        {v.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {v.description}
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span>Chapter: <strong>{v.chapter || 'Foundations'}</strong></span>
                        <span>Faculty: <strong>{v.teacher}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={v.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-600 font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Watch Free Lecture</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Dada-Didi Mentorship Section */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 mb-16 shadow-lg space-y-4">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold">
              DADA-DIDI MENTORSHIP GUIDELINES
            </span>
            <h3 className="text-2xl font-black tracking-tight">
              Study Advice from ARDM Board Toppers
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed italic">
              &quot;{data.mentorshipAdvice}&quot;
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400">Recommended Reference Resources:</span>
              {data.recommendedBooks.map((b, idx) => (
                <span key={idx} className="bg-white/10 px-2.5 py-0.5 rounded-md font-mono text-[11px] text-cyan-200">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Other Class Quick Links */}
        <nav aria-label="Other Classes" className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            Browse Other Class Curriculum Blueprints
          </span>
          <div className="flex flex-wrap gap-2">
            {['class-10', 'class-9', 'class-8', 'class-7', 'class-6', 'class-5'].map((cl) => {
              const label = cl.replace('-', ' ').toUpperCase();
              const isCurrent = cl === normalizedKey;
              return (
                <a
                  key={cl}
                  href={`/classes/${cl}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/classes/${cl}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
};
