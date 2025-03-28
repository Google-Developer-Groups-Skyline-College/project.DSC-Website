"use client";

import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface BlocksBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  blockSize?: number;
  numLines?: number;
  lineLength?: number;
  lineMoveDelay?: number;
}

export function BlocksBackground({
  children,
  className,
  blockSize = 50,
  numLines = 20,
  lineLength = 8,
  lineMoveDelay = 100,
  ...props
}: BlocksBackgroundProps) {
  const blockContainerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setIsClient(true);
    // Check initial theme
    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme === "dark" ? "dark" : "light");

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme");
          setTheme(newTheme === "dark" ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const highlightColor = theme === "dark" ? "#96E6B3" : "#244224";
  const backgroundColor = theme === "dark" ? "#2F3640" : "hsl(105 19% 85%)";
  const borderColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  useEffect(() => {
    if (!isClient || !blockContainerRef.current) return;

    // Clear existing blocks
    while (blockContainerRef.current.firstChild) {
      blockContainerRef.current.removeChild(
        blockContainerRef.current.firstChild
      );
    }

    const blockContainer = blockContainerRef.current;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / blockSize);
    const numRows = Math.ceil(screenHeight / blockSize);
    const numBlocks = numCols * numRows;

    const lines: Array<{
      positions: number[];
      direction: string;
      age: number;
      maxAge: number;
      speed: number;
      fadeOutBlocks: Array<{ position: number; opacity: number }>;
    }> = [];

    blockContainer.style.flexWrap = "wrap";
    blockContainer.style.backgroundColor = backgroundColor;

    function createBlocks() {
      for (let i = 0; i < numBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.dataset.index = i.toString();
        blockContainer.appendChild(block);
      }
    }

    // Changed this function to accept an index parameter instead of using 'this'
    function highlightRandomNeighbors(index: number) {
      const col = index % numCols;
      const row = Math.floor(index / numCols);

      const neighbors: number[] = [];
      for (
        let r = Math.max(0, row - 1);
        r <= Math.min(row + 1, numRows - 1);
        r++
      ) {
        for (
          let c = Math.max(0, col - 1);
          c <= Math.min(col + 1, numCols - 1);
          c++
        ) {
          const neighborIndex = r * numCols + c;
          if (neighborIndex !== index && neighborIndex < numBlocks) {
            neighbors.push(neighborIndex);
          }
        }
      }

      const block = blockContainer.children[index] as HTMLElement;
      if (block) {
        block.classList.add("highlight");
        setTimeout(() => block.classList.remove("highlight"), 800);
      }

      if (neighbors.length > 0) {
        const neighborIndex =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        const neighbor = blockContainer.children[neighborIndex] as HTMLElement;
        if (neighbor) {
          neighbor.classList.add("highlight");
          setTimeout(() => neighbor.classList.remove("highlight"), 800);
        }
      }
    }

    // Added a new function for random highlights
    function triggerRandomHighlights() {
      // Choose a random block to highlight
      const randomIndex = Math.floor(Math.random() * numBlocks);
      highlightRandomNeighbors(randomIndex);
    }

    function initializeLines() {
      // Create multiple lines with strategic starting positions
      for (let i = 0; i < numLines; i++) {
        // Space out the starting positions across the grid
        const row =
          Math.floor(numRows / numLines) * i + Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * numCols);
        const startPosition = row * numCols + col;

        const line = {
          positions: [startPosition],
          direction: ["right", "left"][i % 2], // Alternate directions
          age: 0,
          maxAge: 150 + Math.floor(Math.random() * 100),
          speed: 1,
          fadeOutBlocks: [], // Keep track of blocks that need to fade out
        };

        // Initialize line with starting position
        const block = blockContainer.children[startPosition] as HTMLElement;
        if (block) {
          block.classList.add("highlight");
          // Add subtle opacity variation for smooth appearance
          block.style.opacity = "0.8";
        }

        lines.push(line);
      }

      // Start the animation loop
      return setInterval(moveLines, lineMoveDelay);
    }

    function getRandomDirection(currentDirection: string) {
      // Smoother direction changes - prefer continuing in same direction or 90° turn
      const directions = ["up", "down", "left", "right"];

      if (Math.random() < 0.7) {
        // 70% chance to keep going in same direction
        return currentDirection;
      }

      // For the remaining 30%, choose a different direction
      // but avoid complete reversals for smoother appearance
      let newDirection;
      do {
        newDirection =
          directions[Math.floor(Math.random() * directions.length)];
      } while (
        (currentDirection === "up" && newDirection === "down") ||
        (currentDirection === "down" && newDirection === "up") ||
        (currentDirection === "left" && newDirection === "right") ||
        (currentDirection === "right" && newDirection === "left")
      );

      return newDirection;
    }

    function moveLines() {
      // Move each line
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Process any blocks that need to fade out
        for (let j = line.fadeOutBlocks.length - 1; j >= 0; j--) {
          const blockInfo = line.fadeOutBlocks[j];
          blockInfo.opacity -= 0.1; // Gradual fade
          const block = blockContainer.children[
            blockInfo.position
          ] as HTMLElement;
          if (block) {
            if (blockInfo.opacity <= 0) {
              block.classList.remove("highlight");
              block.style.opacity = "";
              line.fadeOutBlocks.splice(j, 1);
            } else {
              block.style.opacity = blockInfo.opacity.toString();
            }
          }
        }

        // Increase age
        line.age++;

        // Only change direction occasionally
        if (Math.random() < 0.03) {
          // 3% chance to change direction (less chaotic)
          line.direction = getRandomDirection(line.direction);
        }

        // Calculate new head position
        const currentHead = line.positions[0];
        const currentCol = currentHead % numCols;
        const currentRow = Math.floor(currentHead / numCols);
        let newHead;

        // Calculate new position based on direction
        switch (line.direction) {
          case "right":
            newHead = currentHead + 1;
            // Check if we're at the right edge
            if (newHead % numCols === 0) {
              line.direction = getRandomDirection("right");
              if (line.direction === "right") line.direction = "down";
              newHead =
                line.direction === "down"
                  ? currentHead + numCols
                  : line.direction === "up"
                  ? currentHead - numCols
                  : currentHead - 1;
            }
            break;
          case "left":
            newHead = currentHead - 1;
            // Check if we're at the left edge
            if (currentCol === 0) {
              line.direction = getRandomDirection("left");
              if (line.direction === "left") line.direction = "up";
              newHead =
                line.direction === "down"
                  ? currentHead + numCols
                  : line.direction === "up"
                  ? currentHead - numCols
                  : currentHead + 1;
            }
            break;
          case "down":
            newHead = currentHead + numCols;
            // Check if we're at the bottom edge
            if (newHead >= numBlocks) {
              line.direction = getRandomDirection("down");
              if (line.direction === "down") line.direction = "left";
              newHead =
                line.direction === "left"
                  ? currentHead - 1
                  : line.direction === "right"
                  ? currentHead + 1
                  : currentHead - numCols;
            }
            break;
          case "up":
            newHead = currentHead - numCols;
            // Check if we're at the top edge
            if (newHead < 0) {
              line.direction = getRandomDirection("up");
              if (line.direction === "up") line.direction = "right";
              newHead =
                line.direction === "left"
                  ? currentHead - 1
                  : line.direction === "right"
                  ? currentHead + 1
                  : currentHead + numCols;
            }
            break;
          default:
            newHead = currentHead;
        }

        // If the line is too old or out of bounds, reset it
        if (line.age > line.maxAge || newHead < 0 || newHead >= numBlocks) {
          // Add all positions to fadeOut array instead of immediately removing highlight
          line.positions.forEach((pos) => {
            line.fadeOutBlocks.push({ position: pos, opacity: 0.8 });
          });

          // Create a new line at a strategic position
          const row = Math.floor(Math.random() * numRows);
          const col = 0; // Start from left edge for more natural flow
          const startPosition = row * numCols + col;

          line.positions = [startPosition];
          line.direction = "right";
          line.age = 0;
          line.maxAge = 150 + Math.floor(Math.random() * 100);

          const block = blockContainer.children[startPosition] as HTMLElement;
          if (block) {
            block.classList.add("highlight");
            block.style.opacity = "0.8";
          }
          continue;
        }

        // Add new head with fade-in effect
        line.positions.unshift(newHead);
        const headBlock = blockContainer.children[newHead] as HTMLElement;
        if (headBlock) {
          headBlock.classList.add("highlight");
          // Create fade-in effect
          headBlock.style.opacity = "0.8";
        }

        // Remove tail with fade-out effect
        if (line.positions.length > lineLength) {
          const tailPos = line.positions.pop();
          if (tailPos !== undefined) {
            line.fadeOutBlocks.push({ position: tailPos, opacity: 0.8 });
          }
        }
      }
    }

    // Update styles for theme support
    const styleId = "blocks-background-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .block {
          width: ${blockSize}px;
          height: ${blockSize}px;
          border: 0.5px solid ${borderColor};
          transition: all 0.5s ease;
        }
        .highlight {
          border-color: ${highlightColor};
          box-shadow: 0 0 10px ${highlightColor}40;
        }
      `;
      document.head.appendChild(style);
    }

    createBlocks();
    const linesInterval = initializeLines();

    // Add random highlights at intervals
    const highlightsInterval = setInterval(triggerRandomHighlights, 2000);

    return () => {
      clearInterval(linesInterval);
      clearInterval(highlightsInterval);
      const style = document.getElementById(styleId);
      if (style) document.head.removeChild(style);
    };
  }, [
    isClient,
    blockSize,
    theme,
    backgroundColor,
    borderColor,
    highlightColor,
    numLines,
    lineLength,
    lineMoveDelay,
  ]);

  return (
    <div
      className={cn("blocks-background-wrapper relative", className)}
      {...props}
    >
      <div className="blocks-container fixed top-0 left-0 w-screen h-screen overflow-hidden">
        <div
          ref={blockContainerRef}
          className="w-[105vw] h-screen flex flex-wrap justify-start items-start overflow-hidden z-[1]"
        />
      </div>
      <div className="content relative w-full h-full z-[3] pointer-events-auto">
        {children}
      </div>
    </div>
  );
}

export interface SectionWithBlocksProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children: ReactNode;
  fullHeight?: boolean;
  blockSize?: number;
  numLines?: number;
  lineLength?: number;
  lineMoveDelay?: number;
}

export function SectionWithBlocks({
  title,
  children,
  className,
  fullHeight = false,
  blockSize = 50,
  numLines = 5,
  lineLength = 8,
  lineMoveDelay = 100,
  ...props
}: SectionWithBlocksProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16 w-full transition-colors duration-300 relative overflow-hidden",
        fullHeight ? "min-h-[calc(100vh-4rem)]" : "",
        className
      )}
      {...props}
    >
      <BlocksBackground
        blockSize={blockSize}
        numLines={numLines}
        lineLength={lineLength}
        lineMoveDelay={lineMoveDelay}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {title && (
          <h2 className="text-3xl font-bold tracking-tighter mb-8 md:mb-12 transition-colors duration-300">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
