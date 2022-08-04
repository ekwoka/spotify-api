import { defineConfig } from 'vite';

export default defineConfig(() => ({
  test: {
    setupFiles: ['./testingTools/testSetup.ts'],
  },
}));
