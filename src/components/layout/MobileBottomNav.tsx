import React from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  Users,
  Video,
} from 'lucide-react';

interface MobileBottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenFounders: () => void;
  onOpenMockTest: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPath,
  onNavigate,
  onOpenFounders,
  onOpenMockTest,
}) => {
  const isHome = currentPath === '/' || currentPath === '';
  const isCourses = currentPath.startsWith('/courses');
  const isMockTests = currentPath === '/mock-tests';
  const isFreeClasses = currentPath === '/free-classes';

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#09090b]/95 backdrop-blur-md border-t border-slate-800 h-16 pb-safe shadow-2xl select-none"
    >
      <div className="grid grid-cols-5 h-full max-w-md mx-auto items-center px-1">
        {/* 1. Home */}
        <button
          onClick={() => onNavigate('/')}
          className={`flex flex-col items-center justify-center h-full min-h-[48px] px-1 transition-colors cursor-pointer ${
            isHome ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Navigate to Home"
        >
          <Home className={`w-5 h-5 transition-transform ${isHome ? 'scale-110 text-red-500' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight leading-none">Home</span>
          {isHome && <span className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />}
        </button>

        {/* 2. Courses */}
        <button
          onClick={() => onNavigate('/courses')}
          className={`flex flex-col items-center justify-center h-full min-h-[48px] px-1 transition-colors cursor-pointer ${
            isCourses ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Navigate to Courses"
        >
          <BookOpen className={`w-5 h-5 transition-transform ${isCourses ? 'scale-110 text-red-500' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight leading-none">Courses</span>
          {isCourses && <span className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />}
        </button>

        {/* 3. Mock Test (PROSTUTI CBT) */}
        <button
          onClick={onOpenMockTest}
          className={`flex flex-col items-center justify-center h-full min-h-[48px] px-1 transition-colors relative cursor-pointer ${
            isMockTests ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Take Mock Test"
        >
          <div className="relative">
            <GraduationCap className={`w-5 h-5 transition-transform ${isMockTests ? 'scale-110 text-red-500' : ''}`} />
            <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-red-600 text-[8px] font-mono font-bold text-white leading-none">
              CBT
            </span>
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">Mock Test</span>
          {isMockTests && <span className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />}
        </button>

        {/* 4. All 4 Founders */}
        <button
          onClick={onOpenFounders}
          className="flex flex-col items-center justify-center h-full min-h-[48px] px-1 text-slate-400 hover:text-red-400 transition-colors relative cursor-pointer"
          aria-label="View All 4 Founders"
          title="Meet All 4 Founders: A·R·D·M"
        >
          <div className="relative">
            <Users className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-amber-500 text-[8px] font-mono font-bold text-black leading-none">
              4
            </span>
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">Founders</span>
        </button>

        {/* 5. Free Classes */}
        <button
          onClick={() => onNavigate('/free-classes')}
          className={`flex flex-col items-center justify-center h-full min-h-[48px] px-1 transition-colors relative cursor-pointer ${
            isFreeClasses ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Free Online Classes"
        >
          <div className="relative">
            <Video className={`w-5 h-5 transition-transform ${isFreeClasses ? 'scale-110 text-emerald-400' : ''}`} />
            <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-emerald-600 text-[8px] font-mono font-bold text-white leading-none">
              Free
            </span>
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">Classes</span>
          {isFreeClasses && <span className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5" />}
        </button>
      </div>
    </nav>
  );
};
