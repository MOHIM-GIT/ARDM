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
} from 'lucide-react';
import { getFreeClasses } from '../../services/storage';
import { FreeClassVideo } from '../../types';

export const FreeClassesSection: React.FC = () => {
  const [classes, setClasses] = useState<FreeClassVideo[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<FreeClassVideo | null>(null);

  useEffect(() => {
    const list = getFreeClasses().filter((c) => c.isPublished);
    setClasses(list);
    const featured = list.find((c) => c.isFeatured) || list[0] || null;
    setActiveVideo(featured);
  }, []);

  // Extract YouTube ID helper
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : 'dQw4w9WgXcQ';
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

  return (
    <section id="free-classes" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-200/80">
            <Video className="w-3.5 h-3.5" />
            <span>ARDM Academy Open Video Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Free Education & YouTube Classes (Classes 5 to 10)
          </h2>
          <p className="text-base text-white/95 leading-relaxed">
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
