// AI Chat dialog hook - disabled for static landing
export function useAiChatDialog() {
  return {
    isOpen: false,
    setIsOpen: () => {},
    open: () => {},
    close: () => {},
  };
}
