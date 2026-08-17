import type { CSSProperties } from "react";

export type GalleryImageSource =
  | string
  | {
      src: string;
      srcSet?: string;
      alt?: string;
    };

export type GalleryItem = {
  image: GalleryImageSource;
  code?: string;
  title: string;
  description: string;
  category: string;
  year: string;
  aspectRatio?: number;
};

export type GallerySelection = {
  index: number;
  tileKey: string;
};

export type GalleryTypography = CSSProperties & {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  letterSpacing?: number | string;
  lineHeight?: number | string;
};

export type FreeformGalleryProps = {
  images: GalleryItem[];
  backgroundColor: string;
  baseImageSize: number;
  spacing: number;
  scatterAmount: number;
  rotationAmount: number;
  frameColor: string;
  frameSize: number;
  typography?: GalleryTypography;
  thumbnailSize: number;
  hoverStrength: number;
  momentumStrength: number;
  style?: CSSProperties;
};

export type ViewportSize = {
  width: number;
  height: number;
};
