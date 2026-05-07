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
  FaArrowRight,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaRulerCombined,
  FaTable,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";

const iphoneRows = [
  {
    models: "iPhone 5, 5s, SE (1st gen)",
    viewport: "320 x 568",
    width: "320px",
    dpr: "2x",
    note: "Legacy tiny-phone guardrail for cramped forms, menus, and fixed-width content.",
  },
  {
    models: "iPhone 6, 7, 8, SE (2nd/3rd gen)",
    viewport: "375 x 667",
    width: "375px",
    dpr: "2x",
    note: "Short-screen iPhone size for checkout, keyboard, banner, and sticky CTA testing.",
  },
  {
    models: "iPhone X, XS, 11 Pro, 12/13 mini",
    viewport: "375 x 812",
    width: "375px",
    dpr: "3x",
    note: "Same width as SE, taller screen; useful for safe-area and notch checks.",
  },
  {
    models: "iPhone 12, 13, 14, 16e",
    viewport: "390 x 844",
    width: "390px",
    dpr: "3x",
    note: "A reliable everyday iPhone baseline for mobile viewport sizes.",
  },
  {
    models: "iPhone 14 Pro, 15, 15 Pro, 16",
    viewport: "393 x 852",
    width: "393px",
    dpr: "3x",
    note: "Common modern iPhone CSS pixels for nav, pricing cards, and product pages.",
  },
  {
    models: "iPhone 16 Pro, 17, 17 Pro",
    viewport: "402 x 874",
    width: "402px",
    dpr: "3x",
    note: "Newer Pro-sized width; good for layouts tuned too tightly around 390px.",
  },
  {
    models: "iPhone XR, XS Max, 11, 11 Pro Max",
    viewport: "414 x 896",
    width: "414px",
    dpr: "2x or 3x",
    note: "Large classic iPhone width where rows, cards, and media often reflow.",
  },
  {
    models: "iPhone Air",
    viewport: "420 x 912",
    width: "420px",
    dpr: "3x",
    note: "Mid-large current iPhone width between standard Pro and Max models.",
  },
  {
    models: "iPhone 14 Plus",
    viewport: "428 x 926",
    width: "428px",
    dpr: "3x",
    note: "Large Plus-size viewport for wide phone grids and image crops.",
  },
  {
    models: "iPhone 14 Pro Max, 15 Plus, 15 Pro Max, 16 Plus",
    viewport: "430 x 932",
    width: "430px",
    dpr: "3x",
    note: "Large modern iPhone CSS width before the newest Pro Max jump.",
  },
  {
    models: "iPhone 16 Pro Max, 17 Pro Max",
    viewport: "440 x 956",
    width: "440px",
    dpr: "3x",
    note: "Largest common iPhone viewport size to catch over-comfortable mobile layouts.",
  },
];

const testingPack = [
  {
    label: "Small iPhone",
    widths: "320px, 375px",
    guidance:
      "Use this range for mobile navigation, forms, cookie banners, checkout steps, and any CTA that must stay reachable above the keyboard.",
  },
  {
    label: "Modern default iPhone",
    widths: "390px, 393px, 402px",
    guidance:
      "Use these iPhone CSS pixels as your daily mobile QA set before adding another breakpoint.",
  },
  {
    label: "Large iPhone",
    widths: "414px, 420px, 428px, 430px, 440px",
    guidance:
      "Use the wide-phone range to catch grids, cards, galleries, sticky footers, and layout rules that should not become tablet UI yet.",
  },
  {
    label: "Landscape pass",
    widths: "568px to 956px wide",
    guidance:
      "Rotate only the highest-risk states: nav open, modal open, form errors, sticky header, and dense product or dashboard views.",
  },
];

const checklist = [
  "Use CSS pixels for media queries, not physical screen resolution.",
  "Keep breakpoints tied to content problems instead of exact iPhone model names.",
  "Test just below and just above 390px, 402px, 430px, and 440px when mobile CSS changes.",
  "Check safe-area padding, notch spacing, sticky bars, and bottom CTAs on tall iPhones.",
  "Run one landscape pass before shipping important forms, menus, and overlays.",
];

const relatedTools = [
  {
    title: "Viewport Checker",
    href: "/tools/viewport-checker",
    description:
      "Check any iPhone viewport width, breakpoint category, aspect ratio, and CSS helper.",
  },
  {
    title: "Browser Size Cheat Sheet",
    href: "/tools/browser-size-cheat-sheet",
    description:
      "Build a practical mobile viewport sizes pack for product, marketing, and checkout pages.",
  },
  {
    title: "CSS Breakpoint Checker",
    href: "/tools/css-breakpoint-checker",
    description:
      "Paste media queries or Tailwind screens and find breakpoint gaps around iPhone widths.",
  },
  {
    title: "Screenshot Comparison Checklist",
    href: "/tools/screenshot-comparison-checklist",
    description:
      "Plan baseline and candidate screenshots across iPhone, tablet, and desktop states.",
  },
];

const faq = [
  {
    question: "What are iPhone viewport sizes?",
    answer:
      "iPhone viewport sizes are the CSS pixel dimensions that Safari, Chrome, and responsive CSS use after device pixel ratio scaling. They are smaller than physical screen resolution.",
  },
  {
    question: "What iPhone CSS pixels should I test first?",
    answer:
      "Start with 375px for small iPhones, 390px or 393px for common modern iPhones, 402px for newer Pro-sized iPhones, and 430px or 440px for large iPhones.",
  },
  {
    question: "Are iPhone viewport sizes and screen resolutions the same?",
    answer:
      "No. Screen resolution counts physical pixels. CSS media queries use CSS pixels, so a 1206px-wide iPhone display can behave like a 402px-wide viewport.",
  },
  {
    question: "Should I create CSS breakpoints for every iPhone model?",
    answer:
      "No. Use iPhone viewport sizes to find where the layout breaks, then create content-based breakpoints that cover ranges instead of individual devices.",
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

const cssExample = `@media (max-width: 374px) {
  /* Tiny iPhones and older narrow phones */
}

@media (min-width: 375px) and (max-width: 439px) {
  /* Most iPhone CSS pixel widths */
}

@media (min-width: 440px) {
  /* Large iPhone Pro Max and wider mobile */
}`;

const useStyles = createStyles((theme) => ({
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f4fbff 0%, #ffffff 42%, #fff8ed 100%)",
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
    border: "1px solid rgba(22, 163, 184, 0.24)",
    background: "rgba(22, 163, 184, 0.09)",
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
    maxWidth: 790,
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
    border: "1px solid rgba(22, 163, 184, 0.18)",
    background:
      "linear-gradient(135deg, rgba(22, 163, 184, 0.12), rgba(102, 44, 185, 0.08), rgba(245, 159, 0, 0.10))",
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

const IphoneViewportSizesPage = () => {
  const { classes } = useStyles();
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "iPhone Viewport Sizes",
    gradientColors: ["#16a3b8", "#662cb9", "#f59f00"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="iPhone Viewport Sizes: CSS Pixel Guide for Mobile QA - Sizzy"
        description="A practical iPhone viewport sizes table with iPhone CSS pixels, mobile viewport sizes, breakpoint guidance, and QA links for responsive testing."
        url="https://sizzy.co/blog/iphone-viewport-sizes"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/blog/iphone-viewport-sizes" />
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
                leftSection={<FaMobileAlt />}
              >
                iPhone CSS pixels guide
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                iPhone Viewport Sizes: CSS Pixels to Test Before You Ship
              </Title>
              <Text className={classes.heroCopy}>
                iPhone viewport sizes are the CSS pixel widths your media queries actually see. Use
                this table to plan a small mobile QA pass that covers old SE screens, modern
                standard iPhones, Plus models, and Pro Max layouts.
              </Text>
              <Group spacing="sm">
                <Button
                  component="a"
                  href="/tools/viewport-checker"
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "cyan", to: "purple" }}
                  rightIcon={<FaArrowRight />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "iphone_viewport_sizes_hero",
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
                      location: "iphone_viewport_sizes_hero",
                      cta: "open_browser_size_cheat_sheet",
                    })
                  }
                >
                  Build a QA pack
                </Button>
                <Anchor href="/tools/css-breakpoint-checker">CSS breakpoint checker</Anchor>
                <Anchor href="/tools/screenshot-comparison-checklist">
                  Screenshot comparison checklist
                </Anchor>
              </Group>
            </Stack>
          </Box>

          <Box className={classes.section}>
            <Card className={classes.panel} p="lg">
              <Group position="apart" align="start" mb="md">
                <Box>
                  <Title order={2}>iPhone viewport sizes table</Title>
                  <Text color="gray.7">
                    These portrait values are practical iPhone CSS pixels. Browser chrome, Display
                    Zoom, orientation, and safe-area insets can change the usable height, so treat
                    height as a testing baseline rather than a promise.
                  </Text>
                </Box>
                <Badge radius={8} color="cyan" variant="light" leftSection={<FaRulerCombined />}>
                  CSS pixels
                </Badge>
              </Group>
              <Box className={classes.tableWrap}>
                <Table verticalSpacing="md" striped highlightOnHover>
                  <thead>
                    <tr>
                      <th>iPhone model examples</th>
                      <th>CSS viewport</th>
                      <th>Width</th>
                      <th>DPR</th>
                      <th>Use it for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iphoneRows.map((row) => (
                      <tr key={row.models}>
                        <td>{row.models}</td>
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
              <Title order={2}>The practical iPhone QA pack</Title>
              <Text color="gray.7">
                You do not need every model in every release. Start with a few representative mobile
                viewport sizes, then add exact widths only when analytics or a recent bug points
                there.
              </Text>
              <SimpleGrid
                cols={4}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "sm", cols: 1 },
                ]}
              >
                {testingPack.map((item) => (
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
                <Title order={2}>How to use iPhone CSS pixels</Title>
                <Text color="gray.7">
                  Media queries respond to CSS pixels, not the physical panel resolution. A 3x
                  iPhone can have more than 1200 physical pixels across and still behave like a
                  402px viewport in CSS.
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
                  Exact device queries get brittle quickly. Use viewport clusters to define ranges,
                  then test the content at the edges with Sizzy.
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
                  <Title order={2}>Turn the iPhone list into a real responsive pass</Title>
                  <Text mt={8} color="gray.7">
                    Check a single viewport, generate a browser size pack, validate CSS breakpoints,
                    then compare screenshots across the mobile states that matter.
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
                        location: "iphone_viewport_sizes_midpage",
                        cta: "try_sizzy",
                        target_url: "https://portal.sizzy.co/pricing",
                      });
                      event.currentTarget.href = trackOutboundClick(
                        "https://portal.sizzy.co/pricing",
                        "iPhone viewport sizes CTA",
                        "iphone_viewport_sizes"
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

export default IphoneViewportSizesPage;
