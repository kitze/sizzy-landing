import { SizzyFooter } from "@/app/(landing)/home/_components/SizzyFooter";
import { MadeByKitze } from "@/components/MadeByKitze";
import { ScrollingHeader } from "@/components/ScrollingHeader";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { viewportChecklist, viewportRanges } from "@/config/sizzy-tools";
import { ArrowLeft, ArrowRight, CheckCircle2, Monitor } from "lucide-react";

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
        <div className="mx-auto max-w-6xl">
          <a
            href="/tools"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            All tools
          </a>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
                Responsive viewport planning
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Viewport Checker
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
                Use this reference to choose viewport ranges for responsive QA,
                then open Sizzy to test the same page across real device sizes
                at once.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={sizzyMarketingLinks.portal}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-cyan-300"
                >
                  Test in Sizzy
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </a>
                <a
                  href="/tools"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Browse tools
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="rounded-2xl border border-white/10 bg-black p-4">
                <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
                  <span>viewport width</span>
                  <span>320px - 1199px</span>
                </div>
                <div className="space-y-3">
                  {viewportRanges.map(({ label, range }) => (
                    <div key={label}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-zinc-300">{label}</span>
                        <span className="font-mono text-cyan-200">{range}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-zinc-900">
                        <div className="h-full w-2/3 rounded-full bg-cyan-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {viewportRanges.map(({ label, range, note, Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-zinc-950 p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-sm text-cyan-200">
                    {range}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white">{label}</h2>
                <p className="mt-3 leading-7 text-zinc-400">{note}</p>
              </div>
            ))}
          </div>

          <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-3xl font-semibold text-white">
              Responsive QA checklist
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {viewportChecklist.map((item) => (
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
        </div>
      </section>

      <MadeByKitze excludeApp="Sizzy" />
      <SizzyFooter />
    </main>
  );
}
