import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Search,
  BookOpen,
  Calendar,
  Layers,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { DEFAULT_SUBJECTS } from '../services/storage';

interface MockTestsPageProps {
  onNavigate: (path: string) => void;
  onOpenRegistration: (subjectId?: string) => void;
  onOpenTestEngine: () => void;
  onOpenDownloadAdmitCard: () => void;
}

export const MockTestsPage: React.FC<MockTestsPageProps> = ({
  onNavigate,
  onOpenRegistration,
  onOpenTestEngine,
  onOpenDownloadAdmitCard,
}) => {
  const mockTestSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'PROSTUTI Class 10 Board Mock Test Series 2026',
    'description': SITE_CONFIG.prostuti.description,
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'ARDM Academy',
      'url': 'https://ardmacademy.in',
    },
    'offers': {
      '@type': 'Offer',
      'price': '100',
      'priceCurrency': 'INR',
      'category': 'Paid',
    },
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="Mock Tests | ARDM Academy"
        description="Take ARDM Academy mock tests, practice questions and assessments for students. PROSTUTI Class 10 mock series with previous prediction accuracy over 96%."
        canonical="https://ardmacademy.in/mock-tests"
        breadcrumbs={[{ name: 'Mock Tests', path: '/mock-tests' }]}
        schema={mockTestSchema}
      />

      <Breadcrumbs items={[{ name: 'Mock Tests', path: '/mock-tests' }]} onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Page Hero */}
        <header className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State-Level Class 10 Board Series</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            PROSTUTI • The Ultimate Class 10 Mock Test Series
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            {SITE_CONFIG.prostuti.description}
          </p>

          {/* Historical Prediction Accuracy Stats */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col items-center">
              <div className="grid grid-cols-3 gap-3 w-full text-center">
                <div className="bg-white p-2.5 rounded-xl border border-indigo-100 shadow-2xs">
                  <span className="text-lg font-black text-indigo-700 block font-mono">96.30%</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Common in 2024</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-indigo-100 shadow-2xs">
                  <span className="text-lg font-black text-emerald-700 block font-mono">97.10%</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Common in 2025</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-indigo-100 shadow-2xs">
                  <span className="text-lg font-black text-blue-700 block font-mono">95%+</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Question Similarity</span>
                </div>
              </div>
              <p className="text-[9.5px] text-slate-500 italic mt-2">
                *Historical analysis does not guarantee future examination questions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onOpenRegistration()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all active:scale-98"
            >
              <span>Take PROSTUTI Mock Test</span>
              <span className="px-1.5 py-0.5 rounded bg-white/20 text-xs font-mono">₹100</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenTestEngine}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-2xs transition-colors"
            >
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Launch Live CBT Simulator</span>
            </button>

            <button
              onClick={onOpenDownloadAdmitCard}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm border border-blue-200 shadow-2xs transition-colors"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Download Admit Card</span>
            </button>
          </div>
        </header>

        {/* 8 Subjects Breakdown */}
        <section className="mb-14">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Subject-Wise Mock Examination Modules</h2>
          <p className="text-xs text-slate-500 mb-6">
            Choose individual subjects or complete bundles. Standard fee: ₹100 per selected subject.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEFAULT_SUBJECTS.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Class 10
                    </span>
                    <span className="text-xs font-bold text-slate-700">₹{sub.price}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{sub.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{sub.description}</p>
                </div>

                <button
                  onClick={() => onOpenRegistration(sub.id)}
                  className="w-full py-2 bg-slate-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
                >
                  Register for {sub.name}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Architecture & Sitelink Links */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">How PROSTUTI Mock Test Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">Student Registration</h3>
              <p className="text-xs text-slate-500">
                Submit basic contact, school and select board exam subjects with automated Registration ID.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">Payment & Verification</h3>
              <p className="text-xs text-slate-500">
                Transparent ₹100 per subject via UPI QR. Admin verification unlocks official hall ticket.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">CBT Simulation Exam</h3>
              <p className="text-xs text-slate-500">
                Timed 45-minute simulator with question palettes, review markers, and negative-marking prevention.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">Merit & Scorecard</h3>
              <p className="text-xs text-slate-500">
                Instant analytics, state rank calculation, and official scorecard PDF download.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
