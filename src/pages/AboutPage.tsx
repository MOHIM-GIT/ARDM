import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Target,
  Compass,
  Sparkles,
  Check,
  GraduationCap,
  Users,
  ShieldCheck,
  Award,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  Building,
  Quote,
  Star,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import { SITE_CONFIG, getTelLink, getWhatsAppLink } from '../config/siteConfig';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const testimonials = [
    {
      name: 'Arpan Ghosh',
      role: 'Class 10 State Rank #1 (PROSTUTI Series)',
      school: 'Bidhan Nagar Government High School',
      score: '98/100 (98%)',
      quote:
        'The PROSTUTI Mock Test gave me real board exam simulation down to the exact timing and OMR/CBT question patterns. The Dada-Didi mentorship sessions helped me fix time management in physical science calculations.',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Sneha Mukherjee',
      role: 'Class 10 State Rank #2 (96%)',
      school: 'Salt Lake Point School',
      score: '96/100 (96%)',
      quote:
        'ARDM Academy is unique because you are never treated like a roll number. Akash Sir and the senior faculty break down complex Bengali and English grammar rules so clearly that memorizing becomes effortless.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Dr. Debasish Sen',
      role: 'Parent of Class 10 Scholar',
      school: 'Kolkata District',
      score: 'Parent Review',
      quote:
        'As parents, we worried about board exam anxiety. The continuous analytics, verified scorecards, and empathetic faculty counseling at ARDM turned our daughter’s self-doubt into immense confidence.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Soumyadeep Saha',
      role: 'AI & Python Foundations Scholar',
      school: 'South Point High School',
      score: 'Coding Track',
      quote:
        'I joined ARDM Academy for academic revision but also took their Python and AI fundamentals course. Building actual logic and mini-projects gave me a huge head start before high school!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const milestones = [
    { number: '1,500+', label: 'Students Guided' },
    { number: '98.4%', label: 'Board Exam Pass Rate' },
    { number: '120+', label: 'State Top 100 Ranks' },
    { number: '100%', label: 'Free Guidance Accessible' },
  ];

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="About Us | ARDM Academy"
        description="Learn about ARDM Academy's educational philosophy, Dada-Didi mentorship model, founder leadership, milestones, and student success testimonials."
        canonical="https://ardmacademy.in/about"
        breadcrumbs={[{ name: 'About Us', path: '/about' }]}
      />

      <Breadcrumbs items={[{ name: 'About Us', path: '/about' }]} onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Page Hero */}
        <header className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/80">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Our Heritage & Academic Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Empowering Every Student to Excel Without Fear
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            ARDM Academy of Education & Technology was established with a singular conviction: rigorous academic excellence and modern digital literacy should be transparent, accessible, and grounded in genuine human mentorship.
          </p>
        </header>

        {/* Impact Numbers Bar */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 mb-16 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {milestones.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono block">
                  {m.number}
                </span>
                <span className="text-xs text-slate-300 font-semibold">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy & Mentorship Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Core Philosophy: "Learn. Practice. Improve."</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Examinations are not filters of fear — they are milestones of self-realization. By offering structured mock examinations, chapter blueprints, and detailed step-by-step scoring analytics, we transform examination anxiety into proven competence.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero superficial memorization — concepts are taught through real-world applications.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Timed simulations matching official board conditions down to the minute.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Transparent scoring with state-level rank predictions and formula sheets.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">The "Dada-Didi" Mentorship Tradition</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rather than distant lectures, our students are guided by empathetic elder brothers and sisters ("Dada" & "Didi") who have recently mastered these examinations with top marks. They share real exam-hall tips, memory mnemonics, and honest psychological reassurance.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>One-on-one doubt clearing sessions where no question is considered too basic.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Emotional support and anxiety management before major examination dates.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Direct WhatsApp and phone helpline for continuous guidance.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Academic Leadership */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xs mb-16">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Academic Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Guided by Experienced Educators & Innovators
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Under the direct leadership of Founder Akash Paik, ARDM Academy combines decades of board exam teaching expertise with modern computational training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                  AP
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Akash Paik</h3>
                  <span className="text-xs text-indigo-700 font-semibold block">Founder & Chief Academic Officer</span>
                  <span className="text-[11px] text-slate-400 font-mono">ARDM Academy of Education</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specializing in Mathematics, Physical Science, and Computer Programming. Committed to providing accessible coaching, state-level competitive mock platforms, and modern digital education for all students regardless of financial background.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                  SF
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Senior Faculty & Board Examiners</h3>
                  <span className="text-xs text-blue-700 font-semibold block">Subject Specialists Suite</span>
                  <span className="text-[11px] text-slate-400 font-mono">Bengali, English, Life Science, History, Geography</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our curriculum panel includes veteran school teachers and verified board paper examiners who review every mock question statement, model answer key, and formula summary sheet.
              </p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION (Phase 2 Section 19) */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Verified Success Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              What Our Students & Parents Say
            </h2>
            <p className="text-sm text-slate-600">
              Read authentic feedback from Class 10 board toppers, parents, and students guided by ARDM Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                      {t.score}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <strong className="text-sm text-slate-900 block font-bold">{t.name}</strong>
                    <span className="text-[11px] text-indigo-700 font-semibold block">{t.role}</span>
                    <span className="text-[10px] text-slate-400 block">{t.school}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Accelerate Your Academic Journey?
          </h2>
          <p className="text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            Join thousands of ambitious scholars preparing with ARDM Academy. Register for our upcoming state-level mock exams or explore our dynamic courses.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/courses')}
              className="px-6 py-3 bg-white text-slate-950 font-bold rounded-xl text-xs shadow-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Explore Dynamic Courses
            </button>
            <a
              href={getTelLink()}
              className="px-5 py-3 bg-indigo-700/80 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpline: 6289139984</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};
