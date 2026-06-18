import {
  SizzyResourcePage,
  type SizzyResourcePageContent,
} from "@/components/SizzyResourcePage";
import { getSizzyBlogPost, sizzyBlogPosts } from "@/config/sizzy-blog-posts";
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

  const related = (post.related ?? [])
    .map((relatedSlug) => {
      const relatedPost = sizzyBlogPosts.find((p) => p.slug === relatedSlug);
      return relatedPost
        ? { href: `/blog/${relatedPost.slug}`, title: relatedPost.title }
        : null;
    })
    .filter((item): item is { href: string; title: string } => item !== null);

  const content: SizzyResourcePageContent = {
    eyebrow: post.eyebrow,
    title: post.title,
    description: post.description,
    intro:
      post.intro ??
      "This guide gives you the practical version, then shows where Sizzy speeds it up - testing across synchronized devices with screenshot evidence in one window.",
    backHref: "/blog",
    backLabel: "All articles",
    primaryHref: sizzyMarketingLinks.portal,
    primaryLabel: "Try Sizzy free for 14 days",
    secondaryHref: "/tools",
    secondaryLabel: "Browse free tools",
    sections: post.sections,
    checklist: post.checklist,
    meta: `${post.readTime} - Updated ${post.updatedAt}`,
    faq: post.faq,
    related,
  };

  return <SizzyResourcePage content={content} />;
}
