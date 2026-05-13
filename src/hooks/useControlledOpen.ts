import { useState, useEffect } from "react";

interface UseControlledOpenProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface UseControlledOpenResult {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  close: () => void;
}

export const useControlledOpen = ({
  open,
  onOpenChange,
}: UseControlledOpenProps): UseControlledOpenResult => {
  const [internalOpen, setInternalOpen] = useState(false);

  // Determine if the component is controlled or uncontrolled
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setIsOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const close = () => setIsOpen(false);

  // Sync internal state with controlled prop
  useEffect(() => {
    if (isControlled) {
      setInternalOpen(open);
    }
  }, [isControlled, open]);

  return { isOpen, setIsOpen, close };
};
