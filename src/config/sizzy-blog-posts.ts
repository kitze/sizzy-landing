export type SizzyBlogPost = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  readTime: string;
  updatedAt: string;
  sections: Array<{
    heading: string;
    body: string;
    items: string[];
  }>;
  checklist: string[];
  tags: string[];
};

export const sizzyBlogPosts = [
  {
    slug: "responsive-viewport-sizes",
    title: "Responsive Viewport Sizes",
    description:
      "A practical viewport size reference for testing mobile, tablet, and desktop layouts before release.",
    eyebrow: "Responsive QA",
    readTime: "5 min read",
    updatedAt: "2026-05-13",
    sections: [
      {
        heading: "Use ranges before presets",
        body: "Device presets are useful for proof, but viewport ranges catch the messy handoff points where layouts actually break. Start narrow, widen gradually, and log the exact width where each layout shift happens.",
        items: [
          "320-389px for compact phones",
          "390-479px for modern phones",
          "480-767px for large phones and small tablets",
          "768-1199px for tablet and small desktop handoff",
        ],
      },
      {
        heading: "Add product-specific widths",
        body: "Analytics and product surfaces should shape the final QA matrix. Dashboards, pricing pages, checkout flows, and embedded tools often need extra widths beyond the default responsive set.",
        items: [
          "Add 1024px when sidebars or tables are important",
          "Add 1366px for common laptop review",
          "Add height variants when sticky CTAs are present",
          "Add the minimum supported width to release notes",
        ],
      },
    ],
    checklist: [
      "Test one width inside every major responsive range.",
      "Check 20px before and after important CSS breakpoints.",
      "Capture release screenshots using the same viewport matrix.",
      "Retest with realistic copy, validation states, and authenticated UI.",
    ],
    tags: ["responsive design", "viewport sizes", "release QA"],
  },
  {
    slug: "responsive-visual-regression-checklist",
    title: "Responsive Visual Regression Checklist",
    description:
      "A release checklist for comparing responsive screenshots and catching layout regressions across breakpoints.",
    eyebrow: "Visual regression",
    readTime: "6 min read",
    updatedAt: "2026-05-13",
    sections: [
      {
        heading: "Freeze the comparison state",
        body: "Visual regression review needs matching conditions. Make sure baseline and candidate captures use the same route, viewport, account state, data state, and loaded assets.",
        items: [
          "Wait for fonts and images before capturing",
          "Use the same logged-in or logged-out state",
          "Disable or document dynamic banners",
          "Keep full-page and above-fold captures separate",
        ],
      },
      {
        heading: "Prioritize release blockers",
        body: "Small spacing changes can wait when conversion-critical UI is broken. Review navigation, CTAs, forms, dialogs, and sticky elements before polishing visual differences.",
        items: [
          "Primary CTA is visible and tappable",
          "No text overlaps or clips",
          "No unexpected horizontal scroll appears",
          "Dialogs and menus fit at mobile widths",
        ],
      },
    ],
    checklist: [
      "Use the same viewport matrix for every release comparison.",
      "Label intentional design changes before review.",
      "Separate blocking regressions from cosmetic differences.",
      "Attach approved screenshots to the launch evidence packet.",
    ],
    tags: ["visual regression", "responsive screenshots", "QA checklist"],
  },
  {
    slug: "iphone-viewport-sizes",
    title: "iPhone Viewport Sizes",
    description:
      "Common iPhone CSS viewport widths and a practical way to choose iPhone test sizes for responsive QA.",
    eyebrow: "Mobile viewport reference",
    readTime: "4 min read",
    updatedAt: "2026-05-13",
    sections: [
      {
        heading: "Cover compact and modern iPhones",
        body: "Most iPhone responsive issues are caught by testing compact, common, and large-width classes instead of trying every model individually.",
        items: [
          "320px for legacy compact iPhone layouts",
          "375px for common compact mobile behavior",
          "390px and 393px for modern default iPhone widths",
          "430px for large iPhone layouts",
        ],
      },
      {
        heading: "Do not ignore browser height",
        body: "Viewport height changes with browser chrome, install banners, keyboards, and sticky app UI. Pages with forms, sticky CTAs, or full-screen panels need height-specific review.",
        items: [
          "Open mobile navigation with browser chrome visible",
          "Focus form fields to trigger the keyboard",
          "Check sticky CTA placement after scrolling",
          "Retest any full-height sections in landscape if supported",
        ],
      },
    ],
    checklist: [
      "Test at least 375px, 390px, and 430px widths.",
      "Include the smallest supported width for dense pages.",
      "Check forms with the mobile keyboard open.",
      "Confirm navigation and CTA tap targets remain reachable.",
    ],
    tags: ["iPhone viewport", "mobile QA", "responsive design"],
  },
  {
    slug: "android-viewport-sizes",
    title: "Android Viewport Sizes",
    description:
      "Common Android viewport widths and QA notes for testing responsive layouts across varied mobile devices.",
    eyebrow: "Android viewport reference",
    readTime: "4 min read",
    updatedAt: "2026-05-13",
    sections: [
      {
        heading: "Expect more width variation",
        body: "Android devices span a wider set of CSS viewport widths. A good QA pass checks compact, common, and large Android widths rather than relying on one flagship preset.",
        items: [
          "360px for common compact Android phones",
          "384px and 393px for mid-range devices",
          "412px for large Android phones",
          "480px for foldable or small tablet handoff",
        ],
      },
      {
        heading: "Watch density and browser UI",
        body: "Android browser chrome, address bars, and font scaling can expose issues that do not appear in desktop emulation. Keep content flexible and validate tap targets.",
        items: [
          "Check line wrapping with larger font settings",
          "Verify inputs and dropdowns with touch",
          "Retest sticky headers after scroll",
          "Check app install or cookie banners when present",
        ],
      },
    ],
    checklist: [
      "Test 360px, 393px, 412px, and 480px widths.",
      "Confirm no controls depend on hover-only interactions.",
      "Retest forms with validation errors and keyboard focus.",
      "Scan for text clipping with longer localized strings.",
    ],
    tags: ["Android viewport", "mobile QA", "responsive testing"],
  },
  {
    slug: "responsive-breakpoint-checklist",
    title: "Responsive Breakpoint Checklist",
    description:
      "A practical checklist for auditing CSS breakpoints and validating layout transitions before shipping.",
    eyebrow: "Breakpoint QA",
    readTime: "5 min read",
    updatedAt: "2026-05-13",
    sections: [
      {
        heading: "Tie each breakpoint to behavior",
        body: "Breakpoints should exist because the layout needs them. Review every responsive threshold and record which visible behavior it controls.",
        items: [
          "Navigation collapse and expansion",
          "Grid column count changes",
          "Sidebar and panel visibility",
          "Typography, spacing, and media size shifts",
        ],
      },
      {
        heading: "Test around the threshold",
        body: "A layout that works exactly at the breakpoint can still fail nearby. Test before, at, and after every threshold, then capture evidence for the riskiest routes.",
        items: [
          "20px below the breakpoint",
          "The exact breakpoint",
          "20px above the breakpoint",
          "The narrowest supported viewport",
        ],
      },
    ],
    checklist: [
      "Every breakpoint has a documented layout purpose.",
      "No route has hidden horizontal overflow.",
      "Navigation, forms, and dialogs work around each breakpoint.",
      "Release screenshots cover the highest-risk breakpoint transitions.",
    ],
    tags: ["CSS breakpoints", "responsive QA", "frontend release"],
  },
] satisfies SizzyBlogPost[];

export const sizzyBlogLinks = sizzyBlogPosts.map(
  ({ slug, title, description }) => ({
    href: `/blog/${slug}`,
    title,
    description,
  }),
);

export function getSizzyBlogPost(slug: string | undefined) {
  return sizzyBlogPosts.find((post) => post.slug === slug);
}

export function getSizzyBlogRoutes() {
  return sizzyBlogPosts.map((post) => `/blog/${post.slug}`);
}
