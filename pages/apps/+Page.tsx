import { SizzyFooter } from "@/app/(landing)/home/_components/SizzyFooter";
import { KITZE_APPS, CURRENT_APP_SLUG, kitzeAppUrl } from "@/config/kitzeApps";

export function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 pb-8 pt-24 sm:px-6 md:px-12 lg:px-20">
        <div className="container mx-auto max-w-4xl">
          <a
            href="/"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            &larr; Back to home
          </a>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            More apps by Kitze
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            A family of focused, independent tools for developers, makers, and
            creators &mdash; all built and maintained by Kitze.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {KITZE_APPS.map((app) => {
              const isCurrent = app.slug === CURRENT_APP_SLUG;
              const href = isCurrent
                ? "/"
                : kitzeAppUrl(app, CURRENT_APP_SLUG, "apps_page");
              return (
                <a
                  key={app.slug}
                  href={href}
                  target={isCurrent ? undefined : "_blank"}
                  rel={isCurrent ? undefined : "noopener noreferrer"}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <h2 className="text-lg font-semibold text-white">
                    {app.name}
                    {isCurrent ? (
                      <span className="ml-2 text-xs font-normal text-zinc-500">
                        (you are here)
                      </span>
                    ) : null}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">{app.tagline}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <SizzyFooter />
    </main>
  );
}
