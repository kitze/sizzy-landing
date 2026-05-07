import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  NumberInput,
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
import { FaCopy, FaDownload, FaExternalLinkAlt, FaMobileAlt, FaSyncAlt } from "react-icons/fa";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";

type Preset = {
  label: string;
  value: string;
  width: number;
  height: number;
};

type Report = {
  category: string;
  orientation: string;
  ratio: string;
  closestBreakpoint: string;
  nextBreakpoint: string;
  css: string;
  checklist: string[];
  markdown: string;
};

const presets: Preset[] = [
  { label: "iPhone SE", value: "iphone-se", width: 375, height: 667 },
  { label: "iPhone 15", value: "iphone-15", width: 393, height: 852 },
  { label: "Pixel 8", value: "pixel-8", width: 412, height: 915 },
  { label: "iPad", value: "ipad", width: 820, height: 1180 },
  { label: "MacBook Air", value: "macbook-air", width: 1440, height: 900 },
  { label: "Desktop HD", value: "desktop-hd", width: 1920, height: 1080 },
];

const breakpoints = [
  { name: "xs", width: 480 },
  { name: "sm", width: 640 },
  { name: "md", width: 768 },
  { name: "lg", width: 1024 },
  { name: "xl", width: 1280 },
  { name: "2xl", width: 1536 },
];

const faq = [
  {
    question: "What is a viewport checker?",
    answer:
      "A viewport checker tells you how a width and height map to common responsive breakpoints, device classes, and CSS media queries.",
  },
  {
    question: "Is this the same as testing in real devices?",
    answer:
      "No. It is a quick planning tool. Use Sizzy when you need to load the real site across many synchronized viewports.",
  },
  {
    question: "Which breakpoint system does this use?",
    answer:
      "The report includes practical web categories and Tailwind-style breakpoint names so it is easy to paste into modern CSS work.",
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
    background: "linear-gradient(180deg, #f6f2ff 0%, #ffffff 42%, #effcff 100%)",
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
    border: "1px solid rgba(102, 44, 185, 0.22)",
    background: "rgba(102, 44, 185, 0.08)",
    color: theme.colors.purple[7],
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
    maxWidth: 780,
    fontSize: 64,
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
    maxWidth: 720,
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
    background: "rgba(255, 255, 255, 0.78)",
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
    minHeight: 122,
  },
  code: {
    minHeight: 170,
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
    border: "1px solid rgba(102, 44, 185, 0.16)",
    background: "linear-gradient(135deg, rgba(102, 44, 185, 0.10), rgba(22, 163, 184, 0.10))",
    padding: 24,
  },
  faqCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.72)",
  },
}));

const getCategory = (width: number) => {
  if (width < 480) return "Small mobile";
  if (width < 768) return "Mobile";
  if (width < 1024) return "Tablet";
  if (width < 1280) return "Small desktop";
  if (width < 1536) return "Desktop";
  return "Wide desktop";
};

const getReport = (width: number, height: number, url: string): Report => {
  const safeWidth = Math.max(1, Math.round(width || 1));
  const safeHeight = Math.max(1, Math.round(height || 1));
  const closest = breakpoints.reduce((winner, item) => {
    return Math.abs(item.width - safeWidth) < Math.abs(winner.width - safeWidth) ? item : winner;
  }, breakpoints[0]);
  const next = breakpoints.find((item) => item.width > safeWidth);
  const category = getCategory(safeWidth);
  const orientation = safeWidth >= safeHeight ? "Landscape" : "Portrait";
  const ratio = `${(safeWidth / safeHeight).toFixed(2)}:1`;
  const siteLine = url.trim() ? `/* Site to test: ${url.trim()} */\n` : "";
  const css = `${siteLine}@media (max-width: ${safeWidth}px) {\n  /* ${category} and narrower */\n}\n\n@media (min-width: ${
    safeWidth + 1
  }px) {\n  /* Wider than this viewport */\n}`;
  const checklist = [
    `Check navigation at ${safeWidth}px before adding another breakpoint.`,
    `Verify touch targets and form fields in ${orientation.toLowerCase()} orientation.`,
    `Inspect sticky headers, cookie notices, and chat widgets around the first fold.`,
    `Compare this width against ${closest.name} (${closest.width}px) before shipping custom CSS.`,
    next
      ? `Add one wider test at ${next.name} (${next.width}px) before declaring the layout done.`
      : "Add one ultra-wide test before declaring the layout done.",
  ];
  const markdown = [
    `# Viewport Report`,
    ``,
    `- Size: ${safeWidth}x${safeHeight}`,
    `- Category: ${category}`,
    `- Orientation: ${orientation}`,
    `- Aspect ratio: ${ratio}`,
    `- Closest breakpoint: ${closest.name} (${closest.width}px)`,
    `- Next breakpoint: ${next ? `${next.name} (${next.width}px)` : "none"}`,
    url.trim() ? `- URL: ${url.trim()}` : "",
    ``,
    `## CSS Helper`,
    ``,
    "```css",
    css,
    "```",
    ``,
    `## QA Checklist`,
    ...checklist.map((item) => `- ${item}`),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    category,
    orientation,
    ratio,
    closestBreakpoint: `${closest.name} (${closest.width}px)`,
    nextBreakpoint: next ? `${next.name} (${next.width}px)` : "None",
    css,
    checklist,
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

const ViewportCheckerPage = () => {
  const { classes } = useStyles();
  const [preset, setPreset] = useState("iphone-15");
  const [width, setWidth] = useState(393);
  const [height, setHeight] = useState(852);
  const [siteUrl, setSiteUrl] = useState("");
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  const report = useMemo(() => getReport(width, height, siteUrl), [height, siteUrl, width]);
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Viewport Checker",
    gradientColors: ["#16a3b8", "#662cb9", "#171126"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  const markStarted = (field: string) => {
    if (!started) {
      captureSizzyEvent("tool_started", {
        tool_slug: "viewport-checker",
        field,
      });
      setStarted(true);
    }
  };

  const updatePreset = (value: string) => {
    const next = presets.find((item) => item.value === value);
    setPreset(value);
    if (next) {
      setWidth(next.width);
      setHeight(next.height);
    }
    markStarted("preset");
  };

  const copyReport = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.markdown);
    }
    setCopied(true);
    captureSizzyEvent("copy_clicked", {
      tool_slug: "viewport-checker",
      width,
      height,
    });
  };

  const exportReport = () => {
    downloadText(`viewport-${width}x${height}.md`, report.markdown);
    captureSizzyEvent("export_clicked", {
      tool_slug: "viewport-checker",
      width,
      height,
    });
  };

  const recalculate = () => {
    setCopied(false);
    captureSizzyEvent("tool_completed", {
      tool_slug: "viewport-checker",
      width,
      height,
      category: report.category,
    });
  };

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Viewport Checker - Sizzy"
        description="Check viewport width, height, breakpoint category, aspect ratio, and CSS media queries before responsive QA."
        url="https://sizzy.co/tools/viewport-checker"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/tools/viewport-checker" />
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
                leftSection={<FaMobileAlt />}
              >
                Free responsive design tool
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Viewport Checker
              </Title>
              <Text className={classes.heroCopy}>
                Convert a width and height into a responsive breakpoint report, CSS helper, and QA
                checklist before you open the real page in Sizzy.
              </Text>
              <Group spacing="sm">
                <Anchor href="/blog/responsive-viewport-sizes">Viewport sizes guide</Anchor>
                <Anchor href="/blog/android-viewport-sizes">Android viewport sizes</Anchor>
                <Anchor href="/blog/iphone-viewport-sizes">iPhone viewport sizes</Anchor>
                <Anchor href="/tools/responsive-screenshot-generator">Screenshot generator</Anchor>
                <Anchor href="/tools/responsive-qa-checklist">QA checklist</Anchor>
                <Anchor href="/tools/website-breakpoint-finder">Breakpoint finder</Anchor>
                <Anchor href="/features/responsive-mode">Responsive mode</Anchor>
                <Anchor href="/features/device-simulation">Device simulation</Anchor>
                <Anchor href="/features/screenshots">Screenshots</Anchor>
              </Group>
            </Stack>

            <Box className={classes.miniPanel}>
              <Text size="sm" color="dimmed" transform="uppercase" weight={700}>
                Current report
              </Text>
              <Title order={3} mt={8}>
                {width} x {height}
              </Title>
              <Text color="dimmed" mt={6}>
                {report.category} - {report.orientation} - {report.ratio}
              </Text>
            </Box>
          </Box>

          <Box className={classes.toolGrid}>
            <Card className={classes.panel} p="lg">
              <Stack spacing="md">
                <Title order={2}>Check a viewport</Title>
                <Select
                  label="Device preset"
                  value={preset}
                  data={[...presets, { label: "Custom", value: "custom", width, height }].map(
                    (item) => ({
                      label: item.label,
                      value: item.value,
                    })
                  )}
                  onChange={(value) => updatePreset(value || "custom")}
                />
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
                  <NumberInput
                    label="Width"
                    min={1}
                    value={width}
                    onChange={(value) => {
                      setPreset("custom");
                      setWidth(typeof value === "number" ? value : 1);
                      markStarted("width");
                    }}
                  />
                  <NumberInput
                    label="Height"
                    min={1}
                    value={height}
                    onChange={(value) => {
                      setPreset("custom");
                      setHeight(typeof value === "number" ? value : 1);
                      markStarted("height");
                    }}
                  />
                </SimpleGrid>
                <TextInput
                  label="Website URL"
                  placeholder="https://example.com"
                  value={siteUrl}
                  onChange={(event) => {
                    setSiteUrl(event.currentTarget.value);
                    markStarted("url");
                  }}
                />
                <Button
                  leftIcon={<FaSyncAlt />}
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "cyan", to: "purple" }}
                  onClick={recalculate}
                >
                  Generate report
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
                  ["Category", report.category],
                  ["Orientation", report.orientation],
                  ["Aspect ratio", report.ratio],
                  ["Closest", report.closestBreakpoint],
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
                    <Title order={2}>CSS helper</Title>
                    <Text color="dimmed">
                      Paste this into a scratch file before deciding on a breakpoint.
                    </Text>
                  </Box>
                  <Group spacing="xs">
                    <Button variant="light" radius={8} leftIcon={<FaCopy />} onClick={copyReport}>
                      {copied ? "Copied" : "Copy"}
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
                <Box component="pre" className={classes.code}>
                  {report.css}
                </Box>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>Responsive QA checklist</Title>
                <Stack mt="md" spacing="xs">
                  {report.checklist.map((item) => (
                    <Text key={item} color="gray.7">
                      - {item}
                    </Text>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Box>

          <Box mt={28} className={classes.linkBand}>
            <Group position="apart" align="center">
              <Box>
                <Title order={2}>Need to test the real page across many sizes?</Title>
                <Text mt={8} color="gray.7">
                  Use Sizzy when the calculator is done and you need synchronized devices,
                  screenshots, and responsive debugging in one place.
                </Text>
                <Anchor mt={10} href="/blog/responsive-viewport-sizes">
                  Read the viewport sizes guide
                </Anchor>
                <Anchor ml="md" mt={10} href="/blog/android-viewport-sizes">
                  Android viewport sizes
                </Anchor>
                <Anchor ml="md" mt={10} href="/blog/iphone-viewport-sizes">
                  iPhone viewport sizes
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-screenshot-generator">
                  Generate screenshot batch
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-qa-checklist">
                  Build QA checklist
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
                    tool_slug: "viewport-checker",
                    cta: "try_sizzy",
                    location: "viewport_checker",
                    target_url: "https://portal.sizzy.co/pricing",
                  });
                  event.currentTarget.href = trackOutboundClick(
                    "https://portal.sizzy.co/pricing",
                    "Viewport checker CTA",
                    "viewport_checker"
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
                <Title order={3}>{item.question}</Title>
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

export default ViewportCheckerPage;
