import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  TrendingUp,
  Download,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { lookupRegistration } from '../../services/storage';
import { StudentProfile } from '../../types';

interface Class10MockTestSectionProps {
  onStartRegistration: () => void;
  onLaunchPracticeTest: () => void;
  onOpenAdmitCard: (student: StudentProfile) => void;
}

export const Class10MockTestSection: React.FC<Class10MockTestSectionProps> = ({
  onStartRegistration,
  onLaunchPracticeTest,
  onOpenAdmitCard,
}) => {
  // Search query & state (Section 8)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<StudentProfile | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const result = lookupRegistration(searchQuery);
    setSearchResult(result);
  };

  const steps = [
    { num: '01', title: 'Student Info', desc: 'Full Name, Date of Birth, 10-digit Mobile, & Email.' },
    { num: '02', title: 'School & Board', desc: 'Class 10, Board (WBBSE/CBSE/ICSE), & District.' },
    { num: '03', title: 'Subject Selection', desc: 'Choose 1 to 8 subjects. Dynamic transparent fee of ₹100 each.' },
    { num: '04', title: 'Payment via UPI', desc: 'Scan official ARDM QR and upload payment screenshot.' },
    { num: '05', title: 'Admin Verification', desc: 'Faculty verifies payment proof within 2-4 hours.' },
    { num: '06', title: 'Admit Card Issued', desc: 'Automatic unlock with assigned exam center & reporting time.' },
  ];

  return (
    <section id="mock-test" className="py-20 bg-slate-50/60 dark:bg-[#09090b] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold border border-red-200/60 dark:border-red-900/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State-Level Exam Preparation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            PROSTUTI • The Ultimate Class 10 Mock Test Series
          </h2>
          <p className="text-base text-white/95 leading-relaxed">
            Designed for focused Class 10 board preparation with structured mock tests, subject-wise practice, performance analysis and state-level merit rankings.
          </p>

          {/* Historical Prediction Accuracy Stats */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-[#141012] border border-red-900/40 flex flex-col items-center">
              <div className="grid grid-cols-3 gap-3 w-full text-center">
                <div className="bg-[#1a1417] p-2.5 rounded-xl border border-red-950 shadow-2xs">
                  <span className="text-lg font-black text-red-400 block font-mono">96.30%</span>
                  <span className="text-[10px] text-white font-semibold">Common in 2024</span>
                </div>
                <div className="bg-[#1a1417] p-2.5 rounded-xl border border-red-950 shadow-2xs">
                  <span className="text-lg font-black text-emerald-400 block font-mono">97.10%</span>
                  <span className="text-[10px] text-white font-semibold">Common in 2025</span>
                </div>
                <div className="bg-[#1a1417] p-2.5 rounded-xl border border-red-950 shadow-2xs">
                  <span className="text-lg font-black text-rose-400 block font-mono">95%+</span>
                  <span className="text-[10px] text-white font-semibold">Question Similarity</span>
                </div>
              </div>
              <p className="text-[9.5px] text-white/80 italic mt-2">
                *Historical analysis does not guarantee future examination questions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={onStartRegistration}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <span>Start PROSTUTI Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLaunchPracticeTest}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 shadow-2xs transition-colors cursor-pointer"
            >
              <Clock className="w-4 h-4 text-red-400" />
              <span>Launch Live CBT Simulator</span>
            </button>
          </div>
        </div>

        {/* 6-Step Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-red-300 dark:hover:border-red-900/60 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-md">
                  Step {step.num}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">{step.title}</h3>
              <p className="text-xs text-white leading-relaxed font-normal">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* VERIFICATION & SEARCH SECTION (Section 8 - Fixed completely!) */}
        <div id="check-registration" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
              Candidate Verification Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Check Your Registration & Admit Card</h3>
            <p className="text-xs sm:text-sm text-white leading-relaxed font-normal">
              Already submitted your application? Enter your Unique Registration ID, registered mobile number, or email to verify your application.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
            >
              <input
                type="text"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Unique ID, Reg ID, Mobile, or Email..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder:text-white/70 text-xs focus:outline-none focus:bg-white/20 font-mono shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Unique ID / Reg</span>
              </button>
            </form>
          </div>

          {/* Search Result Display */}
          {searchAttempted && (
            <div className="max-w-xl mx-auto animate-in fade-in duration-200">
              {searchResult ? (
                <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                        Candidate Record Found
                      </span>
                      <h4 className="text-base font-bold text-slate-900">{searchResult.fullName}</h4>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        searchResult.paymentStatus === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : searchResult.paymentStatus === 'Under Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {searchResult.paymentStatus === 'Approved' ? 'Payment Approved' : searchResult.paymentStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] font-semibold">Unique Registration ID:</span>
                      <strong className="font-mono text-red-600 text-sm font-bold">
                        {searchResult.registrationId}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] font-semibold">Contact Mobile:</span>
                      <span className="font-mono text-slate-900 font-bold">
                        +91 {searchResult.mobile}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] font-semibold">School & Board:</span>
                      <span className="text-slate-800 font-medium">
                        {searchResult.school} ({searchResult.board})
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] font-semibold">Admit Card Status:</span>
                      <span
                        className={`font-bold ${
                          searchResult.admitCardStatus === 'Available'
                            ? 'text-emerald-700'
                            : 'text-amber-600'
                        }`}
                      >
                        {searchResult.admitCardStatus === 'Available' ? 'Available to Print' : 'Locked (Pending Approval)'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Subjects: {searchResult.selectedSubjectNames.join(', ')}
                    </span>

                    {searchResult.admitCardStatus === 'Available' ? (
                      <button
                        onClick={() => onOpenAdmitCard(searchResult)}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Admit Card</span>
                      </button>
                    ) : (
                      <span className="text-xs text-amber-600 font-medium">
                        Admit Card unlocks after payment review
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-center text-xs text-slate-300">
                  Registration not found. Please check your details and try again.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
