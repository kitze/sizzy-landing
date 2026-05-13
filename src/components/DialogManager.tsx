import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  memo,
} from "react";
import {
  SimpleDialog,
  SimpleDialogProps,
} from "@/components/SimpleDialog";
import { cn } from "@/lib/utils";

export type OpenDialogProps = {
  title?: string;
  component:
    | ((props: { close: () => void }) => React.ReactNode)
    | React.ComponentType<any>;
  props?: Record<string, any>;
  size?: SimpleDialogProps["size"];
  classNames?: SimpleDialogProps["classNames"];
  mobileView?: SimpleDialogProps["mobileView"];
  drawerTitle?: SimpleDialogProps["drawerTitle"];
  showCancel?: SimpleDialogProps["showCancel"];
  showCloseButton?: SimpleDialogProps["showCloseButton"];
  onCancel?: SimpleDialogProps["onCancel"];
  onSubmit?: SimpleDialogProps["onSubmit"];
  submitText?: SimpleDialogProps["submitText"];
  cancelText?: SimpleDialogProps["cancelText"];
};

type DialogConfig = OpenDialogProps & {
  id: string;
};

type DialogContextType = {
  openDialog: (config: OpenDialogProps) => string;
  closeDialog: (id: string) => void;
  closeAllDialogs: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

export type DialogManagerProps = {
  classNames?: {
    root?: string;
  };
  mobileView?: SimpleDialogProps["mobileView"];
  children?: React.ReactNode;
};

const DialogList = memo(function DialogList({
  dialogs,
  onClose,
  defaultMobileView,
}: {
  dialogs: DialogConfig[];
  onClose: (id: string) => void;
  defaultMobileView?: SimpleDialogProps["mobileView"];
}) {
  return (
    <>
      {dialogs.map(
        ({
          id,
          title,
          component: Component,
          props,
          size,
          classNames,
          mobileView,
          drawerTitle,
          showCancel,
          showCloseButton,
          onCancel,
          onSubmit,
          submitText,
          cancelText,
        }) => (
          <div key={id} className="pointer-events-auto">
            <SimpleDialog
              title={title}
              open={true}
              onOpenChange={(open: boolean) => {
                if (!open) onClose(id);
              }}
              size={size}
              classNames={classNames}
              mobileView={
                mobileView !== undefined ? mobileView : defaultMobileView
              }
              drawerTitle={drawerTitle}
              showCancel={showCancel}
              showCloseButton={showCloseButton}
              onCancel={() => {
                if (onCancel) onCancel();
                onClose(id);
              }}
              {...(onSubmit && {
                onSubmit: () => {
                  onSubmit();
                  onClose(id);
                },
              })}
              submitText={submitText}
              cancelText={cancelText}
            >
              {/* Render the component passed to openDialog */}
              {typeof Component === "function" ? (
                <Component {...props} close={() => onClose(id)} />
              ) : (
                // Re-add ts-ignore as Component type might be complex for TSX
                // @ts-ignore
                <Component {...props} />
              )}
            </SimpleDialog>
          </div>
        )
      )}
    </>
  );
});

export const DialogManager = memo(function DialogManager({
  classNames,
  mobileView,
  children,
}: DialogManagerProps) {
  const [dialogs, setDialogs] = useState<DialogConfig[]>([]);

  const openDialog = useCallback((config: OpenDialogProps) => {
    const id = Math.random().toString(36).substring(7);
    setDialogs((prev) => {
      const newDialogs = [...prev, { ...config, id }];
      return newDialogs;
    });
    return id;
  }, []);

  const closeDialog = useCallback((id: string) => {
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
  }, []);

  const closeAllDialogs = useCallback(() => {
    setDialogs([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      openDialog,
      closeDialog,
      closeAllDialogs,
    }),
    [openDialog, closeDialog, closeAllDialogs]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-[100]",
          classNames?.root
        )}
      >
        <DialogList
          dialogs={dialogs}
          onClose={closeDialog}
          defaultMobileView={mobileView}
        />
      </div>
    </DialogContext.Provider>
  );
});
