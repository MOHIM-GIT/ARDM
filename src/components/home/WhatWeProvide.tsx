import React, { useState } from 'react';
import {
  Calculator,
  Atom,
  Dna,
  BookOpen,
  Globe,
  Scroll,
  Languages,
  Binary,
  Code,
  Bot,
  LineChart,
  Laptop,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  GraduationCap,
} from 'lucide-react';
import { DEFAULT_SUBJECTS, TECH_EDUCATION_COURSES } from '../../services/storage';

interface WhatWeProvideProps {
  onRegisterSubject: (subjectId: string) => void;
}

export const WhatWeProvide: React.FC<WhatWeProvideProps> = ({ onRegisterSubject }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'tech'>('all');
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    category: string;
    desc: string;
    highlights: string[];
    isMockSubject?: boolean;
    subjectId?: string;
  } | null>(null);

  // Icon mapping
  const renderIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className={className} />;
      case 'Atom':
        return <Atom className={className} />;
      case 'Dna':
        return <Dna className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'Scroll':
        return <Scroll className={className} />;
      case 'Languages':
        return <Languages className={className} />;
      case 'Binary':
        return <Binary className={className} />;
      case 'Code':
        return <Code className={className} />;
      case 'Bot':
        return <Bot className={className} />;
      case 'LineChart':
        return <LineChart className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      default:
        return <GraduationCap className={className} />;
    }
  };

  return (
    <section id="what-we-provide" className="py-20 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum & Learning Tracks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What We Provide
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            A comprehensive dual-track education model combining rigorous board academic excellence with future-ready computer & tech literacy.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'academic'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Academic Education (Class 10)
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'tech'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Technology & AI Education
            </button>
          </div>
        </div>

        {/* 1. Academic Education Cards */}
        {(activeTab === 'all' || activeTab === 'academic') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>Academic Education (Class 10 Board Subjects)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full syllabus coaching, practice tests, problem-solving clinics, and mock examination modules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DEFAULT_SUBJECTS.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Icon & Category Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                        {renderIcon(subject.icon, 'w-5 h-5')}
                      </div>
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-full">
                        ₹{subject.price} Mock Fee
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                      {subject.name}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {subject.description}
                    </p>

                    {/* Syllabus Tags */}
                    {subject.syllabusHighlights && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {subject.syllabusHighlights.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() =>
                        setSelectedItem({
                          title: subject.name,
                          category: 'Academic Education',
                          desc: subject.description,
                          highlights: subject.syllabusHighlights || [],
                          isMockSubject: true,
                          subjectId: subject.id,
                        })
                      }
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors py-1 px-2"
                    >
                      Syllabus Info
                    </button>

                    <button
                      onClick={() => onRegisterSubject(subject.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <span>Take Test</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Technology Education Cards */}
        {(activeTab === 'all' || activeTab === 'tech') && (
          <div id="tech-courses">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <span>Technology Education & Digital Skills</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Computer Science, Python, Artificial Intelligence, Data awareness and hands-on tech labs for young innovators.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TECH_EDUCATION_COURSES.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white transition-colors flex items-center justify-center">
                        {renderIcon(course.icon, 'w-6 h-6')}
                      </div>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {course.level}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {course.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-indigo-50/50 text-indigo-700 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() =>
                        setSelectedItem({
                          title: course.title,
                          category: 'Technology Education',
                          desc: course.description,
                          highlights: course.tags,
                        })
                      }
                      className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors py-1 px-2"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        setSelectedItem({
                          title: course.title,
                          category: 'Technology Education',
                          desc: course.description,
                          highlights: course.tags,
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-1.5 rounded-lg transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal / Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase">
                {selectedItem.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">{selectedItem.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">{selectedItem.desc}</p>

            <div className="mb-6">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Key Topics & Learning Outcomes
              </h5>
              <div className="space-y-1.5">
                {selectedItem.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              {selectedItem.isMockSubject && selectedItem.subjectId && (
                <button
                  onClick={() => {
                    const id = selectedItem.subjectId!;
                    setSelectedItem(null);
                    onRegisterSubject(id);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                >
                  Register Mock Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
