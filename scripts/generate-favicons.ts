import sharp from "sharp";

const SIZES = [
  { size: 512, name: "favicon-512.png" },
  { size: 192, name: "favicon-192.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 96, name: "favicon-96.png" },
  { size: 64, name: "favicon-64.png" },
  { size: 48, name: "favicon-48.png" },
  { size: 32, name: "favicon-32.png" },
  { size: 16, name: "favicon-16.png" },
];

// Mic icon from Lucide (simplified path)
const micIcon = `
  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="12" x2="12" y1="19" y2="22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
`;

function createSvg(size: number): string {
  const borderRadius = size * 0.2;
  const iconSize = size * 0.5;
  const iconOffset = (size - iconSize) / 2;

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f59e0b"/>
          <stop offset="100%" style="stop-color:#ea580c"/>
        </linearGradient>
        <clipPath id="rounded">
          <rect width="${size}" height="${size}" rx="${borderRadius}" ry="${borderRadius}"/>
        </clipPath>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#grad)" clip-path="url(#rounded)"/>
      <g transform="translate(${iconOffset}, ${iconOffset}) scale(${iconSize / 24})">
        ${micIcon}
      </g>
    </svg>
  `;
}

async function generateFavicons() {
  console.log("Generating favicons with sharp...\n");

  for (const { size, name } of SIZES) {
    const svg = createSvg(size);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(`./public/${name}`);

    console.log(`✓ Generated ${name} (${size}x${size})`);
  }

  console.log("\nAll favicons generated!");
}

generateFavicons().catch(console.error);
