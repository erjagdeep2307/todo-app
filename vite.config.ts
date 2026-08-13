import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    // Raises the warning threshold from 500 kB to 800 kB
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core React framework bundle
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom')
            ) {
              return 'vendor-core';
            }

            // Supabase & Query/State management bundle
            if (id.includes('@supabase') || id.includes('@tanstack')) {
              return 'vendor-data';
            }

            // UI, Icons & Tailwind helper utilities bundle
            if (
              id.includes('lucide-react') ||
              id.includes('clsx') ||
              id.includes('tailwind-merge')
            ) {
              return 'vendor-ui';
            }
          }
        },
      },
    },
  },
})