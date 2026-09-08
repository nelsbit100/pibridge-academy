// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Public Professional Passport
// Shareable URL for employers to view verified skills & certificates
// ──────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  Shield, Star, Award, Briefcase, ExternalLink, CheckCircle,
  GraduationCap, Code, Calendar, MapPin, QrCode, Globe, Lock,
} from "lucide-react";

// ── Types ──
export interface PassportData {
  learnerId: string;
  name: string;
  title: string;
  location: string;
  bio: string;
  profileUrl: string;
  joinDate: string;
  totalHoursLearned: number;
  skills: PassportSkill[];
  certificates: PassportCertificate[];
  projects: PassportProject[];
  competencySummary: {
    totalSkills: number;
    competent: number;
    proficient: number;
    advanced: number;
    expert: number;
  };
  careerPath: string;
  currentTier: string;
  verified: boolean;
  verificationCode: string;
}

export interface PassportSkill {
  name: string;
  level: string;
  verified: boolean;
  endorsements: number;
}

export interface PassportCertificate {
  id: string;
  name: string;
  issuedDate: string;
  credentialId: string;
  skills: string[];
  tier: string;
}

export interface PassportProject {
  title: string;
  description: string;
  skills: string[];
  score: number;
  date: string;
}

// ── Sample Passport Data ──
export const SAMPLE_PASSPORT: PassportData = {
  learnerId: "plr-001",
  name: "Kofi Mensah",
  title: "SOC Analyst Graduate",
  location: "Accra, Ghana",
  bio: "Cybersecurity professional with verified skills in SIEM operations, incident response, and threat detection. Graduate of the PiBridge Academy Cybersecurity Foundations → SOC Analyst career path.",
  profileUrl: "https://pibridge.academy/passport/plr-001",
  joinDate: "2026-01-15",
  totalHoursLearned: 480,
  skills: [
    { name: "SIEM (Splunk)", level: "Proficient", verified: true, endorsements: 5 },
    { name: "Networking", level: "Competent", verified: true, endorsements: 3 },
    { name: "Linux Administration", level: "Competent", verified: true, endorsements: 4 },
    { name: "Incident Response", level: "Developing", verified: true, endorsements: 2 },
    { name: "Threat Detection", level: "Developing", verified: true, endorsements: 3 },
    { name: "Python", level: "Introduced", verified: false, endorsements: 1 },
  ],
  certificates: [
    {
      id: "cert-001", name: "Cybersecurity Foundations Certificate",
      issuedDate: "2026-03-15", credentialId: "PB-CYB-FND-2026-001",
      skills: ["Networking", "Linux", "Security Fundamentals"], tier: "Foundation",
    },
    {
      id: "cert-002", name: "SOC Analyst Professional Certificate",
      issuedDate: "2026-06-20", credentialId: "PB-CYB-SOC-2026-042",
      skills: ["SIEM", "Incident Response", "Threat Detection", "Security Operations"], tier: "Professional",
    },
  ],
  projects: [
    {
      title: "SOC Incident Investigation Capstone",
      description: "Complete investigation of a simulated ransomware attack on a financial institution, including timeline reconstruction, IOC analysis, and containment recommendations.",
      skills: ["SIEM", "Incident Response", "Threat Detection"], score: 92, date: "2026-06-10",
    },
    {
      title: "Detection Rule Set",
      description: "Built 30+ detection rules mapped to MITRE ATT&CK with Sigma format, false positive documentation, and Atomic Red Team testing results.",
      skills: ["SIEM", "Threat Detection", "Python"], score: 88, date: "2026-05-22",
    },
    {
      title: "Network Security Lab",
      description: "Designed and implemented a segmented enterprise network with firewall rules, IDS/IPS, and monitoring.",
      skills: ["Networking", "Linux", "Security Fundamentals"], score: 85, date: "2026-02-28",
    },
  ],
  competencySummary: {
    totalSkills: 6, competent: 2, proficient: 2, advanced: 0, expert: 0,
  },
  careerPath: "Cybersecurity",
  currentTier: "Professional",
  verified: true,
  verificationCode: "PB-VERIFY-2026-KM-8847",
};

// ── Level Badge ──
function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    "Introduced": "bg-gray-500/20 text-gray-400",
    "Developing": "bg-amber-500/20 text-amber-400",
    "Competent": "bg-blue-500/20 text-blue-400",
    "Proficient": "bg-green-500/20 text-green-400",
    "Advanced": "bg-purple-500/20 text-purple-400",
    "Expert": "bg-red-500/20 text-red-400",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[level] || colors["Introduced"]}`}>
      {level}
    </span>
  );
}

// ── Main Component ──
export function PublicPassport({ passportData, onBack }: { passportData?: PassportData; onBack?: () => void }) {
  const data = passportData || SAMPLE_PASSPORT;

  const levelColors = {
    Competent: "bg-blue-500",
    Proficient: "bg-green-500",
    Advanced: "bg-purple-500",
    Expert: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Header Bar */}
      <div className="border-b border-white/10 px-6 py-3 flex items-center justify-between bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <Shield className="w-5 h-5 text-neutral-950" />
          </div>
          <span className="font-bold text-sm">PiBridge Professional Passport</span>
        </div>
        {onBack && (
          <button onClick={onBack} className="text-sm text-gray-400 hover:text-white transition">
            ← Back
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Passport Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-600/20 via-slate-800/50 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            {/* Verification Badge */}
            {data.verified && (
              <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium w-fit mb-4">
                <CheckCircle className="w-3 h-3" /> Verified Professional
              </div>
            )}

            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 bg-indigo-500/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-indigo-400 flex-shrink-0">
                {data.name.split(" ").map((n) => n[0]).join("")}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{data.name}</h1>
                <p className="text-indigo-300 text-lg mb-2">{data.title}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined {new Date(data.joinDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                  <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {data.careerPath} — {data.currentTier}</span>
                </div>
                <p className="text-gray-400 text-sm mt-3 max-w-2xl">{data.bio}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              {[
                { label: "Hours Learned", value: `${data.totalHoursLearned}+`, icon: <Briefcase className="w-4 h-4" /> },
                { label: "Skills Verified", value: data.skills.filter((s) => s.verified).length, icon: <Shield className="w-4 h-4" /> },
                { label: "Certificates", value: data.certificates.length, icon: <Award className="w-4 h-4" /> },
                { label: "Projects", value: data.projects.length, icon: <Code className="w-4 h-4" /> },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-indigo-400 flex justify-center mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Competency Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" /> Competency Summary
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: "Total Skills", value: data.competencySummary.totalSkills, color: "bg-white/20" },
              { label: "Competent", value: data.competencySummary.competent, color: "bg-blue-500" },
              { label: "Proficient", value: data.competencySummary.proficient, color: "bg-green-500" },
              { label: "Advanced", value: data.competencySummary.advanced, color: "bg-purple-500" },
              { label: "Expert", value: data.competencySummary.expert, color: "bg-red-500" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 bg-white/5 rounded-lg">
                <div className={`w-8 h-8 ${s.color} rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold`}>
                  {s.value}
                </div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Verified Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" /> Verified Skills
          </h2>
          <div className="space-y-3">
            {data.skills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{skill.name}</span>
                  <LevelBadge level={skill.level} />
                  {skill.verified && <CheckCircle className="w-3.5 h-3.5 text-green-400" />}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span>{skill.endorsements} endorsements</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Certificates
          </h2>
          <div className="space-y-4">
            {data.certificates.map((cert) => (
              <div key={cert.id} className="p-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <span className="text-xs text-gray-500">{cert.tier} Tier</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(cert.issuedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="font-mono text-xs bg-white/5 px-2 py-0.5 rounded">{cert.credentialId}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {cert.skills.map((s) => (
                    <span key={s} className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-400" /> Portfolio Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{proj.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-sm font-medium">{proj.score}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">{proj.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {proj.skills.map((s) => (
                      <span key={s} className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{new Date(proj.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Verification Footer */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="font-semibold">PiBridge Verified Professional</span>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            This passport is verified by PiBridge Academy. All skills, certificates, and projects have been assessed through competency-based evaluation.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Tamper-proof</span>
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {data.verificationCode}</span>
            <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Verify at pibridge.academy/verify</span>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
            <QrCode className="w-10 h-10 text-gray-400" />
            <div className="text-left text-xs text-gray-500">
              <div>Scan to verify</div>
              <div className="font-mono">{data.verificationCode}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// We need to import BarChart3
import { BarChart3 } from "lucide-react";
