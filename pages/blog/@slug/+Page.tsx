import {
  SizzyResourcePage,
  type SizzyResourcePageContent,
} from "@/components/SizzyResourcePage";
import { getSizzyBlogPost } from "@/config/sizzy-blog-posts";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
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
            "Browse the blog for current Sizzy responsive testing guides.",
          backHref: "/blog",
          backLabel: "All articles",
          primaryHref: "/blog",
          primaryLabel: "Browse articles",
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
    backHref: "/blog",
    backLabel: "All articles",
    primaryHref: sizzyMarketingLinks.portal,
    primaryLabel: "Try Sizzy free for 14 days",
    secondaryHref: "/tools",
    secondaryLabel: "Browse free tools",
    sections: post.sections,
    checklist: post.checklist,
    meta: `${post.readTime} - Updated ${post.updatedAt}`,
  };

  return <SizzyResourcePage content={content} />;
}
