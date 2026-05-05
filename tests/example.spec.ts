import { test, expect } from '@playwright/test';

test.describe('Valentino\'s Magic Beans - Homepage', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.*Magic Beans.*/i);
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });
});
