/* eslint-disable @next/next/no-img-element -- Framer Code Components cannot use next/image. */
import type { CSSProperties, FormEvent } from "react"
import { useState } from "react"
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

interface ContactSectionProps {
  backgroundImage?: ResponsiveImage | string
  heading?: string
  statement?: string
  name?: string
  role?: string
  introduction?: string
  web3FormsKey?: string
  nameLabel?: string
  emailLabel?: string
  messageLabel?: string
  submitLabel?: string
  socials?: SocialLink[]
  accentColor?: string
  backgroundColor?: string
  textColor?: string
  typography?: CSSProperties
  style?: CSSProperties
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=88"

const DEFAULT_SOCIALS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/bintangqurne" },
  { label: "Instagram", url: "https://instagram.com/bintangqurne" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ayatullah-bintang-qurne-19a0992ba/",
  },
]

function imageSource(image?: ResponsiveImage | string) {
  if (typeof image === "string") return image || FALLBACK_IMAGE
  return image?.src || FALLBACK_IMAGE
}

/**
 * Responsive editorial contact section with a functional mailto form.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function ContactSection({
  backgroundImage,
  heading = "CONTACT ME",
  statement =
    "IF SOMETHING HERE SPARKED AN IDEA, RAISED A QUESTION, OR MADE YOU WANT TO BUILD—LET'S TALK.",
  name = "Bintang Qurne",
  role = "Full-Stack Developer · Software Engineer",
  introduction =
    "I'm always open to conversations about ambitious systems, collaboration, process, or ideas that deserve to be built. Let's talk.",
  web3FormsKey = "87b163c5-8726-40fd-b6de-bd668efaad80",
  nameLabel = "Your name",
  emailLabel = "Your email",
  messageLabel = "Message",
  submitLabel = "Send message",
  socials = DEFAULT_SOCIALS,
  accentColor = "#FF2A2A",
  backgroundColor = "#050505",
  textColor = "#FFFFFF",
  typography,
  style,
}: ContactSectionProps) {
  const isStatic = useIsStaticRenderer()
  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (typeof window === "undefined") return

    const form = event.currentTarget
    const data = new FormData(form)
    data.append("access_key", web3FormsKey)
    data.append("subject", `New portfolio inquiry for ${name}`)
    data.append("from_name", `${name} Portfolio`)

    setIsSubmitting(true)
    setStatus("Sending your message…")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      })
      const result = (await response.json()) as {
        success?: boolean
        message?: string
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your message.")
      }

      form.reset()
      setStatus("Message sent. I'll get back to you soon.")
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const safeSocials = socials.length > 0 ? socials.slice(0, 6) : DEFAULT_SOCIALS
  const initial = isStatic ? false : undefined

  return (
    <section
      className="fc-root"
      style={
        {
          ...style,
          ...typography,
          "--fc-accent": accentColor,
          "--fc-bg": backgroundColor,
          "--fc-text": textColor,
        } as CSSProperties
      }
    >
      <div className="fc-backdrop" aria-hidden="true">
        <img src={imageSource(backgroundImage)} alt="" />
        <span className="fc-overlay" />
        <span className="fc-vignette" />
      </div>

      <div className="fc-layout">
        <div className="fc-left">
          <div>
            <div className="fc-heading-mask">
              <motion.h1
                initial={initial ?? { x: "-104%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1.05, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {heading}
              </motion.h1>
            </div>
            <motion.p
              className="fc-statement"
              initial={initial ?? { opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {statement}
            </motion.p>
          </div>

          <motion.div
            className="fc-socials"
            initial={initial ?? { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.68 }}
          >
            <span className="fc-kicker">Socials</span>
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
          </motion.div>
        </div>

        <motion.div
          className="fc-panel"
          initial={initial ?? { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="fc-intro">
            <h2><strong>{name}</strong> / Portfolio</h2>
            <span className="fc-kicker">{role}</span>
            <p>{introduction}</p>
          </div>

          <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
            <input
              className="fc-botcheck"
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
            />
            <label className="fc-field">
              <span>{nameLabel}</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder={nameLabel}
                aria-label={nameLabel}
                required
              />
            </label>
            <label className="fc-field">
              <span>{emailLabel}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder={emailLabel}
                aria-label={emailLabel}
                required
              />
            </label>
            <label className="fc-field fc-message">
              <span>{messageLabel}</span>
              <textarea
                name="message"
                rows={4}
                placeholder={messageLabel}
                aria-label={messageLabel}
                required
              />
            </label>
            <div className="fc-actions">
              <button type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "Sending…" : submitLabel}</span>
                <span aria-hidden="true">→</span>
              </button>
              <small>Your message is delivered securely to my inbox through Web3Forms.</small>
            </div>
            <p className="fc-status" aria-live="polite">{status}</p>
          </form>
        </motion.div>
      </div>

      <style>{`
        .fc-root {
          --fc-accent: #ff2a2a;
          --fc-bg: #050505;
          --fc-text: #fff;
          position: relative;
          width: 100%;
          min-width: 0;
          min-height: max(720px, 100vh);
          overflow: hidden;
          box-sizing: border-box;
          background: var(--fc-bg);
          color: var(--fc-text);
          font-family: Inter, Arial, sans-serif;
        }
        .fc-root * { box-sizing: border-box; }
        .fc-botcheck { display: none !important; }
        .fc-backdrop, .fc-backdrop img, .fc-overlay, .fc-vignette {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .fc-backdrop img {
          object-fit: cover;
          object-position: 68% center;
          opacity: .56;
          filter: saturate(.72) contrast(1.05);
        }
        .fc-overlay {
          background: linear-gradient(90deg, var(--fc-bg) 0%, color-mix(in srgb, var(--fc-bg), transparent 23%) 28%, transparent 60%, color-mix(in srgb, var(--fc-bg), transparent 23%) 100%);
        }
        .fc-vignette {
          background: linear-gradient(180deg, var(--fc-bg) 0%, transparent 22%, transparent 72%, var(--fc-bg) 100%);
        }
        .fc-layout {
          position: relative;
          z-index: 1;
          min-height: max(720px, 100vh);
          display: grid;
          grid-template-columns: 56% 44%;
        }
        .fc-left {
          min-width: 0;
          padding: 17vh clamp(24px, 2.7vw, 52px) 34px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .fc-heading-mask { overflow: hidden; padding-bottom: .08em; }
        .fc-heading-mask h1 {
          margin: 0;
          color: var(--fc-accent);
          font-size: clamp(58px, 8.2vw, 158px);
          font-weight: 950;
          line-height: .78;
          letter-spacing: -.085em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .fc-statement {
          max-width: 820px;
          margin: 28px 0 0;
          color: color-mix(in srgb, var(--fc-text), transparent 8%);
          font-size: clamp(28px, 3.25vw, 62px);
          font-weight: 900;
          line-height: .93;
          letter-spacing: -.055em;
          text-transform: uppercase;
        }
        .fc-socials {
          margin-top: 40px;
          padding-top: 12px;
          border-top: 1px solid color-mix(in srgb, var(--fc-text), transparent 78%);
        }
        .fc-kicker {
          display: block;
          color: color-mix(in srgb, var(--fc-text), transparent 38%);
          font: 600 10px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .09em;
          text-transform: uppercase;
        }
        .fc-socials > div { display: flex; flex-wrap: wrap; gap: 16px 28px; margin-top: 12px; }
        .fc-socials a {
          color: var(--fc-text);
          font: 600 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .07em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color .25s ease;
        }
        .fc-socials a:hover, .fc-socials a:focus-visible { color: var(--fc-accent); }
        .fc-panel {
          width: 100%;
          max-width: 820px;
          align-self: center;
          padding: 110px clamp(28px, 3.5vw, 68px) 44px 32px;
        }
        .fc-intro { margin-bottom: 42px; }
        .fc-intro h2 {
          margin: 0 0 8px;
          color: var(--fc-text);
          font-size: clamp(25px, 2vw, 38px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -.045em;
        }
        .fc-intro h2 strong { color: var(--fc-accent); }
        .fc-intro p {
          max-width: 680px;
          margin: 28px 0 0;
          color: color-mix(in srgb, var(--fc-text), transparent 12%);
          font-size: clamp(17px, 1.25vw, 23px);
          font-weight: 650;
          line-height: 1.02;
          letter-spacing: -.035em;
        }
        .fc-field {
          display: grid;
          grid-template-columns: 1fr;
          align-items: start;
          gap: 18px;
          min-height: 48px;
          padding: 15px 0 7px;
          border-bottom: 1px solid color-mix(in srgb, var(--fc-text), transparent 80%);
          transition: border-color .3s ease;
        }
        .fc-field:focus-within { border-color: var(--fc-accent); }
        .fc-field > span {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .fc-field input, .fc-field textarea {
          width: 100%;
          border: 0;
          outline: 0;
          resize: none;
          background: transparent;
          color: var(--fc-text);
          font: 700 clamp(16px, 1.1vw, 21px)/1.15 Inter, Arial, sans-serif;
          letter-spacing: -.025em;
        }
        .fc-field input::placeholder, .fc-field textarea::placeholder {
          color: color-mix(in srgb, var(--fc-text), transparent 60%);
          text-transform: uppercase;
        }
        .fc-message { min-height: 150px; }
        .fc-actions { display: flex; align-items: center; gap: 24px; padding-top: 24px; }
        .fc-actions button {
          min-width: 188px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          padding: 12px 14px;
          border: 0;
          background: var(--fc-accent);
          color: var(--fc-bg);
          cursor: pointer;
          font: 900 16px/1 Inter, Arial, sans-serif;
          letter-spacing: -.035em;
          text-transform: uppercase;
          transition: background .3s ease, color .3s ease;
        }
        .fc-actions button:hover, .fc-actions button:focus-visible { background: var(--fc-text); color: var(--fc-bg); }
        .fc-actions button:disabled { cursor: wait; opacity: .6; }
        .fc-actions small {
          max-width: 340px;
          color: color-mix(in srgb, var(--fc-text), transparent 56%);
          font: 500 9px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .03em;
          text-transform: uppercase;
        }
        .fc-status {
          min-height: 18px;
          margin: 7px 0 0;
          color: var(--fc-accent);
          font: 600 10px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
          text-transform: uppercase;
        }
        @media (max-width: 980px) {
          .fc-root, .fc-layout { min-height: 0; }
          .fc-layout { grid-template-columns: 1fr; gap: 56px; padding: 120px 28px 56px; }
          .fc-left { padding: 0; }
          .fc-panel { max-width: none; padding: 0; }
          .fc-backdrop img { object-position: 62% center; opacity: .34; }
          .fc-heading-mask h1 { font-size: clamp(58px, 13vw, 118px); }
          .fc-statement { font-size: clamp(28px, 6vw, 54px); }
        }
        @media (max-width: 560px) {
          .fc-layout { padding: 104px 18px 42px; }
          .fc-actions { align-items: flex-start; flex-direction: column; }
          .fc-actions button { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fc-root * { scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
      `}</style>
    </section>
  )
}

addPropertyControls(ContactSection, {
  backgroundImage: {
    type: ControlType.ResponsiveImage,
    title: "Background",
  },
  heading: {
    type: ControlType.String,
    title: "Heading",
    defaultValue: "CONTACT ME",
  },
  statement: {
    type: ControlType.String,
    title: "Statement",
    displayTextArea: true,
    defaultValue:
      "IF SOMETHING HERE SPARKED AN IDEA, RAISED A QUESTION, OR MADE YOU WANT TO BUILD—LET'S TALK.",
  },
  name: {
    type: ControlType.String,
    title: "Name",
    defaultValue: "Bintang Qurne",
  },
  role: {
    type: ControlType.String,
    title: "Role",
    defaultValue: "Full-Stack Developer · Software Engineer",
  },
  introduction: {
    type: ControlType.String,
    title: "Intro",
    displayTextArea: true,
    defaultValue:
      "I'm always open to conversations about ambitious systems, collaboration, process, or ideas that deserve to be built. Let's talk.",
  },
  web3FormsKey: {
    type: ControlType.String,
    title: "Form key",
    defaultValue: "87b163c5-8726-40fd-b6de-bd668efaad80",
  },
  nameLabel: {
    type: ControlType.String,
    title: "Name label",
    defaultValue: "Your name",
  },
  emailLabel: {
    type: ControlType.String,
    title: "Email label",
    defaultValue: "Your email",
  },
  messageLabel: {
    type: ControlType.String,
    title: "Message label",
    defaultValue: "Message",
  },
  submitLabel: {
    type: ControlType.String,
    title: "Button",
    defaultValue: "Send message",
  },
  socials: {
    type: ControlType.Array,
    title: "Socials",
    maxCount: 6,
    control: {
      type: ControlType.Object,
      controls: {
        label: {
          type: ControlType.String,
          title: "Label",
          defaultValue: "GitHub",
        },
        url: {
          type: ControlType.Link,
          title: "URL",
        },
      },
    },
    defaultValue: DEFAULT_SOCIALS,
  },
  accentColor: {
    type: ControlType.Color,
    title: "Accent",
    defaultValue: "#FF2A2A",
  },
  backgroundColor: {
    type: ControlType.Color,
    title: "Background",
    defaultValue: "#050505",
  },
  textColor: {
    type: ControlType.Color,
    title: "Text",
    defaultValue: "#FFFFFF",
  },
  typography: {
    type: ControlType.Font,
    title: "Typography",
    controls: "extended",
  },
})
