import React, { useState, useEffect } from 'react';
import {
  Play,
  Video,
  Sparkles,
  ExternalLink,
  BookOpen,
  MonitorPlay,
  Film,
  Download,
  FileText,
  GraduationCap,
  Clock,
  CheckCircle2,
  PhoneCall,
  Phone,
  Flame,
  MessageCircle,
} from 'lucide-react';
import { getFreeClasses, getFreeClassesDisplayMode } from '../../services/storage';
import { FreeClassVideo, FreeClassesDisplayMode } from '../../types';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfaShqjqwxM7v7nlHixgApJzjJDBwipl4RC7M5B1LxlgRVP7Q/viewform?usp=publish-editor';

export const FreeClassesSection: React.FC = () => {
  const [classes, setClasses] = useState<FreeClassVideo[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<FreeClassVideo | null>(null);
  const [displayMode, setDisplayMode] = useState<FreeClassesDisplayMode>('coming_soon');

  useEffect(() => {
    const syncMode = () => {
      setDisplayMode(getFreeClassesDisplayMode());
    };
    syncMode();

    const list = getFreeClasses().filter((c) => c.isPublished);
    setClasses(list);
    const featured = list.find((c) => c.isFeatured) || list[0] || null;
    setActiveVideo(featured);

    window.addEventListener('ardm_free_classes_mode_updated', syncMode);
    return () => window.removeEventListener('ardm_free_classes_mode_updated', syncMode);
  }, []);

  // Extract YouTube ID helper
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : 'zYGjsevcofw';
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  };

  const classList = ['All', 'Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6', 'Class 5'];
  const subjectList = ['All', 'Mathematics', 'Physical Science', 'Life Science', 'Computer & AI', 'Languages'];

  const filtered = classes.filter((c) => {
    const matchClass = selectedClass === 'All' || c.studentClass === selectedClass;
    const matchSubject =
      selectedSubject === 'All' ||
      c.subject.toLowerCase().includes(selectedSubject.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(selectedSubject.toLowerCase()));
    return matchClass && matchSubject;
  });

  if (displayMode === 'hidden') {
    return null;
  }

  if (displayMode === 'coming_soon') {
    return (
      <section id="free-classes" className="py-20 bg-slate-900 border-b border-slate-800 relative text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Live Slot Booking Callout Banner */}
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border border-red-500/40 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  WBBSE Class 8, 9, 10 Online Free Live Classes
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                দাদা-দিদির সাথে সম্পূর্ণ ফ্রি লাইভ ক্লাস ও ২৪x৭ ডাউট সলভিং
              </h3>
              <p className="text-xs text-slate-300">
                ফ্রি নোটস, ফ্রি কাউন্সেলিং ও ১০০% কমন সাজেস্টিভ প্রশ্ন পেতে এখনই আপনার সিট বুক করুন।
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <a
                href="tel:6289139984"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-red-500/50 hover:border-red-400 transition-colors shadow-xs"
                title="Call 6289139984 Directly"
              >
                <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>Call: 6289139984</span>
              </a>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-md hover:scale-102"
              >
                <span>Seat Book Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Coming Soon Featured Showcase Box */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 right-10 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <Clock className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>COMING SOON • UNDER PREPARATION</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Free Education &amp; YouTube Classes <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-red-400">
                  (Classes 5 to 10)
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Comprehensive chapter-by-chapter video lectures, Madhyamik 2026 suggestive prediction classes, concept blueprints, and downloadable PDF study notes are currently being recorded and scheduled by our senior faculty mentors.
              </p>

              {/* Status Notice Pill */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Official release in progress. Videos will stream here immediately once published by the administration.
                </span>
              </div>

              {/* Grade Badges Grid */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { grade: 'Class 10', tag: 'Madhyamik', color: 'border-red-500/40 text-red-300' },
                  { grade: 'Class 9', tag: 'Annual Board', color: 'border-rose-500/40 text-rose-300' },
                  { grade: 'Class 8', tag: 'Core Science', color: 'border-emerald-500/40 text-emerald-300' },
                  { grade: 'Class 7', tag: 'Foundations', color: 'border-blue-500/40 text-blue-300' },
                  { grade: 'Class 6', tag: 'Concept Prep', color: 'border-indigo-500/40 text-indigo-300' },
                  { grade: 'Class 5', tag: 'Junior Labs', color: 'border-purple-500/40 text-purple-300' },
                ].map((item) => (
                  <div
                    key={item.grade}
                    className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1 text-center hover:border-slate-700 transition-colors"
                  >
                    <div className="font-bold text-xs text-white">{item.grade}</div>
                    <div className={`text-[10px] font-mono font-medium ${item.color}`}>
                      {item.tag}
                    </div>
                    <div className="text-[9px] text-amber-400/90 font-mono font-bold uppercase pt-0.5">
                      Coming Soon
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg hover:scale-102 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pre-Book Free Seat Now</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href="tel:6289139984"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Helpline: 6289139984</span>
                </a>

                <a
                  href="https://wa.me/916289139984?text=Hello%20ARDM%20Academy%2C%20I%20am%20inquiring%20about%20the%20Free%20Education%20%26%20YouTube%20Classes%20for%20Classes%205%20to%2010."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="free-classes" className="py-20 bg-slate-900 border-b border-slate-800 relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Slot Booking Callout Banner */}
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border border-red-500/40 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                WBBSE Class 8, 9, 10 Online Free Live Classes
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              দাদা-দিদির সাথে সম্পূর্ণ ফ্রি লাইভ ক্লাস ও ২৪x৭ ডাউট সলভিং
            </h3>
            <p className="text-xs text-slate-300">
              ফ্রি নোটস, ফ্রি কাউন্সেলিং ও ১০০% কমন সাজেস্টিভ প্রশ্ন পেতে এখনই আপনার সিট বুক করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            <a
              href="tel:6289139984"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-red-500/50 hover:border-red-400 transition-colors shadow-xs"
              title="Call 6289139984 Directly"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Call: 6289139984</span>
            </a>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-md hover:scale-102"
            >
              <span>Seat Book Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20">
            <Video className="w-3.5 h-3.5" />
            <span>ARDM Academy Open Video Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Free Education & YouTube Classes (Classes 5 to 10)
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            High-definition video lectures, board exam concept breakdowns, chapter-wise notes, and technology workshops streaming freely for all students.
          </p>

          {/* Class-wise Filter Tabs (Phase 2 Section 8 & 9) */}
          <div className="space-y-3 pt-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-mono uppercase text-white/80 font-bold mr-1">Class:</span>
              {classList.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-red-700 text-white shadow-xs'
                      : 'bg-[#18181b] text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>

            {/* Subject Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-mono uppercase text-white/80 font-bold mr-1">Subject:</span>
              {subjectList.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    selectedSubject === sub
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-[#141418] text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Video Player & Playlist Layout (Phase 2 Section 10) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Embedded Player (8 Columns) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-slate-800">
            {activeVideo ? (
              <div>
                <div className="relative aspect-video w-full bg-slate-900">
                  <iframe
                    src={getYouTubeEmbedUrl(activeVideo.youtubeUrl)}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="p-5 sm:p-6 bg-slate-900 text-white space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">
                        {activeVideo.studentClass} • {activeVideo.subject}
                      </span>
                      {activeVideo.board && (
                        <span className="text-white/90 text-xs font-mono font-medium">({activeVideo.board})</span>
                      )}
                    </div>

                    <a
                      href={activeVideo.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-white/90 hover:text-white text-xs font-semibold transition-colors"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                    {activeVideo.title}
                  </h3>

                  <p className="text-xs text-slate-100 leading-relaxed font-normal">
                    {activeVideo.description}
                  </p>

                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-100">
                      <span>Chapter: <strong className="text-white">{activeVideo.chapter || 'Foundations'}</strong></span>
                      <span className="mx-2">•</span>
                      <span>Faculty: <strong className="text-white">{activeVideo.teacher || 'ARDM Faculty Mentor'}</strong></span>
                    </div>

                    {/* Downloadable Notes & Materials */}
                    <div className="flex items-center gap-3">
                      {activeVideo.notesUrl && (
                        <a
                          href={activeVideo.notesUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Chapter Notes PDF</span>
                        </a>
                      )}
                      {activeVideo.studyMaterialUrl && (
                        <a
                          href={activeVideo.studyMaterialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Study Materials</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center text-slate-500 text-xs">
                Select a video lecture to begin streaming.
              </div>
            )}
          </div>

          {/* Playlist Sidebar (4 Columns) */}
          <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-slate-900">Lecture Playlist</h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {filtered.length} Video{filtered.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No lectures found for this class & subject selection.
                </div>
              ) : (
                filtered.map((item) => {
                  const isPlaying = activeVideo?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveVideo(item)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                        isPlaying
                          ? 'bg-red-950/80 border border-red-800 text-red-200 shadow-xs'
                          : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="relative w-16 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center text-white">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Play className="w-4 h-4 fill-white text-white" />
                        )}
                        {isPlaying && (
                          <div className="absolute inset-0 bg-red-600/70 flex items-center justify-center">
                            <span className="text-[9px] font-black uppercase text-white font-mono">
                              PLAYING
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] text-white/90 font-mono mb-0.5">
                          <span className="text-red-400 font-bold uppercase">{item.studentClass}</span>
                          <span className="truncate text-white/90">{item.subject}</span>
                        </div>
                        <h5 className="font-bold text-xs line-clamp-2 leading-tight text-white">
                          {item.title}
                        </h5>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
