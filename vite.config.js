import { defineConfig } from 'vite';

export default defineConfig({
  // Base URL for production
  base: '/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper handling of assets
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  
  // Dev server configuration
  server: {
    port: 3000,
    open: true
  },
  
  // Public directory for static assets
  publicDir: 'public'
});
