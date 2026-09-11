import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // "Public/" holds React components, not static assets — without this,
  // Windows' case-insensitive filesystem makes Vite copy every .tsx
  // source file into dist/ on each build.
  publicDir: false,
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // Split by role so no single chunk dominates and long-tail code
        // never blocks first paint:
        // - vendor: framework + UI dependencies (cached independently of app code)
        // - lesson-<course>: per-course script data (the catalog is ~15k lines
        //   of narration), fetched in parallel when the course player opens
        // - lesson-scripts: shared script engine/helpers (core, deepenings, enrich)
        // - the lazy() CoursePlayer chunk keeps the video engine + diagrams
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
          // Deep reading content: only consumed by the lazy CoursePlayer, so
          // it gets its own chunk — cached independently of player code.
          if (id.includes("readingContent")) return "reading-content";
          const course = id.match(/lessonVideos[\\/](nf|lf|cf|soc|ti|web|react|node|cloud|tf|ct|do)\.ts$/);
          if (course) return `lesson-${course[1]}`;
          // shared engine + deepenings (the root lessonVideos.ts aggregator is
          // NOT matched here — it imports every course chunk, so grouping it
          // with them would create circular chunks; it rides in the lazy
          // CoursePlayer chunk instead)
          if (/lessonVideos[\\/]/.test(id)) return "lesson-scripts";
        },
      },
    },
  },
});
