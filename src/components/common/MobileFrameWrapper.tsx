import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Sparkles, X, RotateCcw } from 'lucide-react';

interface MobileFrameWrapperProps {
  children: React.ReactNode;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({ children }) => {
  const [isFrameActive, setIsFrameActive] = useState(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      // Only enable device frame simulation on screens >= 1024px
      setIsDesktopScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Listen for custom toggle events
  useEffect(() => {
    const handleToggle = () => setIsFrameActive((prev) => !prev);
    window.addEventListener('ardm_toggle_mobile_frame', handleToggle);
    return () => window.removeEventListener('ardm_toggle_mobile_frame', handleToggle);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* If frame mode is active AND on desktop: render realistic smartphone frame */}
      {isDesktopScreen && isFrameActive ? (
        <div className="min-h-screen w-full bg-[#050507] py-8 px-4 flex flex-col items-center justify-center relative select-none">
          {/* Top Control Bar for Simulator */}
          <div className="mb-4 flex items-center gap-3 bg-[#121216] border border-slate-800 px-4 py-2 rounded-2xl shadow-xl z-50">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Smartphone className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Mobile Phone Frame (390 × 844)</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <button
              onClick={() => setIsFrameActive(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              title="Return to Full Screen Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Exit to Full Screen</span>
            </button>
          </div>

          {/* Realistic Smartphone Chassis */}
          <div className="relative w-[392px] h-[844px] rounded-[52px] border-[12px] border-slate-800/95 bg-[#09090b] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(220,38,38,0.15)] overflow-hidden flex flex-col ring-1 ring-white/10">
            {/* Top Speaker & Dynamic Island Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-md pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900/60" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
            </div>

            {/* Scrollable Viewport with Simulated Touch Screen */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden relative scrollbar-none select-text">
              {children}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-50 pointer-events-none" />
          </div>
        </div>
      ) : (
        /* Full Screen Normal View (Both Desktop and Mobile Viewports) */
        <>{children}</>
      )}

      {/* Floating Mode Switcher Button on Desktop (Bottom Left) */}
      {isDesktopScreen && (
        <aside
          aria-label="Viewport Switcher"
          className="fixed bottom-4 left-4 z-50 select-none print:hidden"
        >
          <button
            onClick={() => setIsFrameActive((prev) => !prev)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121216]/95 hover:bg-[#18181f] text-slate-200 hover:text-white text-xs font-bold border border-slate-800 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title={
              isFrameActive
                ? 'Switch to Full Screen Desktop Layout'
                : 'Switch to Smartphone Device Frame Preview'
            }
          >
            {isFrameActive ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-blue-400" />
                <span>Full Screen</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-red-500" />
                <span>Mobile Frame</span>
              </>
            )}
          </button>
        </aside>
      )}
    </div>
  );
};
