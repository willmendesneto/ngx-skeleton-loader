import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/src',
  testMatch: '**/*.e2e-spec.ts',
  // CircleCI containers have 2 vCPUs, but Playwright detects the host CPUs and starts too many
  // workers (one browser each), running out of memory and killing the demo web server
  workers: process.env['CI'] ? 2 : undefined,
  use: {
    baseURL: 'http://127.0.0.1:4200',
    headless: !!process.env['CI'],
  },
  webServer: {
    command: 'npx ng serve ngx-skeleton-loader-demo --configuration production --host 127.0.0.1 --port 4200',
    url: 'http://127.0.0.1:4200',
    timeout: 30_000,
    reuseExistingServer: !process.env['CI'],
  },
});
