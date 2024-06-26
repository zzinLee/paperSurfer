import path from "node:path";
import { createRequire } from "node:module";

import { defineConfig, normalizePath } from "vite";
import { UserConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import react from "@vitejs/plugin-react-swc";

const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps")
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: cMapsDir,
          dest: ""
        }
      ]
    })
  ],
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text"],
      reportsDirectory: "./src/spec/coverage",
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    testMatch: ["./src/spec/*.spec.jsx"]
  }
} as UserConfig);
