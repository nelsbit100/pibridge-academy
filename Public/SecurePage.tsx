// ──────────────────────────────────────────────────────────────
// PiBridge Secure — Platform Overview
// ──────────────────────────────────────────────────────────────

import { SECURE_PLATFORM } from "../platforms";
import {
  ArrowLeft, TrendingUp, Shield, Users, FileText, AlertTriangle,
  CheckCircle, Search, ChevronRight, Star, Lock, Eye, Server,
  Cloud, Mail, UserCheck, Clipboard,
} from "lucide-react";

const ICON_MAP: Record<string, typeof TrendingUp> = {
  Search, Shield, Users, FileText, AlertTriangle, CheckCircle,
};

const SCORE_COLORS: Record<string, string> = {
  strong: "bg-emerald-500",
  good: "bg-blue-500",
  "needs-attention": "bg-amber-500",
  critical: "bg-red-500",
};

const SCORE_TEXT_COLORS: Record<string, string> = {
  strong: "text-emerald-400",
  good: "text-blue-400",
  "needs-attention": "text-amber-400",
  critical: "text-red-400",
};

const MOCK_THREATS = [
  { type: "Phishing attempt", source: "email", blocked: true, time: "2 hours ago" },
  { type: "Brute force login", source: "ssh", blocked: true, time: "5 hours ago" },
  { type: "Suspicious download", source: "web", blocked: true, time: "1 day ago" },
  { type: "Malware detected", source: "endpoint", quarantined: true, time: "2 days ago" },
  { type: "Unauthorized access attempt", source: "vpn", blocked: true, time: "3 days ago" },
];

export function SecurePage({ onBack }: { onBack: () => void }) {
  const data = SECURE_PLATFORM;
  const mock = data.mockData;

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="bg-neutral-900/50 border-b border-neutral-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-neutral-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">{data.icon}</span> {data.name}
            </h1>
            <p className="text-xs text-neutral-500">{data.tagline}</p>
          </div>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl text-sm transition-colors">
            Get Protected
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-6">{data.description}</p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{data.stats.businessesProtected}</div>
              <div className="text-xs text-neutral-500">Businesses protected</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{data.stats.incidentsDetected}</div>
              <div className="text-xs text-neutral-500">Threats detected</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{data.stats.averageResponseTime}</div>
              <div className="text-xs text-neutral-500">Response time</div>
            </div>
          </div>
        </div>

        {/* Mock Security Dashboard */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Security Dashboard Preview</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-semibold">Protected</span>
            </div>
          </div>

          {/* Security Score */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-neutral-800/50 rounded-xl p-5 flex items-center gap-5">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#262626" strokeWidth="6" />
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray={`${(mock.securityScore.overall / 100) * 251} 251`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">{mock.securityScore.overall}</span>
                  <span className="text-xs text-neutral-500">/100</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">Overall Score</div>
                <div className="text-sm text-emerald-400">Good Security Posture</div>
                <div className="text-xs text-neutral-500 mt-1">Last scan: {mock.lastScan}</div>
              </div>
            </div>

            {/* Threat Summary */}
            <div className="bg-neutral-800/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-400" /> Threats Blocked (30 days)
              </h3>
              <div className="text-3xl font-bold text-white mb-1">{mock.threatsBlocked.toLocaleString()}</div>
              <div className="text-xs text-neutral-500">All threats neutralized</div>
              <div className="mt-3 space-y-1.5">
                {MOCK_THREATS.slice(0, 3).map((threat, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">{threat.type}</span>
                    <span className="text-emerald-400">Blocked</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-neutral-800/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Security Status</h3>
              <div className="space-y-2.5">
                {[
                  { icon: Lock, label: "MFA", status: "Enabled", color: "text-emerald-400" },
                  { icon: Shield, label: "Endpoint Protection", status: "Active", color: "text-emerald-400" },
                  { icon: Server, label: "Backups", status: "Verifying", color: "text-amber-400" },
                  { icon: Mail, label: "Email Security", status: "Active", color: "text-emerald-400" },
                  { icon: Cloud, label: "Cloud Monitoring", status: "Active", color: "text-emerald-400" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-neutral-400" />
                        <span className="text-sm text-white">{item.label}</span>
                      </div>
                      <span className={`text-xs font-semibold ${item.color}`}>{item.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sub-scores */}
          <div className="grid grid-cols-7 gap-2">
            {Object.entries(mock.securityScore).filter(([k]) => k !== "overall").map(([key, val]) => {
              const v = val as { score: number; status: string };
              return (
                <div key={key} className="text-center bg-neutral-800/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-white">{v.score}</div>
                  <div className="text-xs text-neutral-500 capitalize mb-1.5">{key}</div>
                  <div className={`h-1.5 rounded-full ${SCORE_COLORS[v.status]}`} style={{ width: `${v.score}%`, margin: "0 auto" }} />
                  <div className={`text-xs mt-1 ${SCORE_TEXT_COLORS[v.status]} capitalize`}>{v.status}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Threat Log */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-12">
          <h2 className="text-lg font-bold text-white mb-4">Recent Threat Log</h2>
          <div className="space-y-2">
            {MOCK_THREATS.map((threat, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-4 bg-neutral-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <span className="text-sm text-white font-medium">{threat.type}</span>
                    <span className="text-xs text-neutral-500 ml-2">via {threat.source}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500">{threat.time}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold">
                    {threat.blocked ? "Blocked" : "Quarantined"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-2">How We Protect Your Business</h2>
          <p className="text-sm text-neutral-500 text-center mb-8">From assessment to ongoing protection — we handle everything</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.map((feature) => {
              const Icon = ICON_MAP[feature.icon] || Shield;
              return (
                <div key={feature.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-400 mb-3">{feature.description}</p>
                  <div className="space-y-1">
                    {feature.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-neutral-500">
                        <CheckCircle className="w-3 h-3 text-red-400 shrink-0" />{h}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Security Plans</h2>
          <p className="text-sm text-neutral-500 text-center mb-8">Enterprise-grade protection at small business prices</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.pricing.map((plan) => (
              <div key={plan.name} className={`bg-neutral-900 border rounded-2xl p-6 ${plan.recommended ? "border-red-500/50 ring-1 ring-red-500/20" : "border-neutral-800"}`}>
                {plan.recommended && (
                  <div className="text-xs font-bold text-red-400 mb-3 flex items-center gap-1"><Star className="w-3 h-3" /> RECOMMENDED</div>
                )}
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-neutral-500">{plan.period}</span>
                </div>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.recommended ? "bg-red-500 hover:bg-red-400 text-white" : "bg-neutral-800 hover:bg-neutral-700 text-white"}`}>
                  Get Protected
                </button>
                <div className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-neutral-400">
                      <CheckCircle className="w-4 h-4 text-red-400 shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Compliance Support Included</h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-6">
            We help you meet regulatory requirements — Ghana Data Protection Act, PCI-DSS for card payments, and industry best practices.
          </p>
          <div className="flex justify-center gap-6">
            {["Ghana DPA (Act 843)", "PCI-DSS", "ISO 27001", "NIST CSF"].map((framework) => (
              <div key={framework} className="px-4 py-2 bg-neutral-800 rounded-lg text-sm text-neutral-300">
                {framework}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
