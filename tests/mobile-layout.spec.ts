import { test, expect } from '@playwright/test';

const pages = [
  'index.html',
  'practice-areas.html',
  'car-accidents.html',
  'truck-accidents.html',
  'slip-and-fall.html',
  'medical-malpractice.html',
  'wrongful-death.html',
  'work-injuries.html',
  'about.html',
  'contact.html',
  'faq.html',
  'privacy-policy.html',
  'terms-of-use.html',
  'disclaimer.html',
];

const mobileViewports = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
];

for (const viewport of mobileViewports) {
  test.describe(viewport.name, () => {
    test.use({
      viewport,
      isMobile: true,
      hasTouch: true,
    });

    for (const sitePage of pages) {
      test(`layout holds on ${sitePage}`, async ({ page }) => {
        await page.goto(`/${sitePage}`, { waitUntil: 'networkidle' });

        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          return Math.max(doc.scrollWidth, body.scrollWidth) - doc.clientWidth;
        });

        expect(overflow, `Unexpected horizontal overflow on ${sitePage}`).toBeLessThanOrEqual(1);

        const footer = page.locator('.footer-content');
        const footerPrimary = page.locator('.footer-primary');
        const footerLegalLinks = page.locator('.footer-legal-links');

        await expect(footer).toBeVisible();
        await expect(footerPrimary).toBeVisible();
        await expect(footerLegalLinks).toBeVisible();

        const legalLinkCount = await footerLegalLinks.locator('a').count();
        expect(legalLinkCount).toBe(3);
      });
    }
  });
}

test('contact consultation anchor reveals the form on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/contact.html#contact-form', { waitUntil: 'networkidle' });

  const form = page.locator('#contact-form');
  await expect(form).toBeVisible();

  const formBox = await form.boundingBox();
  expect(formBox).not.toBeNull();
  expect(formBox!.y).toBeGreaterThanOrEqual(0);
});