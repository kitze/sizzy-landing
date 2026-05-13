"use client";

import { useEffect, useState, type KeyboardEvent, type FormEvent, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { AIChatConversation } from "./AIChatConversation";
import { AiChatHeader } from "./AiChatHeader";
import { AIChatNewMessage } from "./AIChatNewMessage";
import { cn } from "@/lib/utils";

// Define the structure for classNames prop
interface AiChatClassNames {
  root?: string;
  header?: string;
  conversation?: string;
  newMessage?: string;
}

interface AiChatProps {
  classNames?: AiChatClassNames;
}

export function AiChat({ classNames = {} }: AiChatProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
    setInput,
  } = useChat();
  const [hasStartedChatting, setHasStartedChatting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const prevIsLoading = useRef(isLoading);

  // Track if user has started chatting
  useEffect(() => {
    if (messages.length > 0 && !hasStartedChatting) {
      setHasStartedChatting(true);
    }
  }, [messages, hasStartedChatting]);

  // Show toast notification on error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // Focus input on first render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Refocus input after AI finishes responding
  useEffect(() => {
    if (prevIsLoading.current && !isLoading && inputRef.current) {
      inputRef.current.focus();
    }
    prevIsLoading.current = isLoading;
  }, [isLoading]);

  // Handle starter prompts
  const handleStarterPrompt = (prompt: string) => {
    setInput(prompt);
    // Focus input after selecting a prompt
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
      if (!hasStartedChatting) {
        setHasStartedChatting(true);
      }
      // Focus the input after submitting (using setTimeout)
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // Handle keyboard shortcuts for the textarea
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        formRef.current?.requestSubmit();
        // Focus the input after submitting via Enter key (using setTimeout)
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    }
  };

  return (
    <div
      className={cn(
        "grid grid-rows-[auto_1fr_auto] overflow-hidden rounded-lg border shadow-sm",
        classNames.root,
      )}
    >
      <AiChatHeader isLoading={isLoading} className={classNames.header} />

      <AIChatConversation
        messages={messages}
        isLoading={isLoading}
        onStarterPrompt={handleStarterPrompt}
        inputRef={inputRef}
        className={classNames.conversation}
      />

      <AIChatNewMessage
        formRef={formRef}
        inputRef={inputRef}
        input={input}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleFormSubmit}
        className={classNames.newMessage}
      />
    </div>
  );
}
