import { SizzyFooter } from "@/app/(landing)/home/_components/SizzyFooter";
import { MadeByKitze } from "@/components/MadeByKitze";
import { ScrollingHeader } from "@/components/ScrollingHeader";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { ArrowLeft, ArrowRight, CheckCircle2, Monitor } from "lucide-react";

export type SizzyResourcePageContent = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  backHref: string;
  backLabel: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  sections: Array<{
    heading: string;
    body: string;
    items: string[];
  }>;
  checklist: string[];
  meta?: string;
  faq?: Array<{ question: string; answer: string }>;
  related?: Array<{ href: string; title: string }>;
};

export function SizzyResourcePage({
  content,
}: {
  content: SizzyResourcePageContent;
}) {
  const primaryHref = content.primaryHref ?? sizzyMarketingLinks.portal;
  const primaryLabel = content.primaryLabel ?? "Test in Sizzy";
  const secondaryHref = content.secondaryHref ?? "/tools";
  const secondaryLabel = content.secondaryLabel ?? "Browse tools";

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <ScrollingHeader
        logo={
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Monitor className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
        }
        title="Sizzy"
        scrollThreshold={240}
      >
        <a
          href={sizzyMarketingLinks.portal}
          className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-black transition-all hover:bg-zinc-200"
        >
          Start Free Trial
        </a>
      </ScrollingHeader>

      <section className="px-6 pb-20 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <a
            href={content.backHref}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {content.backLabel}
          </a>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
              {content.eyebrow}
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400 md:text-xl">
              {content.description}
            </p>
            {content.meta && (
              <p className="mt-4 text-sm font-medium text-zinc-500">
                {content.meta}
              </p>
            )}
            <p className="mt-8 text-lg leading-8 text-zinc-300">
              {content.intro}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-cyan-300"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondaryLabel}
            </a>
          </div>

          <div className="mt-16 grid gap-5">
            {content.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-2xl border border-white/10 bg-zinc-950 p-6 md:p-8"
              >
                <h2 className="text-2xl font-semibold text-white">
                  {section.heading}
                </h2>
                <p className="mt-4 leading-7 text-zinc-400">{section.body}</p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {section.items.map((item) => (
                    <div key={item} className="flex gap-3 text-zinc-300">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-cyan-200"
                        strokeWidth={2}
                      />
                      <p className="leading-7">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">
              Release checklist
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {content.checklist.map((item) => (
                <div key={item} className="flex gap-3 text-zinc-200">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-cyan-100"
                    strokeWidth={2}
                  />
                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {content.faq && content.faq.length > 0 && (
            <section className="mt-5 rounded-2xl border border-white/10 bg-zinc-950 p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Frequently asked questions
              </h2>
              <div className="mt-6 grid gap-6">
                {content.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-lg font-semibold text-white">
                      {item.question}
                    </h3>
                    <p className="mt-2 leading-7 text-zinc-400">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.related && content.related.length > 0 && (
            <section className="mt-5 rounded-2xl border border-white/10 bg-zinc-950 p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Related guides
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {content.related.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
                  >
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-cyan-200 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                    <span className="leading-7">{item.title}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <MadeByKitze excludeApp="Sizzy" />
      <SizzyFooter />
    </main>
  );
}
