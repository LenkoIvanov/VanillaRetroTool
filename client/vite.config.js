import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000, // Change if you need a different port
    open: true, // Automatically open browser
    strictPort: true, // Ensures Vite doesn't use a different port if 3000 is taken
  },
  build: {
    sourcemap: true, // Useful for debugging
    outDir: 'dist', // Output directory for production build
  },
});
