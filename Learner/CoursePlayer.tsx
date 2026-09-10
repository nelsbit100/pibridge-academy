// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Course Player
// ──────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useAcademy } from "../AcademyContext";
import { COURSES } from "../data";
import type { Quiz } from "../types";
import {
  ArrowLeft, ChevronDown, ChevronRight, Play, FileText, HelpCircle,
  ClipboardList, FolderGit2, Monitor, CheckCircle, Lock, BookOpen,
  X, Menu, Sparkles, Award,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedLessonVideo } from "./AnimatedLessonVideo";
import { getLessonVideo } from "../lessonVideos";
import { buildLessonQuiz } from "./lessonQuiz";
import { QuizEngine } from "./QuizEngine";

const LESSON_TYPE_ICONS: Record<string, typeof Play> = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  assignment: ClipboardList,
  project: FolderGit2,
  lab: Monitor,
};

export function CoursePlayer() {
  const {
    selectedCourseId, selectedLessonId, goBack, navigateToLesson, progress,
    markLessonComplete, recordQuizScore, recordSubmission,
    playbackPositions, savePlayback, clearPlayback,
  } = useAcademy();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"content" | "notes" | "resources">("content");
  const [quizMode, setQuizMode] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | undefined>();
  const [feedback, setFeedback] = useState<string | null>(null);

  const course = COURSES.find((c) => c.id === selectedCourseId);
  if (!course) return null;

  const courseProgress = progress[course.id];
  const completedLessons = courseProgress?.completedLessons || [];

  // Find current lesson
  let currentLesson = null;
  let currentModule = null;
  for (const mod of course.modules) {
    const found = mod.lessons.find((l) => l.id === selectedLessonId);
    if (found) {
      currentLesson = found;
      currentModule = mod;
      break;
    }
  }

  // If no lesson selected, use first lesson
  if (!currentLesson && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
    currentModule = course.modules[0];
    currentLesson = currentModule.lessons[0];
  }

  const videoScript = currentLesson ? getLessonVideo(currentLesson.id) : undefined;

  // Auto-expand current module (in an effect — never setState during render)
  useEffect(() => {
    if (currentModule && !expandedModules.has(currentModule.id)) {
      setExpandedModules((prev) => new Set([...prev, currentModule.id]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentModule?.id]);

  // Leave quiz mode / clear feedback when the learner switches lessons
  useEffect(() => {
    setQuizMode(false);
    setActiveQuiz(undefined);
    setFeedback(null);
  }, [selectedLessonId]);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Find next/prev lessons
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // ── Lesson actions ──
  const savedPosition =
    (currentLesson && playbackPositions[course.id]?.[currentLesson.id]) || 0;

  const handleVideoProgress = (seconds: number) => {
    if (!currentLesson) return;
    savePlayback(course.id, currentLesson.id, seconds);
  };

  const handleVideoEnded = () => {
    if (!currentLesson) return;
    clearPlayback(course.id, currentLesson.id); // completed → fresh start next time
    if (completedLessons.includes(currentLesson.id)) return;
    markLessonComplete(course.id, currentLesson.id, currentLesson.durationMinutes);
    setFeedback("Lesson complete — nice work. Marked as done.");
  };

  const openQuiz = () => {
    if (!currentLesson) return;
    const built = buildLessonQuiz(course.id, currentLesson);
    if (!built) {
      setFeedback("This quiz is still being prepared — questions come from the module's video knowledge checks.");
      return;
    }
    setActiveQuiz(built.quiz);
    setQuizMode(true);
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (!currentLesson) return;
    recordQuizScore(course.id, currentLesson.id, score, passed);
    setFeedback(
      passed
        ? `Passed with ${score}% — score recorded to your progress.`
        : `Scored ${score}% — review the explanations and try again (passing score ${activeQuiz?.passingScore ?? 70}%).`
    );
  };

  const submitWritten = (kind: "assignment" | "project" | "lab") => {
    if (!currentLesson) return;
    if (kind === "lab") {
      recordSubmission(course.id, currentLesson.id, kind, 100);
      setFeedback("Lab session logged as complete.");
      return;
    }
    // Written work enters the instructor's grading queue as pending (0);
    // the score is set when the instructor grades it.
    recordSubmission(course.id, currentLesson.id, kind, 0);
    setFeedback(
      `${kind === "assignment" ? "Assignment" : "Project"} submitted — awaiting instructor grading.`
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-screen sticky top-0 bg-neutral-900 border-r border-neutral-800 overflow-hidden shrink-0"
          >
            <div className="w-80 h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <button onClick={goBack} className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors">
                    <ArrowLeft className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button onClick={() => setSidebarOpen(false)} className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors lg:hidden">
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
                <h2 className="font-bold text-white text-sm line-clamp-2">{course.title}</h2>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-500">{completedCount}/{totalLessons} lessons</span>
                    <span className="text-amber-400 font-semibold">{progressPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>

              {/* Module List */}
              <div className="flex-1 overflow-y-auto">
                {course.modules.map((mod) => {
                  const isExpanded = expandedModules.has(mod.id);
                  const modCompleted = mod.lessons.filter((l) => completedLessons.includes(l.id)).length;

                  return (
                    <div key={mod.id} className="border-b border-neutral-800/50">
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-800/30 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${isExpanded ? "rotate-0" : "-rotate-90"}`} />
                          <div className="text-left min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{mod.title}</p>
                            <p className="text-xs text-neutral-600">{modCompleted}/{mod.lessons.length}</p>
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="pb-1">
                          {mod.lessons.map((lesson) => {
                            const Icon = LESSON_TYPE_ICONS[lesson.type] || FileText;
                            const isActive = lesson.id === currentLesson?.id;
                            const isCompleted = completedLessons.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => navigateToLesson(course.id, lesson.id)}
                                className={`w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors ${
                                  isActive
                                    ? "bg-amber-500/10 border-l-2 border-amber-500"
                                    : "hover:bg-neutral-800/20 border-l-2 border-transparent"
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                                  isCompleted ? "bg-emerald-500/10" : isActive ? "bg-amber-500/10" : "bg-neutral-800"
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : lesson.isPreview ? (
                                    <Icon className="w-3.5 h-3.5 text-neutral-400" />
                                  ) : (
                                    <Lock className="w-3.5 h-3.5 text-neutral-600" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-xs truncate ${isActive ? "text-amber-400 font-medium" : isCompleted ? "text-neutral-400" : "text-neutral-300"}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-neutral-600">{lesson.durationMinutes} min</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex items-center gap-3">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-neutral-400" />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {currentModule?.title} {currentModule ? "·" : ""} {currentLesson?.title}
            </p>
          </div>
          <span className="text-xs text-neutral-500 shrink-0">
            {currentIndex + 1} of {totalLessons}
          </span>
        </div>

        {/* Lesson Content */}
        {currentLesson && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {feedback && (
              <div className="mb-5 flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <p className="text-sm text-emerald-300 flex-1">{feedback}</p>
                <button onClick={() => setFeedback(null)} aria-label="Dismiss message">
                  <X className="w-4 h-4 text-emerald-400/70 hover:text-emerald-300" />
                </button>
              </div>
            )}
            {currentLesson.type === "video" && (
              videoScript ? (
                <div className="mb-8">
                  <AnimatedLessonVideo
                    script={videoScript}
                    resumeAt={savedPosition}
                    onProgress={handleVideoProgress}
                    onEnded={handleVideoEnded}
                  />
                  <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Animated lesson with voice narration — generated from the lesson script library.</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden mb-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-amber-400 ml-1" />
                    </div>
                    <p className="text-white font-semibold">{currentLesson.title}</p>
                    <p className="text-sm text-neutral-500 mt-1">{currentLesson.durationMinutes} minutes</p>
                  </div>
                </div>
              )
            )}

            {currentLesson.type === "reading" && currentLesson.content && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-8">
                <h1 className="text-2xl font-bold text-white mb-6">{currentLesson.title}</h1>
                <div className="prose prose-invert prose-neutral max-w-none">
                  <p className="text-neutral-300 leading-relaxed text-lg">{currentLesson.content}</p>
                </div>
              </div>
            )}

            {currentLesson.type === "quiz" && !quizMode && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">{currentLesson.title}</h1>
                    <p className="text-sm text-neutral-500">Knowledge Check</p>
                  </div>
                </div>
                {(() => {
                  const built = buildLessonQuiz(course.id, currentLesson);
                  const lastScore = courseProgress?.quizScores?.[currentLesson.id];
                  if (!built) {
                    return (
                      <p className="text-sm text-neutral-400">
                        This quiz is still being prepared — questions come from the module's video knowledge checks.
                      </p>
                    );
                  }
                  return (
                    <div className="space-y-4">
                      <div className="p-4 bg-neutral-800/50 rounded-xl">
                        <p className="text-sm text-neutral-300">{built.quiz.description}</p>
                        <div className="flex gap-5 mt-3 text-xs text-neutral-500">
                          <span>{built.quiz.questions.length} questions · from your video knowledge checks</span>
                          <span>{built.quiz.timeLimitMinutes} min limit</span>
                          <span>Pass at {built.quiz.passingScore}%</span>
                          {lastScore !== undefined && (
                            <span className="text-emerald-400">Best score: {lastScore}%</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={openQuiz}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors text-sm"
                      >
                        {lastScore !== undefined ? "Retake Quiz" : "Start Quiz"}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {currentLesson.type === "quiz" && quizMode && activeQuiz && (
              <div className="mb-8">
                <QuizEngine
                  quiz={activeQuiz}
                  onComplete={handleQuizComplete}
                  onBack={() => setQuizMode(false)}
                />
              </div>
            )}

            {currentLesson.type === "assignment" && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">{currentLesson.title}</h1>
                    <p className="text-sm text-neutral-500">Assignment</p>
                  </div>
                </div>
                <div className="p-4 bg-neutral-800/50 rounded-xl mb-4">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Complete the subnetting exercise below. Calculate the subnet mask, network address, broadcast address,
                    and usable host range for the given IP address and prefix.
                  </p>
                </div>
                <textarea
                  placeholder="Enter your answer here..."
                  className="w-full h-32 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 resize-none"
                />
                <button
                  onClick={() => submitWritten("assignment")}
                  className="mt-4 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors text-sm"
                >
                  Submit Assignment
                </button>
              </div>
            )}

            {currentLesson.type === "lab" && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">{currentLesson.title}</h1>
                    <p className="text-sm text-neutral-500">Hands-on Lab · {currentLesson.durationMinutes} min</p>
                  </div>
                </div>
                <div className="aspect-[16/9] bg-neutral-950 border border-neutral-700 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Monitor className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                    <p className="text-neutral-500 text-sm">Virtual lab environment</p>
                    <p className="text-xs text-neutral-600 mt-1">Launching soon in your browser</p>
                  </div>
                </div>
                <button
                  onClick={() => submitWritten("lab")}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors text-sm"
                >
                  Mark Lab Session Complete
                </button>
              </div>
            )}

            {currentLesson.type === "project" && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <FolderGit2 className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">{currentLesson.title}</h1>
                    <p className="text-sm text-neutral-500">Capstone Project</p>
                  </div>
                </div>
                <div className="p-4 bg-neutral-800/50 rounded-xl mb-4">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Design and implement a secure network topology for a small business. Include firewall rules,
                    VLAN segmentation, and a monitoring solution. Document your design decisions and present your findings.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-neutral-800/30 rounded-lg">
                    <p className="text-xs text-neutral-500">Deliverable</p>
                    <p className="text-sm text-white">Network diagram + report</p>
                  </div>
                  <div className="p-3 bg-neutral-800/30 rounded-lg">
                    <p className="text-xs text-neutral-500">Max Score</p>
                    <p className="text-sm text-white">100 points</p>
                  </div>
                </div>
                <button
                  onClick={() => submitWritten("project")}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors text-sm"
                >
                  Submit Project
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              {prevLesson ? (
                <button
                  onClick={() => navigateToLesson(course.id, prevLesson.id)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
              ) : (
                <div />
              )}

              {/* Mark Complete */}
              <button
                onClick={() => {
                  if (!currentLesson || completedLessons.includes(currentLesson.id)) return;
                  markLessonComplete(course.id, currentLesson.id, currentLesson.durationMinutes);
                  setFeedback("Lesson marked as complete.");
                }}
                disabled={!currentLesson || completedLessons.includes(currentLesson.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentLesson && completedLessons.includes(currentLesson.id)
                    ? "bg-emerald-500/5 text-emerald-500/60 cursor-default"
                    : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {currentLesson && completedLessons.includes(currentLesson.id) ? "Completed" : "Mark as Complete"}
              </button>

              {nextLesson ? (
                <button
                  onClick={() => navigateToLesson(course.id, nextLesson.id)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors text-sm"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
