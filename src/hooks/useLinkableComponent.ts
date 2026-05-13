import Link from "next/link";

export interface LinkableProps {
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
}

export function useLinkableComponent<T extends LinkableProps>(props: T) {
  const { href, external, ...rest } = props;

  const linkProps = {
    ...rest,
    ...(external && {
      target: "_blank",
      rel: "noopener noreferrer",
    }),
  };

  const Component = href ? (external ? "a" : Link) : "div";

  return {
    Component,
    href,
    linkProps,
  };
}
