// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Career Discovery Assessment
// Multi-step questionnaire that recommends programmes
// ──────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Target, CheckCircle, Sparkles } from "lucide-react";

// ── Types ──
interface Question {
  id: string;
  text: string;
  subtitle?: string;
  options: { label: string; icon: string; value: string; weights: Record<string, number> }[];
}

interface ProgrammeRecommendation {
  programmeId: string;
  title: string;
  icon: string;
  match: number;
  reason: string;
  tier: string;
  domain: string;
}

// ── Questions ──
const QUESTIONS: Question[] = [
  {
    id: "goal",
    text: "What is your primary career goal?",
    subtitle: "Select the option that best describes what you want to achieve.",
    options: [
      { label: "Get my first tech job", icon: "💼", value: "first_job", weights: { cybersecurity: 1, software: 2, cloud: 1, ai: 1, data: 1, devsecops: 1, mobile: 1, blockchain: 0 } },
      { label: "Change careers into tech", icon: "🔄", value: "career_change", weights: { cybersecurity: 1, software: 2, cloud: 1, ai: 1, data: 1, devsecops: 0, mobile: 1, blockchain: 0 } },
      { label: "Get promoted in my current role", icon: "📈", value: "promotion", weights: { cybersecurity: 1, software: 1, cloud: 2, ai: 2, data: 2, devsecops: 1, mobile: 0, blockchain: 0 } },
      { label: "Start my own tech business", icon: "🚀", value: "startup", weights: { cybersecurity: 0, software: 2, cloud: 1, ai: 2, data: 1, devsecops: 0, mobile: 2, blockchain: 2 } },
      { label: "Freelance and work remotely", icon: "🌍", value: "freelance", weights: { cybersecurity: 1, software: 2, cloud: 1, ai: 1, data: 1, devsecops: 0, mobile: 2, blockchain: 1 } },
    ],
  },
  {
    id: "interest",
    text: "Which area excites you the most?",
    subtitle: "Think about what you'd enjoy doing every day.",
    options: [
      { label: "Protecting systems from hackers", icon: "🛡️", value: "security", weights: { cybersecurity: 3, software: 0, cloud: 0, ai: 0, data: 0, devsecops: 2, mobile: 0, blockchain: 0 } },
      { label: "Building websites and apps", icon: "💻", value: "building", weights: { cybersecurity: 0, software: 3, cloud: 0, ai: 0, data: 0, devsecops: 0, mobile: 2, blockchain: 1 } },
      { label: "Working with data and AI", icon: "🤖", value: "data_ai", weights: { cybersecurity: 0, software: 0, cloud: 0, ai: 3, data: 3, devsecops: 0, mobile: 0, blockchain: 0 } },
      { label: "Managing cloud infrastructure", icon: "☁️", value: "infrastructure", weights: { cybersecurity: 0, software: 0, cloud: 3, ai: 0, data: 0, devsecops: 2, mobile: 0, blockchain: 0 } },
      { label: "Securing the software supply chain", icon: "🔒", value: "devsec", weights: { cybersecurity: 1, software: 1, cloud: 1, ai: 0, data: 0, devsecops: 3, mobile: 0, blockchain: 0 } },
    ],
  },
  {
    id: "experience",
    text: "What is your current technical experience?",
    subtitle: "Be honest — this helps us recommend the right starting point.",
    options: [
      { label: "Complete beginner", icon: "🌱", value: "beginner", weights: { cybersecurity: 0, software: 0, cloud: 0, ai: 0, data: 0, devsecops: 0, mobile: 0, blockchain: 0 } },
      { label: "I know basic HTML/CSS", icon: "📝", value: "basic_web", weights: { cybersecurity: 0, software: 1, cloud: 0, ai: 0, data: 0, devsecops: 0, mobile: 1, blockchain: 0 } },
      { label: "I can code in one language", icon: "⌨️", value: "one_language", weights: { cybersecurity: 0, software: 2, cloud: 0, ai: 1, data: 1, devsecops: 0, mobile: 1, blockchain: 0 } },
      { label: "I have work experience in tech", icon: "💼", value: "experienced", weights: { cybersecurity: 1, software: 2, cloud: 2, ai: 1, data: 1, devsecops: 1, mobile: 1, blockchain: 0 } },
      { label: "I'm already a professional", icon: "🏆", value: "professional", weights: { cybersecurity: 2, software: 2, cloud: 3, ai: 2, data: 2, devsecops: 2, mobile: 2, blockchain: 1 } },
    ],
  },
  {
    id: "style",
    text: "How do you prefer to learn?",
    subtitle: "We'll tailor your learning experience.",
    options: [
      { label: "Step-by-step structured courses", icon: "📚", value: "structured", weights: { cybersecurity: 1, software: 1, cloud: 1, ai: 1, data: 1, devsecops: 1, mobile: 1, blockchain: 1 } },
      { label: "Hands-on labs and projects", icon: "🔧", value: "hands_on", weights: { cybersecurity: 2, software: 2, cloud: 2, ai: 1, data: 1, devsecops: 2, mobile: 1, blockchain: 2 } },
      { label: "Real-world case studies", icon: "📋", value: "case_studies", weights: { cybersecurity: 2, software: 1, cloud: 2, ai: 1, data: 2, devsecops: 1, mobile: 0, blockchain: 0 } },
      { label: "Mix of everything", icon: "🎯", value: "mixed", weights: { cybersecurity: 1, software: 1, cloud: 1, ai: 1, data: 1, devsecops: 1, mobile: 1, blockchain: 1 } },
    ],
  },
  {
    id: "time",
    text: "How much time can you commit per week?",
    subtitle: "This helps us set realistic expectations.",
    options: [
      { label: "5-10 hours/week", icon: "🕐", value: "part_time", weights: { cybersecurity: 1, software: 1, cloud: 1, ai: 1, data: 1, devsecops: 1, mobile: 1, blockchain: 1 } },
      { label: "15-20 hours/week", icon: "⏰", value: "moderate", weights: { cybersecurity: 1, software: 1, cloud: 1, ai: 1, data: 1, devsecops: 1, mobile: 1, blockchain: 1 } },
      { label: "25-35 hours/week", icon: "🔥", value: "full_time", weights: { cybersecurity: 2, software: 2, cloud: 2, ai: 2, data: 2, devsecops: 2, mobile: 2, blockchain: 2 } },
      { label: "35+ hours/week (bootcamp mode)", icon: "⚡", value: "intensive", weights: { cybersecurity: 3, software: 3, cloud: 3, ai: 3, data: 3, devsecops: 3, mobile: 3, blockchain: 3 } },
    ],
  },
  {
    id: "work_preference",
    text: "What type of work environment do you prefer?",
    subtitle: "This helps us understand your ideal role.",
    options: [
      { label: "Analyzing and investigating problems", icon: "🔍", value: "analytical", weights: { cybersecurity: 3, software: 0, cloud: 1, ai: 2, data: 3, devsecops: 0, mobile: 0, blockchain: 0 } },
      { label: "Creating and building things", icon: "🏗️", value: "creative", weights: { cybersecurity: 0, software: 3, cloud: 1, ai: 1, data: 0, devsecops: 0, mobile: 3, blockchain: 2 } },
      { label: "Designing systems and architecture", icon: "🏛️", value: "systems", weights: { cybersecurity: 1, software: 2, cloud: 3, ai: 1, data: 1, devsecops: 1, mobile: 0, blockchain: 1 } },
      { label: "Helping and protecting people", icon: "🤝", value: "service", weights: { cybersecurity: 3, software: 0, cloud: 0, ai: 0, data: 1, devsecops: 1, mobile: 0, blockchain: 0 } },
    ],
  },
];

// ── Programme Metadata ──
const PROGRAMME_META: Record<string, { title: string; icon: string; tier: string; domain: string }> = {
  cybersecurity: { title: "Cybersecurity", icon: "🛡️", tier: "Foundation", domain: "cybersecurity" },
  software: { title: "Software Engineering", icon: "💻", tier: "Foundation", domain: "software_engineering" },
  cloud: { title: "Cloud & Infrastructure", icon: "☁️", tier: "Foundation", domain: "cloud" },
  ai: { title: "AI & Machine Learning", icon: "🤖", tier: "Foundation", domain: "ai_ml" },
  data: { title: "Data Engineering & Analytics", icon: "📊", tier: "Foundation", domain: "data" },
  devsecops: { title: "DevSecOps", icon: "🔒", tier: "Foundation", domain: "devsecops" },
  mobile: { title: "Mobile App Development", icon: "📱", tier: "Foundation", domain: "mobile" },
  blockchain: { title: "Blockchain & Web3", icon: "⛓️", tier: "Foundation", domain: "blockchain" },
};

const REASONS: Record<string, string> = {
  cybersecurity: "Your interests and goals align strongly with cybersecurity — a high-demand field with excellent career prospects in Ghana and globally.",
  software: "Software engineering offers the broadest career opportunities. Your profile suggests you'd thrive building applications.",
  cloud: "Cloud infrastructure is one of the fastest-growing fields. Your systems-oriented thinking is a great fit.",
  ai: "AI and Machine Learning are transforming every industry. Your analytical interests make this a strong match.",
  data: "Data engineering and analytics are critical for business decisions. Your problem-solving mindset is ideal.",
  devsecops: "DevSecOps combines software, security, and operations — a unique and highly valuable skill set.",
  mobile: "Mobile development offers immediate impact, especially in mobile-first Ghana. Your creative interests align well.",
  blockchain: "Blockchain and Web3 are emerging technologies with massive potential in African markets.",
};

// ── Main Component ──
export function CareerDiscovery({ onBack, onSelectProgramme }: { onBack: () => void; onSelectProgramme?: (programmeId: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQ = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const isLast = step === QUESTIONS.length - 1;

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLast) {
      setShowResults(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else onBack();
  };

  const recommendations = useMemo(() => {
    const scores: Record<string, number> = {};
    QUESTIONS.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) return;
      const opt = q.options.find((o) => o.value === answer);
      if (!opt) return;
      Object.entries(opt.weights).forEach(([key, weight]) => {
        scores[key] = (scores[key] || 0) + weight;
      });
    });

    const maxScore = Math.max(...Object.values(scores), 1);
    return Object.entries(scores)
      .map(([key, score]) => ({
        programmeId: key,
        ...PROGRAMME_META[key],
        match: Math.round((score / maxScore) * 100),
        reason: REASONS[key],
      }))
      .sort((a, b) => b.match - a.match)
      .slice(0, 5);
  }, [answers]);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Back to Academy
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Results Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" /> Assessment Complete
            </div>
            <h1 className="text-4xl font-bold mb-4">Your Recommended Career Paths</h1>
            <p className="text-gray-400 text-lg">Based on your answers, here are the programmes that match your goals, interests, and experience.</p>
          </motion.div>

          {/* Top Match */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-2 text-indigo-300 text-sm font-medium mb-4">
              <Target className="w-4 h-4" /> BEST MATCH — {recommendations[0]?.match}% compatibility
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{recommendations[0]?.icon}</span>
              <div>
                <h2 className="text-3xl font-bold">{recommendations[0]?.title} Professional Path</h2>
                <span className="text-indigo-300 text-sm">{recommendations[0]?.tier} Tier</span>
              </div>
            </div>
            <p className="text-gray-300 text-lg mb-6">{recommendations[0]?.reason}</p>
            <div className="flex gap-3">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Start This Programme
              </button>
              <button onClick={() => { setShowResults(false); setStep(0); setAnswers({}); }}
                className="border border-white/20 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition">
                Retake Assessment
              </button>
            </div>
          </motion.div>

          {/* Other Recommendations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Other Good Matches</h3>
            {recommendations.slice(1).map((rec, i) => (
              <motion.div key={rec.programmeId} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between hover:bg-white/10 transition">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{rec.icon}</span>
                  <div>
                    <h4 className="font-semibold text-lg">{rec.title} Professional Path</h4>
                    <p className="text-gray-400 text-sm">{rec.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-400">{rec.match}%</div>
                  <div className="text-xs text-gray-500 mb-2">match</div>
                  <button onClick={() => onSelectProgramme && onSelectProgramme(`prog-${rec.programmeId}`)}
                    className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition">
                    Start Path →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Career Tiers */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">Your Career Progression</h3>
            <div className="flex items-center gap-4 flex-wrap">
              {["Foundation", "Professional", "Advanced", "Expert"].map((tier, i) => (
                <div key={tier} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${i === 0 ? "bg-green-500 text-white" : "bg-white/10 text-gray-400"}`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm font-medium ${i === 0 ? "text-green-400" : "text-gray-400"}`}>{tier}</span>
                  {i < 3 && <ArrowRight className="w-4 h-4 text-gray-600" />}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4">Start with Foundation and progress through Professional → Advanced → Expert as you build competency.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" /> {step === 0 ? "Back to Academy" : "Previous"}
        </button>
        <div className="text-sm text-gray-400">
          Question {step + 1} of {QUESTIONS.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
      </div>

      {/* Question */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div key={currentQ.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <h2 className="text-3xl font-bold mb-2">{currentQ.text}</h2>
            {currentQ.subtitle && <p className="text-gray-400 text-lg mb-8">{currentQ.subtitle}</p>}

            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.value;
                return (
                  <button key={opt.value} onClick={() => handleSelect(currentQ.id, opt.value)}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/20"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}>
                    <span className="text-2xl">{opt.icon}</span>
                    <span className={`font-medium ${isSelected ? "text-white" : "text-gray-300"}`}>{opt.label}</span>
                    {isSelected && <CheckCircle className="w-5 h-5 text-indigo-400 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition px-6 py-3">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={handleNext} disabled={!answers[currentQ.id]}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition ${
              answers[currentQ.id]
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-white/10 text-gray-500 cursor-not-allowed"
            }`}>
            {isLast ? "Get My Recommendations" : "Next"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
