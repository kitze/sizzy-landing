import { getSizzyBlogPost } from "@/config/sizzy-blog-posts";
import type { PageContext } from "vike/types";

export function title(pageContext: PageContext) {
  const slug = pageContext.routeParams?.slug as string | undefined;
  const post = getSizzyBlogPost(slug);

  return post ? `${post.title} | Sizzy Blog` : "Sizzy Blog";
}
