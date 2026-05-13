import {
  SizzyResourcePage,
  type SizzyResourcePageContent,
} from "@/components/SizzyResourcePage";
import { getSizzyBlogPost } from "@/config/sizzy-blog-posts";
import { usePageContext } from "vike-react/usePageContext";

export function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.slug as string | undefined;
  const post = getSizzyBlogPost(slug);

  if (!post) {
    return (
      <SizzyResourcePage
        content={{
          eyebrow: "Sizzy Blog",
          title: "Post not found",
          description:
            "This Sizzy responsive testing article is not available.",
          intro:
            "Browse the responsive testing tools for current public Sizzy references.",
          backHref: "/tools",
          backLabel: "All tools",
          primaryHref: "/tools",
          primaryLabel: "Browse tools",
          sections: [],
          checklist: [],
        }}
      />
    );
  }

  const content: SizzyResourcePageContent = {
    eyebrow: post.eyebrow,
    title: post.title,
    description: post.description,
    intro:
      "Use this guide as a compact release reference, then validate the same breakpoints in Sizzy with synchronized devices and screenshot evidence.",
    backHref: "/tools",
    backLabel: "All tools",
    primaryHref: "/tools/viewport-checker",
    primaryLabel: "Open viewport checker",
    secondaryHref: "/tools",
    secondaryLabel: "Browse tools",
    sections: post.sections,
    checklist: post.checklist,
    meta: `${post.readTime} - Updated ${post.updatedAt}`,
  };

  return <SizzyResourcePage content={content} />;
}
