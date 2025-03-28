import React from "react";
import type { ProjectData } from "@/app/data/projectData";
import Image from "next/image";

interface ProjectItemProps {
  data: ProjectData;
  projectNumber: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ data, projectNumber }) => {
  const { title, role, desc1, desc2, image, isAlternate } = data;

  if (isAlternate) {
    return (
      <>
        <div className="side">
          <div className="img">
            <Image src={image} alt={title} />
          </div>
        </div>
        <div className="side">
          <div className="title">
            <div className="grp1">
              <div>
                <h1>{title}</h1>
                <h3>{role}</h3>
              </div>
              <h1>{projectNumber}</h1>
            </div>
            <div className="description">
              <h2
                className="blur-in"
                style={{ "--index": 3 } as React.CSSProperties}
              >
                {desc1}
              </h2>
              <h2
                className="blur-in"
                style={{ "--index": 4 } as React.CSSProperties}
              >
                {desc2}
              </h2>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="side">
        <div className="title">
          <div className="grp1">
            <div>
              <h1>{title}</h1>
              <h3>{role}</h3>
            </div>
            <h1>{projectNumber}</h1>
          </div>
          <div className="description">
            <h2
              className="blur-in"
              style={{ "--index": 3 } as React.CSSProperties}
            >
              {desc1}
            </h2>
            <h2
              className="blur-in"
              style={{ "--index": 4 } as React.CSSProperties}
            >
              {desc2}
            </h2>
          </div>
        </div>
      </div>
      <div className="side">
        <div className="img">
          <Image src={image} alt={title} />
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
