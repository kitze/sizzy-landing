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
  FaCheckCircle,
  FaClipboardCheck,
  FaCode,
  FaMobileAlt,
  FaRulerCombined,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";

const checklistSections = [
  {
    title: "1. Start with content, not devices",
    items: [
      "Open the page at 320px, 360px, 390px, 430px, 768px, 1024px, 1280px, 1440px, and 1920px.",
      "Mark the exact widths where navigation wraps, cards become cramped, tables overflow, or CTAs disappear.",
      "Create breakpoints only where the content needs a new layout rule.",
    ],
  },
  {
    title: "2. Test around every breakpoint",
    items: [
      "Check at least 1px below, exactly at, and 1px above each CSS breakpoint.",
      "Include framework defaults from Tailwind, Bootstrap, custom media queries, and component-level container queries.",
      "Repeat the pass for nav-open, modal-open, form-error, empty, loading, and long-content states.",
    ],
  },
  {
    title: "3. Cover real viewport ranges",
    items: [
      "Use small phone, large phone, tablet, laptop, and wide desktop ranges as the minimum responsive QA set.",
      "Add current iPhone and Android CSS pixel widths when mobile changes affect conversion or signup flows.",
      "Run one landscape pass for headers, sticky bars, drawers, and checkout forms.",
    ],
  },
  {
    title: "4. Ship with regression evidence",
    items: [
      "Capture screenshots before and after the change across the chosen viewport set.",
      "Block the release when content clips, controls overlap, horizontal scroll appears, or key actions move offscreen.",
      "Keep accepted breakpoint changes in the QA checklist so the next release starts from a known baseline.",
    ],
  },
];

const breakpointRanges = [
  {
    label: "Tiny mobile",
    range: "320px to 359px",
    reason: "Catches old phones, embedded webviews, narrow checkout forms, and fixed-width UI.",
  },
  {
    label: "Mobile",
    range: "360px to 430px",
    reason: "Covers common iPhone and Android widths where most responsive bugs are found.",
  },
  {
    label: "Tablet",
    range: "768px to 1024px",
    reason:
      "Shows whether a page should still be mobile, become two columns, or use tablet-specific spacing.",
  },
  {
    label: "Laptop",
    range: "1280px to 1440px",
    reason: "The everyday desktop range for dashboards, docs, pricing, and product pages.",
  },
  {
    label: "Wide desktop",
    range: "1536px to 1920px",
    reason:
      "Finds stretched heroes, long line lengths, weak grids, and content that stops scaling gracefully.",
  },
];

const relatedTools = [
  {
    title: "Website Breakpoint Finder",
    href: "/tools/website-breakpoint-finder",
    description: "Find the viewport widths where a page needs layout attention.",
  },
  {
    title: "CSS Breakpoint Checker",
    href: "/tools/css-breakpoint-checker",
    description: "Turn CSS media queries and framework screens into a QA matrix.",
  },
  {
    title: "Viewport Checker",
    href: "/tools/viewport-checker",
    description: "Check a viewport size, breakpoint category, aspect ratio, and CSS helper.",
  },
  {
    title: "Responsive QA Checklist",
    href: "/tools/responsive-qa-checklist",
    description: "Build a release checklist for layout, forms, media, and accessibility.",
  },
  {
    title: "Responsive Screenshot Generator",
    href: "/tools/responsive-screenshot-generator",
    description: "Plan screenshot captures across phone, tablet, laptop, and desktop.",
  },
  {
    title: "Browser Size Cheat Sheet",
    href: "/tools/browser-size-cheat-sheet",
    description: "Choose practical browser and viewport sizes for repeatable QA.",
  },
];

const faq = [
  {
    question: "What is a responsive breakpoint checklist?",
    answer:
      "A responsive breakpoint checklist is a repeatable QA plan for testing widths below, at, and above the CSS breakpoints where a layout changes.",
  },
  {
    question: "Which responsive breakpoints should I test first?",
    answer:
      "Start with small mobile, large mobile, tablet, laptop, and wide desktop widths. Then add the exact CSS breakpoints used by your site and test just below and above each one.",
  },
  {
    question: "Should breakpoints be based on devices or content?",
    answer:
      "Use real viewport sizes for coverage, but create CSS breakpoints where the content breaks. Device lists are useful for QA, while content problems should drive the layout rules.",
  },
  {
    question: "How does Sizzy help with breakpoint testing?",
    answer:
      "Sizzy lets teams inspect synchronized responsive viewports, compare page states, capture screenshots, and move from breakpoint checks into a broader responsive QA workflow.",
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

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Responsive Breakpoint Checklist for Viewport Testing",
  description:
    "A practical responsive breakpoint checklist for viewport testing across mobile, tablet, laptop, and wide desktop layouts.",
  url: "https://sizzy.co/blog/responsive-breakpoint-checklist",
  mainEntityOfPage: "https://sizzy.co/blog/responsive-breakpoint-checklist",
  publisher: {
    "@type": "Organization",
    name: "Sizzy",
    logo: {
      "@type": "ImageObject",
      url: sizzyLogoUrl,
    },
  },
};

const cssExample = `/* Test below, at, and above every breakpoint */
@media (min-width: 768px) {
  /* tablet layout */
}

@media (min-width: 1024px) {
  /* laptop layout */
}

@media (min-width: 1536px) {
  /* wide desktop layout */
}`;

const useStyles = createStyles((theme) => ({
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f4fbff 0%, #ffffff 42%, #f8f1ff 100%)",
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
    minHeight: 268,
  },
  rangeCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    minHeight: 190,
  },
  callout: {
    borderRadius: 8,
    border: "1px solid rgba(102, 44, 185, 0.16)",
    background:
      "linear-gradient(135deg, rgba(22, 163, 184, 0.12), rgba(102, 44, 185, 0.10), rgba(9, 146, 104, 0.08))",
    padding: 24,
  },
  code: {
    margin: 0,
    overflowX: "auto",
    borderRadius: 8,
    background: "#171126",
    color: "#f8f9fa",
    padding: 20,
    fontSize: 14,
    lineHeight: 1.7,
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

const ResponsiveBreakpointChecklistPage = () => {
  const { classes } = useStyles();
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Responsive Breakpoint Checklist",
    gradientColors: ["#16a3b8", "#662cb9", "#099268"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Responsive Breakpoint Checklist for Viewport Testing - Sizzy"
        description="A practical responsive breakpoint checklist for viewport testing across mobile, tablet, laptop, and wide desktop layouts before you ship."
        url="https://sizzy.co/blog/responsive-breakpoint-checklist"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/blog/responsive-breakpoint-checklist" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
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
                leftSection={<FaRulerCombined />}
              >
                Responsive breakpoint guide
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Responsive Breakpoint Checklist for Viewport Testing
              </Title>
              <Text className={classes.heroCopy}>
                Breakpoint testing works best when every width has a reason: the content changes,
                the layout changes, or the user could lose an important action.
              </Text>
              <Group spacing="sm">
                <Button
                  component="a"
                  href="/tools/website-breakpoint-finder"
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "cyan", to: "purple" }}
                  rightIcon={<FaArrowRight />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "responsive_breakpoint_checklist",
                      cta: "open_breakpoint_finder",
                    })
                  }
                >
                  Find breakpoints
                </Button>
                <Button
                  component="a"
                  href="/tools/css-breakpoint-checker"
                  radius={8}
                  size="md"
                  variant="light"
                  rightIcon={<FaCode />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "responsive_breakpoint_checklist",
                      cta: "open_css_breakpoint_checker",
                    })
                  }
                >
                  Check CSS breakpoints
                </Button>
                <Anchor href="/tools/viewport-checker">Viewport checker</Anchor>
                <Anchor href="/blog/responsive-viewport-sizes">Viewport sizes guide</Anchor>
                <Anchor href="/blog/responsive-visual-regression-checklist">
                  Visual regression checklist
                </Anchor>
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
                    <Text weight={800}>Viewport coverage</Text>
                  </Group>
                  <Text color="gray.7">
                    Test the responsive ranges that users actually see, then add exact breakpoints
                    from your CSS.
                  </Text>
                </Stack>
                <Stack spacing={6}>
                  <Group spacing="xs">
                    <FaClipboardCheck color="#662cb9" />
                    <Text weight={800}>State coverage</Text>
                  </Group>
                  <Text color="gray.7">
                    Include open menus, sticky UI, forms, modals, loading states, and long content
                    where breakpoints drift.
                  </Text>
                </Stack>
                <Stack spacing={6}>
                  <Group spacing="xs">
                    <FaCheckCircle color="#099268" />
                    <Text weight={800}>Release coverage</Text>
                  </Group>
                  <Text color="gray.7">
                    Keep screenshots and notes for the widths that block releases so the next pass
                    starts faster.
                  </Text>
                </Stack>
              </SimpleGrid>
            </Card>
          </Box>

          <Box className={classes.section}>
            <Stack spacing="md">
              <Title order={2}>The responsive breakpoint checklist</Title>
              <Text color="gray.7">
                Use this checklist when adding media queries, reviewing a redesign, or preparing a
                release that changes layout CSS.
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
              <Title order={2}>Viewport ranges to include</Title>
              <Text color="gray.7">
                These ranges keep breakpoint QA practical without pretending every device needs its
                own media query.
              </Text>
              <SimpleGrid
                cols={5}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "xs", cols: 1 },
                ]}
              >
                {breakpointRanges.map((item) => (
                  <Card key={item.label} className={classes.rangeCard} p="lg">
                    <Stack spacing="xs">
                      <Text size="xs" color="dimmed" transform="uppercase" weight={800}>
                        {item.label}
                      </Text>
                      <Title order={3}>{item.range}</Title>
                      <Text color="gray.7">{item.reason}</Text>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>

          <SimpleGrid
            className={classes.section}
            cols={2}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            <Card className={classes.panel} p="xl">
              <Stack spacing="md">
                <Title order={2}>How to test a breakpoint</Title>
                <Text color="gray.7">
                  For every breakpoint, inspect the layout before the rule applies, at the exact
                  threshold, and after the next layout takes over. That tiny three-width pass
                  catches off-by-one CSS bugs, wrapped controls, and hidden overflow.
                </Text>
                <Box component="ol" className={classes.list}>
                  {[
                    "Open the page at the breakpoint minus 1px.",
                    "Check the exact breakpoint width.",
                    "Open the page at the breakpoint plus 1px.",
                    "Repeat with navigation, forms, modals, and sticky UI active.",
                  ].map((item) => (
                    <li key={item} className={classes.listItem}>
                      {item}
                    </li>
                  ))}
                </Box>
              </Stack>
            </Card>
            <Card className={classes.panel} p="xl">
              <Stack spacing="md">
                <Title order={2}>CSS example</Title>
                <Text color="gray.7">
                  The checklist applies to framework screens, custom media queries, and container
                  queries. The important part is testing the edges.
                </Text>
                <Box component="pre" className={classes.code}>
                  <code>{cssExample}</code>
                </Box>
              </Stack>
            </Card>
          </SimpleGrid>

          <Box className={classes.section}>
            <Box className={classes.callout}>
              <Group position="apart" align="center">
                <Box>
                  <Title order={2}>Turn breakpoint notes into a QA pass</Title>
                  <Text mt={8} color="gray.7">
                    Use the free breakpoint finder to identify risky widths, then open the same page
                    in Sizzy for synchronized responsive review and screenshots.
                  </Text>
                </Box>
                <Group spacing="sm">
                  <Button
                    component="a"
                    href="/tools/website-breakpoint-finder"
                    radius={8}
                    size="lg"
                  >
                    Find breakpoints
                  </Button>
                  <Button
                    component="a"
                    href="/tools/responsive-qa-checklist"
                    radius={8}
                    size="lg"
                    variant="light"
                  >
                    Build checklist
                  </Button>
                  <Button
                    component="a"
                    href="https://portal.sizzy.co/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    radius={8}
                    size="lg"
                    variant="outline"
                    rightIcon={<FaMobileAlt />}
                    onClick={(event) => {
                      captureSizzyEvent("cta_clicked", {
                        location: "responsive_breakpoint_checklist",
                        cta: "try_sizzy",
                        target_url: "https://portal.sizzy.co/pricing",
                      });
                      event.currentTarget.href = trackOutboundClick(
                        "https://portal.sizzy.co/pricing",
                        "Responsive breakpoint checklist CTA",
                        "responsive_breakpoint_checklist"
                      );
                    }}
                  >
                    Try Sizzy
                  </Button>
                </Group>
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
                    <Divider my="sm" />
                    <Text color="gray.7">{item.answer}</Text>
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

export default ResponsiveBreakpointChecklistPage;
