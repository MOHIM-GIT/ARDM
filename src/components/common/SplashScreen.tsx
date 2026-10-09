import React, { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDurationMs = 2000,
}) => {
  const [fadedOut, setFadedOut] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Respect user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, minDurationMs / 10);

    const fadeTimer = setTimeout(() => {
      setFadedOut(true);
    }, minDurationMs - 350);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, minDurationMs);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [minDurationMs, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-400 ${
        fadedOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      role="status"
    >
      {/* Background Ambience */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-red-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-red-900/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center text-center px-4 animate-in fade-in zoom-in-95 duration-700 ease-out">
        {/* 1. Official ARDM Logo Emblem with 2. Animated Circular Border / Ring */}
        <div className="relative p-3 rounded-full mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-red-500/30 border-t-red-500 border-r-red-700 animate-spin [animation-duration:3s]" />
          <BrandLogo variant="icon" size="xl" light className="relative" />
        </div>

        {/* 3. ARDM Academy Name */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">ARDM</span>
          <span className="text-3xl sm:text-4xl font-semibold tracking-wider text-red-500 font-sans">ACADEMY</span>
        </div>

        {/* 4. Official Slogan: LEARN • PRACTICE • IMPROVE (Indian Tricolor) */}
        <div className="mt-3 flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase font-mono">
          <span className="text-[#FF671F]">LEARN</span>
          <span className="text-white/80 font-black">•</span>
          <span className="text-white drop-shadow-sm">PRACTICE</span>
          <span className="text-white/80 font-black">•</span>
          <span className="text-[#22C55E]">IMPROVE</span>
        </div>

        {/* Animated Loading Bar */}
        <div className="mt-8 w-44 flex flex-col items-center gap-2">
          <div className="w-full bg-slate-800/80 rounded-full h-1 overflow-hidden border border-slate-700/50">
            <div
              className="bg-gradient-to-r from-red-700 via-rose-600 to-red-500 h-full rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-white/90 font-mono tracking-wider font-semibold">
            PREPARING ACADEMIC SUITE
          </span>
        </div>

        {/* Quick Skip Button */}
        <button
          onClick={onComplete}
          className="mt-6 inline-flex items-center gap-1 text-[11px] text-white/90 hover:text-white transition-colors py-1 px-3 rounded-full hover:bg-slate-900 border border-transparent hover:border-slate-800"
        >
          <span>Skip to Website</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
