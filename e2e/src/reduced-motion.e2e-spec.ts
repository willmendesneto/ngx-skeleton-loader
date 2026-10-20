import { AppPage } from './app.po';
import { expect, test, type Page } from '@playwright/test';

const ANIMATIONS = ['progress', 'progress-dark', 'pulse', 'pulse-dark'];

const getAnimationNames = (page: Page, animation: string) =>
  page
    .locator(`.skeleton-loader.${animation}`)
    .first()
    .evaluate((element) => ({
      element: getComputedStyle(element).animationName,
      before: getComputedStyle(element, '::before').animationName,
    }));

test.describe('Skeleton animations', () => {
  test.describe('When user has no preference for reduced motion', () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await new AppPage(page).navigateTo();
    });

    for (const animation of ANIMATIONS) {
      test(`should animate skeletons with \`${animation}\` animation`, async ({ page }) => {
        const { element, before } = await getAnimationNames(page, animation);

        expect([element, before].some((name) => name !== 'none')).toBe(true);
      });
    }
  });

  test.describe('When user prefers reduced motion', () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await new AppPage(page).navigateTo();
    });

    for (const animation of ANIMATIONS) {
      test(`should NOT animate skeletons with \`${animation}\` animation`, async ({ page }) => {
        expect(await getAnimationNames(page, animation)).toEqual({ element: 'none', before: 'none' });
      });
    }
  });
});
