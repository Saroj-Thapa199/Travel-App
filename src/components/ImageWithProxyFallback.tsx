"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithProxyFallbackProps {
  src: string | undefined;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

/**
 * Renders an image via a proxy route to safely load external images.
 * Falls back to a local placeholder image if loading fails or no valid src provided.
 */
export default function ImageWithProxyFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  fill,
  width,
  height,
}: ImageWithProxyFallbackProps) {
  const [error, setError] = useState(false);

  const isValidExternal = src && src.startsWith("http");

  const proxiedSrc = isValidExternal
    ? `/api/image-proxy?url=${encodeURIComponent(src)}`
    : src;

  const finalSrc = error || !proxiedSrc ? fallbackSrc : proxiedSrc;

  return fill ? (
    <Image
      src={finalSrc}
      alt={alt}
      fill
      className={className}
      onError={() => setError(true)}
    />
  ) : (
    <Image
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
