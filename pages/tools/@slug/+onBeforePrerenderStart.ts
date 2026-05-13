import { getDynamicSizzyToolRoutes } from "@/config/sizzy-tools";

export function onBeforePrerenderStart() {
  return getDynamicSizzyToolRoutes();
}
