import type { Link } from "@/config/links";

/**
 * Filters an array of potentially null/undefined links, returning only the valid Link objects.
 * @param links - The array of links to filter.
 * @returns An array containing only valid Link objects.
 */
export function filterEnabledLinks(
  links: (Link | null | undefined)[] | undefined,
): Link[] {
  if (!links) {
    return [];
  }
  // The `filter(Boolean)` removes null/undefined, and `as Link[]` asserts the correct type.
  return links.filter(Boolean) as Link[];
}
