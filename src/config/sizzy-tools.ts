import type { LucideIcon } from "lucide-react";
import {
  Camera,
  ClipboardCheck,
  GitCompare,
  Laptop,
  MonitorSmartphone,
  Ruler,
  ScanSearch,
  Smartphone,
} from "lucide-react";

export type SizzyToolPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: string;
    items: string[];
  }>;
  checklist: string[];
  Icon: LucideIcon;
};

export const sizzyToolPages = [
  {
    slug: "viewport-checker",
    title: "Viewport Checker",
    description:
      "Check responsive viewport ranges and plan real-device breakpoints before you ship.",
    eyebrow: "Responsive viewport planning",
    intro:
      "Use this reference to choose viewport ranges for responsive QA, then open Sizzy to test the same page across real device sizes at once.",
    sections: [
      {
        heading: "Start with the smallest supported width",
        body: "Most layout issues show up before a design reaches its intended breakpoint. Begin at 320px, increase width gradually, and note the exact point where navigation, forms, or fixed UI stop fitting.",
        items: [
          "320-389px for dense phone layouts",
          "390-479px for modern default phones",
          "480-767px for large phones and small tablets",
          "768-1199px for tablet and desktop handoff",
        ],
      },
      {
        heading: "Validate the behavior, not only the breakpoint",
        body: "A viewport can look correct while still failing interaction. Check sticky headers, dialogs, menus, forms, keyboard focus, and overflow at every width band.",
        items: [
          "Confirm no horizontal scroll appears",
          "Open all menus and modal states",
          "Submit forms with realistic validation errors",
          "Repeat with longer copy and logged-in UI",
        ],
      },
    ],
    checklist: [
      "Record the minimum width the page supports without horizontal overflow.",
      "Capture screenshots for each viewport band before release.",
      "Retest sticky navigation, dialogs, and checkout or signup forms.",
      "Use Sizzy sessions when a page needs several login states side by side.",
    ],
    Icon: MonitorSmartphone,
  },
  {
    slug: "responsive-screenshot-generator",
    title: "Responsive Screenshot Generator",
    description:
      "Plan repeatable desktop, tablet, and mobile screenshots for responsive release QA.",
    eyebrow: "Responsive screenshot planning",
    intro:
      "A screenshot set is only useful when it is consistent. Use this checklist to define the viewport sizes, page states, and file naming rules before capturing visual proof in Sizzy.",
    sections: [
      {
        heading: "Pick a stable capture matrix",
        body: "Choose one representative width per layout band, then keep that matrix stable across releases so visual regressions are easy to compare.",
        items: [
          "375px for compact mobile",
          "430px for large mobile",
          "768px for tablet handoff",
          "1280px or 1440px for desktop",
        ],
      },
      {
        heading: "Name screenshots for review",
        body: "Screenshots should make the reviewed route, state, viewport, and date obvious without opening the file. That keeps launch reviews fast and prevents stale captures from passing as current proof.",
        items: [
          "Include route slug and viewport width",
          "Include logged-out or logged-in state",
          "Include the capture date",
          "Keep full-page and above-fold captures separate",
        ],
      },
    ],
    checklist: [
      "Capture the same route at mobile, tablet, and desktop widths.",
      "Include error, empty, and success states when the page has forms.",
      "Review for clipped text, broken sticky UI, and horizontal overflow.",
      "Archive the final approved set with the release evidence.",
    ],
    Icon: Camera,
  },
  {
    slug: "responsive-qa-checklist",
    title: "Responsive QA Checklist",
    description:
      "Run a focused responsive QA pass across navigation, layout, forms, media, and checkout flows.",
    eyebrow: "Responsive release QA",
    intro:
      "Responsive QA is a release gate, not a quick resize. Use this pass to catch the layout and interaction issues that usually escape desktop-only review.",
    sections: [
      {
        heading: "Cover the main interaction surfaces",
        body: "Every page should be tested where visitors actually make decisions: navigation, primary CTAs, forms, embedded media, pricing, and checkout handoff.",
        items: [
          "Open mobile navigation and nested menus",
          "Tab through forms and dialogs",
          "Check media aspect ratios and loading states",
          "Confirm primary CTAs stay visible and tappable",
        ],
      },
      {
        heading: "Retest with realistic content",
        body: "Short demo copy hides breakage. Test longer names, wrapped headings, validation messages, localized strings, and empty states before release.",
        items: [
          "Use long button labels and titles",
          "Check empty and loading states",
          "Trigger validation errors",
          "Verify focus rings and keyboard order",
        ],
      },
    ],
    checklist: [
      "No horizontal overflow at the smallest supported width.",
      "Primary navigation works with touch and keyboard input.",
      "Forms remain readable after validation errors.",
      "Pricing, checkout, or download CTAs remain reachable on every viewport.",
    ],
    Icon: ClipboardCheck,
  },
  {
    slug: "website-breakpoint-finder",
    title: "Website Breakpoint Finder",
    description:
      "Find the exact widths where layouts change, wrap, overflow, or need a responsive fix.",
    eyebrow: "Breakpoint discovery",
    intro:
      "Breakpoint bugs usually live between named devices. Sweep the page width slowly and record the exact pixel ranges where the layout changes or starts to fail.",
    sections: [
      {
        heading: "Sweep through ranges, not devices",
        body: "Device presets are useful proof points, but breakpoint discovery needs a continuous pass. Move in small increments and watch for wrapping, clipped content, and controls that lose touch space.",
        items: [
          "320-480px for mobile density",
          "481-767px for intermediate handoff issues",
          "768-1024px for tablet columns",
          "1025-1440px for desktop container behavior",
        ],
      },
      {
        heading: "Log what changed",
        body: "Useful breakpoint notes say what changed, whether it is intentional, and what state was open. That makes fixes faster and prevents intentional layout changes from being filed as defects.",
        items: [
          "Record route, width, and browser zoom",
          "Note open menus or modals",
          "Mark expected layout changes",
          "Flag overflow, clipping, and interaction failures",
        ],
      },
    ],
    checklist: [
      "Identify the first width where each layout switches.",
      "Confirm the page is stable 20px before and after every breakpoint.",
      "Capture any overflow or clipped text with the exact width.",
      "Retest fixed issues with the same width sweep.",
    ],
    Icon: ScanSearch,
  },
  {
    slug: "screenshot-comparison-checklist",
    title: "Screenshot Comparison Checklist",
    description:
      "Compare responsive screenshots with a consistent visual regression review process.",
    eyebrow: "Visual regression review",
    intro:
      "Screenshot comparison works best when reviewers know which changes are intentional. Use this checklist to separate accepted design changes from responsive regressions.",
    sections: [
      {
        heading: "Compare the same state",
        body: "A visual diff is only trustworthy when the route, viewport, account state, data state, and browser chrome assumptions match the baseline.",
        items: [
          "Use the same viewport width and height",
          "Match logged-in or logged-out state",
          "Freeze dynamic banners where possible",
          "Capture after fonts and images have loaded",
        ],
      },
      {
        heading: "Review layout before polish",
        body: "Prioritize defects that block conversion or usability. Spacing polish matters, but clipped CTAs, hidden forms, and broken navigation are release blockers.",
        items: [
          "Check CTA visibility and tap targets",
          "Find content that overlaps or clips",
          "Verify sticky and fixed elements",
          "Scan for unexpected horizontal scroll",
        ],
      },
    ],
    checklist: [
      "Baseline and candidate screenshots use the same viewport matrix.",
      "Intentional copy or design changes are noted before review.",
      "Responsive blockers are separated from minor visual polish.",
      "Approved screenshots are attached to the release evidence.",
    ],
    Icon: GitCompare,
  },
  {
    slug: "browser-size-cheat-sheet",
    title: "Browser Size Cheat Sheet",
    description:
      "Use common browser viewport sizes for practical desktop, tablet, and mobile QA coverage.",
    eyebrow: "Viewport size reference",
    intro:
      "A small set of well-chosen browser sizes can catch most responsive issues before release. Use this sheet as a baseline, then add product-specific widths where your analytics show traffic.",
    sections: [
      {
        heading: "Recommended baseline sizes",
        body: "These widths cover common layout transitions without turning every release into an exhaustive device lab.",
        items: [
          "360x740 for compact mobile",
          "390x844 for common iPhone-class mobile",
          "768x1024 for tablet portrait",
          "1280x800 and 1440x900 for desktop",
        ],
      },
      {
        heading: "When to add more sizes",
        body: "Add sizes when a product has important traffic or known risk in a specific band: dashboards, data tables, sidebars, embedded widgets, and checkout pages often need extra coverage.",
        items: [
          "Add 320px for dense consumer pages",
          "Add 1024px for sidebar handoffs",
          "Add ultrawide only for canvas-heavy tools",
          "Add height variants for sticky footer or CTA issues",
        ],
      },
    ],
    checklist: [
      "Keep one shared viewport matrix for release screenshots.",
      "Add analytics-driven sizes for high-value traffic bands.",
      "Retest pages with tables, sidebars, and sticky CTAs separately.",
      "Document any supported minimum viewport width.",
    ],
    Icon: Laptop,
  },
  {
    slug: "css-breakpoint-checker",
    title: "CSS Breakpoint Checker",
    description:
      "Audit CSS breakpoints and verify that responsive styles match real layout behavior.",
    eyebrow: "CSS breakpoint audit",
    intro:
      "CSS breakpoints should describe real layout needs, not only framework defaults. Use this audit to connect media queries to the exact UI behavior they protect.",
    sections: [
      {
        heading: "Map breakpoints to layout changes",
        body: "List each media query and the visible behavior it controls. Unused or duplicate breakpoints make responsive defects harder to reason about.",
        items: [
          "Navigation collapse and expansion",
          "Grid column changes",
          "Sidebar visibility",
          "Typography and spacing shifts",
        ],
      },
      {
        heading: "Check the in-between widths",
        body: "Framework breakpoints are convenient labels, but defects often appear between them. Test before, at, and after each breakpoint.",
        items: [
          "One width 20px below the breakpoint",
          "The exact breakpoint width",
          "One width 20px above the breakpoint",
          "The smallest and largest supported widths",
        ],
      },
    ],
    checklist: [
      "Every breakpoint has a clear layout reason.",
      "No route relies on hidden horizontal overflow.",
      "Breakpoint transitions work before, at, and after the threshold.",
      "Dead or duplicate responsive rules are removed during cleanup.",
    ],
    Icon: Ruler,
  },
] satisfies SizzyToolPage[];

export const sizzyToolLinks = sizzyToolPages.map(
  ({ slug, title, description, Icon }) => ({
    href: `/tools/${slug}`,
    title,
    description,
    Icon,
  }),
);

export function getSizzyToolPage(slug: string | undefined) {
  return sizzyToolPages.find((page) => page.slug === slug);
}

export function getDynamicSizzyToolRoutes() {
  return sizzyToolPages
    .filter((page) => page.slug !== "viewport-checker")
    .map((page) => `/tools/${page.slug}`);
}

export const viewportChecklist = [
  "Start with the narrowest supported mobile width and expand until the layout breaks.",
  "Check common device-width clusters instead of testing only arbitrary breakpoints.",
  "Validate navigation, sticky elements, forms, dialogs, and horizontal overflow at each range.",
  "Repeat the pass with realistic content lengths, logged-in states, and browser chrome assumptions.",
] as const;

export const viewportRanges = [
  {
    label: "Small phones",
    range: "320-389px",
    note: "Stress-test dense controls, text wrapping, dialogs, and fixed-position UI.",
    Icon: Ruler,
  },
  {
    label: "Modern phones",
    range: "390-479px",
    note: "Check the default mobile experience and any card, nav, or form density changes.",
    Icon: Smartphone,
  },
  {
    label: "Large phones and small tablets",
    range: "480-767px",
    note: "Watch for awkward intermediate layouts before tablet styles take over.",
    Icon: ScanSearch,
  },
  {
    label: "Tablet and desktop handoff",
    range: "768-1199px",
    note: "Confirm columns, sidebars, and nav transformations happen cleanly.",
    Icon: Ruler,
  },
] as const;
