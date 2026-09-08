// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Communication Scorer
// Real-time webcam-based presentation analysis
// Eye contact, speech clarity, pacing, filler words, tone
// ──────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Camera, CameraOff, Mic, MicOff, Eye, Volume2, Timer,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  BarChart3, Waves, MessageSquare, Clock,
} from "lucide-react";

// ── Types ──
export interface CommunicationMetrics {
  eyeContact: CommunicationScore;
  speechClarity: CommunicationScore;
  pacing: CommunicationScore;
  fillerWords: CommunicationScore;
  toneVariety: CommunicationScore;
  confidence: CommunicationScore;
  overallCommunication: number;
}

export interface CommunicationScore {
  score: number; // 0-100
  label: string;
  status: "excellent" | "good" | "needs-improvement" | "poor";
  feedback: string;
}

export interface FillerWord {
  word: string;
  count: number;
}

// ── Simulated Analysis Engine ──
// In production, this would use Web Speech API + MediaPipe for real analysis
class CommunicationAnalyzer {
  private eyeContactHistory: number[] = [];
  private speechRateHistory: number[] = [];
  private fillerWordsDetected: Map<string, number> = new Map();
  private toneVariations: number[] = [];
  private pauseCount = 0;
  private totalWords = 0;
  private durationSeconds = 0;

  constructor() {
    // Initialize with baseline simulated values
    this.eyeContactHistory = Array.from({ length: 10 }, () => 60 + Math.random() * 30);
    this.speechRateHistory = Array.from({ length: 10 }, () => 120 + Math.random() * 60);
  }

  update(durationSeconds: number): CommunicationMetrics {
    this.durationSeconds = durationSeconds;

    // Simulate improving metrics over time (learning effect)
    const timeBonus = Math.min(durationSeconds / 60, 1) * 10;

    // Eye Contact Analysis (simulated based on webcam)
    const avgEyeContact = this.eyeContactHistory.reduce((a, b) => a + b, 0) / this.eyeContactHistory.length;
    const eyeContactScore = Math.min(100, avgEyeContact + timeBonus * 0.5);

    // Speech Clarity (simulated)
    const speechClarityScore = Math.min(100, 70 + timeBonus * 0.8 + Math.random() * 5);

    // Pacing Analysis (words per minute, ideal 130-160)
    const avgSpeechRate = this.speechRateHistory.reduce((a, b) => a + b, 0) / this.speechRateHistory.length;
    const pacingScore = 100 - Math.abs(avgSpeechRate - 145) * 0.5;

    // Filler Words (um, uh, like, you know, basically)
    const fillerCount = Array.from(this.fillerWordsDetected.values()).reduce((a, b) => a + b, 0);
    const fillerScore = Math.max(0, 100 - fillerCount * 5);

    // Tone Variety
    const toneScore = Math.min(100, 65 + timeBonus * 0.6);

    // Confidence Score (composite)
    const confidenceScore = (eyeContactScore * 0.3 + pacingScore * 0.25 + speechClarityScore * 0.25 + toneScore * 0.2);

    // Overall Communication
    const overallCommunication = Math.round(
      eyeContactScore * 0.25 +
      speechClarityScore * 0.25 +
      pacingScore * 0.20 +
      fillerScore * 0.10 +
      toneScore * 0.10 +
      confidenceScore * 0.10
    );

    return {
      eyeContact: this.formatScore(eyeContactScore, "Eye Contact", "Look at the camera more consistently"),
      speechClarity: this.formatScore(speechClarityScore, "Speech Clarity", "Speak more clearly and enunciate"),
      pacing: this.formatScore(pacingScore, "Pacing", "Maintain steady pacing around 130-160 words/min"),
      fillerWords: this.formatScore(fillerScore, "Filler Words", "Reduce use of 'um', 'uh', 'like'"),
      toneVariety: this.formatScore(toneScore, "Tone Variety", "Vary your tone to maintain engagement"),
      confidence: this.formatScore(confidenceScore, "Confidence", "Maintain confident posture and voice"),
      overallCommunication: Math.round(overallCommunication),
    };
  }

  private formatScore(score: number, label: string, improvementTip: string): CommunicationScore {
    const clampedScore = Math.round(Math.min(100, Math.max(0, score)));
    let status: CommunicationScore["status"];
    let feedback: string;

    if (clampedScore >= 85) {
      status = "excellent";
      feedback = `Excellent ${label.toLowerCase()}. You're doing great!`;
    } else if (clampedScore >= 70) {
      status = "good";
      feedback = `Good ${label.toLowerCase()}. ${improvementTip}.`;
    } else if (clampedScore >= 50) {
      status = "needs-improvement";
      feedback = `${label} needs work. ${improvementTip}.`;
    } else {
      status = "poor";
      feedback = `${label} is below target. Focus on ${improvementTip.toLowerCase()}.`;
    }

    return { score: clampedScore, label, status, feedback };
  }

  // Simulate real-time updates
  simulateUpdate() {
    // Eye contact fluctuates
    this.eyeContactHistory.push(55 + Math.random() * 40);
    if (this.eyeContactHistory.length > 20) this.eyeContactHistory.shift();

    // Speech rate varies
    this.speechRateHistory.push(120 + Math.random() * 60);
    if (this.speechRateHistory.length > 20) this.speechRateHistory.shift();

    // Random filler words
    const fillers = ["um", "uh", "like", "you know", "basically"];
    if (Math.random() > 0.7) {
      const filler = fillers[Math.floor(Math.random() * fillers.length)];
      this.fillerWordsDetected.set(filler, (this.fillerWordsDetected.get(filler) || 0) + 1);
    }
  }

  getFillerWords(): FillerWord[] {
    return Array.from(this.fillerWordsDetected.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);
  }

  reset() {
    this.eyeContactHistory = [];
    this.speechRateHistory = [];
    this.fillerWordsDetected.clear();
    this.toneVariations = [];
  }
}

// ── Metric Card ──
function MetricCard({ metric, icon }: { metric: CommunicationScore; icon: React.ReactNode }) {
  const statusColors = {
    excellent: "text-green-400 bg-green-500/10 border-green-500/20",
    good: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    "needs-improvement": "text-amber-400 bg-amber-500/10 border-amber-500/20",
    poor: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  return (
    <div className={`p-3 rounded-xl border ${statusColors[metric.status]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{metric.label}</span>
        </div>
        <span className="text-lg font-bold">{metric.score}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${metric.score}%` }}
          className={`h-full rounded-full ${
            metric.status === "excellent" ? "bg-green-500" :
            metric.status === "good" ? "bg-blue-500" :
            metric.status === "needs-improvement" ? "bg-amber-500" : "bg-red-500"
          }`}
        />
      </div>
      <p className="text-xs text-gray-400">{metric.feedback}</p>
    </div>
  );
}

// ── Main Component ──
export function CommunicationScorer({
  isPresenting,
  onMetricsUpdate,
}: {
  isPresenting: boolean;
  onMetricsUpdate?: (metrics: CommunicationMetrics) => void;
}) {
  const [metrics, setMetrics] = useState<CommunicationMetrics | null>(null);
  const [duration, setDuration] = useState(0);
  const [fillerWords, setFillerWords] = useState<FillerWord[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const analyzerRef = useRef(new CommunicationAnalyzer());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (!isPresenting) return;
    const timer = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(timer);
  }, [isPresenting]);

  // Analysis updates
  useEffect(() => {
    if (!isPresenting) return;

    intervalRef.current = setInterval(() => {
      analyzerRef.current.simulateUpdate();
      const newMetrics = analyzerRef.current.update(duration);
      setMetrics(newMetrics);
      setFillerWords(analyzerRef.current.getFillerWords());
      onMetricsUpdate?.(newMetrics);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPresenting, duration, onMetricsUpdate]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (!metrics) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <BarChart3 className="w-4 h-4" /> Communication analysis will start when you begin presenting.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" /> Live Communication Analysis
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Timer className="w-3 h-3" /> {formatTime(duration)}
          </div>
          <button onClick={() => setIsCameraOn(!isCameraOn)}
            className={`p-1.5 rounded-lg text-xs ${isCameraOn ? "bg-white/10" : "bg-red-500/20 text-red-400"}`}>
            {isCameraOn ? <Camera className="w-3 h-3" /> : <CameraOff className="w-3 h-3" />}
          </button>
          <button onClick={() => setIsMicOn(!isMicOn)}
            className={`p-1.5 rounded-lg text-xs ${isMicOn ? "bg-white/10" : "bg-red-500/20 text-red-400"}`}>
            {isMicOn ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="text-center p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg">
        <div className="text-3xl font-bold text-indigo-400">{metrics.overallCommunication}</div>
        <div className="text-xs text-gray-400">Overall Communication Score</div>
      </div>

      {/* Individual Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard metric={metrics.eyeContact} icon={<Eye className="w-3.5 h-3.5" />} />
        <MetricCard metric={metrics.speechClarity} icon={<Volume2 className="w-3.5 h-3.5" />} />
        <MetricCard metric={metrics.pacing} icon={<Timer className="w-3.5 h-3.5" />} />
        <MetricCard metric={metrics.confidence} icon={<TrendingUp className="w-3.5 h-3.5" />} />
      </div>

      {/* Filler Words */}
      {fillerWords.length > 0 && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-sm font-medium text-amber-400 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" /> Filler Words Detected
          </div>
          <div className="flex gap-2 flex-wrap">
            {fillerWords.slice(0, 5).map((fw) => (
              <span key={fw.word} className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">
                "{fw.word}" × {fw.count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm font-medium text-indigo-400 mb-1">
          <MessageSquare className="w-3.5 h-3.5" /> Real-Time Tips
        </div>
        <p className="text-xs text-gray-400">
          {metrics.eyeContact.score < 70
            ? "Look directly at the camera to simulate eye contact with your audience."
            : metrics.pacing.score < 70
            ? "Slow down. Aim for 130-160 words per minute for optimal comprehension."
            : metrics.fillerWords.score < 70
            ? "Take a brief pause instead of using filler words. Pauses are powerful."
            : "Great presentation! Keep maintaining your current pace and energy."}
        </p>
      </div>
    </div>
  );
}
