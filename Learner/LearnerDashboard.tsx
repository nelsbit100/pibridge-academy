// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Learner Dashboard
// ──────────────────────────────────────────────────────────────

import { useAcademy } from "../AcademyContext";
import { COURSES, CERTIFICATES } from "../data";
import {
  BookOpen, Clock, Award, Flame, TrendingUp, Play, ChevronRight,
  BarChart3, CheckCircle, Calendar, HelpCircle, PartyPopper,
} from "lucide-react";
import { motion } from "motion/react";

export function LearnerDashboard() {
  const { learner, enrollments, progress, navigateToCourse, setView, certificates } = useAcademy();

  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const completedEnrollments = enrollments.filter((e) => e.status === "completed");

  // Real progress derived from the mutable progress state
  const completedLessonCount = Object.values(progress).reduce(
    (a, p) => a + p.completedLessons.length, 0
  );
  const totalMinutes = Object.values(progress).reduce((a, p) => a + p.totalTimeSpent, 0);
  const hoursLearned = Math.round((totalMinutes / 60) * 10) / 10;
  const quizEntries = Object.values(progress).flatMap((p) => Object.values(p.quizScores));
  const avgQuizScore =
    quizEntries.length > 0
      ? Math.round(quizEntries.reduce((a, s) => a + s, 0) / quizEntries.length)
      : null;

  // Recently completed quiz lessons (best score per lesson id)
  const recentQuizResults = Object.values(progress)
    .flatMap((p) => Object.entries(p.quizScores).map(([lessonId, score]) => ({ lessonId, score })))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const quizLessonTitle = (lessonId: string) => {
    for (const course of COURSES) {
      for (const mod of course.modules) {
        const l = mod.lessons.find((x) => x.id === lessonId);
        if (l) return { title: l.title, course: course.title };
      }
    }
    return { title: lessonId, course: "" };
  };

  const stats = [
    { label: "Active Courses", value: activeEnrollments.length, icon: BookOpen, color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-200" },
    { label: "Lessons Done", value: completedLessonCount, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
    { label: avgQuizScore !== null ? "Avg Quiz Score" : "Hours Learned", value: avgQuizScore !== null ? `${avgQuizScore}%` : hoursLearned, icon: avgQuizScore !== null ? HelpCircle : Clock, color: "text-cyan-500", bg: "bg-cyan-50", border: "border-cyan-200" },
    { label: "Certificates", value: certificates.length, icon: Award, color: "text-fuchsia-500", bg: "bg-fuchsia-50", border: "border-fuchsia-200" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <div className="bg-aliceblue border-b border-slate-200 px-4 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={learner.avatar} alt={learner.name} className="w-10 h-10 rounded-full bg-slate-100" />
            <div>
              <h1 className="text-lg font-bold text-slate-900">Welcome back, {learner.name.split(" ")[0]}</h1>
              <p className="text-xs text-slate-400">Continue where you left off</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-500">{learner.streak}</span>
              <span className="text-xs text-orange-400 hidden sm:inline">day streak</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="bento-grid mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`card-glass p-5 ${stat.border} group hover:shadow-elevated-lg transition-all duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course completion banner */}
            {(() => {
              const justCompleted = COURSES.filter((course) => {
                const all = course.modules.flatMap((m) => m.lessons);
                const done = progress[course.id]?.completedLessons ?? [];
                return all.length > 0 && all.every((l) => done.includes(l.id));
              });
              if (justCompleted.length === 0) return null;
              const course = justCompleted[0];
              const cert = certificates.find((c) => c.courseId === course.id);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-4"
                  data-testid="course-complete-banner"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <PartyPopper className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900">Course complete — {course.title}!</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {cert
                        ? `Certificate issued · ${cert.credentialId}`
                        : "Issuing your certificate…"}
                    </p>
                  </div>
                  <button
                    onClick={() => setView("certificates")}
                    className="shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-sm transition-colors"
                  >
                    View Certificate
                  </button>
                </motion.div>
              );
            })()}

            {/* Quiz Results */}
            {recentQuizResults.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Quiz Results</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {recentQuizResults.map((r) => {
                    const info = quizLessonTitle(r.lessonId);
                    const passed = r.score >= 70;
                    return (
                      <div
                        key={r.lessonId}
                        className="p-4 bg-aliceblue border border-slate-200 rounded-xl flex items-center gap-3"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          passed ? "bg-emerald-50" : "bg-amber-50"
                        }`}>
                          <span className={`text-sm font-bold ${passed ? "text-emerald-500" : "text-amber-500"}`}>
                            {r.score}%
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{info.title}</p>
                          <p className="text-xs text-slate-400 truncate">{info.course} · best score</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Continue Learning */}
            {activeEnrollments.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Continue Learning</h2>
                <div className="space-y-3">
                  {activeEnrollments.map((enrollment) => {
                    const course = COURSES.find((c) => c.id === enrollment.courseId);
                    if (!course) return null;
                    const prog = progress[course.id];
                    const completedLessons = prog?.completedLessons?.length || 0;
                    const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);

                    return (
                      <motion.div
                        key={enrollment.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigateToCourse(course.id)}
                        className="flex items-center gap-4 p-4 bg-aliceblue border border-slate-200 rounded-xl cursor-pointer hover:border-fuchsia-300 transition-colors group shadow-sm"
                      >
                        <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 text-sm group-hover:text-fuchsia-500 transition-colors truncate">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">{course.instructorName}</p>

                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full transition-all"
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 shrink-0">
                              {completedLessons}/{totalLessons} lessons
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-5 h-5" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Completed */}
            {completedEnrollments.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Completed</h2>
                <div className="space-y-3">
                  {completedEnrollments.map((enrollment) => {
                    const course = COURSES.find((c) => c.id === enrollment.courseId);
                    if (!course) return null;

                    return (
                      <div
                        key={enrollment.id}
                        className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/60 rounded-xl"
                      >
                        <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-lg object-cover shrink-0 opacity-80" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-700 text-sm truncate">{course.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Completed {enrollment.completedAt ? new Date(enrollment.completedAt).toLocaleDateString() : "—"}
                          </p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeEnrollments.length === 0 && completedEnrollments.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No courses yet</h3>
                <p className="text-sm text-slate-500 mb-6">Browse our programmes and start learning today.</p>
                <button
                  onClick={() => setView("programmes")}
                  className="px-6 py-2.5 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold rounded-xl transition-colors"
                >
                  Browse Programmes
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Weekly Goal */}
            <div className="card-glass p-5">
              <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-fuchsia-500" /> Weekly Goal
              </h3>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <defs>
                      <linearGradient id="fuchsia-cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D946EF" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                    <circle
                      cx="40" cy="40" r="35" fill="none" stroke="url(#fuchsia-cyan-gradient)" strokeWidth="6"
                      strokeDasharray={`${(5 / 7) * 220} 220`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-slate-900">5<span className="text-xs text-slate-400">/7</span></span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">5 of 7 days this week</p>
              </div>
            </div>

            {/* Certificates */}
            <div className="card-glass p-5">
              <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-fuchsia-500" /> Recent Certificates
              </h3>
              {certificates.length > 0 ? (
                <div className="space-y-3">
                  {certificates.slice(-3).reverse().map((cert) => (
                    <button
                      key={cert.id}
                      onClick={() => setView("certificates")}
                      className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-100 transition-colors"
                    >
                      <p className="text-sm font-medium text-slate-900">{cert.courseName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Score: {cert.score}% · {new Date(cert.issuedAt).toLocaleDateString()}</p>
                      <p className="text-xs text-fuchsia-500 mt-1 font-mono">{cert.credentialId}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Complete courses to earn certificates.</p>
              )}
            </div>

            {/* Skills Progress */}
            <div className="card-glass p-5">
              <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-500" /> Skills Progress
              </h3>
              <div className="space-y-3">
                {[
                  { skill: "Networking", level: 82, color: "bg-violet-500" },
                  { skill: "Linux", level: 42, color: "bg-emerald-500" },
                  { skill: "Security", level: 15, color: "bg-rose-500" },
                  { skill: "Python", level: 10, color: "bg-fuchsia-500" },
                ].map((s) => (
                  <div key={s.skill}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{s.skill}</span>
                      <span className="text-slate-400">{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
