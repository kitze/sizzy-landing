import { SwitchCard } from "@/components/SwitchCard";
import { useUserSetting } from "@/hooks/useUserSetting";
import { type PreferenceKey } from "@/types/user-preferences";

interface UserSettingSwitchCardProps {
  settingKey: PreferenceKey;
  id?: string;
  label?: string;
  description?: string;
}

export function UserSettingSwitchCard({
  settingKey,
  id,
  label,
  description,
}: UserSettingSwitchCardProps) {
  // Format the key for display if no label is provided
  const displayLabel = label || formatKeyToLabel(settingKey);

  // Format a default description if none is provided
  const displayDescription =
    description || `Enable or disable ${settingKey.toLowerCase()}.`;

  // Use the supplied id or the setting key
  const displayId = id || settingKey;

  const { value, setValue, isLoading, isUpdating } = useUserSetting(settingKey);

  return (
    <SwitchCard
      id={displayId}
      label={displayLabel}
      description={displayDescription}
      checked={value as boolean}
      onCheckedChange={setValue}
      disabled={isLoading || isUpdating}
    />
  );
}

// Helper function to format a key like "notifications" to "Notifications"
function formatKeyToLabel(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}
