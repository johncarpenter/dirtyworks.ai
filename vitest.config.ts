/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// The triple-slash reference above pulls in vitest's augmentation of Vite's UserConfig, which is
// what makes the `test` key type-check through Astro's getViteConfig wrapper.
//
// getViteConfig boots Astro's config pipeline so tests share the app's resolution and aliases.
// It returns a config *function* — Vitest resolves it; never call it here.
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    globals: false,
    restoreMocks: true,
  },
});
