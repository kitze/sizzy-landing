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
  FaCamera,
  FaCheckCircle,
  FaCopy,
  FaDownload,
  FaExternalLinkAlt,
  FaImage,
  FaSyncAlt,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";

type DeviceTarget = {
  label: string;
  slug: string;
  width: number;
  height: number;
  dpr: number;
  family: "Phone" | "Tablet" | "Desktop";
};

type ScreenshotReport = {
  url: string;
  targets: DeviceTarget[];
  fileNames: string[];
  playwrightScript: string;
  markdown: string;
};

const devices: DeviceTarget[] = [
  { label: "iPhone SE", slug: "iphone-se", width: 375, height: 667, dpr: 2, family: "Phone" },
  { label: "iPhone 15", slug: "iphone-15", width: 393, height: 852, dpr: 3, family: "Phone" },
  { label: "Pixel 8", slug: "pixel-8", width: 412, height: 915, dpr: 2.6, family: "Phone" },
  { label: "iPad", slug: "ipad", width: 820, height: 1180, dpr: 2, family: "Tablet" },
  {
    label: "MacBook Air",
    slug: "macbook-air",
    width: 1440,
    height: 900,
    dpr: 2,
    family: "Desktop",
  },
  { label: "Desktop HD", slug: "desktop-hd", width: 1920, height: 1080, dpr: 1, family: "Desktop" },
];

const workflowPresets = [
  { label: "Launch page", value: "launch" },
  { label: "Dashboard app", value: "dashboard" },
  { label: "Pricing page", value: "pricing" },
  { label: "Checkout flow", value: "checkout" },
];

const defaultSelected = ["iphone-se", "iphone-15", "ipad", "macbook-air"];

const faq = [
  {
    question: "Can this capture screenshots directly in the browser?",
    answer:
      "It gives you live device previews when the target site allows iframe loading, and it generates a Playwright script for reliable full-page screenshots.",
  },
  {
    question: "Why generate a Playwright script?",
    answer:
      "Browser security blocks client-side screenshotting of many cross-origin pages. A local Playwright script produces real screenshots without needing a server-side screenshot API.",
  },
  {
    question: "How is this different from Sizzy?",
    answer:
      "This page plans and scripts one screenshot batch. Sizzy is the full responsive QA workspace with synchronized devices, screenshots, debugging, and app workflows.",
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
    background: "linear-gradient(180deg, #f4fbff 0%, #ffffff 46%, #f6f2ff 100%)",
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
    maxWidth: 820,
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
    background: "rgba(255, 255, 255, 0.82)",
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
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 16,
    [theme.fn.smallerThan("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  previewCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    overflow: "hidden",
  },
  browserBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderBottom: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#f7f8fb",
    padding: "10px 12px",
  },
  viewportBox: {
    display: "flex",
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, rgba(22, 163, 184, 0.08), rgba(102, 44, 185, 0.08))",
  },
  iframeShell: {
    overflow: "hidden",
    border: "1px solid rgba(23, 17, 38, 0.12)",
    background: "#ffffff",
    transformOrigin: "top left",
  },
  placeholder: {
    maxWidth: 260,
    padding: 18,
    textAlign: "center",
    color: theme.colors.gray[6],
  },
  code: {
    minHeight: 250,
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
  metric: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    padding: 18,
    minHeight: 112,
  },
  targetButton: {
    width: "100%",
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
  targetButtonActive: {
    borderColor: "rgba(102, 44, 185, 0.38)",
    background: "rgba(102, 44, 185, 0.08)",
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
    return "site";
  }
};

const escapeForScript = (value: string) => value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");

const getReport = (rawUrl: string, selectedSlugs: string[], workflow: string): ScreenshotReport => {
  const url = normalizeUrl(rawUrl);
  const targets = devices.filter((device) => selectedSlugs.includes(device.slug));
  const siteSlug = slugFromUrl(url || "site");
  const fileNames = targets.map((target) => `${siteSlug}-${target.slug}.png`);
  const targetLines = targets
    .map(
      (target) =>
        `  { name: '${target.slug}', width: ${target.width}, height: ${target.height}, dpr: ${target.dpr} }`
    )
    .join(",\n");
  const scriptUrl = escapeForScript(url || "https://example.com");
  const playwrightScript = [
    "import { chromium } from 'playwright';",
    "",
    `const targetUrl = '${scriptUrl}';`,
    "const targets = [",
    targetLines,
    "];",
    "",
    "const browser = await chromium.launch();",
    "for (const target of targets) {",
    "  const context = await browser.newContext({",
    "    viewport: { width: target.width, height: target.height },",
    "    deviceScaleFactor: target.dpr,",
    "  });",
    "  const page = await context.newPage();",
    "  await page.goto(targetUrl, { waitUntil: 'networkidle' });",
    "  await page.screenshot({",
    "    path: `screenshots/${target.name}.png`,",
    "    fullPage: true,",
    "  });",
    "  await context.close();",
    "}",
    "await browser.close();",
  ].join("\n");
  const markdown = [
    "# Responsive Screenshot Plan",
    "",
    `- URL: ${url || "Add URL before running"}`,
    `- Workflow: ${workflow}`,
    `- Screenshot count: ${targets.length}`,
    "",
    "## Targets",
    ...targets.map(
      (target, index) =>
        `- ${target.label}: ${target.width}x${target.height} @${target.dpr}x -> ${fileNames[index]}`
    ),
    "",
    "## QA Pass",
    "- Capture before and after screenshots for the same target list.",
    "- Compare sticky header, first fold, forms, modals, cookie banners, and checkout CTA visibility.",
    "- Re-run the set after each breakpoint or layout change.",
    "",
    "## Playwright Script",
    "",
    "```ts",
    playwrightScript,
    "```",
  ].join("\n");

  return { url, targets, fileNames, playwrightScript, markdown };
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

const getPreviewScale = (target: DeviceTarget) => {
  const maxWidth = target.family === "Desktop" ? 360 : 190;
  const maxHeight = 210;
  return Math.min(maxWidth / target.width, maxHeight / target.height, 1);
};

const ResponsiveScreenshotGeneratorPage = () => {
  const { classes } = useStyles();
  const [rawUrl, setRawUrl] = useState("");
  const [workflow, setWorkflow] = useState("launch");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(defaultSelected);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState<"script" | "plan" | null>(null);

  const report = useMemo(
    () => getReport(rawUrl, selectedSlugs, workflow),
    [rawUrl, selectedSlugs, workflow]
  );
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Responsive Screenshot Generator",
    gradientColors: ["#16a3b8", "#662cb9", "#171126"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  const markStarted = (field: string) => {
    if (!started) {
      captureSizzyEvent("tool_started", {
        tool_slug: "responsive-screenshot-generator",
        field,
      });
      setStarted(true);
    }
  };

  const selectedCount = report.targets.length;

  const toggleTarget = (slug: string) => {
    const next = selectedSlugs.includes(slug)
      ? selectedSlugs.filter((item) => item !== slug)
      : [...selectedSlugs, slug];
    setSelectedSlugs(next.length ? next : defaultSelected);
    markStarted("targets");
  };

  const generatePlan = () => {
    setCopied(null);
    captureSizzyEvent("tool_completed", {
      tool_slug: "responsive-screenshot-generator",
      target_count: selectedCount,
      workflow,
    });
  };

  const copyScript = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.playwrightScript);
    }
    setCopied("script");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "responsive-screenshot-generator",
      copy_type: "playwright_script",
      target_count: selectedCount,
    });
  };

  const copyPlan = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.markdown);
    }
    setCopied("plan");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "responsive-screenshot-generator",
      copy_type: "markdown_plan",
      target_count: selectedCount,
    });
  };

  const exportPlan = () => {
    downloadText("responsive-screenshot-plan.md", report.markdown);
    captureSizzyEvent("export_clicked", {
      tool_slug: "responsive-screenshot-generator",
      target_count: selectedCount,
    });
  };

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Responsive Screenshot Generator - Sizzy"
        description="Generate a responsive screenshot plan, live device preview board, and Playwright capture script for mobile, tablet, and desktop QA."
        url="https://sizzy.co/tools/responsive-screenshot-generator"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/tools/responsive-screenshot-generator" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <main className={classes.page}>
        <Box className={classes.inner}>
          <Box className={classes.heroGrid}>
            <Stack spacing="lg">
              <Badge size="lg" radius="xl" className={classes.eyebrow} leftSection={<FaCamera />}>
                Free responsive QA tool
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Responsive Screenshot Generator
              </Title>
              <Text className={classes.heroCopy}>
                Build a screenshot batch for phone, tablet, and desktop review. Preview the URL,
                copy a Playwright script, and export the QA plan before running the full pass in
                Sizzy.
              </Text>
              <Group spacing="sm">
                <Anchor href="/tools/viewport-checker">Viewport checker</Anchor>
                <Anchor href="/tools/responsive-qa-checklist">QA checklist</Anchor>
                <Anchor href="/tools/website-breakpoint-finder">Breakpoint finder</Anchor>
                <Anchor href="/blog/responsive-viewport-sizes">Viewport sizes guide</Anchor>
                <Anchor href="/blog/responsive-visual-regression-checklist">
                  Visual regression guide
                </Anchor>
                <Anchor href="/features/screenshots">Sizzy screenshots</Anchor>
                <Anchor href="/features/responsive-mode">Responsive mode</Anchor>
              </Group>
            </Stack>

            <Box className={classes.miniPanel}>
              <Text size="sm" color="dimmed" transform="uppercase" weight={700}>
                Screenshot batch
              </Text>
              <Title order={3} mt={8}>
                {selectedCount} targets
              </Title>
              <Text color="dimmed" mt={6}>
                {report.targets
                  .map((target) => target.family)
                  .filter((item, index, arr) => arr.indexOf(item) === index)
                  .join(", ")}
              </Text>
            </Box>
          </Box>

          <Box className={classes.toolGrid}>
            <Card className={classes.panel} p="lg">
              <Stack spacing="md">
                <Title order={2}>Generate the batch</Title>
                <TextInput
                  label="Website URL"
                  placeholder="https://example.com"
                  value={rawUrl}
                  onChange={(event) => {
                    setRawUrl(event.currentTarget.value);
                    markStarted("url");
                  }}
                />
                <Select
                  label="Workflow"
                  value={workflow}
                  data={workflowPresets}
                  onChange={(value) => {
                    setWorkflow(value || "launch");
                    markStarted("workflow");
                  }}
                />
                <Stack spacing={8}>
                  <Text size="sm" weight={500}>
                    Screenshot targets
                  </Text>
                  {devices.map((device) => {
                    const active = selectedSlugs.includes(device.slug);
                    return (
                      <button
                        key={device.slug}
                        type="button"
                        className={`${classes.targetButton} ${
                          active ? classes.targetButtonActive : ""
                        }`}
                        onClick={() => toggleTarget(device.slug)}
                      >
                        <Group position="apart" spacing="sm" noWrap>
                          <Box>
                            <Text size="sm" weight={700}>
                              {device.label}
                            </Text>
                            <Text size="xs" color="dimmed">
                              {device.width}x{device.height} - {device.family}
                            </Text>
                          </Box>
                          {active ? <FaCheckCircle color="#662cb9" /> : null}
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
                  gradient={{ from: "cyan", to: "purple" }}
                  onClick={generatePlan}
                >
                  Generate plan
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
                  ["Targets", String(selectedCount)],
                  ["Smallest", report.targets[0] ? `${report.targets[0].width}px` : "None"],
                  [
                    "Largest",
                    report.targets[report.targets.length - 1]
                      ? `${report.targets[report.targets.length - 1].width}px`
                      : "None",
                  ],
                  ["Output", "PNG script"],
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
                    <Title order={2}>Device preview board</Title>
                    <Text color="dimmed">
                      Live previews load when the target site allows iframe embedding.
                    </Text>
                  </Box>
                  <Button
                    component="a"
                    href={report.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    radius={8}
                    leftIcon={<FaExternalLinkAlt />}
                    disabled={!report.url}
                  >
                    Open URL
                  </Button>
                </Group>

                <Box className={classes.previewGrid}>
                  {report.targets.map((target) => {
                    const scale = getPreviewScale(target);
                    const shellWidth = Math.round(target.width * scale);
                    const shellHeight = Math.round(target.height * scale);
                    return (
                      <Box key={target.slug} className={classes.previewCard}>
                        <Box className={classes.browserBar}>
                          <Box>
                            <Text size="sm" weight={800}>
                              {target.label}
                            </Text>
                            <Text size="xs" color="dimmed">
                              {target.width}x{target.height} @{target.dpr}x
                            </Text>
                          </Box>
                          <FaImage color="#16a3b8" />
                        </Box>
                        <Box className={classes.viewportBox}>
                          {report.url ? (
                            <Box
                              className={classes.iframeShell}
                              style={{
                                width: shellWidth,
                                height: shellHeight,
                              }}
                            >
                              <iframe
                                title={`${target.label} preview`}
                                src={report.url}
                                width={target.width}
                                height={target.height}
                                style={{
                                  border: 0,
                                  pointerEvents: "none",
                                  transform: `scale(${scale})`,
                                  transformOrigin: "top left",
                                }}
                              />
                            </Box>
                          ) : (
                            <Box className={classes.placeholder}>
                              Add a URL to preview this target and generate the screenshot script.
                            </Box>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Card>

              <Card className={classes.panel} p="lg">
                <Group position="apart" align="start" mb="md">
                  <Box>
                    <Title order={2}>Playwright screenshot script</Title>
                    <Text color="dimmed">
                      Run this locally for reliable full-page PNG captures.
                    </Text>
                  </Box>
                  <Group spacing="xs">
                    <Button variant="light" radius={8} leftIcon={<FaCopy />} onClick={copyScript}>
                      {copied === "script" ? "Copied" : "Copy script"}
                    </Button>
                    <Button variant="subtle" radius={8} leftIcon={<FaCopy />} onClick={copyPlan}>
                      {copied === "plan" ? "Copied" : "Copy plan"}
                    </Button>
                    <Button
                      variant="outline"
                      radius={8}
                      leftIcon={<FaDownload />}
                      onClick={exportPlan}
                    >
                      Export
                    </Button>
                  </Group>
                </Group>
                <Box component="pre" className={classes.code}>
                  {report.playwrightScript}
                </Box>
              </Card>
            </Stack>
          </Box>

          <Box mt={28} className={classes.linkBand}>
            <Group position="apart" align="center">
              <Box>
                <Title order={2}>Need a real responsive screenshot workflow?</Title>
                <Text mt={8} color="gray.7">
                  Use this generator for the batch plan. Use Sizzy when you need synchronized
                  devices, visual debugging, and screenshot capture in the product.
                </Text>
                <Anchor mt={10} href="/tools/viewport-checker">
                  Check individual viewport sizes
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-qa-checklist">
                  Build QA checklist
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/website-breakpoint-finder">
                  Find breakpoints
                </Anchor>
                <Anchor ml="md" mt={10} href="/blog/responsive-visual-regression-checklist">
                  Read visual regression guide
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
                    tool_slug: "responsive-screenshot-generator",
                    cta: "try_sizzy",
                    location: "responsive_screenshot_generator",
                    target_url: "https://portal.sizzy.co/pricing",
                  });
                  event.currentTarget.href = trackOutboundClick(
                    "https://portal.sizzy.co/pricing",
                    "Responsive screenshot generator CTA",
                    "responsive_screenshot_generator"
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
                  <FaCheckCircle color="#16a3b8" />
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

export default ResponsiveScreenshotGeneratorPage;
