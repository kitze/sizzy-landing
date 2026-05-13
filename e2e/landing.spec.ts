import { test, expect } from '@playwright/test';

test.describe('Sizzy Landing Page', () => {
  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
        console.log('Stack trace:', msg.location());
        errors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      console.log('Page error:', err);
      console.log('Error stack:', err.stack);
      errors.push(err.toString());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    if (errors.length > 0) {
      console.log('Console errors found:', errors);
    }

    expect(errors).toHaveLength(0);
  });

  test('should have main content visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for main heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should have CTA button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for buy/cta button
    const ctaButton = page.locator('a[href*="apple"], button:visible').first();
    await expect(ctaButton).toBeVisible();
  });

  test('theme toggle should work without errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      errors.push(err.toString());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Try to find and click theme toggle
    const themeButtons = page.locator('button');
    for (let i = 0; i < await themeButtons.count(); i++) {
      const button = themeButtons.nth(i);
      const text = await button.textContent();
      if (text?.includes('☀') || text?.includes('☾') || text?.includes('sun') || text?.includes('moon')) {
        await button.click();
        await page.waitForTimeout(500);
        break;
      }
    }

    if (errors.length > 0) {
      console.log('Console errors after theme toggle:', errors);
    }

    expect(errors).toHaveLength(0);
  });
});
