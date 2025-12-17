import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Development server sozlamalari
  server: {
    host: '0.0.0.0',  // Docker va Codespaces uchun
    port: 5173,

    // Codespaces uchun HMR sozlamalari
    hmr: {
      // Codespaces'da WebSocket protokolini aniqlash
      clientPort: process.env.CODESPACES ? 443 : undefined,
    },

    // Backend proxy (CORS muammosiz)
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // Build sozlamalari
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },

  // Environment o'zgaruvchilarini expose qilish
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:8000'
    ),
  },
})

