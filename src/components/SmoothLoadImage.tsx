"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SmoothLoadImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: "contain" | "cover" | "fill";
  priority?: boolean;
}

export const SmoothLoadImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  objectFit = "contain",
  priority = false,
}: SmoothLoadImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle the case where the image might be cached and already loaded
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
      setTimeout(() => setIsImageLoaded(true), 100);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
    setTimeout(() => setIsImageLoaded(true), 100);
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
    >
      {/* The actual image with blob effect transition */}
      <motion.div
        className="h-full w-full"
        initial={false}
        animate={{
          filter: isImageLoaded ? "blur(0px)" : "blur(30px)",
          scale: isImageLoaded ? 1 : 1.1,
          opacity: isImageLoaded ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <img
          ref={imgRef}
          alt={alt}
          src={src}
          className={`h-full w-full object-${objectFit}`}
          onLoad={handleImageLoad}
          loading={priority ? "eager" : "lazy"}
        />
      </motion.div>
    </div>
  );
};
