import { AppPage } from './app.po';
import { expect, test } from '@playwright/test';

test.describe('workspace-project App', () => {
  test('should display welcome message', async ({ page }) => {
    const app = new AppPage(page);

    await app.navigateTo();
    await expect(page.locator('app-root h1')).toHaveText('NGX Skeleton Loader');
  });
});
