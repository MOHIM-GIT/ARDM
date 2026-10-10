import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AIWebinarSection } from '../components/home/AIWebinarSection';
import { Sparkles, Calendar, Laptop, Award } from 'lucide-react';

interface WebinarsPageProps {
  onNavigate: (path: string) => void;
}

export const WebinarsPage: React.FC<WebinarsPageProps> = ({ onNavigate }) => {
  const webinarSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Free AI & Python Programming Webinar for Students',
    description: 'Live interactive coding and Artificial Intelligence masterclass conducted by ARDM Academy.',
    startDate: '2026-10-15T18:00:00+05:30',
    endDate: '2026-10-15T20:00:00+05:30',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://ardmacademy.netlify.app/webinars',
    },
    organizer: {
      '@type': 'EducationalOrganization',
      name: 'ARDM Academy',
      url: 'https://ardmacademy.netlify.app',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="Free AI Webinars & Coding Masterclasses | ARDM Academy"
        description="Join free live Artificial Intelligence, Data Science, and Python programming workshops for school and college students at ARDM Academy."
        canonical="https://ardmacademy.netlify.app/webinars"
        breadcrumbs={[{ name: 'Webinars', path: '/webinars' }]}
        schema={webinarSchema}
      />

      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'AI & Webinars', path: '/webinars' }]} onNavigate={onNavigate} />

      <AIWebinarSection />
    </div>
  );
};
