"use client";

import React from "react";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for the icons
const iconVariants = {
  initial: { opacity: 0, scale: 0.5, rotate: -90 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: 90,
    transition: { duration: 0.2 },
  },
};

// Animated icon component
const AnimatedIcon = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={iconVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    {children}
  </motion.div>
);

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const iconSize = 20;

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      className="p-2 rounded-full bg-muted border border-border hover:bg-accent/50 flex items-center justify-center w-10 h-10 relative"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mode === "light" ? (
          <AnimatedIcon key="moon">
            <Moon size={iconSize} />
          </AnimatedIcon>
        ) : (
          <AnimatedIcon key="sun">
            <Sun size={iconSize} />
          </AnimatedIcon>
        )}
      </AnimatePresence>
    </button>
  );
};
