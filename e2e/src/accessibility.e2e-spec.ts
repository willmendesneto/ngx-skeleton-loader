import { AppPage, STABLE_SECTION } from './app.po';
import { expect, test } from '@playwright/test';

test.describe('Skeleton accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await new AppPage(page).navigateTo();
  });

  test('should expose a single progress bar per component, regardless of `count`', async ({ page }) => {
    const components = await page.locator(`${STABLE_SECTION} ngx-skeleton-loader`).count();

    expect(components).toBeGreaterThan(0);
    await expect(page.locator(STABLE_SECTION).getByRole('progressbar')).toHaveCount(components);
  });

  test('should expose the loading text and label of the component', async ({ page }) => {
    const progressbar = page.getByRole('progressbar', { name: 'loading' }).filter({
      has: page.locator('.skeleton-loader'),
    });

    await expect(page.locator('ngx-skeleton-loader[loadingText]').first()).toHaveAttribute(
      'aria-valuetext',
      'Loading section content. Please wait...',
    );
    expect(await progressbar.count()).toBeGreaterThan(0);
  });

  test('should NOT expose skeleton items to assistive technologies', async ({ page }) => {
    await expect(page.locator('.skeleton-loader[role="progressbar"]')).toHaveCount(0);
    await expect(page.locator('.skeleton-loader:not([aria-hidden="true"])')).toHaveCount(0);
  });
});
