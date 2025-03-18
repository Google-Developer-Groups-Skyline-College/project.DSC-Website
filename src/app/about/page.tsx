"use client";

import { useScroll, useSpring } from "framer-motion";
import { Section } from "@/components/ui/Section";
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
      <Section title="Welcome" background="primary">
        <p className="text-xl">This is the about page.</p>
      </Section>
    </main>
  );
}
