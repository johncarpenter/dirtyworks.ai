// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

// `output: 'static'` keeps prerendering the default: a new page is prerendered unless it
// explicitly opts out. Note the Cloudflare adapter declares `adapterFeatures.buildOutput:
// 'server'`, so the build is technically hybrid — pages still prerender individually, and the
// only on-demand route is the Actions endpoint Astro injects at /_actions/[...path].
// See specs/001-build-marketing-website/research.md D-02.
export default defineConfig({
  site: 'https://dirtyworks.ai',
  output: 'static',
  adapter: cloudflare({
    // sharp is a native libvips addon; workerd has no Node native-module loader, so image
    // optimisation runs at build time for prerendered routes only.
    imageService: 'compile',
    // platformProxy spawns a workerd process to expose bindings in `astro dev`. Left enabled it
    // keeps Vitest from exiting, so it is disabled under test.
    platformProxy: { enabled: !process.env.VITEST },
  }),
  // The adapter otherwise wires sessions to a Cloudflare KV binding we never create. No page
  // uses session state — every route is prerendered — so an in-memory driver keeps the build
  // honest and silences a warning that would otherwise train people to ignore warnings.
  session: { driver: 'memory' },
  integrations: [react()],
  trailingSlash: 'never',
  build: { format: 'file' },
});
