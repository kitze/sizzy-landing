import * as React from "react";
import { cn, ReactFC, Size, processColor } from "@/lib/utils";
import { ConditionalTooltip } from "@/components/ConditionalTooltip";
import { Spinner } from "@/components/Spinner";
import { tv } from "tailwind-variants";

const DEFAULT_LIGHT_COLOR = "bg-zinc-900"; // Example default light color
const DEFAULT_DARK_COLOR = "bg-zinc-100"; // Example default dark color

type SizeStyle = {
  iconSize?: number;
};

export const sizeStyles: Record<Size, SizeStyle> = {
  xs: {
    iconSize: 14,
  },
  sm: {
    iconSize: 16,
  },
  md: {
    iconSize: 16,
  },
  lg: {
    iconSize: 20,
  },
  xl: {
    iconSize: 24,
  },
};

export const spinnerSizeMap: Record<Size, number> = {
  xs: 14,
  sm: 16,
  md: 16,
  lg: 20,
  xl: 24,
};

export const defaultIconSizes: Record<Size, number> = {
  xs: 14,
  sm: 16,
  md: 16,
  lg: 20,
  xl: 24,
};

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all cursor-pointer active:scale-95 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      filled:
        "bg-[var(--button-color)] text-white dark:bg-[var(--button-dark-color)] dark:text-black hover:opacity-90",
      light:
        "bg-[var(--button-color)]/10 text-[var(--button-color)] dark:bg-[var(--button-dark-color)]/10 dark:text-[var(--button-dark-color)] hover:bg-[var(--button-color)]/20 dark:hover:bg-[var(--button-dark-color)]/20",
      outline:
        "border border-[var(--button-color)]/50 text-[var(--button-color)] bg-transparent dark:border-[var(--button-dark-color)]/50 dark:text-[var(--button-dark-color)] hover:bg-[var(--button-color)]/10 dark:hover:bg-[var(--button-dark-color)]/10",
      ghost:
        "text-[var(--button-color)] bg-transparent dark:text-[var(--button-dark-color)] hover:bg-[var(--button-color)]/10 dark:hover:bg-[var(--button-dark-color)]/10",
      link: "text-[var(--button-color)] dark:text-[var(--button-dark-color)] underline-offset-4 hover:underline",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
    shape: {
      default: "rounded-md",
      circle: "rounded-full!",
    },
    isIconButton: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "light",
      color: "secondary",
      class: "text-red-500!",
    },
    {
      isIconButton: true,
      size: "xs",
      class:
        "min-h-6 min-w-6 h-6 w-6 max-h-6 max-w-6 flex items-center justify-center",
    },
    {
      isIconButton: true,
      size: "sm",
      class:
        "min-h-8 min-w-8 h-8 w-8 max-h-8 max-w-8 flex items-center justify-center",
    },
    {
      isIconButton: true,
      size: "md",
      class:
        "min-h-10 min-w-10 h-10 w-10 max-h-10 max-w-10 flex items-center justify-center",
    },
    {
      isIconButton: true,
      size: "lg",
      class:
        "min-h-12 min-w-12 h-12 w-12 max-h-12 max-w-12 flex items-center justify-center",
    },
    {
      isIconButton: false,
      size: "xs",
      class: "h-7 px-2",
    },
    {
      isIconButton: false,
      size: "sm",
      class: "h-9 px-3",
    },
    {
      isIconButton: false,
      size: "md",
      class: "h-10 px-4",
    },
    {
      isIconButton: false,
      size: "lg",
      class: "h-12 px-5",
    },
  ],
  defaultVariants: {
    variant: "filled",
    size: "md",
    shape: "default",
    isIconButton: false,
  },
});

// Add a custom type for button variants
export type ButtonVariantsProps = React.ComponentProps<
  typeof buttonVariants
> & {
  class?: string;
};

export type CustomButtonVariant =
  | "filled"
  | "light"
  | "outline"
  | "ghost"
  | "link";

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: CustomButtonVariant;
  color?: string;
  darkColor?: string;
  circle?: boolean;
  icon?: React.ElementType;
  iconSize?: number;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  loading?: boolean;
  href?: string;
  external?: boolean;
  as?: React.ElementType;
  tooltip?: React.ReactNode;
  classNames?: {
    icon?: string;
    tooltip?: string;
  };
}

type ColorValue = {
  bg: string;
  text: string;
};

export const CustomButton: ReactFC<CustomButtonProps> = ({
  className,
  variant = "filled",
  size = "md",
  circle = false,
  color,
  darkColor,
  style,
  icon: Icon,
  iconSize,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftSide,
  rightSide,
  loading,
  children,
  classNames = {},
  href,
  external,
  disabled = false,
  as,
  tooltip,
  ...props
}) => {
  // Determine component type based on href or 'as' prop
  const Component = as || (href ? "a" : "button");

  let finalColorValue: string;
  let finalDarkColorValue: string;

  if (color) {
    // User provided a color
    finalColorValue = color; // color is guaranteed string here due to the if check
    finalDarkColorValue = darkColor ?? color; // Use darkColor if provided, else fallback to the provided color
  } else {
    // User provided no color, use defaults
    finalColorValue = DEFAULT_LIGHT_COLOR;
    finalDarkColorValue = darkColor ?? DEFAULT_DARK_COLOR; // Use darkColor if provided, else fallback to default dark
  }

  const finalColor = processColor(finalColorValue);
  const finalDarkColor = processColor(finalDarkColorValue);

  //if size is not found in sizeStyles, throw an error
  if (!sizeStyles[size]) {
    throw new Error(`Invalid size: ${size}`);
  }

  const foundSizeStyle = sizeStyles[size] || sizeStyles.md;
  const defaultIconSize = foundSizeStyle.iconSize ?? defaultIconSizes[size];
  const finalIconSize = iconSize ?? defaultIconSize;
  const hasIcon = !!Icon || !!LeftIcon || !!RightIcon;
  const isIconOnly = circle || (!children && hasIcon);

  const renderIcon = (
    IconComponent: React.ElementType | undefined,
    className?: string
  ) =>
    IconComponent && (
      <IconComponent
        size={finalIconSize}
        className={cn(classNames.icon, "shrink-0", className)}
      />
    );

  const buttonContent = loading ? (
    <>
      <Spinner size={size} className="shrink-0 text-current" />
      {!isIconOnly && <span className="truncate">{children}</span>}
    </>
  ) : (
    <>
      {leftSide || renderIcon(LeftIcon)}
      {Icon
        ? renderIcon(Icon)
        : children && <span className="truncate">{children}</span>}
      {rightSide || renderIcon(RightIcon)}
    </>
  );

  // Setup attributes based on the component type
  const buttonAttributes: any = {
    className: buttonVariants({
      variant,
      size,
      shape: circle ? "circle" : "default",
      isIconButton: isIconOnly,
      class: className,
    }),
    style: {
      "--button-color": `var(--color-${finalColor})`,
      "--button-dark-color": `var(--color-${finalDarkColor})`,
      ...style,
    } as React.CSSProperties,
    ...props,
  };

  // Add specific attributes based on component type
  if (Component === "button" || typeof Component === "string" && Component === "button") {
    buttonAttributes.disabled = disabled || loading;
  } else if (Component === "a" || (typeof Component === "string" && Component === "a")) {
    buttonAttributes.href = href;
    if (external) {
      buttonAttributes.target = "_blank";
      buttonAttributes.rel = "noopener noreferrer";
    }
  }

  const button = <Component {...buttonAttributes}>{buttonContent}</Component>;

  return tooltip ? (
    <ConditionalTooltip
      content={String(tooltip)}
      condition={true}
      classNames={{ tooltip: classNames.tooltip }}
    >
      {button}
    </ConditionalTooltip>
  ) : (
    button
  );
};

CustomButton.displayName = "CustomButton";
