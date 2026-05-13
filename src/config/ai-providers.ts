import { Capability, type CapabilityType } from "./ai-capabilities";

export interface AiProviderInfo {
  id: string;
  name: string;
  description?: string;
  capabilities: CapabilityType[];
  logoUrl?: string;
}

export const AI_PROVIDERS: AiProviderInfo[] = [
  {
    id: "openai",
    name: "OpenAI",
    capabilities: [
      Capability.ImageInput,
      Capability.ImageGeneration,
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.ToolStreaming,
      Capability.CodeGeneration,
      Capability.FunctionCalling,
      Capability.VisionAnalysis,
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    capabilities: [
      Capability.ImageInput,
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.ToolStreaming,
      Capability.CodeGeneration,
      Capability.VisionAnalysis,
    ],
  },
  {
    id: "xai",
    name: "xAI Grok",
    capabilities: [
      Capability.ImageInput,
      Capability.ImageGeneration,
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.ToolStreaming,
    ],
  },
  {
    id: "gemini",
    name: "Google Gemini",
    capabilities: [
      Capability.ImageInput,
      Capability.ImageGeneration,
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.VisionAnalysis,
    ],
  },
  {
    id: "mistral",
    name: "Mistral AI",
    capabilities: [
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.CodeGeneration,
    ],
  },
  {
    id: "llama",
    name: "Llama",
    capabilities: [
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.CodeGeneration,
    ],
  },
  {
    id: "cohere",
    name: "Cohere",
    capabilities: [Capability.ObjectGeneration, Capability.ToolUsage],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    capabilities: [
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.ToolStreaming,
    ],
  },
  {
    id: "groq",
    name: "Groq",
    capabilities: [
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.ToolStreaming,
    ],
  },
  {
    id: "azure",
    name: "Azure OpenAI",
    capabilities: [
      Capability.ImageInput,
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.ToolStreaming,
    ],
  },
  {
    id: "amazon-bedrock",
    name: "Amazon Bedrock",
    capabilities: [
      Capability.ImageInput,
      Capability.ImageGeneration,
      Capability.ObjectGeneration,
      Capability.ToolUsage,
      Capability.ToolStreaming,
    ],
  },
];

// Define the provider type based on the AI_PROVIDERS array
export type AiProviderId = string;

// List of enabled AI providers (admin can customize this list)
export const ENABLED_AI_PROVIDERS: AiProviderId[] = [
  "openai",
  "anthropic",
  "gemini",
  "mistral",
  "llama",
];

/**
 * Gets the enabled preference key for a provider ID
 */
export function getProviderEnabledKey(providerId: string): string {
  return `aiProviderEnabled${providerId}`;
}

/**
 * Gets the API key preference key for a provider ID
 */
export function getProviderApiKeyKey(providerId: string): string {
  return `aiProviderKey${providerId}`;
}
