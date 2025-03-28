import React, { useEffect, useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
}

const TextReveal = ({
  children,
  className = "",
  tag: Tag = "p",
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split text into spans
    const text = containerRef.current.textContent || "";
    let htmlString = "";
    const textArray = text.trim().split("");

    for (let i = 0; i < textArray.length; i++) {
      htmlString += `<span class="text-reveal-span transition-opacity duration-300 ease-out opacity-10">${textArray[i]}</span>`;
    }

    containerRef.current.innerHTML = htmlString;

    // Get all spans within the current element
    const spans = containerRef.current.querySelectorAll(".text-reveal-span");

    const revealSpans = () => {
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i] as HTMLElement;
        const parentRect = span.parentElement?.getBoundingClientRect();

        if (parentRect && parentRect.top < window.innerHeight / 1.5) {
          const { left, top } = span.getBoundingClientRect();
          const adjustedTop = top - window.innerHeight * 0.6;

          let opacityValue = 1 - (adjustedTop * 0.01 + left * 0.0005);
          opacityValue =
            opacityValue < 0.1 ? 0.1 : opacityValue > 1 ? 1 : opacityValue;

          span.style.opacity = opacityValue.toString();
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", revealSpans);
    // Initial reveal
    revealSpans();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", revealSpans);
    };
  }, [children]);

  return React.createElement(Tag, { ref: containerRef, className }, children);
};

export default TextReveal;
