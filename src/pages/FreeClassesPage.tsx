import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FreeClassesSection } from '../components/home/FreeClassesSection';
import { OnlineFreeClassesBookingSection } from '../components/home/OnlineFreeClassesBookingSection';
import { Video, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { getFreeClasses } from '../services/storage';

interface FreeClassesPageProps {
  onNavigate: (path: string) => void;
}

export const FreeClassesPage: React.FC<FreeClassesPageProps> = ({ onNavigate }) => {
  const allVideos = getFreeClasses().filter((v) => v.isPublished);

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ARDM Academy Free Educational Video Masterclasses',
    itemListElement: allVideos.slice(0, 8).map((v, i) => ({
      '@type': 'VideoObject',
      position: i + 1,
      name: v.title,
      description: v.description,
      thumbnailUrl: v.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      uploadDate: v.publishDate || '2026-09-01',
      contentUrl: v.youtubeUrl,
      embedUrl: v.youtubeUrl.replace('watch?v=', 'embed/'),
    })),
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="Free Education Classes 5 to 10 | ARDM Academy"
        description="Stream free video lectures, board exam concept breakdowns, chapter-wise notes, and faculty mentoring for Classes 5, 6, 7, 8, 9, and 10 at ARDM Academy."
        canonical="https://ardmacademy.netlify.app/free-classes"
        breadcrumbs={[{ name: 'Free Classes', path: '/free-classes' }]}
        schema={videoSchema}
      />

      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Free Classes', path: '/free-classes' }]} onNavigate={onNavigate} />

      {/* Class Level Shortcuts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
          <span className="text-xs font-mono font-bold uppercase text-slate-400 block mb-3">
            Explore Free Classes by Grade:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {['class-10', 'class-9', 'class-8', 'class-7', 'class-6', 'class-5'].map((cl) => {
              const label = cl.replace('-', ' ').toUpperCase();
              return (
                <a
                  key={cl}
                  href={`/classes/${cl}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/classes/${cl}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{label} Hub</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dedicated WBBSE Online Free Classes Live Booking & Helpline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <OnlineFreeClassesBookingSection onNavigate={onNavigate} />
      </div>

      {/* Embedded Video Studio Player & Playlist */}
      <FreeClassesSection />
    </div>
  );
};
