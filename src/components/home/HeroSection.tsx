import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  Award,
  Users,
  BrainCircuit,
  FileCheck,
  TrendingUp,
  Percent,
} from 'lucide-react';
import {
  SITE_CONFIG,
  getWhatsAppChannelLink,
  getTelLink,
} from '../../config/siteConfig';

interface HeroSectionProps {
  onExploreClasses: () => void;
  onTakeMockTest: () => void;
  onContactUs: () => void;
  onLaunchPractice: () => void;
  onOpenDownloadAdmitCard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClasses,
  onTakeMockTest,
  onContactUs,
  onLaunchPractice,
  onOpenDownloadAdmitCard,
}) => {
  return (
    <section id="home" className="relative pt-10 pb-14 md:pt-16 md:pb-20 overflow-hidden">
      {/* Background Subtle Gradient Blobs - Soft Red Ambient in Light & Dark Mode */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-red-100/20 via-rose-50/10 to-transparent dark:from-red-950/20 dark:via-rose-950/10 dark:to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-red-100/20 dark:bg-red-950/15 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Messaging & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-300 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PROSTUTI 2026 • The Ultimate Class 10 Mock Test Series Open</span>
              <Sparkles className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            </div>

            {/* Main Headline with Indian Tricolor for Learn. Practice. Improve. */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-red-500 uppercase flex items-center justify-center lg:justify-start gap-2">
                <span className="w-5 h-0.5 bg-red-600 rounded-full inline-block" />
                Welcome to ARDM Academy
                <span className="w-5 h-0.5 bg-red-600 rounded-full inline-block lg:hidden" />
              </p>

              {/* Stacked Monumental Headline: One by one like Learn. \n Practice. \n Improve. */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] select-none my-1">
                <div className="flex flex-col items-center lg:items-start gap-1 sm:gap-2">
                  {/* Saffron / Orange (Indian Flag) */}
                  <span className="text-[#FF9933] drop-shadow-[0_4px_20px_rgba(255,153,51,0.5)] hover:translate-x-1 transition-transform duration-200 inline-block">
                    Learn.
                  </span>

                  {/* Pure White (Indian Flag) */}
                  <span className="text-[#FFFFFF] drop-shadow-[0_4px_24px_rgba(255,255,255,0.75)] hover:translate-x-1 transition-transform duration-200 inline-block">
                    Practice.
                  </span>

                  {/* India Green (Indian Flag) */}
                  <span className="text-[#22C55E] drop-shadow-[0_4px_20px_rgba(34,197,94,0.5)] hover:translate-x-1 transition-transform duration-200 inline-block">
                    Improve.
                  </span>
                </div>
              </h1>

              {/* Linear Tricolor Motto Pill (Providing both linear and one by one) */}
              <div className="flex items-center justify-center lg:justify-start pt-1 pb-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-slate-800 shadow-lg backdrop-blur-md">
                  <span className="text-xs font-black text-[#FF9933]">Learn.</span>
                  <span className="text-white/60 text-xs font-bold">•</span>
                  <span className="text-xs font-black text-white">Practice.</span>
                  <span className="text-white/60 text-xs font-bold">•</span>
                  <span className="text-xs font-black text-[#22C55E]">Improve.</span>
                  <span className="text-white/40 text-xs ml-1">|</span>
                  <span className="text-[10px] font-mono text-white uppercase tracking-wider font-semibold">Official Motto</span>
                </div>
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-white max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Education, guidance and structured mock tests designed to help students learn with confidence.
              Covering Class 10 academic board subjects, free mentorship, and next-generation computer & technology skills.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 pb-1 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-white bg-[#121215] border border-slate-800 px-2.5 py-2 rounded-lg shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Class 10 Board Test</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white bg-[#121215] border border-slate-800 px-2.5 py-2 rounded-lg shadow-2xs">
                <BrainCircuit className="w-4 h-4 text-red-400 shrink-0" />
                <span>Coding & Tech Labs</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white bg-[#121215] border border-slate-800 px-2.5 py-2 rounded-lg shadow-2xs">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>State Merit Badges</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 pt-2">
              {/* Primary: Take Mock Test */}
              <button
                onClick={onTakeMockTest}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-700 via-rose-600 to-red-700 hover:from-red-800 hover:to-red-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 group cursor-pointer"
              >
                <span>Take Mock Test (PROSTUTI)</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-mono">₹100</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Practice CBT Simulator */}
              <button
                onClick={onLaunchPractice}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl text-red-300 bg-red-950/60 hover:bg-red-900/80 text-xs font-bold border border-red-900/70 transition-colors cursor-pointer"
                title="Launch Live CBT Exam"
              >
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>Live CBT Simulator</span>
              </button>

              {/* Download Admit Card - Black style, no white button */}
              <button
                onClick={onOpenDownloadAdmitCard}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-800 shadow-2xs transition-colors cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-red-400" />
                <span>Admit Card</span>
              </button>
            </div>

            {/* Secondary Contact Quick Links */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-white">
              <span className="font-semibold text-white">Quick Connect:</span>
              <a
                href={getWhatsAppChannelLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Channel</span>
              </a>
              <span className="text-white/40">•</span>
              <a
                href={getTelLink()}
                className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-bold font-mono hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{SITE_CONFIG.contact.phoneNumber}</span>
              </a>
              <span className="text-white/40">•</span>
              <button
                onClick={onContactUs}
                className="text-white hover:text-red-400 font-semibold hover:underline cursor-pointer"
              >
                <span>Contact Helpdesk</span>
              </button>
            </div>
          </div>

          {/* Right Column: PROSTUTI Card & Historical Prediction Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* PROSTUTI Card Container */}
              <div className="relative bg-[#121215] backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl overflow-hidden p-6 sm:p-7">
                {/* Header within Card */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-700 to-rose-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
                      ARDM
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-white tracking-tight leading-none">
                        PROSTUTI
                      </h2>
                      <p className="text-[11px] text-red-400 font-semibold mt-0.5">
                        The Ultimate Class 10 Mock Test Series
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold uppercase tracking-wider">
                    Official 2026
                  </span>
                </div>

                <p className="text-xs text-white leading-relaxed mb-4 font-normal">
                  Designed for focused Class 10 board preparation with structured mock tests, subject-wise practice, performance analysis and ranking.
                </p>

                {/* HISTORICAL PREDICTION ACCURACY CARD (Section 5) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-red-950/40 via-[#16161b] to-[#0f0f12] border border-red-900/40 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-red-400" />
                      <span>Historical Board Prediction Analysis</span>
                    </span>
                    <span className="text-[10px] font-mono text-white/90">2-Year Track</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center my-2">
                    <div className="bg-[#1a1a20] rounded-xl p-2 border border-slate-800 shadow-2xs">
                      <span className="text-base sm:text-lg font-black text-red-400 block font-mono">
                        96.30%
                      </span>
                      <span className="text-[9.5px] text-white font-semibold block leading-tight">
                        Common in 2024
                      </span>
                    </div>

                    <div className="bg-[#1a1a20] rounded-xl p-2 border border-slate-800 shadow-2xs">
                      <span className="text-base sm:text-lg font-black text-emerald-400 block font-mono">
                        97.10%
                      </span>
                      <span className="text-[9.5px] text-white font-semibold block leading-tight">
                        Common in 2025
                      </span>
                    </div>

                    <div className="bg-[#1a1a20] rounded-xl p-2 border border-slate-800 shadow-2xs">
                      <span className="text-base sm:text-lg font-black text-rose-400 block font-mono">
                        95%+
                      </span>
                      <span className="text-[9.5px] text-white font-semibold block leading-tight">
                        Historical Similarity
                      </span>
                    </div>
                  </div>

                  {/* Mandated Disclaimer */}
                  <p className="text-[9.5px] text-white/90 italic text-center mt-2 leading-tight">
                    *Historical analysis does not guarantee future examination questions.
                  </p>
                </div>

                {/* Subject Pills Preview */}
                <div className="space-y-2 mb-5">
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                    8 Board Subjects Available
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['Mathematics', 'Physical Science', 'Life Science', 'History', 'Geography', 'Bengali', 'English', 'Computer Science'].map((sub, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[11px] rounded-md bg-[#1a1a20] border border-slate-800 text-white font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instant Metric Cards */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="bg-[#1a1a20] rounded-xl p-2.5 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-white font-medium mb-0.5">
                      <FileCheck className="w-3.5 h-3.5 text-red-400" />
                      <span>Exam Fee</span>
                    </div>
                    <div className="text-base font-extrabold text-white font-mono">
                      ₹100 <span className="text-[11px] font-normal text-white/80">/ subject</span>
                    </div>
                  </div>

                  <div className="bg-[#1a1a20] rounded-xl p-2.5 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-white font-medium mb-0.5">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Free Guidance</span>
                    </div>
                    <div className="text-base font-extrabold text-emerald-400">
                      100% Free
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={onTakeMockTest}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-99"
                >
                  <span>Register for PROSTUTI Series • ₹100</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
