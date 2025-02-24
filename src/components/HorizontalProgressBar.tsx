"use client";
import { motion, type MotionValue, useTransform } from "framer-motion";

interface HorizontalProgressBarProps {
  progress: MotionValue<number>;
}

export function HorizontalProgressBar({
  progress,
}: HorizontalProgressBarProps) {
  return (
    <motion.div className="fixed top-16 left-0 w-full h-1 bg-gray-800 z-50">
      <motion.div
        className="h-full bg-blue-500 relative origin-left"
        style={{ scaleX: progress }}
      >
        <motion.div
          className="absolute right-0 top-0 h-full w-8 bg-blue-400"
          style={{
            filter: "blur(8px)",
            opacity: useTransform(progress, [0, 0.9, 1], [0.5, 0.8, 1]),
          }}
        />
        <motion.div
          className="absolute right-0 top-0 h-full w-4 bg-blue-300"
          style={{
            filter: "blur(12px)",
            opacity: useTransform(progress, [0, 0.9, 1], [0.3, 0.6, 1]),
          }}
        />
      </motion.div>
    </motion.div>
  );
}
