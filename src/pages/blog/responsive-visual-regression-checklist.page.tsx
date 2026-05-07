import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import MetaTags from "components/MetaTags";
import Shell from "components/Shell";
import Head from "next/head";
import React from "react";
import {
  FaArrowRight,
  FaBalanceScale,
  FaCamera,
  FaCheckCircle,
  FaClipboardList,
  FaMobileAlt,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent } from "utils/posthog";

const checklistSections = [
  {
    title: "1. Pick the pages that can break a release",
    items: [
      "Start with revenue, signup, pricing, docs, dashboard, and checkout screens.",
      "Include one long-content state, one empty state, one loading state, and one error state.",
      "Add pages with sticky headers, cookie banners, modals, tables, charts, and third-party embeds.",
    ],
  },
  {
    title: "2. Capture the right responsive viewports",
    items: [
      "Use a small phone, large phone, tablet, laptop, and wide desktop for every comparison.",
      "Add widths just below and just above each CSS breakpoint when a layout recently changed.",
      "Keep height stable for baseline and candidate captures so scroll positions compare cleanly.",
    ],
  },
  {
    title: "3. Freeze anything that changes between runs",
    items: [
      "Mask timestamps, avatars, ads, random IDs, blinking cursors, live counters, and charts.",
      "Wait for fonts, images, lazy sections, hydration, and network idle before taking screenshots.",
      "Pin logged-in state, locale, dark mode, cookie consent, feature flags, and seeded test data.",
    ],
  },
  {
    title: "4. Review diffs by user impact",
    items: [
      "Block releases when CTAs vanish, forms become unusable, content clips, or navigation breaks.",
      "Escalate table overflow, modal drift, wrapped menus, hidden labels, and sticky UI overlap.",
      "Accept tiny antialiasing, compression, and sub-pixel changes only after confirming intent.",
    ],
  },
];

const toleranceRows = [
  {
    label: "Strict UI",
    when: "Navigation, forms, pricing, checkout, auth, and critical dashboard controls.",
    tolerance: "0.05% to 0.15% changed pixels",
  },
  {
    label: "Balanced release",
    when: "Marketing pages, docs, account screens, and normal product UI.",
    tolerance: "0.2% to 0.6% changed pixels",
  },
  {
    label: "Content heavy",
    when: "Blogs, galleries, media grids, feeds, and pages with editorial images.",
    tolerance: "0.6% to 1.5% changed pixels",
  },
  {
    label: "Dynamic app",
    when: "Charts, maps, dashboards, canvases, and personalized data-heavy views.",
    tolerance: "1% to 3% changed pixels plus semantic checks",
  },
];

const relatedTools = [
  {
    title: "Screenshot Comparison Checklist",
    href: "/tools/screenshot-comparison-checklist",
    description: "Generate the live baseline, candidate, tolerance, and triage plan.",
  },
  {
    title: "Responsive Screenshot Generator",
    href: "/tools/responsive-screenshot-generator",
    description: "Plan viewport screenshot batches for phone, tablet, and desktop QA.",
  },
  {
    title: "Responsive QA Checklist",
    href: "/tools/responsive-qa-checklist",
    description: "Build a broader release checklist for layout, media, forms, and accessibility.",
  },
  {
    title: "Viewport Checker",
    href: "/tools/viewport-checker",
    description: "Convert a viewport size into a responsive breakpoint and QA report.",
  },
  {
    title: "Breakpoint Finder",
    href: "/tools/website-breakpoint-finder",
    description: "Plan the widths where a page needs extra responsive coverage.",
  },
  {
    title: "CSS Breakpoint Checker",
    href: "/tools/css-breakpoint-checker",
    description: "Turn CSS breakpoints into a practical responsive testing matrix.",
  },
];

const faq = [
  {
    question: "What is a responsive visual regression checklist?",
    answer:
      "It is a repeatable plan for comparing screenshots across the viewports, page states, masks, and tolerance settings where responsive layout bugs usually appear.",
  },
  {
    question: "How is a screenshot comparison checklist different from a normal QA checklist?",
    answer:
      "A normal QA checklist asks what to test. A screenshot comparison checklist also defines baseline and candidate captures, visual diff tolerance, dynamic content masks, and triage rules.",
  },
  {
    question: "Which pages should be included in screenshot comparison testing?",
    answer:
      "Include the pages that affect conversion, support, onboarding, checkout, account access, and core product usage. Add any page with sticky UI, forms, tables, media, or recently changed responsive CSS.",
  },
  {
    question: "Can Sizzy help with responsive visual regression review?",
    answer:
      "Yes. Sizzy helps you inspect the same site across synchronized devices, capture screenshots, and review responsive states before you export or automate a visual regression checklist.",
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
    background: "linear-gradient(180deg, #eefcff 0%, #ffffff 42%, #fff8ed 100%)",
    color: theme.colors.gray[8],
  },
  hero: {
    padding: "92px 0 30px",
    [theme.fn.smallerThan("sm")]: {
      padding: "62px 0 22px",
    },
  },
  eyebrow: {
    alignSelf: "flex-start",
    border: "1px solid rgba(22, 163, 184, 0.28)",
    background: "rgba(22, 163, 184, 0.10)",
    color: theme.colors.cyan[8],
  },
  heroTitle: {
    maxWidth: 930,
    fontSize: 58,
    lineHeight: 1.02,
    color: "#171126",
    [theme.fn.smallerThan("md")]: {
      fontSize: 42,
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: 33,
    },
  },
  heroCopy: {
    maxWidth: 780,
    fontSize: 20,
    lineHeight: 1.65,
    color: theme.colors.gray[7],
    [theme.fn.smallerThan("sm")]: {
      fontSize: 16,
    },
  },
  section: {
    padding: "28px 0",
  },
  panel: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.90)",
    boxShadow: "0 20px 60px rgba(23, 17, 38, 0.06)",
  },
  checklistCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    minHeight: 260,
  },
  metricCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    minHeight: 184,
  },
  linkBand: {
    borderRadius: 8,
    border: "1px solid rgba(22, 163, 184, 0.18)",
    background:
      "linear-gradient(135deg, rgba(22, 163, 184, 0.12), rgba(245, 159, 0, 0.10), rgba(102, 44, 185, 0.08))",
    padding: 24,
  },
  list: {
    margin: 0,
    paddingLeft: 20,
  },
  listItem: {
    marginBottom: 10,
    lineHeight: 1.7,
    color: theme.colors.gray[7],
  },
  faqCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.72)",
  },
}));

const ResponsiveVisualRegressionChecklistPage = () => {
  const { classes } = useStyles();
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Responsive Visual Regression Checklist",
    gradientColors: ["#16a3b8", "#f59f00", "#171126"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Responsive Visual Regression Checklist for Screenshot Comparison - Sizzy"
        description="A practical screenshot comparison checklist for responsive visual regression testing across mobile, tablet, desktop, page states, masks, and diff tolerance."
        url="https://sizzy.co/blog/responsive-visual-regression-checklist"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/blog/responsive-visual-regression-checklist" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <main className={classes.page}>
        <Container size={1180}>
          <Box className={classes.hero}>
            <Stack spacing="lg">
              <Badge
                size="lg"
                radius="xl"
                className={classes.eyebrow}
                leftSection={<FaBalanceScale />}
              >
                Screenshot comparison guide
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Responsive Visual Regression Checklist for Screenshot Comparison
              </Title>
              <Text className={classes.heroCopy}>
                A screenshot comparison checklist should make visual regressions repeatable: same
                pages, same viewports, same states, same masks, and a clear rule for what blocks the
                release.
              </Text>
              <Group spacing="sm">
                <Button
                  component="a"
                  href="/tools/screenshot-comparison-checklist"
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "cyan", to: "orange" }}
                  rightIcon={<FaArrowRight />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "responsive_visual_regression_checklist",
                      cta: "open_screenshot_comparison_checklist",
                    })
                  }
                >
                  Open the checklist
                </Button>
                <Button
                  component="a"
                  href="/tools/responsive-screenshot-generator"
                  radius={8}
                  size="md"
                  variant="light"
                  rightIcon={<FaCamera />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "responsive_visual_regression_checklist",
                      cta: "open_screenshot_generator",
                    })
                  }
                >
                  Plan screenshots
                </Button>
                <Anchor href="/tools/responsive-qa-checklist">Responsive QA checklist</Anchor>
                <Anchor href="/features/screenshots">Sizzy screenshots</Anchor>
                <Anchor href="/features/responsive-mode">Responsive mode</Anchor>
              </Group>
            </Stack>
          </Box>

          <Box className={classes.section}>
            <Card className={classes.panel} p="xl">
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "sm", cols: 1 },
                ]}
              >
                <Stack spacing={6}>
                  <Group spacing="xs">
                    <FaMobileAlt color="#16a3b8" />
                    <Text weight={800}>Responsive coverage</Text>
                  </Group>
                  <Text color="gray.7">
                    Compare phone, tablet, laptop, and wide desktop captures instead of approving
                    one lucky browser size.
                  </Text>
                </Stack>
                <Stack spacing={6}>
                  <Group spacing="xs">
                    <FaClipboardList color="#f59f00" />
                    <Text weight={800}>State coverage</Text>
                  </Group>
                  <Text color="gray.7">
                    Include menus, forms, modals, dark mode, scrolled positions, and error states
                    where layout shifts happen.
                  </Text>
                </Stack>
                <Stack spacing={6}>
                  <Group spacing="xs">
                    <FaCheckCircle color="#099268" />
                    <Text weight={800}>Triage coverage</Text>
                  </Group>
                  <Text color="gray.7">
                    Separate blocker regressions from harmless rendering noise before the review
                    turns into a guessing game.
                  </Text>
                </Stack>
              </SimpleGrid>
            </Card>
          </Box>

          <Box className={classes.section}>
            <Stack spacing="md">
              <Title order={2}>The screenshot comparison checklist</Title>
              <Text color="gray.7">
                Use this structure before you capture a baseline and candidate build. It keeps the
                review focused on responsive bugs that users can actually feel.
              </Text>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
                {checklistSections.map((section) => (
                  <Card key={section.title} className={classes.checklistCard} p="lg">
                    <Title order={3}>{section.title}</Title>
                    <Box component="ul" className={classes.list} mt="md">
                      {section.items.map((item) => (
                        <li key={item} className={classes.listItem}>
                          {item}
                        </li>
                      ))}
                    </Box>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>

          <Box className={classes.section}>
            <Stack spacing="md">
              <Title order={2}>Recommended visual diff tolerance</Title>
              <Text color="gray.7">
                The tolerance should match the risk of the page. Strict thresholds are useful for
                critical UI, while content-heavy pages need room for image and rendering noise.
              </Text>
              <SimpleGrid
                cols={4}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "sm", cols: 1 },
                ]}
              >
                {toleranceRows.map((row) => (
                  <Card key={row.label} className={classes.metricCard} p="lg">
                    <Stack spacing={8}>
                      <Text weight={800} color="dark.8">
                        {row.label}
                      </Text>
                      <Text size="sm" color="gray.7">
                        {row.when}
                      </Text>
                      <Divider />
                      <Text size="sm" weight={700} color="cyan.8">
                        {row.tolerance}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>

          <Box className={classes.section}>
            <Box className={classes.linkBand}>
              <Group position="apart" align="center">
                <Box>
                  <Title order={2}>Turn the guide into a live checklist</Title>
                  <Text mt={8} color="gray.7">
                    The Sizzy screenshot comparison checklist generates viewport pairs, state
                    coverage, tolerance notes, Playwright capture prompts, and a markdown export.
                  </Text>
                </Box>
                <Button
                  component="a"
                  href="/tools/screenshot-comparison-checklist"
                  radius={8}
                  size="lg"
                  rightIcon={<FaArrowRight />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "responsive_visual_regression_checklist_midpage",
                      cta: "open_screenshot_comparison_checklist",
                    })
                  }
                >
                  Build the checklist
                </Button>
              </Group>
            </Box>
          </Box>

          <Box className={classes.section}>
            <Stack spacing="md">
              <Title order={2}>Related Sizzy responsive tools</Title>
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "sm", cols: 1 },
                ]}
              >
                {relatedTools.map((tool) => (
                  <Card key={tool.href} className={classes.panel} p="lg">
                    <Stack spacing="sm">
                      <Anchor href={tool.href} weight={800} size="lg">
                        {tool.title}
                      </Anchor>
                      <Text color="gray.7">{tool.description}</Text>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>

          <Box className={classes.section}>
            <Stack spacing="md">
              <Title order={2}>FAQ</Title>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
                {faq.map((item) => (
                  <Card key={item.question} className={classes.faqCard} p="lg">
                    <Title order={3}>{item.question}</Title>
                    <Text mt="sm" color="gray.7">
                      {item.answer}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        </Container>
      </main>
    </Shell>
  );
};

export default ResponsiveVisualRegressionChecklistPage;
