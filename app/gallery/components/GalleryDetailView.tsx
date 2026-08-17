"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GalleryFrame } from "./GalleryFrame";
import { GalleryThumbnails } from "./GalleryThumbnails";
import type {
  GalleryItem,
  GallerySelection,
  GalleryTypography,
  ViewportSize,
} from "./gallery-types";
import { imageAlt, imageSource, imageSourceSet, modulo } from "./gallery-utils";
import { preloadGalleryImage, useImageAspectRatio } from "./useImageAspectRatio";

type GalleryDetailViewProps = {
  images: GalleryItem[];
  selection: GallerySelection | null;
  frameColor: string;
  frameSize: number;
  thumbnailSize: number;
  typography?: GalleryTypography;
  onChange: (selection: GallerySelection) => void;
  onClose: () => void;
};

function fitArtwork(stage: ViewportSize, ratio: number) {
  const stageWidth = stage.width || 720;
  const stageHeight = stage.height || 520;
  const isCompact = stageWidth < 720;
  const maxWidth = Math.max(220, stageWidth - (isCompact ? 30 : 96));
  const maxHeight = Math.max(170, stageHeight - (isCompact ? 210 : 176));

  if (maxWidth / maxHeight > ratio) {
    return { width: maxHeight * ratio, height: maxHeight };
  }

  return { width: maxWidth, height: maxWidth / ratio };
}

function imageCode(item: GalleryItem, index: number) {
  return item.code?.trim() || `XX${String(index + 1).padStart(2, "0")}`;
}

function DetailContent({
  images,
  selection,
  frameColor,
  frameSize,
  thumbnailSize,
  typography,
  onChange,
  onClose,
}: Omit<GalleryDetailViewProps, "selection"> & { selection: GallerySelection }) {
  const item = images[selection.index];
  const src = imageSource(item.image);
  const ratio = useImageAspectRatio(src, item.aspectRatio);
  const stageRef = useRef<HTMLDivElement>(null);
  const gestureStart = useRef<number | null>(null);
  const wheelAmount = useRef(0);
  const wheelTargetIndex = useRef(selection.index);
  const [stageSize, setStageSize] = useState<ViewportSize>({ width: 0, height: 0 });
  const targetSize = useMemo(() => fitArtwork(stageSize, ratio), [ratio, stageSize]);

  const navigate = useCallback(
    (direction: number) => {
      const nextIndex = modulo(selection.index + direction, images.length);
      startTransition(() => {
        onChange({ index: nextIndex, tileKey: `detail-${nextIndex}` });
      });
    },
    [images.length, onChange, selection.index]
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      setStageSize({ width: rect.width, height: rect.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    wheelTargetIndex.current = selection.index;
  }, [selection.index]);

  useEffect(() => {
    const previous = modulo(selection.index - 1, images.length);
    const next = modulo(selection.index + 1, images.length);
    preloadGalleryImage(imageSource(images[previous].image));
    preloadGalleryImage(imageSource(images[next].image));
  }, [images, selection.index]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown" || event.key === "ArrowRight") navigate(1);
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") navigate(-1);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate, onClose]);

  return (
    <motion.div
      className="fg-detail"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} detail`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.24 }}
      onWheel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const normalizedDelta =
          event.deltaMode === 1
            ? event.deltaY * 40
            : event.deltaMode === 2
              ? event.deltaY * window.innerHeight
              : event.deltaY;
        wheelAmount.current += normalizedDelta;
        const stepSize = 90;
        const rawSteps = Math.trunc(wheelAmount.current / stepSize);
        if (rawSteps === 0) return;
        const steps = rawSteps > 0 ? 1 : -1;

        wheelAmount.current -= steps * stepSize;
        const nextIndex = modulo(
          wheelTargetIndex.current + steps,
          images.length
        );
        wheelTargetIndex.current = nextIndex;
        startTransition(() => {
          onChange({ index: nextIndex, tileKey: `detail-${nextIndex}` });
        });
      }}
      onPointerDown={(event) => {
        gestureStart.current = event.clientY;
      }}
      onPointerUp={(event) => {
        if (gestureStart.current === null) return;
        const distance = gestureStart.current - event.clientY;
        gestureStart.current = null;
        if (Math.abs(distance) > 48) navigate(distance > 0 ? 1 : -1);
      }}
    >
      <div ref={stageRef} className="fg-detail-stage">
        <motion.figure
          className="fg-detail-artwork"
          animate={{ width: targetSize.width }}
          transition={{ type: "spring", stiffness: 108, damping: 23, mass: 0.82 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`code-${selection.index}`}
              className="fg-detail-code"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
            >
              {imageCode(item, selection.index)}
            </motion.p>
          </AnimatePresence>

          <motion.div
            className="fg-detail-image-frame"
            initial={{ scale: 0.86, rotateX: -8, opacity: 0 }}
            animate={{ height: targetSize.height, scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.92, rotateX: 6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 108, damping: 23, mass: 0.82 }}
          >
            <GalleryFrame
              color={frameColor}
              size={frameSize * 1.2}
              style={{ width: "100%", height: "100%" }}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={src}
                  className="fg-detail-image"
                  src={src}
                  srcSet={imageSourceSet(item.image)}
                  alt={imageAlt(item.image, item.title)}
                  draggable={false}
                  initial={{ opacity: 0.18 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />
              </AnimatePresence>
            </GalleryFrame>
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.figcaption
              key={`description-${selection.index}`}
              className="fg-detail-description"
              style={typography}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
            >
              {item.description}
            </motion.figcaption>
          </AnimatePresence>
        </motion.figure>
      </div>

      <button
        type="button"
        className="fg-back"
        aria-label="Close gallery detail"
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }}
      >
        <span aria-hidden="true">←</span>
      </button>

      <GalleryThumbnails
        images={images}
        selectedIndex={selection.index}
        size={thumbnailSize}
        frameColor={frameColor}
        onSelect={(index) =>
          startTransition(() => onChange({ index, tileKey: `detail-${index}` }))
        }
      />
    </motion.div>
  );
}

export function GalleryDetailView(props: GalleryDetailViewProps) {
  return (
    <AnimatePresence>
      {props.selection && props.images[props.selection.index] ? (
        <DetailContent {...props} selection={props.selection} />
      ) : null}
    </AnimatePresence>
  );
}
