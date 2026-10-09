import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  BrainCircuit,
  Bot,
  LineChart,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { getWhatsAppLink } from '../config/siteConfig';

interface AIPageProps {
  onNavigate: (path: string) => void;
}

export const AIPage: React.FC<AIPageProps> = ({ onNavigate }) => {
  const aiSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'Artificial Intelligence & Data Science Starter Program',
    'description': 'Student-friendly introduction to prompt engineering, neural networks, computer vision and data analytics.',
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'ARDM Academy',
      'url': 'https://ardmacademy.in',
    },
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="AI & Data Science Learning | ARDM Academy"
        description="Explore Artificial Intelligence, Machine Learning fundamentals, and Data Science workshops tailored for young tech innovators at ARDM Academy."
        canonical="https://ardmacademy.in/ai"
        breadcrumbs={[
          { name: 'Courses', path: '/courses' },
          { name: 'AI & Data Science', path: '/ai' },
        ]}
        schema={aiSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Courses', path: '/courses' },
          { name: 'AI & Data Science', path: '/ai' },
        ]}
        onNavigate={onNavigate}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <header className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
            <span>Next-Generation Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Artificial Intelligence & Data Science Labs
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Understand how AI models see, learn, and reason. We break down machine learning, neural networks, and prompt engineering into interactive, intuitive experiments for young scholars.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={getWhatsAppLink('Hello ARDM Academy, I would like to register for the AI & Machine Learning Workshop.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98"
            >
              <span>Join AI Masterclass</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onNavigate('/workshop-manager')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700 shadow-md transition-all cursor-pointer"
            >
              <span>Explore Workshop Manager (Mohim Das)</span>
            </button>
          </div>
        </header>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">How Machine Learning Works</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Supervised vs Unsupervised learning, image classification with neural nets, and training models with real datasets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <LineChart className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Data Analytics & Insights</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Data cleaning, statistical distributions, plotting curves, and making predictions with Python Pandas & Matplotlib.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Generative AI & LLMs</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Prompt design, multimodal image generation, text tokenization, and ethical AI development practices.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
