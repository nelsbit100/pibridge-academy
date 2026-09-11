# PiBridge Academy

![CI](https://github.com/nelsbit100/pibridge-academy/actions/workflows/ci.yml/badge.svg)
![Deploy to GitHub Pages](https://github.com/nelsbit100/pibridge-academy/actions/workflows/deploy-pages.yml/badge.svg)

🚀 **Live demo:** [nelsbit100.github.io/pibridge-academy](https://nelsbit100.github.io/pibridge-academy/) — built from the production bundle on every push to `main`.

A career-focused e-learning platform for cybersecurity, software engineering, cloud, AI/ML, and data tracks — with an animated, narrated video-lesson engine, auto-derived quizzes, instructor grading, verifiable certificates, and a professional "passport" profile.

## Highlights

- **Animated lesson videos** — every one of the 72 video lessons carries a hand-authored script: scenes with synced narration, an animated SVG diagram walkthrough, pitfalls, and a war story, built from a shared scene/diagram engine (`lessonVideos/`, `Learner/svgDiagrams.tsx`).
- **Learning loop** — watch a lesson → take the module's derived knowledge-check quiz (`Learner/lessonQuiz.ts`) → auto-completion and progress tracking → **certificate auto-issued** when a course is finished (`Learner/CertificateView.tsx`).
- **Instructor grading** — the grading queue is fed by the real recorded quiz scores, assignments, and projects in learner progress; manual grades round-trip back into learner progress (`Instructor/InstructorDashboard.tsx`).
- **Career paths** — tiered programme progression, career discovery, live presentations, and an AI interview practice module.
- **Fast by construction** — the initial bundle is ~175 kB (gzip ~44 kB): dashboards, the certificate view, and the entire video subsystem (player, diagram library, per-course narration scripts) are lazy-loaded per view; the narration catalog is split into one chunk per course.

## Tech stack

- React 19 + TypeScript 5 + Vite 6
- Tailwind CSS (custom glassmorphism theme)
- Vitest + Testing Library (31 tests, incl. an end-to-end learning-loop test)
- Firebase (config read from env — no secrets committed)
- GitHub Actions CI (typecheck → tests → build on every push/PR)

## Local development

```bash
# 1. Install dependencies
npm install

# 2. (Optional) configure Firebase — the app runs with empty fallbacks,
#    producing an unauthenticated local demo with seeded demo data.
cp .env.example .env.local   # if present, or create .env.local with:
```

```dotenv
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

```bash
# 3. Start the dev server
npm run dev     # → http://127.0.0.1:5173
```

Useful scripts:

| Command            | What it does                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Vite dev server on `127.0.0.1:5173`       |
| `npm run build`    | Typecheck + production build to `dist/`   |
| `npm run preview`  | Serve the production build locally        |
| `npm run typecheck`| `tsc --noEmit`                            |
| `npm test`         | Full Vitest suite                         |

## Project layout

```
Public/       Landing, programme browse/detail, employer & platform pages
Learner/      Dashboard, course player, quiz engine, certificates, profile
Instructor/   Instructor dashboard + grading queue
Admin/        Admin dashboard (users, courses, programmes, reports)
lessonVideos/ Narrated lesson script engine: per-course scripts + deepenings
AcademyRouter.tsx  View router (lazy view loading) + role switching
```

## CI

Every push and pull request runs typecheck, the full test suite, and a production build (`.github/workflows/ci.yml`). The `main` branch is protected — CI must pass before changes land.
