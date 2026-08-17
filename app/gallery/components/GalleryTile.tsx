"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { GalleryFrame } from "./GalleryFrame";
import type { GalleryItem } from "./gallery-types";
import { imageAlt, imageSource, imageSourceSet } from "./gallery-utils";
import { useImageAspectRatio } from "./useImageAspectRatio";

type GalleryTileProps = {
  item: GalleryItem;
  index: number;
  tileKey: string;
  x: number;
  y: number;
  width: number;
  rotation: number;
  delay: number;
  frameColor: string;
  frameSize: number;
  hoverStrength: number;
  introActive: boolean;
  deckOffset: { x: number; y: number };
  shouldSuppressClick: () => boolean;
  onSelect: (index: number, tileKey: string) => void;
};

export function GalleryTile({
  item,
  index,
  tileKey,
  x,
  y,
  width,
  rotation,
  delay,
  frameColor,
  frameSize,
  hoverStrength,
  introActive,
  deckOffset,
  shouldSuppressClick,
  onSelect,
}: GalleryTileProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const tiltFrame = useRef<number | null>(null);
  const src = imageSource(item.image);
  const ratio = useImageAspectRatio(src, item.aspectRatio);

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const node = tiltRef.current;
    if (!node || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    if (tiltFrame.current !== null) cancelAnimationFrame(tiltFrame.current);
    tiltFrame.current = requestAnimationFrame(() => {
      node.style.transform = `perspective(900px) rotateX(${(-ny * hoverStrength).toFixed(2)}deg) rotateY(${(nx * hoverStrength).toFixed(2)}deg) translateZ(${Math.abs(nx * ny * hoverStrength * 1.8).toFixed(2)}px)`;
    });
  }

  function resetTilt() {
    if (tiltFrame.current !== null) cancelAnimationFrame(tiltFrame.current);
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  }

  return (
    <div
      className="fg-tile-position"
      style={{
        left: x,
        top: y,
        width,
      }}
    >
      <motion.button
        type="button"
        className="fg-tile"
        aria-label={`Open ${item.title}`}
        initial={
          introActive
            ? {
                opacity: 0,
                scale: 0.34,
                x: deckOffset.x,
                y: deckOffset.y,
                rotate: -rotation * 2.5,
              }
            : { opacity: 0, scale: 0.82 }
        }
        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: rotation }}
        transition={{
          type: "spring",
          stiffness: introActive ? 62 : 125,
          damping: introActive ? 18 : 22,
          mass: 0.9,
          delay: introActive ? delay : 0.02,
        }}
        onClick={() => {
          if (!shouldSuppressClick()) onSelect(index, tileKey);
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        <motion.div layoutId={`fg-image-${tileKey}`} className="fg-layout-image">
          <div ref={tiltRef} className="fg-tile-tilt">
            <GalleryFrame
              color={frameColor}
              size={frameSize}
              style={{ aspectRatio: ratio }}
            >
              <img
                className="fg-tile-image"
                src={src}
                srcSet={imageSourceSet(item.image)}
                alt={imageAlt(item.image, item.title)}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </GalleryFrame>
          </div>
        </motion.div>
        <span className="fg-tile-caption">
          <span>{item.title}</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </span>
      </motion.button>
    </div>
  );
}

