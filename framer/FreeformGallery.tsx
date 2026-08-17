import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

interface ResponsiveImage {
  src?: string
  srcSet?: string
  alt?: string
}

interface GalleryEntry {
  image?: ResponsiveImage
  code?: string
  title?: string
  description?: string
  category?: string
  year?: string
}

interface FreeformGalleryProps {
  images?: GalleryEntry[]
  backgroundColor?: string
  baseImageSize?: number
  spacing?: number
  scatterAmount?: number
  rotationAmount?: number
  frameColor?: string
  frameSize?: number
  typography?: CSSProperties
  thumbnailSize?: number
  hoverStrength?: number
  momentumStrength?: number
  style?: CSSProperties
}

interface Selection {
  index: number
  tileKey: string
}

interface Bounds {
  minColumn: number
  maxColumn: number
  minRow: number
  maxRow: number
}

const DEFAULT_IMAGE: ResponsiveImage = {
  src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
  alt: "Blue gradient artwork",
}

const DEFAULT_ENTRY: GalleryEntry = {
  image: DEFAULT_IMAGE,
  code: "XX01",
  title: "Untitled",
  description: "Add a short description for this image.",
  category: "Selected Work",
  year: "2026",
}

const INITIAL_BOUNDS: Bounds = {
  minColumn: -2,
  maxColumn: 5,
  minRow: -2,
  maxRow: 4,
}

const ratioCache = new Map<string, number>()

function modulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor
}

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}

function variation(row: number, column: number) {
  const seed = modulo(row, 3) * 4 + modulo(column, 4) + 1
  return {
    x: seededUnit(seed * 1.17) - 0.5,
    y: seededUnit(seed * 2.31) - 0.5,
    rotation: seededUnit(seed * 4.73) - 0.5,
    scale: 0.82 + seededUnit(seed * 6.11) * 0.34,
    delay: seededUnit(seed * 8.93) * 0.32,
  }
}

function entryIndex(row: number, column: number, count: number) {
  return (modulo(row, 3) * 4 + modulo(column, 4)) % count
}

function entrySource(entry: GalleryEntry) {
  return entry.image?.src || DEFAULT_IMAGE.src || ""
}

function entryCode(entry: GalleryEntry, index: number) {
  return entry.code?.trim() || `XX${String(index + 1).padStart(2, "0")}`
}

function useAspectRatio(src: string) {
  const [ratio, setRatio] = useState(() => ratioCache.get(src) || 4 / 3)

  useEffect(() => {
    if (typeof window === "undefined") return
    const cached = ratioCache.get(src)
    if (cached) {
      const frame = requestAnimationFrame(() => setRatio(cached))
      return () => cancelAnimationFrame(frame)
    }

    let active = true
    const image = new Image()
    image.onload = () => {
      if (!active) return
      const nextRatio = image.naturalWidth / Math.max(image.naturalHeight, 1)
      ratioCache.set(src, nextRatio)
      setRatio(nextRatio)
    }
    image.src = src
    return () => {
      active = false
    }
  }, [src])

  return ratio
}

function CornerFrame({
  children,
  color,
  size,
}: {
  children: ReactNode
  color: string
  size: number
}) {
  return (
    <div className="ffc-frame">
      {children}
      {(["nw", "ne", "se", "sw"] as const).map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          className={`ffc-corner ffc-${corner}`}
          style={{
            width: size,
            height: size,
            borderColor: color,
            borderWidth: Math.max(1, Math.min(size / 5, 4)),
          }}
        />
      ))}
    </div>
  )
}

function GalleryTile({
  entry,
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
  intro,
  deckX,
  deckY,
  suppressClick,
  onSelect,
}: {
  entry: GalleryEntry
  index: number
  tileKey: string
  x: number
  y: number
  width: number
  rotation: number
  delay: number
  frameColor: string
  frameSize: number
  hoverStrength: number
  intro: boolean
  deckX: number
  deckY: number
  suppressClick: () => boolean
  onSelect: (selection: Selection) => void
}) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const src = entrySource(entry)
  const ratio = useAspectRatio(src)

  function moveTilt(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!tiltRef.current || event.pointerType === "touch") return
    const rect = event.currentTarget.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width - 0.5
    const ny = (event.clientY - rect.top) / rect.height - 0.5
    tiltRef.current.style.transform = `perspective(900px) rotateX(${-ny * hoverStrength}deg) rotateY(${nx * hoverStrength}deg)`
  }

  function clearTilt() {
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg)"
    }
  }

  return (
    <div className="ffc-tile-position" style={{ left: x, top: y, width }}>
      <motion.button
        type="button"
        className="ffc-tile"
        aria-label={`Open ${entry.title || "image"}`}
        initial={
          intro
            ? { opacity: 0, scale: 0.34, x: deckX, y: deckY, rotate: -rotation * 2 }
            : { opacity: 0, scale: 0.82 }
        }
        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: rotation }}
        transition={{
          type: "spring",
          stiffness: intro ? 62 : 125,
          damping: intro ? 18 : 22,
          delay: intro ? delay : 0.02,
        }}
        onClick={() => {
          if (!suppressClick()) onSelect({ index, tileKey })
        }}
        onPointerMove={moveTilt}
        onPointerLeave={clearTilt}
      >
        <motion.div layoutId={`ffc-image-${tileKey}`}>
          <div ref={tiltRef} className="ffc-tilt" style={{ aspectRatio: ratio }}>
            <CornerFrame color={frameColor} size={frameSize}>
              <img
                src={src}
                srcSet={entry.image?.srcSet}
                alt={entry.image?.alt || entry.title || "Gallery image"}
                draggable={false}
              />
            </CornerFrame>
          </div>
        </motion.div>
        <span className="ffc-caption">
          <span>{entry.title || "Untitled"}</span>
          <span>{entryCode(entry, index)}</span>
        </span>
      </motion.button>
    </div>
  )
}

function InfiniteCanvas({
  images,
  baseImageSize,
  spacing,
  scatterAmount,
  rotationAmount,
  frameColor,
  frameSize,
  hoverStrength,
  momentumStrength,
  isStatic,
  shouldBlockSelection,
  onSelect,
}: {
  images: GalleryEntry[]
  baseImageSize: number
  spacing: number
  scatterAmount: number
  rotationAmount: number
  frameColor: string
  frameSize: number
  hoverStrength: number
  momentumStrength: number
  isStatic: boolean
  shouldBlockSelection: () => boolean
  onSelect: (selection: Selection) => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const camera = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const pointer = useRef({ id: -1, x: 0, y: 0, time: 0, moved: 0 })
  const pressed = useRef(false)
  const suppressClick = useRef(false)
  const latestBounds = useRef(INITIAL_BOUNDS)
  const [bounds, setBounds] = useState(INITIAL_BOUNDS)
  const [viewport, setViewport] = useState({ width: 1200, height: 760 })
  const [intro, setIntro] = useState(!isStatic)
  const adaptiveBase = Math.max(
    132,
    Math.min(baseImageSize, viewport.width < 700 ? viewport.width * 0.55 : viewport.width * 0.32)
  )
  const cellWidth = adaptiveBase + spacing
  const cellHeight = adaptiveBase * 0.8 + spacing

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return
    const root = rootRef.current
    const measure = () => {
      const rect = root.getBoundingClientRect()
      setViewport({ width: rect.width, height: rect.height })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isStatic || typeof window === "undefined") return
    const timeout = window.setTimeout(() => setIntro(false), 1250)
    return () => window.clearTimeout(timeout)
  }, [isStatic])

  useEffect(() => {
    if (isStatic || typeof window === "undefined") return
    let frame = 0
    let previousTime = performance.now()
    const tick = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 16.667, 2.5)
      previousTime = time
      const value = camera.current
      if (!pressed.current) {
        value.x += value.vx * elapsed
        value.y += value.vy * elapsed
        const friction = Math.pow(0.78 + momentumStrength * 0.002, elapsed)
        value.vx *= friction
        value.vy *= friction
      }
      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(${value.x}px, ${value.y}px, 0)`
      }
      const bufferX = Math.max(adaptiveBase, viewport.width * 0.28)
      const bufferY = Math.max(adaptiveBase, viewport.height * 0.3)
      const next = {
        minColumn: Math.floor((-value.x - bufferX) / cellWidth),
        maxColumn: Math.ceil((-value.x + viewport.width + bufferX) / cellWidth),
        minRow: Math.floor((-value.y - bufferY) / cellHeight),
        maxRow: Math.ceil((-value.y + viewport.height + bufferY) / cellHeight),
      }
      const old = latestBounds.current
      if (
        old.minColumn !== next.minColumn ||
        old.maxColumn !== next.maxColumn ||
        old.minRow !== next.minRow ||
        old.maxRow !== next.maxRow
      ) {
        latestBounds.current = next
        startTransition(() => setBounds(next))
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [adaptiveBase, cellHeight, cellWidth, isStatic, momentumStrength, viewport])

  useEffect(() => {
    if (isStatic || !rootRef.current) return
    const node = rootRef.current
    const wheel = (event: WheelEvent) => {
      event.preventDefault()
      camera.current.x -= event.deltaX
      camera.current.y -= event.deltaY
      camera.current.vx = -event.deltaX * (0.055 + momentumStrength * 0.0017)
      camera.current.vy = -event.deltaY * (0.055 + momentumStrength * 0.0017)
    }
    node.addEventListener("wheel", wheel, { passive: false })
    return () => node.removeEventListener("wheel", wheel)
  }, [isStatic, momentumStrength])

  const cells = useMemo(() => {
    const result: Array<{ row: number; column: number }> = []
    for (let row = bounds.minRow; row <= bounds.maxRow; row += 1) {
      for (let column = bounds.minColumn; column <= bounds.maxColumn; column += 1) {
        result.push({ row, column })
      }
    }
    return result
  }, [bounds])

  return (
    <div
      ref={rootRef}
      className="ffc-canvas"
      onPointerDown={
        isStatic
          ? undefined
          : (event) => {
              if (event.button !== 0) return
              pressed.current = true
              suppressClick.current = false
              pointer.current = {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                time: performance.now(),
                moved: 0,
              }
              camera.current.vx = 0
              camera.current.vy = 0
            }
      }
      onPointerMove={
        isStatic
          ? undefined
          : (event) => {
              if (!pressed.current || pointer.current.id !== event.pointerId) return
              const now = performance.now()
              const dx = event.clientX - pointer.current.x
              const dy = event.clientY - pointer.current.y
              const elapsed = Math.max(now - pointer.current.time, 8)
              pointer.current.moved += Math.abs(dx) + Math.abs(dy)
              suppressClick.current = pointer.current.moved > 7
              if (
                suppressClick.current &&
                !event.currentTarget.hasPointerCapture(event.pointerId)
              ) {
                event.currentTarget.setPointerCapture(event.pointerId)
                event.currentTarget.classList.add("is-dragging")
              }
              camera.current.x += dx
              camera.current.y += dy
              camera.current.vx = dx * (16.667 / elapsed) * (0.5 + momentumStrength * 0.012)
              camera.current.vy = dy * (16.667 / elapsed) * (0.5 + momentumStrength * 0.012)
              pointer.current.x = event.clientX
              pointer.current.y = event.clientY
              pointer.current.time = now
            }
      }
      onPointerUp={
        isStatic
          ? undefined
          : (event) => {
              pressed.current = false
              event.currentTarget.classList.remove("is-dragging")
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId)
              }
              window.setTimeout(() => {
                suppressClick.current = false
              }, 0)
            }
      }
    >
      <div ref={worldRef} className="ffc-world">
        {cells.map(({ row, column }) => {
          const itemVariation = variation(row, column)
          const index = entryIndex(row, column, images.length)
          const tileKey = `${row}:${column}`
          const width = adaptiveBase * itemVariation.scale
          const x = column * cellWidth + cellWidth / 2 + itemVariation.x * scatterAmount
          const y = row * cellHeight + cellHeight / 2 + itemVariation.y * scatterAmount
          return (
            <GalleryTile
              key={tileKey}
              entry={images[index]}
              index={index}
              tileKey={tileKey}
              x={x}
              y={y}
              width={width}
              rotation={itemVariation.rotation * rotationAmount * 2}
              delay={itemVariation.delay}
              frameColor={frameColor}
              frameSize={frameSize}
              hoverStrength={hoverStrength}
              intro={intro}
              deckX={viewport.width / 2 - x}
              deckY={viewport.height / 2 - y}
              suppressClick={() =>
                suppressClick.current || shouldBlockSelection()
              }
              onSelect={onSelect}
            />
          )
        })}
      </div>
    </div>
  )
}

function fitSize(stage: { width: number; height: number }, ratio: number) {
  const width = stage.width || 720
  const height = stage.height || 520
  const compact = width < 720
  const maxWidth = Math.max(220, width - (compact ? 30 : 96))
  const maxHeight = Math.max(170, height - (compact ? 210 : 176))
  return maxWidth / maxHeight > ratio
    ? { width: maxHeight * ratio, height: maxHeight }
    : { width: maxWidth, height: maxWidth / ratio }
}

function DetailView({
  images,
  selection,
  frameColor,
  frameSize,
  thumbnailSize,
  typography,
  onChange,
  onClose,
}: {
  images: GalleryEntry[]
  selection: Selection
  frameColor: string
  frameSize: number
  thumbnailSize: number
  typography?: CSSProperties
  onChange: (selection: Selection) => void
  onClose: () => void
}) {
  const entry = images[selection.index]
  const src = entrySource(entry)
  const ratio = useAspectRatio(src)
  const [stage, setStage] = useState({ width: 0, height: 0 })
  const stageRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([])
  const swipeStart = useRef<number | null>(null)
  const wheelAmount = useRef(0)
  const wheelTargetIndex = useRef(selection.index)
  const target = useMemo(() => fitSize(stage, ratio), [ratio, stage])

  function navigate(direction: number) {
    const index = modulo(selection.index + direction, images.length)
    startTransition(() => onChange({ index, tileKey: `detail-${index}` }))
  }

  useEffect(() => {
    if (!stageRef.current) return
    const node = stageRef.current
    const measure = () => {
      const rect = node.getBoundingClientRect()
      setStage({ width: rect.width, height: rect.height })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    wheelTargetIndex.current = selection.index
  }, [selection.index])

  useEffect(() => {
    thumbRefs.current[selection.index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    })
  }, [selection.index])

  useEffect(() => {
    if (typeof window === "undefined") return
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowDown" || event.key === "ArrowRight") navigate(1)
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") navigate(-1)
    }
    window.addEventListener("keydown", keydown)
    return () => window.removeEventListener("keydown", keydown)
  })

  return (
    <motion.div
      className="ffc-detail"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      onWheel={(event) => {
        event.preventDefault()
        const normalizedDelta =
          event.deltaMode === 1
            ? event.deltaY * 40
            : event.deltaMode === 2
              ? event.deltaY * window.innerHeight
              : event.deltaY
        wheelAmount.current += normalizedDelta
        const stepSize = 90
        const rawSteps = Math.trunc(wheelAmount.current / stepSize)
        if (rawSteps === 0) return
        const steps = rawSteps > 0 ? 1 : -1

        wheelAmount.current -= steps * stepSize
        const index = modulo(wheelTargetIndex.current + steps, images.length)
        wheelTargetIndex.current = index
        startTransition(() => onChange({ index, tileKey: `detail-${index}` }))
      }}
      onPointerDown={(event) => {
        swipeStart.current = event.clientY
      }}
      onPointerUp={(event) => {
        if (swipeStart.current === null) return
        const distance = swipeStart.current - event.clientY
        swipeStart.current = null
        if (Math.abs(distance) > 48) navigate(distance > 0 ? 1 : -1)
      }}
    >
      <div ref={stageRef} className="ffc-detail-stage">
        <motion.figure
          className="ffc-artwork"
          animate={{ width: target.width }}
          transition={{ type: "spring", stiffness: 108, damping: 23, mass: 0.82 }}
        >
          <p className="ffc-code">{entryCode(entry, selection.index)}</p>
          <motion.div
            className="ffc-image-frame"
            initial={{ scale: 0.86, rotateX: -8, opacity: 0 }}
            animate={{ height: target.height, scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.92, rotateX: 6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 108, damping: 23, mass: 0.82 }}
          >
            <CornerFrame color={frameColor} size={frameSize * 1.2}>
              <AnimatePresence initial={false}>
                <motion.img
                  key={src}
                  src={src}
                  srcSet={entry.image?.srcSet}
                  alt={entry.image?.alt || entry.title || "Gallery image"}
                  className="ffc-detail-image"
                  initial={{ opacity: 0.18 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                />
              </AnimatePresence>
            </CornerFrame>
          </motion.div>
          <motion.figcaption key={selection.index} className="ffc-description" style={typography}>
            {entry.description || ""}
          </motion.figcaption>
        </motion.figure>
      </div>

      <button
        type="button"
        className="ffc-close"
        aria-label="Close gallery detail"
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onClose()
        }}
      >
        ←
      </button>

      <nav
        className="ffc-thumbnails"
        aria-label="Gallery images"
        onWheel={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
      >
        <div className="ffc-thumbnail-track">
          {images.map((image, index) => (
            <button
              key={`${image.title}-${index}`}
              ref={(node) => {
                thumbRefs.current[index] = node
              }}
              type="button"
              className={`ffc-thumbnail${selection.index === index ? " is-active" : ""}`}
              style={{
                width: thumbnailSize,
                height: Math.max(42, thumbnailSize * 0.72),
                borderColor: selection.index === index ? frameColor : "transparent",
              }}
              onClick={() =>
                startTransition(() => onChange({ index, tileKey: `detail-${index}` }))
              }
            >
              <img src={entrySource(image)} alt={image.image?.alt || image.title || "Thumbnail"} />
              <span>{entryCode(image, index)}</span>
            </button>
          ))}
        </div>
      </nav>
    </motion.div>
  )
}

const styles = `
.ffc-root,.ffc-root *{box-sizing:border-box}.ffc-root{position:relative;width:100%;height:100%;min-height:430px;overflow:hidden;isolation:isolate;background:var(--bg);color:var(--ink);font-family:Arial,sans-serif}.ffc-root button{font:inherit;color:inherit}.ffc-canvas{position:absolute;inset:0;overflow:hidden;cursor:grab;touch-action:none;user-select:none;overscroll-behavior:none}.ffc-canvas.is-dragging{cursor:grabbing}.ffc-world{position:absolute;inset:0;will-change:transform}.ffc-tile-position{position:absolute;transform:translate3d(-50%,-50%,0)}.ffc-tile{appearance:none;display:block;width:100%;padding:0;border:0;background:none;text-align:left;cursor:pointer}.ffc-tilt{width:100%;transition:transform 160ms ease-out;transform-style:preserve-3d}.ffc-frame{position:relative;width:100%;height:100%;min-height:1px;background:rgba(255,255,255,.08)}.ffc-frame>img{display:block;width:100%;height:100%;object-fit:cover}.ffc-corner{position:absolute;z-index:3;border-style:solid;pointer-events:none}.ffc-nw{top:-7px;left:-7px;border-right:0;border-bottom:0}.ffc-ne{top:-7px;right:-7px;border-left:0;border-bottom:0}.ffc-se{right:-7px;bottom:-7px;border-left:0;border-top:0}.ffc-sw{left:-7px;bottom:-7px;border-right:0;border-top:0}.ffc-caption{display:flex;justify-content:space-between;gap:12px;padding-top:11px;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.66}.ffc-heading{position:absolute;z-index:20;top:24px;left:28px;margin:0;font-size:13px;letter-spacing:-.02em;pointer-events:none}.ffc-detail{position:absolute;z-index:50;inset:0;overflow:hidden;background:var(--bg);touch-action:none}.ffc-detail-stage{position:absolute;inset:58px 118px 42px 28px;display:grid;place-items:center}.ffc-artwork{display:grid;grid-template-rows:auto auto minmax(34px,auto);gap:12px;margin:0;max-width:100%}.ffc-code{margin:0;font-size:11px;font-weight:700;letter-spacing:.16em;line-height:1}.ffc-image-frame{position:relative;width:100%;min-height:1px}.ffc-image-frame .ffc-frame{overflow:hidden}.ffc-detail-image{position:absolute;inset:0;width:100%;height:100%;object-fit:contain!important}.ffc-description{margin:0;width:100%;max-width:760px;font-size:12px;font-weight:500;line-height:1.5;opacity:.64}.ffc-close{position:absolute;z-index:60;top:24px;right:28px;display:grid;place-items:center;width:54px;height:54px;padding:0;border:1px solid currentColor;border-radius:50%;background:transparent;font-size:24px;cursor:pointer;transition:transform .2s ease,background .2s ease,color .2s ease}.ffc-close:hover{transform:rotate(-10deg) scale(1.05);background:var(--ink);color:var(--bg)}.ffc-thumbnails{position:absolute;z-index:55;top:96px;right:24px;bottom:26px;width:max-content;min-height:0}.ffc-thumbnail-track{display:flex;flex-direction:column;gap:9px;width:max-content;height:100%;overflow-y:auto;padding:7px;overscroll-behavior:contain;scrollbar-width:none}.ffc-thumbnail-track::-webkit-scrollbar{display:none}.ffc-thumbnail{position:relative;flex:0 0 auto;overflow:hidden;padding:0;border:2px solid transparent;background:rgba(255,255,255,.08);opacity:.42;cursor:pointer;transition:opacity .18s ease,transform .18s ease}.ffc-thumbnail:hover,.ffc-thumbnail.is-active{opacity:1;transform:scale(1.04)}.ffc-thumbnail img{display:block;width:100%;height:100%;object-fit:cover}.ffc-thumbnail span{position:absolute;right:3px;bottom:3px;padding:2px 3px;background:rgba(0,0,0,.62);color:#fff;font-size:7px}@media(max-width:767px){.ffc-heading{top:18px;left:18px}.ffc-detail-stage{inset:66px 15px 112px}.ffc-artwork{gap:9px}.ffc-code{font-size:9px}.ffc-description{font-size:10px;line-height:1.45}.ffc-close{top:16px;right:16px;width:48px;height:48px}.ffc-thumbnails{top:auto;left:0;right:0;bottom:12px;width:100%;height:auto}.ffc-thumbnail-track{flex-direction:row;width:100%;overflow-x:auto;overflow-y:hidden;padding:7px 18px}}
`

/**
 * Freeform Gallery
 *
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 760
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function FreeformGallery(props: FreeformGalleryProps) {
  const {
    images = [DEFAULT_ENTRY],
    backgroundColor = "#000000",
    baseImageSize = 300,
    spacing = 250,
    scatterAmount = 84,
    rotationAmount = 7,
    frameColor = "#FFFFFF",
    frameSize = 24,
    typography,
    thumbnailSize = 72,
    hoverStrength = 13,
    momentumStrength = 18,
    style,
  } = props
  const safeImages = useMemo(
    () => (images.length ? images : [DEFAULT_ENTRY]).slice(0, 12).map((entry) => ({ ...DEFAULT_ENTRY, ...entry, image: entry.image?.src ? entry.image : DEFAULT_IMAGE })),
    [images]
  )
  const [selection, setSelection] = useState<Selection | null>(null)
  const selectionLockedUntil = useRef(0)
  const isStatic = useIsStaticRenderer()

  function closeDetail() {
    selectionLockedUntil.current = Date.now() + 360
    startTransition(() => setSelection(null))
  }

  return (
    <LayoutGroup id="framer-freeform-gallery">
      <section
        className="ffc-root"
        aria-label="Freeform image gallery"
        style={{
          ...style,
          "--bg": backgroundColor,
          "--ink": frameColor,
          ...typography,
        } as CSSProperties}
      >
        <style>{styles}</style>
        <InfiniteCanvas
          images={safeImages}
          baseImageSize={baseImageSize}
          spacing={spacing}
          scatterAmount={scatterAmount}
          rotationAmount={rotationAmount}
          frameColor={frameColor}
          frameSize={frameSize}
          hoverStrength={hoverStrength}
          momentumStrength={momentumStrength}
          isStatic={isStatic}
          shouldBlockSelection={() => Date.now() < selectionLockedUntil.current}
          onSelect={(next) => startTransition(() => setSelection(next))}
        />
        <h1 className="ffc-heading">GALLERY</h1>
        <AnimatePresence>
          {!isStatic && selection ? (
            <DetailView
              images={safeImages}
              selection={selection}
              frameColor={frameColor}
              frameSize={frameSize}
              thumbnailSize={thumbnailSize}
              typography={typography}
              onChange={setSelection}
              onClose={closeDetail}
            />
          ) : null}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  )
}

addPropertyControls(FreeformGallery, {
  images: {
    type: ControlType.Array,
    title: "Images",
    maxCount: 12,
    defaultValue: [
      {
        code: "XX01",
        title: "Untitled",
        description: "Add a short description for this image.",
        category: "Selected Work",
        year: "2026",
      },
    ],
    control: {
      type: ControlType.Object,
      controls: {
        image: { type: ControlType.ResponsiveImage, title: "Image" },
        code: { type: ControlType.String, title: "Code", defaultValue: "XX01" },
        title: { type: ControlType.String, title: "Title", defaultValue: "Untitled" },
        description: {
          type: ControlType.String,
          title: "Description",
          displayTextArea: true,
          defaultValue: "Add a short description for this image.",
        },
        category: { type: ControlType.String, title: "Category", defaultValue: "Selected Work" },
        year: { type: ControlType.String, title: "Year", defaultValue: "2026" },
      },
    },
  },
  backgroundColor: { type: ControlType.Color, title: "Background", defaultValue: "#000000" },
  baseImageSize: { type: ControlType.Number, title: "Image Size", defaultValue: 300, min: 140, max: 560, unit: "px" },
  spacing: { type: ControlType.Number, title: "Spacing", defaultValue: 250, min: 20, max: 420, unit: "px" },
  scatterAmount: { type: ControlType.Number, title: "Scatter", defaultValue: 84, min: 0, max: 220, unit: "px" },
  rotationAmount: { type: ControlType.Number, title: "Rotation", defaultValue: 7, min: 0, max: 24, step: 0.5, unit: "deg" },
  frameColor: { type: ControlType.Color, title: "Frame", defaultValue: "#FFFFFF" },
  frameSize: { type: ControlType.Number, title: "Frame Size", defaultValue: 24, min: 8, max: 54, unit: "px" },
  typography: {
    type: ControlType.Font,
    title: "Typography",
    controls: "extended",
    defaultFontType: "sans-serif",
    defaultValue: { variant: "Bold", fontSize: 12, letterSpacing: "-0.01em", lineHeight: "1.5em" },
  },
  thumbnailSize: { type: ControlType.Number, title: "Thumbnails", defaultValue: 72, min: 42, max: 130, unit: "px" },
  hoverStrength: { type: ControlType.Number, title: "Hover 3D", defaultValue: 13, min: 0, max: 30 },
  momentumStrength: { type: ControlType.Number, title: "Momentum", defaultValue: 18, min: 0, max: 40 },
})
