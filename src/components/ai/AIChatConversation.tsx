import { type Message } from "ai";
import { useRef, useEffect, type RefObject } from "react";
import { AIChatMessage } from "./AIChatMessage";
import { AiChatStarterPrompts } from "./AiChatStarterPrompts";
import { cn } from "@/lib/utils";

interface AIChatConversationProps {
  messages: Message[];
  className?: string;
  isLoading?: boolean;
  onStarterPrompt?: (prompt: string) => void;
  inputRef?: RefObject<HTMLTextAreaElement | null>;
}

export function AIChatConversation({
  messages,
  className,
  isLoading = false,
  onStarterPrompt,
  inputRef,
}: AIChatConversationProps) {
  const conversationRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (conversationRef.current) {
      const container = conversationRef.current;
      // Scroll to bottom only if the user isn't scrolled up significantly
      if (
        container.scrollHeight - container.scrollTop - container.clientHeight <
        200
      ) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handlePromptClick = (prompt: string) => {
    if (onStarterPrompt) {
      onStarterPrompt(prompt);
      // Focus the input after selecting a prompt
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 0);
    }
  };

  return (
    <div
      ref={conversationRef}
      className={cn(
        "scrollbar-thin scrollbar-thumb-muted-foreground/10 scrollbar-track-transparent h-full overflow-y-auto p-4",
        className,
      )}
    >
      {messages.length === 0 ? (
        <AiChatStarterPrompts onSelectPrompt={handlePromptClick} />
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <AIChatMessage
              key={message.id}
              message={message}
              isLastMessage={
                index === messages.length - 1 &&
                !isLoading &&
                message.role === "assistant"
              }
            />
          ))}

          {isLoading && (
            <AIChatMessage
              message={{ id: "loading", role: "assistant", content: "" }}
              isLastMessage={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
