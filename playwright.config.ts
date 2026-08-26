import { defineConfig, devices } from '@playwright/test';

// The Cloudflare adapter provides no preview entrypoint, so `astro preview` cannot serve the built
// output. Playwright drives `wrangler dev` against dist/ instead.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: 'http://localhost:8787',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 720 } },
    },
  ],
  webServer: {
    command: 'npm run build && npx wrangler dev',
    port: 8787,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
