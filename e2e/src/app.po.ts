import type { Page } from '@playwright/test';

export class AppPage {
  constructor(private readonly page: Page) {}

  navigateTo() {
    return this.page.goto('/');
  }

  getTitleText() {
    return this.page.locator('app-root h1').textContent();
  }
}
