import React, { useState } from 'react';
import { Activity, Heart, Droplets, Zap, Info, ShieldCheck, Flame } from 'lucide-react';

interface PartInfo {
  id: string;
  nameBn: string;
  nameEn: string;
  type: 'chamber' | 'vessel' | 'valve' | 'node';
  bloodType: 'oxygenated' | 'deoxygenated' | 'mixed' | 'electrical';
  functionSummary: string;
  madhyamikQuestion: string;
}

const HEART_PARTS: Record<string, PartInfo> = {
  ra: {
    id: 'ra',
    nameBn: 'ডান অলিন্দ (Right Atrium)',
    nameEn: 'Right Atrium',
    type: 'chamber',
    bloodType: 'deoxygenated',
    functionSummary: 'উর্ধ্ব ও নিম্ন মহাশিরা থেকে কার্বন ডাই-অক্সাইডযুক্ত দূষিত রক্ত গ্রহণ করে এবং ত্রিপত্র কপাটিকা দিয়ে ডান নিলয়ে পাঠায়।',
    madhyamikQuestion: 'উর্ধ্ব ও নিম্ন মহাশিরার রক্ত অলিন্দে প্রবেশের সময় অলিন্দের সংকোচন না প্রসারণ ঘটে?'
  },
  rv: {
    id: 'rv',
    nameBn: 'ডান নিলয় (Right Ventricle)',
    nameEn: 'Right Ventricle',
    type: 'chamber',
    bloodType: 'deoxygenated',
    functionSummary: 'সংকোচনের মাধ্যমে ফুসফুসীয় ধমনী দিয়ে দূষিত রক্ত পরিশোধনের জন্য উভয় ফুসফুসে পাম্প করে।',
    madhyamikQuestion: 'ডান নিলয় থেকে উৎপন্ন রক্তবাহটির নাম কী ও এর কাজ কী?'
  },
  la: {
    id: 'la',
    nameBn: 'বাম অলিন্দ (Left Atrium)',
    nameEn: 'Left Atrium',
    type: 'chamber',
    bloodType: 'oxygenated',
    functionSummary: 'ফুসফুসীয় শিরার মাধ্যমে ফুসফুস থেকে অক্সিজেনসমৃদ্ধ বিশুদ্ধ রক্ত গ্রহণ করে এবং দ্বিপত্র কপাটিকা দিয়ে বাম নিলয়ে পাঠায়।',
    madhyamikQuestion: 'ফুসফুসীয় শিরায় কোন ধরনের রক্ত প্রবাহিত হয় (ব্যতিক্রমী ধমনী-শিরার ধর্ম)?'
  },
  lv: {
    id: 'lv',
    nameBn: 'বাম নিলয় (Left Ventricle)',
    nameEn: 'Left Ventricle',
    type: 'chamber',
    bloodType: 'oxygenated',
    functionSummary: 'হৃদপিণ্ডের সবচেয়ে শক্তিশালী পেশীযুক্ত প্রকোষ্ঠ; মহাধমনীর মাধ্যমে সারা দেহে বিশুদ্ধ রক্ত উচ্চ চাপে ছড়িয়ে দেয়।',
    madhyamikQuestion: 'বাম নিলয়ের প্রাচীর ডান নিলয়ের চেয়ে বেশি পুরু কেন?'
  },
  aorta: {
    id: 'aorta',
    nameBn: 'মহাধমনী (Systemic Aorta)',
    nameEn: 'Aorta',
    type: 'vessel',
    bloodType: 'oxygenated',
    functionSummary: 'দেহের প্রধানতম ধমনী যা আর্টারিয়াল আর্চ দ্বারা মস্তিষ্ক ও সারা শরীরে অক্সিজেনযুক্ত রক্ত সরবরাহ করে।',
    madhyamikQuestion: 'মহাধমনীর গোড়ায় অবস্থিত কপাটিকাটির নাম কী?'
  },
  pulmonary_artery: {
    id: 'pulmonary_artery',
    nameBn: 'ফুসফুসীয় ধমনী (Pulmonary Artery)',
    nameEn: 'Pulmonary Artery',
    type: 'vessel',
    bloodType: 'deoxygenated',
    functionSummary: 'একমাত্র ব্যতিক্রমী ধমনী যা ডান নিলয় থেকে ফুসফুসে কার্বন ডাই-অক্সাইডযুক্ত রক্ত নিয়ে যায়।',
    madhyamikQuestion: 'ধমনী হলেও ফুসফুসীয় ধমনী কেন দূষিত রক্ত বহন করে?'
  },
  valves: {
    id: 'valves',
    nameBn: 'দ্বিপত্র ও ত্রিপত্র কপাটিকা (Bicuspid & Tricuspid Valves)',
    nameEn: 'Atrioventricular Valves',
    type: 'valve',
    bloodType: 'mixed',
    functionSummary: 'অলিন্দ থেকে নিলয়ে রক্তের একমুখী প্রবাহ নিশ্চিত করে এবং রক্তের বিপরীতমুখী প্রবাহ কঠোরভাবে প্রতিহত করে।',
    madhyamikQuestion: 'কপাটিকা নষ্ট হলে মানবদেহে কী প্রতিক্রিয়া দেখা যায়?'
  },
  sa_node: {
    id: 'sa_node',
    nameBn: 'এস.এ নোড / পেসমেকার (SA Node - Sinoatrial Node)',
    nameEn: 'Sinoatrial Pacemaker',
    type: 'node',
    bloodType: 'electrical',
    functionSummary: 'হৃদস্পন্দনের বৈদ্যুতিক তরঙ্গ (Cardiac Impulse) স্বতঃস্ফূর্তভাবে তৈরি করে ছন্দবদ্ধ সংকোচন ঘটায়।',
    madhyamikQuestion: 'এস.এ নোডকে মানবদেহের প্রাকৃতিক পেসমেকার বলা হয় কেন?'
  }
};

export const LifeScienceHeartDiagram: React.FC = () => {
  const [selectedPartKey, setSelectedPartKey] = useState<string>('lv');
  const [bpm, setBpm] = useState<number>(72);
  const [showBloodFlow, setShowBloodFlow] = useState<boolean>(true);
  const [cyclePhase, setCyclePhase] = useState<'systole' | 'diastole'>('systole');

  const selectedPart = HEART_PARTS[selectedPartKey] || HEART_PARTS['lv'];
  const beatDuration = (60 / bpm).toFixed(2);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-[#0B101D] to-slate-950 border border-emerald-500/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
              জীবন বিজ্ঞান • চিত্রাঙ্কন ও অভ্যন্তরীণ সংবহন
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>মানব হৃদপিণ্ডের জীবন্ত অ্যানিমেটেড ডায়াগ্রাম</span>
            <Activity className="w-5 h-5 text-rose-500" />
          </h3>
          <p className="text-xs text-white/80 mt-1">
            মাধ্যমিক ৫-নম্বরি চিহ্নিত চিত্র: ৪টি প্রকোষ্ঠ, কপাটিকা, রক্তসংবহন চক্র ও এস.এ নোড পেসমেকার
          </p>
        </div>

        {/* Live Cardiac Status Badge */}
        <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
          <span className="text-xs font-mono font-bold text-white">{bpm} BPM</span>
          <span className="text-[10px] text-emerald-400 font-mono">({beatDuration}s / চক্র)</span>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Living Human Heart Representation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800 relative">
          {/* Blood Type Legend */}
          <div className="w-full flex items-center justify-between text-[11px] mb-3 px-2">
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
              কার্বন ডাই-অক্সাইডযুক্ত রক্ত (CO₂ Rich)
            </span>
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
              অক্সিজেনযুক্ত বিশুদ্ধ রক্ত (O₂ Rich)
            </span>
          </div>

          <svg
            viewBox="0 0 420 360"
            className="w-full max-w-[420px] h-auto drop-shadow-2xl select-none"
            style={{
              animation: `pulse ${beatDuration}s ease-in-out infinite`
            }}
          >
            <defs>
              <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="pulmArteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
              <linearGradient id="rvWall" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>

            {/* Background Vena Cava (Superior & Inferior) */}
            <path
              d="M 110 30 L 110 110 L 140 110 L 140 30 Z"
              fill="#1E40AF"
              stroke="#3B82F6"
              strokeWidth="1.5"
            />
            <path
              d="M 110 260 L 110 320 L 140 320 L 140 260 Z"
              fill="#1E40AF"
              stroke="#3B82F6"
              strokeWidth="1.5"
            />

            {/* Aorta Arch (Huge curved red vessel at top) */}
            <g
              className="cursor-pointer transition-transform hover:opacity-90"
              onClick={() => setSelectedPartKey('aorta')}
            >
              <path
                d="M 180 120 C 180 30, 290 20, 280 120 L 250 125 C 255 60, 205 60, 205 120 Z"
                fill="url(#aortaGrad)"
                stroke="#EF4444"
                strokeWidth={selectedPartKey === 'aorta' ? 3 : 1.5}
              />
              {/* 3 Arch arteries: Brachiocephalic, Carotid, Subclavian */}
              <rect x="210" y="25" width="10" height="28" rx="3" fill="#EF4444" />
              <rect x="230" y="20" width="10" height="32" rx="3" fill="#EF4444" />
              <rect x="250" y="28" width="10" height="25" rx="3" fill="#EF4444" />
            </g>

            {/* Pulmonary Artery (Blue crossing over aorta) */}
            <g
              className="cursor-pointer transition-transform hover:opacity-90"
              onClick={() => setSelectedPartKey('pulmonary_artery')}
            >
              <path
                d="M 160 130 C 160 70, 220 75, 230 110 L 205 125 C 195 95, 175 95, 175 130 Z"
                fill="url(#pulmArteryGrad)"
                stroke="#60A5FA"
                strokeWidth={selectedPartKey === 'pulmonary_artery' ? 3 : 1.5}
              />
              {/* Branching left & right */}
              <path d="M 155 85 L 90 70 L 95 60 L 160 75 Z" fill="#2563EB" />
              <path d="M 225 85 L 290 70 L 285 60 L 220 75 Z" fill="#2563EB" />
            </g>

            {/* Pulmonary Veins (Red vessels entering Left Atrium) */}
            <rect x="290" y="145" width="30" height="12" rx="3" fill="#DC2626" />
            <rect x="290" y="165" width="30" height="12" rx="3" fill="#DC2626" />

            {/* Outer Muscular Heart Body Contour */}
            <path
              d="M 210 320 C 120 270, 90 200, 100 130 C 110 100, 160 100, 210 140 C 260 100, 310 100, 320 130 C 330 200, 300 270, 210 320 Z"
              fill="#0F172A"
              stroke="#475569"
              strokeWidth="2.5"
            />

            {/* Central Interventricular Septum (হৃদপিণ্ডের বিভেদক প্রাচীর) */}
            <path
              d="M 205 140 C 205 180, 202 260, 210 318 C 218 260, 215 180, 215 140 Z"
              fill="#334155"
              stroke="#64748B"
              strokeWidth="1.5"
            />

            {/* Chamber 1: Right Atrium (ডান অলিন্দ) */}
            <g
              className="cursor-pointer transition-opacity"
              onClick={() => setSelectedPartKey('ra')}
            >
              <path
                d="M 115 135 C 125 115, 175 115, 195 135 C 190 170, 170 185, 125 185 C 115 170, 110 150, 115 135 Z"
                fill={selectedPartKey === 'ra' ? '#1D4ED8' : '#1E3A8A'}
                stroke="#60A5FA"
                strokeWidth={selectedPartKey === 'ra' ? 3 : 1.5}
                opacity="0.85"
              />
              <text x="150" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">ডান অলিন্দ</text>
              <text x="150" y="168" textAnchor="middle" fill="#93C5FD" fontSize="8">(RA - CO₂)</text>
            </g>

            {/* Chamber 2: Right Ventricle (ডান নিলয়) */}
            <g
              className="cursor-pointer transition-opacity"
              onClick={() => setSelectedPartKey('rv')}
            >
              <path
                d="M 125 195 C 170 195, 195 185, 202 210 C 205 250, 195 285, 175 295 C 145 280, 125 240, 125 195 Z"
                fill={selectedPartKey === 'rv' ? '#1E40AF' : '#172554'}
                stroke="#3B82F6"
                strokeWidth={selectedPartKey === 'rv' ? 3 : 1.5}
                opacity="0.9"
              />
              <text x="160" y="240" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">ডান নিলয়</text>
              <text x="160" y="253" textAnchor="middle" fill="#93C5FD" fontSize="8">(RV - CO₂)</text>
            </g>

            {/* Chamber 3: Left Atrium (বাম অলিন্দ) */}
            <g
              className="cursor-pointer transition-opacity"
              onClick={() => setSelectedPartKey('la')}
            >
              <path
                d="M 225 135 C 245 115, 295 115, 305 135 C 310 150, 305 170, 295 185 C 250 185, 230 170, 225 135 Z"
                fill={selectedPartKey === 'la' ? '#B91C1C' : '#991B1B'}
                stroke="#F87171"
                strokeWidth={selectedPartKey === 'la' ? 3 : 1.5}
                opacity="0.85"
              />
              <text x="265" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">বাম অলিন্দ</text>
              <text x="265" y="168" textAnchor="middle" fill="#FCA5A5" fontSize="8">(LA - O₂)</text>
            </g>

            {/* Chamber 4: Left Ventricle (বাম নিলয় - পুরু পেশী) */}
            <g
              className="cursor-pointer transition-opacity"
              onClick={() => setSelectedPartKey('lv')}
            >
              <path
                d="M 218 210 C 225 185, 250 195, 295 195 C 295 240, 275 280, 215 315 C 215 285, 215 250, 218 210 Z"
                fill={selectedPartKey === 'lv' ? '#DC2626' : '#7F1D1D'}
                stroke="#EF4444"
                strokeWidth={selectedPartKey === 'lv' ? 3 : 1.5}
                opacity="0.9"
              />
              <text x="255" y="245" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">বাম নিলয়</text>
              <text x="255" y="258" textAnchor="middle" fill="#FCA5A5" fontSize="8">(LV - O₂)</text>
            </g>

            {/* SA Node (পেসমেকার) Electrical Sparking on RA wall */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedPartKey('sa_node')}
            >
              <circle cx="128" cy="125" r="7" fill="#F59E0B">
                <animate attributeName="r" values="6;9;6" dur="0.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="128" cy="125" r="14" fill="none" stroke="#FBBF24" strokeWidth="1.5">
                <animate attributeName="r" values="7;18;7" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
              </circle>
              <text x="110" y="112" fill="#FDE047" fontSize="8" fontWeight="bold">SA Node (পেসমেকার)</text>
            </g>

            {/* Valves Indicators */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedPartKey('valves')}
            >
              {/* Tricuspid */}
              <line x1="140" y1="188" x2="175" y2="188" stroke="#FDE047" strokeWidth="3" strokeDasharray="3 2" />
              {/* Bicuspid / Mitral */}
              <line x1="245" y1="188" x2="280" y2="188" stroke="#FDE047" strokeWidth="3" strokeDasharray="3 2" />
            </g>

            {/* Animated Flow Particles when Enabled */}
            {showBloodFlow && (
              <g>
                {/* Deoxygenated Blood Flow Arrows (Blue) */}
                <circle cx="125" cy="55" r="3" fill="#60A5FA">
                  <animate attributeName="cy" values="40;110;40" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="160" cy="150" r="3" fill="#60A5FA">
                  <animate attributeName="cy" values="140;210;140" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="165" cy="230" r="3" fill="#60A5FA">
                  <animate attributeName="cy" values="260;100;260" dur="2.2s" repeatCount="indefinite" />
                </circle>

                {/* Oxygenated Blood Flow Arrows (Red) */}
                <circle cx="305" cy="155" r="3" fill="#F87171">
                  <animate attributeName="cx" values="320;265;320" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="260" cy="170" r="3" fill="#F87171">
                  <animate attributeName="cy" values="160;235;160" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="245" cy="240" r="3" fill="#F87171">
                  <animate attributeName="cy" values="270;70;270" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </svg>

          {/* Quick interactive chamber chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
            {Object.keys(HEART_PARTS).map((key) => {
              const part = HEART_PARTS[key];
              const isSelected = selectedPartKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPartKey(key)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                      : 'bg-slate-900 text-white/80 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {part.nameBn.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Anatomical Details & Board Exam Insight Card */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                চিহ্নিত অংশ পরীক্ষা ও শারীরতত্ত্ব
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedPart.bloodType === 'oxygenated'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : selectedPart.bloodType === 'deoxygenated'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {selectedPart.bloodType === 'oxygenated'
                  ? 'বিশুদ্ধ রক্ত (O₂)'
                  : selectedPart.bloodType === 'deoxygenated'
                  ? 'দূষিত রক্ত (CO₂)'
                  : 'সংবহন নিয়ন্ত্রণ'}
              </span>
            </div>

            <h4 className="text-lg font-black text-white mt-3">{selectedPart.nameBn}</h4>
            <p className="text-xs font-mono text-white/70 mb-3">{selectedPart.nameEn}</p>

            <div className="space-y-3 text-xs leading-relaxed text-white/90">
              <div>
                <span className="text-emerald-400 font-bold block mb-1">শারীরবৃত্তীয় কার্যপদ্ধতি (Function):</span>
                <p className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-white/90">
                  {selectedPart.functionSummary}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-amber-400 font-bold flex items-center gap-1.5 mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  মাধ্যমিক পরীক্ষায় আসার মতো প্রশ্ন (Important 2/3M):
                </span>
                <p className="bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 text-amber-200 font-medium">
                  "{selectedPart.madhyamikQuestion}"
                </p>
              </div>
            </div>
          </div>

          {/* Heart Rhythm & Simulation Controls */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">হৃৎস্পন্দন হার (Cardiac BPM):</span>
              <span className="text-emerald-400 font-mono font-bold">{bpm} প্রতি মিনিটে</span>
            </div>
            <input
              type="range"
              min="50"
              max="130"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={() => setShowBloodFlow(!showBloodFlow)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer border ${
                  showBloodFlow
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 text-white/70 border-slate-700'
                }`}
              >
                রক্তপ্রবাহ অ্যানিমেশন: {showBloodFlow ? 'চালু' : 'বন্ধ'}
              </button>

              <button
                onClick={() => setCyclePhase(cyclePhase === 'systole' ? 'diastole' : 'systole')}
                className="px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 cursor-pointer"
              >
                চক্রাবস্থা: {cyclePhase === 'systole' ? 'সিস্টোল (সংকোচন)' : 'ডায়াস্টোল (প্রসারণ)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
