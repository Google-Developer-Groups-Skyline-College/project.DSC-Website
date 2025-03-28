"use client";

import { useScroll, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";
import InteractiveGrid from "@/components/meet/InteractiveGrid";
import ScrollableProjectList from "@/components/meet/ScrollableProjectList";
import Navbar from "@/components/Navbar";

export default function Page() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [projectHeight, setProjectHeight] = useState(0);

  useEffect(() => {
    setProjectHeight(window.innerHeight);

    const handleResize = () => {
      setProjectHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main>
      <Navbar progress={smoothProgress} />
      <div className="min-h-screen">
        <InteractiveGrid />
        <ScrollableProjectList projectHeight={projectHeight} />
      </div>
    </main>
  );
}
