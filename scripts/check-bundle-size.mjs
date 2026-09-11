// Bundle-size budget check. Fails (exit 1) if any built chunk exceeds its
// budget, so code-splitting regressions can't silently ship. Run after
// `vite build`. Budgets are in kB (1 kB = 1000 bytes, matching Vite's output).
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist/assets";

// Per-chunk budgets. `vendor` is the largest (React, framer-motion, lucide).
// App/lazy chunks stay far below these today; the budgets guard regressions.
const BUDGETS = {
  vendor: 400,
  index: 250,
  // 289 kB today: the shared deepening engine (walkthroughs, pitfalls, war
  // stories for all 72 lessons). Pure data, 99 kB gzipped, loaded lazily with
  // the course player — not on first paint.
  "lesson-scripts": 300,
};

// Any other chunk (lazy views, per-course lesson data, player) must stay
// under this default limit.
const DEFAULT_BUDGET = 250;

function kb(bytes) {
  return Math.round(bytes / 1000);
}

let failed = false;
for (const file of readdirSync(DIST)) {
  if (!file.endsWith(".js")) continue;
  // Drop only the trailing content-hash segment (e.g. "lesson-scripts-Dxt5nKrc"
  // → "lesson-scripts"), not everything from the first hyphen.
  const chunk = file.replace(/\.js$/, "").split("-").slice(0, -1).join("-");
  const limit = BUDGETS[chunk] ?? DEFAULT_BUDGET;
  const size = kb(readFileSync(join(DIST, file)).length);
  const status = size > limit ? "OVER" : "ok";
  if (size > limit) failed = true;
  console.log(`${status.padEnd(4)} ${String(size).padStart(4)} kB / ${limit} kB  ${file}`);
}

if (failed) {
  console.error("\n✗ Bundle budget exceeded — a chunk grew past its limit.");
  console.error("  If this is intentional, raise the budget in scripts/check-bundle-size.mjs with justification.");
  process.exit(1);
} else {
  console.log("\n✓ All chunks within budget.");
}
