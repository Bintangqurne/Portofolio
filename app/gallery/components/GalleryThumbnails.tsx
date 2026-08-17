"use client";

import { useEffect, useRef } from "react";
import type { GalleryItem } from "./gallery-types";
import { imageAlt, imageSource, imageSourceSet } from "./gallery-utils";

type GalleryThumbnailsProps = {
  images: GalleryItem[];
  selectedIndex: number;
  size: number;
  frameColor: string;
  onSelect: (index: number) => void;
};

export function GalleryThumbnails({
  images,
  selectedIndex,
  size,
  frameColor,
  onSelect,
}: GalleryThumbnailsProps) {
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbnailRefs.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [selectedIndex]);

  return (
    <nav
      className="fg-thumbnails"
      aria-label="Gallery images"
      onWheel={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
    >
      <div className="fg-thumbnails-track">
        {images.map((item, index) => (
          <button
            type="button"
            ref={(node) => {
              thumbnailRefs.current[index] = node;
            }}
            key={`${item.title}-${index}`}
            className={`fg-thumbnail${selectedIndex === index ? " is-active" : ""}`}
            aria-label={`View ${item.title}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            style={{
              width: size,
              height: Math.max(42, size * 0.72),
              borderColor: selectedIndex === index ? frameColor : "transparent",
            }}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(index);
            }}
          >
            <img
              src={imageSource(item.image)}
              srcSet={imageSourceSet(item.image)}
              alt={imageAlt(item.image, item.title)}
              draggable={false}
            />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
