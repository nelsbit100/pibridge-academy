// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Professional Profile & Passport
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAcademy } from "../AcademyContext";
import { DEMO_LEARNER, CERTIFICATES, PROGRAMMES, COURSES } from "../data";
import {
  ArrowLeft, Award, ExternalLink, Github, Globe, Mail, MapPin,
  Phone, Share2, Download, Shield, Star, BookOpen, Briefcase,
  GraduationCap, Target, ChevronRight, Copy, Check, Code, Server,
  Cloud, Lock, Eye, BarChart3,
} from "lucide-react";

// ── Competency Levels ──
type CompetencyLevel = "introduced" | "developing" | "competent" | "proficient" | "advanced" | "expert";

const COMPETENCY_CONFIG: Record<CompetencyLevel, { label: string; color: string; bg: string; percent: number }> = {
  introduced:  { label: "Introduced", color: "text-slate-500", bg: "bg-neutral-500", percent: 15 },
  developing:  { label: "Developing", color: "text-blue-400", bg: "bg-blue-500", percent: 35 },
  competent:   { label: "Competent", color: "text-fuchsia-500", bg: "bg-amber-500", percent: 60 },
  proficient:  { label: "Proficient", color: "text-emerald-400", bg: "bg-emerald-500", percent: 80 },
  advanced:    { label: "Advanced", color: "text-purple-400", bg: "bg-purple-500", percent: 90 },
  expert:      { label: "Expert", color: "text-red-400", bg: "bg-red-500", percent: 100 },
};

// ── Mock Skills Data ──
interface SkillEntry {
  name: string;
  level: CompetencyLevel;
  domain: string;
  icon: typeof Shield;
  lastAssessed: string;
  assessmentScore: number;
  courses: string[];
}

const SKILLS: SkillEntry[] = [
  { name: "TCP/IP Networking", level: "proficient", domain: "Cybersecurity", icon: Globe, lastAssessed: "2026-08-15", assessmentScore: 91, courses: ["Networking Fundamentals"] },
  { name: "Wireshark Analysis", level: "competent", domain: "Cybersecurity", icon: Eye, lastAssessed: "2026-08-12", assessmentScore: 85, courses: ["Networking Fundamentals"] },
  { name: "Linux Administration", level: "developing", domain: "Cybersecurity", icon: Server, lastAssessed: "2026-08-28", assessmentScore: 62, courses: ["Linux Fundamentals"] },
  { name: "Shell Scripting", level: "introduced", domain: "Cybersecurity", icon: Code, lastAssessed: "2026-08-25", assessmentScore: 45, courses: ["Linux Fundamentals"] },
  { name: "Subnetting", level: "competent", domain: "Networking", icon: BarChart3, lastAssessed: "2026-08-10", assessmentScore: 88, courses: ["Networking Fundamentals"] },
  { name: "Firewall Configuration", level: "developing", domain: "Cybersecurity", icon: Shield, lastAssessed: "2026-08-14", assessmentScore: 70, courses: ["Networking Fundamentals"] },
  { name: "JavaScript", level: "introduced", domain: "Software Engineering", icon: Code, lastAssessed: "2026-07-20", assessmentScore: 40, courses: [] },
  { name: "HTML/CSS", level: "introduced", domain: "Software Engineering", icon: Globe, lastAssessed: "2026-07-15", assessmentScore: 35, courses: [] },
  { name: "Cloud Computing (AWS)", level: "introduced", domain: "Cloud", icon: Cloud, lastAssessed: "2026-07-10", assessmentScore: 25, courses: [] },
  { name: "Security Fundamentals", level: "introduced", domain: "Cybersecurity", icon: Lock, lastAssessed: "2026-07-01", assessmentScore: 30, courses: [] },
];

// ── Mock Portfolio Items ──
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: "project" | "assignment" | "lab" | "certificate";
  date: string;
  score?: number;
  url?: string;
  tags: string[];
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p-1", title: "Small Business Network Design",
    description: "Designed a secure network topology for a 50-person company with VLAN segmentation, firewall rules, and monitoring.",
    type: "project", date: "2026-08-15", score: 95,
    tags: ["networking", "security", "firewall"],
  },
  {
    id: "p-2", title: "Subnetting Calculator Assignment",
    description: "Calculated subnet masks, network addresses, broadcast addresses, and host ranges for various CIDR blocks.",
    type: "assignment", date: "2026-08-10", score: 88,
    tags: ["networking", "subnetting"],
  },
  {
    id: "p-3", title: "Packet Capture Analysis Report",
    description: "Analyzed three packet captures and identified DNS anomalies, credential leaks, and suspicious port activity.",
    type: "lab", date: "2026-08-12", score: 85,
    tags: ["wireshark", "forensics", "analysis"],
  },
  {
    id: "p-4", title: "Linux Permissions Audit",
    description: "Audited a Linux system for SUID binaries, world-writable files, and misconfigured permissions.",
    type: "lab", date: "2026-08-28", score: 72,
    tags: ["linux", "permissions", "security"],
  },
  {
    id: "p-5", title: "Networking Fundamentals Certificate",
    description: "Completed all modules and passed the final assessment with a score of 91%.",
    type: "certificate", date: "2026-08-15", score: 91,
    tags: ["certificate", "networking"],
  },
];

const TYPE_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  project:     { color: "text-fuchsia-500", bg: "bg-fuchsia-50", label: "Project" },
  assignment:  { color: "text-blue-400", bg: "bg-blue-500/10", label: "Assignment" },
  lab:         { color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Lab" },
  certificate: { color: "text-purple-400", bg: "bg-purple-500/10", label: "Certificate" },
};

export function ProfessionalProfile() {
  const { goBack, setView } = useAcademy();
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "portfolio" | "passport">("overview");
  const [copiedCredentialId, setCopiedCredentialId] = useState<string | null>(null);
  const [filterDomain, setFilterDomain] = useState<string>("all");

  const learner = DEMO_LEARNER;

  const domains = [...new Set(SKILLS.map((s) => s.domain))];
  const filteredSkills = filterDomain === "all" ? SKILLS : SKILLS.filter((s) => s.domain === filterDomain);

  const overallScore = Math.round(SKILLS.reduce((a, s) => a + s.assessmentScore, 0) / SKILLS.length);
  const skillByLevel = (level: CompetencyLevel) => SKILLS.filter((s) => s.level === level).length;

  const copyCredential = (id: string) => {
    navigator.clipboard.writeText(`https://pibridge.com/verify/${id}`);
    setCopiedCredentialId(id);
    setTimeout(() => setCopiedCredentialId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-aliceblue">
      {/* Header */}
      <div className="bg-aliceblue/80 border-b border-slate-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button onClick={goBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">Professional Profile</h1>
            <p className="text-xs text-slate-400">Your verified skills, portfolio, and credentials</p>
          </div>
          <button className="px-3 py-1.5 bg-fuchsia-50 text-fuchsia-500 rounded-lg text-xs font-semibold hover:bg-fuchsia-100 transition-colors flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> Share Profile
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <img src={learner.avatar} alt={learner.name} className="w-20 h-20 rounded-2xl bg-slate-100" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-slate-900">{learner.name}</h2>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-semibold">Active</span>
              </div>
              <p className="text-sm text-slate-500 mb-2">{learner.bio}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{learner.location}</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{learner.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{learner.phone}</span>
                <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" />{learner.completedCourses} courses completed</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-3xl font-bold text-slate-900">{overallScore}<span className="text-lg text-slate-400">%</span></div>
              <p className="text-xs text-slate-400">Overall Score</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Skills", value: SKILLS.length, icon: Target, color: "text-blue-400 bg-blue-500/10" },
            { label: "Portfolio Items", value: PORTFOLIO_ITEMS.length, icon: Briefcase, color: "text-fuchsia-500 bg-fuchsia-50" },
            { label: "Certificates", value: CERTIFICATES.length, icon: Award, color: "text-emerald-400 bg-emerald-500/10" },
            { label: "Hours Learned", value: learner.totalHoursLearned, icon: BookOpen, color: "text-purple-400 bg-purple-500/10" },
            { label: "Day Streak", value: learner.streak, icon: Star, color: "text-orange-400 bg-orange-500/10" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 mb-8 w-fit overflow-x-auto">
          {[
            { key: "overview", label: "Overview" },
            { key: "skills", label: "Skills & Competency" },
            { key: "portfolio", label: "Portfolio" },
            { key: "passport", label: "Professional Passport" },
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
            {/* Skill Radar Summary */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Competency Summary</h3>
              <div className="space-y-3">
                {(["expert", "advanced", "proficient", "competent", "developing", "introduced"] as CompetencyLevel[]).map((level) => {
                  const count = skillByLevel(level);
                  const config = COMPETENCY_CONFIG[level];
                  return (
                    <div key={level} className="flex items-center gap-3">
                      <span className={`text-xs w-20 ${config.color}`}>{config.label}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${config.bg}`} style={{ width: `${count > 0 ? (count / SKILLS.length) * 100 : 0}%` }} />
                      </div>
                      <span className="text-xs text-slate-400 w-6 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Recent Portfolio Items</h3>
              <div className="space-y-3">
                {PORTFOLIO_ITEMS.slice(0, 4).map((item) => {
                  const config = TYPE_CONFIG[item.type];
                  return (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-100/30 rounded-lg">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${config.bg} ${config.color} shrink-0`}>
                        {config.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{item.title}</p>
                        <p className="text-xs text-slate-400">{item.date}</p>
                      </div>
                      {item.score && (
                        <span className="text-sm font-bold text-fuchsia-500 shrink-0">{item.score}%</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certificate Highlights */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
              <h3 className="font-semibold text-slate-900 mb-4">Verified Certificates</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {CERTIFICATES.map((cert) => (
                  <div key={cert.id} className="p-4 bg-slate-100/30 border border-slate-300/50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{cert.courseName}</p>
                        <p className="text-xs text-slate-400">{cert.programmeName}</p>
                      </div>
                      <Award className="w-5 h-5 text-fuchsia-500 shrink-0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">Score: <span className="text-slate-900 font-semibold">{cert.score}%</span></p>
                        <p className="text-xs text-slate-400">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => copyCredential(cert.credentialId)}
                          className="px-2 py-1 bg-slate-200 hover:bg-neutral-600 rounded text-xs text-slate-600 transition-colors flex items-center gap-1"
                        >
                          {copiedCredentialId === cert.credentialId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {copiedCredentialId === cert.credentialId ? "Copied!" : "Copy Link"}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-fuchsia-500/60 font-mono mt-2">{cert.credentialId}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div>
            {/* Domain Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setFilterDomain("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filterDomain === "all"
                    ? "bg-fuchsia-50 text-fuchsia-500 border border-fuchsia-200"
                    : "bg-white text-slate-500 border border-slate-200"
                }`}
              >
                All ({SKILLS.length})
              </button>
              {domains.map((d) => (
                <button
                  key={d}
                  onClick={() => setFilterDomain(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterDomain === d
                      ? "bg-fuchsia-50 text-fuchsia-500 border border-fuchsia-200"
                      : "bg-white text-slate-500 border border-slate-200"
                  }`}
                >
                  {d} ({SKILLS.filter((s) => s.domain === d).length})
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredSkills.map((skill) => {
                const config = COMPETENCY_CONFIG[skill.level];
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm">{skill.name}</h4>
                        <p className="text-xs text-slate-400">{skill.domain}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Competency</span>
                        <span className="text-slate-500">{skill.assessmentScore}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${config.bg}`} style={{ width: `${skill.assessmentScore}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Last assessed: {new Date(skill.lastAssessed).toLocaleDateString()}</span>
                      <span>Score: {skill.assessmentScore}%</span>
                    </div>

                    {skill.courses.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {skill.courses.map((c) => (
                          <span key={c} className="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-500">{c}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-4">
            {PORTFOLIO_ITEMS.map((item) => {
              const config = TYPE_CONFIG[item.type];
              return (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${config.bg} ${config.color} shrink-0`}>
                      {config.label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString()}</span>
                        {item.score && (
                          <span className="text-xs font-semibold text-fuchsia-500">Score: {item.score}%</span>
                        )}
                        <div className="flex gap-1.5 ml-auto">
                          {item.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-400">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Professional Passport Tab */}
        {activeTab === "passport" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-fuchsia-200 rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/5">
              {/* Passport Header */}
              <div className="bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-amber-600/20 p-6 border-b border-fuchsia-200 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GraduationCap className="w-6 h-6 text-fuchsia-500" />
                  <span className="text-sm font-bold text-fuchsia-500 uppercase tracking-widest">PiBridge Professional Passport</span>
                </div>
                <div className="text-xs text-slate-500">Verified Professional Credential</div>
              </div>

              {/* Profile */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <img src={learner.avatar} alt={learner.name} className="w-16 h-16 rounded-xl bg-slate-200" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{learner.name}</h3>
                    <p className="text-sm text-slate-500">{learner.location}</p>
                    <p className="text-xs text-fuchsia-500 font-mono mt-0.5">PIBR-ID-2026-{learner.id.split("-")[1].padStart(4, "0")}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="p-6 border-b border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Verified Skills</h4>
                <div className="space-y-2.5">
                  {SKILLS.filter((s) => s.level !== "introduced").map((skill) => {
                    const config = COMPETENCY_CONFIG[skill.level];
                    return (
                      <div key={skill.name} className="flex items-center justify-between">
                        <span className="text-sm text-slate-900">{skill.name}</span>
                        <span className={`text-xs font-semibold ${config.color}`}>{config.label} ({skill.assessmentScore}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Certificates */}
              <div className="p-6 border-b border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Certifications</h4>
                {CERTIFICATES.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between py-2 border-b border-slate-200/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{cert.courseName}</p>
                      <p className="text-xs text-slate-400">{cert.credentialId}</p>
                    </div>
                    <span className="text-sm font-bold text-fuchsia-500">{cert.score}%</span>
                  </div>
                ))}
              </div>

              {/* Portfolio Highlights */}
              <div className="p-6 border-b border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Portfolio Highlights</h4>
                {PORTFOLIO_ITEMS.filter((p) => p.type === "project" || p.type === "certificate").map((item) => {
                  const config = TYPE_CONFIG[item.type];
                  return (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-slate-200/50 last:border-0">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.color}`}>{config.label}</span>
                      <span className="text-sm text-slate-900 flex-1">{item.title}</span>
                      {item.score && <span className="text-xs text-slate-500">{item.score}%</span>}
                    </div>
                  );
                })}
              </div>

              {/* Verification */}
              <div className="p-6 text-center">
                <p className="text-xs text-slate-400 mb-2">Verify this passport at:</p>
                <p className="text-sm text-fuchsia-500 font-mono">pibridge.com/verify/PIBR-ID-2026-0001</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-xs text-neutral-800 font-mono text-center leading-tight">PIBR<br/>ID-2026<br/>0001</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Scan to verify credentials</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 mt-6">
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-sm transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-xl text-sm transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share Passport
              </button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-xl text-sm transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Public URL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
