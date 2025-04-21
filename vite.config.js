import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { plugin as md } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [
    react(),
    md({
      mode: ['html', 'toc', 'react'],
      markdownItOptions: { html: true }
    })
  ]
});
