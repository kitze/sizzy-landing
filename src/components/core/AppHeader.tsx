"use client";

import { Logo } from "./Logo";
import { AppHeaderUser } from "./HeaderUser";
import { blogLink, chatLink, homeLink } from "@/config/links";
import { useKitzeUI } from "@/components/KitzeUIContext";
import { ThemeSwitchMinimalNextThemes } from "@/components/ThemeSwitchMinimalNextThemes";
import { HeaderCustomized } from "@/components/core/HeaderCustomized";
import { HeaderLinks } from "@/components/core/HeaderLinks";

export default function AppHeader() {
  const { isMobile } = useKitzeUI();

  // Links are filtered inside the respective components
  const userLinks = [homeLink, blogLink];
  const headerLinks = [chatLink];

  return (
    <HeaderCustomized
      classNames={{
        root: "relative",
      }}
      leftSide={
        <div className="horizontal gap-2">
          <Logo />
        </div>
      }
      renderRightSide={() => (
        <div className="horizontal center-v gap-4">
          {!isMobile && <HeaderLinks links={headerLinks} />}
          <ThemeSwitchMinimalNextThemes buttonProps={{ variant: "ghost" }} />
          <AppHeaderUser links={userLinks} />
        </div>
      )}
    />
  );
}
