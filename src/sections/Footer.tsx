import { Anchor, Container, createStyles, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { LinkType } from "types";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  links: LinkType[];
}

export function FooterSimple({ links }: FooterSimpleProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Link key={link.link} href={link.link} passHref legacyBehavior>
      <Anchor color="dimmed" size="sm">
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Stack>
          <Title>Sizzy </Title>
          <Text color="dimmed" size="sm">
            © {new Date().getFullYear()} Zekit. All rights reserved.
          </Text>
        </Stack>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
