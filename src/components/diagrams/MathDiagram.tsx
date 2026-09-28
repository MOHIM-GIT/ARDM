import React, { useState } from 'react';
import { Calculator, CheckCircle2, RotateCcw } from 'lucide-react';

export const MathDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pythagoras' | 'unit_circle'>('pythagoras');

  // Pythagoras state
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB);
  const isPerfectTriplet = Number.isInteger(sideC);

  // Unit circle state
  const [angleDeg, setAngleDeg] = useState(45);
  const angleRad = (angleDeg * Math.PI) / 180;
  const sinVal = Math.sin(angleRad).toFixed(3);
  const cosVal = Math.cos(angleRad).toFixed(3);
  const tanVal = Math.abs(Math.cos(angleRad)) > 0.001 ? Math.tan(angleRad).toFixed(3) : '∞';

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-[#0D1527] to-slate-950 border border-indigo-500/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-400">
              গণিত • জ্যামিতি ও ত্রিকোণমিতি ভিজ্যুয়াল প্রমাণ
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>পীথাগোরাসের উপপাদ্য ও ত্রিকোণমিতিক একক বৃত্ত</span>
            <Calculator className="w-5 h-5 text-indigo-400" />
          </h3>
          <p className="text-xs text-white/80 mt-1">
            a² + b² = c² বাস্তব ক্ষেত্রফল রূপান্তর ও ঘূর্ণায়মান কোণের sin/cos প্রক্ষেপণ
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('pythagoras')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pythagoras' ? 'bg-indigo-600 text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            পীথাগোরাসের উপপাদ্য
          </button>
          <button
            onClick={() => setActiveTab('unit_circle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'unit_circle' ? 'bg-indigo-600 text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            একক বৃত্ত (Unit Circle)
          </button>
        </div>
      </div>

      {activeTab === 'pythagoras' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
            <svg viewBox="0 0 460 300" className="w-full max-w-[460px] h-auto drop-shadow-xl select-none">
              <rect x="0" y="0" width="460" height="300" rx="12" fill="#090E17" />

              {/* Triangle Base Point: 200, 210 */}
              {/* Right angle triangle with legs sideA * 20 and sideB * 20 */}
              {(() => {
                const scale = 22;
                const ox = 190;
                const oy = 210;
                const ax = ox;
                const ay = oy - sideA * scale;
                const bx = ox + sideB * scale;
                const by = oy;

                return (
                  <g>
                    {/* Square on side A (Left) */}
                    <rect
                      x={ax - sideA * scale}
                      y={ay}
                      width={sideA * scale}
                      height={sideA * scale}
                      fill="#3B82F6"
                      fillOpacity="0.25"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                    <text x={ax - (sideA * scale) / 2} y={ay + (sideA * scale) / 2 + 5} textAnchor="middle" fill="#93C5FD" fontSize="12" fontWeight="bold">
                      a² = {sideA * sideA}
                    </text>

                    {/* Square on side B (Bottom) */}
                    <rect
                      x={ox}
                      y={oy}
                      width={sideB * scale}
                      height={sideB * scale}
                      fill="#8B5CF6"
                      fillOpacity="0.25"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                    />
                    <text x={ox + (sideB * scale) / 2} y={oy + (sideB * scale) / 2 + 5} textAnchor="middle" fill="#C4B5FD" fontSize="12" fontWeight="bold">
                      b² = {sideB * sideB}
                    </text>

                    {/* Right triangle ABC */}
                    <polygon
                      points={`${ox},${oy} ${ax},${ay} ${bx},${by}`}
                      fill="#F59E0B"
                      fillOpacity="0.4"
                      stroke="#F59E0B"
                      strokeWidth="3"
                    />

                    {/* Hypotenuse line label */}
                    <text x={(ax + bx) / 2 + 8} y={(ay + by) / 2 - 8} fill="#10B981" fontSize="13" fontWeight="bold">
                      c = {sideC.toFixed(2)} (c² = {(sideA * sideA + sideB * sideB)})
                    </text>

                    {/* Right angle square indicator */}
                    <rect x={ox} y={oy - 12} width="12" height="12" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
                  </g>
                );
              })()}
            </svg>

            <div className="w-full mt-4 flex items-center justify-around text-center bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-blue-400 font-bold">লম্ব a = {sideA}</span>
                <span className="block text-white font-mono text-sm mt-0.5">a² = {sideA * sideA}</span>
              </div>
              <span className="text-white/40 text-lg">+</span>
              <div>
                <span className="text-purple-400 font-bold">ভূমি b = {sideB}</span>
                <span className="block text-white font-mono text-sm mt-0.5">b² = {sideB * sideB}</span>
              </div>
              <span className="text-white/40 text-lg">=</span>
              <div>
                <span className="text-emerald-400 font-bold">অতিভুজ c²</span>
                <span className="block text-emerald-400 font-mono text-sm font-bold mt-0.5">
                  {sideA * sideA + sideB * sideB} (c = {sideC.toFixed(2)})
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white">বাহুর দৈর্ঘ্য পরিবর্তন (Adjust Triplet):</h4>

            <div>
              <div className="flex justify-between text-xs mb-1 text-white/90">
                <span>লম্ব a:</span>
                <span className="text-blue-400 font-mono">{sideA} একক</span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={sideA}
                onChange={(e) => setSideA(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-white/90">
                <span>ভূমি b:</span>
                <span className="text-purple-400 font-mono">{sideB} একক</span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={sideB}
                onChange={(e) => setSideB(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-amber-400 font-bold block mb-1">পীথাগোরীয় ত্রয়ী (Pythagorean Triplet):</span>
              <p className="text-white/80">
                {isPerfectTriplet
                  ? `(${sideA}, ${sideB}, ${sideC}) একটি নিখুঁত পূর্ণসংখ্যা ত্রয়ী!`
                  : `(${sideA}, ${sideB}, ${sideC.toFixed(2)}) - সাধারণ সমকোণী ত্রিভুজ।`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Unit Circle Trigonometry */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
            <svg viewBox="0 0 380 300" className="w-full max-w-[380px] h-auto drop-shadow-xl select-none">
              <rect x="0" y="0" width="380" height="300" rx="12" fill="#090E17" />
              {/* Axes */}
              <line x1="40" y1="150" x2="340" y2="150" stroke="#334155" strokeWidth="1.5" />
              <line x1="190" y1="20" x2="190" y2="280" stroke="#334155" strokeWidth="1.5" />

              {/* Unit Circle (r = 100) */}
              <circle cx="190" cy="150" r="100" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />

              {(() => {
                const r = 100;
                const px = 190 + r * Math.cos(angleRad);
                const py = 150 - r * Math.sin(angleRad);
                return (
                  <g>
                    {/* Radius vector */}
                    <line x1="190" y1="150" x2={px} y2={py} stroke="#F59E0B" strokeWidth="3" />
                    {/* Sin projection (vertical green) */}
                    <line x1={px} y1="150" x2={px} y2={py} stroke="#10B981" strokeWidth="3" />
                    {/* Cos projection (horizontal red) */}
                    <line x1="190" y1="150" x2={px} y2="150" stroke="#EF4444" strokeWidth="3" />

                    {/* Point on circle */}
                    <circle cx={px} cy={py} r="5" fill="#FBBF24" />

                    {/* Angle arc */}
                    <path
                      d={`M 220 150 A 30 30 0 0 0 ${190 + 30 * Math.cos(angleRad)} ${150 - 30 * Math.sin(angleRad)}`}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                    />
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white">কোণের মান পরিবর্তন (θ):</h4>
            <div className="flex justify-between text-xs text-white/90">
              <span>কোণ θ:</span>
              <span className="font-mono text-amber-400 font-bold">{angleDeg}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={angleDeg}
              onChange={(e) => setAngleDeg(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-emerald-400 font-bold">sin({angleDeg}°):</span>
                <span className="font-mono text-white">{sinVal}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-rose-400 font-bold">cos({angleDeg}°):</span>
                <span className="font-mono text-white">{cosVal}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-amber-400 font-bold">tan({angleDeg}°):</span>
                <span className="font-mono text-white">{tanVal}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
