import type { SizzyBlogPost } from "./sizzy-blog-posts";

// Batch 2: articles aimed at winnable, search-demand-driven developer queries
// (CSS reference + how-to intent) identified via an Ahrefs keyword-gap pass
// against polypane.app and responsively.app. Each post has a specific intro,
// real how-to content, FAQ schema, and internal links back to the product.
export const sizzyBlogPostsBatch2 = [
  {
    slug: "how-to-inspect-element-on-iphone",
    title: "How to Inspect Element on iPhone",
    description:
      "Three reliable ways to inspect element on a real iPhone - Safari Web Inspector over USB, remote debugging without a Mac, and a faster local workflow.",
    eyebrow: "Mobile debugging",
    readTime: "7 min read",
    updatedAt: "2026-06-18",
    intro:
      "There is no \"inspect element\" button inside mobile Safari, but you can still open real DevTools for a page running on your iPhone. Here are the three approaches that actually work, from the official USB method to faster local alternatives.",
    sections: [
      {
        heading: "Method 1: Safari Web Inspector over USB (the official way)",
        body: "If you have a Mac, Safari's Web Inspector gives you full DevTools - elements, console, network, and storage - for any page open on a connected iPhone. It uses the real iOS WebKit engine, so what you inspect is exactly what your users see.",
        items: [
          "On iPhone: Settings > Apps > Safari > Advanced > turn on Web Inspector",
          "On Mac: Safari > Settings > Advanced > Show features for web developers",
          "Connect the iPhone by cable and trust the computer when prompted",
          "Mac Safari > Develop menu > [your iPhone] > pick the open tab to inspect",
        ],
      },
      {
        heading: "Method 2: Inspect an iPhone page without a Mac",
        body: "No Mac? You can still debug real mobile behavior using a remote inspection service or a WebKit-based cloud device. These proxy the page through a desktop DevTools panel so you keep a clickable element tree and live console.",
        items: [
          "Use a web-based remote inspector that pairs with the device over the network",
          "Use a cloud real-device service that exposes WebKit DevTools in the browser",
          "Reach for these when you need genuine iOS Safari rendering, not emulation",
          "Expect slower iteration than a local setup - good for verification, not authoring",
        ],
      },
      {
        heading: "Method 3: The faster local workflow most bugs need",
        body: "Most layout and CSS bugs are viewport bugs, not engine bugs. For those you do not need a physical phone at all - an accurate iPhone viewport on your machine lets you inspect and fix with a full desktop DevTools panel, then confirm on a real device only for the last mile.",
        items: [
          "Open your localhost at an accurate iPhone viewport and user agent",
          "Inspect with full desktop DevTools - no squinting at a 6-inch screen",
          "Hot-reload changes and see them instantly at phone width",
          "Confirm true Safari engine quirks on a real device only at the end",
        ],
      },
    ],
    checklist: [
      "Enable Web Inspector on the iPhone before connecting.",
      "Confirm the Develop menu lists your device in desktop Safari.",
      "Reproduce the bug at the exact iPhone viewport, not a rounded width.",
      "Verify WebKit-specific behavior (100vh, sticky, inputs) on real hardware.",
    ],
    tags: ["inspect element on iphone", "ios debugging", "mobile testing"],
    faq: [
      {
        question: "Can you inspect element on iPhone without a computer?",
        answer:
          "Not with on-device Safari alone - iOS has no built-in inspect element gesture. You need either a Mac running Safari Web Inspector over USB, or a remote inspection / cloud-device service that surfaces DevTools in a desktop browser.",
      },
      {
        question: "Why doesn't my iPhone show up in the Safari Develop menu?",
        answer:
          "Make sure Web Inspector is enabled on the iPhone (Settings > Apps > Safari > Advanced), the device is unlocked and trusted, and that the Develop menu is enabled in desktop Safari. Reconnecting the cable or restarting Safari usually fixes a missing device.",
      },
      {
        question: "Do I need a real iPhone to fix mobile CSS bugs?",
        answer:
          "Usually no. The majority of responsive bugs are viewport and breakpoint issues you can reproduce and fix at an accurate iPhone width with full desktop DevTools. Keep a real device for verifying WebKit-only behavior like 100vh handling and form controls.",
      },
    ],
    related: [
      "inspect-element-on-mobile",
      "test-on-iphone-without-iphone",
      "iphone-viewport-sizes",
    ],
  },
  {
    slug: "css-not-selector",
    title: "The CSS :not() Selector: A Complete Guide",
    description:
      "How the CSS :not() selector works, why it has zero specificity rules of its own, and practical patterns for excluding elements without extra classes.",
    eyebrow: "CSS reference",
    readTime: "6 min read",
    updatedAt: "2026-06-18",
    intro:
      "The :not() pseudo-class matches every element that does not match the selector you pass it. It is the cleanest way to style \"everything except\" without adding negation classes by hand - but its specificity behaves in a way that surprises a lot of developers.",
    sections: [
      {
        heading: "What :not() does and how to write it",
        body: "Pass :not() a selector and it inverts the match. Modern browsers accept a full selector list, so you can exclude several things at once instead of chaining multiple :not() calls.",
        items: [
          "li:not(.active) - every list item that is not active",
          "input:not([type=\"checkbox\"]) - all inputs except checkboxes",
          ":not(h1, h2, h3) - anything that is not a top-level heading",
          "a:not(:last-child) - every link except the final one",
        ],
      },
      {
        heading: "The specificity gotcha",
        body: "The :not() pseudo-class itself adds no specificity - but the selector inside it does. That means :not(.foo) carries the weight of a class selector, which can quietly make a rule stronger than you expected and override styles you wanted to win.",
        items: [
          "div:not(.x) has the specificity of div plus a class, not just div",
          "Specificity comes from the heaviest selector in the argument list",
          "Use it to remove unwanted resets without an !important arms race",
          "Inspect the cascade live to confirm which rule actually wins",
        ],
      },
      {
        heading: "Real-world patterns",
        body: "Negation shines for spacing, dividers, and form states where you want a default applied to a group and removed from the edges or exceptions.",
        items: [
          "Add a border to every row except the last: tr:not(:last-child)",
          "Style links that are not buttons: a:not(.btn)",
          "Target enabled fields only: input:not(:disabled)",
          "Combine with :has() to exclude containers that hold a specific child",
        ],
      },
    ],
    checklist: [
      "Replace negation utility classes with a single :not() where possible.",
      "Check the specificity added by the selector inside :not().",
      "Use the selector-list form to collapse multiple :not() chains.",
      "Verify the result across breakpoints, not just one viewport.",
    ],
    tags: ["css not", "css selectors", "css reference"],
    faq: [
      {
        question: "Does :not() increase specificity?",
        answer:
          "The :not() pseudo-class adds nothing on its own, but the selector you pass into it does. :not(.active) contributes the specificity of a class, so the overall rule is stronger than the bare element selector alone.",
      },
      {
        question: "Can :not() take multiple selectors?",
        answer:
          "Yes. Modern browsers support a selector list inside :not(), so :not(h1, h2, h3) excludes all three. Older engines only accepted a single simple selector and required chaining like :not(h1):not(h2).",
      },
      {
        question: "What is the difference between :not() and :is()?",
        answer:
          ":is() matches if any selector in its list matches, while :not() matches when none of them do. They are inverses, and both take their specificity from the most specific selector in the argument list.",
      },
    ],
    related: ["css-has-selector", "debug-css-layout-issues"],
  },
  {
    slug: "css-position-sticky",
    title: "CSS position: sticky, Explained",
    description:
      "How CSS position: sticky actually works, the threshold offsets that control it, and the layout rules every sticky element depends on.",
    eyebrow: "CSS reference",
    readTime: "6 min read",
    updatedAt: "2026-06-18",
    intro:
      "position: sticky is a hybrid of relative and fixed positioning: an element scrolls normally until it reaches a threshold, then sticks in place within its container. Get the threshold and container rules right and it just works - miss one and it silently does nothing.",
    sections: [
      {
        heading: "How sticky positioning behaves",
        body: "A sticky element stays in the normal flow and scrolls with the page until its offset threshold is crossed, at which point it pins relative to the nearest scrolling ancestor. It un-sticks again when its containing block scrolls out of view.",
        items: [
          "It is positioned relative until the threshold, then fixed-like",
          "It is constrained to its parent - it never escapes the container",
          "It only pins within the scroll area of its nearest scrolling ancestor",
          "Multiple sticky siblings can stack or replace each other as you scroll",
        ],
      },
      {
        heading: "You must set a threshold offset",
        body: "Sticky does nothing without at least one of top, right, bottom, or left. That offset is the distance from the scroll-container edge where the element should stop and stick.",
        items: [
          "top: 0 pins the element to the top once it reaches the viewport edge",
          "Use bottom for footers and reading-progress bars",
          "Account for fixed headers by adding their height to the offset",
          "Combine with scroll-margin to fine-tune anchored sections",
        ],
      },
      {
        heading: "The container rules that make or break it",
        body: "Most sticky failures come from an ancestor, not the element itself. A parent with the wrong overflow value or a height that is too short stops sticky from ever engaging.",
        items: [
          "No ancestor between element and scroll root can have overflow hidden/auto/scroll",
          "The parent needs enough height for the element to travel and stick",
          "Sticky is scoped to its direct parent's box, so a short parent ends it early",
          "Flex and grid children can stick, but the container still needs room",
        ],
      },
    ],
    checklist: [
      "Set at least one threshold offset (top/bottom/left/right).",
      "Audit every ancestor for overflow values that clip sticky.",
      "Confirm the parent is tall enough for the element to travel.",
      "Test the sticky behavior at mobile, tablet, and desktop widths.",
    ],
    tags: ["css sticky", "css position sticky", "css reference"],
    faq: [
      {
        question: "What does position: sticky do?",
        answer:
          "It keeps an element in normal flow until it reaches a defined offset (like top: 0) during scroll, then pins it in place within its containing block until that container scrolls away.",
      },
      {
        question: "Why is my sticky element not sticking?",
        answer:
          "The two most common causes are a missing threshold offset (you must set top, bottom, left, or right) and an ancestor with overflow: hidden, auto, or scroll that creates a new scroll context. A parent that is too short also ends sticking early.",
      },
      {
        question: "What is the difference between sticky and fixed?",
        answer:
          "Fixed elements are removed from flow and stay relative to the viewport everywhere. Sticky elements stay in flow, only pin after crossing a threshold, and are constrained to their parent container.",
      },
    ],
    related: ["position-sticky-not-working", "debug-css-layout-issues"],
  },
  {
    slug: "position-sticky-not-working",
    title: "Why position: sticky Is Not Working (and How to Fix It)",
    description:
      "A checklist of the real reasons CSS position: sticky stops working - missing offsets, overflow on ancestors, short parents - and how to fix each one.",
    eyebrow: "CSS debugging",
    readTime: "6 min read",
    updatedAt: "2026-06-18",
    intro:
      "position: sticky almost always fails for one of a handful of reasons, and none of them throw an error - the element just scrolls away as if sticky were never declared. Work down this list in order and you will find the culprit fast.",
    sections: [
      {
        heading: "1. You forgot the threshold offset",
        body: "This is the number-one cause. sticky needs at least one of top, right, bottom, or left to know where to pin. Without it the element is valid but never engages.",
        items: [
          "Add top: 0 (or another edge) to the sticky element itself",
          "The offset is measured from the scroll container's edge",
          "Offsetting for a fixed header? Add that header's height to top",
          "Confirm the value is not being overridden lower in the cascade",
        ],
      },
      {
        heading: "2. An ancestor has the wrong overflow",
        body: "If any parent between the sticky element and the scroll root has overflow set to hidden, auto, or scroll, it creates a new scroll context and the element sticks to that instead - usually invisibly.",
        items: [
          "Search up the tree for overflow: hidden/auto/scroll",
          "A common offender is a wrapper added for rounded corners or clipping",
          "Remove or move the overflow, or make that ancestor the scroll context",
          "Use DevTools to walk ancestors and watch where sticking breaks",
        ],
      },
      {
        heading: "3. The parent is too short (or the wrong display)",
        body: "Sticky is constrained to its direct parent. If the parent is only as tall as the element, there is no room to travel, so it appears not to stick. Certain display and height combinations also interfere.",
        items: [
          "Give the parent enough height for scrolling to occur within it",
          "Watch for height: 100% chains that collapse the container",
          "In tables, stick to th/thead and confirm browser support",
          "Re-test after every layout change, since new wrappers reintroduce the bug",
        ],
      },
    ],
    checklist: [
      "Threshold offset is set on the sticky element.",
      "No ancestor has overflow hidden/auto/scroll unintentionally.",
      "The parent container is tall enough to allow travel.",
      "Behavior verified at multiple viewport widths.",
    ],
    tags: ["position sticky not working", "css debugging", "css sticky"],
    faq: [
      {
        question: "Why is position sticky not working at all?",
        answer:
          "In most cases you are missing a threshold offset - sticky does nothing without top, bottom, left, or right. The next most likely cause is an ancestor with overflow: hidden, auto, or scroll capturing the scroll context.",
      },
      {
        question: "Does overflow: hidden break position sticky?",
        answer:
          "Yes, if it is on an ancestor between the sticky element and the scroll root. That ancestor becomes the scroll container, and the element only sticks within it - which often looks like it is not sticking at all.",
      },
      {
        question: "Why does sticky stop halfway down the page?",
        answer:
          "Sticky is constrained to its direct parent. Once that parent scrolls out of view, the element un-sticks. If it stops earlier than expected, the parent is shorter than you think - give it more height or move the element up the tree.",
      },
    ],
    related: ["css-position-sticky", "fix-horizontal-scroll", "debug-css-layout-issues"],
  },
  {
    slug: "graceful-degradation-vs-progressive-enhancement",
    title: "Graceful Degradation vs Progressive Enhancement",
    description:
      "What graceful degradation means, how it differs from progressive enhancement, and how to decide which strategy fits your project and audience.",
    eyebrow: "Web strategy",
    readTime: "6 min read",
    updatedAt: "2026-06-18",
    intro:
      "Graceful degradation and progressive enhancement are two directions toward the same goal: a site that works for everyone. Graceful degradation builds the full experience first and ensures it still works when features are missing; progressive enhancement starts from a baseline and layers richness on top.",
    sections: [
      {
        heading: "What graceful degradation means",
        body: "Graceful degradation builds for modern, capable browsers first, then makes sure the experience still functions - not necessarily identically - when a feature is unavailable. The site degrades in a controlled way rather than breaking.",
        items: [
          "Start from the full-featured experience",
          "Provide fallbacks for older or limited environments",
          "Core content and tasks stay usable when enhancements drop out",
          "Common with feature detection and @supports fallbacks",
        ],
      },
      {
        heading: "How progressive enhancement differs",
        body: "Progressive enhancement inverts the order. You ship a working baseline - semantic HTML and core functionality - then add CSS and JavaScript layers that capable browsers can use, without the baseline ever depending on them.",
        items: [
          "Start from a guaranteed baseline of HTML and core function",
          "Layer styling and interactivity as capabilities allow",
          "The baseline never breaks if a layer fails to load",
          "Tends to be more resilient for unknown or constrained clients",
        ],
      },
      {
        heading: "Which one to choose",
        body: "They are complementary mindsets, not enemies. The right call depends on your audience, your baseline requirements, and how much risk a missing feature introduces.",
        items: [
          "Broad or unknown audience: lean progressive enhancement",
          "Modern, controlled audience: graceful degradation is often pragmatic",
          "Use @supports and feature detection in both approaches",
          "Test the degraded path, not just the enhanced one",
        ],
      },
    ],
    checklist: [
      "Define the non-negotiable baseline experience.",
      "List features that need fallbacks or enhancement layers.",
      "Use @supports / feature detection rather than browser sniffing.",
      "Test both the enhanced and the degraded experience.",
    ],
    tags: ["graceful degradation", "progressive enhancement", "web strategy"],
    faq: [
      {
        question: "What is graceful degradation in web design?",
        answer:
          "It is the practice of building the full, modern experience first and then ensuring the site still works in a reduced form when a browser lacks a given feature, so it degrades in a controlled way instead of breaking.",
      },
      {
        question: "Is progressive enhancement better than graceful degradation?",
        answer:
          "Neither is universally better. Progressive enhancement is more resilient for broad or unknown audiences because the baseline never depends on enhancements. Graceful degradation can be more practical when you target modern, controlled environments.",
      },
      {
        question: "How do I test for graceful degradation?",
        answer:
          "Disable or simulate missing capabilities - turn off JavaScript, test older engines, or use feature-query fallbacks - and confirm core content and tasks still work. Testing across multiple browsers and devices at once makes the degraded paths easy to spot.",
      },
    ],
    related: ["adaptive-vs-responsive-design", "cross-browser-testing-guide"],
  },
  {
    slug: "adaptive-vs-responsive-design",
    title: "Adaptive Design vs Responsive Design",
    description:
      "What adaptive design is, how it differs from responsive design, and when fixed-width breakpoints beat a fluid layout (and vice versa).",
    eyebrow: "Responsive design",
    readTime: "6 min read",
    updatedAt: "2026-06-18",
    intro:
      "Adaptive and responsive design both aim to fit content to the screen, but they get there differently. Adaptive design serves a handful of fixed layouts chosen by device class; responsive design uses one fluid layout that flexes continuously across every width.",
    sections: [
      {
        heading: "What adaptive design is",
        body: "Adaptive design defines several distinct fixed-width layouts and snaps to the closest one based on the detected screen or breakpoint. Between those points the layout does not flex - it jumps from one designed size to the next.",
        items: [
          "Multiple fixed layouts for set screen widths",
          "Snaps to the nearest layout rather than flowing",
          "Predictable pixel-perfect control at each target size",
          "Can leave gaps at widths you did not design for",
        ],
      },
      {
        heading: "What responsive design is",
        body: "Responsive design uses fluid grids, flexible images, and media or container queries so a single layout stretches and reflows smoothly across the full range of viewports.",
        items: [
          "One fluid layout that flexes at every width",
          "Relative units and flexible grids do the heavy lifting",
          "Media and container queries adjust at breakpoints",
          "Better coverage of the in-between widths",
        ],
      },
      {
        heading: "When to use which",
        body: "Most modern sites are responsive, but adaptive still earns its place where you need tight control or are constrained to specific device targets.",
        items: [
          "Responsive: marketing sites, content, anything with diverse devices",
          "Adaptive: tightly-scoped apps or legacy device targets",
          "Hybrid: responsive base with adaptive tweaks at key breakpoints",
          "Whichever you pick, verify the awkward in-between widths",
        ],
      },
    ],
    checklist: [
      "Decide between fluid (responsive) or fixed-step (adaptive) per project.",
      "Map the device classes or breakpoints you must support.",
      "Check the widths between your breakpoints for gaps.",
      "Validate the layout on real device sizes side by side.",
    ],
    tags: ["adaptive design", "responsive design", "web design"],
    faq: [
      {
        question: "What is adaptive design?",
        answer:
          "Adaptive design uses several fixed-width layouts and serves the one closest to the user's screen or breakpoint. Unlike responsive design it does not flex continuously - it snaps between designed sizes.",
      },
      {
        question: "Is adaptive or responsive design better?",
        answer:
          "Responsive design suits most sites because one fluid layout covers every width. Adaptive design is useful when you need pixel-precise control at specific device sizes or are targeting a known, limited set of devices.",
      },
      {
        question: "Can you combine adaptive and responsive design?",
        answer:
          "Yes. A common hybrid is a responsive fluid base with adaptive adjustments at key breakpoints, giving smooth scaling plus tighter control where it matters most.",
      },
    ],
    related: ["fluid-web-design", "css-breakpoints-guide", "mobile-first-vs-desktop-first"],
  },
  {
    slug: "css-textarea",
    title: "Styling a CSS Textarea (resize, rows, and autosize)",
    description:
      "How to style a textarea with CSS - control resizing, set sizing with rows and CSS, fix common quirks, and build a clean autosizing field.",
    eyebrow: "CSS reference",
    readTime: "6 min read",
    updatedAt: "2026-06-18",
    intro:
      "A textarea is just a multi-line text input, but it has its own quirks: a default resize handle, rows-based sizing, and inconsistent padding across browsers. Here is how to bring it fully under CSS control.",
    sections: [
      {
        heading: "Control the resize handle",
        body: "By default a textarea can be dragged to resize, which often breaks careful layouts. The resize property gives you full control over that behavior.",
        items: [
          "resize: none disables dragging entirely",
          "resize: vertical allows height changes only - the safest default",
          "resize: both is the browser default",
          "Pair with min-height and max-height to bound the range",
        ],
      },
      {
        heading: "Size it with rows and CSS",
        body: "The rows attribute sets an initial line count, but CSS height wins for precise control. Use both deliberately so the field looks right before and after styles load.",
        items: [
          "rows gives a sensible default height without CSS",
          "height or min-height in CSS sets a precise size",
          "Use line-height and padding for comfortable text spacing",
          "field-sizing: content enables native autosizing where supported",
        ],
      },
      {
        heading: "Fix common quirks",
        body: "Textareas inherit a few browser defaults that look off until you reset them. A small base of styles makes them match the rest of your form.",
        items: [
          "Set font-family: inherit so it matches your inputs",
          "Normalize padding and border for cross-browser consistency",
          "box-sizing: border-box keeps width predictable",
          "Style :focus and :disabled states like your other fields",
        ],
      },
    ],
    checklist: [
      "Decide on a resize policy (none / vertical / both).",
      "Set sizing with rows plus min-height for resilience.",
      "Inherit font-family and normalize padding.",
      "Style focus and disabled states to match other inputs.",
    ],
    tags: ["css textarea", "css forms", "css reference"],
    faq: [
      {
        question: "How do I stop a textarea from being resizable?",
        answer:
          "Set resize: none in CSS. If you still want users to grow the field vertically but not horizontally, use resize: vertical, which is usually the better choice for layout stability.",
      },
      {
        question: "How do I set the size of a textarea?",
        answer:
          "Use the rows attribute for a default line count and CSS height or min-height for precise control. Combining both gives a good size before and after your stylesheet loads.",
      },
      {
        question: "How do I make a textarea auto-grow with content?",
        answer:
          "Modern browsers support field-sizing: content, which makes the textarea grow with its text. Where that is unsupported, a small script that syncs height to scrollHeight on input achieves the same effect.",
      },
    ],
    related: ["debug-css-layout-issues", "responsive-typography-clamp"],
  },
  {
    slug: "css-has-selector",
    title: "The CSS :has() Selector Explained",
    description:
      "How the CSS :has() selector lets you style a parent based on its children - the long-awaited parent selector - with practical, real-world patterns.",
    eyebrow: "CSS reference",
    readTime: "6 min read",
    updatedAt: "2026-06-18",
    intro:
      ":has() is the parent selector CSS lacked for two decades. It matches an element based on what it contains, so you can finally style a container by its children, a label by its input's state, or a card by whether it holds an image - all without JavaScript.",
    sections: [
      {
        heading: "How :has() works",
        body: "Put a relative selector inside :has() and the element matches when it contains something matching that selector. The match target stays the outer element, not the child.",
        items: [
          "figure:has(figcaption) - figures that contain a caption",
          "label:has(input:checked) - labels whose input is checked",
          "div:has(> img) - divs with a direct image child",
          "article:has(h2, h3) - articles containing a subheading",
        ],
      },
      {
        heading: "Patterns you could not do before",
        body: "Because :has() reacts to descendant state, it unlocks layout and styling decisions that previously required scripting or extra wrapper classes.",
        items: [
          "Style a form row that contains an invalid field: .row:has(:invalid)",
          "Add spacing only to cards that include media",
          "Highlight a list item whose link is focused: li:has(a:focus)",
          "Combine with :not() to target containers missing a child",
        ],
      },
      {
        heading: "Support and performance notes",
        body: ":has() is supported in all current major browsers. It is well optimized, but very broad selectors evaluated on large trees are worth sanity-checking.",
        items: [
          "Baseline-supported in current Chrome, Edge, Safari, and Firefox",
          "Provide a sensible default for very old engines via graceful degradation",
          "Keep the relative selector specific rather than universal",
          "Verify the effect live across breakpoints and states",
        ],
      },
    ],
    checklist: [
      "Replace JS-driven parent classes with :has() where possible.",
      "Keep the inner selector specific for clarity and performance.",
      "Provide fallbacks for browsers without :has().",
      "Test interactive states (:checked, :invalid, :focus) in context.",
    ],
    tags: ["css has selector", "css selectors", "css reference"],
    faq: [
      {
        question: "What does the CSS :has() selector do?",
        answer:
          ":has() matches an element based on its descendants. It is effectively the parent selector - figure:has(figcaption) styles figures that contain a caption, something CSS could not do natively before :has().",
      },
      {
        question: "Is :has() supported in all browsers?",
        answer:
          "Yes, :has() is supported across all current major browsers. For older engines, design a sensible default and treat the :has() styling as an enhancement.",
      },
      {
        question: "Can :has() check for the absence of an element?",
        answer:
          "Combine it with :not() - for example article:not(:has(img)) targets articles that do not contain an image. This pairing covers most \"only when missing\" use cases.",
      },
    ],
    related: ["css-not-selector", "debug-css-layout-issues"],
  },
  {
    slug: "best-browser-for-developers",
    title: "The Best Browser for Web Developers in 2026",
    description:
      "A practical comparison of the best browsers for web development - from Chrome and Firefox DevTools to dedicated dev browsers built for multi-device work.",
    eyebrow: "Dev workflow",
    readTime: "7 min read",
    updatedAt: "2026-06-18",
    intro:
      "The best browser for web development depends on what you do all day. If you mostly debug one viewport, Chrome or Firefox DevTools are excellent. If you ship responsive UIs and test across devices constantly, a dedicated development browser changes the math entirely.",
    sections: [
      {
        heading: "Chrome and Edge: the default DevTools",
        body: "Chromium DevTools are the industry baseline - deep, fast, and familiar. For most single-viewport debugging they are all you need, and extensions plus the broad ecosystem make them a safe default.",
        items: [
          "Best-in-class element, network, and performance panels",
          "Device mode emulates one viewport at a time",
          "Huge extension ecosystem and Lighthouse built in",
          "Weak spot: testing many device widths means constant resizing",
        ],
      },
      {
        heading: "Firefox: the CSS specialist",
        body: "Firefox DevTools lead on CSS tooling - the grid and flexbox inspectors, font editor, and accessibility panel are genuinely better for layout work.",
        items: [
          "Excellent CSS grid and flexbox visualizers",
          "Strong accessibility and contrast tooling",
          "Responsive Design Mode for quick viewport checks",
          "Great for layout debugging, still one viewport at a time",
        ],
      },
      {
        heading: "Dedicated dev browsers: built for multi-device work",
        body: "A development browser like Sizzy reorganizes the whole window around building: every device class is visible at once with synchronized scrolling, clicking, and typing, plus per-project workspaces, universal DevTools, and built-in screenshots.",
        items: [
          "See phone, tablet, and desktop side by side, in sync",
          "Built on Chromium, so your extensions and rendering match Chrome",
          "Per-project workspaces restore your exact testing setup",
          "Screenshots, throttling, and device frames without extra tools",
        ],
      },
    ],
    checklist: [
      "Count how often you resize or switch device presets per day.",
      "Pick Firefox when CSS layout debugging dominates your work.",
      "Use Chromium DevTools as the baseline for single-viewport work.",
      "Try a dedicated dev browser when multi-device testing is constant.",
    ],
    tags: ["best browser for developers", "dev browser", "web development tools"],
    faq: [
      {
        question: "What is the best browser for web development?",
        answer:
          "For single-viewport debugging, Chrome/Edge DevTools are the default and Firefox leads on CSS layout tooling. For responsive work across many devices, a dedicated development browser such as Sizzy is faster because it shows and syncs every viewport at once.",
      },
      {
        question: "Is Chrome or Firefox better for developers?",
        answer:
          "Chrome has the most complete general-purpose DevTools and ecosystem; Firefox has superior CSS grid, flexbox, and accessibility inspectors. Many developers keep both and pick per task.",
      },
      {
        question: "Why use a dedicated browser for web development?",
        answer:
          "Standard browsers test one viewport at a time. A development browser shows every device class simultaneously with synchronized interaction, which catches cross-breakpoint bugs immediately and removes the constant resize-and-recheck loop.",
      },
    ],
    related: ["browser-for-web-developers", "chrome-devtools-device-mode-limitations", "test-responsive-design-on-multiple-devices"],
  },
  {
    slug: "fluid-web-design",
    title: "Fluid Web Design: A Practical Guide",
    description:
      "What fluid web design is, how it differs from fixed and adaptive layouts, and how to build fluid type and spacing with clamp() and viewport units.",
    eyebrow: "Responsive design",
    readTime: "6 min read",
    updatedAt: "2026-06-18",
    intro:
      "Fluid web design builds layouts from relative, flexible units so the page scales smoothly with the viewport instead of snapping between fixed sizes. Done well, it removes most of the awkward gaps between breakpoints - the spots where designs usually break.",
    sections: [
      {
        heading: "Fluid vs fixed vs adaptive",
        body: "A fixed layout uses pixel widths and breaks outside its target size. An adaptive layout snaps between a few fixed designs. A fluid layout flexes continuously, so there is always a sensible result at every width.",
        items: [
          "Fixed: pixel widths, brittle outside the target",
          "Adaptive: snaps between a few designed sizes",
          "Fluid: scales continuously with relative units",
          "Most modern responsive sites are fluid at their core",
        ],
      },
      {
        heading: "Build fluid type and spacing with clamp()",
        body: "clamp(min, preferred, max) is the workhorse of fluid design. It scales a value with the viewport while clamping it between sensible bounds, so text and spacing grow smoothly without ever getting too small or too large.",
        items: [
          "font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem)",
          "Use it for headings, gaps, and section padding",
          "Combine with min(), max(), and viewport units for fluid grids",
          "Prefer rem-based bounds for accessibility",
        ],
      },
      {
        heading: "Keep fluid layouts honest",
        body: "Fluid does not mean unchecked. The whole point is the in-between widths, so you have to actually look at them - and at the extremes where clamps kick in.",
        items: [
          "Check the smallest and largest supported widths",
          "Watch line length - cap it with max-width or ch units",
          "Confirm clamps hit their bounds where you expect",
          "Review several widths side by side, not one at a time",
        ],
      },
    ],
    checklist: [
      "Use relative units (rem, %, vw, ch) over fixed pixels.",
      "Apply clamp() for fluid type and spacing with safe bounds.",
      "Cap line length for readability.",
      "Review the in-between and extreme widths, not just breakpoints.",
    ],
    tags: ["fluid web design", "responsive design", "css clamp"],
    faq: [
      {
        question: "What is fluid web design?",
        answer:
          "Fluid web design uses relative, flexible units so the layout scales continuously with the viewport rather than snapping between fixed sizes. It produces a sensible result at every width, including the gaps between breakpoints.",
      },
      {
        question: "What is the difference between fluid and responsive design?",
        answer:
          "Fluid design is a technique - building with flexible units that scale continuously. Responsive design is the broader goal of adapting to any device, usually achieved by combining fluid layouts with media or container queries.",
      },
      {
        question: "How does clamp() help with fluid design?",
        answer:
          "clamp(min, preferred, max) scales a value with the viewport while keeping it between bounds. It is ideal for fluid typography and spacing because text and gaps grow smoothly without becoming too small or too large.",
      },
    ],
    related: ["adaptive-vs-responsive-design", "responsive-typography-clamp", "css-viewport-units"],
  },
  {
    slug: "transparent-gradient-css",
    title: "CSS Transparent Gradients and Fades",
    description:
      "How to create transparent gradients in CSS, fade an element or image to transparent, and avoid the gray transparent-black gradient bug.",
    eyebrow: "CSS reference",
    readTime: "5 min read",
    updatedAt: "2026-06-18",
    intro:
      "A transparent gradient fades from a color to nothing, which is how you build image overlays, scrim text backgrounds, and soft fade-out edges. The catch: fading to the keyword transparent can produce an ugly gray tint, and there is a clean way around it.",
    sections: [
      {
        heading: "The basic transparent gradient",
        body: "A linear gradient from a color to a transparent version of the same color gives a smooth fade. Always fade to the rgba/hsl transparent of your color, not the bare transparent keyword.",
        items: [
          "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
          "Fade to the same hue at zero alpha for a clean result",
          "Use it as an overlay so text stays readable over images",
          "Stack it above a background-image with multiple backgrounds",
        ],
      },
      {
        heading: "Avoid the gray fade bug",
        body: "The transparent keyword resolves to transparent black (rgba(0,0,0,0)). Fading a colored gradient to transparent therefore drifts through gray. Specify the destination color at zero alpha instead.",
        items: [
          "Bad: linear-gradient(red, transparent) drifts through gray",
          "Good: linear-gradient(red, rgba(255,0,0,0)) stays pure red",
          "Modern syntax: linear-gradient(red, transparent) is fixed via #rgba too",
          "Prefer explicit zero-alpha color stops for predictable results",
        ],
      },
      {
        heading: "Fade an image to transparent",
        body: "To fade the image itself (not just overlay it), use a mask. A gradient mask makes pixels transparent based on the gradient, which is perfect for soft edges.",
        items: [
          "mask-image: linear-gradient(to bottom, black, transparent)",
          "Black areas stay visible, transparent areas fade out",
          "Great for soft bottoms on hero images and scroll fades",
          "Include the standard mask-image property for broad support",
        ],
      },
    ],
    checklist: [
      "Fade to a zero-alpha version of the color, not transparent.",
      "Use overlays for text-over-image readability.",
      "Use mask-image to fade the element itself.",
      "Check the fade on light and dark backgrounds.",
    ],
    tags: ["transparent gradient css", "css gradients", "css reference"],
    faq: [
      {
        question: "How do I make a transparent gradient in CSS?",
        answer:
          "Use a linear or radial gradient that ends at a zero-alpha version of your color, e.g. linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0)). Fading to the matching color at zero alpha keeps the fade clean.",
      },
      {
        question: "Why does my CSS gradient fade to gray?",
        answer:
          "Because the transparent keyword means transparent black. A gradient from a color to transparent interpolates through gray. Fade to the same color at zero alpha instead - rgba(255,0,0,0) rather than transparent.",
      },
      {
        question: "How do I fade an image to transparent at the edges?",
        answer:
          "Use mask-image with a gradient, for example mask-image: linear-gradient(to bottom, black, transparent). The image stays visible where the mask is opaque and fades out where it is transparent.",
      },
    ],
    related: ["debug-css-layout-issues", "css-multiple-transforms"],
  },
  {
    slug: "css-multiple-transforms",
    title: "How to Combine Multiple CSS Transforms",
    description:
      "How to apply multiple CSS transforms at once, why order matters, and how the individual translate, rotate, and scale properties make it cleaner.",
    eyebrow: "CSS reference",
    readTime: "5 min read",
    updatedAt: "2026-06-18",
    intro:
      "You can apply several transforms to one element, but a second transform declaration does not add to the first - it replaces it. Here is how to combine them correctly, why order changes the result, and how the newer individual transform properties simplify things.",
    sections: [
      {
        heading: "Chain functions in one declaration",
        body: "To apply multiple transforms, list them space-separated inside a single transform value. A second transform property on the same selector overrides the first rather than combining.",
        items: [
          "transform: translateX(20px) rotate(15deg) scale(1.1)",
          "Functions are space-separated, not comma-separated",
          "A separate transform declaration replaces, it does not merge",
          "Group related motion in one value for clarity",
        ],
      },
      {
        heading: "Order matters",
        body: "Transforms apply right to left in terms of coordinate space - each function operates on the space left by the previous one. Swapping rotate and translate gives visibly different results.",
        items: [
          "translate then rotate orbits differently than rotate then translate",
          "Set transform-origin to control the pivot point",
          "Keep order consistent across states to avoid jumps in transitions",
          "Test transitions, since interpolation depends on matching function lists",
        ],
      },
      {
        heading: "Use individual transform properties",
        body: "Modern CSS adds standalone translate, rotate, and scale properties. They compose automatically and are easier to override or animate independently.",
        items: [
          "translate: 20px 0; rotate: 15deg; scale: 1.1;",
          "Each can be set and animated independently",
          "They apply in a defined order: translate, rotate, then scale",
          "Mix with the transform shorthand only when you need a specific order",
        ],
      },
    ],
    checklist: [
      "Put multiple transform functions in one space-separated value.",
      "Decide order deliberately - it changes the outcome.",
      "Set transform-origin when rotating or scaling.",
      "Consider individual translate/rotate/scale for independent animation.",
    ],
    tags: ["css multiple transforms", "css transform", "css reference"],
    faq: [
      {
        question: "How do I apply multiple transforms in CSS?",
        answer:
          "List the functions space-separated in one transform declaration, e.g. transform: translateX(20px) rotate(15deg) scale(1.1). A second transform property does not add to the first - it overrides it.",
      },
      {
        question: "Does the order of CSS transforms matter?",
        answer:
          "Yes. Each function operates in the coordinate space produced by the previous one, so translate-then-rotate differs from rotate-then-translate. Keep the order consistent across states for smooth transitions.",
      },
      {
        question: "What are the individual transform properties?",
        answer:
          "Modern CSS exposes translate, rotate, and scale as standalone properties that compose automatically and can be animated independently, applied in the order translate, rotate, then scale.",
      },
    ],
    related: ["transparent-gradient-css", "debug-css-layout-issues"],
  },
] satisfies SizzyBlogPost[];
