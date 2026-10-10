import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Cpu,
  HeartHandshake,
  Code2,
  Mail,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  GraduationCap,
  CheckCircle2,
  Share2,
  Check
} from 'lucide-react';

export interface FoundersModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFounderId?: 'all' | 'akash' | 'rupam' | 'devnath' | 'mohim';
}

export const FoundersModal: React.FC<FoundersModalProps> = ({
  isOpen,
  onClose,
  initialFounderId = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'akash' | 'rupam' | 'devnath' | 'mohim'>(
    initialFounderId
  );
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialFounderId);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialFounderId]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const founders = [
    {
      id: 'akash' as const,
      letter: 'A',
      name: 'Akash Paik',
      role: 'Founder & Academic Lead',
      subRole: 'Mathematics & Physical Science Pedagogy Lead',
      initialBg: 'from-amber-500 to-orange-600',
      badgeBorder: 'border-amber-500/50 text-amber-300 bg-amber-950/60',
      email: 'akashpaik570@gmail.com',
      icon: BookOpen,
      specialty: 'Mathematics, Physical Science & Board Strategy',
      experience: '5+ Years Academic Mentorship & Madhyamik Curriculum',
      bio: 'Akash Paik leads the academic strategy and curriculum architecture of ARDM Academy. He specializes in secondary board examination patterns (WBBSE & CBSE), high-accuracy Madhyamik question predictions, and conceptual problem-solving frameworks that transform difficult mathematical theorems and physics concepts into intuitive, easy-to-grasp steps.',
      keyContributions: [
        'Formulated the 96%+ historical accuracy predictive question bank for Class 10 Board Exams (2024–2025).',
        'Directs the Subject Master Curriculum for Mathematics and Physical Science.',
        'Designs step-by-step visual solution keys for Madhyamik 10-year Previous Year Questions (PYQs).',
        'Leads weekly faculty review sessions ensuring error-free mock exam papers for the PROSTUTI series.',
      ],
      quote: 'True learning begins when a student stops memorizing answers and starts understanding why every formula works.',
    },
    {
      id: 'rupam' as const,
      letter: 'R',
      name: 'Rupam Paul',
      role: 'Founder & Operations Lead',
      subRole: 'Examination Logistics & CBT Systems Architect',
      initialBg: 'from-red-600 to-rose-700',
      badgeBorder: 'border-red-500/50 text-red-300 bg-red-950/60',
      email: 'rupampaul20070@gmail.com',
      icon: Cpu,
      specialty: 'CBT Test Simulator, Exam Centers & Logistics',
      experience: 'Platform Operations & Academic Delivery Logistics',
      bio: 'Rupam Paul architects and manages the end-to-end examination infrastructure of ARDM Academy. From physical exam center arrangements and synchronized test schedules to the digital Computer-Based Test (CBT) simulator and encrypted student result evaluation, Rupam ensures seamless, reliable exam delivery for thousands of students.',
      keyContributions: [
        'Architected the PROSTUTI CBT Exam Simulator mimicking state and national entrance interfaces.',
        'Coordinates offline exam center logistics, invigilation guidelines, and candidate seating arrangements.',
        'Oversees verifiable A4 PDF admit card generation and automated candidate registration systems.',
        'Monitors candidate performance analytics and speed-accuracy benchmarking across all districts.',
      ],
      quote: 'Flawless examination operations give every student an authentic testing environment that builds unshakable exam-hall confidence.',
    },
    {
      id: 'devnath' as const,
      letter: 'D',
      name: 'Devnath Pramanick',
      role: 'Founder & Mentorship Lead',
      subRole: 'Dada-Didi Mentorship Architect & Student Psychologist',
      initialBg: 'from-emerald-600 to-teal-700',
      badgeBorder: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/60',
      email: 'pramanickdevnath2007@gmail.com',
      icon: HeartHandshake,
      specialty: 'Dada-Didi Mentorship, Motivation & Stress Management',
      experience: 'Student Counseling & Board Exam Psychology',
      bio: 'Devnath Pramanick pioneered ARDM Academy’s signature "Dada-Didi Mentorship Model". Recognizing that academic anxiety and fear of failure are the biggest hurdles for school learners, Devnath established a culture where senior toppers mentor younger students as caring elder siblings (Dada and Didi), providing empathetic guidance and stress relief.',
      keyContributions: [
        'Created the widely celebrated Dada-Didi Mentorship Model adopted across ARDM Academy programs.',
        'Runs personalized student counseling and exam-hall anxiety relief workshops.',
        'Builds customized study timetables and revision milestones for students scoring below 60%.',
        'Conducts one-on-one motivational check-ins prior to state-level mock tests and final board exams.',
      ],
      quote: 'Every student has immense potential. Sometimes all they need is an elder brother or sister who says: "You can do this, and I am right here with you."',
    },
    {
      id: 'mohim' as const,
      letter: 'M',
      name: 'Mohim Das',
      role: 'Founder & Technology Lead',
      subRole: 'Founder & CEO of CodeLX • Technology & AI Lead',
      initialBg: 'from-purple-600 to-indigo-700',
      badgeBorder: 'border-purple-500/50 text-purple-300 bg-purple-950/60',
      email: 'mohimdas300@gmail.com',
      phone: '+919123870823',
      icon: Code2,
      specialty: 'Artificial Intelligence, Full-Stack Engineering & Python',
      experience: 'Founder & CEO CodeLX • Lead Web Architect',
      bio: 'Mohim Das is a Founder of ARDM Academy and the Founder & CEO of CodeLX. He leads the technological vision, full-stack software architecture, and futuristic AI curriculum at ARDM Academy. Mohim empowers school and college students with practical Python programming, prompt engineering, and digital creation skills.',
      keyContributions: [
        'Founder & CEO of CodeLX, partnering with ARDM Academy for advanced computer science education.',
        'Architected the web platform, digital portals, and administrative data management systems.',
        'Directs 100% Free AI Webinars and coding masterclasses for Class 8 to 12 students.',
        'Engineers verifiable digital certificate credentials and interactive Python playground tools.',
      ],
      quote: 'Technology and AI are not privileges for tomorrow; they are essential literacy that every student in Bengal should master today.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0c0c0f] border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-5 py-4 sm:px-8 sm:py-5 border-b border-slate-800 bg-gradient-to-r from-red-950/40 via-[#121216] to-[#0c0c0f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-red-800 flex items-center justify-center text-white font-black text-sm shadow-md border border-red-500/40">
              ARDM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  All 4 Founders of ARDM Academy
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-red-950/80 border border-red-700/60 text-red-300 text-[10px] font-mono font-bold uppercase">
                  A · R · D · M
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Educational Leadership, Academic Rigor & Technology
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Tab Selector Strip (All 4 + Individual Tabs) */}
        <div className="px-3 sm:px-6 py-2.5 bg-[#121216] border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-red-700 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>All 4 Founders</span>
            </span>
          </button>

          {founders.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === f.id
                  ? 'bg-gradient-to-r from-red-700 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-amber-400 font-black">{f.letter}</span>
                <span>{f.name}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* TAB 1: ALL 4 FOUNDERS OVERVIEW */}
          {activeTab === 'all' && (
            <div className="space-y-6">
              {/* Acronym Explanation Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/60 via-slate-900 to-[#121216] border border-red-700/50 text-center">
                <span className="text-[11px] font-mono text-red-400 uppercase tracking-widest font-bold">
                  The Origin of ARDM Academy
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Named After the 4 Joint Founders
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 text-left">
                  <div className="p-2.5 rounded-xl bg-black/50 border border-slate-800">
                    <span className="text-lg font-black text-amber-400 font-mono block">A</span>
                    <span className="text-xs font-bold text-white block">Akash Paik</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Academic Lead</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/50 border border-slate-800">
                    <span className="text-lg font-black text-red-400 font-mono block">R</span>
                    <span className="text-xs font-bold text-white block">Rupam Paul</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Operations Lead</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/50 border border-slate-800">
                    <span className="text-lg font-black text-emerald-400 font-mono block">D</span>
                    <span className="text-xs font-bold text-white block">Devnath Pramanick</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Mentorship Lead</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/50 border border-slate-800">
                    <span className="text-lg font-black text-purple-400 font-mono block">M</span>
                    <span className="text-xs font-bold text-white block">Mohim Das</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Technology Lead</span>
                  </div>
                </div>
              </div>

              {/* 4 Founder Mini Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {founders.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#141418] border border-slate-800 hover:border-red-600/50 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.initialBg} flex items-center justify-center text-white font-black text-xl shadow-md shrink-0`}
                          >
                            {f.letter}
                          </div>
                          <div>
                            <h4 className="text-base font-extrabold text-white">{f.name}</h4>
                            <span className="text-xs font-bold text-red-400 block">
                              {f.role}
                            </span>
                            <span className="text-[11px] text-slate-400 block">{f.subRole}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {f.bio}
                      </p>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setActiveTab(f.id)}
                          className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Full Profile & Achievements</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <a
                          href={`mailto:${f.email}`}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-red-400" />
                          <span className="truncate max-w-[130px]">{f.email}</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2, 3, 4, 5: INDIVIDUAL DETAILED FOUNDER PROFILE */}
          {activeTab !== 'all' && (
            (() => {
              const f = founders.find((item) => item.id === activeTab)!;
              const Icon = f.icon;
              return (
                <div className="space-y-6">
                  {/* Hero Header for Founder */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#16161b] via-[#121216] to-[#0d0d10] border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${f.initialBg} flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-xl shrink-0 border border-white/20`}
                    >
                      {f.letter}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-700/60 text-red-300 text-[10px] font-mono font-bold uppercase">
                          Founder #{f.letter}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                          ARDM Academy
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white">{f.name}</h3>
                      <p className="text-sm font-bold text-red-400">{f.role}</p>
                      <p className="text-xs text-slate-400">{f.subRole}</p>

                      {/* Contact Links */}
                      <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
                        <button
                          onClick={() => handleCopy(f.email)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                          title="Copy Email"
                        >
                          <Mail className="w-3.5 h-3.5 text-red-400" />
                          <span>{f.email}</span>
                          {copiedEmail === f.email ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : null}
                        </button>

                        {f.phone && (
                          <a
                            href={`tel:${f.phone.replace(/[^0-9]/g, '')}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{f.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Biography & Educational Mission */}
                  <div className="p-5 rounded-2xl bg-[#141418] border border-slate-800 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-red-400" />
                      <span>Executive Overview & Pedagogical Vision</span>
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed">{f.bio}</p>

                    {/* Founder Quote */}
                    <blockquote className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/40 text-xs italic text-red-200">
                      "{f.quote}"
                    </blockquote>
                  </div>

                  {/* Key Contributions & Achievements */}
                  <div className="p-5 rounded-2xl bg-[#141418] border border-slate-800 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Key Leadership Contributions to ARDM Academy</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {f.keyContributions.map((contrib, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#0e0e12] border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{contrib}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 sm:px-8 sm:py-4 border-t border-slate-800 bg-[#0e0e12] flex items-center justify-between text-xs text-slate-400">
          <span>
            ARDM Academy • <strong>A</strong>kash · <strong>R</strong>upam · <strong>D</strong>evnath · <strong>M</strong>ohim
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
