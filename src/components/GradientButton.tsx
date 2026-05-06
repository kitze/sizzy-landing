import { Button, useMantineTheme, ButtonProps } from "@mantine/core";
import { trackOutboundClick } from "utils/posthog";

type T = ButtonProps &
  React.ComponentPropsWithoutRef<"a"> & { href: string; center?: boolean };

export const GradientButton: React.FC<T> = (props) => {
  const { children, center = true, href, onClick, ...rest } = props;
  const { colors } = useMantineTheme();
  const label = typeof children === "string" ? children : "Gradient button";

  return (
    <Button
      size="xl"
      variant="gradient"
      target="_blank"
      href={href}
      component="a"
      onClick={(event) => {
        event.currentTarget.href = trackOutboundClick(href, label, "gradient_button");
        onClick?.(event as any);
      }}
      gradient={{ from: colors.purple[4], to: colors.pink[6] }}
      radius="xl"
      sx={{ alignSelf: center ? "center" : "flex-start" }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
