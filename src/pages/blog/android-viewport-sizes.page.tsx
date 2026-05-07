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
  Table,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import MetaTags from "components/MetaTags";
import Shell from "components/Shell";
import Head from "next/head";
import React from "react";
import {
  FaAndroid,
  FaArrowRight,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaRulerCombined,
  FaTable,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";

const androidRows = [
  {
    className: "Small Android phones",
    viewport: "360 x 640 to 360 x 800",
    width: "360px",
    dpr: "2x to 3x",
    note: "Use this as the narrow Android guardrail for nav drawers, forms, cookie banners, and fixed CTAs.",
  },
  {
    className: "Narrow modern Android",
    viewport: "384 x 824 to 384 x 854",
    width: "384px",
    dpr: "2.5x to 3x",
    note: "A useful middle width when 360px passes but text, cards, or product images still wrap awkwardly.",
  },
  {
    className: "Standard Android phones",
    viewport: "393 x 851 to 393 x 873",
    width: "393px",
    dpr: "2.75x to 3x",
    note: "Good everyday Android CSS pixels for product pages, pricing cards, dashboards, and account screens.",
  },
  {
    className: "Large Pixel and Galaxy phones",
    viewport: "412 x 869 to 412 x 915",
    width: "412px",
    dpr: "2.6x to 3.5x",
    note: "The most practical large-phone Android viewport size for release QA and mobile screenshots.",
  },
  {
    className: "Tall large Android phones",
    viewport: "432 x 936 to 432 x 960",
    width: "432px",
    dpr: "3x to 3.5x",
    note: "Catches layouts that become too relaxed on wide phones before they should turn into tablet UI.",
  },
  {
    className: "Foldable cover screens",
    viewport: "344 x 882 to 374 x 904",
    width: "344px to 374px",
    dpr: "2.5x to 3x",
    note: "Narrow cover displays expose cramped navigation, filters, chat widgets, and sticky bottom actions.",
  },
  {
    className: "Unfolded foldables",
    viewport: "674 x 842 to 841 x 701",
    width: "674px to 841px",
    dpr: "2x to 3x",
    note: "Check whether the layout should stay phone-like, become tablet-like, or use a split-pane state.",
  },
];

const testPack = [
  {
    label: "Minimum phone",
    widths: "344px, 360px",
    guidance:
      "Run this whenever mobile navigation, forms, checkout, bottom bars, or support widgets change.",
  },
  {
    label: "Daily Android pass",
    widths: "384px, 393px, 412px",
    guidance:
      "This compact set covers most mobile responsive test sizes without turning QA into a device catalog.",
  },
  {
    label: "Large phone edge",
    widths: "432px, 480px",
    guidance:
      "Use this range for grids, cards, image crops, pricing tables, and sticky CTAs that may stretch too early.",
  },
  {
    label: "Foldable and tablet edge",
    widths: "674px, 720px, 841px",
    guidance:
      "Verify menus, two-column layouts, sidebars, modals, and dashboards before the desktop breakpoint.",
  },
];

const checklist = [
  "Test Android CSS pixels, not physical screen resolution.",
  "Include one narrow cover-screen width if mobile navigation changed.",
  "Check 360px, 393px, and 412px before adding another Android-specific width.",
  "Test just below and above 480px, 600px, 768px, and any custom CSS breakpoints.",
  "Repeat the pass with browser UI, keyboard, cookie banner, chat widget, and error states visible.",
];

const relatedTools = [
  {
    title: "Viewport Checker",
    href: "/tools/viewport-checker",
    description:
      "Check any Android viewport size, breakpoint category, aspect ratio, and CSS media query helper.",
  },
  {
    title: "Browser Size Cheat Sheet",
    href: "/tools/browser-size-cheat-sheet",
    description:
      "Build a practical mobile responsive test sizes pack for Android, iPhone, tablet, and desktop QA.",
  },
  {
    title: "CSS Breakpoint Checker",
    href: "/tools/css-breakpoint-checker",
    description:
      "Paste media queries or Tailwind screens and find risky gaps around Android CSS pixels.",
  },
  {
    title: "Website Breakpoint Finder",
    href: "/tools/website-breakpoint-finder",
    description:
      "Turn page notes and target devices into breakpoint candidates, QA viewport sizes, and test plans.",
  },
];

const faq = [
  {
    question: "What are Android viewport sizes?",
    answer:
      "Android viewport sizes are the CSS pixel dimensions that Chrome, WebView, and responsive CSS use after device pixel ratio and display scaling are applied.",
  },
  {
    question: "Are Android CSS pixels the same as physical pixels?",
    answer:
      "No. Android phones may have thousands of physical pixels, but responsive CSS usually sees a much smaller CSS pixel viewport such as 360px, 393px, or 412px wide.",
  },
  {
    question: "Which Android viewport sizes should I test first?",
    answer:
      "Start with 360px for narrow Android phones, 393px for standard modern phones, 412px for large Pixel and Galaxy-style phones, and one foldable or tablet edge when the layout changes around 600px to 768px.",
  },
  {
    question: "Should I create Android-specific CSS breakpoints?",
    answer:
      "Usually no. Use Android viewport sizes to find where the content breaks, then define content-based breakpoint ranges that also work for iPhone, tablets, and browser resizing.",
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

const cssExample = `@media (max-width: 359px) {
  /* Narrow Android cover screens */
}

@media (min-width: 360px) and (max-width: 431px) {
  /* Most Android CSS pixel phone widths */
}

@media (min-width: 432px) and (max-width: 767px) {
  /* Large phones before tablet layout */
}

@media (min-width: 768px) {
  /* Tablet, unfolded foldable, and wider */
}`;

const useStyles = createStyles((theme) => ({
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #effaf7 0%, #ffffff 42%, #fff7ed 100%)",
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
    border: "1px solid rgba(7, 148, 85, 0.24)",
    background: "rgba(7, 148, 85, 0.08)",
    color: theme.colors.teal[8],
  },
  heroTitle: {
    maxWidth: 940,
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
    maxWidth: 810,
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
    background: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 20px 60px rgba(23, 17, 38, 0.06)",
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
  packCard: {
    minHeight: 190,
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
  },
  code: {
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
  },
  linkBand: {
    borderRadius: 8,
    border: "1px solid rgba(7, 148, 85, 0.18)",
    background:
      "linear-gradient(135deg, rgba(7, 148, 85, 0.12), rgba(22, 163, 184, 0.08), rgba(245, 159, 0, 0.10))",
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

const AndroidViewportSizesPage = () => {
  const { classes } = useStyles();
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Android Viewport Sizes",
    gradientColors: ["#079455", "#16a3b8", "#f59f00"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Android Viewport Sizes: CSS Pixel Guide for Mobile QA - Sizzy"
        description="A practical Android viewport sizes table with Android CSS pixels, mobile responsive test sizes, breakpoint guidance, and QA links."
        url="https://sizzy.co/blog/android-viewport-sizes"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/blog/android-viewport-sizes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <main className={classes.page}>
        <Container size={1180}>
          <Box className={classes.hero}>
            <Stack spacing="lg">
              <Badge size="lg" radius="xl" className={classes.eyebrow} leftSection={<FaAndroid />}>
                Android CSS pixels guide
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Android Viewport Sizes: CSS Pixels to Test Before Mobile QA
              </Title>
              <Text className={classes.heroCopy}>
                Android viewport sizes are the CSS pixel widths your media queries actually see in
                Chrome and WebView. Use this guide to cover narrow phones, common Pixel and Galaxy
                widths, large Android screens, and foldable edges without testing every device name.
              </Text>
              <Group spacing="sm">
                <Button
                  component="a"
                  href="/tools/viewport-checker"
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "teal", to: "cyan" }}
                  rightIcon={<FaArrowRight />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "android_viewport_sizes_hero",
                      cta: "open_viewport_checker",
                    })
                  }
                >
                  Check a viewport
                </Button>
                <Button
                  component="a"
                  href="/tools/browser-size-cheat-sheet"
                  radius={8}
                  size="md"
                  variant="light"
                  rightIcon={<FaTable />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "android_viewport_sizes_hero",
                      cta: "open_browser_size_cheat_sheet",
                    })
                  }
                >
                  Build a QA pack
                </Button>
                <Anchor href="/tools/css-breakpoint-checker">CSS breakpoint checker</Anchor>
                <Anchor href="/tools/website-breakpoint-finder">Website breakpoint finder</Anchor>
                <Anchor href="/blog/iphone-viewport-sizes">iPhone viewport sizes</Anchor>
              </Group>
            </Stack>
          </Box>

          <Box className={classes.section}>
            <Card className={classes.panel} p="lg">
              <Group position="apart" align="start" mb="md">
                <Box>
                  <Title order={2}>Android viewport sizes table</Title>
                  <Text color="gray.7">
                    Treat these portrait values as practical Android CSS pixels for responsive web
                    QA. Browser UI, Display size, font scaling, address bars, orientation, and
                    foldable posture can change the usable height.
                  </Text>
                </Box>
                <Badge radius={8} color="teal" variant="light" leftSection={<FaRulerCombined />}>
                  CSS pixels
                </Badge>
              </Group>
              <Box className={classes.tableWrap}>
                <Table verticalSpacing="md" striped highlightOnHover>
                  <thead>
                    <tr>
                      <th>Android class</th>
                      <th>CSS viewport</th>
                      <th>Width</th>
                      <th>Typical DPR</th>
                      <th>Use it for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {androidRows.map((row) => (
                      <tr key={row.className}>
                        <td>{row.className}</td>
                        <td className={classes.widthCell}>{row.viewport}</td>
                        <td className={classes.widthCell}>{row.width}</td>
                        <td>{row.dpr}</td>
                        <td>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </Card>
          </Box>

          <Box className={classes.section}>
            <Stack spacing="md">
              <Title order={2}>The practical Android QA pack</Title>
              <Text color="gray.7">
                Start with mobile responsive test sizes that represent layout behavior, then add
                device-specific widths only when analytics, support tickets, or a recent bug points
                there.
              </Text>
              <SimpleGrid
                cols={4}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "sm", cols: 1 },
                ]}
              >
                {testPack.map((item) => (
                  <Card key={item.label} className={classes.packCard} p="lg">
                    <Text size="xs" color="dimmed" transform="uppercase" weight={800}>
                      {item.label}
                    </Text>
                    <Title order={3} mt={8}>
                      {item.widths}
                    </Title>
                    <Text mt="sm" color="gray.7">
                      {item.guidance}
                    </Text>
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
                <Title order={2}>How to use Android CSS pixels</Title>
                <Text color="gray.7">
                  Android devices vary by panel size, density, browser chrome, and user display
                  settings. Keep the viewport list focused on the widths where your content actually
                  changes shape.
                </Text>
                <Box component="ul" className={classes.list}>
                  {checklist.map((item) => (
                    <li key={item} className={classes.listItem}>
                      {item}
                    </li>
                  ))}
                </Box>
              </Stack>
            </Card>

            <Card className={classes.panel} p="xl">
              <Stack spacing="md">
                <Title order={2}>Breakpoint example</Title>
                <Text color="gray.7">
                  Avoid breakpoints named after Android models. Use ranges that cover real content
                  behavior, then validate the edges with synced viewports.
                </Text>
                <Box component="pre" className={classes.code}>
                  {cssExample}
                </Box>
              </Stack>
            </Card>
          </SimpleGrid>

          <Box className={classes.section}>
            <Box className={classes.linkBand}>
              <Group position="apart" align="center">
                <Box>
                  <Title order={2}>Turn the Android list into a repeatable responsive pass</Title>
                  <Text mt={8} color="gray.7">
                    Check one viewport, build a browser size pack, inspect CSS breakpoints, and plan
                    the exact widths to retest around each responsive layout change.
                  </Text>
                </Box>
                <Group spacing="sm">
                  {relatedTools.map((tool) => (
                    <Button
                      key={tool.href}
                      component="a"
                      href={tool.href}
                      radius={8}
                      variant="light"
                    >
                      {tool.title}
                    </Button>
                  ))}
                  <Button
                    component="a"
                    href="https://portal.sizzy.co/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    radius={8}
                    rightIcon={<FaExternalLinkAlt />}
                    onClick={(event) => {
                      captureSizzyEvent("cta_clicked", {
                        location: "android_viewport_sizes_midpage",
                        cta: "try_sizzy",
                        target_url: "https://portal.sizzy.co/pricing",
                      });
                      event.currentTarget.href = trackOutboundClick(
                        "https://portal.sizzy.co/pricing",
                        "Android viewport sizes CTA",
                        "android_viewport_sizes"
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
              <Title order={2}>Related Sizzy tools</Title>
              <SimpleGrid
                cols={4}
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
                    <Group spacing="xs" align="flex-start" noWrap>
                      <Box mt={4} c="teal.6">
                        <FaCheckCircle />
                      </Box>
                      <Title order={3}>{item.question}</Title>
                    </Group>
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

export default AndroidViewportSizesPage;
