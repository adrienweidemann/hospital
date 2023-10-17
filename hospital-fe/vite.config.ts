import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["hospital-lib"]
  },
  resolve: {
    alias: [
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      {
        find: "@components",
        replacement: fileURLToPath(new URL("./src/components", import.meta.url))
      },
      {
        find: "@definitions",
        replacement: fileURLToPath(new URL("./src/definitions", import.meta.url))
      },
      {
        find: "@api",
        replacement: fileURLToPath(new URL("./src/api", import.meta.url))
      },
      { find: "@helpers", replacement: fileURLToPath(new URL("./src/helpers", import.meta.url)) }
    ]
  }
});
