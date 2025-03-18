"use client";

import Navbar from "@/components/Navbar";
import { useScroll, useSpring } from "framer-motion";
import { Section } from "@/components/ui/Section";

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
      <Section title="Welcome" background="primary">
        <p className="text-xl">This is the projects page.</p>
      </Section>
    </main>
  );
}
