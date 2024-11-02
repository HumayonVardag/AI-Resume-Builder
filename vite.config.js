import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

console.log('-------- import.meta.env ------- ', process)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
