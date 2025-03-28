"use client";

import { useScroll, useSpring } from "framer-motion";

import { Text } from "@/components/ui/Text";
import { Section } from "@/components/ui/Section";
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
      <Navbar progress={smoothProgress} />
      <Section fullHeight background="background">
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Hero Title with Blanka Font */}
          <Text size="h1" font="title" className="mb-6 tracking-wider">
            DATA SCIENCE CLUB
          </Text>

          {/* Subtitle with Primary Font (Poppins) */}
          <Text
            size="lead"
            font="body"
            weight="medium"
            className="mb-8 max-w-2xl"
          >
            Empowering students to explore the world of data science and machine
            learning through collaborative projects and learning opportunities.
          </Text>

          {/* Regular paragraph with Secondary Font (Hind) */}
          <Text font="body" className="max-w-xl mb-8">
            Join our community of data enthusiasts and build practical skills in
            data analysis, visualization, and machine learning applications.
          </Text>
        </div>
      </Section>

      <Section background="background" title="Our Mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {/* Section Header with Title Font */}
            <Text size="h3" font="heading" className="mb-4">
              WHAT WE DO
            </Text>

            {/* Content with Primary Font */}
            <Text size="lead" className="mb-6">
              We bridge the gap between classroom theory and real-world data
              science applications.
            </Text>

            <Text font="body">
              Through workshops, hackathons, and collaborative projects, we
              provide hands-on experience with the latest tools and techniques
              in data science and AI.
            </Text>
          </div>

          <div>
            {/* Section Header with Title Font */}
            <Text size="h3" font="heading" className="mb-4">
              OUR VISION
            </Text>

            {/* Content with Primary Font */}
            <Text size="lead" className="mb-6">
              Creating a community of data-driven problem solvers ready to
              tackle real-world challenges.
            </Text>

            <Text font="body">
              We aim to equip students with the skills and knowledge needed to
              succeed in the rapidly evolving fields of data science, machine
              learning, and artificial intelligence.
            </Text>
          </div>
        </div>
      </Section>
      {/*  For a section with primary colors */}
      <Section title="Join Our Team" background="primary" fullHeight>
        <div>Sign up form</div>
      </Section>
    </main>
  );
}
