import {
  Anchor,
  Burger,
  Button,
  Container,
  Group,
  Header,
  Image,
  Menu,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { headerLinks, learnPopupLinks, mobileLinks } from "config/links";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useStyles } from "sections/HeaderSection/Header/styles";
import HeaderLink from "sections/HeaderSection/HeaderLink";
import { HeaderMenu } from "sections/HeaderSection/HeaderMenu";
import { ReactFC } from "types";
import { trackOutboundClick } from "utils/posthog";

export const HEADER_HEIGHT = 60;

export const ResponsiveHeader: ReactFC<{}> = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();

  const { route } = useRouter();

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <NextLink href="/" passHref>
          <Group
            sx={{
              cursor: "pointer",
              flexWrap: "nowrap",
              justifyContent: "space-around",
            }}
            spacing={10}
          >
            <Image sx={{ width: 30, maxWidth: 30, maxHeight: 30, height: 30 }} src="/logo.png" />
            <Title order={3} sx={(t) => ({ color: t.colors.dark[4] })}>
              Sizzy
            </Title>
          </Group>
        </NextLink>
        <Group spacing={0} className={classes.links}>
          {headerLinks.map((link) => (
            <HeaderLink key={link.link} activeRoute={route} link={link} closeMenu={close} />
          ))}
          <HeaderMenu title="Learn" links={learnPopupLinks} />
          {/*<HeaderMenu title="Company" links={companyLinks} />*/}
        </Group>

        <Button
          className={classes.links}
          component="a"
          href="https://portal.sizzy.co/login"
          size="sm"
          variant="light"
          onClick={(event) => {
            event.currentTarget.href = trackOutboundClick(
              "https://portal.sizzy.co/login",
              "Log in",
              "header_login"
            );
          }}
        >
          Log in
        </Button>

        <Menu onChange={(o) => (o === true ? open() : close())} shadow="md" width="100%">
          <Menu.Target>
            <Burger opened={opened} onClick={open} className={classes.burger} size="sm" />
          </Menu.Target>

          <Menu.Dropdown>
            {mobileLinks.map((link) => (
              <NextLink key={link.link} passHref href={link.link}>
                <Menu.Item>{link.label}</Menu.Item>
              </NextLink>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Container>
    </Header>
  );
};
