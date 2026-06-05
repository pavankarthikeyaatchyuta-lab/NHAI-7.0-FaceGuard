import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: ['mobile/__tests__/**/*.test.ts'],
    environment: 'node',
  },
});
