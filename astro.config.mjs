import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Reduce chunk size for better loading
      rollupOptions: {
        output: {
          manualChunks: {
            'lenis': ['lenis'],
            'react-vendor': ['react', 'react-dom']
          }
        }
      },
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  },
  
  integrations: [react()],
  
  // Enable static optimization
  output: 'static',
  
  // Compress assets
  compressHTML: true,
  
  // Prefetch optimization
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
