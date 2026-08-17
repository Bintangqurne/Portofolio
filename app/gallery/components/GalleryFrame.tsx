"use client";

import type { CSSProperties, ReactNode } from "react";

type GalleryFrameProps = {
  children: ReactNode;
  color: string;
  size: number;
  style?: CSSProperties;
};

const corners = ["nw", "ne", "se", "sw"] as const;

export function GalleryFrame({ children, color, size, style }: GalleryFrameProps) {
  const thickness = Math.max(1, Math.min(size / 5, 4));

  return (
    <div className="fg-frame" style={style}>
      {children}
      {corners.map((corner) => (
        <span
          aria-hidden="true"
          className={`fg-corner fg-corner--${corner}`}
          key={corner}
          style={{
            width: size,
            height: size,
            borderColor: color,
            borderWidth: thickness,
          }}
        />
      ))}
    </div>
  );
}

