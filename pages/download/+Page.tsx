import { SizzyFooter } from "@/app/(landing)/home/_components/SizzyFooter";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";

export function Page() {
  return (
    <main className="min-h-screen bg-black selection:bg-cyan-500/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl text-center space-y-6">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-400">
            Signup-gated access
          </div>
          <h1 className="text-3xl font-bold text-white">Start your free trial to access Sizzy</h1>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Sizzy no longer has a public download page. Create your account on portal.sizzy.co
            to start your 14-day trial and access everything from the portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={sizzyMarketingLinks.portal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="https://sizzy.co"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
      <SizzyFooter />
    </main>
  );
}
