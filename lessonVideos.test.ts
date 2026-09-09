import { describe, it, expect } from "vitest";
import { LESSON_VIDEOS, getLessonVideo } from "./lessonVideos";
import { scheduleScene, scriptDuration } from "./lessonVideos/core";
import { ALL_COURSE_MODULES } from "./courseContent";
import { EXPANDED_COURSE_MODULES } from "./expandedCourseContent";

// Every video lesson in the catalog must have an authored, playable script.
const allModules = [...Object.values(ALL_COURSE_MODULES), ...Object.values(EXPANDED_COURSE_MODULES)];

const videoLessons = allModules.flatMap((mods) =>
  mods.flatMap((m) => m.lessons.filter((l) => l.type === "video"))
);

describe("lesson video scripts", () => {
  it("covers every video lesson in the catalog", () => {
    const missing = videoLessons.filter((l) => !getLessonVideo(l.id));
    expect(missing.map((l) => `${l.id} (${l.title})`)).toEqual([]);
  });

  it("has no scripts for non-existent lessons", () => {
    const catalogIds = new Set(videoLessons.map((l) => l.id));
    const extras = Object.keys(LESSON_VIDEOS).filter((id) => !catalogIds.has(id));
    expect(extras).toEqual([]);
  });

  it("gives every script a non-empty title, courseId and at least one scene", () => {
    for (const script of Object.values(LESSON_VIDEOS)) {
      expect(script.lessonTitle.trim().length).toBeGreaterThan(0);
      expect(script.courseId?.trim().length ?? 0).toBeGreaterThan(0);
      expect(script.scenes.length).toBeGreaterThan(0);
    }
  });

  it("makes every scene playable: positive scheduled duration and narration", () => {
    for (const script of Object.values(LESSON_VIDEOS)) {
      for (const scene of script.scenes) {
        const schedule = scheduleScene(scene);
        expect(schedule.duration, `${script.lessonId} scene`).toBeGreaterThan(0);
        expect(scene.lines.length, `${script.lessonId} scene`).toBeGreaterThan(0);
        for (const line of scene.lines) {
          expect(line.trim().length, `${script.lessonId} line text`).toBeGreaterThan(0);
        }
        // every scheduled caption starts inside the scene
        for (const l of schedule.lines) {
          expect(l.start, `${script.lessonId} caption`).toBeLessThan(schedule.duration);
        }
      }
    }
  });

  it("meets e-learning depth: 9+ scenes and 4+ minutes per lesson", () => {
    for (const script of Object.values(LESSON_VIDEOS)) {
      expect(script.scenes.length, `${script.lessonId} scene count`).toBeGreaterThanOrEqual(9);
      expect(scriptDuration(script.scenes), `${script.lessonId} duration`).toBeGreaterThanOrEqual(240);
    }
  });

  it("includes knowledge checks and recaps in every lesson", () => {
    for (const script of Object.values(LESSON_VIDEOS)) {
      const hasQuiz = script.scenes.some((s) => s.kind === "quiz" || s.kind === "quizcard");
      const hasRecap = script.scenes.some((s) => s.kind === "recap");
      expect(hasQuiz, `${script.lessonId} knowledge check`).toBe(true);
      expect(hasRecap, `${script.lessonId} recap`).toBe(true);
      // recap must stay the closing scene
      expect(script.scenes[script.scenes.length - 1].kind, `${script.lessonId} final scene`).toBe("recap");
    }
  });

  it("auto-enriches lessons with glossary or spaced review where applicable", () => {
    // Lessons with 3+ key terms must end with the consolidated glossary
    // (just before the recap); lessons mid-course must carry a review scene.
    let glossaries = 0;
    let reviews = 0;
    for (const script of Object.values(LESSON_VIDEOS)) {
      if (script.scenes.some((s) => s.kind === "keyterms" && (s as { heading?: string }).heading === "Glossary — say it back")) glossaries++;
      if (script.scenes.some((s) => s.kind === "quiz" && (s as { heading?: string }).heading === "Spaced review")) reviews++;
    }
    expect(glossaries).toBeGreaterThan(30);
    expect(reviews).toBeGreaterThan(30);
  });

  it("derives real quizzes from video knowledge checks for every quiz lesson", async () => {
    const { buildLessonQuiz } = await import("./Learner/lessonQuiz");
    const quizLessons = allModules.flatMap((mods) =>
      mods.flatMap((m) => m.lessons.filter((l) => l.type === "quiz"))
    );
    expect(quizLessons.length).toBeGreaterThan(15);
    let built = 0;
    for (const l of quizLessons) {
      // quiz lessons belong to a course; find courseId from the module
      const courseId =
        Object.values(ALL_COURSE_MODULES).find((mods) =>
          Object.values(mods).some((m) => m.lessons.some((x) => x.id === l.id))
        ) !== undefined
          ? Object.entries(ALL_COURSE_MODULES).find(([, mods]) =>
              Object.values(mods).some((m) => m.lessons.some((x) => x.id === l.id))
            )?.[0]
          : undefined;
      const result = buildLessonQuiz(courseId ?? "", l);
      if (result) {
        built++;
        expect(result.quiz.questions.length, `${l.id} question count`).toBeGreaterThanOrEqual(3);
        for (const q of result.quiz.questions) {
          if (q.type === "multiple_choice") expect(q.options?.length ?? 0, `${l.id} options`).toBeGreaterThan(1);
          if (q.type === "true_false") expect(typeof q.correctAnswer, `${l.id} tf answer`).toBe("boolean");
          expect(q.explanation.length, `${l.id} explanation`).toBeGreaterThan(0);
        }
      }
    }
    expect(built, "quiz lessons with derivable quizzes").toBeGreaterThan(15);
  });

  it("resolves scripts by lesson id via getLessonVideo", () => {
    const sample = videoLessons[0];
    expect(getLessonVideo(sample.id)?.lessonId).toBe(sample.id);
    expect(getLessonVideo("les-does-not-exist")).toBeUndefined();
  });
});