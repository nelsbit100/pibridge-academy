// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Admin Portal
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAcademy } from "../AcademyContext";
import { PROGRAMMES, COURSES, INSTRUCTORS } from "../data";
import {
  Users, BookOpen, GraduationCap, TrendingUp, DollarSign, BarChart3,
  ChevronRight, Search, Download, Eye, Edit, Plus, AlertTriangle,
  CheckCircle, Clock, Star, Award,
} from "lucide-react";
import { motion } from "motion/react";

const MOCK_ADMIN_STATS = {
  totalLearners: 742,
  activeLearners: 523,
  totalCourses: 12,
  totalEnrollments: 1847,
  completionRate: 87,
  avgScore: 82,
  revenueGHS: 245600,
  newSignupsThisMonth: 89,
};

const MOCK_REVENUE = [
  { month: "Jun", revenue: 32000 },
  { month: "Jul", revenue: 48000 },
  { month: "Aug", revenue: 67000 },
  { month: "Sep", revenue: 98600 },
];

const MOCK_USERS = [
  { name: "Kofi Mensah", email: "kofi@example.com", role: "Learner", joined: "Jul 1, 2026", courses: 2, status: "Active" },
  { name: "Adjoa Poku", email: "adjoa@example.com", role: "Learner", joined: "Jul 15, 2026", courses: 3, status: "Active" },
  { name: "Kwesi Appiah", email: "kwesi@example.com", role: "Learner", joined: "Aug 1, 2026", courses: 1, status: "Active" },
  { name: "Kwame Asante", email: "kwame@pibridge.com", role: "Instructor", joined: "May 1, 2026", courses: 3, status: "Active" },
  { name: "Ama Darko", email: "ama@pibridge.com", role: "Instructor", joined: "May 15, 2026", courses: 1, status: "Active" },
  { name: "Nana Yaw Boateng", email: "nana@pibridge.com", role: "Instructor", joined: "May 1, 2026", courses: 4, status: "Active" },
  { name: "Efua Mensah", email: "efua@pibridge.com", role: "Instructor", joined: "May 1, 2026", courses: 4, status: "Active" },
  { name: "Abena Osei", email: "abena@example.com", role: "Learner", joined: "Aug 10, 2026", courses: 1, status: "Active" },
];

export function AdminDashboard() {
  const { setView } = useAcademy();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "courses" | "reports">("overview");

  const stats = [
    { label: "Total Learners", value: MOCK_ADMIN_STATS.totalLearners.toLocaleString(), icon: Users, color: "text-blue-400 bg-blue-500/10", change: "+12%" },
    { label: "Active Learners", value: MOCK_ADMIN_STATS.activeLearners.toLocaleString(), icon: TrendingUp, color: "text-emerald-400 bg-emerald-500/10", change: "+8%" },
    { label: "Total Courses", value: MOCK_ADMIN_STATS.totalCourses, icon: BookOpen, color: "text-fuchsia-500 bg-fuchsia-50", change: "+2" },
    { label: "Revenue", value: `GH₵ ${(MOCK_ADMIN_STATS.revenueGHS / 1000).toFixed(0)}k`, icon: DollarSign, color: "text-purple-400 bg-purple-500/10", change: "+34%" },
  ];

  return (
    <div className="min-h-screen bg-aliceblue">
      {/* Header */}
      <div className="bg-aliceblue/80 border-b border-slate-200 px-4 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">PiBridge Academy Platform Management</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> All Systems Operational
            </span>
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
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 mb-8 w-fit overflow-x-auto">
          {[
            { key: "overview", label: "Overview" },
            { key: "users", label: "Users" },
            { key: "courses", label: "Courses" },
            { key: "reports", label: "Reports" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
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
            {/* Revenue Chart */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Revenue Trend</h3>
              <div className="flex items-end gap-3 h-40">
                {MOCK_REVENUE.map((r, i) => {
                  const maxRev = Math.max(...MOCK_REVENUE.map((x) => x.revenue));
                  const height = (r.revenue / maxRev) * 100;
                  return (
                    <div key={r.month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-slate-500">GH₵ {(r.revenue / 1000).toFixed(0)}k</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        className="w-full bg-amber-500/30 rounded-t-lg"
                      />
                      <span className="text-xs text-slate-400">{r.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Key Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: "Completion Rate", value: MOCK_ADMIN_STATS.completionRate, max: 100, color: "bg-emerald-500" },
                  { label: "Avg Assessment Score", value: MOCK_ADMIN_STATS.avgScore, max: 100, color: "bg-blue-500" },
                  { label: "New Signups (Sep)", value: MOCK_ADMIN_STATS.newSignupsThisMonth, max: 100, color: "bg-amber-500" },
                  { label: "Total Enrollments", value: MOCK_ADMIN_STATS.totalEnrollments, max: 2000, color: "bg-purple-500" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-500">{m.label}</span>
                      <span className="text-slate-900 font-medium">{m.value}{m.max === 100 ? "%" : ""}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${m.color}`}
                        style={{ width: `${Math.min((m.value / m.max) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programme Performance */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Programme Performance</h3>
              <div className="space-y-3">
                {PROGRAMMES.map((prog) => (
                  <div key={prog.id} className="flex items-center gap-3 p-3 bg-slate-100/30 rounded-lg">
                    <span className="text-xl">{prog.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{prog.title}</p>
                      <p className="text-xs text-slate-400">{prog.enrolledCount} enrolled · {prog.rating}★</p>
                    </div>
                    <span className="text-sm font-bold text-slate-900">GH₵ {((prog.enrolledCount * prog.priceGHS) / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "New enrollment", detail: "Abena Osei enrolled in Networking Fundamentals", time: "2 hours ago", icon: GraduationCap, color: "text-blue-400" },
                  { action: "Course completed", detail: "Kofi Mensah completed Networking Fundamentals", time: "5 hours ago", icon: CheckCircle, color: "text-emerald-400" },
                  { action: "Certificate issued", detail: "PIBR-CERT-2026-NF-001 → Kofi Mensah", time: "5 hours ago", icon: Award, color: "text-fuchsia-500" },
                  { action: "New signup", detail: "Yaw Boateng registered as a learner", time: "1 day ago", icon: Users, color: "text-purple-400" },
                  { action: "Quiz completed", detail: "Kwesi Appiah scored 85% on OSI Model Quiz", time: "1 day ago", icon: BarChart3, color: "text-cyan-400" },
                ].map((activity, i) => {
                  const Icon = activity.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${activity.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">{activity.detail}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-semibold text-slate-900">All Users ({MOCK_USERS.length})</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-9 pr-3 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 w-48"
                  />
                </div>
                <button className="px-3 py-1.5 bg-fuchsia-50 text-fuchsia-500 rounded-lg text-xs font-semibold hover:bg-amber-500/20 transition-colors flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Joined</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Courses</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((user, i) => (
                    <tr key={i} className="border-b border-slate-200/50 hover:bg-slate-100/20">
                      <td className="px-4 py-3">
                        <div>
                          <span className="text-slate-900 font-medium">{user.name}</span>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                          user.role === "Instructor" ? "bg-fuchsia-50 text-fuchsia-500" : "bg-blue-500/10 text-blue-400"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{user.joined}</td>
                      <td className="px-4 py-3 text-slate-600">{user.courses}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                            <Edit className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">All Courses ({COURSES.length})</h2>
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-sm transition-colors flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add Course
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COURSES.map((course) => {
                const programme = PROGRAMMES.find((p) => p.id === course.programmeId);
                return (
                  <div key={course.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{programme?.icon}</span>
                        <span className="text-xs text-slate-400">{programme?.title}</span>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm mb-2">{course.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{course.enrolledCount} enrolled</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-fuchsia-500" /> {course.rating}
                        </span>
                        <span>GH₵ {course.priceGHS}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Learner Analytics", desc: "Enrollment trends, completion rates, and engagement metrics", icon: Users },
              { title: "Revenue Report", desc: "Revenue by programme, payment methods, and refunds", icon: DollarSign },
              { title: "Assessment Results", desc: "Average scores, pass rates, and performance by cohort", icon: BarChart3 },
              { title: "Employment Outcomes", desc: "Graduate employment rates, internships, and career progression", icon: TrendingUp },
            ].map((report, i) => {
              const Icon = report.icon;
              return (
                <motion.div
                  key={report.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-fuchsia-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-fuchsia-500" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-fuchsia-500 transition-colors">{report.title}</h3>
                  <p className="text-sm text-slate-500">{report.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-fuchsia-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Report <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


