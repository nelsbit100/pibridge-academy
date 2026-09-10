// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Certificate View
// Displays an earned certificate (shareable, printable, with a
// public verification URL) — fed by the learner's certificate list.
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAcademy } from "../AcademyContext";
import type { Certificate } from "../types";
import {
  ArrowLeft, Award, ShieldCheck, Copy, Check, Share2, Printer, GraduationCap,
} from "lucide-react";

export function CertificateView({ onBack }: { onBack: () => void }) {
  const { certificates, learner } = useAcademy();
  const [selectedId, setSelectedId] = useState<string | null>(certificates[0]?.id ?? null);
  const [copied, setCopied] = useState(false);

  const cert: Certificate | undefined =
    certificates.find((c) => c.id === selectedId) ?? certificates[0];

  const copyVerification = async () => {
    if (!cert) return;
    try {
      await navigator.clipboard.writeText(cert.verificationUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-800 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> My Certificates
            </h1>
            <p className="text-xs text-neutral-500">
              {certificates.length} earned · verifiable by any employer
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {certificates.length === 0 || !cert ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-neutral-700" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No certificates yet</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
              Complete every lesson in a course and your certificate is issued automatically — with a
              public verification URL employers can check.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors"
            >
              Continue Learning
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* The certificate */}
            <div
              className="relative rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 p-8 md:p-12 overflow-hidden print:shadow-none"
              data-testid="certificate-card"
            >
              {/* Watermark */}
              <GraduationCap className="absolute -right-8 -bottom-8 w-56 h-56 text-neutral-800/60 rotate-12 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-fuchsia-500 to-cyan-500" />

              <div className="relative text-center space-y-5">
                <div className="flex items-center justify-center gap-2 text-amber-400">
                  <Award className="w-6 h-6" />
                  <span className="text-xs font-mono tracking-[0.35em] uppercase">PiBridge Academy</span>
                </div>

                <p className="text-xs text-neutral-500 uppercase tracking-widest">
                  Certificate of Completion
                </p>

                <h2 className="text-3xl md:text-4xl font-extrabold text-white">{cert.learnerName}</h2>

                <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                  has successfully completed all lessons of
                </p>

                <p className="text-xl md:text-2xl font-bold text-amber-400">{cert.courseName}</p>
                <p className="text-xs text-neutral-500">{cert.programmeName}</p>

                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 pt-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">Final Score</p>
                    <p className="text-lg font-bold text-emerald-400">{cert.score}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">Instructor</p>
                    <p className="text-white font-medium">{cert.instructorName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">Issued</p>
                    <p className="text-white font-medium">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">Credential ID</p>
                    <p className="text-white font-mono text-xs mt-1">{cert.credentialId}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Verify at{" "}
                  <span className="text-neutral-300 font-mono">{cert.verificationUrl}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-sm transition-colors"
              >
                <Printer className="w-4 h-4" /> Download / Print
              </button>
              <button
                onClick={async () => {
                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: `${cert.learnerName} — ${cert.courseName}`,
                        text: `I completed ${cert.courseName} on PiBridge Academy with ${cert.score}%!`,
                        url: cert.verificationUrl,
                      });
                    } else {
                      await copyVerification();
                    }
                  } catch {
                    /* share dismissed */
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button
                onClick={copyVerification}
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Verification Link"}
              </button>
            </div>

            {/* All certificates */}
            {certificates.length > 1 && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 mb-3">All Certificates</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {certificates.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`text-left p-4 rounded-xl border transition-colors ${
                        c.id === cert.id
                          ? "border-amber-500/50 bg-amber-500/5"
                          : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
                      }`}
                    >
                      <p className="text-sm font-semibold text-white">{c.courseName}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {c.score}% · {new Date(c.issuedAt).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] text-amber-400/70 font-mono mt-1">{c.credentialId}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-center text-xs text-neutral-600">
              Signed in as {learner.name} · certificates persist in this browser
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
