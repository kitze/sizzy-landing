import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { type Message } from "ai";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AIChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export function AIChatMessage({
  message,
  isLastMessage = false,
}: AIChatMessageProps) {
  const isUser = message.role === "user";
  const textRef = useRef<HTMLParagraphElement>(null);
  const [textHeight, setTextHeight] = useState<number | null>(null);
  const isEmptyAssistantMessage = !isUser && message.content === "";

  // Update height for smooth animation when content changes
  useEffect(() => {
    if (textRef.current && isLastMessage && !isUser) {
      const updateHeight = () => {
        if (textRef.current) {
          setTextHeight(textRef.current.scrollHeight);
        }
      };

      updateHeight();

      // Set up a ResizeObserver to catch content changes
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(textRef.current);

      return () => {
        if (textRef.current) {
          resizeObserver.unobserve(textRef.current);
        }
      };
    }
  }, [message.content, isLastMessage, isUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: isLastMessage ? 0.1 : 0 }}
      className={cn(
        "flex items-start gap-3 px-4 py-2",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <Avatar className="bg-primary/10 flex h-8 w-8 items-center justify-center border">
          <Bot className="h-5 w-5" />
        </Avatar>
      )}

      <div
        className={cn(
          "relative max-w-md rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted/50 backdrop-blur-sm",
          isLastMessage && !isUser && "animate-pulse-subtle",
        )}
      >
        {isEmptyAssistantMessage ? (
          <div className="flex h-6 items-center space-x-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
          </div>
        ) : (
          <p
            ref={textRef}
            className="text-sm whitespace-pre-wrap"
            style={{
              height: textHeight ? `${textHeight}px` : "auto",
            }}
          >
            {message.content}
          </p>
        )}
      </div>

      {isUser && (
        <Avatar className="bg-primary flex h-8 w-8 items-center justify-center border">
          <User className="h-5 w-5 text-white" />
        </Avatar>
      )}
    </motion.div>
  );
}
