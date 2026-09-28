import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Download,
  Search,
  UserCheck,
  PanelLeftClose,
  PanelLeft,
  GraduationCap,
  Activity,
} from 'lucide-react';
import { SITE_CONFIG, getTelLink } from '../../config/siteConfig';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenRegistration: () => void;
  onOpenAdmin: () => void;
  onOpenTestEngine: () => void;
  onOpenStudentPortal: () => void;
  onOpenCheckRegistration: () => void;
  onOpenDownloadAdmitCard: () => void;
  activeSection: string;
  isSidebarExpanded?: boolean;
  onToggleSidebar?: () => void;
  onOpenMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenRegistration,
  onOpenAdmin,
  onOpenTestEngine,
  onOpenStudentPortal,
  onOpenCheckRegistration,
  onOpenDownloadAdmitCard,
  activeSection,
  isSidebarExpanded = true,
  onToggleSidebar,
  onOpenMobileSidebar,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
        isSidebarExpanded ? 'lg:left-64' : 'lg:left-20'
      } left-0 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md shadow-xs border-b border-slate-200/90 dark:border-slate-800 py-2.5'
          : 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xs py-3 border-b border-slate-100 dark:border-slate-800/60'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Left Side: Sidebar Toggle & Mobile Brand Indicator */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Menu Button (Opens Left-Side Animated Drawer) */}
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-xl text-white hover:text-red-400 hover:bg-slate-800 focus:outline-hidden lg:hidden border border-slate-800 shadow-2xs cursor-pointer"
            aria-label="Open Left Navigation Menu"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Collapse / Expand Toggle */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex items-center justify-center p-2 rounded-xl text-white hover:text-red-400 hover:bg-slate-800 border border-slate-800 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            title={isSidebarExpanded ? 'Collapse Navigation Bar' : 'Expand Navigation Bar'}
            aria-label="Toggle Side Bar"
          >
            {isSidebarExpanded ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeft className="w-4 h-4 text-red-400" />
            )}
          </button>

          {/* Slogan Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 pl-2">
            <span className="text-[11px] font-mono text-white/90 font-semibold uppercase tracking-wider">
              West Bengal Board & CBSE Excellence
            </span>
          </div>
        </div>

        {/* Right Side: Primary Actions in exact order */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Check Registration Status */}
          <button
            onClick={onOpenCheckRegistration}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#18181b] hover:bg-slate-800 border border-slate-800 transition-all hover:scale-102 active:scale-98 shadow-2xs cursor-pointer"
            title="Check Student Registration Status"
          >
            <Search className="w-3.5 h-3.5 text-white" />
            <span className="whitespace-nowrap">Check Registration</span>
          </button>

          {/* Practice CBT */}
          <button
            onClick={onOpenTestEngine}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-400 bg-red-950/50 hover:bg-red-900/60 border border-red-900/60 transition-all hover:scale-102 active:scale-98 shadow-2xs cursor-pointer"
            title="Live CBT Computer Based Exam Simulator"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span className="whitespace-nowrap">Practice CBT</span>
          </button>

          {/* Subject Ultra Diagram */}
          <button
            onClick={() => onNavigate('/subject-diagram')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/60 transition-all hover:scale-102 active:scale-98 shadow-2xs cursor-pointer"
            title="Subject-Wise Ultra Diagram & Mastery Blueprint"
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="whitespace-nowrap">Ultra Diagram</span>
          </button>

          {/* Download Admit Card */}
          <button
            onClick={onOpenDownloadAdmitCard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:text-red-400 transition-all hover:scale-102 active:scale-98 shadow-2xs cursor-pointer"
            title="Download Official Admit Card"
          >
            <Download className="w-3.5 h-3.5 text-red-500" />
            <span className="whitespace-nowrap hidden sm:inline">Download Admit Card</span>
            <span className="whitespace-nowrap sm:hidden">Admit Card</span>
          </button>

          {/* Take Mock Test */}
          <button
            onClick={onOpenRegistration}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-700 via-rose-600 to-red-700 hover:from-red-800 hover:to-rose-800 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <span className="hidden xs:inline">Take Mock Test</span>
            <span className="xs:hidden">Mock Test</span>
            <span className="px-1.5 py-0.2 bg-white/20 rounded text-[11px] font-mono">₹100</span>
          </button>

          {/* Student Portal & Status Link */}
          <button
            onClick={onOpenStudentPortal}
            className="p-2 text-white hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors border border-slate-800 shadow-2xs cursor-pointer"
            title="Student Portal & Status Check"
            aria-label="Student Portal"
          >
            <UserCheck className="w-4 h-4" />
          </button>

          {/* Visually Separated Admin Gateway */}
          <div className="pl-2 border-l border-slate-800 ml-0.5">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-white hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors text-xs font-semibold border border-transparent hover:border-slate-700 cursor-pointer"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden 2xl:inline text-[11px]">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

