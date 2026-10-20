import { AppPage } from './app.po';
import { expect, test } from '@playwright/test';

test.describe('Demo page simulations', () => {
  test.beforeEach(async ({ page }) => {
    await new AppPage(page).navigateTo();
  });

  test('should replace the user card skeletons with the loaded content', async ({ page }) => {
    const userCard = page.locator('.fb-item').first();

    await expect(userCard.locator('ngx-skeleton-loader')).toHaveCount(3);

    await expect(userCard.locator('.gravatar-title-name')).toHaveText('Wilson Mendes', { timeout: 5000 });
    await expect(userCard.locator('ngx-skeleton-loader')).toHaveCount(0);
  });

  test('should switch skeleton `count` and `animation` values over time', async ({ page }) => {
    const section = page.locator('h3', { hasText: 'Skeleton switching values for `animation` and `count`' });
    const values = section.locator('xpath=following-sibling::ul[1]');
    const skeletons = section.locator('xpath=following-sibling::div[1]').locator('.skeleton-loader');

    await expect(values).toContainText('Count: 2');
    await expect(skeletons).toHaveCount(2);

    await expect(values).toContainText('Count: 5', { timeout: 8000 });
    await expect(values).toContainText('Animation: progress-dark');
    await expect(skeletons).toHaveCount(5);
  });
});
