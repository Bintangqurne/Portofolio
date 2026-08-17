"use client";

import { useEffect, useState } from "react";

const aspectRatioCache = new Map<string, number>();
const pendingImages = new Map<string, Promise<number>>();

function loadRatio(src: string) {
  const cached = aspectRatioCache.get(src);
  if (cached) return Promise.resolve(cached);

  const pending = pendingImages.get(src);
  if (pending) return pending;

  const request = new Promise<number>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const ratio = image.naturalWidth / Math.max(image.naturalHeight, 1);
      aspectRatioCache.set(src, ratio);
      pendingImages.delete(src);
      resolve(ratio);
    };
    image.onerror = () => {
      pendingImages.delete(src);
      resolve(4 / 3);
    };
    image.src = src;
  });

  pendingImages.set(src, request);
  return request;
}

export function useImageAspectRatio(src: string, knownRatio?: number) {
  if (knownRatio && !aspectRatioCache.has(src)) {
    aspectRatioCache.set(src, knownRatio);
  }

  const [ratio, setRatio] = useState(
    () => knownRatio || aspectRatioCache.get(src) || 4 / 3
  );

  useEffect(() => {
    let active = true;
    loadRatio(src).then((nextRatio) => {
      if (active && Math.abs(nextRatio - ratio) > 0.001) setRatio(nextRatio);
    });
    return () => {
      active = false;
    };
  }, [ratio, src]);

  return ratio;
}

export function preloadGalleryImage(src: string) {
  void loadRatio(src);
}

