import { Settings, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AiChatHeaderProps {
  isLoading?: boolean;
  onOpenSettings?: () => void;
  className?: string;
}

export function AiChatHeader({
  isLoading = false,
  onOpenSettings,
  className,
}: AiChatHeaderProps) {
  return (
    <div
      className={cn(
        "bg-muted/30 flex w-full shrink-0 items-center justify-between border-b px-4 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        {isLoading && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="bg-primary/40 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            <span className="text-muted-foreground text-xs">Thinking...</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={onOpenSettings}
              >
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Chat settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <CircleHelp className="h-4 w-4" />
                <span className="sr-only">Help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
