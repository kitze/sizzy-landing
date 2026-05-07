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
  FaListUl,
  FaMobileAlt,
  FaRulerCombined,
  FaSyncAlt,
  FaTable,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";

type WidthReference = {
  label: string;
  width: number;
  height: number;
  category: string;
  useCase: string;
  note: string;
};

type SiteType = {
  value: string;
  label: string;
  focus: string;
  coreWidths: number[];
  breakpoints: number[];
  qaFocus: string[];
};

type CheatSheetReport = {
  siteType: SiteType;
  pageLabel: string;
  coreTargets: WidthReference[];
  qaViewportPack: number[];
  cssNotes: string;
  checklist: string[];
  markdown: string;
};

const widthReferences: WidthReference[] = [
  {
    label: "Minimum phone",
    width: 320,
    height: 568,
    category: "Phone",
    useCase: "Smallest safe layout",
    note: "Catches cramped nav, buttons, and fixed-width content.",
  },
  {
    label: "Small Android",
    width: 360,
    height: 740,
    category: "Phone",
    useCase: "Mobile baseline",
    note: "A practical default for narrow Chrome Android testing.",
  },
  {
    label: "iPhone SE",
    width: 375,
    height: 667,
    category: "Phone",
    useCase: "Small iOS",
    note: "Good for Safari UI, forms, and short screens.",
  },
  {
    label: "Modern iPhone",
    width: 390,
    height: 844,
    category: "Phone",
    useCase: "Default iPhone portrait",
    note: "Common iPhone 12/13/14-style CSS viewport width.",
  },
  {
    label: "iPhone 15",
    width: 393,
    height: 852,
    category: "Phone",
    useCase: "Modern mobile QA",
    note: "A strong everyday mobile target.",
  },
  {
    label: "Pixel",
    width: 412,
    height: 915,
    category: "Phone",
    useCase: "Android portrait",
    note: "Checks a wider phone without leaving mobile layout.",
  },
  {
    label: "Large phone",
    width: 430,
    height: 932,
    category: "Phone",
    useCase: "Large mobile",
    note: "Useful before tablet-specific layout rules kick in.",
  },
  {
    label: "Mobile ceiling",
    width: 480,
    height: 900,
    category: "Breakpoint",
    useCase: "Phone-to-small-tablet edge",
    note: "Common max-width breakpoint for mobile-only CSS.",
  },
  {
    label: "Small tablet",
    width: 640,
    height: 900,
    category: "Breakpoint",
    useCase: "Two-column entry",
    note: "Where cards, filters, and forms often gain space.",
  },
  {
    label: "Tablet portrait",
    width: 768,
    height: 1024,
    category: "Tablet",
    useCase: "Tablet baseline",
    note: "Classic tablet and CSS breakpoint width.",
  },
  {
    label: "iPad portrait",
    width: 820,
    height: 1180,
    category: "Tablet",
    useCase: "Modern tablet portrait",
    note: "Good for tablet navigation and content columns.",
  },
  {
    label: "Docs width",
    width: 900,
    height: 1100,
    category: "Browser",
    useCase: "Reading layout",
    note: "Useful for docs, articles, sidebars, and code blocks.",
  },
  {
    label: "Tablet landscape",
    width: 1024,
    height: 768,
    category: "Tablet",
    useCase: "Small desktop edge",
    note: "Where desktop navigation often appears too early.",
  },
  {
    label: "Small laptop",
    width: 1280,
    height: 800,
    category: "Desktop",
    useCase: "Compact desktop",
    note: "Good for app chrome, sidebars, and dense dashboards.",
  },
  {
    label: "Laptop",
    width: 1366,
    height: 768,
    category: "Desktop",
    useCase: "Common browser window",
    note: "Still one of the most useful desktop QA widths.",
  },
  {
    label: "Desktop",
    width: 1440,
    height: 900,
    category: "Desktop",
    useCase: "Design review",
    note: "Common MacBook and desktop design handoff width.",
  },
  {
    label: "Large laptop",
    width: 1536,
    height: 960,
    category: "Desktop",
    useCase: "Wide app layout",
    note: "Checks max-width containers and dashboards.",
  },
  {
    label: "Full HD",
    width: 1920,
    height: 1080,
    category: "Desktop",
    useCase: "Wide monitor",
    note: "Catches over-stretched heroes, media, and tables.",
  },
];

const siteTypes: SiteType[] = [
  {
    value: "marketing",
    label: "Marketing site",
    focus: "hero composition, nav collapse, proof grids, pricing cards, and CTA density",
    coreWidths: [360, 390, 430, 768, 1024, 1280, 1440, 1920],
    breakpoints: [480, 640, 768, 1024, 1280, 1440],
    qaFocus: [
      "Check headline wrapping and CTA visibility on the first fold.",
      "Verify proof, logo, pricing, testimonial, and FAQ grids at phone, tablet, and desktop widths.",
      "Inspect sticky headers, cookie banners, and chat widgets around the primary CTA.",
    ],
  },
  {
    value: "app",
    label: "SaaS app or dashboard",
    focus: "sidebars, toolbar overflow, tables, charts, modals, and empty states",
    coreWidths: [360, 390, 640, 820, 1024, 1280, 1366, 1536, 1920],
    breakpoints: [640, 768, 1024, 1200, 1366, 1536],
    qaFocus: [
      "Open the side nav, action menus, filters, modals, and command surfaces at every desktop width.",
      "Check horizontal overflow in tables, charts, kanban boards, and editor canvases.",
      "Verify dense app chrome at 1280px and 1366px before relying on wide desktop screenshots.",
    ],
  },
  {
    value: "ecommerce",
    label: "Ecommerce page",
    focus: "gallery layout, filters, variants, reviews, sticky buy boxes, and cart CTAs",
    coreWidths: [360, 390, 430, 768, 820, 1024, 1280, 1440],
    breakpoints: [390, 640, 768, 1024, 1280, 1440],
    qaFocus: [
      "Check product media crop, thumbnails, variants, quantity controls, and buy button visibility.",
      "Open filters, sort menus, review drawers, cart panels, and promo banners.",
      "Compare product grid density at tablet, small desktop, and full desktop widths.",
    ],
  },
  {
    value: "checkout",
    label: "Checkout or signup flow",
    focus: "forms, validation, keyboard states, payment UI, trust copy, and sticky summaries",
    coreWidths: [320, 360, 390, 430, 768, 1024, 1280],
    breakpoints: [360, 430, 768, 960, 1024, 1280],
    qaFocus: [
      "Run the full form flow at the smallest phone width before checking desktop polish.",
      "Test validation, autofill, password managers, payment elements, and virtual keyboard states.",
      "Inspect sticky totals, trust badges, legal copy, and error messages around every breakpoint.",
    ],
  },
  {
    value: "content",
    label: "Content or docs site",
    focus: "reading width, table of contents, sidebars, embeds, code blocks, and media crops",
    coreWidths: [360, 390, 640, 768, 900, 1024, 1280, 1440],
    breakpoints: [640, 768, 900, 1024, 1280, 1440],
    qaFocus: [
      "Check line length, headings, anchors, code blocks, tables, embeds, and image captions.",
      "Open table of contents, search, sidebars, accordions, and in-page navigation.",
      "Verify that readable content width stays intentional on wide desktop monitors.",
    ],
  },
];

const faq = [
  {
    question: "What browser sizes should I test first?",
    answer:
      "Start with a small phone, modern phone, tablet portrait, tablet landscape or small desktop, laptop, desktop, and wide desktop. Add breakpoint edge widths only where your CSS changes layout.",
  },
  {
    question: "Are device sizes and browser viewport sizes the same?",
    answer:
      "No. Device screens include hardware pixels and browser UI. Responsive CSS works against the viewport in CSS pixels, so this cheat sheet focuses on practical browser viewport widths.",
  },
  {
    question: "Should every width become a CSS breakpoint?",
    answer:
      "No. Use the QA pack to find layout changes, then keep CSS breakpoints only where they fix a real responsive problem.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Browser Size Cheat Sheet",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: "https://sizzy.co/tools/browser-size-cheat-sheet",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@type": "Organization",
        name: "Sizzy",
        url: "https://sizzy.co",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

const useStyles = createStyles((theme) => ({
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f4fbff 0%, #ffffff 42%, #fff7ec 100%)",
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
    border: "1px solid rgba(22, 163, 184, 0.22)",
    background: "rgba(22, 163, 184, 0.08)",
    color: theme.colors.cyan[8],
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
  metric: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    padding: 18,
    minHeight: 112,
  },
  targetCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
  },
  tableWrap: {
    overflowX: "auto",
  },
  widthCell: {
    color: "#171126",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
  badgeWrap: {
    alignItems: "flex-start",
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
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  linkBand: {
    borderRadius: 8,
    border: "1px solid rgba(22, 163, 184, 0.18)",
    background:
      "linear-gradient(135deg, rgba(22, 163, 184, 0.10), rgba(102, 44, 185, 0.08), rgba(245, 159, 0, 0.10))",
    padding: 24,
  },
  faqCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.72)",
  },
}));

const uniqueSorted = (items: number[]) =>
  Array.from(new Set(items.filter((item) => item > 0))).sort((a, b) => a - b);

const getSiteType = (value: string) =>
  siteTypes.find((item) => item.value === value) || siteTypes[0];

const getReference = (width: number): WidthReference => {
  const exact = widthReferences.find((item) => item.width === width);

  if (exact) return exact;

  return {
    label: `${width}px breakpoint`,
    width,
    height: width >= 1024 ? 900 : 800,
    category: width < 768 ? "Breakpoint" : "Browser",
    useCase: "Custom breakpoint edge",
    note: "Test just below and above this width before adding CSS.",
  };
};

const breakpointReason = (width: number, siteType: SiteType) => {
  if (width < 480) {
    return `phone guardrail for ${siteType.focus}`;
  }
  if (width < 768) {
    return `large-mobile adjustment before tablet rules; watch ${siteType.focus}`;
  }
  if (width < 1024) {
    return `tablet entry point for stacked-to-adjacent layout changes`;
  }
  if (width < 1280) {
    return `desktop transition; confirm navigation, sidebars, and grid density`;
  }
  if (width < 1536) {
    return `desktop layout width; check container max-width and dense sections`;
  }
  return `wide-screen guardrail; prevent stretched content and empty layout zones`;
};

const formatTarget = (target: WidthReference) => `${target.width}x${target.height}`;

const buildReport = (siteTypeValue: string, pageName: string): CheatSheetReport => {
  const siteType = getSiteType(siteTypeValue);
  const pageLabel = pageName.trim() || "Target page";
  const coreTargets = uniqueSorted(siteType.coreWidths).map(getReference);
  const qaViewportPack = uniqueSorted([
    ...siteType.coreWidths,
    ...siteType.breakpoints.flatMap((width) => [width - 1, width, width + 1]),
  ]).filter((width) => width >= 320 && width <= 1920);
  const cssNotes = [
    `/* ${siteType.label} breakpoint notes for ${pageLabel}. Keep only rules that fix real layout changes. */`,
    ...siteType.breakpoints.map(
      (width) => `@media (min-width: ${width}px) {\n  /* ${breakpointReason(width, siteType)} */\n}`
    ),
  ].join("\n\n");
  const checklist = [
    `Start with ${formatTarget(
      coreTargets[0]
    )} and complete the core ${siteType.label.toLowerCase()} flow before widening.`,
    `Run the QA viewport pack at ${qaViewportPack.slice(0, 12).join(", ")}${
      qaViewportPack.length > 12 ? ", and the remaining exported widths" : ""
    }.`,
    ...siteType.qaFocus,
    "Compare just below, at, and just above each CSS breakpoint before shipping.",
    "Capture screenshots after fixes so the same viewport pack can be reused in the next release.",
  ];
  const markdown = [
    "# Browser Size Cheat Sheet",
    "",
    `- Page: ${pageLabel}`,
    `- Type: ${siteType.label}`,
    `- Focus: ${siteType.focus}`,
    "",
    "## Core Browser Sizes",
    ...coreTargets.map(
      (target) =>
        `- ${target.label}: ${target.width}x${target.height} (${target.category}) - ${target.useCase}`
    ),
    "",
    "## QA Viewport Pack",
    qaViewportPack.map((width) => `${width}px`).join(", "),
    "",
    "## CSS Breakpoint Notes",
    "",
    "```css",
    cssNotes,
    "```",
    "",
    "## QA Checklist",
    ...checklist.map((item) => `- [ ] ${item}`),
    "",
    "## Static Reference Table",
    ...widthReferences.map(
      (item) => `- ${item.width}x${item.height}: ${item.label} (${item.category}) - ${item.note}`
    ),
  ].join("\n");

  return { siteType, pageLabel, coreTargets, qaViewportPack, cssNotes, checklist, markdown };
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

const BrowserSizeCheatSheetPage = () => {
  const { classes } = useStyles();
  const [siteType, setSiteType] = useState("marketing");
  const [pageName, setPageName] = useState("");
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState<"report" | "css" | null>(null);

  const report = useMemo(() => buildReport(siteType, pageName), [pageName, siteType]);
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Browser Size Cheat Sheet",
    gradientColors: ["#16a3b8", "#662cb9", "#f59f00"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  const markStarted = (field: string) => {
    if (!started) {
      captureSizzyEvent("tool_started", {
        tool_slug: "browser-size-cheat-sheet",
        field,
      });
      setStarted(true);
    }
  };

  const generatePack = () => {
    setCopied(null);
    captureSizzyEvent("tool_completed", {
      tool_slug: "browser-size-cheat-sheet",
      site_type: siteType,
      qa_width_count: report.qaViewportPack.length,
      core_target_count: report.coreTargets.length,
    });
  };

  const copyReport = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.markdown);
    }
    setCopied("report");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "browser-size-cheat-sheet",
      copy_type: "markdown_report",
      qa_width_count: report.qaViewportPack.length,
    });
  };

  const copyCss = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.cssNotes);
    }
    setCopied("css");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "browser-size-cheat-sheet",
      copy_type: "css_notes",
      breakpoint_count: report.siteType.breakpoints.length,
    });
  };

  const exportReport = () => {
    downloadText("browser-size-cheat-sheet.md", report.markdown);
    captureSizzyEvent("export_clicked", {
      tool_slug: "browser-size-cheat-sheet",
      qa_width_count: report.qaViewportPack.length,
    });
  };

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Browser Size Cheat Sheet - Sizzy"
        description="Reference common browser viewport widths, generate a responsive QA viewport pack, and copy CSS breakpoint notes for site and app testing."
        url="https://sizzy.co/tools/browser-size-cheat-sheet"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/tools/browser-size-cheat-sheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <main className={classes.page}>
        <Box className={classes.inner}>
          <Box className={classes.heroGrid}>
            <Stack spacing="lg">
              <Badge size="lg" radius="xl" className={classes.eyebrow} leftSection={<FaTable />}>
                Free responsive design tool
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Browser Size Cheat Sheet
              </Title>
              <Text className={classes.heroCopy}>
                Use a practical table of common browser widths, then turn your site type into a QA
                viewport pack and CSS breakpoint notes you can copy into a release plan.
              </Text>
              <Group spacing="sm">
                <Anchor href="/tools/viewport-checker">Viewport checker</Anchor>
                <Anchor href="/tools/website-breakpoint-finder">Breakpoint finder</Anchor>
                <Anchor href="/tools/responsive-screenshot-generator">Screenshot generator</Anchor>
                <Anchor href="/tools/responsive-qa-checklist">QA checklist</Anchor>
                <Anchor href="/blog/responsive-viewport-sizes">Viewport sizes guide</Anchor>
                <Anchor href="/features/responsive-mode">Responsive mode</Anchor>
                <Anchor href="/features/device-simulation">Device simulation</Anchor>
              </Group>
            </Stack>

            <Box className={classes.miniPanel}>
              <Text size="sm" color="dimmed" transform="uppercase" weight={700}>
                Current QA pack
              </Text>
              <Title order={3} mt={8}>
                {report.qaViewportPack.length} widths
              </Title>
              <Text color="dimmed" mt={6}>
                {report.coreTargets.length} core targets - {report.siteType.breakpoints.length} CSS
                breakpoints
              </Text>
            </Box>
          </Box>

          <Box className={classes.toolGrid}>
            <Card className={classes.panel} p="lg">
              <Stack spacing="md">
                <Title order={2}>Plan browser sizes</Title>
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
                  label="Site or app type"
                  value={siteType}
                  data={siteTypes.map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                  onChange={(value) => {
                    setSiteType(value || "marketing");
                    setCopied(null);
                    markStarted("site_type");
                  }}
                />
                <Card className={classes.targetCard} p="md">
                  <Text size="xs" color="dimmed" transform="uppercase" weight={800}>
                    QA focus
                  </Text>
                  <Text mt={8} color="gray.7">
                    {report.siteType.focus}
                  </Text>
                </Card>
                <Button
                  leftIcon={<FaSyncAlt />}
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "cyan", to: "purple" }}
                  onClick={generatePack}
                >
                  Generate QA pack
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
                  ["Type", report.siteType.label],
                  ["Core targets", String(report.coreTargets.length)],
                  ["QA widths", String(report.qaViewportPack.length)],
                  ["CSS notes", String(report.siteType.breakpoints.length)],
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
                    <Title order={2}>QA viewport pack</Title>
                    <Text color="dimmed">
                      Core device widths plus just-below and just-above breakpoint checks.
                    </Text>
                  </Box>
                  <Group spacing="xs">
                    <Button variant="light" radius={8} leftIcon={<FaCopy />} onClick={copyReport}>
                      {copied === "report" ? "Copied" : "Copy"}
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
                <Group spacing="xs" className={classes.badgeWrap}>
                  {report.qaViewportPack.map((width) => (
                    <Badge key={width} radius={8} color="cyan" variant="light">
                      {width}px
                    </Badge>
                  ))}
                </Group>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>Core browser targets</Title>
                <Text color="dimmed" mb="md">
                  Use these as the named sizes in screenshots, QA tickets, and design review.
                </Text>
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                  {report.coreTargets.map((target) => (
                    <Card key={target.width} className={classes.targetCard} p="md">
                      <Group spacing="xs">
                        <FaMobileAlt color="#16a3b8" />
                        <Title order={3}>{formatTarget(target)}</Title>
                      </Group>
                      <Text mt={6} weight={700}>
                        {target.label}
                      </Text>
                      <Divider my="sm" />
                      <Text color="gray.7">{target.note}</Text>
                    </Card>
                  ))}
                </SimpleGrid>
              </Card>

              <Card className={classes.panel} p="lg">
                <Group position="apart" align="start" mb="md">
                  <Box>
                    <Title order={2}>CSS breakpoint notes</Title>
                    <Text color="dimmed">
                      Paste into a scratch file before turning the final widths into production CSS.
                    </Text>
                  </Box>
                  <Button variant="subtle" radius={8} leftIcon={<FaCopy />} onClick={copyCss}>
                    {copied === "css" ? "Copied" : "Copy CSS"}
                  </Button>
                </Group>
                <Box component="pre" className={classes.code}>
                  {report.cssNotes}
                </Box>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>Responsive QA notes</Title>
                <Stack mt="md" spacing="xs">
                  {report.checklist.map((item) => (
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

          <Card mt={28} className={classes.panel} p="lg">
            <Group position="apart" align="start" mb="md">
              <Box>
                <Title order={2}>Common browser and viewport widths</Title>
                <Text color="dimmed">
                  Static CSS-pixel reference for phones, tablets, laptop browser windows, desktop,
                  and breakpoint edges.
                </Text>
              </Box>
              <Badge radius={8} color="orange" variant="light" leftSection={<FaListUl />}>
                {widthReferences.length} reference sizes
              </Badge>
            </Group>
            <Box className={classes.tableWrap}>
              <Table verticalSpacing="md" striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Width</th>
                    <th>Viewport</th>
                    <th>Type</th>
                    <th>Use it for</th>
                    <th>QA note</th>
                  </tr>
                </thead>
                <tbody>
                  {widthReferences.map((item) => (
                    <tr key={item.width}>
                      <td className={classes.widthCell}>{formatTarget(item)}</td>
                      <td>{item.label}</td>
                      <td>{item.category}</td>
                      <td>{item.useCase}</td>
                      <td>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
          </Card>

          <Box mt={28} className={classes.linkBand}>
            <Group position="apart" align="center">
              <Box>
                <Title order={2}>Need to turn the cheat sheet into a real QA pass?</Title>
                <Text mt={8} color="gray.7">
                  Use this reference to plan widths, then move into the focused Sizzy tools for
                  viewport checks, breakpoints, screenshots, and release checklists.
                </Text>
                <Anchor mt={10} href="/tools/viewport-checker">
                  Check one viewport
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/website-breakpoint-finder">
                  Find breakpoints
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-screenshot-generator">
                  Generate screenshots
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
                    tool_slug: "browser-size-cheat-sheet",
                    cta: "try_sizzy",
                    location: "browser_size_cheat_sheet",
                    target_url: "https://portal.sizzy.co/pricing",
                  });
                  event.currentTarget.href = trackOutboundClick(
                    "https://portal.sizzy.co/pricing",
                    "Browser size cheat sheet CTA",
                    "browser_size_cheat_sheet"
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
                  <FaRulerCombined color="#16a3b8" />
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

export default BrowserSizeCheatSheetPage;
