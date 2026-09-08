// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Instructor Portal
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAcademy } from "../AcademyContext";
import { COURSES, INSTRUCTORS } from "../data";
import {
  Users, BookOpen, BarChart3, Clock, FileText, Star, TrendingUp,
  ChevronRight, AlertCircle, CheckCircle, Eye,
} from "lucide-react";
import { motion } from "motion/react";

const MOCK_STUDENTS = [
  { name: "Kofi Mensah", course: "Networking Fundamentals", progress: 100, score: 91, status: "completed" },
  { name: "Adjoa Poku", course: "Networking Fundamentals", progress: 88, score: 85, status: "active" },
  { name: "Kwesi Appiah", course: "Networking Fundamentals", progress: 72, score: 78, status: "active" },
  { name: "Abena Osei", course: "Networking Fundamentals", progress: 45, score: 0, status: "active" },
  { name: "Yaw Boateng", course: "Networking Fundamentals", progress: 30, score: 0, status: "active" },
  { name: "Efua Mensah", course: "Networking Fundamentals", progress: 15, score: 0, status: "active" },
];

const MOCK_GRADING_QUEUE = [
  { student: "Adjoa Poku", type: "Assignment", title: "Subnetting Practice", submitted: "2 hours ago", course: "Networking Fundamentals" },
  { student: "Kwesi Appiah", type: "Quiz", title: "OSI Model Quiz", submitted: "5 hours ago", course: "Networking Fundamentals" },
  { student: "Kofi Mensah", type: "Project", title: "Network Security Capstone", submitted: "1 day ago", course: "Networking Fundamentals" },
  { student: "Abena Osei", type: "Assignment", title: "TCP/IP Analysis", submitted: "2 days ago", course: "Networking Fundamentals" },
];

export function InstructorDashboard() {
  const { setView } = useAcademy();
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "grading">("overview");

  // Use first instructor as demo
  const instructor = INSTRUCTORS[0];
  const instructorCourses = COURSES.filter((c) => instructor.courseIds.includes(c.id));

  const stats = [
    { label: "Total Students", value: instructor.studentCount, icon: Users, color: "text-blue-400 bg-blue-500/10" },
    { label: "Courses", value: instructorCourses.length, icon: BookOpen, color: "text-fuchsia-500 bg-fuchsia-50" },
    { label: "Avg Rating", value: instructor.rating.toFixed(1), icon: Star, color: "text-emerald-400 bg-emerald-500/10" },
    { label: "Pending Reviews", value: MOCK_GRADING_QUEUE.length, icon: FileText, color: "text-orange-400 bg-orange-500/10" },
  ];

  return (
    <div className="min-h-screen bg-aliceblue">
      {/* Header */}
      <div className="bg-aliceblue/80 border-b border-slate-200 px-4 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={instructor.avatar} alt={instructor.name} className="w-10 h-10 rounded-full bg-slate-100" />
            <div>
              <h1 className="text-lg font-bold text-slate-900">Instructor Portal</h1>
              <p className="text-xs text-slate-400">{instructor.name} · {instructor.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-xl p-4"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 mb-8 w-fit">
          {[
            { key: "overview", label: "Overview" },
            { key: "students", label: "Students" },
            { key: "grading", label: `Grading (${MOCK_GRADING_QUEUE.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-fuchsia-50 text-fuchsia-500"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* My Courses */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">My Courses</h2>
              <div className="space-y-3">
                {instructorCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                  >
                    <img src={course.thumbnail} alt={course.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 text-sm truncate">{course.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span>{course.enrolledCount} students</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-fuchsia-500" /> {course.rating}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Grading Queue */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Grading Queue</h2>
              <div className="space-y-3">
                {MOCK_GRADING_QUEUE.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.student} · {item.type} · {item.submitted}</p>
                    </div>
                    <button className="px-3 py-1.5 bg-fuchsia-50 text-fuchsia-500 rounded-lg text-xs font-semibold hover:bg-amber-500/20 transition-colors">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Performance */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Student Performance Overview</h2>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Student</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Progress</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Score</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_STUDENTS.map((student, i) => (
                        <tr key={i} className="border-b border-slate-200/50 hover:bg-slate-100/20">
                          <td className="px-4 py-3">
                            <span className="text-slate-900 font-medium">{student.name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${student.progress === 100 ? "bg-emerald-500" : "bg-amber-500"}`}
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-500">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{student.score || "—"}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                              student.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-blue-500/10 text-blue-400"
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-fuchsia-500 hover:text-amber-300 text-xs font-medium">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">All Students ({MOCK_STUDENTS.length})</h2>
              <input
                type="text"
                placeholder="Search students..."
                className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 w-48"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Course</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Progress</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Score</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_STUDENTS.map((student, i) => (
                    <tr key={i} className="border-b border-slate-200/50 hover:bg-slate-100/20">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                            {student.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-slate-900 font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{student.course}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${student.progress === 100 ? "bg-emerald-500" : "bg-amber-500"}`}
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{student.score || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                          student.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Grading Tab */}
        {activeTab === "grading" && (
          <div className="space-y-4">
            {MOCK_GRADING_QUEUE.map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{item.student} · {item.course}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-xs font-semibold">
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Submitted {item.submitted}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium hover:bg-neutral-700 transition-colors flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button className="px-3 py-1.5 bg-fuchsia-50 text-fuchsia-500 rounded-lg text-xs font-semibold hover:bg-amber-500/20 transition-colors">
                      Grade
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
