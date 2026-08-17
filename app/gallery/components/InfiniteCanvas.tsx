"use client";

import {
  startTransition,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GalleryTile } from "./GalleryTile";
import type { GalleryItem, GallerySelection, ViewportSize } from "./gallery-types";
import { itemIndexForCell, tileVariation } from "./gallery-utils";

type InfiniteCanvasProps = {
  images: GalleryItem[];
  baseImageSize: number;
  spacing: number;
  scatterAmount: number;
  rotationAmount: number;
  frameColor: string;
  frameSize: number;
  hoverStrength: number;
  momentumStrength: number;
  shouldBlockSelection: () => boolean;
  onSelect: (selection: GallerySelection) => void;
};

type Bounds = {
  minColumn: number;
  maxColumn: number;
  minRow: number;
  maxRow: number;
};

const initialBounds: Bounds = {
  minColumn: -2,
  maxColumn: 5,
  minRow: -2,
  maxRow: 4,
};

export function InfiniteCanvas({
  images,
  baseImageSize,
  spacing,
  scatterAmount,
  rotationAmount,
  frameColor,
  frameSize,
  hoverStrength,
  momentumStrength,
  shouldBlockSelection,
  onSelect,
}: InfiniteCanvasProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const camera = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const pointer = useRef({ id: -1, x: 0, y: 0, time: 0, moved: 0 });
  const dragging = useRef(false);
  const suppressClick = useRef(false);
  const latestBounds = useRef(initialBounds);
  const [bounds, setBounds] = useState(initialBounds);
  const [viewport, setViewport] = useState<ViewportSize>({ width: 1440, height: 900 });
  const [introActive, setIntroActive] = useState(true);

  const adaptiveBase = Math.max(
    132,
    Math.min(baseImageSize, viewport.width < 700 ? viewport.width * 0.55 : viewport.width * 0.32)
  );
  const cellWidth = adaptiveBase + spacing;
  const cellHeight = adaptiveBase * 0.8 + spacing;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      setViewport({ width: rect.width, height: rect.height });
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIntroActive(false), 1250);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const elapsed = Math.min((time - lastTime) / 16.667, 2.5);
      lastTime = time;
      const value = camera.current;

      if (!dragging.current) {
        value.x += value.vx * elapsed;
        value.y += value.vy * elapsed;
        const friction = Math.pow(0.78 + momentumStrength * 0.002, elapsed);
        value.vx *= friction;
        value.vy *= friction;
        if (Math.abs(value.vx) < 0.015) value.vx = 0;
        if (Math.abs(value.vy) < 0.015) value.vy = 0;
      }

      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(${value.x.toFixed(2)}px, ${value.y.toFixed(2)}px, 0)`;
      }

      const bufferX = Math.max(adaptiveBase, viewport.width * 0.28);
      const bufferY = Math.max(adaptiveBase, viewport.height * 0.3);
      const nextBounds = {
        minColumn: Math.floor((-value.x - bufferX) / cellWidth),
        maxColumn: Math.ceil((-value.x + viewport.width + bufferX) / cellWidth),
        minRow: Math.floor((-value.y - bufferY) / cellHeight),
        maxRow: Math.ceil((-value.y + viewport.height + bufferY) / cellHeight),
      };
      const previous = latestBounds.current;
      if (
        previous.minColumn !== nextBounds.minColumn ||
        previous.maxColumn !== nextBounds.maxColumn ||
        previous.minRow !== nextBounds.minRow ||
        previous.maxRow !== nextBounds.maxRow
      ) {
        latestBounds.current = nextBounds;
        startTransition(() => setBounds(nextBounds));
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [adaptiveBase, cellHeight, cellWidth, momentumStrength, viewport.height, viewport.width]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const value = camera.current;
      value.x -= event.deltaX;
      value.y -= event.deltaY;
      value.vx = -event.deltaX * (0.055 + momentumStrength * 0.0017);
      value.vy = -event.deltaY * (0.055 + momentumStrength * 0.0017);
    };

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, [momentumStrength]);

  const cells = useMemo(() => {
    const visible = [];
    for (let row = bounds.minRow; row <= bounds.maxRow; row += 1) {
      for (let column = bounds.minColumn; column <= bounds.maxColumn; column += 1) {
        visible.push({ row, column });
      }
    }
    return visible;
  }, [bounds]);

  return (
    <div
      ref={rootRef}
      className="fg-canvas"
      data-lenis-prevent
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        dragging.current = true;
        suppressClick.current = false;
        pointer.current = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          time: performance.now(),
          moved: 0,
        };
        camera.current.vx = 0;
        camera.current.vy = 0;
      }}
      onPointerMove={(event) => {
        if (!dragging.current || pointer.current.id !== event.pointerId) return;
        const now = performance.now();
        const dx = event.clientX - pointer.current.x;
        const dy = event.clientY - pointer.current.y;
        const elapsed = Math.max(now - pointer.current.time, 8);
        pointer.current.moved += Math.abs(dx) + Math.abs(dy);
        suppressClick.current = pointer.current.moved > 7;
        if (
          suppressClick.current &&
          !event.currentTarget.hasPointerCapture(event.pointerId)
        ) {
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.classList.add("is-dragging");
        }
        camera.current.x += dx;
        camera.current.y += dy;
        camera.current.vx = dx * (16.667 / elapsed) * (0.5 + momentumStrength * 0.012);
        camera.current.vy = dy * (16.667 / elapsed) * (0.5 + momentumStrength * 0.012);
        pointer.current.x = event.clientX;
        pointer.current.y = event.clientY;
        pointer.current.time = now;
      }}
      onPointerUp={(event) => {
        if (pointer.current.id !== event.pointerId) return;
        dragging.current = false;
        event.currentTarget.classList.remove("is-dragging");
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 0);
      }}
      onPointerCancel={(event) => {
        dragging.current = false;
        event.currentTarget.classList.remove("is-dragging");
      }}
    >
      <div ref={worldRef} className="fg-world">
        {cells.map(({ row, column }) => {
          const variation = tileVariation(row, column);
          const index = itemIndexForCell(row, column, images.length);
          const tileKey = `${row}:${column}`;
          const width = adaptiveBase * variation.scale;
          const x =
            column * cellWidth + cellWidth * 0.5 + variation.x * scatterAmount;
          const y = row * cellHeight + cellHeight * 0.5 + variation.y * scatterAmount;

          return (
            <GalleryTile
              key={tileKey}
              item={images[index]}
              index={index}
              tileKey={tileKey}
              x={x}
              y={y}
              width={width}
              rotation={variation.rotation * rotationAmount * 2}
              delay={variation.delay}
              frameColor={frameColor}
              frameSize={frameSize}
              hoverStrength={hoverStrength}
              introActive={introActive}
              deckOffset={{
                x: viewport.width * 0.5 - x,
                y: viewport.height * 0.5 - y,
              }}
              shouldSuppressClick={() =>
                suppressClick.current || shouldBlockSelection()
              }
              onSelect={(selectedIndex, selectedTileKey) =>
                startTransition(() =>
                  onSelect({ index: selectedIndex, tileKey: selectedTileKey })
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}
