import {
  SizzyResourcePage,
  type SizzyResourcePageContent,
} from "@/components/SizzyResourcePage";
import { getSizzyToolPage } from "@/config/sizzy-tools";
import { usePageContext } from "vike-react/usePageContext";

export function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.slug as string | undefined;
  const tool = getSizzyToolPage(slug);

  if (!tool) {
    return (
      <SizzyResourcePage
        content={{
          eyebrow: "Sizzy Tools",
          title: "Tool not found",
          description:
            "This Sizzy tool route is not available. Browse the responsive testing tools that are ready for release QA.",
          intro:
            "The tools hub has the current set of public Sizzy responsive QA references.",
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
    eyebrow: tool.eyebrow,
    title: tool.title,
    description: tool.description,
    intro: tool.intro,
    backHref: "/tools",
    backLabel: "All tools",
    sections: tool.sections,
    checklist: tool.checklist,
  };

  return <SizzyResourcePage content={content} />;
}
