<<<<<<< HEAD
"use client";

import { main } from "framer-motion/client";
import { useScroll, useSpring } from "framer-motion";

import { Section } from "@/components/ui/section";
import { HorizontalProgressBar } from "@/components/HorizontalProgressBar";
import Navbar from "@/components/Navbar";
=======
/*

  This is the Home page component, i.e the code that represents the Home page.

*/

import Image from "next/image";
>>>>>>> 11a55becfcb4275dcc1f51026a0beea3f08eb7a6

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
