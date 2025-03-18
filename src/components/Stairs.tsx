import { motion } from "framer-motion";
import React from "react";

const StairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

const reverseIndex = (index: number): number => {
  const totalSteps = 10;
  return totalSteps - index - 1;
};

const Stairs: React.FC = () => {
  return (
    <>
      {[...Array(10)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={StairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: reverseIndex(index) * 0.1,
            }}
            className="h-full w-full bg-primary relative"
          />
        );
      })}
    </>
  );
};

export default Stairs;
