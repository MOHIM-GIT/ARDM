import React, { useState, useMemo } from 'react';
import {
  SUBJECT_DIAGRAM_DATA,
  SUBJECT_ORDER,
  SubjectDiagramProfile,
  SubjectUnitWeightage,
  MindMapNode,
} from '../../data/subjectDiagramData';
import { SubjectMasterVisualDiagram } from '../diagrams/SubjectMasterVisualDiagram';
import {
  Calculator,
  Atom,
  Dna,
  BookOpen,
  Globe,
  Scroll,
  Languages,
  Binary,
  Layers,
  Sparkles,
  TrendingUp,
  Target,
  AlertTriangle,
  Award,
  Sliders,
  Maximize2,
  Minimize2,
  FileText,
  CheckCircle2,
  Search,
  ExternalLink,
  ChevronRight,
  Flame,
  Brain,
  GraduationCap,
  Clock,
  Printer,
  RotateCcw,
} from 'lucide-react';

interface SubjectUltraDiagramSectionProps {
  onOpenTestEngine?: (subjectId?: string) => void;
  onNavigate?: (path: string) => void;
}

type DiagramMode = 'visual_diagram' | 'architecture' | 'radar' | 'mindmap' | 'simulator';

export const SubjectUltraDiagramSection: React.FC<SubjectUltraDiagramSectionProps> = ({
  onOpenTestEngine,
  onNavigate,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub_beng');
  const [activeMode, setActiveMode] = useState<DiagramMode>('visual_diagram');
  const [selectedUnit, setSelectedUnit] = useState<SubjectUnitWeightage | null>(null);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [mindmapFilter, setMindmapFilter] = useState<'all' | 'high_yield' | 'easy' | 'hard'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Student self-assessment slider for radar (0 - 100 on 6 axes)
  const [studentSelfScores, setStudentSelfScores] = useState<Record<string, number>>({
    'axis_0': 85,
    'axis_1': 90,
    'axis_2': 78,
    'axis_3': 82,
    'axis_4': 88,
    'axis_5': 92,
  });

  // Marks simulator state across 8 subjects
  const [simulatedMarks, setSimulatedMarks] = useState<Record<string, number>>({
    sub_math: 92,
    sub_phys: 88,
    sub_life: 90,
    sub_hist: 85,
    sub_geog: 94,
    sub_beng: 86,
    sub_eng: 89,
    sub_cs: 95,
  });

  const currentSubject: SubjectDiagramProfile =
    SUBJECT_DIAGRAM_DATA[selectedSubjectId] || SUBJECT_DIAGRAM_DATA['sub_math'];

  // Keep selected unit synchronized when switching subjects
  const activeUnit = selectedUnit && selectedUnit.id.startsWith(currentSubject.id.replace('sub_', ''))
    ? selectedUnit
    : currentSubject.units[0];

  // Subject Icon Map
  const renderSubjectIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className={className} />;
      case 'Atom':
        return <Atom className={className} />;
      case 'Dna':
        return <Dna className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'Scroll':
        return <Scroll className={className} />;
      case 'Languages':
        return <Languages className={className} />;
      case 'Binary':
        return <Binary className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  // Helper for radar polygon math
  const getRadarCoordinates = (scores: number[], radius = 130, center = 160) => {
    const totalAxes = scores.length;
    const angleSlice = (Math.PI * 2) / totalAxes;

    return scores
      .map((score, i) => {
        const normalized = Math.max(0, Math.min(100, score)) / 100;
        const r = normalized * radius;
        const angle = i * angleSlice - Math.PI / 2;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Total and percentage calculations for simulator
  const simTotal = useMemo(() => {
    return Object.values(simulatedMarks).reduce((a, b) => a + b, 0);
  }, [simulatedMarks]);

  const simMax = SUBJECT_ORDER.length * 100;
  const simPercentage = Math.round((simTotal / simMax) * 100);

  const getSimGrade = (pct: number) => {
    if (pct >= 90) return { grade: 'AA', label: 'Outstanding (Topper Tier)', color: 'text-amber-400' };
    if (pct >= 80) return { grade: 'A+', label: 'Excellent Distinction', color: 'text-emerald-400' };
    if (pct >= 60) return { grade: 'A', label: 'First Division Honors', color: 'text-blue-400' };
    if (pct >= 45) return { grade: 'B+', label: 'Second Division Standard', color: 'text-indigo-400' };
    if (pct >= 35) return { grade: 'B', label: 'Third Division Pass', color: 'text-yellow-400' };
    if (pct >= 25) return { grade: 'C', label: 'Eligible for Compartmental', color: 'text-orange-400' };
    return { grade: 'D', label: 'Needs Remedial Support', color: 'text-red-400' };
  };

  const applyPreset = (preset: 'topper' | 'distinction' | 'first' | 'pass') => {
    const newMarks: Record<string, number> = {};
    SUBJECT_ORDER.forEach((id) => {
      if (preset === 'topper') newMarks[id] = 95;
      else if (preset === 'distinction') newMarks[id] = 85;
      else if (preset === 'first') newMarks[id] = 68;
      else newMarks[id] = 40;
    });
    setSimulatedMarks(newMarks);
  };

  // Filtered mind map nodes
  const filteredNodes = useMemo(() => {
    return currentSubject.mindMapNodes.filter((node) => {
      if (mindmapFilter === 'high_yield' && !node.isHighYield) return false;
      if (mindmapFilter === 'easy' && node.difficulty !== 'Easy') return false;
      if (mindmapFilter === 'hard' && node.difficulty !== 'Hard') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          node.title.toLowerCase().includes(q) ||
          node.quickSummary.toLowerCase().includes(q) ||
          node.keyTheoremsOrFormulas.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [currentSubject, mindmapFilter, searchQuery]);

  return (
    <section
      id="subject-diagram"
      className={`relative py-16 sm:py-24 bg-[#090D16] text-white transition-all overflow-hidden border-y border-slate-800 ${
        isExpanded ? 'fixed inset-0 z-50 overflow-y-auto bg-[#090D16]' : ''
      }`}
    >
      {/* Background ambient diagram grid glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Interactive Exam Intelligence Hub</span>
              </span>
              <span className="text-xs font-mono text-white/90">
                WBBSE Madhyamik & CBSE 2026-27
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Subject-Wise Ultra Diagram
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Explore interactive blueprint architectures, multidimensional mastery radars, high-yield concept trees, and live marks simulators engineered by ARDM state toppers.
            </p>
          </div>

          {/* Mode Switcher & View Tools */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setActiveMode('visual_diagram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMode === 'visual_diagram'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-white/80 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>অ্যানিমেটেড ডায়াগ্রাম (Ultra Visual)</span>
              </button>
              <button
                onClick={() => setActiveMode('architecture')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === 'architecture'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-white/80 hover:text-white hover:bg-slate-800'
                }`}
              >
                Blueprint Flow
              </button>
              <button
                onClick={() => setActiveMode('radar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === 'radar'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-white/80 hover:text-white hover:bg-slate-800'
                }`}
              >
                Mastery Radar
              </button>
              <button
                onClick={() => setActiveMode('mindmap')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === 'mindmap'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-white/80 hover:text-white hover:bg-slate-800'
                }`}
              >
                Knowledge Tree
              </button>
              <button
                onClick={() => setActiveMode('simulator')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === 'simulator'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-white/80 hover:text-white hover:bg-slate-800'
                }`}
              >
                Marks Simulator
              </button>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-white/80 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={isExpanded ? 'Exit Fullscreen' : 'Expand Ultra Diagram View'}
              aria-label="Toggle Fullscreen"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 1. Subject Selector Horizontal Bar */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex items-center gap-2 min-w-max">
            {SUBJECT_ORDER.map((subId) => {
              const sub = SUBJECT_DIAGRAM_DATA[subId];
              const isSelected = selectedSubjectId === subId;

              return (
                <button
                  key={subId}
                  onClick={() => {
                    setSelectedSubjectId(subId);
                    setSelectedUnit(null);
                    setSelectedNode(null);
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-800 text-white border-blue-500 shadow-sm scale-102'
                      : 'bg-slate-900/80 text-white/80 hover:text-white hover:bg-slate-800/80 border-slate-800'
                  }`}
                >
                  <span
                    className="p-1 rounded-lg transition-colors"
                    style={{
                      backgroundColor: isSelected ? sub.themeColor : 'rgba(255,255,255,0.05)',
                      color: '#ffffff',
                    }}
                  >
                    {renderSubjectIcon(sub.iconName, 'w-3.5 h-3.5')}
                  </span>
                  <span>{sub.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/90">
                    {sub.writtenMarks}M
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Active Subject Banner Overview */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
              style={{ backgroundColor: `${currentSubject.themeColor}20`, color: currentSubject.themeColor }}
            >
              {renderSubjectIcon(currentSubject.iconName, 'w-6 h-6')}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {currentSubject.name} ({currentSubject.code})
                </h3>
                <span className="text-xs text-white/90 font-mono">
                  {currentSubject.writtenMarks} Written + {currentSubject.internalOrPracticalMarks} Internal = {currentSubject.totalMarks} Total
                </span>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Target: {currentSubject.topperTarget}+ Marks
                </span>
              </div>
              <p className="text-xs text-white/90 mt-1">{currentSubject.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenTestEngine && (
              <button
                onClick={() => onOpenTestEngine(currentSubject.id)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-2xs cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Practice CBT Exam</span>
              </button>
            )}
            {onNavigate && (
              <button
                onClick={() => onNavigate('/pyqs')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/90 bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>10-Yr PYQs</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. MODE CONTENT */}

        {/* MODE 0: UNIQUE SUBJECT ULTRA VISUAL DIAGRAM */}
        {activeMode === 'visual_diagram' && (
          <div className="space-y-6">
            <SubjectMasterVisualDiagram
              subjectId={selectedSubjectId}
              onPracticeClick={() => onOpenTestEngine?.(selectedSubjectId)}
            />
          </div>
        )}

        {/* MODE 1: BLUEPRINT EXAM ARCHITECTURE FLOW */}
        {activeMode === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual SVG Diagram & Interactive Flow Canvas */}
            <div className="lg:col-span-7 bg-slate-900/70 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Radial Weightage & Exam Blueprint Diagram
                    </span>
                  </div>
                  <span className="text-[11px] text-white/80 font-mono">
                    Click any node to inspect unit details
                  </span>
                </div>

                {/* SVG Visual Architecture Graphic */}
                <div className="relative py-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 460 360"
                    className="w-full max-w-[460px] h-auto overflow-visible select-none drop-shadow-xl"
                  >
                    {/* Concentric Guide Rings */}
                    <circle cx="230" cy="180" r="140" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="230" cy="180" r="80" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Connecting Arcs & Radiating Unit Nodes */}
                    {currentSubject.units.map((unit, index) => {
                      const totalUnits = currentSubject.units.length;
                      const angle = (index * (Math.PI * 2)) / totalUnits - Math.PI / 2;
                      const nodeRadius = 140;
                      const nx = 230 + nodeRadius * Math.cos(angle);
                      const ny = 180 + nodeRadius * Math.sin(angle);
                      const isUnitActive = activeUnit.id === unit.id;

                      return (
                        <g
                          key={unit.id}
                          className="cursor-pointer transition-transform hover:scale-105"
                          onClick={() => setSelectedUnit(unit)}
                        >
                          {/* Flow line from center to node */}
                          <line
                            x1="230"
                            y1="180"
                            x2={nx}
                            y2={ny}
                            stroke={isUnitActive ? unit.color : '#334155'}
                            strokeWidth={isUnitActive ? 2.5 : 1.2}
                            strokeDasharray={isUnitActive ? 'none' : '4 2'}
                          />

                          {/* Outer Glow on active */}
                          {isUnitActive && (
                            <circle
                              cx={nx}
                              cy={ny}
                              r="28"
                              fill="none"
                              stroke={unit.color}
                              strokeWidth="2"
                              opacity="0.4"
                              className="animate-pulse"
                            />
                          )}

                          {/* Node Circle */}
                          <circle
                            cx={nx}
                            cy={ny}
                            r="22"
                            fill={isUnitActive ? unit.color : '#0F172A'}
                            stroke={unit.color}
                            strokeWidth="2"
                          />

                          {/* Marks Text in Circle */}
                          <text
                            x={nx}
                            y={ny + 4}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            {unit.marks}M
                          </text>

                          {/* Unit Title Label Outside */}
                          <text
                            x={nx}
                            y={ny > 180 ? ny + 32 : ny - 26}
                            textAnchor="middle"
                            fill={isUnitActive ? '#ffffff' : '#94A3B8'}
                            fontSize="10"
                            fontWeight={isUnitActive ? 'bold' : 'normal'}
                          >
                            {unit.unitName.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })}

                    {/* Central Core Subject Hub */}
                    <circle cx="230" cy="180" r="46" fill="#0B132B" stroke={currentSubject.themeColor} strokeWidth="3" />
                    <circle cx="230" cy="180" r="40" fill={currentSubject.themeColor} opacity="0.15" />
                    <text
                      x="230"
                      y="174"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {currentSubject.code}
                    </text>
                    <text
                      x="230"
                      y="192"
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {currentSubject.writtenMarks} MARKS
                    </text>
                  </svg>
                </div>
              </div>

              {/* Question Format Weightage Distribution Bar */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/90 font-semibold">Question Type Split</span>
                  <span className="text-white/90 font-mono">
                    MCQ: {currentSubject.markingDistribution.mcq}m · VSA: {currentSubject.markingDistribution.vsa}m · SA: {currentSubject.markingDistribution.sa}m · LA: {currentSubject.markingDistribution.la}m
                  </span>
                </div>

                <div className="h-3 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    style={{ width: `${(currentSubject.markingDistribution.mcq / currentSubject.writtenMarks) * 100}%` }}
                    className="bg-emerald-500 h-full"
                    title={`MCQ: ${currentSubject.markingDistribution.mcq} Marks`}
                  />
                  <div
                    style={{ width: `${(currentSubject.markingDistribution.vsa / currentSubject.writtenMarks) * 100}%` }}
                    className="bg-blue-500 h-full"
                    title={`VSA: ${currentSubject.markingDistribution.vsa} Marks`}
                  />
                  <div
                    style={{ width: `${(currentSubject.markingDistribution.sa / currentSubject.writtenMarks) * 100}%` }}
                    className="bg-amber-500 h-full"
                    title={`SA: ${currentSubject.markingDistribution.sa} Marks`}
                  />
                  <div
                    style={{ width: `${(currentSubject.markingDistribution.la / currentSubject.writtenMarks) * 100}%` }}
                    className="bg-rose-500 h-full"
                    title={`LA: ${currentSubject.markingDistribution.la} Marks`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/80 pt-1">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> MCQ (1 Mark)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> VSA (1 Mark)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> SA (2 Marks)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Long Answer (3-8 Marks)</span>
                </div>
              </div>
            </div>

            {/* Right Side: Selected Unit Blueprint Deep Inspector */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: activeUnit.color }}
                    />
                    <h4 className="text-base font-bold text-white">
                      {activeUnit.unitName}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeUnit.importance === 'Ultra High'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {activeUnit.importance} Yield
                  </span>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="text-[10px] uppercase font-semibold text-white/80 block">
                      Board Marks Weightage
                    </span>
                    <span className="text-xl font-extrabold text-white">
                      {activeUnit.marks} <span className="text-xs font-normal text-white/80">/ {currentSubject.writtenMarks} M</span>
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="text-[10px] uppercase font-semibold text-white/80 block">
                      Suggested Study Hours
                    </span>
                    <span className="text-xl font-extrabold text-amber-400">
                      {activeUnit.suggestedStudyHours} <span className="text-xs font-normal text-white/80">Hours</span>
                    </span>
                  </div>
                </div>

                {/* Sub-Marking Breakdown */}
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <span className="text-xs font-bold text-white block mb-2">
                    Question Distribution in Unit
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-900/80">
                      <span className="text-[10px] text-white/80 block">MCQ</span>
                      <span className="text-xs font-bold text-emerald-400">{activeUnit.mcqMarks}M</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80">
                      <span className="text-[10px] text-white/80 block">VSA</span>
                      <span className="text-xs font-bold text-blue-400">{activeUnit.vsaMarks}M</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80">
                      <span className="text-[10px] text-white/80 block">SA</span>
                      <span className="text-xs font-bold text-amber-400">{activeUnit.saMarks}M</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80">
                      <span className="text-[10px] text-white/80 block">LA</span>
                      <span className="text-xs font-bold text-rose-400">{activeUnit.laMarks}M</span>
                    </div>
                  </div>
                </div>

                {/* Recurring High Yield Topics */}
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span>Top 10-Year Verified Recurring Questions</span>
                  </span>
                  <ul className="space-y-1.5">
                    {activeUnit.recurringTopics.map((topic, i) => (
                      <li
                        key={i}
                        className="text-xs text-white/90 bg-slate-800/50 p-2 rounded-lg border border-slate-700/40 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* State Examiner Tip */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Board Examiner Score Maximizer Tip:</span>
                  </div>
                  <p>{activeUnit.boardTip}</p>
                </div>
              </div>

              {/* Direct Practice Launcher */}
              <div className="pt-4 border-t border-slate-800 mt-4 flex items-center gap-2">
                {onOpenTestEngine && (
                  <button
                    onClick={() => onOpenTestEngine(currentSubject.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Practice {activeUnit.unitName.split(' ')[0]} Questions</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: MULTI-DIMENSIONAL MASTERY RADAR */}
        {activeMode === 'radar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Hexagonal Interactive SVG Radar */}
            <div className="lg:col-span-7 bg-slate-900/70 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      6-Axis Subject Mastery Radar Chart
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-amber-400">
                      <span className="w-2.5 h-0.5 bg-amber-400" /> Topper Benchmark
                    </span>
                    <span className="flex items-center gap-1 text-blue-400">
                      <span className="w-2.5 h-0.5 bg-blue-400" /> ARDM Standard
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2.5 h-0.5 bg-emerald-400" /> Your Assessment
                    </span>
                  </div>
                </div>

                {/* SVG Radar Chart */}
                <div className="flex items-center justify-center py-4">
                  <svg
                    viewBox="0 0 340 320"
                    className="w-full max-w-[340px] h-auto overflow-visible select-none drop-shadow-xl"
                  >
                    {/* Concentric Guide Hexagons */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((step, idx) => {
                      const ringScores = [step * 100, step * 100, step * 100, step * 100, step * 100, step * 100];
                      const polyPoints = getRadarCoordinates(ringScores, 120, 160);
                      return (
                        <polygon
                          key={idx}
                          points={polyPoints}
                          fill="none"
                          stroke="#1E293B"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Radial Axis Spokes */}
                    {currentSubject.radarMetrics.map((_, i) => {
                      const angle = (i * (Math.PI * 2)) / 6 - Math.PI / 2;
                      const x2 = 160 + 120 * Math.cos(angle);
                      const y2 = 160 + 120 * Math.sin(angle);
                      return (
                        <line
                          key={i}
                          x1="160"
                          y1="160"
                          x2={x2}
                          y2={y2}
                          stroke="#334155"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      );
                    })}

                    {/* Polygon 1: Topper Benchmark (Gold) */}
                    <polygon
                      points={getRadarCoordinates(
                        currentSubject.radarMetrics.map((m) => m.benchmark),
                        120,
                        160
                      )}
                      fill="#F59E0B"
                      fillOpacity="0.12"
                      stroke="#F59E0B"
                      strokeWidth="1.8"
                      strokeDasharray="3 3"
                    />

                    {/* Polygon 2: Academy Standard (Blue) */}
                    <polygon
                      points={getRadarCoordinates(
                        currentSubject.radarMetrics.map((m) => m.score),
                        120,
                        160
                      )}
                      fill="#3B82F6"
                      fillOpacity="0.25"
                      stroke="#3B82F6"
                      strokeWidth="2.2"
                    />

                    {/* Polygon 3: Student Self Assessment (Emerald) */}
                    <polygon
                      points={getRadarCoordinates(
                        currentSubject.radarMetrics.map((_, i) => studentSelfScores[`axis_${i}`] || 80),
                        120,
                        160
                      )}
                      fill="#10B981"
                      fillOpacity="0.30"
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />

                    {/* Axis Labels Around Radar */}
                    {currentSubject.radarMetrics.map((metric, i) => {
                      const angle = (i * (Math.PI * 2)) / 6 - Math.PI / 2;
                      const labelRadius = 142;
                      const lx = 160 + labelRadius * Math.cos(angle);
                      const ly = 160 + labelRadius * Math.sin(angle);

                      return (
                        <text
                          key={i}
                          x={lx}
                          y={ly + 4}
                          textAnchor={lx > 165 ? 'start' : lx < 155 ? 'end' : 'middle'}
                          fill="#ffffff"
                          fontSize="9.5"
                          fontWeight="bold"
                        >
                          {metric.axis.split(' ')[0]}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Radar Takeaway */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-white/90">
                <span className="font-bold text-white block mb-1">
                  Radar Diagnostic Interpretation:
                </span>
                <p className="leading-relaxed">
                  {currentSubject.name} exhibits peak demands in{' '}
                  <span className="text-blue-300 font-semibold">{currentSubject.radarMetrics[0].axis}</span>{' '}
                  and{' '}
                  <span className="text-emerald-300 font-semibold">{currentSubject.radarMetrics[1].axis}</span>. Students who achieve 90%+ in this subject prioritize rigorous formatting and repetitive PYQ pattern practice.
                </p>
              </div>
            </div>

            {/* Right Side: Interactive Student Self-Assessment Tuning */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">
                      Tune Your Preparedness Vectors
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      setStudentSelfScores({
                        'axis_0': 85,
                        'axis_1': 90,
                        'axis_2': 78,
                        'axis_3': 82,
                        'axis_4': 88,
                        'axis_5': 92,
                      });
                    }}
                    className="text-[11px] text-white/80 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                <p className="text-xs text-white/80 mb-4 leading-relaxed">
                  Slide your self-rated mastery on each axis to overlay your personalized preparedness polygon against the state topper benchmark.
                </p>

                <div className="space-y-3.5">
                  {currentSubject.radarMetrics.map((metric, i) => {
                    const val = studentSelfScores[`axis_${i}`] || 80;

                    return (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{metric.axis}</span>
                          <span className="font-mono text-emerald-400 font-bold">{val}%</span>
                        </div>

                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={val}
                          onChange={(e) => {
                            setStudentSelfScores((prev) => ({
                              ...prev,
                              [`axis_${i}`]: parseInt(e.target.value, 10),
                            }));
                          }}
                          className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                        />

                        <span className="text-[10px] text-white/70 block">{metric.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-800 mt-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                  <span className="font-bold block text-blue-300">
                    Calculated Confidence Score:{' '}
                    {Math.round(
                      Object.values(studentSelfScores).reduce((a, b) => a + b, 0) /
                        Object.keys(studentSelfScores).length
                    )}
                    %
                  </span>
                  <span>Your profile is aligned with top 5% state-level candidates.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: INTERACTIVE KNOWLEDGE TREE & MIND MAP */}
        {activeMode === 'mindmap' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search theorem, topic, formula..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs placeholder-white/50 border border-slate-700 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setMindmapFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    mindmapFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-white/80 hover:text-white'
                  }`}
                >
                  All Topics ({currentSubject.mindMapNodes.length})
                </button>
                <button
                  onClick={() => setMindmapFilter('high_yield')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1 ${
                    mindmapFilter === 'high_yield'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-white/80 hover:text-white'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  High Yield Only
                </button>
                <button
                  onClick={() => setMindmapFilter('easy')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    mindmapFilter === 'easy'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-white/80 hover:text-white'
                  }`}
                >
                  Easy Scoring
                </button>
                <button
                  onClick={() => setMindmapFilter('hard')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    mindmapFilter === 'hard'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800 text-white/80 hover:text-white'
                  }`}
                >
                  Hard Analytical
                </button>
              </div>
            </div>

            {/* Mindmap Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-800/90 border-blue-500 shadow-md scale-101'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                          {node.marksExpected}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {node.isHighYield && (
                            <span className="text-[10px] font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Flame className="w-3 h-3 text-rose-400" />
                              Guaranteed
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              node.difficulty === 'Easy'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : node.difficulty === 'Medium'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-orange-500/20 text-orange-300'
                            }`}
                          >
                            {node.difficulty}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                        {node.title}
                      </h4>
                      <p className="text-xs text-white/80 line-clamp-2 mb-4 leading-relaxed">
                        {node.quickSummary}
                      </p>

                      {/* Formulas Preview */}
                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-3 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-white/70 block">
                          Must-Memorize Formulae & Concepts:
                        </span>
                        {node.keyTheoremsOrFormulas.map((thm, idx) => (
                          <div
                            key={idx}
                            className="text-[11px] font-mono text-blue-300 flex items-start gap-1"
                          >
                            <span>•</span>
                            <span>{thm}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-white/70">
                      <span className="flex items-center gap-1 text-rose-300 text-[11px]">
                        <AlertTriangle className="w-3 h-3" /> Common Pitfall Alert
                      </span>
                      <span className="text-blue-400 font-semibold flex items-center gap-0.5">
                        Inspect <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Node Detailed Modal / Drawer */}
            {selectedNode && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-blue-500/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-blue-400 block font-bold">
                      DEEP CONCEPT BLUEPRINT
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedNode.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-semibold text-white/80 hover:text-white cursor-pointer"
                  >
                    Close Inspection
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Key Board Theorems & Formula Derivations:
                    </span>
                    <ul className="space-y-1.5 text-xs text-white/90">
                      {selectedNode.keyTheoremsOrFormulas.map((f, i) => (
                        <li key={i} className="font-mono bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Where Students Lose Marks (Common Exam Traps):
                    </span>
                    <p className="text-xs text-rose-100 leading-relaxed">
                      {selectedNode.commonMistakes}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                  <span className="font-bold text-blue-300 block mb-0.5">Examiner Expectation:</span>
                  <p>{selectedNode.quickSummary}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 4: MARKS SIMULATOR & AGGREGATE PREDICTOR */}
        {activeMode === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Sliders for 8 Subjects */}
            <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>Live 8-Subject Marks & Rank Simulator</span>
                  </h4>
                  <p className="text-xs text-white/80 mt-0.5">
                    Adjust expected written scores (0–100) to project state merit standing and aggregate percentage.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                  <button
                    onClick={() => applyPreset('topper')}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors cursor-pointer"
                  >
                    Topper (95%)
                  </button>
                  <button
                    onClick={() => applyPreset('distinction')}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                  >
                    Distinction (85%)
                  </button>
                  <button
                    onClick={() => applyPreset('first')}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors cursor-pointer"
                  >
                    First Div (68%)
                  </button>
                </div>
              </div>

              {/* 8 Subject Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUBJECT_ORDER.map((subId) => {
                  const sub = SUBJECT_DIAGRAM_DATA[subId];
                  const currentVal = simulatedMarks[subId] || 85;

                  return (
                    <div
                      key={subId}
                      className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className="p-1 rounded-md"
                            style={{ backgroundColor: `${sub.themeColor}30`, color: sub.themeColor }}
                          >
                            {renderSubjectIcon(sub.iconName, 'w-3.5 h-3.5')}
                          </span>
                          <span className="font-bold text-white">{sub.name}</span>
                        </div>
                        <span className="font-mono font-bold text-sm text-white">
                          {currentVal} <span className="text-[10px] text-white/60">/ 100</span>
                        </span>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentVal}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setSimulatedMarks((prev) => ({
                            ...prev,
                            [subId]: val,
                          }));
                        }}
                        className="w-full cursor-pointer h-1.5 bg-slate-700 rounded-lg accent-blue-500"
                      />

                      <div className="flex items-center justify-between text-[10px] text-white/60">
                        <span>Pass: {sub.passingMarks}</span>
                        <span className="text-amber-400">Topper: {sub.topperTarget}+</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Circular Projected Score Gauge & Advice */}
            <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="text-center pb-4 border-b border-slate-800">
                  <span className="text-xs uppercase font-mono font-bold text-white/70 block">
                    PROJECTED BOARD RESULT
                  </span>

                  {/* SVG Circular Progress Gauge */}
                  <div className="relative py-4 flex items-center justify-center">
                    <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-lg">
                      <circle
                        cx="80"
                        cy="80"
                        r="64"
                        fill="none"
                        stroke="#1E293B"
                        strokeWidth="10"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="64"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 64}
                        strokeDashoffset={2 * Math.PI * 64 * (1 - simPercentage / 100)}
                        strokeLinecap="round"
                        transform="rotate(-90 80 80)"
                      />
                      <text
                        x="80"
                        y="76"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="28"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {simPercentage}%
                      </text>
                      <text
                        x="80"
                        y="96"
                        textAnchor="middle"
                        fill="#94A3B8"
                        fontSize="11"
                        fontFamily="monospace"
                      >
                        {simTotal} / {simMax}
                      </text>
                    </svg>
                  </div>

                  <div className="mt-2">
                    <div className="text-2xl font-extrabold flex items-center justify-center gap-2">
                      <span className={getSimGrade(simPercentage).color}>
                        Grade {getSimGrade(simPercentage).grade}
                      </span>
                    </div>
                    <span className="text-xs text-white/80 block mt-0.5">
                      {getSimGrade(simPercentage).label}
                    </span>
                  </div>
                </div>

                {/* State Merit Standing Estimation */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                  <span className="text-xs font-bold text-white block">
                    Estimated Merit Percentile Bracket:
                  </span>
                  <div className="flex items-center justify-between text-xs text-white/90">
                    <span>State Percentile:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {simPercentage >= 95
                        ? 'Top 0.5% (State Rank 1-50 Contender)'
                        : simPercentage >= 90
                        ? 'Top 2.5% (District Topper Bracket)'
                        : simPercentage >= 80
                        ? 'Top 10% (Star Division Tier)'
                        : 'Top 30% Pass Bracket'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/90">
                    <span>Science & Math Aggregate:</span>
                    <span className="font-mono font-bold text-blue-400">
                      {(simulatedMarks['sub_math'] || 0) +
                        (simulatedMarks['sub_phys'] || 0) +
                        (simulatedMarks['sub_life'] || 0)}{' '}
                      / 300
                    </span>
                  </div>
                </div>

                {/* Topper Study Blueprint Recommendations */}
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 space-y-1">
                  <span className="font-bold text-blue-300 block">Personalized Diagnosis:</span>
                  {simPercentage >= 90 ? (
                    <p>Maintain your daily mock exam cadence. Work on speed in Physical Science numericals and Geography map precision.</p>
                  ) : simPercentage >= 75 ? (
                    <p>Boost your score by focusing on Life Science 5-mark diagrams and Mathematics circle theorems to cross 90%+.</p>
                  ) : (
                    <p>Focus on High-Yield 100% predictable questions in Statistics, Grammar, and Map Pointing to instantly gain +40 marks.</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 mt-4 space-y-2">
                {onOpenTestEngine && (
                  <button
                    onClick={() => onOpenTestEngine(undefined)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Test This Score in Live Mock CBT</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. Bottom Topper Strategy Playbook Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {currentSubject.name} State Topper Revision Playbook
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentSubject.topperStrategyKeys.map((keyPoint, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs text-white/90 leading-relaxed flex items-start gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{keyPoint}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
