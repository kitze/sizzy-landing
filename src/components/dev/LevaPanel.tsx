"use client";

import { IS_DEV } from "@/config/dev-prod";
import { Leva } from "leva";

/**
 * Renders the Leva debug panel conditionally based on IS_DEV.
 * This needs to be a client component because Leva uses React hooks/context.
 */
export function LevaPanel() {
  return IS_DEV ? <Leva oneLineLabels hidden={!IS_DEV} /> : null;
}
