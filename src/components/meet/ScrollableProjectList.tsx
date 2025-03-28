import React, { useRef, useState, useEffect } from "react";
import { projectData } from "@/app/data/projectData";
import { config } from "@/app/utils/scrollUtils";
import styles from "./ProjectList.module.css";

interface ScrollableProjectListProps {
  projectHeight: number;
}

interface ProjectState {
  currentY: number;
  targetY: number;
  lastY: number;
  scrollVelocity: number;
  isDragging: boolean;
  startY: number;
  projects: Map<number, HTMLElement>;
  parallaxImages: Map<number, ParallaxImage>;
  isSnapping: boolean;
  snapStartTime: number;
  snapStartY: number;
  snapTargetY: number;
  lastScrollTime: number;
  isScrolling: boolean;
  textElements: Map<number, HTMLElement[]>;
  projectHeight: number;
}

interface ParallaxImage {
  update: (scroll: number) => void;
  updateBounds: () => void;
}

const ScrollableProjectList: React.FC<ScrollableProjectListProps> = ({
  projectHeight,
}) => {
  const projectListRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  const stateRef = useRef<ProjectState>({
    currentY: 0,
    targetY: 0,
    lastY: 0,
    scrollVelocity: 0,
    isDragging: false,
    startY: 0,
    projects: new Map(),
    parallaxImages: new Map(),
    projectHeight: projectHeight || 0, // Default to 0 instead of window.innerHeight
    isSnapping: false,
    snapStartTime: 0,
    snapStartY: 0,
    snapTargetY: 0,
    lastScrollTime: Date.now(),
    isScrolling: false,
    textElements: new Map(),
  });

  useEffect(() => {
    // Update projectHeight with window.innerHeight if projectHeight is 0
    if (projectHeight === 0 && typeof window !== "undefined") {
      stateRef.current.projectHeight = window.innerHeight;
    } else if (projectHeight > 0) {
      stateRef.current.projectHeight = projectHeight;
    }

    setInitialized(true);
  }, [projectHeight]);

  const createParallaxImage = (imageElement: HTMLImageElement) => {
    let bounds: { top: number; bottom: number } | null = null;
    let currentTranslateY = 0;
    let targetTranslateY = 0;

    const updateBounds = () => {
      if (imageElement) {
        const rect = imageElement.getBoundingClientRect();
        bounds = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    const update = (scroll: number) => {
      if (!bounds) return;
      const relativeScroll = -scroll - bounds.top;
      targetTranslateY = relativeScroll * 0.2;
      currentTranslateY =
        currentTranslateY + (targetTranslateY - currentTranslateY) * 0.1;

      if (Math.abs(currentTranslateY - targetTranslateY) > 0.01) {
        imageElement.style.transform = `translateY(${currentTranslateY}px) scale(1.5)`;
      }
    };

    updateBounds();
    return { update, updateBounds };
  };

  const getProjectData = (index: number) => {
    const dataIndex =
      ((index % projectData.length) + projectData.length) % projectData.length;
    return projectData[dataIndex];
  };

  const createProjectElement = (index: number) => {
    const state = stateRef.current;
    if (state.projects.has(index)) return;

    const projectList = projectListRef.current;
    if (!projectList) return;

    const template = document.querySelector(
      `.${styles.template}`
    ) as HTMLElement;
    if (!template) return;

    const project = template.cloneNode(true) as HTMLElement;
    project.style.display = "flex";
    project.classList.remove(styles.template);
    project.classList.add(styles.project);

    const dataIndex =
      ((index % projectData.length) + projectData.length) % projectData.length;
    const data = getProjectData(index);

    // Check if data exists and has required properties
    if (!data) {
      console.error(`Project data not found for index: ${index}`);
      return;
    }

    const projectNumber = (dataIndex + 1).toString().padStart(2, "0");

    // Use a default value for isAlternate if it's undefined
    const isAlternate = data.isAlternate || false;

    project.innerHTML = isAlternate
      ? `<div class="${styles.side}">
          <div class="${styles["img-container"]}"><img src="${
          data.image || ""
        }" alt="${data.title || "Project"}" /></div>
        </div>
        <div class="${styles.side}">
          <div class="${styles["title-container"]}">
            <div class="${styles["header-group"]}">
              <div>
                <h1>${data.title || "Untitled"}</h1>
                <h3>${data.role || "Role"}</h3>
              </div>
              <h1>${projectNumber}</h1>
            </div>
            <div class="${styles.description}">
              <h2 class="blur-in" style="--index: 3;">${data.desc1 || ""}</h2>
              <h2 class="blur-in" style="--index: 4;">${data.desc2 || ""}</h2>
            </div>
          </div>
        </div>`
      : `<div class="${styles.side}">
          <div class="${styles["title-container"]}">
            <div class="${styles["header-group"]}">
              <div>
                <h1>${data.title || "Untitled"}</h1>
                <h3>${data.role || "Role"}</h3>
              </div>
              <h1>${projectNumber}</h1>
            </div>
            <div class="${styles.description}">
              <h2 class="blur-in" style="--index: 3;">${data.desc1 || ""}</h2>
              <h2 class="blur-in" style="--index: 4;">${data.desc2 || ""}</h2>
            </div>
          </div>
        </div>
        <div class="${styles.side}">
          <div class="${styles["img-container"]}"><img src="${
          data.image || ""
        }" alt="${data.title || "Project"}" /></div>
        </div>`;

    project.style.transform = `translateY(${index * state.projectHeight}px)`;
    projectList.appendChild(project);
    state.projects.set(index, project);

    const img = project.querySelector("img");
    if (img) {
      state.parallaxImages.set(
        index,
        createParallaxImage(img as HTMLImageElement)
      );
    }

    const textElements = project.querySelectorAll(".blur-in");
    state.textElements.set(index, Array.from(textElements) as HTMLElement[]);
  };

  const createInitialProjects = () => {
    if (!initialized) return;
    for (let i = -config.BUFFER_SIZE; i <= config.BUFFER_SIZE; i++) {
      createProjectElement(i);
    }
  };

  const getCurrentIndex = () => {
    const state = stateRef.current;
    return Math.round(-state.targetY / state.projectHeight);
  };

  const checkAndCreateProjects = () => {
    const state = stateRef.current;
    const currentIndex = getCurrentIndex();
    const minNeeded = currentIndex - config.BUFFER_SIZE;
    const maxNeeded = currentIndex + config.BUFFER_SIZE;

    for (let i = minNeeded; i <= maxNeeded; i++) {
      if (!state.projects.has(i)) {
        createProjectElement(i);
      }
    }

    // Safely access window
    const centerY =
      (typeof window !== "undefined" ? window.innerHeight : 0) / 2;

    state.projects.forEach((project, index) => {
      const projectY = index * state.projectHeight + state.currentY;
      const projectCenterY = projectY + state.projectHeight / 2;
      const distanceFromCenter = Math.abs(projectCenterY - centerY);

      const textElements = state.textElements.get(index);
      if (textElements) {
        if (distanceFromCenter < state.projectHeight / 2) {
          textElements.forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
        } else {
          textElements.forEach((el) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
          });
        }
      }

      if (
        index < currentIndex - config.CLEANUP_THRESHOLD ||
        index > currentIndex + config.CLEANUP_THRESHOLD
      ) {
        project.remove();
        state.projects.delete(index);
        state.parallaxImages.delete(index);
        state.textElements.delete(index);
      }
    });
  };

  const getClosestSnapPoint = () => {
    const state = stateRef.current;
    const currentIndex = Math.round(-state.targetY / state.projectHeight);
    return -currentIndex * state.projectHeight;
  };

  const initiateSnap = () => {
    const state = stateRef.current;
    state.isSnapping = true;
    state.snapStartTime = Date.now();
    state.snapStartY = state.targetY;
    state.snapTargetY = getClosestSnapPoint();
  };

  const updateSnap = () => {
    const state = stateRef.current;
    const elapsed = Date.now() - state.snapStartTime;
    const progress = Math.min(elapsed / config.SNAP_DURATION, 1);

    const t = 1 - Math.pow(1 - progress, 3);

    state.targetY =
      state.snapStartY + (state.snapTargetY - state.snapStartY) * t;

    if (progress >= 1) {
      state.isSnapping = false;
      state.targetY = state.snapTargetY;
    }
  };

  const animate = () => {
    const state = stateRef.current;
    const now = Date.now();
    const timeSinceLastScroll = now - state.lastScrollTime;

    if (!state.isSnapping && !state.isDragging && timeSinceLastScroll > 100) {
      const snapPoint = getClosestSnapPoint();
      if (Math.abs(state.targetY - snapPoint) > 1) {
        initiateSnap();
      }
    }

    if (state.isSnapping) {
      updateSnap();
    }

    if (!state.isDragging) {
      state.currentY += (state.targetY - state.currentY) * config.LERP_FACTOR;
    }

    checkAndCreateProjects();

    state.projects.forEach((project, index) => {
      const y = index * state.projectHeight + state.currentY;
      project.style.transform = `translateY(${y}px)`;

      const parallaxImage = state.parallaxImages.get(index);
      if (parallaxImage) {
        parallaxImage.update(state.currentY);
      }
    });

    requestAnimationFrame(animate);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const state = stateRef.current;
    state.isSnapping = false;
    state.lastScrollTime = Date.now();

    const scrollDelta = e.deltaY * config.SCROLL_SPEED;
    state.targetY -= Math.max(
      Math.min(scrollDelta, config.MAX_VELOCITY),
      -config.MAX_VELOCITY
    );
  };

  const handleTouchStart = (e: TouchEvent) => {
    const state = stateRef.current;
    state.isDragging = true;
    state.isSnapping = false;
    state.startY = e.touches[0].clientY;
    state.lastY = state.targetY;
    state.lastScrollTime = Date.now();
  };

  const handleTouchMove = (e: TouchEvent) => {
    const state = stateRef.current;
    if (!state.isDragging) return;
    const deltaY = (e.touches[0].clientY - state.startY) * 1.5;
    state.targetY = state.lastY + deltaY;
    state.lastScrollTime = Date.now();
  };

  const handleTouchEnd = () => {
    const state = stateRef.current;
    state.isDragging = false;
  };

  const handleResize = () => {
    const state = stateRef.current;
    if (typeof window !== "undefined") {
      state.projectHeight = window.innerHeight;
    }
    state.projects.forEach((project, index) => {
      project.style.transform = `translateY(${index * state.projectHeight}px)`;
      const parallaxImage = state.parallaxImages.get(index);
      if (parallaxImage) {
        parallaxImage.updateBounds();
      }
    });
  };

  useEffect(() => {
    if (!initialized) return;

    if (typeof window !== "undefined") {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("resize", handleResize);
    }

    createInitialProjects();
    animate();

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [initialized]);

  return (
    <div ref={projectListRef} className={styles["project-list"]}>
      <div className={`${styles.project} ${styles.template}`}></div>
    </div>
  );
};

export default ScrollableProjectList;
