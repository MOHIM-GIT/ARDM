import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  BookOpen,
  Code,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Laptop,
  QrCode,
  CreditCard,
  Copy,
  Check,
  X,
  Search,
  UserCheck,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Clock,
  Award,
} from 'lucide-react';
import {
  getCourses,
  enrollInCourse,
  getStudentCourseEnrollments,
} from '../services/storage';
import { Course, CourseEnrollment } from '../types';
import { SITE_CONFIG, getTelLink, getWhatsAppLink } from '../config/siteConfig';

interface CoursesPageProps {
  onNavigate: (path: string) => void;
  onOpenRegistration: (subjectId?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate, onOpenRegistration }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Course Enrollment & Payment Modal (Phase 2 Section 4, 5, 6, 7)
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [enrollStudentName, setEnrollStudentName] = useState('');
  const [enrollStudentMobile, setEnrollStudentMobile] = useState('');
  const [enrollStudentEmail, setEnrollStudentEmail] = useState('');
  const [enrollStudentSchool, setEnrollStudentSchool] = useState('');
  const [enrollTransactionId, setEnrollTransactionId] = useState('');
  const [enrollPaymentDate, setEnrollPaymentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState<string | null>(null);
  const [isSubmittingEnrollment, setIsSubmittingEnrollment] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // My Enrollments Status Lookup Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusLookupInput, setStatusLookupInput] = useState('');
  const [myEnrollments, setMyEnrollments] = useState<CourseEnrollment[]>([]);
  const [hasSearchedStatus, setHasSearchedStatus] = useState(false);

  useEffect(() => {
    // Load dynamic courses created by Admin
    const loaded = getCourses().filter((c) => c.publishStatus === 'Published');
    setCourses(loaded);
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('akashpaik570@oksbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleOpenEnrollModal = (course: Course) => {
    setSelectedCourseForEnroll(course);
    setEnrollSuccessMessage(null);
    setEnrollTransactionId('');
  };

  const handleSubmitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseForEnroll) return;
    if (!enrollStudentName.trim() || !enrollStudentMobile.trim()) return;

    if (!selectedCourseForEnroll.isFree && selectedCourseForEnroll.price > 0 && !enrollTransactionId.trim()) {
      alert('Please enter your 12-digit UPI Transaction ID / UTR number.');
      return;
    }

    setIsSubmittingEnrollment(true);
    try {
      const isFree = selectedCourseForEnroll.isFree || selectedCourseForEnroll.price === 0;
      await enrollInCourse({
        courseId: selectedCourseForEnroll.id,
        courseTitle: selectedCourseForEnroll.title,
        studentName: enrollStudentName.trim(),
        studentEmail: enrollStudentEmail.trim() || `${enrollStudentMobile.trim()}@ardmacademy.in`,
        studentMobile: enrollStudentMobile.trim(),
        school: enrollStudentSchool.trim(),
        paymentAmount: isFree ? 0 : selectedCourseForEnroll.price,
        transactionId: isFree ? 'FREE_ENROLLMENT' : enrollTransactionId.trim(),
        paymentDate: enrollPaymentDate,
      });

      if (isFree) {
        setEnrollSuccessMessage(
          `Enrollment Confirmed! You are now enrolled in ${selectedCourseForEnroll.title}. You have full active access.`
        );
      } else {
        setEnrollSuccessMessage(
          `Payment Received! Status: PAYMENT UNDER REVIEW. Our admin team will verify your UTR (${enrollTransactionId}) with State Bank of India. Once verified, your Course Enrollment will become ACTIVE.`
        );
      }
    } catch (err: any) {
      alert(`Enrollment error: ${err?.message || 'Could not complete enrollment'}`);
    } finally {
      setIsSubmittingEnrollment(false);
    }
  };

  const handleLookupStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearchedStatus(true);
    const q = statusLookupInput.trim();
    if (!q) {
      setMyEnrollments([]);
      return;
    }
    const results = getStudentCourseEnrollments(q, q);
    setMyEnrollments(results);
  };

  // Filtering
  const categories = ['All', 'Academic', 'Computer Science & AI', 'Free Courses', 'Paid Courses'];
  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Free Courses'
        ? c.isFree || c.price === 0
        : selectedCategory === 'Paid Courses'
        ? !c.isFree && c.price > 0
        : c.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.shortBio.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.map((course, i) => ({
      '@type': 'Course',
      position: i + 1,
      name: course.title,
      description: course.shortBio,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'ARDM Academy',
        sameAs: 'https://ardmacademy.in',
      },
    })),
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="Courses & Programs | ARDM Academy"
        description="Explore dynamic academic courses, Class 10 board boosters, Coding, and Artificial Intelligence masterclasses at ARDM Academy."
        canonical="https://ardmacademy.in/courses"
        breadcrumbs={[{ name: 'Courses', path: '/courses' }]}
        schema={courseSchema}
      />

      <Breadcrumbs items={[{ name: 'Courses', path: '/courses' }]} onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARDM Academy Dynamic Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Comprehensive Courses & Learning Programs
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            From focused Class 10 board exam preparation to foundational coding, Artificial Intelligence, and logic building — explore our official curriculum.
          </p>

          {/* Quick Actions & Search */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, topics, instructor..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 shadow-2xs"
              />
            </div>

            <button
              onClick={() => {
                setShowStatusModal(true);
                setHasSearchedStatus(false);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold shadow-2xs transition-colors"
            >
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>My Enrolled Courses</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Dynamic Courses Grid */}
        <section className="mb-16">
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700 text-sm">
                No courses match your active filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Course Banner (Phase 2 Section 3) */}
                    <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img
                        src={course.bannerUrl}
                        alt={course.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          {course.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold">
                          {course.level}
                        </span>
                      </div>

                      {/* Course Price Tag (Phase 2 Section 4 & 5) */}
                      <div className="absolute top-3 right-3">
                        {course.isFree || course.price === 0 ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-xs shadow-md tracking-wider">
                            FREE
                          </span>
                        ) : (
                          <div className="px-3 py-1 rounded-full bg-indigo-600 text-white font-black text-xs shadow-md font-mono flex items-center gap-1.5">
                            <span>₹{course.price}</span>
                            {course.offerPrice && (
                              <span className="line-through text-indigo-200 text-[10px] font-normal">
                                ₹{course.offerPrice}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Course Body */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{course.duration}</span>
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600">
                          {course.eligibility}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {course.shortBio || course.fullDescription}
                      </p>

                      {/* Course Content Highlights */}
                      {course.courseContent && course.courseContent.length > 0 && (
                        <div className="space-y-1 pt-1">
                          {course.courseContent.slice(0, 3).map((item, idx) => (
                            <div
                              key={idx}
                              className="text-[11px] text-slate-600 flex items-center gap-1.5 truncate"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer & Enroll Button */}
                  <div className="p-5 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Instructor
                        </span>
                        <span className="text-xs font-semibold text-slate-800">
                          {course.instructor}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenEnrollModal(course)}
                        className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all active:scale-98 cursor-pointer ${
                          course.isFree || course.price === 0
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Quick Sitelink Pathways */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">State Mock Examination</h3>
              <p className="text-xs text-slate-500 mb-3">
                Experience real board exam simulations with automatic scoring and rank prediction.
              </p>
              <a
                href="/mock-tests"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/mock-tests');
                }}
                className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
              >
                <span>View Mock Test Series</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">State Merit Results</h3>
              <p className="text-xs text-slate-500 mb-3">
                Review official State Top 10 Toppers leaderboard and retrieve individual scorecards.
              </p>
              <a
                href="/results"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/results');
                }}
                className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
              >
                <span>Browse Results & Merit</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Academic Helpdesk</h3>
              <p className="text-xs text-slate-500 mb-3">
                Call our direct academic helpline at 6289139984 for curriculum advice.
              </p>
              <a
                href={getTelLink()}
                className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call 6289139984</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ENROLLMENT & PAYMENT MODAL (Phase 2 Section 4, 5, 6, 7) */}
      {selectedCourseForEnroll && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 text-xs my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600">
                  Course Enrollment Gateway
                </span>
                <h3 className="font-extrabold text-base text-slate-900">
                  {selectedCourseForEnroll.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseForEnroll(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success state */}
            {enrollSuccessMessage ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-base text-emerald-950">Enrollment Submitted!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {enrollSuccessMessage}
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourseForEnroll(null)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnrollment} className="space-y-4">
                {/* Free vs Paid Payment Banner */}
                {selectedCourseForEnroll.isFree || selectedCourseForEnroll.price === 0 ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="font-black text-emerald-800 text-base block">FREE ENROLLMENT</span>
                      <span className="text-[11px] text-emerald-700">No payment required for this program.</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs">
                      ₹0.00
                    </span>
                  </div>
                ) : (
                  /* Dynamic UPI QR Box (Phase 2 Section 6) */
                  <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-inner">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                          Payable Course Fee
                        </span>
                        <span className="text-2xl font-black text-white font-mono">
                          ₹{selectedCourseForEnroll.price}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-mono">Official UPI ID</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <code className="text-xs font-mono font-bold text-cyan-300">
                            akashpaik570@oksbi
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            title="Copy UPI ID"
                          >
                            {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic QR Code */}
                    <div className="text-center space-y-2">
                      <div className="w-44 h-44 mx-auto p-2.5 bg-white rounded-2xl shadow-md flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                            `upi://pay?pa=akashpaik570@oksbi&pn=ARDM%20Academy&am=${selectedCourseForEnroll.price}&tn=${encodeURIComponent(
                              selectedCourseForEnroll.title
                            )}&cu=INR`
                          )}`}
                          alt="Dynamic UPI QR"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Scan with GPay, PhonePe, Paytm, or BHIM to pay ₹{selectedCourseForEnroll.price}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/80 text-[11px] text-slate-300 space-y-1">
                      <p className="font-semibold text-white">Payment Instructions:</p>
                      <p>1. Scan the dynamic QR above or send to <strong>akashpaik570@oksbi</strong>.</p>
                      <p>2. Copy the 12-digit UPI UTR / Transaction ID from your receipt.</p>
                      <p>3. Enter your details & UTR below to submit proof for review.</p>
                    </div>
                  </div>
                )}

                {/* Candidate Info Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={enrollStudentName}
                      onChange={(e) => setEnrollStudentName(e.target.value)}
                      placeholder="Enter candidate's full legal name"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mobile (+91) *</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={enrollStudentMobile}
                        onChange={(e) => setEnrollStudentMobile(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={enrollStudentEmail}
                        onChange={(e) => setEnrollStudentEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">School / Institution Name</label>
                    <input
                      type="text"
                      value={enrollStudentSchool}
                      onChange={(e) => setEnrollStudentSchool(e.target.value)}
                      placeholder="e.g. Bidhan Nagar Government High School"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                    />
                  </div>

                  {/* Payment Verification Proof (For Paid Courses) */}
                  {!selectedCourseForEnroll.isFree && selectedCourseForEnroll.price > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                      <span className="font-bold text-amber-950 block text-xs">
                        Transaction Verification Details
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-amber-900 mb-1">
                            UPI Transaction ID / UTR *
                          </label>
                          <input
                            type="text"
                            required
                            value={enrollTransactionId}
                            onChange={(e) => setEnrollTransactionId(e.target.value)}
                            placeholder="e.g. 439281726354"
                            className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-amber-900 mb-1">Payment Date *</label>
                          <input
                            type="date"
                            required
                            value={enrollPaymentDate}
                            onChange={(e) => setEnrollPaymentDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-mono"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-amber-800">
                        Status after submission: <strong>Payment Under Review</strong>. Admin will verify with bank statement before activating enrollment.
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourseForEnroll(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingEnrollment}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingEnrollment
                      ? 'Submitting Proof...'
                      : selectedCourseForEnroll.isFree || selectedCourseForEnroll.price === 0
                      ? 'Confirm Free Enrollment'
                      : 'Submit Payment for Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MY ENROLLMENTS LOOKUP MODAL (Phase 2 Section 7) */}
      {showStatusModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-extrabold text-base text-slate-900">
                  My Enrolled Courses & Status
                </h4>
                <p className="text-[11px] text-slate-500">
                  Check your course access activation and admin verification status.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLookupStatus} className="flex gap-2">
              <input
                type="text"
                required
                value={statusLookupInput}
                onChange={(e) => setStatusLookupInput(e.target.value)}
                placeholder="Enter registered mobile or email"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shrink-0 cursor-pointer"
              >
                Lookup
              </button>
            </form>

            {hasSearchedStatus && (
              <div className="pt-2 border-t border-slate-100 space-y-3">
                {myEnrollments.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-50 text-center text-slate-500">
                    No enrollments found for &quot;{statusLookupInput}&quot;. Please check the number or enroll in a course above.
                  </div>
                ) : (
                  myEnrollments.map((enr) => (
                    <div
                      key={enr.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <strong className="text-slate-900 text-sm">{enr.courseTitle}</strong>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                            enr.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : enr.status === 'Under Review'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : enr.status === 'Reverification'
                              ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {enr.status === 'Active' ? 'ACTIVE ACCESS' : enr.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <p>Student: <strong>{enr.studentName}</strong></p>
                        <p>UTR: <span className="font-mono">{enr.transactionId}</span></p>
                        {enr.adminNotes && (
                          <p className="text-rose-600 font-semibold pt-1">
                            Admin Note: {enr.adminNotes}
                          </p>
                        )}
                      </div>

                      {enr.status === 'Active' ? (
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setShowStatusModal(false);
                              onNavigate('/portal');
                            }}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-xs flex items-center justify-center gap-1.5"
                          >
                            <span>Access Course Dashboard</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-amber-50 text-[11px] text-amber-800 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                          <span>
                            Course Access unlocks automatically once Admin verifies the payment.
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
