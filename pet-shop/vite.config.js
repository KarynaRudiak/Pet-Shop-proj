import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Pet-Shop2.0/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
