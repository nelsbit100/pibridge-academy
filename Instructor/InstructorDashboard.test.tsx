// PiBridge Academy — Instructor Grading View
// The grading queue must be fed by the real quiz scores, assignments and
// projects recorded in learner progress (not the mock student list), and
// instructor grades must round-trip into learner progress.
//
// fireEvent + act instead of userEvent (same rationale as the E2E test:
// the big component tree + timers deadlock with userEvent's async waits).

vi.mock("../firebase", () => ({ app: {}, db: {}, auth: {} }));

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent, cleanup } from "@testing-library/react";
import { AcademyProvider, useAcademy } from "../AcademyContext";
import { AcademyShell } from "../AcademyRouter";

const COURSE = "course-net-fundamentals";

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

async function flush() {
  await act(async () => {});
}

/** Switch role to instructor, open the dashboard, select the Grading tab. */
async function openGradingTab() {
  act(() => {
    ctx().setRole("instructor");
    ctx().setView("instructor-dashboard");
  });
  await flush();
  fireEvent.click(screen.getByRole("button", { name: /^Grading \(/i }));
  await flush();
}

describe("instructor grading view", () => {
  beforeEach(() => {
    localStorage.clear();
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
  });
  afterEach(cleanup);

  it("lists every recorded quiz score from learner progress", async () => {
    mountApp();
    await openGradingTab();

    // Demo progress for course-net-fundamentals records three quiz scores.
    const scores = ctx().progress[COURSE]!.quizScores;
    expect(Object.keys(scores).length).toBe(3);

    // Each auto-scored quiz row shows the lesson title and its percentage.
    expect(screen.getByText("Networking Basics Quiz")).toBeInTheDocument();
    expect(screen.getByText("OSI Model Quiz")).toBeInTheDocument();
    expect(screen.getByText("Final Assessment")).toBeInTheDocument();
    expect(screen.getByText("92%")).toBeInTheDocument();
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    // All five recorded rows (3 quizzes + assignment + project) carry a
    // final score, so all render the "auto-scored" footer.
    expect(screen.getAllByText(/auto-scored/i).length).toBe(5);
  });

  it("shows submitted assignments and projects as graded or awaiting manual grade", async () => {
    mountApp();
    await openGradingTab();

    // Demo progress records an assignment (les-nf-3-4) and a project
    // (les-nf-6-1) with final scores — they render as graded rows.
    expect(screen.getByText("Subnetting Practice")).toBeInTheDocument();
    expect(screen.getByText("Capstone: Secure a Small Business Network")).toBeInTheDocument();

    // A fresh submission (score 0 = pending marker) appears as awaiting.
    expect(screen.queryByText(/awaiting manual grade/i)).toBeNull();
    act(() => {
      ctx().recordSubmission(COURSE, "les-nf-2-2", "assignment", 0);
    });
    await flush();

    expect(screen.getByText("Data Encapsulation")).toBeInTheDocument();
    expect(screen.getAllByText(/awaiting manual grade/i).length).toBe(1);
    // Pending rows expose a grade input; auto-scored quiz rows do not.
    expect(screen.getByLabelText("Grade for Data Encapsulation")).toBeInTheDocument();
  });

  it("lets the instructor grade a submission and round-trips it into learner progress", async () => {
    mountApp();
    // Record a pending submission BEFORE opening the dashboard so the
    // queue already contains it when the grading tab renders.
    act(() => {
      ctx().recordSubmission(COURSE, "les-nf-2-2", "assignment", 0);
    });
    await openGradingTab();

    const input = screen.getByLabelText("Grade for Data Encapsulation");
    fireEvent.change(input, { target: { value: "87" } });
    fireEvent.click(screen.getByRole("button", { name: /^Grade$/i }));
    await flush();

    // The grade replaced the pending 0 in learner progress…
    expect(ctx().progress[COURSE]!.assignmentScores["les-nf-2-2"]).toBe(87);

    // …and the row flipped to the graded state.
    expect(screen.getByText("87%")).toBeInTheDocument();
    expect(screen.queryByLabelText("Grade for Data Encapsulation")).toBeNull();

    // Invalid drafts (out of range) are rejected — the pending grade stays.
    act(() => {
      ctx().recordSubmission(COURSE, "les-nf-2-3", "assignment", 0);
    });
    await flush();
    const bad = screen.getByLabelText("Grade for OSI Model Lab");
    fireEvent.change(bad, { target: { value: "150" } });
    fireEvent.click(screen.getByRole("button", { name: /^Grade$/i }));
    await flush();
    expect(ctx().progress[COURSE]!.assignmentScores["les-nf-2-3"]).toBe(0);
    expect(screen.getByLabelText("Grade for OSI Model Lab")).toBeInTheDocument();
  });

  it("sorts the queue ungraded-first and counts pending submissions in the stats", async () => {
    mountApp();
    act(() => {
      ctx().recordSubmission(COURSE, "les-nf-2-2", "assignment", 0);
      ctx().recordSubmission(COURSE, "les-nf-2-3", "assignment", 0);
    });
    await flush();

    // Open the dashboard on its default Overview tab.
    act(() => {
      ctx().setRole("instructor");
      ctx().setView("instructor-dashboard");
    });
    await flush();

    // The stats card counts pending submissions (2 fresh ones on top of
    // the demo data, where every recorded row is already graded).
    const statLabel = screen.getByText("Submissions to Review");
    expect(statLabel.previousElementSibling?.textContent).toBe("2");

    await openGradingTab();

    // Ungraded rows render before graded ones: in DOM order, every
    // "awaiting" row must precede every "auto-scored" row.
    const rows = screen
      .getAllByText(/awaiting manual grade|auto-scored/i)
      .map((el) => el.textContent ?? "");
    const lastPending = rows.reduce(
      (acc, t, i) => (/awaiting/i.test(t) ? i : acc),
      -1
    );
    const firstGraded = rows.findIndex((t) => /auto-scored/i.test(t));
    expect(lastPending).toBeGreaterThan(-1);
    expect(firstGraded).toBeGreaterThan(lastPending);
  });
});
