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
import { FaArrowRight, FaCheckCircle, FaMobileAlt, FaRulerCombined } from "react-icons/fa";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";

const viewportSet = [
  {
    label: "Small mobile",
    size: "360 to 390px",
    note: "Catches cramped navigation, two-line buttons, and narrow checkout forms.",
  },
  {
    label: "Large mobile",
    size: "412 to 430px",
    note: "Covers modern iPhones and Android phones without pretending every phone is the same.",
  },
  {
    label: "Tablet",
    size: "768 to 820px",
    note: "Shows whether the layout should stay mobile, move to columns, or use a tablet-specific state.",
  },
  {
    label: "Laptop",
    size: "1280 to 1440px",
    note: "The daily-driver desktop range where dashboards, navs, and marketing pages need to feel finished.",
  },
  {
    label: "Wide desktop",
    size: "1536 to 1920px",
    note: "Finds oversized line lengths, empty hero areas, and content that stops scaling gracefully.",
  },
];

const workflow = [
  "Start with one narrow mobile width before adding breakpoint CSS.",
  "Test just below and just above each important breakpoint.",
  "Compare logged-out, logged-in, loading, empty, and error states.",
  "Check sticky headers, cookie notices, support widgets, and popups on the first fold.",
  "Take screenshots before a release so visual regressions have a baseline.",
];

const faq = [
  {
    question: "What viewport sizes should I test for responsive design?",
    answer:
      "Test at least one small mobile width, one large mobile width, one tablet width, one laptop width, and one wide desktop width. Then add widths around the breakpoints used by your CSS framework.",
  },
  {
    question: "Should I test real devices or viewport sizes?",
    answer:
      "Use viewport sizes to catch layout problems quickly, then test real devices for browser behavior, touch input, device pixel ratio, and performance.",
  },
  {
    question: "How many responsive breakpoints does a website need?",
    answer:
      "Most websites can start with mobile, tablet, laptop, and wide desktop ranges. Add custom breakpoints only when real content breaks between those ranges.",
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
    background: "linear-gradient(180deg, #f6f2ff 0%, #ffffff 44%, #effcff 100%)",
    color: theme.colors.gray[8],
  },
  hero: {
    padding: "92px 0 32px",
    [theme.fn.smallerThan("sm")]: {
      padding: "62px 0 24px",
    },
  },
  eyebrow: {
    alignSelf: "flex-start",
    border: "1px solid rgba(102, 44, 185, 0.22)",
    background: "rgba(102, 44, 185, 0.08)",
    color: theme.colors.purple[7],
  },
  heroTitle: {
    maxWidth: 880,
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
    maxWidth: 760,
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
    background: "rgba(255, 255, 255, 0.86)",
    boxShadow: "0 20px 60px rgba(23, 17, 38, 0.06)",
  },
  viewportCard: {
    minHeight: 194,
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
  },
  callout: {
    borderRadius: 8,
    border: "1px solid rgba(102, 44, 185, 0.16)",
    background: "linear-gradient(135deg, rgba(102, 44, 185, 0.10), rgba(22, 163, 184, 0.10))",
    padding: 24,
  },
  listItem: {
    paddingLeft: 4,
    lineHeight: 1.7,
  },
  faqCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.72)",
  },
}));

const ResponsiveViewportSizesPage = () => {
  const { classes } = useStyles();
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "Responsive Viewport Sizes",
    gradientColors: ["#16a3b8", "#662cb9", "#171126"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="Responsive Viewport Sizes: What Widths Should You Test? - Sizzy"
        description="A practical responsive viewport size checklist for mobile, tablet, laptop, and wide desktop QA before you ship layout changes."
        url="https://sizzy.co/blog/responsive-viewport-sizes"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/blog/responsive-viewport-sizes" />
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
                Responsive design guide
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                Responsive Viewport Sizes: What Widths Should You Test?
              </Title>
              <Text className={classes.heroCopy}>
                The best viewport list is small enough to run every release and wide enough to catch
                the breakpoints where real layouts fail.
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
                      location: "responsive_viewport_sizes",
                      cta: "check_viewport",
                    })
                  }
                >
                  Check a viewport
                </Button>
                <Button
                  component="a"
                  href="/tools/responsive-screenshot-generator"
                  radius={8}
                  size="md"
                  variant="light"
                  rightIcon={<FaArrowRight />}
                  onClick={() =>
                    captureSizzyEvent("cta_clicked", {
                      location: "responsive_viewport_sizes",
                      cta: "generate_screenshots",
                    })
                  }
                >
                  Generate screenshots
                </Button>
                <Anchor href="/tools/responsive-qa-checklist">QA checklist</Anchor>
                <Anchor href="/tools/website-breakpoint-finder">Breakpoint finder</Anchor>
                <Anchor href="/features/responsive-mode">Responsive mode</Anchor>
                <Anchor href="/features/device-simulation">Device simulation</Anchor>
              </Group>
            </Stack>
          </Box>

          <Box className={classes.section}>
            <Card className={classes.panel} p="xl">
              <Stack spacing="md">
                <Title order={2}>The practical viewport set</Title>
                <Text color="gray.7">
                  Start with these five ranges before you make a custom QA matrix. They cover the
                  places where navigation, cards, forms, screenshots, and dashboards usually break.
                </Text>
                <SimpleGrid
                  cols={5}
                  breakpoints={[
                    { maxWidth: "md", cols: 2 },
                    { maxWidth: "xs", cols: 1 },
                  ]}
                >
                  {viewportSet.map((item) => (
                    <Card key={item.label} className={classes.viewportCard} p="lg">
                      <Stack spacing="xs">
                        <Text size="xs" color="dimmed" transform="uppercase" weight={800}>
                          {item.label}
                        </Text>
                        <Title order={3}>{item.size}</Title>
                        <Text color="gray.7">{item.note}</Text>
                      </Stack>
                    </Card>
                  ))}
                </SimpleGrid>
              </Stack>
            </Card>
          </Box>

          <SimpleGrid
            className={classes.section}
            cols={2}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            <Card className={classes.panel} p="xl">
              <Stack spacing="md">
                <Title order={2}>How to choose extra widths</Title>
                <Text color="gray.7">
                  Add a viewport when content breaks, not because another device exists. Test widths
                  around your CSS breakpoints, then keep the list short enough that the team
                  actually runs it.
                </Text>
                <Box component="ol" pl={20} my={0}>
                  {workflow.map((item) => (
                    <Text key={item} component="li" className={classes.listItem} color="gray.7">
                      {item}
                    </Text>
                  ))}
                </Box>
              </Stack>
            </Card>

            <Card className={classes.panel} p="xl">
              <Stack spacing="md">
                <Title order={2}>Where the bugs hide</Title>
                {[
                  "Navigation that wraps between 390px and 430px.",
                  "Cards that become too wide on tablets but too cramped on phones.",
                  "Fixed sidebars, chat widgets, and cookie banners that cover calls to action.",
                  "Desktop dashboards that leave columns unreadable below 1280px.",
                ].map((item) => (
                  <Group key={item} spacing="sm" align="flex-start" noWrap>
                    <Box mt={4} c="teal.6">
                      <FaCheckCircle />
                    </Box>
                    <Text color="gray.7">{item}</Text>
                  </Group>
                ))}
              </Stack>
            </Card>
          </SimpleGrid>

          <Box className={classes.section}>
            <Box className={classes.callout}>
              <Group position="apart" align="center">
                <Box>
                  <Title order={2}>Turn the list into an actual QA pass</Title>
                  <Text mt={8} color="gray.7">
                    Use the free viewport checker for a quick breakpoint report, then open the same
                    site in Sizzy when you need synchronized scrolling, screenshots, and real pages.
                  </Text>
                </Box>
                <Group spacing="sm">
                  <Button component="a" href="/tools/viewport-checker" radius={8} size="lg">
                    Check viewport
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
                    href="/tools/website-breakpoint-finder"
                    radius={8}
                    size="lg"
                    variant="light"
                  >
                    Find breakpoints
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
                        location: "responsive_viewport_sizes",
                        cta: "try_sizzy",
                        target_url: "https://portal.sizzy.co/pricing",
                      });
                      event.currentTarget.href = trackOutboundClick(
                        "https://portal.sizzy.co/pricing",
                        "Responsive viewport sizes CTA",
                        "responsive_viewport_sizes"
                      );
                    }}
                  >
                    Try Sizzy
                  </Button>
                </Group>
              </Group>
            </Box>
          </Box>

          <SimpleGrid
            className={classes.section}
            cols={3}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {faq.map((item) => (
              <Card key={item.question} className={classes.faqCard} p="lg">
                <Title order={3}>{item.question}</Title>
                <Divider my="sm" />
                <Text color="gray.7">{item.answer}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </main>
    </Shell>
  );
};

export default ResponsiveViewportSizesPage;
