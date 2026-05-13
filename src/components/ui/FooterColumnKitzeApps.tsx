"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KitzeAppLink {
  name: string;
  url: string;
}

interface ProjectApiResponse {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  status: string;
  statusLabel: string;
  externalUrl?: string;
  category: string;
}

const PROJECTS_API_URL = "https://kitze.io/api/projects?apps=true";

const defaultApps: KitzeAppLink[] = [
  { name: "Sizzy", url: "https://sizzy.co" },
  { name: "Zero to Shipped", url: "https://zerotoshipped.com" },
  { name: "Benji", url: "https://benji.so" },
  { name: "Tubely", url: "https://tubely.cc" },
  { name: "JustWrite", url: "https://justwrite.ink" },
  { name: "DMX", url: "https://dmx.to" },
  { name: "Passlock", url: "https://passlock.to" },
  { name: "Sotto", url: "https://sotto.so" },
  { name: "Glink", url: "https://glink.so" },
  { name: "JoinRepo", url: "https://joinrepo.com" },
  { name: "ReleaseFlow", url: "https://releaseflow.net" },
];

export interface FooterColumnKitzeAppsProps {
  /** App name to exclude from the list (typically the current app) */
  excludeApp?: string;
  /** Ref parameter to append to URLs */
  refParam?: string;
  /** Custom apps list (overrides default) */
  apps?: KitzeAppLink[];
  /** Custom title */
  title?: string;
  /** Additional className */
  className?: string;
}

export const FooterColumnKitzeApps = ({
  excludeApp,
  refParam,
  apps,
  title = "More by Kitze",
  className,
}: FooterColumnKitzeAppsProps) => {
  const [fetchedApps, setFetchedApps] = useState<KitzeAppLink[]>(defaultApps);

  useEffect(() => {
    // If custom apps provided, don't fetch
    if (apps) return;

    fetch(PROJECTS_API_URL)
      .then((res) => res.json())
      .then((data: ProjectApiResponse[]) => {
        const mapped = data
          .filter((p) => p.externalUrl)
          .map((p) => ({
            name: p.title,
            url: p.externalUrl!,
          }));
        if (mapped.length > 0) {
          setFetchedApps(mapped);
        }
      })
      .catch(() => {
        // Keep default apps on error
      });
  }, [apps]);

  const appsToUse = apps || fetchedApps;
  const filteredApps = excludeApp
    ? appsToUse.filter((app) => app.name.toLowerCase() !== excludeApp.toLowerCase())
    : appsToUse;

  const getUrl = (url: string) => {
    if (!refParam) return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}ref=${refParam}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="font-semibold text-sm text-white flex items-center gap-2">
        {title}
        <span className="text-[10px] text-zinc-600 font-normal">&#8599;</span>
      </h4>
      <div className="flex flex-col gap-3 text-sm text-zinc-500">
        {filteredApps.map((app) => (
          <a
            key={app.name}
            href={getUrl(app.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors group flex items-center gap-1 cursor-pointer"
          >
            {app.name}
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
};
