import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactFC, cn } from "@/lib/utils";
import { Drawer } from "vaul";
import { DrawerContext } from "@/components/DrawerContext";
import { useControlledOpen } from "@/hooks/useControlledOpen";

export interface BottomDrawerClassNames {
  overlay?: string;
  content?: string;
  handle?: string;
  title?: string;
  headerWrapper?: string;
  childrenWrapper?: string;
}

export interface BottomDrawerProps {
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  classNames?: BottomDrawerClassNames;
  renderHeader?:
    | ((props: {
        handle: React.ReactNode;
        close: () => void;
      }) => React.ReactNode)
    | null;
}

export const BottomDrawer: ReactFC<BottomDrawerProps> = ({
  children,
  title,
  open,
  onOpenChange,
  trigger,
  classNames,
  renderHeader,
}) => {
  const { isOpen, setIsOpen, close } = useControlledOpen({
    open,
    onOpenChange,
  });

  const handle = (
    <div
      className={cn(
        "mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700 mb-8",
        classNames?.handle
      )}
    />
  );

  const defaultHeader = (
    <>
      {handle}
      {title && (
        <div
          className={cn(
            "text-lg font-semibold mb-4 text-zinc-900 dark:text-white",
            classNames?.title
          )}
        >
          {title}
        </div>
      )}
    </>
  );

  const noHeader = renderHeader === null;

  return (
    <DrawerContext.Provider value={{ close }}>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 0.95 }}
              exit={{ scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-30 pointer-events-none"
            >
              <div className="w-full h-full origin-top">
                <div className="h-full overflow-hidden">
                  <div className="opacity-0">{trigger}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay
            className={cn(
              "fixed inset-0 bg-black/40 backdrop-blur-md dark:bg-black/60 z-[9999]",
              classNames?.overlay
            )}
          />
          <Drawer.Content
            className={cn(
              "bg-white dark:bg-zinc-900 w-[95%] flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 z-[9999] mx-auto",
              "dark:border-t dark:border-zinc-800",
              "max-w-[500px]",
              classNames?.content,
              {
                "pt-6": !noHeader,
              }
            )}
          >
            {!noHeader && (
              <div
                className={cn(
                  "px-4 bg-white dark:bg-zinc-900 rounded-t-[10px]",
                  classNames?.headerWrapper
                )}
              >
                {renderHeader ? renderHeader({ handle, close }) : defaultHeader}
              </div>
            )}
            <div
              className={cn(
                "px-2 pb-6 pt-0 md:pb-2 bg-white dark:bg-zinc-900 flex-1 overflow-y-auto",
                noHeader && "pt-6 rounded-t-[10px]",
                classNames?.childrenWrapper
              )}
            >
              {children}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </DrawerContext.Provider>
  );
};
