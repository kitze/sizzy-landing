"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

const faqs: FaqItem[] = [
  {
    question: "How is Sizzy different from Chrome DevTools device mode?",
    answer:
      "DevTools emulates one viewport at a time inside a debugging panel. Sizzy shows every device side by side in one window, with synchronized scrolling, clicking, and typing across all of them. You fix a breakpoint once and instantly see the result everywhere - no switching presets, no resizing, no guessing.",
    link: {
      href: "/blog/chrome-devtools-device-mode-limitations",
      label: "Read: DevTools device mode limitations",
    },
  },
  {
    question: "Responsively is free and open source. Why pay for Sizzy?",
    answer:
      "Responsively is a solid free tool, and if side-by-side previews are all you need, it may be enough. Sizzy goes further: more accurate device simulation with frames and user agents, synchronized interactions and forms, multiple isolated sessions for testing auth states, project workspaces, Photo Studio for marketing screenshots, and active full-time maintenance since 2018. The 14-day trial is the easiest way to feel the difference.",
    link: {
      href: "/blog/polypane-vs-sizzy-vs-responsively",
      label: "Read the honest comparison",
    },
  },
  {
    question: "How does Sizzy compare to Polypane?",
    answer:
      "Both are paid browsers built for developers, and both are good. Polypane leans into accessibility audits and meta previews. Sizzy focuses on fast multi-device workflows: synced sessions, device frames, screenshot tooling, throttling, and a workspace that remembers your projects. Most developers try both trials and keep the one that fits how they work - we're confident enough in Sizzy to recommend exactly that.",
    link: {
      href: "/blog/polypane-vs-sizzy-vs-responsively",
      label: "Polypane vs Sizzy vs Responsively",
    },
  },
  {
    question: "Do my Chrome extensions work in Sizzy?",
    answer:
      "Yes. Sizzy is built on Chromium, so React DevTools, password managers, ad blockers, and the rest of your extensions install and work the way you expect.",
  },
  {
    question: "Which platforms does Sizzy support?",
    answer:
      "Sizzy runs on macOS, Windows, and Linux. One license covers your day-to-day development machine setup.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "Create an account on portal.sizzy.co and you get 14 days of full access - every feature unlocked, no credit card required. When the trial ends you simply pick a plan; you'll never be charged automatically because we never asked for a card.",
  },
  {
    question: "Is there a way to avoid a subscription?",
    answer:
      "Yes. Besides monthly ($15/mo) and annual ($12/mo billed yearly) plans, there's a one-time $499 lifetime license that includes every future update and is immune to price changes.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const FaqRow = ({ faq, index }: { faq: FaqItem; index: number }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      className="rounded-2xl border border-white/[0.08] bg-[#111] overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-white/[0.02]"
        aria-expanded={open}
      >
        <span className="font-medium text-white">{faq.question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-zinc-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
          {faq.link && (
            <a
              href={faq.link.href}
              className="mt-3 inline-block text-sm font-medium text-zinc-300 underline underline-offset-4 transition-colors hover:text-white"
            >
              {faq.link.label}
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

export const SizzyFaq = () => {
  return (
    <section id="faq" className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Questions, answered honestly
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Including the ones about our competitors.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-3xl gap-3">
          {faqs.map((faq, index) => (
            <FaqRow key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
};
