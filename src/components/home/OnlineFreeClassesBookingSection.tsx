import React, { useState } from 'react';
import {
  PhoneCall,
  Phone,
  MessageCircle,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  HelpCircle,
  HeartHandshake,
  FileText,
  Award,
  Zap,
  Users,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Flame,
  Calendar,
  AlertCircle,
  Check
} from 'lucide-react';

interface OnlineFreeClassesBookingSectionProps {
  onNavigate?: (path: string) => void;
}

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfaShqjqwxM7v7nlHixgApJzjJDBwipl4RC7M5B1LxlgRVP7Q/viewform?usp=publish-editor';

const HELPLINE_1 = '6289139984';

export const OnlineFreeClassesBookingSection: React.FC<OnlineFreeClassesBookingSectionProps> = ({
  onNavigate,
}) => {
  const [selectedClass, setSelectedClass] = useState<'8' | '9' | '10'>('10');
  const [selectedSlot, setSelectedSlot] = useState<string>('evening');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const CLASS_DATA = {
    '10': {
      label: 'Class 10 (Madhyamik / মাধ্যমিক)',
      titleBn: 'দশম শ্রেণি — মাধ্যমিক স্পেশাল বোর্ড মাস্টার ব্যাচ',
      tagline: 'সম্পূর্ণ সিলেবাস রিভিশন, টেস্ট পেপার সলভিং ও ৯৬%+ সম্ভাব্য কমন প্রশ্ন ব্যাংক',
      subjects: ['গণিত (Mathematics)', 'ভৌতবিজ্ঞান (Physical Sci)', 'জীবন বিজ্ঞান (Life Sci)', 'ইতিহাস ও ভূগোল', 'বাংলা ও ইংরেজি'],
      slots: [
        { id: 'morning', time: 'সকাল ৭:৩০ – ৯:০০ IST', name: 'Morning Topper Batch', seatsLeft: 8 },
        { id: 'evening', time: 'সন্ধ্যা ৬:০০ – ৭:৩০ IST', name: 'Evening Prime Batch', seatsLeft: 5 },
        { id: 'night', time: 'রাত ৮:৩০ – ১০:০০ IST', name: 'Night Doubt & Test Batch', seatsLeft: 12 },
      ],
      features: [
        'মাধ্যমিক ২০২৬ সাজেস্টিভ প্রেডিক্টেড প্রশ্নাবলি',
        'উপাখ্যান ও উপপাদ্য লেখার বিশেষ কৌশল',
        'অধ্যায়ভিত্তিক ফ্রি টেস্ট ও খাতা মূল্যায়ন',
      ],
    },
    '9': {
      label: 'Class 9 (নবম শ্রেণি)',
      titleBn: 'নবম শ্রেণি — মাধ্যমিক ফাউন্ডেশন ব্যাচ',
      tagline: 'মাধ্যমিকের মূল ভিত্তি স্থাপন, জটিল বিজ্ঞান ও অংকের সহজ ধারণা',
      subjects: ['গণিত (Advanced Math)', 'ভৌতবিজ্ঞান (পদার্থ ও শক্তি)', 'জীবন বিজ্ঞান (কোষ ও কলা)', 'বাংলা ও ইংরেজি ব্যাকরণ'],
      slots: [
        { id: 'morning', time: 'সকাল ৮:০০ – ৯:৩০ IST', name: 'Morning Foundation Slot', seatsLeft: 14 },
        { id: 'evening', time: 'বিকেল ৫:০০ – ৬:৩০ IST', name: 'Evening Concept Slot', seatsLeft: 9 },
        { id: 'night', time: 'রাত ৭:৩০ – ৯:০০ IST', name: 'Night Q&A Slot', seatsLeft: 16 },
      ],
      features: [
        'ক্লাস ৯ এর সিলেবাস সম্পূর্ণ কভারেজ',
        'অংক ও বিজ্ঞানের বেসিক দুর্বলতা দূরীকরণ',
        'দাদা-দিদির পার্সোনাল হ্যান্ডহোল্ডিং গাইডেন্স',
      ],
    },
    '8': {
      label: 'Class 8 (অষ্টম শ্রেণি)',
      titleBn: 'অষ্টম শ্রেণি — স্ট্রং বেসিক্স ও লজিক ব্যাচ',
      tagline: 'ভীতি কাটিয়ে বিষয় বোঝার আনন্দ ও মেধা বিকাশের সেরা সুযোগ',
      subjects: ['গণিত ও জ্যামিতি', 'পরিবেশ ও বিজ্ঞান', 'ভাষা ও ব্যাকরণ সাহিত্য', 'কম্পিউটার ও ডিজিটাল স্কিল'],
      slots: [
        { id: 'morning', time: 'সকাল ৮:৩০ – ৯:৪৫ IST', name: 'Morning Starter Slot', seatsLeft: 18 },
        { id: 'evening', time: 'বিকেল ৪:৩০ – ৫:৪৫ IST', name: 'Evening Active Slot', seatsLeft: 11 },
        { id: 'night', time: 'সন্ধ্যা ৭:০০ – ৮:১৫ IST', name: 'Evening Practice Slot', seatsLeft: 15 },
      ],
      features: [
        'সহজ বাংলায় হাতে-কলমে বিষয় শেখা',
        'স্কুল পরীক্ষার সেরা ফলাফলের প্রস্তুতি',
        'অনলাইন ক্লাসে বন্ধুদের সাথে গ্রুপ স্টাডি',
      ],
    },
  };

  const currentClassData = CLASS_DATA[selectedClass];

  return (
    <section
      id="free-online-classes"
      className="relative py-16 sm:py-20 bg-gradient-to-b from-[#090D1A] via-[#0E1528] to-[#0A0E1A] text-white overflow-hidden border-y border-red-500/30"
    >
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#EF4444_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600/20 via-rose-500/20 to-red-600/20 border border-red-500/40 text-red-300 text-xs sm:text-sm font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE) • অষ্টম, নবম ও দশম (মাধ্যমিক)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            অনলাইন সম্পূর্ণ <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">ফ্রি ক্লাস ও লাইভ সিট বুকিং</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            দাদা-দিদির আন্তরিক গাইডেন্সে যেকোনো সময় ডাউট সলভিং, ফ্রি নোটস, ফ্রি কাউন্সেলিং এবং ১০০% কমন প্রেডিক্টেড প্রশ্নাবলি — 
            <span className="text-amber-300 font-bold ml-1">পশ্চিমবঙ্গ বোর্ডের সমস্ত ছাত্র-ছাত্রীদের জন্য সবকিছু সম্পূর্ণ বিনামূল্যে!</span>
          </p>

          {/* Quick Notice Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>লাইভ ব্যাচে সীমিত আসন • নিচের লিংকে বিবরণ দিয়ে এখনই ফ্রি সিট বুক করুন</span>
          </div>
        </div>

        {/* 1. Direct Calling Helpline & Instant Slot Booking Strip */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-red-950/70 via-slate-900/90 to-red-950/70 border-2 border-red-500/40 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  সরাসরি কল করে সিট ও স্লট বুকিং হেল্পলাইন (সকাল ৮টা – রাত ১১টা)
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                যেকোনো প্রয়োজনে সরাসরি ফোন করুন দাদা-দিদিকে
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                এক ক্লিকে কল করুন অথবা হোয়াটসঅ্যাপ করুন — আপনার পছন্দের ক্লাসের সময় স্লট সাথে সাথে কনফার্ম হবে।
              </p>
            </div>

            {/* Direct Call Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Phone 1: 6289139984 */}
              <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-900 p-1 sm:p-1.5 rounded-2xl border border-red-500/50 shadow-lg max-w-full">
                <a
                  href={`tel:${HELPLINE_1}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs sm:text-base font-bold shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  title="Direct Call 6289139984"
                >
                  <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
                  <span>{HELPLINE_1}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(HELPLINE_1)}
                  className="px-2 sm:px-2.5 py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                  title="Copy Number"
                >
                  {copiedNumber === HELPLINE_1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Copy'}
                </button>
                <a
                  href={`https://wa.me/91${HELPLINE_1}?text=Hello%20ARDM%20Academy%2C%20I%20want%20to%20book%20a%20free%20online%20class%20seat%20for%20West%20Bengal%20Board.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                  title="WhatsApp 6289139984"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Class Selector (Class 8, 9, 10 Madhyamik) */}
        <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center sm:justify-center sm:gap-4 mb-8">
          {(['10', '9', '8'] as const).map((cls) => {
            const isSelected = selectedClass === cls;
            return (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`w-full sm:w-auto sm:min-w-[180px] py-2.5 sm:py-3.5 px-1.5 sm:px-4 rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-sm transition-all cursor-pointer border text-center ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400 shadow-xl shadow-red-900/30 scale-102'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <GraduationCap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{cls === '10' ? 'Class 10' : `Class ${cls}`}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. Main Slotting & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          {/* Left: Class Details & Slot Booking Schedule */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {currentClassData.titleBn}
                  </h3>
                  <p className="text-xs sm:text-sm text-red-400 font-medium mt-0.5">
                    {currentClassData.tagline}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  ১০০% সম্পূর্ণ ফ্রি
                </span>
              </div>

              {/* Subject Badges */}
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                  কভার করা বিষয়সমূহ (All Core Subjects):
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentClassData.subjects.map((sub) => (
                    <span
                      key={sub}
                      className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Slot Selection */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-red-400" />
                    <span>লাইভ ক্লাস সময় স্লট নির্বাচন করুন (Select Your Preferred Time):</span>
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono">লাইভ ব্যাচ</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentClassData.slots.map((slot) => {
                    const isSlotSelected = selectedSlot === slot.id;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSlotSelected
                            ? 'bg-red-950/60 border-red-500 ring-2 ring-red-500/30 shadow-md'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className={`font-bold ${isSlotSelected ? 'text-red-300' : 'text-slate-300'}`}>
                            {slot.name}
                          </span>
                          {isSlotSelected && <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                        </div>
                        <div className="text-[11px] font-mono text-white flex items-center gap-1 mb-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{slot.time}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-amber-400 font-semibold font-mono">
                            আর মাত্র {slot.seatsLeft}টি সিট!
                          </span>
                          <span className="text-emerald-400 font-bold">Free</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key batch highlights */}
              <div className="pt-2">
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {currentClassData.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Big Action CTA to Book Seat */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-red-900/40 hover:scale-102 active:scale-98 transition-all cursor-pointer text-center"
              >
                <span>Seat Book Now (ফ্রি সিট বুক করুন)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={`tel:${HELPLINE_1}`}
                className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>সরাসরি কল: {HELPLINE_1}</span>
              </a>
            </div>
          </div>

          {/* Right: The 8 Core Promised Free Pillars */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-[#0C1222] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                <ShieldCheck className="w-5 h-5 text-red-400" />
                <h4 className="text-lg font-extrabold text-white">
                  সবকিছু সম্পূর্ণ বিনামূল্যে যা যা পাবেন:
                </h4>
              </div>

              {/* 8 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-xs">
                {/* 1. Free guidance by Dada-Didi */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Free Guidance by Dada-Didi</h5>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      দাদা-দিদির আপনজনের মতো আন্তরিক মেন্টরশিপ — কোনো ভয় বা দ্বিধা ছাড়া শেখার পরিবেশ।
                    </p>
                  </div>
                </div>

                {/* 2. Feel free to ask any doubt all time */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Feel Free to Ask Any Doubt All Time</h5>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      ২৪x৭ যেকোনো সময় যেকোনো প্রশ্নের ছবি বা ভয়েস পাঠিয়ে সমাধান চান।
                    </p>
                  </div>
                </div>

                {/* 3. Got instant reply */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Got Instant Reply</h5>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      দেরি না করে সাথে সাথে স্টেপ-বাই-স্টেপ সহজ সমাধান বুঝিয়ে দেওয়া হয়।
                    </p>
                  </div>
                </div>

                {/* 4. Free Notes */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Free Notes & Study PDF</h5>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      অধ্যায়ভিত্তিক কালারফুল হ্যান্ডরিটেন নোটস, ফর্মুলা শীট ও সামারি বিনামূল্যে ডাউনলোড।
                    </p>
                  </div>
                </div>

                {/* 5. Free doubt Solving */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Free Doubt Solving</h5>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      ওয়ান-টু-ওয়ান লাইভ সেশনে দুর্বল টপিক সহজ ভাষায় ক্লিয়ার করার নিশ্চয়তা।
                    </p>
                  </div>
                </div>

                {/* 6. Free Counseling */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Free Counseling</h5>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      পরীক্ষার ভয় দূরীকরণ, পড়াশোনার রুটিন প্ল্যানিং ও অভিভাবক সহ মেন্টাল কাউন্সেলিং।
                    </p>
                  </div>
                </div>

                {/* 7. Proper predicted question */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Proper Predicted Questions</h5>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      বোর্ড বিশেষজ্ঞদের তৈরি করা ১০০% কমন উপযোগী টেস্ট ও ফাইনাল পরীক্ষার সাজেস্টিভ প্রশ্ন।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Form Action Link Callout */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 bg-slate-950/70 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-300 block mb-2 font-medium">
                গুগল ফর্মে মাত্র ১ মিনিটে নাম, ক্লাস ও ফোন নম্বর দিয়ে সিট লক করুন:
              </span>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <span>ফর্ম পূরণ করুন (Fill Student Details)</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 4. Bottom Sticky / Trust Guarantee Bar */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">
                পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের সমস্ত ছাত্র-ছাত্রীদের জন্য ১০০% ফ্রি
              </span>
              <span className="text-slate-400">
                কোনো হিডেন চার্জ বা রেজিস্ট্রেশন ফি নেই। সমস্ত ক্লাস ও নোটস চিরকাল ফ্রি থাকবে।
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${HELPLINE_1}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold transition-colors cursor-pointer border border-red-500/50 hover:border-red-400"
              title="Call Helpline Directly"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>Call: {HELPLINE_1}</span>
            </a>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Book Seat</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
