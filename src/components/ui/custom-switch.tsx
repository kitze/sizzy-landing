"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { tv, type VariantProps } from "tailwind-variants";

const switchVariants = tv({
  base: "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  variants: {
    size: {
      xs: "h-4 w-7",
      sm: "h-5 w-9",
      md: "h-6 w-11",
      lg: "h-7 w-14",
      xl: "h-8 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const thumbVariants = tv({
  base: "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  variants: {
    size: {
      xs: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
      sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      xl: "h-7 w-7 data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface CustomSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  thumbClassName?: string;
}

const CustomSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  CustomSwitchProps
>(({ className, thumbClassName, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(thumbVariants({ size, className: thumbClassName }))}
    />
  </SwitchPrimitives.Root>
));

CustomSwitch.displayName = "CustomSwitch";

export { CustomSwitch };
