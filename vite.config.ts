import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import path from 'path'; // Removed unused import

export default defineConfig({
  plugins: [react()],
  base: './',
  css: { postcss: './postcss.config.cjs' },
});