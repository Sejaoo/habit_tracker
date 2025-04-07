import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('Vite config loaded!'); 

export default defineConfig({
  plugins: [react()],
  css: { postcss: './postcss.config.cjs' },
  base: '/habit_tracker/',
  publicDir: 'public',
});