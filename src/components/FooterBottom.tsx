"use client";

import { cn } from "@/lib/utils";

export interface FooterBottomProps {
  /** Variant of the "built by" text */
  variant?: "full" | "minimal";
  /** Additional className */
  className?: string;
}

export const FooterBottom = ({
  variant = "full",
  className,
}: FooterBottomProps) => {
  return (
    <div
      className={cn(
        "mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4",
        className
      )}
    >
      <div className="text-xs text-zinc-600">
        © {new Date().getFullYear()} Kitze. All rights reserved.
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-600">
        {variant === "full" ? (
          <>
            <span>"Built" by</span>
            <a
              href="https://x.com/thekitze"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              @thekitze
            </a>
            <span>with</span>
            <span className="inline-flex gap-1">
              <span>😡</span>
              <span>&</span>
              <span>swearing at LLMs</span>
            </span>
          </>
        ) : (
          <>
            <span>Made by</span>
            <a
              href="https://x.com/thekitze"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              @thekitze
            </a>
          </>
        )}
      </div>
    </div>
  );
};
