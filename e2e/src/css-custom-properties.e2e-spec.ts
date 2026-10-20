import { AppPage } from './app.po';
import { expect, test, type Page } from '@playwright/test';

const WRAPPER = '.skeletons-with-css-custom-properties';
const WITHOUT_WRAPPER = `.item:not(${WRAPPER})`;

const getStyles = (page: Page, selector: string) =>
  page
    .locator(selector)
    .first()
    .evaluate((element) => {
      const styles = getComputedStyle(element);
      const before = getComputedStyle(element, '::before');

      return {
        backgroundColor: styles.backgroundColor,
        animationDuration: before.animationName !== 'none' ? before.animationDuration : styles.animationDuration,
        shimmer: before.backgroundImage,
      };
    });

test.describe('Skeleton CSS custom properties', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await new AppPage(page).navigateTo();
  });

  test.describe('When CSS custom properties are NOT set', () => {
    test('should use the default values', async ({ page }) => {
      expect(await getStyles(page, `${WITHOUT_WRAPPER} .skeleton-loader.progress`)).toEqual({
        backgroundColor: 'rgb(239, 241, 246)',
        animationDuration: '2s',
        shimmer: 'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0))',
      });
    });
  });

  test.describe('When CSS custom properties are set in an ancestor element', () => {
    test('should use the inherited base color, shimmer color and animation duration', async ({ page }) => {
      expect(await getStyles(page, `${WRAPPER} .skeleton-loader.progress`)).toEqual({
        backgroundColor: 'rgb(224, 231, 255)',
        animationDuration: '1s',
        shimmer: 'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(99, 102, 241, 0.25), rgba(255, 255, 255, 0))',
      });
    });

    test('should use the inherited dark mode color and animation duration', async ({ page }) => {
      const { backgroundColor, animationDuration } = await getStyles(page, `${WRAPPER} .skeleton-loader.pulse-dark`);

      expect({ backgroundColor, animationDuration }).toEqual({
        backgroundColor: 'rgb(165, 180, 252)',
        animationDuration: '1s',
      });
    });
  });
});
