import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // GitHub Pages deployment configuration
  // For username.github.io: use base: '/'
  // For username.github.io/repo-name: use base: '/repo-name/'
  base: '/',
  build: {
    outDir: 'dist',
    // Disable sourcemaps in production for smaller bundle size
    sourcemap: false,
    // Use esbuild for faster minification
    minify: 'esbuild',
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue']
        }
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue']
  }
})
