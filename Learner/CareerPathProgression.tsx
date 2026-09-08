// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Career Path Progression View
// Shows Foundation → Professional → Expert with progression gates
// ──────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  CheckCircle, Lock, ChevronRight, Clock, BookOpen, Award,
  Presentation, Bot, Star, ArrowRight,
} from "lucide-react";
import { CAREER_PATHS, getCareerPathForDomain, checkGateRequirements, type CareerPath, type CareerTier } from "../careerPaths";

interface CareerPathProgressionProps {
  domain: string;
  completedTierIds: string[];
  stats: {
    coursesCompleted: number;
    averageQuizScore: number;
    projectsCompleted: number;
    hasPresentation: boolean;
    hasInterview: boolean;
    competencyLevel: string;
  };
  onSelectProgramme: (programmeId: string) => void;
  onStartPresentation: (tierId: string) => void;
  onStartInterview: (tierId: string) => void;
  onBack: () => void;
}

export function CareerPathProgression({
  domain, completedTierIds, stats, onSelectProgramme, onStartPresentation, onStartInterview, onBack,
}: CareerPathProgressionProps) {
  const path = getCareerPathForDomain(domain);
  if (!path) return <div className="text-white p-8">No career path found for this domain.</div>;

  const isTierCompleted = (tierId: string) => completedTierIds.includes(tierId);
  const isTierLocked = (tier: CareerTier, index: number) => {
    if (index === 0) return false;
    return !isTierCompleted(path.tiers[index - 1].id);
  };

  const getTierStatus = (tier: CareerTier, index: number): "completed" | "available" | "locked" => {
    if (isTierCompleted(tier.id)) return "completed";
    if (isTierLocked(tier, index)) return "locked";
    return "available";
  };

  const tierColors = {
    completed: { bg: "bg-green-500/20", border: "border-green-500/40", text: "text-green-400", icon: "text-green-400" },
    available: { bg: "bg-indigo-500/20", border: "border-indigo-500/40", text: "text-indigo-400", icon: "text-indigo-400" },
    locked: { bg: "bg-white/5", border: "border-white/10", text: "text-gray-500", icon: "text-gray-600" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="border-b border-white/10 px-6 py-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          ← Back to Dashboard
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Path Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-5xl mb-4 block">{path.icon}</span>
          <h1 className="text-4xl font-bold mb-3">{path.name} Career Path</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{path.description}</p>

          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Career Progress</span>
              <span>{completedTierIds.length}/{path.tiers.length} tiers completed</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedTierIds.length / path.tiers.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Tier Timeline */}
        <div className="space-y-6">
          {path.tiers.map((tier, index) => {
            const status = getTierStatus(tier, index);
            const colors = tierColors[status];
            const gate = checkGateRequirements(tier.gateRequirements, stats);

            return (
              <motion.div key={tier.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}>
                {/* Connector Line */}
                {index > 0 && (
                  <div className="flex justify-center py-2">
                    <div className={`w-0.5 h-8 ${status === "locked" ? "bg-white/10" : "bg-indigo-500/50"}`} />
                  </div>
                )}

                {/* Tier Card */}
                <div className={`rounded-2xl border-2 p-6 transition-all ${
                  status === "completed" ? "bg-green-500/5 border-green-500/30" :
                  status === "available" ? "bg-indigo-500/5 border-indigo-500/30 shadow-lg shadow-indigo-500/10" :
                  "bg-white/5 border-white/10 opacity-60"
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colors.bg}`}>
                        {status === "completed" ? <CheckCircle className={`w-6 h-6 ${colors.icon}`} /> :
                         status === "locked" ? <Lock className="w-6 h-6 text-gray-600" /> :
                         <span className={`text-lg font-bold ${colors.icon}`}>{index + 1}</span>}
                      </div>
                      <div>
                        <div className={`text-xs font-medium uppercase tracking-wider ${colors.text}`}>{tier.name}</div>
                        <h2 className="text-xl font-bold">{tier.programmeTitle}</h2>
                      </div>
                    </div>
                    {status === "completed" && (
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        <CheckCircle className="w-3 h-3" /> Completed
                      </div>
                    )}
                  </div>

                  {/* Tier Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {tier.coursesRequired} courses</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tier.weeksRequired} weeks</span>
                  </div>

                  {/* Gate Requirements */}
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <h3 className="text-sm font-semibold mb-3">Progression Requirements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { icon: <BookOpen className="w-4 h-4" />, label: "Courses", value: `${stats.coursesCompleted}/${tier.gateRequirements.coursesCompleted}`, met: stats.coursesCompleted >= tier.gateRequirements.coursesCompleted },
                        { icon: <Star className="w-4 h-4" />, label: "Quiz Score", value: `${tier.gateRequirements.minimumQuizScore}%+`, met: stats.averageQuizScore >= tier.gateRequirements.minimumQuizScore },
                        { icon: <Award className="w-4 h-4" />, label: "Projects", value: `${stats.projectsCompleted}/${tier.gateRequirements.projectsRequired}`, met: stats.projectsCompleted >= tier.gateRequirements.projectsRequired },
                        { icon: <Presentation className="w-4 h-4" />, label: "Presentation", value: stats.hasPresentation ? "Done" : "Required", met: !tier.gateRequirements.livePresentationRequired || stats.hasPresentation },
                        { icon: <Bot className="w-4 h-4" />, label: "AI Interview", value: stats.hasInterview ? "Done" : "Required", met: !tier.gateRequirements.aiInterviewRequired || stats.hasInterview },
                      ].map((req) => (
                        <div key={req.label} className={`p-2 rounded-lg text-center ${req.met ? "bg-green-500/10 border border-green-500/20" : "bg-white/5 border border-white/10"}`}>
                          <div className={`flex justify-center mb-1 ${req.met ? "text-green-400" : "text-gray-500"}`}>{req.icon}</div>
                          <div className="text-xs text-gray-500">{req.label}</div>
                          <div className={`text-sm font-medium ${req.met ? "text-green-400" : "text-gray-400"}`}>{req.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {status === "available" && (
                    <div className="flex gap-3 flex-wrap">
                      <button onClick={() => onSelectProgramme(tier.programmeId)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                        {gate.passed ? "Enrol & Start" : "View Programme"} <ChevronRight className="w-4 h-4" />
                      </button>
                      {tier.gateRequirements.livePresentationRequired && !stats.hasPresentation && (
                        <button onClick={() => onStartPresentation(tier.id)}
                          className="border border-amber-500/30 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                          <Presentation className="w-4 h-4" /> Live Presentation
                        </button>
                      )}
                      {tier.gateRequirements.aiInterviewRequired && !stats.hasInterview && (
                        <button onClick={() => onStartInterview(tier.id)}
                          className="border border-purple-500/30 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                          <Bot className="w-4 h-4" /> AI Interview
                        </button>
                      )}
                    </div>
                  )}

                  {status === "locked" && (
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Complete the previous tier to unlock this programme
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Career Path Summary */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Your Journey: {path.name}</h2>
          <div className="flex items-center gap-3 flex-wrap">
            {path.tiers.map((tier, i) => {
              const status = getTierStatus(tier, i);
              return (
                <div key={tier.id} className="flex items-center gap-3">
                  <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isTierCompleted(tier.id) ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                    "bg-white/5 text-gray-400 border border-white/10"
                  }`}>
                    {isTierCompleted(tier.id) && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {tier.name}: {tier.programmeTitle}
                  </div>
                  {i < path.tiers.length - 1 && <ArrowRight className="w-4 h-4 text-gray-600" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
