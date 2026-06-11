"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { trackTrialCta } from "@/lib/analytics";

const steps = [
  {
    step: "01",
    title: "Create your account",
    description: "Sign up on portal.sizzy.co to start your 14-day free trial.",
  },
  {
    step: "02",
    title: "Start with full access",
    description: "Try every core Sizzy workflow first. No credit card required to get started.",
  },
  {
    step: "03",
    title: "Manage everything in one place",
    description: "Your signup, billing, and product access all live in the portal.",
  },
];

export const SizzyDownload = () => {
  return (
    <section className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-400">
            Signup-gated access
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Start your free trial in the portal
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            There is no public download link anymore. Create your account on portal.sizzy.co
            to access Sizzy and manage everything from one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="rounded-2xl border border-white/[0.08] bg-[#111] p-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-4 text-xs font-semibold tracking-[0.2em] text-zinc-600">
                {step.step}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href={sizzyMarketingLinks.portal}
            onClick={() => trackTrialCta("footer_cta")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition-all hover:bg-zinc-200"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <p className="mt-4 text-sm text-zinc-600">
            14-day trial · No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
};
