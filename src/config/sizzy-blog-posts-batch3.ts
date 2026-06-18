import type { SizzyBlogPost } from "./sizzy-blog-posts";

// Batch 3: a further Ahrefs keyword-gap pass against polypane.app and
// responsively.app, targeting winnable, search-demand-driven developer queries
// not yet covered by earlier batches (CSS/JS reference, tooling, and
// responsive-testing how-tos). Each post has a specific intro, real how-to
// content, FAQ schema, and internal links back to related guides + the product.
export const sizzyBlogPostsBatch3 = [
  {
    slug: "css-3d-transforms",
    title: "CSS 3D Transforms: rotateX, rotateY, and perspective",
    description:
      "A practical guide to CSS 3D transforms - how perspective, rotateX, rotateY, and translateZ work together, plus the gotchas that flatten your 3D effect.",
    eyebrow: "CSS reference",
    readTime: "7 min read",
    updatedAt: "2026-06-19",
    intro:
      "CSS 3D transforms let you rotate and position elements in three-dimensional space, but they only look right when perspective is set up correctly. Here is how the pieces fit together, and why your 3D effect sometimes looks flat.",
    sections: [
      {
        heading: "Perspective is what makes 3D look 3D",
        body: "A rotateY on its own often looks like a squashed 2D element because there is no perspective to create depth. Perspective defines how far the viewer is from the z=0 plane: a smaller value exaggerates the effect, a larger value flattens it. You set it either on the parent (the perspective property) or inline as the first function in transform.",
        items: [
          "perspective: 800px on the parent applies to all 3D children together",
          "transform: perspective(800px) rotateY(45deg) applies per element",
          "Smaller perspective values (300-500px) create a dramatic effect",
          "Larger values (1000px+) look subtle and realistic",
        ],
      },
      {
        heading: "The core 3D transform functions",
        body: "Once perspective is in place, the rotate and translate functions move elements through 3D space. rotateX tips an element forward and back, rotateY swings it left and right like a door, rotateZ spins it in the plane, and translateZ moves it toward or away from the viewer.",
        items: [
          "rotateX(deg): tilt around the horizontal axis",
          "rotateY(deg): swing around the vertical axis",
          "rotateZ(deg): spin in the 2D plane (same as rotate)",
          "translateZ(px): push toward (+) or away (-) from the viewer",
        ],
      },
      {
        heading: "transform-style: preserve-3d for nested elements",
        body: "If you nest 3D-transformed elements, children are flattened into their parent's plane by default. Setting transform-style: preserve-3d on the parent keeps children in the same 3D space, which is essential for building card flips, cubes, and layered scenes.",
        items: [
          "Without preserve-3d, child transforms collapse to 2D",
          "Set it on every ancestor that should share the 3D space",
          "backface-visibility: hidden hides the reversed back of a flipped element",
          "Combine with translateZ to stack faces of a cube",
        ],
      },
      {
        heading: "Why your 3D transform looks broken",
        body: "Most 3D transform bugs come from a missing or misplaced perspective, a forgotten preserve-3d, or transform order. Transform functions apply in sequence, so rotate-then-translate differs from translate-then-rotate. Test the result across viewport sizes too, because a transform that looks right on desktop can clip or overflow on mobile.",
        items: [
          "No perspective set - the element looks flat",
          "preserve-3d missing - nested faces collapse",
          "Transform order wrong - element ends up in the wrong place",
          "Mobile overflow - 3D elements pushing outside the viewport",
        ],
      },
    ],
    checklist: [
      "Set perspective on the parent or inline before rotate functions.",
      "Use transform-style: preserve-3d for any nested 3D elements.",
      "Add backface-visibility: hidden for flip effects.",
      "Verify the effect across phone, tablet, and desktop widths.",
    ],
    tags: ["css 3d transforms", "css 3d", "rotateY", "perspective"],
    faq: [
      {
        question: "How do I create a 3D effect in CSS?",
        answer:
          "Set a perspective value on the parent element (or inline as the first transform function), then apply rotateX, rotateY, or translateZ to the child. Perspective is what gives the rotation real depth instead of looking flat.",
      },
      {
        question: "What does transform-style: preserve-3d do?",
        answer:
          "It keeps child elements in the same 3D space as their parent instead of flattening them into the parent's plane. It is required for nested 3D scenes like card flips and cubes.",
      },
      {
        question: "Why does my CSS 3D transform look flat?",
        answer:
          "Almost always a missing perspective. Without perspective, a rotateY just looks like a horizontally squashed element. Add perspective to the parent or inline before the rotate function.",
      },
    ],
    related: [
      "css-multiple-transforms",
      "debug-css-layout-issues",
      "transparent-gradient-css",
    ],
  },
  {
    slug: "what-is-offsetparent",
    title: "offsetParent in JavaScript, Explained",
    description:
      "What element.offsetParent actually returns, how it relates to offsetTop and offsetLeft, and the positioning rules that decide which ancestor becomes the offset parent.",
    eyebrow: "JavaScript reference",
    readTime: "6 min read",
    updatedAt: "2026-06-19",
    intro:
      "offsetParent trips people up because the element it returns depends on CSS positioning, not the DOM tree. Here is exactly what it returns, when it returns null, and how to use it correctly for measuring positions.",
    sections: [
      {
        heading: "What offsetParent returns",
        body: "element.offsetParent returns the nearest ancestor that the element is positioned relative to for offsetTop and offsetLeft. It is not simply the parent node - it is the closest ancestor with a CSS position other than static (or special elements like the table cell, body, or td).",
        items: [
          "Nearest ancestor with position: relative, absolute, fixed, or sticky",
          "Falls back to the body if no positioned ancestor exists",
          "td, th, and table can also act as offset parents",
          "offsetTop and offsetLeft are measured relative to this element",
        ],
      },
      {
        heading: "When offsetParent is null",
        body: "offsetParent returns null in a few specific cases, and knowing them prevents confusing measurement bugs. The most common is an element that is not rendered, but display: none and fixed positioning also return null in most browsers.",
        items: [
          "The element has display: none",
          "The element (or an ancestor) is detached from the document",
          "The element itself has position: fixed",
          "It is the root html or body element",
        ],
      },
      {
        heading: "offsetParent vs getBoundingClientRect",
        body: "offsetTop and offsetLeft give you position relative to the offsetParent, which is useful for layout math inside a positioned container. But if you want the position relative to the viewport, getBoundingClientRect() is usually the better tool because it does not depend on which ancestor happens to be positioned.",
        items: [
          "offsetTop/Left: relative to offsetParent, integer pixels",
          "getBoundingClientRect(): relative to the viewport, subpixel precision",
          "Use offsetParent math for in-container positioning",
          "Use getBoundingClientRect for scroll and collision detection",
        ],
      },
    ],
    checklist: [
      "Confirm the ancestor you expect actually has a non-static position.",
      "Handle the null case before reading offsetTop or offsetLeft.",
      "Prefer getBoundingClientRect for viewport-relative measurements.",
      "Test measurements across breakpoints where positioning changes.",
    ],
    tags: ["offsetparent", "offsetparent javascript", "offsetTop", "dom"],
    faq: [
      {
        question: "What is offsetParent in JavaScript?",
        answer:
          "It is the nearest ancestor element that the element is positioned relative to for its offsetTop and offsetLeft values - typically the closest ancestor with a CSS position other than static.",
      },
      {
        question: "Why is offsetParent null?",
        answer:
          "offsetParent is null when the element has display: none, is detached from the document, has position: fixed, or is the root html/body element.",
      },
      {
        question: "Should I use offsetParent or getBoundingClientRect?",
        answer:
          "Use offsetTop/offsetLeft (which depend on offsetParent) for positioning math inside a container. Use getBoundingClientRect() when you need position relative to the viewport, such as for scroll or collision detection.",
      },
    ],
    related: [
      "css-position-sticky",
      "debug-css-layout-issues",
      "fix-horizontal-scroll",
    ],
  },
  {
    slug: "enable-experimental-web-platform-features",
    title: "How to Enable Experimental Web Platform Features in Chrome",
    description:
      "How to turn on Chrome's experimental web platform features flag to test upcoming CSS and JavaScript APIs - and why you should never rely on it in production.",
    eyebrow: "Dev workflow",
    readTime: "5 min read",
    updatedAt: "2026-06-19",
    intro:
      "Chrome hides a flag that unlocks not-yet-shipped CSS and JavaScript features so you can test them before they roll out to users. Here is how to enable it safely, and the important caveat about relying on it.",
    sections: [
      {
        heading: "Turning the flag on",
        body: "Experimental web platform features live behind a chrome://flags entry. Enabling it exposes APIs that are implemented but not yet enabled by default, which is useful for previewing new CSS properties and browser APIs while they are still behind the flag.",
        items: [
          "Open chrome://flags in the address bar",
          "Search for 'Experimental Web Platform features'",
          "Set it to Enabled and relaunch Chrome",
          "The same flag exists in Edge and other Chromium browsers",
        ],
      },
      {
        heading: "What it actually unlocks",
        body: "The flag turns on features that have landed in Chromium but are still being stabilized - new CSS selectors, layout features, and JavaScript APIs that are weeks or months from default availability. It is a preview switch, not a settings menu, so the exact list changes with every Chrome version.",
        items: [
          "Upcoming CSS properties still being spec-finalized",
          "New JavaScript and DOM APIs behind the flag",
          "Behavior that can change or be removed between versions",
          "Features that may never ship in their current form",
        ],
      },
      {
        heading: "Never rely on it for real users",
        body: "This is the part people miss: the flag only affects your browser, and the features behind it are unstable. Anything you build on top of an experimental feature can break with the next update and will not work for visitors who have not flipped the flag. Use it to explore, then ship with proper feature detection and fallbacks.",
        items: [
          "Flagged features are off for your actual users",
          "APIs can change shape or disappear between releases",
          "Use @supports and feature detection for anything shipped",
          "Treat it as a sandbox, not a deployment target",
        ],
      },
    ],
    checklist: [
      "Enable the flag in chrome://flags and relaunch.",
      "Confirm the specific feature you want is actually behind this flag.",
      "Never ship code that depends on a flagged feature.",
      "Add @supports fallbacks before using a new feature in production.",
    ],
    tags: [
      "experimental web platform features",
      "chrome flags",
      "css features",
      "web platform",
    ],
    faq: [
      {
        question: "How do I enable experimental web platform features in Chrome?",
        answer:
          "Open chrome://flags, search for 'Experimental Web Platform features', set it to Enabled, and relaunch Chrome. The same flag exists in Edge and other Chromium-based browsers.",
      },
      {
        question: "Is it safe to enable experimental web platform features?",
        answer:
          "It is safe for testing on your own machine, but the features are unstable and can change or break between Chrome versions. Never build production code that depends on a flagged feature.",
      },
      {
        question: "Will flagged features work for my site's visitors?",
        answer:
          "No. The flag only affects your own browser. Visitors who have not enabled it will not get the feature, so always use feature detection and fallbacks for anything you ship.",
      },
    ],
    related: [
      "chrome-devtools-tips",
      "chrome-devtools-device-mode-limitations",
      "container-queries-vs-media-queries",
    ],
  },
  {
    slug: "responsive-viewer-chrome-extension",
    title: "Responsive Viewer Chrome Extension: Setup, Tips, and Limits",
    description:
      "How to use a Responsive Viewer Chrome extension to preview multiple device sizes at once, where it shines, and the limitations that push teams to a dedicated dev browser.",
    eyebrow: "Responsive QA",
    readTime: "6 min read",
    updatedAt: "2026-06-19",
    intro:
      "A Responsive Viewer extension shows your page at several device widths inside a single Chrome tab - a quick win for spotting layout breaks. Here is how to get the most from it, plus where an extension hits its ceiling.",
    sections: [
      {
        heading: "What a Responsive Viewer extension does",
        body: "These extensions render your current URL in several iframes side by side, each sized to a device preset. It is a fast way to eyeball whether a layout holds up across phone, tablet, and desktop widths without resizing your window over and over.",
        items: [
          "Multiple device widths visible in one tab",
          "Preset sizes for common phones, tablets, and desktops",
          "Quick screenshots of the multi-device view",
          "Zero install beyond the extension itself",
        ],
      },
      {
        heading: "Getting the most out of it",
        body: "An extension is best for a fast visual pass. Add the widths that match your real analytics, not just the defaults, and use it early - while you are still writing CSS - so breakpoint issues surface before QA.",
        items: [
          "Add custom widths from your analytics' top resolutions",
          "Check the awkward zones around 480px and 768px",
          "Use it during development, not just at the end",
          "Pair it with DevTools for inspecting a single frame",
        ],
      },
      {
        heading: "Where extensions hit their limits",
        body: "Because the page runs in iframes inside Chrome, extensions struggle with things that depend on a real browser context: synchronized interaction across frames, isolated sessions for logged-in testing, accurate user agents, and stable screenshots. Heavy responsive workflows usually outgrow them.",
        items: [
          "Limited or no synchronized clicking, scrolling, and typing",
          "iframe sandboxing breaks some sites and auth flows",
          "No isolated sessions for testing multiple accounts at once",
          "Screenshot fidelity and device frames are basic",
        ],
      },
      {
        heading: "When to graduate to a dev browser",
        body: "If you do responsive work daily, a dedicated development browser removes the iframe limitations: real synchronized interactions across devices, isolated sessions, accurate device emulation, and built-in screenshot tooling in one window. Sizzy is built for exactly this kind of multi-device workflow.",
        items: [
          "Synchronized scroll, click, and type across every device",
          "Isolated sessions to test logged-in and logged-out states together",
          "Accurate device frames and viewport emulation",
          "Built-in framed screenshots for QA and marketing",
        ],
      },
    ],
    checklist: [
      "Add device widths that match your real traffic.",
      "Use the extension during development to catch breaks early.",
      "Note where iframe sandboxing breaks your site or auth.",
      "Move to a dev browser if you test responsiveness daily.",
    ],
    tags: [
      "responsive viewer chrome extension",
      "responsive testing",
      "chrome extension",
      "multiple devices",
    ],
    faq: [
      {
        question: "What is a Responsive Viewer Chrome extension?",
        answer:
          "It is an extension that renders your page at several device widths side by side inside one Chrome tab, so you can spot responsive layout breaks without resizing your window repeatedly.",
      },
      {
        question: "What are the limitations of responsive viewer extensions?",
        answer:
          "Because pages run in iframes, they struggle with synchronized interactions, isolated logged-in sessions, accurate user agents, and high-fidelity screenshots. Sites with strict framing rules may also fail to load.",
      },
      {
        question: "Is a Responsive Viewer extension enough for daily work?",
        answer:
          "For an occasional visual check, yes. For daily responsive development, a dedicated dev browser like Sizzy removes the iframe limitations with synchronized interactions, isolated sessions, and built-in screenshots.",
      },
    ],
    related: [
      "test-responsive-design-on-multiple-devices",
      "responsive-screenshot-workflow",
      "chrome-devtools-device-mode-limitations",
    ],
  },
  {
    slug: "how-to-find-website-breakpoints",
    title: "How to Find the Breakpoints of Any Website",
    description:
      "Three reliable ways to find a website's responsive breakpoints - reading the CSS media queries, watching the layout change, and using device tooling to confirm.",
    eyebrow: "Responsive QA",
    readTime: "6 min read",
    updatedAt: "2026-06-19",
    intro:
      "Whether you are auditing your own site or studying a competitor's, finding the exact widths where the layout changes is straightforward once you know where to look. Here are three ways, from precise to practical.",
    sections: [
      {
        heading: "Method 1: read the media queries in DevTools",
        body: "The most exact answer lives in the CSS. Open DevTools, go to the styles or sources panel, and look for @media rules. The min-width and max-width values in those rules are the literal breakpoints the site was built around.",
        items: [
          "Open DevTools and inspect the stylesheet",
          "Search the CSS for '@media' to list every query",
          "min-width and max-width values are the breakpoints",
          "Watch for common framework values like 640, 768, 1024, 1280",
        ],
      },
      {
        heading: "Method 2: resize and watch the layout snap",
        body: "If you cannot easily read the CSS, drag the window narrower and watch for the moments the layout reflows - a sidebar collapsing, a nav turning into a hamburger, columns stacking. Each of those jumps is a breakpoint. DevTools device mode shows the current width as you drag, so you can note the exact pixel value.",
        items: [
          "Slowly narrow the viewport and watch for layout jumps",
          "Note the width at each reflow - that is a breakpoint",
          "Hamburger menus and stacking columns are the clearest signals",
          "Device mode shows the live pixel width while you resize",
        ],
      },
      {
        heading: "Method 3: confirm across real device widths",
        body: "Reading values is one thing; confirming the layout actually behaves at and around each breakpoint is another. View the site at several widths at once so you can verify the transitions are clean - especially 20px on either side of each breakpoint, where bugs hide. A multi-device browser like Sizzy shows every width simultaneously instead of one at a time.",
        items: [
          "Test at, just below, and just above each breakpoint",
          "Check the in-between zones, not only the round numbers",
          "View multiple widths together to compare transitions",
          "Capture screenshots of the riskiest breakpoint changes",
        ],
      },
    ],
    checklist: [
      "List every @media rule in the site's CSS.",
      "Note each width where the layout visibly reflows.",
      "Test 20px below, at, and above every breakpoint.",
      "Verify the transitions on real device widths, not just by resizing.",
    ],
    tags: [
      "website breakpoints",
      "find breakpoints",
      "css breakpoints",
      "responsive testing",
    ],
    faq: [
      {
        question: "How do I find a website's breakpoints?",
        answer:
          "Open DevTools and search the CSS for @media rules - the min-width and max-width values are the breakpoints. You can also resize the window and note the widths where the layout visibly changes.",
      },
      {
        question: "What are common responsive breakpoints?",
        answer:
          "Frameworks gravitate toward 640px, 768px, 1024px, and 1280px, but every site sets its own. Always confirm by reading the actual CSS rather than assuming standard values.",
      },
      {
        question: "How do I test a layout at its breakpoints?",
        answer:
          "Check the layout at, just below, and just above each breakpoint - the in-between zones are where bugs hide. Viewing several widths at once in a tool like Sizzy makes the transitions easy to compare.",
      },
    ],
    related: [
      "css-breakpoints-guide",
      "responsive-breakpoint-checklist",
      "test-responsive-design-on-multiple-devices",
    ],
  },
  {
    slug: "responsive-web-design-tools",
    title: "Responsive Web Design Tools: The Practical 2026 List",
    description:
      "The responsive web design tools that actually earn a place in your workflow - for previewing breakpoints, debugging layout, capturing screenshots, and testing on real devices.",
    eyebrow: "Dev workflow",
    readTime: "7 min read",
    updatedAt: "2026-06-19",
    intro:
      "There are dozens of responsive design tools, but most workflows only need a handful. Here are the categories that matter and what each one is genuinely good for, so you can build a lean toolkit instead of collecting tabs.",
    sections: [
      {
        heading: "Multi-device preview tools",
        body: "The core of responsive work is seeing your layout at multiple widths at once. Browser DevTools device mode handles one viewport at a time; extensions show a few in iframes; and dedicated dev browsers show many real, interactive viewports together. Pick based on how often you do responsive work.",
        items: [
          "DevTools device mode: free, one viewport at a time",
          "Responsive viewer extensions: a few iframes side by side",
          "Dev browsers (Sizzy): many synchronized, interactive devices",
          "Match the tool to how frequently you test layouts",
        ],
      },
      {
        heading: "Layout debugging tools",
        body: "When something breaks, you need to see the box model, grid, and flexbox lines. DevTools has built-in grid and flexbox overlays that are essential, and the rulers and color overlays help catch overflow and alignment issues.",
        items: [
          "Grid and flexbox overlays in DevTools",
          "Layout shift and overflow highlighting",
          "Ruler and measurement tools for spacing",
          "The :has, :not, and container query inspectors",
        ],
      },
      {
        heading: "Screenshot and documentation tools",
        body: "Responsive QA and client work both need evidence: framed screenshots across devices, full-page captures, and side-by-side comparisons. Built-in browser screenshots cover the basics, while dedicated tooling produces device-framed images suitable for marketing and bug reports.",
        items: [
          "Full-page and viewport screenshots from DevTools",
          "Device-framed screenshots for marketing and QA",
          "Side-by-side multi-device captures",
          "Visual comparison for regression checks",
        ],
      },
      {
        heading: "Real-device and emulation tools",
        body: "Emulation covers most cases, but some bugs only appear on real hardware - especially iOS Safari quirks and touch behavior. Cloud real-device services fill that gap, while accurate emulation in a dev browser handles the day-to-day. Use real devices to verify, emulation to iterate.",
        items: [
          "Accurate viewport and user-agent emulation for daily work",
          "Cloud real-device services for final iOS/Android verification",
          "Touch and gesture testing for interactive components",
          "Network throttling to test on slow connections",
        ],
      },
    ],
    checklist: [
      "Have one reliable multi-device preview tool you use daily.",
      "Keep DevTools grid/flex overlays handy for debugging.",
      "Use device-framed screenshots for QA evidence and marketing.",
      "Verify the riskiest bugs on real devices, not just emulators.",
    ],
    tags: [
      "responsive web design tools",
      "responsive testing tools",
      "web design tools",
      "frontend tools",
    ],
    faq: [
      {
        question: "What tools do I need for responsive web design?",
        answer:
          "A multi-device preview tool, DevTools for layout debugging, a screenshot tool for QA evidence, and access to real-device testing for final verification. Most workflows need one good option in each category, not dozens.",
      },
      {
        question: "Is DevTools enough for responsive design?",
        answer:
          "For occasional checks, yes. For daily responsive work, DevTools' one-viewport-at-a-time device mode becomes slow, and a dedicated dev browser that shows many synchronized devices saves significant time.",
      },
      {
        question: "Do I need real devices or are emulators enough?",
        answer:
          "Accurate emulation handles most day-to-day testing. Keep real-device access for final verification of iOS Safari quirks, touch interactions, and anything that behaves differently on actual hardware.",
      },
    ],
    related: [
      "best-browser-for-developers",
      "responsive-screenshot-workflow",
      "real-devices-vs-emulators",
    ],
  },
  {
    slug: "responsinator-alternatives",
    title: "Responsinator Alternatives for Responsive Testing",
    description:
      "Responsinator is a fast free way to preview a URL on common device sizes, but it has real limits. Here are the alternatives - from DevTools to dedicated dev browsers.",
    eyebrow: "Comparison",
    readTime: "6 min read",
    updatedAt: "2026-06-19",
    intro:
      "Responsinator is the classic quick-look tool: paste a URL, see it on a few device frames. It is great for a five-second sanity check, but it does not handle interaction, auth, or local development. Here are the alternatives and when each fits.",
    sections: [
      {
        heading: "What Responsinator is good at",
        body: "Responsinator's appeal is speed and zero setup. You paste a public URL and instantly see it rendered at a handful of common device sizes. For a quick 'does this look roughly right on mobile' check of a live page, it is hard to beat.",
        items: [
          "No install, no account - just paste a URL",
          "Common device sizes shown together",
          "Good for a fast visual sanity check",
          "Works on any public, embeddable page",
        ],
      },
      {
        heading: "Where Responsinator falls short",
        body: "Because it loads your page in iframes, Responsinator cannot test interactions, logged-in states, or local development URLs, and sites that block framing will not load at all. It is a viewer, not a testing environment.",
        items: [
          "Cannot test localhost or password-protected pages",
          "No synchronized clicking, scrolling, or typing",
          "Sites with frame-busting headers refuse to load",
          "No real device emulation or session isolation",
        ],
      },
      {
        heading: "The alternatives, by use case",
        body: "The right replacement depends on what Responsinator was missing for you. For free single-viewport checks, DevTools device mode is built in. For a few widths at once, a responsive viewer extension works. For daily, interactive, local-dev-friendly testing, a dedicated dev browser is the upgrade.",
        items: [
          "Chrome DevTools device mode: free, built in, one viewport",
          "Responsive viewer extensions: a few iframes side by side",
          "Sizzy: synchronized interactive devices, localhost support, screenshots",
          "Cloud real-device services: final verification on real hardware",
        ],
      },
      {
        heading: "Why a dev browser is the real upgrade",
        body: "Responsinator's biggest limitation - no interaction and no local development - is exactly what a development browser solves. Sizzy renders your localhost on many real, synchronized devices at once, supports logged-in sessions, and captures framed screenshots, so it covers both the quick look and the deep testing.",
        items: [
          "Open localhost on every device class simultaneously",
          "Synchronized interactions to test flows, not just layouts",
          "Isolated sessions for multi-account and auth testing",
          "Built-in device-framed screenshots for QA and marketing",
        ],
      },
    ],
    checklist: [
      "Use Responsinator (or DevTools) for fast public-URL sanity checks.",
      "Switch tools when you need to test localhost or logged-in states.",
      "Pick a tool that supports synchronized interaction for flows.",
      "Verify the riskiest layouts on real devices before release.",
    ],
    tags: [
      "responsinator alternatives",
      "responsive testing tools",
      "responsive design",
      "dev browser",
    ],
    faq: [
      {
        question: "What is the best Responsinator alternative?",
        answer:
          "For free single-viewport checks, Chrome DevTools device mode. For interactive, local-development-friendly testing across many devices at once, a dedicated dev browser like Sizzy is the upgrade.",
      },
      {
        question: "Can Responsinator test localhost?",
        answer:
          "No. Responsinator only loads public URLs in iframes, so it cannot preview a local development server. A dev browser like Sizzy opens your localhost directly across multiple devices.",
      },
      {
        question: "Why won't my site load in Responsinator?",
        answer:
          "Sites that send frame-busting headers (X-Frame-Options or a restrictive CSP) refuse to load in Responsinator's iframes. A dev browser that loads the page directly avoids this problem.",
      },
    ],
    related: [
      "test-responsive-design-on-multiple-devices",
      "browserstack-alternatives",
      "real-devices-vs-emulators",
    ],
  },
] satisfies SizzyBlogPost[];
