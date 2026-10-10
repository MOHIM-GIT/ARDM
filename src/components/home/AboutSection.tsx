import React from 'react';
import {
  Target,
  Compass,
  Sparkles,
  Check,
  GraduationCap,
  Users,
  ShieldCheck,
  Mail,
  PhoneCall,
  ExternalLink,
  Code2,
  BookOpen,
  Cpu,
  HeartHandshake
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface AboutSectionProps {
  onOpenWorkshopManager?: () => void;
  onOpenFounderModal?: (founderId?: 'all' | 'akash' | 'rupam' | 'devnath' | 'mohim') => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenWorkshopManager,
  onOpenFounderModal,
}) => {
  const founders = [
    {
      id: 'akash' as const,
      initial: 'A',
      name: 'Akash Paik',
      role: 'Founder & Academic Lead',
      initialBg: 'from-amber-500 to-orange-600',
      badgeBorder: 'border-amber-500/50 text-amber-300 bg-amber-950/60',
      specialty: 'Mathematics & Physical Science Pedagogy',
      description:
        'Specializing in secondary board curriculum strategy, high-accuracy Madhyamik question predictions, and conceptual problem-solving blueprints.',
      email: 'akashpaik570@gmail.com',
      icon: BookOpen,
    },
    {
      id: 'rupam' as const,
      initial: 'R',
      name: 'Rupam Paul',
      role: 'Founder & Operations Lead',
      initialBg: 'from-red-600 to-rose-700',
      badgeBorder: 'border-red-500/50 text-red-300 bg-red-950/60',
      specialty: 'Exam Logistics & CBT Simulator Systems',
      description:
        'Directs nationwide examination center logistics, live Computer-Based Test (CBT) platform architecture, and academic operational administration.',
      email: 'rupampaul20070@gmail.com',
      icon: Cpu,
    },
    {
      id: 'devnath' as const,
      initial: 'D',
      name: 'Devnath Pramanick',
      role: 'Founder & Mentorship Lead',
      initialBg: 'from-emerald-600 to-teal-700',
      badgeBorder: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/60',
      specialty: 'Dada-Didi Mentorship & Student Psychology',
      description:
        'Pioneered the empathetic Dada-Didi Mentorship philosophy, providing student counseling, exam hall anxiety relief, and personalized topper roadmaps.',
      email: 'pramanickdevnath2007@gmail.com',
      icon: HeartHandshake,
    },
    {
      id: 'mohim' as const,
      initial: 'M',
      name: 'Mohim Das',
      role: 'Founder & Technology Lead',
      subRole: 'Founder & CEO of CodeLX • Joint Founder of ARDM Academy',
      initialBg: 'from-purple-600 to-indigo-700',
      badgeBorder: 'border-purple-500/50 text-purple-300 bg-purple-950/60',
      specialty: 'Artificial Intelligence & Full-Stack Web Architecture',
      description:
        'Directs AI coding workshops, full-stack digital learning infrastructure, and next-generation programming fundamentals for school students.',
      email: 'mohimdas300@gmail.com',
      phone: '9123870823',
      icon: Code2,
      isWorkshopManager: true,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About ARDM Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Building Confidence Through Education & Mentorship
          </h2>
          <p className="text-sm sm:text-base text-white/95 leading-relaxed">
            ARDM Academy is an educational initiative dedicated to providing structured academic coaching,
            state-standard Class 10 mock examinations, and practical technology education.
          </p>
        </div>

        {/* 2-Column Story & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="prose prose-invert max-w-none text-white text-base leading-relaxed space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-400" />
                <span>What is ARDM Academy? (ARDM Academy Ta Ki?)</span>
              </h3>
              <p>
                Many students prepare hard for Class 10 board examinations, but struggle with time management,
                exam temperament, and question framing. ARDM Academy bridges this gap by creating real-feel mock
                tests, providing in-depth analysis, and offering clear educational guidance.
              </p>
              <p>
                Through our collaborative <span className="font-semibold text-white">“Dada-Didi Class”</span> mentorship philosophy,
                elder student mentors and passionate educators work closely with learners. We break down difficult
                concepts in Mathematics, Physical Science, and Life Science into intuitive, memorable principles.
              </p>
              <p>
                Simultaneously, we prepare youngsters for the digital era with fundamental computer science, coding,
                artificial intelligence fundamentals, and data awareness workshops.
              </p>
            </div>

            {/* Core Values / Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Zero Financial Barrier', desc: 'Free educational resources and accessible mock test pricing.' },
                { title: 'Authentic Syllabus', desc: 'Rigorous questions mapped to West Bengal (WBBSE) & national boards.' },
                { title: 'CBT Exam Simulator', desc: 'Time-bound digital testing with instant scorecard evaluation.' },
                { title: 'Transparent Leaderboard', desc: 'Merit list with top 10 rankings and downloadable PDF reports.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#141418] border border-slate-800 flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-emerald-950/80 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] text-white/90 mt-0.5 font-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Mission & Vision */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#181013] to-[#121215] border border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Our Mission</h4>
                <p className="text-xs text-white leading-relaxed font-normal">
                  To democratize quality board exam preparation and digital literacy so that every student, regardless of background, can compete at the highest level.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#181013] to-[#121215] border border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Our Vision</h4>
                <p className="text-xs text-white leading-relaxed font-normal">
                  To foster a generation of curious thinkers, skilled problem solvers, and board toppers equipped with both traditional academic strength and digital fluency.
                </p>
              </div>
            </div>

            {/* Quick ARDM Acronym Overview Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#141418] to-red-950/40 border border-red-900/50 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  The ARDM Acronym Identity
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Why the name "ARDM Academy"?
              </h4>
              <p className="text-xs text-white/90 leading-relaxed mb-4">
                The name <strong>ARDM</strong> is directly formed from the first initials of our four founding educators and technologists who built the academy together:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-black/60 border border-slate-800">
                  <span className="text-xl font-black text-[#FF9933] block">A</span>
                  <span className="text-[11px] text-white font-sans font-bold">Akash Paik</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/60 border border-slate-800">
                  <span className="text-xl font-black text-rose-400 block">R</span>
                  <span className="text-[11px] text-white font-sans font-bold">Rupam Paul</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/60 border border-slate-800">
                  <span className="text-xl font-black text-emerald-400 block">D</span>
                  <span className="text-[11px] text-white font-sans font-bold">Devnath P.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/60 border border-slate-800">
                  <span className="text-xl font-black text-purple-400 block">M</span>
                  <span className="text-[11px] text-white font-sans font-bold">Mohim Das</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DEDICATED FULL-WIDTH SECTION: THE FOUR FOUNDERS OF ARDM ACADEMY */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-8 border-t border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-300 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>Leadership & Faculty</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Meet All 4 Founders of ARDM Academy
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl mx-auto">
              ARDM Academy was established by a united team of four founders dedicated to conceptual clarity,
              affordable high-standard mock exams, empathetic mentorship, and cutting-edge technology education.
            </p>
          </div>

          {/* 4 Founders Responsive Grid (1 col on mobile, 2 col on tablet, 4 col on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {founders.map((f, idx) => {
              const Icon = f.icon;
              return (
                <article
                  key={idx}
                  itemScope
                  itemType="https://schema.org/Person"
                  className="rounded-2xl bg-[#121215] border border-slate-800 hover:border-red-600/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-red-950/30 group"
                >
                  <meta itemProp="worksFor" content="ARDM Academy" />
                  <div className="space-y-4">
                    {/* Header with Initial Emblem & Role Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.initialBg} flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform shrink-0`}
                        >
                          {f.initial}
                        </div>
                        <div>
                          <h4 itemProp="name" className="text-base sm:text-lg font-extrabold text-white leading-tight">
                            {f.name}
                          </h4>
                          <span
                            itemProp="jobTitle"
                            className="text-[11px] font-bold text-red-400 uppercase tracking-wide block mt-0.5"
                          >
                            {f.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SubRole if available (e.g. Mohim Das - Founder & CEO CodeLX) */}
                    {f.subRole && (
                      <div className="p-2 rounded-lg bg-purple-950/50 border border-purple-800/60 text-[11px] text-purple-200 font-semibold leading-snug">
                        {f.subRole}
                      </div>
                    )}

                    {/* Specialization Pill */}
                    <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium">
                      <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{f.specialty}</span>
                    </div>

                    {/* Bio Description */}
                    <p itemProp="description" className="text-xs text-white/90 leading-relaxed font-normal">
                      {f.description}
                    </p>
                  </div>

                  {/* Footer: Contacts & Action */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2">
                    <a
                      href={`mailto:${f.email}`}
                      className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-white transition-colors"
                      title={`Email ${f.name}`}
                    >
                      <Mail className="w-3 h-3 text-red-400" />
                      <span className="truncate">{f.email}</span>
                    </a>

                    {/* View Individual Founder Profile Button */}
                    <div className="pt-1 flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenFounderModal?.(f.id)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-red-950/80 border border-slate-800 hover:border-red-600/60 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <span>View Profile & Role</span>
                        <ExternalLink className="w-3 h-3 text-red-400" />
                      </button>

                      {f.isWorkshopManager && onOpenWorkshopManager && (
                        <button
                          type="button"
                          onClick={onOpenWorkshopManager}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-purple-950/70 hover:bg-purple-900/80 border border-purple-800/60 text-purple-200 text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <span>Explore AI Workshop Manager</span>
                          <ExternalLink className="w-2.5 h-2.5 text-purple-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Acronym Full-Width Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-red-950/70 via-slate-900 to-red-950/70 border border-red-700/50 p-4 sm:p-6 text-center text-white shadow-xl mb-12">
            <p className="text-xs sm:text-sm font-mono text-red-300 uppercase tracking-widest font-bold mb-1">
              Unity of Four Founders • West Bengal Board & Computer Science
            </p>
            <h4 className="text-lg sm:text-xl md:text-2xl font-black text-white">
              <span className="text-[#FF9933]">A</span>kash Paik •{' '}
              <span className="text-rose-400">R</span>upam Paul •{' '}
              <span className="text-emerald-400">D</span>evnath Pramanick •{' '}
              <span className="text-purple-400">M</span>ohim Das
            </h4>
            <p className="text-xs text-white/80 mt-2 max-w-xl mx-auto">
              Four founders jointly leading ARDM Academy with dedication to student success, stress-free board exams, and forward-looking digital skills.
            </p>
            <div className="mt-3.5 flex items-center justify-center">
              <button
                type="button"
                onClick={() => onOpenFounderModal?.('all')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Meet All 4 Founders & Educational Vision</span>
              </button>
            </div>
          </div>

          {/* 9 Pillars from Section 15 SEO Audit */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-400 mb-4 font-mono">
              The ARDM Learning Ecosystem & Philosophy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  title: 'Our Core Philosophy',
                  desc: (
                    <span>
                      <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg bg-black text-[11px] mr-1 border border-slate-800 shadow-xs">
                        <span className="text-[#FF9933]">Learn.</span>
                        <span className="text-white">Practice.</span>
                        <span className="text-[#22C55E]">Improve.</span>
                      </span>
                      Structured repetition and conceptual mastery.
                    </span>
                  ),
                },
                { title: 'Dada-Didi Mentorship', desc: 'Empathetic guidance from high-scoring seniors who understand exam pressure.' },
                { title: 'Top Exam Analytics', desc: 'Granular speed, accuracy, and negative marking feedback on every mock test.' },
                { title: 'Free Education', desc: 'Curriculum video classes and notes for Classes 5 to 10 with zero fee barriers.' },
                { title: 'Free AI Webinars', desc: 'Monthly live sessions introducing youth to modern AI tools, prompt craft & tech.' },
                { title: 'Paid AI & Coding Learning', desc: 'Hands-on practical Python, logic building, and web development masterclasses.' },
                { title: 'Verified Certificates', desc: 'Digital completion credentials for course scholars and workshop attendees.' },
                { title: 'Easy Notes & Blueprints', desc: 'Chapter-wise summary formulas, Madhyamik suggestions, and revision guides.' },
                { title: 'Friendly Learning', desc: 'Zero intimidation: every doubt is treated with patience, kindness, and clarity.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#141418] border border-slate-800 hover:border-red-900/60 transition-colors">
                  <h5 className="text-xs font-bold text-white mb-1">{item.title}</h5>
                  <div className="text-[11px] text-white/90 leading-normal font-normal">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
