import Link from "next/link";
import projects from "./projects";

import Navbar from "@/components/Navbar";

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar className="my-3" />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center font-heading">
          Our Projects
        </h1>

        <ul className="projects-list max-w-3xl mx-auto py-8">
          {projects.map((project) => (
            <li
              key={project.id}
              className="mb-8 group relative border-b border-primary/10 pb-6 hover:border-primary/30 transition-all duration-300"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="absolute -left-4 top-1 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500 rounded-full"></div>
                <div className="link flex items-start">
                  <div className="flex-1">
                    <div
                      href={`/projects/${project.slug}`}
                      className="text-2xl font-medium hover:text-primary transition-colors inline-block mb-2 relative"
                    >
                      <span className="relative z-10 font-heading">
                        {project.title}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-accent group-hover:w-full transition-all duration-300"></span>
                    </div>
                    <p className="text-muted-foreground mt-2 text-base leading-relaxed font-body">
                      {project.description}
                    </p>

                    <div className="flex items-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        href={`/projects/${project.slug}`}
                        className="text-sm tracking-wide uppercase font-medium text-primary flex items-center"
                      >
                        View Project
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
