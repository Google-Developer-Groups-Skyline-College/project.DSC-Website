import React from "react";
import { Code, GraduationCap, Book } from "lucide-react";
import { Section } from "../ui/Section";
import TextReveal from "../textAnimations/TextReveal";
import { TextAnimate } from "../textAnimations/TextAnimate";
import AnimateOnView from "../textAnimations/AnimateOnView";

const JoinUsInfo = () => {
  return (
    <Section className="py-20 w-full" background="background">
      <div className="container px-4 md:px-6">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1 */}
          <div className="flex flex-col space-y-12">
            <div>
              <TextAnimate
                animation="blurInUp"
                by="character"
                delay={0.1}
                className="text-xs md:text-sm tracking-widest mb-6"
              >
                ABOUT OUR CLUB
              </TextAnimate>
              <TextReveal className="text-lg md:text-xl font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </TextReveal>
            </div>

            <div>
              <TextAnimate
                animation="slideLeft"
                by="character"
                delay={0.2}
                className="text-5xl font-bold mb-8 leading-none tracking-tight"
              >
                Data.
              </TextAnimate>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-text"></div>
                <TextAnimate
                  delay={0.2}
                  animation="fadeIn"
                  by="word"
                  className="text-sm"
                >
                  Collect. Analyze. Predict.
                </TextAnimate>
              </div>
            </div>

            <AnimateOnView once={false} delay={0.2}>
              <Code size={64} className="opacity-50" />
            </AnimateOnView>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-12 md:mt-24">
            <div>
              <TextAnimate
                animation="slideLeft"
                by="character"
                delay={0.2}
                className="text-5xl font-bold mb-8 leading-none tracking-tight"
              >
                Science.
              </TextAnimate>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-text"></div>
                <TextAnimate
                  animation="fadeIn"
                  by="word"
                  delay={0.2}
                  className="text-sm"
                >
                  Hypothesize. Test. Learn.
                </TextAnimate>
              </div>
            </div>

            <div className="border border-foreground p-8">
              <TextAnimate
                animation="slideLeft"
                by="character"
                delay={0.2}
                className="text-xs md:text-sm tracking-widest mb-6"
              >
                WHY JOIN US
              </TextAnimate>
              <ul className="space-y-4 text-lg font-light">
                <li className="flex items-start">
                  <span className="mr-2 text-xl">→</span>
                  <span>
                    <TextAnimate
                      animation="slideLeft"
                      by="character"
                      delay={0.2}
                    >
                      Peer-To-Peer Collaboration
                    </TextAnimate>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl">→</span>
                  <TextAnimate animation="slideLeft" by="character" delay={0.2}>
                    Hands-on projects
                  </TextAnimate>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl">→</span>
                  <TextAnimate animation="slideLeft" by="character" delay={0.2}>
                    Internships
                  </TextAnimate>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl">→</span>
                  <TextAnimate animation="slideLeft" by="character" delay={0.2}>
                    Data Competitions
                  </TextAnimate>
                </li>
              </ul>
            </div>

            <AnimateOnView once={false} delay={0.2}>
              <GraduationCap size={64} className="opacity-50 self-end" />
            </AnimateOnView>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-12 md:mt-12">
            <div>
              <TextAnimate
                animation="slideLeft"
                by="character"
                delay={0.2}
                className="text-5xl font-bold mb-8 leading-none tracking-tight"
              >
                Innovation.
              </TextAnimate>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-text"></div>
                <TextAnimate
                  animation="fadeIn"
                  by="character"
                  delay={0.2}
                  className="text-sm"
                >
                  Create. Disrupt. Transform.
                </TextAnimate>
              </div>
            </div>

            <div>
              <TextAnimate
                animation="fadeIn"
                by="word"
                delay={0.2}
                className="text-xs md:text-sm tracking-widest mb-6"
              >
                OO EE A E A
              </TextAnimate>
              <TextReveal className="text-lg md:text-xl font-light leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </TextReveal>
              <button className="border-2 border-accent px-8 py-3 text-lg font-medium hover:bg-secondary hover:text-text transition-colors duration-300">
                <TextAnimate animation="slideLeft" by="character" delay={0.2}>
                  EMAIL US
                </TextAnimate>
              </button>
            </div>

            <AnimateOnView delay={0.2} once={false}>
              <Book size={64} className="opacity-50" />
            </AnimateOnView>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default JoinUsInfo;
