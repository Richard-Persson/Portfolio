import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/radio-api': {
        target: 'https://radio.garden/api/ara/content',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/radio-api/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          'Referer': 'https://radio.garden/',
        },
      },
    },
  },
})
