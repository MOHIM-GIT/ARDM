import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.BASE_URL || './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          courses: path.resolve(__dirname, 'courses.html'),
          mockTests: path.resolve(__dirname, 'mock-tests.html'),
          results: path.resolve(__dirname, 'results.html'),
          computerScience: path.resolve(__dirname, 'computer-science.html'),
          ai: path.resolve(__dirname, 'ai.html'),
          workshops: path.resolve(__dirname, 'workshops.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
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
