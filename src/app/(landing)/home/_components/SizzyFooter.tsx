import { FooterColumnConnect } from "@/components/FooterColumnConnect";
import { FooterColumnKitzeApps } from "@/components/FooterColumnKitzeApps";
import { FooterBottom } from "@/components/FooterBottom";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { Monitor } from "lucide-react";

export const SizzyFooter = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-black py-16 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Monitor className="h-4 w-4 text-white" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold tracking-tight">Sizzy</span>
            </a>
            <p className="text-sm text-zinc-600 max-w-xs">
              The browser for web developers.
              <br />
              Test every breakpoint at once.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-white">Product</h4>
            <div className="flex flex-col gap-3 text-sm text-zinc-500">
              <a
                href="#features"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Pricing
              </a>
              <a
                href={sizzyMarketingLinks.portal}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Start Free Trial
              </a>
              <a
                href="/tools"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Tools
              </a>
              <a
                href="/blog"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Blog
              </a>
              <a
                href={sizzyMarketingLinks.changelog}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Changelog
              </a>
              <a
                href={sizzyMarketingLinks.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Documentation
              </a>
            </div>
          </div>

          <FooterColumnConnect refParam="sizzy" />

          <FooterColumnKitzeApps excludeApp="Sizzy" refParam="sizzy" />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};
