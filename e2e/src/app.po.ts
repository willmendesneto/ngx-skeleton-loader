import type { Page } from '@playwright/test';

// Demo sections which are always rendered. The user card skeletons (`.fb-item`) are removed after
// loading, so they can be detached in the middle of an assertion in slower environments (e.g. CI)
export const STABLE_SECTION = '.item';

export class AppPage {
  constructor(private readonly page: Page) {}

  navigateTo() {
    return this.page.goto('/');
  }

  getTitleText() {
    return this.page.locator('app-root h1').textContent();
  }
}
