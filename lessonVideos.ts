// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Lesson Video Scripts
// Deep e-learning narration for every video lesson. Scenes auto-
// pace from their narration at ~144 wpm (lessonVideos/core.ts).
// Re-exported for compatibility with earlier imports.
// ──────────────────────────────────────────────────────────────

export * from "./lessonVideos/core";

import { deepNF } from "./lessonVideos/nf";
import { deepLF } from "./lessonVideos/lf";
import { deepCF } from "./lessonVideos/cf";
import { deepSO } from "./lessonVideos/soc";
import { deepTI } from "./lessonVideos/ti";
import { deepWF } from "./lessonVideos/web";
import { deepRF } from "./lessonVideos/react";
import { deepNode as deepNB, deepCapstone as deepFC } from "./lessonVideos/node";
import { deepCloud as deepCFND } from "./lessonVideos/cloud";
import { deepTerraform as deepTF } from "./lessonVideos/tf";
import { deepContainers as deepCT } from "./lessonVideos/ct";
import { deepDevOps as deepDO } from "./lessonVideos/do";

import type { LessonVideoScript } from "./lessonVideos/core";
import { enrichScript, lessonOrder } from "./lessonVideos/enrich";

// ════════════════════════════════════════════════════════════════
// Registry
// ════════════════════════════════════════════════════════════════

const ALL: LessonVideoScript[] = [
  ...deepNF, ...deepLF, ...deepCF, ...deepSO, ...deepTI,
  ...deepWF, ...deepRF, ...deepNB, ...deepFC,
  ...deepCFND, ...deepTF, ...deepCT, ...deepDO,
];

// Derive courseId from the lesson-id prefix where authors omitted it.
const COURSE_BY_PREFIX: Record<string, string> = {
  "les-nf-": "course-net-fundamentals",
  "les-lf-": "course-linux-fundamentals",
  "les-cf-": "course-cyber-fundamentals",
  "les-so-": "course-soc-operations",
  "l-ti-": "course-threat-intel",
  "les-wf-": "course-web-fundamentals",
  "les-rf-": "course-react-frontend",
  "les-nb-": "course-node-backend",
  "les-fc-": "course-fullstack-project",
  "les-cfnd-": "course-cloud-foundations",
  "les-tf-": "course-terraform",
  "les-ct-": "course-containers",
  "les-do-": "course-devops-pipeline",
};

function withCourse(script: LessonVideoScript): LessonVideoScript {
  const prefix = Object.keys(COURSE_BY_PREFIX).find((p) => script.lessonId.startsWith(p));
  return { ...script, courseId: script.courseId ?? (prefix ? COURSE_BY_PREFIX[prefix] : "") };
}

// Auto-enrichment: every script gets a spaced-repetition review of the
// previous lesson plus a closing glossary scene, computed from course order.
const BY_COURSE: Record<string, LessonVideoScript[]> = {};
for (const s of ALL) {
  const cid = withCourse(s).courseId ?? "";
  (BY_COURSE[cid] ??= []).push(s);
}
for (const list of Object.values(BY_COURSE)) {
  list.sort((a, b) => {
    const oa = lessonOrder(a.lessonId);
    const ob = lessonOrder(b.lessonId);
    return oa[0] - ob[0] || oa[1] - ob[1];
  });
}

export const LESSON_VIDEOS: Record<string, LessonVideoScript> = Object.fromEntries(
  ALL.map((s) => {
    const withId = withCourse(s);
    return [s.lessonId, enrichScript(withId, BY_COURSE[withId.courseId ?? ""] ?? [withId])];
  })
);

export function getLessonVideo(lessonId: string): LessonVideoScript | undefined {
  return LESSON_VIDEOS[lessonId];
}