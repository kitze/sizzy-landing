import { ButtonProps } from "@mantine/core";
import GradientButton from "components/GradientButton";
import { captureSizzyEvent } from "utils/posthog";
import { trackButtonClick } from "utils/utils";

type T = ButtonProps & React.ComponentPropsWithoutRef<"a"> & { label?: string; center?: boolean };

const DownloadButton: React.FC<T> = (props) => {
  const { label = "Try now for free", center = true, ...rest } = props;

  return (
    <GradientButton
      href="https://portal.sizzy.co/pricing"
      onClick={() => {
        try {
          // @ts-ignore
          window.gtag?.("event", "download");
          trackButtonClick("Download");
          captureSizzyEvent("landing_trial_cta_clicked", {
            label,
            destination: "portal_pricing",
          });
        } catch (e) {}
      }}
      {...rest}
    >
      {label}
    </GradientButton>
  );
};

export default DownloadButton;
