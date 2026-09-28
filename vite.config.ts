import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_URL || './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          courses: path.resolve(import.meta.dirname, 'courses.html'),
          mockTests: path.resolve(import.meta.dirname, 'mock-tests.html'),
          results: path.resolve(import.meta.dirname, 'results.html'),
          computerScience: path.resolve(import.meta.dirname, 'computer-science.html'),
          ai: path.resolve(import.meta.dirname, 'ai.html'),
          workshops: path.resolve(import.meta.dirname, 'workshops.html'),
          about: path.resolve(import.meta.dirname, 'about.html'),
          contact: path.resolve(import.meta.dirname, 'contact.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
