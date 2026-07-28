import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  root: __dirname,
  base: "./",
  resolve: {
    alias: {
      "next/link": resolve(__dirname, "src/link-shim.tsx"),
    },
  },
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        vph: resolve(__dirname, "vph/index.html"),
        violencia: resolve(__dirname, "violencia/index.html"),
      },
    },
  },
});
