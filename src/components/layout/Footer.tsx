import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  ShieldCheck,
  Heart,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  SITE_CONFIG,
  getTelLink,
  getWhatsAppChannelLink,
  getMailtoLink,
} from '../../config/siteConfig';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenRegistration: () => void;
  onOpenCheckRegistration: () => void;
  onOpenDownloadAdmitCard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdmin,
  onOpenRegistration,
  onOpenCheckRegistration,
  onOpenDownloadAdmitCard,
}) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" light />
            <p className="text-xs text-white leading-relaxed max-w-sm font-normal">
              ARDM Academy is a premier modern educational institute focused on secondary education,
              standardized PROSTUTI Class 10 mock test series, technology empowerment, and free mentor guidance.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.social.whatsappChannel}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors border border-slate-800"
                title="Official WhatsApp Channel"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-red-600 text-white flex items-center justify-center transition-colors border border-slate-800"
                title="Official YouTube Channel"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors border border-slate-800"
                title="Facebook Community"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-600 text-white flex items-center justify-center transition-colors border border-slate-800"
                title="Instagram Channel"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={getTelLink()}
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors border border-slate-800"
                title={`Call ${SITE_CONFIG.contact.phoneNumber}`}
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              <a
                href={getMailtoLink()}
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white flex items-center justify-center transition-colors border border-slate-800"
                title={`Mail ${SITE_CONFIG.contact.emailAddress}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About ARDM
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/courses');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Courses & Subjects
                </a>
              </li>
              <li>
                <a
                  href="/mock-tests"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/mock-tests');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  PROSTUTI Mock Test
                </a>
              </li>
              <li>
                <a
                  href="/computer-science"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/computer-science');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Computer Science & Coding
                </a>
              </li>
              <li>
                <a
                  href="/ai"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/ai');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI & Data Science
                </a>
              </li>
              <li>
                <a
                  href="/workshops"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/workshops');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Workshops & Free Guidance
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact ARDM Academy
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Candidate Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Candidate Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenCheckRegistration} className="hover:text-cyan-400 transition-colors font-medium">
                  Check Registration Status
                </button>
              </li>
              <li>
                <button onClick={onOpenDownloadAdmitCard} className="hover:text-cyan-400 transition-colors font-medium text-blue-400">
                  Download Official Admit Card
                </button>
              </li>
              <li>
                <a
                  href="/results"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/results');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  State Merit Leaderboard
                </a>
              </li>
              <li>
                <button onClick={() => setLegalModal('privacy')} className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModal('terms')} className="hover:text-cyan-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors group cursor-pointer"
                  title="Student Data - Admin Panel"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>Student Data - Admin Panel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact ARDM Academy */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Contact ARDM Academy
            </h4>
            <div className="space-y-2.5 text-xs text-white">
              <div>
                <strong className="text-white block text-[11px]">Helpline:</strong>
                <a href={getTelLink()} className="hover:text-red-400 font-mono font-bold text-white">
                  6289139984
                </a>
              </div>
              <div>
                <strong className="text-white block text-[11px]">Email:</strong>
                <a href={getMailtoLink()} className="hover:text-red-400 font-mono text-white break-all">
                  ardmacademy@gmail.com
                </a>
              </div>
              <div>
                <strong className="text-white block text-[11px]">WhatsApp Channel:</strong>
                <a href={SITE_CONFIG.social.whatsappChannel} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                  Join Official Broadcast
                </a>
              </div>
              <p className="text-[10px] text-white/90 pt-1">
                Kolkata, West Bengal • Support: Mon–Sun 8 AM–9 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} ARDM Academy. BUILD • PROGRESS • TOGETHER. All rights reserved.</p>
            <p className="text-[11px] text-white/90">
              Founders: <span className="text-white font-semibold">Akash Paik</span> • <span className="text-white font-semibold">Rupam Paul</span> • <span className="text-white font-semibold">Devnath Pramanick</span> • <span className="text-white font-semibold">Mohim Das</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white">PROSTUTI Class 10 Mock Test Platform</span>
          </div>
        </div>
      </div>

      {/* Legal Dialog Modals */}
      {legalModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold">
                {legalModal === 'privacy' && 'Privacy Policy'}
                {legalModal === 'terms' && 'Terms and Conditions'}
                {legalModal === 'refund' && 'Refund & Fee Policy'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              {legalModal === 'privacy' && (
                <>
                  <p>
                    <strong>ARDM Academy</strong> respects the privacy of students and guardians. Information collected during mock test registration (including student name, parent phone number, school details, and email) is utilized strictly for examination enrollment, admit card generation, scorecard computation, and educational guidance.
                  </p>
                  <p>
                    We do not sell, rent, or trade student personal records. All candidate records are encrypted in transit and accessible solely by verified academy educators.
                  </p>
                </>
              )}

              {legalModal === 'terms' && (
                <>
                  <p>
                    1. <strong>Enrollment:</strong> Registration for the PROSTUTI Class 10 Mock Examination requires accurate student information. False or duplicate records are subject to review.
                  </p>
                  <p>
                    2. <strong>Mock Examination:</strong> ARDM Academy mock tests simulate board conditions for educational practice and diagnostic evaluation. Rankings and scores are computed objectively based on recorded responses.
                  </p>
                  <p>
                    3. <strong>Intellectual Property:</strong> All test questions, question papers, and study materials are the intellectual property of ARDM Academy.
                  </p>
                </>
              )}

              {legalModal === 'refund' && (
                <>
                  <p>
                    ARDM Academy maintains a nominal registration fee of ₹100 per subject to cover examination logistics, evaluation engines, and digital infrastructure.
                  </p>
                  <p>
                    In the event of accidental duplicate payments for the identical registration order, the surplus fee will be verified and refunded upon contact with the academic helpline (6289139984) within 7 working days.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
