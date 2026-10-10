import React, { useState, useEffect, Suspense, lazy } from 'react';
import { SplashScreen } from './components/common/SplashScreen';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { AnimatedBannerSlider } from './components/home/AnimatedBannerSlider';
import { AboutSection } from './components/home/AboutSection';
import { WhatWeProvide } from './components/home/WhatWeProvide';
import { Class10MockTestSection } from './components/home/Class10MockTestSection';
import { SubjectPYQSection } from './components/home/SubjectPYQSection';
import { FreeClassesSection } from './components/home/FreeClassesSection';
import { AIWebinarSection } from './components/home/AIWebinarSection';
import { FreeEducationSection } from './components/home/FreeEducationSection';
import { ResultToppersSection } from './components/home/ResultToppersSection';
import { SocialMediaSection } from './components/home/SocialMediaSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/layout/Footer';

// SEO & Dedicated Subpages for Google Sitelinks
import { SEOHead } from './components/seo/SEOHead';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { MockTestsPage } from './pages/MockTestsPage';
import { ResultsPage } from './pages/ResultsPage';
import { PublicResultPage } from './pages/PublicResultPage';
import { ComputerSciencePage } from './pages/ComputerSciencePage';
import { AIPage } from './pages/AIPage';
import { WebinarsPage } from './pages/WebinarsPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ClassDetailsPage } from './pages/ClassDetailsPage';
import { FreeClassesPage } from './pages/FreeClassesPage';
import { PYQsPage } from './pages/PYQsPage';
import { SubjectDiagramPage } from './pages/SubjectDiagramPage';
import { SubjectUltraDiagramSection } from './components/home/SubjectUltraDiagramSection';
import { OnlineFreeClassesBookingSection } from './components/home/OnlineFreeClassesBookingSection';

// Modals & Panels (Code-split for 1 Lakh+ concurrent users performance)
import { MockTestRegistrationModal } from './components/mockTest/MockTestRegistrationModal';
import { StudentPortalModal } from './components/student/StudentPortalModal';
import { SideMenuBar } from './components/layout/SideMenuBar';
import { WorkshopManagerModal } from './components/modals/WorkshopManagerModal';
import { FoundersModal } from './components/modals/FoundersModal';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { MobileFrameWrapper } from './components/common/MobileFrameWrapper';
import { GoogleStyleSearchModal } from './components/search/GoogleStyleSearchModal';
import { GoogleStyleSearchSection } from './components/search/GoogleStyleSearchSection';

const MockTestEngine = lazy(() => import('./components/mockTest/MockTestEngine').then(m => ({ default: m.MockTestEngine })));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel').then(m => ({ default: m.AdminPanel })));
const AdmitCardModal = lazy(() => import('./components/admitCard/AdmitCardModal').then(m => ({ default: m.AdmitCardModal })));

import { StudentProfile } from './types';
import { getStudents } from './services/storage';

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Left Side Dynamic Animated Bar State
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Detect GitHub Pages repo sub-path (e.g. /ARDM/ or /ARDM)
  const getRepoBase = () => {
    if (typeof window === 'undefined') return '';
    const pathname = window.location.pathname;
    const parts = pathname.split('/').filter(Boolean);
    if (window.location.hostname.endsWith('github.io') && parts.length > 0) {
      return `/${parts[0]}`;
    }
    return '';
  };
  const repoBase = getRepoBase();

  // URL Path State for Sitelink Routing (Normalizes repo prefix & .html extension)
  const normalizePath = (p: string) => {
    if (!p) return '/';
    let clean = p.replace(/\.html$/, '');
    if (repoBase && clean.startsWith(repoBase)) {
      clean = clean.slice(repoBase.length);
    }
    if (!clean.startsWith('/')) clean = '/' + clean;
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }
    return clean.length > 0 ? clean : '/';
  };

  const toBrowserUrl = (cleanPath: string) => {
    if (repoBase && !cleanPath.startsWith(repoBase)) {
      return `${repoBase}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`;
    }
    return cleanPath;
  };

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return normalizePath(p);
    }
    return '/';
  });

  // Active section tracking for navbar highlight
  const [activeSection, setActiveSection] = useState('home');

  // Modal Dialog States
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [preselectedSubjectId, setPreselectedSubjectId] = useState<string | undefined>(undefined);

  const [testEngineOpen, setTestEngineOpen] = useState(false);
  const [candidateRollId, setCandidateRollId] = useState('ARDM-2026-DEMO');

  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<any>('students');

  const handleOpenAdmin = (tab: any = 'students') => {
    setAdminInitialTab(tab);
    setAdminPanelOpen(true);
  };

  // Student Portal & Admit Card Modals
  const [studentPortalOpen, setStudentPortalOpen] = useState(false);
  const [admitCardModalOpen, setAdmitCardModalOpen] = useState(false);
  const [admitCardStudent, setAdmitCardStudent] = useState<StudentProfile | null>(null);
  const [isAdminAdmitCardView, setIsAdminAdmitCardView] = useState(false);

  // Workshop Manager Modal (Mohim Das - Founder & CEO CodeLX)
  const [workshopManagerOpen, setWorkshopManagerOpen] = useState(false);

  // Founders Modal (All 4 Founders: Akash Paik, Rupam Paul, Devnath Pramanick, Mohim Das)
  const [foundersModalOpen, setFoundersModalOpen] = useState(false);
  const [selectedFounderId, setSelectedFounderId] = useState<'all' | 'akash' | 'rupam' | 'devnath' | 'mohim'>('all');

  // Google-Style Search Modal State
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global Ctrl + K / Cmd + K to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenFoundersModal = (founderId: 'all' | 'akash' | 'rupam' | 'devnath' | 'mohim' = 'all') => {
    setSelectedFounderId(founderId);
    setFoundersModalOpen(true);
  };

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname || '/'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Universal Navigation (Supports both URL Paths and Section Anchors)
  const handleNavigate = (pathOrId: string) => {
    if (
      pathOrId === '/founders' ||
      pathOrId === '#founders' ||
      pathOrId === 'founders' ||
      pathOrId === '#founders-modal' ||
      pathOrId === '/founders-modal' ||
      pathOrId === '#about-founders'
    ) {
      handleOpenFoundersModal('all');
      return;
    }

    if (
      pathOrId === '/workshop-manager' ||
      pathOrId === '#workshop-manager' ||
      pathOrId === 'workshop-manager' ||
      pathOrId === '/mohim-das' ||
      pathOrId === '#mohim-das'
    ) {
      setWorkshopManagerOpen(true);
      return;
    }

    if (
      pathOrId === '/admin' ||
      pathOrId === '/student-data' ||
      pathOrId === '/student-data-admin' ||
      pathOrId === '/student-data-admin-panel' ||
      pathOrId === '#admin' ||
      pathOrId === '#student-data'
    ) {
      handleOpenAdmin('students');
      return;
    }

    // 1. Direct URL Path (e.g. '/courses', '/courses.html', '/mock-tests', etc.)
    if (pathOrId.startsWith('/')) {
      if (pathOrId.includes('#')) {
        const [rawPath, hash] = pathOrId.split('#');
        const path = normalizePath(rawPath);
        setCurrentPath(path || '/');
        window.history.pushState({}, '', toBrowserUrl(pathOrId));
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            const yOffset = -70;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 80);
        return;
      }

      const path = normalizePath(pathOrId);
      setCurrentPath(path);
      window.history.pushState({}, '', toBrowserUrl(pathOrId));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Section Anchors Map to Pages if not on Home
    const anchorToPageMap: Record<string, string> = {
      'courses': '/courses',
      'what-we-provide': '/#what-we-provide',
      'mock-test': '/mock-tests',
      'subject-diagram': '/subject-diagram',
      'ultra-diagram': '/subject-diagram',
      'diagram': '/subject-diagram',
      'pyqs': '/pyqs',
      'free-classes': '/free-classes',
      'free-online-classes': '/#free-online-classes',
      'results': '/results',
      'computer-science': '/computer-science',
      'tech-courses': '/computer-science',
      'ai': '/webinars',
      'webinar': '/webinars',
      'webinars': '/webinars',
      'workshops': '/workshops',
      'free-guidance': '/workshops',
      'free-education': '/free-classes',
      'about': '/about',
      'contact': '/contact',
      'home': '/',
    };

    if (currentPath !== '/') {
      const targetPath = anchorToPageMap[pathOrId] || '/';
      setCurrentPath(targetPath);
      window.history.pushState({}, '', targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 3. Smooth scroll on Home page
    setActiveSection(pathOrId);
    const element = document.getElementById(pathOrId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Open registration with specific subject selected
  const handleRegisterWithSubject = (subjectId?: string) => {
    setPreselectedSubjectId(subjectId);
    setRegistrationModalOpen(true);
  };

  // Open Admit Card for student (with admin preview support)
  const handleOpenAdmitCardForStudent = (student: StudentProfile, fromAdmin = false) => {
    setIsAdminAdmitCardView(fromAdmin);
    setAdmitCardStudent(student);
    setAdmitCardModalOpen(true);
  };

  // Quick action: Open Admit Card (finds first approved candidate or prompts portal login)
  const handleQuickDownloadAdmitCard = () => {
    const all = getStudents();
    const approved = all.find((s) => s.paymentStatus === 'Approved' && s.admitCardStatus === 'Available');
    if (approved) {
      setAdmitCardStudent(approved);
      setAdmitCardModalOpen(true);
    } else if (all.length > 0) {
      setAdmitCardStudent(all[0]);
      setAdmitCardModalOpen(true);
    } else {
      setStudentPortalOpen(true);
    }
  };

  // Launch test engine with verified registration roll ID
  const handleLaunchTestEngineWithRegistration = (regId: string) => {
    setCandidateRollId(regId);
    setTestEngineOpen(true);
  };

  return (
    <MobileFrameWrapper>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative selection:bg-indigo-600 selection:text-white">
        {/* 1. Elegant Logo Splash Screen */}
        {showSplash && (
          <SplashScreen
            onComplete={() => setShowSplash(false)}
            minDurationMs={2200}
          />
        )}

      {/* 2. Top Header Navigation Bar with Action Buttons & Sidebar Toggle */}
      <Navbar
        activeSection={currentPath !== '/' ? currentPath : activeSection}
        onNavigate={handleNavigate}
        onOpenRegistration={() => handleRegisterWithSubject(undefined)}
        onOpenAdmin={() => handleOpenAdmin('students')}
        onOpenTestEngine={() => setTestEngineOpen(true)}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
        onOpenCheckRegistration={() => {
          if (currentPath !== '/') {
            handleNavigate('/#mock-test');
          } else {
            handleNavigate('mock-test');
          }
        }}
        onOpenDownloadAdmitCard={handleQuickDownloadAdmitCard}
        onOpenSearch={() => setSearchModalOpen(true)}
        isSidebarExpanded={sidebarExpanded}
        onToggleSidebar={() => setSidebarExpanded((prev) => !prev)}
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* 3. Left Side Dynamic Animated Bar */}
      <SideMenuBar
        activeSection={currentPath !== '/' ? currentPath : activeSection}
        onNavigate={handleNavigate}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isExpanded={sidebarExpanded}
        onToggleExpand={() => setSidebarExpanded((prev) => !prev)}
        onOpenCheckRegistration={() => {
          if (currentPath !== '/') {
            handleNavigate('/#mock-test');
          } else {
            handleNavigate('mock-test');
          }
        }}
        onOpenDownloadAdmitCard={handleQuickDownloadAdmitCard}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
        onOpenAdmin={() => handleOpenAdmin('students')}
      />

      {/* 4. Main Content Area with Dynamic Animated Left Offset */}
      <div
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col min-h-screen ${
          sidebarExpanded ? 'lg:pl-64' : 'lg:pl-20'
        }`}
      >
        <main className="flex-1 pb-16 lg:pb-0">
          {/* ROUTE VIEWS: Dedicated Pages for Search Engine Sitelinks & Clean URLs */}
          {currentPath === '/courses' && (
            <CoursesPage
              onNavigate={handleNavigate}
              onOpenRegistration={handleRegisterWithSubject}
            />
          )}

      {currentPath.startsWith('/courses/') && currentPath !== '/courses' && (
        <CourseDetailPage
          courseSlug={currentPath.replace('/courses/', '').replace(/\/$/, '')}
          onNavigate={handleNavigate}
          onEnrollCourse={() => handleNavigate('/courses')}
        />
      )}

      {currentPath === '/mock-tests' && (
        <MockTestsPage
          onNavigate={handleNavigate}
          onOpenRegistration={handleRegisterWithSubject}
          onOpenTestEngine={() => setTestEngineOpen(true)}
          onOpenDownloadAdmitCard={handleQuickDownloadAdmitCard}
        />
      )}

      {(currentPath === '/subject-diagram' || currentPath === '/diagram') && (
        <SubjectDiagramPage
          onNavigate={handleNavigate}
          onOpenTestEngine={(subId?: string) => {
            if (subId) setPreselectedSubjectId(subId);
            setTestEngineOpen(true);
          }}
        />
      )}

      {currentPath === '/pyqs' && (
        <PYQsPage
          onNavigate={handleNavigate}
          onOpenAdmin={() => setAdminPanelOpen(true)}
        />
      )}

      {currentPath === '/free-classes' && (
        <FreeClassesPage onNavigate={handleNavigate} />
      )}

      {currentPath === '/results' && (
        <ResultsPage
          onNavigate={handleNavigate}
          onOpenTestEngineWithRegistration={handleLaunchTestEngineWithRegistration}
          onOpenStudentPortal={() => setStudentPortalOpen(true)}
        />
      )}

      {currentPath.startsWith('/results/') && currentPath !== '/results' && (
        <PublicResultPage
          slug={currentPath.replace('/results/', '').replace(/\/$/, '')}
          onNavigate={handleNavigate}
          onOpenTestEngineWithRegistration={handleLaunchTestEngineWithRegistration}
        />
      )}

      {currentPath.startsWith('/classes/') && (
        <ClassDetailsPage
          classLevel={currentPath.replace('/classes/', '').replace(/\/$/, '')}
          onNavigate={handleNavigate}
          onOpenRegistration={handleRegisterWithSubject}
        />
      )}

      {currentPath === '/computer-science' && (
        <ComputerSciencePage
          onNavigate={handleNavigate}
          onOpenRegistration={handleRegisterWithSubject}
        />
      )}

      {currentPath === '/ai' && (
        <AIPage onNavigate={handleNavigate} />
      )}

      {currentPath === '/webinars' && (
        <WebinarsPage onNavigate={handleNavigate} />
      )}

      {currentPath === '/workshops' && (
        <WorkshopsPage
          onNavigate={handleNavigate}
          onOpenMockTest={() => handleRegisterWithSubject(undefined)}
        />
      )}

      {currentPath === '/about' && (
        <AboutPage
          onNavigate={handleNavigate}
          onOpenFounderModal={(founderId) => handleOpenFoundersModal(founderId || 'all')}
        />
      )}

      {currentPath === '/contact' && (
        <ContactPage onNavigate={handleNavigate} />
      )}

      {/* 4. DEFAULT HOMEPAGE VIEW (When on '/') */}
      {(currentPath === '/' ||
        (![
          '/courses',
          '/mock-tests',
          '/subject-diagram',
          '/diagram',
          '/pyqs',
          '/free-classes',
          '/results',
          '/computer-science',
          '/ai',
          '/webinars',
          '/workshops',
          '/about',
          '/contact',
        ].includes(currentPath) &&
          !currentPath.startsWith('/courses/') &&
          !currentPath.startsWith('/results/') &&
          !currentPath.startsWith('/classes/'))) && (
        <>
          <SEOHead
            title="ARDM Academy | Founders: Akash Paik, Rupam Paul, Devnath Pramanick, Mohim Das"
            description="ARDM Academy was founded by 4 founders: Akash Paik, Rupam Paul, Devnath Pramanick, and Mohim Das. Academic coaching, Class 10 mock tests, and AI workshops."
            canonical="https://ardmacademy.in/"
          />

          {/* Dynamic Animated Sliding Banner (Controlled by Admin: Media & Visibility) */}
          <div className="pt-20 sm:pt-24 pb-1">
            <AnimatedBannerSlider
              onNavigate={(target) => handleNavigate(target.startsWith('/') ? target : `/#${target}`)}
              onOpenRegistration={() => handleRegisterWithSubject(undefined)}
              onOpenTestEngine={() => setTestEngineOpen(true)}
              onOpenWorkshopManager={() => setWorkshopManagerOpen(true)}
              onOpenFounders={() => handleOpenFoundersModal('all')}
            />
          </div>

          {/* Google-Style Deep Search & Sitelinks Section (Exact Match to User Sitelinks Reference) */}
          <GoogleStyleSearchSection
            onOpenSearchModal={() => setSearchModalOpen(true)}
            onNavigate={handleNavigate}
            onOpenFounders={(founderId) => handleOpenFoundersModal(founderId || 'all')}
            onOpenWorkshopManager={() => setWorkshopManagerOpen(true)}
            onOpenRegistration={() => handleRegisterWithSubject(undefined)}
            onOpenTestEngine={() => setTestEngineOpen(true)}
            onOpenDownloadAdmitCard={handleQuickDownloadAdmitCard}
          />

          {/* Hero Section */}
          <HeroSection
            onExploreClasses={() => handleNavigate('/courses')}
            onTakeMockTest={() => handleRegisterWithSubject(undefined)}
            onContactUs={() => handleNavigate('/contact')}
            onLaunchPractice={() => setTestEngineOpen(true)}
            onOpenDownloadAdmitCard={handleQuickDownloadAdmitCard}
            onOpenFounders={(founderId) => handleOpenFoundersModal(founderId || 'all')}
          />

          {/* WBBSE Online Free Classes Live Booking & Helpline (Class 8, 9, 10 Madhyamik) */}
          <OnlineFreeClassesBookingSection onNavigate={handleNavigate} />

          {/* About Section */}
          <AboutSection
            onOpenWorkshopManager={() => setWorkshopManagerOpen(true)}
            onOpenFounderModal={(founderId) => handleOpenFoundersModal(founderId || 'all')}
          />

          {/* What We Provide (Dual Track: Academic + Tech) */}
          <WhatWeProvide onRegisterSubject={handleRegisterWithSubject} />

          {/* PROSTUTI Class 10 Mock Test Platform */}
          <Class10MockTestSection
            onStartRegistration={() => handleRegisterWithSubject(undefined)}
            onLaunchPracticeTest={() => setTestEngineOpen(true)}
            onOpenAdmitCard={handleOpenAdmitCardForStudent}
          />

          {/* Subject-Wise Ultra Diagram (Interactive Blueprint & Mastery Radar) */}
          <SubjectUltraDiagramSection
            onOpenTestEngine={(subId?: string) => {
              if (subId) setPreselectedSubjectId(subId);
              setTestEngineOpen(true);
            }}
            onNavigate={handleNavigate}
          />

          {/* Subject-wise PYQ Section */}
          <SubjectPYQSection
            onOpenAdmin={() => setAdminPanelOpen(true)}
            onNavigate={handleNavigate}
          />

          {/* Free Classes */}
          <FreeClassesSection />

          {/* AI & Coding Webinar Masterclass */}
          <AIWebinarSection onOpenWorkshopManager={() => setWorkshopManagerOpen(true)} />

          {/* Free Education ("Learn Without Barriers") */}
          <FreeEducationSection
            onOpenMockTest={() => handleRegisterWithSubject(undefined)}
          />

          {/* Top 10 Toppers Leaderboard & Result PDF Section */}
          <ResultToppersSection
            onOpenTestEngineWithRegistration={handleLaunchTestEngineWithRegistration}
            onOpenStudentPortal={() => setStudentPortalOpen(true)}
          />

          {/* Official Social Media Channels */}
          <SocialMediaSection />

          {/* How It Works Pathway */}
          <HowItWorksSection
            onStartRegistration={() => handleRegisterWithSubject(undefined)}
          />

          {/* Contact ARDM Academy */}
          <ContactSection />
        </>
      )}
        </main>

        {/* 5. Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenAdmin={() => handleOpenAdmin('students')}
          onOpenRegistration={() => handleRegisterWithSubject(undefined)}
          onOpenCheckRegistration={() => {
            if (currentPath !== '/') {
              handleNavigate('/#mock-test');
            } else {
              handleNavigate('mock-test');
            }
          }}
          onOpenDownloadAdmitCard={handleQuickDownloadAdmitCard}
        />
      </div>

      {/* MODALS */}
      {/* 1. PROSTUTI Registration Wizard */}
      <MockTestRegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        preselectedSubjectId={preselectedSubjectId}
        onOpenAdmitCard={handleOpenAdmitCardForStudent}
        onOpenTestEngineWithRegistration={handleLaunchTestEngineWithRegistration}
      />

      {/* 2. Official Admit Card Modal (Print / Save A4 PDF) */}
      <Suspense fallback={null}>
        {admitCardModalOpen && (
          <AdmitCardModal
            isOpen={admitCardModalOpen}
            onClose={() => {
              setAdmitCardModalOpen(false);
              setIsAdminAdmitCardView(false);
            }}
            student={admitCardStudent}
            isAdminView={isAdminAdmitCardView}
          />
        )}
      </Suspense>

      {/* 3. Student Portal Modal (Profile, Rank, Status) */}
      <StudentPortalModal
        isOpen={studentPortalOpen}
        onClose={() => setStudentPortalOpen(false)}
        onOpenAdmitCard={(st) => handleOpenAdmitCardForStudent(st, false)}
        onLaunchCBT={handleLaunchTestEngineWithRegistration}
      />

      {/* 4. Interactive CBT Mock Test Simulator */}
      <Suspense fallback={null}>
        {testEngineOpen && (
          <MockTestEngine
            isOpen={testEngineOpen}
            onClose={() => setTestEngineOpen(false)}
            candidateRegId={candidateRollId}
          />
        )}
      </Suspense>

      {/* 5. Full-Screen Admin Control Portal (Secure & Whitelisted) */}
      <Suspense fallback={null}>
        {adminPanelOpen && (
          <AdminPanel
            isOpen={adminPanelOpen}
            onClose={() => setAdminPanelOpen(false)}
            onViewCandidateAdmitCard={(st) => handleOpenAdmitCardForStudent(st, true)}
            initialTab={adminInitialTab}
          />
        )}
      </Suspense>

      {/* 6. Workshop Manager Profile Modal (Mohim Das - Founder & CEO CodeLX) */}
      <WorkshopManagerModal
        isOpen={workshopManagerOpen}
        onClose={() => setWorkshopManagerOpen(false)}
      />

      {/* 7. Founders Comprehensive Profile Modal (Akash, Rupam, Devnath, Mohim) */}
      <FoundersModal
        isOpen={foundersModalOpen}
        onClose={() => setFoundersModalOpen(false)}
        initialFounderId={selectedFounderId}
      />

      {/* 8. Mobile Native Bottom Navigation Bar */}
      <MobileBottomNav
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenFounders={() => handleOpenFoundersModal('all')}
        onOpenMockTest={() => handleRegisterWithSubject(undefined)}
      />

      {/* 9. Google-Style Universal Search & Sitelinks Modal */}
      <GoogleStyleSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
        onOpenFounders={(founderId) => handleOpenFoundersModal(founderId || 'all')}
        onOpenWorkshopManager={() => setWorkshopManagerOpen(true)}
        onOpenRegistration={() => handleRegisterWithSubject(undefined)}
        onOpenTestEngine={() => setTestEngineOpen(true)}
        onOpenDownloadAdmitCard={handleQuickDownloadAdmitCard}
      />
    </div>
  </MobileFrameWrapper>
  );
}
