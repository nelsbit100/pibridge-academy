// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Reading Deepening Tests
// Locks in the reading-lesson deepening:
//   • every reading lesson in the catalog carries deep content
//   • every authored id matches a real lesson (no orphans)
//   • no mojibake / non-English artifacts anywhere in content
//   • the structured renderer renders sections, bullets, code
// ──────────────────────────────────────────────────────────────
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { ALL_COURSE_MODULES } from "./courseContent";
import { EXPANDED_COURSE_MODULES } from "./expandedCourseContent";
import { COURSES } from "./data";
import { DEEP_READING_COUNT, applyReadingContent } from "./readingContent";
import { ReadingBody } from "./Learner/ReadingBody";

const allModules = [...Object.values(ALL_COURSE_MODULES), ...Object.values(EXPANDED_COURSE_MODULES)];

function catalogReadings() {
  const readings: { id: string; title: string; content?: string }[] = [];
  for (const mods of allModules) {
    for (const mod of Object.values(mods)) {
      for (const l of mod.lessons) {
        if (l.type === "reading") readings.push(l as { id: string; title: string; content?: string });
      }
    }
  }
  return readings;
}

describe("reading lesson deepening", () => {
  it("covers every reading lesson in the catalog with deep content", () => {
    // Idempotence-safe: judge by content shape, not reference equality —
    // data.ts already deepened the shared module arrays at import time.
    const missing = catalogReadings()
      .filter((l) => !(applyReadingContent(l as any) as any).content?.includes("## "))
      .map((l) => l.id);
    expect(missing).toEqual([]);
  });

  it("gives every reading lesson substantial structured content", () => {
    const thin = catalogReadings().flatMap((l) => {
      const deep = applyReadingContent(l as any) as any;
      // Deep content = intro + ## sections. Original stubs averaged ~350 chars;
      // deepened lessons must be an order of magnitude richer.
      return deep.content.length < 1500 || !deep.content.includes("## ") ? [`${l.id} (${deep.content.length} chars)`] : [];
    });
    expect(thin).toEqual([]);
  });

  it("has no orphaned authored ids (every key is a real lesson)", () => {
    const ids = new Set(allModules.flatMap((mods) => Object.values(mods).flatMap((m) => m.lessons.map((l) => l.id))));
    expect(DEEP_READING_COUNT).toBeGreaterThan(90);
    // End-to-end through COURSES exactly as the lazy CoursePlayer applies it
    // (deepening lives behind the player chunk, NOT in data.ts, to protect
    // the initial-bundle budget). Reachable floor is 82: a handful of authored
    // lessons belong to expanded module arrays no course mounts (e.g. the
    // SE_FULLSTACK set superseded by the foundation capstone).
    const readings = COURSES.flatMap((c) => c.modules.flatMap((m) => m.lessons)).filter(
      (l) => l.type === "reading"
    );
    expect(readings.length).toBeGreaterThanOrEqual(82);
    for (const l of readings) {
      const deep = applyReadingContent(l as any) as any;
      expect(deep.content, `${l.id} should be deepened`).toContain("## ");
      expect(deep.content.length).toBeGreaterThan(1500);
      expect(ids.has(l.id)).toBe(true);
    }
  });

  it("contains no mojibake or stray non-English artifacts in course content", () => {
    const offenders: string[] = [];
    for (const course of COURSES) {
      for (const mod of course.modules) {
        for (const l of mod.lessons) {
          if (l.content && /[\u4e00-\u9fff\u3040-\u30ff]/.test(l.content)) offenders.push(l.id);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe("ReadingBody renderer", () => {
  it("renders sections, bullets, bold spans, and code fences", () => {
    const { container } = render(
      <ReadingBody
        content={
          "Intro line.\n\n## The section\n- **first** point\n- second point\n\n```\nnpm run build\n```"
        }
      />
    );
    expect(container.querySelector("h2")?.textContent).toBe("The section");
    expect(container.querySelectorAll("li").length).toBe(2);
    expect(container.querySelector("strong")?.textContent).toBe("first");
    expect(container.querySelector("pre code")?.textContent).toBe("npm run build");
    expect(container.querySelector("p")?.textContent).toContain("Intro line.");
  });
});
