import React, { useState, useEffect } from 'react';
import { Feather, Heart, Sparkles, Palette, Play, Pause, RefreshCw } from 'lucide-react';

interface BengaliPenDiagramProps {
  onPracticeClick?: () => void;
}

const POEMS = [
  {
    title: 'মরিতে চাহি না (রবীন্দ্রনাথ ঠাকুর)',
    lines: [
      'মরিতে চাহি না আমি সুন্দর ভুবনে,',
      'মানবের মাঝে আমি বাঁচিবারে চাই।',
      'এই সূর্যকরে এই পুষ্পিত কাননে',
      'জীবন্ত হৃদয়-মাঝে যদি স্থান পাই।'
    ],
    context: 'জীবনানুরাগ ও প্রকৃতির সৌন্দর্য - মাধ্যমিক বাংলা সাহিত্য সঞ্চয়ন'
  },
  {
    title: 'চিত্ত যেথা ভয়শূন্য (গীতাঞ্জলি)',
    lines: [
      'চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির,',
      'জ্ঞান যেথা মুক্ত, যেথা গৃহের প্রাচীর',
      'আপন প্রাঙ্গণমাঝে দিবসশর্বরী',
      'বসুধারে রাখে নাই খণ্ড ক্ষুদ্র করি।'
    ],
    context: 'দেশপ্রেম ও মানবমুক্তি - রচনা ও বোধপরীক্ষণ বিশেষ'
  },
  {
    title: 'বিদ্রোহী (কাজী নজরুল ইসলাম)',
    lines: [
      'বল বীর -',
      'বল উন্নত মম শির!',
      'শির নেহারি আমারি, নতশির ওই শিখর হিমাদ্রির!',
      'আমি চিরদুর্দম, দুর্বিনীত, নৃশংস...'
    ],
    context: 'অগ্নিবীণা ও বিদ্রোহী চেতনা - ব্যাকরণ ও ভাবার্থ'
  }
];

const INK_PALETTES = [
  { name: 'হৃদয়-রাঙা (Crimson Heart)', color: '#EF4444', glow: 'rgba(239,68,68,0.5)', bg: '#7F1D1D' },
  { name: 'রাজকীয় নীল (Royal Indigo)', color: '#3B82F6', glow: 'rgba(59,130,246,0.5)', bg: '#1E3A8A' },
  { name: 'শ্যামল বাংলা (Emerald Flora)', color: '#10B981', glow: 'rgba(16,185,129,0.5)', bg: '#064E3B' },
  { name: 'স্বর্ণাভ প্রদীপ (Golden Amber)', color: '#F59E0B', glow: 'rgba(245,158,11,0.5)', bg: '#78350F' },
  { name: 'রহস্যময়ী বেগুনি (Deep Violet)', color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)', bg: '#4C1D95' },
];

export const BengaliPenDiagram: React.FC<BengaliPenDiagramProps> = () => {
  const [selectedInk, setSelectedInk] = useState(INK_PALETTES[0]);
  const [selectedPoemIndex, setSelectedPoemIndex] = useState(0);
  const [writingSpeed, setWritingSpeed] = useState<number>(3); // 1 to 5
  const [isWriting, setIsWriting] = useState(true);
  const [writtenCharCount, setWrittenCharCount] = useState(0);
  const [heartbeatRate, setHeartbeatRate] = useState(75);
  const [activePart, setActivePart] = useState<'nib' | 'heart' | 'inkwell' | 'quill'>('heart');

  const currentPoem = POEMS[selectedPoemIndex];
  const fullPoemText = currentPoem.lines.join('\n');

  // Animated writing effect
  useEffect(() => {
    if (!isWriting) return;
    const intervalTime = Math.max(20, 120 - writingSpeed * 20);
    const timer = setInterval(() => {
      setWrittenCharCount((prev) => {
        if (prev >= fullPoemText.length) {
          return 0; // Loop writing
        }
        return prev + 1;
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isWriting, writingSpeed, fullPoemText]);

  const displayedText = fullPoemText.slice(0, writtenCharCount);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-[#0B0F19] to-slate-950 border border-rose-500/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: selectedInk.color }}
      />

      {/* Header with Title and Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-rose-400">
              বাংলা সাহিত্য সঞ্চয়ন • সচিত্র রঙিন অ্যানিমেশন
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>হিয়ার রঙিন কলম (The Heartfelt Living Pen)</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h3>
          <p className="text-xs text-white/80 mt-1">
            অনুভূতি, ছন্দ, অলংকার ও কালির জীবন্ত তরঙ্গে বাংলা সাহিত্যের প্রাণস্পন্দন
          </p>
        </div>

        {/* Ink Selector Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <Palette className="w-3.5 h-3.5 text-white/70 ml-1 mr-1" />
          {INK_PALETTES.map((ink) => (
            <button
              key={ink.name}
              onClick={() => setSelectedInk(ink)}
              className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative ${
                selectedInk.name === ink.name ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: ink.color }}
              title={ink.name}
            />
          ))}
        </div>
      </div>

      {/* Main Visual Arena: Split into Pen Visualizer & Living Parchment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Animated Heartfelt Pen Graphic */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800 relative">
          <svg viewBox="0 0 320 340" className="w-full max-w-[300px] h-auto drop-shadow-2xl">
            <defs>
              <linearGradient id="goldNib" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
              <linearGradient id="penBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Quill Feather Feathers (Curved romantic wings) */}
            <g
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => setActivePart('quill')}
            >
              <path
                d="M 160 120 C 130 80, 100 30, 160 10 C 210 25, 230 70, 160 120 Z"
                fill="url(#goldNib)"
                opacity="0.25"
              />
              <path
                d="M 160 120 C 140 85, 120 40, 160 20 C 190 35, 210 75, 160 120 Z"
                fill="none"
                stroke={selectedInk.color}
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              {/* Feather ribs */}
              <line x1="160" y1="20" x2="160" y2="120" stroke="#FDE047" strokeWidth="2.5" />
              <path d="M 160 40 Q 140 35 125 45" stroke="#FDE047" strokeWidth="1.2" fill="none" opacity="0.7" />
              <path d="M 160 55 Q 180 50 195 60" stroke="#FDE047" strokeWidth="1.2" fill="none" opacity="0.7" />
              <path d="M 160 70 Q 135 65 120 75" stroke="#FDE047" strokeWidth="1.2" fill="none" opacity="0.7" />
              <path d="M 160 85 Q 185 80 200 90" stroke="#FDE047" strokeWidth="1.2" fill="none" opacity="0.7" />
            </g>

            {/* Pen Barrel Body with Golden Trim */}
            <rect x="148" y="115" width="24" height="90" rx="6" fill="url(#penBody)" stroke="#EAB308" strokeWidth="2" />
            <rect x="146" y="115" width="28" height="8" rx="2" fill="url(#goldNib)" />
            <rect x="146" y="198" width="28" height="8" rx="2" fill="url(#goldNib)" />

            {/* Pulsing Animated Heart Gem inside Pen Body */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart('heart')}
              style={{
                transformOrigin: '160px 158px',
                animation: `pulse ${60 / heartbeatRate}s ease-in-out infinite`
              }}
            >
              <circle cx="160" cy="158" r="16" fill={selectedInk.bg} />
              <path
                d="M 160 166 C 153 160, 148 154, 148 149 C 148 144, 153 141, 157 144 C 159 146, 160 148, 160 148 C 160 148, 161 146, 163 144 C 167 141, 172 144, 172 149 C 172 154, 167 160, 160 166 Z"
                fill={selectedInk.color}
                filter="url(#heartGlow)"
              />
              <circle cx="160" cy="158" r="18" fill="none" stroke={selectedInk.color} strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="16;22;16" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Golden Nib Assembly */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart('nib')}
            >
              <polygon points="148,206 172,206 163,260 157,260" fill="url(#goldNib)" stroke="#CA8A04" strokeWidth="1.5" />
              {/* Nib Breathing Hole & Slit */}
              <circle cx="160" cy="230" r="2.5" fill="#020617" />
              <line x1="160" y1="232" x2="160" y2="260" stroke="#020617" strokeWidth="1.2" />
              <polygon points="157,260 163,260 160,266" fill="#FDE047" />
            </g>

            {/* Animated Dripping & Flowing Ink Droplets from Nib Tip */}
            <g>
              <circle cx="160" cy="272" r="3.5" fill={selectedInk.color}>
                <animate attributeName="cy" values="266;295;266" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="r" values="3.5;1.5;3.5" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
              </circle>
              {/* Glowing Ink Ripple at Parchment */}
              <ellipse cx="160" cy="298" rx="20" ry="6" fill="none" stroke={selectedInk.color} strokeWidth="2">
                <animate attributeName="rx" values="6;28;6" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="ry" values="2;9;2" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0;0.9" dur="1.4s" repeatCount="indefinite" />
              </ellipse>
            </g>

            {/* Ink Bottle (কালির দোয়াত) at Corner */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart('inkwell')}
              transform="translate(40, 240)"
            >
              <rect x="0" y="20" width="50" height="40" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <rect x="12" y="10" width="26" height="12" rx="3" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
              {/* Ink level */}
              <rect x="4" y="32" width="42" height="24" rx="4" fill={selectedInk.color} opacity="0.8" />
              <text x="25" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">কালি</text>
            </g>
          </svg>

          {/* Interactive Inspection Card */}
          <div className="w-full mt-3 bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-xs">
            {activePart === 'heart' && (
              <div>
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  হৃদয় মণি (Heart Core): অনুভূতির প্রাণ
                </span>
                <p className="text-white/80 mt-1 leading-relaxed">
                  কবিতা ও সাহিত্যের জন্ম পাঠকের অন্তরে স্পন্দন জাগানো থেকে। রবীন্দ্রনাথ, নজরুলের লেখায় এই হৃদয়াবেগই প্রধান।
                </p>
              </div>
            )}
            {activePart === 'nib' && (
              <div>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  স্বর্ণ লেখনী (Gold Nib): ছন্দ ও অলংকার
                </span>
                <p className="text-white/80 mt-1 leading-relaxed">
                  অনুপ্রাস, উপমা, রূপক ও মাত্রাবৃত্ত-অক্ষরবৃত্ত ছন্দের মেলবন্ধনে বাক্য প্রাণ পায়।
                </p>
              </div>
            )}
            {activePart === 'inkwell' && (
              <div>
                <span className="text-blue-400 font-bold flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" />
                  কালির দোয়াত (Ink Reservoir): শব্দভাণ্ডার
                </span>
                <p className="text-white/80 mt-1 leading-relaxed">
                  তৎসম, তদ্ভব, দেশি ও বিদেশি শব্দের সমৃদ্ধ ভাণ্ডার যা দিয়ে বাংলা ভাষার রূপ ফুটে ওঠে।
                </p>
              </div>
            )}
            {activePart === 'quill' && (
              <div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Feather className="w-3.5 h-3.5" />
                  কল্পনা ও ভাবতরঙ্গ (Quill Plume)
                </span>
                <p className="text-white/80 mt-1 leading-relaxed">
                  অবাধ কল্পনা যা বাস্তব জগত ছাড়িয়ে নতুন সাহিত্য সৃষ্টি করে।
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Bengali Manuscript Parchment with Animated Calligraphy */}
        <div className="lg:col-span-7 flex flex-col h-full justify-between">
          <div className="bg-[#121622] rounded-2xl p-5 border border-slate-800 shadow-inner relative min-h-[280px]">
            {/* Parchment top bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {currentPoem.title}
                </span>
                <span className="text-[11px] text-white/70 hidden sm:inline">
                  {currentPoem.context}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsWriting(!isWriting)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  title={isWriting ? 'Pause Animation' : 'Start Writing'}
                >
                  {isWriting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setWrittenCharCount(0)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  title="Rewrite from Beginning"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Living Writing Canvas */}
            <div className="font-serif tracking-wide leading-relaxed py-2 min-h-[140px]">
              <pre
                className="whitespace-pre-wrap font-sans text-base sm:text-lg font-bold transition-colors"
                style={{
                  color: selectedInk.color,
                  textShadow: `0 0 15px ${selectedInk.glow}`
                }}
              >
                {displayedText}
                <span className="inline-block w-2 h-5 ml-1 bg-amber-400 animate-pulse align-middle" />
              </pre>
            </div>

            {/* Floating Literary Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/80">
              {['কবিতা (Poetry)', 'নাটক (Drama)', 'প্রবন্ধ (Essay)', 'ব্যাকরণ (Grammar)', 'ভাবসম্প্রসারণ'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/70 text-white/80 border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Verse Selector */}
            <div>
              <label className="text-[11px] font-bold text-white/80 block mb-1.5">
                সাহিত্যিক পদ নির্বাচন:
              </label>
              <select
                value={selectedPoemIndex}
                onChange={(e) => {
                  setSelectedPoemIndex(Number(e.target.value));
                  setWrittenCharCount(0);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                {POEMS.map((p, idx) => (
                  <option key={p.title} value={idx}>{p.title}</option>
                ))}
              </select>
            </div>

            {/* Writing Speed Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-white/80 mb-1.5">
                <span>লেখনীর গতি (Speed):</span>
                <span className="text-amber-400 font-mono">{writingSpeed}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={writingSpeed}
                onChange={(e) => setWritingSpeed(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Heartbeat Pulse Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-white/80 mb-1.5">
                <span>হৃদস্পন্দন (Heart Pulse):</span>
                <span className="text-rose-400 font-mono">{heartbeatRate} BPM</span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                value={heartbeatRate}
                onChange={(e) => setHeartbeatRate(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
