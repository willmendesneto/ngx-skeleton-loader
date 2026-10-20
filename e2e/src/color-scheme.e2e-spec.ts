import { AppPage } from './app.po';
import { expect, test, type Page } from '@playwright/test';

const LIGHT = {
  backgroundColor: 'rgb(239, 241, 246)',
  shimmer: 'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0))',
};

const DARK = {
  backgroundColor: 'rgb(48, 52, 61)',
  shimmer: 'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
};

const getColors = (page: Page, wrapper: string) =>
  page
    .locator(`${wrapper} .skeleton-loader`)
    .first()
    .evaluate(element => ({
      backgroundColor: getComputedStyle(element).backgroundColor,
      shimmer: getComputedStyle(element, '::before').backgroundImage,
    }));

const openWithColorScheme = async (page: Page, colorScheme: 'light' | 'dark') => {
  await page.emulateMedia({ colorScheme });
  await new AppPage(page).navigateTo();
};

test.describe('Skeleton color scheme', () => {
  test.describe('When user prefers light color scheme', () => {
    test.beforeEach(async ({ page }) => openWithColorScheme(page, 'light'));

    test('should use light colors by default', async ({ page }) => {
      expect(await getColors(page, '.skeletons-color-scheme-default')).toEqual(LIGHT);
    });

    test('should use light colors if `colorScheme` is `auto`', async ({ page }) => {
      expect(await getColors(page, '.skeletons-color-scheme-auto')).toEqual(LIGHT);
    });

    test('should use dark colors if `colorScheme` is `dark`', async ({ page }) => {
      expect(await getColors(page, '.skeletons-color-scheme-dark')).toEqual(DARK);
    });

    test('should use the light color defined via `light-dark()` in CSS custom properties', async ({ page }) => {
      const { backgroundColor } = await getColors(page, '.skeletons-color-scheme-css-custom-properties');

      expect(backgroundColor).toBe('rgb(254, 243, 199)');
    });
  });

  test.describe('When user prefers dark color scheme', () => {
    test.beforeEach(async ({ page }) => openWithColorScheme(page, 'dark'));

    test('should keep light colors by default, as in previous versions (dark mode is opt-in)', async ({ page }) => {
      expect(await getColors(page, '.skeletons-color-scheme-default')).toEqual(LIGHT);
    });

    test('should switch to dark colors if `colorScheme` is `auto`', async ({ page }) => {
      expect(await getColors(page, '.skeletons-color-scheme-auto')).toEqual(DARK);
    });

    test('should use the dark color defined via `light-dark()` in CSS custom properties', async ({ page }) => {
      const { backgroundColor } = await getColors(page, '.skeletons-color-scheme-css-custom-properties');

      expect(backgroundColor).toBe('rgb(120, 53, 15)');
    });

    test('should switch to dark colors if `--ngx-skeleton-loader-color-scheme` is `light dark`', async ({ page }) => {
      await page.addStyleTag({ content: ':root { --ngx-skeleton-loader-color-scheme: light dark; }' });

      expect(await getColors(page, '.skeletons-color-scheme-default')).toEqual(DARK);
    });
  });
});
