import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ChevronRight,
  Sparkles,
  Users,
  GraduationCap,
  Code2,
  FileCheck,
  Video,
  HeartHandshake,
  BookOpen,
  Award,
  PhoneCall,
  ExternalLink,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export interface SearchSitelink {
  id: string;
  title: string;
  description: string;
  category: 'mock-tests' | 'founders' | 'ai-tech' | 'free-classes' | 'admit-card' | 'results' | 'mentorship' | 'courses';
  icon: React.ElementType;
  badge?: string;
  action: () => void;
  keywords: string[];
}

interface GoogleStyleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenFounders: (founderId?: 'all' | 'akash' | 'rupam' | 'devnath' | 'mohim') => void;
  onOpenWorkshopManager: () => void;
  onOpenRegistration: () => void;
  onOpenTestEngine: () => void;
  onOpenDownloadAdmitCard: () => void;
}

export const GoogleStyleSearchModal: React.FC<GoogleStyleSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenFounders,
  onOpenWorkshopManager,
  onOpenRegistration,
  onOpenTestEngine,
  onOpenDownloadAdmitCard,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedCategory('all');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global ESC shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sitelinks: SearchSitelink[] = [
    {
      id: 'mock-tests',
      title: 'Class 10 Madhyamik Mock Tests (PROSTUTI 2026)',
      description: 'Up to 96%+ Board Question Prediction Accuracy • State Rank CBT Simulator & Offline Exam Centers',
      category: 'mock-tests',
      icon: GraduationCap,
      badge: '96%+ ACCURACY',
      action: () => {
        onOpenRegistration();
        onClose();
      },
      keywords: ['mock test', 'prostuti', 'class 10', 'madhyamik', 'cbt', 'exam', 'test', 'wbbse', 'preparation', 'question paper', 'pyq', '100'],
    },
    {
      id: 'founders',
      title: 'Meet All 4 Founders of ARDM Academy (A · R · D · M)',
      description: 'Akash Paik (Academic Lead) • Rupam Paul (Operations) • Devnath Pramanick (Mentorship) • Mohim Das (Tech & CodeLX)',
      category: 'founders',
      icon: Users,
      badge: '4 FOUNDERS',
      action: () => {
        onOpenFounders('all');
        onClose();
      },
      keywords: ['founders', 'akash paik', 'rupam paul', 'devnath pramanick', 'mohim das', 'ardm', 'who are the founders', 'founder', 'faculty', 'leadership'],
    },
    {
      id: 'ai-workshop',
      title: '100% Free AI Workshops & Python Masterclasses',
      description: 'Hands-on Coding, Artificial Intelligence Fundamentals, Prompt Engineering & Verifiable Certificates by CodeLX',
      category: 'ai-tech',
      icon: Code2,
      badge: '100% FREE',
      action: () => {
        onOpenWorkshopManager();
        onClose();
      },
      keywords: ['ai', 'artificial intelligence', 'python', 'coding', 'codelx', 'mohim das', 'workshop', 'free', 'technology', 'computer science'],
    },
    {
      id: 'free-classes',
      title: 'Online Free Video Classes (Classes 5 to 10)',
      description: 'Daily YouTube Syllabus Masterclasses, Madhyamik PYQ Solutions, Bengali Medium Guidance & Live Doubt Desk',
      category: 'free-classes',
      icon: Video,
      badge: 'YOUTUBE LIVE',
      action: () => {
        onNavigate('/free-classes');
        onClose();
      },
      keywords: ['free classes', 'youtube', 'class 5', 'class 6', 'class 7', 'class 8', 'class 9', 'class 10', 'video', 'bengali', 'notes', 'study'],
    },
    {
      id: 'admit-card',
      title: 'Download Admit Card & Verify Registration',
      description: 'Instant Verifiable A4 PDF Admit Card with Roll Number, Center Details & Encrypted QR Code Verification',
      category: 'admit-card',
      icon: FileCheck,
      badge: 'INSTANT PDF',
      action: () => {
        onOpenDownloadAdmitCard();
        onClose();
      },
      keywords: ['admit card', 'download admit card', 'hall ticket', 'roll number', 'registration', 'center', 'pdf', 'verify'],
    },
    {
      id: 'results',
      title: 'State Merit List & Toppers Scorecard',
      description: 'Official Top 10 Toppers Leaderboard, District Score Benchmarks, Speed-Accuracy Analytics & Verification',
      category: 'results',
      icon: Award,
      badge: 'STATE RANKS',
      action: () => {
        onNavigate('/results');
        onClose();
      },
      keywords: ['results', 'merit list', 'toppers', 'scorecard', 'rank', 'leaderboard', 'marks', 'madhyamik result'],
    },
    {
      id: 'cbt-simulator',
      title: 'Live CBT Computer-Based Test Engine Simulator',
      description: 'Authentic State & National Entrance Interface with Real Countdown Timer, Question Palette & Instant Scoring',
      category: 'mock-tests',
      icon: Sparkles,
      badge: 'PRACTICE CBT',
      action: () => {
        onOpenTestEngine();
        onClose();
      },
      keywords: ['cbt', 'computer based test', 'simulator', 'online exam', 'practice test', 'timer', 'interface'],
    },
    {
      id: 'mentorship',
      title: 'Dada-Didi 1-on-1 Mentorship & Counseling',
      description: 'Empathetic Student Psychology, Exam-Hall Anxiety Relief, Topper Study Routines & Direct Helpline: 6289139984',
      category: 'mentorship',
      icon: HeartHandshake,
      badge: 'HELPLINE',
      action: () => {
        onNavigate('/#contact');
        onClose();
      },
      keywords: ['mentorship', 'dada didi', 'devnath pramanick', 'counseling', 'stress', 'anxiety', 'helpline', 'call', 'routine', 'guidance'],
    },
    {
      id: 'courses',
      title: 'Complete Academic Courses & Subject Syllabus',
      description: 'Mathematics, Physical Science, Life Science, Bengali, English, History, Geography & Computer Science',
      category: 'courses',
      icon: BookOpen,
      badge: '8 SUBJECTS',
      action: () => {
        onNavigate('/courses');
        onClose();
      },
      keywords: ['courses', 'subjects', 'mathematics', 'physical science', 'life science', 'history', 'geography', 'bengali', 'english', 'syllabus'],
    },
  ];

  const filteredSitelinks = sitelinks.filter((link) => {
    const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    const titleMatch = link.title.toLowerCase().includes(q);
    const descMatch = link.description.toLowerCase().includes(q);
    const keywordMatch = link.keywords.some((kw) => kw.includes(q) || q.includes(kw));

    return titleMatch || descMatch || keywordMatch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="ARDM Academy Quick Search"
    >
      <div
        className="relative w-full max-w-3xl bg-[#17171c] sm:bg-[#121216] border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 text-white transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Google-style Search Bar Header */}
        <div className="p-3.5 sm:p-5 border-b border-slate-800 bg-[#0c0c0f]">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Google / ARDM Colored Emblem */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-red-800 flex items-center justify-center text-white font-black text-sm shadow-md border border-red-500/40 shrink-0">
              A
            </div>

            {/* Google-Style Pill Input Container */}
            <div className="flex-1 relative flex items-center bg-[#202124] hover:bg-[#25262a] focus-within:bg-[#28292d] border border-slate-700/90 focus-within:border-blue-500 rounded-full px-3.5 sm:px-4 py-2 transition-all shadow-inner">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ARDM Academy: mock tests, 4 founders, AI, admit card..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer mr-1"
                  aria-label="Clear Search Input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              aria-label="Close Search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto scrollbar-none pb-0.5 text-[11px] font-medium">
            {[
              { id: 'all', label: 'All Results' },
              { id: 'mock-tests', label: 'Mock Tests (₹100)' },
              { id: 'founders', label: '4 Founders (A·R·D·M)' },
              { id: 'ai-tech', label: 'Free AI Workshops' },
              { id: 'free-classes', label: 'Free YouTube Classes' },
              { id: 'admit-card', label: 'Admit Card' },
              { id: 'results', label: 'Merit Ranks' },
              { id: 'courses', label: 'Syllabus' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-[#202124] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Search Result Card Body (Google Styled Result Snippet) */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {/* Top Google Result Metadata Header */}
          <div className="bg-[#15151a] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400 text-[10px] font-bold">
                A
              </div>
              <div className="leading-tight">
                <span className="text-[11px] text-slate-400 font-mono block">ardmacademy.in</span>
                <span className="text-[10px] text-slate-500 font-mono block">https://ardmacademy.in</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-blue-400 hover:text-blue-300 transition-colors leading-snug cursor-pointer">
              ARDM Academy | Learn. Practice. Improve. (Official Portal)
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Educational institution founded by 4 leaders: Akash Paik (Academic Lead), Rupam Paul (Operations Lead), Devnath Pramanick (Mentorship Lead), and Mohim Das (Technology Lead & Founder/CEO of CodeLX).
            </p>
          </div>

          {/* THE SITELINKS LIST: MATCHING USER'S CIRCLED GOOGLE SEARCH RESULT */}
          <div className="bg-[#121216] border border-slate-800/90 rounded-2xl overflow-hidden shadow-md divide-y divide-slate-800/80">
            {filteredSitelinks.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-sm font-semibold text-white">No search results found for "{query}"</p>
                <p className="text-xs text-slate-400">Try searching for "mock test", "founders", "python", or "admit card"</p>
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white cursor-pointer"
                >
                  View All Search Options
                </button>
              </div>
            ) : (
              filteredSitelinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full text-left p-3.5 sm:p-4 hover:bg-slate-800/50 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="space-y-1 pr-2 min-w-0">
                      {/* Sitelink Title with Blue Hover & Chevron */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-blue-400 group-hover:text-blue-300 group-hover:underline tracking-tight">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono font-bold text-slate-300 border border-slate-700">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Sitelink Subtitle Description */}
                      <p className="text-xs sm:text-[13px] text-slate-400 leading-snug line-clamp-2 sm:line-clamp-none font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Right Chevron Arrow Icon (Exact Match to Google Screenshot) */}
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/40 group-hover:bg-blue-950/60 transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-slate-800 bg-[#0c0c0f] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-[10px] font-mono text-slate-300">ESC</kbd> to exit</span>
            <span className="sm:hidden text-[11px]">ARDM Academy Sitelinks Explorer</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
