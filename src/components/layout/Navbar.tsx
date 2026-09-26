import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
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
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/90 py-2.5'
          : 'bg-white/80 backdrop-blur-xs py-3 border-b border-slate-100'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Left Side: Sidebar Toggle & Mobile Brand Indicator */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Menu Button (Opens Left-Side Animated Drawer) */}
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 focus:outline-hidden lg:hidden border border-slate-200/60 shadow-2xs"
            aria-label="Open Left Navigation Menu"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Collapse / Expand Toggle */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 border border-slate-200/60 transition-all hover:scale-102 active:scale-98"
            title={isSidebarExpanded ? 'Collapse Navigation Bar' : 'Expand Navigation Bar'}
            aria-label="Toggle Side Bar"
          >
            {isSidebarExpanded ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeft className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Mobile Logo View (When sidebar is off-canvas) */}
          <div className="lg:hidden">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="focus:outline-hidden"
              title="ARDM Academy Home"
            >
              <BrandLogo size="sm" />
            </a>
          </div>

          {/* Slogan Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 pl-2">
            <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
              West Bengal Board & CBSE Excellence
            </span>
          </div>
        </div>

        {/* Right Side: Primary Actions in exact order */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Check Registration Status */}
          <button
            onClick={onOpenCheckRegistration}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/80 transition-all hover:scale-102 active:scale-98 shadow-2xs"
            title="Check Student Registration Status"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="whitespace-nowrap">Check Registration</span>
          </button>

          {/* Practice CBT */}
          <button
            onClick={onOpenTestEngine}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50/90 hover:bg-indigo-100 border border-indigo-200/70 transition-all hover:scale-102 active:scale-98 shadow-2xs"
            title="Live CBT Computer Based Exam Simulator"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="whitespace-nowrap">Practice CBT</span>
          </button>

          {/* Download Admit Card */}
          <button
            onClick={onOpenDownloadAdmitCard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50/90 hover:bg-blue-100 border border-blue-200/70 transition-all hover:scale-102 active:scale-98 shadow-2xs"
            title="Download Official Admit Card"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span className="whitespace-nowrap hidden sm:inline">Download Admit Card</span>
            <span className="whitespace-nowrap sm:hidden">Admit Card</span>
          </button>

          {/* Take Mock Test */}
          <button
            onClick={onOpenRegistration}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all hover:scale-102 active:scale-98"
          >
            <span className="hidden xs:inline">Take Mock Test</span>
            <span className="xs:hidden">Mock Test</span>
            <span className="px-1.5 py-0.2 bg-white/20 rounded text-[11px] font-mono">₹100</span>
          </button>

          {/* Student Portal & Status Link */}
          <button
            onClick={onOpenStudentPortal}
            className="p-2 text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/60 shadow-2xs"
            title="Student Portal & Status Check"
            aria-label="Student Portal"
          >
            <UserCheck className="w-4 h-4" />
          </button>

          {/* Visually Separated Admin Gateway */}
          <div className="pl-2 border-l border-slate-200 ml-0.5">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors text-xs font-semibold border border-transparent hover:border-slate-200"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span className="hidden 2xl:inline text-[11px] text-slate-500">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

