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
    <section id="home" className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-blue-100/50 via-indigo-50/40 to-cyan-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-100/40 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Messaging & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PROSTUTI 2026 • The Ultimate Class 10 Mock Test Series Open</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-bold tracking-wider text-blue-700 uppercase">
                Welcome to ARDM Academy
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
                Learn. <span className="text-indigo-600">Practice.</span>{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Improve.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Education, guidance and structured mock tests designed to help students learn with confidence.
              Covering Class 10 academic board subjects, free mentorship, and next-generation computer & technology skills.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 pb-1 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white border border-slate-200/80 px-2.5 py-2 rounded-lg shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Class 10 Board Test</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white border border-slate-200/80 px-2.5 py-2 rounded-lg shadow-2xs">
                <BrainCircuit className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Coding & Tech Labs</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white border border-slate-200/80 px-2.5 py-2 rounded-lg shadow-2xs">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>State Merit Badges</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 pt-2">
              {/* Primary: Take Mock Test */}
              <button
                onClick={onTakeMockTest}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 group"
              >
                <span>Take Mock Test (PROSTUTI)</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-mono">₹100</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Practice CBT Simulator */}
              <button
                onClick={onLaunchPractice}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 text-xs font-bold border border-indigo-200/70 transition-colors"
                title="Launch Live CBT Exam"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Live CBT Simulator</span>
              </button>

              {/* Download Admit Card */}
              <button
                onClick={onOpenDownloadAdmitCard}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs transition-colors"
              >
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Admit Card</span>
              </button>
            </div>

            {/* Secondary Contact Quick Links */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quick Connect:</span>
              <a
                href={getWhatsAppChannelLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Channel</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={getTelLink()}
                className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 font-bold font-mono hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{SITE_CONFIG.contact.phoneNumber}</span>
              </a>
              <span className="text-slate-300">•</span>
              <button
                onClick={onContactUs}
                className="text-slate-600 hover:text-indigo-600 font-semibold hover:underline"
              >
                Contact Helpdesk
              </button>
            </div>
          </div>

          {/* Right Column: PROSTUTI Card & Historical Prediction Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* PROSTUTI Card Container */}
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-7">
                {/* Header within Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
                      ARDM
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-none">
                        PROSTUTI
                      </h2>
                      <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">
                        The Ultimate Class 10 Mock Test Series
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    Official 2026
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Designed for focused Class 10 board preparation with structured mock tests, subject-wise practice, performance analysis and ranking.
                </p>

                {/* HISTORICAL PREDICTION ACCURACY CARD (Section 5) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-blue-50/70 to-slate-50 border border-indigo-100/90 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Historical Board Prediction Analysis</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">2-Year Track</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center my-2">
                    <div className="bg-white rounded-xl p-2 border border-indigo-100/80 shadow-2xs">
                      <span className="text-base sm:text-lg font-black text-indigo-700 block font-mono">
                        96.30%
                      </span>
                      <span className="text-[9.5px] text-slate-500 font-semibold block leading-tight">
                        Common in 2024
                      </span>
                    </div>

                    <div className="bg-white rounded-xl p-2 border border-indigo-100/80 shadow-2xs">
                      <span className="text-base sm:text-lg font-black text-emerald-700 block font-mono">
                        97.10%
                      </span>
                      <span className="text-[9.5px] text-slate-500 font-semibold block leading-tight">
                        Common in 2025
                      </span>
                    </div>

                    <div className="bg-white rounded-xl p-2 border border-indigo-100/80 shadow-2xs">
                      <span className="text-base sm:text-lg font-black text-blue-700 block font-mono">
                        95%+
                      </span>
                      <span className="text-[9.5px] text-slate-500 font-semibold block leading-tight">
                        Historical Similarity
                      </span>
                    </div>
                  </div>

                  {/* Mandated Disclaimer */}
                  <p className="text-[9.5px] text-slate-500 italic text-center mt-2 leading-tight">
                    *Historical analysis does not guarantee future examination questions.
                  </p>
                </div>

                {/* Subject Pills Preview */}
                <div className="space-y-2 mb-5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    8 Board Subjects Available
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['Mathematics', 'Physical Science', 'Life Science', 'History', 'Geography', 'Bengali', 'English', 'Computer Science'].map((sub, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[11px] rounded-md bg-slate-50 border border-slate-200/80 text-slate-700 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instant Metric Cards */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-0.5">
                      <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Exam Fee</span>
                    </div>
                    <div className="text-base font-extrabold text-slate-900 font-mono">
                      ₹100 <span className="text-[11px] font-normal text-slate-500">/ subject</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-0.5">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Free Guidance</span>
                    </div>
                    <div className="text-base font-extrabold text-emerald-600">
                      100% Free
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={onTakeMockTest}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
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
