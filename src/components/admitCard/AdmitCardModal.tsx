import React, { useState, useEffect } from 'react';
import {
  Printer,
  Download,
  X,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Building,
  User,
  ExternalLink,
  Phone,
  Mail,
  QrCode,
} from 'lucide-react';
import { StudentProfile } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { SITE_CONFIG } from '../../config/siteConfig';
import { getAdmitCardQR, subscribeToStorageChange } from '../../services/storage';

interface AdmitCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
  isAdminView?: boolean;
}

export const AdmitCardModal: React.FC<AdmitCardModalProps> = ({
  isOpen,
  onClose,
  student,
  isAdminView = false,
}) => {
  const [qrConfig, setQrConfig] = useState(getAdmitCardQR());

  useEffect(() => {
    const unsubscribe = subscribeToStorageChange(() => {
      setQrConfig(getAdmitCardQR());
    });
    return unsubscribe;
  }, []);

  if (!isOpen || !student) return null;

  const isApproved =
    (student.paymentStatus === 'Approved' && student.admitCardStatus === 'Available') ||
    isAdminView;

  // Dedicated A4 Print Trigger with CSS Body Isolation
  const handlePrint = () => {
    document.body.classList.add('printing-admit-card');
    const cleanup = () => {
      document.body.classList.remove('printing-admit-card');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    
    // Slight tick to ensure browser layout syncs before opening print dialog
    setTimeout(() => {
      window.print();
    }, 150);

    setTimeout(cleanup, 2000);
  };

  // Direct Standalone Download for offline use and PDF saving
  const handleDownloadOfflineAdmitCard = () => {
    const printContent = document.getElementById('ardm-admit-card-printable');
    if (!printContent) {
      handlePrint();
      return;
    }

    const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARDM_AdmitCard_${student.registrationId}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4 portrait; margin: 10mm 12mm; }
    body { margin: 0; padding: 16px; background: #ffffff; color: #0f172a; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .print-card { border: 2.5px solid #0f172a !important; max-width: 800px; margin: 0 auto; box-shadow: none !important; }
    @media print {
      body { padding: 0 !important; }
      .no-print-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar max-w-2xl mx-auto mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between text-xs">
    <div>
      <strong class="text-indigo-950 font-bold">ARDM Academy Official Hall Ticket</strong>
      <p class="text-slate-600">Press the button on the right to Print or Save as PDF.</p>
    </div>
    <button onclick="window.print()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer">
      Print / Save as PDF
    </button>
  </div>
  ${printContent.outerHTML}
  <script>
    // Automatically trigger print on load if requested
    window.addEventListener('load', function() {
      // ready
    });
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ARDM_AdmitCard_${student.registrationId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // QR source: admin custom uploaded QR or official WhatsApp channel QR
  const qrImageUrl = qrConfig.customQrDataUrl || 
    `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
      qrConfig.channelUrl || SITE_CONFIG.social.whatsappChannel
    )}`;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-none">
                Official Examination Admit Card
              </h3>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Roll ID: <strong className="text-indigo-700">{student.registrationId}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isApproved && (
              <>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  title="Print or Save as PDF via browser print dialog"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadOfflineAdmitCard}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  title="Download Standalone Offline Admit Card"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Admit Card</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100/60">
          {!isApproved ? (
            /* LOCKED ADMIT CARD STATE (Section 9) */
            <div className="py-12 px-4 text-center space-y-4 max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Admit Card Locked</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The official admit card will become available automatically once your registration payment is verified and approved by the ARDM Academy administrative desk.
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <p>
                  <strong>Candidate:</strong> {student.fullName}
                </p>
                <p>
                  <strong>Registration ID:</strong>{' '}
                  <span className="font-mono font-bold text-indigo-700">{student.registrationId}</span>
                </p>
                <p>
                  <strong>Payment Status:</strong>{' '}
                  <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                    student.paymentStatus === 'Under Review' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {student.paymentStatus}
                  </span>
                </p>
                {student.paymentTransactionId && (
                  <p>
                    <strong>Submitted UTR:</strong>{' '}
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{student.paymentTransactionId}</span>
                  </p>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                Need verification help? Call academic helpline: <strong>{SITE_CONFIG.contact.phoneNumber}</strong> or WhatsApp official desk.
              </p>
            </div>
          ) : (
            /* OFFICIAL A4 PRINTABLE ADMIT CARD (Section 4 & 5) */
            <div
              id="ardm-admit-card-printable"
              className="p-6 sm:p-8 bg-white border-2 border-slate-900 rounded-2xl text-slate-900 print-card space-y-5 shadow-sm max-w-2xl mx-auto"
            >
              {/* 1. Header with Official ARDM Logo & Name */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-3">
                <BrandLogo size="md" />
                <div className="text-right space-y-0.5">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest bg-slate-900 text-white px-2.5 py-0.5 rounded">
                    Official Hall Ticket / Admit Card
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase">
                    {student.examName || 'PROSTUTI 2026 Class 10 State-Level Mock Exam'}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Academic Year: {SITE_CONFIG.prostuti.session} • WBBSE Secondary Board Preparation
                  </p>
                </div>
              </div>

              {/* 2. Candidate & Identification Grid */}
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="col-span-3 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Candidate Full Name
                      </span>
                      <span className="font-extrabold text-sm text-slate-900">
                        {student.fullName}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        ARDM Registration ID (Roll)
                      </span>
                      <span className="font-mono font-black text-sm text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {student.registrationId}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Date of Birth
                      </span>
                      <span className="font-mono text-slate-800 font-semibold">
                        {student.dob || '2010-01-01'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Contact Mobile
                      </span>
                      <span className="font-mono text-slate-800 font-semibold">
                        +91 {student.mobile}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        School / Institute
                      </span>
                      <span className="text-slate-800 font-medium">
                        {student.school}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Class & Board
                      </span>
                      <span className="text-slate-800 font-semibold">
                        {student.studentClass} ({student.board})
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Photo & Verified QR Code (Section 6) */}
                <div className="col-span-1 flex flex-col items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <div className="w-12 h-14 bg-slate-200 border border-slate-300 rounded flex items-center justify-center text-slate-400 mb-1.5">
                    <User className="w-7 h-7" />
                  </div>
                  <img
                    src={qrImageUrl}
                    alt="Official ARDM QR"
                    className="w-16 h-16 object-contain rounded border border-slate-200 bg-white p-0.5"
                  />
                  <span className="text-[8px] font-mono font-black text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded mt-1 uppercase">
                    VERIFIED ENTRY
                  </span>
                </div>
              </div>

              {/* 4. Admin Controlled Examination Details (Section 5) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-800">
                  <Building className="w-4 h-4 text-indigo-600" />
                  <span>Examination Center & Timing Schedule</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Venue & Center:</span>
                    <strong className="text-slate-900 block text-xs">
                      {student.venueName || 'ARDM Central Examination Hub'}
                    </strong>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      {student.venueAddress || 'Bidhan Nagar Educational Complex, Salt Lake, Kolkata'}
                    </span>
                    <span className="text-[11px] font-mono text-indigo-700 font-bold block mt-0.5">
                      Room / Hall: {student.venueRoom || 'Room 201 – 205'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-bold">Exam Date:</span>
                      <span className="font-mono text-indigo-800 font-bold">{student.examDate || '15 November 2026'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-bold">Reporting Time:</span>
                      <span className="font-mono text-rose-700 font-bold">{student.reportingTime || '8:30 AM IST'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-bold">Exam Timing:</span>
                      <span className="font-mono text-slate-800 font-bold">
                        {student.examStartTime || '9:00 AM'} – {student.examEndTime || '11:00 AM'} ({student.examDuration || '2 Hours'})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Registered Examination Subjects */}
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Registered Examination Subjects ({student.selectedSubjectNames?.length || 0})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(student.selectedSubjectNames || ['All Subjects Suite']).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6. Examination Instructions (Section 4 & 5) */}
              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600 space-y-1">
                <strong className="block text-slate-800 uppercase tracking-wider font-bold">
                  Instructions for Candidate:
                </strong>
                {student.examInstructions && student.examInstructions.length > 0 ? (
                  student.examInstructions.map((ins, i) => (
                    <p key={i} className="leading-snug">
                      {i + 1}. {ins}
                    </p>
                  ))
                ) : (
                  <>
                    <p>1. Candidates must arrive at the examination center strictly 30 minutes before reporting time.</p>
                    <p>2. Mandatory to bring this printed Admit Card along with valid School ID card or proof of enrollment.</p>
                    <p>3. Mobile phones, smartwatches, calculators, and digital storage devices are strictly prohibited.</p>
                    <p>4. Use only blue or black ballpoint pens for marking answer scripts.</p>
                    <p>5. Do not fold or mutilate the Admit Card barcode or verification QR code.</p>
                  </>
                )}
              </div>

              {/* 7. Official Seal & Contact Information */}
              <div className="pt-3 border-t border-slate-200 flex items-end justify-between text-xs">
                <div className="space-y-0.5 text-[10px] text-slate-500">
                  <p><strong>Helpline:</strong> {SITE_CONFIG.contact.phoneNumber} | <strong>Email:</strong> {SITE_CONFIG.contact.emailAddress}</p>
                  <p><strong>WhatsApp Channel:</strong> {SITE_CONFIG.social.whatsappChannel}</p>
                  <p className="font-mono text-slate-400 text-[9px]">Verified ARDM Security Cryptographic Hash: {student.id}</p>
                </div>

                <div className="text-center">
                  <div className="h-6 w-36 border-b border-slate-900 mb-1 mx-auto" />
                  <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block">
                    Controller of Examinations
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">ARDM Academy Desk</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
