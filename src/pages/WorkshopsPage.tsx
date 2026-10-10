import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  HeartHandshake,
  Download,
  Video,
  Lightbulb,
  BookMarked,
  ArrowRight,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { getWhatsAppLink, getTelLink } from '../config/siteConfig';

interface WorkshopsPageProps {
  onNavigate: (path: string) => void;
  onOpenMockTest: () => void;
}

export const WorkshopsPage: React.FC<WorkshopsPageProps> = ({ onNavigate, onOpenMockTest }) => {
  const resources = [
    {
      title: 'Class 10 Mathematical Formula Handbook',
      category: 'Downloadable PDF',
      desc: 'All algebraic identities, quadratic equations, trigonometry ratios, and geometry theorems in one place.',
    },
    {
      title: 'Physical & Chemical Equation Balance Sheets',
      category: 'Study Guide',
      desc: 'Step-by-step balanced equations, optics sign conventions, and Ohm’s Law circuit shortcuts.',
    },
    {
      title: 'Time Management in Board Exams',
      category: 'Strategy Webinar',
      desc: 'How to structure the first 15 minutes of reading time and distribute time across 2-mark and 5-mark sections.',
    },
    {
      title: 'Weekly Dada-Didi Mentorship Clinics',
      category: 'Live Doubt Clearing',
      desc: 'Free weekend Google Meet and YouTube live clinics where experienced seniors clarify conceptual doubts.',
    },
  ];

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="Workshops & Free Guidance | ARDM Academy"
        description="Access free academic webinars, board exam strategy sessions, and downloadable formula revision sheets from ARDM Academy mentors."
        canonical="https://ardmacademy.netlify.app/workshops"
        breadcrumbs={[{ name: 'Workshops & Guidance', path: '/workshops' }]}
      />

      <Breadcrumbs items={[{ name: 'Workshops & Guidance', path: '/workshops' }]} onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <header className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Open Educational Access</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Free Educational Guidance & Study Workshops
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            At ARDM Academy, high-quality guidance is a fundamental right. Explore our 100% free formula revision kits, strategy workshops, and weekend doubt-solving clinics.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <a
              href={getWhatsAppLink('Hello ARDM Academy Mentor, I would like to access free Class 10 study materials.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp for Free Kits</span>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {resources.map((res, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {res.category}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-2 mb-1">{res.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{res.desc}</p>
              </div>

              <a
                href={getWhatsAppLink(`Hello ARDM Academy, please share the free material: ${res.title}`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Request Free Copy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Free AI & Coding Workshop Manager Spotlight */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-950 via-red-950/80 to-slate-950 border border-red-500/30 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>CodeLX &amp; ARDM Academy Initiative</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              AI Masterclass &amp; Free Coding Bootcamps
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Led by Workshop Manager <strong>MOHIM DAS</strong> (Founder &amp; CEO of CodeLX, Joint Founder of ARDM Academy). Hands-on Python programming, AI fundamentals, and verifiable digital certificates.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/workshop-manager')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg transition-all active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Workshop Manager</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
