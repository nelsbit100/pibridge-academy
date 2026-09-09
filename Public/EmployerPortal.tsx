// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Employer Portal
// Job postings, candidate search, shortlisting
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, MapPin, Clock, Briefcase, Star, Users, Filter, ChevronRight, Plus, Eye, Bookmark, CheckCircle, Shield, Building2, GraduationCap, Target, TrendingUp, BarChart3, Zap } from "lucide-react";
import { rankCandidatesForJob, SAMPLE_JOB_REQUIREMENTS, SAMPLE_CANDIDATES, type MatchResult } from "../talentMatching";

type EmployerView = "landing" | "jobs" | "candidates" | "shortlist" | "talent-match";

// ── Mock Data ──
const MOCK_JOBS = [
  { id: "j1", title: "Junior SOC Analyst", company: "Vodafone Ghana", location: "Accra", type: "Full-time", salary: "GH₵ 3,000-5,000/mo", posted: "2 days ago", applicants: 23, skills: ["SIEM", "Networking", "Linux", "Incident Response"], urgent: true },
  { id: "j2", title: "Cloud Engineer", company: "MTN Ghana", location: "Accra / Remote", type: "Full-time", salary: "GH₵ 5,000-8,000/mo", posted: "5 days ago", applicants: 15, skills: ["AWS", "Terraform", "Kubernetes", "Docker"], urgent: false },
  { id: "j3", title: "Full-Stack Developer", company: "Hubtel", location: "Accra", type: "Full-time", salary: "GH₵ 4,000-6,000/mo", posted: "1 week ago", applicants: 42, skills: ["React", "Node.js", "PostgreSQL", "TypeScript"], urgent: false },
  { id: "j4", title: "Security Consultant", company: "KPMG Ghana", location: "Accra", type: "Contract", salary: "GH₵ 8,000-12,000/mo", posted: "3 days ago", applicants: 8, skills: ["Penetration Testing", "ISO 27001", "Risk Assessment", "Compliance"], urgent: true },
  { id: "j5", title: "Data Analyst", company: "mPharma", location: "Accra / Remote", type: "Full-time", salary: "GH₵ 3,500-5,500/mo", posted: "1 day ago", applicants: 31, skills: ["SQL", "Python", "Power BI", "Data Modeling"], urgent: false },
  { id: "j6", title: "DevOps Engineer", company: "Expresspay", location: "Accra", type: "Full-time", salary: "GH₵ 5,000-7,000/mo", posted: "4 days ago", applicants: 12, skills: ["Docker", "CI/CD", "Linux", "Monitoring"], urgent: false },
];

const MOCK_CANDIDATES = [
  { id: "c1", name: "Kofi Mensah", title: "SOC Analyst Graduate", location: "Accra", skills: ["Splunk", "SIEM", "Linux", "Networking", "Incident Response"], competency: 85, certificates: 3, projects: 5, available: true, rating: 4.8 },
  { id: "c2", name: "Ama Asante", title: "Full-Stack Developer", location: "Kumasi", skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"], competency: 92, certificates: 4, projects: 8, available: true, rating: 4.9 },
  { id: "c3", name: "Yaw Boateng", title: "Cloud Engineer", location: "Accra", skills: ["AWS", "Terraform", "Kubernetes", "Python", "Networking"], competency: 78, certificates: 2, projects: 3, available: false, rating: 4.6 },
  { id: "c4", name: "Efua Darko", title: "Security Analyst", location: "Tema", skills: ["Penetration Testing", "Nmap", "Burp Suite", "SIEM", "Threat Intel"], competency: 88, certificates: 3, projects: 6, available: true, rating: 4.7 },
  { id: "c5", name: "Nana Appiah", title: "Data Analyst", location: "Accra", skills: ["SQL", "Python", "Power BI", "Pandas", "Data Visualization"], competency: 82, certificates: 2, projects: 4, available: true, rating: 4.5 },
  { id: "c6", name: "Adjoa Poku", title: "DevOps Engineer", location: "Accra", skills: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Linux"], competency: 90, certificates: 3, projects: 7, available: true, rating: 4.8 },
];

// ── Main Component ──
export function EmployerPortal({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<EmployerView>("landing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedMatchJob, setSelectedMatchJob] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [contacted, setContacted] = useState<Set<string>>(new Set());
  const [portalNotice, setPortalNotice] = useState<string | null>(null);

  const notify = (msg: string) => {
    setPortalNotice(msg);
    window.setTimeout(() => setPortalNotice(null), 3200);
  };

  const contactCandidate = (id: string, name: string) => {
    setContacted((prev) => new Set([...prev, id]));
    notify(`Intro message sent to ${name}.`);
  };

  const allSkills = Array.from(new Set(MOCK_CANDIDATES.flatMap((c) => c.skills)));

  const filteredCandidates = MOCK_CANDIDATES.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((s) => c.skills.includes(s));
    return matchesSearch && matchesSkills;
  });

  const toggleShortlist = (id: string) => {
    setShortlist((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  };

  if (view === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="border-b border-white/10 px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Back to Academy
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4" /> Employer Portal
            </div>
            <h1 className="text-5xl font-bold mb-4">Hire Verified Tech Talent</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Access graduates whose skills have been verified through real projects, assessments, and competency evaluations — not just certificates.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => setView("jobs")} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Post a Job
              </button>
              <button onClick={() => setView("candidates")} className="border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                <Search className="w-4 h-4" /> Search Candidates
              </button>
              <button onClick={() => setView("talent-match")} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                <Zap className="w-4 h-4" /> AI Talent Match
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Verified Graduates", value: "742+", icon: <GraduationCap className="w-5 h-5" /> },
              { label: "Partner Companies", value: "50+", icon: <Building2 className="w-5 h-5" /> },
              { label: "Placement Rate", value: "68%", icon: <CheckCircle className="w-5 h-5" /> },
              { label: "Average Time to Hire", value: "14 days", icon: <Clock className="w-5 h-5" /> },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-blue-400 flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Why PiBridge Talent */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Why PiBridge Verified Talent?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Evidence-Based Skills", desc: "Every skill is backed by projects, assessments, and competency evaluations — not just course completion.", icon: <Shield className="w-6 h-6" /> },
                { title: "Professional Passport", desc: "Candidates have a verified professional profile with skills, projects, and competency levels.", icon: <Star className="w-6 h-6" /> },
                { title: "Reduced Hiring Risk", desc: "Our competency engine means you hire based on demonstrated capability, not résumé claims.", icon: <CheckCircle className="w-6 h-6" /> },
              ].map((f) => (
                <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-blue-400 mb-3">{f.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Job Openings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Job Openings</h2>
              <button onClick={() => setView("jobs")} className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_JOBS.slice(0, 4).map((job) => (
                <div key={job.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between hover:bg-white/10 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{job.title}</h3>
                        {job.urgent && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">Urgent</span>}
                      </div>
                      <div className="text-sm text-gray-400 flex items-center gap-3">
                        <span>{job.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-400">{job.salary}</div>
                    <div className="text-xs text-gray-500">{job.applicants} applicants • {job.posted}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "jobs") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setView("landing")} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Employer Portal
          </button>
          <button
            onClick={() => notify("Job posting form coming soon — your 6 live roles are collecting applicants.")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Post New Job
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold mb-2">Job Postings</h1>
          <p className="text-gray-400 mb-6">Manage your job postings and view applicants</p>

          <div className="space-y-4">
            {MOCK_JOBS.map((job) => (
              <div key={job.id} className={`bg-white/5 border rounded-xl p-6 transition ${
                selectedSkills.length === 0 || job.skills.some((s) => selectedSkills.includes(s))
                  ? "border-white/10 hover:bg-white/10"
                  : "border-white/5 opacity-40"
              }`}>
                {showFilters && selectedSkills.length > 0 && (
                  <div className="mb-3 text-xs text-blue-300">
                    Matching filters: {job.skills.filter((s) => selectedSkills.includes(s)).join(", ") || "none"}
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      {job.urgent && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">Urgent Hire</span>}
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-3 mt-1">
                      <span>{job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span>{job.type}</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-blue-400 font-semibold">{job.applicants} applicants</div>
                    <div className="text-gray-500">{job.posted}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {job.skills.map((skill) => (
                    <span key={skill} className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">{skill}</span>
                  ))}
                  <button
                    onClick={() => notify(`${job.applicants} applicants for ${job.title} — applicant tracking coming soon.`)}
                    className="ml-auto text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                  >
                    View Applicants <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "talent-match") {
    const selectedJob = SAMPLE_JOB_REQUIREMENTS[selectedMatchJob];
    const matchResults = rankCandidatesForJob(SAMPLE_CANDIDATES, selectedJob);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setView("landing")} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Employer Portal
          </button>
          <div className="text-sm text-gray-400">AI-Powered Talent Matching</div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" /> AI-Powered Matching
            </div>
            <h1 className="text-2xl font-bold mb-2">Talent Match: {selectedJob.title}</h1>
            <p className="text-gray-400 mb-6">Candidates ranked by skill match, competency, experience, and readiness</p>

            {/* Job Requirements Summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold mb-3">Job Requirements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Required Skills</div>
                  <div className="flex gap-2 flex-wrap">
                    {selectedJob.requiredSkills.map((s) => (
                      <span key={s.skillName} className={`text-xs px-2 py-1 rounded ${s.isRequired ? "bg-red-500/20 text-red-300" : "bg-white/10 text-gray-300"}`}>
                        {s.skillName} ({s.minLevel}){s.isRequired ? " *" : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-blue-400">{selectedJob.minCompetencyScore}%</div>
                    <div className="text-xs text-gray-500">Min Competency</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-green-400">{selectedJob.minProjects}</div>
                    <div className="text-xs text-gray-500">Projects Required</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-amber-400">GH₵ {(selectedJob.salaryRange.min / 1000).toFixed(0)}-{(selectedJob.salaryRange.max / 1000).toFixed(0)}k</div>
                    <div className="text-xs text-gray-500">Salary Range</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matched Candidates */}
            <h2 className="text-lg font-semibold mb-4">Ranked Candidates ({matchResults.length})</h2>
            <div className="space-y-4">
              {matchResults.map((result, i) => {
                const candidate = SAMPLE_CANDIDATES.find((c) => c.candidateId === result.candidateId);
                if (!candidate) return null;

                const gradeColors: Record<string, string> = {
                  "A+": "bg-green-500", "A": "bg-green-500/80",
                  "B+": "bg-blue-500", "B": "bg-blue-500/80",
                  "C+": "bg-amber-500", "C": "bg-amber-500/80",
                  "D": "bg-red-500",
                };

                return (
                  <motion.div key={result.candidateId} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center text-lg font-bold text-blue-400">
                            {candidate.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className={`absolute -top-1 -right-1 w-6 h-6 ${gradeColors[result.matchGrade]} rounded-full flex items-center justify-center text-xs font-bold text-white`}>
                            {result.matchGrade}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{candidate.name}</h3>
                          <div className="text-sm text-gray-400">{candidate.title} • {candidate.location}</div>
                          <div className="flex items-center gap-3 mt-1 text-sm">
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {candidate.rating}</span>
                            <span className="text-gray-500">•</span>
                            <span>{candidate.certificates} certs</span>
                            <span className="text-gray-500">•</span>
                            <span>{candidate.projects} projects</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-400">{result.overallScore}%</div>
                        <div className="text-xs text-gray-500 mb-2">Match Score</div>
                        <button onClick={() => toggleShortlist(candidate.candidateId)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            shortlist.includes(candidate.candidateId)
                              ? "bg-blue-600 text-white"
                              : "border border-white/20 hover:bg-white/10 text-white"
                          }`}>
                          {shortlist.includes(candidate.candidateId) ? "Shortlisted" : "Shortlist"}
                        </button>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-5 gap-3 mt-4">
                      {[
                        { label: "Skills", score: result.skillMatchScore, color: "blue" },
                        { label: "Competency", score: result.competencyMatchScore, color: "green" },
                        { label: "Experience", score: result.experienceMatchScore, color: "amber" },
                        { label: "Location", score: result.locationMatchScore, color: "purple" },
                        { label: "Soft Skills", score: result.softSkillScore, color: "cyan" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full bg-${s.color}-500 rounded-full`} style={{ width: `${s.score}%` }} />
                          </div>
                          <div className="text-xs font-medium mt-1">{s.score}%</div>
                        </div>
                      ))}
                    </div>

                    {/* Skill Gaps & Strengths */}
                    <div className="grid md:grid-cols-2 gap-3 mt-4">
                      {result.strengths.length > 0 && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="text-xs font-medium text-green-400 mb-1">✅ Strengths</div>
                          <ul className="text-xs text-gray-300 space-y-0.5">
                            {result.strengths.slice(0, 3).map((s, j) => <li key={j}>• {s}</li>)}
                          </ul>
                        </div>
                      )}
                      {result.skillGaps.length > 0 && (
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <div className="text-xs font-medium text-amber-400 mb-1">⚠️ Skill Gaps</div>
                          <ul className="text-xs text-gray-300 space-y-0.5">
                            {result.skillGaps.slice(0, 3).map((g, j) => (
                              <li key={j}>• {g.skill}: {g.currentLevel} → {g.requiredLevel}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Recommendation */}
                    <div className="mt-3 p-3 bg-white/5 rounded-lg">
                      <div className="text-xs text-gray-400">💡 {result.recommendation}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (view === "shortlist") {
    const shortlistedCandidates = MOCK_CANDIDATES.filter((c) => shortlist.includes(c.id));
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setView("candidates")} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Back to Candidates
          </button>
          <div className="text-sm text-gray-400">{shortlist.length} candidates shortlisted</div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold mb-2">Shortlisted Candidates</h1>
          <p className="text-gray-400 mb-6">Review and contact your top candidates</p>

          <div className="space-y-4">
            {shortlistedCandidates.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No candidates shortlisted yet. Go back to search and add candidates.</p>
              </div>
            ) : (
              shortlistedCandidates.map((c) => (
                <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center text-lg font-bold text-blue-400">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{c.name}</h3>
                        <div className="text-sm text-gray-400">{c.title} • {c.location}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-3 h-3 text-yellow-400" /> {c.rating}
                          </div>
                          <span className="text-gray-600">•</span>
                          <span className="text-sm text-gray-400">{c.certificates} certificates</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-sm text-gray-400">{c.projects} projects</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{c.competency}%</div>
                      <div className="text-xs text-gray-500">Competency Score</div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => contactCandidate(c.id, c.name)}
                          disabled={contacted.has(c.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${contacted.has(c.id) ? "bg-emerald-600/30 text-emerald-400 cursor-default" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                        >
                          {contacted.has(c.id) ? "✓ Contacted" : "Contact"}
                        </button>
                        <button onClick={() => toggleShortlist(c.id)}
                          className="border border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {c.skills.map((skill) => (
                      <span key={skill} className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">{skill}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Candidates View (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <button onClick={() => setView("landing")} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" /> Employer Portal
        </button>
        <button onClick={() => setView("shortlist")} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm">
          <Bookmark className="w-4 h-4" /> Shortlist ({shortlist.length})
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">Search Verified Candidates</h1>
        <p className="text-gray-400 mb-6">Find talent with verified skills, projects, and competency scores</p>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skill, or title..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          </div>
          <button
            onClick={() => setShowFilters((f) => !f)}
            className={`flex items-center gap-2 border px-4 py-3 rounded-lg text-sm font-medium transition ${showFilters ? "bg-blue-600/20 border-blue-500 text-white" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Skill Filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {allSkills.slice(0, 15).map((skill) => (
            <button key={skill} onClick={() => toggleSkillFilter(skill)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                selectedSkills.includes(skill)
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}>
              {skill}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400 mb-4">{filteredCandidates.length} candidates found</div>

        {/* Candidate Cards */}
        <div className="space-y-4">
          {filteredCandidates.map((c) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center text-lg font-bold text-blue-400">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{c.name}</h3>
                      {c.available && <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">Available</span>}
                    </div>
                    <div className="text-sm text-gray-400">{c.title} • {c.location}</div>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {c.rating}</span>
                      <span className="text-gray-500">•</span>
                      <span>{c.certificates} certificates</span>
                      <span className="text-gray-500">•</span>
                      <span>{c.projects} projects</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-400">{c.competency}%</div>
                  <div className="text-xs text-gray-500 mb-3">Competency</div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleShortlist(c.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                        shortlist.includes(c.id)
                          ? "bg-blue-600 text-white"
                          : "border border-white/20 hover:bg-white/10 text-white"
                      }`}>
                      {shortlist.includes(c.id) ? <CheckCircle className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      {shortlist.includes(c.id) ? "Shortlisted" : "Shortlist"}
                    </button>
                    <button
                      onClick={() => notify(`Opening ${c.name}'s full portfolio — candidate profiles coming soon.`)}
                      className="border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {c.skills.map((skill) => (
                  <span key={skill} className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
              {/* Competency Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Competency Score</span>
                  <span>{c.competency}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${c.competency}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {portalNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-blue-600 text-white text-sm rounded-xl shadow-xl">
          {portalNotice}
        </div>
      )}
    </div>
  );
}
