// ──────────────────────────────────────────────────────────────
// PiBridge Academy — AI Interviewer Component
// Conducts mock interviews after capstone projects
// ──────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Bot, User, Mic, MicOff, Send, Clock, CheckCircle, Star,
  ChevronRight, BarChart3, MessageSquare, Brain, Lightbulb, Target,
} from "lucide-react";
import { AI_INTERVIEW_QUESTIONS, type AIInterview, type AIInterviewQuestion } from "../careerPaths";

// ── Types ──
type InterviewPhase = "intro" | "interview" | "evaluation" | "results";

interface AIInterviewerProps {
  projectTitle: string;
  projectDescription: string;
  domain: string;
  programmeId: string;
  tierName: "foundation" | "professional" | "expert";
  onComplete: (score: number, readiness: string) => void;
  onBack: () => void;
}

// ── Typing Animation ──
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

// ── Chat Bubble ──
function ChatBubble({ isAI, message, isTyping }: { isAI: boolean; message?: string; isTyping?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAI ? "" : "flex-row-reverse"}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isAI ? "bg-indigo-500/30 text-indigo-400" : "bg-amber-500/30 text-amber-400"
      }`}>
        {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
        isAI ? "bg-white/5 border border-white/10 text-gray-200" : "bg-indigo-600 text-white"
      }`}>
        {isTyping ? <TypingIndicator /> : <p className="text-sm leading-relaxed">{message}</p>}
      </div>
    </motion.div>
  );
}

// ── Main Component ──
export function AIInterviewer({
  projectTitle, projectDescription, domain, programmeId, tierName, onComplete, onBack,
}: AIInterviewerProps) {
  const [phase, setPhase] = useState<InterviewPhase>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [messages, setMessages] = useState<{ isAI: boolean; text: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Build question list
  const questionBank = AI_INTERVIEW_QUESTIONS[domain] || AI_INTERVIEW_QUESTIONS.cybersecurity;
  const allQuestions = [
    ...questionBank.technical.slice(0, 2),
    ...questionBank.behavioral.slice(0, 1),
    ...questionBank.problemSolving.slice(0, 1),
    ...questionBank.projectSpecific.slice(0, 2),
  ];

  // Timer
  useEffect(() => {
    if (phase === "interview") {
      const interval = setInterval(() => setTimer((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const simulateAIResponse = (questionIndex: number) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const question = allQuestions[questionIndex];
      setMessages((prev) => [...prev, { isAI: true, text: question }]);
    }, 1500);
  };

  const handleStart = () => {
    setPhase("interview");
    setMessages([
      { isAI: true, text: `Hello! I'm your AI interviewer for the ${tierName} tier assessment. I'll be asking you questions about your project and technical knowledge. Let's begin!` },
    ]);
    setTimeout(() => simulateAIResponse(0), 1000);
  };

  const handleSubmitAnswer = () => {
    if (!inputValue.trim()) return;
    const answer = inputValue.trim();
    setAnswers((prev) => [...prev, answer]);
    setMessages((prev) => [...prev, { isAI: false, text: answer }]);
    setInputValue("");

    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setTimeout(() => simulateAIResponse(currentQuestion + 1), 500);
    } else {
      // Interview complete
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { isAI: true, text: "Thank you for completing the interview! I'm now evaluating your responses. One moment..." }]);
        setTimeout(() => setPhase("evaluation"), 2000);
      }, 1500);
    }
  };

  // ── Intro Phase ──
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="border-b border-white/10 px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            ← Back to Dashboard
          </button>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-10 h-10 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">AI Interview Assessment</h1>
              <p className="text-gray-400 max-w-lg mx-auto">
                You'll be interviewed by an AI about your project ({projectTitle}) and domain knowledge.
                This assesses your technical communication and problem-solving skills.
              </p>
            </div>

            {/* Interview Format */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Interview Format</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: <Brain className="w-5 h-5" />, title: "Technical", count: "2 questions", desc: "Domain-specific technical knowledge" },
                  { icon: <MessageSquare className="w-5 h-5" />, title: "Behavioral", count: "1 question", desc: "Situational and teamwork" },
                  { icon: <Target className="w-5 h-5" />, title: "Project", count: "3 questions", desc: "Deep dive into your project" },
                ].map((cat) => (
                  <div key={cat.title} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-indigo-400 mb-2">{cat.icon}</div>
                    <h3 className="font-medium">{cat.title}</h3>
                    <p className="text-sm text-gray-400">{cat.desc}</p>
                    <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Criteria */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Evaluation Criteria</h2>
              <div className="space-y-3">
                {[
                  { label: "Technical Accuracy", weight: "30%", desc: "Correctness and depth of technical answers" },
                  { label: "Communication Clarity", weight: "25%", desc: "How clearly you explain complex concepts" },
                  { label: "Problem-Solving", weight: "25%", desc: "Approach to breaking down and solving problems" },
                  { label: "Project Understanding", weight: "20%", desc: "Depth of understanding of your own project" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">{c.label}</span>
                      <span className="text-gray-500 text-xs ml-2">— {c.desc}</span>
                    </div>
                    <span className="text-indigo-400 text-sm font-medium">{c.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Readiness Level */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Readiness Levels</h2>
              <div className="flex gap-4 flex-wrap">
                {[
                  { label: "Not Ready", color: "red", desc: "Need more practice" },
                  { label: "Developing", color: "amber", desc: "Building skills" },
                  { label: "Ready", color: "green", desc: "Industry-ready" },
                  { label: "Highly Ready", color: "blue", desc: "Standout candidate" },
                ].map((l) => (
                  <div key={l.label} className={`flex-1 min-w-[120px] p-3 rounded-lg border bg-${l.color}-500/10 border-${l.color}-500/20 text-center`}>
                    <div className={`text-sm font-medium text-${l.color}-400`}>{l.label}</div>
                    <div className="text-xs text-gray-500">{l.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleStart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 text-lg">
              <Bot className="w-5 h-5" /> Start AI Interview
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Interview Phase ──
  if (phase === "interview") {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500/30 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-medium">AI Interviewer</div>
              <div className="text-xs text-gray-400">Question {currentQuestion + 1} of {allQuestions.length}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" /> {formatTime(timer)}
            </div>
            <div className="flex gap-1">
              {allQuestions.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${
                  i < currentQuestion ? "bg-green-500" : i === currentQuestion ? "bg-indigo-500" : "bg-white/10"
                }`} />
              ))}
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <ChatBubble key={i} isAI={msg.isAI} message={msg.text} />
          ))}
          {isTyping && <ChatBubble isAI={true} isTyping />}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="bg-slate-800 border-t border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsRecording(!isRecording)}
              className={`p-3 rounded-lg transition ${isRecording ? "bg-red-500 text-white" : "bg-white/10 text-gray-400 hover:bg-white/20"}`}>
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmitAnswer()}
              placeholder="Type your answer..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <button onClick={handleSubmitAnswer} disabled={!inputValue.trim()}
              className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-white/10 rounded-lg transition">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Evaluation & Results Phase ──
  if (phase === "evaluation" || phase === "results") {
    const technicalScore = 78;
    const communicationScore = 82;
    const problemSolvingScore = 75;
    const projectScore = 85;
    const overallScore = Math.round((technicalScore * 0.3 + communicationScore * 0.25 + problemSolvingScore * 0.25 + projectScore * 0.2));
    const readinessLevel = overallScore >= 85 ? "Highly Ready" : overallScore >= 70 ? "Ready" : overallScore >= 55 ? "Developing" : "Not Ready";

    const strengths = [
      "Clear explanation of technical concepts",
      "Good problem-solving approach",
      "Strong understanding of project architecture",
    ];
    const improvements = [
      "Provide more specific examples with metrics",
      "Elaborate on trade-offs in technical decisions",
      "Discuss edge cases and failure scenarios",
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="border-b border-white/10 px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            ← Back to Dashboard
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Interview Complete</h1>
              <p className="text-gray-400">Here's your AI evaluation for {projectTitle}</p>
            </div>

            {/* Overall Score */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-8 text-center">
              <div className="text-6xl font-bold text-indigo-400 mb-2">{overallScore}%</div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                readinessLevel === "Highly Ready" ? "bg-blue-500/20 text-blue-300" :
                readinessLevel === "Ready" ? "bg-green-500/20 text-green-300" :
                readinessLevel === "Developing" ? "bg-amber-500/20 text-amber-300" :
                "bg-red-500/20 text-red-300"
              }`}>
                <Star className="w-4 h-4" /> {readinessLevel}
              </div>
              <p className="text-gray-400 mt-3">
                {readinessLevel === "Ready" || readinessLevel === "Highly Ready"
                  ? "You've demonstrated strong technical and communication skills. You're ready for industry roles."
                  : "Keep building your skills. Focus on the improvement areas below."}
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>
              <div className="space-y-4">
                {[
                  { label: "Technical Accuracy", score: technicalScore, weight: "30%", color: "indigo" },
                  { label: "Communication Clarity", score: communicationScore, weight: "25%", color: "blue" },
                  { label: "Problem-Solving", score: problemSolvingScore, weight: "25%", color: "purple" },
                  { label: "Project Understanding", score: projectScore, weight: "20%", color: "cyan" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">{item.label} <span className="text-gray-500">({item.weight})</span></span>
                      <span className="text-sm font-medium">{item.score}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.score}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full bg-${item.color}-500 rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Strengths
                </h3>
                <ul className="space-y-2">
                  {strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                <h3 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {improvements.map((s, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interview Summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Interview Summary</h2>
              <div className="space-y-3">
                {allQuestions.map((q, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-indigo-400 mb-1">Q{i + 1}: {q}</p>
                    <p className="text-sm text-gray-400">{answers[i] || "No answer provided"}</p>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => onComplete(overallScore, readinessLevel)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 text-lg">
              <CheckCircle className="w-5 h-5" /> Complete & View Results
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
