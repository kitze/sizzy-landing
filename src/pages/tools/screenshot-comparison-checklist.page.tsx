import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
  createStyles,
} from "@mantine/core";
import MetaTags from "components/MetaTags";
import Shell from "components/Shell";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import {
  FaBalanceScale,
  FaCheckCircle,
  FaClipboardList,
  FaCopy,
  FaDownload,
  FaExternalLinkAlt,
  FaImage,
  FaMobileAlt,
  FaSyncAlt,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";

type PageType = {
  value: string;
  label: string;
  focus: string;
};

type ViewportTarget = {
  slug: string;
  label: string;
  width: number;
  height: number;
  family: "Phone" | "Tablet" | "Desktop";
  note: string;
};

type PageState = {
  slug: string;
  label: string;
  detail: string;
  checklist: string[];
};

type ToleranceProfile = {
  value: string;
  label: string;
  maxPixelPercent: string;
  maxChannelDiff: string;
  notes: string[];
};

type ViewportPair = {
  key: string;
  label: string;
  stateLabel: string;
  size: string;
  baselineName: string;
  candidateName: string;
  diffName: string;
};

type TriageRow = {
  severity: string;
  signal: string;
  likelyCause: string;
  action: string;
};

type ComparisonReport = {
  url: string;
  pageLabel: string;
  pageType: PageType;
  targets: ViewportTarget[];
  states: PageState[];
  tolerance: ToleranceProfile;
  pairs: ViewportPair[];
  toleranceNotes: string[];
  stateChecklist: string[];
  triageRows: TriageRow[];
  capturePrompt: string;
  reviewPrompt: string;
  markdown: string;
};

const pageTypes: PageType[] = [
  {
    value: "marketing",
    label: "Marketing page",
    focus: "hero, navigation, social proof, pricing cards, and CTA placement",
  },
  {
    value: "saas",
    label: "SaaS app screen",
    focus: "sidebars, tables, modals, dense toolbars, and empty states",
  },
  {
    value: "checkout",
    label: "Checkout flow",
    focus: "forms, totals, payment widgets, sticky actions, and trust content",
  },
  {
    value: "content",
    label: "Article or docs page",
    focus: "reading width, embeds, images, code blocks, and table of contents",
  },
  {
    value: "ecommerce",
    label: "Ecommerce page",
    focus: "galleries, filters, product details, variants, and cart CTAs",
  },
  {
    value: "dashboard",
    label: "Dashboard",
    focus: "charts, data grids, navigation collapse, and scroll containers",
  },
];

const viewportTargets: ViewportTarget[] = [
  {
    slug: "iphone-se",
    label: "iPhone SE",
    width: 375,
    height: 667,
    family: "Phone",
    note: "small mobile",
  },
  {
    slug: "iphone-15",
    label: "iPhone 15",
    width: 393,
    height: 852,
    family: "Phone",
    note: "modern iPhone",
  },
  {
    slug: "pixel-8",
    label: "Pixel 8",
    width: 412,
    height: 915,
    family: "Phone",
    note: "large Android",
  },
  {
    slug: "ipad",
    label: "iPad",
    width: 820,
    height: 1180,
    family: "Tablet",
    note: "tablet portrait",
  },
  {
    slug: "ipad-landscape",
    label: "iPad landscape",
    width: 1024,
    height: 768,
    family: "Tablet",
    note: "tablet landscape",
  },
  {
    slug: "laptop",
    label: "Laptop",
    width: 1366,
    height: 768,
    family: "Desktop",
    note: "common desktop",
  },
  {
    slug: "desktop-hd",
    label: "Desktop HD",
    width: 1920,
    height: 1080,
    family: "Desktop",
    note: "wide desktop",
  },
];

const defaultTargets = ["iphone-se", "iphone-15", "ipad", "laptop", "desktop-hd"];

const pageStateOptions: PageState[] = [
  {
    slug: "default",
    label: "Default",
    detail: "initial page load after fonts, images, and consent state settle",
    checklist: [
      "Wait for network idle, document fonts, lazy images, and app hydration.",
      "Pin cookie or consent state so the banner is consistently present or hidden.",
      "Disable animations that are not part of the regression being reviewed.",
    ],
  },
  {
    slug: "scrolled",
    label: "Scrolled",
    detail: "mid-page scroll with sticky UI, lazy sections, and anchor content visible",
    checklist: [
      "Scroll to the first content section where sticky headers or banners can overlap content.",
      "Confirm lazy images and animated sections have finished loading before capture.",
      "Compare scroll position by selector instead of raw pixels when possible.",
    ],
  },
  {
    slug: "navigation-open",
    label: "Navigation open",
    detail: "mobile menu, dropdown, command menu, or account menu open",
    checklist: [
      "Open the same menu at phone, tablet, and desktop widths.",
      "Mask notification counts, avatars, and user-specific labels if they are not under test.",
      "Check focus outline, backdrop, body lock, and menu item wrapping.",
    ],
  },
  {
    slug: "form-errors",
    label: "Form errors",
    detail: "required fields, validation messages, helper text, and disabled actions",
    checklist: [
      "Submit empty required fields and capture the validation state.",
      "Use long labels, long emails, and localized error strings where the page supports them.",
      "Confirm errors do not push primary actions below reachable mobile areas.",
    ],
  },
  {
    slug: "modal",
    label: "Modal or drawer",
    detail: "dialog, drawer, cart, filter panel, or upgrade prompt open",
    checklist: [
      "Open the highest-risk overlay at every selected viewport.",
      "Compare backdrop, fixed positioning, close controls, and scroll behavior.",
      "Verify the overlay does not hide important page context or CTA state.",
    ],
  },
  {
    slug: "dark-mode",
    label: "Dark mode",
    detail: "dark color scheme, high-contrast mode, or theme switcher state",
    checklist: [
      "Set the same color scheme before both baseline and candidate captures.",
      "Check transparent media, icons, disabled states, and overlay text.",
      "Review tolerance carefully because antialiasing differences are easier to notice.",
    ],
  },
];

const defaultStates = ["default", "scrolled", "navigation-open"];

const toleranceProfiles: ToleranceProfile[] = [
  {
    value: "strict",
    label: "Strict UI",
    maxPixelPercent: "0.05% to 0.15%",
    maxChannelDiff: "8 to 16",
    notes: [
      "Use for navigation, pricing, checkout, forms, and core UI.",
      "Fail text reflow, clipped CTAs, missing icons, and unexpected spacing changes.",
      "Mask clocks, random IDs, ads, user avatars, and blinking cursors.",
    ],
  },
  {
    value: "balanced",
    label: "Balanced release",
    maxPixelPercent: "0.2% to 0.6%",
    maxChannelDiff: "16 to 32",
    notes: [
      "Use for most marketing pages, docs, dashboards, and product screens.",
      "Accept tiny antialiasing shifts, image compression noise, and sub-pixel font differences.",
      "Escalate layout movement, overlapping UI, hidden content, and changed hierarchy.",
    ],
  },
  {
    value: "content-heavy",
    label: "Content heavy",
    maxPixelPercent: "0.6% to 1.5%",
    maxChannelDiff: "24 to 48",
    notes: [
      "Use for blogs, grids, galleries, feeds, and pages with editorial imagery.",
      "Accept image crop changes only when they are intentional and documented.",
      "Mask dynamic recommendations, counters, social embeds, and remote media.",
    ],
  },
  {
    value: "dynamic-app",
    label: "Dynamic app",
    maxPixelPercent: "1% to 3%",
    maxChannelDiff: "32 to 64",
    notes: [
      "Use for charts, dashboards, maps, canvases, and data-heavy app screens.",
      "Pair the diff with semantic assertions for critical labels, totals, and controls.",
      "Mask live charts, timestamps, randomized colors, map tiles, and skeleton timing.",
    ],
  },
];

const triageRows: TriageRow[] = [
  {
    severity: "Blocker",
    signal: "CTA hidden, form unusable, content clipped, checkout path changed",
    likelyCause: "Layout regression, fixed/sticky UI overlap, breakpoint rule conflict",
    action: "Stop release, reproduce in the smallest failing viewport, assign owner",
  },
  {
    severity: "Major",
    signal: "Navigation wraps badly, modal shifts, table overflow breaks reading",
    likelyCause: "Container width, z-index, long content, or missing responsive state",
    action: "Fix before merge or document an explicit product/design acceptance",
  },
  {
    severity: "Minor",
    signal: "Small spacing, antialiasing, image crop, or color token variance",
    likelyCause: "Browser rendering, asset compression, font loading, token drift",
    action: "Attach diff, confirm intent, batch with nearby polish work",
  },
  {
    severity: "Ignore",
    signal: "Timestamp, avatar, ad, random ID, live chart, loading shimmer",
    likelyCause: "Expected dynamic content or non-deterministic third-party surface",
    action: "Mask selector, freeze data, or exclude from the visual comparison",
  },
];

const faq = [
  {
    question: "What is a screenshot comparison checklist?",
    answer:
      "It is a repeatable visual regression plan for capturing baseline and candidate screenshots at the same viewports, page states, and tolerance settings.",
  },
  {
    question: "Which visual diff tolerance should I start with?",
    answer:
      "Start with the balanced release profile, then switch to strict UI for forms, checkout, pricing, and navigation where small changes can block users.",
  },
  {
    question: "Can this replace visual regression testing?",
    answer:
      "No. Use it to plan captures, prompts, and triage. Use Sizzy or Playwright when you need real synchronized viewports and screenshot automation.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const useStyles = createStyles((theme) => ({
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #fff8ed 0%, #ffffff 42%, #effaf7 100%)",
    color: theme.colors.gray[8],
  },
  inner: {
    width: "100%",
    maxWidth: 1180,
    margin: "0 auto",
    padding: "92px 24px 80px",
    [theme.fn.smallerThan("sm")]: {
      padding: "62px 16px 56px",
    },
  },
  eyebrow: {
    alignSelf: "flex-start",
    border: "1px solid rgba(9, 146, 104, 0.24)",
    background: "rgba(9, 146, 104, 0.09)",
    color: theme.colors.teal[8],
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 360px",
    gap: 28,
    alignItems: "end",
    [theme.fn.smallerThan("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  heroTitle: {
    maxWidth: 860,
    fontSize: 62,
    lineHeight: 1,
    color: "#171126",
    [theme.fn.smallerThan("md")]: {
      fontSize: 44,
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: 34,
    },
  },
  heroCopy: {
    maxWidth: 760,
    fontSize: 20,
    lineHeight: 1.65,
    color: theme.colors.gray[7],
    [theme.fn.smallerThan("sm")]: {
      fontSize: 16,
    },
  },
  miniPanel: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.84)",
    boxShadow: "0 20px 60px rgba(23, 17, 38, 0.08)",
    padding: 20,
  },
  toolGrid: {
    display: "grid",
    gridTemplateColumns: "380px minmax(0, 1fr)",
    gap: 24,
    marginTop: 34,
    [theme.fn.smallerThan("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  panel: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 22px 70px rgba(23, 17, 38, 0.08)",
  },
  optionButton: {
    width: "100%",
    minHeight: 68,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    borderRadius: 8,
    background: "#ffffff",
    padding: "12px 14px",
    color: theme.colors.gray[8],
    cursor: "pointer",
    textAlign: "left",
    transition: "border-color 140ms ease, background 140ms ease",
    "&:hover": {
      borderColor: "rgba(9, 146, 104, 0.38)",
      background: "rgba(9, 146, 104, 0.05)",
    },
  },
  optionButtonActive: {
    borderColor: "rgba(245, 159, 0, 0.46)",
    background: "rgba(245, 159, 0, 0.09)",
  },
  metric: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    padding: 18,
    minHeight: 112,
  },
  pairCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
  },
  pairFile: {
    borderRadius: 8,
    background: "#f7f8fb",
    border: "1px solid rgba(23, 17, 38, 0.07)",
    padding: "8px 10px",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
    fontSize: 12,
    color: "#171126",
    overflowWrap: "anywhere",
  },
  code: {
    minHeight: 260,
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#171126",
    color: "#f8f5ff",
    padding: 18,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
    fontSize: 13,
    lineHeight: 1.7,
    overflowX: "auto",
    whiteSpace: "pre",
  },
  tableWrap: {
    overflowX: "auto",
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
  },
  triageTable: {
    minWidth: 760,
    background: "#ffffff",
    "thead tr th": {
      background: "#f7f8fb",
      color: "#171126",
      fontWeight: 800,
    },
    "td, th": {
      verticalAlign: "top",
    },
  },
  linkBand: {
    borderRadius: 8,
    border: "1px solid rgba(9, 146, 104, 0.18)",
    background:
      "linear-gradient(135deg, rgba(9, 146, 104, 0.10), rgba(245, 159, 0, 0.10), rgba(22, 163, 184, 0.10))",
    padding: 24,
  },
  faqCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.72)",
  },
}));

const getPageType = (value: string) =>
  pageTypes.find((item) => item.value === value) || pageTypes[0];

const getToleranceProfile = (value: string) =>
  toleranceProfiles.find((item) => item.value === value) || toleranceProfiles[1];

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const slugFromUrl = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "-");
  } catch {
    return "page";
  }
};

const safeSlug = (value: string, fallback: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || fallback;

const getSelectedTargets = (selectedSlugs: string[]) =>
  viewportTargets.filter((target) => selectedSlugs.includes(target.slug));

const getSelectedStates = (selectedSlugs: string[]) =>
  pageStateOptions.filter((state) => selectedSlugs.includes(state.slug));

const buildPairs = (
  url: string,
  baselineLabel: string,
  candidateLabel: string,
  targets: ViewportTarget[],
  states: PageState[]
) => {
  const siteSlug = slugFromUrl(url || "page");
  const baselineSlug = safeSlug(baselineLabel, "baseline");
  const candidateSlug = safeSlug(candidateLabel, "candidate");

  return states.flatMap((state) =>
    targets.map((target) => {
      const prefix = `${siteSlug}-${state.slug}-${target.slug}`;
      return {
        key: `${state.slug}-${target.slug}`,
        label: target.label,
        stateLabel: state.label,
        size: `${target.width}x${target.height}`,
        baselineName: `${prefix}-${baselineSlug}.png`,
        candidateName: `${prefix}-${candidateSlug}.png`,
        diffName: `${prefix}-diff.png`,
      };
    })
  );
};

const getCapturePrompt = (
  reportUrl: string,
  pageType: PageType,
  targets: ViewportTarget[],
  states: PageState[],
  tolerance: ToleranceProfile,
  maskNotes: string
) => {
  const targetLines = targets
    .map((target) => `- ${target.label}: ${target.width}x${target.height} (${target.note})`)
    .join("\n");
  const stateLines = states.map((state) => `- ${state.label}: ${state.detail}`).join("\n");
  const maskLine = maskNotes.trim()
    ? `Use these mask or ignore notes: ${maskNotes.trim()}`
    : "Ask me for selectors to mask if dynamic content appears in the diff.";

  return [
    "Write a Playwright visual regression capture script for this page.",
    `URL: ${reportUrl || "https://example.com"}`,
    `Page type: ${pageType.label}. Focus the review on ${pageType.focus}.`,
    "",
    "Capture baseline and candidate screenshots for these viewports:",
    targetLines,
    "",
    "Capture these page states:",
    stateLines,
    "",
    `Use the ${tolerance.label} tolerance profile: ${tolerance.maxPixelPercent} changed pixels and ${tolerance.maxChannelDiff} channel difference.`,
    maskLine,
    "Wait for network idle, fonts, images, hydration, and deterministic test data before every screenshot.",
    "Save screenshots with stable names and produce a markdown table with pass, fail, and review statuses.",
  ].join("\n");
};

const getReviewPrompt = (report: {
  pageLabel: string;
  pageType: PageType;
  tolerance: ToleranceProfile;
  triageRows: TriageRow[];
}) => {
  return [
    "Review these visual regression diffs and triage them for release.",
    `Page: ${report.pageLabel}`,
    `Page type: ${report.pageType.label}`,
    `Tolerance: ${report.tolerance.label} (${report.tolerance.maxPixelPercent}, channel diff ${report.tolerance.maxChannelDiff})`,
    "",
    "Classify each finding using this triage rubric:",
    ...report.triageRows.map((row) => `- ${row.severity}: ${row.signal}. Action: ${row.action}.`),
    "",
    "Return a table with viewport, page state, severity, changed area, likely cause, decision, and owner.",
  ].join("\n");
};

const buildComparisonReport = (
  rawUrl: string,
  pageName: string,
  baselineLabel: string,
  candidateLabel: string,
  pageTypeValue: string,
  selectedTargets: string[],
  selectedStates: string[],
  toleranceValue: string,
  maskNotes: string
): ComparisonReport => {
  const url = normalizeUrl(rawUrl);
  const pageType = getPageType(pageTypeValue);
  const targets = getSelectedTargets(selectedTargets);
  const states = getSelectedStates(selectedStates);
  const tolerance = getToleranceProfile(toleranceValue);
  const pageLabel = pageName.trim() || url || "Target page";
  const pairs = buildPairs(url, baselineLabel, candidateLabel, targets, states);
  const pairSummary = pairs.length ? `${pairs.length} screenshot pairs` : "No screenshot pairs";
  const toleranceNotes = [
    `Use ${
      tolerance.maxPixelPercent
    } changed pixels as the review band for ${tolerance.label.toLowerCase()}.`,
    `Use ${tolerance.maxChannelDiff} as the per-channel threshold before marking noise as a diff.`,
    ...tolerance.notes,
    maskNotes.trim()
      ? `Mask or ignore: ${maskNotes.trim()}`
      : "Mask timestamps, ads, avatars, random IDs, live counters, and loading shimmers before comparing.",
  ];
  const stateChecklist = states.flatMap((state) => [
    `${state.label}: ${state.detail}.`,
    ...state.checklist,
  ]);
  const capturePrompt = getCapturePrompt(url, pageType, targets, states, tolerance, maskNotes);
  const reviewPrompt = getReviewPrompt({ pageLabel, pageType, tolerance, triageRows });
  const markdown = [
    "# Screenshot Comparison Checklist",
    "",
    `- Page: ${pageLabel}`,
    `- URL: ${url || "Add URL before capture"}`,
    `- Baseline: ${baselineLabel.trim() || "Baseline"}`,
    `- Candidate: ${candidateLabel.trim() || "Candidate"}`,
    `- Page type: ${pageType.label}`,
    `- Viewport pairs: ${pairSummary}`,
    `- Page states: ${states.map((state) => state.label).join(", ")}`,
    `- Tolerance: ${tolerance.label} (${tolerance.maxPixelPercent}, channel diff ${tolerance.maxChannelDiff})`,
    "",
    "## Viewport Pairs",
    "",
    "| State | Viewport | Baseline | Candidate | Diff |",
    "| --- | --- | --- | --- | --- |",
    ...pairs.map(
      (pair) =>
        `| ${pair.stateLabel} | ${pair.label} ${pair.size} | ${pair.baselineName} | ${pair.candidateName} | ${pair.diffName} |`
    ),
    "",
    "## Visual Diff Tolerance Notes",
    "",
    ...toleranceNotes.map((note) => `- ${note}`),
    "",
    "## Page State Checklist",
    "",
    ...stateChecklist.map((item) => `- [ ] ${item}`),
    "",
    "## Regression Triage",
    "",
    "| Severity | Diff signal | Likely cause | Action |",
    "| --- | --- | --- | --- |",
    ...triageRows.map(
      (row) => `| ${row.severity} | ${row.signal} | ${row.likelyCause} | ${row.action} |`
    ),
    "",
    "## Playwright Capture Prompt",
    "",
    "```text",
    capturePrompt,
    "```",
    "",
    "## Diff Review Prompt",
    "",
    "```text",
    reviewPrompt,
    "```",
  ].join("\n");

  return {
    url,
    pageLabel,
    pageType,
    targets,
    states,
    tolerance,
    pairs,
    toleranceNotes,
    stateChecklist,
    triageRows,
    capturePrompt,
    reviewPrompt,
    markdown,
  };
};

const downloadText = (filename: string, value: string) => {
  const blob = new Blob([value], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const ScreenshotComparisonChecklistPage = () => {
  const { classes } = useStyles();
  const [rawUrl, setRawUrl] = useState("");
  const [pageName, setPageName] = useState("");
  const [baselineLabel, setBaselineLabel] = useState("main");
  const [candidateLabel, setCandidateLabel] = useState("current-branch");
  const [pageType, setPageType] = useState("marketing");
  const [selectedTargets, setSelectedTargets] = useState<string[]>(defaultTargets);
  const [selectedStates, setSelectedStates] = useState<string[]>(defaultStates);
  const [tolerance, setTolerance] = useState("balanced");
  const [maskNotes, setMaskNotes] = useState("");
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState<"report" | "capture" | "review" | null>(null);

  const report = useMemo(
    () =>
      buildComparisonReport(
        rawUrl,
        pageName,
        baselineLabel,
        candidateLabel,
        pageType,
        selectedTargets,
        selectedStates,
        tolerance,
        maskNotes
      ),
    [
      baselineLabel,
      candidateLabel,
      maskNotes,
      pageName,
      pageType,
      rawUrl,
      selectedStates,
      selectedTargets,
      tolerance,
    ]
  );
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Screenshot Comparison Checklist",
    gradientColors: ["#099268", "#f59f00", "#16a3b8"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  const markStarted = (field: string) => {
    if (!started) {
      captureSizzyEvent("tool_started", {
        tool_slug: "screenshot-comparison-checklist",
        field,
      });
      setStarted(true);
    }
  };

  const toggleTarget = (slug: string) => {
    const next = selectedTargets.includes(slug)
      ? selectedTargets.filter((item) => item !== slug)
      : [...selectedTargets, slug];
    setSelectedTargets(next.length ? next : defaultTargets);
    setCopied(null);
    markStarted("targets");
  };

  const toggleState = (slug: string) => {
    const next = selectedStates.includes(slug)
      ? selectedStates.filter((item) => item !== slug)
      : [...selectedStates, slug];
    setSelectedStates(next.length ? next : defaultStates);
    setCopied(null);
    markStarted("states");
  };

  const generateChecklist = () => {
    setCopied(null);
    captureSizzyEvent("tool_completed", {
      tool_slug: "screenshot-comparison-checklist",
      pair_count: report.pairs.length,
      target_count: report.targets.length,
      state_count: report.states.length,
      tolerance,
    });
  };

  const copyReport = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.markdown);
    }
    setCopied("report");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "screenshot-comparison-checklist",
      copy_type: "markdown_report",
      pair_count: report.pairs.length,
    });
  };

  const copyCapturePrompt = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.capturePrompt);
    }
    setCopied("capture");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "screenshot-comparison-checklist",
      copy_type: "playwright_capture_prompt",
      pair_count: report.pairs.length,
    });
  };

  const copyReviewPrompt = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.reviewPrompt);
    }
    setCopied("review");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "screenshot-comparison-checklist",
      copy_type: "diff_review_prompt",
      pair_count: report.pairs.length,
    });
  };

  const exportChecklist = () => {
    downloadText("screenshot-comparison-checklist.md", report.markdown);
    captureSizzyEvent("export_clicked", {
      tool_slug: "screenshot-comparison-checklist",
      pair_count: report.pairs.length,
    });
  };

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Screenshot Comparison Checklist - Sizzy"
        description="Generate viewport screenshot pairs, visual diff tolerance notes, page-state checks, regression triage, and Playwright capture prompts."
        url="https://sizzy.co/tools/screenshot-comparison-checklist"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/tools/screenshot-comparison-checklist" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <main className={classes.page}>
        <Box className={classes.inner}>
          <Box className={classes.heroGrid}>
            <Stack spacing="lg">
              <Badge
                size="lg"
                radius="xl"
                className={classes.eyebrow}
                leftSection={<FaBalanceScale />}
              >
                Free responsive QA tool
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Screenshot Comparison Checklist
              </Title>
              <Text className={classes.heroCopy}>
                Generate baseline and candidate viewport pairs, tolerance notes, page-state checks,
                triage rules, and Playwright prompts for a visual regression review.
              </Text>
              <Group spacing="sm">
                <Anchor href="/tools/responsive-screenshot-generator">Screenshot generator</Anchor>
                <Anchor href="/tools/responsive-qa-checklist">QA checklist</Anchor>
                <Anchor href="/tools/viewport-checker">Viewport checker</Anchor>
                <Anchor href="/tools/website-breakpoint-finder">Breakpoint finder</Anchor>
                <Anchor href="/tools/css-breakpoint-checker">CSS breakpoint checker</Anchor>
                <Anchor href="/features/screenshots">Sizzy screenshots</Anchor>
              </Group>
            </Stack>

            <Box className={classes.miniPanel}>
              <Text size="sm" color="dimmed" transform="uppercase" weight={700}>
                Current plan
              </Text>
              <Title order={3} mt={8}>
                {report.pairs.length} pairs
              </Title>
              <Text color="dimmed" mt={6}>
                {report.targets.length} viewports - {report.states.length} page states
              </Text>
            </Box>
          </Box>

          <Box className={classes.toolGrid}>
            <Card className={classes.panel} p="lg">
              <Stack spacing="md">
                <Title order={2}>Build the comparison plan</Title>
                <TextInput
                  label="Website URL"
                  placeholder="https://example.com/pricing"
                  value={rawUrl}
                  onChange={(event) => {
                    setRawUrl(event.currentTarget.value);
                    setCopied(null);
                    markStarted("url");
                  }}
                />
                <TextInput
                  label="Page name"
                  placeholder="Pricing page, checkout, dashboard..."
                  value={pageName}
                  onChange={(event) => {
                    setPageName(event.currentTarget.value);
                    setCopied(null);
                    markStarted("page_name");
                  }}
                />
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
                  <TextInput
                    label="Baseline label"
                    value={baselineLabel}
                    onChange={(event) => {
                      setBaselineLabel(event.currentTarget.value);
                      setCopied(null);
                      markStarted("baseline");
                    }}
                  />
                  <TextInput
                    label="Candidate label"
                    value={candidateLabel}
                    onChange={(event) => {
                      setCandidateLabel(event.currentTarget.value);
                      setCopied(null);
                      markStarted("candidate");
                    }}
                  />
                </SimpleGrid>
                <Select
                  label="Page type"
                  value={pageType}
                  data={pageTypes.map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                  onChange={(value) => {
                    setPageType(value || "marketing");
                    setCopied(null);
                    markStarted("page_type");
                  }}
                />
                <Select
                  label="Visual diff tolerance"
                  value={tolerance}
                  data={toleranceProfiles.map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                  onChange={(value) => {
                    setTolerance(value || "balanced");
                    setCopied(null);
                    markStarted("tolerance");
                  }}
                />
                <Stack spacing={8}>
                  <Text size="sm" weight={500}>
                    Viewports
                  </Text>
                  {viewportTargets.map((target) => {
                    const active = selectedTargets.includes(target.slug);
                    return (
                      <button
                        key={target.slug}
                        type="button"
                        className={`${classes.optionButton} ${
                          active ? classes.optionButtonActive : ""
                        }`}
                        onClick={() => toggleTarget(target.slug)}
                      >
                        <Group position="apart" spacing="sm" noWrap>
                          <Box>
                            <Text size="sm" weight={700}>
                              {target.label}
                            </Text>
                            <Text size="xs" color="dimmed">
                              {target.width}x{target.height} - {target.note}
                            </Text>
                          </Box>
                          {active ? <FaCheckCircle color="#f59f00" /> : null}
                        </Group>
                      </button>
                    );
                  })}
                </Stack>
                <Stack spacing={8}>
                  <Text size="sm" weight={500}>
                    Page states
                  </Text>
                  {pageStateOptions.map((state) => {
                    const active = selectedStates.includes(state.slug);
                    return (
                      <button
                        key={state.slug}
                        type="button"
                        className={`${classes.optionButton} ${
                          active ? classes.optionButtonActive : ""
                        }`}
                        onClick={() => toggleState(state.slug)}
                      >
                        <Group position="apart" spacing="sm" noWrap>
                          <Box>
                            <Text size="sm" weight={700}>
                              {state.label}
                            </Text>
                            <Text size="xs" color="dimmed">
                              {state.detail}
                            </Text>
                          </Box>
                          {active ? <FaCheckCircle color="#f59f00" /> : null}
                        </Group>
                      </button>
                    );
                  })}
                </Stack>
                <Textarea
                  label="Mask or ignore notes"
                  placeholder="#cookie-banner, .timestamp, [data-testid='live-chart']..."
                  minRows={3}
                  value={maskNotes}
                  onChange={(event) => {
                    setMaskNotes(event.currentTarget.value);
                    setCopied(null);
                    markStarted("mask_notes");
                  }}
                />
                <Button
                  leftIcon={<FaSyncAlt />}
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "teal", to: "orange" }}
                  onClick={generateChecklist}
                >
                  Generate checklist
                </Button>
              </Stack>
            </Card>

            <Stack spacing="md">
              <SimpleGrid
                cols={4}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "xs", cols: 1 },
                ]}
              >
                {[
                  ["Pairs", String(report.pairs.length)],
                  ["Viewports", String(report.targets.length)],
                  ["States", String(report.states.length)],
                  ["Tolerance", report.tolerance.label],
                ].map(([label, value]) => (
                  <Box key={label} className={classes.metric}>
                    <Text size="xs" color="dimmed" transform="uppercase" weight={700}>
                      {label}
                    </Text>
                    <Text mt={10} size="lg" weight={800}>
                      {value}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>

              <Card className={classes.panel} p="lg">
                <Group position="apart" align="start" mb="md">
                  <Box>
                    <Title order={2}>Viewport pairs</Title>
                    <Text color="dimmed">
                      Each row is one baseline, candidate, and diff artifact for the same state.
                    </Text>
                  </Box>
                  <Group spacing="xs">
                    <Button variant="light" radius={8} leftIcon={<FaCopy />} onClick={copyReport}>
                      {copied === "report" ? "Copied" : "Copy report"}
                    </Button>
                    <Button
                      variant="outline"
                      radius={8}
                      leftIcon={<FaDownload />}
                      onClick={exportChecklist}
                    >
                      Export
                    </Button>
                  </Group>
                </Group>

                <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                  {report.pairs.slice(0, 8).map((pair) => (
                    <Card key={pair.key} className={classes.pairCard} p="md">
                      <Group spacing="xs">
                        <FaImage color="#099268" />
                        <Title order={3}>
                          {pair.stateLabel} - {pair.label}
                        </Title>
                      </Group>
                      <Text size="sm" color="dimmed" mt={4}>
                        {pair.size}
                      </Text>
                      <Stack spacing={8} mt="sm">
                        <Box className={classes.pairFile}>{pair.baselineName}</Box>
                        <Box className={classes.pairFile}>{pair.candidateName}</Box>
                        <Box className={classes.pairFile}>{pair.diffName}</Box>
                      </Stack>
                    </Card>
                  ))}
                </SimpleGrid>
                {report.pairs.length > 8 ? (
                  <Text mt="sm" color="dimmed">
                    Plus {report.pairs.length - 8} more pairs in the markdown export.
                  </Text>
                ) : null}
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>Visual diff tolerance notes</Title>
                <Text color="dimmed" mb="md">
                  Use these notes to decide whether a visual diff is release-blocking or expected
                  noise.
                </Text>
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                  {report.toleranceNotes.map((note) => (
                    <Group key={note} spacing="sm" align="flex-start" noWrap>
                      <Box mt={4} c="teal.6">
                        <FaCheckCircle />
                      </Box>
                      <Text color="gray.7">{note}</Text>
                    </Group>
                  ))}
                </SimpleGrid>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>Page-state checklist</Title>
                <Text color="dimmed" mb="md">
                  Capture the same state in the baseline and candidate runs before comparing.
                </Text>
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                  {report.stateChecklist.map((item) => (
                    <Group key={item} spacing="sm" align="flex-start" noWrap>
                      <Box mt={4} c="orange.6">
                        <FaClipboardList />
                      </Box>
                      <Text color="gray.7">{item}</Text>
                    </Group>
                  ))}
                </SimpleGrid>
              </Card>
            </Stack>
          </Box>

          <Card className={classes.panel} p="lg" mt={24}>
            <Title order={2}>Regression triage table</Title>
            <Text color="dimmed" mb="md">
              Sort the diff by user impact before spending time on pixel-level investigation.
            </Text>
            <Box className={classes.tableWrap}>
              <Table className={classes.triageTable} striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Diff signal</th>
                    <th>Likely cause</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {report.triageRows.map((row) => (
                    <tr key={row.severity}>
                      <td>
                        <Text weight={800}>{row.severity}</Text>
                      </td>
                      <td>{row.signal}</td>
                      <td>{row.likelyCause}</td>
                      <td>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
          </Card>

          <SimpleGrid mt={24} cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
            <Card className={classes.panel} p="lg">
              <Group position="apart" align="start" mb="md">
                <Box>
                  <Title order={2}>Playwright capture prompt</Title>
                  <Text color="dimmed">
                    Paste this into your automation task to produce matching captures.
                  </Text>
                </Box>
                <Button
                  variant="light"
                  radius={8}
                  leftIcon={<FaCopy />}
                  onClick={copyCapturePrompt}
                >
                  {copied === "capture" ? "Copied" : "Copy"}
                </Button>
              </Group>
              <Box component="pre" className={classes.code}>
                {report.capturePrompt}
              </Box>
            </Card>

            <Card className={classes.panel} p="lg">
              <Group position="apart" align="start" mb="md">
                <Box>
                  <Title order={2}>Diff review prompt</Title>
                  <Text color="dimmed">
                    Use this when you want a structured pass/fail triage from diff artifacts.
                  </Text>
                </Box>
                <Button variant="light" radius={8} leftIcon={<FaCopy />} onClick={copyReviewPrompt}>
                  {copied === "review" ? "Copied" : "Copy"}
                </Button>
              </Group>
              <Box component="pre" className={classes.code}>
                {report.reviewPrompt}
              </Box>
            </Card>
          </SimpleGrid>

          <Card className={classes.panel} p="lg" mt={24}>
            <Title order={2}>Markdown export</Title>
            <Text color="dimmed" mb="md">
              Paste this into a PR, release issue, QA ticket, or visual regression runbook.
            </Text>
            <Box component="pre" className={classes.code}>
              {report.markdown}
            </Box>
          </Card>

          <Box mt={28} className={classes.linkBand}>
            <Group position="apart" align="center">
              <Box>
                <Title order={2}>Need to compare the real page across devices?</Title>
                <Text mt={8} color="gray.7">
                  Use this checklist to plan the run. Use Sizzy when you need synchronized devices,
                  screenshots, debug tools, and repeatable responsive QA in one workspace.
                </Text>
                <Anchor mt={10} href="/tools/responsive-screenshot-generator">
                  Generate screenshot batch
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-qa-checklist">
                  Build QA checklist
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/viewport-checker">
                  Check viewport sizes
                </Anchor>
              </Box>
              <Button
                component="a"
                href="https://portal.sizzy.co/pricing"
                target="_blank"
                rel="noopener noreferrer"
                radius={8}
                size="lg"
                rightIcon={<FaExternalLinkAlt />}
                onClick={(event) => {
                  captureSizzyEvent("cta_clicked", {
                    tool_slug: "screenshot-comparison-checklist",
                    cta: "try_sizzy",
                    location: "screenshot_comparison_checklist",
                    target_url: "https://portal.sizzy.co/pricing",
                  });
                  event.currentTarget.href = trackOutboundClick(
                    "https://portal.sizzy.co/pricing",
                    "Screenshot comparison checklist CTA",
                    "screenshot_comparison_checklist"
                  );
                }}
              >
                Try Sizzy
              </Button>
            </Group>
          </Box>

          <SimpleGrid mt={28} cols={3} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
            {faq.map((item) => (
              <Card key={item.question} className={classes.faqCard} p="lg">
                <Group spacing="xs">
                  <FaMobileAlt color="#099268" />
                  <Title order={3}>{item.question}</Title>
                </Group>
                <Divider my="sm" />
                <Text color="gray.7">{item.answer}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </main>
    </Shell>
  );
};

export default ScreenshotComparisonChecklistPage;
