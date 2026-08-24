"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const socials = [
  { label: "GitHub", href: "https://github.com/bintangqurne", icon: "github" },
  { label: "Instagram", href: "https://instagram.com/bintangqurne", icon: "instagram" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayatullah-bintang-qurne-19a0992ba/",
    icon: "linkedin",
  },
] as const;

function SocialIcon({ name }: { name: (typeof socials)[number]["icon"] }) {
  if (name === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 .7C5.65.7.5 5.85.5 12.2c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.96 10.96 0 0 1 12 6.21c.98 0 1.95.13 2.86.38 2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.79.56a11.51 11.51 0 0 0 7.88-10.91C23.5 5.85 18.35.7 12 .7Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function ContactHero() {
  return (
    <section className="contact-hero relative min-h-[100svh] overflow-hidden bg-[#050505] text-white">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/aku1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="contact-portrait object-cover object-[68%_center] opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.76)_27%,rgba(5,5,5,.18)_58%,rgba(5,5,5,.74)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,transparent_22%,transparent_72%,#050505_100%)]" />
        <div className="contact-grain absolute inset-0 opacity-[0.16]" />
      </div>

      <div className="relative z-10 grid min-h-[100svh] grid-cols-1 gap-14 px-4 pb-12 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[56%_44%] lg:gap-0 lg:px-0 lg:pb-10 lg:pt-0">
        <div className="flex min-w-0 flex-col justify-start lg:px-8 lg:pb-8 lg:pt-[17vh] xl:px-12">
          <div>
            <div className="overflow-hidden pb-[0.08em]">
              <motion.h1
                initial={{ x: "-104%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1.05, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-nowrap font-fragment text-[clamp(58px,8.2vw,158px)] font-black uppercase leading-[0.78] tracking-[-0.085em] text-[#ff2a2a]"
              >
                Contact me
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[820px] text-[clamp(28px,3.25vw,62px)] font-black uppercase leading-[0.93] tracking-[-0.055em] text-white/90"
            >
              If something here sparked an idea, raised a question, or made you
              want to build—let&apos;s talk.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.72 }}
            className="mt-10 border-t border-white/20 pt-3"
          >
            <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
              Socials
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="contact-social flex h-7 w-7 items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff2a2a]"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex min-w-0 items-center px-0 pb-4 lg:px-8 lg:pb-0 lg:pr-12 xl:pr-16">
          <ContactForm />
        </div>
      </div>

      <style jsx global>{`
        .contact-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          pointer-events: none;
        }
        .contact-form-panel {
          width: 100%;
          max-width: 760px;
        }
        .contact-field {
          display: grid;
          grid-template-columns: 1fr;
          align-items: start;
          gap: 18px;
          padding: 15px 0 7px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          transition: border-color 300ms ease;
        }
        .contact-field:focus-within {
          border-color: #ff2a2a;
        }
        .contact-field > span {
          padding-top: 4px;
          font-family: var(--font-ibm-mono), monospace;
          color: rgba(255, 255, 255, 0.64);
          font-size: 10px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .contact-field input,
        .contact-field textarea {
          width: 100%;
          resize: none;
          outline: none;
          border: 0;
          background: transparent;
          color: white;
          font: 700 clamp(16px, 1.1vw, 21px) / 1.15 var(--font-figtree), sans-serif;
          letter-spacing: -0.025em;
        }
        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
        .contact-field input:-webkit-autofill,
        .contact-field input:-webkit-autofill:hover,
        .contact-field input:-webkit-autofill:focus,
        .contact-field textarea:-webkit-autofill,
        .contact-field textarea:-webkit-autofill:hover,
        .contact-field textarea:-webkit-autofill:focus {
          border: 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: #fff;
          caret-color: #fff;
          box-shadow: inset 0 0 0 1000px transparent;
          transition: background-color 99999s ease-out 0s;
        }
        .contact-message-field {
          min-height: 150px;
        }
        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          min-width: 190px;
          padding: 12px 14px;
          background: #ff2a2a;
          color: #050505;
          font-family: var(--font-figtree), sans-serif;
          font-size: 16px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background-color 300ms ease, color 300ms ease;
        }
        .contact-submit:not(:disabled):hover,
        .contact-submit:not(:disabled):focus-visible {
          background: white;
          color: #050505;
        }
        .contact-submit:disabled {
          border-color: #4a4a4a;
          background: #3b3b3b;
          color: #858585;
          cursor: not-allowed;
          pointer-events: none;
        }
        .contact-social {
          transition: color 250ms ease, transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .contact-social:hover,
        .contact-social:focus-visible {
          color: #ff2a2a;
          transform: translateY(-3px);
        }
        @media (max-width: 1023px) {
          .contact-portrait {
            object-position: 62% center;
            opacity: 0.34;
          }
          .contact-hero .contact-form-panel {
            max-width: none;
          }
        }
        @media (max-width: 639px) {
          .contact-message-field {
            min-height: 170px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-submit,
          .contact-social {
            transition: none;
          }
          .contact-social:hover,
          .contact-social:focus-visible {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
