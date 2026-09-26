import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SubjectPYQSection } from '../components/home/SubjectPYQSection';
import { FileText, Download, CheckCircle2, ArrowRight } from 'lucide-react';

interface PYQsPageProps {
  onNavigate: (path: string) => void;
  onOpenAdmin?: () => void;
}

export const PYQsPage: React.FC<PYQsPageProps> = ({ onNavigate, onOpenAdmin }) => {
  const pyqSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'Class 10 Madhyamik Previous Year Questions & Answer Keys (PYQs)',
    description: 'Download chapter-wise solved question papers and board exam marking schemes from ARDM Academy.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'ARDM Academy',
      sameAs: 'https://ardmacademy.in',
    },
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="Class 10 PYQs & Question Papers | ARDM Academy"
        description="Download Class 10 Madhyamik previous year question papers (2018-2025), subject-wise solved answer keys, and model solutions at ARDM Academy."
        canonical="https://ardmacademy.in/pyqs"
        breadcrumbs={[{ name: 'PYQs', path: '/pyqs' }]}
        schema={pyqSchema}
      />

      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'PYQs', path: '/pyqs' }]} onNavigate={onNavigate} />

      <SubjectPYQSection onOpenAdmin={onOpenAdmin || (() => {})} />
    </div>
  );
};
