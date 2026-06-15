import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { KITZE_APPS, CURRENT_APP_SLUG, kitzeAppUrl } from "@/config/kitzeApps";

export interface FooterColumnKitzeAppsProps {
  /** Kept for backwards compatibility; self is excluded via CURRENT_APP_SLUG. */
  excludeApp?: string;
  /** utm_source override (defaults to this site). */
  refParam?: string;
  /** Custom title */
  title?: string;
  /** Additional className */
  className?: string;
}

export const FooterColumnKitzeApps = ({
  refParam,
  title = "More from Kitze",
  className,
}: FooterColumnKitzeAppsProps) => {
  const source = refParam || CURRENT_APP_SLUG;
  const apps = KITZE_APPS.filter((app) => app.slug !== CURRENT_APP_SLUG);

  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="font-semibold text-sm text-white flex items-center gap-2">
        {title}
        <span className="text-[10px] text-zinc-600 font-normal">&#8599;</span>
      </h4>
      <div className="flex flex-col gap-3 text-sm text-zinc-500">
        {apps.map((app) => (
          <a
            key={app.slug}
            href={kitzeAppUrl(app, source, "footer")}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors group flex items-center gap-1 cursor-pointer"
          >
            {app.name}
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
          </a>
        ))}
        <a
          href="/apps"
          className="pt-1 font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          More apps &rarr;
        </a>
      </div>
    </div>
  );
};
