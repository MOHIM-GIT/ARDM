import React, { useState, useEffect } from 'react';
import {
  FileText,
  ExternalLink,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Atom,
  Dna,
  Globe,
  Scroll,
  Languages,
  Binary,
} from 'lucide-react';
import { getPYQs } from '../../services/storage';
import { PYQItem } from '../../types';

interface SubjectPYQSectionProps {
  onOpenAdmin?: () => void;
  onNavigate?: (path: string) => void;
}

export const SubjectPYQSection: React.FC<SubjectPYQSectionProps> = ({ onOpenAdmin, onNavigate }) => {
  const [pyqs, setPyqs] = useState<PYQItem[]>([]);

  useEffect(() => {
    setPyqs(getPYQs());
  }, []);

  // Icon mapping
  const renderSubjectIcon = (subName: string) => {
    const s = subName.toLowerCase();
    if (s.includes('math')) return <Calculator className="w-5 h-5 text-blue-600" />;
    if (s.includes('phys')) return <Atom className="w-5 h-5 text-indigo-600" />;
    if (s.includes('life')) return <Dna className="w-5 h-5 text-emerald-600" />;
    if (s.includes('hist')) return <BookOpen className="w-5 h-5 text-amber-600" />;
    if (s.includes('geog')) return <Globe className="w-5 h-5 text-cyan-600" />;
    if (s.includes('beng')) return <Scroll className="w-5 h-5 text-rose-600" />;
    if (s.includes('eng')) return <Languages className="w-5 h-5 text-purple-600" />;
    if (s.includes('comp')) return <Binary className="w-5 h-5 text-blue-600" />;
    return <FileText className="w-5 h-5 text-indigo-600" />;
  };

  return (
    <section id="pyqs" className="py-20 bg-slate-50/70 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Class 10 Board Archive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Subject-wise Previous Year Questions (PYQ)
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Targeted board exam paper archives, verified question patterns, and marking schemes curated by ARDM Academy faculty.
          </p>
        </div>

        {/* 8 Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pyqs.map((item) => {
            const hasValidLink = Boolean(item.url && item.url.trim().length > 5 && item.isEnabled);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
                      {renderSubjectIcon(item.subjectName)}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.yearRange}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {item.subjectName}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {hasValidLink ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-2xs"
                    >
                      <span>View PYQs</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note banner & Ultra Diagram Crosslink */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 border border-blue-900/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">
                Analyze Subject Weightage, Radial Blueprints & Mastery Radar
              </span>
              <span className="text-white/80 text-[11px]">
                Explore our interactive Subject-Wise Ultra Diagram with chapter mark distribution and 6-axis mastery charts.
              </span>
            </div>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/subject-diagram')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore Ultra Diagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
