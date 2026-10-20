import { AppPage } from './app.po';
import { expect, test, type Page } from '@playwright/test';

// Layers of the demo page itself, not related to skeletons (4 when this test was written)
const PAGE_LAYERS = 10;

// Counts composited layers via Chrome DevTools Protocol (`LayerTree` domain)
const getLayersCount = async (page: Page, reducedMotion: 'reduce' | 'no-preference') => {
  const cdp = await page.context().newCDPSession(page);
  let layers = 0;

  cdp.on('LayerTree.layerTreeDidChange', event => {
    if (event.layers) {
      layers = event.layers.length;
    }
  });
  await cdp.send('DOM.enable');
  await cdp.send('LayerTree.enable');

  await page.emulateMedia({ reducedMotion });
  await new AppPage(page).navigateTo();
  // Waits for the user card simulation to finish (2s), so the layer tree is stable
  await page.waitForTimeout(2500);

  const { skeletons, animations } = await page.evaluate(() => ({
    skeletons: document.querySelectorAll('.skeleton-loader').length,
    animations: document.getAnimations().length,
  }));

  return { layers, skeletons, animations };
};

test.describe('Skeleton GPU layers count (regression)', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chrome DevTools Protocol is Chromium only');

  test('should NOT promote skeletons to GPU layers when user prefers reduced motion', async ({ page }) => {
    const { layers, skeletons } = await getLayersCount(page, 'reduce');

    expect(skeletons).toBeGreaterThan(50);
    // Layers must not scale with the number of skeletons
    expect(layers).toBeLessThan(skeletons * 0.1);
  });

  test('should promote only animated parts of skeletons to GPU layers', async ({ page }) => {
    const { layers, animations } = await getLayersCount(page, 'no-preference');

    expect(animations).toBeGreaterThan(50);
    // At most one layer per running animation, plus a few layers of the page itself
    expect(layers).toBeLessThanOrEqual(animations + PAGE_LAYERS);
  });
});
