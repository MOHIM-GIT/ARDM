import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  BookOpen,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Layers,
  GraduationCap,
  Calendar,
  CreditCard,
  PhoneCall,
  Share2,
  Check,
} from 'lucide-react';
import { getCourses, enrollInCourse } from '../services/storage';
import { Course } from '../types';
import { SITE_CONFIG, getTelLink } from '../config/siteConfig';
import { slugify, getCourseSlug } from '../utils/seo';

interface CourseDetailPageProps {
  courseSlug: string;
  onNavigate: (path: string) => void;
  onEnrollCourse?: (course: Course) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseSlug,
  onNavigate,
  onEnrollCourse,
}) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const allCourses = getCourses().filter((c) => c.publishStatus === 'Published');
    // Match by slug or id or partial slug
    const matched = allCourses.find((c) => {
      const generatedSlug = getCourseSlug(c);
      const simpleSlug = slugify(c.title);
      return (
        generatedSlug === courseSlug ||
        simpleSlug === courseSlug ||
        c.id === courseSlug ||
        courseSlug.includes(c.id) ||
        generatedSlug.includes(courseSlug)
      );
    }) || allCourses[0];

    setCourse(matched || null);
  }, [courseSlug]);

  if (!course) {
    return (
      <div className="pt-32 pb-20 bg-slate-50 min-h-screen text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Course Program Not Found</h2>
          <p className="text-xs text-slate-500">
            The requested course may have been updated or moved. Browse our complete dynamic course catalog.
          </p>
          <button
            onClick={() => onNavigate('/courses')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }

  const pageTitle = `${course.title} | ARDM Academy`;
  const metaDescription = `${course.shortBio || course.fullDescription.slice(0, 150)} Instructor: ${course.instructor}. Duration: ${course.duration}.`;
  const canonicalUrl = `https://ardmacademy.in/courses/${slugify(course.title)}`;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortBio || course.fullDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'ARDM Academy',
      sameAs: 'https://ardmacademy.in',
    },
    educationalCredentialAwarded: course.certificateAvailable
      ? 'Verified Certificate of Completion'
      : undefined,
    offers: {
      '@type': 'Offer',
      price: course.isFree || course.price === 0 ? '0' : String(course.price),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      category: course.isFree ? 'Free' : 'Paid',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      instructor: {
        '@type': 'Person',
        name: course.instructor,
      },
    },
  };

  const handleCopyShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        breadcrumbs={[
          { name: 'Courses', path: '/courses' },
          { name: course.title, path: `/courses/${slugify(course.title)}` },
        ]}
        schema={courseSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: course.title, path: `/courses/${slugify(course.title)}` },
        ]}
        onNavigate={onNavigate}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Banner Image */}
            <div className="relative aspect-video w-full rounded-3xl bg-slate-900 overflow-hidden shadow-md border border-slate-200">
              <img
                src={course.bannerUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-white font-mono text-xs font-bold uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold">
                  {course.level}
                </span>
              </div>
            </div>

            {/* Course Title & Overview */}
            <article className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Duration: {course.duration}</span>
                  </span>
                  <span>•</span>
                  <span>Eligibility: {course.eligibility}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 leading-tight">
                  {course.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                  {course.shortBio}
                </p>
              </div>

              {/* Full Description */}
              {course.fullDescription && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">About This Learning Program</h2>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {course.fullDescription}
                  </div>
                </div>
              )}

              {/* Course Curriculum Modules */}
              {course.courseContent && course.courseContent.length > 0 && (
                <div className="pt-5 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-indigo-600" />
                      <span>Curriculum & Learning Modules</span>
                    </h2>
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {course.courseContent.length} Modules
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {course.courseContent.map((moduleText, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="text-xs text-slate-800 font-medium pt-0.5 leading-snug">
                          {moduleText}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What You Will Receive */}
              <div className="pt-5 border-t border-slate-100 space-y-3">
                <h2 className="text-lg font-bold text-slate-900">Program Inclusions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Live Doubt Resolution Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Downloadable Revision PDFs & Formula Sheets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Timed Mock Practice Examinations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>State-Level Scorecards & Performance Analytics</span>
                  </div>
                  {course.certificateAvailable && (
                    <div className="flex items-center gap-2 font-bold text-indigo-700 sm:col-span-2">
                      <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Official Authenticated Certificate of Completion</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar CTA & Details Card (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-6">
              {/* Fee Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-1">
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider block">
                  Course Fee
                </span>
                <div className="flex items-baseline gap-2">
                  {course.isFree || course.price === 0 ? (
                    <span className="text-3xl font-black text-emerald-400">100% FREE</span>
                  ) : (
                    <>
                      <span className="text-3xl font-black text-white font-mono">
                        ₹{course.price}
                      </span>
                      {course.offerPrice && (
                        <span className="text-sm text-slate-400 line-through font-mono">
                          ₹{course.offerPrice}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <span className="text-[11px] text-slate-300 block pt-1">
                  Full semester curriculum access with student dashboard
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (onEnrollCourse) {
                      onEnrollCourse(course);
                    } else {
                      onNavigate('/courses');
                    }
                  }}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enroll in Program</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyShare}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Course'}</span>
                </button>
              </div>

              {/* Program Overview Quick Specs */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Instructor:</span>
                  <strong className="text-slate-900">{course.instructor}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <strong className="text-slate-900">{course.duration}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Eligibility:</span>
                  <strong className="text-slate-900">{course.eligibility}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Category:</span>
                  <strong className="text-slate-900">{course.category}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Certificate:</span>
                  <strong className={course.certificateAvailable ? 'text-indigo-600' : 'text-slate-600'}>
                    {course.certificateAvailable ? 'Yes (Included)' : 'Not Applicable'}
                  </strong>
                </div>
              </div>

              {/* Direct Academic Contact */}
              <div className="pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-5 rounded-b-3xl text-center space-y-1">
                <span className="text-[11px] text-slate-500 block">Have questions about syllabus?</span>
                <a
                  href={getTelLink()}
                  className="text-xs font-bold text-indigo-700 hover:underline inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Helpline: 6289139984</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
