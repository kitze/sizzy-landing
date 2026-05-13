import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface MetaImageGradientBlur {
  position: string;
  size: string;
  color: string;
  blur: string;
}

export interface MetaImageProps {
  title: string;
  tagline: string;
  description?: string;
  descriptionHighlight?: string;
  icon?: ReactNode;
  iconSize?: number;
  gradientBlurs?: MetaImageGradientBlur[];
  accentGradient?: string;
  className?: string;
  titleSize?: string;
}

const defaultGradientBlurs: MetaImageGradientBlur[] = [
  {
    position: "top-[-20%] left-[-10%]",
    size: "h-[500px] w-[500px]",
    color: "bg-zinc-600/15",
    blur: "blur-[120px]",
  },
  {
    position: "bottom-[-20%] right-[-10%]",
    size: "h-[400px] w-[400px]",
    color: "bg-zinc-600/15",
    blur: "blur-[100px]",
  },
  {
    position: "top-[30%] right-[20%]",
    size: "h-[300px] w-[300px]",
    color: "bg-zinc-600/10",
    blur: "blur-[80px]",
  },
];

export function MetaImage({
  title,
  tagline,
  description,
  descriptionHighlight,
  icon,
  iconSize = 120,
  gradientBlurs = defaultGradientBlurs,
  accentGradient = "from-zinc-500 via-zinc-400 to-zinc-500",
  className,
  titleSize = "text-[180px]",
}: MetaImageProps) {
  return (
    <div
      className={cn("flex items-center justify-center bg-black", className)}
      style={{ width: 1200, height: 630 }}
    >
      <div
        className="relative flex h-full w-full items-center overflow-hidden bg-[#09090B]"
        style={{ width: 1200, height: 630 }}
      >
        {gradientBlurs.map((blur, index) => (
          <div
            key={index}
            className={cn(
              "absolute rounded-full",
              blur.position,
              blur.size,
              blur.color,
              blur.blur
            )}
          />
        ))}

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-16 text-center">
          {icon && (
            <div
              className="mb-6 flex items-center justify-center"
              style={{ width: iconSize, height: iconSize }}
            >
              {icon}
            </div>
          )}

          <h1
            className={cn(
              titleSize,
              "font-bold leading-none tracking-tight text-white"
            )}
          >
            {title}
          </h1>

          <p className="mt-6 text-4xl font-medium text-zinc-400">{tagline}</p>

          {(description || descriptionHighlight) && (
            <p className="mt-6 text-2xl text-zinc-500">
              {description}
              {descriptionHighlight && (
                <span className="text-zinc-300"> {descriptionHighlight}</span>
              )}
            </p>
          )}
        </div>

        <div
          className={cn(
            "absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r",
            accentGradient
          )}
        />
      </div>
    </div>
  );
}
