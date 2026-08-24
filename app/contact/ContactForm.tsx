"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WEB3FORMS_ACCESS_KEY = "87b163c5-8726-40fd-b6de-bd668efaad80";

type SubmitState = "idle" | "submitting" | "success" | "error";

function hasValidRequiredFields(form: HTMLFormElement) {
  const name = form.elements.namedItem("name") as HTMLInputElement | null;
  const email = form.elements.namedItem("email") as HTMLInputElement | null;
  const message = form.elements.namedItem("message") as HTMLTextAreaElement | null;

  return (
    form.checkValidity() &&
    Boolean(name?.value.trim()) &&
    Boolean(email?.value.trim()) &&
    Boolean(message?.value.trim())
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formIsValid, setFormIsValid] = useState(false);

  const updateFormValidity = (form: HTMLFormElement) => {
    setFormIsValid(hasValidRequiredFields(form));
  };

  useEffect(() => {
    const syncAutofilledValues = () => {
      if (formRef.current) updateFormValidity(formRef.current);
    };
    const frame = requestAnimationFrame(syncAutofilledValues);
    const timer = window.setTimeout(syncAutofilledValues, 500);

    window.addEventListener("pageshow", syncAutofilledValues);
    window.addEventListener("focus", syncAutofilledValues);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("pageshow", syncAutofilledValues);
      window.removeEventListener("focus", syncAutofilledValues);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New portfolio inquiry");
    formData.append("from_name", "Bintang Qurne Portfolio");

    setSubmitState("submitting");
    setStatus("Sending your message…");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send your message.");
      }

      form.reset();
      setFormIsValid(false);
      setSubmitState("success");
      setStatus("Message sent. I’ll get back to you soon.");
    } catch (error) {
      setSubmitState("error");
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="contact-form-panel"
    >
      <div className="mb-10 lg:mb-12">
        <p className="font-figtree text-[clamp(25px,2vw,38px)] font-extrabold leading-none tracking-[-0.045em]">
          <span className="text-[#ff2a2a]">Bintang Qurne</span>
          <span className="text-white"> / Portfolio</span>
        </p>
        <p className="mt-2 font-ibm-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-white/68">
          Full-Stack Developer · Software Engineer
        </p>
        <p className="mt-7 max-w-[680px] text-[clamp(17px,1.25vw,23px)] font-semibold leading-[1.02] tracking-[-0.035em] text-white/88">
          I&apos;m always open to conversations about ambitious systems,
          collaboration, process, or ideas that deserve to be built.
          Let&apos;s talk.
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onInput={(event) => updateFormValidity(event.currentTarget)}
        className="space-y-1"
        aria-busy={submitState === "submitting"}
      >
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        <label className="contact-field">
          <span className="sr-only">Your name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-label="Your name"
            required
          />
        </label>

        <label className="contact-field">
          <span className="sr-only">Your email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email"
            aria-label="Your email"
            required
          />
        </label>

        <label className="contact-field contact-message-field">
          <span className="sr-only">Message</span>
          <textarea
            name="message"
            placeholder="Your message"
            aria-label="Your message"
            rows={4}
            required
          />
        </label>

        <div className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center sm:gap-6">
          <button
            type="submit"
            className="contact-submit group"
            disabled={!formIsValid || submitState === "submitting"}
          >
            <span>
              {submitState === "submitting" ? "Sending…" : "Send message"}
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </button>
          <p className="max-w-[360px] font-ibm-mono text-[9px] uppercase leading-[1.4] tracking-[0.035em] text-white/46">
            Your message goes straight to my inbox. I&apos;ll reply as soon as I can.
          </p>
        </div>

        <p
          aria-live="polite"
          className={`min-h-5 pt-1 font-ibm-mono text-[10px] uppercase ${
            submitState === "success" ? "text-white" : "text-[#ff2a2a]"
          }`}
        >
          {status}
        </p>
      </form>
    </motion.div>
  );
}
