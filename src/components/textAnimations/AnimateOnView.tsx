import React, { ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface AnimateOnViewProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  [key: string]: any;
}

const AnimateOnView: React.FC<AnimateOnViewProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  distance = 20,
  className = "",
  once = true,
  amount = 0.1,
  ...props
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount });

  const variants = {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay * 0.1,
        duration: duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnView;
