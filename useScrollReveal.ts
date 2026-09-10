// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Scroll Reveal Observer
// Re-runs whenever the active view changes so that newly rendered
// .reveal elements are observed. Without re-observing on view change,
// elements mounted after the shell (e.g. navigating back to Home) stay
// at opacity 0 forever.
// ──────────────────────────────────────────────────────────────

import { useEffect } from "react";
import type { AcademyView } from "./types";

export function useScrollReveal(currentView: AcademyView) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView]);
}
