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

  it("meets e-learning depth: 7+ scenes and 3+ minutes per lesson", () => {
    for (const script of Object.values(LESSON_VIDEOS)) {
      expect(script.scenes.length, `${script.lessonId} scene count`).toBeGreaterThanOrEqual(7);
      expect(scriptDuration(script.scenes), `${script.lessonId} duration`).toBeGreaterThanOrEqual(180);
    }
  });

  it("includes knowledge checks and recaps in every lesson", () => {
    for (const script of Object.values(LESSON_VIDEOS)) {
      const hasQuiz = script.scenes.some((s) => s.kind === "quiz" || s.kind === "quizcard");
      const hasRecap = script.scenes.some((s) => s.kind === "recap");
      expect(hasQuiz, `${script.lessonId} knowledge check`).toBe(true);
      expect(hasRecap, `${script.lessonId} recap`).toBe(true);
    }
  });

  it("resolves scripts by lesson id via getLessonVideo", () => {
    const sample = videoLessons[0];
    expect(getLessonVideo(sample.id)?.lessonId).toBe(sample.id);
    expect(getLessonVideo("les-does-not-exist")).toBeUndefined();
  });
});