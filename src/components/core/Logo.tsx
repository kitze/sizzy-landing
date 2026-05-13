import React from "react";
import { APP_NAME } from "@/config/config";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export function Logo() {
  return (
    <a href="/" className="inline-flex items-center gap-2">
      <motion.div
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Mic className="h-4 w-4 text-white" strokeWidth={2} />
      </motion.div>
      <motion.span
        className="text-lg font-bold tracking-normal uppercase text-foreground"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {APP_NAME}
      </motion.span>
    </a>
  );
}
