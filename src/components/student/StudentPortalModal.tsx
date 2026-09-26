import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Download,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  X,
  AlertCircle,
  FileCheck,
  Building,
  KeyRound,
  LogOut,
  ExternalLink,
  BookOpen,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import {
  lookupRegistration,
  verifyStudentLogin,
  getStudentCourseEnrollments,
} from '../../services/storage';
import { StudentProfile, CourseEnrollment } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import {
  SITE_CONFIG,
  getTelLink,
  getWhatsAppChannelLink,
  getMailtoLink,
} from '../../config/siteConfig';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmitCard: (student: StudentProfile) => void;
  onLaunchCBT: (regId: string) => void;
  preloadedStudent?: StudentProfile | null;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmitCard,
  onLaunchCBT,
  preloadedStudent,
}) => {
  const [activeStudent, setActiveStudent] = useState<StudentProfile | null>(preloadedStudent || null);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your Registration ID, Mobile number, or Email.');
      return;
    }

    // Try password verification first
    if (loginPassword.trim()) {
      const verified = verifyStudentLogin(loginIdentifier, loginPassword);
      if (verified) {
        setActiveStudent(verified);
        return;
      }
    }

    // Direct registration ID lookup fallback
    const student = lookupRegistration(loginIdentifier);
    if (student) {
      setActiveStudent(student);
    } else {
      setLoginError('Registration not found. Please verify your Registration ID or contact academy support.');
    }
  };

  const handleLogout = () => {
    setActiveStudent(null);
    setLoginIdentifier('');
    setLoginPassword('');
    setLoginError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" light />
            <div className="pl-3 border-l border-slate-700 hidden sm:block">
              <h3 className="text-sm font-bold">Student Portal</h3>
              <p className="text-[11px] text-slate-400">
                PROSTUTI Mock Test Series • Admit Card & Performance Tracker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeStudent && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!activeStudent ? (
            /* STUDENT LOGIN FORM */
            <div className="max-w-md mx-auto py-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-3">
                  <BrandLogo size="md" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Student Portal Login</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your Unique Registration ID, Mobile number, or Email to view your status, admit card, and results.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Registration ID / Mobile / Email
                  </label>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. ARDM-2026-8942 or 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Password</label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Format: First 4 letters + Birth Year
                    </span>
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="e.g. MOHI2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    Example: For Mohim Das (Born 2010), password is: <strong>MOHI2010</strong>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-98"
                >
                  Access Student Dashboard
                </button>
              </form>

              {/* Password Policy & Security Notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  Access Security Notice
                </span>
                <p className="text-[11px] text-slate-500">
                  Passwords are securely hashed. Never share your candidate credentials with unauthorized persons.
                </p>
              </div>
            </div>
          ) : (
            /* STUDENT ACTIVE DASHBOARD (Section 22) */
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
                    Official Student Portal
                  </span>
                  <h4 className="text-xl font-extrabold">Welcome, {activeStudent.fullName}</h4>
                  <p className="text-xs text-slate-300">
                    Registration ID: <span className="font-mono font-bold text-white">{activeStudent.registrationId}</span> •{' '}
                    {activeStudent.studentClass} ({activeStudent.board})
                  </p>
                </div>

                <div className="flex gap-2">
                  {activeStudent.paymentStatus === 'Approved' ? (
                    <button
                      onClick={() => onOpenAdmitCard(activeStudent)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors bg-emerald-500 hover:bg-emerald-600 text-slate-950 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Admit Card</span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-medium bg-amber-500/20 text-amber-200 border border-amber-400/30">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>Admit Card Locked</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Notice Banner if Payment not Approved (Section 14) */}
              {activeStudent.paymentStatus !== 'Approved' && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-semibold">
                      Admit Card will become available after payment approval.
                    </span>
                  </div>
                  {activeStudent.paymentStatus === 'Pending' && (
                    <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded">
                      Fee Verification Pending
                    </span>
                  )}
                </div>
              )}

              {/* Status Grid Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Payment Status
                  </span>
                  <span
                    className={`font-bold block text-sm ${
                      activeStudent.paymentStatus === 'Approved'
                        ? 'text-emerald-700'
                        : activeStudent.paymentStatus === 'Under Review'
                        ? 'text-amber-700'
                        : 'text-slate-700'
                    }`}
                  >
                    {activeStudent.paymentStatus.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Fee: ₹{activeStudent.paymentAmount}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Admit Card
                  </span>
                  <span
                    className={`font-bold block text-sm ${
                      activeStudent.admitCardStatus === 'Available'
                        ? 'text-emerald-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {activeStudent.admitCardStatus.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {activeStudent.admitCardStatus === 'Available' ? 'Ready to Print' : 'Awaiting Approval'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Upcoming Exam
                  </span>
                  <span className="font-bold text-slate-900 block text-sm">PROSTUTI</span>
                  <span className="text-[10px] text-indigo-600 font-mono">
                    {activeStudent.examDate || '2026-11-15'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    CBT State Rank
                  </span>
                  <span className="font-extrabold text-indigo-700 block text-sm font-mono">
                    {activeStudent.examRank ? `#${activeStudent.examRank}` : 'Pending Exam'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Score: {activeStudent.totalMarks || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Venue & Center Assignment Card (Section 12) */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Building className="w-4 h-4 text-indigo-600" />
                  <span>Assigned Examination Center & Timing</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Center Name:</span>
                    <strong className="text-slate-900 block">
                      {activeStudent.venueName || 'ARDM Central Examination Hub'}
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      {activeStudent.venueRoom || 'Auditorium Hall A & B'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Reporting Schedule:</span>
                    <strong className="text-slate-900 block font-mono">
                      {activeStudent.examDate || '2026-11-15'} • {activeStudent.examTime || '10:00 AM IST'}
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      {activeStudent.venueAddress || 'Bidhan Nagar Educational Complex, Salt Lake, Kolkata'}
                    </span>
                  </div>
                </div>
              </div>

              {/* MY ENROLLED COURSES & STUDY ACCESS (Phase 2 Section 7) */}
              {(() => {
                const enrolledCourses = getStudentCourseEnrollments(activeStudent.mobile, activeStudent.email);
                return (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span>Enrolled Courses & Academic Programs</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {enrolledCourses.length} Programs
                      </span>
                    </div>

                    {enrolledCourses.length === 0 ? (
                      <div className="p-3 bg-slate-50 rounded-xl text-center text-slate-500 text-xs">
                        <span>No courses enrolled yet. </span>
                        <a
                          href="/courses"
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            window.history.pushState({}, '', '/courses');
                            window.dispatchEvent(new PopStateEvent('popstate'));
                          }}
                          className="text-indigo-600 font-bold hover:underline"
                        >
                          Browse ARDM Academy Courses &rarr;
                        </a>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {enrolledCourses.map((enr) => (
                          <div
                            key={enr.id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="space-y-0.5">
                              <strong className="text-slate-900 text-xs block">{enr.courseTitle}</strong>
                              <span className="text-[10px] text-slate-500 font-mono">
                                UTR: {enr.transactionId} • Fee: ₹{enr.paymentAmount}
                              </span>
                              {enr.adminNotes && (
                                <p className="text-[11px] text-rose-600 font-semibold">
                                  Admin Note: {enr.adminNotes}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  enr.status === 'Active'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : enr.status === 'Under Review'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : enr.status === 'Reverification'
                                    ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                                }`}
                              >
                                {enr.status === 'Active' ? 'ACTIVE ACCESS' : enr.status.toUpperCase()}
                              </span>

                              {enr.status === 'Active' && (
                                <a
                                  href="/portal"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    window.history.pushState({}, '', '/portal');
                                    window.dispatchEvent(new PopStateEvent('popstate'));
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] inline-flex items-center gap-1 shadow-xs"
                                >
                                  <span>Open Study Materials</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onLaunchCBT(activeStudent.registrationId);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch CBT Practice Exam</span>
                  </button>

                  {activeStudent.paymentStatus === 'Approved' ? (
                    <button
                      onClick={() => onOpenAdmitCard(activeStudent)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs cursor-pointer"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Download Admit Card</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-200 text-slate-400 font-bold text-xs cursor-not-allowed"
                      title="Admit Card will become available after payment approval"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Admit Card (Payment Pending)</span>
                    </button>
                  )}
                </div>

                <div className="flex gap-2 text-xs">
                  <a
                    href={getTelLink()}
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-xl bg-slate-100"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Academy</span>
                  </a>
                  <a
                    href={getWhatsAppChannelLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 px-3 py-2 rounded-xl bg-emerald-50"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
