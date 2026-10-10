import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Film,
  Image as ImageIcon,
} from 'lucide-react';
import { BannerItem } from '../../types';
import { getBanners } from '../../services/storage';

interface AnimatedBannerSliderProps {
  onNavigate?: (target: string) => void;
  onOpenRegistration?: () => void;
  onOpenTestEngine?: () => void;
  onOpenWorkshopManager?: () => void;
  onOpenFounders?: () => void;
  className?: string;
}

export const AnimatedBannerSlider: React.FC<AnimatedBannerSliderProps> = ({
  onNavigate,
  onOpenRegistration,
  onOpenTestEngine,
  onOpenWorkshopManager,
  onOpenFounders,
  className = '',
}) => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load active & visible banners from storage
  const loadBanners = () => {
    const all = getBanners();
    const visibleOnly = all
      .filter((b) => b.isVisible)
      .sort((a, b) => a.orderIndex - b.orderIndex);
    setBanners(visibleOnly);
  };

  useEffect(() => {
    loadBanners();
    // Listen for storage and local app updates
    const handleUpdate = () => loadBanners();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('ardm_banners_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('ardm_banners_updated', handleUpdate);
    };
  }, []);

  // Safe cyclic index increment
  const nextSlide = () => {
    if (banners.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    if (banners.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Auto-play sliding timer (5 seconds per slide)
  useEffect(() => {
    if (banners.length <= 1 || isPaused) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [banners.length, isPaused, currentIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // If no banners are marked visible by Admin, don't show the slider
  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex] || banners[0];

  const handleCtaClick = (link?: string, banner?: BannerItem) => {
    if (
      link === '#founders-modal' ||
      link === '#founders' ||
      link === 'founders' ||
      banner?.id === 'banner_four_founders_ardm' ||
      banner?.title?.toLowerCase().includes('founder')
    ) {
      if (onOpenFounders) {
        onOpenFounders();
        return;
      }
    }
    if (
      link === '#workshop-manager' ||
      link === 'workshop-manager' ||
      banner?.id === 'banner_ai_coding_labs' ||
      banner?.ctaLink === '#workshop-manager' ||
      (banner?.title?.toLowerCase().includes('workshop') && banner?.ctaText?.toLowerCase().includes('explore'))
    ) {
      if (onOpenWorkshopManager) {
        onOpenWorkshopManager();
        return;
      }
    }
    if (!link) return;
    if (link === '#mock-tests' || link === 'registration') {
      if (onOpenRegistration) {
        onOpenRegistration();
        return;
      }
    }
    if (link === '#cbt' || link === 'cbt') {
      if (onOpenTestEngine) {
        onOpenTestEngine();
        return;
      }
    }
    if (link.startsWith('http://') || link.startsWith('https://')) {
      const a = document.createElement('a');
      a.href = link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    if (onNavigate) {
      onNavigate(link.replace('#', ''));
    } else {
      const el = document.getElementById(link.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to extract clean embeddable video URL
  const formatVideoEmbed = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1`;
    }
    return url;
  };

  return (
    <section
      aria-label="Promotional Announcement Banners"
      className={`relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-2 select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-[#0c0c0f] shadow-2xl min-h-[340px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[460px] flex items-center">
        {/* Slides Track */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {banners.map((b, idx) => {
            const isActive = idx === currentIndex;
            const isPrev = (currentIndex - 1 + banners.length) % banners.length === idx;
            const isNext = (currentIndex + 1) % banners.length === idx;

            // Slide classes for smooth left-to-right sliding transition
            let transformClass = 'translate-x-full opacity-0 pointer-events-none';
            if (isActive) {
              transformClass = 'translate-x-0 opacity-100 z-10';
            } else if (isPrev) {
              transformClass = '-translate-x-full opacity-0 pointer-events-none';
            }

            return (
              <div
                key={b.id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${transformClass}`}
              >
                {/* Media Layer (Image or Video) */}
                {b.mediaType === 'video' ? (
                  <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                    {b.mediaUrl.endsWith('.mp4') || b.mediaUrl.endsWith('.webm') ? (
                      <video
                        src={b.mediaUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                      />
                    ) : (
                      <iframe
                        src={formatVideoEmbed(b.mediaUrl)}
                        title={b.title}
                        className="w-full h-full object-cover pointer-events-auto border-0 opacity-80"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    {/* Media Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40 pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-[#121216] overflow-hidden">
                    {/* High-res Image with Fallback Pattern */}
                    <img
                      src={b.mediaUrl}
                      alt={b.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
                      onError={(e) => {
                        // Fallback styled gradient if image URL fails
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {/* Deep Scrim Overlay: Guarantees 100% pure light white text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/95 via-[#09090b]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/30" />
                    {/* Subtle Brand Ambient Glow */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
                  </div>
                )}

                {/* Content Overlay Layer */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-12 md:px-16 lg:px-20 max-w-3xl pt-8 pb-14 sm:pt-0 sm:pb-0 pointer-events-none">
                  {/* Badge */}
                  {b.badgeText && (
                    <div className="mb-2 sm:mb-3 pointer-events-auto">
                      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="truncate">{b.badgeText}</span>
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18] drop-shadow-md">
                    {b.title}
                  </h2>

                  {/* Subtitle / Description */}
                  {b.subtitle && (
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/95 leading-relaxed max-w-2xl font-normal drop-shadow-sm line-clamp-3 sm:line-clamp-none">
                      {b.subtitle}
                    </p>
                  )}

                  {/* CTA Action Button */}
                  {b.ctaText && (
                    <div className="mt-4 sm:mt-6 flex items-center gap-3 pointer-events-auto">
                      <button
                        onClick={() => handleCtaClick(b.ctaLink, b)}
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-700 via-rose-600 to-red-700 hover:from-red-800 hover:to-rose-800 text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-red-900/40 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                      >
                        <span>{b.ctaText}</span>
                        {b.ctaLink?.startsWith('http') ? (
                          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>

                      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/90 font-mono">
                        {b.mediaType === 'video' ? (
                          <>
                            <Film className="w-3.5 h-3.5 text-red-400" />
                            <span>Featured Video Slide</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3.5 h-3.5 text-white/80" />
                            <span>Official Notice</span>
                          </>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Linear Segmented Slide Bar (Mobile & Desktop Linear Story Progress) */}
        {banners.length > 1 && (
          <div
            className="absolute top-2.5 sm:top-3 inset-x-3 sm:inset-x-8 z-30 flex items-center gap-1.5 pointer-events-auto"
            aria-label="Linear slide indicators"
          >
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                title={`Slide ${idx + 1} of ${banners.length}`}
                className="flex-1 h-1 sm:h-1.5 rounded-full bg-white/20 hover:bg-white/40 overflow-hidden cursor-pointer backdrop-blur-xs transition-all relative"
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-400 shadow-xs'
                      : idx < currentIndex
                      ? 'w-full bg-white/60'
                      : 'w-0'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Slide Navigation Controls */}
        {banners.length > 1 && (
          <>
            {/* Desktop Side Arrows (Previous / Next) */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="hidden sm:flex absolute left-3 sm:left-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-red-700 text-white border border-slate-700/80 hover:border-red-500 backdrop-blur-md items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="hidden sm:flex absolute right-3 sm:right-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-red-700 text-white border border-slate-700/80 hover:border-red-500 backdrop-blur-md items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Floating Bar: Strictly Linear Slide Bar for Mobile & Desktop */}
            <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/90 border border-slate-800 backdrop-blur-md shadow-2xl whitespace-nowrap shrink-0 select-none max-w-[95%]">
              {/* Mobile Compact Linear Previous Arrow */}
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="p-1 sm:hidden text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {/* Linear Slide Counter Badge */}
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono font-bold text-white tracking-wider whitespace-nowrap shrink-0 tabular-nums bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                <span className="text-red-400">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-white/40 font-light">/</span>
                <span className="text-white/80">{String(banners.length).padStart(2, '0')}</span>
              </div>

              {/* Linear Segmented Dash Bars */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-0.5 shrink-0">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Slide ${idx + 1} of ${banners.length}`}
                    title={`Slide ${idx + 1} of ${banners.length}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer shrink-0 ${
                      idx === currentIndex
                        ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-gradient-to-r from-red-600 to-rose-500 shadow-sm ring-1 ring-red-400/50'
                        : 'w-2 sm:w-2.5 h-1.5 sm:h-2 bg-slate-700/90 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              {/* Linear Auto-slide Play/Pause Toggle */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? 'Resume Auto-slide' : 'Pause Auto-slide'}
                aria-label={isPaused ? 'Resume Auto-slide' : 'Pause Auto-slide'}
                className="p-1 text-white hover:text-red-400 transition-colors cursor-pointer shrink-0"
              >
                {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
              </button>

              {/* Mobile Compact Linear Next Arrow */}
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="p-1 sm:hidden text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
