"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

export default function ProjectClient({ project, nextProject, prevProject }) {
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const footerRef = useRef(null);
  const nextProjectProgressBarRef = useRef(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const navScrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            scaleX: self.progress,
          });
        }
      },
    });

    const footerScrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        if (projectNavRef.current && !isTransitioning) {
          gsap.to(projectNavRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onLeaveBack: () => {
        if (projectNavRef.current && !isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onUpdate: (self) => {
        if (nextProjectProgressBarRef.current && shouldUpdateProgress) {
          gsap.set(nextProjectProgressBarRef.current, {
            scaleX: self.progress,
          });
        }

        if (self.progress >= 0.99 && !isTransitioning) {
          setShouldUpdateProgress(false);
          setIsTransitioning(true);

          const t1 = gsap.timeline();

          t1.set(nextProjectProgressBarRef.current, {
            scaleX: 1,
          });

          t1.to(
            [
              footerRef.current?.querySelector(".project-footer-copy"),
              footerRef.current?.querySelector(".next-project-progress"),
            ],
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
            }
          );

          t1.call(() => {
            window.location.href = `/projects/${nextProject.slug}`;
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [nextProject.slug, isTransitioning, shouldUpdateProgress]);

  return (
    <>
      <Navbar className="my-3" />
      <ReactLenis root>
        <div className="project-page bg-background">
          {/* Moved the project-nav down by adding mt-16 (margin-top 4rem) */}
          <div
            className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:w-4/5 lg:w-3/4 xl:w-1/2 flex justify-between gap-2 md:gap-4 lg:gap-8 p-2 md:p-4 z-10 mt-20 md:mt-16 px-3 md:px-4"
            ref={projectNavRef}
          >
            {/* Previous button - compact on mobile */}
            <div className="flex items-center gap-1 md:gap-2 p-0 px-2 md:px-4 rounded-lg bg-accent">
              <span className="relative top-[-0.075em] font-sans text-sm md:text-base font-medium txt-text">
                &#8592;
              </span>
              <Link
                href={`/projects/${prevProject.slug}`}
                className="no-underline uppercase font-mono font-semibold text-xs md:text-sm text-text antialiased hidden sm:inline"
              >
                Previous
              </Link>
            </div>

            {/* Title container - reduced width on mobile */}
            <div className="relative flex-1 h-[30px] flex py-2 md:py-4 justify-center items-center rounded-lg border border-accent overflow-hidden bg-background backdrop-blur-lg">
              <p className="text-text font-medium w-full md:w-[400px] lg:w-[600px] mx-auto whitespace-nowrap overflow-hidden text-ellipsis text-center text-xs sm:text-sm md:text-base px-2 py-2">
                {project.title}
              </p>

              <div
                className="absolute top-0 left-0 w-full h-full bg-accent origin-left scale-x-0 will-change-transform -z-10"
                ref={progressBarRef}
              ></div>
            </div>

            {/* Next button - compact on mobile */}
            <div className="flex items-center gap-1 md:gap-2 p-0 px-2 md:px-4 rounded-lg bg-accent">
              <Link
                href={`/projects/${nextProject.slug}`}
                className="no-underline uppercase font-mono font-semibold text-xs md:text-sm text-text antialiased hidden sm:inline"
              >
                Next
              </Link>
              <span className="relative top-[-0.075em] font-sans text-sm md:text-base font-medium text-text">
                &#8594;
              </span>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative w-screen h-screen flex justify-center items-center px-4 sm:px-8">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
              <h1 className="text-[10vw] sm:text-[8vw] md:text-[7.5vw] font-medium whitespace-nowrap overflow-hidden">
                {project.title}
              </h1>
            </div>
            <p
              id="project-description"
              className="absolute bottom-[15%] sm:bottom-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-sm sm:text-base font-medium max-w-[90%] sm:max-w-[80%] md:max-w-[70%]"
              ref={projectDescriptionRef}
            >
              {project.description}
            </p>
          </div>

          {/* Project Images Section */}
          <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20 px-4 sm:px-8">
            {project.images &&
              project.images.map((image, index) => (
                <div
                  className="w-full sm:w-[80%] md:w-[70%] lg:w-1/2 h-[50vh] sm:h-[60vh] md:h-[75vh]"
                  key={index}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>

          {/* Footer Section */}
          <div
            className="relative w-screen h-screen flex justify-center items-center px-4 sm:px-8"
            ref={footerRef}
          >
            <div className="absolute top-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
              <h1 className="text-[10vw] sm:text-[8vw] md:text-[7.5vw] font-medium whitespace-nowrap overflow-hidden">
                {nextProject.title}
              </h1>
            </div>

            <div className="project-footer-copy absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-sm sm:text-base font-medium">Next Project</p>
            </div>

            <div className="next-project-progress absolute bottom-[20%] sm:bottom-[25%] w-[80%] sm:w-[65%] md:w-1/2 h-1 bg-text">
              <div
                className="absolute top-0 left-0 w-full h-full bg-accent scale-x-0 will-change-transform"
                ref={nextProjectProgressBarRef}
              ></div>
            </div>
          </div>
        </div>
      </ReactLenis>

      <style jsx global>{`
        body {
          overflow-x: hidden;
          overflow-y: hidden;
        }

        @media (max-width: 900px) {
          .project-nav .link {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
