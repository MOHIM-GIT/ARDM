import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Code,
  Binary,
  Cpu,
  Laptop,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { getWhatsAppLink } from '../config/siteConfig';

interface ComputerSciencePageProps {
  onNavigate: (path: string) => void;
  onOpenRegistration: (subjectId?: string) => void;
}

export const ComputerSciencePage: React.FC<ComputerSciencePageProps> = ({
  onNavigate,
  onOpenRegistration,
}) => {
  const csModules = [
    {
      title: 'Python Programming Essentials',
      desc: 'Variables, loops, conditionals, functions, lists, and real-world script writing.',
      topics: ['Syntax & Logic', 'Data Structures', 'Problem Solving', 'Mini Projects'],
    },
    {
      title: 'Binary Arithmetic & Boolean Logic',
      desc: 'Base conversions, logic gates (AND, OR, NOT, XOR), truth tables, and digital architecture.',
      topics: ['Base 2 / 8 / 16 Conversions', 'Logic Simplification', 'De Morgan Laws', 'Circuits'],
    },
    {
      title: 'Algorithm Design & Flowcharts',
      desc: 'Structured thinking, pseudo-code writing, sorting algorithms, and complexity awareness.',
      topics: ['Flowchart Notation', 'Linear Search', 'Binary Search', 'Bubble Sort'],
    },
    {
      title: 'Web Fundamentals & HTML/CSS',
      desc: 'Understanding the web stack: building modern responsive pages and web interfaces.',
      topics: ['Semantic HTML5', 'Tailwind & Flexbox', 'DOM & Scripts', 'Deployment'],
    },
  ];

  const csSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'Computer Science & Practical Coding Program',
    'description': 'Comprehensive computer science education covering Python, binary mathematics, logic gates and algorithm design.',
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'ARDM Academy',
      'url': 'https://ardmacademy.netlify.app',
    },
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="Computer Science & Coding | ARDM Academy"
        description="Learn Computer Science, Python programming, binary logic, algorithms, and practical computing at ARDM Academy."
        canonical="https://ardmacademy.netlify.app/computer-science"
        breadcrumbs={[
          { name: 'Courses', path: '/courses' },
          { name: 'Computer Science', path: '/computer-science' },
        ]}
        schema={csSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Courses', path: '/courses' },
          { name: 'Computer Science', path: '/computer-science' },
        ]}
        onNavigate={onNavigate}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <header className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Binary className="w-3.5 h-3.5" />
            <span>Digital Skills Foundation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Computer Science, Logic & Modern Coding
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Move beyond memorization. Build logical thinking, write real computer programs, and master Class 10 computer science examination curricula.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenRegistration('sub_comp')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98"
            >
              Enroll in CS Mock Exam (₹100)
            </button>
            <a
              href={getWhatsAppLink('Hello ARDM Academy, I want to learn more about the Computer Science coding program.')}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 shadow-2xs transition-colors"
            >
              Inquire via WhatsApp
            </a>
          </div>
        </header>

        {/* 4 Curriculum Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {csModules.map((mod, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Code className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">{mod.title}</h2>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">{mod.desc}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                {mod.topics.map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
