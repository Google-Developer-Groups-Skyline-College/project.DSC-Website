import React, { useRef } from "react";
import { cn } from "@/app/lib/utils";

import { Section } from "../ui/Section";
import { motion, useInView } from "framer-motion";
import { GitBranch, Database, Network } from "lucide-react";
import { LettersPullUp } from "../textAnimations/LettersPullUp";

import { RotateWords } from "../textAnimations/RotateWords";

export default function Hero() {
  const scrollIndicatorRef = useRef(null);

  const isScrollIndicatorInView = useInView(scrollIndicatorRef, {
    once: true,
    amount: 0.5,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const line1 = "TIME: Friday 12:10 p.m. - 1:00 p.m.";
  const line2 = "LOCATION: STEM Center Room 7-324";

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 2, // Use delayChildren instead of delay
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 0.75,
      y: 0,
      transition: { duration: 0.5 }, // Remove the delay here
    },
  };

  return (
    <Section
      fullHeight
      className="overflow-hidden flex flex-col justify-center items-center"
      background="background"
    >
      <div className="absolute inset-0">
        <div className="h-full w-full grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
          {Array.from({ length: 20 }).map((_, rowIndex) =>
            Array.from({ length: 20 }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "border dark:border-white/10 border-black/10 flex items-center justify-center",
                  (rowIndex + colIndex) % 7 === 0
                    ? "dark:bg-white/10 bg-black/10"
                    : ""
                )}
              >
                {(rowIndex + colIndex) % 15 === 0 && (
                  <div className="w-1 h-1 dark:bg-white/30 bg-black/30 rounded-full" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="container relative  px-4 md:px-6">
        <div className="flex flex-col items-center space-y-20">
          <div className="relative text-center">
            <motion.h4
              ref={ref}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="text-sm md:text-base tracking-wider font-medium mb-2"
            >
              SKYLINE COLLEGE
            </motion.h4>

            {/* Replace static h1 with LettersPullUp for "JOIN" */}
            <LettersPullUp
              text="JOIN"
              as="h1"
              className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-none mb-2"
            />

            <div className="flex justify-center ">
              <motion.span
                ref={ref}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
              >
                <RotateWords
                  text="Data"
                  words={["Science", "Analysis", "Engineer"]}
                />
              </motion.span>

              {/* Replace static h2 with LettersPullUp for "US" */}
              <LettersPullUp
                text="US"
                as="h2"
                className="text-5xl md:text-[8rem] font-bold leading-none"
              />
            </div>
          </div>

          <div
            ref={ref}
            className="max-w-2xl mx-auto text-center text-xl md:text-2xl font-light leading-relaxed"
          >
            <div className="overflow-hidden mb-1">
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <b>{line1}</b>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <b>{line2}</b>
              </motion.div>
            </div>
          </div>

          <motion.div
            ref={ref}
            className="flex space-x-8 md:space-x-16"
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.div variants={item}>
              <GitBranch size={32} />
            </motion.div>

            <motion.div variants={item}>
              <Database size={32} />
            </motion.div>

            <motion.div variants={item}>
              <Network size={32} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <motion.span
          className="text-xs tracking-widest mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={isScrollIndicatorInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 2.5 }}
        >
          SCROLL
        </motion.span>
        <motion.div
          className="h-16 w-px bg-text "
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isScrollIndicatorInView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 2.2 }}
          style={{ transformOrigin: "top" }}
        ></motion.div>
      </div>
    </Section>
  );
}
