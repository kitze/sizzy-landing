import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SwitchCardProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function SwitchCard({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
}: SwitchCardProps) {
  return (
    <div
      className={cn(
        "hover:bg-accent bg-foreground/3 flex items-center justify-between rounded-lg p-4 transition-colors",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
    >
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={disabled ? undefined : onCheckedChange}
        onClick={(e) => e.stopPropagation()}
        disabled={disabled}
      />
    </div>
  );
}
