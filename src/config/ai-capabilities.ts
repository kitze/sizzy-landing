import {
  Image as ImageIcon,
  ImagePlus,
  Code,
  Wrench,
  Activity,
  type LucideIcon,
} from "lucide-react";

export interface AiCapability {
  id: string;
  title: string;
  icon: LucideIcon;
}

// Define all possible AI capabilities
export const Capability = {
  ImageInput: "image-input",
  ImageGeneration: "image-generation",
  ObjectGeneration: "object-generation",
  ToolUsage: "tool-usage",
  ToolStreaming: "tool-streaming",
  CodeGeneration: "code-generation",
  CodeExplanation: "code-explanation",
  FunctionCalling: "function-calling",
  VisionAnalysis: "vision-analysis",
} as const;

export type CapabilityType = (typeof Capability)[keyof typeof Capability];

// Map capabilities to their display information
export const CAPABILITY_INFO: Record<CapabilityType, AiCapability> = {
  [Capability.ImageInput]: {
    id: Capability.ImageInput,
    title: "Image Input",
    icon: ImageIcon,
  },
  [Capability.ImageGeneration]: {
    id: Capability.ImageGeneration,
    title: "Image Generation",
    icon: ImagePlus,
  },
  [Capability.ObjectGeneration]: {
    id: Capability.ObjectGeneration,
    title: "Object Generation",
    icon: Code,
  },
  [Capability.ToolUsage]: {
    id: Capability.ToolUsage,
    title: "Tool Usage",
    icon: Wrench,
  },
  [Capability.ToolStreaming]: {
    id: Capability.ToolStreaming,
    title: "Tool Streaming",
    icon: Activity,
  },
  [Capability.CodeGeneration]: {
    id: Capability.CodeGeneration,
    title: "Code Generation",
    icon: Code,
  },
  [Capability.CodeExplanation]: {
    id: Capability.CodeExplanation,
    title: "Code Explanation",
    icon: Code,
  },
  [Capability.FunctionCalling]: {
    id: Capability.FunctionCalling,
    title: "Function Calling",
    icon: Wrench,
  },
  [Capability.VisionAnalysis]: {
    id: Capability.VisionAnalysis,
    title: "Vision Analysis",
    icon: ImageIcon,
  },
};
