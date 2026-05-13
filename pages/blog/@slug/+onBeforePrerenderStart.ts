import { getSizzyBlogRoutes } from "@/config/sizzy-blog-posts";

export function onBeforePrerenderStart() {
  return getSizzyBlogRoutes();
}
