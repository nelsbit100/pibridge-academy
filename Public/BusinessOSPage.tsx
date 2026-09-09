// ──────────────────────────────────────────────────────────────
// PiBridge BusinessOS — Platform Overview
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { BUSINESS_OS } from "../platforms";
import {
  ArrowLeft, TrendingUp, TrendingDown, Minus, Package, Users,
  FileText, AlertTriangle, CheckCircle, Search, Shield, Heart,
  Receipt, Wallet, MapPin, ChevronRight, Star, ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, typeof TrendingUp> = {
  Receipt, Wallet, TrendingUp, Package, Heart, MapPin,
  Search, Shield, Users, FileText, AlertTriangle, CheckCircle,
};

const MOCK_INVOICES = [
  { id: "INV-001", customer: "Kwame Enterprises", amount: 2500, status: "paid", date: "Aug 30" },
  { id: "INV-002", customer: "Abena Trading", amount: 1800, status: "pending", date: "Aug 29" },
  { id: "INV-003", customer: "Kofi & Sons", amount: 3200, status: "overdue", date: "Aug 25" },
  { id: "INV-004", customer: "Adjoa Foods", amount: 950, status: "paid", date: "Aug 28" },
];

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-400",
  pending: "bg-amber-500/10 text-amber-400",
  overdue: "bg-red-500/10 text-red-400",
};

export function BusinessOSPage({ onBack }: { onBack: () => void }) {
  const data = BUSINESS_OS;
  const mock = data.mockData;
  const [ctaNotice, setCtaNotice] = useState<string | null>(null);

  const requestAccess = (plan?: string) => {
    setCtaNotice(plan ? `Early access requested — ${plan} plan. Our team will reach out.` : "Early access request received — we'll be in touch soon.");
    window.setTimeout(() => setCtaNotice(null), 3500);
  };

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
          <button
            onClick={() => requestAccess()}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-sm transition-colors"
          >
            Get Early Access
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-6">{data.description}</p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{data.stats.businessesTargeted}</div>
              <div className="text-xs text-neutral-500">Businesses to serve</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{data.stats.avgTimeSavedPerWeek}</div>
              <div className="text-xs text-neutral-500">Saved per week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{data.stats.avgRevenueIncrease}</div>
              <div className="text-xs text-neutral-500">Revenue increase</div>
            </div>
          </div>
        </div>

        {/* Mock Dashboard */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-12">
          <h2 className="text-lg font-bold text-white mb-4">Live Dashboard Preview</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: "Today's Sales", value: `GH₵ ${mock.todayStats.sales.toLocaleString()}`, color: "text-emerald-400" },
              { label: "Expenses", value: `GH₵ ${mock.todayStats.expenses.toLocaleString()}`, color: "text-red-400" },
              { label: "Profit", value: `GH₵ ${mock.todayStats.profit.toLocaleString()}`, color: "text-amber-400" },
              { label: "Pending", value: `GH₵ ${mock.todayStats.pendingPayments.toLocaleString()}`, color: "text-orange-400" },
              { label: "Low Stock", value: `${mock.todayStats.lowStockItems} items`, color: "text-yellow-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-neutral-800/50 rounded-xl p-3">
                <div className="text-xs text-neutral-500 mb-1">{stat.label}</div>
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Mock Invoices */}
          <div className="bg-neutral-800/30 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Recent Invoices</h3>
            <div className="space-y-2">
              {MOCK_INVOICES.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b border-neutral-700/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500 font-mono">{inv.id}</span>
                    <span className="text-sm text-white">{inv.customer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">GH₵ {inv.amount.toLocaleString()}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[inv.status]}`}>{inv.status}</span>
                    <span className="text-xs text-neutral-500">{inv.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Health Score */}
          <div className="mt-6 bg-neutral-800/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Business Health Score</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#262626" strokeWidth="6" />
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray={`${(mock.healthScore.overall / 100) * 251} 251`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{mock.healthScore.overall}</span>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                {Object.entries(mock.healthScore).filter(([k]) => k !== "overall").map(([key, val]) => {
                  const v = val as { score: number; trend: string };
                  const TrendIcon = v.trend === "up" ? TrendingUp : v.trend === "down" ? TrendingDown : Minus;
                  const trendColor = v.trend === "up" ? "text-emerald-400" : v.trend === "down" ? "text-red-400" : "text-neutral-500";
                  return (
                    <div key={key} className="text-center">
                      <div className="text-sm font-bold text-white">{v.score}</div>
                      <div className="text-xs text-neutral-500 capitalize">{key}</div>
                      <TrendIcon className={`w-3 h-3 mx-auto mt-0.5 ${trendColor}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Everything You Need to Run Your Business</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.map((feature) => {
              const Icon = ICON_MAP[feature.icon] || Package;
              return (
                <div key={feature.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-400 mb-3">{feature.description}</p>
                  <div className="space-y-1">
                    {feature.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-neutral-500">
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />{h}
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
          <h2 className="text-2xl font-bold text-white text-center mb-2">Simple, Transparent Pricing</h2>
          <p className="text-sm text-neutral-500 text-center mb-8">Start free, upgrade when you need more</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.pricing.map((plan) => (
              <div key={plan.name} className={`bg-neutral-900 border rounded-2xl p-6 ${plan.recommended ? "border-emerald-500/50 ring-1 ring-emerald-500/20" : "border-neutral-800"}`}>
                {plan.recommended && (
                  <div className="text-xs font-bold text-emerald-400 mb-3 flex items-center gap-1"><Star className="w-3 h-3" /> MOST POPULAR</div>
                )}
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-neutral-500">{plan.period}</span>
                </div>
                <button
                  onClick={() => requestAccess(plan.name ?? plan.price)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.recommended ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950" : "bg-neutral-800 hover:bg-neutral-700 text-white"}`}
                >
                  Get Started
                </button>
                <div className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-neutral-400">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
