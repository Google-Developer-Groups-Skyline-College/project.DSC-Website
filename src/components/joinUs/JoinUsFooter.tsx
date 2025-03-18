import React from "react";
import { MapPin, Globe } from "lucide-react";
import { FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { Section } from "../ui/Section";

const JoinUsFooter = () => {
  return (
    <Section className="relative overflow-hidden flex flex-col justify-center items-center bg-muted">
      <div className="container px-4 md:px-6">
        <div className="relative">
          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative z-0">
            {/* Address */}
            <div className="flex flex-col items-start md:pr-8">
              <p className="text-xs tracking-widest mb-8">LOCATION</p>
              <div className="flex items-start space-x-3 mb-2">
                <MapPin size={20} className="mt-1 opacity-75" />
                <div>
                  <p className="text-xl font-medium">3300 College Dr</p>
                  <p className="text-xl font-medium">San Bruno</p>
                  <p className="text-xl font-medium">CA 94066</p>
                </div>
              </div>
              <div className="mt-8 flex items-start space-x-3">
                <div className="w-6 h-6 flex justify-center items-center opacity-75">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xl font-medium">Skyline College</p>
                  <p className="text-xl font-medium">Building 7</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col md:items-center md:border-x border-primary md:px-8">
              <p className="text-xs tracking-widest mb-8">CONNECT</p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <FaInstagram
                    size={24}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xl font-medium group-hover:underline cursor-pointer">
                    Instagram
                  </span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <FaLinkedin
                    size={24}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xl font-medium group-hover:underline cursor-pointer">
                    LinkedIn
                  </span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <FaDiscord
                    size={24}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xl font-medium group-hover:underline cursor-pointer">
                    Discord
                  </span>
                </div>
              </div>
            </div>

            {/* Year & signature */}
            <div className="flex flex-col md:items-end md:pl-8">
              <p className="text-xs tracking-widest mb-8">YEAR</p>
              <p className="text-[8rem] leading-none font-bold tracking-tight">
                {new Date().getFullYear()}
              </p>

              {/* Data signature */}
              <div className="mt-auto pt-12 opacity-50 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="h-px w-12 bg-primary"></div>
                  <code className="tracking-wide">#data_science</code>
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
