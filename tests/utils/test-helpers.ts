import { Page } from '@playwright/test';

/**
 * Common utilities for Playwright tests
 */

export async function navigateTo(page: Page, path: string = '/'): Promise<void> {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

export async function getPageTitle(page: Page): Promise<string> {
  return await page.title();
}

export async function waitForElement(page: Page, selector: string, timeout: number = 5000): Promise<void> {
  await page.locator(selector).waitFor({ timeout });
}

export async function fillForm(page: Page, fields: Record<string, string>): Promise<void> {
  for (const [selector, value] of Object.entries(fields)) {
    await page.fill(selector, value);
  }
}
