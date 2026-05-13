import { PropsWithChildren } from "react";
import { LucideIcon } from "lucide-react";

export type ReactFC<T> = React.FC<PropsWithChildren & T>;
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export interface SelectOption {
  value: string;
  label?: string;
  emoji?: string;
  icon?: LucideIcon;
  closeOnClick?: boolean;
  disabled?: boolean;
}
