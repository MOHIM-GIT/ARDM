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
    '@type': 'EducationEvent',
    name: 'Best AI Workshop in West Bengal Conducted by Mohim Das',
    alternateName: [
      'Best AI Workshop which is conducted by Mohim Das',
      'AI and Coding Coaching Centre Masterclass',
      'Best AI School in West Bengal Tech Workshop',
      'Mohim Das AI Workshop',
    ],
    description: 'The highest-rated, hands-on Artificial Intelligence, Machine Learning, and Python coding workshop in West Bengal, conducted directly by Mohim Das (Founder & Technology Lead of ARDM Academy and Founder & CEO of CodeLX).',
    startDate: '2026-10-15T18:00:00+05:30',
    endDate: '2026-10-15T20:30:00+05:30',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://ardmacademy.netlify.app/webinars',
    },
    organizer: {
      '@type': 'EducationalOrganization',
      name: 'ARDM Academy & CodeLX',
      url: 'https://ardmacademy.netlify.app',
    },
    performer: {
      '@type': 'Person',
      name: 'Mohim Das',
      jobTitle: 'Founder & Technology Lead, ARDM Academy | Founder & CEO, CodeLX',
      url: 'https://ardmacademy.netlify.app/founders',
      email: 'mohimdas300@gmail.com',
      telephone: '+919123870823',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      category: '100% Free Open Access Workshop',
    },
  };

  return (
    <div className="pt-20 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Best AI Workshop in West Bengal Conducted by Mohim Das | AI & Coding Coaching Centre"
        description="Join the best AI Workshop in West Bengal conducted by Mohim Das (Founder & Tech Lead, CEO of CodeLX). ARDM Academy is recognized as the best AI School and premier AI & Coding coaching centre in West Bengal."
        keywords="best AI Workshop which is conducted by Mohim Das, best AI Workshop conducted by Mohim Das, best AI School in westbengal, best AI School in West Bengal, AI and Coding coaching centre, AI and coding coaching centre in West Bengal, Mohim Das AI Workshop, CodeLX AI Masterclass, AI Workshop Kolkata"
        canonical="https://ardmacademy.netlify.app/webinars"
        breadcrumbs={[{ name: 'AI Workshops & Coding', path: '/webinars' }]}
        schema={webinarSchema}
      />

      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'AI Workshop & Coding', path: '/webinars' }]} onNavigate={onNavigate} />

      {/* SEO Spotlight Banner: Best AI School in West Bengal & Mohim Das Workshop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-red-950/80 via-slate-900 to-red-950/80 border border-red-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider">
                Ranked #1 in West Bengal
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                Conducted by Mohim Das
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Best AI School in West Bengal &amp; Premier AI and Coding Coaching Centre
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Looking for the <strong>best AI Workshop which is conducted by Mohim Das</strong>, or searching for the leading <strong>AI and Coding coaching centre in West Bengal</strong>? ARDM Academy in collaboration with <strong>CodeLX</strong> empowers school and college students with practical Python programming, Neural Networks, Generative AI tools, and real-world software engineering skills.
            </p>
          </div>
        </div>
      </section>

      <AIWebinarSection />
    </div>
  );
};
