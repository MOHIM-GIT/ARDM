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
  Video,
  MessageCircle,
  ExternalLink,
  ChevronDown,
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
  const [isFreeClassMenuOpen, setIsFreeClassMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#free-class-contact-nav')) {
        setIsFreeClassMenuOpen(false);
      }
    };
    if (isFreeClassMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isFreeClassMenuOpen]);

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
        </div>

        {/* Right Side: Primary Actions in exact order */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Practice CBT */}
          <button
            onClick={onOpenTestEngine}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-400 bg-red-950/50 hover:bg-red-900/60 border border-red-900/60 transition-all hover:scale-102 active:scale-98 shadow-2xs cursor-pointer"
            title="Live CBT Computer Based Exam Simulator"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span className="whitespace-nowrap">Practice CBT</span>
          </button>

          {/* Mobile Free Class Quick Contact (Visible on phone devices) */}
          <a
            href="tel:6289139984"
            className="inline-flex sm:hidden items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold transition-all shadow-xs shrink-0"
            title="Direct Call Free Class Helpline: 6289139984"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold">Free Class</span>
          </a>

          {/* Desktop & Laptop Free Class Contact Option with Quick Actions */}
          <div id="free-class-contact-nav" className="relative group hidden sm:inline-block">
            <button
              type="button"
              onClick={() => {
                setIsFreeClassMenuOpen((prev) => !prev);
                onNavigate('#free-online-classes');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/50 transition-all hover:scale-102 active:scale-98 shadow-xs cursor-pointer"
              title="WBBSE Free Classes & Direct Contact / Booking"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="whitespace-nowrap">Free Class Contact</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <ChevronDown className="w-3 h-3 text-emerald-400 opacity-70 group-hover:rotate-180 transition-transform" />
            </button>

            {/* Dropdown Menu for Laptop & Tablet */}
            <div
              className={`absolute right-0 top-full pt-2 z-50 w-72 transition-all duration-150 ${
                isFreeClassMenuOpen ? 'block' : 'hidden group-hover:block'
              }`}
            >
              <div className="bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-3.5 shadow-2xl text-white space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    <span>Free Class Booking</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                    100% Free
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-snug">
                  WBBSE Class 8, 9 & 10 (Madhyamik) • Live Guidance by Dada-Didi & Instant Doubt Solving.
                </p>

                <div className="space-y-1.5 pt-1">
                  <a
                    href="tel:6289139984"
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-sm"
                    title="Direct Call Helpline"
                  >
                    <span className="flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call: 6289139984</span>
                    </span>
                    <span className="text-[10px] uppercase font-sans font-medium px-1.5 py-0.5 bg-black/20 rounded">
                      Direct
                    </span>
                  </a>

                  <a
                    href="https://wa.me/916289139984?text=Hello%20ARDM%20Academy%2C%20I%20want%20to%20book%20a%20free%20online%20class%20seat%20for%20West%20Bengal%20Board."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Doubt Desk</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-emerald-200" />
                  </a>

                  <a
                    href={SITE_CONFIG.contact.freeClassesFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-red-400" />
                      <span>Seat Booking Form</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsFreeClassMenuOpen(false);
                      onNavigate('#free-online-classes');
                    }}
                    className="w-full text-center py-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium hover:underline block cursor-pointer"
                  >
                    View Class Timetable & Schedule ↓
                  </button>
                </div>
              </div>
            </div>
          </div>

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

          {/* Visually Separated Student Data - Admin Panel Gateway */}
          <div className="pl-1 sm:pl-2 border-l border-slate-800 ml-0.5">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-white hover:text-red-400 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all hover:scale-102 active:scale-98 text-xs font-semibold cursor-pointer shadow-2xs"
              title="Student Data - Admin Panel"
              aria-label="Student Data - Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="hidden xl:inline text-[11px] font-semibold text-slate-200 hover:text-white whitespace-nowrap">
                Student Data - Admin Panel
              </span>
              <span className="xl:hidden hidden sm:inline text-[11px] font-semibold text-slate-200 whitespace-nowrap">
                Student Data Admin
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

