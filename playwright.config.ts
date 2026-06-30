import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/src',
  testMatch: '**/*.e2e-spec.ts',
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
