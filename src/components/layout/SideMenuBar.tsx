import React, { useState, useEffect } from 'react';
import {
  Home,
  Compass,
  Layers,
  GraduationCap,
  FileText,
  Video,
  BookOpen,
  BrainCircuit,
  Trophy,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  Download,
  UserCheck,
  ShieldCheck,
  X,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { SITE_CONFIG, getTelLink } from '../../config/siteConfig';

export interface NavItemDef {
  id: string;
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface SideMenuBarProps {
  activeSection: string;
  onNavigate: (path: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenCheckRegistration?: () => void;
  onOpenDownloadAdmitCard?: () => void;
  onOpenStudentPortal?: () => void;
  onOpenAdmin?: () => void;
}

export const SideMenuBar: React.FC<SideMenuBarProps> = ({
  activeSection,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  isExpanded,
  onToggleExpand,
  onOpenCheckRegistration,
  onOpenDownloadAdmitCard,
  onOpenStudentPortal,
  onOpenAdmin,
}) => {
  // The 10 buttons transferred from the navbar
  const menuButtons: NavItemDef[] = [
    {
      id: 'home',
      path: '/',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'about',
      path: '/about',
      label: 'About',
      icon: Compass,
    },
    {
      id: 'what-we-provide',
      path: '/#what-we-provide',
      label: 'What We Provide',
      icon: Layers,
    },
    {
      id: 'mock-test',
      path: '/mock-tests',
      label: 'Mock Test',
      icon: GraduationCap,
      badge: 'CBT',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    },
    {
      id: 'subject-diagram',
      path: '/subject-diagram',
      label: 'Ultra Diagram',
      icon: Activity,
      badge: 'Ultra',
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    },
    {
      id: 'pyqs',
      path: '/pyqs',
      label: 'PYQs',
      icon: FileText,
      badge: '10 Yrs',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'free-classes',
      path: '/free-classes',
      label: 'Free Classes',
      icon: Video,
      badge: 'Free',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      id: 'courses',
      path: '/courses',
      label: 'Courses',
      icon: BookOpen,
      badge: 'Catalog',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      id: 'webinars',
      path: '/webinars',
      label: 'AI & Webinars',
      icon: BrainCircuit,
      badge: 'AI',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    },
    {
      id: 'results',
      path: '/results',
      label: 'Results',
      icon: Trophy,
    },
    {
      id: 'contact',
      path: '/contact',
      label: 'Contact',
      icon: PhoneCall,
    },
  ];

  const handleItemClick = (path: string, id: string) => {
    onCloseMobile();
    onNavigate(path);
  };

  const isItemActive = (item: NavItemDef) => {
    if (activeSection === item.id || activeSection === item.path) return true;
    if (item.path === '/' && activeSection === 'home') return true;
    if (item.path === '/#what-we-provide' && (activeSection === 'what-we-provide' || activeSection === '/#what-we-provide')) return true;
    if (item.path === '/mock-tests' && (activeSection === 'mock-test' || activeSection === '/mock-tests')) return true;
    if (item.path === '/subject-diagram' && (activeSection === 'subject-diagram' || activeSection === '/subject-diagram' || activeSection === 'ultra-diagram' || activeSection === '/#subject-diagram')) return true;
    if (item.path === '/courses' && activeSection.startsWith('/courses')) return true;
    if (item.path === '/results' && activeSection.startsWith('/results')) return true;
    if (item.path === '/free-classes' && activeSection === '/free-classes') return true;
    return false;
  };

  return (
    <>
      {/* 1. Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* 2. Left Side Animated Navigation Bar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white dark:bg-[#09090b] border-r border-slate-200/90 dark:border-slate-800 shadow-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          /* Mobile Drawer Position */
          isOpenMobile ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${
          /* Desktop Width Responsive to Toggle */
          isExpanded ? 'lg:w-64' : 'lg:w-20'
        }`}
        aria-label="Side Navigation Bar"
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick('/', 'home');
            }}
            className="flex items-center gap-3 overflow-hidden group focus:outline-hidden"
            title="ARDM Academy Home"
          >
            <BrandLogo size={isExpanded ? 'sm' : 'sm'} variant="full" />
          </a>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleExpand}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 border border-slate-200/60 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title={isExpanded ? 'Collapse Navigation Bar' : 'Expand Navigation Bar'}
            aria-label={isExpanded ? 'Collapse Navigation Bar' : 'Expand Navigation Bar'}
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4 text-white" />
            ) : (
              <ChevronRight className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Navigation Label Indicator (Expanded Only) */}
        {isExpanded && (
          <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold text-white/90">
            <span>Navigation Menu</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          </div>
        )}

        {/* 10 Navigation Buttons List (Vertical & Animated) */}
        <nav className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200">
          {menuButtons.map((item) => {
            const active = isItemActive(item);
            const Icon = item.icon;

            return (
              <div key={item.id} className="relative group">
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item.path, item.id);
                  }}
                  className={`relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 select-none cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-red-950/60 via-red-950/40 to-transparent text-red-400 font-bold shadow-2xs'
                      : 'text-white hover:text-red-400 hover:bg-[#151518]'
                  } ${!isExpanded ? 'lg:justify-center lg:px-2' : ''}`}
                >
                  {/* Active Left Indicator Bar */}
                  {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-gradient-to-b from-red-600 to-rose-600 rounded-r-full shadow-xs" />
                  )}

                  {/* Icon with animated micro-bounce on hover */}
                  <div
                    className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-transform duration-200 group-hover:scale-110 ${
                      active
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-[#18181d] text-white group-hover:bg-red-950 group-hover:text-red-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Button Label (Animated width / opacity for expanded state) */}
                  <div
                    className={`flex-1 flex items-center justify-between overflow-hidden transition-all duration-200 ${
                      !isExpanded ? 'lg:hidden' : 'block'
                    }`}
                  >
                    <span className="truncate whitespace-nowrap">{item.label}</span>

                    {/* Badge Pill */}
                    {item.badge && (
                      <span
                        className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0 ${
                          item.badgeColor || 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </a>

                {/* Floating Tooltip When Collapsed on Desktop */}
                {!isExpanded && (
                  <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-medium rounded-lg shadow-lg pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 z-50 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1 py-0.2 rounded bg-indigo-500/30 text-indigo-300 text-[9px] font-mono">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Section of Left Bar (Quick Action Shortcuts) */}
        <div className="p-3 border-t border-slate-800/80 bg-[#0c0c0e] shrink-0 space-y-2">
          {/* Check Registration Shortcut */}
          {onOpenCheckRegistration && (
            <button
              onClick={() => {
                onCloseMobile();
                onOpenCheckRegistration();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white hover:text-red-400 hover:bg-[#18181d] border border-transparent hover:border-slate-700 transition-all cursor-pointer ${
                !isExpanded ? 'lg:justify-center lg:px-2' : ''
              }`}
              title="Check Registration Status"
            >
              <Search className="w-4 h-4 text-white shrink-0" />
              <span className={`truncate ${!isExpanded ? 'lg:hidden' : 'block'}`}>
                Check Status
              </span>
            </button>
          )}

          {/* Download Admit Card Shortcut */}
          {onOpenDownloadAdmitCard && (
            <button
              onClick={() => {
                onCloseMobile();
                onOpenDownloadAdmitCard();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-red-950/60 hover:bg-red-900/80 border border-red-900/60 transition-all cursor-pointer ${
                !isExpanded ? 'lg:justify-center lg:px-2' : ''
              }`}
              title="Download Official Admit Card"
            >
              <Download className="w-4 h-4 text-red-400 shrink-0" />
              <span className={`truncate ${!isExpanded ? 'lg:hidden' : 'block'}`}>
                Admit Card
              </span>
            </button>
          )}

          {/* Helpline Quick Link */}
          {isExpanded && (
            <div className="pt-1 px-1 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span className="font-mono">Helpline:</span>
              <a
                href={getTelLink()}
                className="font-bold text-red-600 dark:text-red-400 hover:underline font-mono"
              >
                {SITE_CONFIG.contact.phoneNumber}
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
