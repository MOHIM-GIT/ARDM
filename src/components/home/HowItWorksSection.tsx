import React from 'react';
import {
  ClipboardCheck,
  BookOpenCheck,
  Laptop2,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HowItWorksSectionProps {
  onStartRegistration: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartRegistration }) => {
  const steps = [
    {
      step: '01',
      title: 'Select Your Subjects',
      desc: 'Choose from 8 Class 10 academic and computer science subjects. Dynamic transparent fee of ₹100 per subject.',
      icon: ClipboardCheck,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      step: '02',
      title: 'Dada-Didi Mentorship',
      desc: 'Attend interactive guidance sessions, doubt resolution clinics, and access formula revision kits.',
      icon: BookOpenCheck,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      step: '03',
      title: 'Live CBT Exam Simulator',
      desc: 'Take timed practice examinations matching latest board weightage with automated question palettes.',
      icon: Laptop2,
      color: 'bg-cyan-50 text-cyan-700',
    },
    {
      step: '04',
      title: 'Merit Ranks & Scorecard',
      desc: 'Receive instant scorecard analysis, review detailed explanations, and qualify for state top 10 badges.',
      icon: Award,
      color: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Structured Learning Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How ARDM Academy Works
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From initial registration to exam day confidence — a step-by-step roadmap tailored for Class 10 students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-indigo-400 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-indigo-600">
                    Phase {item.step}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartRegistration}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98"
          >
            <span>Begin Your Registration Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
