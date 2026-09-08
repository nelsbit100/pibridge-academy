// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Live Presentation Component
// Defend hands-on labs and capstone projects to build communication confidence
// ──────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Video, Mic, MicOff, Monitor, MessageSquare, Clock, CheckCircle,
  AlertTriangle, Star, ChevronRight, Presentation, Users, BarChart3,
} from "lucide-react";
import { PRESENTATION_RUBRICS, type LivePresentation, type PresentationRubric } from "../careerPaths";

// ── Types ──
type PresentationPhase = "preparation" | "presentation" | "qa" | "evaluation" | "results";

interface PresentationProps {
  projectTitle: string;
  projectDescription: string;
  programmeId: string;
  tierName: "foundation" | "professional" | "expert";
  onComplete: (score: number, feedback: string) => void;
  onBack: () => void;
}

// ── Presentation Timer ──
function PresentationTimer({ durationMinutes, onTimeUp }: { durationMinutes: number; onTimeUp: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (secondsLeft <= 0) { onTimeUp(); return; }
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const percentage = (secondsLeft / (durationMinutes * 60)) * 100;

  return (
    <div className="flex items-center gap-3">
      <Clock className="w-4 h-4 text-amber-400" />
      <div className="relative">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/10" />
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2"
            strokeDasharray={`${percentage} 100`}
            className={secondsLeft < 60 ? "text-red-500" : secondsLeft < 300 ? "text-amber-500" : "text-green-500"} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-mono font-bold">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──
export function LivePresentation({
  projectTitle, projectDescription, programmeId, tierName, onComplete, onBack,
}: PresentationProps) {
  const [phase, setPhase] = useState<PresentationPhase>("preparation");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [qaIndex, setQaIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [timerExpired, setTimerExpired] = useState(false);

  const rubric = PRESENTATION_RUBRICS[tierName] || PRESENTATION_RUBRICS.foundation;

  const slides = [
    { title: "Introduction", content: "Introduce yourself, your background, and the project you'll be presenting." },
    { title: "Problem Statement", content: "What problem does your project solve? Who is the target user?" },
    { title: "Technical Architecture", content: "Walk through your technical decisions, architecture, and why you chose specific tools." },
    { title: "Live Demo", content: "Demonstrate the working project. Show key features and functionality." },
    { title: "Challenges & Solutions", content: "What challenges did you face? How did you overcome them?" },
    { title: "Results & Impact", content: "What were the results? How would this impact the target users?" },
    { title: "Lessons Learned", content: "What would you do differently? What did you learn?" },
    { title: "Future Improvements", content: "If you had more time, what would you add or change?" },
  ];

  const qaQuestions = [
    "Walk me through the most technically challenging part of this project.",
    "Why did you choose this architecture over alternatives?",
    "How would this scale to 10x the current user base?",
    "What security considerations did you implement?",
    "How did you test your application?",
    "What would you change if you were to rebuild this from scratch?",
    "How does this project demonstrate your readiness for a professional role?",
  ];

  const handleTimeUp = useCallback(() => {
    setTimerExpired(true);
    if (phase === "presentation") setPhase("qa");
  }, [phase]);

  // ── Preparation Phase ──
  if (phase === "preparation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="border-b border-white/10 px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            ← Back to Dashboard
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Presentation className="w-4 h-4" /> Live Presentation
            </div>
            <h1 className="text-3xl font-bold mb-2">Project Defense: {projectTitle}</h1>
            <p className="text-gray-400 mb-8">Prepare your presentation to defend your project. This is your chance to demonstrate technical depth and build communication confidence.</p>

            {/* Presentation Guidelines */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Presentation Guidelines</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-indigo-400 mb-3">📋 Structure (10 minutes)</h3>
                  <ol className="space-y-2 text-sm text-gray-300">
                    {slides.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-0.5 rounded font-mono">{i + 1}</span>
                        <span><strong>{s.title}:</strong> {s.content}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-medium text-amber-400 mb-3">🎯 Evaluation Criteria</h3>
                  <div className="space-y-3">
                    {rubric.map((r, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{r.category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${r.weight * 100}%` }} />
                          </div>
                          <span className="text-gray-500 text-xs">{Math.round(r.weight * 100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-xs text-amber-300">
                      <strong>Live Presentation Requirement:</strong> You must complete this presentation to advance to the next tier in your career path.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Check */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h3 className="font-medium mb-4">🔧 Pre-Presentation Check</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Camera", working: isCameraOn, icon: <Video className="w-5 h-5" /> },
                  { label: "Microphone", working: isMicOn, icon: <Mic className="w-5 h-5" /> },
                  { label: "Screen Share", working: true, icon: <Monitor className="w-5 h-5" /> },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-3 p-3 rounded-lg border ${item.working ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.working ? <CheckCircle className="w-4 h-4 text-green-400 ml-auto" /> : <AlertTriangle className="w-4 h-4 text-red-400 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setPhase("presentation")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2">
              Start Presentation <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Presentation Phase ──
  if (phase === "presentation" || phase === "qa") {
    const isQA = phase === "qa";
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Top Bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-indigo-400">
              {isQA ? `Q&A — Question ${qaIndex + 1}/${qaQuestions.length}` : `Slide ${currentSlide + 1}/${slides.length}`}
            </span>
            <PresentationTimer durationMinutes={isQA ? 5 : 10} onTimeUp={handleTimeUp} />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMicOn(!isMicOn)}
              className={`p-2 rounded-lg transition ${isMicOn ? "bg-white/10" : "bg-red-500/20 text-red-400"}`}>
              {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsCameraOn(!isCameraOn)}
              className={`p-2 rounded-lg transition ${isCameraOn ? "bg-white/10" : "bg-red-500/20 text-red-400"}`}>
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-white/10"><Monitor className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[calc(100vh-56px)]">
          {/* Main Content */}
          <div className="lg:col-span-2 p-8 flex flex-col">
            {isQA ? (
              <div className="flex-1 flex flex-col justify-center">
                <motion.div key={qaIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm mb-4">
                    <MessageSquare className="w-4 h-4" /> {qaIndex < 3 ? "Technical" : qaIndex < 5 ? "Behavioral" : "Project-Specific"} Question
                  </div>
                  <h2 className="text-2xl font-bold mb-6">{qaQuestions[qaIndex]}</h2>
                  <textarea
                    value={answers[qaIndex] || ""}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [qaIndex]: e.target.value }))}
                    placeholder="Type your answer here..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 min-h-[150px] resize-none"
                  />
                </motion.div>
                <div className="flex justify-between mt-6">
                  <button onClick={() => setQaIndex((i) => Math.max(0, i - 1))} disabled={qaIndex === 0}
                    className="px-4 py-2 rounded-lg border border-white/20 text-sm disabled:opacity-50">Previous</button>
                  {qaIndex < qaQuestions.length - 1 ? (
                    <button onClick={() => setQaIndex((i) => i + 1)}
                      className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium">
                      Next Question
                    </button>
                  ) : (
                    <button onClick={() => setPhase("evaluation")}
                      className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-sm font-medium">
                      Submit & Get Score
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center">
                <motion.div key={currentSlide} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-12 min-h-[400px] flex flex-col justify-center">
                    <div className="text-sm text-indigo-400 mb-2">Slide {currentSlide + 1}</div>
                    <h2 className="text-3xl font-bold mb-4">{slides[currentSlide].title}</h2>
                    <p className="text-xl text-gray-300">{slides[currentSlide].content}</p>
                  </div>
                </motion.div>
                <div className="flex justify-between mt-6">
                  <button onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))} disabled={currentSlide === 0}
                    className="px-4 py-2 rounded-lg border border-white/20 text-sm disabled:opacity-50">Previous</button>
                  {currentSlide < slides.length - 1 ? (
                    <button onClick={() => setCurrentSlide((s) => s + 1)}
                      className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium">
                      Next Slide
                    </button>
                  ) : (
                    <button onClick={() => setPhase("qa")}
                      className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Start Q&A
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Camera Feed */}
          <div className="bg-slate-800 border-l border-slate-700 p-4 flex flex-col">
            <div className="bg-slate-700 rounded-xl aspect-video flex items-center justify-center mb-4 relative">
              {isCameraOn ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-8 h-8 text-indigo-400" />
                  </div>
                  <span className="text-sm text-gray-400">Your Camera Feed</span>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span className="text-sm">Camera Off</span>
                </div>
              )}
              {isMicOn && (
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>

            {/* Evaluator Panel */}
            <div className="bg-white/5 rounded-xl p-4 flex-1">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" /> Live Evaluation
              </h3>
              <div className="space-y-3">
                {rubric.map((r, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{r.category}</span>
                      <span className="text-gray-500">/ {r.maxScore}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full">
                      <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${(scores[r.category] || 0) / r.maxScore * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-indigo-500/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-indigo-400">
                  {Object.values(scores).reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-xs text-gray-500">Current Score</div>
              </div>
            </div>

            {/* Slide Progress */}
            {!isQA && (
              <div className="mt-4">
                <div className="flex gap-1">
                  {slides.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= currentSlide ? "bg-indigo-500" : "bg-white/10"}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Evaluation Phase ──
  if (phase === "evaluation") {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = rubric.reduce((a, r) => a + r.maxScore, 0);

    // Auto-score based on answer quality
    const answeredCount = Object.values(answers).filter((a) => a && a.length > 20).length;
    const communicationScore = Math.min(20, 10 + answeredCount * 2);
    const technicalScore = Math.min(25, 12 + answeredCount * 2);

    const autoScores: Record<string, number> = {
      "Technical Content": technicalScore,
      "Project Execution": Math.min(20, 10 + answeredCount),
      "Communication": communicationScore,
      "Q&A Handling": Math.min(15, 7 + answeredCount * 2),
      "Professionalism": 13,
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="border-b border-white/10 px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            ← Back to Dashboard
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-2">Presentation Evaluation</h1>
            <p className="text-gray-400 mb-8">Review your self-assessment scores and receive AI feedback.</p>

            {/* Score Breakdown */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>
              <div className="space-y-4">
                {rubric.map((r, i) => {
                  const score = autoScores[r.category] || Math.round(r.maxScore * 0.7);
                  return (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-300">{r.category}</span>
                        <span className="text-sm font-medium">{score} / {r.maxScore}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(score / r.maxScore) * 100}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className={`h-full rounded-full ${score / r.maxScore >= 0.8 ? "bg-green-500" : score / r.maxScore >= 0.6 ? "bg-amber-500" : "bg-red-500"}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="font-semibold">Total Score</span>
                <span className="text-2xl font-bold text-indigo-400">{Object.values(autoScores).reduce((a, b) => a + b, 0)} / {maxScore}</span>
              </div>
            </div>

            {/* AI Feedback */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">💬 AI Presentation Feedback</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-medium text-green-400 mb-2">✅ Strengths</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Good structure and logical flow of presentation</li>
                    <li>• Clear explanation of the problem statement</li>
                    <li>• Demonstrated understanding of technical concepts</li>
                    <li>• Professional demeanor throughout</li>
                  </ul>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <h3 className="font-medium text-amber-400 mb-2">📈 Areas for Improvement</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Provide more specific examples when discussing technical decisions</li>
                    <li>• Quantify the impact of your project with metrics</li>
                    <li>• Consider discussing alternative approaches and why you chose yours</li>
                    <li>• Practice time management — ensure equal time per section</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Presentation Certificate */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-500/30 rounded-full flex items-center justify-center">
                  <Presentation className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Live Presentation Completed</h3>
                  <p className="text-sm text-gray-400">You've successfully defended your project. This counts toward your career path progression.</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400 ml-auto" />
              </div>
            </div>

            <button onClick={() => onComplete(Object.values(autoScores).reduce((a, b) => a + b, 0), "Live presentation completed")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Continue to AI Interview →
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
