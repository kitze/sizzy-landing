export type Hotkey = {
  id: string;
  title: string;
  keys: string;
  description: string;
  group: string;
};

export const hotkeys: Hotkey[] = [
  {
    id: "toggleTheme",
    title: "Toggle Theme",
    keys: "alt+x",
    description: "Toggle between light and dark theme",
    group: "Global",
  },
];

// User-specific hotkeys
export const userHotkeys: Hotkey[] = [
  {
    id: "openAiChat",
    title: "Open AI Chat",
    keys: "alt+c",
    description: "Open the AI Chat dialog",
    group: "App",
  },
  {
    id: "toggleCommandPalette",
    title: "Toggle Command Palette",
    keys: "meta+k",
    description: "Open or close the command palette",
    group: "Global",
  },
];

// Extract IDs for type safety
const allHotkeyIds = [...hotkeys, ...userHotkeys].map((h) => h.id);
export type HotkeyId = (typeof allHotkeyIds)[number];
