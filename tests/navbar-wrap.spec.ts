import { test, expect } from '@playwright/test';

const widths = [750, 760, 768, 772, 780, 790, 800];

for (const width of widths) {
  test(`navbar brand does not wrap at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/index.html', { waitUntil: 'networkidle' });

    const metrics = await page.evaluate(() => {
      const logoText = document.querySelector('.logo-text') as HTMLElement | null;
      const navMenu = document.querySelector('.nav-menu') as HTMLElement | null;
      if (!logoText || !navMenu) {
        return null;
      }

      const styles = getComputedStyle(logoText);
      const lineHeight = parseFloat(styles.lineHeight) || parseFloat(styles.fontSize) * 1.2;
      const rect = logoText.getBoundingClientRect();
      const wraps = rect.height > lineHeight * 1.35;

      return {
        wraps,
        logoHeight: rect.height,
        lineHeight,
        navMenuDisplay: getComputedStyle(navMenu).display,
      };
    });

    expect(metrics).not.toBeNull();
    expect(metrics!.wraps, `Logo text wrapped at ${width}px: ${JSON.stringify(metrics)}`).toBeFalsy();

    await page.screenshot({ path: `test-results/nav-check-${width}.png` });
  });
}
