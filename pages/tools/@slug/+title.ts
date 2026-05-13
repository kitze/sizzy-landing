import { getSizzyToolPage } from "@/config/sizzy-tools";
import type { PageContext } from "vike/types";

export function title(pageContext: PageContext) {
  const slug = pageContext.routeParams?.slug as string | undefined;
  const tool = getSizzyToolPage(slug);

  return tool ? `${tool.title} | Sizzy Tools` : "Sizzy Tools";
}
