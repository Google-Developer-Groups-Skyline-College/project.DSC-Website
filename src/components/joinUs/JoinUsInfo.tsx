import React from "react";
import { Code, GraduationCap, Book } from "lucide-react";
import { Section } from "../ui/Section";

const JoinUsInfo = () => {
  return (
    <Section className="py-20 w-full bg-background">
      <div className="container px-4 md:px-6">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1 */}
          <div className="flex flex-col space-y-12">
            <div>
              <h2 className="text-xs md:text-sm tracking-widest mb-6">
                ABOUT OUR CLUB
              </h2>
              <p className="text-lg md:text-xl font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold mb-8 leading-none tracking-tight">
                Data.
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-foreground"></div>
                <p className="text-sm">Collect. Analyze. Predict.</p>
              </div>
            </div>

            <Code size={64} className="opacity-50" />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-12 md:mt-24">
            <div>
              <h3 className="text-5xl font-bold mb-8 leading-none tracking-tight">
                Science.
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-foreground"></div>
                <p className="text-sm">Hypothesize. Test. Learn.</p>
              </div>
            </div>

            <div className="border border-foreground p-8">
              <h2 className="text-xs md:text-sm tracking-widest mb-6">
                WHY JOIN US
              </h2>
              <ul className="space-y-4 text-lg font-light">
                <li className="flex items-start">
                  <span className="mr-2 text-xl">→</span>
                  <span>Peer-To-Peer Collaboration</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl">→</span>
                  <span>Hands-on projects</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl">→</span>
                  <span>Internships</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl">→</span>
                  <span>Data Competitions</span>
                </li>
              </ul>
            </div>

            <GraduationCap size={64} className="opacity-50 self-end" />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-12 md:mt-12">
            <div>
              <h3 className="text-5xl font-bold mb-8 leading-none tracking-tight">
                Innovation.
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-foreground"></div>
                <p className="text-sm">Create. Disrupt. Transform.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xs md:text-sm tracking-widest mb-6">
                OO EE A E A
              </h2>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
              <button className="border-2 border-foreground px-8 py-3 text-lg font-medium hover:bg-secondary hover:text-white transition-colors duration-300">
                EMAIL US
              </button>
            </div>

            <Book size={64} className="opacity-50" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default JoinUsInfo;
