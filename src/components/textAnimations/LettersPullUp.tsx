"use client";
import { cn } from "@/app/lib/utils";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export function LettersPullUp({
  text,
  className = "",
  as: Component = "div",
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
}) {
  const splittedText = text.split("");

  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.8 + i * 0.1,
      },
    }),
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <Component className={cn("flex justify-center", className)} ref={ref}>
      {splittedText.map((current, i) => (
        <motion.span
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          custom={i}
          className="inline-block"
        >
          {current == " " ? <span>&nbsp;</span> : current}
        </motion.span>
      ))}
    </Component>
  );
}
