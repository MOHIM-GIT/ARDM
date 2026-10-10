import React, { useState } from 'react';
import {
  Search,
  ChevronRight,
  Sparkles,
  Users,
  GraduationCap,
  Code2,
  FileCheck,
  Video,
  ExternalLink,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface GoogleStyleSearchSectionProps {
  onOpenSearchModal: () => void;
  onNavigate: (path: string) => void;
  onOpenFounders: (founderId?: 'all' | 'akash' | 'rupam' | 'devnath' | 'mohim') => void;
  onOpenWorkshopManager: () => void;
  onOpenRegistration: () => void;
  onOpenTestEngine: () => void;
  onOpenDownloadAdmitCard: () => void;
}

export const GoogleStyleSearchSection: React.FC<GoogleStyleSearchSectionProps> = ({
  onOpenSearchModal,
  onNavigate,
  onOpenFounders,
  onOpenWorkshopManager,
  onOpenRegistration,
  onOpenTestEngine,
  onOpenDownloadAdmitCard,
}) => {
  const [inlineQuery, setInlineQuery] = useState('');

  // Sitelinks exactly styled like the user's uploaded Google Search result screenshot
  const sitelinks = [
    {
      id: 'mock-tests',
      title: 'Class 10 Madhyamik Mock Tests (PROSTUTI 2026)',
      description: 'Up to 96%+ Board Question Prediction Accuracy • State CBT Simulator & Offline Exam Centers',
      action: onOpenRegistration,
      badge: '₹100 / SUBJECT',
      keywords: ['mock', 'prostuti', 'class 10', 'madhyamik', 'cbt', 'test', 'exam'],
    },
    {
      id: 'founders',
      title: 'Meet All 4 Founders of ARDM Academy (A · R · D · M)',
      description: 'Akash Paik (Academic Lead) • Rupam Paul (Operations) • Devnath Pramanick (Mentorship) • Mohim Das (Tech & CodeLX)',
      action: () => onOpenFounders('all'),
      badge: '4 FOUNDERS',
      keywords: ['founders', 'akash', 'rupam', 'devnath', 'mohim', 'leadership'],
    },
    {
      id: 'ai-tech',
      title: '100% Free AI Workshops & Python Masterclasses',
      description: 'Hands-on Coding, Prompt Engineering & Verifiable Certificates by CodeLX (Founder & CEO Mohim Das)',
      action: onOpenWorkshopManager,
      badge: '100% FREE',
      keywords: ['ai', 'python', 'coding', 'codelx', 'mohim', 'workshop'],
    },
    {
      id: 'free-classes',
      title: 'Online Free Video Classes (Classes 5 to 10)',
      description: 'Daily YouTube Syllabus Masterclasses, Madhyamik PYQ Solutions & Bengali Medium Study Notes',
      action: () => onNavigate('/free-classes'),
      badge: 'YOUTUBE LIVE',
      keywords: ['free', 'youtube', 'classes', 'video', 'notes'],
    },
    {
      id: 'admit-card',
      title: 'Download Admit Card & Verify Registration',
      description: 'Instant Verifiable A4 PDF Admit Card with Roll Number, Center Details & QR Verification',
      action: onOpenDownloadAdmitCard,
      badge: 'INSTANT PDF',
      keywords: ['admit', 'card', 'roll', 'registration', 'hall ticket'],
    },
    {
      id: 'results',
      title: 'State Merit List & Toppers Scorecard',
      description: 'Official Top 10 Toppers Leaderboard, District Score Benchmarks & Speed-Accuracy Analytics',
      action: () => onNavigate('/results'),
      badge: 'MERIT RANKS',
      keywords: ['results', 'toppers', 'merit', 'scorecard', 'rank'],
    },
  ];

  const filteredLinks = inlineQuery.trim()
    ? sitelinks.filter((item) => {
        const q = inlineQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.keywords.some((kw) => kw.includes(q))
        );
      })
    : sitelinks;

  return (
    <section
      aria-label="Google Sitelinks Search Hub"
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6"
    >
      <div className="rounded-2xl sm:rounded-3xl bg-[#0e0e12] border border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Header with Google-Style Query Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/70 border border-blue-700/60 text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <Search className="w-3 h-3 text-blue-400" />
              <span>Instant Deep-Search Sitelinks</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Explore ARDM Academy Quick Links
            </h2>
            <p className="text-xs text-slate-400">
              Direct access to mock test registration, 4 founders profiles, free AI classes, and admit cards.
            </p>
          </div>

          {/* Interactive Google-Style Pill Search Button / Input */}
          <div className="w-full md:w-auto md:min-w-[340px]">
            <div className="relative flex items-center bg-[#1e1e24] hover:bg-[#25252d] focus-within:bg-[#25252d] border border-slate-700 focus-within:border-blue-500 rounded-full px-4 py-2.5 transition-all shadow-inner">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={inlineQuery}
                onChange={(e) => setInlineQuery(e.target.value)}
                placeholder="Search courses, founders, AI..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden font-sans"
              />
              <button
                type="button"
                onClick={onOpenSearchModal}
                className="ml-2 px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                title="Open Expanded Search Modal"
              >
                Expand
              </button>
            </div>
          </div>
        </div>

        {/* GOOGLE SEARCH RESULT CARD + SITELINKS LIST (MATCHING USER SCREENSHOT) */}
        <div className="bg-[#121216] border border-slate-800/90 rounded-2xl overflow-hidden shadow-lg">
          {/* Main Snippet Link Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-gradient-to-r from-[#14141a] via-[#121216] to-[#0f0f13] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white text-[10px] font-bold">
                  A
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  <span>https://ardmacademy.in</span>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-blue-400 hover:underline cursor-pointer">
                ARDM Academy | Official Examination & AI Education Portal
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                West Bengal Board (WBBSE) & CBSE Academic Coaching, Class 10 Madhyamik Mock Tests, 4 Founders Leadership, and CodeLX AI Masterclasses.
              </p>
            </div>

            <button
              onClick={onOpenSearchModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shrink-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Search All Pages</span>
            </button>
          </div>

          {/* Sitelinks List Rows (Red Circle in User Screenshot) */}
          <div className="divide-y divide-slate-800/80">
            {filteredLinks.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left p-3.5 sm:p-4.5 hover:bg-slate-800/50 transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-1 min-w-0 pr-2">
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
                  <p className="text-xs sm:text-[13px] text-slate-400 leading-snug line-clamp-2 sm:line-clamp-none font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/40 group-hover:bg-blue-950/60 transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
