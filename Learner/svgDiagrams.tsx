// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Animated SVG Diagram Library
// Hand-crafted SVG illustrations for lesson video scenes. Each
// template is a self-contained, animated diagram drawn with SVG
// primitives + Framer Motion, themed to the dark player palette.
// ──────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { AccentColor } from "../lessonVideos/core";
import { ACCENTS } from "../lessonVideos/core";

export const DG = {
  panel: "#1b1b1f",
  panel2: "#232329",
  line: "#3f3f46",
  text: "#e4e4e7",
  dim: "#a1a1aa",
  faint: "#52525b",
};

type A = string;

interface TemplateProps {
  accent: A;
  labels?: string[];
  elapsed: number;
}

const fade = (delay: number, dur = 0.5) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: dur },
});

const box = (
  x: number, y: number, w: number, h: number, fill: string,
  stroke: string, rx = 10, sw = 1.5, dash?: string,
) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke}
    strokeWidth={sw} strokeDasharray={dash} />
);

const label = (x: number, y: number, text: string, fill: string, size = 12, weight = 600, anchor: "middle" | "start" | "end" = "middle") => (
  <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight={weight}
    dominantBaseline="middle">{text}</text>
);

function Frame({ children, w = 760, h = 380 }: { children: ReactNode; w?: number; h?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {children}
    </svg>
  );
}

// ── Network stacks & layers ──────────────────────────────────

function OsiStack({ accent, labels }: TemplateProps) {
  const layers = [
    { n: "7", name: "Application", detail: "HTTP, DNS, SMTP — data the user sees" },
    { n: "6", name: "Presentation", detail: "TLS encryption, encoding, compression" },
    { n: "5", name: "Session", detail: "dialogue control, connection state" },
    { n: "4", name: "Transport", detail: "TCP/UDP segments, ports, reliability" },
    { n: "3", name: "Network", detail: "IP packets, routing, logical addressing" },
    { n: "2", name: "Data Link", detail: "Ethernet frames, MAC, switching" },
    { n: "1", name: "Physical", detail: "bits on copper, fiber, radio" },
  ];
  return (
    <Frame>
      {layers.map((l, i) => (
        <motion.g key={l.n} {...fade(0.15 + i * 0.18)}>
          {box(120, 18 + i * 50, 400, 44, i === 3 ? accent + "26" : DG.panel2, i === 3 ? accent : DG.line, 8, i === 3 ? 2 : 1.5)}
          {label(150, 40 + i * 50, l.n, i === 3 ? accent : DG.faint, 15)}
          {label(215, 34 + i * 50, l.name, i === 3 ? accent : DG.text, 13)}
          {label(215, 51 + i * 50, l.detail, DG.dim, 10.5, 400, "start")}
        </motion.g>
      ))}
      <motion.g {...fade(1.6)}>
        <motion.circle cx={560} r={4} fill={accent}
          animate={{ cy: [250, 18, 364] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}>
        </motion.circle>
        {label(560, 100, "data descends:", DG.dim, 11, 400, "start")}
        {label(560, 118, "app → bits", DG.dim, 11, 400, "start")}
        {label(560, 240, "device ascends:", DG.dim, 11, 400, "start")}
        {label(560, 258, "bits → app", DG.dim, 11, 400, "start")}
      </motion.g>
      {labels && labels.length > 0 && (
        <motion.g {...fade(2.2)}>{label(320, 372, labels.join("  ·  "), DG.faint, 11, 400)}</motion.g>
      )}
    </Frame>
  );
}

function TcpHandshake({ accent }: TemplateProps) {
  const rowY = { a: 90, b: 300 };
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {box(60, rowY.a - 30, 150, 60, DG.panel2, accent, 10, 2)}
        {label(135, rowY.a, "Client", accent, 14)}
        {box(550, rowY.b - 30, 150, 60, DG.panel2, DG.line, 10)}
        {label(625, rowY.b, "Server", DG.text, 14)}
      </motion.g>
      {[
        { from: [210, rowY.a], to: [550, rowY.b], label: "SYN  seq=x", t: "connection request", d: 0.7 },
        { from: [550, rowY.b], to: [210, rowY.a], label: "SYN-ACK  seq=y, ack=x+1", t: "\u201cI hear you — here's my number\u201d", d: 1.7 },
        { from: [210, rowY.a], to: [550, rowY.b], label: "ACK  ack=y+1", t: "connection established", d: 2.7 },
      ].map((p, i) => (
        <motion.g key={i} {...fade(p.d)}>
          <motion.line x1={p.from[0]} y1={p.from[1]} x2={p.to[0]} y2={p.to[1]}
            stroke={accent} strokeWidth={2} strokeDasharray="6 5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: p.d, duration: 0.8 }} />
          {label((p.from[0] + p.to[0]) / 2, (p.from[1] + p.to[1]) / 2 + 42 + i * 56, p.label, accent, 12)}
          {label((p.from[0] + p.to[0]) / 2, (p.from[1] + p.to[1]) / 2 + 60 + i * 56, p.t, DG.dim, 10.5, 400)}
        </motion.g>
      ))}
      <motion.g {...fade(3.6)}>
        {box(255, 165, 250, 40, accent + "1f", accent, 20, 1.5)}
        {label(380, 185, "session open — data may flow", accent, 12)}
      </motion.g>
    </Frame>
  );
}

function PacketJourney({ accent }: TemplateProps) {
  const stops = [
    { x: 80, name: "Laptop", sub: "192.168.1.20" },
    { x: 250, name: "Router", sub: "NAT + default gw" },
    { x: 420, name: "ISP", sub: "routes to backbone" },
    { x: 590, name: "Server", sub: "142.250.4.100" },
  ];
  return (
    <Frame>
      {stops.map((s, i) => (
        <motion.g key={s.name} {...fade(0.12 + i * 0.22)}>
          {box(s.x - 55, 150, 110, 64, DG.panel2, i === 0 || i === 3 ? accent : DG.line, 10, i === 0 || i === 3 ? 2 : 1.5)}
          {label(s.x, 174, s.name, i === 0 || i === 3 ? accent : DG.text, 13)}
          {label(s.x, 196, s.sub, DG.dim, 10, 400)}
        </motion.g>
      ))}
      {[165, 335, 505].map((x, i) => (
        <motion.g key={x} {...fade(0.9 + i * 0.2)}>
          <line x1={x} y1={182} x2={x + 20} y2={182} stroke={DG.line} strokeWidth={2} />
          <circle r={5} fill={accent}>
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.25}s`}
              path={`M ${x} 182 L ${x + 22} 182`} />
          </circle>
        </motion.g>
      ))}
      <motion.g {...fade(1.8)}>
        {label(380, 90, "every hop rewrites layer 2 — never layer 3", DG.dim, 12, 400)}
        {label(380, 110, "TTL decrements at each router; 0 → dropped (ICMP time exceeded)", DG.faint, 11, 400)}
      </motion.g>
      <motion.g {...fade(2.6)}>
        {box(180, 260, 400, 76, DG.panel, DG.line, 10)}
        {label(380, 284, "traceroute shows the path hop-by-hop", accent, 12)}
        {label(380, 306, "each * means a router dropped or silenced your probe", DG.dim, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Security architecture ────────────────────────────────────

function DefenseInDepth({ accent }: TemplateProps) {
  const rings = [
    { r: 168, label: "Data", detail: "encrypted at rest, least privilege", d: 0.9 },
    { r: 132, label: "Application", detail: "input validation, secure code", d: 0.75 },
    { r: 96, label: "Endpoint", detail: "EDR, patching, hardening", d: 0.6 },
    { r: 60, label: "Network", detail: "segmentation, firewalls", d: 0.45 },
  ];
  return (
    <Frame>
      {rings.map((ring, i) => (
        <motion.g key={ring.label} {...fade(ring.d)}>
          <circle cx={380} cy={190} r={ring.r} fill={i % 2 ? DG.panel : DG.panel2}
            stroke={i === 3 ? accent : DG.line} strokeWidth={i === 3 ? 2 : 1.5} />
          {label(380, 190 - ring.r + 22, ring.label, i === 3 ? accent : DG.text, 12.5)}
          {label(380, 190 - ring.r + 40, ring.detail, DG.dim, 10, 400)}
        </motion.g>
      ))}
      <motion.g {...fade(1.1)}>
        <circle cx={380} cy={190} r={26} fill={accent + "2e"} stroke={accent} strokeWidth={2} />
        {label(380, 190, "crown", accent, 11)}
        {label(380, 204, "jewels", accent, 11)}
      </motion.g>
      <motion.g {...fade(1.5)}>
        {label(120, 352, "attacker must defeat every ring — each buys time and detection", DG.dim, 11.5, 400, "start")}
      </motion.g>
    </Frame>
  );
}

function DmzTraffic({ accent }: TemplateProps) {
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {label(120, 60, "Internet", DG.dim, 13)}
        {box(40, 75, 160, 50, DG.panel2, DG.line, 10)}
        {label(120, 100, "untrusted", DG.text, 12, 400)}
      </motion.g>
      <motion.g {...fade(0.4)}>
        {box(250, 70, 90, 60, accent + "22", accent, 10, 2)}
        {label(295, 95, "outer", accent, 11)}
        {label(295, 112, "firewall", accent, 11)}
      </motion.g>
      <motion.g {...fade(0.8)}>
        {box(380, 60, 170, 80, DG.panel2, accent, 10, 2, "7 5")}
        {label(465, 90, "DMZ", accent, 13)}
        {label(465, 112, "web · mail · proxy", DG.dim, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(1.2)}>
        {box(595, 70, 90, 60, accent + "22", accent, 10, 2)}
        {label(640, 95, "inner", accent, 11)}
        {label(640, 112, "firewall", accent, 11)}
      </motion.g>
      <motion.g {...fade(1.5)}>
        {box(300, 205, 130, 60, DG.panel, DG.line, 10)}
        {label(365, 228, "internal LAN", DG.text, 11.5)}
        {label(365, 248, "workstations · DB", DG.dim, 10, 400)}
      </motion.g>
      <motion.g {...fade(1.8)}>
        {box(460, 205, 130, 60, DG.panel, DG.line, 10)}
        {label(525, 228, "management net", DG.text, 11.5)}
        {label(525, 248, "admins · backups", DG.dim, 10, 400)}
      </motion.g>
      <motion.g {...fade(2.1)}>
        <line x1={640} y1={130} x2={525} y2={205} stroke={accent} strokeWidth={2} strokeDasharray="5 4" />
        <line x1={640} y1={130} x2={365} y2={205} stroke={DG.line} strokeWidth={1.5} strokeDasharray="3 4" />
        {label(600, 175, "only published ports", accent, 10.5, 400, "start")}
      </motion.g>
      <motion.g {...fade(2.5)}>
        {label(380, 320, "compromise the web server and the attacker is still outside the LAN", DG.dim, 11.5, 400)}
        {label(380, 342, "no rule ever points from DMZ straight into the internal network", DG.faint, 11, 400)}
      </motion.g>
    </Frame>
  );
}

function TlsHandshake({ accent }: TemplateProps) {
  const steps = [
    { t: "ClientHello — supported cipher suites + random", d: 0.3 },
    { t: "ServerHello — chosen suite + certificate chain", d: 1.0 },
    { t: "client verifies cert against trusted root CAs", d: 1.7 },
    { t: "key exchange — both derive the same session key", d: 2.4 },
    { t: "Finished — all further traffic is encrypted", d: 3.1 },
  ];
  return (
    <Frame>
      <motion.g {...fade(0.05)}>
        {box(70, 40, 200, 44, DG.panel2, accent, 10, 2)}
        {label(170, 62, "Browser (client)", accent, 13)}
        {box(490, 40, 200, 44, DG.panel2, DG.line, 10)}
        {label(590, 62, "Web server", DG.text, 13)}
      </motion.g>
      {steps.map((s, i) => (
        <motion.g key={i} {...fade(s.d)}>
          <circle cx={70} cy={110 + i * 48} r={4} fill={accent} />
          <text x={90} y={110 + i * 48} fill={DG.text} fontSize={12.5} fontWeight={600}
            dominantBaseline="middle">{i + 1}. {s.t.slice(0, s.t.indexOf("—") - 1)}</text>
          <text x={90} y={124 + i * 48} fill={DG.dim} fontSize={10.5} fontWeight={400}
            dominantBaseline="middle">{s.t.slice(s.t.indexOf("—") + 2)}</text>
          {i < steps.length - 1 && (
            <line x1={70} y1={118 + i * 48} x2={70} y2={150 + i * 48} stroke={DG.faint} strokeWidth={1.2} />
          )}
        </motion.g>
      ))}
      <motion.g {...fade(3.7)}>
        {box(490, 160, 190, 90, DG.panel, DG.line, 10)}
        {label(585, 186, "the padlock = TLS", accent, 12)}
        {label(585, 208, "not the site being safe —", DG.dim, 10.5, 400)}
        {label(585, 224, "only the pipe being encrypted", DG.dim, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Process / pipeline templates ─────────────────────────────

function CiCdPipeline({ accent, labels }: TemplateProps) {
  const stages = labels && labels.length >= 6 ? labels : [
    "Commit", "Build", "Test", "Scan", "Staging", "Production",
  ];
  return (
    <Frame>
      <line x1={70} y1={120} x2={690} y2={120} stroke={DG.line} strokeWidth={2.5} />
      {stages.map((s, i) => {
        const x = 70 + i * (620 / (stages.length - 1));
        return (
          <motion.g key={s} {...fade(0.15 + i * 0.25)}>
            <circle cx={x} cy={120} r={22} fill={DG.panel2} stroke={i === stages.length - 1 ? accent : DG.line} strokeWidth={i === stages.length - 1 ? 2.5 : 1.5} />
            {label(x, 120, String(i + 1), i === stages.length - 1 ? accent : DG.text, 13)}
            {label(x, 165, s, i === stages.length - 1 ? accent : DG.text, 12)}
          </motion.g>
        );
      })}
      <circle r={7} fill={accent}>
        <animateMotion dur="5s" repeatCount="indefinite" path="M 70 120 L 690 120" />
      </circle>
      <motion.g {...fade(1.8)}>
        {box(90, 220, 280, 110, DG.panel, DG.line, 10)}
        {label(230, 246, "every green gate is a contract:", accent, 11.5)}
        {label(230, 268, "tests pass → artifact may advance", DG.dim, 10.5, 400)}
        {label(230, 286, "any red → pipeline stops, artifact dies", DG.dim, 10.5, 400)}
        {label(230, 306, "same artifact flows all the way through", DG.dim, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(2.4)}>
        {box(410, 220, 260, 110, accent + "14", accent, 10, 1.5)}
        {label(540, 246, "rollback = redeploy previous", accent, 11.5)}
        {label(540, 268, "artifact — never 'fix forward'", DG.dim, 10.5, 400)}
        {label(540, 290, "in production alone", DG.dim, 10.5, 400)}
        {label(540, 312, "MTTR beats MTBF in practice", DG.faint, 10, 400)}
      </motion.g>
    </Frame>
  );
}

function IcPipeline({ accent }: TemplateProps) {
  const stages = [
    { name: "Plan", sub: "what & why" },
    { name: "Code", sub: "peer-reviewed PRs" },
    { name: "Build", sub: "compile + package" },
    { name: "Test", sub: "unit · integration" },
    { name: "Release", sub: "version + artifact" },
    { name: "Deploy", sub: "infra as code" },
    { name: "Operate", sub: "monitor · alert" },
  ];
  return (
    <Frame>
      {stages.map((s, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const x = 120 + col * 175, y = 80 + row * 130;
        return (
          <motion.g key={s.name} {...fade(0.15 + i * 0.2)}>
            {box(x - 65, y - 34, 130, 68, DG.panel2, i === 3 ? accent : DG.line, 10, i === 3 ? 2 : 1.5)}
            {label(x, y - 10, s.name, i === 3 ? accent : DG.text, 13)}
            {label(x, y + 12, s.sub, DG.dim, 10, 400)}
          </motion.g>
        );
      })}
      <motion.g {...fade(1.6)}>
        {box(295, 210, 130, 68, accent + "1a", accent, 10, 2)}
        {label(360, 234, "Monitor", accent, 13)}
        {label(360, 256, "feedback loop", DG.dim, 10, 400)}
      </motion.g>
      <motion.g {...fade(1.9)}>
        <path d="M 640 114 C 700 114, 700 244, 640 244" fill="none" stroke={DG.line} strokeWidth={1.5} strokeDasharray="4 4" />
        <path d="M 295 244 C 240 244, 240 114, 295 114" fill="none" stroke={DG.faint} strokeWidth={1.2} strokeDasharray="4 4" />
        {label(712, 180, "back", DG.faint, 10, 400)}
      </motion.g>
      <motion.g {...fade(2.4)}>
        {label(380, 330, "culture, not tooling: you build it, you run it, you own it", accent, 12.5)}
      </motion.g>
    </Frame>
  );
}

function CircularLoop({ accent, labels }: TemplateProps) {
  const items = labels && labels.length >= 4 ? labels : ["Observe", "Orient", "Decide", "Act"];
  const cx = 380, cy = 175, R = 118;
  return (
    <Frame>
      <motion.circle cx={cx} cy={cy} r={R} fill="none" stroke={DG.line} strokeWidth={2}
        strokeDasharray="5 6" {...fade(0.1)} />
      {items.map((it, i) => {
        const ang = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + R * Math.cos(ang), y = cy + R * Math.sin(ang);
        return (
          <motion.g key={it} {...fade(0.35 + i * 0.3)}>
            {box(x - 62, y - 26, 124, 52, DG.panel2, i === 0 ? accent : DG.line, 12, i === 0 ? 2 : 1.5)}
            {label(x, y, it, i === 0 ? accent : DG.text, 13)}
          </motion.g>
        );
      })}
      <circle r={9} fill={accent} opacity={0.9}>
        <animateMotion dur="6s" repeatCount="indefinite"
          path={`M ${cx} ${cy - R} ${items.map((_, i) => {
            const ang = ((i + 1) / items.length) * Math.PI * 2 - Math.PI / 2;
            return `A ${R} ${R} 0 0 1 ${cx + R * Math.cos(ang)} ${cy + R * Math.sin(ang)}`;
          }).join(" ")}`} />
      </circle>
      <motion.g {...fade(1.8)}>
        {label(cx, cy - 6, "the loop never", DG.dim, 12, 400)}
        {label(cx, cy + 12, "finishes", DG.dim, 12, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Encryption / auth templates ──────────────────────────────

function SymmetricVsAsymmetric({ accent }: TemplateProps) {
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {box(60, 30, 280, 250, DG.panel2, accent, 12, 2)}
        {label(200, 56, "Symmetric — AES", accent, 14)}
        {label(200, 82, "one shared secret key", DG.dim, 11, 400)}
        {box(120, 104, 60, 40, accent + "22", accent, 8)}
        {label(150, 124, "key", accent, 11)}
        {box(220, 104, 60, 40, accent + "22", accent, 8)}
        {label(250, 124, "key", accent, 11)}
        <line x1={180} y1={124} x2={220} y2={124} stroke={accent} strokeWidth={2} strokeDasharray="4 4" />
        {label(200, 168, "fast · bulk data", DG.text, 11.5, 400)}
        {label(200, 188, "problem: how to share the key?", DG.dim, 11, 400)}
        {label(200, 224, "Gb/s throughput", DG.faint, 10.5, 400)}
        {label(200, 244, "n(n-1)/2 keys for n people", DG.faint, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(0.6)}>
        {box(420, 30, 280, 250, DG.panel2, DG.line, 12, 2)}
        {label(560, 56, "Asymmetric — RSA/ECC", DG.text, 14)}
        {label(560, 82, "keypair: public + private", DG.dim, 11, 400)}
        {box(470, 104, 100, 40, DG.panel, DG.line, 8)}
        {label(520, 124, "public 🔓", DG.text, 11)}
        {box(590, 104, 100, 40, DG.panel, DG.line, 8)}
        {label(640, 124, "private 🔑", DG.text, 11)}
        {label(560, 168, "slow · key exchange + signatures", DG.text, 11.5, 400)}
        {label(560, 188, "publish public freely — private never", DG.dim, 11, 400)}
        {label(560, 224, "kb/s throughput", DG.faint, 10.5, 400)}
        {label(560, 244, "TLS uses both together", DG.faint, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(1.2)}>
        {box(150, 310, 460, 44, accent + "14", accent, 10, 1.5)}
        {label(380, 332, "real TLS: asymmetric to agree on a key, symmetric to move the data", accent, 12, 400)}
      </motion.g>
    </Frame>
  );
}

function HashVsEncrypt({ accent }: TemplateProps) {
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {label(200, 40, "Encryption — reversible", accent, 13)}
        {label(200, 96, "password123", DG.text, 12, 400)}
        <motion.text x={200} y={130} textAnchor="middle" fontSize={18} fill={accent}
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>→ 🔐 →</motion.text>
        {label(200, 166, "x9$Kq2… (ciphertext)", DG.dim, 12, 400)}
        {label(200, 210, "with the key, decrypt back", DG.dim, 11, 400)}
        {label(200, 244, "use for: data in transit, at rest", DG.faint, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(0.6)}>
        {label(560, 40, "Hashing — one-way", accent, 13)}
        {label(560, 96, "password123", DG.text, 12, 400)}
        <motion.text x={560} y={130} textAnchor="middle" fontSize={18} fill={accent}
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>→ # →</motion.text>
        {label(560, 166, "ef92b6…da39 (digest)", DG.dim, 12, 400)}
        {label(560, 210, "no key. no undo. ever.", DG.dim, 11, 400)}
        {label(560, 244, "use for: passwords, integrity", DG.faint, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(1.2)}>
        {box(130, 290, 500, 60, DG.panel, DG.line, 10)}
        {label(380, 312, "if a site can 'email you your password', it stored it wrong", accent, 12, 400)}
        {label(380, 334, "passwords should only ever exist as salted hashes (bcrypt/argon2)", DG.dim, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

function ThreeFactorAuth({ accent }: TemplateProps) {
  const factors = [
    { t: "Something you KNOW", ex: "password · PIN · security questions", risk: "phishable, reusable, breachable", d: 0.2, color: DG.text },
    { t: "Something you HAVE", ex: "authenticator app · FIDO2 key · smartcard", risk: "needs a second channel to steal", d: 0.9, color: DG.text },
    { t: "Something you ARE", ex: "fingerprint · face · iris (biometrics)", risk: "cannot be rotated after breach", d: 1.6, color: DG.text },
  ];
  return (
    <Frame>
      {factors.map((f, i) => (
        <motion.g key={f.t} {...fade(f.d)}>
          {box(60, 24 + i * 104, 400, 88, DG.panel2, i === 1 ? accent : DG.line, 10, i === 1 ? 2 : 1.5)}
          {label(80, 48 + i * 104, f.t, i === 1 ? accent : f.color, 13.5, 600, "start")}
          {label(80, 72 + i * 104, f.ex, DG.dim, 11, 400, "start")}
          {label(80, 94 + i * 104, "weakness: " + f.risk, DG.faint, 10.5, 400, "start")}
        </motion.g>
      ))}
      <motion.g {...fade(2.2)}>
        {box(490, 40, 220, 120, accent + "12", accent, 12, 2)}
        {label(600, 66, "MFA ≠ SMS", accent, 13)}
        {label(600, 92, "SIM-swap attacks make", DG.dim, 10.5, 400)}
        {label(600, 110, "text codes the weakest", DG.dim, 10.5, 400)}
        {label(600, 128, "second factor", DG.dim, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(2.7)}>
        {box(490, 190, 220, 120, DG.panel, DG.line, 12)}
        {label(600, 216, "true MFA = factors", DG.text, 12)}
        {label(600, 240, "from DIFFERENT", DG.dim, 11, 400)}
        {label(600, 258, "categories", DG.dim, 11, 400)}
        {label(600, 286, "password + PIN ≠ MFA", DG.faint, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Malware / attack lifecycle ───────────────────────────────

function MalwareLifecycle({ accent }: TemplateProps) {
  const stages = [
    { n: "1", t: "Delivery", sub: "phish · USB · drive-by", d: 0.2 },
    { n: "2", t: "Exploit", sub: "runs · gains code exec", d: 0.75 },
    { n: "3", t: "Persistence", sub: "registry run keys · services", d: 1.3 },
    { n: "4", t: "C2 Beacon", sub: "phones home, awaits orders", d: 1.85 },
    { n: "5", t: "Lateral Movement", sub: "spreads with stolen creds", d: 2.4 },
    { n: "6", t: "Actions on Objective", sub: "exfil · encrypt · ransom", d: 2.95 },
  ];
  return (
    <Frame>
      {stages.map((s, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        // Serpentine: row 2 reads right-to-left so the drop arrow lands on
        // C2 Beacon and the chain continues forward (Delivery → … → Actions).
        const x = 150 + (row % 2 === 1 ? 2 - col : col) * 230, y = 90 + row * 150;
        return (
          <motion.g key={s.t} {...fade(s.d)}>
            {box(x - 90, y - 46, 180, 92, DG.panel2, i === 5 ? accent : DG.line, 12, i === 5 ? 2 : 1.5)}
            {label(x - 72, y - 22, s.n, DG.faint, 15)}
            {label(x + 10, y - 20, s.t, i === 5 ? accent : DG.text, 13)}
            {label(x, y + 8, s.sub, DG.dim, 10.5, 400)}
            {label(x, y + 28, "defensible: " + ["email gateway", "patching", "monitor run keys", "beacon detection", "MFA + segmentation", "backups + least privilege"][i], DG.faint, 9.5, 400)}
          </motion.g>
        );
      })}
      {[[240, 90, 380, 90], [380, 136, 610, 136], [610, 136, 610, 240], [610, 286, 380, 286], [380, 240, 150, 240]].map((p, i) => (
        <motion.g key={i} {...fade(1.2 + i * 0.2)}>
          <line x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]} stroke={DG.faint} strokeWidth={1.5} strokeDasharray="3 4" />
        </motion.g>
      ))}
      <motion.g {...fade(3.4)}>
        {label(380, 356, "break ANY one link and the chain fails — defense happens at every stage", accent, 12, 400)}
      </motion.g>
    </Frame>
  );
}

function KillChain({ accent }: TemplateProps) {
  const stages = ["Recon", "Weaponize", "Deliver", "Exploit", "Install", "C2", "Actions"];
  return (
    <Frame>
      <line x1={40} y1={140} x2={720} y2={140} stroke={DG.line} strokeWidth={2} />
      {stages.map((s, i) => {
        const x = 60 + i * 100;
        const detectable = i >= 2;
        return (
          <motion.g key={s} {...fade(0.15 + i * 0.2)}>
            <circle cx={x} cy={140} r={16} fill={DG.panel2} stroke={detectable ? accent : DG.faint} strokeWidth={detectable ? 2 : 1.5} />
            {label(x, 140, String(i + 1), detectable ? accent : DG.faint, 11)}
            {label(x, 172, s, detectable ? accent : DG.dim, 10.5)}
          </motion.g>
        );
      })}
      <circle r={6} fill={accent}>
        <animateMotion dur="6s" repeatCount="indefinite" path="M 60 140 L 660 140" />
      </circle>
      <motion.g {...fade(1.7)}>
        {box(60, 220, 300, 110, DG.panel, DG.line, 10)}
        {label(210, 244, "left of the boom = prevention", accent, 12)}
        {label(210, 268, "recon & weaponization happen", DG.dim, 10.5, 400)}
        {label(210, 286, "on the attacker's turf —", DG.dim, 10.5, 400)}
        {label(210, 304, "threat intel is your only window", DG.dim, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(2.2)}>
        {box(400, 220, 300, 110, accent + "12", accent, 10, 1.5)}
        {label(550, 244, "right of the boom = detection", accent, 12)}
        {label(550, 268, "deliver → actions are observable", DG.dim, 10.5, 400)}
        {label(550, 286, "in YOUR logs — the SOC's home turf", DG.dim, 10.5, 400)}
        {label(550, 304, "detections live here", DG.dim, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Data & infrastructure ────────────────────────────────────

function ConsistentHashing({ accent }: TemplateProps) {
  const nodes = [
    { x: 150, y: 80, t: "shard A" }, { x: 380, y: 60, t: "shard B" }, { x: 610, y: 80, t: "shard C" },
    { x: 150, y: 260, t: "shard D" }, { x: 610, y: 260, t: "shard E" },
  ];
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {box(280, 140, 200, 70, accent + "18", accent, 12, 2)}
        {label(380, 168, "hash(key) % N", accent, 13)}
        {label(380, 190, "deterministic placement", DG.dim, 10, 400)}
      </motion.g>
      {nodes.map((n, i) => (
        <motion.g key={n.t} {...fade(0.3 + i * 0.18)}>
          {box(n.x - 60, n.y - 26, 120, 52, DG.panel2, DG.line, 10)}
          {label(n.x, n.y, n.t, DG.text, 12)}
          <line x1={380} y1={175} x2={n.x} y2={n.y} stroke={DG.faint} strokeWidth={1.2} strokeDasharray="3 4" />
        </motion.g>
      ))}
      <motion.g {...fade(1.5)}>
        {label(380, 320, "add a node → only ~1/N of keys move", DG.dim, 12, 400)}
        {label(380, 344, "that's why resharding doesn't melt the cluster", DG.faint, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

function LoadBalancer({ accent }: TemplateProps) {
  const backends = ["web-1", "web-2", "web-3"];
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {box(60, 130, 150, 80, DG.panel2, DG.line, 10)}
        {label(135, 160, "users", DG.text, 13)}
        {label(135, 184, "many concurrent", DG.dim, 10, 400)}
      </motion.g>
      <motion.g {...fade(0.4)}>
        {box(280, 120, 180, 100, accent + "1c", accent, 12, 2)}
        {label(370, 152, "load balancer", accent, 13)}
        {label(370, 176, "health checks · TLS ·", DG.dim, 10, 400)}
        {label(370, 192, "round-robin / least-conn", DG.dim, 10, 400)}
      </motion.g>
      {backends.map((b, i) => (
        <motion.g key={b} {...fade(0.7 + i * 0.22)}>
          {box(540, 60 + i * 90, 170, 60, DG.panel2, i === 2 ? "#f87171" : DG.line, 10, i === 2 ? 2 : 1.5)}
          {label(625, 82 + i * 90, b, i === 2 ? "#f87171" : DG.text, 12)}
          {label(625, 102 + i * 90, i === 2 ? "failing health check → drained" : "healthy · serving", i === 2 ? "#f87171" : DG.dim, 10, 400)}
          <line x1={460} y1={170} x2={540} y2={90 + i * 90} stroke={DG.faint} strokeWidth={1.3} />
        </motion.g>
      ))}
      <motion.g {...fade(1.6)}>
        {label(370, 260, "one dead backend should be invisible to users", DG.dim, 12, 400)}
        {label(370, 286, "stateless servers make this trivial — sticky sessions make it fragile", DG.faint, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

function DbReplication({ accent }: TemplateProps) {
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {box(80, 140, 180, 100, accent + "1c", accent, 12, 2)}
        {label(170, 172, "primary", accent, 13)}
        {label(170, 194, "accepts all writes", DG.dim, 10.5, 400)}
        {label(170, 214, "WAL → replicas", DG.dim, 10.5, 400)}
      </motion.g>
      {[40, 140, 240].map((y, i) => (
        <motion.g key={y} {...fade(0.6 + i * 0.25)}>
          {box(430, y, 160, 60, DG.panel2, DG.line, 10)}
          {label(510, y + 24, `replica ${i + 1}`, DG.text, 12)}
          {label(510, y + 42, i === 2 ? "lagging · eventual" : "streaming · seconds behind", i === 2 ? "#fbbf24" : DG.dim, 9.5, 400)}
          <line x1={260} y1={190} x2={430} y2={y + 30} stroke={accent} strokeWidth={1.8} strokeDasharray="5 4" />
        </motion.g>
      ))}
      <motion.g {...fade(1.6)}>
        {box(120, 290, 500, 60, DG.panel, DG.line, 10)}
        {label(370, 312, "reads scale horizontally; writes stay single-writer", accent, 12, 400)}
        {label(370, 334, "replica lag is why you read-your-own-writes from the primary", DG.dim, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

function StorageClasses({ accent }: TemplateProps) {
  const rows = [
    { t: "Object (S3)", ms: "10–100 ms", cost: "$", dur: "99.999999999% (11 nines)", use: "backups · media · data lakes" },
    { t: "Block (EBS)", ms: "< 5 ms", cost: "$$", dur: "99.9%", use: "boot disks · databases" },
    { t: "File (EFS)", ms: "< 10 ms", cost: "$$$", dur: "regional", use: "shared configs · CMS media" },
    { t: "Archive (Glacier)", ms: "minutes–hours", cost: "¢", dur: "11 nines", use: "compliance · cold backups" },
  ];
  return (
    <Frame>
      {rows.map((r, i) => (
        <motion.g key={r.t} {...fade(0.15 + i * 0.22)}>
          {box(60, 22 + i * 82, 640, 70, DG.panel2, i === 0 ? accent : DG.line, 10, i === 0 ? 2 : 1.5)}
          {label(85, 50 + i * 82, r.t, i === 0 ? accent : DG.text, 13, 600, "start")}
          {label(85, 72 + i * 82, r.use, DG.dim, 10.5, 400, "start")}
          {label(380, 50 + i * 82, "latency: " + r.ms, DG.text, 11, 400, "start")}
          {label(380, 70 + i * 82, "durability: " + r.dur, DG.dim, 10, 400, "start")}
          {label(670, 55 + i * 82, r.cost, i === 0 ? accent : DG.dim, 14, 700)}
        </motion.g>
      ))}
      <motion.g {...fade(1.3)}>
        {label(380, 362, "durability ≠ availability: S3 never loses it, but can be down", DG.dim, 11.5, 400)}
      </motion.g>
    </Frame>
  );
}

function IamModel({ accent }: TemplateProps) {
  const parts = [
    { t: "User / Role", sub: "identity — who or what", x: 150, y: 70 },
    { t: "Policy", sub: "JSON: allow/deny actions on resources", x: 380, y: 70 },
    { t: "Resource", sub: "bucket · instance · queue", x: 610, y: 70 },
    { t: "Permission boundary", sub: "the ceiling a policy can never exceed", x: 380, y: 200 },
    { t: "Audit (CloudTrail)", sub: "who did what, when, from where", x: 380, y: 310 },
  ];
  return (
    <Frame>
      {parts.map((p, i) => (
        <motion.g key={p.t} {...fade(0.15 + i * 0.28)}>
          {box(p.x - 110, p.y - 36, 220, 72, DG.panel2, i === 1 ? accent : DG.line, 10, i === 1 ? 2 : 1.5)}
          {label(p.x, p.y - 10, p.t, i === 1 ? accent : DG.text, 12.5)}
          {label(p.x, p.y + 14, p.sub, DG.dim, 10, 400)}
        </motion.g>
      ))}
      <motion.g {...fade(1.4)}>
        <line x1={260} y1={70} x2={270} y2={70} stroke={DG.faint} strokeWidth={2} />
        <line x1={490} y1={70} x2={500} y2={70} stroke={DG.faint} strokeWidth={2} />
        <line x1={380} y1={106} x2={380} y2={164} stroke={accent} strokeWidth={1.5} strokeDasharray="4 4" />
        <line x1={380} y1={236} x2={380} y2={274} stroke={DG.faint} strokeWidth={1.5} strokeDasharray="4 4" />
      </motion.g>
      <motion.g {...fade(1.9)}>
        {label(380, 358, "default is DENY — an explicit deny always wins, regardless of allows", accent, 12, 400)}
      </motion.g>
    </Frame>
  );
}

function SharedResponsibility({ accent }: TemplateProps) {
  const rows = [
    { t: "On-prem", you: "everything", cloud: "nothing" },
    { t: "IaaS (EC2)", you: "OS up · data · IAM", cloud: "hardware · building" },
    { t: "PaaS (RDS)", you: "data · users", cloud: "OS · patching · engine" },
    { t: "SaaS (M365)", you: "data · identities", cloud: "everything else" },
  ];
  return (
    <Frame>
      {rows.map((r, i) => (
        <motion.g key={r.t} {...fade(0.15 + i * 0.24)}>
          {box(60, 26 + i * 78, 640, 64, DG.panel2, DG.line, 10, 1.5)}
          {label(95, 50 + i * 78, r.t, DG.text, 13, 600, "start")}
          {label(95, 72 + i * 78, "your job: " + r.you, i === 3 ? accent : DG.dim, 11, 400, "start")}
          {label(660, 58 + i * 78, "cloud's job: " + r.cloud, DG.faint, 10.5, 400, "end")}
        </motion.g>
      ))}
      <motion.g {...fade(1.3)}>
        {box(140, 330, 480, 40, accent + "14", accent, 10, 1.5)}
        {label(380, 350, "the cloud never secures your data — the provider secures the platform", accent, 11.5, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Web / frontend templates ─────────────────────────────────

function RequestLifecycle({ accent }: TemplateProps) {
  const steps = [
    "DNS resolves the hostname → IP",
    "TCP 3-way handshake to port 443",
    "TLS negotiation — encrypted channel",
    "HTTP request: GET / with headers",
    "server renders / queries DB / responds",
    "browser parses HTML → CSSOM + DOM",
    "JS executes → interactive page",
  ];
  return (
    <Frame>
      <motion.g {...fade(0.05)}>
        {box(60, 40, 190, 44, DG.panel2, accent, 10, 2)}
        {label(155, 62, "Browser", accent, 13)}
        {box(510, 40, 190, 44, DG.panel2, DG.line, 10)}
        {label(605, 62, "Web stack", DG.text, 13)}
      </motion.g>
      {steps.map((s, i) => (
        <motion.g key={i} {...fade(0.3 + i * 0.35)}>
          <circle cx={90} cy={110 + i * 36} r={4.5} fill={i < 3 ? "#a78bfa" : accent} />
          <text x={108} y={110 + i * 36} fill={DG.text} fontSize={12} fontWeight={600}
            dominantBaseline="middle">{i + 1}. {s.split(" — ")[0].split(":")[0]}</text>
          {s.includes("—") && (
            <text x={126} y={124 + i * 36} fill={DG.dim} fontSize={10} fontWeight={400}
              dominantBaseline="middle">{s.slice(s.indexOf("—") + 2)}</text>
          )}
        </motion.g>
      ))}
      <motion.g {...fade(2.9)}>
        {box(490, 120, 210, 150, DG.panel, DG.line, 10)}
        {label(595, 148, "typical budget", accent, 11.5)}
        {label(595, 174, "DNS < 50 ms", DG.dim, 10.5, 400, "start")}
        {label(595, 196, "TTFB < 200 ms", DG.dim, 10.5, 400, "start")}
        {label(595, 218, "render < 1 s", DG.dim, 10.5, 400, "start")}
        {label(595, 246, "every 100 ms ≈ 1%", DG.faint, 10, 400, "start")}
        {label(595, 262, "conversion shift", DG.faint, 10, 400, "start")}
      </motion.g>
    </Frame>
  );
}

function CssSpecificity({ accent }: TemplateProps) {
  const levels = [
    { t: "!important", w: "10000", ex: "wins everything — a code smell", color: "#fb7185" },
    { t: "Inline style", w: "1000", ex: 'style="color: red"', color: accent },
    { t: "#id", w: "100", ex: "one per page — avoid in selectors", color: DG.text },
    { t: ".class / :pseudo", w: "10", ex: "your daily driver", color: DG.text },
    { t: "element", w: "1", ex: "type selectors, lowest", color: DG.text },
  ];
  return (
    <Frame>
      {levels.map((l, i) => (
        <motion.g key={l.t} {...fade(0.15 + i * 0.22)}>
          {box(200, 24 + i * 62, 400, 50, DG.panel2, i === 0 ? "#fb7185" : i <= 1 ? accent : DG.line, 10, i <= 1 ? 2 : 1.5)}
          {label(230, 50 + i * 62, l.t, l.color, 13, 600, "start")}
          {label(230, 68 + i * 62, l.ex, DG.dim, 10, 400, "start")}
          {label(570, 55 + i * 62, l.w, DG.faint, 13, 700)}
        </motion.g>
      ))}
      <motion.g {...fade(1.4)}>
        {label(380, 348, "specificity is compared point-by-point — 11 classes still lose to 1 id", DG.dim, 11.5, 400)}
      </motion.g>
    </Frame>
  );
}

function ReactRenderFlow({ accent }: TemplateProps) {
  const stages = [
    { t: "state / props change", sub: "the only things that trigger re-render", y: 60 },
    { t: "render (pure)", sub: "build the virtual DOM — no side effects here", y: 130 },
    { t: "reconcile", sub: "diff old vs new tree — minimal change set", y: 200 },
    { t: "commit", sub: "apply to the real DOM in one pass", y: 270 },
    { t: "effects run", sub: "useEffect — after paint, safe for data", y: 340 },
  ];
  return (
    <Frame>
      {stages.map((s, i) => (
        <motion.g key={s.t} {...fade(0.15 + i * 0.3)}>
          {box(170, s.y - 26, 420, 52, DG.panel2, i === 1 ? accent : DG.line, 10, i === 1 ? 2 : 1.5)}
          {label(380, s.y - 6, s.t, i === 1 ? accent : DG.text, 13)}
          {label(380, s.y + 13, s.sub, DG.dim, 10.5, 400)}
          {i < stages.length - 1 && (
            <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}>
              <line x1={380} y1={s.y + 27} x2={380} y2={s.y + 36} stroke={DG.faint} strokeWidth={1.5} />
              <path d={`M 380 ${s.y + 42} l -5 -8 h 10 z`} fill={DG.faint} />
            </motion.g>
          )}
        </motion.g>
      ))}
    </Frame>
  );
}

function JwtFlow({ accent }: TemplateProps) {
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {box(60, 50, 160, 50, DG.panel2, accent, 10, 2)}
        {label(140, 75, "client", accent, 12.5)}
        {box(540, 50, 160, 50, DG.panel2, DG.line, 10)}
        {label(620, 75, "API server", DG.text, 12.5)}
      </motion.g>
      {[
        { t: "POST /login (credentials)", d: 0.5, lr: true },
        { t: "server verifies + signs JWT", d: 1.1, lr: false },
        { t: "JWT returned (header.payload.signature)", d: 1.7, lr: false },
        { t: "Authorization: Bearer <jwt> on every request", d: 2.3, lr: true },
        { t: "server verifies signature — stateless", d: 2.9, lr: false },
      ].map((s, i) => (
        <motion.g key={i} {...fade(s.d)}>
          <text x={380} y={140 + i * 34} textAnchor="middle" fill={s.lr ? accent : DG.text} fontSize={12} fontWeight={600}>
            {s.lr ? "→ " : ""}{s.t}{s.lr ? "" : " ←"}
          </text>
        </motion.g>
      ))}
      <motion.g {...fade(3.4)}>
        {box(100, 300, 260, 56, DG.panel, DG.line, 10)}
        {label(230, 320, "no session store — any replica", DG.dim, 10.5, 400)}
        {label(230, 340, "can verify the token alone", DG.dim, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(3.7)}>
        {box(400, 300, 260, 56, accent + "12", accent, 10, 1.5)}
        {label(530, 320, "cost: revocation is hard —", accent, 10.5, 400)}
        {label(530, 340, "keep access tokens short-lived", accent, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Ops / observability ──────────────────────────────────────

function ObservabilityPillars({ accent }: TemplateProps) {
  const pillars = [
    { t: "Metrics", sub: "numbers over time", ex: "p99 latency · error rate · QPS", q: "IS something wrong?", d: 0.2 },
    { t: "Logs", sub: "discrete events, rich detail", ex: "request IDs · stack traces", q: "WHAT exactly happened?", d: 0.9 },
    { t: "Traces", sub: "request journey across services", ex: "gateway → auth → db spans", q: "WHERE is the time going?", d: 1.6 },
  ];
  return (
    <Frame>
      {pillars.map((p, i) => (
        <motion.g key={p.t} {...fade(p.d)}>
          {box(70 + i * 220, 40, 190, 210, DG.panel2, DG.line, 12, 1.5)}
          {label(165 + i * 220, 70, p.t, i === 0 ? accent : DG.text, 14)}
          {label(165 + i * 220, 94, p.sub, DG.dim, 10.5, 400)}
          <line x1={90 + i * 220} y1={116} x2={240 + i * 220} y2={116} stroke={DG.faint} strokeWidth={1} />
          {label(165 + i * 220, 140, p.ex, DG.dim, 10, 400)}
          <motion.g animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}>
            {label(165 + i * 220, 200, p.q, accent, 11.5, 600)}
          </motion.g>
        </motion.g>
      ))}
      <motion.g {...fade(2.4)}>
        {box(140, 280, 480, 66, accent + "12", accent, 10, 1.5)}
        {label(380, 302, "alerts fire on metrics → investigate with logs →", accent, 11.5, 400)}
        {label(380, 324, "attribute with traces. That loop is the whole job.", accent, 11.5, 400)}
      </motion.g>
    </Frame>
  );
}

function AlertTriage({ accent }: TemplateProps) {
  const steps = [
    { t: "Alert fires", sub: "which rule, what threshold, how long", d: 0.15 },
    { t: "Validate", sub: "real signal or flapping / duplicate?", d: 0.7 },
    { t: "Scope", sub: "one host or fleet? one user or all?", d: 1.25 },
    { t: "Assess impact", sub: "CIA affected? data at risk?", d: 1.8 },
    { t: "Contain / escalate", sub: "isolate, block, page the owner", d: 2.35 },
    { t: "Document", sub: "timeline now — memory lies later", d: 2.9 },
  ];
  return (
    <Frame>
      {steps.map((s, i) => (
        <motion.g key={s.t} {...fade(s.d)}>
          {box(110, 22 + i * 54, 420, 46, DG.panel2, i === 4 ? accent : DG.line, 10, i === 4 ? 2 : 1.5)}
          <circle cx={135} cy={45 + i * 54} r={11} fill={i === 4 ? accent + "26" : DG.panel} stroke={i === 4 ? accent : DG.faint} />
          {label(135, 45 + i * 54, String(i + 1), i === 4 ? accent : DG.dim, 11)}
          {label(165, 39 + i * 54, s.t, i === 4 ? accent : DG.text, 12.5, 600, "start")}
          {label(165, 57 + i * 54, s.sub, DG.dim, 10.5, 400, "start")}
        </motion.g>
      ))}
      <motion.g {...fade(3.3)}>
        {box(560, 60, 150, 220, accent + "0e", accent, 12, 1.5)}
        {label(635, 90, "the clock", accent, 12)}
        {label(635, 118, "ack ≤ 5 min", DG.dim, 10.5, 400)}
        {label(635, 142, "triage ≤ 15 min", DG.dim, 10.5, 400)}
        {label(635, 166, "escalate when", DG.dim, 10.5, 400)}
        {label(635, 184, "unsure — never", DG.dim, 10.5, 400)}
        {label(635, 202, "investigate alone", DG.dim, 10.5, 400)}
        {label(635, 240, "M.ttD > M.ttC", DG.faint, 11, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Ops / observability ──────────────────────────────────────

// Generic horizontal ladder — SOC tiers, career rungs, precedence.
function TierLadder({ accent, labels }: TemplateProps) {
  const stages = labels && labels.length >= 2 ? labels.slice(0, 6) : ["Tier 1", "Tier 2", "Tier 3"];
  const n = stages.length;
  const step = 620 / (n - 1);
  return (
    <Frame>
      <line x1={70} y1={120} x2={690} y2={120} stroke={DG.line} strokeWidth={2} />
      {stages.map((s, i) => {
        const x = 70 + i * step;
        return (
          <motion.g key={s} {...fade(0.15 + i * 0.22)}>
            {box(x - 58, 72, 116, 92, DG.panel2, i === n - 1 ? accent : DG.line, 10, i === n - 1 ? 2 : 1.5)}
            {label(x, 100, String(i + 1), i === n - 1 ? accent : DG.faint, 14)}
            {label(x, 126, s, i === n - 1 ? accent : DG.text, 11)}
          </motion.g>
        );
      })}
      <circle r={6} fill={accent}>
        <animateMotion dur="4s" repeatCount="indefinite" path={`M 70 120 L 690 120`} />
      </circle>
      <motion.g {...fade(1.6)}>
        {label(380, 240, "each rung adds context and authority — escalate with evidence, not emotion", accent, 12, 400)}
        {label(380, 262, "the ladder is a chain of trust: every step hands over more information than it received", DG.dim, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(2.1)}>
        {box(140, 290, 480, 52, DG.panel, DG.line, 10)}
        {label(380, 316, "move fast where it's cheap (Tier 1), dig deep where it's expensive (Tier 3)", DG.dim, 11, 400)}
      </motion.g>
    </Frame>
  );
}

// Generic labeled card grid — OWASP categories, compose services, anatomy maps.
function LabelGrid({ accent, labels }: TemplateProps) {
  const items = labels && labels.length > 0 ? labels.slice(0, 10) : ["Item A", "Item B", "Item C", "Item D", "Item E"];
  return (
    <Frame>
      {items.map((it, i) => {
        const col = i % 5, row = Math.floor(i / 5);
        const x = 64 + col * 132, y = 84 + row * 116;
        return (
          <motion.g key={it} {...fade(0.15 + i * 0.13)}>
            {box(x, y, 122, 88, DG.panel2, i === 0 ? accent : DG.line, 10, i === 0 ? 2 : 1.5)}
            {label(x + 61, y + 44, it, i === 0 ? accent : DG.text, 10.5)}
          </motion.g>
        );
      })}
      <motion.g {...fade(1.3)}>
        {label(380, 336, "a map, not a checklist — know what each piece is for and how they connect", accent, 11.5, 400)}
      </motion.g>
    </Frame>
  );
}

// Container shipping lane: Dockerfile → image → registry → runtime.
function ContainerShip({ accent }: TemplateProps) {
  const stops = [
    { x: 95, t: "Dockerfile", sub: "app + deps" },
    { x: 270, t: "Image", sub: "read-only layers" },
    { x: 445, t: "Registry", sub: "shared artifact store" },
    { x: 640, t: "Runtime", sub: "isolated container" },
  ];
  return (
    <Frame>
      {stops.map((s, i) => (
        <motion.g key={s.t} {...fade(0.12 + i * 0.22)}>
          {box(s.x - 62, 140, 124, 72, DG.panel2, i === 0 || i === 3 ? accent : DG.line, 10, i === 0 || i === 3 ? 2 : 1.5)}
          {label(s.x, 164, s.t, i === 0 || i === 3 ? accent : DG.text, 12.5)}
          {label(s.x, 188, s.sub, DG.dim, 10, 400)}
        </motion.g>
      ))}
      {[157, 332, 507].map((x, i) => (
        <motion.g key={x} {...fade(0.9 + i * 0.2)}>
          <line x1={x} y1={176} x2={x + 20} y2={176} stroke={DG.line} strokeWidth={2} />
          <circle r={5} fill={accent}>
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.25}s`} path={`M ${x} 176 L ${x + 22} 176`} />
          </circle>
        </motion.g>
      ))}
      <motion.g {...fade(1.7)}>
        {label(380, 90, "build once, ship the exact same artifact to every environment", DG.dim, 12, 400)}
        {label(380, 110, "the registry is the contract between build and run — version, sign, pin it", DG.faint, 11, 400)}
      </motion.g>
      <motion.g {...fade(2.4)}>
        {box(140, 260, 480, 66, DG.panel, DG.line, 10)}
        {label(380, 284, "'works on my machine' dies here", accent, 12, 400)}
        {label(380, 306, "one image = one behavior, from laptop to production", DG.dim, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

// Kubernetes: kubectl → control plane → worker nodes with pods.
function K8sCluster({ accent }: TemplateProps) {
  const nodes = [
    { x: 200, pods: ["pod", "pod", "pod"] },
    { x: 470, pods: ["pod", "pod", "pod"] },
  ];
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {box(30, 34, 110, 52, DG.panel2, accent, 10, 2)}
        {label(85, 60, "kubectl", accent, 12)}
        {label(85, 76, "desired state", DG.dim, 9.5, 400)}
      </motion.g>
      <motion.g {...fade(0.35)}>
        {box(180, 30, 520, 60, accent + "16", accent, 10, 2)}
        {label(440, 52, "Control plane — API · scheduler · controller manager", accent, 12)}
        {label(440, 74, "the brain: reconciles reality toward what you declared", DG.dim, 10, 400)}
      </motion.g>
      {nodes.map((nd, ni) => (
        <motion.g key={nd.x} {...fade(0.7 + ni * 0.25)}>
          {box(nd.x - 110, 140, 220, 160, DG.panel2, DG.line, 12, 1.5)}
          {label(nd.x, 164, `Worker node ${ni + 1}`, DG.text, 12)}
          {nd.pods.map((p, pi) => (
            <motion.g key={pi} {...fade(1.0 + ni * 0.25 + pi * 0.18)}>
              {box(nd.x - 78 + pi * 58, 184, 48, 42, DG.panel, pi === 0 ? accent : DG.line, 8, pi === 0 ? 1.5 : 1)}
              {label(nd.x - 54 + pi * 58, 205, `${p}${ni * 3 + pi + 1}`, pi === 0 ? accent : DG.dim, 9)}
            </motion.g>
          ))}
          {label(nd.x, 310, "kubelet runs the pods, keeps them alive", DG.faint, 9.5, 400)}
        </motion.g>
      ))}
      <motion.g {...fade(2.2)}>
        <line x1={145} y1={60} x2={180} y2={60} stroke={accent} strokeWidth={2} strokeDasharray="5 4" />
        <line x1={440} y1={90} x2={200} y2={140} stroke={DG.faint} strokeWidth={1.5} strokeDasharray="4 4" />
        <line x1={440} y1={90} x2={470} y2={140} stroke={DG.faint} strokeWidth={1.5} strokeDasharray="4 4" />
        {label(280, 118, "declarative: you say what, it figures out how", DG.dim, 10.5, 400)}
      </motion.g>
      <motion.g {...fade(2.7)}>
        {box(150, 332, 460, 40, accent + "14", accent, 10, 1.5)}
        {label(380, 352, "if a pod dies, the controller makes a new one — self-healing by design", accent, 11, 400)}
      </motion.g>
    </Frame>
  );
}

// Testing pyramid — many fast unit tests, few slow end-to-end tests.
function TestPyramid({ accent }: TemplateProps) {
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        <polygon points="345,36 415,36 452,86 308,86" fill={accent + "2e"} stroke={accent} strokeWidth={2} />
        {label(380, 61, "E2E", accent, 12)}
      </motion.g>
      <motion.g {...fade(0.5)}>
        <polygon points="298,86 462,86 528,158 232,158" fill={DG.panel2} stroke={DG.line} strokeWidth={1.5} />
        {label(380, 122, "Integration", DG.text, 12)}
      </motion.g>
      <motion.g {...fade(0.9)}>
        <polygon points="222,158 538,158 620,264 140,264" fill={DG.panel2} stroke={DG.line} strokeWidth={1.5} />
        {label(380, 211, "Unit", DG.text, 13)}
      </motion.g>
      <motion.g {...fade(1.5)}>
        {label(560, 70, "few · slow · flaky —", DG.dim, 10.5, 400, "start")}
        {label(560, 88, "catch the wiring, not the logic", DG.dim, 10.5, 400, "start")}
        {label(560, 205, "many · fast · isolated —", DG.dim, 10.5, 400, "start")}
        {label(560, 223, "the safety net you actually run", DG.dim, 10.5, 400, "start")}
      </motion.g>
      <motion.g {...fade(2.1)}>
        {box(120, 296, 520, 54, accent + "14", accent, 10, 1.5)}
        {label(380, 318, "run the pyramid, not the iceberg — feedback speed is a feature", accent, 12, 400)}
        {label(380, 338, "an hour of CI time that nobody watches is not a test suite", DG.dim, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

// WebSocket: HTTP upgrade handshake then a persistent full-duplex channel.
function WebSocketFlow({ accent }: TemplateProps) {
  return (
    <Frame>
      <motion.g {...fade(0.1)}>
        {box(60, 120, 170, 62, DG.panel2, accent, 10, 2)}
        {label(145, 145, "Client", accent, 13)}
        {label(145, 166, "browser · app", DG.dim, 10, 400)}
        {box(530, 120, 170, 62, DG.panel2, DG.line, 10)}
        {label(615, 145, "Server", DG.text, 13)}
        {label(615, 166, "Socket.io · ws", DG.dim, 10, 400)}
      </motion.g>
      <motion.g {...fade(0.5)}>
        <motion.line x1={230} y1={140} x2={530} y2={140} stroke={accent} strokeWidth={2} strokeDasharray="6 5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
        {label(380, 124, "HTTP Upgrade request → 101 Switching Protocols", accent, 11.5)}
      </motion.g>
      <motion.g {...fade(1.3)}>
        <line x1={230} y1={190} x2={530} y2={190} stroke={DG.faint} strokeWidth={1.5} strokeDasharray="4 5" />
        {label(380, 210, "client frames →", DG.dim, 10.5, 400)}
        {label(380, 228, "chat · votes · cursor moves", DG.faint, 10, 400)}
      </motion.g>
      <motion.g {...fade(1.9)}>
        <line x1={530} y1={222} x2={230} y2={222} stroke={accent} strokeWidth={1.5} strokeDasharray="4 5" />
        {label(380, 242, "← server frames", DG.dim, 10.5, 400)}
        {label(380, 260, "push · broadcast · live updates", DG.faint, 10, 400)}
      </motion.g>
      <motion.g {...fade(2.5)}>
        {box(150, 288, 460, 60, accent + "12", accent, 10, 1.5)}
        {label(380, 310, "one TCP connection, full-duplex — no polling, no re-handshake", accent, 11.5, 400)}
        {label(380, 332, "HTTP for documents, WebSockets for live conversations", DG.dim, 10.5, 400)}
      </motion.g>
    </Frame>
  );
}

// ── Registry ─────────────────────────────────────────────────

export const SVG_TEMPLATES: Record<string, (p: TemplateProps) => ReactNode> = {
  osi: OsiStack,
  tcp: TcpHandshake,
  packet: PacketJourney,
  defense: DefenseInDepth,
  dmz: DmzTraffic,
  tls: TlsHandshake,
  cicd: CiCdPipeline,
  inc: IcPipeline,
  loop: CircularLoop,
  symvsym: SymmetricVsAsymmetric,
  hashenc: HashVsEncrypt,
  factors: ThreeFactorAuth,
  malware: MalwareLifecycle,
  killchain: KillChain,
  hashring: ConsistentHashing,
  loadbal: LoadBalancer,
  replication: DbReplication,
  storage: StorageClasses,
  iam: IamModel,
  sharedresp: SharedResponsibility,
  request: RequestLifecycle,
  specificity: CssSpecificity,
  reactflow: ReactRenderFlow,
  jwt: JwtFlow,
  obs: ObservabilityPillars,
  triage: AlertTriage,
  tiers: TierLadder,
  grid: LabelGrid,
  container: ContainerShip,
  k8s: K8sCluster,
  pyramid: TestPyramid,
  ws: WebSocketFlow,
};

export function renderSvgTemplate(name: string, accent: AccentColor, labels: string[] | undefined, elapsed: number): ReactNode {
  const t = SVG_TEMPLATES[name];
  if (!t) {
    return (
      <Frame>
        {label(380, 190, `missing template: ${name}`, "#fb7185", 13)}
      </Frame>
    );
  }
  return t({ accent: ACCENTS[accent] ?? ACCENTS.cyan, labels, elapsed });
}
