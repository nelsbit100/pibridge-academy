// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Interactive Quiz Engine
// ──────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import type { Quiz, QuizQuestion } from "../types";
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle, XCircle,
  AlertCircle, Award, RotateCcw, ArrowRight,
} from "lucide-react";

interface QuizEngineProps {
  quiz: Quiz;
  onComplete: (score: number, passed: boolean, answers: Record<string, string | number>) => void;
  onBack: () => void;
}

export function QuizEngine({ quiz, onComplete, onBack }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimitMinutes * 60);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // Timer
  useEffect(() => {
    if (submitted || showResults) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted, showResults]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);

    // Calculate score
    let totalPoints = 0;
    let earnedPoints = 0;

    for (const q of quiz.questions) {
      totalPoints += q.points;
      const userAnswer = answers[q.id];
      if (userAnswer !== undefined) {
        if (typeof q.correctAnswer === "boolean") {
          if (userAnswer === (q.correctAnswer ? "true" : "false")) earnedPoints += q.points;
        } else if (typeof q.correctAnswer === "number") {
          if (userAnswer === q.correctAnswer) earnedPoints += q.points;
        } else {
          // String comparison for short_answer (case-insensitive, trimmed)
          if (String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
            earnedPoints += q.points;
          }
        }
      }
    }

    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= quiz.passingScore;

    setShowResults(true);
    onComplete(score, passed, answers);
  }, [answers, quiz, onComplete]);

  // Results screen
  if (showResults) {
    let totalPoints = 0;
    let earnedPoints = 0;
    for (const q of quiz.questions) {
      totalPoints += q.points;
      const userAnswer = answers[q.id];
      if (userAnswer !== undefined) {
        if (typeof q.correctAnswer === "boolean") {
          if (userAnswer === (q.correctAnswer ? "true" : "false")) earnedPoints += q.points;
        } else if (typeof q.correctAnswer === "number") {
          if (userAnswer === q.correctAnswer) earnedPoints += q.points;
        } else {
          if (String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
            earnedPoints += q.points;
          }
        }
      }
    }
    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            {/* Score Circle */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#262626" strokeWidth="8" />
                <circle
                  cx="64" cy="64" r="56" fill="none"
                  stroke={passed ? "#10b981" : "#ef4444"}
                  strokeWidth="8"
                  strokeDasharray={`${(score / 100) * 352} 352`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{score}%</span>
                <span className="text-xs text-neutral-500">{earnedPoints}/{totalPoints} pts</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {passed ? "Congratulations!" : "Keep Practicing"}
            </h2>
            <p className="text-neutral-400 mb-2">
              {passed
                ? `You passed with ${score}%. Your knowledge is solid.`
                : `You scored ${score}%. You need ${quiz.passingScore}% to pass. Review the material and try again.`}
            </p>

            {passed ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl text-sm font-semibold mb-6">
                <Award className="w-4 h-4" /> Assessment Passed
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-sm font-semibold mb-6">
                <AlertCircle className="w-4 h-4" /> Below Passing Score ({quiz.passingScore}%)
              </div>
            )}

            {/* Question Review */}
            <div className="text-left space-y-3 mt-6">
              <h3 className="text-sm font-semibold text-neutral-400 mb-3">Question Review</h3>
              {quiz.questions.map((q, i) => {
                const userAnswer = answers[q.id];
                let isCorrect = false;

                if (typeof q.correctAnswer === "boolean") {
                  isCorrect = userAnswer === (q.correctAnswer ? "true" : "false");
                } else if (typeof q.correctAnswer === "number") {
                  isCorrect = userAnswer === q.correctAnswer;
                } else {
                  isCorrect = String(userAnswer || "").trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
                }

                return (
                  <div key={q.id} className={`p-3 rounded-lg border ${
                    isCorrect ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"
                  }`}>
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium">Q{i + 1}: {q.question}</p>
                        {!isCorrect && (
                          <p className="text-xs text-neutral-400 mt-1">
                            {q.type === "short_answer"
                              ? `Correct: ${q.correctAnswer}`
                              : q.type === "true_false"
                                ? `Correct: ${q.correctAnswer ? "True" : "False"}`
                                : `Correct: ${typeof q.correctAnswer === "number" ? q.options?.[q.correctAnswer] : q.correctAnswer}`
                            }
                          </p>
                        )}
                        <p className="text-xs text-neutral-500 mt-1 italic">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={onBack}
                className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Back to Course
              </button>
              {!passed && (
                <button
                  onClick={() => { setSubmitted(false); setShowResults(false); setCurrentIndex(0); setAnswers({}); setTimeRemaining(quiz.timeLimitMinutes * 60); }}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-sm transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-neutral-400 hover:text-white transition-colors">
            Exit Quiz
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className={`w-4 h-4 ${timeRemaining < 60 ? "text-red-400" : "text-neutral-400"}`} />
              <span className={timeRemaining < 60 ? "text-red-400 font-bold" : "text-neutral-300"}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <span className="text-sm text-neutral-400">
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mt-2">
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Question Navigation Pills */}
        <div className="flex flex-wrap gap-1.5 mb-8 justify-center">
          {quiz.questions.map((q, i) => {
            const hasAnswer = answers[q.id] !== undefined;
            const isCurrent = i === currentIndex;
            const isFlagged = flagged.has(q.id);
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                  isCurrent
                    ? "bg-amber-500 text-neutral-950 scale-110"
                    : hasAnswer
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : isFlagged
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6">
            {/* Question Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-md text-xs font-semibold">
                  {currentQuestion.points} {currentQuestion.points === 1 ? "point" : "points"}
                </span>
                <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded-md text-xs capitalize">
                  {currentQuestion.type.replace("_", " ")}
                </span>
              </div>
              <button
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                  flagged.has(currentQuestion.id)
                    ? "bg-orange-500/10 text-orange-400"
                    : "bg-neutral-800 text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {flagged.has(currentQuestion.id) ? "Flagged" : "Flag"}
              </button>
            </div>

            {/* Question Text */}
            <h2 className="text-lg font-semibold text-white mb-6">{currentQuestion.question}</h2>

            {/* Answer Options */}
            {currentQuestion.type === "multiple_choice" && currentQuestion.options && (
              <div className="space-y-2">
                {currentQuestion.options.map((option, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${
                      answers[currentQuestion.id] === i
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-neutral-800/50 border-neutral-700/50 hover:border-neutral-600"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      answers[currentQuestion.id] === i
                        ? "border-amber-400 bg-amber-400"
                        : "border-neutral-600"
                    }`}>
                      {answers[currentQuestion.id] === i && (
                        <div className="w-2 h-2 rounded-full bg-neutral-950" />
                      )}
                    </div>
                    <span className="text-sm text-neutral-300">{option}</span>
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      className="sr-only"
                      checked={answers[currentQuestion.id] === i}
                      onChange={() => handleAnswer(currentQuestion.id, i)}
                    />
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === "true_false" && (
              <div className="grid grid-cols-2 gap-3">
                {["true", "false"].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(currentQuestion.id, val)}
                    className={`p-4 rounded-xl text-center font-semibold text-sm transition-all border ${
                      answers[currentQuestion.id] === val
                        ? val === "true"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-red-500/10 border-red-500/30 text-red-400"
                        : "bg-neutral-800/50 border-neutral-700/50 text-neutral-300 hover:border-neutral-600"
                    }`}
                  >
                    {val === "true" ? "True" : "False"}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "short_answer" && (
              <textarea
                value={String(answers[currentQuestion.id] || "")}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-24 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 resize-none"
              />
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {currentIndex === totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-sm transition-colors"
            >
              Submit Quiz <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-sm transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
