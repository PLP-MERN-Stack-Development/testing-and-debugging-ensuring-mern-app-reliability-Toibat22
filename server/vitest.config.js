import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,      // Allows describe/test/expect without importing
    environment: "node", // Node.js environment
    testTimeout: 10000,  // 10 seconds for DB operations
  },
});
