import React from 'react';
import { Target, Compass, Sparkles, Check, GraduationCap } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About ARDM Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Building Confidence Through Education & Mentorship
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            ARDM Academy is an educational initiative dedicated to providing structured academic coaching,
            state-standard Class 10 mock examinations, and practical technology education.
          </p>
        </div>

        {/* 2-Column Story & Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="prose prose-slate max-w-none text-slate-600 text-base leading-relaxed space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <span>What is ARDM Academy? (ARDM Academy Ta Ki?)</span>
              </h3>
              <p>
                Many students prepare hard for Class 10 board examinations, but struggle with time management,
                exam temperament, and question framing. ARDM Academy bridges this gap by creating real-feel mock
                tests, providing in-depth analysis, and offering clear educational guidance.
              </p>
              <p>
                Through our collaborative <span className="font-semibold text-slate-900">“Dada-Didi Class”</span> mentorship philosophy,
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
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Mission, Vision, and Faculty Placeholder */}
          <div className="lg:col-span-6 space-y-6">
            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-50/80 to-rose-50/50 dark:from-[#181013] dark:to-[#121215] border border-red-100/80 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Our Mission</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  To democratize quality board exam preparation and digital literacy so that every student, regardless of background, can compete at the highest level.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50/80 to-red-50/50 dark:from-[#181013] dark:to-[#121215] border border-rose-100/80 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Our Vision</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  To foster a generation of curious thinkers, skilled problem solvers, and board toppers equipped with both traditional academic strength and digital fluency.
                </p>
              </div>
            </div>

            {/* Founders & Leadership Card */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-lg border border-slate-800">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">Founders & Leadership</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 font-semibold">
                    ARDM Founders
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Founded by Educators & Technologists</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    United by a single vision: bringing top-tier Class 10 board preparation, Dada-Didi mentorship, and modern digital education to every student.
                  </p>
                </div>

                {/* 4 Founders Grid (SEO Optimized with Schema.org Microdata) */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div itemScope itemType="https://schema.org/Person" className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/70">
                    <p itemProp="name" className="font-bold text-xs text-white">Akash Paik</p>
                    <p itemProp="jobTitle" className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Founder</p>
                    <meta itemProp="worksFor" content="ARDM Academy" />
                  </div>
                  <div itemScope itemType="https://schema.org/Person" className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/70">
                    <p itemProp="name" className="font-bold text-xs text-white">Rupam Paul</p>
                    <p itemProp="jobTitle" className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Founder</p>
                    <meta itemProp="worksFor" content="ARDM Academy" />
                  </div>
                  <div itemScope itemType="https://schema.org/Person" className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/70">
                    <p itemProp="name" className="font-bold text-xs text-white">Devnath Pramanick</p>
                    <p itemProp="jobTitle" className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Founder</p>
                    <meta itemProp="worksFor" content="ARDM Academy" />
                  </div>
                  <div itemScope itemType="https://schema.org/Person" className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/70">
                    <p itemProp="name" className="font-bold text-xs text-white">Mohim Das</p>
                    <p itemProp="jobTitle" className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Founder</p>
                    <meta itemProp="worksFor" content="ARDM Academy" />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Mentor Panel: Sciences, Humanities, Math & CS</span>
                  <span className="text-cyan-300 font-semibold">{SITE_CONFIG.name}</span>
                </div>
              </div>
            </div>
            {/* 9 Pillars from Section 15 SEO Audit */}
            <div className="pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-red-700 dark:text-red-400 mb-4 font-mono">
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
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141418] border border-slate-200/80 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900/60 transition-colors">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
