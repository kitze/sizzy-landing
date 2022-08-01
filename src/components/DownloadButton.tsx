import { Button, useMantineTheme, ButtonProps } from "@mantine/core";
import { trackButtonClick } from "utils/utils";

const DownloadButton: React.FC<{ label?: string } & ButtonProps<"a">> = (
  props
) => {
  const { label = "Download Sizzy", ...rest } = props;
  const { colors } = useMantineTheme();

  return (
    <Button
      size="md"
      variant="gradient"
      target="_blank"
      href="https://portal.sizzy.co/download"
      component="a"
      gradient={{ from: colors.purple[4], to: colors.pink[6] }}
      radius="xl"
      sx={{
        alignSelf: "center",
      }}
      {...rest}
      onClick={() => {
        try {
          // @ts-ignore
          window.gtag("event", "download");
          trackButtonClick("Download");
        } catch (e) {}
      }}
    >
      {label}
    </Button>
  );
};

export default DownloadButton;
