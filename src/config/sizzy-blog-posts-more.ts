import type { SizzyBlogPost } from "./sizzy-blog-posts";

export const sizzyBlogPostsMore = [
  {
    slug: "css-breakpoints-guide",
    title: "CSS Breakpoints: A Complete Guide",
    description:
      "How to choose, name, and test CSS breakpoints based on content instead of devices - with a practical workflow for verifying every transition.",
    eyebrow: "Responsive CSS",
    readTime: "8 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Stop designing breakpoints around devices",
        body: "The biggest mistake in responsive CSS is picking breakpoints to match specific phones. New devices ship every year, and chasing pixel-perfect parity with a 2019 iPhone is a losing game. Instead, let the content decide: add a breakpoint at the exact width where the layout starts to look cramped, awkward, or broken. This produces fewer, more meaningful breakpoints that hold up across every device class.",
        items: [
          "Resize slowly and add a breakpoint where the layout actually fails",
          "Aim for 3-4 well-chosen breakpoints, not a dozen device presets",
          "Name breakpoints by intent (sm, md, lg) not by device",
          "Document why each breakpoint exists so the team can maintain it",
        ],
      },
      {
        heading: "A sensible default breakpoint scale",
        body: "Most projects converge on a similar scale because content reflows at similar widths. Use these as a starting point, then adjust to your actual layouts. The key is consistency: define the scale once in your design tokens or framework config and reuse it everywhere so you never hardcode magic numbers in component CSS.",
        items: [
          "640px for small tablets and large phones in landscape",
          "768px for the tablet layout handoff",
          "1024px for small laptops and desktop sidebars",
          "1280px and up for wide desktop layouts",
        ],
      },
      {
        heading: "Verify every breakpoint transition",
        body: "A breakpoint that looks fine at the exact threshold can still break 10px on either side. The only reliable way to catch this is to view the layout across multiple widths at once and scrub through the transition. A multi-device browser like Sizzy shows phone, tablet, and desktop side by side and keeps them in sync, so you see all breakpoint states without resizing a single window.",
        items: [
          "Check 20px below and above each breakpoint, not just the threshold",
          "Watch for content jumps, overflow, and text reflow at the boundary",
          "Test with real copy and authenticated UI, not placeholder text",
          "Capture screenshots at each breakpoint for the release record",
        ],
      },
    ],
    checklist: [
      "Every breakpoint maps to a real layout change, not a device.",
      "The breakpoint scale lives in one config and is reused everywhere.",
      "Each transition is tested 20px on both sides of the threshold.",
      "Release screenshots cover the riskiest breakpoint transitions.",
    ],
    tags: ["css breakpoints", "responsive design", "media queries"],
    faq: [
      {
        question: "How many CSS breakpoints should I use?",
        answer:
          "Most sites need only 3-4 breakpoints. Add one wherever the content genuinely breaks rather than matching specific devices. Fewer, content-driven breakpoints are easier to maintain and hold up better as new devices ship.",
      },
      {
        question: "What are the most common CSS breakpoint values?",
        answer:
          "640px, 768px, 1024px, and 1280px are common defaults and match the scales used by Tailwind and Bootstrap. They reflect where content typically reflows rather than exact device widths, so they generalize well.",
      },
      {
        question: "Should breakpoints be in px, em, or rem?",
        answer:
          "Using em or rem for media queries respects the user's browser font-size setting, which improves accessibility. Pixels are simpler and more predictable. Many teams use rem-based breakpoints for this reason, but consistency matters more than the unit.",
      },
    ],
    related: [
      "mobile-first-vs-desktop-first",
      "min-width-vs-max-width-media-queries",
      "responsive-breakpoint-checklist",
    ],
  },
  {
    slug: "mobile-first-vs-desktop-first",
    title: "Mobile-First vs Desktop-First CSS",
    description:
      "The practical difference between mobile-first and desktop-first responsive CSS, when each makes sense, and how to test both approaches.",
    eyebrow: "Responsive CSS",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "What the two approaches actually mean",
        body: "Mobile-first means your base CSS targets the smallest screen, and you layer on complexity with min-width media queries as the viewport grows. Desktop-first does the opposite: the base styles assume a large screen, and max-width queries strip things away for smaller viewports. The choice changes how your media queries read and which state is the default when CSS fails to load.",
        items: [
          "Mobile-first: base styles for mobile, min-width queries add features",
          "Desktop-first: base styles for desktop, max-width queries remove features",
          "Mobile-first degrades gracefully if a stylesheet fails to load",
          "Desktop-first can feel natural for internal tools that are desktop-only",
        ],
      },
      {
        heading: "Why mobile-first usually wins",
        body: "Mobile-first forces you to prioritize content and performance from the start, because the small screen has no room for clutter. It also aligns with Google's mobile-first indexing and tends to produce simpler, additive media queries. Desktop-first often leads to a pile of overrides that fight each other, especially as a codebase grows.",
        items: [
          "Forces content prioritization and a leaner critical path",
          "Additive min-width queries are easier to reason about",
          "Matches how most real traffic arrives - on phones",
          "Reduces specificity wars from stacked max-width overrides",
        ],
      },
      {
        heading: "Test both directions at the same time",
        body: "Whichever approach you pick, the failure mode is the same: a change that fixes one width quietly breaks another. Viewing your layout on several widths simultaneously catches this instantly. In Sizzy you keep mobile, tablet, and desktop open together with synchronized interaction, so a media query edit is verified everywhere the moment you save.",
        items: [
          "Open the smallest and largest supported widths side by side",
          "Edit one media query and confirm it doesn't regress other widths",
          "Use synced scrolling to compare the same section across devices",
          "Hot-reload updates every viewport together as you code",
        ],
      },
    ],
    checklist: [
      "Pick one direction and apply it consistently across the codebase.",
      "Keep base styles minimal and let queries add or remove deliberately.",
      "Verify edits against the smallest and largest widths together.",
      "Confirm the mobile experience is the priority for public sites.",
    ],
    tags: ["mobile-first", "desktop-first", "responsive css"],
    faq: [
      {
        question: "Is mobile-first always better?",
        answer:
          "For public-facing sites, mobile-first is usually the better default because most traffic is mobile and it encourages performance discipline. For desktop-only internal tools, desktop-first can be more natural. The approach matters less than applying it consistently.",
      },
      {
        question: "Does mobile-first CSS load faster?",
        answer:
          "It can. Mobile-first keeps the base stylesheet lean and loads heavier desktop styles only when a min-width query matches, which helps the critical rendering path on phones where bandwidth and CPU are most constrained.",
      },
      {
        question: "Can I mix min-width and max-width queries?",
        answer:
          "Yes, but mixing them in the same component often creates conflicting rules that are hard to debug. Pick one primary direction per project and only reach for the other when a specific range needs targeting.",
      },
    ],
    related: [
      "css-breakpoints-guide",
      "min-width-vs-max-width-media-queries",
      "debugging-media-queries",
    ],
  },
  {
    slug: "container-queries-vs-media-queries",
    title: "Container Queries vs Media Queries",
    description:
      "When to reach for CSS container queries instead of media queries, how they differ, and how to test component-level responsiveness reliably.",
    eyebrow: "Responsive CSS",
    readTime: "8 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Media queries react to the viewport, container queries react to the component",
        body: "A media query asks 'how wide is the screen?' A container query asks 'how wide is the box this component lives in?' That difference is huge for reusable components. A card that sits full-width on mobile but in a narrow sidebar on desktop should adapt to its container, not the viewport - and only container queries can express that cleanly.",
        items: [
          "Media queries: global, viewport-based, great for page layout",
          "Container queries: local, parent-based, great for components",
          "A component can be wide on a narrow screen and narrow on a wide one",
          "Container queries make truly portable components possible",
        ],
      },
      {
        heading: "How to use container queries",
        body: "You declare a containment context on the parent with container-type, then write @container rules that target the child. Browser support is now broad across modern Chromium, Firefox, and Safari, so they are production-ready for most audiences. Keep a media-query fallback only if you must support very old browsers.",
        items: [
          "Set container-type: inline-size on the parent element",
          "Optionally name containers with container-name for clarity",
          "Write @container (min-width: 400px) rules for the child",
          "Combine with media queries for page-level structure",
        ],
      },
      {
        heading: "Test components in multiple contexts at once",
        body: "Container-query bugs show up when the same component is dropped into different-width slots. The fastest way to catch them is to view your component in several layouts simultaneously. Sizzy lets you open multiple devices and routes side by side, so you can confirm a card behaves correctly in a grid, a sidebar, and a full-width hero in one glance.",
        items: [
          "Render the component in narrow, medium, and wide containers",
          "Check the same component across phone, tablet, and desktop layouts",
          "Verify container thresholds independently of the viewport",
          "Use synced scrolling to compare instances on one screen",
        ],
      },
    ],
    checklist: [
      "Use container queries for reusable components, media queries for layout.",
      "Confirm container-type is set on the correct parent.",
      "Test the component in every container width it will occupy.",
      "Provide a fallback only if legacy browser support is required.",
    ],
    tags: ["container queries", "media queries", "responsive components"],
    faq: [
      {
        question: "Are container queries widely supported?",
        answer:
          "Yes. Container queries are supported in all current versions of Chrome, Edge, Firefox, and Safari. For the vast majority of audiences they are safe to use in production today, with media-query fallbacks only needed for very old browsers.",
      },
      {
        question: "Should I replace all media queries with container queries?",
        answer:
          "No. Media queries are still the right tool for page-level layout that depends on the viewport. Container queries shine for components that must adapt to whatever slot they are placed in. Most projects use both together.",
      },
      {
        question: "What is container-type: inline-size?",
        answer:
          "It tells the browser to track the inline (usually horizontal) size of an element so its children can respond with @container rules. It is the most common containment mode because most responsive behavior depends on available width.",
      },
    ],
    related: [
      "css-breakpoints-guide",
      "debugging-media-queries",
      "debug-css-grid",
    ],
  },
  {
    slug: "common-screen-resolutions",
    title: "Most Common Screen Resolutions for Web Design",
    description:
      "The screen resolutions and CSS viewport widths that actually matter in 2026, and how to turn them into a focused responsive test matrix.",
    eyebrow: "Viewport reference",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Physical resolution is not CSS width",
        body: "A phone advertised at 1170 pixels wide does not give you 1170 CSS pixels to work with. Device pixel ratio scales the physical resolution down to a logical CSS width - that 1170px phone is usually 390px in CSS. Designing against physical resolution is a common beginner mistake that leads to layouts that look wrong on real hardware.",
        items: [
          "Physical resolution is measured in hardware pixels",
          "CSS width = physical width divided by device pixel ratio",
          "A 390px CSS phone may have a 1170px physical screen",
          "Always design and test against CSS widths, not spec-sheet pixels",
        ],
      },
      {
        heading: "The widths worth testing",
        body: "Rather than memorizing every device, test one width per class. These cover the overwhelming majority of real traffic and catch nearly all layout issues. Pull your own analytics to confirm the exact desktop widths your audience uses, then add those as custom devices.",
        items: [
          "360-393px for the majority of phones",
          "768px and 820px for tablets",
          "1280px and 1440px for the most common laptops",
          "1920px for large desktop monitors",
        ],
      },
      {
        heading: "Build a focused test matrix",
        body: "A good matrix has one representative device per width class plus any product-specific widths from your analytics. In Sizzy you save this matrix as a project workspace, so every QA session opens the exact same devices in sync. That repeatability is what turns ad-hoc resizing into a reliable release check.",
        items: [
          "One phone, one tablet, two laptops, one large desktop",
          "Add your top analytics widths as custom devices",
          "Save the matrix per project so it reloads instantly",
          "Capture screenshots at each width for the release record",
        ],
      },
    ],
    checklist: [
      "Test CSS widths, not advertised hardware resolutions.",
      "Cover one device per major width class.",
      "Add the most common widths from your own analytics.",
      "Save the matrix so QA is one click every release.",
    ],
    tags: ["screen resolutions", "viewport sizes", "responsive testing"],
    faq: [
      {
        question: "What is the most common screen resolution in 2026?",
        answer:
          "1920x1080 remains the most common desktop physical resolution, while mobile traffic clusters around 360-393px CSS width. Always confirm with your own analytics, since audiences vary widely by product and region.",
      },
      {
        question: "What screen size should I design for first?",
        answer:
          "Design for a ~390px CSS width phone first, since that covers most mobile traffic and forces content prioritization. Then expand the layout up to tablet and desktop widths using a mobile-first approach.",
      },
      {
        question: "How do I find my audience's actual screen sizes?",
        answer:
          "Check the device and screen-resolution reports in your analytics platform. Use the top widths to define custom test devices so your QA matrix reflects real visitors rather than generic presets.",
      },
    ],
    related: [
      "responsive-viewport-sizes",
      "device-pixel-ratio",
      "iphone-viewport-sizes",
    ],
  },
  {
    slug: "min-width-vs-max-width-media-queries",
    title: "min-width vs max-width in Media Queries",
    description:
      "How min-width and max-width media queries behave differently, which to choose, and how to avoid the overlap bugs that break layouts.",
    eyebrow: "Responsive CSS",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The direction each query applies",
        body: "min-width applies styles from a given width and up, which pairs naturally with mobile-first CSS. max-width applies styles up to a given width, which pairs with desktop-first. Choosing one direction per project keeps your media queries predictable and prevents the mental overhead of reading queries that point in opposite directions.",
        items: [
          "min-width: 768px applies at 768px and wider",
          "max-width: 767px applies at 767px and narrower",
          "min-width reads as 'add this as the screen grows'",
          "max-width reads as 'keep this until the screen shrinks past here'",
        ],
      },
      {
        heading: "Avoid the off-by-one overlap bug",
        body: "If you write min-width: 768px and max-width: 768px in different rules, both match at exactly 768px and one will unexpectedly win. The classic fix is to offset the boundary - use max-width: 767.98px - or, better, commit to a single direction so ranges never overlap. Overlap bugs are subtle because they only appear at one exact width.",
        items: [
          "Never use the same value for both min-width and max-width",
          "Offset max-width by 0.02px if you must pair the two",
          "Prefer a single direction to eliminate boundaries entirely",
          "Test the exact threshold width, where overlap bugs hide",
        ],
      },
      {
        heading: "Catch boundary bugs with side-by-side widths",
        body: "Boundary bugs are nearly invisible when you test one width at a time. Viewing several widths at once - including ones right at your thresholds - makes them obvious. Sizzy keeps multiple viewports in sync so you can land precisely on a breakpoint and 1px on either side without fiddling with window edges.",
        items: [
          "Add a device at the exact breakpoint width",
          "Add devices 1-2px on each side of the threshold",
          "Watch for a flash of double-applied or missing styles",
          "Confirm only one rule wins at the boundary",
        ],
      },
    ],
    checklist: [
      "Pick one query direction and use it consistently.",
      "Never reuse the same value for min-width and max-width.",
      "Offset paired boundaries by 0.02px when unavoidable.",
      "Test the exact threshold and 1px on each side.",
    ],
    tags: ["min-width", "max-width", "media queries"],
    faq: [
      {
        question: "Should I use min-width or max-width media queries?",
        answer:
          "Use min-width with a mobile-first base, since it reads as progressively adding styles as the screen grows. Choose max-width only for desktop-first projects. The important thing is to commit to one direction per codebase.",
      },
      {
        question: "Why do my media queries both apply at one width?",
        answer:
          "If a min-width and max-width rule share the same pixel value, both match at that exact width and create an overlap bug. Offset one boundary by 0.02px, or restructure to use a single query direction so ranges never overlap.",
      },
      {
        question: "What does max-width: 767.98px mean?",
        answer:
          "It is a common trick to stop a max-width rule just before a 768px min-width rule begins, avoiding the overlap where both would otherwise match at exactly 768px. Frameworks like Bootstrap use this pattern.",
      },
    ],
    related: [
      "mobile-first-vs-desktop-first",
      "css-breakpoints-guide",
      "debugging-media-queries",
    ],
  },
  {
    slug: "tailwind-responsive-breakpoints",
    title: "Tailwind CSS Responsive Breakpoints Explained",
    description:
      "How Tailwind's responsive prefixes and default breakpoints work, how to customize them, and how to test utility-driven responsive UI fast.",
    eyebrow: "CSS frameworks",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Tailwind breakpoints are mobile-first prefixes",
        body: "In Tailwind, an unprefixed utility applies at every width, and prefixes like md: apply from that breakpoint up. So text-sm md:text-base means small text on mobile and base text from 768px and wider. This mobile-first model is consistent and means you rarely write raw media queries by hand.",
        items: [
          "sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px",
          "Unprefixed utilities are the mobile base",
          "Prefixed utilities apply from that breakpoint upward",
          "Stack prefixes to step a value up across widths",
        ],
      },
      {
        heading: "Customize breakpoints in your config",
        body: "The default scale is a starting point, not a mandate. You can override or extend it in your Tailwind config to match your design system, and add custom breakpoints like 3xl or a max-width variant when a layout needs it. Keep the set small and meaningful so utility classes stay readable.",
        items: [
          "Override theme.screens to replace the default scale",
          "Use theme.extend.screens to add without losing defaults",
          "Add max-* variants for desktop-first ranges when needed",
          "Keep custom breakpoints documented in your design tokens",
        ],
      },
      {
        heading: "Verify utility responsiveness across devices",
        body: "Because Tailwind responsiveness lives inline in your markup, it is easy to miss a missing prefix on one element. Viewing the page across breakpoints simultaneously surfaces these gaps immediately. Sizzy shows your localhost on phone, tablet, and desktop together with hot reload, so a class change is verified everywhere the moment you save.",
        items: [
          "Open one viewport per Tailwind breakpoint",
          "Scan for elements that forgot a responsive prefix",
          "Confirm spacing and grid utilities step correctly",
          "Hot-reload updates every device as you tweak classes",
        ],
      },
    ],
    checklist: [
      "Treat unprefixed utilities as the mobile base.",
      "Keep your custom breakpoint set small and documented.",
      "Check every default breakpoint after a layout change.",
      "Test utility changes live across multiple devices.",
    ],
    tags: ["tailwind css", "responsive breakpoints", "utility css"],
    faq: [
      {
        question: "What are Tailwind's default breakpoints?",
        answer:
          "Tailwind ships with sm (640px), md (768px), lg (1024px), xl (1280px), and 2xl (1536px). All are min-width based, so a prefix like lg: applies from 1024px and wider in Tailwind's mobile-first model.",
      },
      {
        question: "How do I add a custom Tailwind breakpoint?",
        answer:
          "Add it under theme.extend.screens in your Tailwind config to keep the defaults, or under theme.screens to replace them entirely. You can also define max-width variants for desktop-first ranges.",
      },
      {
        question: "Is Tailwind mobile-first?",
        answer:
          "Yes. Unprefixed utilities apply at all widths and serve as the mobile base, while breakpoint prefixes add styles as the screen grows. This is the same min-width approach recommended for hand-written CSS.",
      },
    ],
    related: [
      "css-breakpoints-guide",
      "bootstrap-breakpoints",
      "css-framework-responsive-comparison",
    ],
  },
  {
    slug: "bootstrap-breakpoints",
    title: "Bootstrap 5 Breakpoints and Grid",
    description:
      "Bootstrap 5's breakpoint tiers, container behavior, and responsive grid classes - plus a fast way to test Bootstrap layouts on every device.",
    eyebrow: "CSS frameworks",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The six breakpoint tiers",
        body: "Bootstrap 5 defines tiers that map to its grid and utility classes. The smallest tier has no infix and is the mobile default, while sm, md, lg, xl, and xxl add styles as the screen grows. Understanding the tier boundaries is the key to predicting how col- and d- utilities behave at each width.",
        items: [
          "xs (<576px) is the unlabeled mobile default",
          "sm 576px, md 768px, lg 992px, xl 1200px",
          "xxl 1400px for very wide layouts",
          "Tiers are min-width based, matching mobile-first CSS",
        ],
      },
      {
        heading: "Grid and container behavior",
        body: "Bootstrap's 12-column grid lets you set column spans per tier, like col-12 col-md-6, so a layout stacks on mobile and splits on tablet. Containers switch between fixed max-widths at each tier or stay fluid with container-fluid. Mixing the two thoughtfully is how you control gutters and reading width.",
        items: [
          "col-12 col-md-6 stacks on mobile, two-up from md",
          ".container snaps to fixed widths per tier",
          ".container-fluid spans the full viewport",
          "Use offset and order utilities for responsive rearrangement",
        ],
      },
      {
        heading: "Test Bootstrap layouts across tiers",
        body: "Each tier boundary is a place a Bootstrap layout can shift unexpectedly, especially with nested rows. Viewing all tiers at once makes the grid behavior obvious. In Sizzy you keep a device per tier open with synced scrolling, so you can confirm columns stack, reorder, and align correctly without reloading.",
        items: [
          "Open a viewport just inside each tier boundary",
          "Confirm columns stack and split at the right widths",
          "Check gutters and container max-widths per tier",
          "Verify nested grids don't collapse at the edges",
        ],
      },
    ],
    checklist: [
      "Know which tier each layout change belongs to.",
      "Test a width just inside every tier boundary.",
      "Confirm container max-widths match the design.",
      "Check nested rows and column ordering on mobile.",
    ],
    tags: ["bootstrap", "responsive grid", "css breakpoints"],
    faq: [
      {
        question: "What are Bootstrap 5's breakpoints?",
        answer:
          "Bootstrap 5 uses xs (<576px), sm (576px), md (768px), lg (992px), xl (1200px), and xxl (1400px). All breakpoint-specific classes are min-width based, so md applies from 768px upward.",
      },
      {
        question: "How does the Bootstrap grid become responsive?",
        answer:
          "You assign column spans per tier, such as col-12 col-md-6, so the layout stacks on small screens and splits into columns from the specified tier upward. The grid is always 12 columns wide.",
      },
      {
        question: "What's the difference between container and container-fluid?",
        answer:
          ".container snaps to a fixed max-width at each breakpoint tier, while .container-fluid always spans the full viewport width. Choose based on whether you want a constrained reading width or edge-to-edge content.",
      },
    ],
    related: [
      "tailwind-responsive-breakpoints",
      "css-breakpoints-guide",
      "css-framework-responsive-comparison",
    ],
  },
  {
    slug: "viewport-meta-tag",
    title: "The Viewport Meta Tag Explained",
    description:
      "What the viewport meta tag does, why width=device-width matters, and the common mistakes that break responsive layouts on mobile.",
    eyebrow: "Mobile fundamentals",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Why the tag exists",
        body: "Without a viewport meta tag, mobile browsers assume your page was built for desktop and render it at around 980px wide, then shrink it to fit - giving users a tiny, zoomed-out page. The viewport meta tag tells the browser to use the device's actual width so your media queries and responsive layout work as intended.",
        items: [
          "Missing tag = browser fakes a ~980px desktop viewport",
          "width=device-width maps CSS width to the device's real width",
          "initial-scale=1 sets the starting zoom level to 100%",
          "It is the single most important line for mobile rendering",
        ],
      },
      {
        heading: "The canonical tag and risky options",
        body: "The standard tag is width=device-width, initial-scale=1. Avoid maximum-scale=1 or user-scalable=no, which disable pinch-zoom and create an accessibility barrier for users who need to magnify content. There is rarely a good reason to block zoom on a public site.",
        items: [
          "Use: width=device-width, initial-scale=1",
          "Avoid user-scalable=no - it blocks accessibility zoom",
          "Avoid maximum-scale=1 for the same reason",
          "Add viewport-fit=cover only when handling device notches",
        ],
      },
      {
        heading: "Verify the tag is actually working",
        body: "A typo or a missing tag produces a page that looks fine on desktop but renders zoomed-out on phones. The fastest check is to load the page on real mobile widths and confirm content fills the screen at 100% zoom. Sizzy renders accurate mobile viewports side by side, so you can confirm the tag is doing its job without grabbing a phone.",
        items: [
          "Load the page at 375px and confirm no desktop zoom-out",
          "Check that pinch-zoom still works for accessibility",
          "Verify viewport-fit=cover behavior near notches if used",
          "Confirm the tag is present on every page, including errors",
        ],
      },
    ],
    checklist: [
      "Every page includes width=device-width, initial-scale=1.",
      "Pinch-zoom is not disabled.",
      "viewport-fit=cover is only used with safe-area handling.",
      "Mobile widths render at 100% with no zoom-out.",
    ],
    tags: ["viewport meta tag", "mobile web", "responsive design"],
    faq: [
      {
        question: "What is the correct viewport meta tag?",
        answer:
          "The standard is <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">. This maps CSS pixels to the device width and sets initial zoom to 100%, which is what nearly every responsive site needs.",
      },
      {
        question: "Should I use user-scalable=no?",
        answer:
          "No. Disabling zoom blocks users who need to magnify text and is an accessibility failure under WCAG. Leave pinch-zoom enabled on public sites unless you have an unusual, well-justified reason.",
      },
      {
        question: "Why does my site look zoomed out on mobile?",
        answer:
          "That usually means the viewport meta tag is missing or malformed. Without it, mobile browsers render at a fake ~980px desktop width and shrink the page. Add width=device-width, initial-scale=1 to fix it.",
      },
    ],
    related: [
      "css-viewport-units",
      "safe-area-insets",
      "why-layout-breaks-on-mobile",
    ],
  },
  {
    slug: "css-viewport-units",
    title: "CSS Viewport Units: vh, vw, dvh, and svh",
    description:
      "How CSS viewport units work, why 100vh breaks on mobile, and how the new dvh, svh, and lvh units fix the address-bar problem.",
    eyebrow: "Responsive CSS",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "What the classic units mean",
        body: "vw and vh are percentages of the viewport width and height. 50vw is half the viewport width; 100vh is the full viewport height. They are perfect for hero sections and full-screen layouts - until you hit mobile, where the browser's address bar makes 'the viewport' a moving target.",
        items: [
          "1vw = 1% of viewport width, 1vh = 1% of viewport height",
          "vmin and vmax track the smaller or larger dimension",
          "Great for full-bleed heroes and fluid spacing",
          "Behave predictably on desktop, less so on mobile",
        ],
      },
      {
        heading: "Why 100vh breaks on mobile",
        body: "On mobile browsers, the address bar shows and hides as you scroll, changing the visible height. Classic 100vh refers to the largest possible viewport, so a full-height section ends up taller than the screen and gets clipped behind the browser chrome. This is one of the most reported mobile layout bugs.",
        items: [
          "100vh = largest viewport, ignoring the visible address bar",
          "Content can be cut off below the fold on phones",
          "The bug appears only when the address bar is visible",
          "Desktop testing hides it entirely",
        ],
      },
      {
        heading: "Use dvh, svh, and lvh - and test them",
        body: "The dynamic viewport units fix this: svh is the small viewport (address bar shown), lvh is the large viewport (address bar hidden), and dvh updates live as the bar moves. Use dvh for full-height layouts, then verify on real mobile widths with the chrome visible, since the bug only shows there. Sizzy renders accurate mobile viewports so you can confirm the fix without a phone.",
        items: [
          "dvh updates dynamically as the address bar shows or hides",
          "svh is the smallest viewport, lvh the largest",
          "Prefer dvh for full-screen mobile sections",
          "Test with mobile browser chrome visible to confirm",
        ],
      },
    ],
    checklist: [
      "Replace 100vh with 100dvh for full-height mobile layouts.",
      "Confirm hero sections aren't clipped with the address bar visible.",
      "Use vmin/vmax intentionally, not as a 100vh substitute.",
      "Verify on real mobile widths, not just desktop.",
    ],
    tags: ["viewport units", "dvh", "responsive css"],
    faq: [
      {
        question: "Why does 100vh not work on mobile?",
        answer:
          "Mobile browsers include the area behind the address bar in 100vh, so a full-height element is taller than the visible screen and gets clipped. Using 100dvh, which updates as the bar shows and hides, resolves the issue.",
      },
      {
        question: "What is the difference between dvh, svh, and lvh?",
        answer:
          "svh is the small viewport height (address bar visible), lvh is the large viewport height (address bar hidden), and dvh is the dynamic height that changes as the bar moves. dvh is usually the best default for full-screen layouts.",
      },
      {
        question: "Are dvh and svh widely supported?",
        answer:
          "Yes, dynamic viewport units are supported in all current major browsers. For older browsers you can provide a 100vh fallback before the 100dvh declaration so unsupported engines fall back gracefully.",
      },
    ],
    related: [
      "viewport-meta-tag",
      "safe-area-insets",
      "responsive-typography-clamp",
    ],
  },
  {
    slug: "safe-area-insets",
    title: "Designing for the Notch: Safe Area Insets",
    description:
      "How to use env(safe-area-inset-*) and viewport-fit=cover so your layout respects notches, rounded corners, and the home indicator.",
    eyebrow: "Mobile fundamentals",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The problem notches create",
        body: "Modern phones have notches, punch-holes, rounded corners, and home indicators that overlap the screen edges. If your full-bleed header or sticky footer ignores these, controls end up hidden behind the notch or under the home bar - tappable in theory, unreachable in practice. Safe area insets give you the exact padding needed to avoid them.",
        items: [
          "Notches and rounded corners clip edge content",
          "The home indicator overlaps bottom-anchored UI",
          "Full-bleed headers can hide behind the status bar",
          "Affected areas vary by device, so hardcoding padding fails",
        ],
      },
      {
        heading: "viewport-fit=cover plus env() insets",
        body: "First add viewport-fit=cover to your viewport meta tag so the page extends edge to edge. Then read the safe areas with the env() function and add them to your padding. Combining env() with a base value via max() keeps spacing sensible on devices with no inset.",
        items: [
          "Add viewport-fit=cover to the viewport meta tag",
          "padding-top: env(safe-area-inset-top) for headers",
          "padding-bottom: env(safe-area-inset-bottom) for footers",
          "Use max(1rem, env(safe-area-inset-left)) for a sane floor",
        ],
      },
      {
        heading: "Test against real device frames",
        body: "Safe-area bugs are invisible on a rectangular desktop window - you need a viewport that simulates the notch and home indicator. Sizzy renders devices with accurate frames and insets, so you can confirm your sticky header and bottom nav clear the hardware on the device classes your users actually carry.",
        items: [
          "Test on a device profile with a notch and home indicator",
          "Confirm sticky headers clear the status bar",
          "Confirm bottom navigation clears the home indicator",
          "Check landscape, where left/right insets come into play",
        ],
      },
    ],
    checklist: [
      "viewport-fit=cover is set when using edge-to-edge layouts.",
      "Top and bottom fixed UI use env() safe-area insets.",
      "max() provides a sensible fallback on inset-free devices.",
      "Landscape left/right insets are handled for full-bleed UI.",
    ],
    tags: ["safe area insets", "notch", "mobile layout"],
    faq: [
      {
        question: "What is env(safe-area-inset-bottom)?",
        answer:
          "It is a CSS environment variable that returns the distance needed to avoid the bottom hardware area, such as the home indicator. Adding it to bottom padding keeps fixed footers and navigation reachable on notched phones.",
      },
      {
        question: "Do I need viewport-fit=cover?",
        answer:
          "Yes, if you want content to extend edge to edge behind the notch. Without it the browser insets the page automatically and env() values resolve to zero. With it, you take responsibility for safe-area padding yourself.",
      },
      {
        question: "How do I test safe area insets without the device?",
        answer:
          "Use a development browser that renders accurate device frames and insets, like Sizzy, so you can confirm headers and footers clear the notch and home indicator. Still validate on at least one real device before release.",
      },
    ],
    related: [
      "viewport-meta-tag",
      "css-viewport-units",
      "test-website-on-ipad",
    ],
  },
  {
    slug: "device-pixel-ratio",
    title: "Device Pixel Ratio and Retina Testing",
    description:
      "What device pixel ratio is, how it affects image sharpness, and how to test that your assets look crisp on high-density screens.",
    eyebrow: "Viewport reference",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "DPR maps CSS pixels to hardware pixels",
        body: "Device pixel ratio is how many physical pixels make up one CSS pixel. A DPR of 2 means a 100px CSS image is drawn across 200 hardware pixels, so a 100px-wide source image looks soft. High-density screens are everywhere now, which is why a graphic that looks fine on an old monitor can look blurry on a modern phone.",
        items: [
          "DPR 1 = one hardware pixel per CSS pixel (older displays)",
          "DPR 2-3 = common on phones and modern laptops",
          "Raster images need extra resolution to stay sharp",
          "window.devicePixelRatio reports the current value",
        ],
      },
      {
        heading: "Serve the right resolution",
        body: "Use srcset with density descriptors or width descriptors so the browser picks an appropriately sharp image per device. For icons and illustrations, prefer SVG, which is resolution-independent by nature. The goal is crisp visuals without shipping huge files to low-density screens.",
        items: [
          "Use srcset with 1x/2x descriptors for fixed-size images",
          "Use srcset width descriptors plus sizes for fluid images",
          "Prefer SVG for icons, logos, and line art",
          "Avoid upscaling small sources - it just looks soft",
        ],
      },
      {
        heading: "Verify sharpness across densities",
        body: "You cannot judge retina sharpness by squinting at one monitor. Testing across device profiles with different DPRs reveals soft images immediately. Sizzy lets you view high-density device profiles side by side so you can compare image crispness and confirm the right srcset variant is being served.",
        items: [
          "Compare the same image on DPR 1, 2, and 3 profiles",
          "Look for soft edges on logos and product photos",
          "Confirm the browser fetches the higher-res srcset variant",
          "Check that file sizes stay reasonable on low-DPR devices",
        ],
      },
    ],
    checklist: [
      "Raster images provide 2x sources via srcset.",
      "Icons and line art use SVG where possible.",
      "Low-density devices don't download oversized images.",
      "Sharpness is verified on multiple DPR profiles.",
    ],
    tags: ["device pixel ratio", "retina", "responsive images"],
    faq: [
      {
        question: "What is device pixel ratio?",
        answer:
          "Device pixel ratio (DPR) is the number of physical pixels per CSS pixel. A DPR of 2 means each CSS pixel is rendered using a 2x2 block of hardware pixels, which is why standard-resolution images look soft on high-density screens.",
      },
      {
        question: "How do I make images sharp on retina screens?",
        answer:
          "Provide higher-resolution sources with srcset density or width descriptors so the browser can pick a 2x or 3x image on high-DPR devices, and use SVG for icons and line art that must stay crisp at any size.",
      },
      {
        question: "How do I check a device's pixel ratio?",
        answer:
          "Read window.devicePixelRatio in the console, or test with device profiles of known DPR. A development browser that emulates high-density devices lets you compare image sharpness across DPR values quickly.",
      },
    ],
    related: [
      "responsive-images-srcset",
      "common-screen-resolutions",
      "responsive-screenshot-workflow",
    ],
  },
  {
    slug: "cross-browser-testing-guide",
    title: "Cross-Browser Testing: A Practical Guide",
    description:
      "A realistic cross-browser testing workflow for small teams - which browsers to prioritize, what actually breaks, and how to test efficiently.",
    eyebrow: "Cross-browser",
    readTime: "8 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Prioritize browsers by your real traffic",
        body: "You do not need to test every browser ever made. Pull your analytics, rank browsers by usage, and cover the engines behind them: Chromium (Chrome, Edge, Brave, Opera), WebKit (Safari), and Gecko (Firefox). Testing one browser per engine catches the vast majority of rendering differences without wasting time on near-identical Chromium clones.",
        items: [
          "Cover the three engines: Chromium, WebKit, Gecko",
          "Weight your effort by actual analytics usage",
          "Safari/WebKit deserves attention - it diverges most",
          "Don't separately test every Chromium-based browser",
        ],
      },
      {
        heading: "Know what actually breaks across browsers",
        body: "Layout engines mostly agree now, so the real differences hide in specific features: date inputs, scroll behavior, backdrop-filter, certain flex/grid edge cases, and Safari's handling of viewport units and sticky positioning. Keep a checklist of the features your app relies on and test those deliberately rather than eyeballing whole pages.",
        items: [
          "Form controls and date/time inputs render very differently",
          "Safari lags on some CSS and JS features",
          "backdrop-filter, sticky, and scroll-snap are common offenders",
          "Font rendering and smoothing differ subtly per OS",
        ],
      },
      {
        heading: "Make the testing loop fast",
        body: "Cross-browser testing dies when it is slow. The trick is to combine engine coverage with multi-device responsive checks in one pass. Sizzy is Chromium-based with synchronized devices for the responsive layer, and you pair it with real Safari and Firefox for engine coverage - giving you a tight loop instead of a sprawling device lab.",
        items: [
          "Run the responsive sweep once across synced devices",
          "Spot-check Safari and Firefox for engine-specific bugs",
          "Keep a feature checklist instead of re-checking whole pages",
          "Automate regression checks for your highest-risk flows",
        ],
      },
    ],
    checklist: [
      "Browser priority is based on your analytics, not guesses.",
      "At least one browser per rendering engine is covered.",
      "A feature checklist drives Safari and Firefox spot-checks.",
      "The responsive sweep and engine checks form one fast loop.",
    ],
    tags: ["cross-browser testing", "safari", "browser compatibility"],
    faq: [
      {
        question: "Which browsers should I test on?",
        answer:
          "Cover the three engines - Chromium (Chrome/Edge), WebKit (Safari), and Gecko (Firefox) - weighted by your analytics. Testing one browser per engine catches most rendering differences; you rarely need to test multiple Chromium-based browsers separately.",
      },
      {
        question: "Why does my site look different in Safari?",
        answer:
          "Safari uses the WebKit engine, which diverges most from Chromium on viewport units, sticky positioning, form controls, and some newer CSS features. Always give Safari dedicated attention rather than assuming Chrome parity.",
      },
      {
        question: "Do I need a device lab for cross-browser testing?",
        answer:
          "Usually not. Combine a multi-device development browser for responsive coverage with real Safari and Firefox for engine differences. Reserve physical devices or a cloud service for final validation of critical flows.",
      },
    ],
    related: [
      "test-safari-on-windows",
      "browserstack-alternatives",
      "real-devices-vs-emulators",
    ],
  },
  {
    slug: "test-safari-on-windows",
    title: "How to Test Safari on Windows",
    description:
      "Practical ways to test Safari and WebKit behavior from a Windows machine, since Apple no longer ships Safari for Windows.",
    eyebrow: "Cross-browser",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Why this is hard",
        body: "Apple discontinued Safari for Windows years ago, and Safari is tied to macOS and iOS. Since WebKit is the engine behind Safari, and iOS requires WebKit even for other browsers, you cannot get truly native Safari rendering on Windows. The goal is to get close enough to catch the WebKit-specific bugs that matter.",
        items: [
          "No official Safari build exists for Windows",
          "Safari rendering depends on the WebKit engine",
          "iOS browsers all use WebKit under the hood",
          "Aim for WebKit coverage, not pixel-identical Safari",
        ],
      },
      {
        heading: "Realistic options on Windows",
        body: "Your best options are a cloud browser service for real Safari instances, a macOS virtual machine or borrowed Mac for occasional checks, or Playwright's WebKit build for automated regression. None is perfect, so combine them: automate the repeatable checks and reserve real Safari for final sign-off on critical flows.",
        items: [
          "Cloud services provide real Safari on demand",
          "Playwright's WebKit build covers automated regression",
          "A borrowed Mac or VM handles final manual sign-off",
          "iOS Simulator (on a Mac) is the closest mobile Safari proxy",
        ],
      },
      {
        heading: "Cover the responsive layer locally",
        body: "Most reported 'Safari bugs' are actually responsive layout issues that any engine would show. Catch those first with a fast local multi-device sweep, then escalate only genuine WebKit quirks to real Safari. Sizzy is Chromium-based but its synchronized devices nail the responsive layer, shrinking the list of bugs that truly require Safari.",
        items: [
          "Run the responsive sweep locally before touching Safari",
          "Separate layout bugs from true WebKit rendering quirks",
          "Reserve scarce real-Safari time for genuine engine issues",
          "Document confirmed WebKit-only bugs for regression",
        ],
      },
    ],
    checklist: [
      "Accept that native Safari isn't available on Windows.",
      "Use a cloud service or Mac for final WebKit sign-off.",
      "Automate WebKit regression with Playwright where possible.",
      "Clear responsive bugs locally before escalating to Safari.",
    ],
    tags: ["safari on windows", "webkit testing", "cross-browser"],
    faq: [
      {
        question: "Can I install Safari on Windows?",
        answer:
          "No. Apple stopped releasing Safari for Windows, and current versions only run on macOS and iOS. To test Safari from Windows you need a cloud browser service, a macOS machine or VM, or Playwright's WebKit build.",
      },
      {
        question: "Is WebKit the same as Safari?",
        answer:
          "WebKit is the rendering engine that powers Safari, so testing WebKit (for example via Playwright) catches most engine-specific bugs. It is not byte-for-byte identical to Safari, so validate critical flows on real Safari before release.",
      },
      {
        question: "How do I test mobile Safari from Windows?",
        answer:
          "The closest options are a cloud service offering real iOS Safari or the iOS Simulator on a borrowed Mac. For the responsive layout layer, a multi-device browser on Windows catches most issues that aren't truly WebKit-specific.",
      },
    ],
    related: [
      "cross-browser-testing-guide",
      "browserstack-alternatives",
      "test-on-iphone-without-iphone",
    ],
  },
  {
    slug: "browserstack-alternatives",
    title: "BrowserStack Alternatives for Responsive Testing",
    description:
      "An honest look at when BrowserStack is overkill and which lighter-weight tools fit local responsive and cross-browser testing better.",
    eyebrow: "Cross-browser",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "What BrowserStack is good at",
        body: "BrowserStack and similar cloud labs give you real devices and real browser/OS combinations on demand, which is genuinely valuable for final QA, legacy browser support, and bugs you can only reproduce on specific hardware. If you must certify against a long matrix of real devices, a cloud lab earns its price.",
        items: [
          "Real devices and OS versions, not just emulation",
          "Broad legacy browser coverage",
          "Good for compliance and final certification",
          "Useful when a bug only appears on specific hardware",
        ],
      },
      {
        heading: "Where it is overkill",
        body: "For day-to-day responsive development, cloud labs are slow and expensive. Spinning up a remote session for every CSS tweak kills your feedback loop. Most responsive bugs are reproducible with accurate local emulation, and you only need real hardware occasionally. Paying per-minute for the inner development loop is the wrong tool for the job.",
        items: [
          "Latency makes the inner dev loop painful",
          "Per-seat pricing is steep for solo devs and small teams",
          "Most layout bugs don't require real hardware to reproduce",
          "Overkill for the resize-and-tweak phase of development",
        ],
      },
      {
        heading: "A lighter local-first stack",
        body: "Use a local multi-device browser for fast responsive iteration, then escalate to a cloud lab only for final certification on real hardware. Sizzy covers the local loop - synchronized devices, sessions, throttling, and screenshots - so your day-to-day work is instant, and you save cloud minutes for the genuine real-device checks at the end.",
        items: [
          "Sizzy for fast local responsive and session testing",
          "Real Safari/Firefox for engine coverage",
          "A cloud lab only for final real-device certification",
          "Playwright for automated cross-browser regression",
        ],
      },
    ],
    checklist: [
      "Match the tool to the phase: local loop vs final certification.",
      "Keep cloud-lab usage for real-hardware-only bugs.",
      "Use accurate local emulation for the resize-and-tweak loop.",
      "Automate regression instead of manual cloud sessions.",
    ],
    tags: ["browserstack alternative", "responsive testing", "cross-browser"],
    faq: [
      {
        question: "Is BrowserStack worth it?",
        answer:
          "It is worth it when you need real devices and a long matrix of OS/browser combinations for final certification or legacy support. For everyday responsive development it is slow and expensive - a local multi-device browser is a better fit for the inner loop.",
      },
      {
        question: "What is a cheaper alternative to BrowserStack?",
        answer:
          "For local responsive and session testing, tools like Sizzy, Responsively, or Polypane handle the day-to-day loop affordably. Reserve a paid cloud lab for the occasions you genuinely need real hardware.",
      },
      {
        question: "Do I still need a cloud lab if I use a local dev browser?",
        answer:
          "Often only for final sign-off. A local multi-device browser catches the large majority of responsive and layout bugs instantly; a cloud lab adds value mainly for certifying against real devices and legacy browser versions.",
      },
    ],
    related: [
      "cross-browser-testing-guide",
      "real-devices-vs-emulators",
      "test-safari-on-windows",
    ],
  },
  {
    slug: "real-devices-vs-emulators",
    title: "Real Devices vs Emulators for Web Testing",
    description:
      "When emulated viewports are enough and when you genuinely need a real phone - a pragmatic split that keeps testing fast without missing bugs.",
    eyebrow: "Cross-browser",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "What emulation gets right",
        body: "Accurate viewport emulation reproduces CSS width, device pixel ratio, user agent, and touch behavior - which covers the overwhelming majority of responsive layout bugs. For the design-and-build phase, emulation is faster and more repeatable than juggling physical phones, and you can see many devices at once instead of one at a time.",
        items: [
          "Reproduces CSS width, DPR, and user agent accurately",
          "Lets you view many devices simultaneously",
          "Faster and more repeatable than physical hardware",
          "Catches the majority of layout and breakpoint bugs",
        ],
      },
      {
        heading: "What only real devices reveal",
        body: "Emulation cannot reproduce everything. Real hardware is the only way to catch true touch ergonomics, GPU and scroll performance, OS-specific font rendering, hardware sensors, and quirks in actual mobile Safari or Samsung Internet. These matter most for performance-sensitive and highly interactive products.",
        items: [
          "Real touch latency and scroll/animation performance",
          "Actual mobile browser engine quirks",
          "Hardware features: camera, sensors, biometrics",
          "True font rendering and color on the device's screen",
        ],
      },
      {
        heading: "A pragmatic split",
        body: "Develop and iterate against emulated multi-device views, then validate on one real Android and one real iPhone before release. Sizzy handles the emulated loop with synchronized devices and a QR-to-phone shortcut that opens your localhost on a real device instantly - so the jump from emulation to real hardware is a single scan, not a setup chore.",
        items: [
          "Build against synced emulated devices for speed",
          "Validate on one real Android and one real iOS device",
          "Use QR-to-phone to open localhost on hardware instantly",
          "Reserve real-device passes for performance and final QA",
        ],
      },
    ],
    checklist: [
      "Iterate on emulated devices for everyday responsive work.",
      "Validate critical flows on at least one real Android and iOS.",
      "Use real hardware for performance-sensitive interactions.",
      "Make the emulation-to-device jump fast with QR-to-phone.",
    ],
    tags: ["real devices", "emulators", "mobile testing"],
    faq: [
      {
        question: "Are emulators good enough for responsive testing?",
        answer:
          "For layout and breakpoint testing, accurate emulation catches the vast majority of bugs and is faster than physical devices. You still need real hardware for performance, touch ergonomics, and engine-specific quirks before release.",
      },
      {
        question: "When do I really need a real device?",
        answer:
          "Use real devices for scroll and animation performance, touch ergonomics, hardware features like camera or sensors, and final validation of mobile Safari behavior. These are the areas emulation cannot fully reproduce.",
      },
      {
        question: "How do I quickly open my site on a real phone?",
        answer:
          "Use a QR-to-phone feature, like the one in Sizzy, to open your local dev server on a real device by scanning a code - no typing local IP addresses. It makes moving from emulation to hardware nearly instant.",
      },
    ],
    related: [
      "test-localhost-on-mobile",
      "browserstack-alternatives",
      "mobile-performance-testing",
    ],
  },
  {
    slug: "test-website-on-ipad",
    title: "How to Test Your Website on iPad",
    description:
      "iPad viewport sizes, the tablet layout gap most sites miss, and a fast workflow for testing iPad portrait and landscape properly.",
    eyebrow: "Device testing",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The tablet gap is where layouts break",
        body: "Most teams test phone and desktop but skip tablet, so iPad lands in an awkward middle zone: too wide for the mobile layout, too narrow for desktop. The result is stretched cards, cramped multi-column grids, and navigation that neither collapses nor fully expands. iPad deserves explicit attention precisely because it falls between your two main breakpoints.",
        items: [
          "iPad sits in the 768-1024px layout handoff zone",
          "Mobile layouts stretch awkwardly at tablet width",
          "Desktop layouts feel cramped on a portrait iPad",
          "Navigation often misbehaves between collapse and expand",
        ],
      },
      {
        heading: "iPad viewport sizes to test",
        body: "Test both orientations, since portrait and landscape can trigger entirely different layouts. Standard iPad is 768px portrait, iPad Air and Pro 11-inch are around 820-834px, and the 12.9-inch Pro is 1024px portrait - which is wide enough to hit desktop breakpoints. Always include landscape, where a portrait-only design can fall apart.",
        items: [
          "768px portrait for the standard iPad",
          "820px and 834px for iPad Air and 11-inch Pro",
          "1024px portrait for the 12.9-inch Pro",
          "Landscape widths up to 1366px for large iPads",
        ],
      },
      {
        heading: "Test both orientations side by side",
        body: "Switching a single window between orientations is slow and hides relational bugs. Viewing iPad portrait and landscape together makes orientation issues obvious at a glance. Sizzy lets you add multiple iPad profiles in both orientations and interact with them in sync, so you confirm the tablet experience without owning every model.",
        items: [
          "Open iPad portrait and landscape simultaneously",
          "Confirm grids reflow sensibly at tablet width",
          "Check that touch targets stay comfortably sized",
          "Verify navigation behavior at the tablet boundary",
        ],
      },
    ],
    checklist: [
      "Test a dedicated tablet layout, not just phone and desktop.",
      "Cover 768px, ~820px, and 1024px iPad widths.",
      "Check both portrait and landscape orientations.",
      "Confirm navigation behaves in the tablet handoff zone.",
    ],
    tags: ["ipad testing", "tablet viewport", "responsive design"],
    faq: [
      {
        question: "What is the iPad viewport size in CSS pixels?",
        answer:
          "The standard iPad is 768px wide in portrait, iPad Air and 11-inch Pro are around 820-834px, and the 12.9-inch Pro is 1024px portrait. Landscape widths range up to about 1366px on the largest models.",
      },
      {
        question: "Why does my site look broken on iPad?",
        answer:
          "iPad usually falls between your mobile and desktop breakpoints, so neither layout fits well. Add a tablet-range check around 768-1024px and adjust grids and navigation for that zone specifically.",
      },
      {
        question: "Do I need a real iPad to test?",
        answer:
          "For layout you can test accurate iPad viewports in a development browser like Sizzy, including both orientations. Validate on a real iPad for touch and Safari-specific behavior before a major release.",
      },
    ],
    related: [
      "test-website-on-android",
      "common-screen-resolutions",
      "safe-area-insets",
    ],
  },
  {
    slug: "test-website-on-android",
    title: "How to Test a Website on an Android Phone",
    description:
      "How to open your site on a real Android phone, use remote debugging over USB, and cover Android's wide range of viewport widths.",
    eyebrow: "Device testing",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Get your site onto the phone fast",
        body: "There are three reliable ways to load your local site on an Android phone: put the phone on the same Wi-Fi and visit your machine's local IP, expose localhost through a tunneling tool, or use a QR-to-phone shortcut that opens the URL by scanning a code. The QR approach is fastest because it skips typing IP addresses on a tiny keyboard.",
        items: [
          "Same Wi-Fi: visit http://your-machine-ip:port",
          "Tunnel localhost for phones on other networks",
          "Scan a QR code to open the URL instantly",
          "Ensure your dev server binds to 0.0.0.0, not just localhost",
        ],
      },
      {
        heading: "Use Chrome remote debugging over USB",
        body: "For real inspection, enable USB debugging on the phone and open chrome://inspect on your computer. You get full DevTools for the page running on the actual device - inspect elements, read the real console, and profile performance on real hardware. This is the gold standard for diagnosing Android-only issues.",
        items: [
          "Enable Developer Options and USB debugging on Android",
          "Open chrome://inspect on desktop Chrome",
          "Inspect the live page with full DevTools",
          "Profile real device performance, not emulated",
        ],
      },
      {
        heading: "Cover Android's width spread first",
        body: "Android spans far more widths than iOS, so emulating the common classes locally before grabbing hardware saves time. Sizzy shows common Android widths side by side with synced interaction and a QR shortcut to jump to a real device, so you clear layout bugs in emulation and reserve the physical phone for performance and final checks.",
        items: [
          "Emulate 360px, 393px, and 412px before using hardware",
          "Check larger 480px foldable and tablet handoff widths",
          "Use QR-to-phone to reach the real device instantly",
          "Reserve real hardware for performance and final QA",
        ],
      },
    ],
    checklist: [
      "Dev server binds to 0.0.0.0 so the phone can reach it.",
      "Common Android widths are cleared in emulation first.",
      "chrome://inspect is used for real on-device debugging.",
      "A real device confirms performance before release.",
    ],
    tags: ["android testing", "remote debugging", "mobile qa"],
    faq: [
      {
        question: "How do I open my localhost on an Android phone?",
        answer:
          "Put the phone on the same Wi-Fi and visit your computer's local IP with the port, make sure your dev server binds to 0.0.0.0, or use a QR-to-phone shortcut to open the URL by scanning a code.",
      },
      {
        question: "How do I debug a website on a real Android device?",
        answer:
          "Enable USB debugging on the phone, connect it, and open chrome://inspect in desktop Chrome. You get full DevTools for the live page on the device, including console, element inspection, and performance profiling.",
      },
      {
        question: "What Android screen widths should I test?",
        answer:
          "Cover 360px, 393px, and 412px for common phones, plus around 480px for foldables and small-tablet handoff. Android varies more than iOS, so test a representative width per class rather than one flagship.",
      },
    ],
    related: [
      "android-viewport-sizes",
      "test-localhost-on-mobile",
      "inspect-element-on-mobile",
    ],
  },
  {
    slug: "test-on-iphone-without-iphone",
    title: "How to Test on iPhone Without an iPhone",
    description:
      "Practical ways to test iPhone and mobile Safari behavior when you don't own an iPhone, and what emulation can and can't reproduce.",
    eyebrow: "Device testing",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Separate layout from engine",
        body: "Two different things get called 'iPhone testing': does the layout fit the iPhone viewport, and does it work in mobile Safari's WebKit engine? The layout question is fully solvable with accurate emulation. The engine question needs WebKit. Splitting these tells you exactly what you can do without owning an iPhone and what you cannot.",
        items: [
          "Layout fit is solvable with accurate viewport emulation",
          "Engine behavior needs WebKit, which is iOS-only natively",
          "Most reported bugs are layout, not engine",
          "Know which question you're actually answering",
        ],
      },
      {
        heading: "Cover the layout locally",
        body: "Use a development browser to render accurate iPhone viewports - correct CSS width, DPR, safe-area insets, and device frame. This catches breakpoint bugs, clipped content, and notch issues without any Apple hardware. Sizzy includes iPhone profiles in both orientations so you can confirm the mobile layout entirely on your own machine.",
        items: [
          "Render iPhone CSS widths like 390px and 430px",
          "Confirm safe-area insets clear the notch and home bar",
          "Test portrait and landscape together",
          "Catch breakpoint and overflow bugs without hardware",
        ],
      },
      {
        heading: "Reach real WebKit when you must",
        body: "For genuine WebKit quirks, use a cloud service with real iOS Safari, the iOS Simulator on a borrowed Mac, or Playwright's WebKit build for automated regression. Clear all the layout bugs locally first so the scarce real-Safari time is spent only on issues that truly require it.",
        items: [
          "Cloud services offer real iOS Safari on demand",
          "iOS Simulator on a Mac is a close mobile-Safari proxy",
          "Playwright WebKit covers automated regression",
          "Escalate only confirmed engine-specific bugs",
        ],
      },
    ],
    checklist: [
      "Decide whether the bug is layout or engine related.",
      "Clear all layout issues with accurate iPhone emulation.",
      "Use cloud or simulator for genuine WebKit checks.",
      "Reserve real-Safari time for confirmed engine bugs.",
    ],
    tags: ["iphone testing", "mobile safari", "no iphone"],
    faq: [
      {
        question: "Can I test on iPhone without owning one?",
        answer:
          "Yes for layout - accurate iPhone viewport emulation in a development browser catches most bugs. For genuine mobile Safari engine behavior you need WebKit via a cloud service, the iOS Simulator on a Mac, or Playwright.",
      },
      {
        question: "Is emulating an iPhone the same as testing on one?",
        answer:
          "For CSS layout, width, DPR, and safe areas, emulation is very close. It cannot fully reproduce mobile Safari's engine quirks or real touch performance, so validate critical flows on real WebKit before release.",
      },
      {
        question: "What's the closest thing to mobile Safari on a budget?",
        answer:
          "The iOS Simulator on a borrowed Mac runs real mobile Safari, and cloud services offer on-demand iOS Safari sessions. For the responsive layout layer, a multi-device browser handles most issues locally.",
      },
    ],
    related: [
      "test-safari-on-windows",
      "iphone-viewport-sizes",
      "real-devices-vs-emulators",
    ],
  },
  {
    slug: "foldable-device-testing",
    title: "Testing Websites on Foldable Devices",
    description:
      "How foldables change responsive assumptions, the viewport widths they introduce, and how to keep layouts working across the fold.",
    eyebrow: "Device testing",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Foldables break the phone/tablet binary",
        body: "A foldable is a narrow phone when closed and a small tablet when open, sometimes switching mid-session. That introduces unusual widths and aspect ratios your breakpoints may not anticipate, plus the possibility of content landing under the hinge. If your layout only knows 'phone' and 'tablet', a foldable will expose the gap.",
        items: [
          "Closed state is a narrow phone, often around 280-360px",
          "Open state behaves like a small tablet, ~600-840px",
          "Aspect ratios can be unusually tall or nearly square",
          "Content can fall awkwardly across the hinge",
        ],
      },
      {
        heading: "Design for the range, not the device",
        body: "Chasing specific foldable models is futile. Instead, make sure your layout works across the entire width range continuously, with no dead zones where the design assumes a fixed size. Fluid grids, flexible typography, and content-driven breakpoints handle foldables naturally. The CSS viewport-segments and screen-spanning features can refine the hinge case where supported.",
        items: [
          "Ensure continuous layout across the full width range",
          "Avoid fixed widths that assume a specific device",
          "Use fluid grids and clamp-based typography",
          "Consider viewport-segment media features for the hinge",
        ],
      },
      {
        heading: "Test the narrow and open extremes",
        body: "The fastest check is to view the closed (very narrow) and open (small-tablet) widths together and scrub between them. Sizzy lets you add custom-width devices for both foldable states and interact with them in sync, so you confirm the layout survives the fold without owning a foldable phone.",
        items: [
          "Add a very narrow custom device for the closed state",
          "Add a small-tablet width for the open state",
          "Scrub the range between to find dead zones",
          "Confirm no critical content lands under the hinge",
        ],
      },
    ],
    checklist: [
      "Layout works continuously across the full width range.",
      "No fixed widths assume a single device size.",
      "Closed and open foldable widths are both tested.",
      "Critical content avoids the hinge region.",
    ],
    tags: ["foldable devices", "responsive design", "viewport"],
    faq: [
      {
        question: "What viewport widths do foldables use?",
        answer:
          "Closed, foldables behave like narrow phones around 280-360px; open, they act like small tablets around 600-840px. Exact values vary by model, so design for the continuous range rather than specific widths.",
      },
      {
        question: "How do I handle the fold or hinge in CSS?",
        answer:
          "Where supported, the viewport-segments and screen-spanning media features let you detect the hinge and avoid placing critical content across it. Otherwise, fluid layouts that work across the full width range handle foldables well.",
      },
      {
        question: "Do I need a foldable to test for foldables?",
        answer:
          "No. Testing the narrow closed width and the wider open width with custom device profiles in a multi-device browser catches most foldable issues. A real foldable is only needed for final validation of hinge-specific behavior.",
      },
    ],
    related: [
      "common-screen-resolutions",
      "responsive-typography-clamp",
      "test-website-on-android",
    ],
  },
  {
    slug: "test-localhost-on-mobile",
    title: "How to Test Localhost on Your Phone",
    description:
      "Three reliable ways to open your local dev server on a real phone, plus the network gotchas that stop localhost from loading on mobile.",
    eyebrow: "Dev workflow",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Why localhost won't load on your phone",
        body: "localhost on your phone means the phone itself, not your computer - so typing localhost:3000 in mobile Safari does nothing useful. To reach your machine, you need its network IP, and your dev server must be listening on all interfaces. Most 'it won't connect' problems come down to one of these two issues.",
        items: [
          "localhost on the phone refers to the phone, not your computer",
          "Dev server must bind to 0.0.0.0, not 127.0.0.1",
          "Phone and computer must share the network",
          "A firewall may block the dev server port",
        ],
      },
      {
        heading: "The three reliable methods",
        body: "Same-network IP is simplest: find your computer's LAN IP and visit it with the port from the phone. A tunneling tool like ngrok or cloudflared gives a public URL that works from any network. A QR-to-phone shortcut opens the URL by scanning, skipping the tedious IP typing. Pick based on whether the phone is on your Wi-Fi.",
        items: [
          "Same Wi-Fi: http://192.168.x.x:port",
          "Tunnel: a public URL for phones on cellular or other networks",
          "QR-to-phone: scan to open instantly",
          "HTTPS tunnels matter for features that require secure context",
        ],
      },
      {
        heading: "Make it a one-scan habit",
        body: "If reaching your phone is annoying, you'll skip it - and ship mobile bugs. Sizzy includes a QR-to-phone shortcut that turns your current localhost URL into a scannable code, so opening the page on a real device is instant. Pair that with synced emulated devices and you cover both the fast loop and the real-hardware check.",
        items: [
          "Generate a QR for the current localhost URL",
          "Scan once to open on any phone on the network",
          "Combine with emulated devices for layout coverage",
          "Keep the real-device check a frictionless habit",
        ],
      },
    ],
    checklist: [
      "Dev server binds to 0.0.0.0 and the port is open.",
      "Phone and computer are on the same network (or use a tunnel).",
      "A tunnel is used when secure context or remote access is needed.",
      "Opening localhost on a phone is a one-scan action.",
    ],
    tags: ["localhost on mobile", "dev server", "mobile testing"],
    faq: [
      {
        question: "Why can't I open localhost on my phone?",
        answer:
          "localhost on the phone points to the phone itself. Use your computer's LAN IP with the port, make sure the dev server binds to 0.0.0.0, and confirm both devices share a network and the firewall isn't blocking the port.",
      },
      {
        question: "How do I open my local dev server on my phone quickly?",
        answer:
          "The fastest way is a QR-to-phone shortcut, like Sizzy's, which turns the current localhost URL into a scannable code. Otherwise visit your machine's LAN IP and port, or expose localhost with a tunneling tool.",
      },
      {
        question: "How do I test localhost on a phone on a different network?",
        answer:
          "Use a tunneling tool such as ngrok or cloudflared to expose your local server with a public, usually HTTPS, URL. That lets a phone on cellular or another Wi-Fi reach your dev server.",
      },
    ],
    related: [
      "expose-localhost-to-mobile",
      "access-local-dev-server-from-any-device",
      "hot-reload-across-devices",
    ],
  },
  {
    slug: "hot-reload-across-devices",
    title: "Hot Reload Across Multiple Devices",
    description:
      "How to get instant hot reload on every device at once so a single code change updates phone, tablet, and desktop without manual refreshes.",
    eyebrow: "Dev workflow",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The manual-refresh tax",
        body: "When you test on several devices, every code change means refreshing each one - tap the phone, click the tablet window, reload desktop. That tax adds up to dozens of context switches an hour and quietly discourages thorough multi-device testing. The fix is to let your dev server's hot reload reach every device automatically.",
        items: [
          "Each manual refresh is a small context switch",
          "The tax discourages frequent multi-device checks",
          "Stale tabs lead to debugging code you already changed",
          "Hot reload should fan out to every device, not just one",
        ],
      },
      {
        heading: "How HMR reaches every device",
        body: "Modern dev servers like Vite, Next.js, and webpack push updates over a websocket to connected clients. Any device pointed at your dev server gets the update - the catch is keeping all those devices open and connected. A multi-device browser solves this by hosting all the viewports in one place that share the same hot-reload connection.",
        items: [
          "HMR pushes changes over a websocket to clients",
          "Every connected viewport updates, not just the active one",
          "Keep all devices pointed at the same dev server",
          "Synced interaction layers on top of synced reloads",
        ],
      },
      {
        heading: "One change, every device updates",
        body: "In Sizzy, all your devices live in one window connected to your dev server, so saving a file hot-reloads phone, tablet, and desktop together. Combined with synchronized scrolling and clicking, you change a media query and instantly see the result everywhere - the tightest possible responsive feedback loop.",
        items: [
          "All devices share one dev-server connection",
          "Save once and every viewport reloads together",
          "Pair with synced scroll and click for full coverage",
          "Eliminate per-device manual refreshing entirely",
        ],
      },
    ],
    checklist: [
      "All test devices point at the same dev server.",
      "HMR is enabled and the websocket connects on each device.",
      "A single save updates every viewport without manual refresh.",
      "Synced interaction complements synced reloads.",
    ],
    tags: ["hot reload", "hmr", "dev workflow"],
    faq: [
      {
        question: "Can hot reload update multiple devices at once?",
        answer:
          "Yes. Hot module replacement pushes updates over a websocket to every connected client, so any device pointed at your dev server updates automatically. A multi-device browser keeps all viewports connected so one save refreshes them together.",
      },
      {
        question: "Why does only one device hot reload?",
        answer:
          "Usually because the other devices aren't connected to the dev server's HMR websocket, or they're viewing a cached or different URL. Ensure every device points at the same dev-server origin and the websocket isn't blocked.",
      },
      {
        question: "Does Sizzy support hot reload across devices?",
        answer:
          "Yes. Sizzy hosts all your devices in one window sharing the same dev-server connection, so saving a file hot-reloads phone, tablet, and desktop simultaneously, alongside synchronized scrolling and clicking.",
      },
    ],
    related: [
      "test-localhost-on-mobile",
      "access-local-dev-server-from-any-device",
      "test-responsive-design-on-multiple-devices",
    ],
  },
  {
    slug: "access-local-dev-server-from-any-device",
    title: "Access Your Local Dev Server From Any Device",
    description:
      "Network setup, binding, and HTTPS tips for reaching your local dev server from phones, tablets, and other machines on your network.",
    eyebrow: "Dev workflow",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Bind to the right interface",
        body: "By default many dev servers listen only on 127.0.0.1, which is unreachable from other devices. Binding to 0.0.0.0 makes the server listen on all network interfaces so other devices on your LAN can connect. This single setting fixes the majority of 'can't reach my dev server' problems.",
        items: [
          "127.0.0.1 is local-only and unreachable from other devices",
          "0.0.0.0 listens on all interfaces",
          "Vite: use --host; Next.js: -H 0.0.0.0",
          "Confirm the chosen port isn't blocked by a firewall",
        ],
      },
      {
        heading: "Find your address and connect",
        body: "Once bound correctly, find your machine's LAN IP and visit it with the port from any device on the same network. For features that need a secure context - service workers, camera, geolocation - you'll need HTTPS, which a tunneling tool can provide, or a locally trusted certificate via a tool like mkcert.",
        items: [
          "Get your LAN IP (ipconfig / ifconfig / system settings)",
          "Visit http://your-ip:port from the other device",
          "Use HTTPS for secure-context-only features",
          "mkcert or a tunnel provides trusted local HTTPS",
        ],
      },
      {
        heading: "Keep every device in view",
        body: "Reaching the dev server is half the battle; keeping all those devices visible and in sync is the other half. Sizzy gathers phone, tablet, and desktop viewports into one window pointed at your dev server, so once your binding and network are right, every device stays connected, hot-reloads together, and responds to synchronized input.",
        items: [
          "Point all viewports at the same dev-server origin",
          "Keep them in one window for synced interaction",
          "Benefit from shared hot reload across devices",
          "Use a QR shortcut to add a real phone to the mix",
        ],
      },
    ],
    checklist: [
      "Dev server binds to 0.0.0.0 (or --host).",
      "The port is reachable through the firewall.",
      "HTTPS is configured for secure-context features.",
      "All devices share the same dev-server origin.",
    ],
    tags: ["dev server", "local network", "https localhost"],
    faq: [
      {
        question: "How do I make my dev server accessible on my network?",
        answer:
          "Bind it to 0.0.0.0 instead of 127.0.0.1 - use --host with Vite or -H 0.0.0.0 with Next.js - then visit your machine's LAN IP and port from other devices on the same network, with the firewall allowing the port.",
      },
      {
        question: "Why do I need HTTPS for local testing?",
        answer:
          "Features like service workers, camera, microphone, and geolocation require a secure context. Use a tunneling tool that provides HTTPS or generate a locally trusted certificate with mkcert so these features work on other devices.",
      },
      {
        question: "What's the difference between 127.0.0.1 and 0.0.0.0?",
        answer:
          "127.0.0.1 is the loopback address reachable only from the same machine, while 0.0.0.0 tells the server to listen on all network interfaces so other devices on the network can connect.",
      },
    ],
    related: [
      "test-localhost-on-mobile",
      "expose-localhost-to-mobile",
      "hot-reload-across-devices",
    ],
  },
  {
    slug: "expose-localhost-to-mobile",
    title: "Expose Localhost to Mobile: Tunnels vs Local IP",
    description:
      "When to use a local IP versus a tunneling tool like ngrok or cloudflared to open your local site on mobile, and the trade-offs of each.",
    eyebrow: "Dev workflow",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Local IP: fast but same-network only",
        body: "Visiting your machine's LAN IP from a phone on the same Wi-Fi is the fastest, zero-dependency option. There's no third party, no rate limits, and minimal latency. The limits: both devices must be on the same network, you usually get HTTP only, and corporate or guest networks often block device-to-device traffic.",
        items: [
          "No third-party dependency or signup",
          "Lowest latency for the inner dev loop",
          "Requires the phone on the same network",
          "Typically HTTP only, which blocks secure-context features",
        ],
      },
      {
        heading: "Tunnels: anywhere access and HTTPS",
        body: "Tools like ngrok and cloudflared create a public URL that forwards to your local server, so any device anywhere can reach it - useful for cellular phones, remote teammates, and webhook testing. They also provide HTTPS, which unlocks secure-context features. Trade-offs are added latency, possible rate limits on free tiers, and exposing your dev server publicly.",
        items: [
          "Works from any network, including cellular",
          "Provides HTTPS for service workers and device APIs",
          "Great for webhook and remote-review testing",
          "Adds latency and exposes the server publicly",
        ],
      },
      {
        heading: "The simplest option for layout work",
        body: "For pure responsive layout testing, you often don't need either: emulate the devices locally and only reach for hardware occasionally. Sizzy renders accurate mobile viewports in one window and offers a QR-to-phone shortcut for the real-device check, so you tunnel only when you specifically need HTTPS or off-network access.",
        items: [
          "Emulate viewports locally for everyday layout work",
          "Use QR-to-phone for the quick real-device check",
          "Reach for a tunnel only when HTTPS or remote access is needed",
          "Match the tool to the actual requirement",
        ],
      },
    ],
    checklist: [
      "Use local IP for same-network, HTTP-only quick checks.",
      "Use a tunnel for HTTPS, cellular, or remote access.",
      "Emulate viewports for everyday layout iteration.",
      "Avoid exposing the dev server publicly longer than needed.",
    ],
    tags: ["ngrok", "expose localhost", "mobile testing"],
    faq: [
      {
        question: "Should I use ngrok or my local IP to test on mobile?",
        answer:
          "Use your local IP when the phone is on the same Wi-Fi and you only need HTTP - it's fastest. Use a tunnel like ngrok or cloudflared when you need HTTPS, access from another network, or to test webhooks.",
      },
      {
        question: "Is it safe to expose localhost with a tunnel?",
        answer:
          "Tunnels make your dev server publicly reachable while running, so use authentication or access controls where the tool supports them, and shut the tunnel down when you're done. Don't expose sensitive data through an open tunnel.",
      },
      {
        question: "Do I need a tunnel just to check responsive layout?",
        answer:
          "Usually no. Accurate viewport emulation in a development browser covers layout testing locally, and a QR-to-phone shortcut handles quick real-device checks. Reserve tunnels for HTTPS-only features or off-network access.",
      },
    ],
    related: [
      "test-localhost-on-mobile",
      "access-local-dev-server-from-any-device",
      "testing-pwas-across-devices",
    ],
  },
  {
    slug: "debug-css-layout-issues",
    title: "How to Debug CSS Layout Issues",
    description:
      "A systematic approach to debugging CSS layout bugs - isolating the cause, using DevTools overlays, and verifying the fix across breakpoints.",
    eyebrow: "CSS debugging",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Isolate before you guess",
        body: "Random CSS tweaks waste hours. Start by isolating the element: inspect it, check the box model in DevTools, and confirm whether the problem is the element itself or a parent constraining it. Most 'mysterious' layout bugs are a parent with overflow, a flex container with an unexpected default, or a margin collapsing in a way you didn't anticipate.",
        items: [
          "Inspect the box model: content, padding, border, margin",
          "Check the parent - it often causes the child's behavior",
          "Toggle properties off one at a time to find the culprit",
          "Confirm whether it's sizing, positioning, or overflow",
        ],
      },
      {
        heading: "Use DevTools overlays and outlines",
        body: "Visual overlays turn invisible structure into something you can see. Enable the flex and grid overlays, and temporarily outline every element to reveal stray boxes, overflow, and unexpected stacking. These tools answer 'why is this here?' far faster than reading CSS line by line.",
        items: [
          "Turn on grid and flex overlays in DevTools",
          "Apply * { outline: 1px solid red } to reveal boxes",
          "Use the layout panel to inspect grid/flex alignment",
          "Check computed styles, not just authored rules",
        ],
      },
      {
        heading: "Verify the fix everywhere",
        body: "A layout fix that works at your current width can break another. After fixing, confirm the result across breakpoints rather than declaring victory at one size. Sizzy shows the same element on phone, tablet, and desktop together, so you immediately see whether your fix held across the layout - the most common place CSS bugs sneak back in.",
        items: [
          "Recheck the fix at every major breakpoint",
          "Confirm no new overflow or reflow appears nearby",
          "Test with real content length, not lorem ipsum",
          "Watch all widths at once to catch regressions instantly",
        ],
      },
    ],
    checklist: [
      "The root cause is isolated before any fix is applied.",
      "Grid/flex overlays and outlines are used to see structure.",
      "Computed styles are checked, not just authored CSS.",
      "The fix is verified across all breakpoints at once.",
    ],
    tags: ["css debugging", "devtools", "layout bugs"],
    faq: [
      {
        question: "How do I find what's causing a CSS layout bug?",
        answer:
          "Inspect the element's box model and its parent, then toggle properties off one at a time in DevTools to isolate the cause. Most layout bugs trace to a parent's overflow, a flex default, or collapsing margins.",
      },
      {
        question: "What's a quick way to visualize layout problems?",
        answer:
          "Apply a temporary outline to every element (* { outline: 1px solid red }) and enable DevTools grid and flex overlays. These make invisible boxes, overflow, and alignment issues immediately visible.",
      },
      {
        question: "Why does my fix work at one size but not another?",
        answer:
          "Layout depends on available width, so a fix at one breakpoint can regress at another. Verify the change across all breakpoints - viewing several widths at once makes regressions obvious right away.",
      },
    ],
    related: [
      "fix-horizontal-scroll",
      "debug-flexbox-layouts",
      "why-layout-breaks-on-mobile",
    ],
  },
  {
    slug: "fix-horizontal-scroll",
    title: "How to Find and Fix Horizontal Scroll",
    description:
      "A step-by-step method to track down the element causing unwanted horizontal scroll on mobile and fix it without breaking other layouts.",
    eyebrow: "CSS debugging",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Why horizontal scroll happens",
        body: "Unwanted horizontal scroll means something is wider than the viewport. The usual suspects are a fixed-width element, an image or table without a max-width, negative margins, or a 100vw element on a page that has a scrollbar. It almost always shows up on mobile first because that's where the viewport is narrowest.",
        items: [
          "A fixed-width element wider than the screen",
          "Images, videos, or tables without max-width: 100%",
          "Negative margins pushing content past the edge",
          "100vw including the scrollbar width",
        ],
      },
      {
        heading: "Track down the offending element",
        body: "Find the culprit methodically. Add a temporary outline to everything, then look for the box that extends past the viewport edge. A quick script that logs elements wider than the document can pinpoint it instantly. Don't just hide overflow on the body - that masks the symptom and can break sticky and scroll behavior.",
        items: [
          "Outline every element to spot the overflowing box",
          "Use a script to log elements wider than document width",
          "Check both the element and its margins/padding",
          "Avoid overflow-x: hidden as a blanket band-aid",
        ],
      },
      {
        heading: "Fix it and confirm on real widths",
        body: "Common fixes are max-width: 100% on media, box-sizing: border-box, removing fixed widths, and using 100% instead of 100vw. Then confirm on actual mobile widths, since horizontal scroll is often invisible on desktop. Sizzy renders accurate phone widths so you can verify the overflow is truly gone, not just hidden.",
        items: [
          "Add max-width: 100% to images, video, and tables",
          "Use box-sizing: border-box globally",
          "Replace 100vw with 100% where a scrollbar exists",
          "Verify on real mobile widths, not just desktop",
        ],
      },
    ],
    checklist: [
      "The exact overflowing element is identified, not guessed.",
      "Media and tables have max-width: 100%.",
      "overflow-x: hidden isn't used to mask the real cause.",
      "The fix is confirmed on actual mobile viewport widths.",
    ],
    tags: ["horizontal scroll", "css overflow", "mobile bugs"],
    faq: [
      {
        question: "How do I find what's causing horizontal scroll?",
        answer:
          "Outline every element or run a script that logs any element wider than the document width. The overflowing box is usually a fixed-width element, an image or table without max-width, or a negative margin.",
      },
      {
        question: "Should I just use overflow-x: hidden?",
        answer:
          "Avoid it as a blanket fix - it hides the symptom but leaves the real overflow in place and can break sticky positioning and scroll anchoring. Find and fix the element that's too wide instead.",
      },
      {
        question: "Why does horizontal scroll only show on mobile?",
        answer:
          "The viewport is narrowest on mobile, so an element a bit too wide overflows there first while fitting fine on desktop. Always confirm overflow fixes on real mobile widths.",
      },
    ],
    related: [
      "debug-css-layout-issues",
      "why-layout-breaks-on-mobile",
      "responsive-tables",
    ],
  },
  {
    slug: "debug-flexbox-layouts",
    title: "Debugging Flexbox Layouts",
    description:
      "The flexbox gotchas that cause most layout bugs - min-width: auto, flex-shrink, and alignment - and how to debug them with DevTools.",
    eyebrow: "CSS debugging",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The min-width: auto trap",
        body: "The single most common flexbox bug is content overflowing a flex item that should shrink. By default flex items have min-width: auto, which refuses to shrink below their content size - so a long string or wide child blows out the layout. Setting min-width: 0 (or overflow on the item) lets it shrink as intended. This one rule resolves a huge share of flex overflow bugs.",
        items: [
          "Flex items default to min-width: auto and won't shrink",
          "Long text or wide children cause overflow",
          "Set min-width: 0 to allow shrinking",
          "Add overflow: hidden when truncation is desired",
        ],
      },
      {
        heading: "Understand grow, shrink, and basis",
        body: "Most flex confusion comes from the flex shorthand. flex-grow distributes extra space, flex-shrink removes space when cramped, and flex-basis is the starting size before those apply. flex: 1 means grow and shrink from a zero basis; flex: 0 0 auto means don't grow or shrink. Reading the shorthand correctly explains most unexpected sizing.",
        items: [
          "flex-grow distributes leftover space",
          "flex-shrink removes space when there isn't enough",
          "flex-basis is the size before grow/shrink apply",
          "flex: 1 vs flex: 0 0 auto behave very differently",
        ],
      },
      {
        heading: "Use the flex overlay across breakpoints",
        body: "DevTools' flex overlay shows main and cross axes, alignment, and free space - invaluable for understanding why items sit where they do. Then check the flex container across breakpoints, since flex-wrap and alignment behave differently as width changes. Sizzy shows the layout on multiple widths at once so you can see exactly where items wrap or misalign.",
        items: [
          "Enable the flex overlay to see axes and free space",
          "Check align-items and justify-content interactions",
          "Watch flex-wrap behavior as width changes",
          "Compare the container across breakpoints side by side",
        ],
      },
    ],
    checklist: [
      "Flex items that overflow have min-width: 0 set.",
      "The flex shorthand values are understood, not copied blindly.",
      "Wrap and alignment are checked across breakpoints.",
      "The DevTools flex overlay is used to diagnose alignment.",
    ],
    tags: ["flexbox", "css debugging", "layout"],
    faq: [
      {
        question: "Why is my flexbox content overflowing?",
        answer:
          "Flex items default to min-width: auto, which prevents them from shrinking below their content size. Set min-width: 0 (and overflow: hidden if you want truncation) on the item so it can shrink within the container.",
      },
      {
        question: "What does flex: 1 actually mean?",
        answer:
          "flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%, meaning the item grows and shrinks to share available space from a zero starting size. It's different from flex: 0 0 auto, which neither grows nor shrinks.",
      },
      {
        question: "How do I debug flexbox alignment?",
        answer:
          "Use the DevTools flex overlay to visualize the main and cross axes, free space, and alignment. Then check the layout across breakpoints, since wrap and alignment behavior changes with width.",
      },
    ],
    related: [
      "debug-css-grid",
      "debug-css-layout-issues",
      "fix-horizontal-scroll",
    ],
  },
  {
    slug: "debug-css-grid",
    title: "Debugging CSS Grid Layouts",
    description:
      "How to debug CSS Grid using the DevTools grid inspector, fix implicit-track surprises, and build grids that reflow cleanly on mobile.",
    eyebrow: "CSS debugging",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Implicit tracks cause silent surprises",
        body: "When grid items exceed your explicitly defined tracks, the grid creates implicit tracks sized by grid-auto-rows or grid-auto-columns - often not what you intended. Items can land in unexpected places, especially with auto-placement. Making the track definitions and placement explicit removes most grid mystery.",
        items: [
          "Extra items create implicit tracks you didn't define",
          "grid-auto-rows/columns control implicit track size",
          "Auto-placement can move items unexpectedly",
          "Explicit grid-template plus placement removes surprises",
        ],
      },
      {
        heading: "Master the responsive grid patterns",
        body: "Two patterns cover most responsive grids. repeat(auto-fit, minmax(min, 1fr)) creates a fluid grid that wraps automatically without media queries. minmax() prevents columns from getting too narrow. Learning these means many grids become responsive with a single line instead of a stack of breakpoints.",
        items: [
          "repeat(auto-fit, minmax(220px, 1fr)) for fluid wrapping",
          "auto-fill vs auto-fit changes empty-track behavior",
          "minmax() sets sensible min and max column sizes",
          "gap replaces margin hacks for spacing",
        ],
      },
      {
        heading: "Use the grid inspector across widths",
        body: "DevTools' grid overlay numbers lines and shows track sizes and gaps - essential for understanding placement. Because grids reflow at breakpoints, check the grid on several widths together to confirm columns collapse cleanly. Sizzy shows the grid on phone, tablet, and desktop simultaneously so you can verify auto-fit wrapping and explicit reflows at a glance.",
        items: [
          "Enable the grid overlay to see lines and track sizes",
          "Confirm gaps and alignment match the design",
          "Verify auto-fit grids wrap correctly as width shrinks",
          "Compare the grid across breakpoints side by side",
        ],
      },
    ],
    checklist: [
      "Track definitions and item placement are explicit.",
      "Implicit-track sizing is intentional, not accidental.",
      "Fluid grids use auto-fit/auto-fill with minmax().",
      "Grid reflow is verified across breakpoints at once.",
    ],
    tags: ["css grid", "css debugging", "responsive grid"],
    faq: [
      {
        question: "Why are my grid items in the wrong place?",
        answer:
          "Items beyond your explicit tracks trigger implicit tracks and auto-placement, which can position them unexpectedly. Define your tracks and item placement explicitly, and control implicit sizing with grid-auto-rows or grid-auto-columns.",
      },
      {
        question: "How do I make a CSS grid responsive without media queries?",
        answer:
          "Use repeat(auto-fit, minmax(min, 1fr)). The grid automatically fits as many columns as will fit and wraps the rest, with minmax keeping columns from getting too narrow - no breakpoints required.",
      },
      {
        question: "What's the difference between auto-fit and auto-fill?",
        answer:
          "auto-fill keeps empty tracks in the row even when there aren't enough items, while auto-fit collapses empty tracks so existing items stretch to fill the space. auto-fit is usually what you want for content grids.",
      },
    ],
    related: [
      "debug-flexbox-layouts",
      "container-queries-vs-media-queries",
      "debug-css-layout-issues",
    ],
  },
  {
    slug: "why-layout-breaks-on-mobile",
    title: "Why Your Layout Breaks on Mobile",
    description:
      "The most common reasons a desktop layout falls apart on phones - and a checklist to catch each one before it ships.",
    eyebrow: "CSS debugging",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The usual culprits",
        body: "Mobile layout breakage almost always comes from a short list: a missing viewport meta tag, fixed widths that don't fit a narrow screen, content overflowing horizontally, images without max-width, and tap targets that are too small. None are exotic - they're just easy to miss when you develop on a wide monitor.",
        items: [
          "Missing or wrong viewport meta tag",
          "Fixed pixel widths wider than the phone",
          "Horizontal overflow from oversized elements",
          "Tap targets smaller than ~44px",
        ],
      },
      {
        heading: "The bugs you only see on real widths",
        body: "Some issues never appear on desktop: 100vh clipping behind the address bar, content hidden under a notch, sticky elements covering controls, and forms that get hidden by the on-screen keyboard. These need real mobile widths - and ideally the browser chrome visible - to reproduce. Testing only at desktop sizes guarantees they reach production.",
        items: [
          "100vh sections clipped by the mobile address bar",
          "Content hidden behind the notch without safe-area insets",
          "Sticky headers/footers covering interactive elements",
          "The keyboard obscuring focused form fields",
        ],
      },
      {
        heading: "Catch it before it ships",
        body: "The reliable defense is to develop with real mobile widths in view, not as an afterthought. Sizzy keeps phone viewports beside your desktop layout with synchronized interaction, so mobile breakage shows up the moment you introduce it - and you can run a full flow on the phone width to catch keyboard and sticky-element issues.",
        items: [
          "Keep a phone viewport visible while you build",
          "Run interactive flows at mobile width, not just static views",
          "Confirm safe-area and dynamic-viewport handling",
          "Sweep all breakpoints before tagging a release",
        ],
      },
    ],
    checklist: [
      "Viewport meta tag is present and correct.",
      "No fixed widths exceed the smallest supported viewport.",
      "Dynamic viewport units handle the mobile address bar.",
      "Interactive flows are tested at real mobile widths.",
    ],
    tags: ["mobile layout", "responsive bugs", "css debugging"],
    faq: [
      {
        question: "Why does my website look broken on mobile but fine on desktop?",
        answer:
          "The most common causes are a missing viewport meta tag, fixed widths wider than the phone, horizontal overflow, and 100vh clipping behind the address bar. These only surface at narrow widths, so test on real mobile viewports.",
      },
      {
        question: "How do I stop content hiding behind the notch?",
        answer:
          "Add viewport-fit=cover to your viewport meta tag and use env(safe-area-inset-*) padding on edge-anchored elements so headers, footers, and navigation clear the notch and home indicator.",
      },
      {
        question: "Why does my form break when the mobile keyboard opens?",
        answer:
          "The on-screen keyboard shrinks the visible viewport and can hide focused fields or fixed footers. Test forms with the keyboard open at mobile width, use dynamic viewport units, and avoid pinning critical UI to the bottom.",
      },
    ],
    related: [
      "fix-horizontal-scroll",
      "viewport-meta-tag",
      "css-viewport-units",
    ],
  },
  {
    slug: "core-web-vitals-guide",
    title: "Core Web Vitals Explained for Developers",
    description:
      "What LCP, INP, and CLS measure, the thresholds Google uses, and a practical workflow for finding and fixing each on real pages.",
    eyebrow: "Performance",
    readTime: "8 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The three metrics and their thresholds",
        body: "Core Web Vitals are Google's user-experience signals. LCP (Largest Contentful Paint) measures loading - how fast the main content appears. INP (Interaction to Next Paint) measures responsiveness - how quickly the page reacts to input. CLS (Cumulative Layout Shift) measures visual stability - how much the layout jumps. Each has a 'good' threshold worth memorizing.",
        items: [
          "LCP good: under 2.5 seconds",
          "INP good: under 200 milliseconds",
          "CLS good: under 0.1",
          "All three are ranking-relevant user-experience signals",
        ],
      },
      {
        heading: "Lab vs field data",
        body: "Lab tools like Lighthouse simulate a single run in a controlled environment - great for debugging. Field data (CrUX, the Web Vitals JS library) reflects what real users experience across devices and networks, which is what Google actually uses for ranking. Optimize against field data and use lab runs to diagnose specific regressions.",
        items: [
          "Lab data: Lighthouse, DevTools - repeatable, for debugging",
          "Field data: CrUX and the web-vitals library - real users",
          "Google ranks on field data, not lab scores",
          "Mobile field data usually matters most",
        ],
      },
      {
        heading: "Fix on the devices users actually have",
        body: "Vitals are usually worse on mobile, where CPU and network are constrained. Test with throttling and at real mobile widths rather than on your fast desktop. Sizzy includes network throttling and accurate mobile viewports so you can reproduce the conditions that produce poor field scores and confirm your fixes under realistic constraints.",
        items: [
          "Throttle CPU and network to mimic mid-range phones",
          "Measure at real mobile widths, not desktop",
          "Re-measure after each fix to confirm improvement",
          "Prioritize the metric failing in field data",
        ],
      },
    ],
    checklist: [
      "You know the good thresholds for LCP, INP, and CLS.",
      "Optimization decisions are driven by field data.",
      "Testing uses throttling and real mobile widths.",
      "Each fix is re-measured to confirm it helped.",
    ],
    tags: ["core web vitals", "performance", "lcp inp cls"],
    faq: [
      {
        question: "What are good Core Web Vitals scores?",
        answer:
          "Good thresholds are LCP under 2.5 seconds, INP under 200 milliseconds, and CLS under 0.1. Meeting these for most real users (the 75th percentile of field data) is the goal Google measures.",
      },
      {
        question: "What replaced First Input Delay?",
        answer:
          "INP (Interaction to Next Paint) replaced FID as a Core Web Vital. INP measures responsiveness across all interactions during a visit, giving a fuller picture than FID, which only measured the first input.",
      },
      {
        question: "Why are my Core Web Vitals worse on mobile?",
        answer:
          "Mobile devices have slower CPUs and networks, so loading, responsiveness, and layout stability all suffer more than on desktop. Test with CPU and network throttling at mobile widths to reproduce and fix the real conditions.",
      },
    ],
    related: [
      "fix-cumulative-layout-shift",
      "improve-largest-contentful-paint",
      "mobile-performance-testing",
    ],
  },
  {
    slug: "fix-cumulative-layout-shift",
    title: "How to Fix Cumulative Layout Shift (CLS)",
    description:
      "The common causes of layout shift - unsized media, injected content, and web fonts - and concrete fixes to get CLS under 0.1.",
    eyebrow: "Performance",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "What causes layout shift",
        body: "CLS happens when visible content moves after it first renders. The big causes are images and videos without dimensions, content injected above existing content (ads, banners, embeds), web fonts that swap and reflow text, and animations that change layout properties. Each one shoves content the user was about to interact with - the classic mis-tap frustration.",
        items: [
          "Images and iframes without width/height or aspect-ratio",
          "Banners or ads injected above existing content",
          "Web font swap reflowing text (FOUT)",
          "Animating layout properties instead of transform/opacity",
        ],
      },
      {
        heading: "Reserve space for everything",
        body: "The core fix is to reserve space before content arrives. Always set width and height (or aspect-ratio) on media so the browser allocates the box upfront. Reserve space for dynamic content like ads with a min-height placeholder. Preload fonts and use size-adjust or font-display: optional to limit reflow.",
        items: [
          "Set width/height or aspect-ratio on all media",
          "Reserve min-height for ads and dynamic embeds",
          "Preload key fonts and tune font-display",
          "Animate transform and opacity, not top/left/height",
        ],
      },
      {
        heading: "Measure shifts at real widths",
        body: "CLS is often worse on mobile, where narrow widths and slower loads exaggerate reflow. Reproduce it at real mobile widths with throttling, watch where content jumps as the page loads, and confirm your fix holds. Sizzy's accurate mobile viewports and throttling let you replay the load and verify the layout stays put.",
        items: [
          "Reproduce shifts at mobile widths with throttling",
          "Watch the load sequence for jumps above the fold",
          "Confirm reserved space eliminates the shift",
          "Re-check CLS after font and image changes",
        ],
      },
    ],
    checklist: [
      "All media has explicit dimensions or aspect-ratio.",
      "Dynamic content slots reserve space in advance.",
      "Fonts are preloaded and font-display is tuned.",
      "CLS is verified at mobile widths with throttling.",
    ],
    tags: ["cumulative layout shift", "cls", "core web vitals"],
    faq: [
      {
        question: "What is a good CLS score?",
        answer:
          "A good Cumulative Layout Shift score is under 0.1 for most real users. Between 0.1 and 0.25 needs improvement, and above 0.25 is poor. CLS measures how much visible content unexpectedly moves during loading.",
      },
      {
        question: "How do I stop images from causing layout shift?",
        answer:
          "Always set width and height attributes or a CSS aspect-ratio so the browser reserves the correct box before the image loads. This prevents surrounding content from jumping when the image arrives.",
      },
      {
        question: "Do web fonts cause layout shift?",
        answer:
          "They can. When a fallback font swaps to the web font, differing metrics reflow text. Preload key fonts, use font-display thoughtfully, and consider size-adjust or fallback metric overrides to minimize the shift.",
      },
    ],
    related: [
      "core-web-vitals-guide",
      "improve-largest-contentful-paint",
      "responsive-images-srcset",
    ],
  },
  {
    slug: "improve-largest-contentful-paint",
    title: "How to Improve Largest Contentful Paint (LCP)",
    description:
      "What drives LCP, how to find your LCP element, and the highest-impact fixes for getting it under 2.5 seconds on mobile.",
    eyebrow: "Performance",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Find your LCP element first",
        body: "You can't optimize what you haven't identified. LCP is usually a hero image, a heading, or a large block of text above the fold. Use Lighthouse or the DevTools performance panel to see exactly which element is the LCP candidate on mobile, since it can differ from desktop. Optimizing the wrong element wastes effort.",
        items: [
          "LCP is often a hero image or large heading",
          "Use DevTools/Lighthouse to identify the exact element",
          "The mobile LCP element may differ from desktop",
          "Confirm before optimizing anything",
        ],
      },
      {
        heading: "Attack the four LCP phases",
        body: "LCP breaks into TTFB, resource load delay, resource load time, and render delay. Improve server response and caching for TTFB, preload the LCP image and avoid lazy-loading it, serve it in a modern format at the right size, and remove render-blocking CSS/JS that delays paint. Most wins come from the LCP resource itself.",
        items: [
          "Reduce TTFB with caching and a CDN",
          "Preload the LCP image; never lazy-load it",
          "Serve modern formats (WebP/AVIF) at the right size",
          "Eliminate render-blocking CSS and JS",
        ],
      },
      {
        heading: "Validate under mobile conditions",
        body: "LCP targets are hardest to hit on mobile networks, so test there. Throttle the network, load at a real mobile width, and confirm the LCP element paints quickly. Sizzy's throttling and mobile viewports reproduce the constrained conditions where LCP actually fails, so your fixes reflect real-user performance.",
        items: [
          "Throttle to a mid-range mobile network profile",
          "Measure at real mobile widths",
          "Confirm the LCP element loads in the critical path",
          "Re-measure after each change to verify the gain",
        ],
      },
    ],
    checklist: [
      "The LCP element is identified on mobile, not assumed.",
      "The LCP image is preloaded and not lazy-loaded.",
      "Render-blocking resources are minimized.",
      "LCP is validated under throttled mobile conditions.",
    ],
    tags: ["largest contentful paint", "lcp", "web performance"],
    faq: [
      {
        question: "What is a good LCP time?",
        answer:
          "A good Largest Contentful Paint is under 2.5 seconds for most real users. Between 2.5 and 4 seconds needs improvement, and over 4 seconds is poor. LCP marks when the largest above-the-fold element finishes rendering.",
      },
      {
        question: "Why is my LCP slow even though my site feels fast?",
        answer:
          "Your fast device and connection mask the problem. LCP is measured on real users' devices, which are often slower phones on mobile networks. Test with throttling at mobile widths to see the LCP your users actually experience.",
      },
      {
        question: "Should I lazy-load my hero image?",
        answer:
          "No. The LCP element should never be lazy-loaded, since that delays the very paint LCP measures. Eagerly load and ideally preload the hero image, and lazy-load only below-the-fold media.",
      },
    ],
    related: [
      "core-web-vitals-guide",
      "fix-cumulative-layout-shift",
      "responsive-images-srcset",
    ],
  },
  {
    slug: "mobile-performance-testing",
    title: "Mobile Performance Testing Workflow",
    description:
      "A repeatable workflow for testing mobile web performance with throttling, real device checks, and a focus on the metrics that matter.",
    eyebrow: "Performance",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Develop on a fast machine, test like a phone",
        body: "The core problem in mobile performance is that developers work on fast hardware and fast networks, so the site feels instant to them and sluggish to users. The fix is to deliberately simulate constrained conditions during development - CPU throttling and a mid-tier mobile network profile - so you experience what your users do.",
        items: [
          "Your dev machine hides real mobile slowness",
          "Apply CPU throttling to mimic mid-range phones",
          "Apply a network profile like Slow 4G",
          "Test at a real mobile viewport width",
        ],
      },
      {
        heading: "Measure the right things",
        body: "Don't drown in metrics. Track the Core Web Vitals (LCP, INP, CLS), total JavaScript shipped, and time to interactive. Large JS bundles are the most common cause of poor mobile responsiveness, so watch bundle size and main-thread work closely. Set a budget and treat regressions as bugs.",
        items: [
          "Track LCP, INP, and CLS as the headline metrics",
          "Watch JavaScript bundle size and main-thread time",
          "Set a performance budget and enforce it",
          "Treat budget regressions as build failures",
        ],
      },
      {
        heading: "Combine emulated and real-device passes",
        body: "Do the iterative work under emulated throttling, then validate on a real phone, where touch latency and GPU performance show their true colors. Sizzy provides throttling and accurate mobile viewports for the fast loop, plus a QR-to-phone shortcut to jump to real hardware for the final performance pass.",
        items: [
          "Iterate under emulated CPU and network throttling",
          "Validate on a real device before release",
          "Use QR-to-phone to reach hardware instantly",
          "Compare emulated and real numbers for sanity",
        ],
      },
    ],
    checklist: [
      "CPU and network throttling are applied during development.",
      "Core Web Vitals and JS size are tracked against a budget.",
      "Regressions against the budget block the release.",
      "A real-device pass validates performance before shipping.",
    ],
    tags: ["mobile performance", "throttling", "web vitals"],
    faq: [
      {
        question: "How do I test mobile performance on my computer?",
        answer:
          "Apply CPU throttling and a mobile network profile (like Slow 4G) in your browser, and test at a real mobile viewport width. This reproduces the constrained conditions real phones face without needing the device for every iteration.",
      },
      {
        question: "What's the biggest cause of slow mobile sites?",
        answer:
          "Excessive JavaScript is usually the top culprit. Large bundles block the main thread on slower phone CPUs, hurting responsiveness (INP) and interactivity. Track and budget your JS size, and defer or split non-critical code.",
      },
      {
        question: "Do I need a real device for performance testing?",
        answer:
          "For final validation, yes - real hardware reveals true touch latency and GPU performance that emulation can't. But the iterative work is faster under emulated throttling, with a real-device pass reserved for the end.",
      },
    ],
    related: [
      "core-web-vitals-guide",
      "network-throttling-testing",
      "real-devices-vs-emulators",
    ],
  },
  {
    slug: "chrome-devtools-tips",
    title: "Chrome DevTools Tips for Frontend Developers",
    description:
      "Lesser-known Chrome DevTools features that speed up frontend debugging - from the command menu to local overrides and CSS overlays.",
    eyebrow: "DevTools deep dive",
    readTime: "8 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The command menu changes everything",
        body: "Press Cmd/Ctrl+Shift+P to open the command menu - the single most useful DevTools shortcut. From it you can run almost any action by name: capture a full-page screenshot, toggle dark mode, show rendering options, or open any panel. Learning this one shortcut replaces a dozen menu hunts.",
        items: [
          "Cmd/Ctrl+Shift+P opens the command menu",
          "Type 'screenshot' for full-page or node captures",
          "Toggle rendering and emulation options instantly",
          "Jump to any panel without clicking through menus",
        ],
      },
      {
        heading: "Inspect, edit, and persist",
        body: "Beyond inspecting, DevTools lets you edit live and keep changes. Local Overrides save your CSS/JS edits to disk so they survive reloads - great for prototyping a fix against production. The Changes tab shows a diff of everything you edited in the Styles panel, so you can copy real CSS back into your codebase.",
        items: [
          "Local Overrides persist edits across reloads",
          "The Changes tab diffs your live Style edits",
          "Use :hov to force :hover, :focus, and :active states",
          "Color-pick and convert formats directly in Styles",
        ],
      },
      {
        heading: "Use the rendering and layout overlays",
        body: "The Rendering tab exposes powerful diagnostics: highlight layout shifts, paint flashing, and core-vitals overlays. The grid and flex overlays visualize structure. For responsive work, pair these overlays with a multi-device view - Sizzy gives you each device its own DevTools, so you debug the same overlay on phone and desktop without losing your place.",
        items: [
          "Rendering tab: layout-shift regions and paint flashing",
          "Grid and flex overlays reveal layout structure",
          "Per-device DevTools in Sizzy for multi-viewport debugging",
          "Core Web Vitals overlay for live metric feedback",
        ],
      },
    ],
    checklist: [
      "The command menu is your default entry point.",
      "Local Overrides are used for persistent prototyping.",
      "Forced states and the Changes tab speed CSS work.",
      "Rendering and layout overlays guide responsive debugging.",
    ],
    tags: ["chrome devtools", "frontend debugging", "devtools tips"],
    faq: [
      {
        question: "What is the most useful Chrome DevTools shortcut?",
        answer:
          "Cmd/Ctrl+Shift+P opens the command menu, which lets you run almost any DevTools action by name - capturing screenshots, toggling rendering options, or opening panels. It's the fastest way to access deep features.",
      },
      {
        question: "How do I keep my DevTools CSS edits after reload?",
        answer:
          "Enable Local Overrides in the Sources panel and pick a folder. DevTools then saves your CSS and JS edits to disk and reapplies them on reload, so you can prototype fixes against a live site persistently.",
      },
      {
        question: "How do I force a hover state in DevTools?",
        answer:
          "In the Styles panel, click :hov and check :hover, :focus, or :active for the selected element. This forces the state so you can inspect and edit styles that only appear on interaction.",
      },
    ],
    related: [
      "firefox-responsive-design-mode",
      "network-throttling-testing",
      "chrome-devtools-device-mode-limitations",
    ],
  },
  {
    slug: "firefox-responsive-design-mode",
    title: "Firefox Responsive Design Mode Guide",
    description:
      "How to use Firefox's Responsive Design Mode for viewport testing, touch simulation, and throttling - and where it differs from Chrome.",
    eyebrow: "DevTools deep dive",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Open and configure RDM",
        body: "Firefox's Responsive Design Mode (Cmd/Ctrl+Shift+M) gives you a resizable viewport with presets, DPR control, and orientation switching. You can add custom devices, set a specific pixel ratio, and toggle touch-event simulation. It's a capable single-viewport emulator built right into Firefox's developer tools.",
        items: [
          "Cmd/Ctrl+Shift+M toggles Responsive Design Mode",
          "Pick presets or drag to a custom size",
          "Set DPR and orientation manually",
          "Enable touch-event simulation",
        ],
      },
      {
        heading: "Throttling and screenshots",
        body: "RDM includes network throttling profiles to simulate slower connections and a screenshot button that captures the current viewport. Combined with Firefox's excellent grid and flexbox inspectors, it's a strong free option for testing one viewport at a time and for catching Gecko-specific rendering differences.",
        items: [
          "Apply network throttling profiles in RDM",
          "Capture viewport screenshots from the toolbar",
          "Use Firefox's class-leading grid inspector",
          "Catch Gecko-specific rendering quirks",
        ],
      },
      {
        heading: "Where it stops and what fills the gap",
        body: "Like Chrome's device mode, RDM shows one viewport at a time, so cross-breakpoint bugs and synchronized multi-device flows are out of reach. For those, a dedicated multi-device browser is the complement: Sizzy shows many viewports at once with synced interaction, while you keep Firefox RDM for Gecko-specific checks.",
        items: [
          "RDM is single-viewport, like Chrome device mode",
          "Cross-breakpoint relationships stay hidden",
          "No synchronized multi-device interaction",
          "Pair RDM with a multi-device browser for the full picture",
        ],
      },
    ],
    checklist: [
      "RDM is configured with the right DPR and touch simulation.",
      "Throttling is used to test slower connections.",
      "Firefox is used for Gecko-specific rendering checks.",
      "Multi-device flows are handled by a dedicated browser.",
    ],
    tags: ["firefox", "responsive design mode", "devtools"],
    faq: [
      {
        question: "How do I open Responsive Design Mode in Firefox?",
        answer:
          "Press Cmd/Ctrl+Shift+M, or open it from the Tools > Browser Tools menu. It gives you a resizable viewport with device presets, DPR control, orientation switching, touch simulation, and network throttling.",
      },
      {
        question: "Is Firefox Responsive Design Mode better than Chrome's?",
        answer:
          "They're comparable single-viewport emulators. Firefox has an outstanding grid inspector and is essential for catching Gecko-specific bugs, while Chrome's device mode integrates tightly with its broader tooling. Use both for cross-engine coverage.",
      },
      {
        question: "Can Firefox test multiple devices at once?",
        answer:
          "No. Responsive Design Mode shows one viewport at a time. For viewing multiple devices simultaneously with synchronized interaction, use a dedicated multi-device browser alongside Firefox.",
      },
    ],
    related: [
      "chrome-devtools-tips",
      "chrome-devtools-device-mode-limitations",
      "cross-browser-testing-guide",
    ],
  },
  {
    slug: "network-throttling-testing",
    title: "Testing With Network Throttling",
    description:
      "Why network throttling matters, which profiles to use, and how to test loading states, spinners, and slow-network UX realistically.",
    eyebrow: "DevTools deep dive",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Fast connections hide real UX",
        body: "On a fast office connection, loading states flash by and you never see the experience real users have on patchy mobile data. Network throttling deliberately slows requests so you can observe spinners, skeleton screens, progressive rendering, and timeout handling the way users actually encounter them.",
        items: [
          "Office Wi-Fi hides slow-network behavior",
          "Throttling reveals loading and skeleton states",
          "You can see progressive rendering in action",
          "Timeout and error handling become testable",
        ],
      },
      {
        heading: "Pick representative profiles",
        body: "Test a few realistic profiles rather than just 'fast' and 'offline'. A mid-tier mobile profile (around Slow 4G) reflects a large share of real users. Offline mode validates service-worker fallbacks. Custom profiles let you reproduce a specific bug report. The point is to test the range your users actually live in.",
        items: [
          "Slow/Fast 4G for typical mobile users",
          "Offline to validate service-worker fallbacks",
          "Custom profiles to reproduce reported conditions",
          "Combine with CPU throttling for full realism",
        ],
      },
      {
        heading: "Throttle across devices at once",
        body: "Loading behavior can differ per layout - a skeleton that works on desktop may overflow on mobile. Testing throttled loads across viewports together surfaces these differences. Sizzy provides throttling alongside multiple synced devices, so you watch the slow-network experience render on phone and desktop simultaneously.",
        items: [
          "Apply throttling while viewing multiple devices",
          "Confirm skeletons and spinners fit every width",
          "Check that slow images don't cause layout shift",
          "Verify error and retry states across breakpoints",
        ],
      },
    ],
    checklist: [
      "Loading states are tested under a mid-tier mobile profile.",
      "Offline behavior and fallbacks are validated.",
      "Slow-loading media doesn't cause layout shift.",
      "Throttled behavior is checked across breakpoints.",
    ],
    tags: ["network throttling", "loading states", "performance testing"],
    faq: [
      {
        question: "Why should I test with network throttling?",
        answer:
          "Fast developer connections hide the loading experience real users have on mobile data. Throttling lets you see spinners, skeleton screens, progressive rendering, and timeout handling as users actually encounter them, so you can polish those states.",
      },
      {
        question: "What network profile should I test with?",
        answer:
          "A mid-tier mobile profile around Slow 4G reflects a large share of real users. Also test offline to validate service-worker fallbacks, and use custom profiles to reproduce specific reported conditions.",
      },
      {
        question: "Does throttling affect layout?",
        answer:
          "Indirectly - slow-loading images and late-arriving content can cause layout shift, and loading-state UI like skeletons must fit every breakpoint. Testing throttled loads across devices reveals these layout issues.",
      },
    ],
    related: [
      "mobile-performance-testing",
      "core-web-vitals-guide",
      "chrome-devtools-tips",
    ],
  },
  {
    slug: "inspect-element-on-mobile",
    title: "How to Inspect Element on Mobile",
    description:
      "How to open real DevTools for a page running on a phone using remote debugging on Android and iOS, plus faster local alternatives.",
    eyebrow: "DevTools deep dive",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Remote debugging on Android",
        body: "To inspect a real page on an Android phone, enable USB debugging, connect the phone, and open chrome://inspect in desktop Chrome. You'll get the full DevTools experience - elements, console, network, and performance - for the page running on the actual device. This is the definitive way to debug Android-only issues.",
        items: [
          "Enable Developer Options and USB debugging",
          "Open chrome://inspect on desktop Chrome",
          "Select the device's tab to launch DevTools",
          "Inspect elements and read the real device console",
        ],
      },
      {
        heading: "Remote debugging on iOS",
        body: "For iPhone and iPad, enable Web Inspector in Safari's settings on the device, connect it to a Mac, and open Safari's Develop menu to inspect the page. This requires macOS - there's no Windows path to native iOS Web Inspector - so plan for a Mac when you need real mobile-Safari debugging.",
        items: [
          "Enable Web Inspector in iOS Safari settings",
          "Connect the device to a Mac",
          "Use Safari's Develop menu to inspect",
          "Requires macOS - no native Windows path",
        ],
      },
      {
        heading: "A faster local alternative for layout",
        body: "Remote debugging is the right tool for device-specific bugs, but it's heavyweight for everyday layout inspection. For that, a development browser with per-device DevTools is faster: Sizzy gives every emulated device its own inspector, so you inspect the mobile layout without cables - then escalate to remote debugging only for true device-specific issues.",
        items: [
          "Use per-device DevTools for everyday layout inspection",
          "No cables or device pairing for the common case",
          "Escalate to remote debugging for device-specific bugs",
          "Keep the inspect loop fast during development",
        ],
      },
    ],
    checklist: [
      "chrome://inspect is set up for Android debugging.",
      "Safari Web Inspector is enabled for iOS (on a Mac).",
      "Everyday layout inspection uses per-device DevTools.",
      "Remote debugging is reserved for device-specific bugs.",
    ],
    tags: ["inspect element mobile", "remote debugging", "mobile devtools"],
    faq: [
      {
        question: "How do I inspect element on an Android phone?",
        answer:
          "Enable USB debugging on the phone, connect it, and open chrome://inspect in desktop Chrome. Select the device's tab to open full DevTools for the live page, including elements, console, and network panels.",
      },
      {
        question: "How do I inspect element on an iPhone?",
        answer:
          "Enable Web Inspector in iOS Safari settings, connect the device to a Mac, and use Safari's Develop menu to inspect the page. This requires macOS - there is no native Windows path to iOS Web Inspector.",
      },
      {
        question: "Is there a faster way to inspect mobile layouts?",
        answer:
          "For layout work, a development browser with per-device DevTools, like Sizzy, lets you inspect emulated mobile viewports without cables. Reserve remote debugging for genuinely device-specific bugs.",
      },
    ],
    related: [
      "test-website-on-android",
      "chrome-devtools-tips",
      "test-on-iphone-without-iphone",
    ],
  },
  {
    slug: "accessibility-testing-guide",
    title: "Web Accessibility Testing: A Developer's Guide",
    description:
      "A practical accessibility testing workflow combining automated checks, keyboard testing, and screen readers to catch real WCAG issues.",
    eyebrow: "Accessibility",
    readTime: "8 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Automated tools catch the obvious",
        body: "Start with automated scanners like axe, Lighthouse, or WAVE. They quickly flag missing alt text, low contrast, missing form labels, and invalid ARIA. But automation only catches around a third of WCAG issues - it can't judge whether alt text is meaningful or whether the tab order makes sense. Treat automated passing as the floor, not the finish line.",
        items: [
          "Run axe, Lighthouse, or WAVE for a fast baseline",
          "They catch contrast, labels, alt text, and ARIA errors",
          "Automation finds only ~30-40% of real issues",
          "Passing automated checks is necessary, not sufficient",
        ],
      },
      {
        heading: "Test with a keyboard and a screen reader",
        body: "The issues that matter most need a human. Unplug the mouse and navigate the whole flow with Tab, Enter, Escape, and arrow keys - if you can't complete a task, neither can keyboard users. Then run a screen reader to hear how the page is announced. These two passes catch the high-impact problems automation misses.",
        items: [
          "Keyboard-only pass through every interactive flow",
          "Confirm visible focus indicators throughout",
          "Screen-reader pass to check announcements and order",
          "Verify focus management in modals and menus",
        ],
      },
      {
        heading: "Don't forget responsive accessibility",
        body: "Accessibility and responsiveness intersect: text must remain readable when zoomed to 200%, tap targets need ~44px on touch screens, and reflow must not require horizontal scrolling at narrow widths. Testing these across viewports is part of WCAG. Sizzy lets you check zoomed and mobile widths alongside desktop so reflow and tap-target rules hold everywhere.",
        items: [
          "Text stays readable at 200% zoom (WCAG reflow)",
          "Touch targets meet the ~44px minimum",
          "No horizontal scroll at 320px width",
          "Content order remains logical across breakpoints",
        ],
      },
    ],
    checklist: [
      "An automated scan passes as the baseline.",
      "Every flow is completable with the keyboard alone.",
      "A screen-reader pass confirms sensible announcements.",
      "Zoom, reflow, and tap-target rules hold across widths.",
    ],
    tags: ["accessibility testing", "wcag", "a11y"],
    faq: [
      {
        question: "What's the best way to test accessibility?",
        answer:
          "Combine three passes: an automated scanner (axe, Lighthouse, or WAVE) for a baseline, a keyboard-only pass through every flow, and a screen-reader pass. Automation alone catches only about a third of WCAG issues.",
      },
      {
        question: "Do automated accessibility tools catch everything?",
        answer:
          "No. Automated tools reliably catch contrast, missing labels, alt text, and invalid ARIA, but they can't judge meaningful alt text, logical tab order, or whether a flow is usable. Manual keyboard and screen-reader testing is essential.",
      },
      {
        question: "Is responsive design part of accessibility?",
        answer:
          "Yes. WCAG requires content to reflow without horizontal scrolling at narrow widths, remain readable at 200% zoom, and provide adequate tap-target sizes - all of which depend on responsive testing across viewports.",
      },
    ],
    related: [
      "test-color-contrast",
      "keyboard-navigation-testing",
      "screen-reader-testing",
    ],
  },
  {
    slug: "test-color-contrast",
    title: "How to Test Color Contrast (WCAG)",
    description:
      "WCAG contrast ratios explained, the common failures designers miss, and how to test contrast across real UI states and backgrounds.",
    eyebrow: "Accessibility",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Know the ratios",
        body: "WCAG defines minimum contrast ratios between text and its background. For AA, normal text needs 4.5:1 and large text 3:1. AAA raises that to 7:1 and 4.5:1. UI components and meaningful graphics need at least 3:1. Memorizing these four numbers lets you judge most contrast decisions on the spot.",
        items: [
          "AA: 4.5:1 normal text, 3:1 large text",
          "AAA: 7:1 normal text, 4.5:1 large text",
          "UI components and graphics: 3:1 minimum",
          "Large text is ~24px, or ~19px bold",
        ],
      },
      {
        heading: "The failures people miss",
        body: "Contrast bugs hide in states and context: placeholder text, disabled buttons, text over images or gradients, hover and focus states, and light text on light brand colors. A button might pass at rest and fail on hover. Test every state and every background a piece of text can land on, not just the default.",
        items: [
          "Placeholder and helper text often fail",
          "Text over images/gradients varies by pixel",
          "Hover and focus states can drop below the threshold",
          "Brand colors frequently fail on white or light backgrounds",
        ],
      },
      {
        heading: "Test contrast in context",
        body: "Color pickers give you a number, but real UI is dynamic. Check contrast in the actual rendered page across themes and states. Sizzy lets you view light and dark variants and different states side by side, so you can spot low-contrast text in context rather than trusting a swatch in a design tool.",
        items: [
          "Verify contrast in the rendered page, not just the palette",
          "Check both light and dark themes",
          "Confirm interactive states stay above threshold",
          "Re-check text over photographic backgrounds",
        ],
      },
    ],
    checklist: [
      "Normal text meets at least 4.5:1 (AA).",
      "UI components and icons meet at least 3:1.",
      "All interactive states pass, not just the default.",
      "Text over images and gradients is verified in context.",
    ],
    tags: ["color contrast", "wcag", "accessibility"],
    faq: [
      {
        question: "What is the minimum color contrast for WCAG AA?",
        answer:
          "WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (about 24px, or 19px bold). User interface components and meaningful graphics need at least 3:1.",
      },
      {
        question: "Why does my text pass contrast but still look hard to read?",
        answer:
          "Contrast ratios don't account for everything - thin font weights, small sizes, text over busy images, and certain color combinations can be technically passing yet still hard to read. Test in context and consider readability beyond the minimum ratio.",
      },
      {
        question: "Do disabled and placeholder elements need to pass contrast?",
        answer:
          "Disabled elements are exempt from contrast minimums, but placeholder text is not exempt when it conveys information, and relying on low-contrast placeholders as labels is an accessibility problem. Provide proper labels and adequate contrast.",
      },
    ],
    related: [
      "accessibility-testing-guide",
      "keyboard-navigation-testing",
      "design-to-dev-handoff",
    ],
  },
  {
    slug: "keyboard-navigation-testing",
    title: "Testing Keyboard Navigation",
    description:
      "How to test keyboard accessibility - focus order, visible focus, focus traps, and skip links - so every user can operate your site.",
    eyebrow: "Accessibility",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Tab through everything",
        body: "The fastest accessibility test is to put the mouse away and Tab through the page. Every interactive element should be reachable, the focus order should follow the visual order, and you should be able to complete every task. If focus skips an element or jumps around unpredictably, keyboard and screen-reader users are blocked.",
        items: [
          "Every interactive element is reachable by Tab",
          "Focus order matches the visual reading order",
          "Enter/Space activate buttons and links",
          "Escape closes menus and dialogs",
        ],
      },
      {
        heading: "Make focus visible and contained",
        body: "Two frequent failures: removing focus outlines for aesthetics, and failing to trap focus inside modals. Never set outline: none without a clear replacement - users must see where they are. Inside a dialog, focus should stay within it and return to the trigger on close. Skip links let keyboard users bypass repetitive navigation.",
        items: [
          "Always show a clear, visible focus indicator",
          "Trap focus inside open modals and drawers",
          "Return focus to the trigger when closing",
          "Provide a skip-to-content link",
        ],
      },
      {
        heading: "Test across viewports",
        body: "Keyboard behavior can change responsively - a mobile menu may have different focus handling than the desktop nav. Test keyboard flows at both mobile and desktop widths. Sizzy lets you exercise the same keyboard flow across viewports, so you confirm focus management works whether the navigation is collapsed or expanded.",
        items: [
          "Test keyboard flow in collapsed mobile navigation",
          "Confirm focus management in the desktop layout too",
          "Check off-canvas menus trap and restore focus",
          "Verify skip links work at every width",
        ],
      },
    ],
    checklist: [
      "All interactive elements are keyboard reachable.",
      "Focus order matches the visual order.",
      "A visible focus indicator is always present.",
      "Modals trap focus and restore it on close.",
    ],
    tags: ["keyboard navigation", "focus management", "accessibility"],
    faq: [
      {
        question: "How do I test keyboard accessibility?",
        answer:
          "Put the mouse aside and navigate with Tab, Shift+Tab, Enter, Space, Escape, and arrow keys. Confirm every interactive element is reachable, focus is visible, the order is logical, and you can complete every task.",
      },
      {
        question: "Is it okay to remove the focus outline?",
        answer:
          "Only if you replace it with an equally clear, visible focus style. Removing focus indicators with outline: none and nothing in their place leaves keyboard users unable to see where they are, which fails WCAG.",
      },
      {
        question: "What is a focus trap and when do I need one?",
        answer:
          "A focus trap keeps keyboard focus within an open modal or dialog so users can't tab to the obscured page behind it. When the dialog closes, focus should return to the element that opened it.",
      },
    ],
    related: [
      "accessibility-testing-guide",
      "screen-reader-testing",
      "test-color-contrast",
    ],
  },
  {
    slug: "screen-reader-testing",
    title: "Testing With a Screen Reader",
    description:
      "A beginner-friendly guide to testing your site with VoiceOver and NVDA - what to listen for and the markup that makes pages announce well.",
    eyebrow: "Accessibility",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Pick a screen reader and learn three keys",
        body: "You don't need expertise to start. On macOS, VoiceOver is built in (Cmd+F5). On Windows, NVDA is free. Learn just enough to navigate: move by element, jump by headings, and list links or form fields. Even a basic pass reveals whether your page tells a coherent story when you can't see it.",
        items: [
          "macOS: VoiceOver (Cmd+F5)",
          "Windows: NVDA (free) or JAWS",
          "Learn to navigate by element and by heading",
          "List links and form fields to audit structure",
        ],
      },
      {
        heading: "What to listen for",
        body: "Close your eyes and listen. Headings should outline the page logically. Images should have meaningful alt text (or be marked decorative). Buttons and links should announce their purpose, not 'button button'. Form fields need associated labels. Dynamic updates should be announced via live regions. If anything is silent or confusing, fix the markup.",
        items: [
          "Headings form a logical, nested outline",
          "Images have meaningful or explicitly empty alt",
          "Controls announce a clear purpose",
          "Form fields have associated labels",
        ],
      },
      {
        heading: "Semantic HTML does most of the work",
        body: "Most screen-reader problems come from div-soup that throws away built-in semantics. Use real buttons, links, headings, lists, and landmarks, and reach for ARIA only to fill genuine gaps. Then verify the page still announces correctly across responsive states - a mobile menu built from divs often loses the semantics the desktop nav had.",
        items: [
          "Prefer native elements over ARIA-on-divs",
          "Use landmarks (nav, main, header, footer)",
          "Add ARIA only where semantics are missing",
          "Re-check announcements in responsive/mobile layouts",
        ],
      },
    ],
    checklist: [
      "A basic screen-reader pass is part of QA.",
      "Headings, alt text, and labels announce correctly.",
      "Native semantic elements are used over div-soup.",
      "Mobile layouts retain their semantics and announcements.",
    ],
    tags: ["screen reader", "voiceover", "accessibility"],
    faq: [
      {
        question: "Which screen reader should I test with?",
        answer:
          "Use VoiceOver on macOS (built in, Cmd+F5) or the free NVDA on Windows. Testing with at least one screen reader, even at a basic level, reveals far more than automated tools about how your page is actually experienced.",
      },
      {
        question: "What makes a page work well with a screen reader?",
        answer:
          "Semantic HTML does most of the work: real buttons, links, headings, lists, and landmarks, with meaningful alt text and labeled form fields. Use ARIA only to fill genuine gaps, not to recreate semantics you discarded.",
      },
      {
        question: "How is alt text supposed to be written?",
        answer:
          "Describe the image's purpose in context concisely. If an image is purely decorative, give it an empty alt attribute (alt=\"\") so screen readers skip it rather than announcing a filename or redundant description.",
      },
    ],
    related: [
      "accessibility-testing-guide",
      "keyboard-navigation-testing",
      "test-color-contrast",
    ],
  },
  {
    slug: "responsive-screenshot-workflow",
    title: "A Responsive Screenshot Workflow",
    description:
      "How to capture consistent screenshots across every breakpoint for reviews, QA evidence, and bug reports - without resizing windows by hand.",
    eyebrow: "Screenshots",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Why screenshots need a system",
        body: "Ad-hoc screenshots are inconsistent: different widths, different scroll positions, different states. That makes reviews and visual comparisons unreliable. A repeatable screenshot workflow - same device matrix, same states, same naming - turns screenshots into trustworthy evidence for PR reviews, client sign-off, and bug reports.",
        items: [
          "Inconsistent captures make comparisons meaningless",
          "Define a fixed device matrix for every capture",
          "Standardize state: logged in/out, data, theme",
          "Name files predictably for easy diffing",
        ],
      },
      {
        heading: "Capture every breakpoint at once",
        body: "The slow way is to resize a window, screenshot, repeat. The fast way is to capture all your devices in one action. Sizzy can screenshot every device in your matrix together, so a single command produces phone, tablet, and desktop captures in matching states - ideal for attaching to a release or a review.",
        items: [
          "Screenshot the whole device matrix in one action",
          "Keep states identical across all captures",
          "Capture above-the-fold and full-page variants",
          "Produce a consistent set for every release",
        ],
      },
      {
        heading: "Use screenshots as living evidence",
        body: "Attach the matrix to pull requests so reviewers see the responsive result without checking out the branch. Keep a baseline set to compare against for visual regression. Include framed screenshots in client updates. The screenshots become a shared source of truth that catches breakpoint regressions before users do.",
        items: [
          "Attach the breakpoint set to PRs for context",
          "Keep a baseline for visual regression comparison",
          "Include captures in client and stakeholder updates",
          "Re-capture after risky CSS changes",
        ],
      },
    ],
    checklist: [
      "A fixed device matrix is used for every capture.",
      "Capture state (auth, data, theme) is standardized.",
      "The full breakpoint set is produced in one action.",
      "Screenshots are attached to PRs and release records.",
    ],
    tags: ["responsive screenshots", "qa evidence", "visual regression"],
    faq: [
      {
        question: "How do I screenshot a site at multiple breakpoints?",
        answer:
          "Define a fixed device matrix and capture all of them in one action rather than resizing a window repeatedly. A multi-device browser like Sizzy can screenshot phone, tablet, and desktop together in matching states.",
      },
      {
        question: "How do I keep responsive screenshots consistent?",
        answer:
          "Standardize the variables: same device widths, same scroll position, same authentication and data state, and the same theme. Consistent inputs make screenshots reliable for reviews and visual regression comparison.",
      },
      {
        question: "Should I attach screenshots to pull requests?",
        answer:
          "Yes. Attaching a breakpoint screenshot set lets reviewers verify the responsive result without checking out the branch, and gives you a baseline to compare future changes against for catching regressions.",
      },
    ],
    related: [
      "device-framed-screenshots",
      "full-page-screenshot",
      "responsive-visual-regression-checklist",
    ],
  },
  {
    slug: "design-to-dev-handoff",
    title: "Design-to-Dev Handoff Best Practices",
    description:
      "How to make design-to-development handoff smooth - shared breakpoints, documented states, and a fast way to verify the build matches the design.",
    eyebrow: "Workflow",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Agree on breakpoints and tokens up front",
        body: "Most handoff friction comes from designers and developers using different breakpoints and spacing values. Agree on a shared breakpoint scale and design tokens (colors, spacing, type) before the build starts, ideally encoded in both the design tool and the codebase. When both sides reference the same numbers, the build matches the design by default.",
        items: [
          "Share one breakpoint scale across design and code",
          "Define tokens for color, spacing, and typography",
          "Encode tokens in the codebase, not just the design file",
          "Document the intended behavior at each breakpoint",
        ],
      },
      {
        heading: "Document states, not just screens",
        body: "Designs usually show ideal screens, but developers build states: empty, loading, error, long content, logged-out. Handoff should specify these, or developers will guess and the result will diverge. The most expensive handoff bugs come from undocumented edge cases, not from the happy path everyone reviewed.",
        items: [
          "Specify empty, loading, and error states",
          "Show long-content and overflow behavior",
          "Define responsive behavior between the shown sizes",
          "Clarify interactive states: hover, focus, active, disabled",
        ],
      },
      {
        heading: "Verify the build against the design fast",
        body: "Closing the loop means comparing the built UI to the design across breakpoints. Sizzy lets you view the implementation on every device at once and capture framed screenshots to put beside the mockups, so designers can sign off on the real responsive result rather than a single desktop screenshot.",
        items: [
          "Compare the build to the design at each breakpoint",
          "Capture screenshots for designer sign-off",
          "Confirm token values match the design system",
          "Review the responsive transitions, not just fixed sizes",
        ],
      },
    ],
    checklist: [
      "A shared breakpoint scale and tokens exist before build.",
      "Edge-case states are documented in the handoff.",
      "The build is compared to the design across breakpoints.",
      "Designers sign off on real responsive screenshots.",
    ],
    tags: ["design handoff", "design tokens", "frontend workflow"],
    faq: [
      {
        question: "How do I make design-to-dev handoff smoother?",
        answer:
          "Agree on a shared breakpoint scale and design tokens before building, document edge-case states (empty, loading, error, long content), and verify the built UI against the design across breakpoints so divergence is caught early.",
      },
      {
        question: "What gets lost most often in handoff?",
        answer:
          "Edge-case states and responsive behavior between the shown sizes. Designs usually depict ideal screens, so developers guess at loading, error, empty, and overflow states unless they're explicitly documented.",
      },
      {
        question: "How can designers verify the responsive build?",
        answer:
          "Have developers capture the implementation across the full device matrix - a multi-device browser like Sizzy makes this one action - so designers review the actual responsive result instead of a single desktop screenshot.",
      },
    ],
    related: [
      "responsive-screenshot-workflow",
      "css-breakpoints-guide",
      "test-color-contrast",
    ],
  },
  {
    slug: "device-framed-screenshots",
    title: "Creating Device-Framed Marketing Screenshots",
    description:
      "How to produce clean device-framed screenshots for landing pages, app stores, and social posts without a separate design tool.",
    eyebrow: "Screenshots",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Why framed screenshots convert",
        body: "A screenshot inside a realistic phone or laptop frame instantly communicates 'this is a real product on a real device'. Framed visuals look more credible and polished than bare screenshots, which is why landing pages, app store listings, and launch posts use them. The device frame provides context and a sense of tangibility that a flat rectangle lacks.",
        items: [
          "Frames signal a real, working product",
          "They add polish to landing pages and store listings",
          "Context makes features easier to grasp",
          "Consistent frames strengthen brand presentation",
        ],
      },
      {
        heading: "Capture at the right size and density",
        body: "Marketing screenshots need to be crisp, so capture at high device pixel ratio and the correct viewport for the frame. App store listings have strict size requirements per device class, and social cards have their own aspect ratios. Plan the target dimensions before capturing so you don't upscale and lose sharpness.",
        items: [
          "Capture at 2x or 3x for crisp output",
          "Match app store size requirements per device",
          "Plan aspect ratios for social and landing use",
          "Avoid upscaling small captures",
        ],
      },
      {
        heading: "Skip the design-tool round trip",
        body: "Exporting a screenshot, importing it into a design tool, and compositing a frame is slow and breaks flow. Sizzy's Photo Studio captures your live site already inside device frames, so you go from your running app to a polished, framed marketing image in one step - useful for fast iteration on landing pages and launch assets.",
        items: [
          "Capture framed images directly from the live site",
          "Skip the export/import/composite round trip",
          "Iterate quickly on landing and launch visuals",
          "Keep frames consistent across all assets",
        ],
      },
    ],
    checklist: [
      "Frames match the target device class.",
      "Captures are high-DPR and not upscaled.",
      "Dimensions match the destination's requirements.",
      "Framed assets share a consistent style.",
    ],
    tags: ["device frames", "marketing screenshots", "photo studio"],
    faq: [
      {
        question: "How do I add a device frame to a screenshot?",
        answer:
          "You can composite one in a design tool, but that's slow. A tool like Sizzy's Photo Studio captures your live site already inside realistic device frames, producing framed marketing images in a single step.",
      },
      {
        question: "What resolution should marketing screenshots be?",
        answer:
          "Capture at a high device pixel ratio (2x or 3x) so the result stays crisp, and match the target's size requirements - app stores specify exact dimensions per device, and social cards have their own aspect ratios.",
      },
      {
        question: "Why use framed screenshots on a landing page?",
        answer:
          "Device frames signal that the product is real and running on real hardware, which reads as more credible and polished than a bare rectangle. They also give viewers context for the UI you're showing.",
      },
    ],
    related: [
      "responsive-screenshot-workflow",
      "full-page-screenshot",
      "device-pixel-ratio",
    ],
  },
  {
    slug: "full-page-screenshot",
    title: "How to Take a Full-Page Screenshot",
    description:
      "Ways to capture an entire scrolling page as one image - built-in browser commands, DevTools, and multi-device capture for responsive QA.",
    eyebrow: "Screenshots",
    readTime: "5 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The built-in options",
        body: "You don't need an extension for a full-page screenshot. Chrome DevTools has 'Capture full size screenshot' in the command menu, and Firefox has a screenshot button with a full-page option in Responsive Design Mode. Both stitch the entire scrolling page into one image, including content below the fold.",
        items: [
          "Chrome: command menu > Capture full size screenshot",
          "Firefox: screenshot tool with full-page option",
          "Both capture the entire scroll height",
          "No extension required for the basic case",
        ],
      },
      {
        heading: "Watch for capture gotchas",
        body: "Full-page captures can break on lazy-loaded images, sticky headers that repeat, and elements with position: fixed. Scroll the page first so lazy content loads, and be aware that fixed elements may appear multiple times or only once depending on the tool. For pixel-accurate results, wait for fonts and images to settle before capturing.",
        items: [
          "Scroll first so lazy-loaded images render",
          "Fixed/sticky elements can duplicate or misplace",
          "Wait for fonts and images before capturing",
          "Disable animations for a clean still",
        ],
      },
      {
        heading: "Full-page across every breakpoint",
        body: "For responsive QA you often want full-page captures at several widths to review the whole layout per device. Sizzy can capture full-page screenshots across your device matrix at once, so you get the entire page on phone, tablet, and desktop in a single set - ideal for spotting overflow or spacing issues anywhere down the page.",
        items: [
          "Capture full-page at each breakpoint together",
          "Spot overflow and spacing issues below the fold",
          "Keep a per-release full-page baseline",
          "Compare full-page captures for regressions",
        ],
      },
    ],
    checklist: [
      "Lazy content is loaded before capturing.",
      "Fixed-element duplication is accounted for.",
      "Fonts and images settle before the capture.",
      "Full-page captures cover every breakpoint.",
    ],
    tags: ["full page screenshot", "screenshot tools", "responsive qa"],
    faq: [
      {
        question: "How do I take a full-page screenshot in Chrome?",
        answer:
          "Open the command menu with Cmd/Ctrl+Shift+P, type 'screenshot', and choose 'Capture full size screenshot'. Chrome stitches the entire scrolling page, including content below the fold, into a single image.",
      },
      {
        question: "Why is my full-page screenshot missing images?",
        answer:
          "Lazy-loaded images may not have rendered when the capture ran. Scroll through the page first so all lazy content loads, and wait for fonts and images to settle before taking the screenshot.",
      },
      {
        question: "How do I capture a full page on multiple devices?",
        answer:
          "Use a multi-device browser like Sizzy that captures full-page screenshots across your device matrix at once, producing the entire page on phone, tablet, and desktop in a single set for responsive review.",
      },
    ],
    related: [
      "responsive-screenshot-workflow",
      "device-framed-screenshots",
      "responsive-visual-regression-checklist",
    ],
  },
  {
    slug: "test-multiple-accounts-simultaneously",
    title: "Test Multiple User Accounts at Once",
    description:
      "How to test multi-user features - chat, permissions, collaboration - side by side using isolated browser sessions instead of incognito juggling.",
    eyebrow: "Sessions",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "The multi-account testing problem",
        body: "Any feature involving more than one user - chat, comments, permissions, real-time collaboration, admin vs member views - needs multiple accounts logged in at the same time. The usual hacks are a normal window plus incognito, or multiple browser profiles, both of which are clumsy, easy to mix up, and cap out at two sessions quickly.",
        items: [
          "Chat, comments, and collaboration need two live users",
          "Permission and role differences need parallel logins",
          "Incognito gives you only one extra session",
          "Profiles are heavyweight and easy to confuse",
        ],
      },
      {
        heading: "Isolated sessions are the clean solution",
        body: "What you actually want is several fully isolated sessions - separate cookies, storage, and auth - visible at once. Then you log in as different users in each and watch them interact in real time. Sizzy provides multiple isolated sessions in one window, so you can run admin, member, and guest side by side without separate browsers or profiles.",
        items: [
          "Each session has its own cookies and storage",
          "Log in as different users simultaneously",
          "Watch real-time interactions between accounts",
          "No incognito or profile juggling required",
        ],
      },
      {
        heading: "Test the responsive multi-user case too",
        body: "Multi-user features still have to be responsive - a chat that works on two desktops may break when one user is on mobile. With Sizzy you can combine isolated sessions with different device sizes, so you test an admin on desktop talking to a member on a phone, confirming both the multi-user logic and the responsive layout in one view.",
        items: [
          "Combine isolated sessions with different device widths",
          "Test desktop-to-mobile interactions between users",
          "Confirm real-time updates render correctly per device",
          "Catch layout bugs unique to one role's view",
        ],
      },
    ],
    checklist: [
      "Multi-user flows are tested with parallel logins.",
      "Sessions are fully isolated, not shared cookies.",
      "Different roles are exercised simultaneously.",
      "Responsive behavior is checked across user devices.",
    ],
    tags: ["multi-account testing", "isolated sessions", "collaboration testing"],
    faq: [
      {
        question: "How do I test two user accounts at the same time?",
        answer:
          "Use isolated browser sessions, each with its own cookies and storage, so you can log in as different users simultaneously. Sizzy supports multiple isolated sessions in one window, which is cleaner than juggling incognito and profiles.",
      },
      {
        question: "Why not just use incognito for a second account?",
        answer:
          "Incognito gives you only one additional session and shares state across incognito tabs, so it breaks down for three or more users and is easy to mix up. Dedicated isolated sessions scale and stay clearly separated.",
      },
      {
        question: "Can I test multi-user features across devices?",
        answer:
          "Yes. Combining isolated sessions with different device widths lets you test, for example, an admin on desktop interacting with a member on mobile, validating both the multi-user logic and the responsive layout together.",
      },
    ],
    related: [
      "test-logged-in-logged-out-states",
      "test-responsive-design-on-multiple-devices",
      "hot-reload-across-devices",
    ],
  },
  {
    slug: "test-logged-in-logged-out-states",
    title: "Testing Logged-In and Logged-Out States",
    description:
      "How to test authenticated and unauthenticated views side by side so you catch the bugs that only appear in one state.",
    eyebrow: "Sessions",
    readTime: "5 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Two states, two sets of bugs",
        body: "Most apps render differently based on auth: navigation, CTAs, gated content, and onboarding all change. Bugs hide in the transitions - a logged-out CTA that overlaps the logged-in menu, or content that flashes before auth resolves. Testing only the state you happen to be in leaves the other one under-tested and shippable with bugs.",
        items: [
          "Navigation and CTAs differ by auth state",
          "Gated content and paywalls only show in one state",
          "Auth resolution can cause content flashes",
          "The state you're not in gets under-tested",
        ],
      },
      {
        heading: "View both states at once",
        body: "Constantly logging in and out to compare states is slow and error-prone. With isolated sessions you keep one logged in and one logged out, side by side, and compare them directly. Sizzy lets you run both states simultaneously so a single change is verified for authenticated and anonymous users in one glance.",
        items: [
          "Keep a logged-in and logged-out session open together",
          "Compare the same page across both states instantly",
          "Verify a change for both audiences at once",
          "Avoid the slow log-in/log-out cycle",
        ],
      },
      {
        heading: "Don't forget the responsive matrix",
        body: "Each auth state has its own responsive behavior - a logged-out hero and a logged-in dashboard reflow differently. Combine session state with device sizes so you cover logged-out on mobile and logged-in on desktop and everything between. That two-dimensional matrix is where real-world bugs live.",
        items: [
          "Test logged-out on mobile and desktop",
          "Test logged-in on mobile and desktop",
          "Confirm gated content reflows correctly",
          "Check the auth transition at every width",
        ],
      },
    ],
    checklist: [
      "Both auth states are tested, not just the current one.",
      "Logged-in and logged-out views are compared directly.",
      "Auth-resolution flashes are checked.",
      "Each state is verified across the device matrix.",
    ],
    tags: ["auth testing", "logged-in state", "isolated sessions"],
    faq: [
      {
        question: "How do I test logged-in and logged-out views together?",
        answer:
          "Use isolated browser sessions - keep one authenticated and one anonymous open side by side. Sizzy supports multiple isolated sessions in one window, so you can compare both states instantly instead of logging in and out repeatedly.",
      },
      {
        question: "What bugs are unique to auth states?",
        answer:
          "Navigation and CTA differences, gated content visibility, and content flashes while auth resolves. The state you're not actively using tends to be under-tested, so issues there often ship unnoticed.",
      },
      {
        question: "Do auth states need separate responsive testing?",
        answer:
          "Yes. A logged-out marketing view and a logged-in dashboard reflow differently, so test each auth state across your device matrix rather than assuming responsive behavior carries over between them.",
      },
    ],
    related: [
      "test-multiple-accounts-simultaneously",
      "test-responsive-design-on-multiple-devices",
      "why-layout-breaks-on-mobile",
    ],
  },
  {
    slug: "responsive-images-srcset",
    title: "Responsive Images: srcset and sizes",
    description:
      "How srcset and the sizes attribute work together to serve the right image per device, save bandwidth, and keep visuals sharp.",
    eyebrow: "Responsive patterns",
    readTime: "7 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Why one image size isn't enough",
        body: "Serving a single large image to every device wastes bandwidth on phones and looks soft on high-density screens. Responsive images let the browser pick the best source for each device's width and pixel ratio - smaller files for phones, sharper files for retina, and the right size for the layout slot the image occupies.",
        items: [
          "One size either wastes mobile bandwidth or looks soft",
          "srcset offers the browser multiple sources to choose from",
          "The browser picks based on width and pixel ratio",
          "Right-sized images improve LCP and data usage",
        ],
      },
      {
        heading: "srcset and sizes, working together",
        body: "Use width descriptors in srcset (image-480.jpg 480w, image-960.jpg 960w) to list available sizes, and the sizes attribute to tell the browser how wide the image will render at each breakpoint. Without sizes, the browser assumes full viewport width and may over-fetch. For fixed-size images, density descriptors (1x, 2x) are simpler.",
        items: [
          "srcset with w descriptors lists source widths",
          "sizes describes the rendered width per breakpoint",
          "Missing sizes makes the browser assume 100vw",
          "Use 1x/2x density descriptors for fixed-size images",
        ],
      },
      {
        heading: "Verify the right source loads",
        body: "Responsive image bugs are silent - the wrong source loads but nothing visibly breaks until someone checks the network panel. Test across device profiles and confirm the expected variant is fetched and stays sharp. Sizzy lets you view several DPR and width profiles together so you can confirm phones get the small file and retina screens get the crisp one.",
        items: [
          "Check the network panel for the chosen source",
          "Confirm phones fetch the smaller variant",
          "Confirm high-DPR screens get a sharp variant",
          "Pair with modern formats like WebP/AVIF",
        ],
      },
    ],
    checklist: [
      "srcset lists appropriately sized sources.",
      "sizes accurately describes the rendered width.",
      "High-DPR screens receive sharp variants.",
      "The correct source is verified in the network panel.",
    ],
    tags: ["responsive images", "srcset", "performance"],
    faq: [
      {
        question: "What is the difference between srcset and sizes?",
        answer:
          "srcset lists the available image sources and their widths, while sizes tells the browser how wide the image will display at each breakpoint. The browser combines both with the device pixel ratio to pick the best source.",
      },
      {
        question: "Do I always need the sizes attribute?",
        answer:
          "When using width (w) descriptors, yes - without sizes the browser assumes the image is full viewport width and may download a larger file than needed. For fixed-size images you can use density (1x/2x) descriptors and skip sizes.",
      },
      {
        question: "How do I check the right responsive image loads?",
        answer:
          "Open the network panel and confirm which source was fetched at a given viewport, or test across device profiles in a multi-device browser to verify phones get the smaller file and high-DPR screens get the sharp one.",
      },
    ],
    related: [
      "device-pixel-ratio",
      "improve-largest-contentful-paint",
      "responsive-typography-clamp",
    ],
  },
  {
    slug: "responsive-typography-clamp",
    title: "Responsive Typography with clamp()",
    description:
      "How to build fluid, responsive type with CSS clamp() so text scales smoothly between breakpoints without a pile of media queries.",
    eyebrow: "Responsive patterns",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Fluid type beats stepped breakpoints",
        body: "The old way to scale headings was a media query per breakpoint, producing abrupt jumps in size. Fluid typography scales smoothly with the viewport instead, so text feels right at every width, not just at the breakpoints you happened to define. CSS clamp() makes this a one-line declaration with built-in minimum and maximum bounds.",
        items: [
          "Stepped breakpoints cause abrupt size jumps",
          "Fluid type scales smoothly across all widths",
          "clamp() expresses min, preferred, and max in one value",
          "Fewer media queries to maintain",
        ],
      },
      {
        heading: "How clamp() works for type",
        body: "clamp(min, preferred, max) picks the preferred value but never goes below min or above max. Use a viewport-relative preferred value mixed with a rem base, like clamp(1.5rem, 4vw + 1rem, 3rem), so text scales with the viewport while staying readable at the extremes. The rem component keeps it accessible to user font-size settings.",
        items: [
          "clamp(min, preferred, max) bounds the value",
          "Mix vw with rem for smooth, accessible scaling",
          "Set min for small screens, max for large ones",
          "Apply to font-size, spacing, and even gaps",
        ],
      },
      {
        heading: "Test the extremes and the middle",
        body: "Fluid type can look great at common widths but break at the extremes - too small on tiny phones, too large on wide monitors. Test the smallest and largest supported widths plus a few in between. Sizzy shows multiple widths at once so you can confirm your clamp() bounds hold and headings never overflow or shrink to unreadable sizes.",
        items: [
          "Check the smallest supported width for legibility",
          "Check the largest width so headings don't dominate",
          "Confirm line length stays comfortable mid-range",
          "Verify the rem component respects zoom settings",
        ],
      },
    ],
    checklist: [
      "Headings use clamp() with sensible min and max bounds.",
      "The preferred value mixes vw with a rem base.",
      "Type is legible at the smallest supported width.",
      "Type doesn't dominate at the largest width.",
    ],
    tags: ["responsive typography", "clamp", "fluid type"],
    faq: [
      {
        question: "How does CSS clamp() work for font sizes?",
        answer:
          "clamp(min, preferred, max) returns the preferred value but never below min or above max. Using a viewport-relative preferred value like clamp(1.5rem, 4vw + 1rem, 3rem) makes text scale smoothly while staying readable at the extremes.",
      },
      {
        question: "Is fluid typography better than breakpoint-based sizing?",
        answer:
          "Fluid typography scales smoothly across all widths instead of jumping at breakpoints, usually with fewer media queries to maintain. Just set sensible min and max bounds so text stays legible on tiny phones and isn't oversized on large monitors.",
      },
      {
        question: "Does clamp() with vw hurt accessibility?",
        answer:
          "Pure vw-based sizing can ignore user zoom, but mixing vw with a rem component (for example 4vw + 1rem) keeps text responsive to the browser's font-size setting, preserving accessibility while remaining fluid.",
      },
    ],
    related: [
      "css-viewport-units",
      "css-breakpoints-guide",
      "responsive-images-srcset",
    ],
  },
  {
    slug: "responsive-tables",
    title: "How to Make Responsive Tables",
    description:
      "Practical patterns for making data tables work on small screens - horizontal scroll, stacked rows, and priority columns - with their trade-offs.",
    eyebrow: "Responsive patterns",
    readTime: "6 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Why tables break on mobile",
        body: "Tables have a fixed column structure that doesn't shrink gracefully. On a phone, a wide table either overflows the viewport (causing horizontal scroll for the whole page) or squeezes columns until the content is unreadable. There's no single perfect fix - the right pattern depends on how much data you have and how users need to read it.",
        items: [
          "Fixed column structure doesn't reflow naturally",
          "Wide tables cause page-level horizontal scroll",
          "Squeezing columns makes content unreadable",
          "The best pattern depends on the data and use case",
        ],
      },
      {
        heading: "Three patterns and when to use them",
        body: "The scroll-container pattern wraps the table in an overflow-x box so only the table scrolls, preserving structure - best for dense, comparison-heavy data. The stacked pattern turns each row into a card with labels - best for a few records read one at a time. The priority-columns pattern hides less-important columns on small screens, with a way to expand. Pick by reading behavior.",
        items: [
          "Scroll container: keep structure, scroll only the table",
          "Stacked cards: one record at a time with field labels",
          "Priority columns: hide secondary data, allow expand",
          "Choose based on how users actually read the data",
        ],
      },
      {
        heading: "Test the chosen pattern on real widths",
        body: "Each pattern has failure modes: scroll containers can hide that scrolling is possible, stacked cards can lose context, priority columns can hide critical data. Test the table on real mobile widths to confirm the pattern works. Sizzy lets you view the table on phone, tablet, and desktop together so you confirm it stays readable and doesn't trigger whole-page horizontal scroll.",
        items: [
          "Confirm the scroll container scrolls, not the page",
          "Check stacked cards keep enough context",
          "Verify hidden columns aren't business-critical",
          "Test at the narrowest supported width",
        ],
      },
    ],
    checklist: [
      "The table pattern matches how users read the data.",
      "No table causes whole-page horizontal scroll.",
      "Scrollability is discoverable when used.",
      "The pattern is verified at narrow mobile widths.",
    ],
    tags: ["responsive tables", "data tables", "mobile layout"],
    faq: [
      {
        question: "How do I make a table responsive?",
        answer:
          "Pick a pattern based on the data: wrap it in a horizontal scroll container for dense comparison data, stack rows into labeled cards for records read one at a time, or hide lower-priority columns on small screens with a way to expand.",
      },
      {
        question: "How do I stop a table from breaking my mobile layout?",
        answer:
          "Wrap the table in a container with overflow-x: auto so only the table scrolls, not the whole page. This preserves the table structure while preventing it from forcing page-level horizontal scroll.",
      },
      {
        question: "Should I stack table rows into cards on mobile?",
        answer:
          "Stacking works well when users read a few records individually, since each becomes a labeled card. It works poorly for dense comparison data, where a horizontal scroll container that preserves the grid is usually better.",
      },
    ],
    related: [
      "fix-horizontal-scroll",
      "why-layout-breaks-on-mobile",
      "debug-css-grid",
    ],
  },
  {
    slug: "css-framework-responsive-comparison",
    title: "Responsive Patterns in Tailwind, Bootstrap, and Bulma",
    description:
      "An honest comparison of how Tailwind, Bootstrap, and Bulma handle responsive design, and how to choose based on your team and workflow.",
    eyebrow: "CSS frameworks",
    readTime: "8 min read",
    updatedAt: "2026-06-15",
    sections: [
      {
        heading: "Three philosophies, same goal",
        body: "All three frameworks give you a breakpoint system, but they express responsiveness differently. Tailwind uses inline utility prefixes (md:flex). Bootstrap uses responsive component and grid classes (col-md-6). Bulma uses semantic helper classes and a flexbox-based grid. None is objectively best - the right one depends on how your team prefers to write and maintain styles.",
        items: [
          "Tailwind: inline responsive utility prefixes",
          "Bootstrap: responsive component and 12-column grid classes",
          "Bulma: semantic helpers with a flexbox grid",
          "All are mobile-first with min-width breakpoints",
        ],
      },
      {
        heading: "Trade-offs to weigh honestly",
        body: "Tailwind keeps responsive logic next to markup, which is fast to write but can make HTML verbose. Bootstrap is batteries-included with prebuilt components, great for speed but heavier and more opinionated. Bulma is lightweight and readable with no JavaScript, but has a smaller ecosystem and slower release cadence. Match the trade-off to your priorities.",
        items: [
          "Tailwind: fast iteration, verbose markup, tiny production CSS",
          "Bootstrap: prebuilt components, heavier, very common",
          "Bulma: clean and JS-free, smaller ecosystem",
          "Consider team familiarity and maintenance burden",
        ],
      },
      {
        heading: "Whatever you pick, verify the breakpoints",
        body: "All three rely on breakpoint classes that are easy to apply inconsistently, and the failure mode is identical: a layout that works at one width breaks at another. Testing across breakpoints catches these regardless of framework. Sizzy shows your localhost on every device at once with hot reload, so a missed responsive class shows up immediately whether you write Tailwind, Bootstrap, or Bulma.",
        items: [
          "Confirm grid and utility classes apply at the right tiers",
          "Watch for elements missing a responsive class",
          "Verify component reflow across all breakpoints",
          "Use synced multi-device views to catch gaps instantly",
        ],
      },
    ],
    checklist: [
      "The framework choice matches team workflow and priorities.",
      "Breakpoint usage is consistent across components.",
      "No element is missing a needed responsive class.",
      "Layouts are verified across breakpoints regardless of framework.",
    ],
    tags: ["css frameworks", "tailwind bootstrap bulma", "responsive design"],
    faq: [
      {
        question: "Which CSS framework is best for responsive design?",
        answer:
          "There's no single best - Tailwind suits teams who like inline utilities and tiny production CSS, Bootstrap suits teams who want prebuilt components fast, and Bulma suits those wanting a clean, JS-free option. All are mobile-first with solid breakpoint systems.",
      },
      {
        question: "Are Tailwind, Bootstrap, and Bulma all mobile-first?",
        answer:
          "Yes. All three use min-width-based breakpoints, so unprefixed or base styles apply on mobile and breakpoint classes add styles as the screen grows. The difference is in syntax and component philosophy, not the responsive model.",
      },
      {
        question: "Does the framework choice change how I test responsiveness?",
        answer:
          "Not fundamentally. All of them rely on breakpoint classes that can be applied inconsistently, so testing across breakpoints - ideally on multiple devices at once - catches missed or misapplied responsive classes regardless of which framework you use.",
      },
    ],
    related: [
      "tailwind-responsive-breakpoints",
      "bootstrap-breakpoints",
      "css-breakpoints-guide",
    ],
  },
] satisfies SizzyBlogPost[];
