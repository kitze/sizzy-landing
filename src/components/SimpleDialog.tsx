import React from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useControlledOpen } from "@/hooks/useControlledOpen";
import { CustomButton } from "@/components/CustomButton";
import { XIcon } from "lucide-react";

export type DialogSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";

export type DialogClassNames = {
  root?: string;
  content?: string;
  header?: string;
  title?: string;
  body?: string;
  footer?: string;
  submitButton?: string;
  cancelButton?: string;
};

export interface SimpleDialogProps {
  trigger?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: DialogSize;
  classNames?: DialogClassNames;
  showCancel?: boolean;
  showCloseButton?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
}

const sizeToMaxWidth: Record<DialogSize, string> = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[550px]",
  lg: "sm:max-w-[680px]",
  xl: "sm:max-w-[800px]",
  "2xl": "sm:max-w-[1024px]",
  "3xl": "sm:max-w-[1280px]",
  "4xl": "sm:max-w-[1536px]",
  "5xl": "sm:max-w-[1920px]",
  full: "sm:max-w-[100vw]",
};

// Custom DialogContent that supports showCloseButton prop
const CustomDialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

export const SimpleDialog = ({
  trigger = "Open",
  title,
  children,
  open,
  onOpenChange,
  size = "sm",
  classNames = {},
  showCancel = true,
  showCloseButton = true,
  onCancel,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
}: SimpleDialogProps) => {
  const { isOpen, setIsOpen, close } = useControlledOpen({
    open,
    onOpenChange,
  });

  const handleCancel = () => {
    close();
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit();
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && open === undefined && (
        <DialogTrigger asChild>
          {typeof trigger === "string" ? (
            <CustomButton>{trigger}</CustomButton>
          ) : (
            trigger
          )}
        </DialogTrigger>
      )}
      <CustomDialogContent
        className={cn(
          sizeToMaxWidth[size],
          classNames.root,
          classNames.content
        )}
        showCloseButton={showCloseButton}
      >
        {title && (
          <DialogHeader className={classNames.header}>
            <DialogTitle className={classNames.title}>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className={cn("py-4", classNames.body)}>{children}</div>
        {(onSubmit || showCancel) && (
          <DialogFooter className={classNames.footer}>
            {showCancel && (
              <CustomButton
                variant="outline"
                onClick={handleCancel}
                className={classNames.cancelButton}
              >
                {cancelText}
              </CustomButton>
            )}
            {onSubmit && (
              <CustomButton
                onClick={handleSubmit}
                className={classNames.submitButton}
              >
                {submitText}
              </CustomButton>
            )}
          </DialogFooter>
        )}
      </CustomDialogContent>
    </Dialog>
  );
};
