import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE WAS BLOCKING THE DAMN API CALL
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