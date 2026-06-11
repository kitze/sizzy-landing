import { SizzyFooter } from "@/app/(landing)/home/_components/SizzyFooter";
import { MadeByKitze } from "@/components/MadeByKitze";
import { ScrollingHeader } from "@/components/ScrollingHeader";
import { sizzyBlogPosts } from "@/config/sizzy-blog-posts";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { ArrowRight, Monitor } from "lucide-react";

export function Page() {
  const posts = [...sizzyBlogPosts].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
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

      <section className="px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <a
            href="/"
            className="mb-8 inline-block text-sm font-medium text-zinc-500 transition-colors hover:text-white"
          >
            &larr; sizzy.co
          </a>
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-400">
              Sizzy Blog
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Responsive testing,
              <br />
              <span className="text-zinc-500">done properly.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Practical guides on multi-device testing, media query debugging,
              viewport references, and the tools that make responsive work
              faster.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/[0.08] bg-[#111] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
              >
                <div className="mb-4 flex items-center gap-3 text-xs text-zinc-500">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5">
                    {post.eyebrow}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500">
                  {post.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors group-hover:text-white">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-20 rounded-2xl border border-white/[0.08] bg-[#111] p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Stop reading about responsive testing. Do it.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-500">
              Sizzy shows every device side by side with synchronized
              scrolling, clicking, and forms. 14-day free trial, no credit card
              required.
            </p>
            <a
              href={sizzyMarketingLinks.portal}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition-all hover:bg-zinc-200"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <MadeByKitze excludeApp="Sizzy" />
      <SizzyFooter />
    </main>
  );
}
