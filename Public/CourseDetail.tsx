// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Course Detail
// ──────────────────────────────────────────────────────────────

import { useAcademy } from "../AcademyContext";
import { COURSES } from "../data";
import {
  ArrowLeft, Clock, BookOpen, Star, Users, ChevronDown, ChevronRight,
  Play, FileText, HelpCircle, ClipboardList, FolderGit2, Monitor,
  CheckCircle, Lock, Eye,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const LESSON_TYPE_ICONS: Record<string, typeof Play> = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  assignment: ClipboardList,
  project: FolderGit2,
  lab: Monitor,
};

const LESSON_TYPE_COLORS: Record<string, string> = {
  video: "text-blue-400 bg-blue-500/10",
  reading: "text-emerald-400 bg-emerald-500/10",
  quiz: "text-purple-400 bg-purple-500/10",
  assignment: "text-orange-400 bg-orange-500/10",
  project: "text-red-400 bg-red-500/10",
  lab: "text-cyan-400 bg-cyan-500/10",
};

export function CourseDetail() {
  const { selectedCourseId, goBack, navigateToLesson, setView } = useAcademy();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const course = COURSES.find((c) => c.id === selectedCourseId);
  if (!course) return null;

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalMinutes = course.modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.durationMinutes, 0),
    0
  );

  return (
    <div className="min-h-screen bg-aliceblue">
      {/* Header */}
      <div className="bg-white/80 border-b border-slate-200 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={goBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-900 text-sm mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {course.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 bg-slate-100 rounded-md text-xs text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">{course.title}</h1>
              <p className="text-slate-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
              <img src={course.instructorAvatar} alt={course.instructorName} className="w-12 h-12 rounded-full bg-slate-100" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">{course.instructorName}</p>
                <p className="text-xs text-slate-400">Course Instructor</p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-sm text-fuchsia-500">
                <Star className="w-4 h-4 fill-fuchsia-500" /> {course.rating}
              </div>
            </div>

            {/* Learning Objectives */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-white/80 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content (Modules & Lessons) */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Course Content</h2>
              <p className="text-sm text-slate-400 mb-4">
                {course.modules.length} modules · {totalLessons} lessons · {Math.round(totalMinutes / 60)}h total
              </p>

              <div className="space-y-2">
                {course.modules.map((mod) => {
                  const isExpanded = expandedModule === mod.id;
                  const modLessons = mod.lessons.length;
                  const modMinutes = mod.lessons.reduce((a, l) => a + l.durationMinutes, 0);

                  return (
                    <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-100/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-8 h-8 rounded-lg bg-fuchsia-50 flex items-center justify-center shrink-0">
                            <span className="text-fuchsia-500 text-xs font-bold">{mod.order}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 text-sm">{mod.title}</h3>
                            <p className="text-xs text-slate-400">{modLessons} lessons · {modMinutes} min</p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-slate-200"
                        >
                          {mod.lessons.map((lesson) => {
                            const Icon = LESSON_TYPE_ICONS[lesson.type] || FileText;
                            const colorClass = LESSON_TYPE_COLORS[lesson.type] || "text-slate-500 bg-neutral-500/10";

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => navigateToLesson(course.id, lesson.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100/30 transition-colors border-b border-slate-200/50 last:border-0 group"
                              >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <p className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors truncate">
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-slate-400 capitalize">{lesson.type} · {lesson.durationMinutes} min</p>
                                </div>
                                {lesson.isPreview ? (
                                  <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <Lock className="w-4 h-4 text-neutral-700 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Prerequisites</h2>
                <div className="space-y-2">
                  {course.prerequisites.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden sticky top-4">
              <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-6">
                <div className="text-2xl font-bold text-slate-900 mb-1">GH₵ {course.priceGHS.toLocaleString()}</div>
                <p className="text-xs text-slate-400 mb-6">One-time payment</p>

                <button
                  onClick={() => setView("learner-dashboard")}
                  className="w-full py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <Play className="w-5 h-5" /> Enroll Now
                </button>
                <button className="w-full py-3 bg-slate-100 hover:bg-neutral-700 text-slate-900 font-semibold rounded-xl transition-colors">
                  Try Free Lessons
                </button>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Duration</span>
                    <span className="text-slate-900">{course.durationHours}h</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Modules</span>
                    <span className="text-slate-900">{course.modules.length}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Lessons</span>
                    <span className="text-slate-900">{course.totalLessons}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Enrolled</span>
                    <span className="text-slate-900">{course.enrolledCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Level</span>
                    <span className="text-slate-900 capitalize">{course.level}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
