import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE WAS BLOCKING THE DAMN API CALL

/* here's why it wasn't working:
  - react app makes request to /api/horoscope?sign=aries
  - vite's dev server intercepts because it starts with /api
  - VITE PASSES THIS RESPONSE AS A HTML RESPONSE instead of JSON
*/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})