import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  RotateCcw,
  X,
  FileCheck,
  Check,
  Printer,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_QUESTIONS } from '../../services/storage';
import { MockQuestion, TestAttemptResult } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface MockTestEngineProps {
  isOpen: boolean;
  onClose: () => void;
  candidateRegId?: string;
  studentName?: string;
}

export const MockTestEngine: React.FC<MockTestEngineProps> = ({
  isOpen,
  onClose,
  candidateRegId = 'ARDM-2026-DEMO',
  studentName = 'Candidate Student',
}) => {
  // Questions pool
  const [questions, setQuestions] = useState<MockQuestion[]>(MOCK_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);

  // User answers: questionId -> selectedOptionIndex
  const [answers, setAnswers] = useState<Record<string, number>>({});
  // Review marks: questionId -> boolean
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});

  // Timer: 45 minutes = 2700 seconds
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [timerActive, setTimerActive] = useState(true);

  // Selected subject filter
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  // Submit confirmation modal
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Test completed result
  const [testResult, setTestResult] = useState<TestAttemptResult | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || !timerActive || testResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timerActive, testResult]);

  if (!isOpen) return null;

  // Filtered questions
  const filteredQuestions =
    selectedSubjectFilter === 'all'
      ? questions
      : questions.filter((q) => q.subjectId === selectedSubjectFilter);

  const activeQuestion = filteredQuestions[currentIdx] || questions[0];

  // Distinct subjects
  const subjectList = Array.from(
    new Map(questions.map((q) => [q.subjectId, q.subjectName])).entries()
  ).map(([id, name]) => ({ id, name }));

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (testResult) return;
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: optIdx,
    }));
  };

  const handleClearAnswer = () => {
    if (testResult) return;
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[activeQuestion.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    if (testResult) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [activeQuestion.id]: !prev[activeQuestion.id],
    }));
  };

  const handleSubmitExam = async () => {
    setTimerActive(false);
    setShowSubmitModal(false);

    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    const letterKeys = ['A', 'B', 'C', 'D'];
    const formattedAnswers: Record<string, string> = {};

    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === undefined) {
        unattemptedCount++;
      } else {
        formattedAnswers[q.id] = letterKeys[userAns] || 'A';
        if (userAns === q.correctAnswer) {
          correctCount++;
          totalScore += q.marks;
        } else {
          incorrectCount++;
        }
      }
    });

    const percentage = Math.round((totalScore / (totalMarks || 1)) * 100);
    const passed = percentage >= 40;
    const timeSpentSeconds = 45 * 60 - timeLeft;

    const localResult: TestAttemptResult = {
      attemptId: `att_${Date.now()}`,
      registrationId: candidateRegId,
      studentName,
      score: totalScore,
      totalMarks,
      percentage,
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
      passed,
    };

    setTestResult(localResult);

    // Authoritative Server-side evaluation & persistence
    try {
      fetch('/api/cbt/submit-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationId: candidateRegId,
          studentName,
          answers: formattedAnswers,
          timeSpentSeconds,
        }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((serverData) => {
          if (serverData?.result) {
            setTestResult((prev) => ({
              ...(prev || localResult),
              score: serverData.result.score ?? prev?.score ?? totalScore,
              percentage: serverData.result.percentage ?? prev?.percentage ?? percentage,
              correctCount: serverData.result.correctCount ?? prev?.correctCount ?? correctCount,
              incorrectCount: serverData.result.incorrectCount ?? prev?.incorrectCount ?? incorrectCount,
              unattemptedCount: serverData.result.unattemptedCount ?? prev?.unattemptedCount ?? unattemptedCount,
            }));
          }
        })
        .catch(() => {});
    } catch {}

    if (percentage >= 75) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const resetExam = () => {
    setAnswers({});
    setMarkedForReview({});
    setTimeLeft(45 * 60);
    setTimerActive(true);
    setCurrentIdx(0);
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 text-slate-100 overflow-hidden">
      {/* CBT Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <BrandLogo variant="full" size="sm" light />
          <div className="hidden sm:block h-6 w-px bg-slate-800" />
          <span className="hidden sm:inline text-xs font-mono text-cyan-400 font-semibold uppercase">
            Computer Based Test (CBT) Simulator
          </span>
        </div>

        {/* Candidate & Timer Strip */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span>Roll ID:</span>
            <span className="font-mono text-white font-bold">{candidateRegId}</span>
          </div>

          {!testResult && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-sm font-bold ${
                timeLeft < 300
                  ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-cyan-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      {!testResult ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Column: Question Area */}
          <div className="flex-1 flex flex-col bg-slate-900 overflow-y-auto p-4 sm:p-8">
            {/* Subject Filters & Question Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Subject:</span>
                <select
                  value={selectedSubjectFilter}
                  onChange={(e) => {
                    setSelectedSubjectFilter(e.target.value);
                    setCurrentIdx(0);
                  }}
                  className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All Subjects (Full Syllabus)</option>
                  {subjectList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  Question {currentIdx + 1} of {filteredQuestions.length}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  +{activeQuestion.marks} Marks
                </span>
              </div>
            </div>

            {/* Question Statement */}
            <div className="mb-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  <span className="text-cyan-400 font-mono mr-2">Q{currentIdx + 1}.</span>
                  {activeQuestion.question}
                </h2>
                <button
                  onClick={handleToggleReview}
                  className={`shrink-0 flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                    markedForReview[activeQuestion.id]
                      ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                      : 'border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{markedForReview[activeQuestion.id] ? 'Marked' : 'Review Later'}</span>
                </button>
              </div>
            </div>

            {/* MCQ Options */}
            <div className="space-y-3 mb-8">
              {activeQuestion.options.map((opt, optIndex) => {
                const isSelected = answers[activeQuestion.id] === optIndex;
                const optionLabel = String.fromCharCode(65 + optIndex); // A, B, C, D

                return (
                  <div
                    key={optIndex}
                    onClick={() => handleSelectOption(optIndex)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 select-none ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {optionLabel}
                    </div>
                    <span className="text-sm font-medium leading-normal">{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Navigation Footer Toolbar */}
            <div className="mt-auto pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearAnswer}
                  disabled={answers[activeQuestion.id] === undefined}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40"
                >
                  Clear Choice
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIdx((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIdx === 0}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIdx < filteredQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => prev + 1)}
                    className="inline-flex items-center gap-1 px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                  >
                    Final Submit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Question Palette */}
          <div className="w-full lg:w-80 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 flex flex-col shrink-0">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              Question Palette
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-amber-500 inline-block" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-slate-700 inline-block" />
                <span>Unattempted</span>
              </div>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-56 lg:max-h-none flex-1 mb-4 pr-1">
              {filteredQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                const isCurrent = idx === currentIdx;

                let badgeClass = 'bg-slate-800 text-slate-400 border-slate-700';
                if (isMarked) {
                  badgeClass = 'bg-amber-500 text-slate-950 border-amber-400 font-bold';
                } else if (isAnswered) {
                  badgeClass = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                }

                if (isCurrent) {
                  badgeClass += ' ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg border text-xs font-mono flex items-center justify-center transition-all ${badgeClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Submit Exam Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Submit Mock Examination
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation & Result Scorecard Screen */
        <div className="flex-1 overflow-y-auto p-4 sm:p-10 flex flex-col items-center justify-center bg-slate-900">
          <div className="bg-slate-950 rounded-3xl max-w-2xl w-full p-8 border border-slate-800 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-indigo-900/60 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-700/50">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Mock Test Evaluation Report</h2>
              <p className="text-xs text-slate-400">
                Candidate: <strong className="text-slate-200">{testResult.studentName}</strong> •{' '}
                Roll ID: <strong className="text-cyan-400 font-mono">{testResult.registrationId}</strong>
              </p>
            </div>

            {/* Scorecard KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  Marks Obtained
                </span>
                <span className="text-xl font-extrabold text-white">
                  {testResult.score}{' '}
                  <span className="text-xs font-normal text-slate-400">
                    / {testResult.totalMarks}
                  </span>
                </span>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  Percentage
                </span>
                <span
                  className={`text-xl font-extrabold ${
                    testResult.percentage >= 60 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {testResult.percentage}%
                </span>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  Correct
                </span>
                <span className="text-xl font-extrabold text-emerald-400">
                  {testResult.correctCount}
                </span>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  Incorrect
                </span>
                <span className="text-xl font-extrabold text-rose-400">
                  {testResult.incorrectCount}
                </span>
              </div>
            </div>

            {/* Question Breakdown with Explanations */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Question Review & Explanations
              </h4>
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-2">
                {questions.map((q, idx) => {
                  const userAns = answers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  const isSkipped = userAns === undefined;

                  return (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">
                          Q{idx + 1}: {q.question.substring(0, 60)}...
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isCorrect
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                              : isSkipped
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-rose-950 text-rose-300 border border-rose-700'
                          }`}
                        >
                          {isCorrect ? 'Correct (+4)' : isSkipped ? 'Skipped' : 'Wrong (0)'}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Correct Answer: <strong className="text-cyan-300">{q.options[q.correctAnswer]}</strong>
                      </p>
                      <p className="text-slate-500 text-[11px] italic">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={resetExam}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Scorecard</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold"
                >
                  Return to Academy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal before Submit */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 rounded-2xl max-w-sm w-full p-6 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Submit Examination?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You have answered {Object.keys(answers).length} out of {questions.length} questions.
              Once submitted, your answers will be locked and automatically evaluated.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Continue Exam
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
