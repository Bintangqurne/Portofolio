const galleryCss = `
.fg-root, .fg-root * { box-sizing: border-box; }
.fg-root {
  --fg-bg: #000000;
  --fg-ink: #ffffff;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 520px;
  overflow: hidden;
  isolation: isolate;
  background: var(--fg-bg);
  color: var(--fg-ink);
  font-family: Arial, Helvetica, sans-serif;
}
.fg-root button { font: inherit; color: inherit; }
.fg-canvas {
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  user-select: none;
  overscroll-behavior: none;
}
.fg-canvas.is-dragging { cursor: grabbing; }
.fg-world {
  position: absolute;
  inset: 0;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}
.fg-tile-position {
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  transform-origin: center;
  will-change: transform;
}
.fg-tile {
  appearance: none;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transform-origin: center;
}
.fg-layout-image { width: 100%; }
.fg-tile-tilt {
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 160ms ease-out, filter 260ms ease;
  will-change: transform;
}
.fg-tile:hover .fg-tile-tilt { filter: saturate(1.08) contrast(1.02); }
.fg-frame {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 1px;
  background: rgba(255,255,255,.14);
}
.fg-frame > img, .fg-tile-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fg-corner {
  position: absolute;
  z-index: 2;
  border-style: solid;
  pointer-events: none;
}
.fg-corner--nw { top: -7px; left: -7px; border-right: 0; border-bottom: 0; }
.fg-corner--ne { top: -7px; right: -7px; border-left: 0; border-bottom: 0; }
.fg-corner--se { right: -7px; bottom: -7px; border-left: 0; border-top: 0; }
.fg-corner--sw { bottom: -7px; left: -7px; border-right: 0; border-top: 0; }
.fg-tile-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 13px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: .12em;
  text-transform: uppercase;
  opacity: .72;
}
.fg-overlay-header {
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 28px;
  pointer-events: none;
}
.fg-brand { display: grid; gap: 3px; }
.fg-brand strong {
  font-size: 13px;
  line-height: 1;
  letter-spacing: -.02em;
}
.fg-brand span, .fg-instructions {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .13em;
  line-height: 1.35;
  text-transform: uppercase;
  opacity: .58;
}
.fg-instructions { max-width: 170px; text-align: right; }
.fg-empty {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 8px;
  text-align: center;
  padding: 32px;
}
.fg-empty strong { font-size: 24px; letter-spacing: -.04em; }
.fg-empty span { font-size: 12px; opacity: .55; }
.fg-detail {
  position: absolute;
  z-index: 50;
  inset: 0;
  overflow: hidden;
  background: var(--fg-bg);
  color: var(--fg-ink);
  touch-action: none;
  overscroll-behavior: contain;
}
.fg-detail::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: .045;
  pointer-events: none;
  background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at center, transparent 12%, black 82%);
}
.fg-detail-stage {
  position: absolute;
  z-index: 1;
  inset: 58px 118px 42px 28px;
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 0;
  perspective: 1400px;
}
.fg-detail-artwork {
  display: grid;
  grid-template-rows: auto auto minmax(34px, auto);
  align-items: start;
  gap: 12px;
  margin: 0;
  max-width: 100%;
  min-width: 0;
  transform-style: preserve-3d;
  will-change: width;
}
.fg-detail-code {
  margin: 0;
  width: 100%;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: .16em;
  text-transform: uppercase;
  opacity: .72;
}
.fg-detail-image-frame {
  position: relative;
  width: 100%;
  min-height: 1px;
  transform-style: preserve-3d;
  will-change: height;
}
.fg-detail-description {
  margin: 0;
  width: 100%;
  max-width: 760px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: .01em;
  opacity: .64;
}
.fg-detail-image-frame .fg-frame { overflow: hidden; box-shadow: 0 34px 90px rgba(0, 0, 0, .24); }
.fg-detail-image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.fg-back {
  position: absolute;
  z-index: 60;
  top: 24px;
  right: 28px;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  padding: 0;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: transform 220ms ease, background-color 220ms ease, color 220ms ease;
}
.fg-back:hover { transform: rotate(-12deg) scale(1.06); background: var(--fg-ink); color: var(--fg-bg); }
.fg-back span { font-size: 24px; line-height: 1; transform: translateY(-1px); }
.fg-thumbnails {
  position: absolute;
  z-index: 55;
  top: 96px;
  right: 24px;
  bottom: 26px;
  width: max-content;
  min-height: 0;
}
.fg-thumbnails-track {
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: max-content;
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 7px;
  overscroll-behavior: contain;
  scrollbar-width: none;
}
.fg-thumbnails-track::-webkit-scrollbar { display: none; }
.fg-thumbnail {
  position: relative;
  flex: 0 0 auto;
  overflow: hidden;
  padding: 0;
  border: 2px solid transparent;
  background: rgba(255,255,255,.08);
  opacity: .42;
  cursor: pointer;
  transition: opacity 180ms ease, transform 180ms ease, border-color 180ms ease;
}
.fg-thumbnail:hover, .fg-thumbnail.is-active { opacity: 1; transform: scale(1.04); }
.fg-thumbnail.is-active { box-shadow: 0 0 0 1px currentColor; }
.fg-thumbnail img { width: 100%; height: 100%; display: block; object-fit: cover; }
.fg-thumbnail span {
  position: absolute;
  right: 4px;
  bottom: 3px;
  padding: 2px 3px;
  color: #fff;
  background: rgba(0,0,0,.58);
  font-size: 7px;
  line-height: 1;
}
@media (max-width: 767px) {
  .fg-root { min-height: 430px; }
  .fg-overlay-header { padding: 18px; }
  .fg-instructions { max-width: 120px; font-size: 8px; }
  .fg-detail-stage { inset: 66px 15px 112px; }
  .fg-detail-artwork { gap: 9px; }
  .fg-detail-code { font-size: 9px; }
  .fg-detail-description { display: block; font-size: 10px; line-height: 1.45; min-height: 29px; }
  .fg-back { top: 16px; right: 16px; width: 48px; height: 48px; background: color-mix(in srgb, var(--fg-bg) 82%, transparent); backdrop-filter: blur(12px); }
  .fg-thumbnails { top: auto; left: 0; right: 0; bottom: 12px; width: 100%; height: auto; }
  .fg-thumbnails-track { flex-direction: row; width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; padding: 7px 18px; }
  .fg-tile-caption { font-size: 8px; padding-top: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .fg-root *, .fg-root *::before, .fg-root *::after {
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;

export function GalleryStyles() {
  return <style>{galleryCss}</style>;
}
