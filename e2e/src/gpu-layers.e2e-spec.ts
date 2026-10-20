import { AppPage, STABLE_SECTION } from './app.po';
import { expect, test, type Page } from '@playwright/test';

const getWillChange = (page: Page, selector: string) =>
  page
    .locator(`${STABLE_SECTION} ${selector}`)
    .first()
    .evaluate((element) => ({
      element: getComputedStyle(element).willChange,
      before: getComputedStyle(element, '::before').willChange,
    }));

const WITHOUT_ANIMATION =
  '.skeleton-loader:not(.progress):not(.progress-dark):not(.pulse):not(.pulse-dark):not(.wave):not([class*="animation-"])';

test.describe('Skeleton GPU layers', () => {
  test.describe('When user has no preference for reduced motion', () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await new AppPage(page).navigateTo();
    });

    test('should NOT promote skeletons without animation to their own layer', async ({ page }) => {
      expect(await getWillChange(page, WITHOUT_ANIMATION)).toEqual({ element: 'auto', before: 'auto' });
    });

    for (const animation of ['progress', 'progress-dark', 'wave']) {
      test(`should promote only the animated shimmer of \`${animation}\` animation`, async ({ page }) => {
        expect(await getWillChange(page, `.skeleton-loader.${animation}`)).toEqual({
          element: 'auto',
          before: 'transform',
        });
      });
    }

    for (const animation of ['pulse', 'pulse-dark']) {
      test(`should promote skeletons with \`${animation}\` animation based on opacity`, async ({ page }) => {
        expect(await getWillChange(page, `.skeleton-loader.${animation}`)).toEqual({
          element: 'opacity',
          before: 'auto',
        });
      });
    }
  });

  test.describe('When user prefers reduced motion', () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await new AppPage(page).navigateTo();
    });

    for (const animation of ['progress', 'progress-dark', 'pulse', 'pulse-dark', 'wave']) {
      test(`should NOT promote skeletons with \`${animation}\` animation to their own layer`, async ({ page }) => {
        expect(await getWillChange(page, `.skeleton-loader.${animation}`)).toEqual({ element: 'auto', before: 'auto' });
      });
    }
  });
});
