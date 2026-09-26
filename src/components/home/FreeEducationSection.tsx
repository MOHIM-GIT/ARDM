import React from 'react';
import {
  HeartHandshake,
  Download,
  BookMarked,
  Video,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { getWhatsAppLink } from '../../config/siteConfig';

interface FreeEducationSectionProps {
  onOpenMockTest: () => void;
}

export const FreeEducationSection: React.FC<FreeEducationSectionProps> = ({ onOpenMockTest }) => {
  const freeResources = [
    {
      title: 'Class 10 Formula Cheat Sheets',
      type: 'PDF Download',
      desc: 'Quick reference equations for Mathematics, Physics and Chemical Reaction balances for fast revision.',
      badge: 'Free Resource',
      icon: Download,
    },
    {
      title: 'Board Exam Strategy Webinars',
      type: 'Live Sessions',
      desc: 'Time allocation techniques, section-wise answering order, and how to avoid negative scoring traps.',
      badge: 'Online Guidance',
      icon: Video,
    },
    {
      title: 'Bengali & English Model Essays',
      type: 'Reading Material',
      desc: 'High-scoring sample compositions, report writing formats, and notice drafts mapped to current syllabi.',
      badge: 'Study Material',
      icon: BookMarked,
    },
    {
      title: 'Introductory Python & AI Workshops',
      type: 'Interactive Weekend Lab',
      desc: 'Free hands-on workshops introducing logic building, computer fundamentals, and tech careers.',
      badge: 'Tech Skills',
      icon: Lightbulb,
    },
  ];

  return (
    <section id="free-guidance" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Open Access Initiative</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Learn Without Barriers
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            At ARDM Academy, high-quality guidance shouldn’t be a privilege. We provide free mentorship,
            downloadable study aids, and regular doubt resolution to ensure every candidate steps into the board exam hall prepared.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {freeResources.map((res, index) => {
            const Icon = res.icon;
            return (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      {res.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {res.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60">
                  <a
                    href={getWhatsAppLink(
                      `Hello ARDM Academy, please share the free resource: ${res.title}`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Request via WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Educational Commitment Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-8 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                100% Free Guidance Sessions
              </span>
              <h3 className="text-2xl font-bold">Have Questions About Class 10 Syllabus or Strategy?</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Connect with our academic mentors directly. Get personalized advice on subject weak areas,
                chapter-wise mark weightage, and study schedules at no charge.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href={getWhatsAppLink("Hello ARDM Academy Mentor, I would like free academic guidance for Class 10.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Mentor on WhatsApp</span>
              </a>

              <button
                onClick={onOpenMockTest}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                <span>Register for Mock Test Series</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
