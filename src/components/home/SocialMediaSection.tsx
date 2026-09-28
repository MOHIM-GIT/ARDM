import React from 'react';
import {
  MessageCircle,
  ExternalLink,
  Share2,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const SocialMediaSection: React.FC = () => {
  const channels = [
    {
      name: 'WhatsApp Channel',
      desc: 'Instant board exam alerts, daily practice questions, formula PDFs, and syllabus notifications.',
      url: SITE_CONFIG.social.whatsappChannel,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Official Broadcast',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.996.586 3.86 1.6 5.437L2.4 22l4.697-1.19a9.98 9.98 0 004.934 1.258h.004c5.535 0 10.03-4.496 10.03-10.032C22.065 6.495 17.568 2 12.031 2zm5.836 14.28c-.244.686-1.42 1.309-1.96 1.39-.516.076-1.18.109-1.905-.123-.443-.142-1.014-.333-1.745-.65-3.08-1.334-5.093-4.437-5.247-4.64-.153-.203-1.253-1.667-1.253-3.178 0-1.512.793-2.257 1.074-2.563.282-.305.617-.382.824-.382.207 0 .413.002.593.01.19.01.444-.072.695.53.257.618.88 2.146.957 2.302.077.157.128.34.025.545-.102.204-.153.332-.305.51-.153.18-.323.402-.461.54-.154.153-.314.32-.135.626.18.305.798 1.317 1.71 2.13 1.173 1.045 2.162 1.368 2.468 1.52.306.154.486.128.666-.078.18-.205.77-1.008.974-1.353.205-.346.41-.29.686-.188.277.102 1.758.829 2.062.98.305.154.508.23.584.358.077.128.077.74-.167 1.426z" />
        </svg>
      ),
    },
    {
      name: 'YouTube Channel',
      desc: 'Free chapter-wise video masterclasses, theorem deductions, and numerical problem solving.',
      url: SITE_CONFIG.social.youtube,
      color: 'from-red-600 to-rose-700',
      badge: 'Video Masterclasses',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Facebook Community',
      desc: 'Official updates, topper announcements, educational guidance sessions, and event live streams.',
      url: SITE_CONFIG.social.facebook,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Community & Events',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram Channel',
      desc: 'Daily revision reels, memory diagrams, formula cheat cards, and student success highlights.',
      url: SITE_CONFIG.social.instagram,
      color: 'from-pink-600 via-purple-600 to-indigo-600',
      badge: 'Daily Revision Reels',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-semibold">
            <Share2 className="w-3.5 h-3.5" />
            <span>Connect Across Platforms</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Follow ARDM Academy on Social Media
          </h2>
          <p className="text-xs sm:text-sm text-slate-100 font-medium">
            Join thousands of Class 10 candidates receiving daily syllabus updates, free formula cards, and video guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((ch, idx) => (
            <a
              key={idx}
              href={ch.url}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${ch.color} text-white flex items-center justify-center shadow-xs`}>
                    {ch.icon}
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {ch.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1 group-hover:text-red-400 transition-colors">
                  <span>{ch.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </h3>
                <p className="text-xs text-slate-100 leading-relaxed font-normal">
                  {ch.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>Join Official {ch.name.split(' ')[0]}</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
