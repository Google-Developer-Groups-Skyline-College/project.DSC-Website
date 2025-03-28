"use client";

import { useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function Page() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main>
      <Navbar progress={smoothProgress} />
    </main>
  );
}
