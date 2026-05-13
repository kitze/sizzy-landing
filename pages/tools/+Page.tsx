import { SizzyFooter } from "@/app/(landing)/home/_components/SizzyFooter";
import { MadeByKitze } from "@/components/MadeByKitze";
import { ScrollingHeader } from "@/components/ScrollingHeader";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { sizzyToolLinks } from "@/config/sizzy-tools";
import { ArrowRight, CheckCircle2, Monitor } from "lucide-react";

export function Page() {
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
          <div className="mb-12 max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
              Responsive testing tools
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Sizzy Tools
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400 md:text-xl">
              Practical public tools and checklists for testing responsive
              layouts, viewport ranges, and release readiness.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {sizzyToolLinks.map(({ href, title, description, Icon }) => (
              <a
                key={href}
                href={href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <ArrowRight
                    className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-200"
                    strokeWidth={2}
                  />
                </div>
                <h2 className="text-2xl font-semibold text-white">{title}</h2>
                <p className="mt-3 leading-7 text-zinc-400">{description}</p>
              </a>
            ))}

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Full Sizzy workflow
              </h2>
              <p className="mt-3 leading-7 text-zinc-400">
                Move from public planning references into Sizzy for synchronized
                devices, DevTools, screenshots, sessions, and release QA.
              </p>
              <a
                href={sizzyMarketingLinks.portal}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100"
              >
                Start in the portal
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <MadeByKitze excludeApp="Sizzy" />
      <SizzyFooter />
    </main>
  );
}
