"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 1.4, ease: "easeInOut" },
          }}
          className="h-screen w-screen fixed bg-muted top-0 pointer-events-none z-20"
        />
        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
