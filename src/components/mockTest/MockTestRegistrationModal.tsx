import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  QrCode,
  CreditCard,
  Building2,
  Phone,
  Mail,
  User,
  School,
  MapPin,
  Sparkles,
  Printer,
  Download,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Check,
  Loader2,
  Copy,
  Calendar,
  Lock,
  Upload,
  Image as ImageIcon,
  Trash2,
  Eye,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  SubjectItem,
} from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import {
  getSubjects,
  calculateAuthoritativePrice,
  findDuplicateRegistration,
  registerNewStudent,
  submitPaymentProof,
} from '../../services/storage';
import {
  SITE_CONFIG,
  getTelLink,
  getWhatsAppChannelLink,
  getMailtoLink,
} from '../../config/siteConfig';

interface MockTestRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSubjectId?: string;
  onOpenAdmitCard?: (student: StudentProfile) => void;
  onOpenTestEngineWithRegistration?: (regId: string) => void;
}

export const MockTestRegistrationModal: React.FC<MockTestRegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedSubjectId,
  onOpenAdmitCard,
  onOpenTestEngineWithRegistration,
}) => {
  // Step 1: Student Details -> Step 2: Guardian & School -> Step 3: Subjects & Fee -> Step 4: Payment & UTR Submission -> Step 5: Submitted Screen
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [studentDob, setStudentDob] = useState('2010-05-15');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [address, setAddress] = useState('');

  const [schoolName, setSchoolName] = useState('');
  const [teacherName, setTeacherName] = useState(''); // OPTIONAL
  const [studentClass, setStudentClass] = useState('Class 10');
  const [board, setBoard] = useState('WBBSE (Madhyamik)');
  const [location, setLocation] = useState('');

  const [availableSubjects, setAvailableSubjects] = useState<SubjectItem[]>([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  // Payment Submission State (Section 10)
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState('');
  const [screenshotFileSize, setScreenshotFileSize] = useState('');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentNote, setPaymentNote] = useState('');
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

  // Candidate Record State
  const [createdStudent, setCreatedStudent] = useState<StudentProfile | null>(null);
  const [duplicateStudent, setDuplicateStudent] = useState<StudentProfile | null>(null);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const subs = getSubjects().filter((s) => s.isActive);
      setAvailableSubjects(subs);

      if (preselectedSubjectId && subs.some((s) => s.id === preselectedSubjectId)) {
        setSelectedSubjectIds([preselectedSubjectId]);
      } else if (selectedSubjectIds.length === 0 && subs.length > 0) {
        setSelectedSubjectIds(subs.slice(0, 4).map((s) => s.id));
      }
    }
  }, [isOpen, preselectedSubjectId]);

  if (!isOpen) return null;

  const pricing = calculateAuthoritativePrice(selectedSubjectIds);

  const validateStep1 = (): boolean => {
    const err: Record<string, string> = {};
    if (!studentName.trim() || studentName.trim().length < 3) {
      err.studentName = 'Full student name is required';
    }
    const cleanPhone = studentPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      err.studentPhone = 'Please enter a valid 10-digit mobile number';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!studentEmail.trim() || !emailRegex.test(studentEmail.trim())) {
      err.studentEmail = 'Please enter a valid email address';
    }
    if (!studentDob) {
      err.studentDob = 'Date of birth is required';
    }

    setErrors(err);

    // Duplicate Check
    if (Object.keys(err).length === 0) {
      const existing = findDuplicateRegistration(cleanPhone, studentEmail);
      if (existing) {
        setDuplicateStudent(existing);
        return false;
      }
    }

    return Object.keys(err).length === 0;
  };

  const validateStep2 = (): boolean => {
    const err: Record<string, string> = {};
    if (!schoolName.trim()) {
      err.schoolName = 'School name is required';
    }
    if (!address.trim()) {
      err.address = 'Residential address is required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep3 = (): boolean => {
    const err: Record<string, string> = {};
    if (selectedSubjectIds.length === 0) {
      err.subjects = 'Please select at least one subject for PROSTUTI Mock Test';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    setErrors({});
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;

    if (currentStep === 3) {
      // Create student application record immediately with Registration ID
      const newStudent = registerNewStudent({
        fullName: studentName,
        dob: studentDob,
        email: studentEmail,
        mobile: studentPhone,
        studentClass,
        board,
        school: schoolName,
        address,
        guardianName,
        guardianPhone,
        teacherName: teacherName || undefined,
        selectedSubjectIds,
      });

      setCreatedStudent(newStudent);
      setCurrentStep(4);
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleScreenshotUpload = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, screenshot: 'Please upload an image file (PNG, JPG, JPEG, WEBP).' }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, screenshot: 'Image size exceeds 10MB limit.' }));
      return;
    }

    setScreenshotFileName(file.name);
    setScreenshotFileSize((file.size / 1024).toFixed(0) + ' KB');

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setPaymentScreenshot(canvas.toDataURL('image/jpeg', 0.82));
        } else {
          setPaymentScreenshot(rawDataUrl);
        }
        setErrors((prev) => {
          const next = { ...prev };
          delete next.screenshot;
          return next;
        });
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Submit Payment Proof (Section 10)
  const handleSubmitPaymentProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentScreenshot) {
      setErrors({ screenshot: 'Payment Screenshot is required. Please upload your payment receipt/screenshot.' });
      return;
    }

    if (!createdStudent) return;

    setIsSubmittingPayment(true);

    setTimeout(() => {
      const updated = submitPaymentProof(createdStudent.registrationId, {
        paymentScreenshotUrl: paymentScreenshot,
        transactionId: transactionId.trim() || undefined,
        paymentDate,
        amount: pricing.finalAmount,
        screenshotNote: paymentNote.trim() || undefined,
      });

      setCreatedStudent(updated);
      setIsSubmittingPayment(false);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });

      setCurrentStep(5);
    }, 600);
  };

  const copyRegId = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <div className="pl-3 border-l border-slate-200">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold">
                  Step {currentStep} of 5
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  PROSTUTI Registration
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official Class 10 State-Level Examination Platform
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1.5 shrink-0">
          <div
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* DUPLICATE DETECTED NOTICE (Section 17) */}
          {duplicateStudent && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="font-bold text-sm text-amber-950">
                    Your registration already exists.
                  </h4>
                  <p>
                    Found existing candidate record for mobile (+91 {duplicateStudent.mobile}) or email ({duplicateStudent.email}).
                  </p>
                  <p>
                    Registration ID: <strong className="font-mono">{duplicateStudent.registrationId}</strong> • Status:{' '}
                    <strong className="text-indigo-700">{duplicateStudent.paymentStatus}</strong>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {duplicateStudent.admitCardStatus === 'Available' && onOpenAdmitCard && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdmitCard(duplicateStudent);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    View Admit Card
                  </button>
                )}
                <button
                  onClick={() => setDuplicateStudent(null)}
                  className="px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-xs font-semibold text-slate-700"
                >
                  Edit Registration Form
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: STUDENT PROFILE INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Step 1: Student Information</span>
                </h4>
                <p className="text-slate-500">Official student identity details.</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Student Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Mohim Das"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                />
                {errors.studentName && <p className="text-rose-500 mt-1">{errors.studentName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={studentDob}
                    onChange={(e) => setStudentDob(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 font-mono bg-white"
                  />
                  {errors.studentDob && <p className="text-rose-500 mt-1">{errors.studentDob}</p>}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 font-mono"
                  />
                  {errors.studentPhone && <p className="text-rose-500 mt-1">{errors.studentPhone}</p>}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  />
                  {errors.studentEmail && <p className="text-rose-500 mt-1">{errors.studentEmail}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SCHOOL & GUARDIAN */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <School className="w-4 h-4 text-indigo-600" />
                  <span>Step 2: School & Guardian Information</span>
                </h4>
                <p className="text-slate-500">Academic affiliation & contact address.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    School / Institution Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. Ballygunge Government High School"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                  {errors.schoolName && <p className="text-rose-500 mt-1">{errors.schoolName}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Teacher / Mentor</label>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1 rounded uppercase font-semibold">
                      Optional
                    </span>
                  </div>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Teacher name (Leave blank if independent)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Class 10">Class 10 (Secondary / Madhyamik)</option>
                    <option value="Class 9">Class 9 (Advanced Practice)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Board</label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="WBBSE (Madhyamik)">WBBSE (Madhyamik Board)</option>
                    <option value="CBSE">CBSE Board</option>
                    <option value="ICSE">ICSE Board</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Residential Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street / Village, City, District & PIN"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
                {errors.address && <p className="text-rose-500 mt-1">{errors.address}</p>}
              </div>
            </div>
          )}

          {/* STEP 3: SUBJECT SELECTION */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Step 3: Select PROSTUTI Examination Subjects</span>
                  </h4>
                  <p className="text-slate-500">₹100 per subject. Select 1 to 8 subjects.</p>
                </div>
                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  {pricing.subjectCount} Selected • ₹{pricing.finalAmount}
                </span>
              </div>

              {errors.subjects && <p className="text-rose-500">{errors.subjects}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableSubjects.map((sub) => {
                  const isChecked = selectedSubjectIds.includes(sub.id);
                  return (
                    <div
                      key={sub.id}
                      onClick={() => toggleSubject(sub.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between select-none ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/60 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-xs flex items-center justify-center ${
                            isChecked ? 'bg-indigo-600 text-white' : 'border border-slate-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-bold text-slate-900">{sub.name}</span>
                      </div>
                      <span className="font-bold text-indigo-600">₹100</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT QR & UTR SUBMISSION (Sections 10 & 14) */}
          {currentStep === 4 && createdStudent && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-indigo-600" />
                    <span>Step 4: Scan UPI QR & Upload Payment Screenshot</span>
                  </h4>
                  <p className="text-slate-500">
                    Registration ID generated:{' '}
                    <strong className="font-mono text-indigo-700">{createdStudent.registrationId}</strong>
                  </p>
                </div>
                <span className="font-extrabold text-base text-slate-900 font-mono">
                  ₹{pricing.finalAmount}.00
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center bg-slate-50 p-5 rounded-2xl border border-slate-200">
                {/* Dynamic QR */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                        `upi://pay?pa=${SITE_CONFIG.contact.upiId}&pn=ARDM%20Academy&am=${pricing.finalAmount}&tn=ARDM-Reg-${createdStudent.registrationId}&cu=INR`
                      )}`}
                      alt="Payment QR"
                      className="w-36 h-36 rounded-lg"
                    />
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    UPI VPA: {SITE_CONFIG.contact.upiId}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Scan using Google Pay, PhonePe, or Paytm
                  </span>
                </div>

                  {/* Screenshot Upload Form */}
                <form onSubmit={handleSubmitPaymentProof} className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Upload Payment Screenshot</span>
                        <span className="text-rose-500 font-extrabold">*</span>
                      </span>
                      <span className="text-[10px] text-indigo-600 font-normal">PNG, JPG, WEBP (Max 10MB)</span>
                    </label>

                    {!paymentScreenshot ? (
                      <label
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleScreenshotUpload(e.dataTransfer.files[0]);
                          }
                        }}
                        className={`relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                          errors.screenshot
                            ? 'border-rose-400 bg-rose-50/50 hover:bg-rose-50'
                            : 'border-indigo-300 bg-indigo-50/40 hover:bg-indigo-50/80 hover:border-indigo-500'
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          className="sr-only"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleScreenshotUpload(e.target.files[0]);
                            }
                          }}
                        />
                        <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-indigo-200 flex items-center justify-center text-indigo-600 mb-1.5">
                          <Upload className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-800 text-center">
                          Click to upload or drag & drop payment screenshot
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5 text-center">
                          PhonePe / Google Pay / Paytm / Bank successful transaction receipt
                        </p>
                      </label>
                    ) : (
                      <div className="p-3 bg-white rounded-xl border border-emerald-300 shadow-xs space-y-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={paymentScreenshot}
                            alt="Payment proof preview"
                            onClick={() => setPreviewModalOpen(true)}
                            className="w-14 h-14 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-90 transition-opacity"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">Screenshot uploaded successfully</span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">
                              {screenshotFileName || 'screenshot.jpg'} {screenshotFileSize && `(${screenshotFileSize})`}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() => setPreviewModalOpen(true)}
                                className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Preview</span>
                              </button>
                              <span className="text-slate-300">•</span>
                              <label className="text-[10px] text-slate-600 hover:text-slate-800 font-semibold cursor-pointer">
                                <span>Change</span>
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg, image/jpg, image/webp"
                                  className="sr-only"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleScreenshotUpload(e.target.files[0]);
                                    }
                                  }}
                                />
                              </label>
                              <span className="text-slate-300">•</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setPaymentScreenshot(null);
                                  setScreenshotFileName('');
                                  setScreenshotFileSize('');
                                }}
                                className="text-[10px] text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {errors.screenshot && (
                      <p className="text-rose-500 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.screenshot}</span>
                      </p>
                    )}
                  </div>

                  {/* Optional Transaction ID / UTR */}
                  <div>
                    <label className="block font-medium text-slate-700 mb-1 text-[11px]">
                      Transaction ID / UTR <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 425689123456 (if available)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Payment Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Payment Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={paymentNote}
                      onChange={(e) => setPaymentNote(e.target.value)}
                      placeholder="Sender name or bank account remark"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingPayment}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    {isSubmittingPayment ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    <span>Submit Payment for Verification</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* STEP 5: SUBMITTED CONFIRMATION (Sections 10 & 13) */}
          {currentStep === 5 && createdStudent && (
            <div className="text-center space-y-4 py-4 text-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900">
                  Payment submitted successfully.
                </h4>
                <p className="text-slate-600 max-w-md mx-auto">
                  ARDM Academy will contact you as soon as possible after verification.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400">Unique Registration ID:</span>
                  <span className="font-mono font-bold text-indigo-700 text-sm">
                    {createdStudent.registrationId}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400">Candidate Name:</span>
                  <span className="font-bold text-slate-900">{createdStudent.fullName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400">Payment Status:</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Under Review
                  </span>
                </div>
                {paymentScreenshot && (
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-400">Payment Screenshot:</span>
                    <button
                      type="button"
                      onClick={() => setPreviewModalOpen(true)}
                      className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Uploaded Proof</span>
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Admit Card:</span>
                  <span className="font-semibold text-slate-600">
                    Unlocks automatically upon approval
                  </span>
                </div>
              </div>

              {/* POST-PAYMENT COMMUNICATION BUTTONS (Section 13) */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={getTelLink()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold hover:bg-blue-100 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {SITE_CONFIG.contact.phoneNumber}</span>
                </a>

                <a
                  href={getWhatsAppChannelLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join WhatsApp Channel</span>
                </a>

                <a
                  href={getMailtoLink()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Support</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
                >
                  Close & Return to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        {currentStep < 4 && (
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              <span>{currentStep === 3 ? 'Generate Application & Pay' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* Full Image Preview Modal */}
        {previewModalOpen && paymentScreenshot && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="relative max-w-2xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span>Payment Screenshot Proof</span>
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(false)}
                  className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 overflow-auto max-h-[72vh] flex items-center justify-center bg-slate-950">
                <img
                  src={paymentScreenshot}
                  alt="Payment Proof Full"
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded"
                />
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                <span className="truncate">{screenshotFileName || 'screenshot.jpg'} {screenshotFileSize && `• ${screenshotFileSize}`}</span>
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(false)}
                  className="px-3 py-1 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
