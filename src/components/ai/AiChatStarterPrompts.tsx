import { AIChatStarterPromptCard } from "./AIChatStarterPromptCard";
import {
  Bot,
  Sparkles,
  Code,
  MessageSquareText,
  Briefcase,
  Database,
  Pencil,
} from "lucide-react";

interface AiChatStarterPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export function AiChatStarterPrompts({
  onSelectPrompt,
}: AiChatStarterPromptsProps) {
  const starterPrompts = [
    {
      icon: <Code className="text-primary h-4 w-4" />,
      title: "Help me debug my code",
      prompt:
        "I need help debugging a React component that's not rendering correctly.",
    },
    {
      icon: <Sparkles className="text-primary h-4 w-4" />,
      title: "Generate a creative idea",
      prompt: "Give me 3 creative project ideas using React and AI.",
    },
    {
      icon: <MessageSquareText className="text-primary h-4 w-4" />,
      title: "Explain a concept",
      prompt: "Explain how React hooks work in simple terms.",
    },
    {
      icon: <Database className="text-primary h-4 w-4" />,
      title: "Data processing help",
      prompt:
        "Help me create a function to efficiently filter and sort an array of objects.",
    },
    {
      icon: <Briefcase className="text-primary h-4 w-4" />,
      title: "Build something cool",
      prompt: "Help me build a simple todo app with React and TypeScript.",
    },
    {
      icon: <Pencil className="text-primary h-4 w-4" />,
      title: "Write content for me",
      prompt:
        "Help me write engaging content for my personal website homepage.",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="bg-primary/10 flex h-28 w-28 items-center justify-center rounded-full">
          <Bot className="text-primary h-14 w-14" strokeWidth={1.5} />
        </div>

        <div>
          <h3 className="text-3xl font-semibold">How can I help you today?</h3>
          <p className="text-muted-foreground mt-3 max-w-md text-sm">
            Ask me anything or try one of the example prompts below.
          </p>
        </div>

        <div className="mt-2 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {starterPrompts.map((prompt, index) => (
            <AIChatStarterPromptCard
              key={index}
              icon={prompt.icon}
              title={prompt.title}
              prompt={prompt.prompt}
              onClick={() => onSelectPrompt(prompt.prompt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
