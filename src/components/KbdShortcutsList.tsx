import * as React from "react";
import { type ReactFC, cn } from "@/lib/utils";
import { KbdShortcuts } from "@/components/KbdShortcuts";
import { type KbdClassNames } from "@/components/Kbd";

export interface ShortcutItem {
  label: string;
  shortcuts: string[];
  separator?: string | null;
}

export interface KbdShortcutsListClassNames extends KbdClassNames {
  list?: string;
  item?: string;
  label?: string;
}

export interface KbdShortcutsListProps {
  shortcuts: ShortcutItem[];
  classNames?: KbdShortcutsListClassNames;
}

export const KbdShortcutsList: ReactFC<KbdShortcutsListProps> = ({
  shortcuts,
  classNames = {},
}) => {
  return (
    <div className={cn("space-y-3", classNames.list)}>
      {shortcuts.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className={cn(
            "hover:bg-muted/60 dark:hover:bg-muted/25 flex items-center justify-between rounded-md px-3 py-1.5 transition-colors",
            classNames.item,
          )}
        >
          <span className={cn("text-sm", classNames.label)}>{item.label}</span>
          <KbdShortcuts
            shortcuts={item.shortcuts}
            separator={item.separator}
            classNames={{
              root: classNames.root,
              key: classNames.key,
              separator: classNames.separator,
            }}
          />
        </div>
      ))}
    </div>
  );
};
