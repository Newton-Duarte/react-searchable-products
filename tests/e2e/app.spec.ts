import { expect, test } from '@playwright/test';

test('should display mocked products', async ({ page }) => {
  await page.goto('/');

  const productTitle = page.locator('text=Mock Product').first();

  await expect(productTitle).toBeVisible();
});
