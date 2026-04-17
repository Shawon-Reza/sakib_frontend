"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ImageCarouselProps = {
  images: string[];
  intervalMs?: number;
  altPrefix?: string;
  className?: string;
};

export function ImageCarousel({
  images,
  intervalMs = 1000,
  altPrefix = "Carousel image",
  className,
}: ImageCarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative scale-90 h-90 w-full overflow-hidden rounded-3xl shadow-lg transform transition-all duration-700 hover:scale-95 hover:shadow-2xl  sm:h-115 lg:h-155">
        {images.map((image, index) => {
          const isActive = index === activeImageIndex;

          return (
            <Image
              key={image}
              src={image}
              alt={`${altPrefix} ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "absolute inset-0 object-cover transition-all duration-900 ease-out",
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0 pointer-events-none"
              )}
              priority={index === 0}
            />
          );
        })}
      </div>

      {images.length > 1 ? (
        <div className="flex items-center gap-2">
          {images.map((_, index) => {
            const isActive = index === activeImageIndex;

            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={cn(
                  "h-3 w-3 rounded-full border border-slate-400 transition-all duration-300",
                  isActive ? "w-7 bg-slate-900" : "bg-white hover:bg-slate-200"
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
