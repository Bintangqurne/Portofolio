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
  font-family: var(--font-figtree), sans-serif;
  --fg-accent: #ff2a2a;
  --fg-mono: var(--font-ibm-mono), monospace;
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
  transition: opacity 450ms ease, filter 450ms ease;
}
.fg-tile-position.is-dimmed { opacity: .1; filter: grayscale(1); }
.fg-tile-position.is-dimmed .fg-tile { pointer-events: none; }
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
  font-family: var(--fg-mono);
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.fg-tile-caption span:first-child { opacity: .72; }
.fg-tile-caption span:last-child { color: var(--fg-accent); }
.fg-hud {
  position: absolute;
  z-index: 20;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding: 140px 32px 26px;
  pointer-events: none;
  background: linear-gradient(to top, rgba(0,0,0,.88), rgba(0,0,0,.45) 55%, transparent);
}
.fg-hud-kicker {
  display: flex;
  gap: 14px;
  margin: 0 0 10px;
  font-family: var(--fg-mono);
  font-size: 10px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: rgba(255,255,255,.6);
}
.fg-hud-kicker span:first-child { color: var(--fg-accent); }
.fg-hud-title strong {
  display: block;
  margin-left: -.04em;
  font-size: clamp(64px, 10vw, 180px);
  font-weight: 900;
  line-height: .78;
  letter-spacing: -.085em;
  text-transform: uppercase;
  color: var(--fg-accent);
}
.fg-hud-side {
  display: grid;
  justify-items: end;
  gap: 12px;
  max-width: 54%;
  pointer-events: auto;
}
.fg-instructions {
  margin: 0;
  font-family: var(--fg-mono);
  font-size: 10px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
  text-align: right;
}
.fg-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  scrollbar-width: none;
}
.fg-filters::-webkit-scrollbar { display: none; }
.fg-root .fg-filter {
  flex: 0 0 auto;
  padding: 8px 10px;
  border: 1px solid rgba(255,255,255,.28);
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(8px);
  font-family: var(--fg-mono);
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255,255,255,.75);
  cursor: pointer;
  transition: background-color 220ms ease, border-color 220ms ease, color 220ms ease;
}
.fg-filter span { margin-left: 7px; opacity: .5; }
.fg-root .fg-filter:hover { border-color: var(--fg-accent); color: #fff; }
.fg-root .fg-filter[aria-pressed="true"] { background: var(--fg-accent); border-color: var(--fg-accent); color: #000; }
.fg-filter:focus-visible { outline: 2px solid var(--fg-accent); outline-offset: 2px; }
.fg-root.has-cursor .fg-canvas,
.fg-root.has-cursor .fg-tile { cursor: none; }
.fg-cursor {
  position: fixed;
  z-index: 40;
  top: 0;
  left: 0;
  pointer-events: none;
}
.fg-cursor-dot {
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  margin: -39px 0 0 -39px;
  border-radius: 50%;
  background: var(--fg-accent);
  color: #000;
  font-family: var(--fg-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: .14em;
  text-transform: uppercase;
  transform: scale(0);
  transition: transform 350ms cubic-bezier(.22,1,.36,1), background-color 250ms ease;
}
.fg-cursor[data-mode="drag"] .fg-cursor-dot { transform: scale(1); }
.fg-cursor[data-mode="view"] .fg-cursor-dot { transform: scale(1.22); background: #fff; }
.fg-canvas.is-dragging ~ .fg-cursor .fg-cursor-dot { transform: scale(.7); }
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
  inset: 104px 128px 42px 28px;
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
  display: flex;
  gap: 14px;
  margin: 0;
  width: 100%;
  font-family: var(--fg-mono);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(255,255,255,.7);
}
.fg-detail-code-id { color: var(--fg-accent); }
.fg-detail-count { margin-left: auto; }
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
  top: 92px;
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
.fg-back:hover { transform: rotate(-12deg) scale(1.06); background: var(--fg-accent); border-color: var(--fg-accent); color: #000; }
.fg-back span { font-size: 24px; line-height: 1; transform: translateY(-1px); }
.fg-thumbnails {
  position: absolute;
  z-index: 55;
  top: 160px;
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
.fg-thumbnail.is-active { box-shadow: 0 0 0 1px var(--fg-accent); }
.fg-thumbnail img { width: 100%; height: 100%; display: block; object-fit: cover; }
.fg-thumbnail span {
  position: absolute;
  right: 4px;
  bottom: 3px;
  padding: 2px 3px;
  color: #fff;
  background: rgba(0,0,0,.58);
  font-family: var(--fg-mono);
  font-size: 7px;
  line-height: 1;
}
@media (max-width: 767px) {
  .fg-root { min-height: 430px; }
  .fg-hud { flex-direction: column; align-items: stretch; gap: 14px; padding: 110px 0 18px; }
  .fg-hud-title { padding: 0 18px; }
  .fg-hud-title strong { font-size: clamp(52px, 19vw, 96px); }
  .fg-hud-side { max-width: none; justify-items: stretch; }
  .fg-instructions { padding: 0 18px; font-size: 9px; text-align: left; }
  .fg-filters { flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; padding: 0 18px; }
  .fg-detail-stage { inset: 136px 15px 112px; }
  .fg-detail-artwork { gap: 9px; }
  .fg-detail-code { font-size: 9px; }
  .fg-detail-description { display: block; font-size: 10px; line-height: 1.45; min-height: 29px; }
  .fg-back { top: 76px; right: 16px; width: 48px; height: 48px; background: color-mix(in srgb, var(--fg-bg) 82%, transparent); backdrop-filter: blur(12px); }
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
