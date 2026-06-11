import { SizzyHero } from "./SizzyHero";
import { SizzyDevicePreview } from "./SizzyDevicePreview";
import { SizzyFeatures } from "./SizzyFeatures";
import { SizzySyncDemo } from "./SizzySyncDemo";
import { SizzyDevTools } from "./SizzyDevTools";
import { SizzyPhotoStudio } from "./SizzyPhotoStudio";
import { SizzySessions } from "./SizzySessions";
import { SizzyUseCases } from "./SizzyUseCases";
import { SizzyComparison } from "./SizzyComparison";
import { SizzyFaq } from "./SizzyFaq";
import { SizzyPricing } from "./SizzyPricing";
import { SizzyTestimonials } from "./SizzyTestimonials";
import { SizzySocialProof } from "./SizzySocialProof";
import { SizzyDownload } from "./SizzyDownload";
import { SizzyFooter } from "./SizzyFooter";
import { MadeByKitze } from "@/components/MadeByKitze";
import { ScrollingHeader } from "@/components/ScrollingHeader";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { trackTrialCta } from "@/lib/analytics";
import { Monitor } from "lucide-react";

export const SizzyLandingPage = () => {
  return (
    <main className="min-h-screen bg-black selection:bg-white/20">
      <ScrollingHeader
        logo={
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Monitor className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
        }
        title="Sizzy"
        scrollThreshold={600}
      >
        <a
          href={sizzyMarketingLinks.portal}
          onClick={() => trackTrialCta("header")}
          className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-black transition-all hover:bg-zinc-200"
        >
          Start Free Trial
        </a>
      </ScrollingHeader>
      <SizzyHero />
      <SizzyDevicePreview />
      <SizzySyncDemo />
      <SizzyFeatures />
      <SizzyDevTools />
      <SizzyPhotoStudio />
      <SizzySessions />
      <SizzyUseCases />
      <SizzyComparison />
      <SizzyTestimonials />
      <SizzySocialProof />
      <SizzyPricing />
      <SizzyFaq />
      <SizzyDownload />
      <MadeByKitze excludeApp="Sizzy" />
      <SizzyFooter />
    </main>
  );
};
