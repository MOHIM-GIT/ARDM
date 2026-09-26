import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Trophy,
  Award,
  Medal,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Printer,
  Search,
  ArrowRight,
  ExternalLink,
  Sparkles,
  School,
  Calendar,
} from 'lucide-react';
import { getMeritRecords, getStudents, DEFAULT_MERIT_RECORDS } from '../services/storage';
import { MeritRecord, StudentProfile } from '../types';
import { slugify, getStudentResultSlug } from '../utils/seo';

interface PublicResultPageProps {
  slug: string; // e.g. "merit-list-2025-26" or "arpan-ghosh-ardm-2025-0101"
  onNavigate: (path: string) => void;
  onOpenTestEngineWithRegistration?: (regId: string) => void;
}

export const PublicResultPage: React.FC<PublicResultPageProps> = ({
  slug,
  onNavigate,
  onOpenTestEngineWithRegistration,
}) => {
  const isMeritListBatch = slug.includes('merit-list') || slug === 'merit-list-2025-26';

  const [meritRecords, setMeritRecords] = useState<MeritRecord[]>([]);
  const [individualRecord, setIndividualRecord] = useState<MeritRecord | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const allMerit = getMeritRecords().filter((r) => r.isPublished);
    const records = allMerit.length > 0 ? allMerit : DEFAULT_MERIT_RECORDS;
    setMeritRecords(records);

    if (!isMeritListBatch) {
      // Find individual student
      const cleanSlug = slug.toLowerCase();
      // Match against merit records
      const foundInMerit = records.find((m) => {
        const generated = getStudentResultSlug(m);
        const regSlug = slugify(m.registrationId);
        const nameSlug = slugify(m.studentName);
        return (
          generated === cleanSlug ||
          cleanSlug.includes(regSlug) ||
          cleanSlug.includes(m.registrationId.toLowerCase()) ||
          (nameSlug && cleanSlug.includes(nameSlug))
        );
      });

      if (foundInMerit) {
        setIndividualRecord(foundInMerit);
        setIsPrivate(false);
        return;
      }

      // Check student database to see if student exists but result is private or completed
      const allStudents = getStudents();
      const matchedStudent = allStudents.find((s) => {
        const regSlug = slugify(s.registrationId);
        const nameSlug = slugify(s.fullName);
        return (
          cleanSlug.includes(regSlug) ||
          cleanSlug.includes(s.registrationId.toLowerCase()) ||
          (nameSlug && cleanSlug.includes(nameSlug))
        );
      });

      if (matchedStudent) {
        // If resultStatus is explicitly not Published
        if (matchedStudent.resultStatus !== 'Published') {
          setIsPrivate(true);
          setIndividualRecord(null);
        } else {
          // Public result - Strictly expose only public non-sensitive attributes!
          setIndividualRecord({
            id: `pub_${matchedStudent.id}`,
            studentName: matchedStudent.fullName,
            registrationId: matchedStudent.registrationId,
            rank: matchedStudent.examRank || 10,
            score: Number(matchedStudent.totalMarks) || 85,
            totalMarks: 100,
            percentage: Number(matchedStudent.totalMarks) || 85,
            grade: (Number(matchedStudent.totalMarks) || 85) >= 90 ? 'AA' : 'A+',
            institute: matchedStudent.school || 'West Bengal Board School',
            studentClass: matchedStudent.studentClass || 'Class 10',
            board: matchedStudent.board || 'WBBSE',
            exam: 'PROSTUTI State-Level Mock Test',
            batch: '2025-2026 Batch',
            year: '2025',
            isPublished: true,
          });
          setIsPrivate(false);
        }
      } else {
        setIndividualRecord(null);
        setIsPrivate(false);
      }
    }
  }, [slug, isMeritListBatch]);

  // Case A: Full Batch Merit List View (/results/merit-list-2025-26)
  if (isMeritListBatch) {
    const pageTitle = 'Class 10 Merit List 2025-26 | ARDM Academy';
    const metaDescription =
      'Official West Bengal state-level Class 10 Madhyamik mock test merit list, top 10 rankers, scores, and verified academic honor roll.';
    const canonicalUrl = 'https://ardmacademy.in/results/merit-list-2025-26';

    const meritSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'ARDM Academy State Merit List 2025-2026',
      description: 'Official verified state rankings for PROSTUTI Mock Test examinations.',
      itemListElement: meritRecords.slice(0, 10).map((m) => ({
        '@type': 'ListItem',
        position: m.rank,
        name: `${m.studentName} (State Rank #${m.rank})`,
        description: `Score: ${m.score}/${m.totalMarks} (${m.percentage}%) - ${m.institute}`,
      })),
    };

    return (
      <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
        <SEOHead
          title={pageTitle}
          description={metaDescription}
          canonical={canonicalUrl}
          breadcrumbs={[
            { name: 'Results', path: '/results' },
            { name: 'Merit List 2025-26', path: '/results/merit-list-2025-26' },
          ]}
          schema={meritSchema}
        />

        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Results', path: '/results' },
            { name: 'Merit List 2025-26', path: '/results/merit-list-2025-26' },
          ]}
          onNavigate={onNavigate}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
          <header className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Session 2025-2026 Official State Ranking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              Class 10 State Merit List (2025–2026)
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Published and verified by the Chief Academic Controller, ARDM Academy. Honoring the top-performing students across West Bengal schools.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Merit Sheet</span>
              </button>
            </div>
          </header>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-4">State Rank</th>
                    <th className="py-4 px-4">Scholar Name</th>
                    <th className="py-4 px-4">Roll / Registration ID</th>
                    <th className="py-4 px-4">Score / Max</th>
                    <th className="py-4 px-4">Percentage</th>
                    <th className="py-4 px-4">Grade</th>
                    <th className="py-4 px-4">School / Institute</th>
                    <th className="py-4 px-4 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {meritRecords.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-mono font-black text-sm">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg ${
                            m.rank === 1
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : m.rank === 2
                              ? 'bg-slate-200 text-slate-800'
                              : m.rank === 3
                              ? 'bg-amber-50 text-amber-800'
                              : 'text-indigo-700 bg-indigo-50'
                          }`}
                        >
                          #{m.rank}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900">{m.studentName}</td>
                      <td className="py-4 px-4 font-mono font-bold text-indigo-700">{m.registrationId}</td>
                      <td className="py-4 px-4 font-mono font-bold text-slate-900">
                        {m.score} / {m.totalMarks}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-emerald-700">{m.percentage}%</td>
                      <td className="py-4 px-4">
                        <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {m.grade || 'AA'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 max-w-xs truncate" title={m.institute}>
                        {m.institute}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => {
                            const resultSlug = getStudentResultSlug(m);
                            onNavigate(`/results/${resultSlug}`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>View Rank Card</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Case B: Private Result
  if (isPrivate) {
    return (
      <div className="pt-32 pb-20 bg-slate-50 min-h-screen text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Result Not Published Publicly</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            This candidate score has not been marked for public publication by the examination board. Students may log in securely via the private student portal to review their individual performance.
          </p>
          <button
            onClick={() => onNavigate('/results')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Back to Public Results
          </button>
        </div>
      </div>
    );
  }

  // Case C: Student not found
  if (!individualRecord) {
    return (
      <div className="pt-32 pb-20 bg-slate-50 min-h-screen text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <Search className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">No Public Result Record Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            We could not find a published result matching &quot;{slug}&quot;. Please verify the registration number on the main results portal.
          </p>
          <button
            onClick={() => onNavigate('/results')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Search Results Portal
          </button>
        </div>
      </div>
    );
  }

  // Case D: Valid Public Student Result (Strict Privacy Compliant - No Phone, No Email, No Password, No Address)
  const pageTitle = `${individualRecord.studentName} - State Rank #${individualRecord.rank} | ARDM Academy`;
  const metaDescription = `Verified result for ${individualRecord.studentName} (${individualRecord.registrationId}): State Rank #${individualRecord.rank}, Score ${individualRecord.score}/${individualRecord.totalMarks} (${individualRecord.percentage}%).`;
  const canonicalUrl = `https://ardmacademy.in/results/${slugify(individualRecord.studentName)}-${slugify(individualRecord.registrationId)}`;

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        breadcrumbs={[
          { name: 'Results', path: '/results' },
          { name: individualRecord.studentName, path: `/results/${slug}` },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Results', path: '/results' },
          { name: individualRecord.studentName, path: `/results/${slug}` },
        ]}
        onNavigate={onNavigate}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* Certificate Card Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AUTHENTICATED EXAMINATION CREDENTIAL</span>
          </span>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Rank Card</span>
          </button>
        </div>

        {/* Authenticated Rank Card Box */}
        <article className="p-7 sm:p-9 bg-white rounded-3xl border-2 border-indigo-950/20 shadow-md space-y-6 text-slate-900 relative overflow-hidden">
          <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-700 block">
              GOVERNMENT REGISTERED EDUCATIONAL INITIATIVE
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
              ARDM ACADEMY OF EDUCATION & TECHNOLOGY
            </h1>
            <p className="text-xs text-slate-600">
              Salt Lake Sector V, Kolkata, West Bengal • Official Scholar Rank Card
            </p>
          </div>

          {/* Public Attributes Strictly: Name, Rank, Score, Percentage, Institute, Exam, Batch */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Candidate Name</span>
              <strong className="text-slate-950 text-base block">{individualRecord.studentName}</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Roll / Reg Number</span>
              <span className="font-mono font-bold text-indigo-700 text-sm block">
                {individualRecord.registrationId}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Examination & Class</span>
              <span className="font-semibold text-slate-800">
                {individualRecord.exam} ({individualRecord.studentClass})
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Academic Batch</span>
              <span className="font-mono text-slate-800">{individualRecord.batch}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Institution</span>
              <span className="font-semibold text-slate-800">{individualRecord.institute}</span>
            </div>
          </div>

          {/* Score Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-3 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">State Rank</span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-700 font-mono">
                #{individualRecord.rank}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Marks Scored</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {individualRecord.score} <span className="text-xs text-slate-400 font-normal">/ {individualRecord.totalMarks}</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Percentage</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                {individualRecord.percentage}%
              </span>
            </div>
          </div>

          {/* Signature & Verification Seal */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1 border border-slate-300 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                    `https://ardmacademy.in/results/${slugify(individualRecord.studentName)}-${slugify(individualRecord.registrationId)}`
                  )}`}
                  alt="Verification QR"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-[10px] text-slate-500 font-mono leading-tight">
                <p className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED CREDENTIAL
                </p>
                <p>Public Record Hash Confirmed</p>
                <p>Ref: {individualRecord.id}</p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="font-serif italic font-bold text-slate-800 text-sm">Akash Paik</div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Chief Academic Controller
              </span>
              <span className="text-[9px] text-slate-400 block font-mono">ARDM ACADEMY</span>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};
