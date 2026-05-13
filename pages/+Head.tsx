export function Head() {
  const siteUrl = "https://sizzy.co";
  const title = "Sizzy - The Browser for Web Developers | Develop Faster. Stress Less.";
  const description =
    "Sizzy is a specialized browser workspace for web development. Test on multiple devices simultaneously with synchronized scrolling, clicking, and forms. Debug CSS like never before.";
  const shortDescription = "The browser for web developers. Test on multiple devices simultaneously.";

  // JSON-LD Structured Data for SoftwareApplication
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sizzy",
    description: description,
    url: siteUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Windows, Linux",
    offers: {
      "@type": "Offer",
      price: "15",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "10000",
    },
    author: {
      "@type": "Person",
      name: "Kitze",
      url: "https://twitter.com/thekitze",
    },
    featureList: [
      "Multiple device testing",
      "Synchronized scrolling",
      "Synchronized clicks and forms",
      "Universal DevTools",
      "Photo Studio for mockups",
      "Multi-session testing",
      "Project workspaces",
      "Debug CSS visually",
      "Device simulation",
      "Chrome extensions support",
    ],
  };

  return (
    <>
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Favicons */}
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
      <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="apple-mobile-web-app-title" content="Sizzy" />

      {/* Theme Colors */}
      <meta name="theme-color" content="#000000" />
      <meta name="color-scheme" content="dark" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#000000" />

      {/* SEO Meta Tags */}
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="web development, responsive design, browser, developer tools, device testing, CSS debugging, multiple devices, synchronized scroll, Chrome alternative, dev browser, frontend development"
      />
      <meta name="author" content="Kitze" />
      <meta name="robots" content="index, follow" />

      {/* OpenGraph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDescription} />
      <meta property="og:site_name" content="Sizzy" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${siteUrl}/opengraph-image.png`} />
      <meta property="og:image:secure_url" content={`${siteUrl}/opengraph-image.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Sizzy - The Browser for Web Developers" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thekitze" />
      <meta name="twitter:creator" content="@thekitze" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDescription} />
      <meta name="twitter:image" content={`${siteUrl}/opengraph-image.png`} />
      <meta name="twitter:image:alt" content="Sizzy - The Browser for Web Developers" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
