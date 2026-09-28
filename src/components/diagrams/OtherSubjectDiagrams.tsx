import React, { useState } from 'react';
import { Scroll, Globe, Languages, Binary, Clock, Sparkles, Zap, Check } from 'lucide-react';

/* ----------------------------------------------------
   1. HISTORY DIAGRAM: Timeline of Revolutions & Renaissance
   ---------------------------------------------------- */
export const HistoryTimelineDiagram: React.FC = () => {
  const [selectedEventIndex, setSelectedEventIndex] = useState(1);

  const EVENTS = [
    {
      year: '1855',
      nameBn: 'সাঁওতাল হুল (Santhal Rebellion)',
      leaders: 'সিধু, কানু, চাঁদ ও ভৈরব',
      cause: 'মহাজনদের শোষণ, রেলপথ নির্মাণে অত্যাচার ও চড়া খাজনা',
      boardExamTip: 'মাধ্যমিক ৪ নম্বর: সাঁওতাল বিদ্রোহের প্রধান কারণ ও গুরুত্ব।'
    },
    {
      year: '1857',
      nameBn: 'মহাবিদ্রোহ / সিপাহী বিদ্রোহ (Great Revolt)',
      leaders: 'মঙ্গল পাণ্ডে (ব্যারাকপুর), ঝাঁসির রানী লক্ষ্মীবাঈ',
      cause: 'এনফিল্ড রাইফেলের কার্তুজ বিতর্ক ও দীর্ঘদিনের ক্ষোভ',
      boardExamTip: 'মাধ্যমিক ৮ নম্বর: ১৮৫৭ সালের মহাবিদ্রোহের চরিত্র ও প্রকৃতি বিশ্লেষণ।'
    },
    {
      year: '1876',
      nameBn: 'ভারত সভা প্রতিষ্ঠা (Indian Association)',
      leaders: 'সুরেন্দ্রনাথ বন্দ্যোপাধ্যায় ও আনন্দমোহন বসু',
      cause: 'ভারতীয়দের মধ্যে জাতীয় রাজনৈতিক ঐক্য গড়ে তোলা',
      boardExamTip: 'মাধ্যমিক ৪ নম্বর: জাতীয়তাবাদী চেতনার বিকাশে ভারত সভার ভূমিকা।'
    },
    {
      year: '1905',
      nameBn: 'বঙ্গভঙ্গ বিরোধী স্বদেশী আন্দোলন',
      leaders: 'রবীন্দ্রনাথ ঠাকুর (রাখীবন্ধন), সুরেন্দ্রনাথ, অরবিন্দ ঘোষ',
      cause: 'কার্জনের বাংলা ভাগের বিরুদ্ধে তীব্র বয়কট ও স্বদেশী শিল্প',
      boardExamTip: 'মাধ্যমিক ৪ নম্বর: বঙ্গভঙ্গ বিরোধী আন্দোলনে ছাত্রসমাজের ভূমিকা।'
    }
  ];

  const currentEvent = EVENTS[selectedEventIndex];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-[#19130D] to-slate-950 border border-amber-500/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
              ইতিহাস • জাতীয় জাগরণ ও মহাবিদ্রোহের টাইমলাইন
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>বাংলার নবজাগরণ ও মুক্তি সংগ্রামের সচিত্র টাইমলাইন</span>
            <Scroll className="w-5 h-5 text-amber-400" />
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Timeline Path SVG */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
          <svg viewBox="0 0 460 220" className="w-full max-w-[460px] h-auto drop-shadow-xl select-none">
            <rect x="0" y="0" width="460" height="220" rx="12" fill="#0C0A06" />

            {/* Connecting Timeline Cable */}
            <line x1="50" y1="110" x2="410" y2="110" stroke="#78350F" strokeWidth="4" />
            <line x1="50" y1="110" x2="410" y2="110" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 3" />

            {/* Event Milestone Nodes */}
            {EVENTS.map((ev, idx) => {
              const nx = 70 + idx * 105;
              const isSelected = selectedEventIndex === idx;

              return (
                <g
                  key={ev.year}
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => setSelectedEventIndex(idx)}
                >
                  <circle
                    cx={nx}
                    cy="110"
                    r={isSelected ? 24 : 18}
                    fill={isSelected ? '#F59E0B' : '#1F140A'}
                    stroke="#F59E0B"
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    x={nx}
                    y={114}
                    textAnchor="middle"
                    fill={isSelected ? '#000000' : '#FDE68A'}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {ev.year}
                  </text>
                  <text
                    x={nx}
                    y={idx % 2 === 0 ? 60 : 165}
                    textAnchor="middle"
                    fill={isSelected ? '#FDE047' : '#D97706'}
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {ev.nameBn.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Milestone Detail */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xl font-black text-amber-400 font-mono">{currentEvent.year}</span>
            <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
              ঐতিহাসিক মাইলফলক
            </span>
          </div>

          <h4 className="text-base font-bold text-white">{currentEvent.nameBn}</h4>

          <div className="text-xs space-y-2 text-white/90">
            <div>
              <span className="text-amber-400 font-semibold block">প্রধান নেতৃত্ব:</span>
              <p className="bg-slate-950/60 p-2 rounded border border-slate-800">{currentEvent.leaders}</p>
            </div>

            <div>
              <span className="text-amber-400 font-semibold block">মূল পটভূমি ও কারণ:</span>
              <p className="bg-slate-950/60 p-2 rounded border border-slate-800">{currentEvent.cause}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200">
              <span className="font-bold block mb-1">বোর্ড পরীক্ষা প্রস্তুতি:</span>
              <p>{currentEvent.boardExamTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   2. GEOGRAPHY DIAGRAM: Himalayan Fold Mountains & River Course
   ---------------------------------------------------- */
export const GeographyTectonicsDiagram: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<'upper' | 'middle' | 'lower'>('upper');

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-[#0C1B17] to-slate-950 border border-emerald-500/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
              ভূগোল • পর্বত গঠন ও নদীর গতিপথ
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>হিমালয় ভঙ্গিল পর্বত সৃষ্টি ও নদীর ৩টি গতিপথ</span>
            <Globe className="w-5 h-5 text-emerald-400" />
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {(['upper', 'middle', 'lower'] as const).map((course) => (
            <button
              key={course}
              onClick={() => setActiveCourse(course)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCourse === course ? 'bg-emerald-600 text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {course === 'upper' ? 'উচ্চগতি (ক্ষয়)' : course === 'middle' ? 'মধ্যগতি (বহন)' : 'নিম্নগতি (ব-দ্বীপ)'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
          <svg viewBox="0 0 460 220" className="w-full max-w-[460px] h-auto drop-shadow-xl select-none">
            <rect x="0" y="0" width="460" height="220" rx="12" fill="#04120D" />

            {/* Mountain Peaks (Himalayas) */}
            <polygon points="40,160 120,40 190,160" fill="#1E293B" stroke="#059669" strokeWidth="2" />
            <polygon points="120,40 145,90 95,90" fill="#FFFFFF" /> {/* Snowcap */}

            <polygon points="150,160 230,60 300,160" fill="#1E293B" stroke="#059669" strokeWidth="2" />
            <polygon points="230,60 250,100 210,100" fill="#FFFFFF" />

            {/* River Course Paths */}
            <path
              d="M 120 90 Q 150 140 210 160 Q 280 180 340 170 Q 400 160 440 200"
              fill="none"
              stroke="#38BDF8"
              strokeWidth={activeCourse === 'upper' ? 3 : activeCourse === 'middle' ? 5 : 8}
            />

            {/* Delta Distributaries at End */}
            <path d="M 410 180 L 445 160 M 410 180 L 450 185 M 410 180 L 440 210" stroke="#38BDF8" strokeWidth="2" />

            <text x="70" y="180" fill="#34D399" fontSize="10" fontWeight="bold">পার্বত্য প্রবাহ (V-উপত্যকা)</text>
            <text x="240" y="195" fill="#38BDF8" fontSize="10" fontWeight="bold">নদীবাঁক (Meander)</text>
            <text x="370" y="145" fill="#FBBF24" fontSize="10" fontWeight="bold">সুন্দরবন ব-দ্বীপ (Delta)</text>
          </svg>
        </div>

        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 text-xs space-y-3">
          {activeCourse === 'upper' && (
            <div>
              <span className="text-emerald-400 font-bold block mb-1">উচ্চগতি / পার্বত্য প্রবাহ (Erosional Stage):</span>
              <p className="text-white/80 leading-relaxed">
                তীব্র ঢাল ও স্রোতের কারণে নিম্নক্ষয় প্রধান। গিরিখাত (I ও V-আকৃতির উপত্যকা), ক্যানিয়ন ও জলপ্রপাত সৃষ্টি হয়।
              </p>
              <div className="mt-2 p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                মাধ্যমিক ৫ নম্বর: নদীর ক্ষয়কাজের ফলে গঠিত তিনটি ভূমিরূপ সচিত্র বর্ণনা করো।
              </div>
            </div>
          )}
          {activeCourse === 'middle' && (
            <div>
              <span className="text-blue-400 font-bold block mb-1">মধ্যগতি / সমভূমি প্রবাহ (Transportation Stage):</span>
              <p className="text-white/80 leading-relaxed">
                ভূমির ঢাল কমে যাওয়ায় পার্শ্বক্ষয় ও বহন কাজ বৃদ্ধি পায়। নদী এঁকেবেঁকে চলে (Meander) ও অশ্বক্ষুরাকৃতি হ্রদ গঠিত হয়।
              </p>
            </div>
          )}
          {activeCourse === 'lower' && (
            <div>
              <span className="text-amber-400 font-bold block mb-1">নিম্নগতি / ব-দ্বীপ প্রবাহ (Depositional Stage):</span>
              <p className="text-white/80 leading-relaxed">
                পলি সঞ্চয়ের ফলে নদী অগভীর হয়, একাধিক শাখানদীতে বিভক্ত হয়ে মোহনায় ধনুকাকৃতি ব-দ্বীপ সৃষ্টি করে (যেমন গঙ্গা-ব্রহ্মপুত্র ব-দ্বীপ)।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   3. ENGLISH DIAGRAM: Narrative Mountain & Voice Machine
   ---------------------------------------------------- */
export const EnglishStoryArcDiagram: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<'father' | 'cat'>('father');

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-[#11162B] to-slate-950 border border-violet-500/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-violet-400">
              English Literature & Grammar Engine
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>Freytag's Narrative Mountain & Voice Engine</span>
            <Languages className="w-5 h-5 text-violet-400" />
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedStory('father')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedStory === 'father' ? 'bg-violet-600 text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            Father's Help (R.K. Narayan)
          </button>
          <button
            onClick={() => setSelectedStory('cat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedStory === 'cat' ? 'bg-violet-600 text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            The Cat (A.B. Paterson)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Freytag's Narrative Mountain SVG */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
          <svg viewBox="0 0 460 220" className="w-full max-w-[460px] h-auto drop-shadow-xl select-none">
            <rect x="0" y="0" width="460" height="220" rx="12" fill="#0A0D1B" />

            {/* Triangular Mountain Arc */}
            <path
              d="M 40 180 L 130 180 L 230 50 L 330 180 L 420 180"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3.5"
            />

            {/* Stages on Mountain */}
            <circle cx="70" cy="180" r="5" fill="#C4B5FD" />
            <text x="70" y="200" textAnchor="middle" fill="#A78BFA" fontSize="9" fontWeight="bold">1. Exposition</text>

            <circle cx="160" cy="130" r="5" fill="#C4B5FD" />
            <text x="160" y="115" textAnchor="middle" fill="#A78BFA" fontSize="9" fontWeight="bold">2. Rising Action</text>

            <circle cx="230" cy="50" r="7" fill="#F59E0B" />
            <text x="230" y="35" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">3. Climax</text>

            <circle cx="300" cy="130" r="5" fill="#C4B5FD" />
            <text x="300" y="115" textAnchor="middle" fill="#A78BFA" fontSize="9" fontWeight="bold">4. Falling Action</text>

            <circle cx="380" cy="180" r="5" fill="#C4B5FD" />
            <text x="380" y="200" textAnchor="middle" fill="#A78BFA" fontSize="9" fontWeight="bold">5. Resolution</text>
          </svg>
        </div>

        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 text-xs space-y-3">
          <span className="text-violet-400 font-bold block">
            {selectedStory === 'father' ? "Father's Help Story Arc" : 'The Cat Character Arc'}
          </span>
          <p className="text-white/80 leading-relaxed">
            {selectedStory === 'father'
              ? "Exposition: Swami pretends headache on Monday morning. Climax: Samuel behaves unusually kind while Swami waits to deliver Father's letter. Resolution: Headmaster is on leave, Swami tears the letter."
              : 'Exposition: People think the cat is unintelligent. Rising Action: True personality emerges during evening tea. Climax: Knightly gallantry on the suburban fence.'}
          </p>
          <div className="p-2.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-200">
            <span className="font-bold block mb-1">Voice Transformation Example:</span>
            <p className="font-mono">Active: Swami wrote the letter.</p>
            <p className="font-mono text-emerald-400">Passive: The letter was written by Swami.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   4. COMPUTER SCIENCE DIAGRAM: Von Neumann CPU & Logic Gates
   ---------------------------------------------------- */
export const CSArchitectureDiagram: React.FC = () => {
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'NOT' | 'XOR'>('AND');
  const [inputA, setInputA] = useState<0 | 1>(1);
  const [inputB, setInputB] = useState<0 | 1>(0);

  const calculateOutput = () => {
    if (gateType === 'AND') return inputA && inputB ? 1 : 0;
    if (gateType === 'OR') return inputA || inputB ? 1 : 0;
    if (gateType === 'NOT') return inputA === 0 ? 1 : 0;
    if (gateType === 'XOR') return inputA !== inputB ? 1 : 0;
    return 0;
  };

  const outputVal = calculateOutput();

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-[#0C1523] to-slate-950 border border-cyan-500/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-400">
              কম্পিউটার অ্যাপ্লিকেশন • আর্কিটেকচার ও লজিক গেট
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>ভন নিউম্যান আর্কিটেকচার ও লাইভ লজিক গেট সিমুলেটর</span>
            <Binary className="w-5 h-5 text-cyan-400" />
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {(['AND', 'OR', 'NOT', 'XOR'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGateType(g)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                gateType === g ? 'bg-cyan-600 text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {g} গেট
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Logic Gate Circuit SVG */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
          <svg viewBox="0 0 460 200" className="w-full max-w-[460px] h-auto drop-shadow-xl select-none">
            <rect x="0" y="0" width="460" height="200" rx="12" fill="#060C14" />

            {/* Input wire A */}
            <line x1="40" y1="70" x2="180" y2="70" stroke={inputA ? '#22D3EE' : '#334155'} strokeWidth="3" />
            {/* Input wire B (if not NOT gate) */}
            {gateType !== 'NOT' && (
              <line x1="40" y1="130" x2="180" y2="130" stroke={inputB ? '#22D3EE' : '#334155'} strokeWidth="3" />
            )}

            {/* Logic Gate Body */}
            <rect x="180" y="45" width="100" height="110" rx="8" fill="#0E1726" stroke="#0891B2" strokeWidth="2.5" />
            <text x="230" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">{gateType}</text>

            {/* Output wire */}
            <line x1="280" y1="100" x2="380" y2="100" stroke={outputVal ? '#10B981' : '#EF4444'} strokeWidth="4" />

            {/* Output LED */}
            <circle cx="395" cy="100" r="14" fill={outputVal ? '#10B981' : '#334155'} stroke="#E2E8F0" strokeWidth="2" />
            {outputVal === 1 && (
              <circle cx="395" cy="100" r="22" fill="none" stroke="#34D399" strokeWidth="2" opacity="0.6">
                <animate attributeName="r" values="16;26;16" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
            <text x="395" y="104" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
              {outputVal}
            </text>
          </svg>

          {/* Interactive Switch Toggles */}
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => setInputA(inputA === 1 ? 0 : 1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer border ${
                inputA ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-white/60 border-slate-700'
              }`}
            >
              ইনপুট A: {inputA}
            </button>
            {gateType !== 'NOT' && (
              <button
                onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer border ${
                  inputB ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-white/60 border-slate-700'
                }`}
              >
                ইনপুট B: {inputB}
              </button>
            )}
          </div>
        </div>

        {/* Gate Truth Table & Explanation */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 text-xs space-y-3">
          <span className="text-cyan-400 font-bold block">{gateType} গেটের সত্যক সারণী (Truth Table):</span>
          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono">
            {gateType === 'AND' && <p>A=1, B=1 হলে তবেই আউটপুট 1 হয়, অন্যথায় 0।</p>}
            {gateType === 'OR' && <p>যেকোনো একটি ইনপুট 1 হলেই আউটপুট 1 হয়।</p>}
            {gateType === 'NOT' && <p>ইনপুটের বিপরীত আউটপুট প্রদান করে (ইনভার্টার)।</p>}
            {gateType === 'XOR' && <p>ইনপুট দুটি অসমান হলেই আউটপুট 1 হয়।</p>}
          </div>

          <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">
            <span className="font-bold block mb-0.5">ভন নিউম্যান আর্কিটেকচার:</span>
            <p>CPU (ALU + Control Unit) এবং মেমোরির মধ্যে সিস্টেম বাস দিয়ে ডেটা আদান-প্রদান নিয়ন্ত্রিত হয়।</p>
          </div>
        </div>
      </div>
    </div>
  );
};
