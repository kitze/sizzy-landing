import { type KeyboardEvent, type FormEvent, type RefObject, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface AIChatNewMessageProps {
  formRef: RefObject<HTMLFormElement | null>;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  input: string;
  isLoading: boolean;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function AIChatNewMessage({
  formRef,
  inputRef,
  input,
  isLoading,
  handleInputChange,
  handleKeyDown,
  handleSubmit,
  className,
}: AIChatNewMessageProps) {
  return (
    <div className={cn("bg-background w-full border-t p-4", className)}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-end gap-3"
      >
        <div className="relative flex-1">
          <Textarea
            ref={inputRef}
            name="prompt"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            className={cn(
              "max-h-40 min-h-12 resize-none rounded-xl p-3 pr-4", // Adjusted min-height
              isLoading && "opacity-50",
            )}
            disabled={isLoading}
            rows={1}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          size="icon"
          className="h-12 w-12 shrink-0 rounded-full"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
