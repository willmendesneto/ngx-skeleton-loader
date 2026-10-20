import { AppPage, STABLE_SECTION } from './app.po';
import { expect, test } from '@playwright/test';

const APPEARANCES = {
  line: '.skeleton-loader:not(.circle):not(.square):not(.custom-content)',
  circle: '.skeleton-loader.circle',
  square: '.skeleton-loader.square',
  'custom-content': '.skeleton-loader.custom-content',
};

test.describe('Skeleton CSS containment', () => {
  test.beforeEach(async ({ page }) => {
    await new AppPage(page).navigateTo();
  });

  for (const [appearance, selector] of Object.entries(APPEARANCES)) {
    test(`should isolate layout and paint of skeletons with \`${appearance}\` appearance`, async ({ page }) => {
      const contain = await page
        .locator(`${STABLE_SECTION} ${selector}`)
        .first()
        .evaluate((element) => getComputedStyle(element).contain);

      expect(contain).toBe('layout paint');
    });
  }
});
