/* eslint-disable @next/next/no-img-element -- Framer Code Components cannot use next/image. */
import type { CSSProperties } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { motion } from "framer-motion"

interface ResponsiveImage {
  src?: string
  srcSet?: string
  alt?: string
}

interface SocialLink {
  label?: string
  url?: string
}

interface AboutMeProps {
  portrait?: ResponsiveImage
  introWord?: string
  name?: string
  descriptor?: string
  signature?: string
  role?: string
  quote?: string
  statement?: string
  education?: string
  biography?: string
  capabilities?: string[]
  socials?: SocialLink[]
  workLabel?: string
  workLink?: string
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  headingFont?: CSSProperties
  bodyFont?: CSSProperties
  style?: CSSProperties
}

const DEFAULT_IMAGE: ResponsiveImage = {
  src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
  alt: "Portrait",
}

const DEFAULT_CAPABILITIES = [
  "Full-stack products",
  "System architecture",
  "Cloud infrastructure",
  "Applied machine learning",
  "API & data systems",
  "Interactive experiences",
]

const DEFAULT_SOCIALS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/bintangqurne" },
  { label: "Instagram", url: "https://instagram.com/bintangqurne" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ayatullah-bintang-qurne-19a0992ba/",
  },
]

/**
 * Three-column editorial About section inspired by artist profile layouts.
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function AboutMeSection({
  portrait = DEFAULT_IMAGE,
  introWord = "I'M",
  name = "BINTANG\nQURNE",
  descriptor = "ENGINEERING ACROSS PRODUCT, DATA, AND CLOUD SYSTEMS.",
  signature = "Bintang Qurne",
  role = "SOFTWARE ENGINEER · JAKARTA, ID",
  quote =
    "GOOD SYSTEMS FEEL SIMPLE BECAUSE THE COMPLEXITY HAS BEEN DESIGNED, NOT IGNORED.",
  statement = "I BUILD ACROSS PRODUCT, SYSTEMS, AND INTELLIGENCE.",
  education =
    "Computer Science student at BINUS University and Hacktiv8 full-stack graduate. Most projects begin with a real constraint; I turn it into a clear system, then iterate until the whole experience holds together.",
  biography =
    "I'M A JAKARTA-BASED SOFTWARE ENGINEER. MY PRACTICE MOVES BETWEEN FULL-STACK PRODUCT DEVELOPMENT, CLOUD ARCHITECTURE, AND APPLIED MACHINE LEARNING. SOME SYSTEMS SHIP QUICKLY; THE BEST ONES KEEP EVOLVING.",
  capabilities = DEFAULT_CAPABILITIES,
  socials = DEFAULT_SOCIALS,
  workLabel = "VIEW THE WORK",
  workLink = "/work",
  backgroundColor = "#050505",
  textColor = "#DEDEDE",
  accentColor = "#FF2A2A",
  headingFont,
  bodyFont,
  style,
}: AboutMeProps) {
  const isStatic = useIsStaticRenderer()
  const initial = isStatic ? false : undefined
  const safeCapabilities =
    capabilities.length > 0 ? capabilities.slice(0, 10) : DEFAULT_CAPABILITIES
  const safeSocials = socials.length > 0 ? socials.slice(0, 6) : DEFAULT_SOCIALS

  return (
    <section
      className="fa-root"
      style={
        {
          ...style,
          "--fa-bg": backgroundColor,
          "--fa-text": textColor,
          "--fa-accent": accentColor,
          ...bodyFont,
        } as CSSProperties
      }
    >
      <div className="fa-grid" aria-hidden="true" />

      <div className="fa-layout">
        <motion.div
          className="fa-left"
          initial={initial ?? { opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="fa-intro-mask">
              <motion.h2
                style={headingFont}
                initial={initial ?? { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {introWord}
              </motion.h2>
            </div>
            <h3 className="fa-name" style={headingFont}>{name}</h3>
            <div className="fa-rule-copy">{descriptor}</div>
            <p className="fa-signature">{signature}</p>
            <p className="fa-kicker">{role}</p>
          </div>

          <blockquote>
            <p>“{quote}”</p>
            <footer>— A working principle</footer>
          </blockquote>
        </motion.div>

        <motion.div
          className="fa-center"
          initial={initial ?? { opacity: 0, y: 52 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="fa-portrait">
            <img
              src={portrait.src || DEFAULT_IMAGE.src}
              srcSet={portrait.srcSet}
              alt={portrait.alt || "Portrait"}
            />
            <span className="fa-shade" />
            <span className="fa-scanlines" />
            <span className="fa-image-accent" />
          </div>
          <h3 className="fa-statement" style={headingFont}>{statement}</h3>
          <p className="fa-education">{education}</p>

          <div className="fa-socials">
            <span className="fa-kicker">Socials</span>
            <div>
              {safeSocials.map((social, index) => (
                <a
                  key={`${social.label}-${index}`}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label || `Link ${index + 1}`}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="fa-right"
          initial={initial ?? { opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="fa-biography" style={headingFont}>{biography}</p>

          <div className="fa-capabilities">
            <span className="fa-kicker">Things I build</span>
            <ul>
              {safeCapabilities.map((capability, index) => (
                <li key={`${capability}-${index}`}>{capability}</li>
              ))}
            </ul>
            <a className="fa-work" href={workLink}>{workLabel}<span aria-hidden="true">→</span></a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .fa-root {
          --fa-bg: #050505;
          --fa-text: #dedede;
          --fa-accent: #ff2a2a;
          position: relative;
          width: 100%;
          min-width: 0;
          min-height: max(760px, 100vh);
          box-sizing: border-box;
          overflow: hidden;
          padding: 112px clamp(18px, 1.7vw, 34px) 34px;
          background: var(--fa-bg);
          color: var(--fa-text);
          font-family: Inter, Arial, sans-serif;
        }
        .fa-root * { box-sizing: border-box; }
        .fa-grid {
          position: absolute;
          inset: 0;
          opacity: .3;
          pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom,transparent,#000 14%,#000 86%,transparent);
        }
        .fa-layout {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1920px;
          min-height: calc(max(760px, 100vh) - 146px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0,31%) minmax(0,36%) minmax(0,33%);
          gap: clamp(20px, 1.7vw, 34px);
        }
        .fa-left, .fa-right { min-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
        .fa-center { min-width: 0; }
        .fa-intro-mask { overflow: hidden; }
        .fa-intro-mask h2 {
          margin: 0;
          color: var(--fa-text);
          font-size: clamp(118px, 14.5vw, 284px);
          font-weight: 950;
          line-height: .72;
          letter-spacing: -.105em;
          text-transform: uppercase;
        }
        .fa-name {
          margin: 28px 0 0;
          color: var(--fa-accent);
          white-space: pre-line;
          font-size: clamp(38px, 3.6vw, 70px);
          font-weight: 950;
          line-height: .82;
          letter-spacing: -.075em;
          text-transform: uppercase;
        }
        .fa-rule-copy {
          margin-top: 20px;
          padding-top: 12px;
          border-top: 3px solid color-mix(in srgb,var(--fa-text),transparent 75%);
          color: color-mix(in srgb,var(--fa-text),transparent 35%);
          font: 500 11px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace;
          letter-spacing: .035em;
          text-transform: uppercase;
        }
        .fa-signature {
          width: max-content;
          margin: 32px 0 0;
          color: var(--fa-text);
          font-family: "Brush Script MT", "Segoe Script", "Snell Roundhand", cursive;
          font-size: clamp(38px,3vw,58px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -.055em;
          opacity: .8;
          transform: rotate(-3deg);
        }
        .fa-kicker {
          color: color-mix(in srgb,var(--fa-text),transparent 52%);
          font: 600 9px/1.25 ui-monospace,SFMono-Regular,Menlo,monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .fa-left > blockquote { max-width: 560px; margin: 58px 0 0; padding-left: 15px; border-left: 4px solid var(--fa-accent); }
        .fa-left > blockquote p { margin: 0; font-size: clamp(21px,1.7vw,34px); font-weight: 750; line-height: 1.02; letter-spacing: -.045em; opacity: .72; }
        .fa-left > blockquote footer { margin-top: 15px; opacity: .42; font: 500 9px/1.25 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: .08em; text-transform: uppercase; }
        .fa-portrait { position: relative; height: min(65vh,740px); min-height: 520px; overflow: hidden; background: #0a0a0a; }
        .fa-portrait img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: 50% 34%; filter: grayscale(1) contrast(1.08); transition: transform .9s cubic-bezier(.22,1,.36,1),filter .7s cubic-bezier(.22,1,.36,1); }
        .fa-portrait:hover img { transform: scale(1.018); filter: grayscale(0) contrast(1.04); }
        .fa-shade,.fa-scanlines { position: absolute; inset: 0; pointer-events: none; }
        .fa-shade { background: linear-gradient(180deg,transparent 55%,rgba(0,0,0,.52)); }
        .fa-scanlines { opacity: .25; mix-blend-mode: overlay; background-image: repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(255,255,255,.16) 3px,rgba(255,255,255,.16) 4px); }
        .fa-image-accent { position: absolute; bottom: 0; left: 0; width: 34%; height: 4px; background: var(--fa-accent); }
        .fa-statement {
          margin: 16px 0 0;
          color: var(--fa-text);
          font-size: clamp(31px,2.75vw,54px);
          font-weight: 950;
          line-height: .86;
          letter-spacing: -.06em;
          text-transform: uppercase;
        }
        .fa-education { max-width: 680px; margin: 20px 0 0; opacity: .6; font-size: clamp(14px,1vw,17px); font-weight: 650; line-height: 1.08; letter-spacing: -.025em; }
        .fa-socials { margin-top: 27px; padding-top: 12px; border-top: 3px solid color-mix(in srgb,var(--fa-text),transparent 75%); }
        .fa-socials > div { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-top: 12px; }
        .fa-socials a { color: var(--fa-text); font: 650 10px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: .07em; text-decoration: none; text-transform: uppercase; transition: color .25s ease; }
        .fa-socials a:hover,.fa-socials a:focus-visible { color: var(--fa-accent); }
        .fa-biography {
          margin: 0;
          color: var(--fa-text);
          font-size: clamp(33px,2.7vw,54px);
          font-weight: 950;
          line-height: .91;
          letter-spacing: -.06em;
          text-transform: uppercase;
        }
        .fa-capabilities { margin-top: 58px; }
        .fa-capabilities ul { margin: 15px 0 0; padding: 0 0 0 15px; border-left: 8px solid color-mix(in srgb,var(--fa-text),transparent 78%); list-style: none; }
        .fa-capabilities li { font-size: clamp(17px,1.2vw,23px); font-weight: 800; line-height: 1.02; letter-spacing: -.035em; text-transform: uppercase; }
        .fa-work { display: inline-flex; align-items: center; gap: 12px; margin-top: 34px; padding: 5px 8px; background: var(--fa-accent); color: var(--fa-bg); font-size: 23px; font-weight: 950; line-height: 1; letter-spacing: -.05em; text-decoration: none; text-transform: uppercase; transition: background .3s ease; }
        .fa-work:hover,.fa-work:focus-visible { background: var(--fa-text); }
        @media (max-width: 980px) {
          .fa-root { min-height: 0; padding: 104px 24px 56px; }
          .fa-layout { min-height: 0; grid-template-columns: 1fr; gap: 64px; }
          .fa-intro-mask h2 { font-size: clamp(112px,28vw,230px); }
          .fa-left > blockquote,.fa-capabilities { margin-top: 48px; }
          .fa-portrait { height: min(110vw,760px); }
        }
        @media (max-width: 560px) {
          .fa-root { padding: 94px 17px 44px; }
          .fa-portrait { min-height: 480px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fa-root * { transition-duration: .01ms !important; }
        }
      `}</style>
    </section>
  )
}

addPropertyControls(AboutMeSection, {
  portrait: { type: ControlType.ResponsiveImage, title: "Portrait" },
  introWord: { type: ControlType.String, title: "Intro", defaultValue: "I'M" },
  name: {
    type: ControlType.String,
    title: "Name",
    defaultValue: "BINTANG\nQURNE",
    displayTextArea: true,
  },
  descriptor: {
    type: ControlType.String,
    title: "Descriptor",
    defaultValue: "ENGINEERING ACROSS PRODUCT, DATA, AND CLOUD SYSTEMS.",
  },
  signature: { type: ControlType.String, title: "Signature", defaultValue: "Bintang Qurne" },
  role: {
    type: ControlType.String,
    title: "Role",
    defaultValue: "SOFTWARE ENGINEER · JAKARTA, ID",
  },
  quote: {
    type: ControlType.String,
    title: "Quote",
    displayTextArea: true,
    defaultValue:
      "GOOD SYSTEMS FEEL SIMPLE BECAUSE THE COMPLEXITY HAS BEEN DESIGNED, NOT IGNORED.",
  },
  statement: {
    type: ControlType.String,
    title: "Statement",
    displayTextArea: true,
    defaultValue: "I BUILD ACROSS PRODUCT, SYSTEMS, AND INTELLIGENCE.",
  },
  education: {
    type: ControlType.String,
    title: "Education",
    displayTextArea: true,
    defaultValue:
      "Computer Science student at BINUS University and Hacktiv8 full-stack graduate. Most projects begin with a real constraint; I turn it into a clear system, then iterate until the whole experience holds together.",
  },
  biography: {
    type: ControlType.String,
    title: "Biography",
    displayTextArea: true,
    defaultValue:
      "I'M A JAKARTA-BASED SOFTWARE ENGINEER. MY PRACTICE MOVES BETWEEN FULL-STACK PRODUCT DEVELOPMENT, CLOUD ARCHITECTURE, AND APPLIED MACHINE LEARNING. SOME SYSTEMS SHIP QUICKLY; THE BEST ONES KEEP EVOLVING.",
  },
  capabilities: {
    type: ControlType.Array,
    title: "Capabilities",
    maxCount: 10,
    control: { type: ControlType.String, defaultValue: "New capability" },
    defaultValue: DEFAULT_CAPABILITIES,
  },
  socials: {
    type: ControlType.Array,
    title: "Socials",
    maxCount: 6,
    control: {
      type: ControlType.Object,
      controls: {
        label: { type: ControlType.String, title: "Label", defaultValue: "GitHub" },
        url: { type: ControlType.Link, title: "URL", defaultValue: "https://github.com" },
      },
    },
    defaultValue: DEFAULT_SOCIALS,
  },
  workLabel: { type: ControlType.String, title: "CTA", defaultValue: "VIEW THE WORK" },
  workLink: { type: ControlType.Link, title: "Work link", defaultValue: "/work" },
  backgroundColor: { type: ControlType.Color, title: "Background", defaultValue: "#050505" },
  textColor: { type: ControlType.Color, title: "Text", defaultValue: "#DEDEDE" },
  accentColor: { type: ControlType.Color, title: "Accent", defaultValue: "#FF2A2A" },
  headingFont: {
    type: ControlType.Font,
    title: "Headings",
    controls: "extended",
    defaultFontType: "sans-serif",
    defaultValue: {
      variant: "Black",
      letterSpacing: "-0.06em",
      lineHeight: "0.9em",
    },
  },
  bodyFont: {
    type: ControlType.Font,
    title: "Body",
    controls: "extended",
    defaultFontType: "sans-serif",
    defaultValue: {
      variant: "Medium",
      fontSize: "15px",
      letterSpacing: "-0.01em",
      lineHeight: "1.2em",
    },
  },
})
