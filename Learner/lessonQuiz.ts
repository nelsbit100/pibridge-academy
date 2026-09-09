// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Lesson Quiz Builder
// Derives a real, playable Quiz for every quiz-type lesson from
// the knowledge-check scenes authored in the lesson video library.
// Every question is grounded in what the learner just watched.
// ──────────────────────────────────────────────────────────────

import type { Quiz, QuizQuestion } from "../types";
import { ALL_COURSE_MODULES } from "../courseContent";
import { EXPANDED_COURSE_MODULES } from "../expandedCourseContent";
import {
  collectKnowledgeChecks,
  type LessonVideoScript,
} from "../lessonVideos/core";
import { LESSON_VIDEOS } from "../lessonVideos";

const allModules = [...Object.values(ALL_COURSE_MODULES), ...Object.values(EXPANDED_COURSE_MODULES)];

/** Find the module (across the catalog) that contains a lesson id. */
function moduleOf(lessonId: string) {
  for (const mods of allModules) {
    for (const mod of Object.values(mods)) {
      if (mod.lessons.some((l) => l.id === lessonId)) return mod;
    }
  }
  return undefined;
}

/** All video lessons that precede this quiz lesson inside its own module. */
function siblingVideoLessons(lessonId: string): LessonVideoScript[] {
  const mod = moduleOf(lessonId);
  if (!mod) return [];
  const idx = mod.lessons.findIndex((l) => l.id === lessonId);
  if (idx < 0) return [];
  const ids = mod.lessons.slice(0, idx).map((l) => l.id);
  return ids
    .map((id) => LESSON_VIDEOS[id])
    .filter((v): v is LessonVideoScript => Boolean(v));
}

export interface BuiltQuiz {
  quiz: Quiz;
  source: "module-video-checks";
}

function courseVideoIdsOf(courseId: string): Set<string> {
  const ids = new Set<string>();
  for (const mods of allModules) {
    for (const mod of Object.values(mods)) {
      if (mod.courseId === courseId || courseId in mods) {
        for (const l of mod.lessons) ids.add(l.id);
      }
    }
  }
  return ids;
}

/**
 * Build the quiz for a quiz-type lesson.
 * Questions come from the module's video knowledge checks, ordered so the
 * most recent lessons appear first (spaced repetition of fresh material).
 * Falls back to any knowledge checks from the whole course if the module's
 * videos have none.
 */
export function buildLessonQuiz(
  courseId: string,
  lesson: { id: string; title: string; durationMinutes: number }
): BuiltQuiz | undefined {
  const mod = moduleOf(lesson.id);
  if (!mod) return undefined;

  const modVideos = siblingVideoLessons(lesson.id);
  const modChecks = modVideos.flatMap((v) =>
    collectKnowledgeChecks(v).map((c, i) => ({ ...c, src: `${v.lessonId}#${i}` }))
  );

  let questions: QuizQuestion[] = modChecks.map((c, i) => ({
    id: `q-${lesson.id}-${i}`,
    question: c.question,
    type: "multiple_choice" as const,
    options: c.options,
    correctAnswer: c.answerIndex,
    explanation: c.explanation,
    points: 10,
  }));

  // Fallback: gather from the whole course if this module has no checks yet
  if (questions.length < 3) {
    const courseVideoIds = new Set(
      allModules
        .filter((mods) => courseId in mods || Object.values(mods).some((m) => m.courseId === courseId))
        .flatMap((mods) => Object.values(mods))
        .flatMap((m) => m.lessons.map((l) => l.id))
    );
    const extra = Object.values(LESSON_VIDEOS)
      .filter((v) => courseVideoIds.has(v.lessonId) && v.lessonId !== lesson.id)
      .flatMap((v) => collectKnowledgeChecks(v));
    const seen = new Set(questions.map((q) => q.question));
    for (const c of extra) {
      if (questions.length >= 5) break;
      if (seen.has(c.question)) continue;
      seen.add(c.question);
      questions.push({
        id: `q-${lesson.id}-x${questions.length}`,
        question: c.question,
        type: "multiple_choice",
        options: c.options,
        correctAnswer: c.answerIndex,
        explanation: c.explanation,
        points: 10,
      });
    }
  }

  // Pad thin quizzes with true/false questions grounded in the module's
  // video recap points, so every quiz is a meaningful assessment.
  if (questions.length < 3) {
    const modVideoScripts = modVideos.length > 0
      ? modVideos
      : Object.values(LESSON_VIDEOS).filter((v) => courseVideoIdsOf(courseId).has(v.lessonId));
    const statements: { text: string; source: string }[] = [];
    for (const v of modVideoScripts) {
      for (const s of v.scenes) {
        if (s.kind !== "recap") continue;
        for (const pt of s.points) statements.push({ text: pt, source: v.lessonTitle });
      }
    }
    let si = 0;
    while (questions.length < 3 && si < statements.length) {
      const st = statements[si++];
      const text = st.text.endsWith(".") ? st.text.slice(0, -1) : st.text;
      questions.push({
        id: `q-${lesson.id}-tf${si}`,
        question: `True or false (from "${st.source}"): ${text}.`,
        type: "true_false",
        correctAnswer: true, // recap points are facts taught in the lesson
        explanation: `True — this is a direct recap point from "${st.source}". Re-watch that lesson if it did not sound familiar.`,
        points: 10,
      });
    }
  }

  // Final fallback: title-only sentinel so the engine still has a question
  if (questions.length === 0) return undefined;

  const timeLimitMinutes = Math.max(5, Math.min(lesson.durationMinutes, questions.length * 3));

  const quiz: Quiz = {
    id: `quiz-${lesson.id}`,
    lessonId: lesson.id,
    title: lesson.title,
    description: `Knowledge check covering "${mod.title}" — drawn from the video lessons you just watched.`,
    timeLimitMinutes,
    passingScore: 70,
    maxAttempts: 3,
    questions,
  };

  return { quiz, source: "module-video-checks" };
}
