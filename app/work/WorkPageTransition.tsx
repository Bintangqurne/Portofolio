"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const panelCount = 7;
const ease = [0.76, 0, 0.24, 1] as const;

export default function WorkPageTransition() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!visible || typeof document === "undefined") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <div
          className="fixed inset-0 z-[200] grid grid-rows-7 overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: panelCount }, (_, index) => (
            <div key={index} className="relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ y: "0%" }}
                animate={{ y: "102%" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.64,
                  delay: reduceMotion ? 0 : 0.04 + index * 0.012,
                  ease,
                }}
                onAnimationComplete={index === panelCount - 1 ? () => setVisible(false) : undefined}
              >
              </motion.div>
            </div>
          ))}
        </div>
      ) : null}
    </AnimatePresence>
  );
}
