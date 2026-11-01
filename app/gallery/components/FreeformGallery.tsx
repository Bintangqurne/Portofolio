"use client";

import { LayoutGroup } from "framer-motion";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { GalleryDetailView } from "./GalleryDetailView";
import { GalleryStyles } from "./GalleryStyles";
import { InfiniteCanvas } from "./InfiniteCanvas";
import type { FreeformGalleryProps, GallerySelection } from "./gallery-types";

export const defaultGalleryProps: FreeformGalleryProps = {
  images: [],
  backgroundColor: "#000000",
  baseImageSize: 300,
  spacing: 250,
  scatterAmount: 84,
  rotationAmount: 7,
  frameColor: "#FFFFFF",
  frameSize: 24,
  typography: {
    fontFamily: "var(--font-figtree), sans-serif",
  },
  thumbnailSize: 72,
  hoverStrength: 13,
  momentumStrength: 18,
};

type CursorMode = "hidden" | "drag" | "view";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 760
 */
export function FreeformGallery(rawProps: Partial<FreeformGalleryProps>) {
  const props = { ...defaultGalleryProps, ...rawProps };
  const images = useMemo(() => props.images.slice(0, 12), [props.images]);
  const [selection, setSelection] = useState<GallerySelection | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const selectionLockedUntil = useRef(0);

  const rootRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("hidden");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of images) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    return [...counts.entries()];
  }, [images]);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Custom cursor: "DRAG" over the canvas, "VIEW" over a photo, hidden on controls.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !finePointer) return;
    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target as Element;
      const mode: CursorMode = target.closest(".fg-detail, .fg-hud-side")
        ? "hidden"
        : target.closest(".fg-tile")
          ? "view"
          : target.closest(".fg-canvas")
            ? "drag"
            : "hidden";
      setCursorMode(mode);

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        }
      });
    };
    const handleLeave = () => setCursorMode("hidden");

    root.addEventListener("pointermove", handleMove);
    root.addEventListener("pointerleave", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", handleLeave);
    };
  }, [finePointer]);

  function closeDetail() {
    selectionLockedUntil.current = Date.now() + 360;
    startTransition(() => setSelection(null));
  }

  return (
    <LayoutGroup id="freeform-gallery">
      <section
        ref={rootRef}
        className={`fg-root${finePointer ? " has-cursor" : ""}`}
        style={
          {
            ...props.style,
            "--fg-bg": props.backgroundColor,
            "--fg-ink": props.frameColor,
            ...props.typography,
          } as React.CSSProperties
        }
        aria-label="Freeform image gallery"
      >
        <GalleryStyles />

        {images.length ? (
          <InfiniteCanvas
            images={images}
            baseImageSize={props.baseImageSize}
            spacing={props.spacing}
            scatterAmount={props.scatterAmount}
            rotationAmount={props.rotationAmount}
            frameColor={props.frameColor}
            frameSize={props.frameSize}
            hoverStrength={props.hoverStrength}
            momentumStrength={props.momentumStrength}
            activeCategory={activeCategory}
            shouldBlockSelection={() => Date.now() < selectionLockedUntil.current}
            onSelect={setSelection}
          />
        ) : (
          <div className="fg-empty">
            <strong>Add your images</strong>
            <span>Use the Images property to add up to 12 gallery items.</span>
          </div>
        )}

        {finePointer ? (
          <div ref={cursorRef} className="fg-cursor" data-mode={selection ? "hidden" : cursorMode} aria-hidden="true">
            <span className="fg-cursor-dot">{cursorMode === "view" ? "View" : "Drag"}</span>
          </div>
        ) : null}

        <div className="fg-hud">
          <div className="fg-hud-title" aria-hidden="true">
            <p className="fg-hud-kicker">
              <span>(Archive)</span>
              <span>{pad(images.length)} memories</span>
            </p>
            <strong>Gallery</strong>
          </div>

          <div className="fg-hud-side">
            <p className="fg-instructions">
              {finePointer ? "Drag to roam · click a photo to open" : "Drag to roam · tap a photo to open"}
            </p>
            <div className="fg-filters" role="group" aria-label="Filter by category">
              <button
                type="button"
                className="fg-filter"
                aria-pressed={activeCategory === null}
                onClick={() => setActiveCategory(null)}
              >
                All<span>{pad(images.length)}</span>
              </button>
              {categories.map(([category, count]) => (
                <button
                  key={category}
                  type="button"
                  className="fg-filter"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory((current) => (current === category ? null : category))}
                >
                  {category}
                  <span>{pad(count)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <GalleryDetailView
          images={images}
          selection={selection}
          frameColor={props.frameColor}
          frameSize={props.frameSize}
          thumbnailSize={props.thumbnailSize}
          typography={props.typography}
          onChange={setSelection}
          onClose={closeDetail}
        />
      </section>
    </LayoutGroup>
  );
}

FreeformGallery.defaultProps = defaultGalleryProps;
