import * as React from "react";
import { type ReactFC, cn } from "@/lib/utils";

export interface KbdClassNames {
  root?: string;
  key?: string;
  separator?: string;
}

export interface KbdProps {
  keys: string[];
  classNames?: KbdClassNames;
}

export const Kbd: ReactFC<KbdProps> = ({ keys, classNames = {} }) => {
  return (
    <div className={cn("flex items-center gap-1", classNames.root)}>
      {keys.map((key: string, index: number) => (
        <React.Fragment key={key}>
          <kbd
            className={cn(
              "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center rounded border px-1.5 font-mono text-[10px] font-medium select-none",
              classNames.key,
            )}
          >
            {key}
          </kbd>
          {index !== keys.length - 1 && (
            <span
              className={cn(
                "text-muted-foreground text-xs",
                classNames.separator,
              )}
            >
              +
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
