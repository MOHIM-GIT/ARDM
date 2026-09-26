import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  Download,
  Search,
  CheckCircle2,
  FileText,
  ExternalLink,
  Medal,
  KeyRound,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { getToppers, getSiteSettings, getStudents } from '../../services/storage';
import { TopperRecord, SiteSettings, StudentProfile } from '../../types';

interface ResultToppersSectionProps {
  onOpenTestEngineWithRegistration?: (regId: string) => void;
  onOpenStudentPortal?: () => void;
}

export const ResultToppersSection: React.FC<ResultToppersSectionProps> = ({
  onOpenTestEngineWithRegistration,
  onOpenStudentPortal,
}) => {
  const [toppers, setToppers] = useState<TopperRecord[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  // Search Scorecard
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<StudentProfile | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setToppers(getToppers());
    setSiteSettings(getSiteSettings());
  }, []);

  const handleSearchScorecard = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchResult(null);
      return;
    }

    const all = getStudents();
    const cleanPhone = query.replace(/[^0-9]/g, '');

    const found = all.find(
      (s) =>
        s.registrationId.toLowerCase() === query ||
        (cleanPhone.length >= 10 && s.mobile.replace(/[^0-9]/g, '') === cleanPhone) ||
        s.email.toLowerCase() === query
    );

    setSearchResult(found || null);
  };

  const renderBadge = (badge: string) => {
    switch (badge) {
      case 'gold':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Rank 1 • Gold</span>
          </span>
        );
      case 'silver':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold shadow-2xs">
            <Medal className="w-3.5 h-3.5 text-slate-600" />
            <span>Rank 2 • Silver</span>
          </span>
        );
      case 'bronze':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold shadow-2xs">
            <Medal className="w-3.5 h-3.5 text-amber-700" />
            <span>Rank 3 • Bronze</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
            <Award className="w-3 h-3" />
            <span>Top 10 Distinction</span>
          </span>
        );
    }
  };

  return (
    <section id="results" className="py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Merit & State Rankings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ARDM Academy Class 10 Official Merit List & Rank Card
          </h2>
          <p className="text-sm font-semibold text-indigo-700 font-mono">
            Batch 2025-26
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Celebrating academic excellence. View verified state merit rankers, download certified PDF reports, and check your candidate rank card.
          </p>
        </div>

        {/* PASSWORD FORMAT & RANK CARD ACCESS INSTRUCTION (Section 7) */}
        <div className="max-w-3xl mx-auto mb-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">
                How to Access Your Individual Rank Card & Scorecard:
              </h4>
              <p className="text-slate-600">
                To access your personal scorecard, login with your Registration ID and your default security password format:
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 font-mono text-slate-800 space-y-1">
                <div>
                  <strong>Password Rule:</strong> First 4 letters of Student Name in CAPITAL + Birth Year
                </div>
                <div className="text-indigo-700 font-semibold">
                  Example: For Student Name &quot;Mohim Das&quot; (Born 2010), Password is: <span className="bg-indigo-100 px-1.5 py-0.5 rounded text-indigo-900 font-bold">MOHI2010</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                *Passcodes are securely encrypted. Individual student passwords are never displayed publicly.
              </p>
            </div>
          </div>
        </div>

        {/* Official Result PDF Card (Admin Uploaded) */}
        {siteSettings?.resultPdfUrl && (
          <div className="mb-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-bold">
                    Official Admin Document
                  </span>
                  <span className="text-xs text-slate-400">
                    Published: {siteSettings.resultPdfPublishedAt}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {siteSettings.resultPdfTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  Contains verified state rank cards, candidate percentiles, and subject cutoffs.
                </p>
              </div>
            </div>

            <a
              href={siteSettings.resultPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors shrink-0"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Official Result PDF</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        )}

        {/* Top 10 Leaderboard Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs mb-14">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                State Top 10 Merit List
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Class 10 State-Level Mock Test Series
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 text-slate-600 uppercase font-mono tracking-wider text-[11px] border-b border-slate-200/80">
                <tr>
                  <th className="py-3.5 px-4 font-bold text-center">Rank</th>
                  <th className="py-3.5 px-4 font-bold">Student Name</th>
                  <th className="py-3.5 px-4 font-bold">Unique ID</th>
                  <th className="py-3.5 px-4 font-bold">School Name</th>
                  <th className="py-3.5 px-4 font-bold">Teaching Institute</th>
                  <th className="py-3.5 px-4 font-bold text-right">Score</th>
                  <th className="py-3.5 px-4 font-bold text-right">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {toppers.slice(0, 10).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center">{renderBadge(t.badge)}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 text-sm block">
                        {t.studentName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">
                      {t.uniqueId}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {t.schoolName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {t.teachingInstituteName}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      {t.score} / {t.totalMarks}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-extrabold text-emerald-600 text-sm">
                        {t.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Individual Candidate Scorecard Checker */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Candidate Scorecard Portal
            </span>
            <h3 className="text-2xl font-bold">Search Your Rank & Verified Scorecard</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Enter your Registration ID (e.g. ARDM-2026-8942), mobile number, or email to view your result details.
            </p>

            <form
              onSubmit={handleSearchScorecard}
              className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Registration ID or Mobile"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:bg-white/20 font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Search Scorecard
              </button>
            </form>
          </div>

          {/* Search Result Card */}
          {hasSearched && (
            <div className="max-w-xl mx-auto animate-in fade-in duration-200">
              {searchResult ? (
                <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Candidate Found
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">{searchResult.fullName}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                      {searchResult.paymentStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Registration ID:</span>
                      <strong className="font-mono font-bold text-indigo-700 text-sm">
                        {searchResult.registrationId}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">CBT State Rank:</span>
                      <span className="font-mono font-extrabold text-indigo-700 text-sm">
                        {searchResult.examRank ? `#${searchResult.examRank}` : 'Pending Exam'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Total Score:</span>
                      <span className="font-bold text-slate-900">
                        {searchResult.totalMarks || 'N/A'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Assigned Venue:</span>
                      <span className="font-medium text-slate-800">
                        {searchResult.venueName || 'ARDM Central Hub'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Subjects: {searchResult.selectedSubjectNames.join(', ')}
                    </span>
                    {onOpenStudentPortal && (
                      <button
                        onClick={onOpenStudentPortal}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
                      >
                        Open Student Portal
                      </button>
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
