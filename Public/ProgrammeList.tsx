// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Programme Listing & Detail
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAcademy } from "../AcademyContext";
import { PROGRAMMES, COURSES, INSTRUCTORS } from "../data";
import type { Programme } from "../types";
import {
  ArrowLeft, Clock, BookOpen, Star, Users, ChevronRight,
  Shield, Code, Cloud, CheckCircle, Play, GraduationCap,
} from "lucide-react";
import { motion } from "motion/react";

const DOMAIN_FILTERS = [
  { key: "all", label: "All Programmes", icon: GraduationCap },
  { key: "cybersecurity", label: "Cybersecurity", icon: Shield },
  { key: "software_engineering", label: "Software Engineering", icon: Code },
  { key: "cloud_infrastructure", label: "Cloud & Infrastructure", icon: Cloud },
] as const;

const LEVEL_LABELS: Record<string, string> = {
  foundation: "Foundation",
  associate: "Associate",
  professional: "Professional",
  advanced: "Advanced",
  expert: "Expert",
};

export function ProgrammeList() {
  const { navigateToProgramme, goBack, setView } = useAcademy();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? PROGRAMMES : PROGRAMMES.filter((p) => p.domain === filter);

  return (
    <div className="min-h-screen bg-aliceblue">
      {/* Header */}
      <div className="bg-aliceblue/80 border-b border-slate-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button onClick={goBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Programmes</h1>
            <p className="text-sm text-slate-500">Choose your professional path</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {DOMAIN_FILTERS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filter === key
                  ? "bg-fuchsia-50 text-fuchsia-500 border border-fuchsia-200"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Programme Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((programme, i) => (
            <ProgrammeCard
              key={programme.id}
              programme={programme}
              index={i}
              onClick={() => navigateToProgramme(programme.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No programmes found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgrammeCard({
  programme,
  index,
  onClick,
}: {
  programme: Programme;
  index: number;
  onClick: () => void;
}) {
  const courses = COURSES.filter((c) => c.programmeId === programme.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-slate-300 transition-colors"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={programme.image}
          alt={programme.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-semibold text-fuchsia-500 border border-fuchsia-200">
          {LEVEL_LABELS[programme.level]}
        </span>
        <span className="absolute top-3 right-3 text-2xl">{programme.icon}</span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-2">{programme.title}</h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{programme.description}</p>

        <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{programme.durationWeeks} weeks</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{courses.length} courses</span>
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-fuchsia-500" />{programme.rating}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{programme.enrolledCount}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-xl font-bold text-slate-900">GH₵ {programme.priceGHS.toLocaleString()}</span>
          <button
            onClick={onClick}
            className="flex items-center gap-1 px-4 py-2 bg-fuchsia-50 text-fuchsia-500 rounded-lg text-sm font-semibold hover:bg-fuchsia-100 transition-colors"
          >
            Explore <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Programme Detail
// ──────────────────────────────────────────────────────────────

export function ProgrammeDetail() {
  const { selectedProgrammeId, goBack, navigateToCourse } = useAcademy();
  const programme = PROGRAMMES.find((p) => p.id === selectedProgrammeId);

  if (!programme) return null;

  const courses = COURSES.filter((c) => c.programmeId === programme.id);
  const instructor = INSTRUCTORS.find((i) => programme.courses.some((cid) => i.courseIds.includes(cid)));

  return (
    <div className="min-h-screen bg-aliceblue">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={programme.image} alt={programme.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-5xl mx-auto">
            <button onClick={goBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-900 text-sm mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Programmes
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{programme.icon}</span>
              <span className="px-3 py-1 bg-fuchsia-50 border border-fuchsia-200 rounded-lg text-xs font-semibold text-fuchsia-500">
                {LEVEL_LABELS[programme.level]}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{programme.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-slate-600 leading-relaxed">{programme.longDescription}</p>
            </div>

            {/* Outcomes */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">What You'll Achieve</h2>
              <div className="space-y-3">
                {programme.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-slate-600 text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Prerequisites</h2>
              <div className="space-y-2">
                {programme.prerequisites.map((prereq, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    {prereq}
                  </div>
                ))}
              </div>
            </div>

            {/* Course List */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Courses in This Programme</h2>
              <div className="space-y-3">
                {courses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => navigateToCourse(course.id)}
                    className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-fuchsia-200 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-fuchsia-50 flex items-center justify-center shrink-0">
                      <span className="text-fuchsia-500 font-bold text-sm">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 text-sm group-hover:text-fuchsia-500 transition-colors">{course.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{course.durationHours} hours · {course.totalLessons} lessons</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-fuchsia-500 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-4">
              <div className="text-3xl font-bold text-slate-900 mb-1">GH₵ {programme.priceGHS.toLocaleString()}</div>
              <p className="text-xs text-slate-400 mb-6">Full programme · {programme.durationWeeks} weeks</p>

              <button className="w-full py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mb-3">
                <Play className="w-5 h-5" /> Start Programme
              </button>
              <button className="w-full py-3 bg-slate-100 hover:bg-neutral-700 text-slate-900 font-semibold rounded-xl transition-colors">
                Try Free Lessons
              </button>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Duration</span>
                  <span className="text-slate-900">{programme.durationWeeks} weeks</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Total Hours</span>
                  <span className="text-slate-900">{programme.totalHours}h</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Courses</span>
                  <span className="text-slate-900">{courses.length}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Enrolled</span>
                  <span className="text-slate-900">{programme.enrolledCount}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Rating</span>
                  <span className="text-slate-900 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-fuchsia-500 fill-amber-400" />
                    {programme.rating} ({programme.reviewCount})
                  </span>
                </div>
              </div>
            </div>

            {/* Instructor */}
            {instructor && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-slate-500 mb-3">Your Lead Instructor</h3>
                <div className="flex items-center gap-3">
                  <img src={instructor.avatar} alt={instructor.name} className="w-12 h-12 rounded-full bg-slate-100" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{instructor.name}</p>
                    <p className="text-xs text-fuchsia-500">{instructor.title}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{instructor.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
