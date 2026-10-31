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
import {
  getFreeClasses,
  getFreeClassesDisplayMode,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  extractYouTubeId,
} from '../../services/storage';
import { FreeClassVideo, FreeClassesDisplayMode } from '../../types';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfaShqjqwxM7v7nlHixgApJzjJDBwipl4RC7M5B1LxlgRVP7Q/viewform?usp=publish-editor';

export const FreeClassesSection: React.FC = () => {
  const [classes, setClasses] = useState<FreeClassVideo[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<FreeClassVideo | null>(null);
  const [displayMode, setDisplayMode] = useState<FreeClassesDisplayMode>('active');

  const refreshVideos = () => {
    const list = getFreeClasses().filter((c) => c.isPublished);
    setClasses(list.slice(0, 5));
    setActiveVideo((prev) => {
      if (prev && list.some((c) => c.id === prev.id)) {
        return list.find((c) => c.id === prev.id) || list[0] || null;
      }
      return list.find((c) => c.isFeatured) || list[0] || null;
    });
  };

  useEffect(() => {
    const syncMode = () => {
      setDisplayMode(getFreeClassesDisplayMode());
    };
    syncMode();
    refreshVideos();

    // Also sync from backend lectures endpoint if available
    fetch('/api/lectures')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.lectures) && data.lectures.length > 0) {
          const list = data.lectures.filter((l: any) => l.isPublished).slice(0, 5);
          if (list.length > 0) {
            setClasses(list);
            setActiveVideo((prev) => prev || list[0]);
          }
        }
      })
      .catch(() => {});

    window.addEventListener('ardm_free_classes_mode_updated', syncMode);
    window.addEventListener('ardm_free_classes_updated', refreshVideos);
    return () => {
      window.removeEventListener('ardm_free_classes_mode_updated', syncMode);
      window.removeEventListener('ardm_free_classes_updated', refreshVideos);
    };
  }, []);

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

  // Ensure default active video is always ready
  const currentVideo = activeVideo || classes[0] || null;
  const currentVideoId = currentVideo ? extractYouTubeId(currentVideo.youtubeUrl) : 'IHOZQGtbiDQ';

  return (
    <section
      id="youtube-video-frame"
      className="py-16 sm:py-20 bg-slate-950 border-y border-red-950/60 relative text-white scroll-mt-24"
    >
      <div id="free-classes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 text-red-400 text-xs font-bold border border-red-500/30 uppercase tracking-wider shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <Video className="w-4 h-4" />
            <span>ARDM Official YouTube Video Frame</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Official YouTube Video Player Frame
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Watch ARDM live classes, Madhyamik prediction lectures, and conceptual breakdown directly inside our player frame.
            When an admin posts or updates a video link, it automatically appears right inside this frame with its live thumbnail.
          </p>

          {/* Class-wise Filter Tabs */}
          <div className="space-y-3 pt-2">
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

        {/* Featured Video Player & Playlist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Embedded Player in Official Frame (8 Columns) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-3xl p-3 sm:p-4 border-2 border-red-600/80 shadow-[0_0_50px_rgba(220,38,38,0.25)] ring-1 ring-red-500/40 relative">
            {currentVideo ? (
              <div className="space-y-3">
                {/* Official Hardware Bezel Frame Header */}
                <div className="px-3.5 py-2.5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                    </span>
                    <span className="font-mono font-black text-xs text-white uppercase tracking-wider">
                      ARDM YouTube Frame
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono font-bold text-[10px]">
                      Slot {classes.findIndex((c) => c.id === currentVideo.id) + 1 || 1} of 5
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                    <span className="hidden sm:inline text-slate-400">
                      ID: <strong className="text-white font-mono">{currentVideoId}</strong>
                    </span>
                    <a
                      href={currentVideo.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* 16:9 Screen Display Inside Frame */}
                <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                  <iframe
                    src={getYouTubeEmbedUrl(currentVideo.youtubeUrl)}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Video Meta Info */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 text-white space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">
                        {currentVideo.studentClass} • {currentVideo.subject}
                      </span>
                      {currentVideo.board && (
                        <span className="text-white/90 text-xs font-mono font-medium">({currentVideo.board})</span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      Live Delivery Frame
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                    {currentVideo.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {currentVideo.description}
                  </p>

                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-300">
                      <span>Chapter: <strong className="text-white">{currentVideo.chapter || 'Foundations'}</strong></span>
                      <span className="mx-2">•</span>
                      <span>Faculty: <strong className="text-white">{currentVideo.teacher || 'ARDM Faculty Mentor'}</strong></span>
                    </div>

                    {/* Downloadable Notes & Materials */}
                    <div className="flex items-center gap-2">
                      {currentVideo.notesUrl && (
                        <a
                          href={currentVideo.notesUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Chapter Notes PDF</span>
                        </a>
                      )}
                      {currentVideo.studyMaterialUrl && (
                        <a
                          href={currentVideo.studyMaterialUrl}
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

                {/* 5-Slot Direct Switcher Ribbon inside Frame */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Switch Video inside this Frame (All 5 Slots):</span>
                    <span className="text-red-400 font-mono text-[10px]">Strict Max: 5 Videos</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {classes.map((cls, idx) => {
                      const isCurrent = currentVideo.id === cls.id;
                      const thumb = getYouTubeThumbnailUrl(cls.youtubeUrl, cls.thumbnailUrl);
                      return (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => setActiveVideo(cls)}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isCurrent
                              ? 'bg-red-950/90 border-red-600 shadow-md ring-1 ring-red-500'
                              : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black mb-1.5 border border-slate-800">
                            <img src={thumb} alt={cls.title} className="w-full h-full object-cover" />
                            <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black font-mono bg-red-600 text-white">
                              Slot {idx + 1}
                            </div>
                            {isCurrent && (
                              <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
                                <span className="text-[9px] font-black text-white uppercase tracking-wider">
                                  PLAYING
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-[10px] font-bold text-white line-clamp-1">
                            {cls.title}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate mt-0.5">
                            {cls.studentClass}
                          </div>
                        </button>
                      );
                    })}
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
          <div className="lg:col-span-4 bg-slate-950/90 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-red-500" />
                <h4 className="font-bold text-sm text-white">Lecture Playlist</h4>
              </div>
              <span className="text-[11px] font-mono text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-900/60">
                {classes.length} of 5 Videos
              </span>
            </div>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs space-y-2">
                  <p>No lectures match the active filter.</p>
                  <button
                    onClick={() => {
                      setSelectedClass('All');
                      setSelectedSubject('All');
                    }}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-bold"
                  >
                    View All Videos
                  </button>
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isPlaying = activeVideo?.id === item.id;
                  const thumb = getYouTubeThumbnailUrl(item.youtubeUrl, item.thumbnailUrl);
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveVideo(item)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                        isPlaying
                          ? 'bg-red-950/90 border border-red-700/80 text-white shadow-md'
                          : 'bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 text-slate-200'
                      }`}
                    >
                      <div className="relative w-20 h-14 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center text-white">
                        <img
                          src={thumb}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                          <Play className="w-4 h-4 fill-white text-white drop-shadow-md" />
                        </div>
                        {isPlaying && (
                          <div className="absolute inset-0 bg-red-600/85 flex items-center justify-center">
                            <span className="text-[9px] font-black uppercase text-white font-mono tracking-wider">
                              PLAYING
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-0.5">
                          <span className="text-red-400 font-bold uppercase">{item.studentClass}</span>
                          <span className="text-[9px] text-slate-500 font-mono">Slot {idx + 1}/5</span>
                        </div>
                        <h5 className="font-bold text-xs line-clamp-2 leading-tight text-white">
                          {item.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {item.subject} • {item.teacher || 'ARDM Faculty'}
                        </p>
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
