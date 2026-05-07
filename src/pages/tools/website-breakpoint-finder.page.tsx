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
  Text,
  Textarea,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import MetaTags from "components/MetaTags";
import Shell from "components/Shell";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import {
  FaCheckCircle,
  FaCopy,
  FaDownload,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaRulerCombined,
  FaSyncAlt,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";

type PageType = {
  value: string;
  label: string;
  baseBreakpoints: number[];
  focus: string;
};

type TargetDevice = {
  slug: string;
  label: string;
  width: number;
  height: number;
  note: string;
};

type Breakpoint = {
  width: number;
  label: string;
  reason: string;
};

type BreakpointReport = {
  pageLabel: string;
  pageType: PageType;
  targets: TargetDevice[];
  breakpoints: Breakpoint[];
  qaViewports: string[];
  cssNotes: string;
  testPlan: string[];
  markdown: string;
};

const pageTypes: PageType[] = [
  {
    value: "marketing",
    label: "Marketing page",
    baseBreakpoints: [360, 480, 768, 1024, 1280, 1440],
    focus: "hero copy, nav collapse, proof grids, pricing cards, and CTA density",
  },
  {
    value: "saas",
    label: "SaaS app screen",
    baseBreakpoints: [360, 640, 768, 1024, 1180, 1366, 1536],
    focus: "sidebar collapse, dense panels, tables, modals, and toolbar overflow",
  },
  {
    value: "checkout",
    label: "Checkout flow",
    baseBreakpoints: [360, 430, 768, 960, 1024, 1280],
    focus: "form steps, payment UI, sticky totals, trust copy, and keyboard states",
  },
  {
    value: "content",
    label: "Article or docs page",
    baseBreakpoints: [360, 640, 768, 900, 1024, 1280],
    focus: "reading width, table of contents, code blocks, embeds, and media crops",
  },
  {
    value: "ecommerce",
    label: "Ecommerce page",
    baseBreakpoints: [360, 430, 640, 768, 1024, 1280, 1440],
    focus: "gallery layout, filters, variants, buy box, reviews, and cart CTAs",
  },
  {
    value: "dashboard",
    label: "Dashboard",
    baseBreakpoints: [360, 640, 820, 1024, 1200, 1366, 1536],
    focus: "charts, data grids, side nav, action bars, empty states, and scroll containers",
  },
];

const targetDevices: TargetDevice[] = [
  { slug: "small-mobile", label: "Small mobile", width: 360, height: 740, note: "Narrow phones" },
  { slug: "iphone", label: "iPhone", width: 393, height: 852, note: "Modern iPhone portrait" },
  { slug: "large-phone", label: "Large phone", width: 430, height: 932, note: "Large mobile" },
  { slug: "tablet", label: "Tablet", width: 820, height: 1180, note: "Tablet portrait" },
  {
    slug: "tablet-landscape",
    label: "Tablet landscape",
    width: 1024,
    height: 768,
    note: "iPad landscape",
  },
  { slug: "laptop", label: "Laptop", width: 1366, height: 768, note: "Common desktop" },
  { slug: "desktop", label: "Desktop", width: 1440, height: 900, note: "Desktop design review" },
  {
    slug: "wide",
    label: "Wide desktop",
    width: 1920,
    height: 1080,
    note: "Wide monitor sanity pass",
  },
];

const defaultTargets = ["small-mobile", "iphone", "tablet", "laptop", "wide"];

const faq = [
  {
    question: "What is a website breakpoint finder?",
    answer:
      "It turns page notes and target devices into likely responsive breakpoints, CSS media-query notes, QA viewport sizes, and a focused test plan.",
  },
  {
    question: "Should I use every generated breakpoint in CSS?",
    answer:
      "No. Treat the list as a planning guide. Add CSS breakpoints only where the layout actually needs a different rule.",
  },
  {
    question: "How should I test responsive breakpoints?",
    answer:
      "Test each breakpoint just below, at, and just above the target width, then compare the real page across synchronized mobile, tablet, and desktop viewports.",
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
    background: "linear-gradient(180deg, #eefaf8 0%, #ffffff 44%, #fff7ec 100%)",
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
    borderColor: "rgba(9, 146, 104, 0.44)",
    background: "rgba(9, 146, 104, 0.09)",
  },
  metric: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    padding: 18,
    minHeight: 112,
  },
  breakpointCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
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
  linkBand: {
    borderRadius: 8,
    border: "1px solid rgba(9, 146, 104, 0.18)",
    background:
      "linear-gradient(135deg, rgba(9, 146, 104, 0.12), rgba(22, 163, 184, 0.10), rgba(245, 159, 0, 0.10))",
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

const hasKeyword = (notes: string, keywords: string[]) => {
  const lower = notes.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
};

const uniqueSorted = (items: number[]) =>
  Array.from(new Set(items.filter((item) => item > 0))).sort((a, b) => a - b);

const getTargets = (selectedSlugs: string[]) => {
  const selected = targetDevices.filter((target) => selectedSlugs.includes(target.slug));
  return selected.length ? selected.sort((a, b) => a.width - b.width) : targetDevices.slice(0, 5);
};

const parseCustomWidths = (value: string) =>
  uniqueSorted(
    value
      .split(/[,\n]/)
      .map((item) => Number(item.match(/\d+/)?.[0] || 0))
      .filter(Boolean)
  );

const labelBreakpoint = (width: number) => {
  if (width < 480) return "phone foundation";
  if (width < 768) return "large-phone adjustment";
  if (width < 1024) return "tablet entry";
  if (width < 1280) return "desktop transition";
  if (width < 1536) return "desktop layout";
  return "wide-screen guardrail";
};

const reasonForWidth = (width: number, pageType: PageType, notes: string) => {
  const reasons = [`${pageType.label} ${labelBreakpoint(width)}`];

  if (width <= 480 && hasKeyword(notes, ["nav", "menu", "header"])) {
    reasons.push("navigation likely needs a collapsed state");
  }

  if (width >= 640 && width <= 900 && hasKeyword(notes, ["card", "grid", "gallery", "pricing"])) {
    reasons.push("card and grid columns often change here");
  }

  if (width >= 768 && hasKeyword(notes, ["sidebar", "toc", "filter", "panel"])) {
    reasons.push("sidebars and filters usually move from stacked to adjacent");
  }

  if (width >= 960 && hasKeyword(notes, ["table", "chart", "dashboard", "toolbar"])) {
    reasons.push("dense data needs a desktop-first sanity check");
  }

  if (hasKeyword(notes, ["checkout", "form", "payment", "signup"]) && width <= 1024) {
    reasons.push("forms and sticky summaries need keyboard and overflow checks");
  }

  if (hasKeyword(notes, ["hero", "image", "video", "media"]) && width >= 1024) {
    reasons.push("media crops and first-fold composition change on larger screens");
  }

  return reasons.join("; ");
};

const buildReport = (
  pageTypeValue: string,
  selectedSlugs: string[],
  customWidths: string,
  pageName: string,
  layoutNotes: string
): BreakpointReport => {
  const pageType = getPageType(pageTypeValue);
  const targets = getTargets(selectedSlugs);
  const custom = parseCustomWidths(customWidths);
  const targetWidths = targets.map((target) => target.width);
  const inferred = [
    ...pageType.baseBreakpoints,
    ...targetWidths,
    ...custom,
    hasKeyword(layoutNotes, ["nav", "menu", "header"]) ? 480 : 0,
    hasKeyword(layoutNotes, ["card", "grid", "pricing", "gallery"]) ? 640 : 0,
    hasKeyword(layoutNotes, ["sidebar", "filter", "toc", "panel"]) ? 1024 : 0,
    hasKeyword(layoutNotes, ["table", "chart", "dashboard", "toolbar"]) ? 1200 : 0,
    hasKeyword(layoutNotes, ["wide", "canvas", "editor"]) ? 1536 : 0,
  ];
  const widths = uniqueSorted(inferred).filter((width) => width >= 320 && width <= 1920);
  const breakpoints = widths.map((width) => ({
    width,
    label: labelBreakpoint(width),
    reason: reasonForWidth(width, pageType, layoutNotes),
  }));
  const qaViewports = uniqueSorted(
    breakpoints.flatMap((breakpoint) => [
      breakpoint.width - 1,
      breakpoint.width,
      breakpoint.width + 1,
    ])
  )
    .filter((width) => width >= 320 && width <= 1920)
    .map((width) => `${width}px`);
  const pageLabel = pageName.trim() || "Target page";
  const cssNotes = [
    "/* Mobile-first breakpoint notes. Keep only the rules that fix real layout changes. */",
    ...breakpoints.map(
      (breakpoint) =>
        `@media (min-width: ${breakpoint.width}px) {\n  /* ${breakpoint.label}: ${breakpoint.reason} */\n}`
    ),
  ].join("\n\n");
  const testPlan = [
    `Start with ${
      targets[0]?.width || 360
    }px and verify the core ${pageType.label.toLowerCase()} flow before widening the viewport.`,
    `Test ${qaViewports
      .slice(0, 12)
      .join(", ")} to catch off-by-one layout jumps around generated breakpoints.`,
    `Check ${pageType.focus}.`,
    "Open navigation, forms, modals, sticky bars, consent UI, chat widgets, and long-content states at the smallest phone, tablet, laptop, and wide desktop targets.",
    "Capture before/after screenshots for the selected devices and compare first fold, scroll depth, tap targets, and horizontal overflow.",
    "Remove any breakpoint that does not change the layout or prevent a real bug.",
  ];
  const markdown = [
    "# Website Breakpoint Report",
    "",
    `- Page: ${pageLabel}`,
    `- Page type: ${pageType.label}`,
    `- Target devices: ${targets
      .map((target) => `${target.label} (${target.width}x${target.height})`)
      .join(", ")}`,
    layoutNotes.trim() ? `- Layout notes: ${layoutNotes.trim()}` : "",
    "",
    "## Likely Breakpoints",
    ...breakpoints.map(
      (breakpoint) => `- ${breakpoint.width}px: ${breakpoint.label} - ${breakpoint.reason}`
    ),
    "",
    "## QA Viewport Sizes",
    qaViewports.join(", "),
    "",
    "## CSS Media Query Notes",
    "",
    "```css",
    cssNotes,
    "```",
    "",
    "## Responsive Test Plan",
    ...testPlan.map((item) => `- [ ] ${item}`),
  ]
    .filter(Boolean)
    .join("\n");

  return { pageLabel, pageType, targets, breakpoints, qaViewports, cssNotes, testPlan, markdown };
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

const WebsiteBreakpointFinderPage = () => {
  const { classes } = useStyles();
  const [pageType, setPageType] = useState("marketing");
  const [pageName, setPageName] = useState("");
  const [layoutNotes, setLayoutNotes] = useState(
    "Hero, nav, pricing cards, FAQ, sticky CTA, screenshots"
  );
  const [customWidths, setCustomWidths] = useState("");
  const [selectedTargets, setSelectedTargets] = useState<string[]>(defaultTargets);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState<"report" | "css" | null>(null);

  const report = useMemo(
    () => buildReport(pageType, selectedTargets, customWidths, pageName, layoutNotes),
    [customWidths, layoutNotes, pageName, pageType, selectedTargets]
  );
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Website Breakpoint Finder",
    gradientColors: ["#099268", "#16a3b8", "#f59f00"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  const markStarted = (field: string) => {
    if (!started) {
      captureSizzyEvent("tool_started", {
        tool_slug: "website-breakpoint-finder",
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
    markStarted("target_devices");
  };

  const generateReport = () => {
    setCopied(null);
    captureSizzyEvent("tool_completed", {
      tool_slug: "website-breakpoint-finder",
      page_type: pageType,
      breakpoint_count: report.breakpoints.length,
      target_count: report.targets.length,
    });
  };

  const copyReport = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.markdown);
    }
    setCopied("report");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "website-breakpoint-finder",
      copy_type: "markdown_report",
      breakpoint_count: report.breakpoints.length,
    });
  };

  const copyCss = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.cssNotes);
    }
    setCopied("css");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "website-breakpoint-finder",
      copy_type: "css_notes",
      breakpoint_count: report.breakpoints.length,
    });
  };

  const exportReport = () => {
    downloadText("website-breakpoint-report.md", report.markdown);
    captureSizzyEvent("export_clicked", {
      tool_slug: "website-breakpoint-finder",
      breakpoint_count: report.breakpoints.length,
    });
  };

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Website Breakpoint Finder - Sizzy"
        description="Generate likely responsive breakpoints, QA viewport sizes, CSS media-query notes, and a test plan from page layout notes and target devices."
        url="https://sizzy.co/tools/website-breakpoint-finder"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/tools/website-breakpoint-finder" />
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
                leftSection={<FaRulerCombined />}
              >
                Free responsive design tool
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Website Breakpoint Finder
              </Title>
              <Text className={classes.heroCopy}>
                Describe the page, choose target devices, and get likely responsive breakpoints, QA
                viewport sizes, CSS media-query notes, and a practical test plan.
              </Text>
              <Group spacing="sm">
                <Anchor href="/tools/viewport-checker">Viewport checker</Anchor>
                <Anchor href="/tools/responsive-screenshot-generator">Screenshot generator</Anchor>
                <Anchor href="/tools/responsive-qa-checklist">QA checklist</Anchor>
                <Anchor href="/blog/responsive-viewport-sizes">Viewport sizes guide</Anchor>
                <Anchor href="/features/responsive-mode">Responsive mode</Anchor>
                <Anchor href="/features/device-simulation">Device simulation</Anchor>
              </Group>
            </Stack>

            <Box className={classes.miniPanel}>
              <Text size="sm" color="dimmed" transform="uppercase" weight={700}>
                Current breakpoint plan
              </Text>
              <Title order={3} mt={8}>
                {report.breakpoints.length} breakpoints
              </Title>
              <Text color="dimmed" mt={6}>
                {report.targets.length} devices - {report.qaViewports.length} QA widths
              </Text>
            </Box>
          </Box>

          <Box className={classes.toolGrid}>
            <Card className={classes.panel} p="lg">
              <Stack spacing="md">
                <Title order={2}>Find breakpoints</Title>
                <TextInput
                  label="Page or URL"
                  placeholder="Pricing page, checkout, /dashboard..."
                  value={pageName}
                  onChange={(event) => {
                    setPageName(event.currentTarget.value);
                    setCopied(null);
                    markStarted("page_name");
                  }}
                />
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
                <Textarea
                  label="Layout notes"
                  minRows={4}
                  placeholder="Hero, sticky nav, pricing grid, filters, tables, forms..."
                  value={layoutNotes}
                  onChange={(event) => {
                    setLayoutNotes(event.currentTarget.value);
                    setCopied(null);
                    markStarted("layout_notes");
                  }}
                />
                <TextInput
                  label="Known CSS widths"
                  placeholder="390, 768, 1180, 1440"
                  value={customWidths}
                  onChange={(event) => {
                    setCustomWidths(event.currentTarget.value);
                    setCopied(null);
                    markStarted("custom_widths");
                  }}
                />
                <Stack spacing={8}>
                  <Text size="sm" weight={500}>
                    Target devices
                  </Text>
                  {targetDevices.map((target) => {
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
                          {active ? <FaCheckCircle color="#099268" /> : null}
                        </Group>
                      </button>
                    );
                  })}
                </Stack>
                <Button
                  leftIcon={<FaSyncAlt />}
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "teal", to: "yellow" }}
                  onClick={generateReport}
                >
                  Generate breakpoints
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
                  ["Page type", report.pageType.label],
                  ["Targets", String(report.targets.length)],
                  ["Breakpoints", String(report.breakpoints.length)],
                  ["QA widths", String(report.qaViewports.length)],
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
                    <Title order={2}>Likely responsive breakpoints</Title>
                    <Text color="dimmed">
                      Use these as decision points, then keep only the widths that fix real layout
                      changes.
                    </Text>
                  </Box>
                  <Group spacing="xs">
                    <Button variant="light" radius={8} leftIcon={<FaCopy />} onClick={copyReport}>
                      {copied === "report" ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="subtle" radius={8} leftIcon={<FaCopy />} onClick={copyCss}>
                      {copied === "css" ? "Copied" : "Copy CSS"}
                    </Button>
                    <Button
                      variant="outline"
                      radius={8}
                      leftIcon={<FaDownload />}
                      onClick={exportReport}
                    >
                      Export
                    </Button>
                  </Group>
                </Group>

                <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                  {report.breakpoints.map((breakpoint) => (
                    <Card key={breakpoint.width} className={classes.breakpointCard} p="md">
                      <Group spacing="xs">
                        <FaRulerCombined color="#099268" />
                        <Title order={3}>{breakpoint.width}px</Title>
                      </Group>
                      <Text mt={6} weight={700}>
                        {breakpoint.label}
                      </Text>
                      <Divider my="sm" />
                      <Text color="gray.7">{breakpoint.reason}</Text>
                    </Card>
                  ))}
                </SimpleGrid>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>QA viewport sizes</Title>
                <Text color="dimmed" mb="md">
                  Test just below, at, and just above each generated breakpoint.
                </Text>
                <Group spacing="xs">
                  {report.qaViewports.map((viewport) => (
                    <Badge key={viewport} radius={8} color="teal" variant="light">
                      {viewport}
                    </Badge>
                  ))}
                </Group>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>CSS media-query notes</Title>
                <Text color="dimmed" mb="md">
                  Paste into a scratch file before turning the final decisions into production CSS.
                </Text>
                <Box component="pre" className={classes.code}>
                  {report.cssNotes}
                </Box>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>Responsive test plan</Title>
                <Stack mt="md" spacing="xs">
                  {report.testPlan.map((item) => (
                    <Group key={item} spacing="sm" align="flex-start" noWrap>
                      <Box mt={4} c="teal.6">
                        <FaCheckCircle />
                      </Box>
                      <Text color="gray.7">{item}</Text>
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Box>

          <Box mt={28} className={classes.linkBand}>
            <Group position="apart" align="center">
              <Box>
                <Title order={2}>Need to verify the real page after planning breakpoints?</Title>
                <Text mt={8} color="gray.7">
                  Use this finder to plan the widths. Use Sizzy when you need synchronized devices,
                  screenshots, responsive debugging, and repeatable viewport checks.
                </Text>
                <Anchor mt={10} href="/tools/viewport-checker">
                  Check one viewport
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-screenshot-generator">
                  Generate screenshot batch
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-qa-checklist">
                  Build QA checklist
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
                    tool_slug: "website-breakpoint-finder",
                    cta: "try_sizzy",
                    location: "website_breakpoint_finder",
                    target_url: "https://portal.sizzy.co/pricing",
                  });
                  event.currentTarget.href = trackOutboundClick(
                    "https://portal.sizzy.co/pricing",
                    "Website breakpoint finder CTA",
                    "website_breakpoint_finder"
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
                  <FaMobileAlt color="#16a3b8" />
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

export default WebsiteBreakpointFinderPage;
