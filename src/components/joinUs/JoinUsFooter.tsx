import React from "react";
import { MapPin, Globe } from "lucide-react";
import { FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { Section } from "../ui/Section";
import { TextAnimate } from "../textAnimations/TextAnimate";
import AnimateOnView from "../textAnimations/AnimateOnView";

const JoinUsFooter = () => {
  return (
    <Section
      className="relative overflow-hidden flex flex-col justify-center items-center"
      background="accent"
    >
      <div className="container px-4 md:px-6">
        <div className="relative">
          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative z-0">
            {/* Address */}
            <div className="flex flex-col items-start md:pr-8">
              <TextAnimate
                animation="fadeIn"
                by="character"
                delay={0.2}
                className="text-xs tracking-widest mb-8"
              >
                LOCATION
              </TextAnimate>
              <div className="flex items-start space-x-3 mb-2">
                <MapPin size={20} className="mt-1 opacity-75" />
                <div>
                  <TextAnimate
                    animation="slideUp"
                    delay={0.2}
                    by="line"
                    className="text-xl font-medium"
                  >
                    3300 College Dr
                  </TextAnimate>
                  <TextAnimate
                    animation="slideUp"
                    delay={0.3}
                    by="line"
                    className="text-xl font-medium"
                  >
                    San Bruno
                  </TextAnimate>
                  <TextAnimate
                    animation="slideUp"
                    delay={0.4}
                    by="line"
                    className="text-xl font-medium"
                  >
                    CA 94066
                  </TextAnimate>
                </div>
              </div>
              <div className="mt-8 flex items-start space-x-3">
                <div className="w-6 h-6 flex justify-center items-center opacity-75">
                  <Globe size={20} />
                </div>
                <div>
                  <TextAnimate
                    animation="slideUp"
                    by="line"
                    delay={0.2}
                    className="text-xl font-medium"
                  >
                    Skyline College
                  </TextAnimate>
                  <TextAnimate
                    animation="slideUp"
                    by="line"
                    delay={0.3}
                    className="text-xl font-medium"
                  >
                    Building 7
                  </TextAnimate>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col md:items-center md:border-x border-text md:px-8">
              <TextAnimate
                animation="fadeIn"
                by="character"
                delay={0.2}
                className="text-xs tracking-widest mb-8"
              >
                CONNECT
              </TextAnimate>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <AnimateOnView
                    once={false}
                    delay={0.2}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  >
                    <FaInstagram size={24} />
                  </AnimateOnView>
                  <span className="text-xl font-medium group-hover:underline cursor-pointer">
                    <TextAnimate
                      animation="slideLeft"
                      delay={0.2}
                      by="character"
                    >
                      Instagram
                    </TextAnimate>
                  </span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <AnimateOnView
                    once={false}
                    delay={0.2}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  >
                    <FaLinkedin size={24} />
                  </AnimateOnView>
                  <span className="text-xl font-medium group-hover:underline cursor-pointer">
                    <TextAnimate
                      animation="slideLeft"
                      delay={0.2}
                      by="character"
                    >
                      LinkedIn
                    </TextAnimate>
                  </span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <AnimateOnView
                    once={false}
                    delay={0.2}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  >
                    <FaDiscord size={24} />
                  </AnimateOnView>
                  <span className="text-xl font-medium group-hover:underline cursor-pointer">
                    <TextAnimate
                      animation="slideLeft"
                      delay={0.2}
                      by="character"
                    >
                      Discord
                    </TextAnimate>
                  </span>
                </div>
              </div>
            </div>

            {/* Year & signature */}
            <div className="flex flex-col md:items-end md:pl-8">
              <TextAnimate
                animation="fadeIn"
                delay={0.2}
                by="character"
                className="text-xs tracking-widest mb-8"
              >
                YEAR
              </TextAnimate>
              <TextAnimate
                animation="slideLeft"
                by="character"
                delay={0.2}
                className="text-[8rem] leading-none font-bold tracking-tight"
              >
                {String(new Date().getFullYear())}
              </TextAnimate>

              {/* Data signature */}
              <div className="mt-auto pt-12 opacity-50 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="h-px w-12 bg-text"></div>
                  <code className="tracking-wide">
                    <TextAnimate animation="fadeIn" by="character" delay={0.2}>
                      #data_science
                    </TextAnimate>
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default JoinUsFooter;
