import { AppPage } from './app.po';
import { expect, test, type Page } from '@playwright/test';

const CUSTOM_ANIMATION = '.skeletons-with-custom-animation .skeleton-loader.animation-stretch';

// Simulates consumer global CSS animating pseudo-elements of a custom animation
const addPseudoElementsAnimation = (page: Page) =>
  page.addStyleTag({
    content: `
      .skeleton-loader.animation-stretch::before,
      .skeleton-loader.animation-stretch::after {
        content: '';
        animation: skeleton-stretch 1.5s ease-in-out infinite;
      }
    `,
  });

const getAnimationNames = (page: Page) =>
  page
    .locator(CUSTOM_ANIMATION)
    .first()
    .evaluate((element) => ({
      element: getComputedStyle(element).animationName,
      before: getComputedStyle(element, '::before').animationName,
      after: getComputedStyle(element, '::after').animationName,
    }));

test.describe('Skeleton custom animations', () => {
  test.describe('When user has no preference for reduced motion', () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await new AppPage(page).navigateTo();
      await addPseudoElementsAnimation(page);
    });

    test('should animate skeletons using the custom animation defined in global styles', async ({ page }) => {
      expect(await getAnimationNames(page)).toEqual({
        element: 'skeleton-stretch',
        before: 'skeleton-stretch',
        after: 'skeleton-stretch',
      });
    });
  });

  test.describe('When user prefers reduced motion', () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await new AppPage(page).navigateTo();
      await addPseudoElementsAnimation(page);
    });

    test('should NOT animate skeletons using the custom animation, including pseudo-elements', async ({ page }) => {
      expect(await getAnimationNames(page)).toEqual({ element: 'none', before: 'none', after: 'none' });
    });

    test('should NOT promote skeletons using the custom animation to their own layer', async ({ page }) => {
      const willChange = await page
        .locator(CUSTOM_ANIMATION)
        .first()
        .evaluate((element) => getComputedStyle(element).willChange);

      expect(willChange).toBe('auto');
    });
  });
});
