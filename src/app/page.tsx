"use client";

import { useScroll, useSpring } from "framer-motion";

import { Section } from "@/components/ui/section";
import { HorizontalProgressBar } from "@/components/HorizontalProgressBar";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main>
      <Navbar />
      <HorizontalProgressBar progress={smoothProgress} />

      <Section title="Welcome" background="primary">
        <p className="text-xl">
          This is a primary background section with a title.
        </p>
      </Section>

      <Section background="gray">
        <p className="text-lg">
          This is a gray background section without a title.
        </p>
      </Section>

      <Section title="Custom Section" className="my-custom-class">
        <p>This section has a custom class applied to it.</p>
      </Section>

      <Section>
        <p>This is a default white background section.</p>
      </Section>
      <Section title="Welcome" background="primary">
        <p className="text-xl">
          This is a primary background section with a title.
        </p>
      </Section>
      <Section title="Welcome" background="primary">
        <p className="text-xl">
          This is a primary background section with a title.
        </p>
      </Section>
    </main>
  );
}
