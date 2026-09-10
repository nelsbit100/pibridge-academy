import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { useScrollReveal } from "./useScrollReveal";
import type { AcademyView } from "./types";

// ── Controllable IntersectionObserver fake ─────────────────────
// jsdom has none; setupTests installs a no-op stub. This test needs one
// that records what it was asked to observe and lets us fire the
// intersection callback manually.
type IOCallback = (entries: { isIntersecting: boolean; target: Element }[]) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IOCallback;
  observed: Element[] = [];
  disconnected = false;

  constructor(callback: IOCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve() {}
  disconnect() {
    this.disconnected = true;
  }
}

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver as unknown as typeof IntersectionObserver);
});
afterEach(() => {
  vi.unstubAllGlobals();
});

// ── Fake app: view switch remounts .reveal content ─────────────
// This is the exact bug scenario: the shell persists, the view state
// changes, and fresh .reveal elements mount — while the observer set up
// for the first render is still the only one watching.
function App({ view }: { view: AcademyView }) {
  useScrollReveal(view);
  return view === "home" ? (
    <section className="reveal">Home hero</section>
  ) : (
    <section className="reveal-left">Dashboard content</section>
  );
}

describe("useScrollReveal", () => {
  it("observes elements present on first render", () => {
    const { container } = render(<App view="home" />);
    const hero = container.querySelector(".reveal")!;
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(MockIntersectionObserver.instances[0].observed).toContain(hero);
  });

  it("reveals elements when they intersect", () => {
    const { container } = render(<App view="home" />);
    const hero = container.querySelector(".reveal")!;
    MockIntersectionObserver.instances[0].callback([{ isIntersecting: true, target: hero }]);
    expect(hero.classList.contains("visible")).toBe(true);
  });

  it("does not reveal non-intersecting elements", () => {
    const { container } = render(<App view="home" />);
    const hero = container.querySelector(".reveal")!;
    MockIntersectionObserver.instances[0].callback([{ isIntersecting: false, target: hero }]);
    expect(hero.classList.contains("visible")).toBe(false);
  });

  it("BUG REGRESSION: observes elements mounted after a view change", () => {
    const { container, rerender } = render(<App view="home" />);
    const firstObserver = MockIntersectionObserver.instances[0];

    // View change: old content unmounts, new .reveal content mounts.
    rerender(<App view="learner-dashboard" />);

    // The old observer must have been disconnected (no leak)…
    expect(firstObserver.disconnected).toBe(true);
    // …and a NEW observer must exist that watches the new content.
    expect(MockIntersectionObserver.instances.length).toBe(2);
    const secondObserver = MockIntersectionObserver.instances[1];
    const dashboard = container.querySelector(".reveal-left")!;
    expect(secondObserver.observed).toContain(dashboard);

    // End to end: intersecting the newly mounted element reveals it.
    secondObserver.callback([{ isIntersecting: true, target: dashboard }]);
    expect(dashboard.classList.contains("visible")).toBe(true);
  });
});
