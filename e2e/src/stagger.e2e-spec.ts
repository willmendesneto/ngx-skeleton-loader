import { AppPage } from './app.po';
import { expect, test, type Page } from '@playwright/test';

// Returns the animation delay of the first items, using `::before` for `progress` animations
const getAnimationDelays = (page: Page, selector: string) =>
  page
    .locator(selector)
    .evaluateAll(elements =>
      elements
        .slice(0, 3)
        .map(element =>
          element.classList.contains('progress')
            ? getComputedStyle(element, '::before').animationDelay
            : getComputedStyle(element).animationDelay,
        ),
    );

test.describe('Skeleton stagger effect', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await new AppPage(page).navigateTo();
  });

  test.describe('When `--ngx-skeleton-loader-animation-stagger` is NOT set', () => {
    test('should NOT delay `progress` animation items', async ({ page }) => {
      expect(await getAnimationDelays(page, '.skeletons-color-scheme-auto .skeleton-loader.circle')).toEqual([
        '0s',
        '0s',
        '0s',
      ]);
    });
  });

  test.describe('When `--ngx-skeleton-loader-animation-stagger` is set', () => {
    test('should delay `progress` animation items based on their index', async ({ page }) => {
      expect(await getAnimationDelays(page, '.skeletons-with-stagger .skeleton-loader.progress')).toEqual([
        '0s',
        '0.15s',
        '0.3s',
      ]);
    });

    test('should delay `pulse` animation items based on their index, keeping its initial delay', async ({
      page,
    }) => {
      expect(await getAnimationDelays(page, '.skeletons-with-stagger .skeleton-loader.pulse')).toEqual([
        '0.5s',
        '0.65s',
        '0.8s',
      ]);
    });
  });
});
