import { chromium } from "playwright";
import path from "path";

const PORT = process.env.PORT || 3001;
const OUTPUT_PATH = path.join(process.cwd(), "src", "app", "opengraph-image.png");

async function captureOgImage() {
  console.log(`Starting OG image capture from http://localhost:${PORT}/meta`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to exact OG image dimensions
  await page.setViewportSize({ width: 1200, height: 630 });

  // Navigate to the meta page
  await page.goto(`http://localhost:${PORT}/meta`, {
    waitUntil: "networkidle",
  });

  // Wait a bit for any animations/fonts to load
  await page.waitForTimeout(1000);

  // Take the screenshot
  await page.screenshot({
    path: OUTPUT_PATH,
    type: "png",
  });

  await browser.close();

  console.log(`OG image saved to: ${OUTPUT_PATH}`);
}

captureOgImage().catch((error) => {
  console.error("Failed to capture OG image:", error);
  process.exit(1);
});
