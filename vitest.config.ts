import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts",
    // Never treat build output as test sources (e.g. stale dist/ copies)
    include: [
      "{src,test,tests,app,Public,Learner,Instructor,Admin}/**/*.{test,spec}.{ts,tsx}",
      "*.test.{ts,tsx}",
    ],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.{idea,git,cache,output,temp}/**"],
  },
});
