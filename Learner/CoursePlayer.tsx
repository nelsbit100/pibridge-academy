// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Course Player
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAcademy } from "../AcademyContext";
import { COURSES } from "../data";
import {
  ArrowLeft, ChevronDown, ChevronRight, Play, FileText, HelpCircle,
  ClipboardList, FolderGit2, Monitor, CheckCircle, Lock, BookOpen,
  X, Menu, Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedLessonVideo } from "./AnimatedLessonVideo";
import { getLessonVideo } from "../lessonVideos";

const LESSON_TYPE_ICONS: Record<string, typeof Play> = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  assignment: ClipboardList,
  project: FolderGit2,
  lab: Monitor,
};

export function CoursePlayer() {
  const { selectedCourseId, selectedLessonId, goBack, navigateToLesson, progress } = useAcademy();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"content" | "notes" | "resources">("content");

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

  // Auto-expand current module
  if (currentModule && !expandedModules.has(currentModule.id)) {
    setExpandedModules((prev) => new Set([...prev, currentModule!.id]));
  }

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
            {currentLesson.type === "video" && (
              videoScript ? (
                <div className="mb-8">
                  <AnimatedLessonVideo script={videoScript} />
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

            {currentLesson.type === "quiz" && (
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
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-800/50 rounded-xl">
                    <p className="text-sm font-medium text-white mb-3">1. What does the OSI model stand for?</p>
                    <div className="space-y-2">
                      {["Open Systems Interconnection", "Open Source Integration", "Online Security Interface", "Operating System Integration"].map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 bg-neutral-900 rounded-lg cursor-pointer hover:bg-neutral-800 transition-colors border border-neutral-700/50">
                          <div className="w-4 h-4 rounded-full border-2 border-neutral-600 shrink-0" />
                          <span className="text-sm text-neutral-300">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors text-sm">
                    Submit Quiz
                  </button>
                </div>
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
                <button className="mt-4 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors text-sm">
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
                <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors text-sm">
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
              <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl text-sm font-semibold hover:bg-emerald-500/20 transition-colors">
                <CheckCircle className="w-4 h-4" /> Mark as Complete
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
