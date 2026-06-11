"use client";
import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { trackTrialCta } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  priceSubtext?: string;
  savingsTag?: string;
  features: string[];
  cta: string;
  popular: boolean;
  badge?: string;
  icon?: typeof Crown;
};

const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$15",
    period: "/month",
    description: "Flexible billing for short bursts of work",
    features: [
      "Cancel or pause anytime",
      "Billed $15 every month",
      "All Sizzy features unlocked",
      "Standard email support",
      "Best for short-term projects",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    id: "annual",
    name: "Annual",
    price: "$12",
    period: "/month",
    description: "The default for working developers",
    priceSubtext: "Billed $144 yearly",
    savingsTag: "Save $36/year vs monthly",
    features: [
      "2 months free vs paying monthly",
      "One $144 charge per year",
      "All Sizzy features unlocked",
      "Priority email support",
      "Locks in current pricing on renewal",
    ],
    cta: "Start Free Trial",
    popular: true,
    badge: "Best Value",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$499",
    period: "one-time",
    description: "Pay once, own it for good",
    priceSubtext: "Pays for itself in under 3 years vs monthly",
    features: [
      "One $499 payment, never billed again",
      "Every future Sizzy update included",
      "Transferable license you actually own",
      "Priority email support, direct line",
      "Immune to future price changes",
    ],
    cta: "Get Lifetime Access",
    popular: false,
    icon: Crown,
  },
];

const PricingCard = ({ plan, index }: { plan: Plan; index: number }) => (
  <motion.div
    className={cn(
      "relative rounded-2xl p-8 transition-colors duration-200 flex flex-col",
      plan.popular
        ? "bg-white/[0.05] border border-white/25 ring-1 ring-white/15 ring-inset"
        : "bg-[#111] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"
    )}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Popular badge */}
    {plan.badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div className="px-4 py-1 rounded-full bg-white text-xs font-semibold text-black">
          {plan.badge}
        </div>
      </div>
    )}

    {/* Icon for lifetime */}
    {plan.icon && (
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-400 mb-4">
        <plan.icon className="h-5 w-5" />
      </div>
    )}

    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
    <p className="text-sm text-zinc-500 mb-6">{plan.description}</p>

    <div className="mb-6">
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-bold text-white">{plan.price}</span>
        <span className="text-zinc-500">{plan.period}</span>
      </div>
      {plan.savingsTag && (
        <div className="mt-3 inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-xs font-medium text-white">
          {plan.savingsTag}
        </div>
      )}
      {plan.priceSubtext && (
        <p className="mt-2 text-sm text-zinc-500">{plan.priceSubtext}</p>
      )}
    </div>

    <a
      href={sizzyMarketingLinks.portal}
      onClick={() => trackTrialCta("pricing", { plan: plan.id })}
      className={cn(
        "mb-8 flex w-full items-center justify-center rounded-full py-3 px-6 font-medium transition-colors",
        plan.popular
          ? "bg-white text-black hover:bg-zinc-200"
          : "bg-white/10 text-white hover:bg-white/20"
      )}
    >
      {plan.cta}
    </a>

    <ul className="space-y-3 mt-auto">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-zinc-300 shrink-0 mt-0.5">
            <Check className="h-3 w-3" />
          </div>
          <span className="text-sm text-zinc-400 leading-snug">{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export const SizzyPricing = () => {
  return (
    <section id="pricing" className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Choose your plan
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Start with a 14-day free trial. No credit card required.
            <br />
            Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto items-stretch mb-10">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Tight trust line */}
        <motion.p
          className="text-center text-sm text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          All signups happen on portal.sizzy.co. Stripe-secured payments.
        </motion.p>
      </div>
    </section>
  );
};
