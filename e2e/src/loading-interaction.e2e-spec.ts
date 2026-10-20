import { AppPage } from './app.po';
import { devices, expect, test, type Page } from '@playwright/test';

const getInteractionStyles = (page: Page) =>
  page
    .locator('.skeleton-loader')
    .first()
    .evaluate((element) => {
      const { cursor, userSelect } = getComputedStyle(element);
      return { cursor, userSelect };
    });

test.describe('Skeleton loading interaction', () => {
  test.describe('When user is on a device with mouse or trackpad', () => {
    test('should show the `wait` cursor and disable text selection', async ({ page }) => {
      await new AppPage(page).navigateTo();

      expect(await getInteractionStyles(page)).toEqual({ cursor: 'wait', userSelect: 'none' });
    });
  });

  test.describe('When user is on a touch device', () => {
    const { defaultBrowserType, ...pixel } = devices['Pixel 7'];
    test.use(pixel);

    test('should keep the default cursor and text selection', async ({ page }) => {
      await new AppPage(page).navigateTo();

      expect(await getInteractionStyles(page)).toEqual({ cursor: 'auto', userSelect: 'auto' });
    });
  });
});
