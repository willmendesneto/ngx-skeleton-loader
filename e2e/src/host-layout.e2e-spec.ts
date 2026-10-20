import { AppPage } from './app.po';
import { expect, test } from '@playwright/test';

test.describe('Skeleton host element layout', () => {
  test.beforeEach(async ({ page }) => {
    await new AppPage(page).navigateTo();
  });

  test('should render the host element as a block', async ({ page }) => {
    const display = await page
      .locator('ngx-skeleton-loader')
      .first()
      .evaluate(element => getComputedStyle(element).display);

    expect(display).toBe('block');
  });

  test('should wrap all its skeleton items in the host element box', async ({ page }) => {
    const itemsOutsideOfHost = await page.locator('ngx-skeleton-loader').evaluateAll(hosts =>
      hosts.flatMap(host => {
        const hostBox = host.getBoundingClientRect();

        return [...host.querySelectorAll('.skeleton-loader')].filter(item => {
          const itemBox = item.getBoundingClientRect();

          return itemBox.top < hostBox.top - 1 || itemBox.bottom > hostBox.bottom + 1;
        });
      }).length,
    );

    expect(itemsOutsideOfHost).toBe(0);
  });
});
