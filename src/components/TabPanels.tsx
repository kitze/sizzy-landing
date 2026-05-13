"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  SegmentedControl,
  type SegmentedControlOption,
  type SegmentedControlMobileViewType,
} from "@/components/SegmentedControl";
import { motion, AnimatePresence } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabPanelProps {
  value: string;
  label: string;
  icon: LucideIcon;
  content: React.ReactNode;
  placeholder?: string;
  classNames?: {
    root?: string;
    title?: string;
    segmentedControl?: string;
    content?: string;
  };
}

export interface TabPanelsProps {
  tabs: TabPanelProps[];
  defaultTab?: string;
  // For controlled usage
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  // Mobile view props for SegmentedControl
  mobileView?: SegmentedControlMobileViewType;
  drawerTitle?: string;
  placeholder?: string;
  classNames?: {
    root?: string;
    title?: string;
    segmentedControl?: string;
    content?: string;
  };
}

export function TabPanels({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  mobileView,
  drawerTitle,
  placeholder,
  classNames,
}: TabPanelsProps) {
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const firstTab = tabs[0]!;

  const initialTab =
    defaultTab && tabs.some((tab) => tab.value === defaultTab)
      ? defaultTab
      : firstTab.value;

  const [internalActiveTab, setInternalActiveTab] =
    useState<string>(initialTab);

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  useEffect(() => {
    if (isControlled && controlledActiveTab !== internalActiveTab) {
      setInternalActiveTab(controlledActiveTab);
    }
  }, [controlledActiveTab, internalActiveTab, isControlled]);

  const tabOptions: SegmentedControlOption[] = tabs.map((tab) => ({
    value: tab.value,
    label: tab.label,
    leftIcon: tab.icon,
  }));

  const handleTabChange = (value: string) => {
    if (!isControlled) {
      setInternalActiveTab(value);
    }

    if (onTabChange) {
      onTabChange(value);
    }
  };

  const activeTabContent =
    tabs.find((tab) => tab.value === activeTab)?.content || firstTab.content;

  return (
    <div className={cn("flex flex-col gap-4", classNames?.root)}>
      <SegmentedControl
        options={tabOptions}
        value={activeTab}
        onChange={handleTabChange}
        size="md"
        className={cn("w-full", classNames?.segmentedControl)}
        mobileView={mobileView}
        drawerTitle={drawerTitle}
        placeholder={placeholder}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={classNames?.content}
        >
          {activeTabContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
