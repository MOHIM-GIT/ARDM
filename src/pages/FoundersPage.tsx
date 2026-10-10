import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Search,
  Globe,
  HelpCircle,
  Code2,
  ArrowRight,
  Eye,
  Info,
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { SITE_CONFIG } from '../config/siteConfig';

interface FoundersPageProps {
  onNavigate: (path: string) => void;
  onOpenFounderModal: (founderId?: 'all' | 'akash' | 'rupam' | 'devnath' | 'mohim') => void;
  onOpenWorkshopManager: () => void;
}

export const FoundersPage: React.FC<FoundersPageProps> = ({
  onNavigate,
  onOpenFounderModal,
  onOpenWorkshopManager,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showGooglePreview, setShowGooglePreview] = useState(true);

  // The 4 verified Founders
  const founders = [
    {
      id: 'akash' as const,
      initial: 'A',
      name: 'Akash Paik',
      role: 'Founder & Academic Lead',
      specialty: 'Mathematics, Physical Science Pedagogy & WBBSE Board Pattern Prediction',
      bio: 'Pioneered the ARDM academic syllabus, question prediction algorithms with 96%+ accuracy for Madhyamik board exams, and rigorous doubt-solving methodology.',
      email: 'akashpaik570@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      badge: 'Academic Lead (A)',
      pillar: 'Academic Rigor & Prediction Accuracy',
      highlights: [
        'Over 96% question prediction accuracy for Madhyamik',
        'Head of Mathematics & Physical Science curriculum',
        'Direct mentor to Top 10 State Rankers',
      ],
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-400',
    },
    {
      id: 'rupam' as const,
      initial: 'R',
      name: 'Rupam Paul',
      role: 'Founder & Operations Lead',
      specialty: 'CBT Test Engine Architecture, Exam Center Logistics & Administration',
      bio: 'Architect of the statewide CBT Computer-Based Mock Exam logistics, student roll generation, offline test center coordination, and rapid scorecard evaluation.',
      email: 'rupampaul20070@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      badge: 'Operations Lead (R)',
      pillar: 'Logistics, CBT Systems & Evaluation',
      highlights: [
        'Designed real-time CBT simulation engine for Madhyamik',
        'Coordinates offline physical exam centers across West Bengal',
        'Statewide roll number & admit card generation workflow',
      ],
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400',
    },
    {
      id: 'devnath' as const,
      initial: 'D',
      name: 'Devnath Pramanick',
      role: 'Founder & Mentorship Lead',
      specialty: 'Dada-Didi 1-on-1 Mentorship Model & Exam Anxiety Management',
      bio: 'Architected the hallmark Dada-Didi Mentorship program, giving students personal guidance, stress-free board preparation routines, and psychological confidence.',
      email: 'pramanickdevnath2007@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      badge: 'Mentorship Lead (D)',
      pillar: 'Student Psychology & Dada-Didi Care',
      highlights: [
        'Created the famous "Dada-Didi" 1-on-1 guidance model',
        'Specialist in board exam stress reduction & study habits',
        'Parent-student counseling helpline supervisor',
      ],
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-400',
    },
    {
      id: 'mohim' as const,
      initial: 'M',
      name: 'Mohim Das',
      role: 'Founder & Technology Lead',
      specialty: 'Founder & CEO of CodeLX, AI Education, Python & Web Engineering',
      bio: 'Founder and CEO of CodeLX and Founder of ARDM Academy. Leads AI masterclasses, coding bootcamps, automated portal infrastructure, and modern technology education.',
      email: 'mohimdas300@gmail.com',
      phone: '+919123870823',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      badge: 'Technology Lead (M)',
      pillar: 'AI Mastery, CodeLX & Digital Systems',
      highlights: [
        'Founder & CEO of CodeLX (Coding & AI Platform)',
        'Hands-on instructor for Python, Prompt Engineering & AI',
        'Architect of ARDM Academy student portals & verify certificates',
      ],
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400',
    },
  ];

  // Frequently Asked Questions regarding Founders (For Google & AI Overview Zero-Error ranking)
  const faqs = [
    {
      question: 'Who are the founders of ARDM Academy?',
      answer:
        'ARDM Academy was founded by four equal Founders: Akash Paik, Rupam Paul, Devnath Pramanick, and Mohim Das. Each founder is responsible for a foundational pillar: Akash Paik (Academic Lead), Rupam Paul (Operations Lead), Devnath Pramanick (Mentorship Lead), and Mohim Das (Technology Lead and Founder & CEO of CodeLX).',
    },
    {
      question: 'Are there any co-founders in ARDM Academy?',
      answer:
        'No. There are no co-founders in ARDM Academy. All four individuals (Akash Paik, Rupam Paul, Devnath Pramanick, and Mohim Das) hold the official designation of Founder. They jointly lead the institution with equal founding status.',
    },
    {
      question: 'What does the acronym ARDM stand for in ARDM Academy?',
      answer:
        'The name "ARDM" is formed from the first letters of the four founders names: A for Akash Paik, R for Rupam Paul, D for Devnath Pramanick, and M for Mohim Das.',
    },
    {
      question: 'Who is Akash Paik at ARDM Academy?',
      answer:
        'Akash Paik is a Founder of ARDM Academy and the Academic Lead. He specializes in Mathematics and Physical Science curriculum design and secondary board examination strategy, with over 96% question prediction accuracy.',
    },
    {
      question: 'Who is Rupam Paul at ARDM Academy?',
      answer:
        'Rupam Paul is a Founder of ARDM Academy and the Operations Lead. He directs state-level CBT Computer-Based Test systems, offline exam centers, and administrative operations.',
    },
    {
      question: 'Who is Devnath Pramanick at ARDM Academy?',
      answer:
        'Devnath Pramanick is a Founder of ARDM Academy and the Mentorship Lead. He architected the acclaimed Dada-Didi Mentorship model, providing 1-on-1 student counseling, exam anxiety relief, and academic habits guidance.',
    },
    {
      question: 'Who is Mohim Das at ARDM Academy?',
      answer:
        'Mohim Das is a Founder of ARDM Academy and the Technology Lead. He is also the Founder & CEO of CodeLX. He oversees technology infrastructure, AI masterclasses, coding bootcamps, and digital certifications (Direct Email: mohimdas300@gmail.com, Phone: +919123870823).',
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 pb-20">
      <SEOHead
        title="Founders of ARDM Academy | Akash Paik, Rupam Paul, Devnath Pramanick, Mohim Das"
        description="ARDM Academy was founded by 4 founders: Akash Paik (Academic Lead), Rupam Paul (Operations Lead), Devnath Pramanick (Mentorship Lead), and Mohim Das (Technology Lead & CEO of CodeLX). Learn about the 4 founders."
        canonical="https://ardmacademy.netlify.app/founders"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Founders</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Leadership & Founders</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Meet the <span className="text-amber-400">4 Founders</span> of ARDM Academy
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            ARDM Academy was founded by four visionaries whose initials form our name:
            <span className="font-bold text-white"> Akash Paik (A)</span>,
            <span className="font-bold text-white"> Rupam Paul (R)</span>,
            <span className="font-bold text-white"> Devnath Pramanick (D)</span>, and
            <span className="font-bold text-white"> Mohim Das (M)</span>.
            All four lead with equal founding authority and dedication to student excellence.
          </p>

          {/* Acronym Badge Pill */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 p-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold">
              A · Akash Paik
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold">
              R · Rupam Paul
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold">
              D · Devnath Pramanick
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold">
              M · Mohim Das
            </span>
          </div>
        </div>

        {/* 4 Founders Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {founders.map((founder, idx) => (
            <article
              key={founder.id}
              className={`relative rounded-3xl p-6 sm:p-7 bg-slate-900/70 border backdrop-blur-md transition-all hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between ${founder.color}`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono font-bold uppercase tracking-wider text-white">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {founder.badge}
                  </span>
                  <span className="text-3xl font-mono font-black opacity-30">
                    0{idx + 1}
                  </span>
                </div>

                {/* Profile Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-slate-700 shrink-0 shadow-md">
                    <img
                      src={founder.avatar}
                      alt={`Founder ${founder.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {founder.name}
                    </h2>
                    <p className="text-sm font-semibold text-amber-300 mb-1">
                      {founder.role}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {founder.specialty}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {founder.bio}
                </p>

                {/* Key Highlights */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800/80">
                  {founder.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a
                    href={`mailto:${founder.email}`}
                    className="hover:text-amber-300 transition-colors underline-offset-2 hover:underline"
                  >
                    {founder.email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenFounderModal(founder.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all cursor-pointer shadow-xs"
                >
                  <span>Full Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* GOOGLE SEARCH APPEARANCE & SITELINKS PREVIEW (Exact match to what user requested!) */}
        <section className="mb-16 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Google Search Appearance & Sitelinks Mockup</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How ARDM Academy Appears in Google Search
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Structured Schema.org markup is deployed so Google automatically renders Sitelinks, Searchbox, and Founder answers on Google.com.
              </p>
            </div>
            <button
              onClick={() => setShowGooglePreview((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 self-start sm:self-center transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showGooglePreview ? 'Hide Google Preview' : 'Show Google Preview'}</span>
            </button>
          </div>

          {showGooglePreview && (
            <div className="bg-[#202124] rounded-2xl p-4 sm:p-6 text-left border border-slate-700 shadow-inner max-w-3xl mx-auto">
              {/* Google Search Bar Mockup */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#303134] text-sm text-slate-200 mb-5 border border-slate-600/60 shadow-sm">
                <Search className="w-4 h-4 text-slate-400" />
                <span className="font-sans font-medium text-white">ardm academy founders</span>
                <span className="ml-auto text-xs text-slate-400 font-mono">Google Search</span>
              </div>

              {/* Main Organic Search Result */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    A
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-white font-medium">ARDM Academy</span>
                    <span className="text-slate-400"> · https://ardmacademy.netlify.app</span>
                  </div>
                </div>

                <a
                  href="https://ardmacademy.netlify.app"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="text-lg sm:text-xl font-normal text-[#8ab4f8] hover:underline cursor-pointer block mb-1"
                >
                  ARDM Academy | Founders: Akash Paik, Rupam Paul, Devnath Pramanick, Mohim Das
                </a>

                <p className="text-xs sm:text-sm text-[#bdc1c6] leading-relaxed">
                  ARDM Academy was founded by 4 founders: Akash Paik (Academic Lead), Rupam Paul (Operations Lead), Devnath Pramanick (Mentorship Lead), and Mohim Das (Technology Lead). Academic coaching, Class 10 mock tests, and AI workshops.
                </p>
              </div>

              {/* Google Sitelinks Searchbox (in Google search results) */}
              <div className="my-4 p-3 rounded-xl bg-[#303134]/70 border border-slate-700/80 flex items-center gap-2 text-xs text-slate-300">
                <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-slate-400">Search ardmacademy.netlify.app</span>
                <span className="ml-auto text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                  Schema: WebSite SearchAction
                </span>
              </div>

              {/* Google Sitelinks 2-Column Grid (Exactly like the user uploaded screenshot!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-700">
                <div
                  onClick={() => onNavigate('/founders')}
                  className="p-3 rounded-xl bg-[#303134]/40 hover:bg-[#303134] border border-slate-700/50 transition-colors cursor-pointer group"
                >
                  <span className="text-sm font-medium text-[#8ab4f8] group-hover:underline flex items-center justify-between">
                    <span>Meet All 4 Founders</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </span>
                  <p className="text-[11px] text-[#bdc1c6] mt-1 leading-snug">
                    Akash Paik, Rupam Paul, Devnath Pramanick, Mohim Das. Verified 4 equal Founders of ARDM.
                  </p>
                </div>

                <div
                  onClick={() => onNavigate('/mock-tests')}
                  className="p-3 rounded-xl bg-[#303134]/40 hover:bg-[#303134] border border-slate-700/50 transition-colors cursor-pointer group"
                >
                  <span className="text-sm font-medium text-[#8ab4f8] group-hover:underline flex items-center justify-between">
                    <span>Class 10 Mock Tests (PROSTUTI)</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </span>
                  <p className="text-[11px] text-[#bdc1c6] mt-1 leading-snug">
                    96%+ prediction accuracy, computerized CBT simulator & center-based exam.
                  </p>
                </div>

                <div
                  onClick={() => onNavigate('/workshops')}
                  className="p-3 rounded-xl bg-[#303134]/40 hover:bg-[#303134] border border-slate-700/50 transition-colors cursor-pointer group"
                >
                  <span className="text-sm font-medium text-[#8ab4f8] group-hover:underline flex items-center justify-between">
                    <span>Free AI Workshops & Python</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </span>
                  <p className="text-[11px] text-[#bdc1c6] mt-1 leading-snug">
                    Prompt engineering, coding labs & certificates by CodeLX & Mohim Das.
                  </p>
                </div>

                <div
                  onClick={() => onNavigate('/contact')}
                  className="p-3 rounded-xl bg-[#303134]/40 hover:bg-[#303134] border border-slate-700/50 transition-colors cursor-pointer group"
                >
                  <span className="text-sm font-medium text-[#8ab4f8] group-hover:underline flex items-center justify-between">
                    <span>Contact Helpline: 6289139984</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </span>
                  <p className="text-[11px] text-[#bdc1c6] mt-1 leading-snug">
                    Direct academic helpline, WhatsApp community, and Kolkata head office.
                  </p>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Sitelinks JSON-LD & Person Microdata Live</span>
                </span>
                <span>Targeting Google Search & AI Overviews</span>
              </div>
            </div>
          )}
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (SEO Optimized for Founders Queries) */}
        <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Google Answer Engine & Zero-Error FAQs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Questions & Answers About the Founders
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear, definitive answers designed so search engines and AI assistants never produce errors regarding the four founders.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-900/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
