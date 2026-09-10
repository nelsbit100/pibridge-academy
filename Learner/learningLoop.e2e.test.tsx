// PiBridge Academy — Learning-Loop E2E
// Watch a real lesson video → pass the derived quiz → complete the
// course via the player's own controls → certificate auto-issued.
//
// fireEvent + act are used instead of userEvent: with fake timers the
// interval-driven video clock plus userEvent's async advances deadlock
// on this large component tree.

vi.mock("../firebase", () => ({ app: {}, db: {}, auth: {} }));

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent, cleanup } from "@testing-library/react";
import { AcademyProvider, useAcademy } from "../AcademyContext";
import { AcademyShell } from "../AcademyRouter";
import { buildLessonQuiz } from "./lessonQuiz";

const COURSE = "course-linux-fundamentals";
const VIDEO_LESSON = "les-lf-2-3"; // "Process Management" (video, uncompleted)
const QUIZ_LESSON = "les-lf-2-5"; // "Users & Permissions Quiz" (module 2)

const harness: { ctx: ReturnType<typeof useAcademy> | null } = { ctx: null };

function Harness() {
  const value = useAcademy();
  harness.ctx = value;
  return (
    <>
      <div data-testid="current-view">{value.currentView}</div>
      <AcademyShell />
    </>
  );
}

function mountApp() {
  return render(
    <AcademyProvider>
      <Harness />
    </AcademyProvider>
  );
}

function ctx() {
  if (!harness.ctx) throw new Error("context not captured");
  return harness.ctx;
}

/** Flush React effects with fake timers pending. */
async function flush() {
  await act(async () => {});
}

/** Click + flush effects in one step. */
async function clickAndFlush(el: Element) {
  fireEvent.click(el);
  await flush();
}

/** The module quiz's answer key, derived exactly as the app derives it. */
function answerKey(lessonId: string) {
  const built = buildLessonQuiz(COURSE, {
    id: lessonId,
    title: "Module Quiz",
    durationMinutes: 10,
  })!;
  return { built, key: built.quiz.questions.map((q) => q.correctAnswer as number | string) };
}

describe("learning loop: watch → quiz → complete → certificate", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it(
    "issues a certificate when every lesson of a course is completed",
    async () => {
      mountApp();
      act(() => {
        ctx().navigateToLesson(COURSE, VIDEO_LESSON);
      });

      // ── 1. Watch the lesson video to the end ─────────────────────
      expect(screen.getByTestId("current-view")).toHaveTextContent("course-player");

      fireEvent.click(
        screen.getByRole("button", { name: /play .*(management|linux)/i })
      );

      // Drive the engine's 200ms clock with fake timers until the
      // end-of-video auto-complete feedback appears.
      for (let i = 0; i < 120; i++) {
        if (screen.queryByText(/marked as done/i)) break;
        act(() => {
          vi.advanceTimersByTime(10_000);
        });
      }
      expect(screen.getByText(/marked as done/i)).toBeInTheDocument();

      // ── 2. Take the module's derived knowledge-check quiz ────────
      act(() => {
        ctx().navigateToLesson(COURSE, QUIZ_LESSON);
      });

      const { built, key } = answerKey(QUIZ_LESSON);
      const total = built.quiz.questions.length;
      expect(total).toBeGreaterThanOrEqual(3);

      await clickAndFlush(screen.getByRole("button", { name: /start quiz/i }));

      for (let i = 0; i < total; i++) {
        const answer = key[i];
        const qid = built.quiz.questions[i].id;
        // Jump via the question-number pager pill (unique per question)
        await clickAndFlush(
          screen.getByRole("button", { name: String(i + 1) })
        );
        if (typeof answer === "number") {
          const radio = screen
            .getAllByRole("radio")
            .find((el) => (el as HTMLInputElement).name === qid);
          await clickAndFlush(radio!);
        } else {
          await clickAndFlush(
            screen.getByRole("button", { name: new RegExp(`^${answer}$`, "i") })
          );
        }
      }
      await clickAndFlush(screen.getByRole("button", { name: /submit quiz/i }));

      // Perfect score on the results screen
      expect(screen.getByText("100%")).toBeInTheDocument();
      expect(screen.getByText(/assessment passed/i)).toBeInTheDocument();

      await clickAndFlush(
        screen.getByRole("button", { name: /back to course/i })
      );

      // ── 3. Complete every remaining lesson via the player ───────
      // Passing a quiz auto-completes it (recordQuizScore), so only
      // complete lessons still pending. Sweep the whole course list
      // so lessons before the quiz are covered too.
      const completeIfPending = async () => {
        const btn = screen.queryByRole("button", {
          name: /^(mark as complete|completed)$/i,
        });
        if (!btn || /completed/i.test(btn.textContent ?? "")) return;
        await clickAndFlush(btn);
      };

      const lessonIds =
        ctx()
          .getCourse(COURSE)!
          .modules.flatMap((m) => m.lessons.map((l) => l.id));
      for (const lid of lessonIds) {
        if (ctx().progress[COURSE]?.completedLessons.includes(lid)) continue;
        act(() => {
          ctx().navigateToLesson(COURSE, lid);
        });
        await flush();
        await completeIfPending();
      }

      // Every lesson of the course is now completed
      const done = ctx().progress[COURSE]!.completedLessons;
      expect(lessonIds.every((id) => done.includes(id))).toBe(true);

      // Every lesson completed?
      const prog = ctx().progress[COURSE];
      expect(prog).toBeDefined();

      // ── 4. Certificate auto-issued for the finished course ──────
      const cert = ctx().certificates.find((c) => c.courseId === COURSE);
      expect(cert).toBeDefined();
      expect(cert!.courseName).toBe("Linux Fundamentals");

      // ── 5. The certificates view renders the issued credential ──
      act(() => {
        ctx().setView("certificates");
      });
      expect(
        screen.getByText(/certificate of completion/i)
      ).toBeInTheDocument();

      // Select the newly issued certificate from the list
      await clickAndFlush(
        screen.getByRole("button", { name: new RegExp(cert!.credentialId, "i") })
      );

      expect(screen.getAllByText(cert!.credentialId).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/linux fundamentals/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(`${cert!.score}%`).length).toBeGreaterThan(0);
    },
    60_000
  );
});
