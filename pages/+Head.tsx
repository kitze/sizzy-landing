import { getSizzyBlogPost } from "@/config/sizzy-blog-posts";
import { getSizzyToolPage } from "@/config/sizzy-tools";
import { usePageContext } from "vike-react/usePageContext";

// Ad pixels (Google Ads + Reddit), gated on build-time env vars. With these
// unset, nothing renders into the HTML — safe to deploy before ad accounts
// exist. Sizzy's paid focus is Google Search, so the Google global tag is the
// primary tag here; Reddit is secondary.
const viteEnv = (import.meta as unknown as { env: Record<string, string> })
  .env;
const GOOGLE_ADS_ID = viteEnv.VITE_GOOGLE_ADS_ID || "";
const GOOGLE_ADS_LEAD_LABEL = viteEnv.VITE_GOOGLE_ADS_LEAD_LABEL || "";
const GOOGLE_ADS_PURCHASE_LABEL = viteEnv.VITE_GOOGLE_ADS_PURCHASE_LABEL || "";
const REDDIT_PIXEL_ID = viteEnv.VITE_REDDIT_PIXEL_ID || "";

const adsPixelScript = `
  ${
    GOOGLE_ADS_ID
      ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
  var gtagScript=document.createElement('script');gtagScript.async=!0;gtagScript.src='https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}';document.head.appendChild(gtagScript);
  gtag('js', new Date());
  gtag('config', '${GOOGLE_ADS_ID}');`
      : ""
  }
  ${
    REDDIT_PIXEL_ID
      ? `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
  rdt('init','${REDDIT_PIXEL_ID}');
  rdt('track','PageVisit');`
      : ""
  }
  (function() {
    try {
      var params = new URLSearchParams(window.location.search);
      var path = window.location.pathname;
      // Reaching /download is the strongest on-site intent signal for a
      // free-trial / download product, so treat it as the lead conversion.
      if (path === "/download" || path.indexOf("/download/") === 0) {
        ${
          GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL
            ? `if (window.gtag) window.gtag('event', 'conversion', { send_to: '${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}' });`
            : ""
        }
        ${REDDIT_PIXEL_ID ? `if (window.rdt) window.rdt('track', 'Lead', { content_name: 'sizzy-download' });` : ""}
      }
      // Optional purchase-success bridge: ?purchase=success(&amount=X)
      if (params.get('purchase') === 'success') {
        var amount = Number(params.get('amount'));
        var value = amount > 0 ? amount : undefined;
        ${
          GOOGLE_ADS_ID && GOOGLE_ADS_PURCHASE_LABEL
            ? `if (window.gtag) window.gtag('event', 'conversion', { send_to: '${GOOGLE_ADS_ID}/${GOOGLE_ADS_PURCHASE_LABEL}', value: value, currency: 'USD' });`
            : ""
        }
        ${REDDIT_PIXEL_ID ? `if (window.rdt) window.rdt('track', 'Purchase', { value: value, currency: 'USD' });` : ""}
      }
    } catch (e) {}
  })();
`;

export function Head() {
  const pageContext = usePageContext();
  const siteUrl = "https://sizzy.co";
  const path =
    pageContext.urlPathname === "/"
      ? ""
      : pageContext.urlPathname.replace(/\/$/, "");
  const pageUrl = `${siteUrl}${path}`;
  const toolSlug = pageContext.urlPathname.match(/^\/tools\/([^/]+)\/?$/)?.[1];
  const blogSlug = pageContext.urlPathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const toolPage = getSizzyToolPage(toolSlug);
  const blogPost = getSizzyBlogPost(blogSlug);
  const routeMeta = toolPage
    ? {
        title: `${toolPage.title} | Sizzy Tools`,
        description: toolPage.description,
        shortDescription: toolPage.description,
      }
    : blogPost
      ? {
          title: `${blogPost.title} | Sizzy Blog`,
          description: blogPost.description,
          shortDescription: blogPost.description,
        }
      : pageContext.urlPathname === "/tools"
        ? {
            title: "Sizzy Tools",
            description:
              "Responsive testing tools and checklists for viewport planning, screenshot QA, breakpoint audits, and visual regression review.",
            shortDescription:
              "Responsive testing tools and checklists for web release QA.",
          }
        : pageContext.urlPathname === "/blog"
          ? {
              title: "Sizzy Blog - Responsive Testing Guides",
              description:
                "Practical guides on multi-device testing, media query debugging, viewport references, and the tools that make responsive web development faster.",
              shortDescription:
                "Responsive testing guides for web developers, from the Sizzy team.",
            }
        : pageContext.urlPathname === "/download"
          ? {
              title: "Get Sizzy",
              description:
                "Download Sizzy and test websites across synchronized devices, sessions, screenshots, and DevTools.",
              shortDescription:
                "Download Sizzy for synchronized responsive website testing.",
            }
          : null;
  const defaultTitle =
    "Sizzy - The Browser for Web Developers | Develop Faster. Stress Less.";
  const defaultDescription =
    "Sizzy is a specialized browser workspace for web development. Test on multiple devices simultaneously with synchronized scrolling, clicking, and forms. Debug CSS like never before.";
  const title = routeMeta?.title ?? defaultTitle;
  const description = routeMeta?.description ?? defaultDescription;
  const shortDescription =
    routeMeta?.shortDescription ??
    "The browser for web developers. Test on multiple devices simultaneously.";

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

  const blogJsonLd = blogPost
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blogPost.title,
        description: blogPost.description,
        url: pageUrl,
        dateModified: blogPost.updatedAt,
        datePublished: blogPost.updatedAt,
        keywords: blogPost.tags.join(", "),
        author: {
          "@type": "Person",
          name: "Kitze",
          url: "https://twitter.com/thekitze",
        },
        publisher: {
          "@type": "Organization",
          name: "Sizzy",
          url: siteUrl,
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      }
    : null;

  const faqJsonLd =
    blogPost?.faq && blogPost.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blogPost.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Analytics preconnect */}
      <link rel="preconnect" href="https://posthog.server.kitze.io" />

      {/* Favicons */}
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
      <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="apple-mobile-web-app-title" content="Sizzy" />

      {/* Theme Colors */}
      <meta name="theme-color" content="#000000" />
      <meta name="color-scheme" content="dark" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000000"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#000000"
      />

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
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDescription} />
      <meta property="og:site_name" content="Sizzy" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${siteUrl}/opengraph-image.png`} />
      <meta
        property="og:image:secure_url"
        content={`${siteUrl}/opengraph-image.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Sizzy - The Browser for Web Developers"
      />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thekitze" />
      <meta name="twitter:creator" content="@thekitze" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDescription} />
      <meta name="twitter:image" content={`${siteUrl}/opengraph-image.png`} />
      <meta
        name="twitter:image:alt"
        content="Sizzy - The Browser for Web Developers"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {blogJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Ad pixels (Google Ads + Reddit) — only rendered when an ad env var
          is set; Sizzy's paid focus is Google Search. */}
      {(GOOGLE_ADS_ID || REDDIT_PIXEL_ID) && (
        <script dangerouslySetInnerHTML={{ __html: adsPixelScript }} />
      )}
    </>
  );
}
