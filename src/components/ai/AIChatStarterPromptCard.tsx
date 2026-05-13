import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface AIChatStarterPromptCardProps {
  icon: ReactNode;
  title: string;
  prompt: string;
  onClick: () => void;
  className?: string;
}

export function AIChatStarterPromptCard({
  icon,
  title,
  prompt,
  onClick,
  className,
}: AIChatStarterPromptCardProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "border-muted-foreground/20 h-auto justify-start gap-3 p-4 text-left",
        "hover:bg-muted/50 hover:border-primary/50 transition-all hover:shadow-md",
        className,
      )}
      onClick={onClick}
    >
      <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
        {icon}
      </div>
      <div className="font-medium">{title}</div>
    </Button>
  );
}
