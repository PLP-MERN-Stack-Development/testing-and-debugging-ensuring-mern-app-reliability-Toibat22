import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setupTests.js", //  correct path
    include: ["src/tests/**/*.test.{js,jsx}"], // optional, makes Vitest only look inside tests folder
  },
});
