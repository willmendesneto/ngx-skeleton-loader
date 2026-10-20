import { AppPage } from './app.po';
import { expect, test, type Locator } from '@playwright/test';

const SHIMMER_WIDTH = 200;

// Pauses the shimmer animation at the given progress (from 0 to 1) and returns the shimmer
// position relative to the skeleton left edge
const getShimmerPositionAt = (skeleton: Locator, progress: number) =>
  skeleton.evaluate(
    (element, { progress, shimmerWidth }) => {
      element.getAnimations({ subtree: true }).forEach(animation => {
        animation.pause();
        animation.currentTime = (animation.effect!.getComputedTiming().duration as number) * progress;
      });

      const before = getComputedStyle(element, '::before');
      const left = new DOMMatrix(before.transform).m41 + parseFloat(before.width) - shimmerWidth;

      return { left, right: left + shimmerWidth, skeletonWidth: element.getBoundingClientRect().width };
    },
    { progress, shimmerWidth: SHIMMER_WIDTH },
  );

const SKELETONS = {
  line: '.skeletons-rtl .skeleton-loader.progress:not(.circle)',
  circle: '.skeletons-rtl .skeleton-loader.progress.circle',
  'dark line': '.skeletons-rtl .skeleton-loader.progress-dark',
};

test.describe('Skeleton `progress` animation in right-to-left (RTL) layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await new AppPage(page).navigateTo();
  });

  for (const [name, selector] of Object.entries(SKELETONS)) {
    test.describe(`When skeleton is a ${name}`, () => {
      test('should start the shimmer right after the skeleton right edge', async ({ page }) => {
        const { left, skeletonWidth } = await getShimmerPositionAt(page.locator(selector).first(), 0);

        expect(left).toBeCloseTo(skeletonWidth, 0);
      });

      test('should have the shimmer centered in the skeleton in the middle of the animation', async ({ page }) => {
        const { left, right, skeletonWidth } = await getShimmerPositionAt(page.locator(selector).first(), 0.5);

        expect((left + right) / 2).toBeCloseTo(skeletonWidth / 2, 0);
      });

      test('should finish the shimmer right before the skeleton left edge', async ({ page }) => {
        const { right } = await getShimmerPositionAt(page.locator(selector).first(), 0.9999);

        expect(right).toBeCloseTo(0, 0);
      });
    });
  }
});
