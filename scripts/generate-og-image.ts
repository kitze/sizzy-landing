import { chromium } from "playwright";

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function generateOGImage() {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to exact OG image dimensions (Twitter/OpenGraph standard)
  await page.setViewportSize({ width: 1200, height: 630 });

  console.log(`Navigating to ${BASE_URL}/meta ...`);
  await page.goto(`${BASE_URL}/meta`, {
    waitUntil: "networkidle",
  });

  // Wait for images to load
  await page.waitForTimeout(1000);

  console.log("Taking screenshot...");
  await page.screenshot({
    path: "./public/opengraph-image.png",
    type: "png",
  });

  await browser.close();
  console.log("Screenshot saved to ./public/opengraph-image.png");
}

generateOGImage().catch(console.error);
