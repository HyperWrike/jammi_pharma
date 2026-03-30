import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['lib/**', 'store/**', 'context/**', 'app/api/**', 'hooks/**'],
      exclude: ['node_modules', '.next'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, '.'),
    },
  },
});
