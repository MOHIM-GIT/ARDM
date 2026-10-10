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
  onOpenFounderModal?: (founderId?: 'all' | 'akash' | 'rupam' | 'devnath' | 'mohim') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenFounderModal }) => {
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

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: 'About ARDM Academy & Founders',
        description:
          'Meet the 4 Founders of ARDM Academy: Akash Paik, Rupam Paul, Devnath Pramanick, and Mohim Das. Educational leadership, Dada-Didi mentorship, and academic excellence.',
        mainEntity: {
          '@type': 'EducationalOrganization',
          name: 'ARDM Academy',
          url: 'https://ardmacademy.netlify.app/',
          founder: [
            {
              '@type': 'Person',
              name: 'Akash Paik',
              jobTitle: 'Founder',
              worksFor: { '@type': 'EducationalOrganization', name: 'ARDM Academy' },
              description: 'Founder & Academic Lead in Mathematics and Physical Science pedagogy.',
              knowsAbout: ['Mathematics', 'Physical Science', 'Board Exam Strategy', 'Curriculum Design'],
              email: 'akashpaik570@gmail.com',
            },
            {
              '@type': 'Person',
              name: 'Rupam Paul',
              jobTitle: 'Founder',
              worksFor: { '@type': 'EducationalOrganization', name: 'ARDM Academy' },
              description: 'Founder & Operations Lead managing examination logistics and CBT test delivery.',
              knowsAbout: ['Operations Management', 'Systems Architecture', 'Educational Logistics', 'CBT Test Platforms'],
              email: 'rupampaul20070@gmail.com',
            },
            {
              '@type': 'Person',
              name: 'Devnath Pramanick',
              jobTitle: 'Founder',
              worksFor: { '@type': 'EducationalOrganization', name: 'ARDM Academy' },
              description: 'Founder & Mentorship Lead who architected the Dada-Didi Mentorship model.',
              knowsAbout: ['Student Mentorship', 'Dada-Didi Mentorship Model', 'Examination Psychology', 'Academic Guidance'],
              email: 'pramanickdevnath2007@gmail.com',
            },
            {
              '@type': 'Person',
              name: 'Mohim Das',
              jobTitle: 'Founder',
              worksFor: { '@type': 'EducationalOrganization', name: 'ARDM Academy' },
              description: 'Founder & Technology Lead (Founder & CEO of CodeLX), leading AI workshops and web engineering.',
              knowsAbout: ['Software Engineering', 'Artificial Intelligence', 'Web Architecture', 'Digital Education'],
              email: 'mohimdas300@gmail.com',
              telephone: '+919123870823',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        name: 'ARDM Academy Founders FAQ',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who are the founders of ARDM Academy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ARDM Academy was founded by four founders: Akash Paik, Rupam Paul, Devnath Pramanick, and Mohim Das. The academy is named ARDM after the four founders: A (Akash), R (Rupam), D (Devnath), and M (Mohim).',
            },
          },
          {
            '@type': 'Question',
            name: 'Who is the founder of ARDM Academy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ARDM Academy has four founders who established the academy jointly: Akash Paik (Academic Lead), Rupam Paul (Operations Lead), Devnath Pramanick (Mentorship Lead), and Mohim Das (Technology Lead & Founder/CEO of CodeLX).',
            },
          },
          {
            '@type': 'Question',
            name: 'What does ARDM stand for in ARDM Academy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ARDM stands for the four founders of ARDM Academy: A - Akash Paik, R - Rupam Paul, D - Devnath Pramanick, and M - Mohim Das.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="About Us & Founders: Akash Paik, Rupam Paul, Devnath Pramanick, Mohim Das | ARDM Academy"
        description="Meet the Founders of ARDM Academy: Akash Paik, Rupam Paul, Devnath Pramanick, and Mohim Das. Learn about our educational philosophy, Dada-Didi mentorship model, and comprehensive Class 10 board preparation."
        canonical="https://ardmacademy.netlify.app/about"
        breadcrumbs={[{ name: 'About Us', path: '/about' }]}
        schema={aboutSchema}
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
          <div className="bg-white dark:bg-[#121215] p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-red-700 dark:text-red-400 uppercase tracking-wider block mb-1">
                Our Core Philosophy
              </span>
              <div className="space-y-2 pt-1">
                <div className="p-3.5 rounded-2xl bg-black border border-slate-800 shadow-xl inline-flex flex-col gap-0.5">
                  <span className="text-[#FF9933] font-black text-2xl leading-tight drop-shadow-[0_2px_8px_rgba(255,153,51,0.4)]">
                    Learn.
                  </span>
                  <span className="text-white font-black text-2xl leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
                    Practice.
                  </span>
                  <span className="text-[#22C55E] font-black text-2xl leading-tight drop-shadow-[0_2px_8px_rgba(34,197,94,0.4)]">
                    Improve.
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Examinations are not filters of fear — they are milestones of self-realization. By offering structured mock examinations, chapter blueprints, and detailed step-by-step scoring analytics, we transform examination anxiety into proven competence.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2">
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

          <div className="bg-white dark:bg-[#121215] p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">The "Dada-Didi" Mentorship Tradition</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Rather than distant lectures, our students are guided by empathetic elder brothers and sisters ("Dada" & "Didi") who have recently mastered these examinations with top marks. They share real exam-hall tips, memory mnemonics, and honest psychological reassurance.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2">
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

        {/* Founders & Leadership */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xs mb-16">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Founders & Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Meet the Founders of ARDM Academy
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              ARDM Academy was founded by a united team of four educators and technologists dedicated to empowering students with conceptual clarity, affordable high-standard mock exams, and modern computational skills.
            </p>
          </div>

          {/* 4 Founders Grid (SEO Optimized with Schema.org Microdata) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
            {/* Founder 1: AKASH PAIK */}
            <article
              itemScope
              itemType="https://schema.org/Person"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <meta itemProp="worksFor" content="ARDM Academy" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-sm">
                    AP
                  </div>
                  <div>
                    <h3 itemProp="name" className="font-extrabold text-base text-slate-900 leading-tight">Akash Paik</h3>
                    <span itemProp="jobTitle" className="text-xs font-bold text-indigo-700 uppercase tracking-wide block">Founder</span>
                    <span className="text-[11px] text-slate-500 font-medium">Academic Lead</span>
                  </div>
                </div>
                <p itemProp="description" className="text-xs text-slate-600 leading-relaxed">
                  Specializing in Mathematics, Physical Science pedagogy, and examination strategy. Champions student-first curriculum design and personalized doubt clearing.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Mathematics & Physical Science</span>
                {onOpenFounderModal && (
                  <button
                    onClick={() => onOpenFounderModal('akash')}
                    className="text-indigo-600 font-bold hover:underline cursor-pointer"
                  >
                    View Details →
                  </button>
                )}
              </div>
            </article>

            {/* Founder 2: RUPAM PAUL */}
            <article
              itemScope
              itemType="https://schema.org/Person"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <meta itemProp="worksFor" content="ARDM Academy" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-sm">
                    RP
                  </div>
                  <div>
                    <h3 itemProp="name" className="font-extrabold text-base text-slate-900 leading-tight">Rupam Paul</h3>
                    <span itemProp="jobTitle" className="text-xs font-bold text-blue-700 uppercase tracking-wide block">Founder</span>
                    <span className="text-[11px] text-slate-500 font-medium">Operations & Tech Architecture</span>
                  </div>
                </div>
                <p itemProp="description" className="text-xs text-slate-600 leading-relaxed">
                  Steering administrative operations, exam center logistics, and digital platform reliability. Ensures seamless nationwide examination delivery.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Operations & Systems</span>
                {onOpenFounderModal && (
                  <button
                    onClick={() => onOpenFounderModal('rupam')}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    View Details →
                  </button>
                )}
              </div>
            </article>

            {/* Founder 3: DEVNATH PRAMANICK */}
            <article
              itemScope
              itemType="https://schema.org/Person"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <meta itemProp="worksFor" content="ARDM Academy" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-sm">
                    DP
                  </div>
                  <div>
                    <h3 itemProp="name" className="font-extrabold text-base text-slate-900 leading-tight">Devnath Pramanick</h3>
                    <span itemProp="jobTitle" className="text-xs font-bold text-emerald-700 uppercase tracking-wide block">Founder</span>
                    <span className="text-[11px] text-slate-500 font-medium">Student Mentorship & Guidance</span>
                  </div>
                </div>
                <p itemProp="description" className="text-xs text-slate-600 leading-relaxed">
                  Architect of the Dada-Didi Mentorship philosophy. Focuses on student psychology, stress-free board preparation, and career roadmap counseling.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Student Welfare</span>
                {onOpenFounderModal && (
                  <button
                    onClick={() => onOpenFounderModal('devnath')}
                    className="text-emerald-600 font-bold hover:underline cursor-pointer"
                  >
                    View Details →
                  </button>
                )}
              </div>
            </article>

            {/* Founder 4: MOHIM DAS */}
            <article
              itemScope
              itemType="https://schema.org/Person"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <meta itemProp="worksFor" content="ARDM Academy" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-purple-600 text-white font-black text-lg flex items-center justify-center shadow-sm">
                    MD
                  </div>
                  <div>
                    <h3 itemProp="name" className="font-extrabold text-base text-slate-900 leading-tight">Mohim Das</h3>
                    <span itemProp="jobTitle" className="text-xs font-bold text-purple-700 uppercase tracking-wide block">Founder</span>
                    <span className="text-[11px] text-slate-500 font-medium">Digital Learning & Innovation</span>
                  </div>
                </div>
                <p itemProp="description" className="text-xs text-slate-600 leading-relaxed">
                  Driving digital learning technology, AI education integration, and web engineering. Dedicated to modernizing educational access for aspiring learners.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Software & AI Labs</span>
                {onOpenFounderModal && (
                  <button
                    onClick={() => onOpenFounderModal('mohim')}
                    className="text-purple-600 font-bold hover:underline cursor-pointer"
                  >
                    View Details →
                  </button>
                )}
              </div>
            </article>
          </div>

          {/* Senior Faculty & Board Paper Reviewers Panel */}
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-indigo-400/30">
                  Verified Academic Suite
                </span>
                <span className="text-xs text-slate-400 font-mono">ARDM Academy</span>
              </div>
              <h3 className="text-lg font-bold text-white">Board Examiners & Senior Subject Specialists</h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Working hand-in-hand with Founders Akash Paik, Rupam Paul, Devnath Pramanick, and Mohim Das, our curriculum panel includes veteran school educators who rigorously review every PROSTUTI mock test and study blueprint.
              </p>
            </div>
            <div className="shrink-0 text-center sm:text-right">
              <span className="text-2xl font-black text-cyan-400 font-mono">100%</span>
              <span className="block text-[11px] text-slate-400">Curriculum Syllabus Mapped</span>
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
        <section className="bg-gradient-to-r from-red-900 via-rose-950 to-red-950 dark:from-[#180a0c] dark:via-[#14080a] dark:to-[#180a0c] rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 shadow-xl border border-red-900/40">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Accelerate Your Academic Journey?
          </h2>
          <p className="text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            Join thousands of ambitious scholars preparing with ARDM Academy. Register for our upcoming state-level mock exams or explore our dynamic courses.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/courses')}
              className="px-6 py-3 bg-white text-red-950 hover:bg-slate-100 font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
            >
              Explore Dynamic Courses
            </button>
            <a
              href={getTelLink()}
              className="px-5 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-md"
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
