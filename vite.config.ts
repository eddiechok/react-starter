import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      'tailwind.config.js': path.resolve(__dirname, 'tailwind.config.js')
    }
  },
  optimizeDeps: {
    include: ['tailwind.config.js']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
