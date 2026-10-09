import React, { useState, useEffect } from 'react';
import {
  BrainCircuit,
  Calendar,
  Clock,
  User,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Video,
} from 'lucide-react';
import { getWebinar } from '../../services/storage';
import { WebinarItem } from '../../types';

interface AIWebinarSectionProps {
  onOpenWorkshopManager?: () => void;
}

export const AIWebinarSection: React.FC<AIWebinarSectionProps> = ({ onOpenWorkshopManager }) => {
  const [webinar, setWebinar] = useState<WebinarItem | null>(null);

  useEffect(() => {
    setWebinar(getWebinar());
  }, []);

  if (!webinar) return null;

  const hasJoinLink = Boolean(webinar.meetingLink && webinar.meetingLink.trim().length > 5 && webinar.isPublished);

  return (
    <section id="webinar" className="py-20 bg-gradient-to-br from-[#1c080b] via-[#0e090b] to-[#180a0c] text-white relative overflow-hidden border-y border-red-950/40">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-400/30 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Access Tech Masterclass</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            {webinar.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl">
            {webinar.description}
          </p>

          {/* Details Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center shrink-0 border border-red-900/40">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-white/90 uppercase font-mono block font-semibold">Date</span>
                <span className="text-xs font-bold text-white">{webinar.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center shrink-0 border border-red-900/40">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-white/90 uppercase font-mono block font-semibold">Schedule</span>
                <span className="text-xs font-bold text-white">{webinar.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center shrink-0 border border-red-900/40">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-white/90 uppercase font-mono block font-semibold">Mentor & Speaker</span>
                <span className="text-xs font-bold text-white">{webinar.speaker}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            {hasJoinLink ? (
              <a
                href={webinar.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs tracking-wide shadow-lg transition-all active:scale-98"
              >
                <Video className="w-4 h-4" />
                <span>Join AI & Coding Webinar</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-semibold">
                <Clock className="w-4 h-4" />
                <span>Webinar Registration Coming Soon</span>
              </div>
            )}

            {onOpenWorkshopManager && (
              <button
                onClick={onOpenWorkshopManager}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs border border-red-500/40 hover:border-red-400 transition-all cursor-pointer shadow-md"
              >
                <User className="w-4 h-4 text-red-400" />
                <span>Explore Workshop Manager (Mohim Das)</span>
              </button>
            )}

            <div className="flex items-center gap-2 text-xs text-white/95 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Free • Interactive Q&A • Certificate of Participation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
