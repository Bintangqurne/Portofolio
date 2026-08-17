"use client";

import { LayoutGroup } from "framer-motion";
import { startTransition, useMemo, useRef, useState } from "react";
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
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 700,
  },
  thumbnailSize: 72,
  hoverStrength: 13,
  momentumStrength: 18,
};

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
  const selectionLockedUntil = useRef(0);

  function closeDetail() {
    selectionLockedUntil.current = Date.now() + 360;
    startTransition(() => setSelection(null));
  }

  return (
    <LayoutGroup id="freeform-gallery">
      <section
        className="fg-root"
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
            shouldBlockSelection={() => Date.now() < selectionLockedUntil.current}
            onSelect={setSelection}
          />
        ) : (
          <div className="fg-empty">
            <strong>Add your images</strong>
            <span>Use the Images property to add up to 12 gallery items.</span>
          </div>
        )}

        <header className="fg-overlay-header" aria-hidden="true">
          <div className="fg-brand">
            <strong>GALLERY</strong>
          </div>
          <p className="fg-instructions">Drag to roam · scroll in detail</p>
        </header>

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
