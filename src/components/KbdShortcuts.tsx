import * as React from "react";
import { type ReactFC, cn } from "@/lib/utils";
import { Kbd, type KbdClassNames } from "@/components/Kbd";

export interface KbdShortcutsProps {
  shortcuts: string[];
  separator?: string | null;
  classNames?: KbdClassNames;
}

export const KbdShortcuts: ReactFC<KbdShortcutsProps> = ({
  shortcuts,
  separator = "+",
  classNames = {},
}) => {
  return (
    <div className={cn("flex items-center gap-1.5", classNames.root)}>
      {shortcuts.map((shortcut: string, index: number) => (
        <React.Fragment key={`${shortcut}-${index}`}>
          <Kbd
            keys={[shortcut]}
            classNames={{
              root: "",
              key: classNames.key,
              separator: classNames.separator,
            }}
          />
          {separator !== null && index !== shortcuts.length - 1 && (
            <span
              className={cn(
                "text-muted-foreground text-xs",
                classNames.separator,
              )}
            >
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
