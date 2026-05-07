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
  FaClipboardCheck,
  FaCopy,
  FaDownload,
  FaExternalLinkAlt,
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

type Target = {
  slug: string;
  label: string;
  width: number;
  note: string;
};

type RiskArea = {
  slug: string;
  label: string;
  description: string;
};

type ChecklistGroup = {
  title: string;
  items: string[];
};

type ChecklistReport = {
  targets: Target[];
  riskAreas: RiskArea[];
  groups: ChecklistGroup[];
  markdown: string;
  itemCount: number;
};

const pageTypes: PageType[] = [
  {
    value: "marketing",
    label: "Marketing page",
    focus: "first fold, navigation, proof sections, and CTAs",
  },
  {
    value: "saas",
    label: "SaaS app screen",
    focus: "dense panels, sidebars, tables, and empty states",
  },
  {
    value: "checkout",
    label: "Checkout flow",
    focus: "forms, validation, payment UI, and sticky order summary",
  },
  {
    value: "signup",
    label: "Signup/login flow",
    focus: "auth forms, keyboard input, errors, and redirects",
  },
  {
    value: "content",
    label: "Article/docs page",
    focus: "reading width, media embeds, table of contents, and code blocks",
  },
  {
    value: "ecommerce",
    label: "Ecommerce page",
    focus: "product media, filters, variants, cart CTAs, and reviews",
  },
];

const deviceTargets: Target[] = [
  { slug: "small-mobile", label: "Small mobile", width: 360, note: "Narrow Android/iPhone SE" },
  { slug: "iphone", label: "iPhone", width: 393, note: "Modern iPhone portrait" },
  { slug: "large-mobile", label: "Large mobile", width: 430, note: "Large phone portrait" },
  { slug: "tablet", label: "Tablet", width: 820, note: "iPad portrait/tablet layout" },
  { slug: "laptop", label: "Laptop", width: 1366, note: "Common desktop viewport" },
  { slug: "wide-desktop", label: "Wide desktop", width: 1920, note: "Wide monitor sanity pass" },
];

const defaultTargets = ["small-mobile", "iphone", "tablet", "laptop", "wide-desktop"];

const riskAreaOptions: RiskArea[] = [
  {
    slug: "navigation",
    label: "Navigation",
    description: "menus, tabs, breadcrumbs, and headers",
  },
  {
    slug: "forms",
    label: "Forms",
    description: "inputs, validation, autofill, and keyboards",
  },
  {
    slug: "media",
    label: "Media",
    description: "images, videos, embeds, and responsive crops",
  },
  {
    slug: "sticky-ui",
    label: "Sticky UI",
    description: "headers, banners, cookie notices, and chat widgets",
  },
  {
    slug: "tables",
    label: "Tables",
    description: "grids, cards, charts, and dense data",
  },
  {
    slug: "performance",
    label: "Performance",
    description: "LCP, CLS, heavy scripts, and slow networks",
  },
  {
    slug: "accessibility",
    label: "Accessibility",
    description: "keyboard, zoom, focus, and screen reader basics",
  },
  {
    slug: "checkout",
    label: "Checkout",
    description: "payment steps, totals, promo codes, and trust copy",
  },
];

const defaultRiskAreas = [
  "navigation",
  "forms",
  "media",
  "sticky-ui",
  "performance",
  "accessibility",
];

const faq = [
  {
    question: "What is a responsive QA checklist?",
    answer:
      "It is a repeatable set of layout, media, form, performance, and accessibility checks for the viewport sizes where responsive bugs usually appear.",
  },
  {
    question: "Which devices should I include?",
    answer:
      "Start with small mobile, large mobile, tablet, laptop, and wide desktop. Add custom widths around the breakpoints used by your CSS.",
  },
  {
    question: "Is this a replacement for testing in Sizzy?",
    answer:
      "No. Use this page to plan the pass and export the checklist. Use Sizzy when you need to run the real site across synchronized devices.",
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
    background: "linear-gradient(180deg, #fff7ec 0%, #ffffff 44%, #effcff 100%)",
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
    border: "1px solid rgba(245, 159, 0, 0.26)",
    background: "rgba(245, 159, 0, 0.10)",
    color: theme.colors.orange[8],
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
    maxWidth: 840,
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
    maxWidth: 740,
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
      borderColor: "rgba(22, 163, 184, 0.36)",
      background: "rgba(22, 163, 184, 0.05)",
    },
  },
  optionButtonActive: {
    borderColor: "rgba(245, 159, 0, 0.44)",
    background: "rgba(245, 159, 0, 0.09)",
  },
  metric: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    padding: 18,
    minHeight: 112,
  },
  checklistCard: {
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
    border: "1px solid rgba(245, 159, 0, 0.18)",
    background:
      "linear-gradient(135deg, rgba(245, 159, 0, 0.12), rgba(22, 163, 184, 0.10), rgba(102, 44, 185, 0.08))",
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

const hasRisk = (riskSlugs: string[], slug: string) => riskSlugs.includes(slug);

const parseCustomTargets = (value: string): Target[] => {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const width = Number(item.match(/\d+/)?.[0] || 0);
      if (!width) return null;
      return {
        slug: `custom-${width}`,
        label: `Custom ${width}px`,
        width,
        note: item.replace(/\d+/, "").trim() || "Custom breakpoint",
      };
    })
    .filter((item): item is Target => Boolean(item));
};

const getTargets = (selectedSlugs: string[], customBreakpoints: string) => {
  const selected = deviceTargets.filter((target) => selectedSlugs.includes(target.slug));
  const custom = parseCustomTargets(customBreakpoints);
  const byWidth = new Map<number, Target>();

  [...selected, ...custom].forEach((target) => {
    byWidth.set(target.width, target);
  });

  return Array.from(byWidth.values()).sort((a, b) => a.width - b.width);
};

const getTargetSummary = (targets: Target[]) =>
  targets.map((target) => `${target.label} (${target.width}px)`).join(", ");

const buildChecklist = (
  pageTypeValue: string,
  selectedSlugs: string[],
  customBreakpoints: string,
  riskSlugs: string[],
  pageName: string
): ChecklistReport => {
  const pageType = getPageType(pageTypeValue);
  const targets = getTargets(selectedSlugs, customBreakpoints);
  const riskAreas = riskAreaOptions.filter((risk) => riskSlugs.includes(risk.slug));
  const targetSummary = getTargetSummary(targets);
  const smallestTarget = targets[0] || deviceTargets[0];
  const largestTarget = targets[targets.length - 1] || deviceTargets[deviceTargets.length - 1];
  const pageLabel = pageName.trim() || "Target page";

  const layoutItems = [
    `Run the page at ${targetSummary} before approving the responsive pass.`,
    `Check the first fold at ${smallestTarget.width}px and ${largestTarget.width}px for clipped headings, hidden CTAs, and awkward blank space.`,
    "Scan for horizontal scrolling in headers, card grids, modals, sidebars, code blocks, and tables.",
    `Confirm the ${pageType.label.toLowerCase()} layout supports ${pageType.focus}.`,
    "Compare loading, empty, error, and long-content states at the smallest selected width.",
  ];

  if (hasRisk(riskSlugs, "navigation")) {
    layoutItems.push(
      "Open every nav menu, dropdown, tab set, and breadcrumb trail at mobile and tablet widths."
    );
  }

  if (hasRisk(riskSlugs, "sticky-ui")) {
    layoutItems.push(
      "Verify sticky headers, promo bars, cookie notices, chat widgets, and bottom CTAs never cover primary actions."
    );
  }

  if (hasRisk(riskSlugs, "tables") || pageType.value === "saas") {
    layoutItems.push(
      "Check dense grids and data tables for column priority, readable truncation, and usable horizontal scroll."
    );
  }

  if (pageType.value === "checkout" || hasRisk(riskSlugs, "checkout")) {
    layoutItems.push(
      "Confirm order summaries, payment steps, totals, and trust copy stay visible without blocking the buy button."
    );
  }

  const mediaItems = [
    "Check hero, product, avatar, and logo crops at each selected width.",
    "Confirm responsive images use appropriate dimensions and do not stretch, blur, or jump after loading.",
    "Inspect video, iframe, map, chart, and social embeds for overflow and correct aspect ratio.",
    "Verify dark, transparent, and high-DPR assets remain legible against the page background.",
  ];

  if (hasRisk(riskSlugs, "media") || pageType.value === "ecommerce") {
    mediaItems.push(
      "Test galleries, carousels, lightboxes, and thumbnails with the longest realistic media set."
    );
  }

  if (pageType.value === "content") {
    mediaItems.push("Check code blocks, diagrams, tables, and inline images at mobile widths.");
  }

  const formItems = [
    "Check every visible input, select, checkbox, radio, date picker, and file upload at mobile width.",
    "Trigger validation errors, success states, disabled states, and server errors without resizing the viewport.",
    "Confirm labels, helper text, error messages, and required indicators remain connected to the right fields.",
    "Test autofill, password managers, numeric keyboards, and long pasted values where relevant.",
  ];

  if (pageType.value === "signup") {
    formItems.push(
      "Complete the auth flow with social login, magic link, password reset, and already-used email states."
    );
  }

  if (pageType.value === "checkout" || hasRisk(riskSlugs, "checkout")) {
    formItems.push(
      "Complete the checkout path with invalid card, promo code, tax/VAT, and address edge cases."
    );
  }

  if (
    !hasRisk(riskSlugs, "forms") &&
    pageType.value !== "checkout" &&
    pageType.value !== "signup"
  ) {
    formItems.push(
      "If the page has no forms, verify newsletter, search, chat, and embedded widgets do not introduce hidden form issues."
    );
  }

  const performanceItems = [
    "Run the smallest selected mobile width on a throttled network and watch for slow first render.",
    "Check cumulative layout shift when fonts, images, banners, embeds, and consent UI load.",
    "Confirm hidden desktop/mobile variants are not both loading expensive media or scripts.",
    "Test scroll, menu open, modal open, and carousel interactions for jank on mobile.",
  ];

  if (hasRisk(riskSlugs, "performance")) {
    performanceItems.push(
      "Record LCP, CLS, and total blocking time before and after the responsive changes."
    );
  }

  if (pageType.value === "saas") {
    performanceItems.push(
      "Load the busiest realistic dataset and verify tables, charts, and side panels remain responsive."
    );
  }

  const accessibilityItems = [
    "Tab through the page at mobile and desktop widths and confirm visible focus never disappears off-screen.",
    "Zoom to 200% and verify content reflows without horizontal scrolling or clipped controls.",
    "Check color contrast for text, icons, disabled states, badges, and overlay text on media.",
    "Verify touch targets are large enough on mobile and have enough spacing to avoid accidental taps.",
    "Confirm headings, landmarks, labels, alt text, and dialog focus order match the visual structure.",
  ];

  if (hasRisk(riskSlugs, "accessibility")) {
    accessibilityItems.push(
      "Run a screen reader smoke pass through navigation, primary content, forms, and dialogs."
    );
  }

  const groups = [
    { title: "Layout", items: layoutItems },
    { title: "Media", items: mediaItems },
    { title: "Forms", items: formItems },
    { title: "Performance", items: performanceItems },
    { title: "Accessibility", items: accessibilityItems },
  ];

  const itemCount = groups.reduce((count, group) => count + group.items.length, 0);
  const markdown = [
    "# Responsive QA Checklist",
    "",
    `- Page: ${pageLabel}`,
    `- Page type: ${pageType.label}`,
    `- Responsive targets: ${targetSummary}`,
    `- Risk areas: ${riskAreas.map((risk) => risk.label).join(", ") || "General responsive QA"}`,
    "",
    ...groups.flatMap((group) => [
      `## ${group.title}`,
      "",
      ...group.items.map((item) => `- [ ] ${item}`),
      "",
    ]),
  ].join("\n");

  return { targets, riskAreas, groups, markdown, itemCount };
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

const ResponsiveQaChecklistPage = () => {
  const { classes } = useStyles();
  const [pageType, setPageType] = useState("marketing");
  const [pageName, setPageName] = useState("");
  const [selectedTargets, setSelectedTargets] = useState<string[]>(defaultTargets);
  const [customBreakpoints, setCustomBreakpoints] = useState("");
  const [riskSlugs, setRiskSlugs] = useState<string[]>(defaultRiskAreas);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  const report = useMemo(
    () => buildChecklist(pageType, selectedTargets, customBreakpoints, riskSlugs, pageName),
    [customBreakpoints, pageName, pageType, riskSlugs, selectedTargets]
  );
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Responsive QA Checklist",
    gradientColors: ["#f59f00", "#16a3b8", "#662cb9"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  const markStarted = (field: string) => {
    if (!started) {
      captureSizzyEvent("tool_started", {
        tool_slug: "responsive-qa-checklist",
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
    setCopied(false);
    markStarted("targets");
  };

  const toggleRisk = (slug: string) => {
    const next = riskSlugs.includes(slug)
      ? riskSlugs.filter((item) => item !== slug)
      : [...riskSlugs, slug];
    setRiskSlugs(next);
    setCopied(false);
    markStarted("risk_areas");
  };

  const generateChecklist = () => {
    setCopied(false);
    captureSizzyEvent("tool_completed", {
      tool_slug: "responsive-qa-checklist",
      page_type: pageType,
      target_count: report.targets.length,
      risk_count: report.riskAreas.length,
      item_count: report.itemCount,
    });
  };

  const copyChecklist = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.markdown);
    }
    setCopied(true);
    captureSizzyEvent("copy_clicked", {
      tool_slug: "responsive-qa-checklist",
      copy_type: "markdown_checklist",
      item_count: report.itemCount,
    });
  };

  const exportChecklist = () => {
    downloadText("responsive-qa-checklist.md", report.markdown);
    captureSizzyEvent("export_clicked", {
      tool_slug: "responsive-qa-checklist",
      item_count: report.itemCount,
    });
  };

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Responsive QA Checklist Generator - Sizzy"
        description="Generate a responsive QA checklist for layout, media, forms, performance, and accessibility across key devices and breakpoints."
        url="https://sizzy.co/tools/responsive-qa-checklist"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/tools/responsive-qa-checklist" />
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
                leftSection={<FaClipboardCheck />}
              >
                Free responsive QA tool
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Responsive QA Checklist Generator
              </Title>
              <Text className={classes.heroCopy}>
                Pick the page type, devices, breakpoints, and risky areas. Get a copyable release
                checklist grouped by layout, media, forms, performance, and accessibility.
              </Text>
              <Group spacing="sm">
                <Anchor href="/tools/viewport-checker">Viewport checker</Anchor>
                <Anchor href="/tools/responsive-screenshot-generator">Screenshot generator</Anchor>
                <Anchor href="/tools/website-breakpoint-finder">Breakpoint finder</Anchor>
                <Anchor href="/blog/responsive-viewport-sizes">Viewport sizes guide</Anchor>
                <Anchor href="/features/responsive-mode">Responsive mode</Anchor>
              </Group>
            </Stack>

            <Box className={classes.miniPanel}>
              <Text size="sm" color="dimmed" transform="uppercase" weight={700}>
                Current checklist
              </Text>
              <Title order={3} mt={8}>
                {report.itemCount} checks
              </Title>
              <Text color="dimmed" mt={6}>
                {report.targets.length} targets - {report.riskAreas.length || "general"} risk areas
              </Text>
            </Box>
          </Box>

          <Box className={classes.toolGrid}>
            <Card className={classes.panel} p="lg">
              <Stack spacing="md">
                <Title order={2}>Build the checklist</Title>
                <TextInput
                  label="Page or URL"
                  placeholder="Pricing page, checkout, /dashboard..."
                  value={pageName}
                  onChange={(event) => {
                    setPageName(event.currentTarget.value);
                    setCopied(false);
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
                    setCopied(false);
                    markStarted("page_type");
                  }}
                />
                <Stack spacing={8}>
                  <Text size="sm" weight={500}>
                    Key devices and breakpoints
                  </Text>
                  {deviceTargets.map((target) => {
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
                              {target.width}px - {target.note}
                            </Text>
                          </Box>
                          {active ? <FaCheckCircle color="#f59f00" /> : null}
                        </Group>
                      </button>
                    );
                  })}
                </Stack>
                <TextInput
                  label="Custom breakpoints"
                  placeholder="390, 768, 1180, 1440"
                  value={customBreakpoints}
                  onChange={(event) => {
                    setCustomBreakpoints(event.currentTarget.value);
                    setCopied(false);
                    markStarted("custom_breakpoints");
                  }}
                />
                <Stack spacing={8}>
                  <Text size="sm" weight={500}>
                    Risk areas
                  </Text>
                  {riskAreaOptions.map((risk) => {
                    const active = riskSlugs.includes(risk.slug);
                    return (
                      <button
                        key={risk.slug}
                        type="button"
                        className={`${classes.optionButton} ${
                          active ? classes.optionButtonActive : ""
                        }`}
                        onClick={() => toggleRisk(risk.slug)}
                      >
                        <Group position="apart" spacing="sm" noWrap>
                          <Box>
                            <Text size="sm" weight={700}>
                              {risk.label}
                            </Text>
                            <Text size="xs" color="dimmed">
                              {risk.description}
                            </Text>
                          </Box>
                          {active ? <FaCheckCircle color="#f59f00" /> : null}
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
                  gradient={{ from: "orange", to: "cyan" }}
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
                  ["Page type", getPageType(pageType).label],
                  ["Targets", String(report.targets.length)],
                  ["Risk areas", String(report.riskAreas.length || "General")],
                  ["Checks", String(report.itemCount)],
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
                    <Title order={2}>Responsive QA checklist</Title>
                    <Text color="dimmed">
                      Grouped by the parts of a responsive release that usually break late.
                    </Text>
                  </Box>
                  <Group spacing="xs">
                    <Button
                      variant="light"
                      radius={8}
                      leftIcon={<FaCopy />}
                      onClick={copyChecklist}
                    >
                      {copied ? "Copied" : "Copy"}
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
                  {report.groups.map((group) => (
                    <Card key={group.title} className={classes.checklistCard} p="md">
                      <Title order={3}>{group.title}</Title>
                      <Divider my="sm" />
                      <Stack spacing="xs">
                        {group.items.map((item) => (
                          <Group key={item} spacing="sm" align="flex-start" noWrap>
                            <Box mt={4} c="teal.6">
                              <FaCheckCircle />
                            </Box>
                            <Text color="gray.7">{item}</Text>
                          </Group>
                        ))}
                      </Stack>
                    </Card>
                  ))}
                </SimpleGrid>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>Markdown export</Title>
                <Text color="dimmed" mb="md">
                  Paste this into a ticket, PR description, release checklist, or QA doc.
                </Text>
                <Box component="pre" className={classes.code}>
                  {report.markdown}
                </Box>
              </Card>
            </Stack>
          </Box>

          <Box mt={28} className={classes.linkBand}>
            <Group position="apart" align="center">
              <Box>
                <Title order={2}>Need to run the checklist against the real page?</Title>
                <Text mt={8} color="gray.7">
                  Use this generator for the QA plan. Use Sizzy when you need synchronized devices,
                  screenshots, responsive debugging, and repeatable browser checks.
                </Text>
                <Anchor mt={10} href="/tools/viewport-checker">
                  Check individual viewport sizes
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-screenshot-generator">
                  Generate screenshot batch
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/website-breakpoint-finder">
                  Find breakpoints
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
                    tool_slug: "responsive-qa-checklist",
                    cta: "try_sizzy",
                    location: "responsive_qa_checklist",
                    target_url: "https://portal.sizzy.co/pricing",
                  });
                  event.currentTarget.href = trackOutboundClick(
                    "https://portal.sizzy.co/pricing",
                    "Responsive QA checklist CTA",
                    "responsive_qa_checklist"
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

export default ResponsiveQaChecklistPage;
