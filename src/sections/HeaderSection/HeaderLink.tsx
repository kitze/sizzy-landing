import { createStyles, Indicator } from "@mantine/core";
import HeaderButton from "sections/HeaderSection/HeaderButton";
import Conditional from "conditional-wrap";
import NextLink from "next/link";
import React from "react";
import { LinkType, ReactFC } from "types";
import { trackOutboundClick } from "utils/posthog";
import { trackButtonClick } from "utils/utils";

const HeaderLink: ReactFC<{
  link: LinkType;
  activeRoute: string;
  closeMenu: () => void;
}> = ({ closeMenu, link, activeRoute }) => {
  const isActive = link.link === activeRoute || `${link.link}/[slug]` === activeRoute;

  return (
    <Conditional
      condition={!!link.counter && !isActive}
      wrap={(c) => (
        <Indicator
          color="red"
          position="top-end"
          inline
          label={link.counter || 0}
          size={16}
          processing
          offset={5}
        >
          {c}
        </Indicator>
      )}
    >
      <Conditional
        condition={!link.isExternal}
        wrap={(c) => (
          <NextLink href={link.link} passHref>
            {c}
          </NextLink>
        )}
      >
        <HeaderButton
          size="md"
          {...(link.isExternal && {
            component: "a",
            target: "_blank",
            rel: "noreferrer",
            href: link.link,
          })}
          {...(isActive && {
            sx: (theme) => ({ color: theme.colors.purple[6] }),
          })}
          onClick={(event) => {
            closeMenu();
            trackButtonClick(link.label);
            if (link.isExternal) {
              (event.currentTarget as unknown as HTMLAnchorElement).href = trackOutboundClick(
                link.link,
                link.label,
                "header"
              );
            }
          }}
        >
          {link.label}
        </HeaderButton>
      </Conditional>
    </Conditional>
  );
};

export default HeaderLink;
