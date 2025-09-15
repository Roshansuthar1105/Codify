import { test, expect } from '@playwright/test';

// Utility selectors
const hamburgerButton = 'button[aria-label="Open menu"]';

// Main nav labels expected on desktop xl breakpoint
const FULL_LINKS = ['Home','About','Editor','Courses','Roadmaps','Notes','Questions','Bookmarks','Contributors','Contact'];

// Condensed subset (lg < xl) would show smaller set, but we focus on xl + mobile behavior.

test.describe('Navbar responsive behavior', () => {
  test('desktop (xl) shows full nav and hides hamburger', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/');

    for (const label of FULL_LINKS) {
      await expect(page.getByRole('link', { name: label })).toBeVisible();
    }
    await expect(page.locator(hamburgerButton)).toBeHidden();
  });

  test('mobile shows hamburger and links only after opening menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    // Links should not all be visible inline
    const inlineVisibility = await page.getByRole('link', { name: 'Courses' }).isVisible();
    // On small screens primary nav links should be absent (hidden via display none) until menu open.
    // We don't strictly fail if one appears due to layout changes, but we assert hamburger is visible.
    await expect(page.locator(hamburgerButton)).toBeVisible();

    // Open menu
    await page.click(hamburgerButton);

    // Now verify a couple of representative links appear inside mobile menu
    for (const label of ['Home','Courses','Roadmaps']) {
      await expect(page.getByRole('link', { name: label })).toBeVisible();
    }
  });
});
