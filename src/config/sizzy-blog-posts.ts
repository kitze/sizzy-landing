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
    slug: "browser-for-web-developers",
    title: "What Is a Browser for Web Developers?",
    description:
      "Why developers are switching from Chrome to dedicated development browsers, what a dev browser actually does, and when it's worth it.",
    eyebrow: "Dev workflow",
    readTime: "7 min read",
    updatedAt: "2026-06-12",
    sections: [
      {
        heading: "Chrome was built for browsing, not building",
        body: "Chrome, Firefox, and Safari are consumption browsers with debugging panels bolted on. A browser for web developers inverts that: the entire window is organized around building and testing websites. Instead of emulating one viewport at a time inside DevTools, a dev browser shows your localhost on every device class simultaneously and keeps them in sync as you interact.",
        items: [
          "All breakpoints visible at once instead of one emulated viewport",
          "Synchronized scrolling, clicking, and typing across devices",
          "Per-project workspaces that restore your exact testing setup",
          "Built-in screenshots, throttling, and device frames",
        ],
      },
      {
        heading: "What changes in your daily workflow",
        body: "The compounding win is feedback speed. Every CSS change is verified against mobile, tablet, and desktop in a single glance, so breakpoint bugs are caught the moment they are introduced instead of during a pre-release QA scramble.",
        items: [
          "Fix a media query once and see the result on every width instantly",
          "Fill a form on one device and watch it behave on all of them",
          "Test logged-in and logged-out states side by side with isolated sessions",
          "Generate framed marketing screenshots without a design tool",
        ],
      },
      {
        heading: "When a dev browser is worth paying for",
        body: "If you ship responsive UIs weekly, the math is simple: resizing windows and cycling DevTools presets costs minutes per change, dozens of times per day. Sizzy is built on Chromium - your extensions work, rendering matches Chrome - and has been actively maintained since 2018. If you only check responsiveness a few times a month, free emulation in DevTools may genuinely be enough.",
        items: [
          "Daily responsive work: a dev browser pays for itself in days",
          "Heavy client work: framed screenshots and QA evidence are built in",
          "Occasional checks: stick with DevTools until it hurts",
          "Try the 14-day Sizzy trial with no credit card to test the difference",
        ],
      },
    ],
    checklist: [
      "Count how many times per day you resize a window or switch device presets.",
      "Open your current project in Sizzy with phone, tablet, and desktop side by side.",
      "Reproduce your last breakpoint bug and time the fix.",
      "Decide based on measured time saved, not the price tag.",
    ],
    tags: ["browser for web developers", "dev browser", "web development tools"],
  },
  {
    slug: "test-responsive-design-on-multiple-devices",
    title: "How to Test Responsive Design on Multiple Devices at Once",
    description:
      "A practical workflow for testing responsive layouts on every device simultaneously - without buying hardware or juggling browser windows.",
    eyebrow: "Responsive QA",
    readTime: "6 min read",
    updatedAt: "2026-06-12",
    sections: [
      {
        heading: "The problem with one-viewport-at-a-time testing",
        body: "Most responsive bugs are relational: the layout works at 375px and at 1280px but breaks somewhere in between, or a fix for mobile silently breaks tablet. Testing one viewport at a time hides these relationships, which is exactly why breakpoint bugs survive until production.",
        items: [
          "Single-viewport testing hides cross-breakpoint regressions",
          "Manual window resizing is imprecise and unrepeatable",
          "Real-device labs are expensive and slow to iterate against",
          "Screenshot services catch issues after the fact, not while coding",
        ],
      },
      {
        heading: "Set up a side-by-side device matrix",
        body: "Pick one device per width class and view them simultaneously. In Sizzy you add devices to a single window - each with accurate viewport, user agent, and device frame - and the matrix persists per project so tomorrow's session starts exactly where you left off.",
        items: [
          "375px or 390px phone for compact mobile",
          "768px tablet for the layout handoff zone",
          "1280px laptop for the desktop baseline",
          "Your analytics' most common width as a fourth device",
        ],
      },
      {
        heading: "Use synchronized interactions to test flows, not just layouts",
        body: "Static layout checks miss interactive failures. With synchronized scrolling, clicking, and typing, you run a flow once - open the nav, fill the form, trigger validation - and verify it on every device simultaneously. This is where multi-device testing beats any screenshot tool.",
        items: [
          "Scroll the page once and watch sticky elements on all widths",
          "Submit a form with errors and check validation layout everywhere",
          "Open modals and menus to catch mobile overflow issues",
          "Hot-reload your dev server and see every device update together",
        ],
      },
    ],
    checklist: [
      "Define a device matrix with one device per major width class.",
      "Run interactive flows (nav, forms, dialogs) with synchronized input.",
      "Check the awkward zones: 480-767px and 768-1199px.",
      "Save the setup as a project so QA is one click next time.",
    ],
    tags: [
      "test responsive design",
      "multiple devices",
      "responsive testing tools",
    ],
  },
  {
    slug: "polypane-vs-sizzy-vs-responsively",
    title: "Polypane vs Sizzy vs Responsively: An Honest Comparison",
    description:
      "A straight comparison of the three main multi-device development browsers - strengths, weaknesses, and which one fits your workflow.",
    eyebrow: "Comparison",
    readTime: "8 min read",
    updatedAt: "2026-06-12",
    sections: [
      {
        heading: "The short version",
        body: "All three show your site on multiple viewports at once, and all three are good at it. Responsively is free and open source - the right starting point if budget is the constraint. Polypane (from ~$10/mo) leans into accessibility audits, contrast checking, and social preview tooling. Sizzy ($12-15/mo or $499 lifetime) focuses on fast multi-device workflows: synced interactions, isolated sessions, project workspaces, and screenshot tooling. This is Sizzy's blog, so take our framing with that grain of salt - but the feature breakdown below is accurate.",
        items: [
          "Responsively: free, open source, community-maintained",
          "Polypane: strongest accessibility and meta-preview tooling",
          "Sizzy: strongest session/workspace workflow and screenshot tooling",
          "All three: Chromium-based with side-by-side viewports",
        ],
      },
      {
        heading: "Where each one wins",
        body: "Responsively covers the core need - side-by-side previews with mirrored scrolling - at zero cost, though maintenance is volunteer-driven and simulation depth is thinner. Polypane is excellent if accessibility compliance is a daily requirement: live WCAG contrast checks, screen reader previews, and 20+ debug overlays. Sizzy is built for shipping responsive products fast: multiple isolated sessions for testing different auth states simultaneously, per-project workspaces, Photo Studio for framed marketing screenshots, and full-time maintenance since 2018.",
        items: [
          "Choose Responsively if free is the requirement",
          "Choose Polypane if accessibility auditing drives your day",
          "Choose Sizzy for multi-session testing and project workflows",
          "Avoid all three if you rarely do responsive work - DevTools is fine",
        ],
      },
      {
        heading: "The honest way to decide",
        body: "Both paid options have free trials (Sizzy's is 14 days with no credit card; Polypane offers a trial as well) and Responsively costs nothing to try. Install the candidates, open your real project, and run your actual workflow for a day in each. The right tool becomes obvious within hours - it's the one you stop noticing.",
        items: [
          "Test with your real project, not a demo site",
          "Run your most annoying recent bug through each tool",
          "Check the features you'd use weekly, not the longest feature list",
          "Factor in maintenance pace and support responsiveness",
        ],
      },
    ],
    checklist: [
      "List your top three responsive-workflow pain points.",
      "Trial each candidate against a real project for one day.",
      "Compare only the features you would use weekly.",
      "Pick the tool that disappears into your workflow.",
    ],
    tags: ["polypane vs sizzy", "responsively alternative", "dev browser comparison"],
  },
  {
    slug: "chrome-devtools-device-mode-limitations",
    title: "Chrome DevTools Device Mode: 7 Limitations to Know",
    description:
      "Chrome's device mode is useful but not the full story. Here's where its emulation differs from reality and how to close the gaps.",
    eyebrow: "DevTools deep dive",
    readTime: "6 min read",
    updatedAt: "2026-06-12",
    sections: [
      {
        heading: "What device mode gets right",
        body: "Credit where due: device mode is free, one keystroke away, and fine for quick spot checks. It emulates viewport dimensions, device pixel ratio, touch events, and user agent strings - enough to catch obvious layout breaks during development.",
        items: [
          "Instant viewport switching with device presets",
          "DPR emulation for testing high-density rendering",
          "Basic network and CPU throttling",
          "Free and already installed",
        ],
      },
      {
        heading: "The seven limitations that bite",
        body: "Device mode is an approximation layered onto desktop Chrome, and the gaps show up exactly where responsive bugs hide. The biggest structural issue: you see exactly one viewport at a time, so a fix for one breakpoint silently breaking another is invisible until you manually cycle through presets again.",
        items: [
          "One viewport at a time - cross-breakpoint regressions stay hidden",
          "No real browser chrome: mobile URL bars that collapse on scroll (and change the real viewport height) aren't simulated",
          "Desktop scrollbars and scroll physics, not mobile ones",
          "Rendering is still desktop Blink - not Safari/WebKit, so iOS bugs don't reproduce",
          "Preset list drifts out of date and ignores your actual user widths",
          "No persistent setup - every session starts from scratch",
          "Testing multiple auth states needs multiple profiles or incognito juggling",
        ],
      },
      {
        heading: "Closing the gaps",
        body: "Keep device mode for spot checks, then layer the missing pieces: a multi-device browser like Sizzy for side-by-side breakpoint coverage with persistent project setups and isolated sessions, plus a real iOS device (or Safari via a service) for WebKit verification before release.",
        items: [
          "Side-by-side devices catch cross-breakpoint regressions live",
          "Synced sessions replace incognito-window juggling",
          "QR-to-phone gets your localhost onto a real device in seconds",
          "Always verify iOS on actual WebKit before shipping",
        ],
      },
    ],
    checklist: [
      "Use device mode for quick spot checks, not release QA.",
      "Verify every breakpoint simultaneously before merging CSS changes.",
      "Test scroll-linked UI with real mobile browser chrome in mind.",
      "Do a final pass on real WebKit for iOS-critical flows.",
    ],
    tags: [
      "chrome devtools device mode",
      "device emulation",
      "responsive testing",
    ],
  },
  {
    slug: "debugging-media-queries",
    title: "How to Debug Media Queries Faster",
    description:
      "A systematic workflow for finding and fixing media query bugs - from locating the breaking width to verifying the fix on every breakpoint.",
    eyebrow: "CSS debugging",
    readTime: "7 min read",
    updatedAt: "2026-06-12",
    sections: [
      {
        heading: "Find the exact breaking width first",
        body: "Most media query debugging time is wasted before the real work starts - hunting for where the layout actually breaks. Don't drag the window edge and squint. Binary-search the width: if it breaks at 800px but not 1000px, check 900px, and continue until you have the exact pixel. With side-by-side devices at fixed widths, the breaking range is visible immediately.",
        items: [
          "Binary-search widths instead of continuous resizing",
          "Pin devices at suspected breakpoints and compare directly",
          "Check 1px above and below every @media threshold",
          "Watch for unit mismatches: em-based queries shift with user font size",
        ],
      },
      {
        heading: "Diagnose why the query misbehaves",
        body: "Once you have the width, the usual suspects are ordering and specificity. Later rules of equal specificity win, so overlapping queries (max-width: 768px alongside min-width: 600px) create zones where both apply and source order silently decides. Inspect the element at the breaking width and read which rules are active versus crossed out.",
        items: [
          "Check for overlapping min/max ranges applying simultaneously",
          "Verify the viewport meta tag - without it, mobile queries lie",
          "Look for hardcoded widths fighting the responsive rules",
          "Confirm the query targets the right feature: width vs height vs orientation",
        ],
      },
      {
        heading: "Verify the fix everywhere at once",
        body: "The classic failure: fixing the 768px bug creates a 1024px bug, and you don't find out until QA. This is the strongest argument for multi-device verification - with every breakpoint visible side by side and hot reload syncing all of them, a regression introduced by your fix is visible the second you save the file.",
        items: [
          "Keep all major breakpoints visible while editing CSS",
          "Re-run interactive states (nav, forms, modals) after the fix",
          "Test the boundaries of every range you touched",
          "Screenshot the fixed state for the PR as evidence",
        ],
      },
    ],
    checklist: [
      "Locate the exact breaking width before touching code.",
      "Read active vs overridden rules at that width in the inspector.",
      "Fix once, then verify every breakpoint simultaneously.",
      "Attach before/after screenshots to the pull request.",
    ],
    tags: ["debug media queries", "css debugging", "responsive css"],
  },
  {
    slug: "testing-pwas-across-devices",
    title: "How to Test PWAs Across Devices",
    description:
      "Progressive web apps fail in device-specific ways. A workflow for testing installability, offline behavior, and viewport handling across devices.",
    eyebrow: "PWA testing",
    readTime: "7 min read",
    updatedAt: "2026-06-12",
    sections: [
      {
        heading: "PWAs multiply your testing matrix",
        body: "A PWA isn't one app - it's a website, an installed standalone app, and an offline experience, each rendering differently per platform. iOS Safari, Android Chrome, and desktop each have their own install flows, display modes, and service worker quirks, so a PWA that's perfect in one context can be broken in another.",
        items: [
          "Browser tab, standalone, and minimal-ui modes all render differently",
          "iOS has no install prompt - only Add to Home Screen via the share sheet",
          "Safe areas (notches, home indicators) only matter in standalone mode",
          "Service worker behavior varies with storage pressure per platform",
        ],
      },
      {
        heading: "Test the layouts that only exist when installed",
        body: "Standalone mode removes the browser UI, which changes your real viewport and exposes layout assumptions. Test display-mode media queries, safe-area insets, and your offline page on every device class - side-by-side multi-device testing covers the responsive dimension while you toggle PWA-specific states.",
        items: [
          "Verify @media (display-mode: standalone) styles at every width",
          "Check env(safe-area-inset-*) padding on notched viewports",
          "Kill the network and walk your core flows against the service worker",
          "Test the update path: deploy, reopen, confirm fresh assets load",
        ],
      },
      {
        heading: "A release checklist that scales",
        body: "Run Lighthouse's PWA audit for the basics (manifest, service worker, HTTPS), then do the human pass: install on one real Android device and one real iPhone, test offline flows, and verify your responsive breakpoints in a multi-device browser before every release. QR-to-phone shortcuts make the real-device step fast - point your phone at a code instead of typing local IPs.",
        items: [
          "Lighthouse PWA audit green before manual testing",
          "Real install test on Android and iOS - flows differ completely",
          "Offline and slow-network passes with throttling",
          "Full breakpoint sweep in side-by-side devices before tagging a release",
        ],
      },
    ],
    checklist: [
      "Test browser, standalone, and offline modes as separate experiences.",
      "Verify safe-area insets and display-mode queries on mobile widths.",
      "Install on at least one real Android and one real iOS device.",
      "Sweep all breakpoints side-by-side before each release.",
    ],
    tags: ["pwa testing", "progressive web app", "offline testing"],
  },
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
