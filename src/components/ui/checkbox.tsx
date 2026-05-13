"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { type ReactFC, cn } from "@/lib/utils";

export interface CheckboxClassNames {
  root?: string;
  checkbox?: string;
  indicator?: string;
  label?: string;
}

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "onChange"
  > {
  label?: string;
  classNames?: CheckboxClassNames;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: ReactFC<CheckboxProps> = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, classNames = {}, onChange, ...props }, ref) => (
  <div className={cn("flex items-center space-x-2", classNames.root)}>
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      className={cn(
        "peer border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-sm border shadow-sm focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className,
        classNames.checkbox,
      )}
      onCheckedChange={onChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "flex items-center justify-center text-current",
          classNames.indicator,
        )}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <label
        htmlFor={id}
        className={cn(
          "text-sm leading-none font-medium",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          classNames.label,
        )}
      >
        {label}
      </label>
    )}
  </div>
));

Checkbox.displayName = "Checkbox";
