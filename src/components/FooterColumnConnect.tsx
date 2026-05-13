"use client";

import { cn } from "@/lib/utils";

export interface ConnectLink {
  label: string;
  url: string;
}

const defaultLinks: ConnectLink[] = [
  { label: "Twitter / X", url: "https://x.com/thekitze" },
  { label: "Support", url: "mailto:hi@kitze.io" },
  { label: "kitze.io", url: "https://kitze.io" },
];

export interface FooterColumnConnectProps {
  /** Custom links list (overrides default) */
  links?: ConnectLink[];
  /** Ref parameter to append to URLs (only for http links) */
  refParam?: string;
  /** Custom title */
  title?: string;
  /** Additional className */
  className?: string;
}

export const FooterColumnConnect = ({
  links = defaultLinks,
  refParam,
  title = "Connect",
  className,
}: FooterColumnConnectProps) => {
  const getUrl = (url: string) => {
    if (!refParam) return url;
    // Don't add ref to mailto or non-http links
    if (!url.startsWith("http")) return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}ref=${refParam}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="font-semibold text-sm text-white">{title}</h4>
      <div className="flex flex-col gap-3 text-sm text-zinc-500">
        {links.map((link) => (
          <a
            key={link.label}
            href={getUrl(link.url)}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};
