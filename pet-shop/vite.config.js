import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Pet-Shop-proj/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
