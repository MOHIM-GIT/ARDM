import React, { useState, useEffect } from 'react';
import { Zap, Sun, Gauge, RotateCcw, Lightbulb, Play, Pause, Flame } from 'lucide-react';

export const PhysicsRealWorldDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roller_coaster' | 'prism' | 'circuit'>('roller_coaster');

  // 1. Roller Coaster / Mechanical Energy State
  const [cartProgress, setCartProgress] = useState(0.2); // 0 to 1 along track
  const [isPlayingCoaster, setIsPlayingCoaster] = useState(true);
  const [coasterMass, setCoasterMass] = useState(50); // kg
  const [coasterHeight, setCoasterHeight] = useState(25); // meters max

  // 2. Optical Triangular Prism Dispersion State
  const [incidentAngle, setIncidentAngle] = useState(48); // degrees
  const prismRefractiveIndex = 1.52;

  // 3. Electric Circuit / Ohm's Law State
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(6); // Ohms
  const [isSwitchClosed, setIsSwitchClosed] = useState(true);

  // Roller coaster animation loop
  useEffect(() => {
    if (!isPlayingCoaster || activeTab !== 'roller_coaster') return;
    const interval = setInterval(() => {
      setCartProgress((prev) => (prev >= 1 ? 0 : prev + 0.008));
    }, 30);
    return () => clearInterval(interval);
  }, [isPlayingCoaster, activeTab]);

  // Physics calculations for Roller Coaster
  // Track height function: h(p) = H * (0.5 + 0.5 * cos(p * 2 * PI))
  const currentHeight = coasterHeight * (0.5 + 0.5 * Math.cos(cartProgress * Math.PI * 2));
  const g = 9.8;
  const potentialEnergy = Math.round(coasterMass * g * currentHeight);
  const maxTotalEnergy = coasterMass * g * coasterHeight;
  const kineticEnergy = Math.max(0, Math.round(maxTotalEnergy - potentialEnergy));
  const velocity = Math.sqrt((2 * kineticEnergy) / coasterMass).toFixed(1);

  // Circuit calculations: Ohm's Law
  const currentAmp = isSwitchClosed ? (voltage / resistance).toFixed(2) : '0.00';
  const powerWatt = isSwitchClosed ? (voltage * Number(currentAmp)).toFixed(1) : '0.0';
  const bulbGlowOpacity = isSwitchClosed ? Math.min(1, Math.max(0.2, Number(powerWatt) / 24)) : 0.05;

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-[#0C1222] to-slate-950 border border-blue-500/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-blue-400">
              ভৌতবিজ্ঞান • বাস্তব জীবনের পদার্থবিদ্যা ডায়াগ্রাম
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>বাস্তব জীবনের পদার্থবিজ্ঞান প্র্যাকটিক্যাল সিমুলেটর</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </h3>
          <p className="text-xs text-white/80 mt-1">
            যান্ত্রিক শক্তি সংরক্ষণ (Roller Coaster), আলোর বিচ্ছুরণ (Prism Spectrum) ও ওহমের সূত্র (Electric Circuit)
          </p>
        </div>

        {/* 3 Real World Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('roller_coaster')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'roller_coaster'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-slate-800'
            }`}
          >
            শক্তি সংরক্ষণ (Coaster)
          </button>
          <button
            onClick={() => setActiveTab('prism')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'prism'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-slate-800'
            }`}
          >
            আলোর বিচ্ছুরণ (Prism)
          </button>
          <button
            onClick={() => setActiveTab('circuit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'circuit'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-slate-800'
            }`}
          >
            বিদ্যুৎ বর্তনী (Ohm's Law)
          </button>
        </div>
      </div>

      {/* TAB 1: ROLLER COASTER / MECHANICAL ENERGY CONSERVATION */}
      {activeTab === 'roller_coaster' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800 relative">
            <div className="w-full flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-emerald-400 font-bold">
                শক্তি সংরক্ষণ সূত্র: স্থিতিশক্তি (PE) + গতিশক্তি (KE) = ধ্রুবক (Total E)
              </span>
              <button
                onClick={() => setIsPlayingCoaster(!isPlayingCoaster)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1 cursor-pointer"
              >
                {isPlayingCoaster ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span className="text-[11px]">{isPlayingCoaster ? 'Pause' : 'Play'}</span>
              </button>
            </div>

            {/* SVG Roller Coaster Track Canvas */}
            <svg viewBox="0 0 500 240" className="w-full max-w-[500px] h-auto drop-shadow-xl select-none">
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B132B" />
                  <stop offset="100%" stopColor="#1C2541" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="500" height="240" rx="12" fill="url(#skyGrad)" />

              {/* Ground level */}
              <line x1="20" y1="210" x2="480" y2="210" stroke="#334155" strokeWidth="2" />
              <text x="25" y="225" fill="#64748B" fontSize="9" fontFamily="monospace">h = 0m (ভূমি স্তর)</text>

              {/* Roller coaster steel supports */}
              {[60, 140, 220, 300, 380, 440].map((sx) => (
                <line key={sx} x1={sx} y1="210" x2={sx} y2="140" stroke="#1E293B" strokeWidth="2" strokeDasharray="3 3" />
              ))}

              {/* Roller Coaster Curved Path: Peak at 50, Dip at 250, Peak at 450 */}
              <path
                d="M 30 60 C 130 60, 160 190, 250 190 C 340 190, 370 70, 470 70"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="4"
              />
              <path
                d="M 30 65 C 130 65, 160 195, 250 195 C 340 195, 370 75, 470 75"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Peak and valley height labels */}
              <text x="50" y="45" fill="#FBBF24" fontSize="10" fontWeight="bold">সর্বোচ্চ PE (h = 25m, v ≈ 0)</text>
              <text x="210" y="205" fill="#34D399" fontSize="10" fontWeight="bold">সর্বোচ্চ KE (h = 0m, v = max)</text>

              {/* Moving Roller Coaster Cart */}
              {(() => {
                // Approximate coordinate along track based on cartProgress
                const px = 30 + cartProgress * 440;
                const py = 60 + (190 - 60) * Math.pow(Math.sin(cartProgress * Math.PI), 2);
                return (
                  <g transform={`translate(${px}, ${py})`}>
                    {/* Cart body */}
                    <rect x="-14" y="-12" width="28" height="12" rx="3" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
                    {/* Wheels */}
                    <circle cx="-8" cy="2" r="3" fill="#F8FAFC" />
                    <circle cx="8" cy="2" r="3" fill="#F8FAFC" />
                    {/* Velocity vector arrow */}
                    <line x1="0" y1="-16" x2={Number(velocity) * 1.5} y2="-16" stroke="#10B981" strokeWidth="2" />
                    <polygon points={`${Number(velocity) * 1.5}, -19 ${Number(velocity) * 1.5 + 4}, -16 ${Number(velocity) * 1.5}, -13`} fill="#10B981" />
                  </g>
                );
              })()}
            </svg>

            {/* Real-time Dynamic Energy Bars */}
            <div className="w-full mt-4 grid grid-cols-3 gap-3">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-amber-400 font-bold">স্থিতিশক্তি (PE):</span>
                  <span className="font-mono text-white">{potentialEnergy} J</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full transition-all duration-75"
                    style={{ width: `${(potentialEnergy / maxTotalEnergy) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-emerald-400 font-bold">গতিশক্তি (KE):</span>
                  <span className="font-mono text-white">{kineticEnergy} J</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-75"
                    style={{ width: `${(kineticEnergy / maxTotalEnergy) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-blue-400 font-bold">বেগ (Velocity):</span>
                  <span className="font-mono text-white">{velocity} m/s</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-400 h-full transition-all duration-75"
                    style={{ width: `${(Number(velocity) / 23) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Parameters for Roller Coaster */}
          <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-blue-400" />
              বাস্তব পরীক্ষার প্যারামিটার পরিবর্তন
            </h4>

            <div>
              <div className="flex justify-between text-xs mb-1.5 text-white/90">
                <span>রোলার কোস্টার ভর (Mass m):</span>
                <span className="font-mono text-blue-400">{coasterMass} kg</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={coasterMass}
                onChange={(e) => setCoasterMass(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 text-white/90">
                <span>সর্বোচ্চ উচ্চতা (Height H):</span>
                <span className="font-mono text-amber-400">{coasterHeight} মিটার</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={coasterHeight}
                onChange={(e) => setCoasterHeight(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white/80 space-y-1.5">
              <span className="text-amber-400 font-bold block">মাধ্যমিক বোর্ড প্রশ্ন (৩ নম্বর):</span>
              <p>
                "মুক্তভাবে পতনশীল কোনো বস্তুর ক্ষেত্রে যান্ত্রিক শক্তির নিত্যতা সূত্র প্রমাণ করো।"
              </p>
              <p className="text-[11px] text-white/60">
                সর্বোচ্চ বিন্দুতে E = mgh, মধ্যবিন্দুতে E = mgh' + ½mv², ভূমি স্পর্শকালে E = ½mv² = mgh (ধ্রুবক)।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OPTICAL PRISM DISPERSION (VIBGYOR / বেনীআসহকলা) */}
      {activeTab === 'prism' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
            <svg viewBox="0 0 500 240" className="w-full max-w-[500px] h-auto drop-shadow-xl select-none">
              <rect x="0" y="0" width="500" height="240" rx="12" fill="#030712" />

              {/* Incident White Ray */}
              <line x1="30" y1="140" x2="190" y2="120" stroke="#FFFFFF" strokeWidth="3" />
              <text x="40" y="130" fill="#FFFFFF" fontSize="10" fontWeight="bold">সূর্যালোকের সাদা আলো (White Light)</text>

              {/* Glass Triangular Prism */}
              <polygon
                points="240,40 160,200 320,200"
                fill="#38BDF8"
                fillOpacity="0.15"
                stroke="#38BDF8"
                strokeWidth="2.5"
              />
              <text x="240" y="150" textAnchor="middle" fill="#7DD3FC" fontSize="10">কাঁচের প্রিজম (μ = 1.52)</text>

              {/* 7 Dispersed Rays (বেনীআসহকলা / VIBGYOR) */}
              {[
                { name: 'লাল (Red)', color: '#EF4444', yEnd: 80, dev: 'কম চ্যুতি' },
                { name: 'কমলা (Orange)', color: '#F97316', yEnd: 95, dev: '' },
                { name: 'হলুদ (Yellow)', color: '#FBBF24', yEnd: 110, dev: 'গড় রশ্মি' },
                { name: 'সবুজ (Green)', color: '#10B981', yEnd: 125, dev: '' },
                { name: 'নীল (Blue)', color: '#06B6D4', yEnd: 140, dev: '' },
                { name: 'ইন্ডিগো (Indigo)', color: '#3B82F6', yEnd: 155, dev: '' },
                { name: 'বেগুনি (Violet)', color: '#8B5CF6', yEnd: 170, dev: 'সর্বাধিক চ্যুতি' },
              ].map((ray) => (
                <g key={ray.name}>
                  {/* Inside prism bending */}
                  <line x1="190" y1="120" x2="265" y2={100 + (ray.yEnd - 80) * 0.3} stroke={ray.color} strokeWidth="1.5" />
                  {/* Emerging ray */}
                  <line x1="265" y1={100 + (ray.yEnd - 80) * 0.3} x2="450" y2={ray.yEnd} stroke={ray.color} strokeWidth="2.5" />
                  <text x="455" y={ray.yEnd + 4} fill={ray.color} fontSize="9" fontWeight="bold">{ray.name}</text>
                </g>
              ))}

              {/* White screen catching spectrum */}
              <rect x="440" y="60" width="6" height="130" rx="2" fill="#E2E8F0" />
            </svg>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              আলোর বিচ্ছুরণের কারণ ও নিয়ম
            </h4>

            <div>
              <div className="flex justify-between text-xs mb-1.5 text-white/90">
                <span>আপতন কোণ (Angle of Incidence ∠i):</span>
                <span className="font-mono text-amber-400">{incidentAngle}°</span>
              </div>
              <input
                type="range"
                min="30"
                max="65"
                value={incidentAngle}
                onChange={(e) => setIncidentAngle(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white/80 space-y-1.5">
              <span className="text-blue-400 font-bold block">চ্যুতি কোণ সূত্র: δ = i₁ + i₂ - A</span>
              <p>
                কাঁচ মাধ্যমে লাল আলোর বেগ সবচেয়ে বেশি, তাই লাল আলোর প্রতিসরাঙ্ক কম ও চ্যুতি সর্বনিম্ন। অপরদিকে বেগুনি আলোর বেগ সবচেয়ে কম হওয়ায় এর চ্যুতি সর্বাধিক।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ELECTRIC CIRCUIT & OHM'S LAW */}
      {activeTab === 'circuit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
            <svg viewBox="0 0 500 240" className="w-full max-w-[500px] h-auto drop-shadow-xl select-none">
              <rect x="0" y="0" width="500" height="240" rx="12" fill="#090E17" />

              {/* Wire Loop */}
              <rect x="60" y="50" width="380" height="140" rx="8" fill="none" stroke="#64748B" strokeWidth="4" />

              {/* DC Battery Symbol (Left) */}
              <g transform="translate(60, 120)">
                <line x1="-15" y1="-15" x2="15" y2="-15" stroke="#EF4444" strokeWidth="3" />
                <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#3B82F6" strokeWidth="2" />
                <line x1="-15" y1="5" x2="15" y2="5" stroke="#EF4444" strokeWidth="3" />
                <line x1="-8" y1="15" x2="8" y2="15" stroke="#3B82F6" strokeWidth="2" />
                <text x="-45" y="4" fill="#EF4444" fontSize="10" fontWeight="bold">{voltage}V DC</text>
              </g>

              {/* Switch (Top Wire) */}
              <g
                className="cursor-pointer"
                onClick={() => setIsSwitchClosed(!isSwitchClosed)}
                transform="translate(200, 50)"
              >
                <circle cx="-15" cy="0" r="4" fill="#F8FAFC" />
                <circle cx="15" cy="0" r="4" fill="#F8FAFC" />
                <line
                  x1="-15"
                  y1="0"
                  x2={isSwitchClosed ? 15 : 5}
                  y2={isSwitchClosed ? 0 : -20}
                  stroke={isSwitchClosed ? '#10B981' : '#EF4444'}
                  strokeWidth="3.5"
                />
                <text x="-20" y="-12" fill="#94A3B8" fontSize="9">সুইচ ({isSwitchClosed ? 'ON' : 'OFF'})</text>
              </g>

              {/* Rheostat / Resistor (Bottom Wire) */}
              <g transform="translate(220, 190)">
                <path d="M -30 0 L -20 -10 L -10 10 L 0 -10 L 10 10 L 20 -10 L 30 0" fill="none" stroke="#F59E0B" strokeWidth="3" />
                <text x="-15" y="25" fill="#F59E0B" fontSize="10" fontWeight="bold">রোদ R = {resistance} Ω</text>
              </g>

              {/* Real Tungsten Bulb (Right Wire) */}
              <g transform="translate(440, 120)">
                {/* Glow aura */}
                <circle cx="0" cy="0" r={30 + Number(powerWatt) * 0.5} fill="#FDE047" opacity={bulbGlowOpacity * 0.4} />
                {/* Bulb Glass */}
                <circle cx="0" cy="0" r="22" fill="#1E293B" stroke="#E2E8F0" strokeWidth="2" />
                {/* Filament */}
                <path
                  d="M -6 6 L -3 -6 L 0 6 L 3 -6 L 6 6"
                  fill="none"
                  stroke={isSwitchClosed ? '#F59E0B' : '#64748B'}
                  strokeWidth="2.5"
                />
                <text x="-15" y="38" fill="#FDE047" fontSize="10" fontWeight="bold">{powerWatt}W</text>
              </g>
            </svg>

            {/* Live Ohm's Law Meter Readouts */}
            <div className="w-full mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-white/70 block">প্রয়োগকৃত ভোল্টেজ (V)</span>
                <span className="text-lg font-black text-blue-400 font-mono">{voltage} V</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-white/70 block">প্রবাহিত বিদ্যুৎ (I = V/R)</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{currentAmp} A</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-white/70 block">বাল্বের ক্ষমতা (P = VI)</span>
                <span className="text-lg font-black text-amber-400 font-mono">{powerWatt} W</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              ওহমের সূত্র ও বর্তনী নিয়ন্ত্রণ
            </h4>

            <div>
              <div className="flex justify-between text-xs mb-1.5 text-white/90">
                <span>বিভব প্রভেদ (Voltage V):</span>
                <span className="font-mono text-blue-400">{voltage} V</span>
              </div>
              <input
                type="range"
                min="3"
                max="24"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 text-white/90">
                <span>রোধের মান (Resistance R):</span>
                <span className="font-mono text-amber-400">{resistance} Ω</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <button
              onClick={() => setIsSwitchClosed(!isSwitchClosed)}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                isSwitchClosed
                  ? 'bg-rose-600/20 text-rose-300 border-rose-500/40 hover:bg-rose-600/30'
                  : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
              }`}
            >
              {isSwitchClosed ? 'সুইচ বন্ধ করুন (Open Switch)' : 'সুইচ চালু করুন (Close Circuit)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
