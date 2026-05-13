import React from "react";
import { cn } from "@/lib/utils";

interface MacWindowProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  dark?: boolean;
}

export const MacWindow = ({ children, className, title, dark = true }: MacWindowProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border shadow-2xl",
        dark
          ? "bg-[#1c1c1e] border-white/10 shadow-black/50"
          : "bg-white border-black/10 shadow-black/20",
        className
      )}
    >
      {/* Title Bar */}
      <div
        className={cn(
          "relative flex h-10 items-center px-4 border-b",
          dark ? "bg-[#2c2c2e] border-white/5" : "bg-[#f5f5f7] border-black/5"
        )}
      >
        <div className="flex items-center gap-2 z-10">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
        </div>
        
        {title && (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center text-xs font-medium opacity-60 pointer-events-none",
            dark ? "text-white" : "text-black"
          )}>
            {title}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative h-full w-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

