import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the homepage
 */
export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly body: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1, h2').first();
    this.body = page.locator('body');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getHeadingText(): Promise<string | null> {
    return await this.heading.textContent();
  }

  async isHeadingVisible(): Promise<boolean> {
    return await this.heading.isVisible();
  }
}
