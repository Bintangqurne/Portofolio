/* eslint-disable @next/next/no-img-element -- Framer Code Components cannot use next/image. */
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { motion } from "framer-motion"

interface ResponsiveImage {
  src?: string
  srcSet?: string
  alt?: string
}

interface ProjectItem {
  image?: ResponsiveImage
  code?: string
  title?: string
  category?: string
  description?: string
  role?: string
  tools?: string
  link?: string
}

interface ProjectArchiveProps {
  projects?: ProjectItem[]
  backgroundColor?: string
  textColor?: string
  lineColor?: string
  rowHeight?: number
  gutterWidth?: number
  imageBackground?: string
  hoverColor?: string
  typography?: CSSProperties
  style?: CSSProperties
}

const FALLBACK_IMAGE =
  "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg"

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    image: { src: FALLBACK_IMAGE, alt: "Abstract blue artwork" },
    code: "PRJ—01",
    title: "FIRST\nPROJECT",
    category: "DIGITAL PRODUCT",
    description:
      "A concise explanation of the problem, the idea, and the value created by this project.",
    role: "DESIGN & DEVELOPMENT",
    tools: "REACT · PRODUCT SYSTEM",
    link: "",
  },
]

function sourceOf(project: ProjectItem) {
  return project.image?.src || FALLBACK_IMAGE
}

const mediaFrames = new WeakMap<HTMLElement, number>()
const mediaPositions = new WeakMap<HTMLElement, { x: number; y: number }>()
const tooltipPositions = new WeakMap<HTMLElement, { x: number; y: number }>()

function handleMediaPointerMove(event: ReactPointerEvent<HTMLAnchorElement>) {
  if (typeof window === "undefined") return
  const target = event.currentTarget
  const bounds = target.getBoundingClientRect()
  const localX = event.clientX - bounds.left
  const localY = event.clientY - bounds.top
  const pointerRatio = Math.max(0, Math.min(1, localX / Math.max(bounds.width, 1)))
  const pointerRatioY = Math.max(0, Math.min(1, localY / Math.max(bounds.height, 1)))
  const tooltipWidth = Math.min(300, Math.max(bounds.width - 32, 180))
  mediaPositions.set(target, {
    x: (0.5 - pointerRatio) * 12,
    y: (0.5 - pointerRatioY) * 10,
  })
  tooltipPositions.set(target, {
    x: Math.max(16, Math.min(bounds.width - tooltipWidth - 16, localX + 18)),
    y: Math.max(16, Math.min(bounds.height - 132, localY + 18)),
  })

  if (mediaFrames.has(target)) return
  const frame = requestAnimationFrame(() => {
    const pan = mediaPositions.get(target) || { x: 0, y: 0 }
    target.style.setProperty("--pa-pan-x", `${pan.x}px`)
    target.style.setProperty("--pa-pan-y", `${pan.y}px`)
    const tooltip = tooltipPositions.get(target) || { x: 20, y: 20 }
    target.style.setProperty("--pa-tooltip-x", `${tooltip.x}px`)
    target.style.setProperty("--pa-tooltip-y", `${tooltip.y}px`)
    mediaFrames.delete(target)
  })
  mediaFrames.set(target, frame)
}

function handleMediaPointerLeave(event: ReactPointerEvent<HTMLAnchorElement>) {
  const target = event.currentTarget
  const frame = mediaFrames.get(target)
  if (frame !== undefined) cancelAnimationFrame(frame)
  mediaFrames.delete(target)
  mediaPositions.delete(target)
  tooltipPositions.delete(target)
  target.style.setProperty("--pa-pan-x", "0px")
  target.style.setProperty("--pa-pan-y", "0px")
}

/**
 * Editorial project archive inspired by split-screen portfolio indexes.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function ProjectArchive({
  projects = DEFAULT_PROJECTS,
  backgroundColor = "#F1F1EF",
  textColor = "#050505",
  lineColor = "rgba(5,5,5,0.2)",
  rowHeight = 680,
  gutterWidth = 80,
  imageBackground = "#E7E7E5",
  hoverColor = "#FF2A2A",
  typography,
  style,
}: ProjectArchiveProps) {
  const isStatic = useIsStaticRenderer()
  const safeProjects = projects.length > 0 ? projects.slice(0, 12) : DEFAULT_PROJECTS

  return (
    <section
      className="pa-root"
      style={
        {
          ...style,
          "--pa-bg": backgroundColor,
          "--pa-text": textColor,
          "--pa-line": lineColor,
          "--pa-row-height": `${rowHeight}px`,
          "--pa-gutter": `${gutterWidth}px`,
          "--pa-image-bg": imageBackground,
          "--pa-hover": hoverColor,
          ...typography,
        } as CSSProperties
      }
    >
      <style>{`
        .pa-root {
          width: 100%;
          position: relative;
          background: var(--pa-bg);
          color: var(--pa-text);
          overflow: hidden;
          font-family: Inter, Arial, sans-serif;
        }
        .pa-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 15px 3.2vw;
          border-top: 1px solid var(--pa-text);
          border-bottom: 1px solid var(--pa-line);
          font: 500 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .pa-row {
          display: grid;
          grid-template-columns: minmax(0, 50%) minmax(0, 50%);
          border-top: 1px solid var(--pa-line);
        }
        .pa-project-link {
          min-width: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) var(--pa-gutter);
          background: var(--pa-bg);
          color: var(--pa-text);
          text-decoration: none;
          transition: background-color .5s cubic-bezier(.22,1,.36,1);
        }
        .pa-project-link:hover, .pa-project-link:focus-visible { background: var(--pa-hover); }
        .pa-copy {
          box-sizing: border-box;
          min-width: 0;
          min-height: var(--pa-row-height);
          padding: clamp(28px, 2.6vw, 48px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: var(--pa-text);
        }
        .pa-topline {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: color-mix(in srgb, var(--pa-text), transparent 48%);
          font: 500 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .pa-title {
          max-width: 100%;
          margin: clamp(32px, 4vh, 52px) 0 0;
          white-space: pre-line;
          font-size: clamp(56px, 5.3vw, 108px);
          font-weight: 900;
          letter-spacing: -.085em;
          line-height: .79;
          text-transform: uppercase;
        }
        .pa-description {
          max-width: 580px;
          margin: clamp(24px, 3vh, 38px) 0 0;
          font-size: clamp(14px, 1.05vw, 19px);
          font-weight: 750;
          letter-spacing: -.025em;
          line-height: 1.15;
          text-transform: uppercase;
        }
        .pa-meta-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          margin-top: 38px;
        }
        .pa-meta {
          padding-left: 12px;
          border-left: 8px solid var(--pa-text);
          font-size: 13px;
          font-weight: 650;
          letter-spacing: -.02em;
          line-height: 1.2;
          text-transform: uppercase;
        }
        .pa-category {
          margin: 10px 0 0;
          opacity: .52;
          font: 400 10px/1.25 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .02em;
        }
        .pa-gutter {
          border-right: 1px solid var(--pa-line);
          background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 10px, var(--pa-line) 10px, var(--pa-line) 11px);
        }
        .pa-media {
          position: relative;
          display: block;
          min-height: var(--pa-row-height);
          overflow: hidden;
          background: var(--pa-image-bg);
          color: white;
        }
        .pa-image-wrap { position: absolute; inset: 0; }
        .pa-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: 50% 50%;
          filter: grayscale(1) contrast(1.04);
          transform: translate3d(var(--pa-pan-x, 0px), var(--pa-pan-y, 0px), 0) scale(1.03);
          transition: transform .7s cubic-bezier(.22,1,.36,1), filter .5s ease;
          will-change: transform;
        }
        .pa-overlay {
          position: absolute;
          top: var(--pa-tooltip-y, 20px);
          left: var(--pa-tooltip-x, 20px);
          width: min(300px, calc(100% - 32px));
          box-sizing: border-box;
          padding: 0;
          background: transparent;
          color: white;
          mix-blend-mode: difference;
          pointer-events: none;
          opacity: 0;
          transform: translateY(8px);
          transition: top .12s linear, left .12s linear, opacity .2s ease, transform .2s ease;
        }
        .pa-media:hover .pa-overlay { opacity: 1; transform: translateY(0); }
        .pa-description-window {
          height: 4.5em;
          overflow: hidden;
          font-size: clamp(14px, 1vw, 16px);
          font-weight: 750;
          letter-spacing: -.03em;
          line-height: 1.12;
          text-transform: uppercase;
        }
        .pa-description-roll {
          display: flex;
          flex-direction: column;
          transition: transform .5s cubic-bezier(.25,1,.5,1);
        }
        .pa-media:hover .pa-description-roll { transform: translateY(-50%); }
        .pa-overlay-description {
          height: 4.5em;
          flex: 0 0 4.5em;
          margin: 0;
        }
        @media (max-width: 900px) {
          .pa-head { padding: 14px 22px; }
          .pa-row { display: block; min-height: 0; }
          .pa-project-link { display: block; }
          .pa-copy { min-height: 520px; padding: 30px 24px 34px; }
          .pa-title { font-size: clamp(62px, 17vw, 110px); }
          .pa-description { font-size: clamp(15px, 4.2vw, 20px); }
          .pa-gutter { display: none; }
          .pa-media { min-height: 52svh; }
          .pa-overlay { padding: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pa-image { transition: none; }
        }
      `}</style>

      <header className="pa-head">
        <span>Selected projects</span>
        <span>{String(safeProjects.length).padStart(2, "0")} works · Scroll to explore</span>
      </header>

      {safeProjects.map((project, index) => {
        const link = project.link?.trim() || undefined
        const title = project.title?.trim() || `Project ${index + 1}`
        const code = project.code?.trim() || `PRJ—${String(index + 1).padStart(2, "0")}`

        return (
          <article className="pa-row" key={`${code}-${index}`}>
            <a
              className="pa-project-link"
              href={link}
              target={link ? "_blank" : undefined}
              rel={link ? "noreferrer" : undefined}
              aria-label={link ? `Open ${title}` : undefined}
            >
              <div className="pa-copy">
                <motion.div
                  initial={isStatic ? false : { opacity: 0, y: 28 }}
                  whileInView={isStatic ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="pa-topline">
                    <span>(Project)</span>
                    <span>{code}</span>
                  </div>
                  <h2 className="pa-title">{title}</h2>
                  <p className="pa-description">
                    {project.description || "Add a concise description for this project."}
                  </p>
                </motion.div>

                <div className="pa-meta-row">
                  <div className="pa-meta">
                    <div>{project.role || "DESIGN & DEVELOPMENT"}</div>
                    <div>{project.tools || "PRODUCT SYSTEM"}</div>
                    <p className="pa-category">{project.category || "DIGITAL PRODUCT"}</p>
                  </div>
                </div>
              </div>

              <div className="pa-gutter" aria-hidden="true" />
            </a>

            <a
              className="pa-media"
              href={link}
              target={link ? "_blank" : undefined}
              rel={link ? "noreferrer" : undefined}
              aria-label={link ? `View ${title}` : undefined}
              style={
                {
                  pointerEvents: "auto",
                  "--pa-pan-x": "0px",
                  "--pa-pan-y": "0px",
                  "--pa-tooltip-x": "20px",
                  "--pa-tooltip-y": "20px",
                } as CSSProperties
              }
              onPointerMove={isStatic ? undefined : handleMediaPointerMove}
              onPointerLeave={isStatic ? undefined : handleMediaPointerLeave}
            >
              <motion.div
                className="pa-image-wrap"
                initial={isStatic ? false : { opacity: 0 }}
                whileInView={isStatic ? undefined : { opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  className="pa-image"
                  src={sourceOf(project)}
                  srcSet={project.image?.srcSet}
                  alt={project.image?.alt || `${title} project`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </motion.div>
              <div className="pa-overlay">
                <div className="pa-description-window">
                  <div className="pa-description-roll">
                    <p className="pa-overlay-description">
                      {project.description || "Add a concise description for this project."}
                    </p>
                    <p className="pa-overlay-description" aria-hidden="true">
                      {project.description || "Add a concise description for this project."}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </article>
        )
      })}
    </section>
  )
}

addPropertyControls(ProjectArchive, {
  projects: {
    type: ControlType.Array,
    title: "Projects",
    maxCount: 12,
    defaultValue: DEFAULT_PROJECTS,
    control: {
      type: ControlType.Object,
      controls: {
        image: { type: ControlType.ResponsiveImage, title: "Image" },
        code: { type: ControlType.String, title: "Code", defaultValue: "PRJ—01" },
        title: { type: ControlType.String, title: "Title", defaultValue: "FIRST PROJECT" },
        category: { type: ControlType.String, title: "Category", defaultValue: "DIGITAL PRODUCT" },
        description: {
          type: ControlType.String,
          title: "Description",
          displayTextArea: true,
          defaultValue: "A concise explanation of the value created by this project.",
        },
        role: { type: ControlType.String, title: "Role", defaultValue: "DESIGN & DEVELOPMENT" },
        tools: { type: ControlType.String, title: "Tools", defaultValue: "REACT · PRODUCT SYSTEM" },
        link: { type: ControlType.Link, title: "Link" },
      },
    },
  },
  backgroundColor: { type: ControlType.Color, title: "Background", defaultValue: "#F1F1EF" },
  textColor: { type: ControlType.Color, title: "Text", defaultValue: "#050505" },
  lineColor: { type: ControlType.Color, title: "Lines", defaultValue: "rgba(5,5,5,0.2)" },
  rowHeight: { type: ControlType.Number, title: "Min Height", defaultValue: 680, min: 420, max: 900, unit: "px" },
  gutterWidth: { type: ControlType.Number, title: "Gutter", defaultValue: 80, min: 36, max: 180, unit: "px" },
  imageBackground: { type: ControlType.Color, title: "Image BG", defaultValue: "#E7E7E5" },
  hoverColor: { type: ControlType.Color, title: "Hover", defaultValue: "#FF2A2A" },
  typography: {
    type: ControlType.Font,
    title: "Typography",
    controls: "extended",
    defaultFontType: "sans-serif",
    defaultValue: { variant: "Bold", fontSize: 16, letterSpacing: "-0.02em", lineHeight: "1.2em" },
  },
})
