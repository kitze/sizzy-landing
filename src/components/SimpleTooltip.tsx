"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { useKitzeUI } from "@/components/KitzeUIContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BottomDrawer } from "@/components/BottomDrawer";

// Define MobileViewType for SimpleTooltip
export type TooltipMobileViewType = "keep" | "popover" | "bottom-drawer";

interface SimpleTooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode; // Allow ReactNode for popover/drawer
  className?: string;
  tooltipClassName?: string;
  mobileView?: TooltipMobileViewType;
  drawerTitle?: string; // Title for the bottom drawer
}

export const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  children,
  content,
  className,
  tooltipClassName,
  mobileView = "keep",
  drawerTitle,
}): React.ReactNode => {
  const { isMobile } = useKitzeUI();

  if (!content) {
    return children;
  }

  // --- Mobile Rendering ---
  if (isMobile) {
    if (mobileView === "popover") {
      return (
        <Popover>
          <PopoverTrigger asChild className={className}>
            {children}
          </PopoverTrigger>
          <PopoverContent
            className={cn("w-auto max-w-[250px]", tooltipClassName)}
          >
            {content}
          </PopoverContent>
        </Popover>
      );
    }

    if (mobileView === "bottom-drawer") {
      return (
        <BottomDrawer
          trigger={children}
          title={drawerTitle}
          classNames={{ content: tooltipClassName }} // Pass tooltipClassName to drawer content
        >
          <div className="p-4">{content}</div>
        </BottomDrawer>
      );
    }
    // If mobileView is 'keep', fall through to default Tooltip rendering
  }

  // --- Default Tooltip Rendering (Desktop or mobileView='keep') ---
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent className={cn("max-w-[200px]", tooltipClassName)}>
            {typeof content === "string"
              ? content
              : "Tooltip content must be a string"}
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
};
