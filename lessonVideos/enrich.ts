// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Lesson Video Auto-Enrichment
// Applies two documented e-learning practices to every script:
//   1. Spaced-repetition review — a retrieval-practice quiz drawn
//      from the PREVIOUS lesson in the same course (testing effect).
//   2. Glossary consolidation — all key terms restated together
//      before the recap (vocabulary lock-in before assessment).
// Inserted before the closing recap so lessons always end on the
// summary. Runs at build-of-registry time, so authored files stay
// clean and every lesson meets the same structure standard.
// ──────────────────────────────────────────────────────────────

import {
  collectKnowledgeChecks,
  type LessonVideoScript,
  type VideoScene,
  type KeyTermsSceneData,
  type QuizSceneData,
  type RowsSceneData,
} from "./core";

/** Derive ordering key from a lesson id like "les-nf-3-2" (module 3, lesson 2). */
function lessonOrder(lessonId: string): [number, number] {
  const m = lessonId.match(/(\d+)-(\d+)\s*$/);
  if (!m) return [0, 0];
  return [parseInt(m[1], 10), parseInt(m[2], 10)];
}

function isGlossary(s: VideoScene): boolean {
  return s.kind === "keyterms" && (s as KeyTermsSceneData).heading === "Glossary — say it back";
}

/**
 * Build the glossary scene from a script's own key-term scenes.
 * Returns undefined when the script has fewer than 3 unique terms.
 */
function glossaryScene(script: LessonVideoScript): KeyTermsSceneData | undefined {
  if (script.scenes.some(isGlossary)) return undefined;
  const seen = new Set<string>();
  const terms: KeyTermsSceneData["terms"] = [];
  for (const s of script.scenes) {
    if (s.kind !== "keyterms") continue;
    for (const t of s.terms) {
      const key = t.term.toLowerCase();
      if (seen.has(key) || terms.length >= 6) continue;
      seen.add(key);
      terms.push(t);
    }
  }
  if (terms.length < 3) return undefined;
  return {
    kind: "keyterms",
    heading: "Glossary — say it back",
    terms,
    lines: [
      "Before we wrap up, lock in the language of this lesson — these are the terms you should be able to define from memory.",
      "Pause on each one and say the definition back in your own words. Teaching it aloud is the fastest way to make it stick.",
      "You will meet these terms again in the module quiz, the final assessment, and on the job.",
    ],
  };
}

/**
 * Build the spaced-repetition scene from the previous video lesson
 * in the same course. Returns undefined when there is no predecessor
 * or the predecessor has no knowledge checks.
 */
function reviewScene(
  script: LessonVideoScript,
  courseOrder: LessonVideoScript[]
): QuizSceneData | undefined {
  const idx = courseOrder.findIndex((s) => s.lessonId === script.lessonId);
  if (idx <= 0) return undefined;
  const prev = courseOrder[idx - 1];
  const checks = collectKnowledgeChecks(prev);
  if (checks.length === 0) return undefined;
  // Take the check closest to the end of the previous lesson (freshest)
  const check = checks[checks.length - 1];
  return {
    kind: "quiz",
    heading: "Spaced review",
    question: check.question,
    options: check.options,
    answerIndex: check.answerIndex,
    explanation: `From the previous lesson (${prev.lessonTitle}). ${check.explanation}`,
    lines: [
      "Quick retrieval check from the previous lesson — commit to an answer before I reveal it.",
      "Retrieval practice like this is what turns exposure into durable knowledge. Hold onto it.",
    ],
  };
}

/**
 * First lesson of a course has no predecessor to review — give it a
 * course roadmap scene (what the remaining modules cover) instead.
 */
function roadmapScene(
  script: LessonVideoScript,
  courseOrder: LessonVideoScript[]
): RowsSceneData | undefined {
  if (courseOrder.length < 2) return undefined;
  if (courseOrder[0].lessonId !== script.lessonId) return undefined;
  const currentModule = lessonOrder(script.lessonId)[0];
  const byModule = new Map<number, LessonVideoScript[]>();
  for (const s of courseOrder) {
    const [m] = lessonOrder(s.lessonId);
    if (!byModule.has(m)) byModule.set(m, []);
    byModule.get(m)!.push(s);
  }
  const rows: RowsSceneData["rows"] = [...byModule.entries()]
    .filter(([m]) => m > currentModule)
    .sort(([a], [b]) => a - b)
    .slice(0, 4)
    .map(([m, lessons]) => ({
      label: `Module ${m}: ${lessons[0].lessonTitle}`,
      detail: `${lessons.length} lesson${lessons.length > 1 ? "s" : ""} building on what you learn today`,
      color: "cyan" as const,
    }));
  if (rows.length === 0) return undefined;
  return {
    kind: "rows",
    heading: "Where this course takes you",
    subtitle: "The road ahead — each module builds on the last",
    rows,
    lines: [
      "Here is the road ahead. Each module stacks new skills on the foundation you are building right now.",
      "Keep this map in mind as you learn — knowing where each idea is going makes it far easier to remember.",
      "When you finish this module, the next one picks up exactly where we leave off.",
    ],
  };
}

/**
 * Return an enriched copy of the script with review (or roadmap, for
 * first lessons) + glossary scenes inserted before the closing recap.
 */
export function enrichScript(
  script: LessonVideoScript,
  courseOrder: LessonVideoScript[]
): LessonVideoScript {
  const review = reviewScene(script, courseOrder) ?? roadmapScene(script, courseOrder);
  const glossary = glossaryScene(script);
  const additions: VideoScene[] = [];
  if (review) additions.push(review);
  if (glossary) additions.push(glossary);
  if (additions.length === 0) return script;

  const scenes = [...script.scenes];
  // Recap is authored last; insert additions just before it. When the
  // final scene is not a recap (rare), append instead.
  const insertAt = scenes.length > 0 && scenes[scenes.length - 1].kind === "recap"
    ? scenes.length - 1
    : scenes.length;
  scenes.splice(insertAt, 0, ...additions);
  return { ...script, scenes };
}

export { lessonOrder };
