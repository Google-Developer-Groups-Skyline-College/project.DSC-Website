"use client";

import Navbar from "@/components/Navbar";
import { useScroll, useSpring } from "framer-motion";

import Hero from "@/components/joinUs/HeroSection";
import JoinUsInfo from "@/components/joinUs/JoinUsInfo";
import JoinUsFooter from "@/components/joinUs/JoinUsFooter";

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
      <Hero />
      <JoinUsInfo />
      <JoinUsFooter />
    </main>
  );
}
