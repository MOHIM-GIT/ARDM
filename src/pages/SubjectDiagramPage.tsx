import React from 'react';
import { SubjectUltraDiagramSection } from '../components/home/SubjectUltraDiagramSection';
import { SEOHead } from '../components/seo/SEOHead';
import { ArrowLeft, BookOpen, Sparkles, GraduationCap } from 'lucide-react';

interface SubjectDiagramPageProps {
  onNavigate: (path: string) => void;
  onOpenTestEngine?: (subjectId?: string) => void;
}

export const SubjectDiagramPage: React.FC<SubjectDiagramPageProps> = ({
  onNavigate,
  onOpenTestEngine,
}) => {
  return (
    <div className="min-h-screen bg-[#090D16] text-white pt-20 pb-16">
      <SEOHead
        title="Subject-Wise Ultra Diagram & Blueprint | ARDM Academy"
        description="Comprehensive interactive subject-wise ultra diagram, question weightage flow, 6-axis mastery radar, and high-yield concept trees for Class 10 Board exams."
        canonical="https://ardmacademy.in/subject-diagram"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-white/90 hover:text-white hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white/90 hover:text-white text-xs font-semibold transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1.5"
            >
              <span>Print Study Sheet</span>
            </button>
            {onOpenTestEngine && (
              <button
                onClick={() => onOpenTestEngine(undefined)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Practice CBT Exam</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <SubjectUltraDiagramSection
        onOpenTestEngine={onOpenTestEngine}
        onNavigate={onNavigate}
      />
    </div>
  );
};
