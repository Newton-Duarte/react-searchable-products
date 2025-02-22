import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        'dist/',
        'vite.config.ts',
        'tailwind.config.js',
        'postcss.config.js',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/mocks/**',
      ],
    },
  },
});
