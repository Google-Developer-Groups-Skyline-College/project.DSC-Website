import React, { useEffect, useRef, useState } from "react";
import styles from "./ProjectList.module.css";

const InteractiveGrid: React.FC = () => {
  const animationRef = useRef<number | null>(null);
  const gridStateRef = useRef({
    snakeBlocks: [] as number[],
    maxSnakeLength: 30,
    totalBlocks: 0,
    columns: 0,
    rows: 0,
    headPosition: 0,
    direction: 1, // 1: right, -1: left, columns: down, -columns: up
    directionChangeCounter: 0,
    directionChangeThreshold: 15,
  });

  // Add a state variable to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true when component mounts
    setIsMounted(true);

    // Reset this to false when component unmounts
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    // Only run this effect when the component is mounted
    if (!isMounted) return;

    const createBlocks = () => {
      const blocksContainer = document.getElementById("blocks");
      if (!blocksContainer) return;

      blocksContainer.innerHTML = "";

      // Check if window is defined (client-side only)
      if (typeof window === "undefined") return;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const blockSize = 50;
      const numHorizontalBlocks = Math.ceil(windowWidth / blockSize);
      const numVerticalBlocks = Math.ceil(windowHeight / blockSize);
      const totalBlocks = numHorizontalBlocks * numVerticalBlocks;

      for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        block.className = styles.block;
        blocksContainer.appendChild(block);
      }

      // Initialize snake state
      const state = gridStateRef.current;
      state.totalBlocks = totalBlocks;
      state.columns = numHorizontalBlocks;
      state.rows = numVerticalBlocks;
      state.headPosition = Math.floor(
        (numHorizontalBlocks * numVerticalBlocks) / 2
      ); // Start in the middle
      state.snakeBlocks = [state.headPosition]; // Start with just the head
      state.direction = 1; // Start moving right
    };

    const animateSnake = () => {
      // Return early if component is unmounted
      if (!isMounted) return;

      const state = gridStateRef.current;
      const blocks = document.querySelectorAll(`.${styles.block}`);

      // Clear previous highlights
      blocks.forEach((block) => {
        block.classList.remove(styles.highlight);
      });

      // Move snake head
      state.directionChangeCounter++;
      if (state.directionChangeCounter >= state.directionChangeThreshold) {
        state.directionChangeCounter = 0;

        // Choose a new direction
        const possibleDirections = [];
        const currentRow = Math.floor(state.headPosition / state.columns);
        const currentCol = state.headPosition % state.columns;

        // Check if we can go right
        if (currentCol < state.columns - 1) possibleDirections.push(1);
        // Check if we can go left
        if (currentCol > 0) possibleDirections.push(-1);
        // Check if we can go down
        if (currentRow < state.rows - 1) possibleDirections.push(state.columns);
        // Check if we can go up
        if (currentRow > 0) possibleDirections.push(-state.columns);

        // Pick a random direction from possible ones
        if (possibleDirections.length > 0) {
          state.direction =
            possibleDirections[
              Math.floor(Math.random() * possibleDirections.length)
            ];
        }
      }

      // Calculate new head position
      let newHeadPosition = state.headPosition + state.direction;

      // Handle edge wrapping
      const currentRow = Math.floor(state.headPosition / state.columns);
      const currentCol = state.headPosition % state.columns;
      const newRow = Math.floor(newHeadPosition / state.columns);
      const newCol = newHeadPosition % state.columns;

      // If we're going off the edge, pick a new valid direction
      if (
        newRow < 0 ||
        newRow >= state.rows ||
        newCol < 0 ||
        newCol >= state.columns ||
        (state.direction === 1 && newCol === 0) ||
        (state.direction === -1 && newCol === state.columns - 1)
      ) {
        // Try to turn down if possible
        if (currentRow < state.rows - 1) {
          state.direction = state.columns;
        }
        // Try to turn up if possible
        else if (currentRow > 0) {
          state.direction = -state.columns;
        }
        // Try to go left if we were going right
        else if (state.direction === 1 && currentCol > 0) {
          state.direction = -1;
        }
        // Try to go right if we were going left
        else if (state.direction === -1 && currentCol < state.columns - 1) {
          state.direction = 1;
        }

        newHeadPosition = state.headPosition + state.direction;
      }

      // Update head position
      state.headPosition = newHeadPosition;

      // Add new head position to snake blocks
      state.snakeBlocks.push(state.headPosition);

      // Remove tail if snake is too long
      if (state.snakeBlocks.length > state.maxSnakeLength) {
        state.snakeBlocks.shift();
      }

      // Highlight snake blocks with intensity based on position
      state.snakeBlocks.forEach((blockIndex, snakeIndex) => {
        if (blockIndex >= 0 && blockIndex < blocks.length) {
          const block = blocks[blockIndex];
          block.classList.add(styles.highlight);

          // Apply intensity based on position in snake (head is brightest)
          const intensity = snakeIndex / state.snakeBlocks.length;
          (block as HTMLElement).style.setProperty(
            "--intensity",
            intensity.toString()
          );
        }
      });

      // Only continue animation if component is still mounted
      if (isMounted) {
        animationRef.current = requestAnimationFrame(() => {
          setTimeout(animateSnake, 60); // Control speed of snake
        });
      }
    };

    // Create blocks and start animation
    createBlocks();
    animateSnake();

    // Add resize listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", createBlocks);
    }

    // Cleanup function
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", createBlocks);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isMounted]); // Run this effect when isMounted changes

  return <div id="blocks" className={styles.blocks}></div>;
};

export default InteractiveGrid;
