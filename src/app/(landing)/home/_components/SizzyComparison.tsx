"use client";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

type FeatureValue = boolean | "partial";

interface Comparison {
  feature: string;
  sizzy: FeatureValue;
  chrome: FeatureValue;
  firefox: FeatureValue;
}

const comparisons: Comparison[] = [
  {
    feature: "Multiple devices at once",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
  {
    feature: "Synchronized scrolling",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
  {
    feature: "Synchronized clicks & forms",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
  {
    feature: "Multiple user sessions",
    sizzy: true,
    chrome: "partial",
    firefox: "partial",
  },
  {
    feature: "Project workspaces",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
  {
    feature: "Photo Studio / Mockups",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
  {
    feature: "Debug CSS visually",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
  {
    feature: "Universal DevTools",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
  {
    feature: "Device frames",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
  {
    feature: "Accurate device simulation",
    sizzy: true,
    chrome: "partial",
    firefox: "partial",
  },
  {
    feature: "Chrome extensions",
    sizzy: true,
    chrome: true,
    firefox: false,
  },
  {
    feature: "QR code to phone",
    sizzy: true,
    chrome: false,
    firefox: false,
  },
];

const CheckIcon = ({ value }: { value: boolean | "partial" }) => {
  if (value === true) {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
        <Check className="h-4 w-4" />
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-zinc-500">
        <Minus className="h-4 w-4" />
      </div>
    );
  }
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04] text-zinc-700">
      <X className="h-4 w-4" />
    </div>
  );
};

export const SizzyComparison = () => {
  return (
    <section className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Not just a browser.
            <br />
            <span className="text-zinc-500">A development workspace.</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Chrome and Firefox are great browsers. But they weren't built for web development.
            Sizzy was.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="rounded-2xl border border-white/[0.08] bg-[#111] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-[#0a0a0a] border-b border-white/[0.04]">
              <div className="text-sm font-medium text-zinc-500">Feature</div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  <span className="text-sm font-semibold text-white">Sizzy</span>
                </div>
              </div>
              <div className="text-center text-sm font-medium text-zinc-600">Chrome DevTools</div>
              <div className="text-center text-sm font-medium text-zinc-600">Firefox DevTools</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/[0.04]">
              {comparisons.map((item, index) => (
                <motion.div
                  key={item.feature}
                  className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="text-sm text-zinc-400">{item.feature}</div>
                  <div className="flex justify-center">
                    <CheckIcon value={item.sizzy} />
                  </div>
                  <div className="flex justify-center">
                    <CheckIcon value={item.chrome} />
                  </div>
                  <div className="flex justify-center">
                    <CheckIcon value={item.firefox} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom note */}
          <motion.p
            className="text-center text-sm text-zinc-600 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Sizzy is built on Chromium - your favorite Chrome extensions work perfectly.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
