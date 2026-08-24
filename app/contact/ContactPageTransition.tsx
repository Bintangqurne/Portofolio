"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPageTransition() {
  const [finished, setFinished] = useState(false);

  if (finished) return null;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{
        duration: 1.05,
        delay: 0.18,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => setFinished(true)}
      className="pointer-events-none fixed inset-0 z-[999] origin-bottom bg-black will-change-transform"
    />
  );
}
